import { useState, useEffect } from "react";
import { Link } from "react-router";
import { supabase } from "../../lib/supabase";
import { BookOpen, Star, ChevronRight, Loader2, GraduationCap, Lock, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { motion } from "motion/react";

export function LessonsPage() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessonsWithProgress = async () => {
      setLoading(true);
      const savedUser = localStorage.getItem("user");
      if (!savedUser) return;
      const user = JSON.parse(savedUser);

      const { data: allLessons } = await supabase.from('lessons').select('*').order('grade', { ascending: true }).order('created_at', { ascending: true });
      const { data: completedData } = await supabase.from('user_progress').select('lesson_id').eq('user_id', user.id).eq('is_completed', true);

      if (allLessons) {
        const completedIds = completedData?.map(item => item.lesson_id) || [];
        const processedLessons = allLessons.map((lesson, index) => {
          const isCompleted = completedIds.includes(lesson.id);
          let isLocked = index > 0 && !completedIds.includes(allLessons[index - 1].id);
          return { ...lesson, isCompleted, isLocked };
        });
        setLessons(processedLessons);
      }
      setLoading(false);
    };
    fetchLessonsWithProgress();
  }, []);

  if (loading) return <div className="min-h-[100dvh] flex items-center justify-center"><Loader2 className="w-8 h-8 text-blue-600 animate-spin" /></div>;

  return (
    // overflow-x-hidden qo'shildi! Bu gorizontal skrolni oldini oladi.
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 pb-28 w-full overflow-x-hidden">
      <header className="space-y-2">
        <div className="inline-flex p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        {/* break-words qo'shildi! Sarlavha uzun bo'lsa uzib pastga tushiradi */}
        <h1 className="text-2xl md:text-4xl font-black dark:text-white tracking-tight break-words">
          Darslar va Progress
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          Keyingi darslarni ochish uchun joriy mavzularni muvaffaqiyatli yakunlang.
        </p>
      </header>

      <div className="grid gap-3 w-full">
        {lessons.length > 0 ? (
          lessons.map((lesson, index) => (
            <motion.div key={lesson.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Link 
                to={lesson.isLocked ? "#" : `/lessons/${lesson.id}`}
                onClick={(e) => lesson.isLocked && e.preventDefault()}
                className="block w-full"
              >
                <Card className={`transition-all overflow-hidden rounded-[20px] border-2 w-full ${lesson.isLocked ? "opacity-60 bg-slate-100 dark:bg-slate-900/50 border-transparent" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm"}`}>
                  <CardContent className="p-4 flex items-center justify-between gap-3 w-full">
                    
                    {/* min-w-0 flex-1 qo'shildi! Ichidagi matn siqilishga ruxsat beradi */}
                    <div className="flex items-center gap-3.5 flex-1 min-w-0 w-full">
                      <div className={`w-14 h-14 rounded-[14px] flex flex-col items-center justify-center shrink-0 ${lesson.isLocked ? "bg-slate-200 dark:bg-slate-800" : "bg-blue-50 dark:bg-slate-700"}`}>
                        {lesson.isLocked ? <Lock className="w-5 h-5 text-slate-400" /> : (
                          <>
                            <span className="text-[9px] font-black text-blue-400 dark:text-slate-500 uppercase">Sinf</span>
                            <span className="text-xl font-black text-blue-600 dark:text-white leading-none">{lesson.grade}</span>
                          </>
                        )}
                      </div>
                      
                      {/* min-w-0 pr-2 qo'shildi! */}
                      <div className="flex-1 min-w-0 pr-2">
                        {/* line-clamp-2 qo'shildi! 2 qatordan oshsa ... qilib qo'yadi */}
                        <h3 className={`font-bold text-sm sm:text-base line-clamp-2 ${lesson.isLocked ? "text-slate-400" : "dark:text-white"}`}>
                          {lesson.title}
                        </h3>
                        <div className="mt-1.5">
                          <Badge className={`${lesson.isLocked ? "bg-slate-200 text-slate-400 dark:bg-slate-800" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500"} border-0 px-2 py-0.5 text-[10px]`}>
                            <Star className="w-3 h-3 mr-1 fill-current inline" /> {lesson.xp_reward} XP
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* shrink-0 qo'shildi! Ikona siqilib ketmasligi uchun */}
                    <div className="shrink-0 flex items-center">
                      {lesson.isCompleted ? (
                        <div className="flex flex-col items-center gap-0.5">
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                          <span className="text-[8px] font-black text-green-500 uppercase">Tugatildi</span>
                        </div>
                      ) : lesson.isLocked ? (
                        <div className="p-1.5 rounded-full">
                          <Lock className="w-4 h-4 text-slate-300" />
                        </div>
                      ) : (
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                          <ChevronRight className="text-blue-600 w-5 h-5" />
                        </div>
                      )}
                    </div>

                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-800/50 rounded-[24px] border-2 border-dashed border-slate-200 dark:border-slate-700">
            <GraduationCap className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold dark:text-white mb-2">Darslar topilmadi</h3>
          </div>
        )}
      </div>
    </div>
  );
}

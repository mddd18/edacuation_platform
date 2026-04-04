import { useState, useEffect } from "react";
import { Link } from "react-router";
import { supabase } from "../../lib/supabase";
import { 
  BookOpen, 
  Star, 
  ChevronRight, 
  Loader2, 
  GraduationCap, 
  Lock, 
  CheckCircle2 
} from "lucide-react";
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

      const { data: allLessons, error: lessonError } = await supabase
        .from('lessons')
        .select('*')
        .order('grade', { ascending: true })
        .order('created_at', { ascending: true });

      const { data: completedData } = await supabase
        .from('user_progress')
        .select('lesson_id')
        .eq('user_id', user.id)
        .eq('is_completed', true);

      if (!lessonError && allLessons) {
        const completedIds = completedData?.map(item => item.lesson_id) || [];
        
        const processedLessons = allLessons.map((lesson, index) => {
          const isCompleted = completedIds.includes(lesson.id);
          let isLocked = false;
          if (index > 0) {
            const previousLessonId = allLessons[index - 1].id;
            if (!completedIds.includes(previousLessonId)) {
              isLocked = true;
            }
          }
          return { ...lesson, isCompleted, isLocked };
        });

        setLessons(processedLessons);
      }
      setLoading(false);
    };

    fetchLessonsWithProgress();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-3 md:gap-4">
        <Loader2 className="w-8 h-8 md:w-10 md:h-10 text-blue-600 animate-spin" />
        <p className="text-sm md:text-base text-slate-500 font-bold animate-pulse">Darslar yuklanmoqda...</p>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-10 max-w-5xl mx-auto space-y-6 md:space-y-8 pb-24">
      <header className="space-y-2 md:space-y-3">
        <div className="inline-flex p-2.5 md:p-3 bg-blue-600 rounded-xl md:rounded-2xl shadow-lg shadow-blue-500/20">
          <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </div>
        <h1 className="text-2xl md:text-5xl font-black dark:text-white tracking-tight">
          Darslar va Progress
        </h1>
        <p className="text-sm md:text-lg text-slate-500 dark:text-slate-400 font-medium">
          Keyingi darslarni ochish uchun joriy mavzularni muvaffaqiyatli yakunlang.
        </p>
      </header>

      <div className="grid gap-3 md:gap-4">
        {lessons.length > 0 ? (
          lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link 
                to={lesson.isLocked ? "#" : `/lessons/${lesson.id}`}
                onClick={(e) => lesson.isLocked && e.preventDefault()}
                className={lesson.isLocked ? "cursor-not-allowed block" : "block"}
              >
                <Card className={`transition-all overflow-hidden rounded-[20px] md:rounded-[28px] border-2 ${
                  lesson.isLocked 
                    ? "opacity-60 bg-slate-100 dark:bg-slate-900/50 border-transparent" 
                    : "hover:border-blue-500 hover:shadow-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm"
                }`}>
                  <CardContent className="p-4 md:p-6 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-0">
                      <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex flex-col items-center justify-center shrink-0 transition-colors ${
                        lesson.isLocked 
                          ? "bg-slate-200 dark:bg-slate-800" 
                          : "bg-blue-50 dark:bg-slate-700"
                      }`}>
                        {lesson.isLocked ? (
                          <Lock className="w-5 h-5 md:w-6 md:h-6 text-slate-400" />
                        ) : (
                          <>
                            <span className="text-[9px] md:text-[10px] font-black text-blue-400 dark:text-slate-500 uppercase leading-none mb-0.5 md:mb-1">Sinf</span>
                            <span className="text-lg md:text-2xl font-black text-blue-600 dark:text-white leading-none">
                              {lesson.grade}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className={`font-bold text-base md:text-xl truncate ${lesson.isLocked ? "text-slate-400" : "dark:text-white"}`}>
                          {lesson.title}
                        </h3>
                        <div className="flex items-center gap-2 md:gap-3 mt-1 md:mt-2">
                          <Badge className={`${
                            lesson.isLocked 
                            ? "bg-slate-200 text-slate-400 dark:bg-slate-800" 
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500"
                          } border-0 font-bold px-2 py-0.5 md:px-3 text-[10px] md:text-xs shrink-0`}>
                            <Star className="w-3 h-3 mr-1 fill-current" /> {lesson.xp_reward} XP
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center shrink-0">
                      {lesson.isCompleted ? (
                        <div className="flex flex-col items-center gap-0.5 md:gap-1">
                          <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
                          <span className="text-[8px] md:text-[10px] font-black text-green-500 uppercase hidden sm:block">Tugatildi</span>
                        </div>
                      ) : lesson.isLocked ? (
                        <div className="flex items-center gap-1.5 md:gap-2 text-slate-400">
                           <Lock className="w-3.5 h-3.5 md:w-4 md:h-4" />
                           <span className="text-[10px] md:text-xs font-bold uppercase tracking-tighter italic hidden sm:block">Qulflangan</span>
                        </div>
                      ) : (
                        <div className="p-1.5 md:p-2 bg-blue-50 dark:bg-blue-900/30 rounded-full group">
                          <ChevronRight className="text-blue-600 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-16 md:py-24 bg-white dark:bg-slate-800/50 rounded-[24px] md:rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-700">
            <GraduationCap className="w-16 h-16 md:w-20 md:h-20 text-slate-300 dark:text-slate-600 mx-auto mb-4 md:mb-6" />
            <h3 className="text-xl md:text-2xl font-bold dark:text-white mb-2">Darslar topilmadi</h3>
            <p className="text-sm md:text-base text-slate-500">Tez orada yangi darslar qo'shiladi!</p>
          </div>
        )}
      </div>
    </div>
  );
}

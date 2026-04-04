import { useState, useEffect } from "react";
import { Link } from "react-router";
import { supabase } from "../../lib/supabase";
import { BookOpen, Star, ChevronRight, Loader2, GraduationCap } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { motion } from "motion/react";

export function LessonsPage() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllLessons = async () => {
      setLoading(true);
      
      // Filtrlarsiz barcha darslarni bazadan olamiz
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .order('grade', { ascending: true }) // Sinf bo'yicha tartiblaymiz (5, 6, 7...)
        .order('created_at', { ascending: true });

      if (error) {
        console.error("Darslarni yuklashda xato:", error.message);
      } else {
        setLessons(data || []);
      }
      setLoading(false);
    };

    fetchAllLessons();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-slate-500 font-bold animate-pulse">Darslar yuklanmoqda...</p>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-10 max-w-5xl mx-auto space-y-8 pb-24">
      <header className="space-y-2">
        <div className="inline-flex p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-5xl font-black dark:text-white tracking-tight">
          Barcha Darslar
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
          O'zingizga qiziq bo'lgan har qanday sinf mavzusini tanlang va o'rganing.
        </p>
      </header>

      <div className="grid gap-4">
        {lessons.length > 0 ? (
          lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={`/lessons/${lesson.id}`}>
                <Card className="hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all cursor-pointer group bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden rounded-3xl">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-2xl flex flex-col items-center justify-center group-hover:bg-blue-600 transition-colors">
                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 group-hover:text-blue-200 uppercase leading-none mb-1">Sinf</span>
                        <span className="text-2xl font-black text-slate-700 dark:text-white group-hover:text-white leading-none">
                          {lesson.grade}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {lesson.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500 border-0 font-bold px-3">
                            <Star className="w-3 h-3 mr-1 fill-current" /> {lesson.xp_reward} XP
                          </Badge>
                          <span className="text-sm text-slate-400 font-medium hidden sm:inline-block">
                            {lesson.description?.substring(0, 60)}...
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-all">
                      <ChevronRight className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-24 bg-white dark:bg-slate-800/50 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-700">
            <GraduationCap className="w-20 h-20 text-slate-300 dark:text-slate-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold dark:text-white mb-2">Darslar topilmadi</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Hozircha bazada darslar mavjud emas. Supabase panelidan yangi darslar qo'shishingizni kutyapmiz.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

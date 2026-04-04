import { useState, useEffect } from "react";
import { Link } from "react-router";
import { supabase } from "../../lib/supabase";
import { BookOpen, GraduationCap, Star, ChevronRight, Loader2 } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { motion } from "motion/react";

export function LessonsPage() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userGrade, setUserGrade] = useState<number | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const user = JSON.parse(savedUser);
        setUserGrade(parseInt(user.grade));

        const { data, error } = await supabase
          .from('lessons')
          .select('*')
          .eq('grade', user.grade) // Faqat o'z sinfidagi darslarni ko'radi
          .order('created_at', { ascending: true });

        if (!error) setLessons(data);
      }
      setLoading(false);
    };

    fetchLessons();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center dark:bg-slate-950">
      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  );

  return (
    <div className="p-4 md:p-10 max-w-5xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-black dark:text-white flex items-center gap-3">
          <BookOpen className="text-blue-500 w-8 h-8" /> {userGrade}-sinf Darslari
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">
          Mavzularni o'rganing va bilimingizni sinab ko'ring.
        </p>
      </header>

      <div className="grid gap-4">
        {lessons.length > 0 ? lessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/lessons/${lesson.id}`}>
              <Card className="hover:border-blue-500 transition-all cursor-pointer group bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-xl group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg dark:text-white group-hover:text-blue-500 transition-colors">{lesson.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <Badge variant="outline" className="text-[10px] uppercase tracking-tighter">
                          <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" /> {lesson.xp_reward} XP
                        </Badge>
                        <span className="text-xs text-slate-400 font-medium">{lesson.description}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        )) : (
          <div className="text-center py-20 bg-slate-100 dark:bg-slate-800/50 rounded-[32px] border-2 border-dashed border-slate-200 dark:border-slate-700">
            <GraduationCap className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-bold">Hozircha bu sinf uchun darslar yuklanmagan.</p>
          </div>
        )}
      </div>
    </div>
  );
}

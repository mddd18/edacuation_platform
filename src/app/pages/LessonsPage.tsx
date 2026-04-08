import { useState, useEffect } from "react";
import { Link } from "react-router";
import { supabase } from "../../lib/supabase";
import { Star, Loader2, Lock, Check } from "lucide-react";
import { motion } from "motion/react";

// --- TARJIMALAR LUG'ATI ---
const dict = {
  UZ: {
    title: "Ta'lim Yo'lagi",
    subtitle: "Bosqichlarni birma-bir bosib o'ting",
    notFound: "Darslar topilmadi"
  },
  QQ: {
    title: "Bilim Jolı",
    subtitle: "Basqıshlardı birin-ketin basıp ótiń",
    notFound: "Sabaqlar tabılmadı"
  }
};

export function LessonsPage() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // TIL STATI
  const [lang, setLang] = useState<'UZ' | 'QQ'>('UZ');

  useEffect(() => {
    const savedLang = (localStorage.getItem('appLang') as 'UZ' | 'QQ') || 'UZ';
    setLang(savedLang);

    const fetchLessonsWithProgress = async () => {
      setLoading(true);
      const savedUser = localStorage.getItem("user");
      if (!savedUser) return;
      const user = JSON.parse(savedUser);

      const { data: allLessons } = await supabase
        .from('lessons')
        .select('*')
        .order('grade', { ascending: true })
        .order('created_at', { ascending: true });

      const { data: completedData } = await supabase
        .from('user_progress')
        .select('lesson_id')
        .eq('user_id', user.id)
        .eq('is_completed', true);

      if (allLessons) {
        const completedIds = completedData?.map(item => item.lesson_id) || [];
        let foundCurrent = false;

        const processedLessons = allLessons.map((lesson, index) => {
          const isCompleted = completedIds.includes(lesson.id);
          const isLocked = index > 0 && !completedIds.includes(allLessons[index - 1].id);
          let isCurrent = false;

          if (!isCompleted && !isLocked && !foundCurrent) {
            isCurrent = true;
            foundCurrent = true;
          }

          return { ...lesson, isCompleted, isLocked, isCurrent };
        });

        setLessons(processedLessons);
      }
      setLoading(false);
    };

    fetchLessonsWithProgress();
  }, []);

  if (loading) return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
    </div>
  );

  const t = dict[lang];

  return (
    <div className="p-4 md:p-8 max-w-lg mx-auto w-full overflow-x-hidden min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      
      <header className="mb-8 text-center mt-4">
        <h1 className="text-3xl md:text-4xl font-black dark:text-white tracking-tight mb-2">
          {t.title}
        </h1>
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
          {t.subtitle}
        </p>
      </header>

      <div className="relative py-4 flex flex-col items-center w-full">
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-6 bg-slate-200 dark:bg-slate-800 rounded-full z-0"></div>

        {lessons.length > 0 ? (
          lessons.map((lesson, index) => {
            const positions = [
              "translate-x-0",
              "translate-x-12 md:translate-x-16",
              "translate-x-20 md:translate-x-24",
              "translate-x-12 md:translate-x-16",
              "translate-x-0",
              "-translate-x-12 md:-translate-x-16",
              "-translate-x-20 md:-translate-x-24",
              "-translate-x-12 md:-translate-x-16",
            ];
            const zigClass = positions[index % positions.length];

            return (
              <div key={lesson.id} className={`relative z-10 flex flex-col items-center mb-10 md:mb-14 w-full ${zigClass}`}>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative mb-3 px-4 py-2.5 rounded-2xl border-2 font-black text-xs md:text-sm text-center shadow-md max-w-[180px] z-20 transition-colors duration-300 ${
                    lesson.isCurrent
                      ? "bg-blue-500 border-blue-600 text-white animate-pulse"
                      : lesson.isCompleted
                        ? "bg-green-100 border-green-200 text-green-700 dark:bg-green-900/40 dark:border-green-800 dark:text-green-400"
                        : "bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-slate-400"
                  }`}
                >
                  {lesson.title}
                  
                  <div className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-b-2 border-r-2 ${
                    lesson.isCurrent
                      ? "bg-blue-500 border-blue-600"
                      : lesson.isCompleted
                        ? "bg-green-100 border-green-200 dark:bg-slate-900 dark:border-green-800"
                        : "bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700"
                  }`}></div>
                </motion.div>

                <Link
                  to={lesson.isLocked ? "#" : `/lessons/${lesson.id}`}
                  onClick={(e) => lesson.isLocked && e.preventDefault()}
                  className="block relative group cursor-pointer"
                >
                  {lesson.isCurrent && (
                    <span className="absolute -inset-3 bg-blue-400 rounded-full opacity-40 animate-ping z-0"></span>
                  )}

                  <div className={`relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full border-b-[8px] active:border-b-0 active:translate-y-[8px] flex items-center justify-center transition-all shadow-sm ${
                    lesson.isCompleted
                      ? "bg-green-500 border-green-600 text-white hover:bg-green-400"
                      : lesson.isCurrent
                        ? "bg-blue-500 border-blue-600 text-white hover:bg-blue-400"
                        : "bg-slate-200 border-slate-300 dark:bg-slate-800 dark:border-slate-900 text-slate-400"
                  }`}>
                    {lesson.isCompleted ? (
                      <Check className="w-10 h-10 md:w-12 md:h-12" strokeWidth={3} />
                    ) : lesson.isLocked ? (
                      <Lock className="w-8 h-8 md:w-10 md:h-10 opacity-60" strokeWidth={2.5} />
                    ) : (
                      <Star className="w-9 h-9 md:w-11 md:h-11 fill-current" />
                    )}
                  </div>

                  <div className={`absolute -bottom-1 -right-2 w-8 h-8 md:w-9 md:h-9 rounded-full border-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 flex items-center justify-center z-20 shadow-sm ${
                    lesson.isCompleted ? "border-green-500" : lesson.isCurrent ? "border-blue-500" : ""
                  }`}>
                    {lesson.isCompleted ? (
                      <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 fill-yellow-500" />
                    ) : lesson.isLocked ? (
                      <span className="text-[10px] md:text-[11px] font-black text-slate-400">{index + 1}</span>
                    ) : (
                      <span className="text-[9px] md:text-[10px] font-black text-blue-500">{lesson.xp_reward}XP</span>
                    )}
                  </div>
                </Link>

              </div>
            );
          })
        ) : (
          <div className="text-center py-20 text-slate-500 font-bold">{t.notFound}</div>
        )}
      </div>
    </div>
  );
}

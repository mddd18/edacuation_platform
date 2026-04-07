import { useState, useEffect } from "react";
import { Link } from "react-router";
import { supabase } from "../../lib/supabase";
import { Scale, Loader2, CheckCircle2, ChevronRight, ShieldAlert, Lock } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { motion } from "motion/react";

export function CaseStudiesPage() {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      setLoading(true);
      const savedUser = localStorage.getItem("user");
      if (!savedUser) return;
      const user = JSON.parse(savedUser);

      // Holatlarni bazadan o'sish tartibida olamiz (Ketma-ketlik buzilmasligi uchun)
      const { data: allCases } = await supabase.from('cases').select('*').order('created_at', { ascending: true });
      const { data: progressData } = await supabase.from('user_case_progress').select('case_id').eq('user_id', user.id).eq('is_solved', true);

      if (allCases) {
        const solvedIds = progressData?.map(p => p.case_id) || [];
        let foundCurrent = false;

        const processedCases = allCases.map((c, index) => {
          const isSolved = solvedIds.includes(c.id);
          // Agar oldingi holat yechilmagan bo'lsa, bunisi qulflangan turadi
          const isLocked = index > 0 && !solvedIds.includes(allCases[index - 1].id);
          let isCurrent = false;

          if (!isSolved && !isLocked && !foundCurrent) {
            isCurrent = true;
            foundCurrent = true;
          }

          return {
            ...c,
            isSolved,
            isLocked,
            isCurrent
          };
        });
        setCases(processedCases);
      }
      setLoading(false);
    };
    fetchCases();
  }, []);

  if (loading) return <div className="min-h-[100dvh] flex items-center justify-center"><Loader2 className="w-8 h-8 text-purple-600 animate-spin" /></div>;

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 pb-28 w-full overflow-x-hidden">
      <header className="space-y-2">
        <div className="inline-flex p-2.5 bg-purple-600 rounded-xl shadow-lg shadow-purple-500/20">
          <Scale className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl md:text-4xl font-black dark:text-white tracking-tight break-words">
          Amaliy Holatlar
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          Haqiqiy holatlarni tahlil qilib, navbatdagi kvestlarni oching.
        </p>
      </header>

      <div className="grid gap-3 w-full">
        {cases.length > 0 ? (
          cases.map((caseItem, index) => (
            <motion.div key={caseItem.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Link 
                to={caseItem.isLocked ? "#" : `/cases/${caseItem.id}`} 
                onClick={(e) => caseItem.isLocked && e.preventDefault()}
                className="block w-full"
              >
                <Card className={`transition-all overflow-hidden rounded-[20px] border-2 w-full ${
                  caseItem.isLocked 
                    ? "opacity-60 bg-slate-50 dark:bg-slate-900/50 border-transparent" 
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:border-purple-500 hover:shadow-xl"
                }`}>
                  <CardContent className="p-4 flex items-center justify-between gap-3 w-full">
                    
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      <div className={`w-14 h-14 rounded-[14px] flex flex-col items-center justify-center shrink-0 transition-colors ${
                        caseItem.isSolved ? "bg-emerald-50 dark:bg-emerald-900/20" 
                        : caseItem.isLocked ? "bg-slate-200 dark:bg-slate-800" 
                        : "bg-purple-50 dark:bg-purple-900/30"
                      } ${caseItem.isCurrent ? "ring-2 ring-purple-400 ring-offset-2 dark:ring-offset-slate-800" : ""}`}>
                        
                        {caseItem.isSolved ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                        ) : caseItem.isLocked ? (
                          <Lock className="w-6 h-6 text-slate-400" />
                        ) : (
                          <ShieldAlert className={`w-6 h-6 text-purple-500 dark:text-purple-400 ${caseItem.isCurrent ? "animate-pulse" : ""}`} />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0 pr-2">
                        <h3 className={`font-bold text-sm sm:text-base line-clamp-2 ${caseItem.isLocked ? "text-slate-400" : "dark:text-white"}`}>
                          {index + 1}. {caseItem.title}
                        </h3>
                        <div className="mt-1.5 flex flex-wrap items-center gap-2">
                          <Badge className={`${caseItem.isLocked ? "bg-slate-200 text-slate-400 dark:bg-slate-800" : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"} border-0 px-2 py-0.5 text-[10px]`}>
                            {caseItem.xp_reward} XP
                          </Badge>
                          {caseItem.isSolved && <span className="text-[10px] font-bold text-emerald-500 uppercase">Yechilgan</span>}
                          {caseItem.isCurrent && <span className="text-[10px] font-bold text-purple-500 uppercase animate-pulse">Davom eting</span>}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center p-2 bg-slate-50 dark:bg-slate-800/50 rounded-full">
                      {!caseItem.isLocked ? (
                         <ChevronRight className="text-purple-600 w-5 h-5" />
                      ) : (
                         <Lock className="text-slate-400 w-4 h-4" />
                      )}
                    </div>

                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-800/50 rounded-[24px] border-2 border-dashed border-slate-200 dark:border-slate-700">
            <Scale className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold dark:text-white mb-2">Holatlar topilmadi</h3>
          </div>
        )}
      </div>
    </div>
  );
}

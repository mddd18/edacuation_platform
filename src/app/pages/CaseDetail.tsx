import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { supabase } from "../../lib/supabase";
import { ArrowLeft, Loader2, Scale, CheckCircle2, XCircle, Zap, ShieldCheck } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { motion } from "motion/react";

export function CaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const fetchCase = async () => {
      const { data, error } = await supabase.from('cases').select('*').eq('id', id).single();
      if (error) navigate("/cases");
      else setCaseData(data);
      setLoading(false);
    };
    fetchCase();
  }, [id, navigate]);

  const handleAnswer = async (index: number) => {
    if (showResult) return; // Allaqachon javob berilgan bo'lsa qotirib qo'yamiz
    setSelectedOption(index);
    const correct = index === caseData.correct_option;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const user = JSON.parse(savedUser);
        const { data: alreadySolved } = await supabase.from('user_case_progress').select('is_solved').eq('user_id', user.id).eq('case_id', caseData.id).single();

        if (!alreadySolved) {
          const newTotalXp = (user.xp || 0) + (caseData.xp_reward || 150);
          const newLevel = Math.floor(newTotalXp / 1000) + 1;
          
          await supabase.from('users').update({ xp: newTotalXp, level: newLevel }).eq('id', user.id);
          await supabase.from('user_case_progress').insert({ user_id: user.id, case_id: caseData.id, is_solved: true });
          
          localStorage.setItem("user", JSON.stringify({ ...user, xp: newTotalXp, level: newLevel }));
        }
      }
    }
  };

  if (loading) return <div className="min-h-[100dvh] flex items-center justify-center"><Loader2 className="animate-spin text-purple-500 w-8 h-8" /></div>;

  return (
    <div className="min-h-[100dvh] bg-slate-50 dark:bg-slate-950 pb-24 overflow-x-hidden w-full">
      <div className="p-3 md:p-4 border-b dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <button onClick={() => navigate("/cases")} className="flex items-center gap-1.5 md:gap-2 text-sm md:text-base font-bold text-slate-500 hover:text-purple-500 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Orqaga
        </button>
      </div>

      <main className="max-w-3xl mx-auto px-4 mt-5 md:mt-8 w-full space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded-full font-bold text-xs mb-4 uppercase tracking-widest">
            <Scale className="w-4 h-4" /> Vaziyat
          </div>
          <h1 className="text-2xl md:text-4xl font-black dark:text-white mb-6 leading-tight break-words">
            {caseData.title}
          </h1>
          
          <div className="bg-white dark:bg-slate-900 p-5 md:p-8 rounded-[24px] border-l-4 border-l-purple-500 border-slate-200 dark:border-slate-800 shadow-sm text-sm sm:text-base md:text-lg leading-relaxed dark:text-slate-300 whitespace-pre-wrap break-words italic">
            "{caseData.scenario}"
          </div>
        </motion.div>

        <div className="space-y-3 w-full">
          <h3 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] md:text-xs ml-1">Qanday qaror qabul qilasiz?</h3>
          {caseData.options.map((opt: string, i: number) => {
            const isSelected = selectedOption === i;
            const isCorrectOpt = i === caseData.correct_option;
            
            let btnClass = "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200";
            if (showResult) {
              if (isCorrectOpt) btnClass = "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300";
              else if (isSelected && !isCorrectOpt) btnClass = "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300";
              else btnClass = "border-slate-100 dark:border-slate-800 opacity-50"; // Boshqa variantlarni xiralashtiramiz
            } else {
              btnClass += " hover:border-purple-500";
            }

            return (
              <button 
                key={i} 
                onClick={() => handleAnswer(i)} 
                disabled={showResult}
                className={`w-full p-4 md:p-5 rounded-[16px] md:rounded-2xl border-2 text-left text-sm md:text-base font-bold transition-all flex items-center justify-between gap-3 ${btnClass}`}
              >
                <span className="leading-snug flex-1 break-words">{opt}</span>
                {showResult && isCorrectOpt && <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />}
                {showResult && isSelected && !isCorrectOpt && <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Natija va Tushuntirish qismi */}
        {showResult && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-4 pb-10">
            <Card className={`border-0 shadow-2xl rounded-[24px] overflow-hidden ${isCorrect ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-slate-800 to-slate-900'}`}>
              <CardContent className="p-6 md:p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  {isCorrect ? <ShieldCheck className="w-8 h-8 text-yellow-300" /> : <AlertCircle className="w-8 h-8 text-red-400" />}
                  <h2 className="text-xl md:text-2xl font-black">
                    {isCorrect ? "To'g'ri qaror!" : "Xato qildingiz"}
                  </h2>
                </div>
                <p className="text-sm md:text-base text-white/90 leading-relaxed font-medium mb-6">
                  {caseData.explanation}
                </p>
                {isCorrect ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full font-black text-sm">
                    <Zap className="w-4 h-4 text-yellow-300" /> +{caseData.xp_reward} XP olindi
                  </div>
                ) : (
                  <Button onClick={() => { setShowResult(false); setSelectedOption(null); setIsCorrect(null); }} variant="secondary" className="bg-white/10 hover:bg-white/20 border-0 text-white rounded-xl">
                    Qayta urinib ko'rish
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  );
}

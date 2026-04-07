import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { 
  Users, TrendingUp, CheckCircle2, AlertCircle, 
  Clock, ShieldQuestion, Loader2, Award, Swords
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Dashboard() {
  const [poll, setPoll] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userVote, setUserVote] = useState<string | null>(null);
  const [stats, setStats] = useState({ votesA: 0, votesB: 0, total: 0 });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPollData();
  }, []);

  const fetchPollData = async () => {
    setLoading(true);
    const savedUser = localStorage.getItem("user");
    if (!savedUser) return;
    const user = JSON.parse(savedUser);

    // Faol so'rovnomani tortish
    const { data: activePoll } = await supabase
      .from('weekly_polls')
      .select('*')
      .eq('is_active', true)
      .single();

    if (activePoll) {
      setPoll(activePoll);

      // Barcha ovozlarni tortish
      const { data: votes } = await supabase
        .from('poll_votes')
        .select('*')
        .eq('poll_id', activePoll.id);

      if (votes) {
        // Foydalanuvchi ovoz berganligini tekshirish
        const myVote = votes.find(v => v.user_id === user.id);
        if (myVote) setUserVote(myVote.chosen_option);

        // Statistikani hisoblash
        const vA = votes.filter(v => v.chosen_option === 'A').length;
        const vB = votes.filter(v => v.chosen_option === 'B').length;
        setStats({ votesA: vA, votesB: vB, total: votes.length });
      }
    }
    setLoading(false);
  };

  const handleVote = async (option: 'A' | 'B') => {
    if (userVote || submitting) return;
    setSubmitting(true);

    const savedUser = localStorage.getItem("user");
    if (!savedUser || !poll) return;
    const user = JSON.parse(savedUser);

    // 1. Ovozni bazaga yozish
    await supabase.from('poll_votes').insert({
      poll_id: poll.id,
      user_id: user.id,
      chosen_option: option
    });

    // 2. XP berish (+50 XP ovoz bergani uchun)
    const newXp = (user.xp || 0) + 50;
    const newLevel = Math.floor(newXp / 1000) + 1;
    await supabase.from('users').update({ xp: newXp, level: newLevel }).eq('id', user.id);
    localStorage.setItem("user", JSON.stringify({ ...user, xp: newXp, level: newLevel }));

    // 3. Ekranni yangilash
    setUserVote(option);
    setStats(prev => ({
      ...prev,
      votesA: option === 'A' ? prev.votesA + 1 : prev.votesA,
      votesB: option === 'B' ? prev.votesB + 1 : prev.votesB,
      total: prev.total + 1
    }));
    setSubmitting(false);
  };

  if (loading) return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
    </div>
  );

  if (!poll) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
      <ShieldQuestion className="w-20 h-20 text-slate-300 dark:text-slate-700 mb-4" />
      <h2 className="text-2xl font-bold dark:text-white">So'rovnoma mavjud emas</h2>
      <p className="text-slate-500">Tez orada yangi haftalik dilemma qo'shiladi.</p>
    </div>
  );

  const percentA = stats.total > 0 ? Math.round((stats.votesA / stats.total) * 100) : 0;
  const percentB = stats.total > 0 ? Math.round((stats.votesB / stats.total) * 100) : 0;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto min-h-screen bg-slate-50 dark:bg-slate-950 pb-28">
      
      {/* Tepa qism - Sarlavha */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 mt-4">
        <Badge className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 mb-4 px-4 py-1.5 font-black uppercase tracking-widest border-0">
          <Clock className="w-4 h-4 mr-2 inline" /> Hafta Dilemmasi
        </Badge>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4 leading-tight">
          Sizning fikringiz qanday?
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          Har hafta yangi bahsli mavzu. O'z pozitsiyangizni tanlang, ovoz bering va ko'pchilik qanday fikrda ekanligini bilib oling!
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
        <Card className="border-0 shadow-2xl bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
          
          <CardContent className="p-6 md:p-10">
            {/* Savol va Tushuntirish */}
            <div className="mb-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold dark:text-white mb-4 leading-snug">
                {poll.question}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg">
                {poll.description}
              </p>
            </div>

            {/* OVOZ BERISH YOKI NATIJALARNI KO'RSATISH */}
            <AnimatePresence mode="wait">
              {!userVote ? (
                // OVOZ BERISH TUGMALARI
                <motion.div 
                  key="vote-buttons"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 relative"
                >
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-slate-900 rounded-full items-center justify-center z-10 font-black text-slate-400">
                    YOKI
                  </div>
                  
                  <Button 
                    onClick={() => handleVote('A')} disabled={submitting}
                    className="h-auto py-8 rounded-[24px] bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-600 text-blue-600 dark:text-blue-400 hover:text-white border-2 border-blue-200 dark:border-blue-800 transition-all group flex flex-col items-center gap-3"
                  >
                    <span className="text-xl md:text-2xl font-bold text-center whitespace-normal">{poll.option_a}</span>
                    <span className="text-sm font-semibold opacity-70 group-hover:opacity-100 transition-opacity">Shu variantni tanlash</span>
                  </Button>

                  <Button 
                    onClick={() => handleVote('B')} disabled={submitting}
                    className="h-auto py-8 rounded-[24px] bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-600 text-purple-600 dark:text-purple-400 hover:text-white border-2 border-purple-200 dark:border-purple-800 transition-all group flex flex-col items-center gap-3"
                  >
                    <span className="text-xl md:text-2xl font-bold text-center whitespace-normal">{poll.option_b}</span>
                    <span className="text-sm font-semibold opacity-70 group-hover:opacity-100 transition-opacity">Shu variantni tanlash</span>
                  </Button>
                </motion.div>
              ) : (
                // NATIJALAR BARLARI (PROGRESS)
                <motion.div 
                  key="vote-results"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-center gap-2 mb-8 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 py-3 rounded-xl font-bold">
                    <CheckCircle2 className="w-5 h-5" /> Ovoz berganingiz uchun +50 XP berildi!
                  </div>

                  {/* Variant A Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className={`font-bold ${userVote === 'A' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`}>
                        {poll.option_a} {userVote === 'A' && '(Sizning tanlovingiz)'}
                      </span>
                      <span className="font-black text-xl text-blue-600 dark:text-blue-400">{percentA}%</span>
                    </div>
                    <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${percentA}%` }} transition={{ duration: 1, ease: "easeOut" }} className="h-full bg-blue-500 rounded-full" />
                    </div>
                  </div>

                  {/* Variant B Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className={`font-bold ${userVote === 'B' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-700 dark:text-slate-300'}`}>
                        {poll.option_b} {userVote === 'B' && '(Sizning tanlovingiz)'}
                      </span>
                      <span className="font-black text-xl text-purple-600 dark:text-purple-400">{percentB}%</span>
                    </div>
                    <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${percentB}%` }} transition={{ duration: 1, ease: "easeOut" }} className="h-full bg-purple-500 rounded-full" />
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-slate-500 text-sm font-bold">
                    <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> Jami: {stats.total} ovoz</span>
                    <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> Jonli natija</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

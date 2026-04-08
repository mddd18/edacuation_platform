import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  Users, TrendingUp, CheckCircle2, ShieldQuestion, 
  Loader2, Zap, Flame, Trophy, LayoutDashboard, Clock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- TARJIMALAR LUG'ATI ---
const dict = {
  UZ: {
    dashboard: "Asosiy Panel",
    welcome: "Xush kelibsiz",
    whatToLearn: "Bugun nimalarni o'rganamiz?",
    level: "Daraja",
    totalXp: "Jami XP",
    streak: "Seriya",
    weeklyDilemma: "Hafta Dilemmasi",
    yourOpinion: "Sizning fikringiz qanday?",
    dilemmaDesc: "Har hafta yangi bahsli mavzu. O'z pozitsiyangizni tanlang, ovoz bering va ko'pchilik qanday fikrda ekanligini bilib oling!",
    or: "YOKI",
    chooseOption: "Shu variantni tanlash",
    voteReward: "Fikringiz qabul qilindi (+50 XP)",
    totalVotes: "Jami",
    votesStr: "ovoz",
    liveResult: "Jonli natija",
    pollSoon: "So'rovnoma tez orada",
    pollSoonDesc: "Yangi haftalik bahsli mavzu hali kiritilmagan.",
    lawyer: "Huquqshunos"
  },
  QQ: {
    dashboard: "Tiykarǵı Panel",
    welcome: "Xosh kelipsiz",
    whatToLearn: "Búgin nelerdi úyrenemiz?",
    level: "Dáreje",
    totalXp: "Jami XP",
    streak: "Seriya",
    weeklyDilemma: "Hápte Dilemması",
    yourOpinion: "Siziń pikirińiz qanday?",
    dilemmaDesc: "Hár hápte jańa tartıslı tema. Óz poziciyańızdı tańlań, dawıs beriń hám kópshilik qanday pikirde ekenin bilip alıń!",
    or: "YAKI",
    chooseOption: "Usı varianttı tańlaw",
    voteReward: "Pikirińiz qabıl etildi (+50 XP)",
    totalVotes: "Jami",
    votesStr: "dawıs",
    liveResult: "Janlı nátiyje",
    pollSoon: "Sorawnama tez arada",
    pollSoonDesc: "Jańa háptelik tartıslı tema ele kirgizilmegen.",
    lawyer: "Huquqtanıwshı"
  }
};

export function Dashboard() {
  const [userData, setUserData] = useState<any>(null);
  const [poll, setPoll] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userVote, setUserVote] = useState<string | null>(null);
  const [stats, setStats] = useState({ votesA: 0, votesB: 0, total: 0 });
  const [submitting, setSubmitting] = useState(false);
  
  // TIL STATI
  const [lang, setLang] = useState<'UZ' | 'QQ'>('UZ');

  useEffect(() => {
    // Xotiradan tilni o'qib olish
    const savedLang = localStorage.getItem('appLang') as 'UZ' | 'QQ';
    if (savedLang) setLang(savedLang);

    const fetchDashboardData = async () => {
      setLoading(true);
      const savedUser = localStorage.getItem("user");
      if (!savedUser) return;
      const user = JSON.parse(savedUser);

      const { data: dbUser } = await supabase.from('users').select('*').eq('id', user.id).single();
      if (dbUser) setUserData(dbUser);

      const { data: activePoll } = await supabase.from('weekly_polls').select('*').eq('is_active', true).single();

      if (activePoll) {
        setPoll(activePoll);
        const { data: votes } = await supabase.from('poll_votes').select('*').eq('poll_id', activePoll.id);

        if (votes) {
          const myVote = votes.find(v => v.user_id === user.id);
          if (myVote) setUserVote(myVote.chosen_option);

          const vA = votes.filter(v => v.chosen_option === 'A').length;
          const vB = votes.filter(v => v.chosen_option === 'B').length;
          setStats({ votesA: vA, votesB: vB, total: votes.length });
        }
      }
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  const handleVote = async (option: 'A' | 'B') => {
    if (userVote || submitting) return;
    setSubmitting(true);

    const savedUser = localStorage.getItem("user");
    if (!savedUser || !poll) return;
    const user = JSON.parse(savedUser);

    await supabase.from('poll_votes').insert({ poll_id: poll.id, user_id: user.id, chosen_option: option });

    const newXp = (user.xp || 0) + 50;
    const newLevel = Math.floor(newXp / 1000) + 1;
    await supabase.from('users').update({ xp: newXp, level: newLevel }).eq('id', user.id);
    localStorage.setItem("user", JSON.stringify({ ...user, xp: newXp, level: newLevel }));
    
    setUserData((prev: any) => ({ ...prev, xp: newXp, level: newLevel }));
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

  const percentA = stats.total > 0 ? Math.round((stats.votesA / stats.total) * 100) : 0;
  const percentB = stats.total > 0 ? Math.round((stats.votesB / stats.total) * 100) : 0;
  
  const t = dict[lang]; // Joriy til lug'ati

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto min-h-screen bg-slate-50 dark:bg-slate-950 pb-28 w-full overflow-x-hidden">
      
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 mt-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">{t.dashboard}</h1>
        </div>
        <p className="text-sm md:text-base font-bold text-slate-500 dark:text-slate-400 mt-1">
          {t.welcome}, <span className="text-indigo-600 dark:text-indigo-400">{userData?.first_name || t.lawyer}</span>! {t.whatToLearn}
        </p>

        <div className="grid grid-cols-3 gap-3 md:gap-5 mt-6">
          <Card className="border-0 shadow-md bg-white dark:bg-slate-900 rounded-[20px]">
            <CardContent className="p-4 md:p-5 flex flex-col items-center justify-center text-center">
              <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-full mb-2">
                <Trophy className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">{t.level}</p>
              <p className="text-xl md:text-2xl font-black text-slate-800 dark:text-white">{userData?.level || 1}</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-white dark:bg-slate-900 rounded-[20px]">
            <CardContent className="p-4 md:p-5 flex flex-col items-center justify-center text-center">
              <div className="p-2.5 bg-amber-50 dark:bg-amber-900/20 text-amber-500 rounded-full mb-2">
                <Zap className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">{t.totalXp}</p>
              <p className="text-xl md:text-2xl font-black text-slate-800 dark:text-white">{userData?.xp || 0}</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-white dark:bg-slate-900 rounded-[20px]">
            <CardContent className="p-4 md:p-5 flex flex-col items-center justify-center text-center">
              <div className="p-2.5 bg-orange-50 dark:bg-orange-900/20 text-orange-500 rounded-full mb-2">
                <Flame className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">{t.streak}</p>
              <p className="text-xl md:text-2xl font-black text-slate-800 dark:text-white">{userData?.streak || 0}</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {poll ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center gap-2 mb-4 px-2">
            <Clock className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg md:text-xl font-black text-slate-800 dark:text-white">{t.weeklyDilemma}</h2>
          </div>
          <Card className="border-0 shadow-2xl bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            
            <CardContent className="p-6 md:p-10">
              <div className="mb-10 text-center">
                <h3 className="text-xl md:text-3xl font-bold dark:text-white mb-4 leading-snug break-words">
                  {poll.question}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-2xl mx-auto break-words">
                  {poll.description}
                </p>
              </div>

              <AnimatePresence mode="wait">
                {!userVote ? (
                  <motion.div key="vote-buttons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-full items-center justify-center z-10 font-black text-slate-300 text-xs">{t.or}</div>
                    
                    <Button onClick={() => handleVote('A')} disabled={submitting} className="h-auto py-6 md:py-8 rounded-[24px] bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-600 text-blue-600 dark:text-blue-400 hover:text-white border-2 border-blue-200 dark:border-blue-800 transition-all flex flex-col items-center gap-2">
                      <span className="text-lg md:text-xl font-bold text-center whitespace-normal">{poll.option_a}</span>
                    </Button>

                    <Button onClick={() => handleVote('B')} disabled={submitting} className="h-auto py-6 md:py-8 rounded-[24px] bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-600 text-purple-600 dark:text-purple-400 hover:text-white border-2 border-purple-200 dark:border-purple-800 transition-all flex flex-col items-center gap-2">
                      <span className="text-lg md:text-xl font-bold text-center whitespace-normal">{poll.option_b}</span>
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div key="vote-results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="flex items-center justify-center gap-2 mb-6 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 py-2.5 rounded-xl font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5" /> {t.voteReward}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-end text-sm md:text-base">
                        <span className={`font-bold ${userVote === 'A' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`}>
                          {poll.option_a} {userVote === 'A' && '✓'}
                        </span>
                        <span className="font-black text-lg text-blue-600 dark:text-blue-400">{percentA}%</span>
                      </div>
                      <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${percentA}%` }} transition={{ duration: 1 }} className="h-full bg-blue-500 rounded-full" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-end text-sm md:text-base">
                        <span className={`font-bold ${userVote === 'B' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-600 dark:text-slate-400'}`}>
                          {poll.option_b} {userVote === 'B' && '✓'}
                        </span>
                        <span className="font-black text-lg text-purple-600 dark:text-purple-400">{percentB}%</span>
                      </div>
                      <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${percentB}%` }} transition={{ duration: 1 }} className="h-full bg-purple-500 rounded-full" />
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-4 mt-8 pt-5 border-t border-slate-100 dark:border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {t.totalVotes}: {stats.total} {t.votesStr}</span>
                      <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> {t.liveResult}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="bg-slate-100 dark:bg-slate-800/50 p-10 rounded-[32px] text-center border-2 border-dashed border-slate-200 dark:border-slate-700">
           <ShieldQuestion className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
           <h3 className="text-xl font-bold dark:text-white mb-2">{t.pollSoon}</h3>
           <p className="text-slate-500">{t.pollSoonDesc}</p>
        </div>
      )}

    </div>
  );
}

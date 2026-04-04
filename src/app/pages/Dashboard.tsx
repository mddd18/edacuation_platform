import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { 
  TrendingUp, 
  Flame,
  CheckCircle2,
  Sparkles,
  Zap,
  BookOpen,
  Scale,
  Award,
  Loader2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "../../lib/supabase";

export function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [weeklyDilemma, setWeeklyDilemma] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [userChoice, setUserChoice] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        
        // 1. Foydalanuvchi va Haftalik savolni parallel yuklaymiz
        const [userRes, dilemmaRes] = await Promise.all([
          supabase.from('users').select('*').eq('id', parsedUser.id).single(),
          supabase.from('weekly_dilemmas').select('*').order('created_at', { ascending: false }).limit(1).single()
        ]);

        if (userRes.data) setUser(userRes.data);
        if (dilemmaRes.data) {
          setWeeklyDilemma(dilemmaRes.data);
          // Ovoz berganini tekshirish (LocalStorage orqali)
          const voted = localStorage.getItem(`voted_week_${dilemmaRes.data.id}`);
          if (voted) {
            setHasVoted(true);
            setUserChoice(voted);
          }
        }
      }
      setLoading(false);
    };

    loadDashboardData();
  }, []);

  const handleVote = async (choice: string) => {
    if (hasVoted || !weeklyDilemma) return;

    setHasVoted(true);
    setUserChoice(choice);
    localStorage.setItem(`voted_week_${weeklyDilemma.id}`, choice);

    // Agar javob to'g'ri bo'lsa, XP qo'shamiz
    if (choice === weeklyDilemma.correct_option) {
      const newXp = user.xp + (weeklyDilemma.xp_reward || 100);
      const { error } = await supabase
        .from('users')
        .update({ xp: newXp })
        .eq('id', user.id);

      if (!error) {
        setUser({ ...user, xp: newXp });
      }
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
    </div>
  );

  if (!user) return null;

  const xpToNextLevel = user.level * 1000;
  const progressPercentage = (user.xp / xpToNextLevel) * 100;

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto min-h-screen bg-slate-50/50 dark:bg-slate-900 transition-colors duration-300">
      
      {/* Header */}
      <motion.div className="mb-6 md:mb-10" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-4xl mb-2 font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
          Salom, {user.first_name}!
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Sizda hozir {user.xp} XP bor. Keyingi darajaga intiling!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          
          {/* HAFTALIK MUAMMO SEKSIYASI */}
          {weeklyDilemma && (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className="border-0 shadow-2xl overflow-hidden bg-white dark:bg-slate-800 rounded-3xl">
                <div className="h-2 bg-gradient-to-r from-purple-500 to-blue-500" />
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className="mb-2 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-0">Hafta savoli</Badge>
                      <CardTitle className="text-2xl font-bold dark:text-white">{weeklyDilemma.title}</CardTitle>
                    </div>
                    <Scale className="w-8 h-8 text-slate-300" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                    {weeklyDilemma.scenario}
                  </div>

                  <div className="grid gap-4">
                    {!hasVoted ? (
                      <>
                        <DilemmaButton label="A" text={weeklyDilemma.option_a} onClick={() => handleVote('A')} />
                        <DilemmaButton label="B" text={weeklyDilemma.option_b} onClick={() => handleVote('B')} />
                      </>
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-6 rounded-2xl border-2 ${userChoice === weeklyDilemma.correct_option ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20'}`}>
                        <div className="flex items-center gap-3 mb-3">
                          {userChoice === weeklyDilemma.correct_option ? <CheckCircle2 className="text-green-500 w-6 h-6" /> : <AlertCircle className="text-red-500 w-6 h-6" />}
                          <h4 className="font-bold text-xl dark:text-white">
                            {userChoice === weeklyDilemma.correct_option ? "To'g'ri topdingiz!" : "Noto'g'ri javob"}
                          </h4>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic mb-4">"{weeklyDilemma.explanation}"</p>
                        <div className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400">
                          <Zap className="w-4 h-4 fill-current" /> {userChoice === weeklyDilemma.correct_option ? `+${weeklyDilemma.xp_reward} XP qo'shildi` : "XP qo'shilmadi"}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Statistika */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatItem icon={BookOpen} label="Darslar" value="0" color="indigo" />
            <StatItem icon={Scale} label="Holatlar" value="0" color="purple" />
            <StatItem icon={Award} label="XP Ball" value={user.xp} color="pink" />
          </div>
        </div>

        {/* O'ng Panel */}
        <div className="space-y-6">
          <Card className="border-0 shadow-xl text-white overflow-hidden" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}>
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-lg rounded-full mb-4 border-2 border-white/30 shadow-2xl">
                <span className="text-5xl font-black">{user.level}</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">{user.level}-Daraja</h3>
              <p className="text-indigo-100 text-sm mb-6 opacity-80">{user.grade}-sinf o'quvchisi</p>
              
              <div className="space-y-2 bg-black/20 p-4 rounded-2xl border border-white/10 text-left">
                <div className="flex justify-between text-xs font-bold">
                  <span>{user.xp} XP</span>
                  <span>{xpToNextLevel} XP</span>
                </div>
                <Progress value={progressPercentage} className="h-2 bg-white/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 p-6 flex items-center gap-5">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-2xl">
              <Flame className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <p className="text-3xl font-black dark:text-white">{user.streak || 0} Kun</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Seriya 🔥</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Yordamchi komponentlar
function DilemmaButton({ label, text, onClick }: any) {
  return (
    <button onClick={onClick} className="w-full text-left p-5 rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group">
      <span className="block text-blue-600 dark:text-blue-400 font-black text-sm mb-1">{label} VARIANT</span>
      <span className="text-slate-700 dark:text-slate-200 font-medium">{text}</span>
    </button>
  );
}

function StatItem({ icon: Icon, label, value, color }: any) {
  const colors: any = {
    indigo: "bg-indigo-50 text-indigo-600",
    purple: "bg-purple-50 text-purple-600",
    pink: "bg-pink-50 text-pink-600"
  };
  return (
    <Card className="border-0 shadow-md bg-white dark:bg-slate-800 p-4 flex items-center gap-4">
      <div className={`p-3 rounded-xl ${colors[color] || ""}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase">{label}</p>
        <p className="text-xl font-black dark:text-white">{value}</p>
      </div>
    </Card>
  );
}

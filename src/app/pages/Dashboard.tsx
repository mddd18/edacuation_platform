import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
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
  AlertCircle,
  ChevronRight
} from "lucide-react";
import { motion } from "motion/react";
import { supabase } from "../../lib/supabase";

export function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [weeklyDilemma, setWeeklyDilemma] = useState<any>(null);
  const [stats, setStats] = useState({ lessons: 0, cases: 0 });
  const [loading, setLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [userChoice, setUserChoice] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        
        const [userRes, dilemmaRes, progressRes] = await Promise.all([
          supabase.from('users').select('*').eq('id', parsedUser.id).single(),
          supabase.from('weekly_dilemmas').select('*').order('created_at', { ascending: false }).limit(1).single(),
          supabase.from('user_progress').select('lesson_id').eq('user_id', parsedUser.id).eq('is_completed', true)
        ]);

        if (userRes.data) setUser(userRes.data);
        if (progressRes.data) setStats({ lessons: progressRes.data.length, cases: 0 });
        
        if (dilemmaRes.data) {
          setWeeklyDilemma(dilemmaRes.data);
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

    if (choice === weeklyDilemma.correct_option) {
      const newXp = (user.xp || 0) + (weeklyDilemma.xp_reward || 100);
      const newLevel = Math.floor(newXp / 1000) + 1;

      const { error } = await supabase
        .from('users')
        .update({ xp: newXp, level: newLevel })
        .eq('id', user.id);

      if (!error) {
        setUser({ ...user, xp: newXp, level: newLevel });
      }
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
    </div>
  );

  if (!user) return null;

  // DINAMIK DARAJA HISOBI
  const currentLevel = Math.floor((user.xp || 0) / 1000) + 1;
  const xpInCurrentLevel = (user.xp || 0) % 1000;
  const progressPercentage = (xpInCurrentLevel / 1000) * 100;

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto min-h-screen bg-slate-50/50 dark:bg-slate-900 transition-colors duration-300">
      
      {/* Header Section */}
      <motion.div 
        className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
            Salom, {user.first_name}! 👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold mt-2 text-lg">
            Bugun huquq olamida nimalarni o'rganamiz?
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="bg-amber-100 p-2 rounded-xl text-amber-600">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jami Ball</p>
            <p className="text-xl font-black dark:text-white">{user.xp} XP</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Side: Weekly Challenge */}
        <div className="xl:col-span-2 space-y-8">
          
          {weeklyDilemma && (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className="border-0 shadow-2xl overflow-hidden bg-white dark:bg-slate-800 rounded-[32px] border-b-8 border-indigo-500">
                <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
                  <div className="space-y-1">
                    <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400 px-4 py-1.5 rounded-full border-0 font-bold">
                      Haftalik Bahs
                    </Badge>
                    <CardTitle className="text-2xl md:text-3xl font-black dark:text-white">
                      {weeklyDilemma.title}
                    </CardTitle>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-2xl">
                    <Scale className="w-8 h-8 text-indigo-500" />
                  </div>
                </CardHeader>

                <CardContent className="p-8 pt-0 space-y-8">
                  <div className="p-6 rounded-[24px] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-lg leading-relaxed font-medium">
                    {weeklyDilemma.scenario}
                  </div>

                  <div className="grid gap-4">
                    {!hasVoted ? (
                      <>
                        <DilemmaButton label="A" text={weeklyDilemma.option_a} onClick={() => handleVote('A')} color="blue" />
                        <DilemmaButton label="B" text={weeklyDilemma.option_b} onClick={() => handleVote('B')} color="indigo" />
                      </>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className={`p-8 rounded-[28px] border-2 ${userChoice === weeklyDilemma.correct_option ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : 'border-red-500 bg-red-50 dark:bg-red-900/10'}`}
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`p-2 rounded-full ${userChoice === weeklyDilemma.correct_option ? 'bg-green-500' : 'bg-red-500'}`}>
                            {userChoice === weeklyDilemma.correct_option ? <CheckCircle2 className="text-white w-6 h-6" /> : <AlertCircle className="text-white w-6 h-6" />}
                          </div>
                          <h4 className="font-black text-2xl dark:text-white">
                            {userChoice === weeklyDilemma.correct_option ? "To'g'ri topdingiz!" : "Noto'g'ri javob"}
                          </h4>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed italic mb-6 font-medium">
                          "{weeklyDilemma.explanation}"
                        </p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-100 dark:border-slate-700 text-sm font-black text-blue-600">
                          <Zap className="w-4 h-4 fill-current" /> {userChoice === weeklyDilemma.correct_option ? `+${weeklyDilemma.xp_reward} XP to'plandi` : "Keyingi safar omad!"}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatItem icon={BookOpen} label="Tugatilgan darslar" value={stats.lessons} color="blue" />
            <StatItem icon={Scale} label="Yechilgan holatlar" value={stats.cases} color="purple" />
            <StatItem icon={Award} label="Hozirgi ballingiz" value={user.xp} color="pink" />
          </div>
        </div>

        {/* Right Side: Level & Progress */}
        <div className="space-y-6">
          <Card className="border-0 shadow-2xl text-white overflow-hidden rounded-[40px] relative" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
            <CardContent className="p-10 text-center relative z-10">
              <div className="relative inline-flex mb-6">
                 <div className="w-32 h-32 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border-4 border-white/40 shadow-2xl">
                    <span className="text-6xl font-black">{currentLevel}</span>
                 </div>
                 <div className="absolute -bottom-2 -right-2 bg-yellow-400 p-3 rounded-2xl shadow-lg border-4 border-indigo-600">
                    <Sparkles className="w-6 h-6 text-indigo-900" />
                 </div>
              </div>
              <h3 className="text-3xl font-black mb-1 tracking-tight">{currentLevel}-Daraja</h3>
              <p className="text-indigo-100 font-bold mb-8 uppercase tracking-[0.2em] text-xs opacity-80">{user.grade}-sinf o'quvchisi</p>
              
              <div className="space-y-4 bg-black/20 p-6 rounded-[32px] border border-white/10 text-left backdrop-blur-sm">
                <div className="flex justify-between text-xs font-black uppercase">
                  <span>{xpInCurrentLevel} XP</span>
                  <span>1000 XP</span>
                </div>
                <Progress value={progressPercentage} className="h-4 bg-white/20" />
                <p className="text-[11px] font-black text-center text-white/60 tracking-wider">
                  KEYINGI DARAJA UCHUN YANA {1000 - xpInCurrentLevel} XP KERAK
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Streak Card */}
          <Card className="border-0 shadow-xl bg-white dark:bg-slate-800 p-8 flex items-center gap-6 rounded-[32px]">
            <div className="bg-orange-100 dark:bg-orange-950 p-5 rounded-[24px] shadow-inner">
              <Flame className="w-10 h-10 text-orange-600 animate-pulse" />
            </div>
            <div>
              <p className="text-4xl font-black dark:text-white leading-none">{user.streak || 0}</p>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-2">KUNLIK SERIYA 🔥</p>
            </div>
          </Card>

          {/* Practice Banner */}
          <Link to="/lessons" className="block group">
            <Card className="border-0 bg-slate-900 text-white p-6 rounded-[32px] overflow-hidden relative">
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h4 className="font-black text-xl mb-1">Darslarni davom ettir</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Yangi mavzular ochiq</p>
                </div>
                <div className="bg-blue-600 p-3 rounded-2xl group-hover:translate-x-2 transition-transform">
                  <ChevronRight className="w-6 h-6" />
                </div>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 blur-3xl rounded-full" />
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Sub-components with better UI
function DilemmaButton({ label, text, onClick, color }: any) {
  const accent = color === 'blue' ? 'text-blue-600 border-blue-100' : 'text-indigo-600 border-indigo-100';
  return (
    <button 
      onClick={onClick} 
      className="w-full text-left p-6 rounded-[24px] border-2 border-slate-100 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-all flex items-center justify-between group"
    >
      <div>
        <span className={`block font-black text-xs uppercase mb-1 tracking-widest opacity-70 ${accent}`}>{label} VARIANT</span>
        <span className="text-slate-800 dark:text-slate-200 font-bold text-lg">{text}</span>
      </div>
      <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-indigo-500 transition-all group-hover:translate-x-1" />
    </button>
  );
}

function StatItem({ icon: Icon, label, value, color }: any) {
  const colorMap: any = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/30",
    purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/30",
    pink: "bg-pink-50 text-pink-600 dark:bg-pink-900/30"
  };
  return (
    <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 p-6 rounded-[28px] hover:-translate-y-1 transition-transform">
      <div className="flex items-center gap-5">
        <div className={`p-4 rounded-2xl ${colorMap[color]}`}>
          <Icon className="w-7 h-7" />
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
          <p className="text-2xl font-black dark:text-white leading-none">{value}</p>
        </div>
      </div>
    </Card>
  );
}

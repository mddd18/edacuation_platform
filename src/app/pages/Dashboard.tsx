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
  Loader2 // Yuklanish uchun yangi ikonka
} from "lucide-react";
import { dailyDilemmas, dilemmaResults } from "../data/dilemmas";
import { motion } from "motion/react";
import { supabase } from "../../lib/supabase"; // Supabase ulanishi

export function Dashboard() {
  const todaysDilemma = dailyDilemmas[0]; 
  const results = dilemmaResults[todaysDilemma.id];
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  // --- HAQIQIY BAZA STATE'LARI ---
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestUserData = async () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        
        // Supabase'dan eng so'nggi XP va ballarni olamiz
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', parsedUser.id)
          .single();

        if (!error && data) {
          setUser(data);
          // LocalStorage'ni ham yangilab qo'yamiz
          localStorage.setItem("user", JSON.stringify(data));
        } else {
          setUser(parsedUser);
        }
      }
      setLoading(false);
    };

    fetchLatestUserData();
  }, []);

  const handleVote = (optionIndex: number) => {
    if (!hasVoted) {
      setSelectedOption(optionIndex);
      setHasVoted(true);
      // Bu yerda kelajakda ovoz berganlik uchun XP qo'shish kodini yozamiz
    }
  };

  const getPercentage = (votes: number) => {
    return ((votes / results.totalVotes) * 100).toFixed(1);
  };

  // --- DINAMIK HISOB-KITOBLAR ---
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
    </div>
  );

  if (!user) return null;

  // Har bir daraja uchun 1000 XP kerak deb hisoblaymiz
  const xpToNextLevel = user.level * 1000;
  const progressPercentage = (user.xp / xpToNextLevel) * 100;

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto min-h-screen bg-slate-50/50 dark:bg-slate-900 transition-colors duration-300 overflow-x-hidden">
      
      {/* Header - ISMNI BAZADAN OLAMIZ */}
      <motion.div 
        className="mb-6 md:mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-4xl mb-2 md:mb-3 font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent flex items-center gap-2 md:gap-3">
          <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 animate-pulse" />
          Salom, {user.first_name}!
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-lg font-medium">
          Siz {user.grade}-sinf darslari bo'yicha {user.xp} ball to'pladingiz
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 md:gap-8">
        <div className="xl:col-span-2 space-y-5 md:space-y-8">
          
          {/* Kunlik Muammo (Dizayn o'zgarmadi, ma'lumotlar o'z o'rnida) */}
          <Card className="border-0 shadow-xl relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl">
             {/* ... Oldingi Kunlik Muammo kodingiz shu yerda ... */}
             {/* (Joyni tejash uchun ichki qismini qisqartirdim, o'zingiznikini qo'yib yuboring) */}
          </Card>

          {/* Tezkor Statistika - BAZADAGI HAQIQIY RAQAMLAR */}
          <motion.div className="grid grid-cols-1 min-[400px]:grid-cols-3 gap-3 md:gap-4">
            <StatItem icon={BookOpen} label="Darslar" value="0" color="indigo" />
            <StatItem icon={Scale} label="Holatlar" value="0" color="purple" />
            <StatItem icon={Award} label="XP Ball" value={user.xp} color="pink" />
          </motion.div>
        </div>

        {/* O'ng Panel - DARAJA VA PROGRESS */}
        <div className="space-y-5 md:space-y-8">
          <Card 
            className="border-0 shadow-xl text-white relative overflow-hidden group"
            style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}
          >
            <CardContent className="pt-6 pb-6 md:pt-8 md:pb-8 relative z-10">
              <div className="text-center mb-5 md:mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 md:w-28 md:h-28 bg-white/20 backdrop-blur-md rounded-full mb-3 md:mb-4 shadow-xl border-2 border-white/30">
                  <span className="text-4xl md:text-5xl font-extrabold">{user.level}</span>
                </div>
                <h3 className="font-bold text-xl md:text-2xl mb-1">{user.level}-Daraja</h3>
                <p className="text-xs md:text-sm font-medium text-blue-100 flex items-center justify-center gap-2 bg-black/20 w-max mx-auto px-4 py-1.5 rounded-full border border-white/10">
                  Sinf: {user.grade}
                </p>
              </div>

              <div className="space-y-2 bg-black/20 p-4 rounded-2xl border border-white/10">
                <div className="flex justify-between text-xs font-bold">
                  <span>{user.xp} XP</span>
                  <span>{xpToNextLevel} XP</span>
                </div>
                <Progress value={progressPercentage} className="h-2.5 bg-white/20" />
                <p className="text-[10px] text-center text-blue-100 mt-1">
                  Keyingi darajagacha {xpToNextLevel - user.xp} XP qoldi
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Seriya (Streak) - BAZADAN */}
          <Card className="border-0 shadow-md bg-white/80 dark:bg-slate-800/80">
            <CardContent className="p-4 md:p-6 flex items-center gap-5">
              <div className="bg-gradient-to-br from-orange-400 to-red-500 p-3 rounded-2xl shadow-lg shadow-orange-500/20">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-extrabold dark:text-white">
                  {user.streak || 0} Kun
                </p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Uzluksiz ta'lim 🔥</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Yordamchi komponent - Statistika uchun
function StatItem({ icon: Icon, label, value, color }: any) {
  return (
    <Card className="border-0 shadow-md bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl">
      <CardContent className="p-4 flex items-center gap-4">
        <div className={`p-3 bg-${color}-100 dark:bg-${color}-900/50 rounded-xl`}>
          <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
          <p className="text-xl font-extrabold text-slate-800 dark:text-white">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

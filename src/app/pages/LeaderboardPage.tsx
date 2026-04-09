import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Trophy, TrendingUp, Crown, Star, Loader2 } from "lucide-react";
import { motion } from "motion/react";

// TARJIMALAR
const translations = {
  UZ: {
    title: "Peshqadamlar Jadvali",
    subtitle: "Boshqa huquqshunos talabalar orasida o'rningizni ko'ring va eng yaxshilar qatoriga qo'shiling",
    level: "Daraja",
    badge: "Nishon",
    overallRating: "Umumiy Reyting",
    itsYou: "Bu Siz",
    empty: "Hozircha reytingda hech kim yo'q.",
    yourResult: "Sizning Natijangiz",
    thisWeek: "Joriy haftadagi ko'rsatkichlaringiz",
    currentRank: "Joriy O'rin",
    untilLevel: "-Darajagacha"
  },
  QQ: {
    title: "Kóshbasshılar dizimi",
    subtitle: "Basqa huquqtanıwshı studentler arasında ózińizdiń ornıńızdı kóriń hám eń jaqsılar qatarına qosılıń",
    level: "Dáreje",
    badge: "Nıshan",
    overallRating: "Ulıwma Reyting",
    itsYou: "Bul Siz",
    empty: "Házirshe reytingte hesh kim joq.",
    yourResult: "Siziń Nátiyjeńiz",
    thisWeek: "Házirgi háptedegi kórsetkishlerińiz",
    currentRank: "Házirgi Orın",
    untilLevel: "-Dárejege shekem"
  }
};

export function LeaderboardPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [currentUserData, setCurrentUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // TIZIMDAGI TILNI OLISH (MainLayout da 'appLang' deb saqlangan)
  const lang = (localStorage.getItem('appLang') as 'UZ' | 'QQ') || 'UZ';
  const t = translations[lang];

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      const savedUser = localStorage.getItem("user");
      const parsedUser = savedUser ? JSON.parse(savedUser) : null;

      const { data, error } = await supabase
        .from('users')
        .select('id, first_name, grade, xp, level')
        .order('xp', { ascending: false })
        .limit(50);

      if (!error && data) {
        const rankedData = data.map((u, index) => ({
          ...u,
          rank: index + 1,
          name: u.first_name,
          badges: u.level || 1 
        }));
        
        setUsers(rankedData);

        if (parsedUser) {
          const myData = rankedData.find(u => u.id === parsedUser.id);
          setCurrentUserData(myData || { ...parsedUser, rank: '-', badges: parsedUser.level || 1 });
        }
      }
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
    </div>
  );

  const top1 = users.find(u => u.rank === 1);
  const top2 = users.find(u => u.rank === 2);
  const top3 = users.find(u => u.rank === 3);
  const topPodium = [top2, top1, top3].filter(Boolean);

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto min-h-screen bg-slate-50/50 dark:bg-slate-900 transition-colors duration-300 overflow-x-hidden relative">
      
      {/* Header */}
      <motion.div 
        className="mb-14 text-center mt-8 md:mt-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center justify-center p-4 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-5 shadow-inner">
          <Trophy className="w-10 h-10 text-amber-500 dark:text-amber-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
          {t.title}
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          {t.subtitle}
        </p>
      </motion.div>

      {/* Top 3 Podium */}
      {topPodium.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 items-end max-w-4xl mx-auto">
          {topPodium.map((entry) => {
            const rank = entry.rank;
            const isFirst = rank === 1;
            
            const getOrderClass = (r: number) => {
              if (r === 1) return "order-1 md:order-2 z-10";
              if (r === 2) return "order-2 md:order-1";
              return "order-3 md:order-3";
            };

            const getHeightClass = (r: number) => {
              if (r === 1) return "h-[340px]";
              if (r === 2) return "h-[280px]";
              return "h-[250px]";
            };

            const getColors = (r: number) => {
              if (r === 1) return { text: "text-amber-500", bg: "bg-gradient-to-br from-amber-300 to-amber-500 dark:from-amber-400 dark:to-amber-600", border: "border-amber-300 dark:border-amber-500/50" };
              if (r === 2) return { text: "text-slate-400", bg: "bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-400 dark:to-slate-600", border: "border-slate-300 dark:border-slate-500/50" };
              return { text: "text-orange-500", bg: "bg-gradient-to-br from-orange-300 to-orange-500 dark:from-orange-400 dark:to-orange-600", border: "border-orange-300 dark:border-orange-500/50" };
            };

            const style = getColors(rank);

            return (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: rank * 0.2 }}
                className={`${getOrderClass(rank)}`}
              >
                <Card className={`border-2 ${style.border} shadow-2xl relative overflow-hidden ${getHeightClass(rank)} flex flex-col justify-end bg-white dark:bg-slate-800 transform transition-transform hover:-translate-y-2`}>
                  {isFirst && (
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 animate-bounce drop-shadow-lg">
                      <Crown className="w-10 h-10 text-amber-500 dark:text-amber-400" />
                    </div>
                  )}
                  
                  <div className={`absolute top-0 left-0 w-full h-3 ${style.bg}`} />
                  
                  <CardContent className="pt-8 pb-6 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 text-white shadow-lg ${style.bg}`}>
                      <span className="text-3xl font-black">{rank}</span>
                    </div>
                    
                    <h3 className="font-extrabold text-xl mb-1 truncate px-2 text-gray-900 dark:text-white">{entry.name}</h3>
                    <p className="text-sm font-bold text-gray-500 dark:text-slate-400 mb-4">{entry.level}-{t.level}</p>
                    
                    <div className="flex items-center justify-center gap-4 text-sm bg-gray-50 dark:bg-slate-900/50 py-3 rounded-xl mx-2 border border-gray-100 dark:border-slate-700">
                      <div className="text-center">
                        <p className="font-black text-gray-900 dark:text-white">{entry.xp?.toLocaleString() || 0}</p>
                        <p className="text-[10px] text-gray-400 dark:text-slate-500 uppercase font-bold">XP</p>
                      </div>
                      <div className="w-px h-8 bg-gray-200 dark:bg-slate-700" />
                      <div className="text-center">
                        <p className="font-black text-gray-900 dark:text-white">{entry.badges}</p>
                        <p className="text-[10px] text-gray-400 dark:text-slate-500 uppercase font-bold">{t.badge}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/90 backdrop-blur-md transition-colors duration-300">
            <CardHeader className="border-b border-gray-100 dark:border-slate-700/50 pb-5">
              <CardTitle className="flex items-center gap-3 text-2xl font-bold dark:text-white">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg text-blue-600 dark:text-blue-400">
                  <TrendingUp className="w-6 h-6" />
                </div>
                {t.overallRating}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {users.length > 0 ? users.map((entry, index) => {
                  const isCurrentUser = currentUserData && entry.id === currentUserData.id;
                  
                  return (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      key={entry.rank}
                      className={`flex items-center gap-4 p-4 sm:p-5 rounded-2xl transition-all ${
                        isCurrentUser 
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02] border-none" 
                          : "bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/50 border border-gray-100 dark:border-slate-700 shadow-sm"
                      }`}
                    >
                      <div className={`flex items-center justify-center w-12 h-12 rounded-xl font-bold text-lg shrink-0 ${
                        isCurrentUser
                          ? "bg-white/20 text-white"
                          : entry.rank <= 3 
                            ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" 
                            : "bg-gray-100 dark:bg-slate-700/50 text-gray-600 dark:text-slate-300"
                      }`}>
                        #{entry.rank}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <h4 className={`font-bold text-lg truncate ${isCurrentUser ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                            {entry.name}
                          </h4>
                          {isCurrentUser && (
                            <Badge className="bg-white text-blue-600 hover:bg-white text-[10px] px-2.5 uppercase py-0.5 font-black border-none shrink-0">
                              {t.itsYou}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-5 sm:gap-8 text-sm shrink-0">
                        <div className="text-right">
                          <p className={`font-black text-lg ${isCurrentUser ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{entry.level}</p>
                          <p className={`text-[10px] uppercase font-bold ${isCurrentUser ? 'text-blue-100' : 'text-gray-400 dark:text-slate-500'}`}>{t.level}</p>
                        </div>
                        <div className="text-right hidden sm:block">
                          <p className={`font-black text-lg ${isCurrentUser ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{entry.xp?.toLocaleString() || 0}</p>
                          <p className={`text-[10px] uppercase font-bold ${isCurrentUser ? 'text-blue-100' : 'text-gray-400 dark:text-slate-500'}`}>XP</p>
                        </div>
                        <div className="text-right hidden sm:block">
                          <p className={`font-black text-lg flex items-center justify-end gap-1 ${isCurrentUser ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                            {entry.badges}
                            <Star className={`w-4 h-4 ${isCurrentUser ? 'text-yellow-300' : 'text-amber-400'}`} fill="currentColor" />
                          </p>
                          <p className={`text-[10px] uppercase font-bold ${isCurrentUser ? 'text-blue-100' : 'text-gray-400 dark:text-slate-500'}`}>{t.badge}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                }) : (
                  <div className="text-center py-8 text-slate-500 font-medium">{t.empty}</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="sticky top-6"
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 text-white overflow-hidden relative border-slate-700">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
              <CardHeader className="relative z-10 border-b border-slate-700/50 pb-5">
                <CardTitle className="text-xl text-white font-bold">{t.yourResult}</CardTitle>
                <CardDescription className="text-slate-400 font-medium">{t.thisWeek}</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                    <p className="text-4xl font-black text-white mb-2">{currentUserData?.rank || '-'}</p>
                    <p className="text-[11px] text-slate-300 uppercase font-bold tracking-wider">{t.currentRank}</p>
                  </div>
                  <div className="text-center p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors flex flex-col justify-center">
                    <p className="text-2xl font-black text-blue-400 mb-2 mt-1">
                      {currentUserData ? ((currentUserData.level * 1000) - currentUserData.xp) : 0} XP
                    </p>
                    <p className="text-[10px] text-slate-300 uppercase font-bold tracking-wider">
                      {currentUserData ? currentUserData.level + 1 : 2}{t.untilLevel}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

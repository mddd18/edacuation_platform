import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Trophy, Medal, Award, TrendingUp, Crown, Star } from "lucide-react";
import { leaderboardData } from "../data/user";
import { motion } from "motion/react";

export function LeaderboardPage() {
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto min-h-screen bg-slate-50/50">
      {/* Header */}
      <motion.div 
        className="mb-14 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center justify-center p-4 bg-amber-100 rounded-full mb-5 shadow-inner">
          <Trophy className="w-10 h-10 text-amber-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Peshqadamlar Jadvali
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
          Boshqa huquqshunos talabalar orasida o'rningizni ko'ring va eng yaxshilar qatoriga qo'shiling
        </p>
      </motion.div>

      {/* Top 3 Podium (To'g'rilangan versiya) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 items-end max-w-4xl mx-auto">
        {[leaderboardData[1], leaderboardData[0], leaderboardData[2]].map((entry) => {
          const rank = entry.rank;
          const isFirst = rank === 1;
          
          // Tailwind klasslarini to'liq yozish kerak (xatolik bo'lmasligi uchun)
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
            if (r === 1) return { text: "text-amber-500", bg: "bg-gradient-to-br from-amber-300 to-amber-500", border: "border-amber-300" };
            if (r === 2) return { text: "text-slate-400", bg: "bg-gradient-to-br from-slate-300 to-slate-400", border: "border-slate-300" };
            return { text: "text-orange-500", bg: "bg-gradient-to-br from-orange-300 to-orange-500", border: "border-orange-300" };
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
              <Card className={`border-2 ${style.border} shadow-2xl relative overflow-hidden ${getHeightClass(rank)} flex flex-col justify-end bg-white transform transition-transform hover:-translate-y-2`}>
                {isFirst && (
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 animate-bounce drop-shadow-lg">
                    <Crown className="w-10 h-10 text-amber-500" />
                  </div>
                )}
                
                <div className={`absolute top-0 left-0 w-full h-3 ${style.bg}`} />
                
                <CardContent className="pt-8 pb-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 text-white shadow-lg ${style.bg}`}>
                    <span className="text-3xl font-black">{rank}</span>
                  </div>
                  
                  <h3 className="font-extrabold text-xl mb-1 truncate px-2 text-gray-900">{entry.name}</h3>
                  <p className="text-sm font-bold text-gray-500 mb-4">{entry.level}-Daraja</p>
                  
                  <div className="flex items-center justify-center gap-4 text-sm bg-gray-50 py-3 rounded-xl mx-2 border border-gray-100">
                    <div className="text-center">
                      <p className="font-black text-gray-900">{entry.xp.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">XP</p>
                    </div>
                    <div className="w-px h-8 bg-gray-200" />
                    <div className="text-center">
                      <p className="font-black text-gray-900">{entry.badges}</p>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">Nishon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Umumiy Reyting (Yaxshilangan dizayn) */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-md">
            <CardHeader className="border-b border-gray-100 pb-5">
              <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <TrendingUp className="w-6 h-6" />
                </div>
                Umumiy Reyting
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {leaderboardData.map((entry, index) => {
                  const isCurrentUser = entry.name === "Siz";
                  
                  return (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      key={entry.rank}
                      // O'zingizning qatoringiz ko'k rangda yorqin ajralib turadi
                      className={`flex items-center gap-4 p-4 sm:p-5 rounded-2xl transition-all ${
                        isCurrentUser 
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02] border-none" 
                          : "bg-white hover:bg-gray-50 border border-gray-100 shadow-sm"
                      }`}
                    >
                      <div className={`flex items-center justify-center w-12 h-12 rounded-xl font-bold text-lg ${
                        isCurrentUser
                          ? "bg-white/20 text-white"
                          : entry.rank <= 3 
                            ? "bg-amber-100 text-amber-600" 
                            : "bg-gray-100 text-gray-600"
                      }`}>
                        #{entry.rank}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <h4 className={`font-bold text-lg truncate ${isCurrentUser ? 'text-white' : 'text-gray-900'}`}>
                            {entry.name}
                          </h4>
                          {isCurrentUser && (
                            <Badge className="bg-white text-blue-600 hover:bg-white text-[10px] px-2.5 uppercase py-0.5 font-black">
                              Bu Siz
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-5 sm:gap-8 text-sm">
                        <div className="text-right">
                          <p className={`font-black text-lg ${isCurrentUser ? 'text-white' : 'text-gray-900'}`}>{entry.level}</p>
                          <p className={`text-[10px] uppercase font-bold ${isCurrentUser ? 'text-blue-100' : 'text-gray-400'}`}>Daraja</p>
                        </div>
                        <div className="text-right hidden sm:block">
                          <p className={`font-black text-lg ${isCurrentUser ? 'text-white' : 'text-gray-900'}`}>{entry.xp.toLocaleString()}</p>
                          <p className={`text-[10px] uppercase font-bold ${isCurrentUser ? 'text-blue-100' : 'text-gray-400'}`}>XP</p>
                        </div>
                        <div className="text-right hidden sm:block">
                          <p className={`font-black text-lg flex items-center justify-end gap-1 ${isCurrentUser ? 'text-white' : 'text-gray-900'}`}>
                            {entry.badges}
                            <Star className={`w-4 h-4 ${isCurrentUser ? 'text-yellow-300' : 'text-amber-400'}`} fill="currentColor" />
                          </p>
                          <p className={`text-[10px] uppercase font-bold ${isCurrentUser ? 'text-blue-100' : 'text-gray-400'}`}>Nishon</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Card (Yon panel) */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="sticky top-6"
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
              <CardHeader className="relative z-10 border-b border-slate-700/50 pb-5">
                <CardTitle className="text-xl text-white font-bold">Sizning Natijangiz</CardTitle>
                <CardDescription className="text-slate-400 font-medium">Joriy haftadagi ko'rsatkichlaringiz</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                    <p className="text-4xl font-black text-white mb-2">4</p>
                    <p className="text-[11px] text-slate-300 uppercase font-bold tracking-wider">Joriy O'rin</p>
                  </div>
                  <div className="text-center p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                    <p className="text-4xl font-black text-emerald-400 mb-2">↑2</p>
                    <p className="text-[11px] text-slate-300 uppercase font-bold tracking-wider">Bu hafta</p>
                  </div>
                  <div className="text-center p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                    <p className="text-3xl font-black text-blue-400 mb-2 mt-1">340</p>
                    <p className="text-[11px] text-slate-300 uppercase font-bold tracking-wider">9-Darajagacha XP</p>
                  </div>
                  <div className="text-center p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                    <p className="text-3xl font-black text-orange-400 mb-2 mt-1">160</p>
                    <p className="text-[11px] text-slate-300 uppercase font-bold tracking-wider">Haftalik XP</p>
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

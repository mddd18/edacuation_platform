import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Trophy, Medal, Award, TrendingUp, Crown } from "lucide-react";
import { leaderboardData } from "../data/user";
import { motion } from "motion/react";

export function LeaderboardPage() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto min-h-screen">
      {/* Header */}
      <motion.div 
        className="mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center justify-center p-4 bg-amber-100 rounded-full mb-4">
          <Trophy className="w-10 h-10 text-amber-500" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
          Peshqadamlar Jadvali
        </h1>
        <p className="text-lg text-muted-foreground font-medium">
          Boshqa huquqshunos talabalar orasida o'rningizni ko'ring
        </p>
      </motion.div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-end">
        {/* Biz ma'lumotlarni 2, 1, 3 ketma-ketligida joylashtiramiz (Podium stili uchun) */}
        {[leaderboardData[1], leaderboardData[0], leaderboardData[2]].map((entry, index) => {
          // Asl indeksini topamiz (1, 0, 2 -> 2-o'rin, 1-o'rin, 3-o'rin)
          const rankIndex = entry.rank;
          const isFirst = rankIndex === 1;
          
          const styles = {
            1: { color: "text-amber-500", bg: "bg-gradient-to-br from-amber-300 to-amber-500", border: "border-amber-300", height: "md:h-80" },
            2: { color: "text-slate-400", bg: "bg-gradient-to-br from-slate-300 to-slate-400", border: "border-slate-300", height: "md:h-64" },
            3: { color: "text-orange-600", bg: "bg-gradient-to-br from-orange-300 to-orange-500", border: "border-orange-300", height: "md:h-56" }
          };
          
          const style = styles[rankIndex as keyof typeof styles];

          return (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: rankIndex * 0.2 }}
              className={`order-${rankIndex === 1 ? '1 md:order-2' : rankIndex === 2 ? '2 md:order-1' : '3 md:order-3'}`}
            >
              <Card className={`border-2 ${style.border} shadow-xl relative overflow-hidden ${style.height} flex flex-col justify-end bg-white/90 backdrop-blur-sm`}>
                {isFirst && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 animate-bounce">
                    <Crown className="w-8 h-8 text-amber-500" />
                  </div>
                )}
                <div className={`absolute top-0 left-0 w-full h-2 ${style.bg}`} />
                <CardContent className="pt-8 pb-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-white shadow-lg ${style.bg}`}>
                    <span className="text-2xl font-bold">{entry.rank}</span>
                  </div>
                  <h3 className="font-extrabold text-xl mb-1 truncate px-2">{entry.name}</h3>
                  <Badge variant="outline" className="mb-4 font-bold">{entry.level}-Daraja</Badge>
                  
                  <div className="flex items-center justify-center gap-4 text-sm bg-slate-50 py-3 rounded-xl">
                    <div className="text-center">
                      <p className="font-bold text-gray-900">{entry.xp.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground uppercase">XP</p>
                    </div>
                    <div className="w-px h-8 bg-gray-200" />
                    <div className="text-center">
                      <p className="font-bold text-gray-900">{entry.badges}</p>
                      <p className="text-xs text-muted-foreground uppercase">Nishon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Full Leaderboard */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-xl">
            <CardHeader className="border-b border-gray-100 pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <TrendingUp className="w-6 h-6 text-primary" />
                Umumiy Reyting
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {leaderboardData.map((entry, index) => {
                  const isCurrentUser = entry.name === "Siz";
                  
                  return (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      key={entry.rank}
                      className={`flex items-center gap-4 p-4 sm:p-5 transition-all hover:bg-slate-50 ${
                        isCurrentUser ? "bg-primary/5 border-l-4 border-l-primary" : ""
                      }`}
                    >
                      <div className={`flex items-center justify-center w-10 h-10 rounded-xl font-bold text-lg ${
                        entry.rank <= 3 ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-600"
                      }`}>
                        {entry.rank}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className={`font-bold text-base truncate ${isCurrentUser ? 'text-primary' : 'text-gray-900'}`}>
                            {entry.name}
                          </h4>
                          {isCurrentUser && (
                            <Badge className="bg-primary text-white text-[10px] px-2 uppercase py-0.5">Siz</Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 sm:gap-8 text-sm">
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{entry.level}</p>
                          <p className="text-[10px] text-muted-foreground uppercase font-semibold">Daraja</p>
                        </div>
                        <div className="text-right hidden sm:block">
                          <p className="font-bold text-gray-900">{entry.xp.toLocaleString()}</p>
                          <p className="text-[10px] text-muted-foreground uppercase font-semibold">XP</p>
                        </div>
                        <div className="text-right hidden sm:block">
                          <p className="font-bold text-gray-900">{entry.badges}</p>
                          <p className="text-[10px] text-muted-foreground uppercase font-semibold">Nishon</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Card */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="sticky top-6"
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white">
              <CardHeader>
                <CardTitle className="text-xl text-white">Sizning Natijangiz</CardTitle>
                <CardDescription className="text-slate-400">Joriy haftadagi ko'rsatkichlaringiz</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-5 bg-white/10 rounded-2xl backdrop-blur-md border border-white/5">
                    <p className="text-3xl font-extrabold text-white mb-1">4</p>
                    <p className="text-xs text-slate-300 uppercase font-semibold tracking-wider">Joriy O'rin</p>
                  </div>
                  <div className="text-center p-5 bg-white/10 rounded-2xl backdrop-blur-md border border-white/5">
                    <p className="text-3xl font-extrabold text-emerald-400 mb-1">↑2</p>
                    <p className="text-xs text-slate-300 uppercase font-semibold tracking-wider">Bu hafta</p>
                  </div>
                  <div className="text-center p-5 bg-white/10 rounded-2xl backdrop-blur-md border border-white/5">
                    <p className="text-3xl font-extrabold text-blue-400 mb-1">340</p>
                    <p className="text-xs text-slate-300 uppercase font-semibold tracking-wider">9-Darajagacha XP</p>
                  </div>
                  <div className="text-center p-5 bg-white/10 rounded-2xl backdrop-blur-md border border-white/5">
                    <p className="text-3xl font-extrabold text-orange-400 mb-1">160</p>
                    <p className="text-xs text-slate-300 uppercase font-semibold tracking-wider">Haftalik XP</p>
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

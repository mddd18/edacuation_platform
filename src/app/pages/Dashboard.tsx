import { useState } from "react";
import { Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { 
  TrendingUp, 
  BookOpen, 
  Award, 
  Flame,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap
} from "lucide-react";
import { dailyDilemmas, dilemmaResults } from "../data/dilemmas";
import { userProgress } from "../data/user";
import { motion } from "motion/react";

export function Dashboard() {
  const todaysDilemma = dailyDilemmas[0]; 
  const results = dilemmaResults[todaysDilemma.id];
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (optionIndex: number) => {
    if (!hasVoted) {
      setSelectedOption(optionIndex);
      setHasVoted(true);
    }
  };

  const getPercentage = (votes: number) => {
    return ((votes / results.totalVotes) * 100).toFixed(1);
  };

  const earnedBadges = userProgress.badges.filter(b => b.earned);
  const progressPercentage = (userProgress.xp / userProgress.xpToNextLevel) * 100;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen bg-slate-50/50 dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <motion.div 
        className="mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl mb-3 font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
          Xush kelibsiz, Talaba!
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
          Huquq va qonunchilikni o'rganish bo'yicha sayohatingizni davom ettiring
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Asosiy Kontent - Chap tomon */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Kunlik Muammo (Dilemma) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-0 shadow-2xl relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl transition-colors duration-300">
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)' }}
              />
              
              <CardHeader className="border-b border-slate-100 dark:border-slate-700/50 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl font-bold flex items-center gap-3 dark:text-white">
                      <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-2.5 rounded-xl shadow-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      Kunlik Huquqiy Muammo
                    </CardTitle>
                    <CardDescription className="text-base mt-2 font-medium dark:text-slate-400">Bugungi real hayotiy vaziyatga ovoz bering</CardDescription>
                  </div>
                  <Badge 
                    className="px-4 py-2 text-sm font-bold shadow-md text-white border-none"
                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                  >
                    {results.totalVotes} ta ovoz
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 shadow-sm transition-colors duration-300">
                    <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-indigo-100">{todaysDilemma.title}</h3>
                    <p className="text-base text-slate-600 dark:text-indigo-200/80 leading-relaxed font-medium">
                      {todaysDilemma.scenario}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {todaysDilemma.options.map((option, index) => {
                      const votes = results.votes[index];
                      const percentage = getPercentage(votes);
                      const isSelected = selectedOption === index;

                      return (
                        <motion.button
                          key={index}
                          onClick={() => handleVote(index)}
                          disabled={hasVoted}
                          whileHover={!hasVoted ? { scale: 1.01, y: -2 } : {}}
                          whileTap={!hasVoted ? { scale: 0.99 } : {}}
                          className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 relative overflow-hidden ${
                            hasVoted
                              ? isSelected
                                ? "border-purple-400 dark:border-purple-500 bg-purple-50/80 dark:bg-purple-900/30 shadow-md"
                                : "border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 opacity-80"
                              : "border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-500 hover:bg-purple-50/50 dark:hover:bg-purple-900/20 hover:shadow-md cursor-pointer bg-white dark:bg-slate-800"
                          } ${hasVoted ? "cursor-default" : ""}`}
                        >
                          <div className="flex items-start justify-between gap-3 relative z-10">
                            <div className="flex-1">
                              <p className={`text-base font-semibold mb-2 ${hasVoted && isSelected ? 'text-purple-900 dark:text-purple-200' : 'text-slate-700 dark:text-slate-300'}`}>{option}</p>
                              {hasVoted && (
                                <motion.div 
                                  className="space-y-2"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  transition={{ duration: 0.5, delay: 0.1 }}
                                >
                                  <div className="relative h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <motion.div
                                      className="absolute inset-y-0 left-0 rounded-full shadow-sm"
                                      style={{ background: 'linear-gradient(90deg, #8b5cf6 0%, #d946ef 100%)' }}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${percentage}%` }}
                                      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                                    />
                                  </div>
                                  <p className="text-sm font-bold text-purple-600 dark:text-purple-400">
                                    {percentage}% ({votes} ovoz)
                                  </p>
                                </motion.div>
                              )}
                            </div>
                            {hasVoted && isSelected && (
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ duration: 0.5, type: "spring" }}
                              >
                                <CheckCircle2 className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                              </motion.div>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {!hasVoted && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm font-medium text-slate-500 dark:text-slate-400 text-center flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-800/50 py-3 rounded-lg border border-slate-100 dark:border-slate-700/50"
                    >
                      <Zap className="w-4 h-4 text-amber-500" />
                      Ovoz berish uchun variantlardan birini tanlang
                    </motion.p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>

        {/* O'ng Panel - Progress va Statistika */}
        <div className="space-y-8">
          
          {/* Daraja Kartasi */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card 
              className="border-0 shadow-2xl text-white relative overflow-hidden group"
              style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700" />
              
              <CardContent className="pt-8 pb-8 relative z-10">
                <div className="text-center mb-6">
                  <motion.div 
                    className="inline-flex items-center justify-center w-28 h-28 bg-white/20 backdrop-blur-md rounded-full mb-4 shadow-2xl relative border-2 border-white/30"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-5xl font-extrabold relative z-10">{userProgress.level}</span>
                  </motion.div>
                  <h3 className="font-bold text-2xl mb-1">{userProgress.level}-Daraja</h3>
                  <p className="text-sm font-medium text-blue-100 flex items-center justify-center gap-2 bg-black/20 w-max mx-auto px-4 py-1.5 rounded-full border border-white/10">
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    Huquqshunos
                  </p>
                </div>

                <div className="space-y-2 bg-black/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                  <div className="flex justify-between text-sm font-bold">
                    <span>{userProgress.xp} XP</span>
                    <span>{userProgress.xpToNextLevel} XP</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3 bg-white/20" />
                  <p className="text-xs font-medium text-center text-blue-100 pt-1">
                    Keyingi darajagacha {userProgress.xpToNextLevel - userProgress.xp} XP qoldi
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Seriya (Streak) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl transition-colors duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-5">
                  <motion.div 
                    className="bg-gradient-to-br from-orange-400 to-red-500 p-4 rounded-2xl shadow-lg shadow-orange-500/30"
                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Flame className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-red-600 dark:from-orange-400 dark:to-red-500 bg-clip-text text-transparent">
                      {userProgress.streak} Kun
                    </p>
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">Uzluksiz ta'lim 🔥</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tezkor Statistika */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl transition-colors duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold dark:text-white">Tezkor Statistika</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Tugallangan darslar</span>
                    <span className="font-extrabold text-xl text-indigo-600 dark:text-indigo-400">{userProgress.completedLessons.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Yechilgan holatlar</span>
                    <span className="font-extrabold text-xl text-purple-600 dark:text-purple-400">{userProgress.completedCases.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Olingan nishonlar</span>
                    <span className="font-extrabold text-xl text-pink-600 dark:text-pink-400">{earnedBadges.length}/{userProgress.badges.length}</span>
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

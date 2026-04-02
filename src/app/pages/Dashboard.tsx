import { useState } from "react";
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
  Award
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

  const progressPercentage = (userProgress.xp / userProgress.xpToNextLevel) * 100;

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto min-h-screen bg-slate-50/50 dark:bg-slate-900 transition-colors duration-300 overflow-x-hidden">
      {/* Header - Telefon uchun ixchamlashtirildi */}
      <motion.div 
        className="mb-6 md:mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-4xl mb-2 md:mb-3 font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent flex items-center gap-2 md:gap-3">
          <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 animate-pulse" />
          Xush kelibsiz, Talaba!
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-lg font-medium">
          Huquq va qonunchilikni o'rganish bo'yicha sayohatingizni davom ettiring
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 md:gap-8">
        {/* Asosiy Kontent - Chap tomon */}
        <div className="xl:col-span-2 space-y-5 md:space-y-8">
          
          {/* Kunlik Muammo (Dilemma) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-0 shadow-xl relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl transition-colors duration-300">
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)' }}
              />
              
              <CardHeader className="border-b border-slate-100 dark:border-slate-700/50 pb-4 md:pb-6 p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
                  <div>
                    <CardTitle className="text-xl md:text-2xl font-bold flex items-center gap-2 md:gap-3 dark:text-white">
                      <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-2 md:p-2.5 rounded-xl shadow-md">
                        <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      Kunlik Muammo
                    </CardTitle>
                    <CardDescription className="text-sm md:text-base mt-1 md:mt-2 font-medium dark:text-slate-400">
                      Bugungi real hayotiy vaziyatga ovoz bering
                    </CardDescription>
                  </div>
                  <Badge 
                    className="w-max px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-bold shadow-md text-white border-none"
                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                  >
                    {results.totalVotes} ta ovoz
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4 md:pt-6 p-4 md:p-6">
                <div className="space-y-4 md:space-y-6">
                  <div className="p-4 md:p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 shadow-sm transition-colors duration-300">
                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-slate-800 dark:text-indigo-100">{todaysDilemma.title}</h3>
                    <p className="text-sm md:text-base text-slate-600 dark:text-indigo-200/80 leading-relaxed font-medium">
                      {todaysDilemma.scenario}
                    </p>
                  </div>

                  <div className="space-y-2.5 md:space-y-3">
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
                          className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-300 relative overflow-hidden ${
                            hasVoted
                              ? isSelected
                                ? "border-purple-400 dark:border-purple-500 bg-purple-50/80 dark:bg-purple-900/30 shadow-md"
                                : "border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 opacity-80"
                              : "border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-500 hover:bg-purple-50/50 dark:hover:bg-purple-900/20 hover:shadow-sm cursor-pointer bg-white dark:bg-slate-800"
                          } ${hasVoted ? "cursor-default" : ""}`}
                        >
                          <div className="flex items-start justify-between gap-3 relative z-10">
                            <div className="flex-1">
                              <p className={`text-sm md:text-base font-semibold mb-1.5 md:mb-2 ${hasVoted && isSelected ? 'text-purple-900 dark:text-purple-200' : 'text-slate-700 dark:text-slate-300'}`}>{option}</p>
                              {hasVoted && (
                                <motion.div 
                                  className="space-y-1.5 md:space-y-2"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  transition={{ duration: 0.5, delay: 0.1 }}
                                >
                                  <div className="relative h-2 md:h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <motion.div
                                      className="absolute inset-y-0 left-0 rounded-full shadow-sm"
                                      style={{ background: 'linear-gradient(90deg, #8b5cf6 0%, #d946ef 100%)' }}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${percentage}%` }}
                                      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                                    />
                                  </div>
                                  <p className="text-xs md:text-sm font-bold text-purple-600 dark:text-purple-400">
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
                                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
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
                      className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 text-center flex items-center justify-center gap-1.5 md:gap-2 bg-slate-50 dark:bg-slate-800/50 py-2.5 md:py-3 rounded-lg border border-slate-100 dark:border-slate-700/50"
                    >
                      <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-500" />
                      Ovoz berish uchun variantlardan birini tanlang
                    </motion.p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tezkor Statistika - Telefon uchun bir-biriga yopishganroq, ixcham */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 min-[400px]:grid-cols-3 gap-3 md:gap-4"
          >
            <Card className="border-0 shadow-md bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-3.5 md:p-5 flex items-center gap-3 md:gap-4">
                <div className="p-2.5 md:p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl">
                  <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5 md:mb-1">Darslar</p>
                  <p className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white">{userProgress.completedLessons.length}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-3.5 md:p-5 flex items-center gap-3 md:gap-4">
                <div className="p-2.5 md:p-3 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
                  <Scale className="w-5 h-5 md:w-6 md:h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5 md:mb-1">Holatlar</p>
                  <p className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white">{userProgress.completedCases.length}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-3.5 md:p-5 flex items-center gap-3 md:gap-4">
                <div className="p-2.5 md:p-3 bg-pink-100 dark:bg-pink-900/50 rounded-xl">
                  <Award className="w-5 h-5 md:w-6 md:h-6 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5 md:mb-1">Nishonlar</p>
                  <p className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white">{userProgress.badges.filter(b => b.earned).length}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>

        {/* O'ng Panel - Progress va Seriya */}
        <div className="space-y-5 md:space-y-8">
          
          {/* Daraja Kartasi */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card 
              className="border-0 shadow-xl text-white relative overflow-hidden group"
              style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 md:-top-24 md:-right-24 md:w-48 md:h-48 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700" />
              
              <CardContent className="pt-6 pb-6 md:pt-8 md:pb-8 relative z-10">
                <div className="text-center mb-5 md:mb-6">
                  <motion.div 
                    className="inline-flex items-center justify-center w-20 h-20 md:w-28 md:h-28 bg-white/20 backdrop-blur-md rounded-full mb-3 md:mb-4 shadow-xl relative border-2 border-white/30"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-4xl md:text-5xl font-extrabold relative z-10">{userProgress.level}</span>
                  </motion.div>
                  <h3 className="font-bold text-xl md:text-2xl mb-1">{userProgress.level}-Daraja</h3>
                  <p className="text-xs md:text-sm font-medium text-blue-100 flex items-center justify-center gap-1.5 md:gap-2 bg-black/20 w-max mx-auto px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-white/10">
                    <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-300" />
                    Huquqshunos
                  </p>
                </div>

                <div className="space-y-1.5 md:space-y-2 bg-black/20 p-3 md:p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                  <div className="flex justify-between text-xs md:text-sm font-bold">
                    <span>{userProgress.xp} XP</span>
                    <span>{userProgress.xpToNextLevel} XP</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2.5 md:h-3 bg-white/20" />
                  <p className="text-[10px] md:text-xs font-medium text-center text-blue-100 pt-1">
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
            <Card className="border-0 shadow-md bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl transition-colors duration-300">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-4 md:gap-5">
                  <motion.div 
                    className="bg-gradient-to-br from-orange-400 to-red-500 p-3 md:p-4 rounded-2xl shadow-md shadow-orange-500/30"
                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Flame className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-red-600 dark:from-orange-400 dark:to-red-500 bg-clip-text text-transparent">
                      {userProgress.streak} Kun
                    </p>
                    <p className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5 md:mt-1">Uzluksiz ta'lim 🔥</p>
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

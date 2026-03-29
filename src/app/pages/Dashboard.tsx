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
import { lessons } from "../data/lessons";
import { LearningJourney } from "../components/LearningJourney";
import { motion } from "motion/react";

export function Dashboard() {
  const todaysDilemma = dailyDilemmas[0]; // In real app, would filter by today's date
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
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl mb-2 font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-yellow-500" />
          Welcome Back, Student!
        </h1>
        <p className="text-slate-600 text-lg">
          Continue your journey to understanding law and human rights
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Legal Dilemma */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-0 shadow-xl relative overflow-hidden">
              {/* Gradient background decoration */}
              <div 
                className="absolute inset-0 opacity-5"
                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
              />
              
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-2 rounded-xl shadow-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      Daily Legal Dilemma
                    </CardTitle>
                    <CardDescription className="text-base mt-2">Vote on today's real-life scenario</CardDescription>
                  </div>
                  <Badge 
                    className="px-4 py-2 text-sm font-semibold shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                  >
                    {results.totalVotes} votes
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div 
                    className="p-6 rounded-2xl backdrop-blur-sm border border-slate-200 shadow-md"
                    style={{ background: 'rgba(255, 255, 255, 0.7)' }}
                  >
                    <h3 className="text-lg font-bold mb-3 text-slate-800">{todaysDilemma.title}</h3>
                    <p className="text-base text-slate-700 leading-relaxed">
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
                          whileHover={!hasVoted ? { scale: 1.02, y: -2 } : {}}
                          whileTap={!hasVoted ? { scale: 0.98 } : {}}
                          className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 relative overflow-hidden ${
                            hasVoted
                              ? isSelected
                                ? "border-purple-400 bg-purple-50 shadow-lg"
                                : "border-slate-200 bg-slate-50"
                              : "border-slate-200 hover:border-purple-400 hover:bg-purple-50 hover:shadow-lg cursor-pointer"
                          } ${hasVoted ? "cursor-default" : ""}`}
                        >
                          <div className="flex items-start justify-between gap-3 relative z-10">
                            <div className="flex-1">
                              <p className="text-base font-medium mb-2">{option}</p>
                              {hasVoted && (
                                <motion.div 
                                  className="space-y-2"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                  <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden">
                                    <motion.div
                                      className="absolute inset-y-0 left-0 rounded-full shadow-md"
                                      style={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${percentage}%` }}
                                      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                                    />
                                  </div>
                                  <p className="text-sm font-bold text-purple-600">
                                    {percentage}% ({votes} votes)
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
                                <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0" />
                              </motion.div>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {!hasVoted && (
                    <p className="text-sm text-slate-500 text-center flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4" />
                      Click an option to cast your vote and see how others voted
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Visual Learning Journey */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-2 rounded-xl shadow-lg">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  Your Learning Journey
                </CardTitle>
                <CardDescription className="text-base">Follow the path to master law and human rights</CardDescription>
              </CardHeader>
              <CardContent>
                <LearningJourney />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar - Progress & Gamification */}
        <div className="space-y-6">
          {/* Level Progress */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card 
              className="border-0 shadow-2xl text-white relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            >
              {/* Decorative circles */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full" />
              
              <CardContent className="pt-6 relative z-10">
                <div className="text-center mb-4">
                  <motion.div 
                    className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-lg rounded-full mb-4 shadow-2xl relative"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-xl opacity-40 animate-pulse" />
                    <span className="text-4xl font-bold relative z-10">{userProgress.level}</span>
                  </motion.div>
                  <h3 className="font-bold text-xl mb-1">Level {userProgress.level}</h3>
                  <p className="text-sm text-blue-100 flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Legal Scholar
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{userProgress.xp} XP</span>
                    <span>{userProgress.xpToNextLevel} XP</span>
                  </div>
                  <div className="relative h-4 bg-white/20 rounded-full overflow-hidden backdrop-blur-lg">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-sm text-center text-blue-100">
                    {userProgress.xpToNextLevel - userProgress.xp} XP to Level {userProgress.level + 1}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Streak */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="bg-gradient-to-br from-orange-400 to-red-500 p-4 rounded-2xl shadow-lg"
                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Flame className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                      {userProgress.streak} Days
                    </p>
                    <p className="text-sm text-slate-600">Learning Streak 🔥</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  Recent Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {earnedBadges.slice(0, 3).map((badge, index) => (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="flex items-center gap-3 p-4 rounded-xl shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                      style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)' }}
                    >
                      <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-3 rounded-xl shadow-lg flex-shrink-0">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{badge.name}</p>
                        <p className="text-xs text-slate-600 truncate">
                          {badge.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Link to="/profile">
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border-2 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 rounded-xl h-11"
                  >
                    View All Badges
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50">
                    <span className="text-sm text-slate-600">Lessons Completed</span>
                    <span className="font-bold text-lg text-purple-600">{userProgress.completedLessons.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50">
                    <span className="text-sm text-slate-600">Cases Solved</span>
                    <span className="font-bold text-lg text-purple-600">{userProgress.completedCases.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50">
                    <span className="text-sm text-slate-600">Badges Earned</span>
                    <span className="font-bold text-lg text-purple-600">{earnedBadges.length}/6</span>
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
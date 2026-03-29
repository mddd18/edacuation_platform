import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { 
  User, 
  Award, 
  BookOpen, 
  Scale, 
  TrendingUp,
  Flame,
  Trophy,
  Calendar,
  CheckCircle2,
  Lock,
  Edit2,
  Settings,
  Zap
} from "lucide-react";
import { userProgress, Badge as BadgeType } from "../data/user";
import { motion, AnimatePresence } from "motion/react";

// Animatsiya variantlari
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // Bolalar elementlari ketma-ket chiqadi
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const badgeIcons: Record<string, any> = {
  BookOpen: BookOpen,
  Scale: Scale,
  Award: Award,
  Brain: TrendingUp,
  Shield: Trophy,
  Flame: Flame
};

export function ProfilePage() {
  const earnedBadges = userProgress.badges.filter(b => b.earned);
  const lockedBadges = userProgress.badges.filter(b => !b.earned);
  const progressPercentage = (userProgress.xp / userProgress.xpToNextLevel) * 100;

  // Statistika kartochkalari uchun ma'lumotlar arrayi
  const stats = [
    { label: "Darslar", value: userProgress.completedLessons.length, icon: BookOpen, color: "text-blue-500", bg: "bg-blue-100" },
    { label: "Holatlar", value: userProgress.completedCases.length, icon: Scale, color: "text-purple-500", bg: "bg-purple-100" },
    { label: "Kunlik seriya", value: `${userProgress.streak} kun`, icon: Flame, color: "text-orange-500", bg: "bg-orange-100" },
    { label: "Reyting", value: "#4", icon: Trophy, color: "text-yellow-600", bg: "bg-yellow-100" },
  ];

  return (
    // Asosiy konteynerga gradient fon
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-slate-50 via-gray-100 to-blue-50/50">
      
      {/* Yuqori Header Qismi */}
      <motion.div 
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-accent animate-pulse" />
            <h1 className="text-4xl font-bold tracking-tight text-gray-950">Shaxsiy Kabinet</h1>
          </div>
          <p className="text-muted-foreground mt-1 text-lg">O'quv jarayoni va yutuqlaringiz markazi</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 rounded-full shadow-sm hover:bg-gray-100">
            <Settings className="w-4 h-4" />
            Sozlamalar
          </Button>
          <Button className="gap-2 rounded-full bg-primary hover:bg-primary/90 shadow-md">
            <Edit2 className="w-4 h-4" />
            Profilni tahrirlash
          </Button>
        </div>
      </motion.div>

      {/* Asosiy Kontent Gridi */}
      <motion.div 
        className="grid grid-cols-1 xl:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* CHAP KOLONKA: Profil va Daraja */}
        <motion.div className="xl:col-span-1 space-y-8" variants={itemVariants}>
          {/* Asosiy Profil Kartochkasi (Glassmorphism effekti) */}
          <Card className="overflow-hidden border-none shadow-xl bg-white/70 backdrop-blur-lg relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
            <CardContent className="pt-10 pb-8 relative z-10">
              <div className="text-center">
                <motion.div 
                  className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-tr from-primary to-accent rounded-full mb-5 p-1 shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <User className="w-14 h-14 text-primary" />
                  </div>
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-950">Azizbek Temirov</h2>
                <p className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full inline-block mt-1 mb-6">Kelajak Huquqshunosi</p>
                
                {/* Asosiy yutuqlar raqamlarda */}
                <div className="grid grid-cols-3 gap-2 border border-gray-100 rounded-2xl p-4 bg-gray-50/50">
                  <div className="text-center">
                    <p className="text-3xl font-extrabold text-primary">{userProgress.level}</p>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Daraja</p>
                  </div>
                  <div className="text-center border-x border-gray-100">
                    <p className="text-3xl font-extrabold text-secondary">{earnedBadges.length}</p>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nishonlar</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-extrabold text-orange-500">{userProgress.streak}</p>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Seriya</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daraja Progress Kartochkasi (To'liq yorqin rangda) */}
          <Card className="bg-gradient-to-br from-primary via-primary/90 to-accent text-white shadow-lg border-none overflow-hidden relative group">
            <motion.div 
              className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <CardHeader className="relative z-10 pb-2">
              <CardTitle className="text-white flex items-center justify-between">
                Daraja o'sishi
                <TrendingUp className="w-5 h-5 text-white/70" />
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 space-y-4">
              <div className="flex justify-between items-end">
                <p className="text-5xl font-extrabold">{userProgress.xp}<span className="text-xl font-medium text-white/70"> / {userProgress.xpToNextLevel} XP</span></p>
              </div>
              <Progress 
                value={progressPercentage} 
                className="h-3 bg-white/20" 
                // indicatorClassName="bg-yellow-300" // Agar progress bar rangini o'zgartirmoqchi bo'lsangiz
              />
              <p className="text-sm text-center text-blue-100 font-medium bg-white/10 py-1.5 rounded-lg">
                Keyingi darajagacha yana <span className="font-bold text-yellow-300">{userProgress.xpToNextLevel - userProgress.xp} XP</span> kerak
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* O'NG KOLONKA: Statistika va Nishonlar */}
        <div className="xl:col-span-3 space-y-8">
          
          {/* Tezkor Statistika Gridi */}
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-5" variants={containerVariants}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.label} variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }}>
                  <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className={`${stat.bg} p-3 rounded-xl`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-950">{stat.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Nishonlar Kolleksiyasi (Eng muhim vizual qism) */}
          <motion.div variants={itemVariants}>
            <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100 pb-4 mb-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <Award className="w-7 h-7 text-secondary" />
                    Yutuqlar Kolleksiyasi
                  </CardTitle>
                  <div className="text-sm font-medium text-muted-foreground bg-gray-100 px-4 py-1.5 rounded-full">
                    Jami olingan: <span className="font-bold text-secondary text-base">{earnedBadges.length}</span> / {userProgress.badges.length}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Nishonlar Gridi */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <AnimatePresence>
                    {/* Olingan nishonlar - Yorqin rangda */}
                    {earnedBadges.map((badge, index) => {
                      const Icon = badgeIcons[badge.icon] || Award;
                      return (
                        <motion.div
                          key={badge.id}
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={{ scale: 1.03, y: -2 }}
                          className="group flex items-start gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-secondary/20 transition-all duration-300 cursor-pointer relative overflow-hidden"
                        >
                          {/* Nurlanish effekti hover bo'lganda */}
                          <div className="absolute inset-0 bg-gradient-to-r from-secondary/0 via-secondary/5 to-secondary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                          
                          <div className="bg-secondary/10 p-4 rounded-xl flex-shrink-0 group-hover:bg-secondary/15 transition-colors">
                            <Icon className="w-7 h-7 text-secondary" />
                          </div>
                          <div className="flex-1 min-w-0 relative z-10">
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <h4 className="font-bold text-lg text-gray-950 truncate">{badge.name}</h4>
                              <div className="bg-secondary/10 p-1 rounded-full flex-shrink-0">
                                <CheckCircle2 className="w-4 h-4 text-secondary" />
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {badge.description}
                            </p>
                            {badge.earnedDate && (
                              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-gray-50 px-2.5 py-1 rounded-full inline-flex">
                                <Calendar className="w-3.5 h-3.5 text-secondary" />
                                {new Date(badge.earnedDate).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })} da olindi
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}

                    {/* Qulflangan nishonlar - Xira rangda */}
                    {lockedBadges.map((badge) => {
                      const Icon = badgeIcons[badge.icon] || Award;
                      return (
                        <motion.div
                          key={badge.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.6 }}
                          whileHover={{ opacity: 1, scale: 1.01 }}
                          className="flex items-start gap-4 p-5 bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-2xl"
                        >
                          <div className="bg-gray-100 p-4 rounded-xl flex-shrink-0 border border-gray-200">
                            <Icon className="w-7 h-7 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <h4 className="font-semibold text-lg text-gray-700 truncate">{badge.name}</h4>
                              <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {badge.description}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}

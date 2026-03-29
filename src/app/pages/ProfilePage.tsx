import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
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
  Lock
} from "lucide-react";
import { userProgress } from "../data/user";
import { motion } from "motion/react";

export function ProfilePage() {
  const earnedBadges = userProgress.badges.filter(b => b.earned);
  const lockedBadges = userProgress.badges.filter(b => !b.earned);
  const progressPercentage = (userProgress.xp / userProgress.xpToNextLevel) * 100;

  const badgeIcons: Record<string, any> = {
    BookOpen: BookOpen,
    Scale: Scale,
    Award: Award,
    Brain: TrendingUp,
    Shield: Trophy,
    Flame: Flame
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl mb-2 flex items-center gap-3">
          <User className="w-8 h-8 text-primary" />
          Sizning profilingiz
        </h1>
        <p className="text-muted-foreground">
          O'quv jarayoni va yutuqlaringizni kuzating
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-4">
                    <User className="w-12 h-12 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold mb-1">Talaba</h2>
                  <p className="text-sm text-muted-foreground mb-4">Huquqshunos</p>
                  
                  <div className="flex items-center justify-center gap-4 text-sm mb-6">
                    <div>
                      <p className="text-2xl font-bold text-primary">{userProgress.level}</p>
                      <p className="text-xs text-muted-foreground">Daraja</p>
                    </div>
                    <div className="h-12 w-px bg-border" />
                    <div>
                      <p className="text-2xl font-bold text-secondary">{earnedBadges.length}</p>
                      <p className="text-xs text-muted-foreground">Nishonlar</p>
                    </div>
                    <div className="h-12 w-px bg-border" />
                    <div>
                      <p className="text-2xl font-bold text-orange-500">{userProgress.streak}</p>
                      <p className="text-xs text-muted-foreground">Kunlik seriya</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Profilni tahrirlash
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Level Progress */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-primary to-accent text-white">
              <CardHeader>
                <CardTitle className="text-white">Daraja o'sishi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{userProgress.xp} XP</span>
                    <span>{userProgress.xpToNextLevel} XP</span>
                  </div>
                  <Progress 
                    value={progressPercentage} 
                    className="h-3 bg-white/20" 
                  />
                  <p className="text-xs text-center text-blue-100">
                    {userProgress.level + 1}-darajagacha {userProgress.xpToNextLevel - userProgress.xp} XP qoldi
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">O'quv statistikasi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Darslar</p>
                        <p className="text-xs text-muted-foreground">Tugallangan</p>
                      </div>
                    </div>
                    <p className="text-xl font-bold">{userProgress.completedLessons.length}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-secondary/10 p-2 rounded-lg">
                        <Scale className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Holatlar</p>
                        <p className="text-xs text-muted-foreground">Yechilgan</p>
                      </div>
                    </div>
                    <p className="text-xl font-bold">{userProgress.completedCases.length}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <Flame className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Seriya</p>
                        <p className="text-xs text-muted-foreground">Joriy</p>
                      </div>
                    </div>
                    <p className="text-xl font-bold">{userProgress.streak} kun</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-accent/10 p-2 rounded-lg">
                        <Trophy className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">O'rin</p>
                        <p className="text-xs text-muted-foreground">Reytingda</p>
                      </div>
                    </div>
                    <p className="text-xl font-bold">#4</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Badges Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Earned Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-secondary" />
                  Olingan nishonlar ({earnedBadges.length})
                </CardTitle>
                <CardDescription>Sizning yutuqlaringiz va natijalaringiz</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {earnedBadges.map((badge, index) => {
                    const Icon = badgeIcons[badge.icon] || Award;
                    
                    return (
                      <motion.div
                        key={badge.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="flex items-start gap-4 p-4 bg-secondary/5 border-2 border-secondary/20 rounded-lg cursor-pointer"
                      >
                        <div className="bg-secondary/10 p-3 rounded-lg flex-shrink-0">
                          <Icon className="w-6 h-6 text-secondary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-semibold">{badge.name}</h4>
                            <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {badge.description}
                          </p>
                          {badge.earnedDate && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              {new Date(badge.earnedDate).toLocaleDateString()} da olingan
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Locked Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-muted-foreground" />
                  Qulflangan nishonlar ({lockedBadges.length})
                </CardTitle>
                <CardDescription>Ushbu yutuqlarni ochish uchun o'qishda davom eting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lockedBadges.map((badge, index) => {
                    const Icon = badgeIcons[badge.icon] || Award;
                    
                    return (
                      <motion.div
                        key={badge.id}
                        initial={{ opacity: 0, opacity: 0.6 }}
                        whileHover={{ opacity: 1, scale: 1.01 }}
                        className="flex items-start gap-4 p-4 bg-muted/30 border-2 border-dashed border-border rounded-lg"
                      >
                        <div className="bg-muted p-3 rounded-lg flex-shrink-0">
                          <Icon className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-semibold">{badge.name}</h4>
                            <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {badge.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

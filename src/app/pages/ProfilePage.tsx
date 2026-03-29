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
      <div className="mb-8">
        <h1 className="text-3xl mb-2 flex items-center gap-3">
          <User className="w-8 h-8 text-primary" />
          Your Profile
        </h1>
        <p className="text-muted-foreground">
          Track your learning progress and achievements
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-4">
                  <User className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-1">Student User</h2>
                <p className="text-sm text-muted-foreground mb-4">Legal Scholar</p>
                
                <div className="flex items-center justify-center gap-4 text-sm mb-6">
                  <div>
                    <p className="text-2xl font-bold text-primary">{userProgress.level}</p>
                    <p className="text-xs text-muted-foreground">Level</p>
                  </div>
                  <div className="h-12 w-px bg-border" />
                  <div>
                    <p className="text-2xl font-bold text-secondary">{earnedBadges.length}</p>
                    <p className="text-xs text-muted-foreground">Badges</p>
                  </div>
                  <div className="h-12 w-px bg-border" />
                  <div>
                    <p className="text-2xl font-bold text-orange-500">{userProgress.streak}</p>
                    <p className="text-xs text-muted-foreground">Day Streak</p>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Level Progress */}
          <Card className="bg-gradient-to-br from-primary to-accent text-white">
            <CardHeader>
              <CardTitle className="text-white">Level Progress</CardTitle>
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
                  {userProgress.xpToNextLevel - userProgress.xp} XP to Level {userProgress.level + 1}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Stats Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Lessons</p>
                      <p className="text-xs text-muted-foreground">Completed</p>
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
                      <p className="text-sm font-semibold">Cases</p>
                      <p className="text-xs text-muted-foreground">Solved</p>
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
                      <p className="text-sm font-semibold">Streak</p>
                      <p className="text-xs text-muted-foreground">Current</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold">{userProgress.streak} days</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/10 p-2 rounded-lg">
                      <Trophy className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Rank</p>
                      <p className="text-xs text-muted-foreground">Leaderboard</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold">#4</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Badges Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Earned Badges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-secondary" />
                Earned Badges ({earnedBadges.length})
              </CardTitle>
              <CardDescription>Your achievements and accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {earnedBadges.map((badge) => {
                  const Icon = badgeIcons[badge.icon] || Award;
                  
                  return (
                    <div
                      key={badge.id}
                      className="flex items-start gap-4 p-4 bg-secondary/5 border-2 border-secondary/20 rounded-lg"
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
                            Earned on {new Date(badge.earnedDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Locked Badges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-muted-foreground" />
                Locked Badges ({lockedBadges.length})
              </CardTitle>
              <CardDescription>Keep learning to unlock these achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lockedBadges.map((badge) => {
                  const Icon = badgeIcons[badge.icon] || Award;
                  
                  return (
                    <div
                      key={badge.id}
                      className="flex items-start gap-4 p-4 bg-muted/30 border-2 border-dashed border-border rounded-lg opacity-60"
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
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: "2026-03-27", action: "Completed lesson", title: "Introduction to Constitutional Rights", xp: 50 },
                  { date: "2026-03-26", action: "Solved case study", title: "Defective Smartphone Purchase", xp: 100 },
                  { date: "2026-03-25", action: "Earned badge", title: "Case Solver", xp: 200 },
                  { date: "2026-03-24", action: "Completed lesson", title: "Freedom of Speech and Expression", xp: 50 },
                  { date: "2026-03-23", action: "Earned badge", title: "Constitutional Scholar", xp: 200 }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground truncate">{activity.title}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <Badge variant="secondary" className="text-xs">+{activity.xp} XP</Badge>
                      <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

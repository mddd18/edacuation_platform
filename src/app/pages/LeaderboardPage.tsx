import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Trophy, Medal, Award, TrendingUp } from "lucide-react";
import { leaderboardData } from "../data/user";

export function LeaderboardPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2 flex items-center gap-3">
          <Trophy className="w-8 h-8 text-amber-500" />
          Leaderboard
        </h1>
        <p className="text-muted-foreground">
          See how you rank among fellow law students
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {leaderboardData.slice(0, 3).map((entry, index) => {
          const icons = [
            { icon: Trophy, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200" },
            { icon: Medal, color: "text-slate-400", bg: "bg-slate-50", border: "border-slate-200" },
            { icon: Award, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" }
          ];
          const style = icons[index];
          const Icon = style.icon;

          return (
            <Card key={entry.rank} className={`border-2 ${style.border}`}>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${style.bg} rounded-full mb-3`}>
                    <Icon className={`w-8 h-8 ${style.color}`} />
                  </div>
                  <div className="mb-2">
                    <h3 className="font-semibold text-lg">{entry.name}</h3>
                    <p className="text-sm text-muted-foreground">Rank #{entry.rank}</p>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Level</p>
                      <p className="font-semibold">{entry.level}</p>
                    </div>
                    <div className="h-8 w-px bg-border" />
                    <div>
                      <p className="text-muted-foreground">XP</p>
                      <p className="font-semibold">{entry.xp.toLocaleString()}</p>
                    </div>
                    <div className="h-8 w-px bg-border" />
                    <div>
                      <p className="text-muted-foreground">Badges</p>
                      <p className="font-semibold">{entry.badges}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Full Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            All Rankings
          </CardTitle>
          <CardDescription>Complete leaderboard standings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {leaderboardData.map((entry) => {
              const isCurrentUser = entry.name === "You";
              
              return (
                <div
                  key={entry.rank}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                    isCurrentUser
                      ? "bg-accent/10 border-accent"
                      : "bg-white hover:bg-muted/30"
                  }`}
                >
                  {/* Rank */}
                  <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-lg font-semibold">
                    {entry.rank}
                  </div>

                  {/* Name */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{entry.name}</h4>
                      {isCurrentUser && (
                        <Badge variant="secondary" className="text-xs">You</Badge>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="hidden sm:flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="text-muted-foreground text-xs">Level</p>
                      <p className="font-semibold">{entry.level}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground text-xs">XP</p>
                      <p className="font-semibold">{entry.xp.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground text-xs">Badges</p>
                      <p className="font-semibold">{entry.badges}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-primary">4th</p>
              <p className="text-sm text-muted-foreground">Current Rank</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-secondary">↑2</p>
              <p className="text-sm text-muted-foreground">This Week</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-accent">340</p>
              <p className="text-sm text-muted-foreground">XP to Level 9</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-orange-500">160</p>
              <p className="text-sm text-muted-foreground">XP This Week</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

export interface UserProgress {
  level: number;
  xp: number;
  xpToNextLevel: number;
  completedLessons: string[];
  completedCases: string[];
  badges: Badge[];
  streak: number;
}

export const badges: Badge[] = [
  {
    id: "1",
    name: "Ilk qadamlar",
    description: "Birinchi darsingizni yakunlang",
    icon: "BookOpen",
    earned: true,
    earnedDate: "2026-03-20"
  },
  {
    id: "2",
    name: "Konstitutsiya bilimdoni",
    description: "Barcha Konstitutsiyaviy huquq modullarini o'zlashtiring",
    icon: "Scale",
    earned: true,
    earnedDate: "2026-03-23"
  },
  {
    id: "3",
    name: "Holat yechuvchisi",
    description: "5 ta amaliy holatni muvaffaqiyatli yeching",
    icon: "Award",
    earned: true,
    earnedDate: "2026-03-25"
  },
  {
    id: "4",
    name: "Tanqidiy fikrlovchi",
    description: "10 ta kunlik huquqiy muammolarga ovoz bering",
    icon: "Brain",
    earned: false
  },
  {
    id: "5",
    name: "Huquq himoyachisi",
    description: "Barcha Inson huquqlari modullarini yakunlang",
    icon: "Shield",
    earned: false
  },
  {
    id: "6",
    name: "Haftalik jangchi",
    description: "7 kunlik uzluksiz o'qish seriyasini saqlang",
    icon: "Flame",
    earned: false
  }
];

export const userProgress: UserProgress = {
  level: 8,
  xp: 2340,
  xpToNextLevel: 3000,
  completedLessons: ["1", "2"],
  completedCases: ["1", "2", "3"],
  badges: badges,
  streak: 5
};

export interface LeaderboardEntry {
  rank: number;
  name: string;
  level: number;
  xp: number;
  badges: number;
}

export const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: "Sarah Chen", level: 12, xp: 5430, badges: 8 },
  { rank: 2, name: "Marcus Johnson", level: 11, xp: 4890, badges: 7 },
  { rank: 3, name: "Emma Rodriguez", level: 10, xp: 4210, badges: 6 },
  { rank: 4, name: "Siz", level: 8, xp: 2340, badges: 3 },
  { rank: 5, name: "Alex Kim", level: 8, xp: 2180, badges: 4 },
  { rank: 6, name: "Jordan Taylor", level: 7, xp: 1950, badges: 3 },
  { rank: 7, name: "Maya Patel", level: 7, xp: 1820, badges: 5 },
  { rank: 8, name: "Chris Anderson", level: 6, xp: 1640, badges: 2 },
  { rank: 9, name: "Lisa Wang", level: 6, xp: 1520, badges: 4 },
  { rank: 10, name: "Ryan Martinez", level: 5, xp: 1350, badges: 3 }
];

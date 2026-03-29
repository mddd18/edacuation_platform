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
    name: "Dastlabki qadamlar",
    description: "Birinchi darsni yakunlang",
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

// ... leaderboardData o'z holicha qolaveradi

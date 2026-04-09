import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { 
  User, Award, BookOpen, Scale, TrendingUp, Flame, Trophy,
  Calendar, CheckCircle2, Lock, Edit2, Settings, Zap, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// TARJIMALAR
const translations = {
  UZ: {
    cabinet: "Shaxsiy Kabinet",
    cabinetDesc: "O'quv jarayoni va yutuqlaringiz markazi",
    settings: "Sozlamalar",
    editProfile: "Profilni tahrirlash",
    futureLawyer: "Kelajak Huquqshunosi",
    level: "Daraja",
    badges: "Nishonlar",
    streak: "Seriya",
    levelProgress: "Daraja o'sishi",
    untilNextLevel: "Keyingi darajagacha yana",
    need: "XP kerak",
    lessons: "Darslar",
    cases: "Holatlar",
    dailyStreak: "Kunlik seriya",
    rank: "Reyting",
    days: "kun",
    achievements: "Yutuqlar Kolleksiyasi",
    totalEarned: "Jami olingan",
    since: "dan beri",
    badgesData: {
      b1Title: "Ilk Qadam", b1Desc: "Birinchi darsni muvaffaqiyatli tugatdingiz",
      b2Title: "Yosh Yurist", b2Desc: "Birinchi amaliy holatni tahlil qildingiz",
      b3Title: "Olovli Yosh", b3Desc: "Ketma-ket 3 kunlik seriya qildingiz",
      b4Title: "Bilimdon", b4Desc: "Jami 5 ta darsni muvaffaqiyatli tugatdingiz",
      b5Title: "Adolat Himoyachisi", b5Desc: "Jami 5 ta holatda to'g'ri qaror qabul qildingiz",
      b6Title: "Chempion", b6Desc: "Reytingda kuchli uchtalikka (Top-3) kirdingiz",
    }
  },
  QQ: {
    cabinet: "Jeke Kabinet",
    cabinetDesc: "Oqıw procesi hám jetiskenliklerińiz orayı",
    settings: "Sazlawlar",
    editProfile: "Profildi ózgertiw",
    futureLawyer: "Keleshek Huquqtanıwshısı",
    level: "Dáreje",
    badges: "Nıshanlar",
    streak: "Seriya",
    levelProgress: "Dáreje ósiwi",
    untilNextLevel: "Keyingi dárejege shekem jene",
    need: "XP kerek",
    lessons: "Sabaqlar",
    cases: "Jaǵdaylar",
    dailyStreak: "Kúnlik seriya",
    rank: "Reyting",
    days: "kún",
    achievements: "Jetiskenlikler Kollekciyası",
    totalEarned: "Jámi alınǵan",
    since: "berli",
    badgesData: {
      b1Title: "Dáslepki Qádem", b1Desc: "Birinshi sabaqtı tabıslı juwmaqladıńız",
      b2Title: "Jas Yurist", b2Desc: "Birinshi ámeliy jaǵdaydı analiz qıldıńız",
      b3Title: "Jalınlı Jas", b3Desc: "Biraqtan 3 kúnlik seriya qıldıńız",
      b4Title: "Bilimdan", b4Desc: "Jámi 5 sabaqtı tabıslı juwmaqladıńız",
      b5Title: "Ádillik Qorǵawshısı", b5Desc: "Jámi 5 jaǵdayda durıs qarar qabıl ettińiz",
      b6Title: "Chempion", b6Desc: "Reytingte kúshli úshlikke (Top-3) kirdińiz",
    }
  }
};

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } } };

const badgeIcons: Record<string, any> = { BookOpen, Scale, Award, Brain: TrendingUp, Shield: Trophy, Flame };

export function ProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const [userStats, setUserStats] = useState({ lessons: 0, cases: 0, rank: 0 });
  const [loading, setLoading] = useState(true);
  
  // TIZIMDAGI TILNI OLISH
  const lang = (localStorage.getItem('appLang') as 'UZ' | 'QQ') || 'UZ';
  const t = translations[lang];

  useEffect(() => {
    const fetchProfile = async () => {
      const savedUser = localStorage.getItem("user");
      if (!savedUser) return;
      const parsedUser = JSON.parse(savedUser);

      const { data: user } = await supabase.from('users').select('*').eq('id', parsedUser.id).single();
      const { count: lessonsCount } = await supabase.from('user_progress').select('*', { count: 'exact', head: true }).eq('user_id', parsedUser.id).eq('is_completed', true);
      const { count: casesCount } = await supabase.from('user_case_progress').select('*', { count: 'exact', head: true }).eq('user_id', parsedUser.id).eq('is_solved', true);
      const { count: higherXpCount } = await supabase.from('users').select('*', { count: 'exact', head: true }).gt('xp', user?.xp || 0);

      if (user) {
        setUserData(user);
        setUserStats({
          lessons: lessonsCount || 0,
          cases: casesCount || 0,
          rank: (higherXpCount || 0) + 1
        });
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
    </div>
  );

  if (!userData) return null;

  const allBadges = [
    { id: 1, name: t.badgesData.b1Title, description: t.badgesData.b1Desc, icon: "BookOpen", earned: userStats.lessons > 0 },
    { id: 2, name: t.badgesData.b2Title, description: t.badgesData.b2Desc, icon: "Scale", earned: userStats.cases > 0 },
    { id: 3, name: t.badgesData.b3Title, description: t.badgesData.b3Desc, icon: "Flame", earned: (userData.streak || 0) >= 3 },
    { id: 4, name: t.badgesData.b4Title, description: t.badgesData.b4Desc, icon: "Brain", earned: userStats.lessons >= 5 },
    { id: 5, name: t.badgesData.b5Title, description: t.badgesData.b5Desc, icon: "Shield", earned: userStats.cases >= 5 },
    { id: 6, name: t.badgesData.b6Title, description: t.badgesData.b6Desc, icon: "Award", earned: userStats.rank <= 3 && userStats.rank > 0 },
  ];

  const earnedBadges = allBadges.filter(b => b.earned);
  const lockedBadges = allBadges.filter(b => !b.earned);

  const xp = userData.xp || 0;
  const level = userData.level || 1;
  const targetXp = level * 1000;
  const currentXpInLevel = xp % 1000;
  const progressPercentage = (currentXpInLevel / 1000) * 100;

  const stats = [
    { label: t.lessons, value: userStats.lessons, icon: BookOpen, color: "text-blue-500 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { label: t.cases, value: userStats.cases, icon: Scale, color: "text-purple-500 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-900/30" },
    { label: t.dailyStreak, value: `${userData.streak || 0} ${t.days}`, icon: Flame, color: "text-orange-500 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-900/30" },
    { label: t.rank, value: `#${userStats.rank}`, icon: Trophy, color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-100 dark:bg-yellow-900/30" },
  ];

  const creationDate = new Date(userData.created_at).toLocaleDateString(lang === 'UZ' ? 'uz-UZ' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-slate-50 via-gray-100 to-blue-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/20 transition-colors duration-300 pb-28 md:pb-10 overflow-x-hidden">
      
      <motion.div 
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-200 dark:border-slate-700/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-blue-500 dark:text-blue-400 animate-pulse" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-950 dark:text-white">{t.cabinet}</h1>
          </div>
          <p className="text-muted-foreground dark:text-slate-400 mt-1 text-base md:text-lg">{t.cabinetDesc}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="gap-2 rounded-full shadow-sm hover:bg-gray-100 dark:hover:bg-slate-800 dark:border-slate-600 dark:text-slate-200">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">{t.settings}</span>
          </Button>
          <Button className="gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md border-none">
            <Edit2 className="w-4 h-4" />
            <span className="hidden sm:inline">{t.editProfile}</span>
          </Button>
        </div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 xl:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="xl:col-span-1 space-y-8" variants={itemVariants}>
          <Card className="overflow-hidden border-none shadow-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg relative transition-colors duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 pointer-events-none" />
            <CardContent className="pt-10 pb-8 relative z-10">
              <div className="text-center">
                <motion.div 
                  className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full mb-5 p-1 shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  <div className="w-full h-full bg-white dark:bg-slate-800 rounded-full flex items-center justify-center">
                    <User className="w-14 h-14 text-blue-500 dark:text-blue-400" />
                  </div>
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-950 dark:text-white break-words">{userData.first_name}</h2>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-300 bg-blue-100 dark:bg-blue-500/20 px-3 py-1 rounded-full inline-block mt-1 mb-6">{t.futureLawyer}</p>
                
                <div className="grid grid-cols-3 gap-2 border border-gray-100 dark:border-slate-700/50 rounded-2xl p-4 bg-gray-50/50 dark:bg-slate-900/50">
                  <div className="text-center">
                    <p className="text-3xl font-extrabold text-blue-500 dark:text-blue-400">{level}</p>
                    <p className="text-[10px] font-semibold text-muted-foreground dark:text-slate-400 uppercase tracking-wider">{t.level}</p>
                  </div>
                  <div className="text-center border-x border-gray-100 dark:border-slate-700/50">
                    <p className="text-3xl font-extrabold text-purple-500 dark:text-purple-400">{earnedBadges.length}</p>
                    <p className="text-[10px] font-semibold text-muted-foreground dark:text-slate-400 uppercase tracking-wider">{t.badges}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-extrabold text-orange-500 dark:text-orange-400">{userData.streak || 0}</p>
                    <p className="text-[10px] font-semibold text-muted-foreground dark:text-slate-400 uppercase tracking-wider">{t.streak}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg border-none overflow-hidden relative group transition-colors duration-300">
            <motion.div 
              className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <CardHeader className="relative z-10 pb-2">
              <CardTitle className="text-white flex items-center justify-between">
                {t.levelProgress}
                <TrendingUp className="w-5 h-5 text-white/70" />
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 space-y-4">
              <div className="flex justify-between items-end">
                <p className="text-4xl md:text-5xl font-extrabold">{xp}<span className="text-lg md:text-xl font-medium text-white/70"> / {targetXp} XP</span></p>
              </div>
              <Progress value={progressPercentage} className="h-3 bg-white/20" />
              <p className="text-xs md:text-sm text-center text-blue-100 font-medium bg-white/10 py-1.5 rounded-lg">
                {t.untilNextLevel} <span className="font-bold text-yellow-300">{targetXp - xp} {t.need}</span>
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="xl:col-span-3 space-y-8">
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5" variants={containerVariants}>
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.label} variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }}>
                  <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-800">
                    <CardContent className="p-4 md:p-6 flex items-center gap-3 md:gap-4">
                      <div className={`${stat.bg} p-2.5 md:p-3 rounded-xl shrink-0`}>
                        <Icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs md:text-sm font-medium text-muted-foreground dark:text-slate-400 truncate">{stat.label}</p>
                        <p className="text-xl md:text-2xl font-bold text-gray-950 dark:text-white truncate">{stat.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-none shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm transition-colors duration-300">
              <CardHeader className="border-b border-gray-100 dark:border-slate-700/50 pb-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <CardTitle className="text-xl md:text-2xl font-bold flex items-center gap-3 dark:text-white">
                    <Award className="w-6 h-6 md:w-7 md:h-7 text-purple-500 dark:text-purple-400" />
                    {t.achievements}
                  </CardTitle>
                  <div className="text-xs md:text-sm font-medium text-muted-foreground dark:text-slate-300 bg-gray-100 dark:bg-slate-700 px-4 py-1.5 rounded-full inline-flex w-fit">
                    {t.totalEarned}: <span className="font-bold text-purple-600 dark:text-purple-400 text-sm md:text-base ml-1">{earnedBadges.length}</span> / {allBadges.length}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <AnimatePresence>
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
                          className="group flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-md hover:border-purple-500/20 dark:hover:border-purple-500/30 transition-all duration-300 cursor-pointer relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 dark:via-purple-500/10 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                          <div className="bg-purple-100 dark:bg-purple-900/30 p-3 md:p-4 rounded-xl flex-shrink-0 transition-colors">
                            <Icon className="w-6 h-6 md:w-7 md:h-7 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div className="flex-1 min-w-0 relative z-10">
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <h4 className="font-bold text-base md:text-lg text-gray-950 dark:text-white truncate">{badge.name}</h4>
                              <div className="bg-purple-100 dark:bg-purple-900/30 p-1 rounded-full flex-shrink-0">
                                <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-600 dark:text-purple-400" />
                              </div>
                            </div>
                            <p className="text-xs md:text-sm text-muted-foreground dark:text-slate-400 mb-3 line-clamp-2">
                              {badge.description}
                            </p>
                            <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-medium text-muted-foreground dark:text-slate-400 bg-gray-50 dark:bg-slate-900/50 px-2.5 py-1 rounded-full inline-flex">
                              <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5 text-purple-500 dark:text-purple-400" />
                              {creationDate} {t.since}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}

                    {lockedBadges.map((badge) => {
                      const Icon = badgeIcons[badge.icon] || Award;
                      return (
                        <motion.div
                          key={badge.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.6 }}
                          whileHover={{ opacity: 1, scale: 1.01 }}
                          className="flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-gray-50/50 dark:bg-slate-900/30 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl"
                        >
                          <div className="bg-gray-100 dark:bg-slate-800 p-3 md:p-4 rounded-xl flex-shrink-0 border border-gray-200 dark:border-slate-700">
                            <Icon className="w-6 h-6 md:w-7 md:h-7 text-muted-foreground dark:text-slate-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <h4 className="font-semibold text-base md:text-lg text-gray-700 dark:text-slate-300 truncate">{badge.name}</h4>
                              <Lock className="w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground dark:text-slate-500 flex-shrink-0" />
                            </div>
                            <p className="text-xs md:text-sm text-muted-foreground dark:text-slate-500">
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

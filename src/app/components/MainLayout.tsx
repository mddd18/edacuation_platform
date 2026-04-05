import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase"; // <--- Supabase import qilindi
import { 
  Scale, Trophy, Book, BookOpen, User, Home, GraduationCap, 
  PlaySquare, Sun, Moon, Menu, X, LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  // AUTH VA KUNLIK SERIYA (STREAK) TEKSHIRUVI
  useEffect(() => {
    const checkAuthAndStreak = async () => {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        navigate("/login", { replace: true });
        return;
      }

      const user = JSON.parse(userStr);
      setIsAuthChecked(true);

      // --- KUNLIK SERIYA LOGIKASI ---
      // Bugungi sanani O'zbekiston vaqti bilan formatlash (YYYY-MM-DD)
      const today = new Date().toLocaleDateString('en-CA'); 

      const { data: dbUser } = await supabase
        .from('users')
        .select('streak, last_active_date')
        .eq('id', user.id)
        .single();

      if (dbUser) {
        let newStreak = dbUser.streak || 0;
        const lastActive = dbUser.last_active_date;

        // Agar bugun hali kirmagan bo'lsa
        if (lastActive !== today) {
          if (lastActive) {
            // Kunlar farqini hisoblash
            const lastDate = new Date(lastActive);
            const currentDate = new Date(today);
            const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
              // Kecha kirgan, seriya davom etadi
              newStreak += 1;
            } else if (diffDays > 1) {
              // Kechadan oldin kirgan, seriya uzildi, yana 1 dan boshlaydi
              newStreak = 1;
            }
          } else {
            // Umuman birinchi marta kirishi
            newStreak = 1;
          }

          // Bazani yangilash
          await supabase.from('users').update({
            streak: newStreak,
            last_active_date: today
          }).eq('id', user.id);

          // LocalStorage'ni ham yangilash
          localStorage.setItem("user", JSON.stringify({ ...user, streak: newStreak }));
        }
      }
    };

    checkAuthAndStreak();
  }, [navigate]);

  // QORONG'U REJIM
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const navItems = [
    { path: "/", icon: Home, label: "Asosiy panel" },
    { path: "/lessons", icon: BookOpen, label: "Darslar" },
    { path: "/cases", icon: Scale, label: "Amaliy holatlar" },
    { path: "/dictionary", icon: Book, label: "Bosqichli Lug'at" },
    { path: "/videos", icon: PlaySquare, label: "Video Qo'llanmalar" },
    { path: "/leaderboard", icon: Trophy, label: "Reyting" },
    { path: "/profile", icon: User, label: "Profil" },
  ];

  const mobileBottomNav = [
    { path: "/", icon: Home, label: "Asosiy" },
    { path: "/lessons", icon: BookOpen, label: "Darslar" },
    { path: "/cases", icon: Scale, label: "Holatlar" },
    { path: "/profile", icon: User, label: "Profil" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!isAuthChecked) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex h-[100dvh] bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden select-none md:select-auto">
      
      {/* 📱 MOBILE SIDEBAR BACKDROP */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* 💻 SIDEBAR (Kompyuter va Mobile Menyu) */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-[70] w-72 flex flex-col transition-transform duration-300 ease-in-out shadow-2xl md:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: isDarkMode 
            ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' 
            : 'linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%)'
        }}
      >
        <div className="p-6 border-b border-white/10 relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-xl p-2.5 rounded-xl shadow-lg border border-white/20">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl text-white tracking-tight">Qonun va Huquq</h1>
              <p className="text-[11px] font-bold text-white/70 uppercase tracking-widest mt-0.5">Bilim — bu kuch</p>
            </div>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden p-2 bg-white/10 rounded-lg text-white active:scale-90 transition-transform">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-5 relative z-10 overflow-y-auto">
          <div className="space-y-2.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                    active
                      ? "bg-white/20 backdrop-blur-md shadow-lg text-white font-bold"
                      : "text-white/70 hover:bg-white/10 hover:text-white font-medium"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[15px]">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
        
        {/* Sidebar pastki qismi: Tema va Chiqish */}
        <div className="p-5 border-t border-white/10 relative z-10 space-y-3">
          <button onClick={toggleTheme} className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
             <span className="text-sm font-medium">Rejimni o'zgartirish</span>
             {isDarkMode ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/20 text-red-100 hover:bg-red-500/40 transition-colors">
             <LogOut className="w-5 h-5" />
             <span className="text-sm font-bold">Tizimdan chiqish</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-[100dvh] relative w-full overflow-hidden">
        
        {/* 📱 MOBILE HEADER */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
           <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-slate-600 dark:text-slate-300 active:scale-95 transition-transform">
             <Menu className="w-6 h-6" />
           </button>
           <h2 className="font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
             Qonun va Huquq
           </h2>
           <div className="w-6" />
        </header>

        {/* ASOSIY QISM */}
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 pb-24 md:pb-0 relative z-0">
          <Outlet />
        </main>

        {/* 📱 MOBILE BOTTOM NAVIGATION */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-t border-slate-200 dark:border-slate-800 z-50 px-2 py-2 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.05)] rounded-t-[24px]">
          <div className="flex items-center justify-around">
            {mobileBottomNav.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex flex-col items-center gap-1 p-2 min-w-[64px]"
                >
                  <div className={`p-2 rounded-xl transition-all duration-300 ${
                    active 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110 -translate-y-1' 
                    : 'text-slate-400 dark:text-slate-500'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                    active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'
                  }`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

      </div>
    </div>
  );
}

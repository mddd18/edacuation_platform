import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase"; // <-- SUPABASE IMPORT QILINDI
import { 
  Scale, 
  Trophy, 
  Book, 
  BookOpen, 
  User, 
  Home,
  GraduationCap,
  Sparkles,
  PlaySquare,
  Sun,
  Moon,
  Menu,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  // --- HAQIQIY SUPABASE AUTH GUARD ---
  useEffect(() => {
    const checkUser = async () => {
      // 1. Supabase'dan joriy foydalanuvchi sessiyasini so'raymiz
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Agar sessiya bo'lmasa, loginga otamiz
        navigate("/login", { replace: true });
      } else {
        // Agar tizimga kirgan bo'lsa, ruxsat beramiz
        setIsAuthChecked(true);
      }
    };

    checkUser();

    // 2. Foydalanuvchi tizimdan chiqib ketsa (Logout), darhol sezish uchun quloq solamiz
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate("/login", { replace: true });
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  // Qorong'u rejim sozlamalari
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

  // Yuklanish ekrani
  if (!isAuthChecked) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Asosiy dizayn (Hech narsa o'zgarmadi, faqat himoya haqiqiylashdi)
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden select-none md:select-auto">
      
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

      <aside 
        className={`fixed md:static inset-y-0 left-0 z-[70] w-72 flex flex-col transition-transform duration-300 ease-in-out shadow-2xl ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{
          background: isDarkMode 
            ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' 
            : 'linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%)'
        }}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
        
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
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                    active
                      ? "bg-white/20 backdrop-blur-md shadow-lg text-white font-bold border border-white/20"
                      : "text-white/70 hover:bg-white/10 hover:backdrop-blur-sm hover:text-white font-medium"
                  }`}
                >
                  <Icon className={`w-5 h-5 relative z-10 ${active ? "animate-pulse" : ""}`} />
                  <span className="relative z-10 text-[15px]">{item.label}</span>
                  {active && <div className="ml-auto w-1.5 h-1.5 bg-yellow-300 rounded-full shadow-[0_0_10px_rgba(253,224,71,0.8)]" />}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-5 border-t border-white/10 relative z-10 hidden md:block">
          <button 
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-4 py-3 mb-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-white font-medium"
          >
            <span className="text-sm">{isDarkMode ? "Kunduzgi rejim" : "Tungi rejim"}</span>
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-blue-200" />}
          </button>

          <div className="rounded-2xl p-4 bg-black/20 backdrop-blur-md border border-white/10 shadow-inner">
            <p className="text-xs font-bold text-white/90 mb-1.5 flex items-center gap-2 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Maslahat
            </p>
            <p className="text-sm text-white/80 leading-relaxed font-medium">Davlat xizmatlaridan uydan turib foydalanishni o'rganing!</p>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-screen relative w-full">
        
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800 z-30 transition-colors duration-300 sticky top-0">
          <div className="flex items-center gap-2.5">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-1.5 rounded-lg shadow-sm">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Qonun va Huquq
            </h1>
          </div>
          
          <button 
            onClick={toggleTheme}
            className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 active:scale-90 transition-transform"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-indigo-500" />}
          </button>
        </div>

        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300 pb-20 md:pb-0">
          <Outlet />
        </main>

        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-gray-200 dark:border-slate-800 pb-1 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-around px-1 py-1">
            
            {mobileBottomNav.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex flex-col items-center justify-center w-16 h-14 relative"
                >
                  <div className={`flex flex-col items-center justify-center transition-all duration-300 ${active ? '-translate-y-1' : ''}`}>
                    <Icon className={`w-6 h-6 mb-1 ${active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                    <span className={`text-[10px] font-bold transition-all duration-300 ${active ? 'text-blue-600 dark:text-blue-400 opacity-100' : 'text-slate-400 dark:text-slate-500 opacity-80'}`}>
                      {item.label}
                    </span>
                  </div>
                  {active && (
                    <motion.div 
                      layoutId="bottomNavIndicator"
                      className="absolute bottom-0 w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
            
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex flex-col items-center justify-center w-16 h-14 active:scale-95 transition-transform"
            >
              <div className="flex flex-col items-center justify-center">
                <Menu className="w-6 h-6 mb-1 text-slate-400 dark:text-slate-500" />
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 opacity-80">
                  Ko'proq
                </span>
              </div>
            </button>
            
          </div>
        </div>
        
      </div>
    </div>
  );
}

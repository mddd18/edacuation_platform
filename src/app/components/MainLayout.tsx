import { Outlet, Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { 
  Scale, 
  Trophy, 
  Book, 
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { path: "/cases", icon: Scale, label: "Amaliy holatlar" },
    { path: "/dictionary", icon: Book, label: "Bosqichli Lug'at" },
    { path: "/videos", icon: PlaySquare, label: "Video Qo'llanmalar" }, // VIDEO QO'LLANMALAR QO'SHILDI
    { path: "/leaderboard", icon: Trophy, label: "Reyting" },
    { path: "/profile", icon: User, label: "Profil" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  // Telefonda menyuni yopish (biron sahifaga o'tganda)
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      
      {/* MOBIL UCHUN QORONG'U ORQA FON (OVERLAY) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* YON PANEL (SIDEBAR) */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 flex flex-col transition-transform duration-300 ease-in-out shadow-2xl ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{
          background: isDarkMode 
            ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' 
            : 'linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%)'
        }}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
        
        {/* Logo qismi */}
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
          {/* Mobil menyuni yopish tugmasi */}
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden p-2 bg-white/10 rounded-lg text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menyu ro'yxati */}
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

        {/* Tungi Rejim tugmasi va Footer */}
        <div className="p-5 border-t border-white/10 relative z-10">
          <button 
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-4 py-3 mb-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-white font-medium"
          >
            <span className="text-sm">{isDarkMode ? "Kunduzgi rejim" : "Tungi rejim"}</span>
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-blue-200" />}
          </button>

          <div className="rounded-2xl p-4 bg-black/20 backdrop-blur-md border border-white/10 shadow-inner hidden md:block">
            <p className="text-xs font-bold text-white/90 mb-1.5 flex items-center gap-2 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Maslahat
            </p>
            <p className="text-sm text-white/80 leading-relaxed font-medium">Davlat xizmatlaridan uydan turib foydalanishni o'rganing!</p>
          </div>
        </div>
      </aside>

      {/* ASOSIY KONTENT QISMI */}
      <div className="flex-1 flex flex-col h-screen relative">
        {/* MOBIL UCHUN TEPADAGI NAVBAR */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 z-30 transition-colors duration-300 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 dark:bg-blue-500/20 p-1.5 rounded-lg">
              <GraduationCap className="w-5 h-5 text-primary dark:text-blue-400" />
            </div>
            <h1 className="font-extrabold text-lg text-gray-900 dark:text-white">Qonun va Huquq</h1>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(true)} 
            className="p-2 bg-gray-100 dark:bg-slate-800 rounded-lg text-gray-700 dark:text-slate-200"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* SAHIFALAR CHIQADIGAN JOY */}
        <main className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

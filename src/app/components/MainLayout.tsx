import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
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

  // --- YANGI AUTH GUARD (LOCALSTORAGE ORQALI) ---
  useEffect(() => {
    const user = localStorage.getItem("user");
    
    if (!user) {
      // Agar xotirada foydalanuvchi bo'lmasa, login sahifasiga yuboramiz
      navigate("/login", { replace: true });
    } else {
      // Agar bo'lsa, platformaga kirishga ruxsat beramiz
      setIsAuthChecked(true);
    }
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

  // Yuklanish ekrani (Auth tekshirilayotganda)
  if (!isAuthChecked) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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
        {/* Sidebar dizayni o'zgarmasdan qoladi */}
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
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden p-2 bg-white/10 rounded-lg text-white active:scale-90">
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
        
        {/* Tungi rejim tugmasi pastda */}
        <div className="p-5 border-t border-white/10 relative z-10">
          <button onClick={toggleTheme} className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/10 text-white">
             <span className="text-sm">Rejimni o'zgartirish</span>
             {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-screen relative w-full overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 pb-20 md:pb-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

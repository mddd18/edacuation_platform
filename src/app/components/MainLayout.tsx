import { Outlet, Link, useLocation, useNavigate } from "react-router"; // <-- useNavigate QO'SHILDI
import { useState, useEffect } from "react";
// ... qolgan barcha lucide-react importlari bir xil qoladi
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
  const navigate = useNavigate(); // <-- NAVIGATSIYA HOOKI QO'SHILDI
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false); // <-- TEKSHIRUV HOLATI UCHUN

  // DASTURGA KIRGANLIGINI TEKSHIRISH (AUTH GUARD)
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem("isAuthenticated");
      if (!isAuth) {
        navigate("/login", { replace: true }); // Kirmagan bo'lsa darhol /login ga otadi
      } else {
        setIsAuthChecked(true); // Kirgan bo'lsa, kontentni ko'rsatishga ruxsat beradi
      }
    };
    
    checkAuth();
  }, [navigate]);

  // Qolgan useEffect (Dark Mode va Mobil menyu uchun) bir xil qoladi
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // ... Qolgan kodlar (toggleTheme, navItems, va h.k.) mutlaqo bir xil qoladi

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

  // AGAR HALI TEKSHIRUV YAKUNLANMAGAN BO'LSA, OQ EKRAN KO'RSATMAY, KUTISH REJIMIDA TURADI
  if (!isAuthChecked) {
    return <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
             <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
           </div>;
  }

  // BARCHASI YAXSHI BO'LSA (Ya'ni login qilgan bo'lsa), RETURN DAN KEYINGI ASOSIY KOD KO'RSATILADI
  return (
    // select-none orqali mobilda tugmalarni bosganda matn belgilanishini oldini olamiz
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden select-none md:select-auto">
//... qolgan barcha kodlaringiz (aside, nav, main, Outlet) o'zgarishsiz qolaveradi!

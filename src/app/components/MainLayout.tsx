import { Outlet, Link, useLocation } from "react-router";
import { 
  BookOpen, 
  Scale, 
  Trophy, 
  Book, 
  User, 
  Home,
  GraduationCap,
  Sparkles
} from "lucide-react";

export function MainLayout() {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Asosiy panel" },
    { path: "/cases", icon: Scale, label: "Amaliy holatlar" },
    { path: "/dictionary", icon: Book, label: "Lug'at" },
    { path: "/leaderboard", icon: Trophy, label: "Reyting" },
    { path: "/profile", icon: User, label: "Profil" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Sidebar with gradient background */}
      <aside 
        className="w-64 flex flex-col relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        {/* Animated glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        
        {/* Logo/Header */}
        <div className="p-6 border-b border-white/20 relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-lg p-2 rounded-xl shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg text-white">Qonun va Huquq</h1>
                <Sparkles className="w-4 h-4 text-yellow-300" />
              </div>
              <p className="text-xs text-white/80">Bilimingizni oshiring</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 relative z-10">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    active
                      ? "bg-white/25 backdrop-blur-lg shadow-lg text-white scale-105"
                      : "text-white/80 hover:bg-white/15 hover:backdrop-blur-lg hover:text-white hover:scale-102"
                  }`}
                >
                  {active && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
                  )}
                  <Icon className="w-5 h-5 relative z-10" />
                  <span className="relative z-10 font-medium">{item.label}</span>
                  {active && (
                    <div className="ml-auto w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer Info */}
        <div className="p-4 border-t border-white/20 relative z-10">
          <div 
            className="rounded-xl p-4 backdrop-blur-xl shadow-xl border border-white/20"
            style={{
              background: 'rgba(255, 255, 255, 0.15)'
            }}
          >
            <p className="text-xs text-white/90 mb-1 flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-yellow-300" />
              Foydali maslahat
            </p>
            <p className="text-sm text-white">Seriyani saqlab qolish uchun har kuni darslarni bajaring!</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

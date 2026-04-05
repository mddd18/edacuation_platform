import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  Users, BookOpen, Scale, ShieldCheck, 
  Search, Filter, Loader2, ArrowLeft, TrendingUp
} from "lucide-react";
import { motion } from "motion/react";

export function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalLessons: 0, totalCases: 0 });
  const [loading, setLoading] = useState(true);
  
  // Filtrlash uchun statelar
  const [searchQuery, setSearchQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState("Barchasi");

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      const savedUser = localStorage.getItem("user");
      if (!savedUser) {
        navigate("/login");
        return;
      }

      const currentUser = JSON.parse(savedUser);
      
      // Admin ekanligini tekshirish
      const { data: adminCheck } = await supabase.from('users').select('is_admin').eq('id', currentUser.id).single();
      
      if (!adminCheck?.is_admin) {
        navigate("/"); // Admin bo'lmasa, oddiy dashboard'ga haydaymiz
        return;
      }

      // Hamma o'quvchilarni tortish
      const { data: allUsers } = await supabase.from('users').select('*').order('created_at', { ascending: false });
      
      // Umumiy statistikalarni hisoblash uchun
      const { count: lessonsCount } = await supabase.from('user_progress').select('*', { count: 'exact', head: true }).eq('is_completed', true);
      const { count: casesCount } = await supabase.from('user_case_progress').select('*', { count: 'exact', head: true }).eq('is_solved', true);

      if (allUsers) {
        setUsers(allUsers);
        setStats({
          totalUsers: allUsers.length,
          totalLessons: lessonsCount || 0,
          totalCases: casesCount || 0
        });
      }
      setLoading(false);
    };

    fetchAdminData();
  }, [navigate]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
    </div>
  );

  // Filtrlash mantiqi
  const filteredUsers = users.filter(user => {
    const matchesSearch = (user.first_name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (user.email || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = gradeFilter === "Barchasi" || (user.grade && user.grade.toString() === gradeFilter);
    return matchesSearch && matchesGrade;
  });

  const availableGrades = ["Barchasi", ...Array.from(new Set(users.map(u => u.grade?.toString()).filter(Boolean)))].sort();

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 min-h-screen pb-24">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Saytga qaytish
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-4xl font-black dark:text-white tracking-tight">Admin Boshqaruvi</h1>
          </div>
        </div>
        <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 px-4 py-1.5 text-sm font-bold border-0 hidden md:inline-flex">
          Tizim Holati: Faol
        </Badge>
      </div>

      {/* STATISTIKA KARTALARI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-100 font-bold text-sm uppercase tracking-wider mb-1">Jami O'quvchilar</p>
                  <h3 className="text-4xl font-black">{stats.totalUsers}</h3>
                </div>
                <div className="p-3 bg-white/20 rounded-2xl"><Users className="w-6 h-6" /></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-emerald-100 font-bold text-sm uppercase tracking-wider mb-1">O'qilgan Darslar</p>
                  <h3 className="text-4xl font-black">{stats.totalLessons}</h3>
                </div>
                <div className="p-3 bg-white/20 rounded-2xl"><BookOpen className="w-6 h-6" /></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-purple-100 font-bold text-sm uppercase tracking-wider mb-1">Yechilgan Holatlar</p>
                  <h3 className="text-4xl font-black">{stats.totalCases}</h3>
                </div>
                <div className="p-3 bg-white/20 rounded-2xl"><Scale className="w-6 h-6" /></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* O'QUVCHILAR RO'YXATI VA FILTRLAR */}
      <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 rounded-[24px] overflow-hidden">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-xl font-bold dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-500" /> O'quvchilar Bazasi
            </CardTitle>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              {/* Qidiruv */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Ism yoki Email..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:text-white"
                />
              </div>
              
              {/* Sinf bo'yicha Filtr */}
              <div className="relative w-full sm:w-auto flex items-center">
                <Filter className="absolute left-3 w-4 h-4 text-slate-400" />
                <select 
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                  className="w-full sm:w-auto pl-9 pr-8 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 focus:outline-none appearance-none cursor-pointer"
                >
                  {availableGrades.map(grade => (
                    <option key={grade} value={grade}>{grade === "Barchasi" ? "Hamma sinflar" : `${grade}-sinf`}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-6 py-4">O'quvchi</th>
                  <th className="px-6 py-4">Sinf</th>
                  <th className="px-6 py-4">XP Ball</th>
                  <th className="px-6 py-4">Daraja</th>
                  <th className="px-6 py-4 text-right">Ro'yxatdan o'tgan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-100 to-blue-100 dark:from-indigo-900/40 dark:to-blue-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black text-lg shadow-sm border border-white dark:border-slate-700">
                          {user.first_name?.charAt(0).toUpperCase() || <User className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-base">{user.first_name || "Ismsiz"}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                        {user.is_admin && <Badge className="bg-red-100 text-red-600 dark:bg-red-900/30 border-0 text-[9px] px-1.5 py-0">Admin</Badge>}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">
                      {user.grade ? `${user.grade}-sinf` : "Kiritilmagan"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 font-black text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full w-fit">
                        <TrendingUp className="w-4 h-4" /> {user.xp || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">
                      {user.level || 1}-Daraja
                    </td>
                    <td className="px-6 py-4 text-right text-slate-500 font-medium">
                      {new Date(user.created_at).toLocaleDateString('uz-UZ')}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      Hech qanday o'quvchi topilmadi.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

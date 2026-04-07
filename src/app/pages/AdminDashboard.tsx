import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { 
  Users, BookOpen, Scale, ShieldCheck, 
  Search, Filter, Loader2, ArrowLeft, TrendingUp, PlusCircle, LayoutList, PieChart
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalLessons: 0, totalCases: 0 });
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState("Barchasi");
  
  // TABS: 'users', 'lesson', 'case', 'poll'
  const [activeTab, setActiveTab] = useState('users');

  // FORM STATES
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lesson Form
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [lessonXp, setLessonXp] = useState(100);
  const [lessonGrade, setLessonGrade] = useState(1);
  const [quizQ, setQuizQ] = useState("");
  const [quizO1, setQuizO1] = useState("");
  const [quizO2, setQuizO2] = useState("");
  const [quizO3, setQuizO3] = useState("");
  const [quizCorrect, setQuizCorrect] = useState(0);

  // Case Form
  const [caseTitle, setCaseTitle] = useState("");
  const [caseScenario, setCaseScenario] = useState("");
  const [caseO1, setCaseO1] = useState("");
  const [caseO2, setCaseO2] = useState("");
  const [caseO3, setCaseO3] = useState("");
  const [caseCorrect, setCaseCorrect] = useState(0);
  const [caseXp, setCaseXp] = useState(150);
  const [caseExp, setCaseExp] = useState("");

  // Poll Form
  const [pollQ, setPollQ] = useState("");
  const [pollDesc, setPollDesc] = useState("");
  const [pollOptA, setPollOptA] = useState("");
  const [pollOptB, setPollOptB] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      const savedUser = localStorage.getItem("user");
      if (!savedUser) { navigate("/login"); return; }
      const currentUser = JSON.parse(savedUser);
      
      const { data: adminCheck } = await supabase.from('users').select('is_admin').eq('id', currentUser.id).single();
      if (!adminCheck?.is_admin) { navigate("/"); return; }

      const { data: allUsers } = await supabase.from('users').select('*').order('created_at', { ascending: false });
      const { count: lessonsCount } = await supabase.from('lessons').select('*', { count: 'exact', head: true });
      const { count: casesCount } = await supabase.from('cases').select('*', { count: 'exact', head: true });

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

  // YANGI DARS QO'SHISH
  const handleAddLesson = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const quizData = [{
      question: quizQ,
      options: [quizO1, quizO2, quizO3],
      correct: Number(quizCorrect)
    }];
    await supabase.from('lessons').insert({
      title: lessonTitle, content: lessonContent, xp_reward: lessonXp, grade: lessonGrade, quiz_data: quizData
    });
    alert("Dars muvaffaqiyatli qo'shildi!");
    setLessonTitle(""); setLessonContent(""); setQuizQ(""); setQuizO1(""); setQuizO2(""); setQuizO3("");
    setIsSubmitting(false);
    setStats(prev => ({...prev, totalLessons: prev.totalLessons + 1}));
  };

  // YANGI HOLAT QO'SHISH
  const handleAddCase = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const options = [caseO1, caseO2, caseO3];
    await supabase.from('cases').insert({
      title: caseTitle, scenario: caseScenario, options: options, correct_option: Number(caseCorrect), xp_reward: caseXp, explanation: caseExp
    });
    alert("Holat muvaffaqiyatli qo'shildi!");
    setCaseTitle(""); setCaseScenario(""); setCaseO1(""); setCaseO2(""); setCaseO3(""); setCaseExp("");
    setIsSubmitting(false);
    setStats(prev => ({...prev, totalCases: prev.totalCases + 1}));
  };

  // YANGI SO'ROVNOMA QO'SHISH
  const handleAddPoll = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    await supabase.from('weekly_polls').update({ is_active: false }).neq('id', '00000000-0000-0000-0000-000000000000'); // Eskilarini o'chirish
    await supabase.from('weekly_polls').insert({
      question: pollQ, description: pollDesc, option_a: pollOptA, option_b: pollOptB, is_active: true
    });
    alert("Yangi so'rovnoma faollashtirildi!");
    setPollQ(""); setPollDesc(""); setPollOptA(""); setPollOptB("");
    setIsSubmitting(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-slate-950"><Loader2 className="w-10 h-10 text-indigo-600 animate-spin" /></div>;

  const filteredUsers = users.filter(user => {
    const matchesSearch = (user.first_name || '').toLowerCase().includes(searchQuery.toLowerCase()) || (user.email || '').toLowerCase().includes(searchQuery.toLowerCase());
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
            <h1 className="text-2xl md:text-4xl font-black dark:text-white tracking-tight">Super Admin Paneli</h1>
          </div>
        </div>
      </div>

      {/* STATISTIKA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white overflow-hidden relative">
          <CardContent className="p-6 relative z-10 flex justify-between items-start">
            <div><p className="text-blue-100 font-bold text-sm uppercase mb-1">O'quvchilar</p><h3 className="text-4xl font-black">{stats.totalUsers}</h3></div>
            <div className="p-3 bg-white/20 rounded-2xl"><Users className="w-6 h-6" /></div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-white overflow-hidden relative">
          <CardContent className="p-6 relative z-10 flex justify-between items-start">
            <div><p className="text-emerald-100 font-bold text-sm uppercase mb-1">Jami Darslar</p><h3 className="text-4xl font-black">{stats.totalLessons}</h3></div>
            <div className="p-3 bg-white/20 rounded-2xl"><BookOpen className="w-6 h-6" /></div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white overflow-hidden relative">
          <CardContent className="p-6 relative z-10 flex justify-between items-start">
            <div><p className="text-purple-100 font-bold text-sm uppercase mb-1">Jami Holatlar</p><h3 className="text-4xl font-black">{stats.totalCases}</h3></div>
            <div className="p-3 bg-white/20 rounded-2xl"><Scale className="w-6 h-6" /></div>
          </CardContent>
        </Card>
      </div>

      {/* TABS (MENYU) */}
      <div className="flex overflow-x-auto gap-2 pb-2 custom-scrollbar">
        <Button onClick={() => setActiveTab('users')} variant={activeTab === 'users' ? 'default' : 'outline'} className={`rounded-xl ${activeTab === 'users' ? 'bg-indigo-600' : ''}`}><Users className="w-4 h-4 mr-2" /> O'quvchilar</Button>
        <Button onClick={() => setActiveTab('lesson')} variant={activeTab === 'lesson' ? 'default' : 'outline'} className={`rounded-xl ${activeTab === 'lesson' ? 'bg-emerald-600' : ''}`}><BookOpen className="w-4 h-4 mr-2" /> Dars qo'shish</Button>
        <Button onClick={() => setActiveTab('case')} variant={activeTab === 'case' ? 'default' : 'outline'} className={`rounded-xl ${activeTab === 'case' ? 'bg-purple-600' : ''}`}><Scale className="w-4 h-4 mr-2" /> Holat qo'shish</Button>
        <Button onClick={() => setActiveTab('poll')} variant={activeTab === 'poll' ? 'default' : 'outline'} className={`rounded-xl ${activeTab === 'poll' ? 'bg-amber-500 hover:bg-amber-600' : ''}`}><PieChart className="w-4 h-4 mr-2" /> So'rovnoma</Button>
      </div>

      <AnimatePresence mode="wait">
        
        {/* 1. O'QUVCHILAR BAZASI */}
        {activeTab === 'users' && (
          <motion.div key="users" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 rounded-[24px] overflow-hidden">
              <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-6 flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold dark:text-white flex items-center gap-2"><LayoutList className="w-5 h-5 text-indigo-500" /> Baza</CardTitle>
                <div className="flex gap-2">
                  <input type="text" placeholder="Qidiruv..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="px-4 py-2 border rounded-xl text-sm w-48 dark:bg-slate-800 dark:border-slate-700" />
                  <select value={gradeFilter} onChange={(e) => setGradeFilter(e.target.value)} className="px-4 py-2 border rounded-xl text-sm dark:bg-slate-800 dark:border-slate-700">
                    {availableGrades.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 uppercase font-bold text-[11px]">
                    <tr><th className="px-6 py-4">Ism</th><th className="px-6 py-4">Sinf</th><th className="px-6 py-4">XP</th><th className="px-6 py-4">Sana</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="px-6 py-4 font-bold dark:text-white">{user.first_name} <span className="text-xs font-normal text-slate-500 block">{user.email}</span></td>
                        <td className="px-6 py-4">{user.grade}-sinf</td>
                        <td className="px-6 py-4 font-bold text-amber-500">{user.xp} XP</td>
                        <td className="px-6 py-4 text-slate-500">{new Date(user.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 2. DARS QO'SHISH */}
        {activeTab === 'lesson' && (
          <motion.div key="lesson" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 rounded-[24px]">
              <CardHeader><CardTitle className="text-emerald-600 flex items-center gap-2"><BookOpen className="w-6 h-6" /> Yangi Dars Yaratish</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleAddLesson} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-xs font-bold text-slate-500">Dars Nomi</label><input required value={lessonTitle} onChange={e=>setLessonTitle(e.target.value)} className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" placeholder="Masalan: 1-Dars: Konstitutsiya" /></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div><label className="text-xs font-bold text-slate-500">Beriladigan XP</label><input required type="number" value={lessonXp} onChange={e=>setLessonXp(Number(e.target.value))} className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" /></div>
                      <div><label className="text-xs font-bold text-slate-500">Tartib Raqami</label><input required type="number" value={lessonGrade} onChange={e=>setLessonGrade(Number(e.target.value))} className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" /></div>
                    </div>
                  </div>
                  <div><label className="text-xs font-bold text-slate-500">Dars Matni (Content)</label><textarea required value={lessonContent} onChange={e=>setLessonContent(e.target.value)} rows={6} className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" placeholder="Maqolani shu yerga yozing..." /></div>
                  
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold mb-3 text-slate-700 dark:text-slate-300">Dars oxiridagi Test</h4>
                    <input required value={quizQ} onChange={e=>setQuizQ(e.target.value)} placeholder="Test savolini yozing..." className="w-full p-3 mb-3 border rounded-xl dark:bg-slate-900 dark:border-slate-700" />
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <input required value={quizO1} onChange={e=>setQuizO1(e.target.value)} placeholder="1-Variant" className="p-3 border rounded-xl dark:bg-slate-900 dark:border-slate-700" />
                      <input required value={quizO2} onChange={e=>setQuizO2(e.target.value)} placeholder="2-Variant" className="p-3 border rounded-xl dark:bg-slate-900 dark:border-slate-700" />
                      <input required value={quizO3} onChange={e=>setQuizO3(e.target.value)} placeholder="3-Variant" className="p-3 border rounded-xl dark:bg-slate-900 dark:border-slate-700" />
                    </div>
                    <label className="text-xs font-bold text-slate-500">To'g'ri javobni tanlang:</label>
                    <select value={quizCorrect} onChange={e=>setQuizCorrect(Number(e.target.value))} className="w-full p-3 border rounded-xl dark:bg-slate-900 dark:border-slate-700 mt-1">
                      <option value={0}>1-Variant to'g'ri</option><option value={1}>2-Variant to'g'ri</option><option value={2}>3-Variant to'g'ri</option>
                    </select>
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-700 h-14 rounded-xl text-lg font-bold">Saqlash va Joylash</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 3. HOLAT QO'SHISH */}
        {activeTab === 'case' && (
          <motion.div key="case" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 rounded-[24px]">
              <CardHeader><CardTitle className="text-purple-600 flex items-center gap-2"><Scale className="w-6 h-6" /> Yangi Amaliy Holat</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleAddCase} className="space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-3"><label className="text-xs font-bold text-slate-500">Holat Nomi</label><input required value={caseTitle} onChange={e=>setCaseTitle(e.target.value)} className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" /></div>
                    <div><label className="text-xs font-bold text-slate-500">Beriladigan XP</label><input required type="number" value={caseXp} onChange={e=>setCaseXp(Number(e.target.value))} className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" /></div>
                  </div>
                  <div><label className="text-xs font-bold text-slate-500">Vaziyat (Scenario)</label><textarea required value={caseScenario} onChange={e=>setCaseScenario(e.target.value)} rows={3} className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" /></div>
                  <div className="grid grid-cols-3 gap-2">
                    <input required value={caseO1} onChange={e=>setCaseO1(e.target.value)} placeholder="1-Qaror" className="p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" />
                    <input required value={caseO2} onChange={e=>setCaseO2(e.target.value)} placeholder="2-Qaror" className="p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" />
                    <input required value={caseO3} onChange={e=>setCaseO3(e.target.value)} placeholder="3-Qaror" className="p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500">Qaysi biri Qonunan To'g'ri?</label>
                    <select value={caseCorrect} onChange={e=>setCaseCorrect(Number(e.target.value))} className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700 mt-1">
                      <option value={0}>1-Qaror to'g'ri</option><option value={1}>2-Qaror to'g'ri</option><option value={2}>3-Qaror to'g'ri</option>
                    </select>
                  </div>
                  <div><label className="text-xs font-bold text-slate-500">Qonuniy Asos (Izoh)</label><textarea required value={caseExp} onChange={e=>setCaseExp(e.target.value)} rows={3} placeholder="Bu yerga nima uchun shu javob to'g'ri ekanini qonun bilan yozing..." className="w-full p-3 border rounded-xl border-purple-200 dark:bg-purple-900/10 dark:border-purple-800" /></div>
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-purple-600 hover:bg-purple-700 h-14 rounded-xl text-lg font-bold">Saqlash va Joylash</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 4. SO'ROVNOMA QO'SHISH */}
        {activeTab === 'poll' && (
          <motion.div key="poll" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 rounded-[24px]">
              <CardHeader><CardTitle className="text-amber-500 flex items-center gap-2"><PieChart className="w-6 h-6" /> Hafta Dilemmasini Yangilash</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleAddPoll} className="space-y-4">
                  <div><label className="text-xs font-bold text-slate-500">Bahsli Savol</label><input required value={pollQ} onChange={e=>setPollQ(e.target.value)} placeholder="Masalan: Maktab formasi majburiy bo'lishi kerakmi?" className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" /></div>
                  <div><label className="text-xs font-bold text-slate-500">Tushuntirish</label><textarea required value={pollDesc} onChange={e=>setPollDesc(e.target.value)} rows={2} placeholder="O'quvchiga savolni qisqacha izohlab bering..." className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-xs font-bold text-blue-500">A - Variant</label><input required value={pollOptA} onChange={e=>setPollOptA(e.target.value)} placeholder="Masalan: Ha, intizom uchun kerak" className="w-full p-3 border-2 border-blue-200 dark:border-blue-800 rounded-xl dark:bg-slate-800" /></div>
                    <div><label className="text-xs font-bold text-purple-500">B - Variant</label><input required value={pollOptB} onChange={e=>setPollOptB(e.target.value)} placeholder="Masalan: Yo'q, erkinlik muhim" className="w-full p-3 border-2 border-purple-200 dark:border-purple-800 rounded-xl dark:bg-slate-800" /></div>
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-amber-500 hover:bg-amber-600 h-14 rounded-xl text-lg font-bold text-white shadow-lg">Faollashtirish</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

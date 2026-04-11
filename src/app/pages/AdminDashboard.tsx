import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { 
  Users, BookOpen, Scale, ShieldCheck, Loader2, ArrowLeft, LayoutList, PieChart
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalLessons: 0, totalCases: 0 });
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  
  const [activeTab, setActiveTab] = useState('users');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- DARS FORM STATES ---
  const [lessonXp, setLessonXp] = useState(100);
  const [lessonGrade, setLessonGrade] = useState(1);
  const [quizCorrect, setQuizCorrect] = useState(0);
  
  // UZ
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [quizQ, setQuizQ] = useState("");
  const [quizO1, setQuizO1] = useState("");
  const [quizO2, setQuizO2] = useState("");
  const [quizO3, setQuizO3] = useState("");

  // QQ
  const [lessonTitleQq, setLessonTitleQq] = useState("");
  const [lessonContentQq, setLessonContentQq] = useState("");
  const [quizQQq, setQuizQQq] = useState("");
  const [quizO1Qq, setQuizO1Qq] = useState("");
  const [quizO2Qq, setQuizO2Qq] = useState("");
  const [quizO3Qq, setQuizO3Qq] = useState("");

  // --- HOLAT (CASE) FORM STATES ---
  const [caseXp, setCaseXp] = useState(150);
  const [caseCorrect, setCaseCorrect] = useState(0);

  // UZ
  const [caseTitle, setCaseTitle] = useState("");
  const [caseScenario, setCaseScenario] = useState("");
  const [caseO1, setCaseO1] = useState("");
  const [caseO2, setCaseO2] = useState("");
  const [caseO3, setCaseO3] = useState("");
  const [caseExp, setCaseExp] = useState("");

  // QQ
  const [caseTitleQq, setCaseTitleQq] = useState("");
  const [caseScenarioQq, setCaseScenarioQq] = useState("");
  const [caseO1Qq, setCaseO1Qq] = useState("");
  const [caseO2Qq, setCaseO2Qq] = useState("");
  const [caseO3Qq, setCaseO3Qq] = useState("");
  const [caseExpQq, setCaseExpQq] = useState("");

  // --- SO'ROVNOMA (POLL) FORM STATES ---
  // UZ
  const [pollQ, setPollQ] = useState("");
  const [pollDesc, setPollDesc] = useState("");
  const [pollOptA, setPollOptA] = useState("");
  const [pollOptB, setPollOptB] = useState("");
  
  // QQ
  const [pollQQq, setPollQQq] = useState("");
  const [pollDescQq, setPollDescQq] = useState("");
  const [pollOptAQq, setPollOptAQq] = useState("");
  const [pollOptBQq, setPollOptBQq] = useState("");

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
        setStats({ totalUsers: allUsers.length, totalLessons: lessonsCount || 0, totalCases: casesCount || 0 });
      }
      setLoading(false);
    };
    fetchAdminData();
  }, [navigate]);

  // --- QO'SHISH FUNKSIYALARI ---

  const handleAddLesson = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const quizData = [{ question: quizQ, options: [quizO1, quizO2, quizO3], correct: Number(quizCorrect) }];
    const quizDataQq = [{ question: quizQQq, options: [quizO1Qq, quizO2Qq, quizO3Qq], correct: Number(quizCorrect) }];
    
    await supabase.from('lessons').insert({
      title: lessonTitle, content: lessonContent, quiz_data: quizData,
      title_qq: lessonTitleQq, content_qq: lessonContentQq, quiz_data_qq: quizDataQq,
      xp_reward: lessonXp, grade: lessonGrade
    });
    
    alert("Dars qo'shildi!");
    setIsSubmitting(false);
    setStats(prev => ({...prev, totalLessons: prev.totalLessons + 1}));
  };

  const handleAddCase = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const options = [caseO1, caseO2, caseO3];
    const optionsQq = [caseO1Qq, caseO2Qq, caseO3Qq];
    
    await supabase.from('cases').insert({
      title: caseTitle, scenario: caseScenario, options: options, explanation: caseExp,
      title_qq: caseTitleQq, scenario_qq: caseScenarioQq, options_qq: optionsQq, explanation_qq: caseExpQq,
      correct_option: Number(caseCorrect), xp_reward: caseXp
    });
    
    alert("Holat qo'shildi!");
    setIsSubmitting(false);
    setStats(prev => ({...prev, totalCases: prev.totalCases + 1}));
  };

  const handleAddPoll = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    await supabase.from('weekly_polls').update({ is_active: false }).neq('id', '00000000-0000-0000-0000-000000000000'); 
    
    await supabase.from('weekly_polls').insert({
      question: pollQ, description: pollDesc, option_a: pollOptA, option_b: pollOptB,
      question_qq: pollQQq, description_qq: pollDescQq, option_a_qq: pollOptAQq, option_b_qq: pollOptBQq,
      is_active: true
    });
    
    alert("So'rovnoma faollashtirildi!");
    setIsSubmitting(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-slate-950"><Loader2 className="w-10 h-10 text-indigo-600 animate-spin" /></div>;

  // QIDIRUV LOGIKASI
  const filteredUsers = users.filter(user => {
    const searchString = `${user.first_name || ''} ${user.last_name || ''} ${user.username || ''} ${user.email || ''}`.toLowerCase();
    const matchesSearch = searchString.includes(searchQuery.toLowerCase());
    const matchesGrade = gradeFilter === "all" || (user.grade && user.grade.toString() === gradeFilter);
    return matchesSearch && matchesGrade;
  });
  
  const availableGrades = ["all", ...Array.from(new Set(users.map(u => u.grade?.toString()).filter(Boolean)))].sort();

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
            <h1 className="text-2xl md:text-4xl font-black dark:text-white tracking-tight">Admin Paneli (Ikki Tilli)</h1>
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

      {/* TABS */}
      <div className="flex overflow-x-auto gap-2 pb-2 custom-scrollbar">
        <Button onClick={() => setActiveTab('users')} variant={activeTab === 'users' ? 'default' : 'outline'} className={`rounded-xl ${activeTab === 'users' ? 'bg-indigo-600' : ''}`}><Users className="w-4 h-4 mr-2" /> O'quvchilar</Button>
        <Button onClick={() => setActiveTab('lesson')} variant={activeTab === 'lesson' ? 'default' : 'outline'} className={`rounded-xl ${activeTab === 'lesson' ? 'bg-emerald-600' : ''}`}><BookOpen className="w-4 h-4 mr-2" /> Dars qo'shish</Button>
        <Button onClick={() => setActiveTab('case')} variant={activeTab === 'case' ? 'default' : 'outline'} className={`rounded-xl ${activeTab === 'case' ? 'bg-purple-600' : ''}`}><Scale className="w-4 h-4 mr-2" /> Holat qo'shish</Button>
        <Button onClick={() => setActiveTab('poll')} variant={activeTab === 'poll' ? 'default' : 'outline'} className={`rounded-xl ${activeTab === 'poll' ? 'bg-amber-500 hover:bg-amber-600' : ''}`}><PieChart className="w-4 h-4 mr-2" /> So'rovnoma</Button>
      </div>

      <AnimatePresence mode="wait">

        {/* 1. O'QUVCHILAR BAZASI TABI */}
        {activeTab === 'users' && (
          <motion.div key="users" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 rounded-[24px] overflow-hidden">
              <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-6 flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold dark:text-white flex items-center gap-2"><LayoutList className="w-5 h-5 text-indigo-500" /> Baza</CardTitle>
                <div className="flex gap-2">
                  <input type="text" placeholder="Ism yoki login..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="px-4 py-2 border rounded-xl text-sm w-48 dark:bg-slate-800 dark:border-slate-700" />
                  <select value={gradeFilter} onChange={(e) => setGradeFilter(e.target.value)} className="px-4 py-2 border rounded-xl text-sm dark:bg-slate-800 dark:border-slate-700">
                    {availableGrades.map(g => <option key={g} value={g}>{g === "all" ? "Barchasi" : `${g}-sinf`}</option>)}
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
                        <td className="px-6 py-4 font-bold dark:text-white">
                          {user.first_name} {user.last_name}
                          <span className="text-xs font-normal text-slate-500 block mt-0.5">
                            {user.username ? `@${user.username}` : user.email}
                          </span>
                        </td>
                        <td className="px-6 py-4">{user.grade}-sinf</td>
                        <td className="px-6 py-4 font-bold text-amber-500">{user.xp} XP</td>
                        <td className="px-6 py-4 text-slate-500">{new Date(user.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-slate-500 font-medium">
                          O'quvchilar topilmadi...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 2. DARS QO'SHISH TABI */}
        {activeTab === 'lesson' && (
          <motion.div key="lesson" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 rounded-[24px]">
              <CardHeader><CardTitle className="text-emerald-600 flex items-center gap-2"><BookOpen className="w-6 h-6" /> Yangi Dars Yaratish</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleAddLesson} className="space-y-6">
                  {/* Umumiy sozlamalar */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div><label className="text-xs font-bold text-slate-500">Beriladigan XP</label><input required type="number" value={lessonXp} onChange={e=>setLessonXp(Number(e.target.value))} className="w-full p-3 border rounded-xl dark:bg-slate-900 dark:border-slate-700" /></div>
                    <div><label className="text-xs font-bold text-slate-500">Tartib Raqami</label><input required type="number" value={lessonGrade} onChange={e=>setLessonGrade(Number(e.target.value))} className="w-full p-3 border rounded-xl dark:bg-slate-900 dark:border-slate-700" /></div>
                  </div>

                  {/* Ikki tilli formalar */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* O'ZBEK TILI */}
                    <div className="space-y-4 border-r md:pr-4 dark:border-slate-700">
                      <h3 className="font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg text-center">O'ZBEK TILI</h3>
                      <div><label className="text-xs font-bold text-slate-500">Dars Nomi (UZ)</label><input required value={lessonTitle} onChange={e=>setLessonTitle(e.target.value)} className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" /></div>
                      <div><label className="text-xs font-bold text-slate-500">Dars Matni (UZ)</label><textarea required value={lessonContent} onChange={e=>setLessonContent(e.target.value)} rows={6} className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" /></div>
                      <div className="p-4 border rounded-xl dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                        <label className="text-xs font-bold text-slate-500">Test Savoli (UZ)</label>
                        <input required value={quizQ} onChange={e=>setQuizQ(e.target.value)} className="w-full p-3 mb-2 border rounded-xl dark:bg-slate-900 dark:border-slate-700" />
                        <div className="grid grid-cols-1 gap-2">
                          <input required value={quizO1} onChange={e=>setQuizO1(e.target.value)} placeholder="1-Variant (UZ)" className="p-2 border rounded-xl dark:bg-slate-900 dark:border-slate-700" />
                          <input required value={quizO2} onChange={e=>setQuizO2(e.target.value)} placeholder="2-Variant (UZ)" className="p-2 border rounded-xl dark:bg-slate-900 dark:border-slate-700" />
                          <input required value={quizO3} onChange={e=>setQuizO3(e.target.value)} placeholder="3-Variant (UZ)" className="p-2 border rounded-xl dark:bg-slate-900 dark:border-slate-700" />
                        </div>
                      </div>
                    </div>

                    {/* QORAQALPOQ TILI */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-amber-500 bg-amber-50 dark:bg-amber-900/30 p-2 rounded-lg text-center">QORAQALPOQ TILI</h3>
                      <div><label className="text-xs font-bold text-slate-500">Dars Nomi (QQ)</label><input required value={lessonTitleQq} onChange={e=>setLessonTitleQq(e.target.value)} className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" /></div>
                      <div><label className="text-xs font-bold text-slate-500">Dars Matni (QQ)</label><textarea required value={lessonContentQq} onChange={e=>setLessonContentQq(e.target.value)} rows={6} className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" /></div>
                      <div className="p-4 border rounded-xl dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                        <label className="text-xs font-bold text-slate-500">Test Savoli (QQ)</label>
                        <input required value={quizQQq} onChange={e=>setQuizQQq(e.target.value)} className="w-full p-3 mb-2 border rounded-xl dark:bg-slate-900 dark:border-slate-700" />
                        <div className="grid grid-cols-1 gap-2">
                          <input required value={quizO1Qq} onChange={e=>setQuizO1Qq(e.target.value)} placeholder="1-Variant (QQ)" className="p-2 border rounded-xl dark:bg-slate-900 dark:border-slate-700" />
                          <input required value={quizO2Qq} onChange={e=>setQuizO2Qq(e.target.value)} placeholder="2-Variant (QQ)" className="p-2 border rounded-xl dark:bg-slate-900 dark:border-slate-700" />
                          <input required value={quizO3Qq} onChange={e=>setQuizO3Qq(e.target.value)} placeholder="3-Variant (QQ)" className="p-2 border rounded-xl dark:bg-slate-900 dark:border-slate-700" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* To'g'ri javob ikkalasi uchun bir xil */}
                  <div className="w-full md:w-1/2 mx-auto pt-4">
                    <label className="text-xs font-bold text-slate-500 text-center block">To'g'ri javobni tanlang (Ikkala til uchun umumiy)</label>
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

        {/* 3. HOLAT QO'SHISH TABI */}
        {activeTab === 'case' && (
          <motion.div key="case" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 rounded-[24px]">
              <CardHeader><CardTitle className="text-purple-600 flex items-center gap-2"><Scale className="w-6 h-6" /> Yangi Amaliy Holat</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleAddCase} className="space-y-6">
                  
                  <div className="w-full md:w-1/3 mb-4">
                    <label className="text-xs font-bold text-slate-500">Beriladigan XP</label>
                    <input required type="number" value={caseXp} onChange={e=>setCaseXp(Number(e.target.value))} className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* UZ */}
                    <div className="space-y-4 border-r md:pr-4 dark:border-slate-700">
                      <h3 className="font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg text-center">O'ZBEK TILI</h3>
                      <div><label className="text-xs font-bold text-slate-500">Holat Nomi (UZ)</label><input required value={caseTitle} onChange={e=>setCaseTitle(e.target.value)} className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" /></div>
                      <div><label className="text-xs font-bold text-slate-500">Vaziyat / Scenario (UZ)</label><textarea required value={caseScenario} onChange={e=>setCaseScenario(e.target.value)} rows={3} className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" /></div>
                      <div className="grid grid-cols-1 gap-2">
                        <input required value={caseO1} onChange={e=>setCaseO1(e.target.value)} placeholder="1-Qaror (UZ)" className="p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" />
                        <input required value={caseO2} onChange={e=>setCaseO2(e.target.value)} placeholder="2-Qaror (UZ)" className="p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" />
                        <input required value={caseO3} onChange={e=>setCaseO3(e.target.value)} placeholder="3-Qaror (UZ)" className="p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" />
                      </div>
                      <div><label className="text-xs font-bold text-slate-500">Qonuniy Asos (UZ)</label><textarea required value={caseExp} onChange={e=>setCaseExp(e.target.value)} rows={3} className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" /></div>
                    </div>

                    {/* QQ */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-amber-500 bg-amber-50 dark:bg-amber-900/30 p-2 rounded-lg text-center">QORAQALPOQ TILI</h3>
                      <div><label className="text-xs font-bold text-slate-500">Holat Nomi (QQ)</label><input required value={caseTitleQq} onChange={e=>setCaseTitleQq(e.target.value)} className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" /></div>
                      <div><label className="text-xs font-bold text-slate-500">Vaziyat / Scenario (QQ)</label><textarea required value={caseScenarioQq} onChange={e=>setCaseScenarioQq(e.target.value)} rows={3} className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" /></div>
                      <div className="grid grid-cols-1 gap-2">
                        <input required value={caseO1Qq} onChange={e=>setCaseO1Qq(e.target.value)} placeholder="1-Qaror (QQ)" className="p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" />
                        <input required value={caseO2Qq} onChange={e=>setCaseO2Qq(e.target.value)} placeholder="2-Qaror (QQ)" className="p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" />
                        <input required value={caseO3Qq} onChange={e=>setCaseO3Qq(e.target.value)} placeholder="3-Qaror (QQ)" className="p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" />
                      </div>
                      <div><label className="text-xs font-bold text-slate-500">Qonuniy Asos (QQ)</label><textarea required value={caseExpQq} onChange={e=>setCaseExpQq(e.target.value)} rows={3} className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" /></div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 mx-auto pt-4">
                    <label className="text-xs font-bold text-slate-500 text-center block">Qaysi biri to'g'ri? (Umumiy)</label>
                    <select value={caseCorrect} onChange={e=>setCaseCorrect(Number(e.target.value))} className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700 mt-1">
                      <option value={0}>1-Qaror to'g'ri</option><option value={1}>2-Qaror to'g'ri</option><option value={2}>3-Qaror to'g'ri</option>
                    </select>
                  </div>
                  
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-purple-600 hover:bg-purple-700 h-14 rounded-xl text-lg font-bold">Saqlash va Joylash</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 4. SO'ROVNOMA QO'SHISH TABI */}
        {activeTab === 'poll' && (
          <motion.div key="poll" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 rounded-[24px]">
              <CardHeader><CardTitle className="text-amber-500 flex items-center gap-2"><PieChart className="w-6 h-6" /> Hafta Dilemmasini Yangilash</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleAddPoll} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* UZ */}
                    <div className="space-y-4 border-r md:pr-4 dark:border-slate-700">
                      <h3 className="font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg text-center">O'ZBEK TILI</h3>
                      <div><label className="text-xs font-bold text-slate-500">Bahsli Savol (UZ)</label><input required value={pollQ} onChange={e=>setPollQ(e.target.value)} className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" /></div>
                      <div><label className="text-xs font-bold text-slate-500">Tushuntirish (UZ)</label><textarea required value={pollDesc} onChange={e=>setPollDesc(e.target.value)} rows={2} className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" /></div>
                      <div className="grid grid-cols-2 gap-2">
                        <div><label className="text-xs font-bold text-blue-500">A - Variant (UZ)</label><input required value={pollOptA} onChange={e=>setPollOptA(e.target.value)} className="w-full p-3 border-2 border-blue-200 dark:border-blue-800 rounded-xl dark:bg-slate-800" /></div>
                        <div><label className="text-xs font-bold text-purple-500">B - Variant (UZ)</label><input required value={pollOptB} onChange={e=>setPollOptB(e.target.value)} className="w-full p-3 border-2 border-purple-200 dark:border-purple-800 rounded-xl dark:bg-slate-800" /></div>
                      </div>
                    </div>

                    {/* QQ */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-amber-500 bg-amber-50 dark:bg-amber-900/30 p-2 rounded-lg text-center">QORAQALPOQ TILI</h3>
                      <div><label className="text-xs font-bold text-slate-500">Bahsli Savol (QQ)</label><input required value={pollQQq} onChange={e=>setPollQQq(e.target.value)} className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" /></div>
                      <div><label className="text-xs font-bold text-slate-500">Tushuntirish (QQ)</label><textarea required value={pollDescQq} onChange={e=>setPollDescQq(e.target.value)} rows={2} className="w-full p-3 border rounded-xl dark:bg-slate-800 dark:border-slate-700" /></div>
                      <div className="grid grid-cols-2 gap-2">
                        <div><label className="text-xs font-bold text-blue-500">A - Variant (QQ)</label><input required value={pollOptAQq} onChange={e=>setPollOptAQq(e.target.value)} className="w-full p-3 border-2 border-blue-200 dark:border-blue-800 rounded-xl dark:bg-slate-800" /></div>
                        <div><label className="text-xs font-bold text-purple-500">B - Variant (QQ)</label><input required value={pollOptBQq} onChange={e=>setPollOptBQq(e.target.value)} className="w-full p-3 border-2 border-purple-200 dark:border-purple-800 rounded-xl dark:bg-slate-800" /></div>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full bg-amber-500 hover:bg-amber-600 h-14 rounded-xl text-lg font-bold text-white shadow-lg mt-4">Faollashtirish</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

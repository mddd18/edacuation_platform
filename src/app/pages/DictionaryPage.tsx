"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { 
  BookOpen, Lock, Unlock, ArrowLeft, CheckCircle2, 
  BrainCircuit, XCircle, RotateCcw, ArrowRight, Loader2, Award, AlertTriangle
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { motion, AnimatePresence } from "motion/react";

// --- TARJIMALAR LUG'ATI ---
const dict = {
  UZ: {
    title: "Huquqiy Atamalar",
    subtitle: "Bo'limlarni ketma-ket o'rganing va 80% dan yuqori to'plab XP yig'ing",
    chapter: "Bo'lim",
    terms: "ta atama",
    completed: "Tugatilgan",
    unlocked: "Ochiq",
    locked: "Qulflangan",
    menu: "Menyu",
    progress: "Taraqqiyot",
    seeMeaning: "Ma'nosini ko'rish",
    understood: "Tushundim",
    findMatch: "Ta'rifga mos atamani toping",
    test: "Test",
    next: "Keyingisi",
    seeResult: "Natijani ko'rish",
    excellent: "Ajoyib natija!",
    tryAgain: "Yana urinib ko'ring",
    scoreText: (total: number, score: number, percent: number) => `Siz ${total} ta savoldan ${score} tasiga to'g'ri javob berdingiz (${percent}%).`,
    passed80: "80% lik marradan o'tdingiz",
    xpReward: "🎉 Sizga +100 XP berildi va keyingi bo'lim ochildi!",
    noXp: "(Siz bu bo'limdan oldin o'tganligingiz sababli XP berilmaydi)",
    notUnlocked: "Keyingi bo'lim ochilmadi",
    need80: "Keyingi bo'limni ochish uchun kamida 80% to'g'ri javob topishingiz shart.",
    backToMenu: "Menyuga qaytish",
    levelTitles: {
      1: "Asosiy Qonun (Konstitutsiya)", 2: "Davlat tili", 3: "Davlat bayrog'i", 4: "Davlat gerbi",
      5: "Davlat madhiyasi", 6: "Oliy hokimiyat va boshqaruv", 7: "Ma'muriy-hududiy tuzilish",
      8: "Fuqarolar huquq va erkinliklari", 9: "Saylov tizimi", 10: "Iqtisodiy negizlar va byudjet"
    }
  },
  QQ: {
    title: "Huquqıy Atamalar",
    subtitle: "Bólimlerdi izbe-iz úyreniń hám 80% ten joqarı toplap XP jıynań",
    chapter: "Bólim",
    terms: "atama",
    completed: "Tawsılǵan",
    unlocked: "Ashıq",
    locked: "Qulplanǵan",
    menu: "Menyu",
    progress: "Rawajlanıw",
    seeMeaning: "Mánisin kóriw",
    understood: "Túsindim",
    findMatch: "Táripke sáykes atamanı tabıń",
    test: "Test",
    next: "Keyingisi",
    seeResult: "Nátiyjeni kóriw",
    excellent: "Ájayıp nátiyje!",
    tryAgain: "Jáne urinip kóriń",
    scoreText: (total: number, score: number, percent: number) => `Siz ${total} sorawdan ${score} sorawǵa durıs juwap berdińiz (${percent}%).`,
    passed80: "80% lik shekten óttińiz",
    xpReward: "🎉 Sizge +100 XP berildi hám keyingi bólim aşıldı!",
    noXp: "(Siz bul bólimnen aldın ótkenińiz ushın XP berilmeydi)",
    notUnlocked: "Keyingi bólim ashılmadı",
    need80: "Keyingi bólimdi ashiw ushın keminde 80% durıs juwap tabıwıńız shárt.",
    backToMenu: "Menyuǵa qaytıw",
    levelTitles: {
      1: "Tiykarǵı Nızam (Konstituciya)", 2: "Mámleketlik til", 3: "Mámleketlik bayraq", 4: "Mámleketlik gerb",
      5: "Mámleketlik gimn", 6: "Joqarı hákimiyat hám basqarıw", 7: "Hákimshilik-aymaqlıq dúzilis",
      8: "Puxaralar huquq hám erkinlikleri", 9: "Saylaw sisteması", 10: "Ekonomikalıq tiykarlar hám byudjet"
    }
  }
};

export function DictionaryPage() {
  const [dictionary, setDictionary] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // TIZIM TILI
  const lang = (localStorage.getItem('appLang') as 'UZ' | 'QQ') || 'UZ';
  const t = dict[lang];

  const [unlockedDictLevel, setUnlockedDictLevel] = useState(1); 
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedTerms, setLearnedTerms] = useState<string[]>([]);
  
  const [quizState, setQuizState] = useState({
    active: false,
    questions: [] as any[],
    currentIndex: 0,
    score: 0,
    showResult: false,
    selectedOption: null as string | null,
    isFinished: false 
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const savedUser = localStorage.getItem("user");
      if (!savedUser) return;
      const user = JSON.parse(savedUser);

      // 1. O'quvchining joriy ochiq bosqichini tortish
      const { data: dbUser } = await supabase.from('users').select('unlocked_dict_level').eq('id', user.id).single();
      if (dbUser && dbUser.unlocked_dict_level) {
        setUnlockedDictLevel(dbUser.unlocked_dict_level);
      }

      // 2. Lug'atlarni tortish
      const { data, error } = await supabase.from('dictionary').select('*').order('level', { ascending: true });

      if (!error && data) {
        setDictionary(data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const levels = Array.from(new Set(dictionary.map(entry => entry.level))).sort((a, b) => a - b);
  const categoryTerms = activeCategory ? dictionary.filter(t => t.level === activeCategory) : [];
  const currentTerm = categoryTerms[currentCardIndex];

  useEffect(() => {
    if (activeCategory && !quizState.active && !quizState.isFinished) {
      setCurrentCardIndex(0);
      setIsFlipped(false);
    }
  }, [activeCategory, quizState.active, quizState.isFinished]);

  const startQuiz = () => {
    const questions = categoryTerms.map(term => {
      const wrongOptions = dictionary
        .filter(t => t.id !== term.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(t => t.term);
      
      const options = [...wrongOptions, term.term].sort(() => 0.5 - Math.random());
      return { ...term, options };
    });

    setQuizState({
      active: true,
      questions: questions.sort(() => 0.5 - Math.random()), 
      currentIndex: 0,
      score: 0,
      showResult: false,
      selectedOption: null,
      isFinished: false
    });
  };

  const handleNextCard = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (!learnedTerms.includes(id)) {
      setLearnedTerms(prev => [...prev, id]);
    }
    if (currentCardIndex < categoryTerms.length - 1) {
      setIsFlipped(false); 
      setTimeout(() => {
        setCurrentCardIndex(prev => prev + 1);
      }, 600); 
    } else {
      startQuiz();
    }
  };

  const handleAnswer = (option: string) => {
    if (quizState.showResult) return;
    const currentQ = quizState.questions[quizState.currentIndex];
    const isCorrect = option === currentQ.term;
    setQuizState(prev => ({
      ...prev,
      selectedOption: option,
      showResult: true,
      score: isCorrect ? prev.score + 1 : prev.score
    }));
  };

  const nextQuestion = () => {
    if (quizState.currentIndex < quizState.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        showResult: false,
        selectedOption: null
      }));
    } else {
      setQuizState(prev => ({ ...prev, isFinished: true }));
    }
  };

  const finishQuiz = async () => {
    const totalQuestions = quizState.questions.length;
    const percentage = Math.round((quizState.score / totalQuestions) * 100);
    const passed = percentage >= 80; 

    if (passed && activeCategory) {
      if (activeCategory >= unlockedDictLevel) {
        const nextLevel = activeCategory + 1;
        setUnlockedDictLevel(nextLevel);

        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const user = JSON.parse(savedUser);
          const newTotalXp = (user.xp || 0) + 100;
          const newDbLevel = Math.floor(newTotalXp / 1000) + 1; 
          
          await supabase.from('users').update({ 
            xp: newTotalXp, 
            level: newDbLevel,
            unlocked_dict_level: nextLevel 
          }).eq('id', user.id);
          
          localStorage.setItem("user", JSON.stringify({ 
            ...user, xp: newTotalXp, level: newDbLevel 
          }));
        }
      }
    }
    
    setQuizState(prev => ({ ...prev, active: false, isFinished: false }));
    setActiveCategory(null);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
    </div>
  );

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto min-h-screen bg-slate-50/50 dark:bg-slate-900 transition-colors duration-300 pb-28 overflow-x-hidden">
      <style>{`
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .perspective-1000 { perspective: 1000px; }
      `}</style>

      {/* 1. ASOSIY MENYU */}
      <AnimatePresence mode="wait">
        {!activeCategory && !quizState.active && (
          <motion.div
            key="categories"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="mb-12 text-center">
              <div className="inline-flex p-4 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full mb-5 shadow-inner">
                <BookOpen className="w-10 h-10" />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">{t.title}</h1>
              <p className="text-lg text-gray-500 dark:text-slate-400 font-medium">{t.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {levels.map((levelNum) => {
                const isUnlocked = levelNum <= unlockedDictLevel;
                const isCompleted = levelNum < unlockedDictLevel; 
                const termsCount = dictionary.filter(t => t.level === levelNum).length;
                const title = (t.levelTitles as any)[levelNum] || "Qo'shimcha bo'lim";
                
                return (
                  <motion.div
                    key={levelNum}
                    whileHover={isUnlocked ? { scale: 1.03, y: -5 } : {}}
                    whileTap={isUnlocked ? { scale: 0.98 } : {}}
                  >
                    <Card 
                      onClick={() => isUnlocked && setActiveCategory(levelNum)}
                      className={`border-2 h-full transition-all duration-300 relative overflow-hidden ${
                        isCompleted 
                          ? "cursor-pointer border-emerald-200 dark:border-emerald-500/30 hover:border-emerald-500 bg-white dark:bg-slate-800 shadow-xl"
                          : isUnlocked 
                            ? "cursor-pointer border-indigo-200 dark:border-indigo-500/30 hover:border-indigo-500 bg-white dark:bg-slate-800 shadow-xl" 
                            : "opacity-60 bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 grayscale cursor-not-allowed"
                      }`}
                    >
                      {isCompleted && <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500" />}

                      <CardContent className="p-8 flex flex-col items-center text-center">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-sm transition-colors ${
                          isCompleted ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400"
                          : isUnlocked ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400" 
                          : "bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-slate-400"
                        }`}>
                          {isCompleted ? <CheckCircle2 className="w-8 h-8" /> : isUnlocked ? <Unlock className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
                        </div>
                        
                        <p className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-1">{levelNum}-{t.chapter}</p>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-[56px]">{title}</h3>
                        <p className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-5">{termsCount} {t.terms}</p>
                        
                        {isCompleted ? (
                          <Badge className="bg-emerald-500 dark:bg-emerald-600 text-white border-none shadow-sm px-5 py-1.5 font-bold uppercase tracking-wider text-[10px]">{t.completed}</Badge>
                        ) : isUnlocked ? (
                          <Badge className="bg-indigo-500 dark:bg-indigo-600 text-white border-none shadow-sm px-5 py-1.5 font-bold uppercase tracking-wider text-[10px]">{t.unlocked}</Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-500 dark:text-slate-400 border-gray-300 dark:border-slate-600 px-5 py-1.5 font-bold uppercase tracking-wider text-[10px]">{t.locked}</Badge>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* 2. O'RGANISH REJIMI */}
        {activeCategory && !quizState.active && currentTerm && (
          <motion.div key="flashcards" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <Button variant="ghost" onClick={() => setActiveCategory(null)} className="font-bold text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-xl transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" /> {t.menu}
              </Button>
              <div className="text-right">
                <h2 className="text-xl font-black text-indigo-900 dark:text-indigo-300">{activeCategory}-{t.chapter}</h2>
              </div>
            </div>

            <div className="mb-8 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
              <div className="flex justify-between text-sm font-bold text-gray-500 dark:text-slate-400 mb-2 px-1">
                <span>{t.progress}</span>
                <span className="text-indigo-600 dark:text-indigo-400">{currentCardIndex + 1} / {categoryTerms.length}</span>
              </div>
              <Progress value={((currentCardIndex + 1) / categoryTerms.length) * 100} className="h-3 bg-gray-100 dark:bg-slate-700" />
            </div>

            <div className="perspective-1000 h-[400px]">
              <motion.div
                key={currentTerm.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0, rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-full h-full relative preserve-3d cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {/* Old qismi */}
                <Card className="absolute w-full h-full backface-hidden border-2 border-indigo-100 dark:border-indigo-800/50 shadow-2xl flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors">
                  <div className="absolute top-6 left-6 p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                    <BrainCircuit className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                    {currentTerm.term}
                  </h3>
                  <div className="absolute bottom-8 flex flex-col items-center gap-2">
                    <RotateCcw className="w-6 h-6 text-gray-300 dark:text-slate-500 animate-spin-slow" />
                    <p className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">{t.seeMeaning}</p>
                  </div>
                </Card>

                {/* Orqa qismi */}
                <Card 
                  className="absolute w-full h-full backface-hidden border-2 border-emerald-200 dark:border-emerald-800/50 shadow-2xl bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/20 dark:to-slate-800 flex flex-col transition-colors"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <CardContent className="p-8 md:p-10 flex-1 flex flex-col justify-between h-full">
                    <div>
                      <h4 className="text-2xl font-black text-emerald-900 dark:text-emerald-300 mb-4 border-b border-emerald-100 dark:border-emerald-800/30 pb-4">{currentTerm.term}</h4>
                      <p className="text-lg md:text-xl font-medium text-gray-700 dark:text-slate-200 leading-relaxed overflow-y-auto max-h-[160px] pr-2 custom-scrollbar">{currentTerm.definition}</p>
                    </div>
                    <Button 
                      size="lg"
                      className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg h-16 shadow-xl shadow-emerald-500/30 rounded-xl border-none shrink-0"
                      onClick={(e) => handleNextCard(currentTerm.id, e)}
                    >
                      <CheckCircle2 className="w-6 h-6 mr-3" /> {t.understood}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* 3. IMTIHON REJIMI VA NATIJA */}
        {quizState.active && (
          <motion.div key="quiz" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="max-w-3xl mx-auto">
            
            {!quizState.isFinished ? (
              // TEST ISHLASH JARAYONI
              <>
                <div className="flex justify-between items-center mb-8">
                  <Button variant="ghost" onClick={() => setQuizState(prev => ({ ...prev, active: false }))} className="font-bold text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" /> {t.menu}
                  </Button>
                  <div className="font-black text-indigo-600 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/50 px-5 py-2.5 rounded-xl text-sm uppercase tracking-wider">
                    {t.test}: {quizState.currentIndex + 1} / {quizState.questions.length}
                  </div>
                </div>

                <Card className="border-0 shadow-2xl bg-white dark:bg-slate-800 overflow-hidden relative transition-colors duration-300">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />
                  <CardContent className="pt-12 pb-10 px-6 md:px-12">
                    <div className="flex items-center gap-3 mb-4">
                      <BrainCircuit className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                      <p className="text-sm font-extrabold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                        {t.findMatch}
                      </p>
                    </div>
                    
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-relaxed mb-10 overflow-y-auto max-h-[150px] pr-2 custom-scrollbar">
                      "{quizState.questions[quizState.currentIndex].definition}"
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {quizState.questions[quizState.currentIndex].options.map((option: string, idx: number) => {
                        const isSelected = quizState.selectedOption === option;
                        const isCorrect = option === quizState.questions[quizState.currentIndex].term;
                        
                        let btnClass = "border-gray-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200";
                        
                        if (quizState.showResult) {
                          if (isCorrect) btnClass = "border-emerald-500 bg-emerald-500 text-white shadow-lg z-10 scale-[1.02]";
                          else if (isSelected) btnClass = "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 opacity-80";
                          else btnClass = "border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 opacity-40";
                        }

                        return (
                          <Button
                            key={idx} variant="outline" onClick={() => handleAnswer(option)} disabled={quizState.showResult}
                            className={`h-auto p-5 md:p-6 justify-start text-left font-bold text-sm md:text-lg whitespace-normal transition-all duration-300 rounded-2xl ${btnClass}`}
                          >
                            <span className="flex-1">{option}</span>
                            {quizState.showResult && isCorrect && <CheckCircle2 className="w-6 h-6 text-white ml-2 flex-shrink-0" />}
                            {quizState.showResult && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-500 dark:text-red-400 ml-2 flex-shrink-0" />}
                          </Button>
                        );
                      })}
                    </div>

                    <AnimatePresence>
                      {quizState.showResult && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10 flex justify-end">
                          <Button size="lg" className="bg-gray-900 dark:bg-white text-white dark:text-slate-900 hover:bg-gray-800 dark:hover:bg-slate-200 px-8 py-6 rounded-xl font-bold text-lg shadow-xl" onClick={nextQuestion}>
                            {quizState.currentIndex === quizState.questions.length - 1 ? t.seeResult : t.next} <ArrowRight className="w-5 h-5 ml-2" />
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </>
            ) : (
              // NATIJALAR OYNASI (TEST TUGAGACH)
              <Card className="border-0 shadow-2xl bg-white dark:bg-slate-800 overflow-hidden relative text-center pt-8 pb-12 px-6">
                <CardContent>
                  {(() => {
                    const total = quizState.questions.length;
                    const percentage = Math.round((quizState.score / total) * 100);
                    const passed = percentage >= 80;
                    const isNewCompletion = passed && activeCategory !== null && activeCategory >= unlockedDictLevel;

                    return (
                      <div className="flex flex-col items-center">
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-xl ${
                          passed ? "bg-emerald-100 text-emerald-500 dark:bg-emerald-900/30" : "bg-red-100 text-red-500 dark:bg-red-900/30"
                        }`}>
                          {passed ? <Award className="w-12 h-12" /> : <AlertTriangle className="w-12 h-12" />}
                        </div>
                        
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                          {passed ? t.excellent : t.tryAgain}
                        </h2>
                        
                        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium mb-8">
                          {t.scoreText(total, quizState.score, percentage)}
                        </p>

                        {passed ? (
                          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 p-4 rounded-2xl w-full max-w-md mb-8">
                            <p className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center justify-center gap-2">
                              <CheckCircle2 className="w-5 h-5" /> {t.passed80}
                            </p>
                            {isNewCompletion ? (
                              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-500 mt-2 bg-white dark:bg-slate-800 py-2 rounded-xl">
                                {t.xpReward}
                              </p>
                            ) : (
                              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-500 mt-2">
                                {t.noXp}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/50 p-4 rounded-2xl w-full max-w-md mb-8">
                            <p className="font-bold text-red-700 dark:text-red-400 flex items-center justify-center gap-2">
                              <XCircle className="w-5 h-5" /> {t.notUnlocked}
                            </p>
                            <p className="text-sm font-bold text-red-600 dark:text-red-500 mt-2">
                              {t.need80}
                            </p>
                          </div>
                        )}

                        <Button size="lg" className="w-full max-w-xs font-bold text-lg h-14 rounded-xl" onClick={finishQuiz}>
                          {t.backToMenu}
                        </Button>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

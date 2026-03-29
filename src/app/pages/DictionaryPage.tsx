import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { 
  BookOpen, 
  Lock, 
  Unlock, 
  ArrowLeft, 
  CheckCircle2, 
  BrainCircuit, 
  XCircle,
  RotateCcw,
  ArrowRight
} from "lucide-react";
import { dictionary } from "../data/dictionary";
import { motion, AnimatePresence } from "motion/react";

export function DictionaryPage() {
  const categories = Array.from(new Set(dictionary.map(entry => entry.category)));

  const [unlockedLevel, setUnlockedLevel] = useState(0); 
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedTerms, setLearnedTerms] = useState<string[]>([]);
  
  const [quizState, setQuizState] = useState({
    active: false,
    questions: [] as any[],
    currentIndex: 0,
    score: 0,
    showResult: false,
    selectedOption: null as string | null
  });

  const categoryTerms = activeCategory ? dictionary.filter(t => t.category === activeCategory) : [];
  const currentTerm = categoryTerms[currentCardIndex];

  useEffect(() => {
    if (activeCategory && !quizState.active) {
      setCurrentCardIndex(0);
      setIsFlipped(false);
    }
  }, [activeCategory, quizState.active]);

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
      selectedOption: null
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
      }, 150); 
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
      const passed = quizState.score === quizState.questions.length;
      if (passed) {
        const currentCatIndex = categories.indexOf(activeCategory!);
        if (currentCatIndex >= unlockedLevel) {
          setUnlockedLevel(currentCatIndex + 1);
        }
      }
      setQuizState(prev => ({ ...prev, active: false }));
      setActiveCategory(null);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto min-h-screen bg-slate-50/50 dark:bg-slate-900 transition-colors duration-300">
      <style>{`
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .perspective-1000 { perspective: 1000px; }
      `}</style>

      {/* 1. ASOSIY MENYU: Bo'limlar ro'yxati */}
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
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">Bosqichli Lug'at</h1>
              <p className="text-lg text-gray-500 dark:text-slate-400 font-medium">Bo'limlarni ketma-ket o'rganing va qulflarni oching</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => {
                const isUnlocked = index <= unlockedLevel;
                const termsCount = dictionary.filter(t => t.category === category).length;
                
                return (
                  <motion.div
                    key={category}
                    whileHover={isUnlocked ? { scale: 1.03, y: -5 } : {}}
                    whileTap={isUnlocked ? { scale: 0.98 } : {}}
                  >
                    <Card 
                      onClick={() => isUnlocked && setActiveCategory(category)}
                      className={`border-2 h-full transition-all duration-300 ${
                        isUnlocked 
                          ? "cursor-pointer border-indigo-200 dark:border-indigo-500/30 hover:border-indigo-500 dark:hover:border-indigo-400 bg-white dark:bg-slate-800 shadow-xl hover:shadow-2xl" 
                          : "opacity-60 bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 grayscale cursor-not-allowed"
                      }`}
                    >
                      <CardContent className="p-8 flex flex-col items-center text-center">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-sm transition-colors ${
                          isUnlocked ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400" : "bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-slate-400"
                        }`}>
                          {isUnlocked ? <Unlock className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{category}</h3>
                        <p className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-5">{termsCount} ta atama</p>
                        
                        {isUnlocked ? (
                          <Badge className="bg-indigo-500 dark:bg-indigo-600 text-white border-none shadow-sm px-5 py-1.5 font-bold uppercase tracking-wider text-[10px]">Ochiq</Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-500 dark:text-slate-400 border-gray-300 dark:border-slate-600 px-5 py-1.5 font-bold uppercase tracking-wider text-[10px]">Qulflangan</Badge>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* 2. O'RGANISH REJIMI: Ketma-ket Kartochkalar */}
        {activeCategory && !quizState.active && currentTerm && (
          <motion.div
            key="flashcards"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <Button variant="ghost" onClick={() => setActiveCategory(null)} className="font-bold text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-xl transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" /> Menyu
              </Button>
              <div className="text-right">
                <h2 className="text-xl font-black text-indigo-900 dark:text-indigo-300">{activeCategory}</h2>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
              <div className="flex justify-between text-sm font-bold text-gray-500 dark:text-slate-400 mb-2 px-1">
                <span>Taraqqiyot</span>
                <span className="text-indigo-600 dark:text-indigo-400">{currentCardIndex + 1} / {categoryTerms.length}</span>
              </div>
              <Progress value={((currentCardIndex + 1) / categoryTerms.length) * 100} className="h-3 bg-gray-100 dark:bg-slate-700" />
            </div>

            {/* Bitta katta Kartochka */}
            <div className="perspective-1000 h-[400px]">
              <motion.div
                key={currentTerm.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0, rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-full h-full relative preserve-3d cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {/* Old tomoni (Atama) */}
                <Card className="absolute w-full h-full backface-hidden border-2 border-indigo-100 dark:border-indigo-800/50 shadow-2xl flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors">
                  <div className="absolute top-6 left-6 p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                    <BrainCircuit className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                    {currentTerm.term}
                  </h3>
                  <div className="absolute bottom-8 flex flex-col items-center gap-2">
                    <RotateCcw className="w-6 h-6 text-gray-300 dark:text-slate-500 animate-spin-slow" />
                    <p className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                      Ma'nosini ko'rish
                    </p>
                  </div>
                </Card>

                {/* Orqa tomoni (Ma'nosi) */}
                <Card 
                  className="absolute w-full h-full backface-hidden border-2 border-emerald-200 dark:border-emerald-800/50 shadow-2xl bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/20 dark:to-slate-800 flex flex-col transition-colors"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <CardContent className="p-8 md:p-10 flex-1 flex flex-col justify-between h-full">
                    <div>
                      <h4 className="text-2xl font-black text-emerald-900 dark:text-emerald-300 mb-4 border-b border-emerald-100 dark:border-emerald-800/30 pb-4">{currentTerm.term}</h4>
                      <p className="text-lg md:text-xl font-medium text-gray-700 dark:text-slate-200 leading-relaxed">{currentTerm.definition}</p>
                    </div>
                    
                    <Button 
                      size="lg"
                      className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg h-16 shadow-xl shadow-emerald-500/30 rounded-xl border-none"
                      onClick={(e) => handleNextCard(currentTerm.id, e)}
                    >
                      <CheckCircle2 className="w-6 h-6 mr-3" /> Tushundim
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* 3. IMTIHON (TEST) REJIMI */}
        {quizState.active && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <Button variant="ghost" onClick={() => setQuizState(prev => ({ ...prev, active: false }))} className="font-bold text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" /> Menyu
              </Button>
              <div className="font-black text-indigo-600 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/50 px-5 py-2.5 rounded-xl text-sm uppercase tracking-wider">
                Test: {quizState.currentIndex + 1} / {quizState.questions.length}
              </div>
            </div>

            <Card className="border-0 shadow-2xl bg-white dark:bg-slate-800 overflow-hidden relative transition-colors duration-300">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />
              <CardContent className="pt-12 pb-10 px-6 md:px-12">
                <div className="flex items-center gap-3 mb-4">
                  <BrainCircuit className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                  <p className="text-sm font-extrabold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                    Ta'rifga mos atamani toping
                  </p>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-relaxed mb-10">
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
                        key={idx}
                        variant="outline"
                        onClick={() => handleAnswer(option)}
                        disabled={quizState.showResult}
                        className={`h-auto p-6 justify-start text-left font-bold text-lg whitespace-normal transition-all duration-300 rounded-2xl ${btnClass}`}
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
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-10 flex justify-end"
                    >
                      <Button 
                        size="lg" 
                        className="bg-gray-900 dark:bg-white text-white dark:text-slate-900 hover:bg-gray-800 dark:hover:bg-slate-200 px-8 py-6 rounded-xl font-bold text-lg shadow-xl transition-colors"
                        onClick={nextQuestion}
                      >
                        {quizState.currentIndex === quizState.questions.length - 1 ? "Yakunlash" : "Keyingisi"} <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

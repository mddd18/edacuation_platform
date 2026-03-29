import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { 
  BookOpen, 
  Lock, 
  Unlock, 
  ArrowLeft, 
  CheckCircle2, 
  BrainCircuit, 
  XCircle,
  Trophy,
  RotateCcw
} from "lucide-react";
import { dictionary } from "../data/dictionary";
import { motion, AnimatePresence } from "motion/react";

export function DictionaryPage() {
  // Barcha noyob kategoriyalarni ajratib olish
  const categories = Array.from(new Set(dictionary.map(entry => entry.category)));

  // State'lar
  const [unlockedLevel, setUnlockedLevel] = useState(0); // 0 = faqat 1-bo'lim ochiq
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [learnedTerms, setLearnedTerms] = useState<string[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  
  // Test (Quiz) State'lari
  const [quizState, setQuizState] = useState({
    active: false,
    questions: [] as any[],
    currentIndex: 0,
    score: 0,
    showResult: false,
    selectedOption: null as string | null
  });

  // Hozirgi ochiq kategoriyadagi so'zlar
  const categoryTerms = activeCategory ? dictionary.filter(t => t.category === activeCategory) : [];
  const learnedInCategory = categoryTerms.filter(t => learnedTerms.includes(t.id)).length;
  const isAllLearned = categoryTerms.length > 0 && learnedInCategory === categoryTerms.length;

  // Kartochkani aylantirish
  const toggleFlip = (id: string) => {
    setFlippedCards(prev => 
      prev.includes(id) ? prev.filter(cardId => cardId !== id) : [...prev, id]
    );
  };

  // So'zni o'rgandim deb belgilash
  const markAsLearned = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Kartochka aylanib ketmasligi uchun
    if (!learnedTerms.includes(id)) {
      setLearnedTerms(prev => [...prev, id]);
    }
  };

  // Imtihonni shakllantirish va boshlash
  const startQuiz = () => {
    // Har bir so'z uchun bittadan savol tayyorlaymiz
    const questions = categoryTerms.map(term => {
      // 3 ta noto'g'ri variant tanlash
      const wrongOptions = dictionary
        .filter(t => t.id !== term.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(t => t.term);
      
      const options = [...wrongOptions, term.term].sort(() => 0.5 - Math.random());
      
      return {
        ...term,
        options
      };
    });

    setQuizState({
      active: true,
      questions: questions.sort(() => 0.5 - Math.random()), // Savollarni aralashtirish
      currentIndex: 0,
      score: 0,
      showResult: false,
      selectedOption: null
    });
  };

  // Test javobini belgilash
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

  // Keyingi savolga o'tish yoki Testni yakunlash
  const nextQuestion = () => {
    if (quizState.currentIndex < quizState.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        showResult: false,
        selectedOption: null
      }));
    } else {
      // Test yakunlandi
      const passed = quizState.score === quizState.questions.length;
      if (passed) {
        // Agar hamma savolga to'g'ri javob bersa, keyingi levelni ochamiz
        const currentCatIndex = categories.indexOf(activeCategory!);
        if (currentCatIndex >= unlockedLevel) {
          setUnlockedLevel(currentCatIndex + 1);
        }
      }
      
      // Testdan chiqish
      setQuizState(prev => ({ ...prev, active: false }));
      if (passed) setActiveCategory(null); // Asosiy menyuga qaytish
      else alert("Testdan o'ta olmadingiz. Hamma savolga to'g'ri javob berish kerak. Qayta urinib ko'ring!");
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto min-h-screen bg-slate-50/50">
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
            <div className="mb-10 text-center">
              <div className="inline-flex p-4 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                <BookOpen className="w-10 h-10" />
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Bosqichli Lug'at</h1>
              <p className="text-lg text-gray-500 font-medium">Bo'limlarni ketma-ket o'rganing va qulflarni oching</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => {
                const isUnlocked = index <= unlockedLevel;
                const termsCount = dictionary.filter(t => t.category === category).length;
                
                return (
                  <motion.div
                    key={category}
                    whileHover={isUnlocked ? { scale: 1.03 } : {}}
                    whileTap={isUnlocked ? { scale: 0.98 } : {}}
                  >
                    <Card 
                      onClick={() => isUnlocked && setActiveCategory(category)}
                      className={`border-2 h-full transition-all duration-300 ${
                        isUnlocked 
                          ? "cursor-pointer border-indigo-200 hover:border-indigo-500 bg-white shadow-lg" 
                          : "opacity-60 bg-gray-50 border-gray-200 grayscale cursor-not-allowed"
                      }`}
                    >
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                          isUnlocked ? "bg-indigo-100 text-indigo-600" : "bg-gray-200 text-gray-500"
                        }`}>
                          {isUnlocked ? <Unlock className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{category}</h3>
                        <p className="text-sm font-medium text-gray-500 mb-4">{termsCount} ta atama</p>
                        
                        {isUnlocked ? (
                          <Badge className="bg-indigo-500 text-white border-none shadow-sm px-4 py-1">Ochiq</Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-500 border-gray-300 px-4 py-1">Qulflangan</Badge>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* 2. O'RGANISH REJIMI: Fleshkartalar */}
        {activeCategory && !quizState.active && (
          <motion.div
            key="flashcards"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center justify-between mb-8">
              <Button variant="ghost" onClick={() => setActiveCategory(null)} className="font-bold text-gray-600">
                <ArrowLeft className="w-5 h-5 mr-2" /> Orqaga
              </Button>
              <div className="text-right">
                <h2 className="text-2xl font-black text-indigo-900">{activeCategory}</h2>
                <p className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block mt-1">
                  O'rganildi: {learnedInCategory} / {categoryTerms.length}
                </p>
              </div>
            </div>

            {/* Agar hamma so'z o'rganilgan bo'lsa, Test tugmasi chiqadi */}
            <AnimatePresence>
              {isAllLearned && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-8 p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-6"
                >
                  <div>
                    <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                      <Trophy className="w-6 h-6 text-yellow-300" /> Bo'lim yakunlandi!
                    </h3>
                    <p className="text-indigo-100 font-medium">Keyingi bo'limni ochish uchun imtihondan o'ting.</p>
                  </div>
                  <Button 
                    size="lg" 
                    onClick={startQuiz}
                    className="bg-white text-indigo-600 hover:bg-gray-50 font-black px-8 py-6 rounded-xl shadow-lg"
                  >
                    <BrainCircuit className="w-6 h-6 mr-2 animate-pulse" /> Testni Boshlash
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryTerms.map(term => {
                const isFlipped = flippedCards.includes(term.id);
                const isLearned = learnedTerms.includes(term.id);

                return (
                  <div key={term.id} className="perspective-1000 h-[280px]">
                    <motion.div
                      className="w-full h-full relative preserve-3d transition-transform duration-500 cursor-pointer"
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      onClick={() => !isLearned && toggleFlip(term.id)}
                    >
                      {/* Old tomoni (Atama) */}
                      <Card className={`absolute w-full h-full backface-hidden border-2 shadow-md flex flex-col items-center justify-center p-6 text-center ${
                        isLearned ? "border-emerald-500 bg-emerald-50" : "border-indigo-100 hover:border-indigo-300 bg-white"
                      }`}>
                        {isLearned && <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-emerald-500" />}
                        <h3 className={`text-2xl font-extrabold ${isLearned ? "text-emerald-900" : "text-gray-900"}`}>
                          {term.term}
                        </h3>
                        {!isLearned && (
                          <p className="absolute bottom-4 text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                            <RotateCcw className="w-3 h-3" /> Aylantirish
                          </p>
                        )}
                      </Card>

                      {/* Orqa tomoni (Ma'nosi) */}
                      <Card 
                        className="absolute w-full h-full backface-hidden border-2 border-indigo-200 shadow-xl bg-gradient-to-br from-indigo-50 to-white flex flex-col"
                        style={{ transform: "rotateY(180deg)" }}
                      >
                        <CardContent className="p-6 flex-1 flex flex-col justify-between h-full">
                          <div className="overflow-y-auto pr-2">
                            <h4 className="text-lg font-bold text-indigo-900 mb-2 border-b border-indigo-100 pb-2">{term.term}</h4>
                            <p className="text-sm font-medium text-gray-700 leading-relaxed">{term.definition}</p>
                          </div>
                          
                          <Button 
                            className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-md"
                            onClick={(e) => markAsLearned(term.id, e)}
                          >
                            <CheckCircle2 className="w-5 h-5 mr-2" /> O'rgandim
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                );
              })}
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
            <div className="flex justify-between items-center mb-6">
              <Button variant="ghost" onClick={() => setQuizState(prev => ({ ...prev, active: false }))}>
                <ArrowLeft className="w-5 h-5 mr-2" /> Chiqish
              </Button>
              <div className="font-black text-indigo-600 bg-indigo-100 px-4 py-2 rounded-xl">
                Savol {quizState.currentIndex + 1} / {quizState.questions.length}
              </div>
            </div>

            <Card className="border-0 shadow-2xl bg-white overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />
              <CardContent className="pt-10 pb-8 px-6 md:px-10">
                <p className="text-sm font-extrabold text-gray-400 uppercase tracking-widest mb-3">
                  Ushbu ta'rif qaysi atamaga tegishli?
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-relaxed mb-10">
                  "{quizState.questions[quizState.currentIndex].definition}"
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quizState.questions[quizState.currentIndex].options.map((option: string, idx: number) => {
                    const isSelected = quizState.selectedOption === option;
                    const isCorrect = option === quizState.questions[quizState.currentIndex].term;
                    
                    let btnClass = "border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 bg-white text-gray-700";
                    
                    if (quizState.showResult) {
                      if (isCorrect) btnClass = "border-emerald-500 bg-emerald-500 text-white shadow-lg z-10 scale-[1.02]";
                      else if (isSelected) btnClass = "border-red-500 bg-red-50 text-red-700 opacity-80";
                      else btnClass = "border-gray-100 bg-gray-50 opacity-40";
                    }

                    return (
                      <Button
                        key={idx}
                        variant="outline"
                        onClick={() => handleAnswer(option)}
                        disabled={quizState.showResult}
                        className={`h-auto p-6 justify-start text-left font-bold text-lg whitespace-normal transition-all duration-300 ${btnClass}`}
                      >
                        <span className="flex-1">{option}</span>
                        {quizState.showResult && isCorrect && <CheckCircle2 className="w-6 h-6 text-white ml-2 flex-shrink-0" />}
                        {quizState.showResult && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-500 ml-2 flex-shrink-0" />}
                      </Button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {quizState.showResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 flex justify-end"
                    >
                      <Button 
                        size="lg" 
                        className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 rounded-xl font-bold text-lg"
                        onClick={nextQuestion}
                      >
                        {quizState.currentIndex === quizState.questions.length - 1 ? "Yakunlash" : "Keyingisi"}
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

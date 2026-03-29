import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Book, Search, Library, BrainCircuit, CheckCircle2, XCircle, ArrowRight, Zap, Trophy } from "lucide-react";
import { dictionary } from "../data/dictionary";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/ui/button";

export function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [learnedTerms, setLearnedTerms] = useState<string[]>([]);
  
  // Test (Quiz) rejimi state-lari
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizEntry, setQuizEntry] = useState<typeof dictionary[0] | null>(null);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [streak, setStreak] = useState(0);

  const categories = Array.from(new Set(dictionary.map(entry => entry.category)));

  const filteredEntries = dictionary.filter(entry => {
    const matchesSearch = 
      entry.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || entry.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Test savolini shakllantirish funksiyasi
  const generateQuiz = () => {
    // Lug'atdan tasodifiy so'zni tanlash
    const randomIdx = Math.floor(Math.random() * dictionary.length);
    const correctEntry = dictionary[randomIdx];
    
    // Yana 3 ta noto'g'ri variantni tanlash
    const wrongOptions = dictionary
      .filter(e => e.id !== correctEntry.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(e => e.term);
      
    // 4 ta variantni aralashtirish
    const options = [...wrongOptions, correctEntry.term].sort(() => 0.5 - Math.random());
    
    setQuizEntry(correctEntry);
    setQuizOptions(options);
    setSelectedOption(null);
    setShowResult(false);
  };

  // Testni boshlash
  useEffect(() => {
    if (isQuizMode && !quizEntry) {
      generateQuiz();
    }
  }, [isQuizMode]);

  // Javobni tekshirish
  const handleAnswer = (option: string) => {
    if (showResult || !quizEntry) return;
    
    setSelectedOption(option);
    setShowResult(true);
    
    if (option === quizEntry.term) {
      // To'g'ri topsa, strekni oshiramiz va "O'rgandim" ga qo'shamiz
      setStreak(prev => prev + 1);
      if (!learnedTerms.includes(quizEntry.id)) {
        setLearnedTerms(prev => [...prev, quizEntry.id]);
      }
    } else {
      // Xato topsa streak nolga tushadi
      setStreak(0);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <motion.div 
        className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-4xl mb-3 font-extrabold text-gray-900 flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-2xl shadow-inner">
              <Book className="w-10 h-10 text-blue-600" />
            </div>
            Huquqiy Lug'at
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl">
            Atamalarni o'qing va bilimingizni maxsus testlar orqali isbotlang
          </p>
        </div>

        {/* Test Rejimiga o'tish tugmasi */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsQuizMode(!isQuizMode);
            if (!isQuizMode) generateQuiz();
          }}
          className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl font-bold shadow-lg transition-all ${
            isQuizMode 
              ? "bg-gray-900 text-white hover:bg-gray-800" 
              : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/30"
          }`}
        >
          {isQuizMode ? (
            <>Lug'atga qaytish <XCircle className="w-5 h-5" /></>
          ) : (
            <>Bilimni Sinash <BrainCircuit className="w-6 h-6 animate-pulse" /></>
          )}
        </motion.button>
      </motion.div>

      <AnimatePresence mode="wait">
        {isQuizMode && quizEntry ? (
          /* --- TEST (VIKTORINA) REJIMI --- */
          <motion.div
            key="quiz"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-3xl mx-auto"
          >
            {/* Statistika Top bar */}
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 font-bold text-emerald-600">
                <CheckCircle2 className="w-5 h-5" />
                O'rganilgan: {learnedTerms.length} / {dictionary.length}
              </div>
              <div className="flex items-center gap-2 font-bold text-orange-500">
                <Zap className="w-5 h-5 fill-orange-500 animate-pulse" />
                Uzliksiz to'g'ri: {streak}
              </div>
            </div>

            <Card className="border-0 shadow-2xl bg-white overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />
              <CardContent className="pt-10 pb-8 px-8">
                <Badge variant="secondary" className="mb-4 bg-emerald-50 text-emerald-700 font-bold px-3 py-1">
                  {quizEntry.category}
                </Badge>
                
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Quyidagi ta'rif qaysi atamaga tegishli?</h3>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 leading-relaxed mb-10">
                  "{quizEntry.definition}"
                </p>

                {/* Variantlar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quizOptions.map((option, index) => {
                    const isSelected = selectedOption === option;
                    const isCorrect = option === quizEntry.term;
                    
                    let buttonStyle = "border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 text-gray-700 bg-white";
                    
                    if (showResult) {
                      if (isCorrect) {
                        buttonStyle = "border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-[1.02] z-10";
                      } else if (isSelected) {
                        buttonStyle = "border-red-500 bg-red-50 text-red-700 opacity-80";
                      } else {
                        buttonStyle = "border-gray-100 bg-gray-50 opacity-40";
                      }
                    }

                    return (
                      <motion.button
                        key={index}
                        whileHover={!showResult ? { scale: 1.02 } : {}}
                        whileTap={!showResult ? { scale: 0.98 } : {}}
                        onClick={() => handleAnswer(option)}
                        disabled={showResult}
                        className={`w-full text-left p-6 rounded-2xl border-2 font-bold text-lg transition-all duration-300 relative ${buttonStyle}`}
                      >
                        <span className="relative z-10">{option}</span>
                        {showResult && isCorrect && (
                          <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white" />
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-red-500" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Keyingi savol tugmasi */}
                <AnimatePresence>
                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center"
                    >
                      <div>
                        {selectedOption === quizEntry.term ? (
                          <p className="text-emerald-600 font-bold flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5" /> Ajoyib! Atama o'zlashtirildi.
                          </p>
                        ) : (
                          <p className="text-red-500 font-bold flex items-center gap-2">
                            <XCircle className="w-5 h-5" /> Noto'g'ri. To'g'ri javob: {quizEntry.term}
                          </p>
                        )}
                      </div>
                      <Button 
                        size="lg"
                        className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold px-8"
                        onClick={generateQuiz}
                      >
                        Keyingisi <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          /* --- LUG'AT REJIMI --- */
          <motion.div key="dictionary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Qidiruv va Filtrlash */}
            <Card className="mb-8 border-0 shadow-xl bg-white/80 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Atamalarni qidiring..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 h-14 text-lg bg-gray-50/50 border-2 border-gray-100 focus:border-blue-500 rounded-2xl transition-all"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(null)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
                        !selectedCategory
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      Barchasi
                    </motion.button>
                    {categories.map((category) => (
                      <motion.button
                        key={category}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
                          selectedCategory === category
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mb-6 flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm">
                <Library className="w-4 h-4 text-blue-500" />
                {filteredEntries.length} ta atama
              </div>
              <div className="text-sm font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                O'zlashtirildi: {learnedTerms.length} / {dictionary.length}
              </div>
            </div>

            {/* Lug'at ro'yxati */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEntries.map((entry, index) => {
                const isLearned = learnedTerms.includes(entry.id);

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    key={entry.id}
                  >
                    <Card className={`h-full border-2 transition-all duration-300 relative overflow-hidden ${
                      isLearned ? "border-emerald-400 bg-emerald-50/20" : "border-gray-100 bg-white hover:border-blue-200 hover:shadow-lg"
                    }`}>
                      
                      {/* Agar o'rganilgan bo'lsa fonda katta qush ko'rinishi (watermark) */}
                      {isLearned && (
                        <div className="absolute right-[-20px] top-[-20px] opacity-10 pointer-events-none transform rotate-12">
                          <Trophy className="w-40 h-40 text-emerald-600" />
                        </div>
                      )}

                      <CardHeader className="pb-3 border-b border-gray-50 relative z-10">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle className={`text-xl font-bold ${isLearned ? "text-emerald-900" : "text-gray-900"}`}>
                                {entry.term}
                              </CardTitle>
                              {isLearned && (
                                <Badge className="bg-emerald-500 text-white hover:bg-emerald-600 px-2 py-0 border-none shadow-sm text-[10px] uppercase">
                                  O'rganilgan
                                </Badge>
                              )}
                            </div>
                            <Badge variant="secondary" className={`${isLearned ? "bg-emerald-100/50 text-emerald-700" : "bg-blue-50 text-blue-700"} font-bold`}>
                              {entry.category}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-5 relative z-10">
                        <CardDescription className="text-base text-gray-700 leading-relaxed font-medium mb-6">
                          {entry.definition}
                        </CardDescription>
                        {entry.examples && entry.examples.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-extrabold text-blue-800 mb-2">Misol:</h4>
                            <p className="text-sm text-gray-600 bg-white/60 p-3 rounded-lg border border-gray-100">
                              {entry.examples[0]}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

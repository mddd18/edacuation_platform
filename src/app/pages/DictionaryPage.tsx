import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Book, Search, Library, BrainCircuit, CheckCircle2, RotateCcw, X, Check } from "lucide-react";
import { dictionary } from "../data/dictionary";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/ui/button";

export function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Yodlash rejimi va o'rganilgan so'zlar state-lari
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedTerms, setLearnedTerms] = useState<string[]>([]); // O'rganilgan so'zlar ID lari

  const categories = Array.from(new Set(dictionary.map(entry => entry.category)));

  const filteredEntries = dictionary.filter(entry => {
    const matchesSearch = 
      entry.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || entry.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // So'zni "O'rganildi" deb belgilash
  const toggleLearned = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLearnedTerms(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  // Fleshkarta logikasi
  const handleNextFlashcard = (learned: boolean) => {
    if (learned && !learnedTerms.includes(filteredEntries[currentFlashcardIndex].id)) {
      toggleLearned(filteredEntries[currentFlashcardIndex].id);
    }
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentFlashcardIndex((prev) => (prev + 1) % filteredEntries.length);
    }, 150);
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
            Huquqiy atamalar bilan tanishing va ularni Fleshkartalar orqali yod oling
          </p>
        </div>

        {/* Fleshkarta Rejimiga o'tish tugmasi */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsFlashcardMode(!isFlashcardMode);
            setIsFlipped(false);
            setCurrentFlashcardIndex(0);
          }}
          className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl font-bold shadow-lg transition-all ${
            isFlashcardMode 
              ? "bg-gray-900 text-white hover:bg-gray-800" 
              : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-indigo-500/30"
          }`}
        >
          {isFlashcardMode ? (
            <>Lug'atga qaytish <X className="w-5 h-5" /></>
          ) : (
            <>Yodlash Rejimi <BrainCircuit className="w-6 h-6 animate-pulse" /></>
          )}
        </motion.button>
      </motion.div>

      {/* --- FLESHKARTA REJIMI --- */}
      <AnimatePresence mode="wait">
        {isFlashcardMode ? (
          <motion.div
            key="flashcard"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center max-w-2xl mx-auto min-h-[500px]"
          >
            <div className="w-full flex justify-between text-sm font-bold text-gray-400 mb-4 px-4">
              <span>Kartochka: {currentFlashcardIndex + 1} / {filteredEntries.length}</span>
              <span className="text-emerald-500">{learnedTerms.length} ta o'rganildi</span>
            </div>

            {/* Flashcard Component */}
            <div 
              className="w-full h-[400px] perspective-1000 cursor-pointer"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <motion.div
                className="w-full h-full relative preserve-3d transition-transform duration-500"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                {/* Old tomoni (Atama) */}
                <Card className="absolute w-full h-full backface-hidden border-2 border-indigo-100 shadow-xl flex flex-col items-center justify-center bg-gradient-to-br from-white to-indigo-50/50">
                  <Badge className="absolute top-6 left-6 bg-indigo-100 text-indigo-700 hover:bg-indigo-100 text-sm px-3 py-1">
                    {filteredEntries[currentFlashcardIndex]?.category}
                  </Badge>
                  <BrainCircuit className="w-16 h-16 text-indigo-200 mb-6" />
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 text-center px-6">
                    {filteredEntries[currentFlashcardIndex]?.term}
                  </h2>
                  <p className="absolute bottom-8 text-indigo-400 font-medium animate-pulse flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" /> Ma'nosini ko'rish uchun bosing
                  </p>
                </Card>

                {/* Orqa tomoni (Ma'nosi) */}
                <Card 
                  className="absolute w-full h-full backface-hidden border-2 border-emerald-100 shadow-xl flex flex-col justify-center bg-gradient-to-br from-emerald-50 to-teal-50/30 p-8 md:p-12"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b border-emerald-200 pb-4">
                    {filteredEntries[currentFlashcardIndex]?.term}
                  </h3>
                  <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
                    {filteredEntries[currentFlashcardIndex]?.definition}
                  </p>
                  
                  {/* Actions */}
                  <div className="absolute bottom-8 left-0 w-full px-8 flex gap-4 justify-center">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-2 border-gray-200 hover:bg-gray-100 h-14 text-lg font-bold"
                      onClick={(e) => { e.stopPropagation(); handleNextFlashcard(false); }}
                    >
                      <RotateCcw className="w-5 h-5 mr-2" /> Qayta takrorlash
                    </Button>
                    <Button 
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 h-14 text-lg font-bold shadow-lg shadow-emerald-500/30"
                      onClick={(e) => { e.stopPropagation(); handleNextFlashcard(true); }}
                    >
                      <Check className="w-6 h-6 mr-2" /> Yod oldim
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </div>
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
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                <Library className="w-4 h-4 text-blue-500" />
                {filteredEntries.length} ta natija
              </div>
              <div className="text-sm font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full">
                O'rganildi: {learnedTerms.length} / {dictionary.length}
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
                      isLearned ? "border-emerald-200 bg-emerald-50/30" : "border-gray-100 bg-white hover:border-blue-200 hover:shadow-lg"
                    }`}>
                      {/* O'rganilganlik haqida belgi (Background text) */}
                      {isLearned && (
                        <div className="absolute -right-6 -top-6 opacity-5 pointer-events-none transform rotate-12">
                          <CheckCircle2 className="w-48 h-48 text-emerald-500" />
                        </div>
                      )}

                      <CardHeader className="pb-3 border-b border-gray-50">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className={`text-xl font-bold mb-2 ${isLearned ? "text-emerald-900" : "text-gray-900"}`}>
                              {entry.term}
                            </CardTitle>
                            <Badge variant="secondary" className={`${isLearned ? "bg-emerald-100 text-emerald-700" : "bg-blue-50 text-blue-700"} font-bold`}>
                              {entry.category}
                            </Badge>
                          </div>
                          
                          {/* "O'rgandim" tugmasi */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => toggleLearned(entry.id, e)}
                            className={`p-2 rounded-full border-2 transition-colors ${
                              isLearned 
                                ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/30" 
                                : "bg-white border-gray-200 text-gray-300 hover:border-emerald-500 hover:text-emerald-500"
                            }`}
                            title={isLearned ? "O'rganilgan" : "O'rgandim deb belgilash"}
                          >
                            <CheckCircle2 className="w-6 h-6" />
                          </motion.button>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-5 relative z-10">
                        <CardDescription className="text-base text-gray-700 leading-relaxed font-medium mb-6">
                          {entry.definition}
                        </CardDescription>
                        {entry.examples && (
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
      
      {/* CSS uchun yordamchi klasslar (Fleshkart aylanishi uchun) */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </div>
  );
}

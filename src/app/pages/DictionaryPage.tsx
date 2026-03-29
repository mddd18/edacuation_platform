import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Book, Search, Library } from "lucide-react";
import { dictionary } from "../data/dictionary";
import { motion, AnimatePresence } from "motion/react";

export function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Noyob (unique) toifalarni olish
  const categories = Array.from(new Set(dictionary.map(entry => entry.category)));

  // Qidiruv va toifa bo'yicha filtrlash
  const filteredEntries = dictionary.filter(entry => {
    const matchesSearch = 
      entry.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.definition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || entry.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen">
      {/* Header (Sarlavha qismi) */}
      <motion.div 
        className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-center justify-between gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-4xl mb-3 font-extrabold text-gray-900 flex items-center justify-center md:justify-start gap-4">
            <div className="p-3 bg-blue-100 rounded-2xl shadow-inner">
              <Book className="w-10 h-10 text-blue-600" />
            </div>
            Huquqiy Lug'at
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl">
            Huquqiy atamalar va tushunchalar uchun tezkor va ishonchli ma'lumotnoma
          </p>
        </div>
      </motion.div>

      {/* Qidiruv va Filtrlash */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="mb-8 border-0 shadow-xl bg-white/80 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Qidiruv paneli */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <Input
                  type="text"
                  placeholder="Huquqiy atamalarni qidiring..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-lg bg-gray-50/50 border-2 border-gray-100 focus:border-blue-500 rounded-2xl transition-all shadow-sm"
                />
              </div>

              {/* Toifa (Category) filtrlari */}
              <div className="flex flex-wrap gap-2.5">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(null)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
                    !selectedCategory
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/30"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  Barcha Toifalar
                </motion.button>
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/30"
                        : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Natijalar soni */}
      <motion.div 
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 bg-gray-100/80 w-max px-4 py-2 rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Library className="w-4 h-4 text-blue-500" />
        {dictionary.length} ta atamadan {filteredEntries.length} tasi topildi
      </motion.div>

      {/* Lug'at Atamalari (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredEntries.map((entry, index) => (
            <motion.div
              layout // Qidiruvda elementlar o'rnini almashtirganda silliq harakatlanadi
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              key={entry.id}
            >
              <Card className="h-full border border-gray-100 shadow-lg hover:shadow-xl hover:border-blue-200 transition-all duration-300 bg-white">
                <CardHeader className="pb-3 border-b border-gray-50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-gray-900 mb-2">{entry.term}</CardTitle>
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-bold px-2.5 py-1">
                        {entry.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-5">
                  <CardDescription className="text-base text-gray-700 leading-relaxed font-medium mb-6">
                    {entry.definition}
                  </CardDescription>

                  {/* Misollar */}
                  {entry.examples && entry.examples.length > 0 && (
                    <div className="mb-6 bg-gray-50/80 p-4 rounded-xl border border-gray-100">
                      <h4 className="text-sm font-extrabold text-blue-800 mb-3 flex items-center gap-2">
                        Misollar:
                      </h4>
                      <ul className="space-y-2">
                        {entry.examples.map((example, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-blue-500 mt-1 text-lg leading-none">•</span>
                            <span className="flex-1 font-medium">{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tegishli Atamalar */}
                  {entry.relatedTerms && entry.relatedTerms.length > 0 && (
                    <div className="pt-2">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                        Tegishli Atamalar:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {entry.relatedTerms.map((term, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-white text-gray-600 border-gray-200 font-semibold hover:bg-gray-50 cursor-pointer">
                            {term}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Hech narsa topilmasa */}
      <AnimatePresence>
        {filteredEntries.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-2 border-dashed border-gray-200 bg-gray-50/50 shadow-none mt-4">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                  <Search className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Atamalar topilmadi</h3>
                <p className="text-base text-gray-500 font-medium max-w-sm">
                  "{searchTerm}" bo'yicha hech qanday natija yo'q. Qidiruv so'zini o'zgartirib ko'ring yoki boshqa toifani tanlang.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory(null);
                  }}
                  className="mt-6 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-md shadow-blue-500/30"
                >
                  Filtrlarni tozalash
                </motion.button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lug'at Statistikasi (Bottom Stats) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="mt-12 border-0 shadow-xl overflow-hidden relative bg-slate-900 text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="relative z-10 border-b border-slate-800 pb-4">
            <CardTitle className="text-xl font-bold">Lug'at Statistikasi</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <p className="text-4xl font-extrabold text-blue-400 mb-2">{dictionary.length}</p>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Jami Atamalar</p>
              </div>
              <div className="text-center p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <p className="text-4xl font-extrabold text-purple-400 mb-2">{categories.length}</p>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Toifalar</p>
              </div>
              <div className="text-center p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <p className="text-4xl font-extrabold text-emerald-400 mb-2">12</p>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">O'rganilgan</p>
              </div>
              <div className="text-center p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <p className="text-4xl font-extrabold text-amber-400 mb-2">3</p>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Bu hafta yangi</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

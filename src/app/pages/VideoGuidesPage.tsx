import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  PlaySquare, 
  Search,
  MonitorPlay
} from "lucide-react";
import { videoGuides } from "../data/videos";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "../components/ui/input";

export function VideoGuidesPage() {
  const [filter, setFilter] = useState<string>("Barchasi");
  const [search, setSearch] = useState("");

  const filteredVideos = videoGuides.filter(video => {
    const matchesFilter = filter === "Barchasi" || video.category === filter;
    const matchesSearch = video.title.toLowerCase().includes(search.toLowerCase()) || 
                          video.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="py-6 px-4 md:p-10 max-w-7xl mx-auto min-h-screen dark:bg-slate-900 transition-colors duration-300 overflow-x-hidden">
      <motion.div 
        className="mb-6 md:mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex p-3 md:p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full mb-3 md:mb-4 shadow-inner">
          <PlaySquare className="w-8 h-8 md:w-10 md:h-10" />
        </div>
        <h1 className="text-2xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2 md:mb-3 tracking-tight">
          Video Qo'llanmalar
        </h1>
        <p className="text-sm md:text-lg text-gray-500 dark:text-slate-400 font-medium max-w-2xl mx-auto px-1">
          OneID, My.gov.uz va o'qishga topshirish kabi muhim davlat xizmatlaridan onlayn foydalanishni videolarda o'rganing.
        </p>
      </motion.div>

      {/* Filtrlash va Qidiruv - Mobil uchun ixchamlashtirildi */}
      <div className="flex flex-col lg:flex-row gap-3 md:gap-4 justify-between items-center mb-6 md:mb-10 bg-white dark:bg-slate-800 p-3 md:p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
        <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 scrollbar-hide snap-x">
          {["Barchasi", "OneID", "My.gov.uz", "O'qishga topshirish"].map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-3 py-2 md:px-5 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap snap-start ${
                filter === category 
                  ? "bg-red-500 text-white shadow-md shadow-red-500/30" 
                  : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="relative w-full lg:w-80 flex-shrink-0 mt-1 lg:mt-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
          <Input 
            type="text" 
            placeholder="Qo'llanmani qidiring..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 md:pl-10 h-10 md:h-12 text-sm md:text-base bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 dark:text-white rounded-xl"
          />
        </div>
      </div>

      {/* Videolar Ro'yxati */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredVideos.map((video, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              key={video.id}
            >
              <Card className="h-full border-2 border-gray-100 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-500/50 transition-all duration-300 bg-white dark:bg-slate-800 shadow-md hover:shadow-xl overflow-hidden flex flex-col rounded-2xl">
                
                {/* Youtube Embed Qismi */}
                <div className="w-full aspect-video bg-gray-200 dark:bg-slate-900 relative">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                
                <CardContent className="p-4 md:p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                    <MonitorPlay className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500" />
                    <Badge className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-none shadow-none text-[10px] md:text-xs px-2 py-0.5 md:px-2.5 md:py-1 font-bold">
                      {video.category}
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-tight mb-2 md:mb-3">
                    {video.title}
                  </h3>

                  <p className="text-xs md:text-base text-gray-600 dark:text-slate-400 font-medium leading-relaxed mt-auto">
                    {video.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {filteredVideos.length === 0 && (
        <div className="text-center py-16 md:py-20 text-sm md:text-base text-gray-500 dark:text-slate-500 font-medium">
          Siz qidirgan video qo'llanma topilmadi.
        </div>
      )}
    </div>
  );
}

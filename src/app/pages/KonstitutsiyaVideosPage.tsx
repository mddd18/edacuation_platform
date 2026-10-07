import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Search, MonitorPlay, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "../components/ui/input";

// 8 ta video ro'yxati
const konstitutsiyaVideos = [
  {
    id: "v1",
    youtubeId: "lpSzjL7Vneo",
    title: "Inson huquqlari - oliy qadriyat",
    description: "Konstitutsiyamizning 13-14 moddalari: O'zbekistonda demokratiya umuminsoniy prinsiplarga asoslanishi va inson hayoti, erkinligi, sha'ni haqida.",
    category: "Konstitutsiya"
  },
  {
    id: "v2",
    youtubeId: "ep0WZ6SQeZU",
    title: "Yoshlarning huquqlari himoya qilinadi",
    description: "Yangilangan Konstitutsiyaning 79-moddasi: Davlat yoshlarning huquqlari himoya qilinishini ta'minlaydi.",
    category: "Huquqlar"
  },
  {
    id: "v3",
    youtubeId: "5_cfKjRs1Ns",
    title: "Yashash huquqi har bir insonning ajralmas huquqidir",
    description: "Yangilangan Konstitutsiyaning 25-moddasi: Inson hayotiga suiqasd qilish eng og'ir jinoyatdir.",
    category: "Huquqlar"
  },
  {
    id: "v4",
    youtubeId: "2_XcAuGTpzE",
    title: "Nikoh ixtiyoriy rozilik va teng huquqlilik asosida",
    description: "Konstitutsiyaning 76-moddasi: Oila jamiyatning asosiy bo'g'inidir.",
    category: "Oila"
  },
  {
    id: "v5",
    youtubeId: "e3mkfJUkg3Y",
    title: "Oʻqituvchilarning shaʼni va qadr-qimmati himoya qilinadi",
    description: "Konstitutsiyaning 52-moddasi: Davlat o'qituvchilarning sha'ni va qadr-qimmatini himoya qiladi.",
    category: "Huquqlar"
  },
  {
    id: "v6",
    youtubeId: "LLZqJf0uGME",
    title: "Ta’lim olish huquqi va majburiy ta’lim",
    description: "Konstitutsiyaning 50-moddasi: Har bir fuqaroning ta'lim olish huquqi kafolatlanadi.",
    category: "Ta'lim"
  },
  {
    id: "v7",
    youtubeId: "U-RBe8TBkh4",
    title: "Yozishmalar, telefon va boshqa xabarlar siri",
    description: "Konstitutsiyaning 31-moddasi: Shaxsiy hayotning daxlsizligi huquqi.",
    category: "Shaxsiy"
  },
  {
    id: "v8",
    youtubeId: "kZIFOYekyFM",
    title: "Xotin-qizlar va erkaklar teng huquqlidirlar",
    description: "Konstitutsiyaning 58-moddasi: Teng huquqlilikni ta'minlash.",
    category: "Huquqlar"
  }
];

export function KonstitutsiyaVideosPage() {
  const [filter, setFilter] = useState<string>("Barchasi");
  const [search, setSearch] = useState("");

  const categories = ["Barchasi", "Konstitutsiya", "Huquqlar", "Oila", "Ta'lim", "Shaxsiy"];

  const filteredVideos = konstitutsiyaVideos.filter(video => {
    const matchesFilter = filter === "Barchasi" || video.category === filter;
    const matchesSearch = video.title.toLowerCase().includes(search.toLowerCase()) || 
                          video.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="py-6 px-4 md:p-10 w-full max-w-7xl mx-auto min-h-screen dark:bg-slate-900 transition-colors duration-300">
      
      <motion.div 
        className="mb-6 md:mb-8 text-center flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex p-3 md:p-4 bg-indigo-100 dark:bg-indigo-900/35 text-indigo-600 dark:text-indigo-400 rounded-full mb-3 md:mb-4 shadow-inner">
          <BookOpen className="w-8 h-8 md:w-10 md:h-10" />
        </div>
        <h1 className="text-2xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2 md:mb-3 tracking-tight">
          Konstitutsiya va Huquq Videolari
        </h1>
        <p className="text-sm md:text-lg text-gray-500 dark:text-slate-400 font-medium max-w-2xl text-center px-2">
          Asosiy qonunimiz va inson huquqlariga oid qiziqarli video darsliklar.
        </p>
      </motion.div>

      {/* Filtrlar va qidiruv */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-6 md:mb-10 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all ${
                filter === category 
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30" 
                  : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
          <Input 
            type="text" 
            placeholder="Qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 md:pl-10 h-10 md:h-12 w-full text-sm md:text-base bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 dark:text-white rounded-xl"
          />
        </div>
      </div>

      {/* Videolar gridi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 w-full">
        <AnimatePresence mode="popLayout">
          {filteredVideos.map((video, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              key={video.id}
              className="w-full"
            >
              <Card className="h-full w-full border-2 border-gray-100 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all duration-300 bg-white dark:bg-slate-800 shadow-md hover:shadow-xl overflow-hidden flex flex-col rounded-2xl">
                <div className="w-full aspect-video bg-gray-200 dark:bg-slate-900 relative overflow-hidden">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                
                <CardContent className="p-4 md:p-6 flex flex-col flex-1 w-full">
                  <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                    <MonitorPlay className="w-3.5 h-3.5 md:w-4 md:h-4 text-indigo-500" />
                    <Badge className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-none shadow-none text-[10px] md:text-xs px-2 py-0.5 font-bold">
                      {video.category}
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                    {video.title}
                  </h3>

                  <p className="text-xs md:text-sm text-gray-600 dark:text-slate-400 font-medium leading-relaxed mt-auto">
                    {video.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-20 text-gray-500 font-medium">
          Hech narsa topilmadi.
        </div>
      )}

    </div>
  );
}

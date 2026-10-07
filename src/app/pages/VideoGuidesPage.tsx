import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  Search,
  MonitorPlay,
  Landmark,
  ShieldAlert,
  PlayCircle
} from "lucide-react";
import { videoGuides } from "../data/videos";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "../components/ui/input";

// TARJIMALAR LUG'ATI
const translations = {
  UZ: {
    title: "Elektron Hukumat va Xavfsizlik",
    subtitle: "Davlat xizmatlaridan onlayn foydalanish va internetda firibgarlikdan himoyalanish sirlari.",
    tabEgov: "Elektron hukumat",
    tabCyber: "Kiberjinoyatga qarshi",
    searchPlaceholder: "Qidiring...",
    emptyState: "Siz qidirgan video qo'llanma topilmadi.",
    filters: {
      all: "Barchasi",
      oneid: "OneID",
      mygov: "My.gov.uz",
      admission: "O'qishga topshirish"
    }
  },
  QQ: {
    title: "Mámleketlik Xızmetler hám Qáwipsizlik",
    subtitle: "Mámleketlik xızmetlerden onlayn paydalanıw hám internette kiberjınayattan qorǵanıw sırları.",
    tabEgov: "Mámleketlik xızmetler",
    tabCyber: "Kiberqáwipsizlik",
    searchPlaceholder: "Izleń...",
    emptyState: "Siz izlegen video qollanba tabılmadı.",
    filters: {
      all: "Barlıǵı",
      oneid: "OneID",
      mygov: "My.gov.uz",
      admission: "Oqıwǵa tapsırıw"
    }
  }
};

export function VideoGuidesPage() {
  const [filter, setFilter] = useState<string>("Barchasi");
  const [search, setSearch] = useState("");

  // TIZIMDAGI TILNI OLISH
  const lang = (localStorage.getItem('appLang') as 'UZ' | 'QQ') || 'UZ';
  const t = translations[lang];

  // Kategoriyalar ro'yxati (id - asl nomi, label - tarjima qilingan nomi)
  const categories = [
    { id: "Barchasi", label: t.filters.all },
    { id: "OneID", label: t.filters.oneid },
    { id: "My.gov.uz", label: t.filters.mygov },
    { id: "O'qishga topshirish", label: t.filters.admission }
  ];

  // Video kategoriyasini tarjima qilib ko'rsatish uchun yordamchi funksiya
  const getDisplayCategory = (catId: string) => {
    const found = categories.find(c => c.id === catId);
    return found ? found.label : catId;
  };

  const filteredVideos = videoGuides.filter(video => {
    const matchesFilter = filter === "Barchasi" || video.category === filter;
    const matchesSearch = video.title.toLowerCase().includes(search.toLowerCase()) || 
                          video.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="py-6 px-4 md:p-10 w-full max-w-7xl mx-auto min-h-screen dark:bg-slate-900 transition-colors duration-300">
      
      {/* SARLAVHA QISMI */}
      <motion.div 
        className="mb-6 md:mb-8 text-center flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex p-3 md:p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mb-3 md:mb-4 shadow-inner">
          <Landmark className="w-8 h-8 md:w-10 md:h-10" />
        </div>
        <h1 className="text-2xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2 md:mb-3 tracking-tight">
          {t.title}
        </h1>
        <p className="text-sm md:text-lg text-gray-500 dark:text-slate-400 font-medium max-w-2xl text-center px-2">
          {t.subtitle}
        </p>
      </motion.div>

      {/* BO'LIMLAR (TABS) */}
      <Tabs defaultValue="egov" className="w-full">
        <TabsList className="grid w-full md:w-[500px] mx-auto grid-cols-2 p-1 bg-gray-200 dark:bg-slate-800 rounded-xl mb-8">
          <TabsTrigger 
            value="egov" 
            className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 font-bold transition-all"
          >
            <Landmark className="w-4 h-4" />
            <span className="text-sm md:text-base">{t.tabEgov}</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="cyber" 
            className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm data-[state=active]:text-red-600 dark:data-[state=active]:text-red-400 font-bold transition-all"
          >
            <ShieldAlert className="w-4 h-4" />
            <span className="text-sm md:text-base">{t.tabCyber}</span>
          </TabsTrigger>
        </TabsList>

        {/* 1-BO'LIM: ELEKTRON HUKUMAT */}
        <TabsContent value="egov" className="animate-in fade-in duration-500">
          
          {/* Filtrlash va Qidiruv */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-6 md:mb-10 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors w-full box-border">
            
            <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-start sm:justify-center lg:justify-start">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all ${
                    filter === category.id 
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/30" 
                      : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
            
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              <Input 
                type="text" 
                placeholder={t.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 md:pl-10 h-10 md:h-12 w-full text-sm md:text-base bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 dark:text-white rounded-xl"
              />
            </div>
          </div>

          {/* Videolar Ro'yxati */}
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
                  <Card className="h-full w-full border-2 border-gray-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all duration-300 bg-white dark:bg-slate-800 shadow-md hover:shadow-xl overflow-hidden flex flex-col rounded-2xl">
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
                        <MonitorPlay className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-500" />
                        <Badge className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-none shadow-none text-[10px] md:text-xs px-2 py-0.5 font-bold whitespace-nowrap">
                          {getDisplayCategory(video.category)}
                        </Badge>
                      </div>
                      
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                        {video.title}
                      </h3>

                      <p className="text-xs md:text-sm text-gray-600 dark:text-slate-400 font-medium leading-relaxed mt-auto break-words">
                        {video.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredVideos.length === 0 && (
            <div className="text-center py-16 md:py-20 text-sm md:text-base text-gray-500 dark:text-slate-500 font-medium w-full">
              {t.emptyState}
            </div>
          )}
        </TabsContent>

        {/* 2-BO'LIM: KIBERXAVFSIZLIK */}
        <TabsContent value="cyber" className="animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 w-full">
            
            {/* 1-VIDEO: Kiberfiribgarlardan qanday himoyalanish kerak? */}
            <Card className="h-full w-full border-2 border-gray-100 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-500/50 transition-all duration-300 bg-white dark:bg-slate-800 shadow-md hover:shadow-xl overflow-hidden flex flex-col rounded-2xl">
              <div className="w-full aspect-video bg-gray-200 dark:bg-slate-900 relative overflow-hidden">
                <iframe
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  src="https://www.youtube.com/embed/BlRDVMzqA6I" 
                  title="Kiberfiribgarlardan qanday himoyalanish kerak?"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <CardContent className="p-4 md:p-6 flex flex-col flex-1 w-full">
                <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                  <ShieldAlert className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500" />
                  <Badge className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-none shadow-none text-[10px] md:text-xs px-2 py-0.5 font-bold whitespace-nowrap">
                    Kiberxavfsizlik
                  </Badge>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                  Kiberfiribgarlardan qanday himoyalanish kerak?
                </h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-slate-400 font-medium leading-relaxed mt-auto break-words">
                  Virtual firibgarlar qanday usullardan foydalanadi (masalan, fishing)? Soxta SMS kodlar, Telegramdagi yolg'on ssilkalar va yutug'li o'yinlarga ishonib qolmaslik haqida batafsil ma'lumot.
                </p>
              </CardContent>
            </Card>

            {/* 2-VIDEO: Kredit bitimiga taqiq qo'yish (my.gov.uz) */}
            <Card className="h-full w-full border-2 border-gray-100 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-500/50 transition-all duration-300 bg-white dark:bg-slate-800 shadow-md hover:shadow-xl overflow-hidden flex flex-col rounded-2xl">
              <div className="w-full aspect-video bg-gray-200 dark:bg-slate-900 relative overflow-hidden">
                <iframe
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  src="https://www.youtube.com/embed/3PRPVe8IM7w" 
                  title="Kredit bitimini tuzishga taqiq qo‘yish yoki ta’qiqni olib tashlash"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <CardContent className="p-4 md:p-6 flex flex-col flex-1 w-full">
                <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                  <ShieldAlert className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500" />
                  <Badge className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-none shadow-none text-[10px] md:text-xs px-2 py-0.5 font-bold whitespace-nowrap">
                    Firibgarlikdan himoya
                  </Badge>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                  Sizning nomingizdan kredit olishlarining oldini oling!
                </h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-slate-400 font-medium leading-relaxed mt-auto break-words">
                  Nomingizga firibgarlar kredit olishidan xavotirdamisiz? My.gov.uz orqali kredit bitimini tuzishga taqiq qo'yish yoki uni olib tashlash bo'yicha amaliy yo'riqnoma.
                </p>
              </CardContent>
            </Card>

          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

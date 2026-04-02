import { Link } from "react-router";
import { CheckCircle2, Lock, Play, Sparkles } from "lucide-react";
import { lessons } from "../data/lessons";
import { userProgress } from "../data/user";

export function LearningJourney() {
  const completedCount = userProgress.completedLessons.length;
  const progressHeight = lessons.length > 1 ? Math.min((completedCount / (lessons.length - 1)) * 100, 100) : 0;

  return (
    <div className="relative max-w-4xl mx-auto py-6 md:py-10 px-2 sm:px-0 overflow-hidden">
      
      {/* Orqa fondagi kulrang chiziq (Yo'l) */}
      <div className="absolute left-6 sm:left-1/2 top-10 bottom-10 w-1 md:w-1.5 sm:-translate-x-1/2 bg-slate-200 dark:bg-slate-700 rounded-full" />
      
      {/* Tugatilgan darslarni ko'rsatuvchi rangli chiziq */}
      <div 
        className="absolute left-6 sm:left-1/2 top-10 w-1 md:w-1.5 sm:-translate-x-1/2 bg-gradient-to-b from-green-400 via-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out" 
        style={{ height: `${progressHeight}%` }}
      />

      <div className="space-y-8 sm:space-y-24 relative z-10">
        {lessons.map((lesson, index) => {
          const isCompleted = userProgress.completedLessons.includes(lesson.id);
          const isCurrentActive = index === completedCount; 
          const isLocked = index > completedCount; 
          
          const isLeft = index % 2 === 0;

          return (
            <div key={lesson.id} className={`flex flex-col sm:flex-row items-start sm:items-center w-full ${isLeft ? 'sm:justify-start' : 'sm:justify-end'} relative`}>
              
              {/* O'rtadagi tugun (Nuqta) */}
              <div className={`absolute left-6 sm:left-1/2 transform -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full border-4 border-white dark:border-slate-800 shadow-md flex items-center justify-center z-20 transition-colors duration-500 ${
                isCompleted ? 'bg-green-500' : isCurrentActive ? 'bg-blue-500 animate-pulse' : 'bg-slate-300 dark:bg-slate-600'
              }`}>
                {isCompleted && <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-white" />}
                {isCurrentActive && <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-white rounded-full" />}
                {isLocked && <Lock className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-500 dark:text-slate-400" />}
              </div>

              {/* Dars Kartochkasi */}
              <div className={`ml-14 sm:ml-0 w-[calc(100%-3.5rem)] sm:w-[45%] ${isLeft ? 'sm:pr-12 sm:text-right' : 'sm:pl-12 text-left'}`}>
                
                {isLocked ? (
                  // Qulflangan Dars
                  <div className="bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-4 md:p-5 opacity-70 transition-all duration-300 hover:opacity-100">
                    <div className={`flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2 ${isLeft ? 'sm:justify-end' : 'justify-start'}`}>
                       <Lock className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-400" />
                       <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">{lesson.module}</span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-slate-500 dark:text-slate-400 mb-1.5 md:mb-2 leading-tight">{lesson.title}</h3>
                    <p className="text-xs md:text-sm text-slate-400 dark:text-slate-500 leading-snug">Ochish uchun oldingi darslarni muvaffaqiyatli yakunlang</p>
                  </div>
                ) : isCurrentActive ? (
                  // Hozirgi Ochiq Dars
                  <Link to={`/lesson/${lesson.id}`} className="block transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300">
                    <div className="relative bg-white dark:bg-slate-800 border-2 border-blue-400 dark:border-blue-500 rounded-2xl p-4 md:p-6 shadow-lg shadow-blue-500/10">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-20 animate-pulse" />
                      <div className="relative">
                        <div className={`flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3 ${isLeft ? 'sm:justify-end' : 'justify-start'}`}>
                           <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-500" />
                           <span className="text-[10px] md:text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{lesson.module}</span>
                        </div>
                        <h3 className="text-lg md:text-xl font-extrabold text-slate-800 dark:text-white mb-1.5 md:mb-2 leading-tight">{lesson.title}</h3>
                        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3 md:mb-5">Navbatdagi darsingiz sizni kutmoqda!</p>
                        <div className={`flex items-center gap-2 ${isLeft ? 'sm:justify-end' : 'justify-start'}`}>
                          <span className="text-xs md:text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md px-3 py-1.5 md:px-4 md:py-2 rounded-full flex items-center gap-1 md:gap-1.5">
                            <Play className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" /> Boshlash
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  // Tugatilgan Dars
                  <Link to={`/lesson/${lesson.id}`} className="block transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300">
                    <div className="bg-green-50/50 dark:bg-green-900/10 border-2 border-green-200 dark:border-green-800/50 rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow">
                       <div className={`flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2 ${isLeft ? 'sm:justify-end' : 'justify-start'}`}>
                           <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-500" />
                           <span className="text-[10px] md:text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">{lesson.module}</span>
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-slate-700 dark:text-slate-200 mb-1 leading-tight">{lesson.title}</h3>
                        <p className="text-[11px] md:text-sm text-green-600/80 dark:text-green-400/80">Muvaffaqiyatli tugallangan • Qayta ko'rish</p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { Link } from "react-router";
import { CheckCircle2, Lock, Play, Sparkles } from "lucide-react";
import { lessons } from "../data/lessons";
import { userProgress } from "../data/user";

export function LearningJourney() {
  // Qancha dars tugatilganini hisoblash
  const completedCount = userProgress.completedLessons.length;
  // Progress chizig'i uzunligini foizda hisoblash
  const progressHeight = lessons.length > 1 ? Math.min((completedCount / (lessons.length - 1)) * 100, 100) : 0;

  return (
    <div className="relative max-w-4xl mx-auto py-10 px-4 sm:px-0">
      
      {/* Orqa fondagi kulrang chiziq (Yo'l) */}
      <div className="absolute left-8 sm:left-1/2 top-10 bottom-10 w-1.5 sm:-translate-x-1/2 bg-slate-200 dark:bg-slate-700 rounded-full" />
      
      {/* Tugatilgan darslarni ko'rsatuvchi rangli chiziq */}
      <div 
        className="absolute left-8 sm:left-1/2 top-10 w-1.5 sm:-translate-x-1/2 bg-gradient-to-b from-green-400 via-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out" 
        style={{ height: `${progressHeight}%` }}
      />

      <div className="space-y-12 sm:space-y-24 relative z-10">
        {lessons.map((lesson, index) => {
          const isCompleted = userProgress.completedLessons.includes(lesson.id);
          const isCurrentActive = index === completedCount; // Oldingisi tugagandan keyin aynan shu ochiladi
          const isLocked = index > completedCount; // Hali yetib kelinmagan darslar
          
          // Kompyuterda chap va o'ngga galma-galdan joylashtirish
          const isLeft = index % 2 === 0;

          return (
            <div key={lesson.id} className={`flex flex-col sm:flex-row items-start sm:items-center w-full ${isLeft ? 'sm:justify-start' : 'sm:justify-end'} relative`}>
              
              {/* O'rtadagi tugun (Nuqta) */}
              <div className={`absolute left-8 sm:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full border-4 border-white dark:border-slate-800 shadow-md flex items-center justify-center z-20 transition-colors duration-500 ${
                isCompleted ? 'bg-green-500' : isCurrentActive ? 'bg-blue-500 animate-pulse' : 'bg-slate-300 dark:bg-slate-600'
              }`}>
                {isCompleted && <CheckCircle2 className="w-5 h-5 text-white" />}
                {isCurrentActive && <div className="w-3 h-3 bg-white rounded-full" />}
                {isLocked && <Lock className="w-4 h-4 text-slate-500 dark:text-slate-400" />}
              </div>

              {/* Dars Kartochkasi */}
              <div className={`ml-16 sm:ml-0 w-full sm:w-[45%] ${isLeft ? 'sm:pr-12 sm:text-right' : 'sm:pl-12 text-left'}`}>
                
                {isLocked ? (
                  // Qulflangan Dars
                  <div className="bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-5 opacity-70 transition-all duration-300 hover:opacity-100">
                    <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'sm:justify-end' : 'justify-start'}`}>
                       <Lock className="w-4 h-4 text-slate-400" />
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{lesson.module}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-500 dark:text-slate-400 mb-2">{lesson.title}</h3>
                    <p className="text-sm text-slate-400 dark:text-slate-500">Ochish uchun oldingi darslarni muvaffaqiyatli yakunlang</p>
                  </div>
                ) : isCurrentActive ? (
                  // Hozirgi Ochiq Dars
                  <Link to={`/lesson/${lesson.id}`} className="block transform hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-300">
                    <div className="relative bg-white dark:bg-slate-800 border-2 border-blue-400 dark:border-blue-500 rounded-2xl p-6 shadow-xl shadow-blue-500/10">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-20 animate-pulse" />
                      <div className="relative">
                        <div className={`flex items-center gap-2 mb-3 ${isLeft ? 'sm:justify-end' : 'justify-start'}`}>
                           <Sparkles className="w-4 h-4 text-yellow-500" />
                           <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{lesson.module}</span>
                        </div>
                        <h3 className="text-xl font-extrabold text-slate-800 dark:text-white mb-2">{lesson.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-5">Navbatdagi darsingiz sizni kutmoqda!</p>
                        <div className={`flex items-center gap-2 ${isLeft ? 'sm:justify-end' : 'justify-start'}`}>
                          <span className="text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md px-4 py-2 rounded-full flex items-center gap-1.5">
                            <Play className="w-4 h-4 fill-current" /> Boshlash
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  // Tugatilgan Dars
                  <Link to={`/lesson/${lesson.id}`} className="block transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300">
                    <div className="bg-green-50/50 dark:bg-green-900/10 border-2 border-green-200 dark:border-green-800/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                       <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'sm:justify-end' : 'justify-start'}`}>
                           <CheckCircle2 className="w-4 h-4 text-green-500" />
                           <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">{lesson.module}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-1">{lesson.title}</h3>
                        <p className="text-sm text-green-600/80 dark:text-green-400/80">Muvaffaqiyatli tugallangan • Qayta ko'rish</p>
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

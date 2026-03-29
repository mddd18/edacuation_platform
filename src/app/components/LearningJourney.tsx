import { Link } from "react-router";
import { CheckCircle2, Lock, Play, Sparkles } from "lucide-react";
import { lessons } from "../data/lessons";
import { userProgress } from "../data/user";

export function LearningJourney() {
  return (
    <div className="relative">
      {/* Journey Path SVG Line */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#764ba2" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f093fb" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {/* Curved path connecting modules */}
        {lessons.map((_, index) => {
          if (index === lessons.length - 1) return null;
          
          const startX = index % 2 === 0 ? 100 : 300;
          const startY = 80 + index * 180;
          const endX = (index + 1) % 2 === 0 ? 100 : 300;
          const endY = 80 + (index + 1) * 180;
          
          const midX = (startX + endX) / 2;
          const midY = (startY + endY) / 2;
          
          return (
            <path
              key={index}
              d={`M ${startX} ${startY} Q ${midX} ${midY - 40} ${endX} ${endY}`}
              stroke="url(#pathGradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="10 5"
            />
          );
        })}
      </svg>

      {/* Module Cards */}
      <div className="relative space-y-12 py-8">
        {lessons.map((lesson, index) => {
          const isCompleted = userProgress.completedLessons.includes(lesson.id);
          const isCurrentActive = index === userProgress.completedLessons.length;
          const isLocked = index > userProgress.completedLessons.length;
          
          const xPosition = index % 2 === 0 ? "left" : "right";
          
          return (
            <div
              key={lesson.id}
              className={`flex ${xPosition === "left" ? "justify-start" : "justify-end"}`}
            >
              <div className={`w-80 ${xPosition === "left" ? "ml-0" : "mr-0"}`}>
                {isLocked ? (
                  // Locked Module
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-300 to-slate-400 rounded-2xl blur-xl opacity-30 group-hover:opacity-40 transition-opacity" />
                    <div className="relative bg-white/50 backdrop-blur-sm border-2 border-slate-300 rounded-2xl p-6 opacity-60">
                      <div className="flex items-start justify-between mb-3">
                        <div className="bg-slate-200 px-3 py-1 rounded-full">
                          <span className="text-xs font-semibold text-slate-500">
                            {lesson.module}
                          </span>
                        </div>
                        <div className="bg-slate-200 p-2 rounded-full">
                          <Lock className="w-5 h-5 text-slate-500" />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-700 mb-2">
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-slate-500">
                        Complete previous modules to unlock
                      </p>
                    </div>
                  </div>
                ) : isCurrentActive ? (
                  // Current Active Module with pulsing animation
                  <Link to={`/lesson/${lesson.id}`}>
                    <div className="relative group cursor-pointer">
                      {/* Animated glow rings */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-2xl opacity-60 animate-pulse" />
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity animate-pulse" 
                        style={{ animationDelay: '0.5s' }} 
                      />
                      
                      <div className="relative bg-white border-2 border-transparent rounded-2xl p-6 shadow-2xl transform group-hover:scale-105 transition-all duration-300"
                        style={{
                          background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #667eea, #764ba2) border-box'
                        }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div 
                            className="px-3 py-1 rounded-full text-white shadow-lg"
                            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                          >
                            <span className="text-xs font-semibold flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              {lesson.module}
                            </span>
                          </div>
                          <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-2 rounded-full shadow-lg animate-pulse">
                            <Play className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {lesson.title}
                        </h3>
                        <p className="text-sm text-slate-600 mb-4">
                          Start your next learning adventure
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" style={{ width: '0%' }} />
                          </div>
                          <span className="text-xs font-semibold text-slate-600">Start</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  // Completed Module with glow
                  <Link to={`/lesson/${lesson.id}`}>
                    <div className="relative group cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                      
                      <div className="relative bg-white border-2 border-green-200 rounded-2xl p-6 shadow-lg transform group-hover:scale-105 transition-all duration-300">
                        <div className="flex items-start justify-between mb-3">
                          <div className="bg-gradient-to-r from-green-400 to-emerald-500 px-3 py-1 rounded-full shadow-md">
                            <span className="text-xs font-semibold text-white">
                              {lesson.module}
                            </span>
                          </div>
                          <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-2 rounded-full shadow-lg">
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">
                          {lesson.title}
                        </h3>
                        <p className="text-sm text-slate-600 mb-4">
                          Completed • Click to review
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" style={{ width: '100%' }} />
                          </div>
                          <span className="text-xs font-semibold text-green-600">100%</span>
                        </div>
                      </div>
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

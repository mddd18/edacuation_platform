import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { Award, Sparkles, Trophy, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: number;
  xpEarned: number;
  nextLessonId?: string;
}

export function LevelUpModal({ isOpen, onClose, level, xpEarned, nextLessonId }: LevelUpModalProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger confetti
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#667eea', '#764ba2', '#f093fb', '#43e97b', '#38f9d7']
        });
        
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#667eea', '#764ba2', '#f093fb', '#43e97b', '#38f9d7']
        });
      }, 250);

      // Show content after a brief delay
      setTimeout(() => setShowContent(true), 300);

      return () => {
        clearInterval(interval);
        setShowContent(false);
      };
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-0 bg-transparent shadow-none p-0">
        <div className="relative">
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-60 animate-pulse" />
          
          {/* Main modal content */}
          <div 
            className={`relative bg-white rounded-3xl p-8 shadow-2xl transform transition-all duration-500 ${
              showContent ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            }`}
          >
            {/* Sparkles decoration */}
            <div className="absolute -top-4 -left-4">
              <div className="bg-yellow-400 p-3 rounded-full shadow-lg animate-bounce">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="absolute -top-4 -right-4">
              <div className="bg-pink-400 p-3 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0.2s' }}>
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Trophy icon with gradient */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-xl opacity-60 animate-pulse" />
                <div 
                  className="relative p-6 rounded-full shadow-2xl"
                  style={{ background: 'linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)' }}
                >
                  <Trophy className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>

            {/* Success message */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Module Complete!
              </h2>
              <p className="text-slate-600">
                Congratulations on completing this lesson
              </p>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Level card */}
              <div className="relative overflow-hidden rounded-2xl p-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-20">
                  <Award className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <p className="text-white/80 text-sm mb-1">Your Level</p>
                  <p className="text-3xl font-bold text-white">{level}</p>
                </div>
              </div>

              {/* XP card */}
              <div className="relative overflow-hidden rounded-2xl p-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
                <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-20">
                  <Sparkles className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <p className="text-white/80 text-sm mb-1">XP Earned</p>
                  <p className="text-3xl font-bold text-white">+{xpEarned}</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              {nextLessonId && (
                <Button
                  onClick={() => {
                    onClose();
                    // Navigate to next lesson - you can add navigation logic here
                  }}
                  className="w-full h-12 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                >
                  Unlock Next Chapter
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
              
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full h-12 text-base font-semibold rounded-xl border-2 hover:bg-slate-50 transition-all duration-300"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

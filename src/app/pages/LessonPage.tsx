import { useState } from "react";
import { useParams, Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  XCircle,
  Award,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { lessons } from "../data/lessons";
import { LegalTermTooltip } from "../components/LegalTermTooltip";
import { LevelUpModal } from "../components/LevelUpModal";
import { motion } from "motion/react";

export function LessonPage() {
  const { id } = useParams();
  const lesson = lessons.find(l => l.id === id);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);

  if (!lesson) {
    return (
      <div className="p-8 max-w-4xl mx-auto dark:bg-slate-900 min-h-screen">
        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardContent className="pt-6">
            <p className="dark:text-white">Dars topilmadi</p>
            <Link to="/lessons">
              <Button className="mt-4 dark:bg-primary dark:text-white">Darslarga qaytish</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
    
    // To'g'ri topsa Level Up modalini chiqarish
    if (index === lesson.comprehension.correctAnswer) {
      setTimeout(() => {
        setShowLevelUpModal(true);
      }, 1500);
    }
  };

  const isCorrect = selectedAnswer === lesson.comprehension.correctAnswer;

  // Keyingi darsni topish
  const currentIndex = lessons.findIndex(l => l.id === id);
  const nextLesson = lessons[currentIndex + 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 shadow-sm transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/lessons">
                <motion.div
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="ghost" size="sm" className="rounded-xl dark:text-slate-300 dark:hover:bg-slate-800">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Darslar
                  </Button>
                </motion.div>
              </Link>
              <div className="h-6 w-px bg-border dark:bg-slate-700" />
              <div>
                <Badge 
                  className="mb-1 shadow-md border-none text-white text-xs"
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                >
                  {lesson.module}
                </Badge>
                <h1 className="font-semibold text-slate-900 dark:text-white text-sm md:text-base">{lesson.title}</h1>
              </div>
            </div>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="hidden sm:block"
            >
              <BookOpen className="w-5 h-5 text-primary dark:text-blue-400" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Asosiy Kontent - Masofalar va paddinglar qisqartirildi */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
        <div className="space-y-6">
          {/* O'quv materiali */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-xl dark:bg-slate-800 transition-colors duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl md:text-2xl flex items-center gap-3 dark:text-white">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-2 rounded-xl shadow-lg">
                    <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  O'quv Materiali
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-300">
                  {lesson.content.paragraphs.map((paragraph, index) => (
                    <motion.div 
                      key={index} 
                      className="mb-4 last:mb-0"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <p className="text-[15px] md:text-base leading-relaxed">
                        <LegalTermTooltip 
                          text={paragraph} 
                          terms={lesson.content.terms}
                        />
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Asosiy Atamalar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card 
              className="border-0 shadow-xl relative overflow-hidden dark:bg-slate-800 transition-colors duration-300"
            >
              <div 
                className="absolute inset-0 opacity-5 dark:opacity-10"
                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
              />
              <CardHeader className="pb-4">
                <CardTitle className="text-lg md:text-xl flex items-center gap-2 relative z-10 dark:text-white">
                  <Sparkles className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                  Asosiy Huquqiy Atamalar
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lesson.content.terms.map((term, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      className="bg-white dark:bg-slate-700 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <h4 className="font-bold text-purple-600 dark:text-purple-300 mb-1 text-[15px] md:text-lg">{term.term}</h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-snug">{term.definition}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* O'qib Tushunish (Test) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-0 shadow-2xl relative overflow-hidden dark:bg-slate-800 transition-colors duration-300 mb-8">
              <div 
                className="absolute inset-0 opacity-5 dark:opacity-10"
                style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}
              />
              <CardHeader className="pb-4">
                <CardTitle className="text-xl md:text-2xl flex items-center gap-3 relative z-10 dark:text-white">
                  <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-2 rounded-xl shadow-lg">
                    <Award className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  O'qib Tushunish
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  <div className="bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-600 shadow-sm">
                    <p className="font-semibold text-base md:text-lg mb-4 dark:text-white">{lesson.comprehension.question}</p>
                    
                    <div className="space-y-3">
                      {lesson.comprehension.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrectAnswer = index === lesson.comprehension.correctAnswer;
                        
                        let borderColor = "border-slate-200 dark:border-slate-600";
                        let bgColor = "bg-white dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-slate-700";
                        
                        if (showFeedback && isSelected) {
                          if (isCorrect) {
                            borderColor = "border-green-400 dark:border-green-500";
                            bgColor = "bg-green-50 dark:bg-green-900/30";
                          } else {
                            borderColor = "border-red-400 dark:border-red-500";
                            bgColor = "bg-red-50 dark:bg-red-900/30";
                          }
                        } else if (showFeedback && isCorrectAnswer) {
                          borderColor = "border-green-400 dark:border-green-500";
                          bgColor = "bg-green-50 dark:bg-green-900/30";
                        }

                        return (
                          <motion.button
                            key={index}
                            onClick={() => !showFeedback && handleAnswerSelect(index)}
                            disabled={showFeedback}
                            whileHover={!showFeedback ? { scale: 1.01, x: 2 } : {}}
                            whileTap={!showFeedback ? { scale: 0.99 } : {}}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${borderColor} ${bgColor} ${
                              showFeedback ? "cursor-default" : "cursor-pointer hover:shadow-md hover:border-purple-400 dark:hover:border-purple-500"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3 flex-1">
                                <motion.div 
                                  className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full text-xs md:text-sm font-bold shadow-sm ${
                                    showFeedback && (isSelected || isCorrectAnswer)
                                      ? isCorrectAnswer
                                        ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white"
                                        : "bg-gradient-to-br from-red-400 to-red-500 text-white"
                                      : "bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-600 dark:to-slate-700 text-slate-700 dark:text-slate-200"
                                  }`}
                                  animate={showFeedback && isSelected ? { scale: [1, 1.1, 1] } : {}}
                                  transition={{ duration: 0.5 }}
                                >
                                  {String.fromCharCode(65 + index)}
                                </motion.div>
                                <span className={`text-[15px] md:text-base font-medium ${showFeedback && isSelected ? (isCorrect ? 'text-green-900 dark:text-green-200' : 'text-red-900 dark:text-red-200') : 'text-slate-800 dark:text-slate-200'}`}>
                                  {option}
                                </span>
                              </div>
                              {showFeedback && isSelected && (
                                <motion.div
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{ duration: 0.5, type: "spring" }}
                                >
                                  {isCorrect ? (
                                    <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7 text-green-500 dark:text-green-400 flex-shrink-0" />
                                  ) : (
                                    <XCircle className="w-6 h-6 md:w-7 md:h-7 text-red-500 dark:text-red-400 flex-shrink-0" />
                                  )}
                                </motion.div>
                              )}
                              {showFeedback && !isSelected && isCorrectAnswer && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                  <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7 text-green-500 dark:text-green-400 flex-shrink-0" />
                                </motion.div>
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Fikr-mulohaza (Feedback) */}
                  {showFeedback && (
                    <motion.div 
                      className={`p-5 rounded-2xl border-2 shadow-md ${
                        isCorrect 
                          ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-green-200 dark:border-green-800" 
                          : "bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 border-red-200 dark:border-red-800"
                      }`}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2.5 rounded-xl shadow-sm ${
                          isCorrect 
                            ? "bg-gradient-to-br from-green-400 to-emerald-500" 
                            : "bg-gradient-to-br from-red-400 to-red-500"
                        }`}>
                          {isCorrect ? (
                            <CheckCircle2 className="w-6 h-6 text-white" />
                          ) : (
                            <XCircle className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-lg font-bold mb-1 ${isCorrect ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                            {isCorrect ? "Ajoyib Natija! 🎉" : "Unchalik To'g'ri Emas"}
                          </h4>
                          <p className={`text-sm md:text-base leading-relaxed mb-2 ${isCorrect ? 'text-green-700 dark:text-green-200' : 'text-red-700 dark:text-red-200'}`}>
                            {lesson.comprehension.explanation}
                          </p>
                          {isCorrect && (
                            <motion.div 
                              className="flex items-center gap-1.5 text-sm md:text-base font-bold"
                              style={{ 
                                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                              }}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                            >
                              <Award className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
                              +50 XP Berildi
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigatsiya - Yo'nalishlar to'g'irlandi */}
                  {showFeedback && (
                    <motion.div 
                      className="flex flex-col sm:flex-row gap-3 pt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      <Link to="/lessons" className="flex-1">
                        <Button 
                          variant="outline" 
                          className="w-full h-11 md:h-12 text-[15px] md:text-base font-semibold rounded-xl border-2 dark:border-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300"
                        >
                          Darslarga qaytish
                        </Button>
                      </Link>
                      {nextLesson && (
                        <Link to={`/lesson/${nextLesson.id}`} className="flex-1">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button 
                              className="w-full h-11 md:h-12 text-[15px] md:text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-slate-900 border-none"
                              style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}
                            >
                              Keyingi Dars
                              <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                          </motion.div>
                        </Link>
                      )}
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Level Up Modali */}
      <LevelUpModal
        isOpen={showLevelUpModal}
        onClose={() => setShowLevelUpModal(false)}
        level={8}
        xpEarned={50}
        nextLessonId={nextLesson?.id}
      />
    </div>
  );
}

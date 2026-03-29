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
      <div className="p-8 max-w-4xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <p>Lesson not found</p>
            <Link to="/">
              <Button className="mt-4">Return to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
    
    // Show level up modal if answer is correct
    if (index === lesson.comprehension.correctAnswer) {
      setTimeout(() => {
        setShowLevelUpModal(true);
      }, 1500);
    }
  };

  const isCorrect = selectedAnswer === lesson.comprehension.correctAnswer;

  // Find next lesson
  const currentIndex = lessons.findIndex(l => l.id === id);
  const nextLesson = lessons[currentIndex + 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <motion.div
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="ghost" size="sm" className="rounded-xl">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </motion.div>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div>
                <Badge 
                  className="mb-1 shadow-md"
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                >
                  {lesson.module}
                </Badge>
                <h1 className="font-semibold">{lesson.title}</h1>
              </div>
            </div>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <BookOpen className="w-5 h-5 text-primary" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 py-8">
        <div className="space-y-8">
          {/* Lesson Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-2 rounded-xl shadow-lg">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  Reading Material
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-slate max-w-none">
                  {lesson.content.paragraphs.map((paragraph, index) => (
                    <motion.div 
                      key={index} 
                      className="mb-6 last:mb-0"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <p className="text-base leading-relaxed">
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

          {/* Key Terms Reference */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card 
              className="border-0 shadow-xl relative overflow-hidden"
            >
              <div 
                className="absolute inset-0 opacity-5"
                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
              />
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2 relative z-10">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  Key Legal Terms
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
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-white p-5 rounded-xl border-2 border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <h4 className="font-bold text-purple-600 mb-2 text-lg">{term.term}</h4>
                      <p className="text-sm text-slate-700">{term.definition}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Reading Comprehension */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-0 shadow-2xl relative overflow-hidden">
              <div 
                className="absolute inset-0 opacity-5"
                style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}
              />
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3 relative z-10">
                  <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-2 rounded-xl shadow-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  Reading Comprehension
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 shadow-md">
                    <p className="font-semibold text-lg mb-4">{lesson.comprehension.question}</p>
                    
                    <div className="space-y-3">
                      {lesson.comprehension.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrectAnswer = index === lesson.comprehension.correctAnswer;
                        
                        let borderColor = "border-slate-200";
                        let bgColor = "bg-white hover:bg-purple-50";
                        
                        if (showFeedback && isSelected) {
                          if (isCorrect) {
                            borderColor = "border-green-400";
                            bgColor = "bg-green-50";
                          } else {
                            borderColor = "border-red-400";
                            bgColor = "bg-red-50";
                          }
                        } else if (showFeedback && isCorrectAnswer) {
                          borderColor = "border-green-400";
                          bgColor = "bg-green-50";
                        }

                        return (
                          <motion.button
                            key={index}
                            onClick={() => !showFeedback && handleAnswerSelect(index)}
                            disabled={showFeedback}
                            whileHover={!showFeedback ? { scale: 1.02, x: 5 } : {}}
                            whileTap={!showFeedback ? { scale: 0.98 } : {}}
                            className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 ${borderColor} ${bgColor} ${
                              showFeedback ? "cursor-default" : "cursor-pointer hover:shadow-lg hover:border-purple-400"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3 flex-1">
                                <motion.div 
                                  className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold shadow-md ${
                                    showFeedback && (isSelected || isCorrectAnswer)
                                      ? isCorrectAnswer
                                        ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white"
                                        : "bg-gradient-to-br from-red-400 to-red-500 text-white"
                                      : "bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700"
                                  }`}
                                  animate={showFeedback && isSelected ? { scale: [1, 1.2, 1] } : {}}
                                  transition={{ duration: 0.5 }}
                                >
                                  {String.fromCharCode(65 + index)}
                                </motion.div>
                                <span className="text-base font-medium">{option}</span>
                              </div>
                              {showFeedback && isSelected && (
                                <motion.div
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{ duration: 0.5, type: "spring" }}
                                >
                                  {isCorrect ? (
                                    <CheckCircle2 className="w-7 h-7 text-green-500 flex-shrink-0" />
                                  ) : (
                                    <XCircle className="w-7 h-7 text-red-500 flex-shrink-0" />
                                  )}
                                </motion.div>
                              )}
                              {showFeedback && !isSelected && isCorrectAnswer && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                  <CheckCircle2 className="w-7 h-7 text-green-500 flex-shrink-0" />
                                </motion.div>
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Feedback */}
                  {showFeedback && (
                    <motion.div 
                      className={`p-6 rounded-2xl border-2 shadow-lg ${
                        isCorrect 
                          ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200" 
                          : "bg-gradient-to-br from-red-50 to-pink-50 border-red-200"
                      }`}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl shadow-lg ${
                          isCorrect 
                            ? "bg-gradient-to-br from-green-400 to-emerald-500" 
                            : "bg-gradient-to-br from-red-400 to-red-500"
                        }`}>
                          {isCorrect ? (
                            <CheckCircle2 className="w-7 h-7 text-white" />
                          ) : (
                            <XCircle className="w-7 h-7 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold mb-2">
                            {isCorrect ? "Excellent Work! 🎉" : "Not Quite Right"}
                          </h4>
                          <p className="text-base text-slate-700 leading-relaxed mb-3">
                            {lesson.comprehension.explanation}
                          </p>
                          {isCorrect && (
                            <motion.div 
                              className="flex items-center gap-2 text-base font-bold"
                              style={{ 
                                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                              }}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                            >
                              <Award className="w-5 h-5 text-emerald-500" />
                              +50 XP Earned
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation */}
                  {showFeedback && (
                    <motion.div 
                      className="flex gap-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <Link to="/" className="flex-1">
                        <Button 
                          variant="outline" 
                          className="w-full h-12 text-base font-semibold rounded-xl border-2 hover:bg-slate-50 transition-all duration-300"
                        >
                          Back to Dashboard
                        </Button>
                      </Link>
                      {nextLesson && (
                        <Link to={`/lesson/${nextLesson.id}`} className="flex-1">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button 
                              className="w-full h-12 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                              style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}
                            >
                              Next Lesson
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

      {/* Level Up Modal */}
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
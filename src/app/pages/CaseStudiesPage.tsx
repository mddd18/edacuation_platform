import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  Scale, 
  CheckCircle2, 
  XCircle, 
  Award,
  RotateCcw,
  ArrowRight
} from "lucide-react";
import { caseStudies } from "../data/cases";
import { motion, AnimatePresence } from "motion/react";

export function CaseStudiesPage() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleCaseSelect = (caseId: string) => {
    setSelectedCase(caseId);
    setSelectedAction(null);
    setShowFeedback(false);
  };

  const handleActionSelect = (actionIndex: number) => {
    setSelectedAction(actionIndex);
    setShowFeedback(true);
  };

  const handleReset = () => {
    setSelectedAction(null);
    setShowFeedback(false);
  };

  const currentCase = caseStudies.find(c => c.id === selectedCase);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <motion.div 
        className="mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl mb-3 font-extrabold text-gray-900 flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <Scale className="w-10 h-10 text-primary" />
          </div>
          Amaliy Holatlar va Mashqlar
        </h1>
        <p className="text-lg text-muted-foreground font-medium max-w-2xl">
          Huquqiy bilimlaringizni real hayotiy vaziyatlarda sinab ko'ring va tahlil qilish qobiliyatingizni oshiring.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chap Panel - Holatlar Ro'yxati */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-md h-full">
            <CardHeader className="border-b border-gray-100 pb-4">
              <CardTitle className="text-xl font-bold">Holatni Tanlang</CardTitle>
              <CardDescription className="font-medium">Mashq qilish uchun vaziyatni tanlang</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {caseStudies.map((caseStudy, index) => {
                  const isSelected = selectedCase === caseStudy.id;
                  
                  return (
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      key={caseStudy.id}
                      onClick={() => handleCaseSelect(caseStudy.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 group ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-md scale-[1.02]"
                          : "border-gray-100 hover:border-primary/30 hover:bg-gray-50 hover:shadow-sm"
                      }`}
                    >
                      <div className="space-y-2.5">
                        <Badge variant="secondary" className={`${isSelected ? 'bg-primary/20 text-primary' : 'bg-gray-100 text-gray-600'} text-xs font-bold px-2.5 py-1`}>
                          {caseStudy.category}
                        </Badge>
                        <h4 className="font-bold text-gray-900 leading-snug">{caseStudy.title}</h4>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* O'ng Panel - Holat Tafsilotlari */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {!currentCase ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="h-full"
              >
                <Card className="h-full border-0 shadow-lg bg-gray-50/50 border-2 border-dashed border-gray-200">
                  <CardContent className="flex flex-col items-center justify-center h-[500px] text-center p-10">
                    <div className="w-24 h-24 bg-white rounded-full shadow-sm flex items-center justify-center mb-6">
                      <Scale className="w-12 h-12 text-gray-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Mashqni boshlashga tayyormisiz?</h3>
                    <p className="text-base text-gray-500 max-w-sm">
                      Chap tomondagi ro'yxatdan o'zingizga qiziq bo'lgan huquqiy vaziyatni tanlang va yechim toping.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Ssenariy Kartasi */}
                <Card className="border-0 shadow-xl overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                  <CardHeader className="bg-white pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <Badge variant="secondary" className="mb-3 bg-primary/10 text-primary font-bold">
                          {currentCase.category}
                        </Badge>
                        <CardTitle className="text-2xl font-bold leading-tight text-gray-900">{currentCase.title}</CardTitle>
                      </div>
                      {showFeedback && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleReset}
                          className="font-bold border-2 hover:bg-gray-50"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Qayta urinish
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="bg-gray-50/50 pt-6">
                    <h4 className="font-extrabold text-primary mb-3 flex items-center gap-2">
                      <ArrowRight className="w-5 h-5" />
                      Ssenariy:
                    </h4>
                    <p className="text-base leading-relaxed text-gray-700 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                      {currentCase.scenario}
                    </p>
                  </CardContent>
                </Card>

                {/* Variantlar Kartasi */}
                <Card className="border-0 shadow-xl">
                  <CardHeader className="border-b border-gray-100 pb-4">
                    <CardTitle className="text-xl font-bold">Nima qilish kerak?</CardTitle>
                    <CardDescription className="text-base font-medium">
                      Ushbu vaziyatda eng to'g'ri huquqiy yechimni tanlang
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {currentCase.actions.map((action, index) => {
                        const isSelected = selectedAction === index;
                        const isCorrect = action.isCorrect;
                        
                        let stateStyles = "border-gray-200 bg-white hover:border-primary/50 hover:bg-gray-50";
                        
                        if (showFeedback) {
                          if (isSelected) {
                            stateStyles = isCorrect 
                              ? "border-emerald-500 bg-emerald-50 shadow-md" 
                              : "border-red-500 bg-red-50 shadow-md";
                          } else if (isCorrect) {
                            // To'g'ri javobni ko'rsatib qo'yish (agar xato tanlagan bo'lsa)
                            stateStyles = "border-emerald-200 bg-emerald-50/30 opacity-70";
                          } else {
                            stateStyles = "border-gray-100 bg-gray-50 opacity-50";
                          }
                        }

                        return (
                          <div key={index} className="relative">
                            <button
                              onClick={() => !showFeedback && handleActionSelect(index)}
                              disabled={showFeedback}
                              className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 ${stateStyles} ${
                                showFeedback ? "cursor-default" : "cursor-pointer hover:shadow-sm"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-4">
                                <p className="text-base font-medium text-gray-800 flex-1">{action.text}</p>
                                {showFeedback && (isSelected || isCorrect) && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="flex-shrink-0"
                                  >
                                    {isCorrect ? (
                                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                    ) : isSelected ? (
                                      <XCircle className="w-6 h-6 text-red-500" />
                                    ) : null}
                                  </motion.div>
                                )}
                              </div>
                            </button>

                            {/* Fikr-mulohaza (Feedback) */}
                            <AnimatePresence>
                              {showFeedback && isSelected && (
                                <motion.div 
                                  initial={{ opacity: 0, height: 0, y: -10 }}
                                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                                  className={`mt-3 p-5 rounded-xl border-l-4 ${
                                    isCorrect 
                                      ? "bg-emerald-50 border-emerald-500 text-emerald-900" 
                                      : "bg-red-50 border-red-500 text-red-900"
                                  }`}
                                >
                                  <h4 className={`font-extrabold mb-2 text-lg ${isCorrect ? "text-emerald-700" : "text-red-700"}`}>
                                    {isCorrect ? "Javobingiz To'g'ri! 🎉" : "Noto'g'ri javob"}
                                  </h4>
                                  <p className="text-sm leading-relaxed font-medium">
                                    {action.feedback}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>

                    {/* Muvaffaqiyat xabari */}
                    <AnimatePresence>
                      {showFeedback && currentCase.actions[selectedAction!]?.isCorrect && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl shadow-sm"
                        >
                          <div className="flex items-center gap-4">
                            <div className="bg-emerald-500 p-3 rounded-full shadow-lg shadow-emerald-500/30">
                              <Award className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <h4 className="font-extrabold text-xl text-emerald-800 mb-1">Holat muvaffaqiyatli yechildi!</h4>
                              <p className="text-emerald-600 font-semibold">
                                To'g'ri huquqiy tahlil uchun +100 XP hisobingizga qo'shildi.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

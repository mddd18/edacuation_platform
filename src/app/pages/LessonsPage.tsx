// src/app/pages/LessonsPage.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { BookOpen } from "lucide-react";
import { LearningJourney } from "../components/LearningJourney";
import { motion } from "motion/react";

export function LessonsPage() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen bg-slate-50/50 dark:bg-slate-900 transition-colors duration-300">
      <motion.div 
        className="mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl mb-3 font-extrabold bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500 bg-clip-text text-transparent flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-teal-500" />
          Darslar
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
          Huquqni mukammal o'zlashtirish uchun o'quv yo'lingizni davom ettiring
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl transition-colors duration-300">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3 dark:text-white">
              <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-2.5 rounded-xl shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              Sizning O'quv Yo'lingiz
            </CardTitle>
            <CardDescription className="text-base font-medium dark:text-slate-400">
              Huquqni mukammal o'zlashtirish uchun darslarni yakunlang
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LearningJourney />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

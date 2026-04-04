import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { supabase } from "../../lib/supabase";
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  Award,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { motion } from "motion/react";

export function LessonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        navigate("/lessons");
      } else {
        setLesson(data);
      }
      setLoading(false);
    };
    fetchLesson();
  }, [id, navigate]);

  const handleAnswer = async (optionIndex: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIndex);
    
    const isCorrect = optionIndex === lesson.quiz_data[currentQuestion].correct;
    if (isCorrect) setScore(s => s + 1);

    setTimeout(async () => {
      if (currentQuestion + 1 < lesson.quiz_data.length) {
        setCurrentQuestion(c => c + 1);
        setSelectedOption(null);
      } else {
        setQuizFinished(true);
        // Test tugaganda XP qo'shish
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const user = JSON.parse(savedUser);
          const newXp = (user.xp || 0) + (lesson.xp_reward || 200);
          await supabase.from('users').update({ xp: newXp }).eq('id', user.id);
          localStorage.setItem("user", JSON.stringify({ ...user, xp: newXp }));
        }
      }
    }, 1000);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-slate-950"><Loader2 className="animate-spin text-blue-500" /></div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <div className="p-4 border-b dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <button onClick={() => navigate("/lessons")} className="flex items-center gap-2 font-bold text-slate-500 hover:text-blue-500 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Orqaga qaytish
        </button>
      </div>

      <main className="max-w-3xl mx-auto px-4 mt-8">
        {!showQuiz ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-4xl font-black dark:text-white mb-6">{lesson.title}</h1>
            <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[32px] border dark:border-slate-800 shadow-sm mb-8 text-lg leading-relaxed dark:text-slate-300 whitespace-pre-wrap">
              {lesson.content}
            </div>
            <Button onClick={() => setShowQuiz(true)} className="w-full h-16 rounded-2xl bg-blue-600 text-xl font-bold text-white shadow-lg shadow-blue-500/20">
              Bilimni sinab ko'rish <ChevronRight className="ml-2" />
            </Button>
          </motion.div>
        ) : (
          <div className="py-4">
            {!quizFinished ? (
              <div className="space-y-6">
                <h2 className="text-center font-bold text-slate-400 uppercase tracking-widest">Savol {currentQuestion + 1} / {lesson.quiz_data.length}</h2>
                <Card className="rounded-[32px] border-0 shadow-2xl dark:bg-slate-800">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold dark:text-white mb-8">{lesson.quiz_data[currentQuestion].question}</h3>
                    <div className="grid gap-3">
                      {lesson.quiz_data[currentQuestion].options.map((opt: string, i: number) => (
                        <button key={i} onClick={() => handleAnswer(i)} className={`p-5 rounded-2xl border-2 text-left font-bold transition-all ${selectedOption === i ? (i === lesson.quiz_data[currentQuestion].correct ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20') : 'border-slate-100 dark:border-slate-700 dark:text-white'}`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center py-10 space-y-6">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto shadow-xl"><Award className="text-white w-10 h-10" /></div>
                <h2 className="text-3xl font-black dark:text-white">Dars tamomlandi!</h2>
                <div className="bg-blue-600 p-8 rounded-[32px] text-white">
                  <p className="text-5xl font-black">+{lesson.xp_reward} XP</p>
                </div>
                <Button onClick={() => navigate("/lessons")} className="w-full h-14 rounded-2xl bg-slate-900 text-white font-bold">Darslar ro'yxatiga qaytish</Button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

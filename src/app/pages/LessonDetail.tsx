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
  AlertCircle
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
      const { data, error } = await supabase.from('lessons').select('*').eq('id', id).single();
      if (error) navigate("/lessons");
      else setLesson(data);
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
        const finalScore = isCorrect ? score + 1 : score;
        const totalQuestions = lesson.quiz_data.length;
        const isPassed = finalScore === totalQuestions; 

        if (isPassed) {
          const savedUser = localStorage.getItem("user");
          if (savedUser) {
            const user = JSON.parse(savedUser);
            const { data: alreadyCompleted } = await supabase.from('user_progress').select('is_completed').eq('user_id', user.id).eq('lesson_id', lesson.id).single();

            if (!alreadyCompleted) {
              const newTotalXp = (user.xp || 0) + (lesson.xp_reward || 200);
              const newLevel = Math.floor(newTotalXp / 1000) + 1;

              await supabase.from('users').update({ xp: newTotalXp, level: newLevel }).eq('id', user.id);
              await supabase.from('user_progress').upsert({ user_id: user.id, lesson_id: lesson.id, is_completed: true });
              localStorage.setItem("user", JSON.stringify({ ...user, xp: newTotalXp, level: newLevel }));
            } else {
              await supabase.from('user_progress').upsert({ user_id: user.id, lesson_id: lesson.id, is_completed: true });
            }
          }
        }
      }
    }, 1000);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-slate-950"><Loader2 className="animate-spin text-blue-500 w-8 h-8 md:w-10 md:h-10" /></div>;

  const isPassed = score === lesson.quiz_data.length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Navbar mobilega moslandi */}
      <div className="p-3 md:p-4 border-b dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <button onClick={() => navigate("/lessons")} className="flex items-center gap-1.5 md:gap-2 text-sm md:text-base font-bold text-slate-500 hover:text-blue-500 transition-colors">
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /> Orqaga
        </button>
      </div>

      <main className="max-w-3xl mx-auto px-4 mt-6 md:mt-8">
        {!showQuiz ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl md:text-4xl font-black dark:text-white mb-4 md:mb-6 leading-tight">{lesson.title}</h1>
            <div className="bg-white dark:bg-slate-900 p-5 md:p-10 rounded-[20px] md:rounded-[32px] border dark:border-slate-800 shadow-sm mb-6 md:mb-8 text-base md:text-lg leading-relaxed dark:text-slate-300 whitespace-pre-wrap">
              {lesson.content}
            </div>
            <Button onClick={() => setShowQuiz(true)} className="w-full h-14 md:h-16 rounded-[16px] md:rounded-2xl bg-blue-600 text-lg md:text-xl font-bold text-white shadow-lg shadow-blue-500/20">
              Bilimni sinash <ChevronRight className="ml-1.5 md:ml-2 w-5 h-5 md:w-6 md:h-6" />
            </Button>
          </motion.div>
        ) : (
          <div className="py-2 md:py-4">
            {!quizFinished ? (
              <div className="space-y-4 md:space-y-6">
                <div className="flex justify-between items-center px-1 md:px-2">
                   <h2 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] md:text-xs">Savol {currentQuestion + 1} / {lesson.quiz_data.length}</h2>
                   <Badge color="blue" className="text-[9px] md:text-[10px]">{score} To'g'ri</Badge>
                </div>
                <Card className="rounded-[24px] md:rounded-[32px] border-0 shadow-xl dark:bg-slate-800 overflow-hidden">
                  <CardContent className="p-5 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold dark:text-white mb-6 md:mb-8 leading-snug">{lesson.quiz_data[currentQuestion].question}</h3>
                    <div className="grid gap-2.5 md:gap-3">
                      {lesson.quiz_data[currentQuestion].options.map((opt: string, i: number) => {
                        const isSelected = selectedOption === i;
                        const isCorrectOpt = i === lesson.quiz_data[currentQuestion].correct;
                        let borderClass = "border-slate-200 dark:border-slate-700";
                        if (isSelected) {
                          borderClass = isCorrectOpt ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "border-red-500 bg-red-50 dark:bg-red-900/20";
                        }
                        return (
                          <button key={i} onClick={() => handleAnswer(i)} className={`p-4 md:p-5 rounded-[16px] md:rounded-2xl border-2 text-left text-sm md:text-base font-bold transition-all flex justify-between items-center gap-3 ${borderClass} dark:text-white`}>
                            <span className="leading-tight">{opt}</span>
                            {isSelected && (isCorrectOpt ? <CheckCircle2 className="text-green-500 w-5 h-5 md:w-6 md:h-6 shrink-0" /> : <XCircle className="text-red-500 w-5 h-5 md:w-6 md:h-6 shrink-0" />)}
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-6 md:py-10 space-y-5 md:space-y-6">
                {isPassed ? (
                  <>
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-yellow-500/40 animate-bounce">
                      <Award className="text-white w-10 h-10 md:w-12 md:h-12" />
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black dark:text-white">Ajoyib natija!</h2>
                    <p className="text-sm md:text-lg text-slate-500 px-4">Siz barcha savollarga to'g'ri javob berdingiz va keyingi darsni ochdingiz!</p>
                    <div className="bg-green-500 p-6 md:p-8 rounded-[24px] md:rounded-[32px] text-white shadow-lg mx-4 md:mx-0">
                       <p className="text-[10px] md:text-sm font-bold uppercase opacity-80 mb-1">Mukofot</p>
                       <p className="text-3xl md:text-5xl font-black">+{lesson.xp_reward} XP</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                      <AlertCircle className="text-red-500 w-10 h-10 md:w-12 md:h-12" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black dark:text-white">Natija yetarli emas</h2>
                    <p className="text-sm md:text-base text-slate-500 px-4">Keyingi darsni ochish uchun hamma savollarga to'g'ri javob berishingiz kerak.</p>
                    <div className="bg-slate-100 dark:bg-slate-800 p-5 md:p-6 rounded-[20px] md:rounded-[32px] mx-4 md:mx-0">
                      <p className="text-xl md:text-2xl font-bold dark:text-white">{score} / {lesson.quiz_data.length}</p>
                      <p className="text-[10px] md:text-xs text-slate-400 uppercase font-bold mt-1">To'g'ri javoblar</p>
                    </div>
                    <div className="px-4 md:px-0">
                      <Button onClick={() => { setShowQuiz(false); setQuizFinished(false); setCurrentQuestion(0); setScore(0); setSelectedOption(null); }} variant="outline" className="w-full h-12 md:h-14 rounded-[16px] md:rounded-2xl text-sm md:text-base font-bold">
                        Qayta urinish
                      </Button>
                    </div>
                  </>
                )}
                <div className="px-4 md:px-0">
                  <Button onClick={() => navigate("/lessons")} className="w-full h-12 md:h-14 rounded-[16px] md:rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-sm md:text-base font-bold mt-2">
                    Ro'yxatga qaytish
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function Badge({ children, color, className }: any) {
  const colors: any = { blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" };
  return <span className={`px-2.5 py-1 md:px-3 rounded-full text-[9px] md:text-[10px] font-black uppercase ${colors[color]} ${className || ''}`}>{children}</span>;
}

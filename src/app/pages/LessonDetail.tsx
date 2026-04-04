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
        
        const finalScore = isCorrect ? score + 1 : score;
        const totalQuestions = lesson.quiz_data.length;
        const isPassed = finalScore === totalQuestions; 

        if (isPassed) {
          const savedUser = localStorage.getItem("user");
          if (savedUser) {
            const user = JSON.parse(savedUser);

            // 1. BU DARS OLDIN TUGATILGANMI YO'QMI TEKSHIRAMIZ
            const { data: alreadyCompleted } = await supabase
              .from('user_progress')
              .select('is_completed')
              .eq('user_id', user.id)
              .eq('lesson_id', lesson.id)
              .single();

            if (!alreadyCompleted) {
              // AGAR BIRINCHI MARTA TUGATILAYOTGAN BO'LSA XP BERAMIZ
              const newTotalXp = (user.xp || 0) + (lesson.xp_reward || 200);
              
              // DARAXA (LEVEL) HISOBLASH: HAR 1000 XP DA 1 POG'ONA OSHADI
              const newLevel = Math.floor(newTotalXp / 1000) + 1;

              // 2. BAZADA USER VA PROGRESSNI YANGILASH
              await supabase.from('users').update({ 
                xp: newTotalXp,
                level: newLevel 
              }).eq('id', user.id);
              
              await supabase.from('user_progress').upsert({ 
                user_id: user.id, 
                lesson_id: lesson.id, 
                is_completed: true 
              });

              // LocalStorage yangilash
              localStorage.setItem("user", JSON.stringify({ ...user, xp: newTotalXp, level: newLevel }));
            } else {
              // OLDIN TUGATILGAN BO'LSA FAQAT PROGRESSNI YANGILAYMIZ (XP BERILMAYDI)
              await supabase.from('user_progress').upsert({ 
                user_id: user.id, 
                lesson_id: lesson.id, 
                is_completed: true 
              });
              console.log("Bu dars uchun oldin XP olgan ekansiz.");
            }
          }
        }
      }
    }, 1000);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-slate-950"><Loader2 className="animate-spin text-blue-500 w-10 h-10" /></div>;

  const isPassed = score === lesson.quiz_data.length;

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
            <h1 className="text-3xl md:text-4xl font-black dark:text-white mb-6 leading-tight">{lesson.title}</h1>
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
                <div className="flex justify-between items-center px-2">
                   <h2 className="font-bold text-slate-400 uppercase tracking-widest text-xs">Savol {currentQuestion + 1} / {lesson.quiz_data.length}</h2>
                   <Badge color="blue">{score} To'g'ri</Badge>
                </div>
                <Card className="rounded-[32px] border-0 shadow-2xl dark:bg-slate-800 overflow-hidden">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold dark:text-white mb-8">{lesson.quiz_data[currentQuestion].question}</h3>
                    <div className="grid gap-3">
                      {lesson.quiz_data[currentQuestion].options.map((opt: string, i: number) => {
                        const isSelected = selectedOption === i;
                        const isCorrectOpt = i === lesson.quiz_data[currentQuestion].correct;
                        let borderClass = "border-slate-100 dark:border-slate-700";
                        if (isSelected) {
                          borderClass = isCorrectOpt ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "border-red-500 bg-red-50 dark:bg-red-900/20";
                        }
                        return (
                          <button key={i} onClick={() => handleAnswer(i)} className={`p-5 rounded-2xl border-2 text-left font-bold transition-all flex justify-between items-center ${borderClass} dark:text-white`}>
                            {opt}
                            {isSelected && (isCorrectOpt ? <CheckCircle2 className="text-green-500" /> : <XCircle className="text-red-500" />)}
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-10 space-y-6">
                {isPassed ? (
                  <>
                    <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-yellow-500/40 animate-bounce">
                      <Award className="text-white w-12 h-12" />
                    </div>
                    <h2 className="text-4xl font-black dark:text-white">Dars yakunlandi!</h2>
                    <p className="text-slate-500 text-lg">Siz keyingi darsni muvaffaqiyatli ochdingiz!</p>
                    <div className="bg-green-500 p-8 rounded-[32px] text-white shadow-lg">
                       <p className="text-sm font-bold uppercase opacity-80 mb-1">Eslatma</p>
                       <p className="text-2xl font-black">Yangi dars ochildi 🔓</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                      <AlertCircle className="text-red-500 w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-black dark:text-white">Natija yetarli emas</h2>
                    <p className="text-slate-500">Keyingi darsni ochish uchun hamma savollarga to'g'ri javob berishingiz kerak.</p>
                    <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-[32px]">
                      <p className="text-2xl font-bold dark:text-white">{score} / {lesson.quiz_data.length}</p>
                      <p className="text-xs text-slate-400 uppercase font-bold">To'g'ri javoblar</p>
                    </div>
                    <Button onClick={() => { setShowQuiz(false); setQuizFinished(false); setCurrentQuestion(0); setScore(0); setSelectedOption(null); }} variant="outline" className="w-full h-14 rounded-2xl font-bold">
                      Qayta urinish
                    </Button>
                  </>
                )}
                <Button onClick={() => navigate("/lessons")} className="w-full h-14 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold">
                  Ro'yxatga qaytish
                </Button>
              </motion.div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function Badge({ children, color }: any) {
  const colors: any = { blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" };
  return <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${colors[color]}`}>{children}</span>;
}

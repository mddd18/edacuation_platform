import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, 
  User, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  UserCheck
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Formani yuborish (vaqtinchalik Asosiy panelga o'tkazadi)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 relative overflow-hidden select-none">
      {/* Orqa fon effektlari */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 dark:bg-blue-600/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 dark:bg-purple-600/20 rounded-full blur-[100px]" />

      <motion.div 
        className="w-full max-w-md z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo va Sarlavha */}
        <div className="text-center mb-8">
          <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl mb-4"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <GraduationCap className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2">
            Qonun va Huquq
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Huquqiy bilimlaringizni biz bilan oshiring
          </p>
        </div>

        {/* Asosiy Karta */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-800 p-6 md:p-8">
          
          {/* Kirish / Ro'yxatdan o'tish o'zgartirgichi (Toggle) */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-8 relative">
            <motion.div
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-slate-700 rounded-xl shadow-sm"
              animate={{ left: isLogin ? "4px" : "calc(50%)" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-sm font-bold z-10 transition-colors ${isLogin ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}
            >
              Kirish
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-sm font-bold z-10 transition-colors ${!isLogin ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}
            >
              Ro'yxatdan o'tish
            </button>
          </div>

          {/* Form qismi */}
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "register"}
                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {!isLogin && (
                  <div className="flex gap-4">
                    {/* Ism */}
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <UserCheck className="w-5 h-5 text-slate-400" />
                      </div>
                      <Input required type="text" placeholder="Ism" className="pl-10 h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700" />
                    </div>
                    {/* Familiya */}
                    <div className="relative flex-1">
                      <Input required type="text" placeholder="Familiya" className="px-4 h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700" />
                    </div>
                  </div>
                )}

                {/* Login */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <User className="w-5 h-5 text-slate-400" />
                  </div>
                  <Input required type="text" placeholder="Elektron pochta yoki Login" className="pl-11 h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700" />
                </div>

                {!isLogin && (
                  /* Sinfni tanlash - Faqat ro'yxatdan o'tishda */
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <BookOpen className="w-5 h-5 text-slate-400" />
                    </div>
                    <select required className="flex h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm pl-11 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none">
                      <option value="" disabled selected>O'qiyotgan sinfingizni tanlang</option>
                      <option value="8">8-sinf</option>
                      <option value="9">9-sinf</option>
                      <option value="10">10-sinf</option>
                      <option value="11">11-sinf</option>
                      <option value="lyceum">Akademik litsey / Kollej</option>
                      <option value="university">Universitet talabasi</option>
                      <option value="other">Boshqa</option>
                    </select>
                  </div>
                )}

                {/* Parol */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <Lock className="w-5 h-5 text-slate-400" />
                  </div>
                  <Input 
                    required 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Parol" 
                    className="pl-11 pr-10 h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" /> : <Eye className="w-5 h-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" />}
                  </button>
                </div>

                {isLogin && (
                  <div className="flex justify-end pt-1">
                    <button type="button" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                      Parolni unutdingizmi?
                    </button>
                  </div>
                )}

                {/* Yuborish tugmasi */}
                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-xl text-white font-bold text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-500/25 transition-all mt-6"
                >
                  <ShieldCheck className="w-5 h-5 mr-2" />
                  {isLogin ? "Tizimga kirish" : "Ro'yxatdan o'tish"}
                  <ArrowRight className="w-5 h-5 ml-2 opacity-70" />
                </Button>
                
              </motion.div>
            </AnimatePresence>
          </form>
          
        </div>

        {/* Xavfsizlik matni */}
        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6 flex items-center justify-center gap-1.5 font-medium">
          <ShieldCheck className="w-4 h-4" /> Barcha ma'lumotlaringiz xavfsiz himoyalangan
        </p>
      </motion.div>
    </div>
  );
}

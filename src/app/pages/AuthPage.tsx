import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, 
  User, 
  Lock, 
  Eye, 
  EyeOff,
  ShieldCheck,
  BookOpen,
  AlertCircle,
  Globe
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { supabase } from "../../lib/supabase"; 

// --- TARJIMALAR LUG'ATI ---
const dict = {
  UZ: {
    appName: "Qonun va Huquq",
    loginTitle: "Hisobingizga kiring",
    registerTitle: "O'zingizga login o'ylab toping",
    tabLogin: "Kirish",
    tabRegister: "Ro'yxatdan o'tish",
    firstName: "Ism",
    lastName: "Familiya",
    username: "Login (masalan: ulugbek01)",
    selectGrade: "Sinfni tanlang",
    gradeOpt: "-sinf",
    password: "Parol",
    loading: "Yuklanmoqda...",
    btnSubmitLogin: "Tizimga kirish",
    btnSubmitRegister: "Ro'yxatdan o'tish",
    switchRegister: "Hisobingiz yo'qmi? Ro'yxatdan o'ting",
    switchLogin: "Akkountingiz bormi? Kirish",
    secureData: "Barcha ma'lumotlaringiz xavfsiz himoyalangan",
    errWrongCreds: "Login yoki parol noto'g'ri!",
    errLoginTaken: "Bu login band! Boshqa login tanlang.",
    errGeneral: "Xatolik yuz berdi."
  },
  QQ: {
    appName: "Nızam hám Huquq",
    loginTitle: "Akkauntıńızǵa kiriń",
    registerTitle: "Ózińizge login oylap tabıń",
    tabLogin: "Kiriw",
    tabRegister: "Dizimnen ótiw",
    firstName: "Atıńız",
    lastName: "Familiyańız",
    username: "Login (mısalı: ulugbek01)",
    selectGrade: "Klastı tańlań",
    gradeOpt: "-klas",
    password: "Parol",
    loading: "Júklenbekte...",
    btnSubmitLogin: "Sistemaga kiriw",
    btnSubmitRegister: "Dizimnen ótiw",
    switchRegister: "Akkauntıńız joqpa? Dizimnen ótiń",
    switchLogin: "Akkauntıńız barma? Kiriw",
    secureData: "Barlıq maǵlıwmatlarıńız qáwipsiz qorǵalǵan",
    errWrongCreds: "Login yamasa parol nadurıs!",
    errLoginTaken: "Bul login bánt! Basqa login tańlań.",
    errGeneral: "Qátelik júz berdi."
  }
};

type Language = 'UZ' | 'QQ';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [grade, setGrade] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TIL STATI
  const [lang, setLang] = useState<Language>('UZ');

  useEffect(() => {
    const savedLang = localStorage.getItem('appLang') as Language;
    if (savedLang) setLang(savedLang);
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'UZ' ? 'QQ' : 'UZ';
    setLang(newLang);
    localStorage.setItem('appLang', newLang);
    setError(null); // Til o'zgarganda xatolikni tozalash
  };

  const t = dict[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // --- 1. TIZIMGA KIRISH ---
        const { data, error: signInError } = await supabase
          .from('users')
          .select('*')
          .eq('username', username.toLowerCase().trim())
          .eq('password', password) 
          .single();

        if (signInError || !data) {
          throw new Error(t.errWrongCreds);
        }

        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");

      } else {
        // --- 2. RO'YXATDAN O'TISH ---
        const { data, error: signUpError } = await supabase
          .from('users')
          .insert([
            { 
              username: username.toLowerCase().trim(), 
              password: password, 
              first_name: firstName, 
              last_name: lastName, 
              grade: grade 
            }
          ])
          .select()
          .single();

        if (signUpError) {
          if (signUpError.code === '23505') throw new Error(t.errLoginTaken);
          throw signUpError;
        }

        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      }
    } catch (err: any) {
      setError(err.message || t.errGeneral);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 relative overflow-hidden select-none">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 dark:bg-blue-600/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 dark:bg-purple-600/20 rounded-full blur-[100px]" />

      {/* Til o'zgartirish tugmasi */}
      <div className="absolute top-6 right-6 z-50">
        <button 
          onClick={toggleLanguage} 
          className="flex items-center gap-1.5 text-sm font-bold bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-600 dark:text-slate-300 px-4 py-2.5 rounded-full shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-slate-700"
        >
          <Globe className="w-4 h-4 text-blue-500" /> {lang === 'UZ' ? "UZ" : "QQ"}
        </button>
      </div>

      <motion.div 
        className="w-full max-w-md z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8 mt-10">
          <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl mb-4"
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <GraduationCap className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2">
            {t.appName}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
             {isLogin ? t.loginTitle : t.registerTitle}
          </p>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-800 p-6 md:p-8">
          
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6 relative">
            <motion.div
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-slate-700 rounded-xl shadow-sm"
              animate={{ left: isLogin ? "4px" : "calc(50%)" }}
            />
            <button
              type="button"
              onClick={() => { setIsLogin(true); setError(null); }}
              className={`flex-1 py-2.5 text-sm font-bold z-10 transition-colors ${isLogin ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}
            >
              {t.tabLogin}
            </button>
            <button
              type="button"
              onClick={() => { setIsLogin(false); setError(null); }}
              className={`flex-1 py-2.5 text-sm font-bold z-10 transition-colors ${!isLogin ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}
            >
              {t.tabRegister}
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm font-medium flex items-center gap-2 border border-red-100 dark:border-red-800"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "register"}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                {!isLogin && (
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <Input 
                        required 
                        placeholder={t.firstName} 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50" 
                      />
                    </div>
                    <div className="relative flex-1">
                      <Input 
                        required 
                        placeholder={t.lastName} 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50" 
                      />
                    </div>
                  </div>
                )}

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <User className="w-5 h-5 text-slate-400" />
                  </div>
                  <Input 
                    required 
                    type="text" 
                    placeholder={t.username} 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-11 h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50" 
                  />
                </div>

                {!isLogin && (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <BookOpen className="w-5 h-5 text-slate-400" />
                    </div>
                    <select 
                      required 
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="flex h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 pl-11 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" disabled>{t.selectGrade}</option>
                      {[5,6,7,8,9,10,11].map(s => <option key={s} value={s}>{s}{t.gradeOpt}</option>)}
                    </select>
                  </div>
                )}

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <Lock className="w-5 h-5 text-slate-400" />
                  </div>
                  <Input 
                    required 
                    type={showPassword ? "text" : "password"} 
                    placeholder={t.password} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 pr-10 h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5 text-slate-400" /> : <Eye className="w-5 h-5 text-slate-400" />}
                  </button>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-12 rounded-xl text-white font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 shadow-lg mt-4 disabled:opacity-50"
                >
                  {loading ? t.loading : (isLogin ? t.btnSubmitLogin : t.btnSubmitRegister)}
                </Button>
                
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="w-full text-center text-sm text-slate-500 hover:text-blue-600 mt-2 transition-colors"
                >
                  {isLogin ? t.switchRegister : t.switchLogin}
                </button>
                
              </motion.div>
            </AnimatePresence>
          </form>
          
        </div>

        <p className="text-center text-xs text-slate-400 mt-6 flex items-center justify-center gap-1.5 font-medium">
          <ShieldCheck className="w-4 h-4" /> {t.secureData}
        </p>
      </motion.div>
    </div>
  );
}

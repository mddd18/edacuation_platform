export interface VideoGuide {
  id: string;
  title: string;
  category: "OneID" | "My.gov.uz" | "O'qishga topshirish" | "Boshqa";
  description: string;
  youtubeId: string;
}

export const videoGuides: VideoGuide[] = [
  // OneID bo'limi
  {
    id: "1",
    title: "OneID tizimidan ro'yxatdan o'tish (To'liq qo'llanma)",
    category: "OneID",
    description: "Yagona identifikatsiya tizimida akkaunt ochish va uni mobil raqam orqali tasdiqlash bosqichlari.",
    youtubeId: "iJ488a0WFME"
  },
  {
    id: "2",
    title: "OneID parolini tiklash",
    category: "OneID",
    description: "Agar parolingizni unutib qo'ygan bo'lsangiz, uni masofadan turib qayta tiklash usuli.",
    youtubeId: "hqabRIFI0Q4"
  },
  {
    id: "3",
    title: "Elektron raqamli imzo (ERI) olish",
    category: "OneID",
    description: "E-imzo.uz sayti orqali onlayn ERI kalitini olish va uni OneID bilan bog'lash.",
    youtubeId: "QT2gCCW_tEo"
  },

  // My.gov.uz bo'limi
  {
    id: "4",
    title: "My.gov.uz: Sudlanganlik haqida ma'lumotnoma",
    category: "My.gov.uz",
    description: "Ishga kirish uchun kerak bo'ladigan ma'lumotnomani onlayn olish tartibi.",
    youtubeId: "2GLcmf1is6M"
  },
  {
    id: "5",
    title: "Farzandni bog'chaga navbatga qo'yish",
    category: "My.gov.uz",
    description: "Davlat bog'chalariga onlayn ariza topshirish va navbatni kuzatib borish.",
    youtubeId: "Ao1XCal6yR8"
  },
  {
    id: "6",
    title: "Doimiy ro'yxatda turgan joyidan ma'lumotnoma",
    category: "My.gov.uz",
    description: "Propiska haqidagi ma'lumotnomani uydan chiqmasdan yuklab olish.",
    youtubeId: "erugs14mhiA"
  },
  {
    id: "7",
    title: "STIR (INN) raqamini aniqlash va olish",
    category: "My.gov.uz",
    description: "Soliq to'lovchining identifikatsiya raqamini bilish yoki yangi STIR guvohnomasini yuklash.",
    youtubeId: "Dpei8Fmi1k4"
  },
  {
    id: "8",
    title: "Haydovchilik guvohnomasini almashtirish",
    category: "My.gov.uz",
    description: "Eski namunadagi haydovchilik guvohnomasini yangisiga onlayn buyurtma berish orqali almashtirish.",
    youtubeId: "y38y57tRXE0"
  },
  {
    id: "9",
    title: "Kadastr pasportini shakllantirish",
    category: "My.gov.uz",
    description: "Ko'chmas mulk ob'ekti uchun kadastr hujjatlarini onlayn yangilash.",
    youtubeId: "31Os2XQqGCw"
  },

  // O'qishga topshirish bo'limi
  {
    id: "10",
    title: "My.uzbmb.uz orqali OTMga hujjat topshirish",
    category: "O'qishga topshirish",
    description: "Abituriyentlar uchun 5 ta yo'nalishni tanlash va test uchun to'lov qilish.",
    youtubeId: "EGSdxSJu4IM&t=23s"
  },
  {
    id: "11",
    title: "Magistraturaga onlayn hujjat topshirish",
    category: "O'qishga topshirish",
    description: "Magistr.edu.uz platformasi orqali hujjat yuborish bo'yicha yo'riqnoma.",
    youtubeId: "EVkrqIGKYGg"
  },
  {
    id: "12",
    title: "Kontrakt shartnomasini onlayn yuklab olish",
    category: "O'qishga topshirish",
    description: "Kontrakt.edu.uz saytidan talabalar uchun shartnomani olish va Click orqali to'lash.",
    youtubeId: "haHVNLkkduc"
  }
];

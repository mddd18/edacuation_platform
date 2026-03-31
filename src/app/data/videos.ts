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
    youtubeId: "T7y_Zt4qRbw"
  },
  {
    id: "2",
    title: "OneID parolini tiklash",
    category: "OneID",
    description: "Agar parolingizni unutib qo'ygan bo'lsangiz, uni masofadan turib qayta tiklash usuli.",
    youtubeId: "vB67u-9U6vU"
  },
  {
    id: "3",
    title: "Elektron raqamli imzo (ERI) olish",
    category: "OneID",
    description: "E-imzo.uz sayti orqali onlayn ERI kalitini olish va uni OneID bilan bog'lash.",
    youtubeId: "L9i3v6Z8hM4"
  },

  // My.gov.uz bo'limi
  {
    id: "4",
    title: "My.gov.uz: Sudlanganlik haqida ma'lumotnoma",
    category: "My.gov.uz",
    description: "Ishga kirish uchun kerak bo'ladigan ma'lumotnomani onlayn olish tartibi.",
    youtubeId: "Y3W5b_J1m-k"
  },
  {
    id: "5",
    title: "Farzandni bog'chaga navbatga qo'yish",
    category: "My.gov.uz",
    description: "Davlat bog'chalariga onlayn ariza topshirish va navbatni kuzatib borish.",
    youtubeId: "4J7wH-m6hFk"
  },
  {
    id: "6",
    title: "Doimiy ro'yxatda turgan joyidan ma'lumotnoma",
    category: "My.gov.uz",
    description: "Propiska haqidagi ma'lumotnomani uydan chiqmasdan yuklab olish.",
    youtubeId: "zXN9Y_6w_pA"
  },
  {
    id: "7",
    title: "STIR (INN) raqamini aniqlash va olish",
    category: "My.gov.uz",
    description: "Soliq to'lovchining identifikatsiya raqamini bilish yoki yangi STIR guvohnomasini yuklash.",
    youtubeId: "f0X8X_7KzZc"
  },
  {
    id: "8",
    title: "Haydovchilik guvohnomasini almashtirish",
    category: "My.gov.uz",
    description: "Eski namunadagi haydovchilik guvohnomasini yangisiga onlayn buyurtma berish orqali almashtirish.",
    youtubeId: "N5Ww_6t7-YI"
  },
  {
    id: "9",
    title: "Kadastr pasportini shakllantirish",
    category: "My.gov.uz",
    description: "Ko'chmas mulk ob'ekti uchun kadastr hujjatlarini onlayn yangilash.",
    youtubeId: "R2_u0S_v6S4"
  },

  // O'qishga topshirish bo'limi
  {
    id: "10",
    title: "My.uzbmb.uz orqali OTMga hujjat topshirish",
    category: "O'qishga topshirish",
    description: "Abituriyentlar uchun 5 ta yo'nalishni tanlash va test uchun to'lov qilish.",
    youtubeId: "1H2L4j-b6sU"
  },
  {
    id: "11",
    title: "Magistraturaga onlayn hujjat topshirish",
    category: "O'qishga topshirish",
    description: "Magistr.edu.uz platformasi orqali hujjat yuborish bo'yicha yo'riqnoma.",
    youtubeId: "E0_W1Z7xK6s"
  },
  {
    id: "12",
    title: "Kontrakt shartnomasini onlayn yuklab olish",
    category: "O'qishga topshirish",
    description: "Kontrakt.edu.uz saytidan talabalar uchun shartnomani olish va Click orqali to'lash.",
    youtubeId: "XQx_jX_T_H4"
  }
];

export interface VideoGuide {
  id: string;
  title: string;
  category: "OneID" | "My.gov.uz" | "O'qishga topshirish" | "Boshqa";
  description: string;
  youtubeId: string;
}

export const videoGuides: VideoGuide[] = [
  {
    id: "1",
    title: "OneID (Yagona identifikatsiya tizimi) dan ro'yxatdan o'tish tartibi",
    category: "OneID",
    description: "Davlat xizmatlaridan onlayn foydalanish uchun eng muhim qadam — OneID tizimida to'g'ri ro'yxatdan o'tish va akkauntni tasdiqlash bo'yicha to'liq qo'llanma.",
    youtubeId: "iJ488a0WFME" // Namuna (Almashtirishingiz mumkin)
  },
  {
    id: "2",
    title: "My.gov.uz orqali bolani bog'chaga navbatga qo'yish",
    category: "My.gov.uz",
    description: "Yagona interaktiv davlat xizmatlari portali (My.gov.uz) orqali uydan chiqmasdan farzandingizni davlat maktabgacha ta'lim tashkilotiga navbatga qo'yishni o'rganing.",
    youtubeId: "4J7wH-m6hFk" 
  },
  {
    id: "3",
    title: "Abituriyentlar uchun OTMga onlayn hujjat topshirish (my.uzbmb.uz)",
    category: "O'qishga topshirish",
    description: "Oliy ta'lim muassasalariga kirish uchun UzBMB (sobiq DTM) portali orqali yo'nalishlarni tanlash va onlayn hujjat yuborish tartibi.",
    youtubeId: "1H2L4j-b6sU" 
  },
  {
    id: "4",
    title: "My.gov.uz orqali sudlanganlik/sudlanmaganlik haqida ma'lumotnoma olish",
    category: "My.gov.uz",
    description: "Ishga kirish yoki boshqa hujjatlar uchun kerak bo'ladigan sudlanganlik haqidagi ma'lumotnomani 3 daqiqada onlayn olish usuli.",
    youtubeId: "Y3W5b_J1m-k"
  },
  {
    id: "5",
    title: "Talabalar uchun kontrakt to'lovini onlayn amalga oshirish",
    category: "O'qishga topshirish",
    description: "Bank dasturlari (Click, Payme) orqali OTM kontraktini masofadan turib to'lash va kvitansiyani yuklab olish bo'yicha ko'rsatma.",
    youtubeId: "XQx_jX_T_H4"
  }
];

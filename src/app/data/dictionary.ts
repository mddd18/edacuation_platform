export interface DictionaryEntry {
  id: string;
  term: string;
  definition: string;
  category: string;
  examples?: string[];
  relatedTerms?: string[];
}

export const dictionary: DictionaryEntry[] = [
  {
    id: "1",
    term: "Konstitutsiya",
    definition: "Davlatning tuzilishini belgilaydigan va shaxs huquqlarini himoya qiladigan eng oliy qonun. (Masalan, AQSh Konstitutsiyasi 1788-yilda ratifikatsiya qilingan va 27 marta o'zgartirish kiritilgan).",
    category: "Konstitutsiyaviy huquq",
    examples: [
      "Konstitutsiya hokimiyatni hukumatning uchta shoxiga ajratadi.",
      "Konstitutsiyaviy huquqlar hukumat tomonidan buzilishi mumkin emas."
    ],
    relatedTerms: ["Huquqlar to'g'risidagi bill", "Tuzatish (Qo'shimcha)", "Ratifikatsiya"]
  },
  {
    id: "2",
    term: "Huquqlar to'g'risidagi bill",
    definition: "Konstitutsiyaga kiritilgan dastlabki o'nta tuzatish bo'lib, u shaxslarga o'ziga xos huquq va erkinliklarni, jumladan, so'z, din va adolatli sud muhokamasi huquqini kafolatlaydi.",
    category: "Konstitutsiyaviy huquq",
    examples: [
      "Huquqlar to'g'risidagi billdagi Birinchi tuzatish so'z erkinligini himoya qiladi.",
      "Huquqlar to'g'risidagi bill Konstitutsiyaga 1791-yilda qo'shilgan."
    ],
    relatedTerms: ["Konstitutsiya", "Tuzatish", "Birinchi tuzatish"]
  },
  {
    id: "3",
    term: "Odil sudlov jarayoni",
    definition: "Hukumat qonunga muvofiq shaxsga tegishli bo'lgan barcha qonuniy huquqlarni hurmat qilishi kerakligi haqidagi qonuniy talab. U sud tizimi orqali adolatli munosabatni ta'minlaydi.",
    category: "Konstitutsiyaviy huquq",
    examples: [
      "Odil sudlov jarayoni sizga qarshi qo'yilgan ayblovlar haqida xabardor qilinishingizni talab qiladi.",
      "Odil sudlov jarayoni huquqi hukumatning o'zboshimchalik bilan harakat qilishidan himoya qiladi."
    ],
    relatedTerms: ["Beshinchi tuzatish", "O'n to'rtinchi tuzatish", "Adolatli sud muhokamasi"]
  },
  {
    id: "4",
    term: "Teng himoya",
    definition: "Barcha odamlar qonun va hukumat tomonidan teng munosabatda bo'lishi kerakligi haqidagi konstitutsiyaviy kafolat. U irqi, dini, jinsi yoki boshqa himoyalangan xususiyatlariga ko'ra kamsitishni taqiqlaydi.",
    category: "Konstitutsiyaviy huquq",
    examples: [
      "Teng himoya qonunlarning barchaga adolatli qo'llanilishini ta'minlaydi.",
      "O'n to'rtinchi tuzatishning 'Teng himoya qilish' to'g'risidagi bandi kamsitishni taqiqlaydi."
    ],
    relatedTerms: ["O'n to'rtinchi tuzatish", "Diskriminatsiya (Kamsitish)", "Fuqarolik huquqlari"]
  },
  {
    id: "5",
    term: "Birinchi tuzatish",
    definition: "So'z, din, matbuot, yig'ilishlar va murojaat qilish erkinliklarini konstitutsiyaviy himoya qilish. U hukumatning ushbu asosiy huquqlarni cheklashiga yo'l qo'ymaydi.",
    category: "Konstitutsiyaviy huquq",
    examples: [
      "Birinchi tuzatish hukumatni tanqid qilish huquqingizni himoya qiladi.",
      "Maktablar ma'lum cheklovlar bilan o'quvchilarning Birinchi tuzatish huquqlarini hurmat qilishlari kerak."
    ],
    relatedTerms: ["So'z erkinligi", "Din erkinligi", "Huquqlar to'g'risidagi bill"]
  },
  {
    id: "6",
    term: "To'rtinchi tuzatish",
    definition: "Asossiz tintuv va musodaralarga qarshi konstitutsiyaviy himoya. U odatda huquqni muhofaza qilish organlaridan xususiy mulkni tintuv qilishdan oldin order olishni talab qiladi.",
    category: "Konstitutsiyaviy huquq",
    examples: [
      "To'rtinchi tuzatish uyingizni ordersiz tintuv qilishdan himoya qiladi.",
      "Maktab shkaflarini tintuv qilish uyni tintuv qilishdan ko'ra boshqacha To'rtinchi tuzatish standartlariga ega."
    ],
    relatedTerms: ["Tintuv orderi", "Yetarli asos", "Asosli shubha"]
  },
  {
    id: "7",
    term: "Beshinchi tuzatish",
    definition: "O'ziga qarshi ko'rsatma bermaslik, ikki marta jazolanmaslik huquqini o'z ichiga olgan va odil sudlov jarayonini kafolatlaydigan konstitutsiyaviy himoya. U shaxslarga o'zlarini ayblashi mumkin bo'lgan savollarga javob berishni rad etishga ruxsat beradi.",
    category: "Konstitutsiyaviy huquq",
    examples: [
      "Siz politsiya savollariga javob berishni rad etish huquqidan foydalanishingiz mumkin.",
      "Beshinchi tuzatish kimnidir bir xil jinoyat uchun ikki marta sud qilishning oldini oladi."
    ],
    relatedTerms: ["O'ziga qarshi ko'rsatma bermaslik", "Odil sudlov jarayoni", "Ikki marta jazolanmaslik"]
  },
  {
    id: "8",
    term: "Yetarli asos (Probable Cause)",
    definition: "Jinoyat sodir etilganligi yoki sodir etilayotganligiga faktlarga asoslangan oqilona ishonch. Bu politsiya uchun tintuv orderini olish yoki hibsga olish uchun zarur bo'lgan standartdir.",
    category: "Jinoyat huquqi",
    examples: [
      "Politsiya kimnidir hibsga olishi uchun yetarli asosga ega bo'lishi kerak.",
      "Sudya faqat yetarli asos bo'lsagina order beradi."
    ],
    relatedTerms: ["To'rtinchi tuzatish", "Tintuv orderi", "Asosli shubha"]
  },
  {
    id: "9",
    term: "Asosli shubha (Reasonable Suspicion)",
    definition: "Jinoiy faoliyatni ko'rsatadigan aniq faktlarga asoslangan, 'Yetarli asos'dan pastroq standart. Maktab ma'muriyati yetarli asos o'rniga asosli shubha bilan tintuv o'tkazishi mumkin.",
    category: "Jinoyat huquqi",
    examples: [
      "O'qituvchining asosli shubhasi shkafni tintuv qilishga imkon berdi.",
      "Asosli shubha oddiy taxmindan ko'proq, ammo yetarli asosdan kamroq isbotni talab qiladi."
    ],
    relatedTerms: ["Yetarli asos", "To'rtinchi tuzatish", "Maktabdagi tintuvlar"]
  },
  {
    id: "10",
    term: "Kafolat",
    definition: "Sotuvchi tomonidan mahsulot ma'lum sifat va ishlash standartlariga javob berishi haqidagi kafolat. Kafolatlar aniq (yozma/og'zaki) yoki ko'zda tutilgan (qonun tomonidan qabul qilingan) bo'lishi mumkin.",
    category: "Iste'molchilar huquqi",
    examples: [
      "Aksariyat elektronika qurilmalari bir yillik ishlab chiqaruvchi kafolati bilan keladi.",
      "Ko'zda tutilgan kafolat mahsulotlarning o'z maqsadiga muvofiq ishlashini kafolatlaydi."
    ],
    relatedTerms: ["Iste'molchilar huquqlarini himoya qilish", "Pulni qaytarish", "Nuqsonli mahsulot"]
  },
  {
    id: "11",
    term: "Iste'molchilar huquqlarini himoya qilish",
    definition: "Xaridorlarni adolatsiz biznes amaliyotlaridan, firibgarlikdan va xavfli mahsulotlardan himoya qilishga qaratilgan qonunlar va qoidalar. Ushbu qonunlar bozorda adolatli munosabatni ta'minlaydi.",
    category: "Iste'molchilar huquqi",
    examples: [
      "Iste'molchilar huquqlarini himoya qilish qonunlari reklamada haqiqatni talab qiladi.",
      "Iste'molchilar huquqlarini himoya qilish agentliklari ushbu qoidalarni amalga oshiradi."
    ],
    relatedTerms: ["Kafolat", "Firibgarlik", "Iste'molchi huquqlari"]
  },
  {
    id: "12",
    term: "Firibgarlik",
    definition: "Shaxsiy manfaat uchun yoki boshqa shaxsga zarar yetkazish uchun qilingan qasddan aldash. Iste'molchilar kontekstida u soxta reklama, shaxsni tasdiqlovchi hujjatlarni o'g'irlash va qalloblikni o'z ichiga oladi.",
    category: "Iste'molchilar huquqi",
    examples: [
      "Internetda soxta mahsulotlarni sotish iste'molchilarga nisbatan firibgarlikdir.",
      "Kredit karta firibgarligi jiddiy jinoiy huquqbuzarlikdir."
    ],
    relatedTerms: ["Iste'molchilar huquqlarini himoya qilish", "Aldov", "Shaxsni o'g'irlash"]
  },
  {
    id: "13",
    term: "Tuhmat (Defamation)",
    definition: "Birovning obro'siga putur yetkazadigan yolg'on bayonotlar. U yozma tuhmat (libel) va og'zaki tuhmat (slander) ni o'z ichiga oladi. Haqiqat tuhmat haqidagi da'volarga qarshi to'liq himoyadir.",
    category: "Fuqarolik huquqi",
    examples: [
      "Ijtimoiy tarmoqlarda yolg'on ayblovlarni e'lon qilish tuhmat bo'lishi mumkin.",
      "Jamoat arboblari tuhmat ishlari bo'yicha g'alaba qozonish uchun haqiqiy g'arazni isbotlashlari kerak."
    ],
    relatedTerms: ["Yozma tuhmat (Libel)", "Og'zaki tuhmat (Slander)", "Birinchi tuzatish"]
  },
  {
    id: "14",
    term: "Javobgarlik (Majburiyat)",
    definition: "O'z xatti-harakatlari yoki harakatsizligi uchun qonuniy javobgarlik. Agar siz javobgar bo'lsangiz, sizdan zararni to'lash yoki boshqa qonuniy oqibatlarga duch kelish talab qilinishi mumkin.",
    category: "Fuqarolik huquqi",
    examples: [
      "Haydovchilar ehtiyotsizlik oqibatida sodir bo'lgan baxtsiz hodisalar uchun javobgardirlar.",
      "Mahsulot ishlab chiqaruvchilari nuqsonli mahsulotlar uchun javobgar bo'lishi mumkin."
    ],
    relatedTerms: ["Ehtiyotsizlik", "Zarar", "Delikt (Tort)"]
  },
  {
    id: "15",
    term: "Miranda huquqlari",
    definition: "Politsiya sizni hibsga olayotganda ma'lum qilishi kerak bo'lgan konstitutsiyaviy huquqlar, jumladan sukut saqlash huquqi va advokat yollash huquqi.",
    category: "Jinoyat huquqi",
    examples: [
      "Politsiya Miranda huquqlarini o'qiydi: 'Siz sukut saqlash huquqiga egasiz...'",
      "Miranda huquqlarini o'qimaslik sudda berilgan ko'rsatmalarni yaroqsiz holatga keltirishi mumkin."
    ],
    relatedTerms: ["Beshinchi tuzatish", "Oltinchi tuzatish", "Advokat huquqi"]
  }
];

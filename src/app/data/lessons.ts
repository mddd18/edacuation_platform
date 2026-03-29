export interface LegalTerm {
  term: string;
  definition: string;
}

export interface Lesson {
  id: string;
  title: string;
  module: string;
  content: {
    paragraphs: string[];
    terms: LegalTerm[];
  };
  comprehension: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
}

export const lessons: Lesson[] = [
  {
    id: "1",
    title: "Konstitutsiyaviy huquqlarga kirish",
    module: "Konstitutsiyaviy huquq",
    content: {
      paragraphs: [
        "Qo'shma Shtatlar Konstitutsiyasi hukumatimizning asosiy tizimini belgilaydi va barcha fuqarolarga ma'lum bir asosiy huquqlarni kafolatlaydi. Bu huquqlar shaxslarni hukumatning ortiqcha aralashuvidan himoya qilish va sud jarayonlarida adolatni ta'minlash uchun mo'ljallangan.",
        "Konstitutsiyaga kiritilgan dastlabki o'nta tuzatishdan iborat bo'lgan Huquqlar to'g'risidagi bill shaxs erkinliklari uchun o'ziga xos himoyalarni belgilaydi. Ularga so'z, din va yig'ilishlar erkinligi, shuningdek qonun doirasida odil sudlov jarayoni va teng himoya qilinish huquqi kiradi.",
        "Konstitutsiyaviy huquqlarni tushunish har bir fuqaro uchun zarur. Bu huquqlar demokratik tizimimizning asosini tashkil etadi va barcha shaxslarning kelib chiqishi yoki sharoitidan qat'i nazar, qonun oldida adolatli munosabatda bo'lishini ta'minlaydi."
      ],
      terms: [
        {
          term: "Konstitutsiya",
          definition: "Hukumat tuzilishini belgilaydigan va shaxs huquqlarini himoya qiladigan eng oliy qonun"
        },
        {
          term: "Huquqlar to'g'risidagi bill",
          definition: "Shaxslarga o'ziga xos huquq va erkinliklarni kafolatlaydigan Konstitutsiyaning dastlabki o'nta tuzatishi"
        },
        {
          term: "Odil sudlov jarayoni",
          definition: "Hukumat qonunga muvofiq shaxsga tegishli bo'lgan barcha qonuniy huquqlarni hurmat qilishi kerakligi haqidagi qonuniy talab"
        },
        {
          term: "Teng himoya",
          definition: "Barcha odamlar qonun va hukumat tomonidan teng munosabatda bo'lishi kerakligi haqidagi kafolat"
        }
      ]
    },
    comprehension: {
      question: "Huquqlar to'g'risidagi billning asosiy maqsadi nima?",
      options: [
        "Hukumatning uchta shoxini yaratish",
        "Shaxs erkinliklarini himoya qilish va hukumat hokimiyatini cheklash",
        "Jinoiy xatti-harakatlar uchun qonunlar yaratish",
        "Fuqarolarning majburiyatlarini belgilash"
      ],
      correctAnswer: 1,
      explanation: "Huquqlar to'g'risidagi bill aynan shaxs erkinliklarini himoya qilish va so'z erkinligi, din va odil sudlov jarayoni kabi asosiy huquqlarni kafolatlash orqali hukumat hokimiyatini cheklash uchun mo'ljallangan."
    }
  },
  {
    id: "2",
    title: "So'z va o'z fikrini bildirish erkinligi",
    module: "Birinchi tuzatish",
    content: {
      paragraphs: [
        "Qo'shma Shtatlar Konstitutsiyasiga kiritilgan Birinchi tuzatish bir nechta asosiy erkinliklarni himoya qiladi, so'z erkinligi esa ularning eng mashhurlaridan biridir. Ushbu himoya shaxslarga hukumat senzurasidan yoki jazolanishdan qo'rqmasdan o'z fikrlari, g'oyalari va e'tiqodlarini ifoda etish imkonini beradi.",
        "Biroq, so'z erkinligi mutlaq emas. Oliy sud darhol zo'ravonlikni keltirib chiqaradigan, tuhmat hisoblanadigan yoki aniq va mavjud xavf tug'diradigan nutq kabi ma'lum cheklovlarni tan olgan. Maktablar ham ma'lum vaziyatlarda o'quvchilarning nutqini tartibga solish bo'yicha qandaydir vakolatlarga ega.",
        "So'z erkinligining doirasi va chegaralarini tushunish yosh fuqarolar uchun juda muhimdir. Siz munozarali yoki mashhur bo'lmagan fikrlarni bildirish huquqiga ega bo'lsangiz-da, bu huquq boshqalarning huquqlarini hurmat qilish va nutq qachon qonuniy chegaralardan o'tishi mumkinligini tushunish mas'uliyati bilan birga keladi."
      ],
      terms: [
        {
          term: "Birinchi tuzatish",
          definition: "So'z, din, matbuot, yig'ilishlar va murojaat qilish erkinliklarini konstitutsiyaviy himoya qilish"
        },
        {
          term: "Senzura",
          definition: "Hukumat yoki boshqa idoralar tomonidan nomaqbul deb topilgan nutq yoki yozuvlarni bostirish yoki taqiqlash"
        },
        {
          term: "Tuhmat",
          definition: "Birovning obro'siga putur yetkazadigan yolg'on bayonotlar; u yozma (libel) va og'zaki (slander) tuhmatni o'z ichiga oladi"
        },
        {
          term: "Aniq va mavjud xavf",
          definition: "Agar nutq jamoat xavfsizligiga bevosita tahdid solsa, hukumatga uni cheklash imkonini beruvchi huquqiy standart"
        }
      ]
    },
    comprehension: {
      question: "Matnga ko'ra, so'z erkinligi haqidagi qaysi tasdiq TO'G'RI?",
      options: [
        "So'z erkinligi barcha sharoitlarda mutlaqo cheklanmagan",
        "Maktablar o'quvchilar nutqini tartibga solish vakolatiga ega emas",
        "Darhol zo'ravonlikni keltirib chiqaradigan nutq cheklanishi mumkin",
        "Birinchi tuzatish faqat mashhur fikrlarni himoya qiladi"
      ],
      correctAnswer: 2,
      explanation: "So'z erkinligi asosiy huquq bo'lsa-da, u mutlaq emas. Oliy sud darhol zo'ravonlikni keltirib chiqaradigan nutq, cheklangan toifalar qatorida, jamoat xavfsizligini himoya qilish maqsadida cheklanishi mumkinligini tan olgan."
    }
  },
  {
    id: "3",
    title: "Iste'molchilarning huquq va majburiyatlari",
    module: "Iste'molchilar huquqi",
    content: {
      paragraphs: [
        "Iste'molchi sifatida tovarlar yoki xizmatlarni sotib olayotganda muhim qonuniy huquqlarga egasiz. Iste'molchilar huquqlarini himoya qilish qonunlari adolatli biznes amaliyotlarini ta'minlash va xaridorlarni firibgarlik, aldov va sotuvchilar tomonidan adolatsiz munosabatdan himoya qilish uchun mavjud.",
        "Asosiy iste'molchi huquqlariga mahsulotlar haqida aniq ma'lumot olish huquqi, xavfsiz mahsulotlarga ega bo'lish huquqi, raqobatdosh mahsulotlar orasidan tanlash huquqi va muammolar yuzaga kelganda zararni qoplashni talab qilish huquqi kiradi. Ko'pgina xaridlar o'ziga xos sifat va ishlash standartlarini kafolatlaydigan kafolatlar bilan birga keladi.",
        "Iste'molchi sifatidagi huquqlaringizni tushunish sizga ongli qarorlar qabul qilishga va bu huquqlar buzilganda chora ko'rishga imkon beradi. Telefon sotib olayotganda, ovqat buyurtma qilganda yoki onlayn xaridni amalga oshirayotganda, qanday himoyalar mavjudligini bilish bozorda o'zingizni ishonchli his qilishga yordam beradi."
      ],
      terms: [
        {
          term: "Iste'molchilar huquqlarini himoya qilish",
          definition: "Xaridorlarni adolatsiz biznes amaliyotlaridan himoya qilishga qaratilgan qonunlar va qoidalar"
        },
        {
          term: "Kafolat",
          definition: "Sotuvchi tomonidan mahsulot ma'lum sifat va ishlash standartlariga javob berishi haqidagi kafolat"
        },
        {
          term: "Firibgarlik",
          definition: "Shaxsiy manfaat uchun yoki boshqa shaxsga zarar yetkazish uchun qilingan qasddan aldash"
        },
        {
          term: "Zararni qoplash",
          definition: "Huquqbuzarlik yoki shikoyat uchun kompensatsiya yoki huquqiy chora"
        }
      ]
    },
    comprehension: {
      question: "Iste'molchilar huquqlarini himoya qilish qonunlarining asosiy maqsadi nima?",
      options: [
        "Korxonalarga ko'proq foyda keltirishga yordam berish",
        "Adolatli biznes amaliyotlarini ta'minlash va xaridorlarni adolatsiz munosabatdan himoya qilish",
        "Odamlarning sotib olingan narsalarni qaytarishini oldini olish",
        "Iste'mol tovarlari narxini oshirish"
      ],
      correctAnswer: 1,
      explanation: "Iste'molchilar huquqlarini himoya qilish qonunlari bozorda adolatli biznes amaliyotlarini ta'minlash hamda xaridorlarni firibgarlik, aldov va sotuvchilarning adolatsiz munosabatidan himoya qilish uchun maxsus ishlab chiqilgan bo'lib, iste'molchilarga muhim qonuniy huquqlarni taqdim etadi."
    }
  }
];

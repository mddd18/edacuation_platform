export interface DailyDilemma {
  id: string;
  date: string;
  title: string;
  scenario: string;
  options: string[];
}

export const dailyDilemmas: DailyDilemma[] = [
  {
    id: "1",
    date: "2026-03-27",
    title: "Maktab formasi (kiyinish tartibi) muammosi",
    scenario: "Maktabingizda o'quvchilarga kiyimda har qanday siyosiy xabarlarni olib yurishni taqiqlovchi qat'iy kiyinish tartibi mavjud. Bir o'quvchi atrof-muhitni muhofaza qilishni qo'llab-quvvatlovchi yozuvi bor futbolka kiyib keldi. Bunday holda maktab ma'muriyatiga kiyinish tartibini qo'llashga ruxsat berilishi kerakmi?",
    options: [
      "Ha, maktablar tartibni saqlash uchun kiyinish qoidalarini talab qilishi mumkin",
      "Yo'q, bu himoyalangan siyosiy ifodadir (so'z erkinligi)",
      "Bu ta'lim jarayoniga xalaqit berish-bermasligiga bog'liq",
      "Avval o'quvchiga o'z tanlovini tushuntirishiga ruxsat berish kerak"
    ]
  },
  {
    id: "2",
    date: "2026-03-28",
    title: "Maktablarda Shaxsiy daxlsizlik va Xavfsizlik",
    scenario: "O'quvchilar maktabga taqiqlangan narsalarni olib kelgan bir nechta hodisalardan so'ng, ma'muriyat barcha yo'laklar va umumiy joylarga (lekin hojatxona yoki kiyinish xonalariga emas) xavfsizlik kameralarini o'rnatishni taklif qilmoqda. Bunga ruxsat berilishi kerakmi?",
    options: [
      "Ha, maktab xavfsizligi eng muhim ustuvor vazifa bo'lishi kerak",
      "Yo'q, bu o'quvchilarning shaxsiy daxlsizlik huquqlarini buzadi",
      "Ha, lekin faqat ma'lum bir yuqori xavfli hududlarda",
      "Yo'q, bundanda zarari kamroq bo'lgan muqobil variantlar mavjud"
    ]
  },
  {
    id: "3",
    date: "2026-03-29",
    title: "Maktab intizomida ijtimoiy tarmoqlardagi dalillar",
    scenario: "Ikki o'quvchi maktabda jismoniy to'qnashuvga aylanmagan holda o'zaro tortishib qoldi. O'sha kuni kechasi bir o'quvchi uyidan turib ijtimoiy tarmoqlarda ikkinchisiga qarshi tahdidli xabarlar joylashtirdi. Maktab ushbu onlayn xabar uchun o'quvchini jazolash vakolatiga ega bo'lishi kerakmi?",
    options: [
      "Ha, tahdidlar maktabdan tashqarida qilingan bo'lsa ham maktab xavfsizligiga ta'sir qiladi",
      "Yo'q, maktablar o'quvchilarning maktabdan tashqaridagi xatti-harakatlarini nazorat qilmasligi kerak",
      "Ha, lekin faqat ota-onalar jazolashga rozi bo'lsagina",
      "Yo'q, bu maktabning emas, balki huquq-tartibot idoralarining (politsiyaning) ishi bo'lishi kerak"
    ]
  }
];

// Ovoz berish natijalari (Haqiqiy dasturda bu ma'lumotlar bazasidan keladi)
export const dilemmaResults = {
  "1": {
    votes: [245, 189, 312, 154],
    totalVotes: 900
  },
  "2": {
    votes: [423, 178, 267, 132],
    totalVotes: 1000
  },
  "3": {
    votes: [389, 201, 156, 254],
    totalVotes: 1000
  }
};

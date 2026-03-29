export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  scenario: string;
  actions: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "Nuqsonli smartfon xaridi",
    category: "Iste'molchilar huquqi",
    scenario: "Ikki hafta oldin siz elektronika do'konidan yangi smartfon sotib oldingiz. Telefon tez-tez qotib qoladi va o'z-o'zidan o'chib qoladi, bu undan foydalanishni imkonsiz qiladi. Sizda kvitansiya (chek) bor va telefon hali ham ishlab chiqaruvchining 1 yillik kafolati ostida. Do'kon 'sotilgan mollar qaytarib olinmaydi' deb, uni almashtirib berishni rad etmoqda.",
    actions: [
      {
        text: "Do'kon qarorini qabul qilish va nuqsonli telefonni o'zida qoldirish",
        isCorrect: false,
        feedback: "Bu eng yaxshi variant emas. Sizda nuqsonli mahsulotlardan, ayniqsa ular kafolat ostida bo'lganda, sizni himoya qiladigan iste'molchi huquqlari mavjud. Nuqsonli mahsulotni qabul qilish qonuniy huquqlaringizdan foydalanmayotganingizni anglatadi."
      },
      {
        text: "Kafolat huquqlariga asoslanib, pulni qaytarishni yoki almashtirib berishni talab qilish",
        isCorrect: true,
        feedback: "To'g'ri! Ishlab chiqaruvchining kafolati mahsulotning belgilangan maqsadda ishlashini kafolatlaydi. Siz kafolat ostidagi nuqsonli mahsulotni ta'mirlash, almashtirish yoki pulini qaytarishni so'rash bo'yicha qonuniy huquqqa egasiz. Do'konning 'sotilgan mollar qaytarib olinmaydi' degan qoidasi qonuniy kafolat himoyasini bekor qila olmaydi."
      },
      {
        text: "Internetda salbiy sharhlar qoldirish va muammoni tashlab qo'yish",
        isCorrect: false,
        feedback: "Internetda o'z tajribangizni baham ko'rish huquqiga ega bo'lsangiz-da, bu o'z-o'zidan muammoni hal qilmaydi. Ommaviy shikoyatlarga o'tishdan oldin, birinchi navbatda kafolat va iste'molchilar huquqlarini himoya qilish qonunlari orqali qonuniy choralarni ko'rishingiz kerak."
      },
      {
        text: "Muammoni hal qilishga urinmasdan sudga berish bilan tahdid qilish",
        isCorrect: false,
        feedback: "Darhol huquqiy tahdidlarga o'tish biroz erta. To'g'ri birinchi qadam - kafolat ostida rasmiy ravishda chora ko'rishni (masalan, almashtirishni) so'rashdir. Aksariyat nizolar sudga murojaat qilmasdan, to'g'ri tartiblar orqali hal qilinishi mumkin."
      }
    ]
  },
  {
    id: "2",
    title: "Maktab shkafini tintuv qilish hodisasi",
    category: "To'rtinchi tuzatish huquqlari",
    scenario: "Maktab ma'muriyati bir o'quvchining maktabga taqiqlangan narsalarni olib kelganidan shubhalanmoqda. Hech qanday aniq dalilsiz yoki o'quvchini xabardor qilmasdan, ma'muriyat o'quvchi darsda bo'lgan vaqtda uning shkafini ochadi va tintuv qiladi. Ma'muriyat hech qanday noqonuniy narsa topmaydi, lekin o'quvchining shaxsiy kundaligini topib oladi.",
    actions: [
      {
        text: "Tintuv noqonuniy edi, chunki o'quvchilar maktabda to'liq shaxsiy daxlsizlik huquqiga ega",
        isCorrect: false,
        feedback: "O'quvchilar ma'lum bir shaxsiy daxlsizlik huquqlariga ega bo'lsalar-da, maktab sharoitida bu huquqlar cheklangan. Maktablar xavfsizlik maqsadida 'yetarli asos' talab qilinmasdan, oddiy 'asosli shubha' bilangina tintuv o'tkazishi mumkin."
      },
      {
        text: "Tintuv qonuniy edi, chunki maktab shkaflari maktab mulki hisoblanadi",
        isCorrect: true,
        feedback: "To'g'ri! Sudlar odatda maktab ma'muriyati maktab qoidalari yoki qonunlar buzilayotganiga 'asosli shubha' bo'lsa, shkaflarni tintuv qilishi mumkin deb hisoblaydi. Maktablar shkaflarga egalik huquqini saqlab qoladi va tintuvlar bo'yicha qoidalar o'rnatishi mumkin. Biroq, tintuv maqsadi doirasida mantiqiy bo'lishi kerak."
      },
      {
        text: "Tintuv noqonuniy edi, chunki tintuv uchun order olinmagan",
        isCorrect: false,
        feedback: "Maktab ma'muriyati maktab mulkini (masalan, shkaflarni) tintuv qilish uchun odatda order talab qilmaydi. Ularga politsiya tintuvlari uchun talab qilinadigan qat'iy standartdan ko'ra, faqatgina 'asosli shubha' kerak bo'ladi. Maktablar xavfsizlik va tartibni saqlash uchun maxsus vakolatlarga ega."
      },
      {
        text: "O'quvchining huquqlarini buzgani uchun ma'muriyat hibsga olinishi kerak",
        isCorrect: false,
        feedback: "Bu o'ta bo'rttirilgan munosabat. Asosli shubha bilan o'tkazilgan maktab tintuvlari odatda qonuniydir. Agar tintuvning qonuniyligiga shubha bo'lsa, jinoiy ayblovlar bilan emas, balki maktab qoidalari yoki fuqarolik shikoyatlari orqali chora ko'rish to'g'ri bo'ladi."
      }
    ]
  },
  {
    id: "3",
    title: "Maktab haqida ijtimoiy tarmoqdagi post",
    category: "Birinchi tuzatish huquqlari",
    scenario: "O'rta maktab o'quvchisi dam olish kunlari uyidan turib, maktab tushliklarining sifatini tanqid qiluvchi satirik video yaratadi va uni ijtimoiy tarmoqlarga joylaydi. Video o'quvchilar orasida ommalashib ketadi. Dushanba kuni direktor postni 'dars jarayonini buzuvchi va maktab xodimlariga nisbatan hurmatsizlik' deb da'vo qilib, o'quvchini uch kunga darsdan chetlashtiradi.",
    actions: [
      {
        text: "Chetlashtirish o'rinli, chunki o'quvchilar har doim maktab ma'muriyatini hurmat qilishlari kerak",
        isCorrect: false,
        feedback: "Hurmat muhim bo'lsa-da, Birinchi tuzatish o'quvchilarning so'z erkinligi huquqini, jumladan, maktab qoidalarini tanqid qilishni himoya qiladi. Hodisaning maktab hududidan va dars vaqtidan tashqarida sodir bo'lganligi o'quvchining so'z erkinligi himoyasini kuchaytiradi."
      },
      {
        text: "O'quvchining so'z erkinligi huquqlari katta ehtimol bilan ushbu videoni himoya qiladi",
        isCorrect: true,
        feedback: "To'g'ri! Oliy sud o'quvchilar 'maktab darvozasidan kirganda o'zlarining konstitutsiyaviy so'z erkinligi huquqlarini tashlab kirmaydilar' deb qaror chiqargan. Maktabdan tashqaridagi fikr bildirish odatda maktab ichidagiga qaraganda ko'proq himoya qilinadi. Nutq maktab faoliyatiga jiddiy zarar yetkazmasa, u ehtimol himoyalangan hisoblanadi. Maktab siyosatini tanqid qilish va satira - bu himoyalangan so'z shakllaridir."
      },
      {
        text: "Maktablar o'zlari haqoratomuz yoki tanqidiy deb hisoblagan har qanday gapni jazolashi mumkin",
        isCorrect: false,
        feedback: "Bu noto'g'ri. Maktablar gapni shunchaki haqoratomuz yoki tanqidiy deb hisoblaganliklari uchun jazolay olmaydi. Gap-so'z maktab faoliyatiga jiddiy to'sqinlik qilgani yoki qilishi mumkinligi haqida dalil bo'lishi kerak. O'quvchilarning so'z huquqlari konstitutsiya bilan himoyalangan."
      },
      {
        text: "Keyingi jazolardan qochish uchun o'quvchi videoni o'chirib tashlashi kerak",
        isCorrect: false,
        feedback: "Videoni o'chirish nizoni kamaytirishi mumkin bo'lsa-da, bu darsdan chetlashtirish qonuniy bo'lgan-bo'lmaganligini hal qilmaydi. Agar gap Birinchi tuzatish bilan himoyalangan bo'lsa, o'quvchi uni qoldirish huquqiga ega va tegishli kanallar orqali jazolanishiga qarshi chiqishi mumkin."
      }
    ]
  },
  {
    id: "4",
    title: "Politsiya tomonidan to'xtatish va so'roq qilish",
    category: "Beshinchi tuzatish huquqlari",
    scenario: "Maktabdan uyga qaytayotganda, o'quvchini politsiya to'xtatib, yaqin atrofdagi voqea haqida savollar beradi. O'quvchining bu voqeaga umuman aloqasi yo'q edi, lekin ofitser javob olishni talab qilib, 'gapirishdan bosh tortish seni aybdor qilib ko'rsatadi' deydi.",
    actions: [
      {
        text: "Siz politsiyaning barcha savollariga javob berishingiz kerak, aks holda hibsga olinishingiz mumkin",
        isCorrect: false,
        feedback: "Bu noto'g'ri. Beshinchi tuzatish sizning o'zingizga qarshi ko'rsatma bermaslik huquqingizni himoya qiladi. Politsiya so'roq qilganda siz odatda sukut saqlash huquqiga egasiz. Garchi ba'zi hududlarda o'zingizni tanishtirishingiz kerak bo'lsa-da, boshqa savollarga javob berishga majbur emassiz."
      },
      {
        text: "Xushmuomalalik bilan sukut saqlashni xohlayotganingizni va ota-onangiz/advokatingiz ishtirok etishini so'rang",
        isCorrect: true,
        feedback: "To'g'ri! Bu eng yaxshi yondashuv. Siz Beshinchi tuzatishga ko'ra sukut saqlash huquqiga va Oltinchi tuzatishga ko'ra so'roq paytida advokat ishtirok etishini talab qilish qonuniy huquqiga egasiz. Voyaga yetmaganlar uchun ota-ona yoki vasiyni chaqirishni so'rash ham tavsiya etiladi. O'z huquqlaringizni talab qilayotganda xushmuomala bo'lish professional yondashuvdir."
      },
      {
        text: "Politsiya xodimidan qochib ketish",
        isCorrect: false,
        feedback: "Politsiyadan qochish xavfli bo'lib, qarshilik ko'rsatish yoki hibsga olishdan qochish kabi ayblovlarga olib kelishi mumkin. Bu shuningdek ofitserlarga sizni ushlab turish uchun 'asosli shubha' berishi mumkin. Vaziyatni to'g'ri hal qilish usuli - xotirjam bo'lish, hurmat bilan munosabatda bo'lish va o'z konstitutsiyaviy huquqlaringizni ochiq talab qilishdir."
      },
      {
        text: "Ofitserning savollarini qondirish uchun yolg'on hikoya o'ylab topish",
        isCorrect: false,
        feedback: "Hech qachon politsiyaga yolg'on gapirmang! Huquq-tartibot idoralariga yolg'on ma'lumot berish jinoyat hisoblanadi. Agar politsiya bilan gaplashishni tanlasangiz, rostgo'y bo'lishingiz kerak. Agar savollarga javob berish sizga noqulay bo'lsa, buning o'rniga sukut saqlash huquqingizdan foydalaning."
      }
    ]
  },
  {
    id: "5",
    title: "Onlayn xarid bo'yicha nizo",
    category: "Iste'molchilar huquqi",
    scenario: "Siz onlayn tarzda 800 dollarga noutbuk buyurtma qildingiz. U yetib kelganida, u taxminan 300 dollar turadigan butunlay boshqa, arzonroq model bo'lib chiqdi. Veb-saytda 'qaytarib olinmaydi' (no returns) siyosati ko'rsatilgan. Sotuvchi to'g'ri mahsulotni yuborganini da'vo qilib, elektron xatlaringizga umuman javob bermayapti.",
    actions: [
      {
        text: "Yo'qotishni qabul qiling, chunki veb-saytda 'qaytarib olinmaydi' deyilgan",
        isCorrect: false,
        feedback: "Sotuvchi sotib olingan narsani yetkazib bera olmasa, 'qaytarib olinmaydi' siyosati qo'llanilmaydi. Bu shartnomani buzish va ehtimol firibgarlikdir. Iste'molchilar huquqlarini himoya qilish qonunlari sizni aldamchi taktikalardan himoya qiladi."
      },
      {
        text: "Kredit karta kompaniyangiz orqali to'lovni bekor qilishni (chargeback) talab qiling",
        isCorrect: true,
        feedback: "To'g'ri! Bu to'lovni bekor qilish (chargeback) deb ataladi va iste'molchilarni eng kuchli himoya qilish usullaridan biridir. Kredit karta kompaniyalarida siz to'lagan narsangizni olmagan nizolarni tekshirish tartib-qoidalari mavjud. Hammasini hujjatlashtiring: buyurtma, nima kelgani va muammoni hal qilishga bo'lgan urinishlaringiz. Shuningdek, siz Iste'molchilar huquqlarini himoya qilish idorasiga ham shikoyat qilishingiz mumkin."
      },
      {
        text: "Sotuvchini jismoniy zo'ravonlik bilan qo'rqitish",
        isCorrect: false,
        feedback: "Mutlaqo yo'q! Zo'ravonlik tahdidlari noqonuniy hisoblanadi va sizga qarshi jinoiy ayblovlarga olib kelishi mumkin. Har doim to'lovni bekor qilish, iste'molchilar huquqlarini himoya qilish idoralari yoki kichik da'volar sudi kabi to'g'ri kanallar orqali qonuniy choralarni ko'ring."
      },
      {
        text: "Noutbukni olib qoling va kredit karta qarzini to'lashni to'xtating",
        isCorrect: false,
        feedback: "Kredit karta to'lovini umuman to'xtatish kredit tarixingizga (credit score) zarar yetkazadi va sotuvchi bilan muammoni hal qilmaydi. Buning o'rniga, faqatgina ma'lum bir to'lovga e'tiroz bildirish uchun kredit karta kompaniyangiz bilan rasmiy nizo (dispute) jarayonidan foydalaning."
      }
    ]
  },
  {
    id: "6",
    title: "Zo'ravonlikka (Bullingga) guvoh bo'lish",
    category: "Huquqiy va axloqiy javobgarlik",
    scenario: "Siz maktab yo'lagida boshqa o'quvchining jismoniy zo'ravonlikka (bulling) uchrayotganiga guvoh bo'ldingiz. Jabrlanuvchi ochiq-oydin jarohatlangan va tushkun holatda. O'qituvchilar yaqin atrofda yo'q, boshqa o'quvchilar esa yordam bermasdan shunchaki o'tib ketishmoqda.",
    actions: [
      {
        text: "Bunga e'tibor bermang, chunki bu sizning muammongiz emas",
        isCorrect: false,
        feedback: "Garchi siz ko'p hollarda aralashishga qonuniy majburiyatga ega bo'lmasangiz-da, kimdir jabrlanayotganda chetda turish jiddiy axloqiy muammolarni keltirib chiqaradi. Ko'pgina shtatlarda zo'ravonlikka qarshi qonunlar, maktablarda esa voqeani xabar berishni talab qiluvchi qoidalar mavjud. Guvohlarning aralashuvi katta ijobiy o'zgarishlarga olib kelishi mumkin."
      },
      {
        text: "Zudlik bilan o'qituvchi, ma'muriyat yoki maktab xavfsizlik xodimiga xabar bering",
        isCorrect: true,
        feedback: "To'g'ri! Bu eng xavfsiz va eng samarali javob. Maktab mutasaddilari zo'ravonlikka qarshi kurashish vakolati va majburiyatiga ega. Aksariyat maktablarda zo'ravonlikka qarshi qoidalar va o'quvchilarni himoya qilish bo'yicha qonuniy majburiyatlar mavjud. Sizning xabaringiz jabrlanuvchiga yordam olishga va kelajakdagi hodisalarning oldini olishga yordam beradi. Agar o'zingizni xavfsiz his qilsangiz, yordam kelishini kutayotib jabrlanuvchining holatidan xabar olishingiz ham mumkin."
      },
      {
        text: "O'zingiz zo'ravon bilan jismoniy jangga kiring",
        isCorrect: false,
        feedback: "Yordam berish istagi tahsinga sazovor bo'lsa-da, zo'ravon bilan jismoniy qarama-qarshilikka borish vaziyatni yomonlashtirishi, o'zingizga shikast yetkazishi yoki sizga nisbatan intizomiy chora ko'rilishiga olib kelishi mumkin. To'g'ri munosabat - zudlik bilan kattalardan yordam so'rash va agar xavfsiz bo'lsa, og'zaki aralashish yoki jabrlanuvchini xavfsiz joyga ko'chirishga yordam berishdir."
      },
      {
        text: "Buni telefoningizga yozib oling va ijtimoiy tarmoqlarga joylang",
        isCorrect: false,
        feedback: "Dalillarni hujjatlashtirish foydali bo'lib tuyulishi mumkin bo'lsa-da, zo'ravonlik hodisalarini ijtimoiy tarmoqlarga joylashtirish jabrlanuvchini yanada kamsitishi va shaxsiy daxlsizlik qonunlarini yoki maktab qoidalarini buzishi mumkin. Ustuvor vazifa virusli kontent yaratish emas, balki zo'ravonlikni to'xtatish va yordam olish bo'lishi kerak. Agar siz dalillarni yozib olsangiz, ularni ijtimoiy tarmoqlarga emas, balki maktab ma'muriyatiga taqdim eting."
      }
    ]
  }
];

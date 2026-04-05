# ⚖️ Qonun va Huquq - Interaktiv Ta'lim Platformasi

**Qonun va Huquq** — bu O'zbekiston yoshlari va fuqarolari uchun huquqiy bilimlarni qiziqarli, o'yinlashtirilgan (gamification) tarzda o'rgatuvchi zamonaviy veb-platforma. Platforma o'quvchilarga qonunlarni shunchaki yodlashni emas, balki amaliy vaziyatlarda qanday qo'llashni o'rgatadi.

![Platforma ko'rinishi](https://via.placeholder.com/800x400?text=Qonun+va+Huquq+Platformasi) ## 🚀 Asosiy Imkoniyatlar (Features)

* 📚 **Interaktiv Darslar:** Mavzular qadam-baqadam o'rganiladi. Darsni muvaffaqiyatli tugatganlarga **XP (tajriba ballari)** beriladi va keyingi dars qulfdan yechiladi.
* ⚖️ **Amaliy Holatlar (Cases):** Haqiqiy hayotdagi huquqiy vaziyatlar (masalan, mehnat huquqi, iste'molchi huquqi) tahlil qilinadi. To'g'ri qaror qabul qilsangiz, qonuniy tushuntirish va qo'shimcha ball beriladi.
* 📖 **Bosqichli Lug'at:** Huquqiy atamalar va tushunchalar qulay qidiruv tizimiga ega. Ular darajalarga bo'lingan va "Akkordeon" (ochilib-yopiladigan) uslubida ishlangan.
* 🎥 **Video Qo'llanmalar:** Davlat xizmatlari (OneID, My.gov.uz, DTM) dan qanday foydalanish haqida tayyor video ko'rsatmalar.
* 🏆 **Peshqadamlar Jadvali (Leaderboard):** Barcha foydalanuvchilar orasida o'zaro raqobat. Eng ko'p XP yig'ganlar ro'yxati va maxsus dizayndagi "Top-3 Podium".
* 👤 **Shaxsiy Profil va Yutuqlar:** Foydalanuvchi darajasi (Level), kunlik kirish seriyasi (Streak), yig'ilgan XP va o'quvchining harakatlariga qarab avtomat ochiladigan nishonlar (Badges) tizimi.

## 🛠 Texnologiyalar (Tech Stack)

Loyihani yaratishda eng zamonaviy texnologiyalardan foydalanildi:

* **Frontend:** React 18, TypeScript, Vite
* **Dizayn & UI:** Tailwind CSS, Radix UI (shadcn/ui komponentlari)
* **Animatsiyalar:** Framer Motion (sahifalar orasidagi silliq o'tishlar va elementlar animatsiyasi)
* **Ikonkalar:** Lucide React
* **Backend & Ma'lumotlar bazasi:** Supabase (PostgreSQL), Row Level Security (RLS)
* **Marshrutlash:** React Router v6

## 📂 Loyiha Strukturasi

```text
src/
├── app/
│   ├── components/       # Qayta ishlatiladigan UI elementlar (Navbar, Layout, Card...)
│   ├── data/             # Statik ma'lumotlar (Darslar, Videolar...)
│   ├── pages/            # Asosiy sahifalar (Dashboard, Lessons, Profile, Leaderboard...)
│   ├── routes.tsx        # Barcha sahifalar marshrutlari
│   └── App.tsx           # Dasturning asosiy kirish nuqtasi
├── lib/
│   └── supabase.ts       # Supabase backend bilan ulanish sozlamalari
├── styles/               # CSS va Tailwind sozlamalari
└── main.tsx              # React DOM render

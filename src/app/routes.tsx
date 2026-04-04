import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/MainLayout";
import { AuthPage } from "./pages/AuthPage";
import { Dashboard } from "./pages/Dashboard";
import { LessonsPage } from "./pages/LessonsPage";
import { LessonDetail } from "./pages/LessonDetail";
import { CasesPage } from "./pages/CasesPage";
import { CaseDetail } from "./pages/CaseDetail";

export const router = createBrowserRouter([
  {
    // Tizimga kirish va Ro'yxatdan o'tish sahifasi
    path: "/login",
    element: <AuthPage />,
  },
  {
    // Himoyalangan sahifalar (Faqat profilga kirganlar uchun)
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true, // Asosiy manzil (/)
        element: <Dashboard />,
      },
      {
        path: "lessons", // Darslar ro'yxati
        element: <LessonsPage />,
      },
      {
        path: "lessons/:id", // Darsning o'zi va test (ID bo'yicha)
        element: <LessonDetail />,
      },
      {
        path: "cases", // Holatlar ro'yxati
        element: <CasesPage />,
      },
      {
        path: "cases/:id", // Holatning o'zi va tahlil (ID bo'yicha)
        element: <CaseDetail />,
      }
      
      // Kelajakda Profil yoki Reyting sahifalarini qilsak, xuddi shu yerga qator qilib qo'shib ketaveramiz.
    ],
  },
]);

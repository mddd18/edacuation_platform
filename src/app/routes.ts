import { createBrowserRouter } from "react-router";
import { MainLayout } from "./app/components/MainLayout";
import { AuthPage } from "./app/pages/AuthPage";
import { Dashboard } from "./app/pages/Dashboard";
import { LessonsPage } from "./app/pages/LessonsPage"; // Yangi import
// Boshqa sahifalarni ham shu yerda import qilasiz...

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: <MainLayout />, // MainLayout hamma sahifani Auth'dan tekshiradi
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/lessons",
        element: <LessonsPage />, // Darslar ro'yxati
      },
      // Keyinchalik darsning ichki qismi uchun:
      // { path: "/lessons/:id", element: <LessonDetail /> },
    ],
  },
]);

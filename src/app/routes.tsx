import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/MainLayout";
import { AuthPage } from "./pages/AuthPage";
import { Dashboard } from "./pages/Dashboard";
import { LessonsPage } from "./pages/LessonsPage";
import { LessonDetail } from "./pages/LessonDetail"; // Yangi import

export const router = createBrowserRouter([
  {
    // Tizimga kirish sahifasi
    path: "/login",
    element: <AuthPage />,
  },
  {
    // Himoyalangan sahifalar
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "lessons",
        element: <LessonsPage />,
      },
      {
        // DARSNING ICHKI QISMI (ID bo'yicha)
        path: "lessons/:id", 
        element: <LessonDetail />,
      },
    ],
  },
]);

import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/MainLayout";
import { AuthPage } from "./pages/AuthPage";
import { Dashboard } from "./pages/Dashboard";
import { LessonsPage } from "./pages/LessonsPage";

export const router = createBrowserRouter([
  {
    // Tizimga kirish sahifasi (Layout'dan tashqarida)
    path: "/login",
    element: <AuthPage />,
  },
  {
    // Himoyalangan sahifalar (MainLayout ichida)
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true, // Asosiy yo'l (/) ochilganda Dashboard chiqadi
        element: <Dashboard />,
      },
      {
        path: "lessons",
        element: <LessonsPage />,
      },
      // Kelajakda darsning ichki qismini shu yerga qo'shasiz:
      // { path: "lessons/:id", element: <LessonDetail /> },
    ],
  },
]);

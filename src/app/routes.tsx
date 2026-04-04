import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/MainLayout";
import { AuthPage } from "./pages/AuthPage";
import { Dashboard } from "./pages/Dashboard";
import { LessonsPage } from "./pages/LessonsPage";
import { LessonDetail } from "./pages/LessonDetail";
import { CaseStudiesPage } from "./pages/CaseStudiesPage"; // Fayl nomini to'g'riladik
import { CaseDetail } from "./pages/CaseDetail";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
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
        path: "lessons/:id",
        element: <LessonDetail />,
      },
      {
        path: "cases", 
        element: <CaseStudiesPage />, // Bu yerni ham to'g'riladik
      },
      {
        path: "cases/:id", 
        element: <CaseDetail />,
      }
    ],
  },
]);

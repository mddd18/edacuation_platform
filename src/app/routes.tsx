import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/MainLayout";
import { AuthPage } from "./pages/AuthPage";
import { Dashboard } from "./pages/Dashboard";
import { LessonsPage } from "./pages/LessonsPage";
import { LessonDetail } from "./pages/LessonDetail";
import { CaseStudiesPage } from "./pages/CaseStudiesPage";
import { CaseDetail } from "./pages/CaseDetail";
import { DictionaryPage } from "./pages/DictionaryPage";
import { VideoGuidesPage } from "./pages/VideoGuidesPage"; // <--- Import qildik

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "lessons", element: <LessonsPage /> },
      { path: "lessons/:id", element: <LessonDetail /> },
      { path: "cases", element: <CaseStudiesPage /> },
      { path: "cases/:id", element: <CaseDetail /> },
      { path: "dictionary", element: <DictionaryPage /> },
      { 
        path: "videos", // <--- Yo'nalish qo'shdik
        element: <VideoGuidesPage /> 
      }
    ],
  },
]);

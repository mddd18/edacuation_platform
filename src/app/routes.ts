import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/MainLayout";
import { Dashboard } from "./pages/Dashboard";
import { LessonsPage } from "./pages/LessonsPage"; // YANGI SAHIFANI IMPORT QILDIK
import { LessonPage } from "./pages/LessonPage";
import { CaseStudiesPage } from "./pages/CaseStudiesPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { DictionaryPage } from "./pages/DictionaryPage";
import { ProfilePage } from "./pages/ProfilePage";
import { VideoGuidesPage } from "./pages/VideoGuidesPage"; 
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "lessons", Component: LessonsPage }, // YANGI MARSHRUT QO'SHILDI
      { path: "lesson/:id", Component: LessonPage },
      { path: "cases", Component: CaseStudiesPage },
      { path: "leaderboard", Component: LeaderboardPage },
      { path: "dictionary", Component: DictionaryPage },
      { path: "videos", Component: VideoGuidesPage }, 
      { path: "profile", Component: ProfilePage },
      { path: "*", Component: NotFound },
    ],
  },
]);

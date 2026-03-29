import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/MainLayout";
import { Dashboard } from "./pages/Dashboard";
import { LessonPage } from "./pages/LessonPage";
import { CaseStudiesPage } from "./pages/CaseStudiesPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { DictionaryPage } from "./pages/DictionaryPage";
import { ProfilePage } from "./pages/ProfilePage";
import { VideoGuidesPage } from "./pages/VideoGuidesPage"; // YANGI SAHIFA IMPORT QILINDI
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "lesson/:id", Component: LessonPage },
      { path: "cases", Component: CaseStudiesPage },
      { path: "leaderboard", Component: LeaderboardPage },
      { path: "dictionary", Component: DictionaryPage },
      { path: "videos", Component: VideoGuidesPage }, // YANGI MARSHRUT QO'SHILDI
      { path: "profile", Component: ProfilePage },
      { path: "*", Component: NotFound },
    ],
  },
]);

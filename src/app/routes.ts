import { createHashRouter } from "react-router"; 
import { MainLayout } from "./components/MainLayout";
import { Dashboard } from "./pages/Dashboard";
import { LessonsPage } from "./pages/LessonsPage";
import { LessonPage } from "./pages/LessonPage";
import { CaseStudiesPage } from "./pages/CaseStudiesPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { DictionaryPage } from "./pages/DictionaryPage";
import { ProfilePage } from "./pages/ProfilePage";
import { VideoGuidesPage } from "./pages/VideoGuidesPage"; 
import { NotFound } from "./pages/NotFound";
import { AuthPage } from "./pages/AuthPage"; 

export const router = createHashRouter([
  {
    path: "/login",
    Component: AuthPage,
  },
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "lessons", Component: LessonsPage },
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

import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { SocietyDirectory } from "./pages/SocietyDirectory";
import { SocietyDetail } from "./pages/SocietyDetail";
import { EventDetail } from "./pages/EventDetail";
import { StudentDashboard } from "./pages/StudentDashboard";
import { OrganizerDashboard } from "./pages/OrganizerDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "login", Component: LoginPage },
      { path: "signup", Component: SignupPage },
      { path: "societies", Component: SocietyDirectory },
      { path: "society/:id", Component: SocietyDetail },
      { path: "event/:id", Component: EventDetail },
      { path: "dashboard/student", Component: StudentDashboard },
      { path: "dashboard/organizer", Component: OrganizerDashboard },
      { path: "dashboard/admin", Component: AdminDashboard },
    ],
  },
]);

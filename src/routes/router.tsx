import { createBrowserRouter } from "react-router";
import {
  AdminDashboardRoute,
  DashboardIndexRoute,
  DashboardSectionRoute,
  DriverDashboardRoute,
  PassengerDashboardRoute,
  SuperadminDashboardRoute,
} from "../components/dashboard/DashboardRoutes";
import Layout from "../components/layout/Layout";
import DashboardLayout from "../components/layout/DashboardLayout";
import Blog from "../pages/Blog";
import Contact from "../pages/Contact";
import HelpCenter from "../pages/HelpCenter";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "blog",
        Component: Blog,
      },
      {
        path: "help",
        Component: HelpCenter,
      },
      {
        path: "contact",
        Component: Contact,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: DashboardIndexRoute,
      },
      {
        path: "admin",
        Component: AdminDashboardRoute,
        children: [
          { index: true, Component: DashboardIndexRoute },
          { path: ":section", Component: DashboardSectionRoute },
        ],
      },
      {
        path: "superadmin",
        Component: SuperadminDashboardRoute,
        children: [
          { index: true, Component: DashboardIndexRoute },
          { path: ":section", Component: DashboardSectionRoute },
        ],
      },
      {
        path: "passenger",
        Component: PassengerDashboardRoute,
        children: [
          { index: true, Component: DashboardIndexRoute },
          { path: ":section", Component: DashboardSectionRoute },
        ],
      },
      {
        path: "driver",
        Component: DriverDashboardRoute,
        children: [
          { index: true, Component: DashboardIndexRoute },
          { path: ":section", Component: DashboardSectionRoute },
        ],
      },
    ],
  },
]);

export default router;

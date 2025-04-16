import DashboardLayout from "../layout/DashboardLayout";
import PagesLayout from "../layout/Pages";
import History from "../pages/History";
import Home from "../pages/Home";
import NotFoundPage from "../pages/Notfound";

const MainRoutes = {
  path: "/",
  children: [
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        // Public Routes no subscrioptin needeed
        {
          path: "questions",
          children: [
            {
              path: "",
              element: <History />,
            },
            // {
            //   path: "create",
            //   element: <CreateProject />,
            // },
          ],
        },
      ],
    },

    {
      path: "*",
      element: <NotFoundPage />,
    },
  ],
};

export default MainRoutes;

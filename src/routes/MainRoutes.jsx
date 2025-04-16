import DashboardLayout from "../layout/DashboardLayout";
import PagesLayout from "../layout/Pages";
import History from "../pages/History";
import NotFoundPage from "../pages/Notfound";
import ActiveQuestion from "../pages/ActiveQuestion";
import Trades from "../pages/Trades";

const MainRoutes = {
  path: "/",
  children: [
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        // Public Routes no subscrioptin needeed
        {
          path: "/",
          element: <ActiveQuestion />,
        },
        {
          path: "/trades",
          element: <Trades />,
        },
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

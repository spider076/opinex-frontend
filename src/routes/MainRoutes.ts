import DashboardLayout from "../layout/DashboardLayout"; // Ensure .tsx or resolved
// import PagesLayout from "../layout/Pages"; // This import was not used
import History from "../pages/History"; // Ensure .tsx or resolved
import NotFoundPage from "../pages/Notfound"; // Assuming Notfound.tsx exists or will be created
import ActiveQuestion from "../pages/ActiveQuestion"; // Ensure .tsx or resolved
import Trades from "../pages/Trades"; // Ensure .tsx or resolved
import ChatPage from "../pages/ChatPage"; // Import the new ChatPage
import React from "react"; // Import React for JSX elements

// Define a type for route objects for better type safety
interface RouteConfig {
  path: string;
  element?: React.ReactNode; // Element can be JSX
  children?: RouteConfig[];
}

const MainRoutes: RouteConfig = {
  path: "/",
  children: [
    {
      path: "/",
      element: React.createElement(DashboardLayout), // Use React.createElement for components
      children: [
        {
          path: "/",
          element: React.createElement(ActiveQuestion),
        },
        {
          path: "/trades",
          element: React.createElement(Trades),
        },
        {
          path: "questions", // This will be /questions
          element: React.createElement(History), // Direct element for /questions
        },
        // Example for nested routes under /questions if needed in future:
        // {
        //   path: "questions",
        //   children: [
        //     {
        //       path: "", // This would be /questions
        //       element: React.createElement(History),
        //     },
        //     {
        //       path: "details/:id", // Example: /questions/details/123
        //       element: React.createElement(QuestionDetailsPage), // Assuming such a component exists
        //     },
        //   ],
        // },
        {
          path: "/chat", // New route for ChatPage
          element: React.createElement(ChatPage),
        },
      ],
    },
    {
      path: "*", // Catch-all for 404
      element: React.createElement(NotFoundPage),
    },
  ],
};

export default MainRoutes;

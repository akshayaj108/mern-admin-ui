import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/login/login";
import Dashboard from "./layouts/Dashboard";
import NonAuthBoard from "./layouts/NonAuthBoard";
import Root from "./layouts/Root";
import Users from "./pages/users/UsersPage";
import Restaurant from "./pages/restaurants/RestaurantPage";
import Products from "./pages/products/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/restaurants",
            element: <Restaurant />,
          },
          {
            path: "/products",
            element: <Products />,
          },
        ],
      },
      {
        path: "/auth",
        element: <NonAuthBoard />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);

import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import LoginPage from "./pages/login/login";

export const router =  createBrowserRouter([
    {
        path: "/auth/login",
        element: <LoginPage />
    },
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/categories",
        element: <CategoriesPage />
    }
])
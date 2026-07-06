import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { Role } from "../models/auth";
import { ROUTES } from "./routeConstants";

const Login = lazy(() => import("../pages/Auth/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Forbidden = lazy(() => import("../pages/Forbidden/Forbidden"));
const Users = lazy(() => import("../pages/Users/Users"));
// const UserDetails = lazy(() => import("../pages/UserDetails/UserDetails"));
// const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

export const router = createBrowserRouter([
    { path: ROUTES.LOGIN, element: <Login /> },
    { path: ROUTES.UNAUTHORIZED, element: <Forbidden /> },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: ROUTES.DASHBOARD,
                element: <Dashboard />
            }
        ]
    },
    {
        element: <ProtectedRoute allowedRoles={[Role.ADMIN]} />,
        children: [
            {
                path: ROUTES.USERS,
                element: <Users />
            }
        ]
    }
    // { path: "/users", element: <Users /> },
    // { path: "/users/:id", element: <UserDetails /> },
    // { path: "*", element: <NotFound /> },
]);
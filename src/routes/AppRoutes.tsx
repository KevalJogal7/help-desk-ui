import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { Role } from "../models/auth";
import { ROUTES } from "./routeConstants";

const Login = lazy(() => import("../pages/Auth/Login/Login"));
const ForgotPassword = lazy(() => import("../pages/Auth/ForgotPassword/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/Auth/ResetPassword/ResetPassword"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Forbidden = lazy(() => import("../pages/Forbidden/Forbidden"));
const Users = lazy(() => import("../pages/Users/Users"));
const UserForm = lazy(() => import("../pages/Users/UserForm/UserForm"));
const Tickets = lazy(() => import("../pages/Tickets/Tickets"));
const TicketForm = lazy(() => import("../pages/Tickets/TicketForm/TicketForm"));
const TicketView = lazy(() => import("../pages/Tickets/TicketView/TicketView"))
const Profile = lazy(() => import("../pages/Profile/Profile"));

export const router = createBrowserRouter([
    { path: ROUTES.LOGIN, element: <Login /> },
    { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPassword /> },
    { path: ROUTES.RESET_PASSWORD, element: <ResetPassword /> },
    { path: ROUTES.UNAUTHORIZED, element: <Forbidden /> },
    {
        element: <ProtectedRoute />,
        children: [
            { path: ROUTES.DASHBOARD, element: <Dashboard /> },
            { path: ROUTES.TICKETS, element: <Tickets /> },
            { path: ROUTES.TICKET_NEW, element: <TicketForm /> },
            { path: ROUTES.TICKET_VIEW, element: <TicketView /> },
            { path: ROUTES.TICKET_EDIT, element: <TicketForm /> },
            { path: ROUTES.PROFILE, element: <Profile /> },
        ]
    },
    {
        element: <ProtectedRoute allowedRoles={[Role.ADMIN]} />,
        children: [
            {
                path: ROUTES.USERS,
                element: <Users />
            },
            {
                path: ROUTES.USER_NEW,
                element: <UserForm />
            },
            {
                path: ROUTES.USER_EDIT,
                element: <UserForm />
            },
        ]
    }
]);
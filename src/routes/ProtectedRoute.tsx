import { Navigate, Outlet } from "react-router-dom";
import { authStorage } from "../services/storage.service";
import type { Props } from "../models/auth";

const ProtectedRoute = ({ allowedRoles }: Props) => {
    const role = authStorage.getRoleId();

    if (!authStorage.isAuthenticated() || !role) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
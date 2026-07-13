import { Navigate } from "react-router-dom";
import { authStorage } from "../services/storage.service";
import type { Props } from "../models/auth";
import Layout from "../components/Layout/Layout";

const ProtectedRoute = ({ allowedRoles }: Props) => {
    const role = authStorage.getRole();

    if (!authStorage.isAuthenticated() || !role) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Layout />;
};

export default ProtectedRoute;
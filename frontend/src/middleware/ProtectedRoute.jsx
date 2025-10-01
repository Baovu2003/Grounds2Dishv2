import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { apiAdminClient } from "../constants/apiUrl";

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [valid, setValid] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            try {
                await apiAdminClient("/auth/verify-token", {
                    method: "GET",
                });
                setValid(true);
            } catch (err) {
                console.error(err);
                localStorage.removeItem("token");
                setValid(false);
            } finally {
                setLoading(false);
            }
        };

        const token = localStorage.getItem("token");
        if (!token) {
            setValid(false);
            setLoading(false);
            return;
        }

        checkToken();
    }, []);
    if (loading)
        return (
            <div className="flex items-center justify-center min-h-screen">
                <button className="btn btn-primary btn-lg loading"></button>
            </div>
        );

    return valid ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

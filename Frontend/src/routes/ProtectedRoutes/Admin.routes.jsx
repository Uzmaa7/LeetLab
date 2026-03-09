import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

const AdminRoute = ({ children }) => {
    const { user, isAuthenticated, isAuthReady } = useUserContext();

    // Jab tak auth check ho raha hai tab tak kuch na dikhao (ya spinner dikhao)
    if (!isAuthReady) return <div className="min-h-screen bg-black" />; 

    if (!isAuthenticated || user?.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    // Agar children hain toh wo dikhayein, warna Outlet (agar nested routes use kar rahe hain)
    return children ? children : <Outlet />;
};

export default AdminRoute;
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/admin/Sidebar";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

const AdminLayout = () => {
    const token = useAppSelector(selectCurrentToken);
    let user;

    if (token) {
        user = verifyToken(token);
    }
    return (
        <div className="flex h-screen">
            {/* Sidebar (Fixed) */}
            <div className="w-64 h-full fixed top-0 left-0 bg-white border-r shadow-lg">
                {user?.role === 'admin' && <Sidebar />}
            </div>

            {/* Main Content (Scrollable) */}
            <div className={`flex-1  h-full overflow-y-auto bg-gray-100 p-4 ${user?.role === 'admin' ? 'ml-64' : ''}`}>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;

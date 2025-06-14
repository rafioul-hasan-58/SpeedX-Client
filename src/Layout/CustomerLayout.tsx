import { Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import CustomerSidebar from "@/components/Sidebar/CustomerSidebar";

const CustomerLayout = () => {
    const token = useAppSelector(selectCurrentToken);
    let user;
    if (token) {
        user = verifyToken(token);
    }
    return (
        <div className="flex h-screen">
            {/* Sidebar (Fixed) */}
            {
                user?.role === 'customer' &&

                <div className="w-[300px] h-full fixed top-0 left-0 bg-white  shadow-lg">
                    <CustomerSidebar />
                </div>
            }

            {/* Main Content (Scrollable) */}
            <div className={`flex-1  h-full overflow-y-auto bg-gray-100 p-4 ${user?.role === 'customer' ? 'ml-[300px]' : ''}`}>
                <Outlet />
            </div>
        </div>
    );
};

export default CustomerLayout;

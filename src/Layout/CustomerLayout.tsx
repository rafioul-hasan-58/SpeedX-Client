import { Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import { CgMenuGridO } from "react-icons/cg";
import { useState } from "react";
import { customerSidebarItems } from "@/components/common/Sidebar/SidebarItem";

const CustomerLayout = () => {
    const token = useAppSelector(selectCurrentToken);
    let user;
    if (token) {
        user = verifyToken(token);
    }
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen relative">
            {/* Sidebar */}
            {
                user?.role === 'customer' &&
                <div className={`w-[280px] 2xl:w-[320px] h-full fixed top-0 left-0 bg-white shadow-lg transition-transform duration-300 ease-in-out z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                    <Sidebar sidebarItems={customerSidebarItems} />
                </div>
            }

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-sky-200 bg-opacity-30 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className={`flex-1 h-full overflow-y-auto bg-gray-100 p-4 ${user?.role === 'customer' ? 'lg:ml-[280px] 2xl:ml-[320px]' : ''}`}>
                <CgMenuGridO
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-2xl lg:hidden mb-4 cursor-pointer"
                />
                <Outlet />
            </div>
        </div>
    );
};

export default CustomerLayout;

import { Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Menu } from "lucide-react";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import { adminSidebarItems } from "@/components/common/Sidebar/SidebarItem";

const AdminLayout = () => {
    const [isOpen, setIsOpen] = useState(true)
    const token = useAppSelector(selectCurrentToken);
    let user;

    if (token) {
        user = verifyToken(token);
    }
    return (
        <div className="flex h-screen">
            {/* Sidebar (Fixed) */}
            {
                user?.role === 'admin' &&
                <div>
                    <Button className="block lg:hidden" onClick={() => setIsOpen(!isOpen)}><Menu /></Button>
                    <div className="w-[280px] h-full fixed top-0 left-0 bg-white  shadow-lg">
                        {
                            isOpen && <Sidebar sidebarItems={adminSidebarItems}/> 
                        }
                    </div>
                </div>
            }

            {/* Main Content (Scrollable) */}
            <div className={`flex-1  h-full overflow-y-auto bg-gray-100 p-4 ${user?.role === 'admin' ? 'ml-[280px] 2xl:ml-[300px]' : ''}`}>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;

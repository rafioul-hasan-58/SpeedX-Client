import { Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/Sidebar/AppSidebar";
import { UserRole } from "@/components/constants/namingConstant";

const AdminLayout = () => {
    const token = useAppSelector(selectCurrentToken);
    const user = token ? verifyToken(token) : null;
    const isAdmin = user?.activeRole === UserRole.ADMIN;

    return (
        <SidebarProvider>
            {isAdmin && <AppSidebar />}
            <main className="flex-1 h-full overflow-y-auto bg-gray-100 p-8 min-h-screen">
                <SidebarTrigger />
                <Outlet />
            </main>
        </SidebarProvider>
    );
};

export default AdminLayout;
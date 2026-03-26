import { Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/Sidebar/AppSidebar";
import { UserRole } from "@/components/constants/namingConstant";

const CustomerLayout = () => {
    const token = useAppSelector(selectCurrentToken);
    const user = token ? verifyToken(token) : null;
    const isCustomer = user?.activeRole === UserRole.CUSTOMER || user?.activeRole === UserRole.SELLER;

    return (
        <SidebarProvider>
            {/* Your custom sidebar replaces AppSidebar */}
            {isCustomer && <AppSidebar />}

            {/* main replaces your old content div */}
            <main className="flex-1 h-full overflow-y-auto bg-gray-100 p-8 min-h-screen">
                <SidebarTrigger /> {/* replaces your CgMenuGridO hamburger */}
                <Outlet />         {/* replaces {children} */}
            </main>
        </SidebarProvider>
    );
};

export default CustomerLayout;
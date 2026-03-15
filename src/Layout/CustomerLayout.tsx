import { Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/Sidebar/AppSidebar";

const CustomerLayout = () => {
    const token = useAppSelector(selectCurrentToken);
    const user = token ? verifyToken(token) : null;
    const isCustomer = user?.activeRole === 'customer';

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
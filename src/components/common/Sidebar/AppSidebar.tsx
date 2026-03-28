import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { userSidebarItems, adminSidebarItems } from "./SidebarItem";
import bike from '../../../assets/logo/bikeLogo.png';
import { Settings } from "lucide-react";
import { useLocation } from "react-router-dom";
import { UserRole } from "@/components/constants/namingConstant";
import { useGetMyProfileQuery } from "@/lib/api/userApi";
import { useRoleSwitch } from "@/hooks/useRoleSwitch";
import { RoleSwitchDialog } from "./ui/RoleSwitchDialog";
import { UserProfilePopover } from "./ui/UserProfilePopover";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

interface SidebarItem {
    title: string;
    url: string;
    icon: React.ComponentType<{ className?: string }>;
    roles?: string[];
}

export function AppSidebar() {
    const { data: myProfile } = useGetMyProfileQuery();
    const { switchRole, isSwitching, targetRole } = useRoleSwitch();
    const { pathname } = useLocation();
    const user = useAppSelector(selectCurrentUser);
    const activeRole = user?.activeRole;

    const sidebarItems = activeRole === UserRole.ADMIN
        ? adminSidebarItems
        : userSidebarItems.filter((item: SidebarItem) =>
            !activeRole || (item.roles && item.roles.includes(activeRole))
        );

    return (
        <>
            <RoleSwitchDialog open={isSwitching} targetRole={targetRole} />
            <Sidebar collapsible="icon" className="w-72 border-r-2 border-r-sky-500">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarHeader className="flex flex-col items-center pb-3">
                            <img
                                src={bike}
                                alt="Dashboard Icon"
                                className="w-16 h-16 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10"
                            />
                            <p className="text-xl text-sky-500 font-semibold border-b-2 pb-2 border-b-sky-500 group-data-[collapsible=icon]:hidden">
                                Dashboard | SpeedX
                            </p>
                        </SidebarHeader>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {sidebarItems.map((item: SidebarItem) => (
                                    <SidebarMenuItem key={item.title} className="mt-3">
                                        <SidebarMenuButton
                                            asChild
                                            isActive={pathname === item.url}
                                            className="hover:bg-transparent focus:bg-transparent active:bg-transparent"
                                        >
                                            <a
                                                href={item.url}
                                                className="group flex items-center gap-3 p-2 rounded-lg hover:bg-sky-200 transition-colors data-[active=true]:bg-sky-400 data-[active=true]:text-white"
                                            >
                                                <item.icon className="w-8 h-8 shrink-0 text-gray-600 group-data-[active=true]:text-white" />
                                                <span className="font-medium group-data-[active=true]:text-white">{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup className="border-t border-gray-300 pt-2">
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        isActive={pathname === `/${user?.activeRole.toLowerCase()}/dashboard/settings`}
                                        asChild
                                    >
                                        <a
                                            href={`/${user?.activeRole.toLowerCase()}/dashboard/settings`}
                                            className="group flex items-center gap-3 p-2 rounded-lg hover:bg-sky-200 transition-colors data-[active=true]:bg-sky-400 data-[active=true]:text-white"
                                        >
                                            <Settings className="w-8 h-8 shrink-0 text-gray-600 group-data-[active=true]:text-white" />
                                            <span className="font-medium group-data-[active=true]:text-white">Settings</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <div className="flex gap-2">
                        <UserProfilePopover onSwitchRole={switchRole} />
                        <div>
                            <h1 className="font-semibold text-[15px] w-full truncate">
                                {myProfile?.data?.fullName || "Sourav Prodhan"}
                            </h1>
                            <p className="font-semibold text-[14px] text-sky-500">
                                {myProfile?.data?.email}
                            </p>
                        </div>
                    </div>
                </SidebarFooter>
            </Sidebar>
        </>
    );
}
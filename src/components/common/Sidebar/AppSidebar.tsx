import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar"
import { customerSidebarItems } from "./SidebarItem"
import bike from '../../../assets/logo/bikeLogo.png';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UpdateProfile from "@/utils/UpdateProfile";
import { Bell, LogOut, Settings } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentToken } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { useGetMyProfileQuery } from "@/redux/features/user/userReletedApi";
import { useLocation, useNavigate } from "react-router-dom";

export function AppSidebar() {
    const token = useAppSelector(selectCurrentToken);
    let user;
    if (token) {
        user = verifyToken(token);
    }
    const { data: myProfile } = useGetMyProfileQuery(user?.email);
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleLogOut = () => {
        dispatch(logout())
        navigate('/login')
    }
    const { pathname } = useLocation();
    return (
        <Sidebar collapsible="icon" className="w-72 border-r-2 border-r-sky-500">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarHeader className="flex flex-col items-center pb-3">
                        <img src={bike} alt="Dashboard Icon" className="w-16 h-16 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10" />
                        <p className="text-xl text-sky-500 font-semibold border-b-2 pb-2 border-b-sky-500 group-data-[collapsible=icon]:hidden">
                            Dashboard | SpeedX
                        </p>
                    </SidebarHeader>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {customerSidebarItems.map((item) => (
                                <SidebarMenuItem key={item.title} className="mt-3">
                                    <SidebarMenuButton asChild isActive={pathname === item.url} className="hover:bg-transparent focus:bg-transparent active:bg-transparent">
                                        <a
                                            href={item.url}
                                            className="group flex items-center gap-3 p-2 rounded-lg hover:bg-sky-200 transition-colors data-[active=true]:bg-sky-400 data-[active=true]:text-white"
                                        >
                                            <item.icon className="w-8 h-8 shrink-0 text-gray-600  group-data-[active=true]:text-white" />
                                            <span className="font-medium group-data-[active=true]:text-white">{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup className=" border-t border-gray-300 pt-2 ">
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton isActive={pathname === "/customer/dashboard/settings"} asChild>
                                    <a href="/customer/dashboard/settings" className="group flex items-center gap-3 p-2 rounded-lg hover:bg-sky-200 transition-colors data-[active=true]:bg-sky-400 data-[active=true]:text-white">
                                        <Settings className="w-8 h-8 shrink-0 text-gray-600  group-data-[active=true]:text-white" />
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
                    <Popover>
                        <PopoverTrigger asChild>
                            <span>
                                <Avatar className='flex justify-center cursor-pointer 2xl:w-[60px] 2xl:h-[60px] w-[45px] h-[45px] border border-sky-400'>
                                    <AvatarImage src={myProfile?.data?.image || "https://github.com/shadcn.png"} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </span>
                        </PopoverTrigger>
                        <PopoverContent className="relative lg:left-52 left-24">
                            <div>
                                <div className="flex gap-3 border-b border-sky-500 pb-4">
                                    <Avatar className='flex justify-center cursor-pointer 2xl:w-[60px] 2xl:h-[60px] w-[45px] h-[45px] border border-sky-400'>
                                        <AvatarImage src={myProfile?.data?.image || "https://github.com/shadcn.png"} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h1 className="font-semibold text-[15px]">
                                            {myProfile?.data?.name}
                                        </h1>
                                        <div className="flex items-center gap-1">
                                            <p className="font-semibold text-[14px] text-sky-500">
                                                {myProfile?.data?.email}
                                            </p>
                                            {
                                                user?.activeRole === 'admin' && <UpdateProfile {...myProfile?.data} />
                                            }
                                        </div>
                                    </div>
                                </div>
                                <ul className="divide-y">
                                    <li
                                        onClick={handleLogOut}
                                        className="mt-4  flex gap-2 cursor-pointer hover:bg-sky-500 p-1 hover:text-white">
                                        <LogOut className="relative top-1" size={18} /> Logout
                                    </li>
                                    <li className="mt-2  flex gap-2 cursor-pointer hover:bg-sky-500 p-1 hover:text-white">
                                        <Bell className="relative top-1" size={18} /> Notification
                                    </li>
                                </ul>
                            </div>
                        </PopoverContent>
                    </Popover>
                    <div>
                        <h1 className="font-semibold text-[15px]  w-full truncate">{myProfile?.data?.name}</h1>
                        <p className="font-semibold text-[14px] text-sky-500">
                            {myProfile?.data?.email}
                        </p>
                    </div>

                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
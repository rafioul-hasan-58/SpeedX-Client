// components/ui/UserProfilePopover.tsx
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, LogOut } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useGetMyProfileQuery } from "@/lib/api/userApi";
import { RoleSwitchButton } from "./RoleSwitchButton";

interface UserProfilePopoverProps {
    onSwitchRole: () => void;
}

export const UserProfilePopover = ({ onSwitchRole }: UserProfilePopoverProps) => {
    const { data: myProfile } = useGetMyProfileQuery();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <span>
                    <Avatar className='flex justify-center cursor-pointer 2xl:w-[60px] 2xl:h-[60px] w-[45px] h-[45px] border border-sky-400'>
                        <AvatarImage src={myProfile?.data?.profileImage || "https://github.com/shadcn.png"} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </span>
            </PopoverTrigger>
            <PopoverContent className="relative lg:left-52 left-24">
                <div>
                    <div className="flex gap-3 border-b border-sky-500 pb-4">
                        <Avatar className='flex justify-center cursor-pointer 2xl:w-[60px] 2xl:h-[60px] w-[45px] h-[45px] border border-sky-400'>
                            <AvatarImage src={myProfile?.data?.profileImage || "https://github.com/shadcn.png"} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="font-semibold text-[15px]">
                                {myProfile?.data?.fullName || "Sourav Prodhan"}
                            </h1>
                            <p className="font-semibold text-[14px] text-sky-500">
                                {myProfile?.data?.email}
                            </p>
                        </div>
                    </div>
                    <ul className="divide-y">
                        <RoleSwitchButton className="hover:bg-sky-500 mt-1" onClick={onSwitchRole} />
                        <li className="mt-2 flex gap-2 cursor-pointer hover:bg-sky-500 p-1 hover:text-white rounded-sm">
                            <Bell className="relative top-1" size={18} /> Notification
                        </li>
                        <li
                            onClick={handleLogOut}
                            className="mt-4 flex gap-2 cursor-pointer hover:bg-sky-500 p-1 hover:text-white rounded-sm"
                        >
                            <LogOut className="relative top-1" size={18} /> Logout
                        </li>
                    </ul>
                </div>
            </PopoverContent>
        </Popover>
    );
};
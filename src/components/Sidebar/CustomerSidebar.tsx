
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout, selectCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import bikeLogo from '../../assets/logo/bikeLogo.png'
import { verifyToken } from "../../utils/verifyToken";
import { IoHome } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { useGetMyProfileQuery } from "../../redux/features/admin/userManagement.Api";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { Bell, LogOut } from "lucide-react";
import { HiChevronUpDown } from "react-icons/hi2";
import { BsBag, BsBagCheck } from 'react-icons/bs';


const CustomerSidebar = () => {
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
    const items = [
        {
            title: "Home",
            url: "/",
            icon: IoHome
        },
        {
            title: "Add Product",
            url: "/customer/dashboard/add-product",
            icon: AiOutlineAppstoreAdd
        },
        {
            title: "My Products",
            url: "/customer/dashboard/my-added-products",
            icon: RxDashboard

        },
        {
            title: "My Orders",
            url: "/customer/my-orders",
            icon: BsBagCheck
        },
        {
            title: "My Cart",
            url: "/customer/cart",
            icon: BsBag
        },
    ]
    const { pathname } = useLocation();
    return (
        <aside className="  flex flex-col w-[310px] border-r-2 border-sky-400 h-screen px-5 py-8 overflow-y-auto bg-white ">
            <div className="hidden gap-4 lg:flex items-center justify-center ">
                <img className="w-16 h-16" src={bikeLogo} alt="" />
                <h1 className="text-sky-500 font-semibold text-2xl">SpeedX</h1>
            </div>
            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className="flex-1 -mx-3 space-y-4 ">
                    <div className="relative mx-3">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </span>
                        <input type="text" className="w-full py-1.5 pl-10 pr-4 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 border-gray-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search" />
                    </div>
                    <aside className="space-y-3 p-1">
                        {
                            items.map((item) => (
                                <NavLink key={item.url} to={item.url} className={
                                    `px-2 w-[260px]p flex items-center gap-2  py-2 text-gray-600 transition-colors duration-300 transform ${pathname === item.url ? "bg-sky-400 font-semibold text-white hover:bg-sky-500" : "hover:bg-sky-500 hover:text-white"}`
                                }>
                                    <item.icon className="text-xl" />
                                    <span className=" text-sm font-medium">{item.title}</span>
                                </NavLink>
                            ))
                        }
                    </aside>
                </nav>
            </div>
            <div>
                <div className="flex gap-2">
                    <Avatar >
                        <AvatarImage
                            className="relative top-1 rounded-full border border-sky-500"
                            src={myProfile?.image || "https://github.com/shadcn.png"}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="font-semibold text-[15px]  w-full truncate">{myProfile?.data?.name}</h1>
                        <p className="font-semibold text-[14px] text-sky-500">
                            {myProfile?.data?.email}
                        </p>
                    </div>
                    <Popover>
                        <PopoverTrigger>
                            <HiChevronUpDown className=" text-xl ml-16 cursor-pointer" />
                        </PopoverTrigger>
                        <PopoverContent className="relative left-52">
                            <div>
                                <div className="flex gap-3 border-b border-sky-500 pb-4">
                                    <Avatar>
                                        <AvatarImage
                                            className="relative top-1 w-[44px] h-[44px] rounded-full border border-sky-500"
                                            src={myProfile?.image || "https://github.com/shadcn.png"}
                                        />
                                    </Avatar>
                                    <div>
                                        <h1 className="font-semibold text-[15px]">
                                            {myProfile?.data?.name}
                                        </h1>
                                        <p className="font-semibold text-[14px] text-sky-500">
                                            {myProfile?.data?.email}
                                        </p>
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
                </div>

            </div>

        </aside >
    );
};

export default CustomerSidebar;


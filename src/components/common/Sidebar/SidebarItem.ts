import { BsBag, BsBagCheck } from "react-icons/bs";
import { HiUsers } from "react-icons/hi2";
import { IoBarChartSharp, IoHome } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { UserRole } from "@/components/constants/namingConstant";
import { MessageCircle } from "lucide-react";

export const userSidebarItems = [
    {
        title: "Home",
        url: "/",
        icon: IoHome,
        roles: [UserRole.CUSTOMER, UserRole.SELLER]
    },
    {
        title: "Inbox",
        url: "/seller/dashboard/inbox",
        icon: MessageCircle,
        roles: [UserRole.SELLER]
    },
    {
        title: "My Bikes",
        url: "/seller/dashboard/my-added-bikes",
        icon: RxDashboard,
        roles: [UserRole.SELLER]
    },

    {
        title: "Orders",
        url: "/customer/dashboard/my-orders",
        icon: BsBagCheck,
        roles: [UserRole.CUSTOMER]
    },
    {
        title: "My Cart",
        url: "/customer/cart",
        icon: BsBag,
        roles: [UserRole.CUSTOMER]
    },
]

export const adminSidebarItems = [
    {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: IoBarChartSharp,
        roles: [UserRole.ADMIN]
    },
    {
        title: "Users",
        url: "/admin/users",
        icon: HiUsers,
        roles: [UserRole.ADMIN]
    },
    {
        title: "All Bikes",
        url: "/admin/all-bikes",
        icon: RxDashboard,
        roles: [UserRole.ADMIN]
    },
    {
        title: "All Orders",
        url: "/admin/all-orders",
        icon: BsBagCheck,
        roles: [UserRole.ADMIN]
    },
]
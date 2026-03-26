import { LuBadgeInfo } from 'react-icons/lu';
import { FaMotorcycle } from "react-icons/fa";
import { BsBag, BsBagCheck } from 'react-icons/bs';
import { IoHome } from 'react-icons/io5';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { UserRole } from '../constants/namingConstant';
export const navItems = [
    {
        title: "Home",
        url: "/",
        icon: IoHome,
        roles: [UserRole.CUSTOMER, UserRole.SELLER]
    },
    {
        title: "Dashboard",
        url: "/seller/dashboard/my-added-bikes",
        icon: MdOutlineSpaceDashboard,
        roles: [UserRole.SELLER]
    },
    {
        title: "Bikes",
        url: "/customer/all-bikes?bikeType=bike",
        icon: FaMotorcycle,
        roles: [UserRole.CUSTOMER]
    },
    {
        title: "My Orders",
        url: "/customer/dashboard/my-orders",
        icon: BsBagCheck,
        roles: [UserRole.CUSTOMER]
    },
    {
        title: "About",
        url: "/customer/about",
        icon: LuBadgeInfo,
        roles: [UserRole.CUSTOMER, UserRole.SELLER]
    },
    {
        title: "Scooters",
        url: "/customer/all-bikes?bikeType=scooter",
        icon: FaMotorcycle,
        roles: [UserRole.CUSTOMER]
    },
    {
        title: "Sell Now",
        url: "/customer/dashboard/add-product",
        icon: FaMotorcycle,
        roles: [UserRole.SELLER]
    },
    {
        title: "My Cart",
        url: "/customer/cart",
        icon: BsBag,
        roles: [UserRole.CUSTOMER]
    }
]
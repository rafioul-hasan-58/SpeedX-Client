import { LuBadgeInfo } from 'react-icons/lu';
import { FaMotorcycle } from "react-icons/fa";
import { BsBag, BsBagCheck } from 'react-icons/bs';
import { IoHome } from 'react-icons/io5';
import { MdOutlineSpaceDashboard } from 'react-icons/md';

export const navItems = [
    {
        title: "Home",
        url: "/",
        icon: IoHome
    },
    {
        title: "Dashboard",
        url: "/customer/dashboard/my-added-bikes",
        icon: MdOutlineSpaceDashboard  
    },
    {
        title: "Bikes",
        url: "/customer/all-bikes?bikeType=bike",
        icon: FaMotorcycle
    },

    {
        title: "My Orders",
        url: "/customer/dashboard/my-orders",
        icon: BsBagCheck
    },
    {
        title: "About",
        url: "/customer/about",
        icon: LuBadgeInfo
    },
    {
        title: "Scooters",
        url: "/customer/all-bikes?bikeType=scooter",
        icon: FaMotorcycle
    },
    {
        title: "Upcoming",
        url: "/customer/upcoming-products",
        icon: FaMotorcycle
    },
    {
        title: "Sell Now",
        url: "/customer/dashboard/add-product",
        icon: FaMotorcycle
    },
    {
        title: "Accessories",
        url: "/customer/upcoming-products",
        icon: FaMotorcycle
    },
    {
        title: "Servicing",
        url: "/customer/upcoming-products",
        icon: FaMotorcycle
    },
    {
        title: "Blogs",
        url: "/customer/upcoming-products",
        icon: FaMotorcycle
    }, {
        title: "My Cart",
        url: "/customer/cart",
        icon: BsBag
    },
]
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { BsBag, BsBagCheck } from "react-icons/bs";
import { HiUsers } from "react-icons/hi2";
import { IoBarChartSharp, IoHome } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";

export const customerSidebarItems = [
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
        title: "Orders",
        url: "/customer/dashboard/my-orders",
        icon: BsBagCheck,

    },
    {
        title: "My Cart",
        url: "/customer/cart",
        icon: BsBag
    },
]

export const adminSidebarItems = [
    {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: IoBarChartSharp
    },
    {
        title: "Add Product",
        url: "/admin/add-product",
        icon: AiOutlineAppstoreAdd
    },
    {
        title: "Users",
        url: "/admin/users",
        icon: HiUsers

    },
    {
        title: "All Products",
        url: "/admin/all-products",
        icon: RxDashboard
    },
    {
        title: "All Orders",
        url: "/admin/all-orders",
        icon: BsBagCheck
    },
]
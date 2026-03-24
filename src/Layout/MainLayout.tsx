import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import NavBar from "@/components/footer/NavBar";
import ProductCart from "@/components/Card/ProductCart";
import { useEffect, useState } from "react";
import FloatingChatbot from "@/components/common/FloatingChatBot";

const MainLayout = () => {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <div>
            <NavBar />
            {isLargeScreen && <ProductCart />}
            <FloatingChatbot />
            <div className={"bg-gray-100 pt-24 w-full"}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;

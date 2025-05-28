import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import NavBar from "@/components/footer/NavBar";
import ProductCart from "@/components/Card/ProductCart";



const MainLayout = () => {
    return (
        <div>
            <div className="">
                <NavBar />
            </div>
            <ProductCart />
            <div className="bg-gray-100 relative top-40">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>

        </div>
    );
};

export default MainLayout;
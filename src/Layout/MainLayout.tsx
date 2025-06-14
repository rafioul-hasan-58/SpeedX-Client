import { Outlet} from "react-router-dom";
import Footer from "../components/footer/Footer";
import NavBar from "@/components/footer/NavBar";
import ProductCart from "@/components/Card/ProductCart";

const MainLayout = () => {

    return (
        <div>
            <NavBar />
            <ProductCart />
            <div className={"bg-gray-100 pt-32"}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;

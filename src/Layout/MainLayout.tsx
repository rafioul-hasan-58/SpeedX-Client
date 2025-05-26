import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import NavBar from "@/components/footer/NavBar";



const MainLayout = () => {
    return (
        <div>
            <div className="">
                <NavBar/>
            </div>
            <div className="bg-gray-100 relative top-40">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;
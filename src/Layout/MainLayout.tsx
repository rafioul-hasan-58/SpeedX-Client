import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/footer/Footer";



const MainLayout = () => {
    return (
        <div>
            <div className="">
                <Nav />
            </div>
            <div className="bg-gray-100 ">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;
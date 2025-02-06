import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/footer/Footer";
const MainLayout = () => {
    return (
        <div>
            <Nav />
            <div className="bg-gray-100">
                <Outlet></Outlet>
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
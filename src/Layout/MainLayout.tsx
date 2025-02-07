import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const MainLayout = () => {
    return (
        <div>
            <Nav />
            <div className="bg-gray-100">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default MainLayout;
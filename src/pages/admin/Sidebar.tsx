import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { LuLogIn, LuUsersRound } from "react-icons/lu";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoIosLogOut, IoMdSettings } from "react-icons/io";
import { logout, selectCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import bike from '../../assets/logo/bikeLogo.png'
import { verifyToken } from "../../utils/verifyToken";
import { IoBarChartSharp} from "react-icons/io5";
const Sidebar = () => {
    const token = useAppSelector(selectCurrentToken);
    let user;

    if (token) {
        user = verifyToken(token);
    }
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleLogOut = () => {
        dispatch(logout())
        navigate('/login')
    }
    return (
        <aside className=" border border-gray-300 flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white ">
            <div className="lg:block hidden gap-1">
                <img className="w-16 h-16" src={bike} alt="" />
                <h1 className="text-xl italic font-bold relative bottom-5 text-sky-600">Mousby</h1>
            </div>

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className="flex-1 -mx-3 space-y-3 ">
                    <div className="relative mx-3">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </span>
                        <input type="text" className="w-full py-1.5 pl-10 pr-4 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 border-gray-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search" />
                    </div>
                    <NavLink to='/admin/dashboard' className={({ isActive }) =>
                        `flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform   ${isActive ? 'bg-sky-400 text-white  font-semibold hover:bg-sky-500' : ''}`
                    }>
                        <IoBarChartSharp className="text-xl" />
                        <span className="mx-2 text-sm font-medium">Dashboard</span>
                    </NavLink>
                    <NavLink to='/admin/add-product' className={({ isActive }) =>
                        `flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform   ${isActive ? 'bg-sky-400 text-white  font-semibold hover:bg-sky-500' : ''}`
                    }>
                        <AiOutlineAppstoreAdd className="text-xl" />
                        <span className="mx-2 text-sm font-medium">Add Product</span>
                    </NavLink>
                    <NavLink to='/admin/users' className={({ isActive }) =>
                        `flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform   ${isActive ? 'bg-sky-400 text-white  font-semibold hover:bg-sky-500' : ''}`
                    }>
                        <LuUsersRound className="text-xl" />
                        <span className="mx-2 text-sm font-medium">Users</span>
                    </NavLink>

                    <NavLink to='/admin/all-product' className={({ isActive }) =>
                        `flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform   ${isActive ? 'bg-sky-400 text-white  font-semibold hover:bg-sky-500' : ''}`
                    }>
                        <GiFullMotorcycleHelmet className="text-xl" />
                        <span className="mx-2 text-sm font-medium">All Products</span>
                    </NavLink>
                </nav>

                <div className="relative right-2.5">
                    <NavLink to='/my-profile' className={({ isActive }) =>
                        `flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform   ${isActive ? 'bg-sky-400 text-white  font-semibold hover:bg-sky-500' : ''}`
                    }>
                        <IoMdSettings className="text-xl" />
                        <span className="mx-2 text-sm font-medium">Profile</span>
                    </NavLink>
                    {
                        user ? <div onClick={handleLogOut} className="flex relative left-1 gap-1 mt-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                            <IoIosLogOut className="text-xl" />
                            <span className="relative bottom-1">Logout</span>
                        </div> : <Link to='/login'>
                            <div className="flex gap-1 mt-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                                <LuLogIn className="text-xl" />
                                <span className="relative bottom-1">Login</span>
                            </div>
                        </Link>
                    }
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
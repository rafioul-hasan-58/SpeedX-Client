import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import SearchLogo from "./NavBar/SearchLogo";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate()
    const user = useAppSelector(selectCurrentUser);
    if (!user) {
        navigate('/login')
    }
    return (
        <div className="relative">
            <div className={`top-0 left-0 w-full  p-4 transition-transform duration-500 ${isVisible ? "translate-y-0" : "-translate-y-full fixed"
                }`}>
                <SearchLogo />
                <nav className=" h-[40px]   w-full ">
                    <div className="container px-6 py-3 mx-auto md:flex">
                        <div className="lg:relative top-2">
                            {/* Mobile menu button */}
                            <div className="flex lg:hidden">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    type="button"
                                    className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                                    aria-label="toggle menu"
                                >
                                    {isOpen ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu */}
                        <div
                            className={`lg:flex absolute lg:relative inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out  md:mt-0 md:p-0 md:top-0 md:relative md:flex md:items-center md:justify-between ${isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full md:opacity-100 md:translate-x-0"
                                }`}
                        >
                            <div className="flex flex-col px-2 -mx-4 md:flex-row md:mx-10 md:py-0 lg:gap-3">
                                <NavLink className={({ isActive }) =>
                                    `text-gray-500   ${isActive && 'text-sky-400 font-semibold'}`
                                } to='/customer/dash-board'>
                                    DASHBOARD
                                </NavLink>
                                <NavLink className={({ isActive }) =>
                                    `text-gray-500   ${isActive && 'text-sky-400 font-semibold'}`
                                } to='/all-products'>
                                    ALL PRODUCTS
                                </NavLink>
                                <NavLink className={({ isActive }) =>
                                    `text-gray-500   ${isActive && 'text-sky-400 font-semibold'}`
                                } to='/'>
                                    ABOUT
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div className={`mx-3 cursor-pointer ${isVisible ? 'relative bottom-5' : 'mt-5'}`}>
                {
                    isVisible ? < MdExpandLess onClick={() => setIsVisible(!isVisible)} className="text-2xl text-sky-400" /> : <MdExpandMore onClick={() => setIsVisible(!isVisible)} className="text-2xl text-sky-400" />
                }
            </div>
        </div>
    );
};

export default Nav;
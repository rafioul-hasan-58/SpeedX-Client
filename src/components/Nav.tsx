import { useState } from "react";
import bike from '../assets/logo/bikeLogo.png'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, selectCurrentUser } from "../redux/features/auth/authSlice";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { Button } from "antd";
import img from '../assets/logo/callLogo.png';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
const Nav = () => {
    const { handleSubmit, register } = useForm()
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectCurrentUser);
    if (!user) {
        navigate('/login')
    }
    const onSearch: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    }
    return (
        <div className="relative">
            <div className={`top-0 left-0 w-full  p-4 transition-transform duration-500 ${isVisible ? "translate-y-0" : "-translate-y-full fixed"
                }`}>
                {/* search logo */}
                <div>
                    <nav className=" my-3  px-20 border-b-[1px] border-b-gray-200">
                        <div className="flex items-center justify-between">
                            {/* Left side */}
                            <div className="flex gap-20 items-center ">
                                <div className="lg:block hidden gap-1">
                                    <img className="w-16 h-16" src={bike} alt="" />
                                    <h1 className="text-xl italic font-bold relative bottom-5 text-sky-600">Mousby</h1>
                                </div>
                                <div className="flex items-center">
                                    <form onSubmit={handleSubmit(onSearch)}>
                                        <input
                                            {...register('search')}
                                            style={{ borderRadius: '100px 0px 0px 100px' }}
                                            className="h-[44px] lg:w-[380px] border pl-7 placeholder-gray-600 border-gray-400 focus:outline-none"
                                            type="text"
                                            placeholder="Search Bike here"
                                        />
                                        <button type="submit">
                                            <div style={{ borderRadius: '0px 20px 20px 0px' }} className="relative top-[15.5px] bg-sky-400 px-5 h-[44px] cursor-pointer rounded-r-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="relative top-3 feather feather-search text-white" width="22" height="22">
                                                    <circle cx="11" cy="11" r="8"></circle>
                                                    <line x1="16" y1="16" x2="21" y2="21"></line>
                                                </svg>
                                            </div>
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Right side */}
                            <div className="flex items-center gap-6">
                                <div className="  md:flex items-center lg:relative right-32">
                                    <div className="border-gray-200 rounded-full border p-2 mr-3">
                                        <img className="h-6 w-6" src={img} alt="Support Logo" />
                                    </div>
                                    <div className="text-sky-400">
                                        <p>Support & order</p>
                                        <p>01752966422</p>
                                    </div>
                                </div>
                                {
                                    user ?
                                        <div onClick={() => dispatch(logout())} className="flex bg-sky-400 px-3 py-2 rounded-full items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="relative  left-2 z-40 feather text-white feather-user" width="18" height="18">
                                                <path d="M12 2C10.343 2 9 3.343 9 5s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zM12 13c-4.418 0-8 2.239-8 5v2h16v-2c0-2.761-3.582-5-8-5z"></path>
                                            </svg>
                                            <Button className="focus:outline-none px-3 py-2" style={{ border: '1px solid #38bdf8', backgroundColor: '#38bdf8', color: 'white' }}>LogOut</Button>
                                        </div> : <Link to='/login'>
                                            <div className="flex bg-sky-400 px-3 py-2 rounded-full items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="relative  left-2 z-40 feather text-white feather-user" width="18" height="18">
                                                    <path d="M12 2C10.343 2 9 3.343 9 5s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zM12 13c-4.418 0-8 2.239-8 5v2h16v-2c0-2.761-3.582-5-8-5z"></path>
                                                </svg>
                                                <Button className="focus:outline-none px-3 py-2" style={{ border: '1px solid #38bdf8', backgroundColor: '#38bdf8', color: 'white' }}>Login</Button>
                                            </div>
                                        </Link>
                                }
                            </div>
                        </div>
                    </nav>
                </div>
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
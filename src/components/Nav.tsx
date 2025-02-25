import { useState } from "react";
import bike from '../assets/logo/bikeLogo.png'
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, selectCurrentUser } from "../redux/features/auth/authSlice";
import { Button } from "antd";
import img from '../assets/logo/callLogo.png';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { setSearchTerm } from "../redux/features/user/userSlice";
import { useGetMyProfileQuery, useUpdateProfileMutation } from "../redux/features/admin/userManagement.Api";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "../components/ui/popover"
import { RxDashboard } from "react-icons/rx";
import { MdOutlineBarChart } from "react-icons/md";
import { FaGoogleWallet } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { toast } from "sonner";
import { LuBadgeInfo, LuLoaderCircle } from "react-icons/lu";
import { IoHome } from "react-icons/io5";
const Nav = () => {
    const { handleSubmit, register } = useForm()
    const [isOpen, setIsOpen] = useState(false);
    // const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectCurrentUser);
    // if (!user) {
    //     navigate('/login')
    // }
    const onSearch: SubmitHandler<FieldValues> = (data) => {
        dispatch(setSearchTerm(data.searchTerm))

    }
    const { data } = useGetMyProfileQuery(user?.email)
    const realUser = data?.data
    const [updateUser, { isLoading }] = useUpdateProfileMutation()
    const handleProfileUpdate: SubmitHandler<FieldValues> = async (data) => {
        const updateData = {
            name: data.name,
            email: data.email
        }
       
        const finalData = {
            id: realUser?._id,
            data: updateData
        }
        const res = await updateUser(finalData)
        if (res?.data?.success) {
            toast.success('Profile Updated Successfully')
            setIsOpen(false)
        }
    }
    return (
        <div className=" h-[190px]">
            <div className={`top-0 left-0 w-full  p-4 transition-transform duration-500`}>
                {/* search logo */}
                <div>
                    <nav className=" my-3  px-20 border-b-[1px] border-b-gray-200">
                        <div className="flex items-center justify-between">
                            {/* Left side */}
                            <div className="flex gap-20 items-center ">
                                <div className="lg:block hidden gap-1">
                                    <img className="w-16 h-16" src={bike} alt="" />
                                    <h1 className="text-xl italic font-bold relative bottom-5 text-sky-600">SpeedX</h1>
                                </div>
                                <div className="flex items-center">
                                    <form onChange={handleSubmit(onSearch)}>
                                        <input
                                            {...register('searchTerm')}
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
                                        <div className="flex gap-2">
                                            <div className="text-3xl text-sky-500 relative right-5 top-2 cursor-pointer">
                                                <Link to='/'><IoHome /></Link>
                                            </div>
                                            <div>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <img
                                                            className="border border-sky-400 cursor-pointer w-[50px] h-[50px] rounded-full"
                                                            src={realUser?.image}
                                                            alt="Profile"
                                                        />
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-80 border border-sky-500bg-gradient-to-b from-sky-400 to-gray-100 mr-3 mt-2">
                                                        <div className="">
                                                            <div className="flex justify-center">
                                                                <img className="border border-sky-400 cursor-pointer w-[50px] h-[50px] rounded-full" src={realUser?.image} alt="" />
                                                            </div>
                                                            <h1 className="text-xl font-semibold text-center py-2">{realUser?.name}</h1>
                                                            <div className="flex justify-center">
                                                                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                                                    <DialogTrigger asChild>
                                                                        <Button style={{ backgroundColor: '#0EA5E9', color: 'white' }}>Edit Profile</Button>
                                                                    </DialogTrigger>
                                                                    <DialogContent className="sm:max-w-[425px]">
                                                                        <DialogHeader>
                                                                            <DialogTitle>Edit profile</DialogTitle>
                                                                            <DialogDescription>
                                                                                Make changes to your profile here. Click save when you're done.
                                                                            </DialogDescription>
                                                                        </DialogHeader>
                                                                        <div className="grid gap-4 py-4">
                                                                            <form onSubmit={handleSubmit(handleProfileUpdate)}>
                                                                                <div className="mb-4 flex ">
                                                                                    <p className="text-left w-[65px] mt-1">Name</p>
                                                                                    <input
                                                                                        className=" w-[300px] lg:px-3 py-2 leading-tight text-gray-700 border rounded border-gray-300  appearance-none focus:outline-none focus:border-black bg-white"
                                                                                        defaultValue={realUser?.name}
                                                                                        {...register('name')}
                                                                                        name='name'
                                                                                        type="text"
                                                                                        placeholder="Name"
                                                                                    />
                                                                                </div>
                                                                                <div className="mb-4 flex ">
                                                                                    <p className="text-left mt-1 w-[65px]">Image</p>
                                                                                    <input
                                                                                        className=" w-[300px] lg:px-3 py-2 leading-tight text-gray-700 border rounded border-gray-300  appearance-none focus:outline-none focus:border-black bg-white"
                                                                                        {...register('image')}
                                                                                        defaultValue={realUser?.image}
                                                                                        name='image'
                                                                                        type="url"
                                                                                        placeholder="Image"
                                                                                    />
                                                                                </div>
                                                                                <div className="mb-4 flex ">
                                                                                    <p className="text-left mt-1 w-[65px]">Email</p>
                                                                                    <input
                                                                                        className=" w-[300px] lg:px-3 py-2 leading-tight text-gray-700 border rounded border-gray-300  appearance-none focus:outline-none focus:border-black bg-white"
                                                                                        defaultValue={realUser?.email}
                                                                                        disabled
                                                                                        {...register('email')}
                                                                                        name='email'
                                                                                        type="text"
                                                                                        placeholder="Email"
                                                                                    />
                                                                                </div>

                                                                                <DialogFooter>
                                                                                    <Button style={{ backgroundColor: '#0EA5E9', color: 'white' }} htmlType="submit">{isLoading ? <LuLoaderCircle className="animate-spin " /> : 'Save Changes'}</Button>
                                                                                </DialogFooter>
                                                                            </form>
                                                                        </div>

                                                                    </DialogContent>
                                                                </Dialog>
                                                            </div>

                                                            <div className="block">
                                                                <ul className="divide-y divide-gray-300  mt-2">
                                                                    <li className="hover:bg-sky-400 hover:text-white py-1 px-2 w-full">
                                                                        <NavLink className={`flex gap-1`} to='/customer/all-products' ><RxDashboard className="relative top-1" />All Products</NavLink>
                                                                    </li>
                                                                    <li className="hover:bg-sky-400 hover:text-white py-1 px-2 w-full">
                                                                        <NavLink className={`flex gap-1`} to='/customer/dashboard'><MdOutlineBarChart className="relative top-1" />Dashboard</NavLink>
                                                                    </li>
                                                                    <li className="hover:bg-sky-400 hover:text-white py-1 px-2 w-full">
                                                                        <NavLink className={`flex gap-1`} to='/customer/about'><LuBadgeInfo
                                                                            className="relative top-1" />About</NavLink>
                                                                    </li>
                                                                    <li className="hover:bg-sky-400 hover:text-white py-1 px-2 w-full">
                                                                        <NavLink className={`flex gap-1`} to='/customer/my-orders'><FaGoogleWallet className="relative top-1" />Orders</NavLink>
                                                                    </li>
                                                                    <li onClick={() => dispatch(logout())} className="hover:bg-sky-400  hover:text-white py-1 px-2 w-full">
                                                                        <NavLink className={`flex gap-1`} to='/customer/my-orders'> <IoIosLogOut className="relative top-1.5" />Logout</NavLink>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>

                                            </div>
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
                                } to='/'>
                                    DASHBOARD
                                </NavLink>
                                <NavLink className={({ isActive }) =>
                                    `text-gray-500   ${isActive && 'text-sky-400 font-semibold'}`
                                } to='/customer/all-products'>
                                    ALL PRODUCTS
                                </NavLink>
                                <NavLink className={({ isActive }) =>
                                    `text-gray-500   ${isActive && 'text-sky-400 font-semibold'}`
                                } to='/customer/my-orders'>
                                    MY ORDERS
                                </NavLink>
                                <NavLink className={({ isActive }) =>
                                    `text-gray-500   ${isActive && 'text-sky-400 font-semibold'}`
                                } to='/customer/about'>
                                    ABOUT
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Nav;
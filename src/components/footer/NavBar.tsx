import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import bike from '../../assets/logo/bikeLogo.png';
import call from '../../assets/logo/callLogo.png';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setSearchTerm } from '@/redux/features/user/userSlice';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { IoHome } from 'react-icons/io5';
import { Avatar, AvatarImage } from '../ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { logout, selectCurrentUser } from '@/redux/features/auth/authSlice';
import { useGetMyProfileQuery } from '@/redux/features/admin/userManagement.Api';
import { LuBadgeInfo } from 'react-icons/lu';
import { FaMotorcycle } from "react-icons/fa";
import { BsBag, BsBagCheck } from 'react-icons/bs';
import { LogOut, User } from 'lucide-react';
import UpdateProfile from '@/utils/UpdateProfile';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import MobileNav from '../Navbar/MobileSheet';
import MobileMenuCart from '../Navbar/MovileMenuCart';

const NavBar = () => {
    const items = [
        {
            title: "Home",
            url: "/",
            icon: IoHome
        },
        {
            title: "Dashboard",
            url: "/customer/dashboard/my-added-products",
            icon: IoHome
        },
        {
            title: "Bikes",
            url: "/customer/all-bikes?bikeType=bike",
            icon: FaMotorcycle
        },

        {
            title: "My Orders",
            url: "/customer/dashboard/my-orders",
            icon: BsBagCheck
        },
        {
            title: "About",
            url: "/customer/about",
            icon: LuBadgeInfo
        },
        {
            title: "Scooters",
            url: "/customer/all-bikes?bikeType=scooter",
            icon: FaMotorcycle
        },
        {
            title: "Upcoming",
            url: "/customer/upcoming-products",
            icon: FaMotorcycle
        },
        {
            title: "Sell Now",
            url: "/customer/dashboard/add-product",
            icon: FaMotorcycle
        },
        {
            title: "Accessories",
            url: "/customer/upcoming-products",
            icon: FaMotorcycle
        },
        {
            title: "Servicing",
            url: "/customer/upcoming-products",
            icon: FaMotorcycle
        },
        {
            title: "Blogs",
            url: "/customer/upcoming-products",
            icon: FaMotorcycle
        }, {
            title: "My Cart",
            url: "/customer/cart",
            icon: BsBag
        },
    ]
    const dispatch = useAppDispatch();
    const form = useForm();
    const { register, handleSubmit } = form;
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        dispatch(setSearchTerm(data.searchTerm));
    }
    const user = useAppSelector(selectCurrentUser);
    const { data } = useGetMyProfileQuery(user?.email);
    const myProfile = data?.data;

    // Scroll hide logic
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    const { pathname, search } = useLocation();
    return (
        <nav className="fixed bg-white z-50 w-full overflow-y-auto lg:pb-0 pb-[65px] lg:border-none border-b border-b-sky-500">
            <section className="flex  lg:px-20  lg:pb-1  w-full items-center gap-3 lg:border lg:border-b">
                <aside className="flex w-[50%] justify-between">
                    <section className='mt-4 ml-4'>
                        <MobileNav />
                    </section>
                    <section className='lg:mt-0 mt-2 lg:ml-0 ml-28  lg:block flex gap-1 justify-center'>
                        <img className="lg:w-16 lg:h-16 w-14 h-14" src={bike} alt="" />
                        <h1 className="text-xl italic font-bold relative lg:bottom-5 text-sky-600 lg:top-0 top-1.5">SpeedX</h1>
                    </section>
                    <section>
                        <div className=" flex lg:mt-10 mt-8 lg:relative absolute bottom-[15px] right-[17px] justify-center">
                            <form onChange={handleSubmit(onSubmit)} className='w-full'>
                                <div className='flex lg:mx-0'>
                                    <input
                                        {...register("searchTerm")}
                                        style={{ borderRadius: '100px 0px 0px 100px' }}
                                        className="h-[40px] lg:w-[350px] w-[320px] border pl-7 placeholder-gray-600 border-gray-400 focus:outline-none"
                                        type="text"
                                        placeholder="Search Bike Here..."
                                    />
                                    <button >
                                        <div style={{ borderRadius: '0px 20px 20px 0px' }} className=" bg-sky-400 px-4 h-[40px] cursor-pointer rounded-r-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative top-2.5 feather feather-search text-white" width="22" height="22">
                                                <circle cx="11" cy="11" r="8"></circle>
                                                <line x1="16" y1="16" x2="21" y2="21"></line>
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>
                </aside>
                <aside className='w-[50%]  flex justify-between items-center lg:ml-20'>
                    <section className='lg:block hidden'>
                        <div className="flex gap-4 items-center">
                            <div className="border-gray-200 border rounded-full p-2">
                                <img className="h-6 w-6" src={call} alt="Support Logo" />
                            </div>
                            <div className="text-sky-400">
                                <p>Support & order</p>
                                <p>01752966422</p>
                            </div>
                        </div>
                    </section>
                    <section className='flex items-center gap-5'>
                        <div className="lg:block hidden text-3xl text-sky-500 cursor-pointer">
                            <Link to='/'><IoHome /></Link>
                        </div>
                        <div className='flex lg:relative gap-2 absolute right-5 top-4 lg:top-0 lg:right-0 '>
                            {/* profile */}
                            {
                                user ? <div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Avatar className='relative left-0 cursor-pointer lg:w-[50px] w-[40px] h-[40px] lg:h-[50px] border border-sky-400'>
                                                <AvatarImage src={myProfile?.image || "https://github.com/shadcn.png"} />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </PopoverTrigger>
                                        <PopoverContent className=' mr-10 max-w-[90vw] overflow-hidden'>
                                            <article>
                                                <div className='flex justify-center'>
                                                    <Avatar className='flex justify-center cursor-pointer w-[50px] h-[50px] border border-sky-400'>
                                                        <AvatarImage src={myProfile?.image || "https://github.com/shadcn.png"} />
                                                        <AvatarFallback>CN</AvatarFallback>
                                                    </Avatar>
                                                </div>
                                                <h1 className="text-xl font-semibold text-center py-2">{myProfile?.name}</h1>
                                                <div className='flex justify-center'>
                                                    {myProfile && (
                                                        <UpdateProfile {...myProfile} />
                                                    )}
                                                </div>
                                                <ul className='divide-y'>
                                                    {
                                                        items.slice(0, 4).map((nav) => (
                                                            <li key={nav.title} className="hover:bg-sky-400 hover:text-white py-1 px-2 w-full ">
                                                                <NavLink className={`flex items-center gap-2`} to={nav.url} >
                                                                    <nav.icon />
                                                                    {nav.title}
                                                                </NavLink>
                                                            </li>
                                                        ))
                                                    }
                                                    <li onClick={() => {
                                                        dispatch(logout())
                                                    }} className="hover:bg-sky-400 hover:text-white py-1 px-2 w-full flex items-center gap-2 cursor-pointer">
                                                        <LogOut size={18} />
                                                        Logout
                                                    </li>
                                                </ul>
                                            </article>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                    :
                                    <Link to='/login'>
                                        <Button className="focus:outline-none py-5 bg-sky-400 hover:bg-sky-500  text-white rounded-full"><User /> Login</Button>
                                    </Link>
                            }
                            <Link to={'/customer/cart'} className='lg:hidden'>
                                <MobileMenuCart />
                            </Link>
                        </div>
                    </section>
                </aside>
            </section>
            {/* main nav section */}
            <section
                className={`overflow-hidden transition-all duration-300 ease-in-out lg:block hidden bg-white px-20 ${visible ? 'max-h-20 py-4' : 'max-h-0 py-0'
                    }`}
            >

                <ul className='flex gap-4'>
                    {
                        items.map((nav) => (
                            <NavLink key={nav.title} className={
                                `text-sm text-gray-500 uppercase font-semibold ${pathname + search === nav.url ? 'text-sky-400' : ''}`
                            } to={nav.url}>
                                {nav.title}
                            </NavLink>
                        ))
                    }
                </ul>
            </section>
        </nav>
    );
};

export default NavBar;
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import bike from '../../assets/logo/bikeLogo.png';
import call from '../../assets/logo/callLogo.png';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setSearchTerm } from '@/redux/features/user/userSlice';
import { Link, NavLink } from 'react-router-dom';
import { IoHome } from 'react-icons/io5';
import { Avatar, AvatarImage } from '../ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { logout, selectCurrentUser } from '@/redux/features/auth/authSlice';
import { useGetMyProfileQuery } from '@/redux/features/admin/userManagement.Api';
import { LuBadgeInfo } from 'react-icons/lu';
import { FaMotorcycle } from "react-icons/fa";
import { BsBagCheck } from 'react-icons/bs';
import { LogOut } from 'lucide-react';
import UpdateProfile from '@/utils/UpdateProfile';

const NavBar = () => {
    const items = [
        {
            title: "Home",
            url: "/",
            icon: IoHome
        },
        {
            title: "Bikes",
            url: "/customer/all-bikes",
            icon: FaMotorcycle
        },
        {
            title: "My Orders",
            url: "/customer/my-orders",
            icon: BsBagCheck
        },
        {
            title: "About",
            url: "/customer/about",
            icon: LuBadgeInfo
        }
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

    return (
        <nav className='fixed bg-white z-50 w-full mb-4'>
            <section className="flex px-20 pt-8 pb-2 w-full items-center gap-3 border border-b">
                <aside className="flex w-[50%] justify-between">
                    <section>
                        <img className="w-16 h-16" src={bike} alt="" />
                        <h1 className="text-xl italic font-bold relative bottom-5 text-sky-600">SpeedX</h1>
                    </section>
                    <section>
                        <div className="flex items-center">
                            <form onChange={handleSubmit(onSubmit)}>
                                <input
                                    {...register("searchTerm")}
                                    style={{ borderRadius: '100px 0px 0px 100px' }}
                                    className="h-[44px] lg:w-[380px] border pl-7 placeholder-gray-600 border-gray-400 focus:outline-none"
                                    type="text"
                                    placeholder="Search Bike here"
                                />
                                <button >
                                    <div style={{ borderRadius: '0px 20px 20px 0px' }} className="relative top-[15.5px] bg-sky-400 px-5 h-[44px] cursor-pointer rounded-r-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="relative top-3 feather feather-search text-white" width="22" height="22">
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <line x1="16" y1="16" x2="21" y2="21"></line>
                                        </svg>
                                    </div>
                                </button>
                            </form>
                        </div>
                    </section>
                </aside>
                <aside className='w-[50%]  flex justify-between items-center lg:ml-20'>
                    <section>
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
                        <div className="text-3xl text-sky-500 cursor-pointer">
                            <Link to='/'><IoHome /></Link>
                        </div>
                        {/* profile */}
                        <div>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer w-[50px] h-[50px] border border-sky-400'>
                                        <AvatarImage src={myProfile?.image || "https://github.com/shadcn.png"} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='mr-10'>
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
                                                items.map((nav) => (
                                                    <li key={nav.title} className="hover:bg-sky-400 hover:text-white py-1 px-2 w-full ">
                                                        <NavLink className={`flex items-center gap-2`} to={nav.url} >
                                                            <nav.icon />
                                                            {nav.title}
                                                        </NavLink>
                                                    </li>
                                                ))
                                            }
                                            <li onClick={() => dispatch(logout())} className="hover:bg-sky-400 hover:text-white py-1 px-2 w-full flex items-center gap-2 cursor-pointer">
                                                <LogOut size={18} />
                                                Logout
                                            </li>
                                        </ul>
                                    </article>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </section>
                </aside>
            </section>
            {/* main nav section */}
            <section className='py-4 px-20'>
                <ul className='flex gap-4'>
                    {
                        items.map((nav) => (
                            <NavLink key={nav.title} className={({ isActive }) =>
                                `text-gray-500 uppercase  ${isActive && 'text-sky-400 font-semibold'}`
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
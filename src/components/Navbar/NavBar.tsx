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
import { LogOut, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import MobileNav from './MobileSheet';
import MobileMenuCard from './MobileMenuCard';
import { UserRole } from '../constants/namingConstant';
import BecomeSellerModal from './BecomeSellerModal';
import { useGetMyProfileQuery } from '@/lib/api/userApi';
import { navItems } from './Navbar.constant';
import { useRoleSwitch } from '@/hooks/useRoleSwitch';
import { RoleSwitchDialog } from '../common/Sidebar/ui/RoleSwitchDialog';
import { RoleSwitchButton } from '../common/Sidebar/ui/RoleSwitchButton';

const NavBar = () => {
    const dispatch = useAppDispatch();
    const form = useForm();
    const { register, handleSubmit } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        dispatch(setSearchTerm(data.searchTerm));
    };

    // Use the custom hook for role switching
    const { switchRole, isSwitching, targetRole } = useRoleSwitch();

    const user = useAppSelector(selectCurrentUser);
    const { data } = useGetMyProfileQuery();
    const myProfile = data?.data;

    const filteredNavItems = navItems.filter(nav =>
        !user?.activeRole || nav.roles.includes(user.activeRole)
    );

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

    return (
        <>
            {/* Role Switching Dialog - Add this at the top level */}
            <RoleSwitchDialog open={isSwitching} targetRole={targetRole} />

            <nav className="fixed bg-white z-50 w-full lg:pb-0 pb-[65px] lg:border-none border-b border-b-sky-500">
                {/* ── Top bar ── */}
                <section className="flex items-center w-full max-w-[1500px] mx-auto px-5 lg:px-10">

                    {/* ── LEFT: Mobile hamburger + Logo ── */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {/* Mobile hamburger – hidden on lg */}
                        <div className="lg:hidden">
                            <MobileNav myProfile={myProfile} />
                        </div>

                        {/* Logo – equal left edge on all sizes */}
                        <Link to="/">
                            <img
                                className="w-12 h-12 lg:w-[72px] lg:h-[72px] object-contain relative top-1"
                                src={bike}
                                alt="SpeedX Logo"
                            />
                        </Link>
                    </div>

                    {/* ── CENTER: Search – grows to fill space ── */}
                    <div className="flex-1 flex justify-center px-4 lg:px-6 ">
                        <form
                            onChange={handleSubmit(onSubmit)}
                            className="lg:w-full lg:max-w-[460px] w-full"
                        >
                            <div className="flex group">
                                <div className="relative flex-1">
                                    <div
                                        style={{ borderRadius: '100px 0px 0px 100px' }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                                    />
                                    <input
                                        {...register('searchTerm')}
                                        style={{ borderRadius: '100px 0px 0px 100px' }}
                                        className="h-11 w-full border-2 pl-5 placeholder-gray-400 border-sky-300 focus:outline-none placeholder:font-semibold shadow-inner transition-all duration-300 group-hover:border-sky-400 group-hover:shadow-[0_0_12px_rgba(56,189,248,0.25)] bg-white border-r-0"
                                        type="text"
                                        placeholder="Search Bike Here..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    style={{ borderRadius: '0px 30px 30px 0px' }}
                                    className="relative overflow-hidden bg-sky-500 px-2 lg:px-4 h-11 cursor-pointer transition-all duration-300 group-hover:bg-sky-500 group-hover:shadow-[0_0_14px_rgba(56,189,248,0.5)] flex items-center justify-center"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-search text-white transition-transform duration-300 group-hover:scale-110"
                                        width="18"
                                        height="18"
                                    >
                                        <circle cx="11" cy="11" r="8" />
                                        <line x1="16" y1="16" x2="21" y2="21" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className='flex relative lg:right-5'>
                        {myProfile &&
                            myProfile.activeRole === UserRole.CUSTOMER &&
                            !myProfile.roles.includes(UserRole.SELLER) &&
                            <BecomeSellerModal />
                        }
                    </div>

                    {/* ── RIGHT: Support + Home + Avatar ── */}
                    <div className="flex items-center gap-4 lg:gap-6 flex-shrink-0 ">
                        {/* Support – desktop only */}
                        <div className="hidden lg:flex items-center gap-3">
                            <div className="border-gray-200 border rounded-full p-2">
                                <img className="h-6 w-6" src={call} alt="Support Logo" />
                            </div>
                            <div className="text-sky-400 font-semibold leading-tight">
                                <p>Support &amp; order</p>
                                <p>01752966422</p>
                            </div>
                        </div>

                        {/* Home icon – desktop only */}
                        <Link to="/" className="hidden lg:block text-3xl text-sky-500 hover:text-sky-600 transition-colors">
                            <IoHome />
                        </Link>

                        {/* Avatar / Login */}
                        {user ? (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer w-10 h-10 lg:w-[50px] lg:h-[50px] border border-sky-400">
                                        <AvatarImage src={myProfile?.profileImage || 'https://github.com/shadcn.png'} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="mr-4 max-w-[90vw] w-[280px] lg:w-[320px] overflow-hidden">
                                    <article>
                                        <div className="flex justify-center">
                                            <Avatar className="cursor-pointer w-[50px] h-[50px] border border-sky-400">
                                                <AvatarImage src={myProfile?.profileImage || 'https://github.com/shadcn.png'} />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <h1 className="text-xl font-semibold text-center pt-2">{myProfile?.fullName}</h1>
                                        <h1 className="text-sm font-semibold text-center py-2 text-sky-400 italic ">{myProfile?.activeRole}</h1>
                                        <div className="flex justify-center">
                                            {myProfile &&
                                                <Link to="/customer/dashboard/settings">
                                                    <Button className="bg-sky-400 hover:bg-sky-500 2xl:p-5 cursor-pointer mb-5 2xl:text-[17px]">Edit Profile</Button>
                                                </Link>
                                            }
                                        </div>
                                        <ul className="divide-y mt-2">
                                            {navItems.slice(0, 4).map((nav) => (
                                                <li key={nav.title} className="hover:bg-sky-400 hover:text-white py-1 px-2 w-full rounded-sm">
                                                    <NavLink className="flex items-center gap-2" to={nav.url}>
                                                        <nav.icon />
                                                        {nav.title}
                                                    </NavLink>
                                                </li>
                                            ))}

                                            {/* Replace the old role switch with the new component */}
                                            {myProfile && myProfile?.roles?.length > 1 && (
                                                <li >
                                                    <RoleSwitchButton
                                                        onClick={switchRole}
                                                    />
                                                </li>
                                            )}

                                            <li
                                                onClick={() => dispatch(logout())}
                                                className="hover:bg-sky-400 hover:text-white py-1 px-2 w-full flex items-center gap-2 cursor-pointer rounded-sm"
                                            >
                                                <LogOut size={18} />
                                                Logout
                                            </li>
                                        </ul>
                                    </article>
                                </PopoverContent>
                            </Popover>
                        ) : (
                            <Link to="/login">
                                <Button className="py-5 bg-sky-400 hover:bg-sky-500 text-white rounded-full">
                                    <User /> Login
                                </Button>
                            </Link>
                        )}

                        {/* Mobile cart icon */}
                        <Link to="/customer/cart" className="lg:hidden">
                            <MobileMenuCard />
                        </Link>
                    </div>
                </section>

                {/* ── Bottom nav links (desktop, hide-on-scroll) ── */}
                <section
                    className={`border-t-2 border-t-sky-50 overflow-hidden transition-all duration-300 ease-in-out hidden lg:block bg-white ${visible ? 'max-h-20 py-3' : 'max-h-0 py-0'
                        }`}
                >
                    <ul className="flex gap-2 max-w-[1400px] mx-auto px-10">
                        {filteredNavItems.map((nav) => (
                            <NavLink
                                key={nav.title}
                                to={nav.url}
                                className={({ isActive }) =>
                                    `relative text-sm uppercase font-bold tracking-wide px-4 py-1.5 rounded-full transition-all duration-200 group overflow-hidden
                                    ${isActive
                                        ? 'text-sky-500 bg-sky-100 border border-sky-400'
                                        : 'text-gray-500 hover:text-sky-500 hover:bg-sky-50 border border-transparent hover:border-sky-300'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {nav.title}
                                        <span
                                            className={`absolute bottom-0 left-0 h-[2.5px] bg-sky-400 rounded-full transition-all duration-300
                                                ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                                        />
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </ul>
                </section>
            </nav>
        </>
    );
};

export default NavBar;
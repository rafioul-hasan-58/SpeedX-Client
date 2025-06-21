import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CgMenuLeft } from "react-icons/cg";
import { NavLink, useLocation } from "react-router-dom"
import { AvatarFallback } from '@radix-ui/react-avatar';
import { Avatar, AvatarImage } from "../ui/avatar";
import { IMyProfile } from "@/types/auth.types";
import { navItems } from "./Navbar.constant";
import call from '../../assets/logo/callLogo.png';

const MobileNav = ({ myProfile }: { myProfile: IMyProfile }) => {
    const { pathname, search } = useLocation();
    return (
        <div className="lg:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <CgMenuLeft className="text-3xl text-sky-500" />
                </SheetTrigger>
                <SheetContent side="left" className="w-[350px] px-0 pt-10">
                    <div className="border-b pb-7 px-2">
                        <Avatar className='relative left-0 cursor-pointer w-[50px] h-[50px] border border-sky-400'>
                            <AvatarImage src={myProfile?.image || "https://github.com/shadcn.png"} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-xl mt-3 italic">Welcome !</p>
                        <p className="text-sky-500">{myProfile.name}</p>
                    </div>
                    <div className="flex flex-col gap-4 mt-8 ">
                        {
                            navItems.map((nav) => (<NavLink key={nav.url} to="/customer/dashboard" className={`text-lg font-medium text-gray-500 px-3 ${pathname + search === nav.url ? 'bg-sky-100 text-sky-900 py-1' : ''}`}>{nav.title}</NavLink>))
                        }

                    </div>
                    <section className='absolute bottom-4 left-2 pt-5'>
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
                    </SheetContent>
            </Sheet>
        </div>
    )
}

export default MobileNav

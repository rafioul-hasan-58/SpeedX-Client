import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CgMenuLeft } from "react-icons/cg";
import { NavLink } from "react-router-dom"

const MobileNav = () => {
    return (
        <div className="lg:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <CgMenuLeft className="text-3xl text-sky-500" />
                </SheetTrigger>
                <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                    <div className="flex flex-col gap-4 mt-8">
                        <NavLink to="/" className="text-lg font-medium text-sky-600">Home</NavLink>
                        <NavLink to="/customer/dashboard" className="text-lg font-medium text-sky-600">Dashboard</NavLink>
                        <NavLink to="/customer/all-bikes?bikeType=bike" className="text-lg font-medium text-sky-600">Bikes</NavLink>
                        <NavLink to="/customer/all-bikes?bikeType=scooter" className="text-lg font-medium text-sky-600">Scooters</NavLink>
                        <NavLink to="/customer/cart" className="text-lg font-medium text-sky-600">Cart</NavLink>
                        <NavLink to="/customer/about" className="text-lg font-medium text-sky-600">About</NavLink>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MobileNav

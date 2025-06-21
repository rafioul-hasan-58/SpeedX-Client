import { useAppSelector } from "@/redux/hooks";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const MobileMenuCart = () => {
    const products = useAppSelector((state) => state.products.products);

    return (
        <Link className="" to={`/customer/cart`} >
            <div className="w-[40px] h-[40px] border border-sky-200 rounded-full cursor-pointer  transition flex justify-center items-center p-0 relative">
                <IoCartOutline className="text-sky-500 font-bold text-2xl p-0" />
                <p className="absolute top-0 left-7 text-white bg-sky-400 h-5 text-sm rounded-full text-center w-5">{products?.length || 0}</p>
            </div>
        </Link>
    );
};

export default MobileMenuCart;

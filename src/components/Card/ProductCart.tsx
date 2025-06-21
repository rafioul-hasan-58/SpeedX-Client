import { useAppSelector } from "@/redux/hooks";
import { BsBag } from "react-icons/bs";
import { Link } from "react-router-dom";

const ProductCart = () => {
    const products = useAppSelector((state) => state.products.products);

    return (
        <Link className="" to={`/customer/cart`} >
            <div className=" fixed w-[70px] h-[70px] right-0 top-1/2 bg-white p-4  shadow-lg z-50 cursor-pointer  transition flex justify-center items-center">
                <BsBag className="text-sky-500 font-bold text-4xl" />
                <p className="absolute  top-6 right-3 text-white bg-red-400 h-5 text-sm rounded-full text-center w-5">{products?.length || 0}</p>
            </div>
        </Link>
    );
};

export default ProductCart;

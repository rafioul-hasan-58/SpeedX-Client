import { Link, useParams } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import ReletedBikes from "../segments/ReletedBikes";
import { useGetProductDetailsQuery } from "@/redux/features/utils/utilsApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { IoCartOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { addProduct } from "@/redux/features/cart/cartSlice";
import { useGetMyProfileQuery } from "@/redux/features/admin/userManagement.Api";
const ProductDetails = () => {
    const { id } = useParams();
    const { data } = useGetProductDetailsQuery(id);
    const details = data?.data;
    const fallbackImage = 'https://i.ibb.co/mryzXPbL/office-605503-1280.jpg';
    const [currentImg, setCurrentImg] = useState(details?.images && details.images[0]);
    const user = useAppSelector(selectCurrentUser);
    const { data: sellerProfile } = useGetMyProfileQuery(details?.addedBy);
    useEffect(() => {
        if (details?.images?.length > 0) {
            setCurrentImg(details.images[0]);
        } else {
            setCurrentImg(fallbackImage)
        }
    }, [details?.images])
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.products.products);
    return (
        <div className="lg:mx-20">
            <div className="pt-10">
                <div className="flex lg:flex-row flex-col gap-6 bg-white p-3">
                    <div>
                        <section>
                            {
                                currentImg && <img className="lg:w-[600px] lg:h-[400px] border-[1px] border-sky-400 " src={currentImg} alt="" />
                            }
                        </section>
                        {
                            details?.images && details.images.length > 1 && (<section className="lg:w-[600px] mt-3">
                                <div className="grid grid-cols-3 pt-4.5 my-0.5 items-center">
                                    {
                                        details?.images?.length > 0 &&
                                        details.images.slice(0)
                                            .map((img: string, idx: string) => (
                                                <img key={idx} src={img} alt={img + idx} onClick={() => setCurrentImg(img)} className={`w-[150px] ${currentImg === img ? 'border border-sky-400' : ''}`} />
                                            ))
                                    }
                                </div>
                            </section>)
                        }
                    </div>
                    <div className="mt-8">
                        <h1 className="text-4xl font-bold uppercase mb-4 text-red-500">{details?.brandName}</h1>
                        <h2 className="text-3xl font-semibold">{details?.name}</h2>
                        <h2 className="text-3xl font-bold text-sky-400 my-4">BDT.{details?.price}</h2>
                        <p className="text-gray-500">Brand: {details?.brandName} |<span className="text-sky-400"> More Bikes From {details?.brandName}</span></p>
                        <p className="text-gray-500 mt-2">Product Color: <span className="text-black">{details?.color}</span></p>
                        <div className="flex gap-4 mt-16 items-center">
                            <Link className="flex-1" to={`/customer/check-out?productId=${id}`}>
                                <div className=" flex w-full  items-center justify-center ">
                                    <Button disabled={user?.email === details?.addedBy} className="bg-sky-400 hover:bg-sky-500 rounded-full flex-1 h-11">BUY NOW</Button>
                                </div>
                            </Link>
                            <Button
                                disabled={user?.email === details?.addedBy || details?.stocks === 0 || sellerProfile?.data?.role !== 'admin'}
                                onClick={() => {
                                    const exists = cart.some(p => p._id === details?._id);
                                    if (exists) {
                                        toast.error('Already Exists');
                                    } else {
                                        dispatch(addProduct(details));
                                        toast.success('Product added to cart');
                                    }
                                }}
                                className="h-11 flex-1 text-[12px] text-sky-400 bg-white border border-sky-400 rounded-full hover:bg-sky-100 w-full flex items-center justify-center gap-1"
                            >
                                <IoCartOutline />
                                Add To Cart
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="bg-white">
                    <div className="flex justify-center  mt-10 pt-4">
                        <div className=" text-sky-400">
                            <div className="flex justify-center">
                                <BsInfoCircle className="text-2xl text-center" />
                            </div>
                            <h1 className="uppercase text-xl font-semibold">Description</h1>
                        </div>
                    </div>
                    <p className="px-10 py-8 text-lg text-gray-600 pb-10">
                        {details?.description}
                    </p>
                </div>
            </div>
            <ReletedBikes name="filterBybrand" value={details?.brandName} />
        </div>
    );
};

export default ProductDetails;
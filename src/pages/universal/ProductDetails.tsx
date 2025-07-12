import { Link, useParams } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import ReletedBikes from "../segments/ReletedBikes";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { IoCartOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { addProduct } from "@/redux/features/cart/cartSlice";
import { useGetBikeDetailsQuery } from "@/redux/features/common/bikeManagementApi";
import { useGetMyProfileQuery } from "@/redux/features/user/userReletedApi";

const ProductDetails = () => {
    const { id } = useParams();
    const { data } = useGetBikeDetailsQuery(id);
    const details = data?.data;
    const fallbackImage = 'https://i.ibb.co/mryzXPbL/office-605503-1280.jpg';
    const [currentImg, setCurrentImg] = useState(details?.images && details.images[0]);
    const user = useAppSelector(selectCurrentUser);
    const { data: sellerProfile } = useGetMyProfileQuery(details?.addedBy);

    useEffect(() => {
        if (details?.images?.length > 0) {
            setCurrentImg(details.images[0]);
        } else {
            setCurrentImg(fallbackImage);
        }
    }, [details?.images]);

    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.products.products);

    return (
        <div className="max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-20 2xl:px-32">
            <div className="pt-10 2xl:pt-16">
                <div className="flex lg:flex-row flex-col gap-6 bg-white p-3 2xl:gap-10 2xl:p-8">
                    <div>
                        <section>
                            {currentImg && (
                                <img
                                    className="lg:w-[600px] 2xl:w-[800px] lg:h-[400px] 2xl:h-[500px] border-[1px] border-sky-400 object-cover"
                                    src={currentImg}
                                    alt=""
                                />
                            )}
                        </section>

                        {details?.images && details.images.length > 1 && (
                            <section className="lg:w-[600px] 2xl:w-[800px] mt-3 2xl:mt-6">
                                <div className="grid grid-cols-3 pt-4.5 items-center gap-2 2xl:gap-4">
                                    {details.images.map((img: string, idx: string) => (
                                        <img
                                            key={idx}
                                            src={img}
                                            alt={img + idx}
                                            onClick={() => setCurrentImg(img)}
                                            className={`cursor-pointer lg:w-[180px] 2xl:w-[250px] h-auto object-cover ${currentImg === img ? 'border border-sky-400' : ''}`}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="mt-8 2xl:mt-14">
                        <h1 className="lg:text-4xl 2xl:text-5xl font-bold uppercase lg:mb-4 2xl:mb-7 text-red-500">
                            {details?.brandName}
                        </h1>
                        <h2 className="lg:text-3xl 2xl:text-4xl font-semibold">{details?.name}</h2>
                        <h2 className="lg:text-3xl 2xl:text-4xl font-bold text-sky-400 lg:my-4 2xl:my-7">
                            BDT. {details?.price}
                        </h2>
                        <p className="text-gray-500 lg:text-base 2xl:text-lg">
                            Brand: {details?.brandName} |
                            <span className="text-sky-400"> More Bikes From {details?.brandName}</span>
                        </p>
                        <p className="text-gray-500 mt-2 lg:text-base 2xl:text-lg">
                            Product Color: <span className="text-black">{details?.color}</span>
                        </p>

                        <div className="flex gap-4 mt-16 2xl:mt-20 items-center">
                            <Link className="flex-1" to={`/customer/check-out?productId=${id}`}>
                                <div className="flex w-full items-center justify-center">
                                    <Button
                                        disabled={user?.email === details?.addedBy}
                                        className="bg-sky-400 hover:bg-sky-500 rounded-full flex-1 h-11 2xl:h-14 2xl:text-lg"
                                    >
                                        BUY NOW
                                    </Button>
                                </div>
                            </Link>

                            <Button
                                disabled={
                                    user?.email === details?.addedBy ||
                                    details?.stocks === 0 ||
                                    sellerProfile?.data?.role !== 'admin'
                                }
                                onClick={() => {
                                    const exists = cart.some((p) => p._id === details?._id);
                                    if (exists) {
                                        toast.error('Already Exists');
                                    } else {
                                        dispatch(addProduct(details));
                                        toast.success('Product added to cart');
                                    }
                                }}
                                className="h-11 2xl:h-14 2xl:text-lg flex-1 text-[12px] text-sky-400 bg-white border border-sky-400 rounded-full hover:bg-sky-100 w-full flex items-center justify-center gap-1"
                            >
                                <IoCartOutline />
                                Add To Cart
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="bg-white mt-10 2xl:mt-16">
                    <div className="flex justify-center pt-4 2xl:pt-8">
                        <div className="text-sky-400 text-center">
                            <div className="flex justify-center">
                                <BsInfoCircle className="text-2xl 2xl:text-3xl" />
                            </div>
                            <h1 className="uppercase text-xl 2xl:text-2xl font-semibold">Description</h1>
                        </div>
                    </div>
                    <p className="px-10 py-8 text-lg text-gray-600 pb-10 2xl:text-xl 2xl:px-20 2xl:py-10 2xl:pb-14">
                        {details?.description}
                    </p>
                </div>
            </div>

            <ReletedBikes name="filterBybrand" value={details?.brandName} />
        </div>
    );
};

export default ProductDetails;

import { Link, useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/features/admin/productManagement.Api";
import { Button } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import ReletedBikes from "../segments/ReletedBikes";
const ProductDetails = () => {
    const { id } = useParams();
    const { data } = useGetProductDetailsQuery(id);
    const details = data?.data;
    const fallbackImage = 'https://i.ibb.co/mryzXPbL/office-605503-1280.jpg';
    const [currentImg, setCurrentImg] = useState(details?.images && details.images[0]);

    useEffect(() => {
        if (details?.images?.length > 0) {
            setCurrentImg(details.images[0]);
        } else {
            setCurrentImg(fallbackImage)
        }
    }, [details?.images])
    return (
        <div className="lg:mx-20">
            <div className="pt-10">
                <div className="flex  gap-6 bg-white p-3">
                    <div>
                        <section>
                            {
                                currentImg && <img className="lg:w-[600px] lg:h-[400px] border-[1px] border-sky-400 " src={currentImg} alt="" />
                            }
                        </section>
                        {
                            details?.images && details.images.length > 1 && (<section className="w-[600px] mt-3">
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
                        <div className="flex gap-4 mt-16">
                            <Link to={`/customer/check-out?productId=${id}`}>
                                <div className=" flex w-[190px]  items-center justify-center ">
                                    <Button className="relative  focus:outline-none px-3 py-2" style={{ border: '1px solid #38bdf8', backgroundColor: '#38bdf8', color: 'white', fontSize: '16px', borderRadius: '100px 100px 100px 100px', padding: '22px 60px 22px 60px', }}>BUY NOW</Button>
                                </div>
                            </Link>
                            <div className='cursor-pointer w-[190px] flex gap-1 border-2 p-2 rounded-full border-sky-400 justify-center'>
                                <h1 className=' text-[15px] uppercase mt-[1px]'>Add to Cart</h1>
                            </div>
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
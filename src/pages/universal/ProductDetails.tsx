import { Link, useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/features/admin/productManagement.Api";
import { Button } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import Footer from "../../components/footer/Footer";
const ProductDetails = () => {
    const { id } = useParams()
    const { data } = useGetProductDetailsQuery(id)
    const details = data?.data
    return (
        <div>
            <div className="mx-30  ">
                <div className="flex  gap-6 bg-white">
                    <div>
                        <img className="w-[600px] h-[400px] border-r-[1px] border-gray-300" src={details?.image} alt="" />
                    </div>
                    <div className="mt-8">
                        <h1 className="text-4xl font-bold uppercase mb-4 text-red-500">{details?.brandName}</h1>
                        <h2 className="text-3xl font-semibold">{details?.name}</h2>
                        <h2 className="text-3xl font-bold text-sky-400 my-4">BDT.{details?.price}</h2>
                        <p className="text-gray-500">Brand: {details?.brandName} |<span className="text-sky-400"> More Bikes From {details?.brandName}</span></p>
                        <p className="text-gray-500 mt-2">Product Color: <span className="text-black">{details?.color}</span></p>
                        <div className="flex gap-4 mt-16">
                            <Link to={`/customer/check-out/${id}`}>
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
                    <p className="px-10 py-8 text-lg text-gray-600 mb-10">
                        {details?.description}
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetails;
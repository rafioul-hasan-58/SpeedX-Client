import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../redux/features/admin/productManagement.Api";
import Card from "../../components/Card/Card";
import TestiCarosel from "../../components/Testimonial/TestiCarosel";
import BannerCarosel from "../../components/Banner/BannerCarosel";
import { Button } from "@/components/ui/button";
const CustomerDashboard = () => {
    const { data: products } = useGetAllProductsQuery(undefined)
    const mainData = products?.data?.slice(0, 8)
    return (
        <div>
            <div className="lg:mx-20">
                {/* banner section */}
                <div className="border border-gray-100 pt-4 mb-8">
                    <section className="border h-[550px]  bg-white  sm:mt-6  px-4 sm:px-6 ">
                        <div className="my-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 flex  lg:flex-justify lg:flex flex-col lg:flex-row">
                            <div className="sm:text-center lg:text-left">
                                <h1 className=" tracking-tight font-bold text-gray-800 lg:text-6xl text-3xl">
                                    <span className="block xl:inline">SpeedX Moto – Ride the Thrill</span>
                                    <span className="block text-sky-400 xl:inline">, Own the Road!</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    At SpeedX Moto, we bring you the best selection of motorcycles, accessories, and expert services to fuel your passion for riding. Whether you're looking for a high-speed sportbike, a classic cruiser, or a reliable commuter, we have the perfect ride for you.
                                </p>
                                {/* Button Section */}
                                <div className="lg:mt-8 mt-5 flex items-center gap-5">
                                    <div className="">
                                        <Link
                                            to='/customer/about'
                                            className=""
                                        >
                                            <Button className="lg:w-[110px] lg:h-[50px] lg:text-lg  bg-sky-400 hover:bg-sky-500">About</Button>
                                        </Link>
                                    </div>
                                    <div className="">
                                        <Link
                                            to='/customer/all-products'
                                            className=""
                                        >
                                            <Button className="lg:w-[110px] lg:h-[50px] lg:text-lg">Bikes</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="relative lg:right-6 lg:w-[500px] lg:block hidden">
                                <BannerCarosel />
                            </div>
                        </div>
                    </section>
                </div>
                {/* end of banner Section */}
                <div>
                    <h1 className="text-4xl font-bold">Fearured Bike</h1>
                    <div className="grid lg:mx-0 lg:grid-cols-4 grid-cols-2 lg:my-5 lg:gap-10 mt-3">
                        {
                            mainData?.map((item) => (
                                <Card key={item.name} item={item}></Card>
                            ))
                        }

                    </div>
                    <div className="flex justify-center mt-3">
                        <div className=" flex justify-center w-[120px]  rounded-full items-center">
                            <Link to='/customer/all-bikes'>
                                <Button className="focus:outline-none px-3 py-2" style={{ border: '1px solid #38bdf8', backgroundColor: '#38bdf8', color: 'white', fontSize: '13px', borderRadius: '100px 100px 100px 100px', padding: '20px 25px 20px 25px' }}>See All</Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-6">What Our Customer Says </h1>
                </div>
                <div className="pb-10">
                    <TestiCarosel />
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;

import { Button } from "antd";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../redux/features/admin/productManagement.Api";
import Card from "../../components/Card/Card";
import TestiCarosel from "../../components/Testimonial/TestiCarosel";
import BannerCarosel from "../../components/Banner/BannerCarosel";

const Home = () => {
    const { data: products } = useGetAllProductsQuery(undefined)
    const mainData = products?.data?.slice(0, 8)
    // console.log(mainData);
    return (
        <div>
            <div className="lg:mx-20">
                {/* banner section */}
                <div className="border border-gray-100 pt-4 mb-8">
                    <section className="border h-[550px]  bg-white  sm:mt-6  px-4 sm:px-6 ">
                        <div className="my-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 flex  lg:flex-justify lg:flex flex-col lg:flex-row">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-2xl tracking-tight font-bold text-gray-800 sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">SpeedX Moto – Ride the Thrill</span>
                                    <span className="block text-sky-400 xl:inline">, Own the Road!</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                At SpeedX Moto, we bring you the best selection of motorcycles, accessories, and expert services to fuel your passion for riding. Whether you're looking for a high-speed sportbike, a classic cruiser, or a reliable commuter, we have the perfect ride for you.
                                </p>
                                {/* Button Section */}
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <Link
                                           to='/customer/about'
                                            className="w-full flex items-center justify-center px-4 py-1 border border-transparent text-base font-medium rounded-md text-white bg-sky-400 hover:bg-gray-600 md:py-4 md:text-lg md:px-10"
                                        >
                                           About
                                        </Link>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                        <Link
                                            to='/customer/all-products'
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                                        >
                                           Bikes
                                        </Link>
                                    </div>
                                </div>
                                {/* End of Button Section */}
                            </div>
                            {/*   Image Section     */}
                            <div className="relative right-6 lg:w-[500px] ">
                            <BannerCarosel/>
                              
                            </div>
                            {/*   End of Image Section     */}
                        </div>
                    </section>
                </div>
                {/* end of banner Section */}
                <div>
                    <h1 className="text-4xl font-bold">Fearured Bike</h1>
                    <div className="grid grid-cols-4 my-5 gap-10">
                        {
                            mainData?.map((item) => (
                                <Card key={item.name} item={item}></Card>
                            ))
                        }

                    </div>
                    <div className="flex justify-center">
                        <div className=" flex justify-center w-[120px]  rounded-full items-center">
                            <Link to='/customer/all-products'>
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

export default Home;
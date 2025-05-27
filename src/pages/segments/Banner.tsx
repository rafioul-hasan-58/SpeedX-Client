import BannerCarosel from "@/components/Banner/BannerCarosel";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div>
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
        </div>
    );
};

export default Banner;
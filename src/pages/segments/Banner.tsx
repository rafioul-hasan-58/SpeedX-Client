import BannerCarosel from "@/components/Banner/BannerCarosel";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div>
            <div className="border border-gray-100 pt-4 mb-8">
                <section className="border lg:h-[550px]  h-[400px] bg-white sm:mt-6 px-4 sm:px-6 lg:px-8 ">
                    <div className="my-10 mx-auto max-w-[1500px] px-4 sm:mt-12 sm:px-6 md:mt-16  lg:px-8 flex flex-col lg:flex-row lg:items-center">
                        {/* Left Content */}
                        <div className="sm:text-center lg:text-left flex-1">
                            <h1 className="tracking-tight font-bold text-gray-800 text-3xl lg:text-6xl 2xl:text-7xl leading-tight">
                                <span className="block xl:inline">SpeedX Moto – Ride the Thrill</span>
                                <span className="block text-sky-400 xl:inline">, Own the Road!</span>
                            </h1>

                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 2xl:text-2xl 2xl:max-w-3xl">
                                At SpeedX Moto, we bring you the best selection of motorcycles, accessories, and expert services to fuel your passion for riding. Whether you're looking for a high-speed sportbike, a classic cruiser, or a reliable commuter, we have the perfect ride for you.
                            </p>

                            {/* Buttons */}
                            <div className="mt-5 lg:mt-8 2xl:mt-10 flex items-center gap-5">
                                <Link to="/customer/about">
                                    <Button className="lg:w-[110px] lg:h-[50px] lg:text-lg 2xl:w-[140px] 2xl:h-[60px] 2xl:text-xl bg-sky-400 hover:bg-sky-500">
                                        About
                                    </Button>
                                </Link>
                                <Link to="/customer/all-products">
                                    <Button className="lg:w-[110px] lg:h-[50px] lg:text-lg 2xl:w-[140px] 2xl:h-[60px] 2xl:text-xl">
                                        Bikes
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Carousel */}
                        <div className="hidden lg:block lg:relative lg:right-6 lg:w-[500px] 2xl:w-[600px] 2xl:right-10">
                            <BannerCarosel />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Banner;

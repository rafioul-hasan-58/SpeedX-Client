
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../redux/features/admin/productManagement.Api";
import Card from "../../components/Card/Card";
import TestiCarosel from "../../components/Testimonial/TestiCarosel";

const Home = () => {
    const { data: products } = useGetAllProductsQuery(undefined)
    const mainData = products?.data?.slice(0, 8)
    // console.log(mainData);
    return (
        <div>
            <div className="lg:mx-20 lg:mb-10">
                {/* banner section */}
                <section className="border  bg-white  sm:mt-6  px-4 sm:px-6 lg:px-8">
                    <div className="my-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 flex gap-3 lg:flex-justify lg:flex flex-col lg:flex-row">
                        <div className="sm:text-center lg:text-left">
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-6xl">
                                <span className="block xl:inline">Data to enrich your</span>
                                <span className="block text-indigo-600 xl:inline">online business</span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
                                cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
                            </p>
                            {/* Button Section */}
                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                <div className="rounded-md shadow">
                                    <a
                                        href="#"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600 md:py-4 md:text-lg md:px-10"
                                    >
                                        Get started
                                    </a>
                                </div>
                                <div className="mt-3 sm:mt-0 sm:ml-3">
                                    <a
                                        href="#"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                                    >
                                        Live demo
                                    </a>
                                </div>
                            </div>
                            {/* End of Button Section */}
                        </div>
                        {/*   Image Section     */}
                        <div className="lg:inset-y-0 lg:right-0 lg:w-1/2 my-4">
                            <img
                                className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
                                alt=""
                            />
                        </div>
                        {/*   End of Image Section     */}
                    </div>
                </section>
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
                            <Link to='/all-products'>
                                <Button className="focus:outline-none px-3 py-2" style={{ border: '1px solid #38bdf8', backgroundColor: '#38bdf8', color: 'white', fontSize: '13px', borderRadius: '100px 100px 100px 100px', padding: '20px 25px 20px 25px' }}>See All</Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-6">What Our Customer Says </h1>
                </div>
                <div className="">
                    <TestiCarosel />
                </div>
            </div>
        </div>
    );
};

export default Home;
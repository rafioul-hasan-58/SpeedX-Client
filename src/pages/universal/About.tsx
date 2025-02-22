
const About = () => {
    return (
        <div>
            <section className="bg-gray-100 ">
                <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                        <div className="max-w-lg">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                About Us
                            </h2>
                            <p className="mt-4 text-gray-600 text-lg">
                            Welcome to SpeedX Moto, your ultimate destination for high-performance motorcycles and accessories. From sleek sportbikes to rugged cruisers, we offer a wide range of models to suit every rider’s style. Our expert team provides top-notch servicing, ensuring your bike stays in peak condition. Explore our premium collection of helmets, riding gear, and spare parts. Whether you’re a seasoned rider or just starting your journey, SpeedX Moto has everything you need for the road ahead. Visit us today and experience the thrill of two wheels like never before!
                            </p>
                            <div className="mt-8">
                                <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">
                                    Learn more about us
                                    <span className="ml-2">→</span>
                                </a>
                            </div>
                        </div>
                        <div className="mt-12 md:mt-0">
                            <img
                                src="https://i.ibb.co.com/9HxYV3cd/banner1.jpg"
                                alt="About Us Image"
                                className="object-cover rounded-lg shadow-md"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
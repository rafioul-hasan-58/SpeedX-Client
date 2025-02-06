
import { Button } from "antd";
import Card from "../../components/Card/Card";
import Carosel from "../../components/swiperSlider/Carosel";
import TestiCarosel from "../../components/Testimonial/TestiCarosel";
import { useGetAllProductsQuery } from "../../redux/features/admin/productManagement.Api";

const UserDashboard = () => {
    const { data: products } = useGetAllProductsQuery(undefined)
    const mainData = products?.data?.slice(0, 4)
    // console.log(mainData);
    return (
        <div className="lg:mx-20 ">
            <Carosel />
            <div>
                <h1 className="text-4xl font-bold">Fearured Bike</h1>
                <div className="grid grid-cols-4 my-5">
                    {
                        mainData?.map((item) => (
                            <Card key={item.name} item={item}></Card>
                        ))
                    }

                </div>
                <div className="flex justify-center">
                    <div className=" flex justify-center w-[120px] bg-sky-400 px-2 py-1  rounded-full items-center">
                        <Button className="focus:outline-none px-3 py-2" style={{ border: '1px solid #38bdf8', backgroundColor: '#38bdf8', color: 'white', fontSize: '13px' }}>See All</Button>
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
    );
};

export default UserDashboard;
import ProductCard from "@/components/Card/ProductCard";
import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/features/admin/productManagement.Api";
import { Link } from "react-router-dom";

const FeturedBikes = () => {
    const { data: products } = useGetAllProductsQuery(undefined)
    const mainData = products?.data?.slice(0, 8)
    return (
        <div>
            <h1 className="text-4xl font-bold my-10">Fearured Bike</h1>
            <div className="grid lg:mx-0 lg:grid-cols-4 grid-cols-2 lg:my-5 lg:gap-10 mt-3">
                {
                    mainData?.map((item) => (
                        <ProductCard key={item.name} item={item}></ProductCard>
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
    );
};

export default FeturedBikes;
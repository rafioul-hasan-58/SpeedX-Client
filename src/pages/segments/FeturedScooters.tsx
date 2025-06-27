import ProductCard from "@/components/Card/ProductCard";
import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/features/utils/utilsApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


interface Filter {
    name: string;
    value: string | number;
}
const FeturedScooters = () => {
    const [queries, setQueries] = useState<Filter[]>([]);

    useEffect(() => {
        setQueries([{ name: 'filterByBikeType', value: 'scooter' }]);
    }, []);

    const { data: products } = useGetAllProductsQuery(queries);
    const mainData = products?.data?.slice(0, 4);

    return (
        <div>
            <h1 className=" lg:text-4xl text-3xl font-bold mt-4 lg:my-10">Fearured Scooters</h1>
            <div className="grid lg:mx-0 lg:grid-cols-4 grid-cols-2 lg:my-5 lg:gap-10 mt-3 gap-1">
                {
                    mainData?.map((item) => (
                        <ProductCard key={item.name} item={item}></ProductCard>
                    ))
                }

            </div>
            <div className="flex justify-center mt-3">
                <div className=" flex justify-center w-[120px]  rounded-full items-center">
                    <Link to='/customer/all-bikes?bikeType=scooter'>
                        <Button className="focus:outline-none px-6 py-5 rounded-full bg-sky-400 ">See All</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeturedScooters;
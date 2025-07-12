import ProductCard from "@/components/Card/ProductCard";
import BikeCardSkeleton from "@/components/Customer/Skeletons/BikeCardSkeleton";
import { Button } from "@/components/ui/button";
import { useGetAllBikesQuery } from "@/redux/features/common/bikeManagementApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


interface Filter {
    name: string;
    value: string | number;
}
const UsedBikes = () => {
    const [queries, setQueries] = useState<Filter[]>([]);

    useEffect(() => {
        setQueries([{ name: 'filterBytype', value: 'used' }, { name: 'filterByBikeType', value: 'bike' }]);
    }, []);

    const { data: products,isLoading } = useGetAllBikesQuery(queries);
    const mainData = products?.data?.slice(0, 4);

    return (
        <div>
            <h1 className="lg:text-4xl text-3xl mt-4 font-bold lg:my-10">Used Bikes</h1>
            <div className="grid lg:mx-0 lg:grid-cols-4 grid-cols-2 lg:my-5 lg:gap-10 mt-3 gap-1">
               {isLoading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <BikeCardSkeleton key={i} />
                    ))
                    : mainData?.map((item) => (
                        <ProductCard key={item.name} item={item} />
                    ))}

            </div>
            <div className="flex justify-center mt-3">
                <div className=" flex justify-center w-[120px]  rounded-full items-center">
                    <Link to='/customer/all-bikes?type=used'>
                        <Button className="focus:outline-none px-6 py-5 rounded-full bg-sky-400 ">See All</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UsedBikes;
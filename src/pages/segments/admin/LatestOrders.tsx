
import Loader from "@/components/Loader/Loader";
import { useGetAllOrdersQuery } from "@/redux/features/user/userReletedApi";
import OrderTable from "@/components/common/Orders/OrderTable";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LatestOrders = () => {
    const { data: orderData, isFetching } = useGetAllOrdersQuery(undefined);
    const data = orderData?.data?.slice(0, 5);
    if (isFetching) return <Loader />;

    return (
        <div>
            <h1 className="text-2xl font-bold text-sky-400  my-6 pt-3">Latest Orders</h1>

            {
                (data?.length ?? 0) > 0 ?
                    <>
                        <OrderTable data={data} />
                        <div className="flex justify-center mt-3">
                            <Link to='/admin/all-orders'>
                                <Button className="rounded-full bg-sky-500 hover:bg-sky-600">View More</Button>
                            </Link>
                        </div>
                    </>
                    :
                    <div className="border-t flex items-center justify-center mt-12 py-10 rounded-sm ">
                        <aside className="mt-4 text-center">
                            <p className="text-2xl font-semibold">Order is Empty</p>
                            <p className="text-gray-500 text-lg py-5">Looks like you haven't added anything yet.</p>
                        </aside>
                    </div>
            }
        </div>
    );
};

export default LatestOrders;

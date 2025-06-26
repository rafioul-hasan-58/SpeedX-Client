import { Link } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "../../components/ui/button";
import { useGetAllOrdersQuery } from "../../redux/features/user/userReletedApi";
import Loader from "@/components/Loader/Loader";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import OrderTable from "@/components/common/Orders/OrderTable";
const MyOrders = () => {
    const [email, setEmail] = useState('');
    const user = useAppSelector(selectCurrentUser);
    const queryParams = email ? [{ name: 'email', value: email }] : [];
    const { data, isFetching } = useGetAllOrdersQuery(queryParams);

    if (isFetching) return <Loader />
    return (
        <div className="pt-5">
            {
                (data ?? [])?.length > 0 ? <div>
                    <section className=" px-4 ">
                        <div className="mx-2">
                            <h2 className="text-2xl font-semibold">My Orders | Customer</h2>
                            <p className="text-lg text-gray-500">Manage, update, or delete customer orders from here.</p>
                        </div>
                        <div className="flex flex-col">
                            <div className=" sm:-mx-6 ">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <Select onValueChange={(value) => {
                                        setEmail(value === 'all' ? '' : value)
                                    }}>
                                        <SelectTrigger className="w-[120px] h-[30px] my-2">
                                            <SelectValue placeholder="orders" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Orders</SelectItem>
                                            <SelectItem value={`${user?.email}`}>My Orders</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <OrderTable data={data} />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                    :
                    <div className="flex items-center justify-center h-screen">
                        <aside className="mt-4">
                            <p className="text-center text-2xl font-semibold">You have empty order</p>
                            <p className="text-gray-500 text-lg text-center py-5">Looks like you haven't added anything yet.</p>
                            <div className="flex justify-center">
                                <Link to='/'>
                                    <Button className="bg-sky-400 hover:bg-sky-500 rounded-full py-3 px-4 text-[15px]">Continue Shoping</Button>
                                </Link>
                            </div>
                        </aside>
                    </div>
            }
        </div>
    );
};

export default MyOrders;
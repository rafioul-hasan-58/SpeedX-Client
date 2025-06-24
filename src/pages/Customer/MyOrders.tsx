import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useChangeStatusMutation, useGetMyOrdersQuery } from "../../redux/features/user/userReletedApi";
import moment from 'moment'
import { IOrder } from "@/types/order.types";
import OrderDetailSheet from "@/components/common/Orders/OrderDetailSheet";
const MyOrders = () => {
    const { data } = useGetMyOrdersQuery(undefined);
    const [cancelOrder] = useChangeStatusMutation()
    const orderData = data?.data;
    const handleCancel = async (id: string) => {
        const cancelData = {
            data: {
                status: 'Cancelled'
            },
            id
        }
        const res = await cancelOrder(cancelData);
        console.log(res);
    }
    return (
        <div className="pt-5">
            {
                data?.data?.length > 0 ? <div>
                    <section className=" px-4 ">
                        <div className="mx-2">
                            <h2 className="text-2xl font-semibold">My Orders | Customer</h2>
                            <p className="text-lg text-gray-500">Manage, update, or delete customer orders from here.</p>
                        </div>
                        <div className="flex flex-col">
                            <div className=" sm:-mx-6 ">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200 ">
                                            <thead className="bg-sky-400 ">
                                                <tr>
                                                    <th scope="col" className="px-8 py-3.5 text-sm font-normal text-left rtl:text-right text-white ">
                                                        Products
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white ">
                                                        Date
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white ">
                                                        Price
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white ">
                                                        Status
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white ">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 ">
                                                {
                                                    orderData?.map((order: IOrder) => <tr key={order._id} className="w-full">
                                                        <td className="px-8 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                            {order?.items?.map(item => item.product.name.split(' ').slice(0, 3).join(' ')).join(' , ')}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{moment.utc(order?.createdAt).format('D MMMM YYYY')}</td>
                                                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{order?.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)}</td>
                                                        <td className={`px-4 py-4 text-sm text-gray-600 whitespace-nowrap flex gap-1 relative top-1 ${order?.status === 'Pending' ? 'text-yellow-500' : order?.status === 'Delivered' ? 'text-green-500' : 'text-red-500'}`}>
                                                            <p className={`h-2 w-2 relative top-[6px] rounded-full 
                                                            ${order?.status === 'Pending' && 'bg-yellow-500'} 
                                                            ${order?.status === 'Delivered' && 'bg-green-500'}
                                                          ${order?.status === 'Cancelled' && 'bg-red-500'}`}>

                                                            </p>
                                                            {order?.status}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                            <OrderDetailSheet order={order} />
                                                        </td>
                                                    </tr>)
                                                }
                                            </tbody>
                                        </table>
                                    </div>
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
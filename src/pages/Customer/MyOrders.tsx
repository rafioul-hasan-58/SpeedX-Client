import { Button } from "../../components/ui/button";
import { useChangeStatusMutation, useGetMyOrdersQuery } from "../../redux/features/user/userReletedApi";
import moment from 'moment'
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
        <div>
            <div>
                <section className="container px-4 pb-10 min-h-screen">
                    <div>
                        <h1 className="text-2xl font-bold text-sky-400 text-center my-6 pt-3">My Orders</h1>
                    </div>
                    <div className="flex flex-col">
                        <div className=" sm:-mx-6 lg:mx-10">
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
                                                orderData?.map((item: { product: { name: string, price: number }, createdAt: string, status: string, _id: string }) => <tr className="w-full">
                                                    <td className="px-8 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                        {item?.product?.name}
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{moment.utc(item?.createdAt).format('D MMMM YYYY')}</td>
                                                    <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{item?.product?.price}</td>
                                                    <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap flex gap-1 relative top-1">
                                                        <p className={`h-2 w-2 relative top-[6px] rounded-full 
                                                            ${item?.status === 'Pending' && 'bg-yellow-500'} 
                                                            ${item?.status === 'Delivered' && 'bg-green-500'}
                                                          ${item?.status === 'Cancelled' && 'bg-red-500'}`}></p>
                                                        {item?.status}
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                        <Button
                                                            disabled={item?.status === 'Cancelled' || item?.status === 'Delivered'}
                                                            onClick={() => handleCancel(item?._id)}
                                                            style={{ backgroundColor: 'red' }}>Cancel</Button>
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
        </div>
    );
};

export default MyOrders;
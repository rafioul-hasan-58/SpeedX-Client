import Loader from "@/components/Loader/Loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useChangeStatusMutation, useDeleteOrderMutation, useGetAllOrdersQuery } from "@/redux/features/user/userReletedApi";
import { IOrder } from "@/types/order.types";
import moment from "moment";
import { useState } from "react";
import Swal from "sweetalert2";
interface LatestOrdersProps {
    showLimited?: boolean;
}
const LatestOrders = ({ showLimited = false }: LatestOrdersProps) => {
    const { data: orders, isFetching } = useGetAllOrdersQuery(undefined);
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
    const [status, setStatus] = useState('Pending');
    const [isOpen, setIsOpen] = useState(false);
    const allOrders = orders?.data;
    const handleSubmit = async (id: string | null) => {
        const updatedData = {
            id,
            data: {
                status
            }
        }

        const res = await upgradeStatus(updatedData)
        if (res.data) {
            setIsOpen(false)
        }

    }
    const [upgradeStatus] = useChangeStatusMutation();
    const [deleteOrder] = useDeleteOrderMutation();

    const deleteOrderData = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteOrder(id)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }
    if (isFetching) return <Loader />
    return (
        <div>
            {
                allOrders?.length > 0 ? <section className="container">
                    <div className="flex flex-col">
                        <div className=" sm:-mx-6 ">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 px-0">
                                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200 ">
                                        <thead className="bg-sky-400 ">
                                            <tr>
                                                <th scope="col" className="px-8 py-3.5 text-[16px] font-semibold text-left rtl:text-right text-white ">
                                                    Products
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-[16px] text-left font-semibold rtl:text-right text-white ">
                                                    Date
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-[16px] font-semibold text-left rtl:text-right text-white ">
                                                    Customer Name
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-[16px] font-semibold text-left rtl:text-right text-white ">
                                                    Price
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-[16px] text-left font-semibold rtl:text-right text-white ">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-4 py-3.5text-sm  text-left text-[16px] font-semibold rtl:text-right text-white ">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 ">
                                            {
                                                (showLimited ? allOrders.slice(0, 5) : allOrders)?.map((item: IOrder) =>
                                                    <tr className="w-full">
                                                        <td className="px-8 py-4 text-sm font-semibold text-gray-500  whitespace-nowrap">
                                                            {item?.product?.name}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm font-semibold text-gray-500 whitespace-nowrap">{moment.utc(item?.createdAt).format('D MMMM YYYY')}</td>
                                                        <td className="px-4 py-4 text-sm font-semibold text-gray-500 whitespace-nowrap">{item?.email}</td>
                                                        <td className="px-4 py-4 text-sm font-semibold text-gray-500   whitespace-nowrap">{item?.product?.price}</td>
                                                        <td className="px-4 py-4 text-sm font-semibold text-gray-500 whitespace-nowrap flex gap-1 relative top-1">
                                                            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                                                <DialogTrigger asChild>
                                                                    <Button variant="outline" onClick={() => setSelectedOrder(item?._id)}>
                                                                        {item?.status}
                                                                    </Button>
                                                                </DialogTrigger>
                                                                <DialogContent className="sm:max-w-[425px]">
                                                                    <Select defaultValue={item?.status} onValueChange={(value) => setStatus(value)}>
                                                                        <SelectTrigger className="w-[180px]">
                                                                            <SelectValue placeholder="Change role" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="Pending">Pending</SelectItem>
                                                                            <SelectItem value="Delivered">Delivered</SelectItem>
                                                                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <DialogFooter>
                                                                        <Button onClick={() => handleSubmit(selectedOrder)}>Save Change</Button>
                                                                    </DialogFooter>
                                                                </DialogContent>
                                                            </Dialog>

                                                        </td>
                                                        <td className="relative px-4 py-4 text-sm font-semibold text-gray-500 whitespace-nowrap">
                                                            <div className="relative inline-block">
                                                                {/* Options Icon */}
                                                                <Button onClick={() => deleteOrderData(item?._id)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</Button>
                                                            </div>
                                                        </td>
                                                    </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </section> : <aside className="mt-4">
                    <p className="text-center text-2xl font-semibold">Your cart is empty</p>
                    <p className="text-gray-500 text-lg text-center py-5">Looks like you haven't added anything yet.</p>
                    <div className="flex justify-center">
                        <Button className="bg-sky-500 rounded-full py-3 px-4 text-[15px]">Continue Shoping</Button>
                    </div>
                </aside>
            }
        </div>
    );
};

export default LatestOrders;
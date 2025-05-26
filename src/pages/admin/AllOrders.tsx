import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useChangeStatusMutation, useDeleteOrderMutation, useGetAllOrdersQuery } from "@/redux/features/user/userReletedApi";
import { useState } from "react";
import Swal from "sweetalert2";
import moment from "moment";
const AllOrders = () => {
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
    const [status, setStatus] = useState('Pending');
    const [isOpen, setIsOpen] = useState(false);
    const { data: allOrders } = useGetAllOrdersQuery(undefined);
    const [upgradeStatus] = useChangeStatusMutation();
    const [deleteOrder] = useDeleteOrderMutation();
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
    return (
        <div>
            <h2 className="text-2xl font-semibold">All Customer Orders | Admin</h2>
            <p className="text-lg text-gray-500">Manage, update, or delete customer orders from here.</p>
            <div className=" sm:-mx-6 px-6">
                <div className="inline-block min-w-full py-2 align-middle  px-0">
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
                                    allOrders?.data?.map((item: { _id: string; product: { name: string; price: number }; createdAt: string; email: string; status: string }) => <tr className="w-full">
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
    );
};

export default AllOrders;
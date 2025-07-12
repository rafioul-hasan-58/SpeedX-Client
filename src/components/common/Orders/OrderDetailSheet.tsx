import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useChangeStatusMutation } from "@/redux/features/common/orderManagementApi";
import { useAppSelector } from "@/redux/hooks";
import { IOrder } from "@/types/order.types";
import { Eye } from "lucide-react";
import moment from "moment";
import { LuLoaderCircle } from "react-icons/lu";
const OrderDetailSheet = ({ order }: { order: IOrder }) => {
    const user = useAppSelector(selectCurrentUser);
    const nextStatus = (currentStatus: string) => {
        switch (currentStatus) {
            case 'Pending':
                return 'Processing';
            case 'Processing':
                return 'Shipped';
            case 'Shipped':
                return 'Delivered';
            default:
                return null
        }

    }
    const customerNextStatus = (currentStatus: string) => {
        switch (currentStatus) {
            case 'Pending':
                return 'Cancelled';
            case 'Delivered':
                return 'Returned';
        }
    }
    const [changeStatus, { isLoading }] = useChangeStatusMutation();
    // for customer
    const changeOrderStatus = (id: string) => {
        const status = customerNextStatus(order?.status);
        const data = {
            id,
            data: { status }
        }
        changeStatus(data);
    }
    // for admin
    const makeNextStatus = (id: string) => {
        const newStatus = nextStatus(order?.status);
        const data = {
            id,
            data: { status: newStatus }
        }
        changeStatus(data)
    }
    return (
        <div>
            <Sheet>
                <SheetTrigger>
                    <Button className="px-3 py-2 bg-sky-400 hover:bg-sky-500 cursor-pointer"><Eye /></Button>
                </SheetTrigger>
                <SheetContent className="rounded-md m-4 max-h-screen lg:h-[600px] overflow-y-auto">
                    <h1 className="text-xl font-semibold border-b pb-4 text-gray-600">Order Details</h1>
                    <p className="text-gray-600">Items</p>
                    <div className="">
                        {
                            order?.items?.map((item) => (
                                <div key={item.product._id} >
                                    <section className="flex gap-3 mt-2 border-b pb-4">
                                        <img className="w-20 h-15 border rounded-md" src={item.product.images[0]} alt="img" />
                                        <article>
                                            <p className="text-gray-500">{item?.product.name.split(' ').slice(0, 4).join(' ')}</p>
                                            <p className="text-gray-500">quantity : {item.quantity}</p>
                                        </article>
                                    </section>
                                </div>
                            ))
                        }
                        <section className="text-[15px] border-b pb-5">
                            <article className="mt-3 flex justify-between">
                                <p className="text-gray-500 ">Created At</p>
                                <p className="mr-10">{moment.utc(order.createdAt).format('D MMMM YYYY')}</p>
                            </article>
                            <article className="mt-3 flex justify-between">
                                <p className="text-gray-500 ">Status</p>
                                <p className="mr-10"> <span
                                    className={`inline-block text-xs font-semibold px-3 py-[2px] rounded-sm ${order?.status === "Pending"
                                        ? "text-yellow-600 bg-yellow-100"
                                        : order?.status === "Delivered"
                                            ? "text-green-700 bg-green-100"
                                            : order?.status === "Cancelled"
                                                ? "text-red-600 bg-red-100"
                                                : "text-gray-700 bg-gray-100"
                                        }`}
                                >
                                    {order?.status}
                                </span></p>
                            </article>
                        </section>
                        <section className="text-[15px] border-b pb-5">
                            <article className="mt-3 flex justify-between">
                                <p className="text-gray-500 ">Cumtomer Name</p>
                                <p className="mr-10">{ }</p>
                            </article>
                            <article className="mt-3 flex justify-between">
                                <p className="text-gray-500 ">Email</p>
                                <p className="mr-10 text-sky-600">{order?.email}</p>
                            </article>
                            <article className="mt-3 flex justify-between">
                                <p className="text-gray-500 ">Address</p>
                                <p className="mr-10 ">{order?.address}</p>
                            </article>
                        </section>
                        <section className="mt-2">
                            <p className="text-gray-500 ">Payment</p>
                            <article className="mt-3 flex justify-between">
                                <p className="text-gray-500 ">Subtotal</p>
                                <p className="mr-10 text-sky-600">BDT.{order?.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)}</p>
                            </article>
                            <article className="mt-3 flex justify-between border-b pb-2">
                                <p className="text-gray-500 ">Shipping Cost</p>
                                <p className="mr-10 text-sky-600">BDT.{10.5 * order?.items.reduce((acc, item) => acc + item.quantity, 0)}</p>
                            </article>
                            <article className="mt-2 flex justify-between">
                                <p className="text-gray-500 ">Total Cost</p>
                                <p className="mr-10 text-sky-600">BDT.{((10.5 * order?.items.reduce((acc, item) => acc + item.quantity, 0)) + (order?.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)))}</p>
                            </article>
                        </section>
                        <div className="flex justify-center mt-4">
                            {
                                user?.email === order.buyer.email ?
                                    // customer view button
                                    <>
                                        {
                                            order.status !== 'Shipped' && order.status !== 'Processing' && order.status !== 'Cancelled' && order.status !== 'Returned' && (
                                                <Button
                                                    onClick={() => changeOrderStatus(order._id)} className={`rounded-full w-full ${order?.status === 'Pending' ? 'bg-red-500' : 'bg-gray-600'} hover:bg-red-600`}>{isLoading ? <LuLoaderCircle className="animate-spin" /> : <p>Make it {customerNextStatus(order?.status)}</p>}
                                                </Button>
                                            )
                                        }
                                    </>
                                    :
                                    // seller or admin view button
                                    <Button disabled={order.status === 'Delivered'} onClick={() => makeNextStatus(order._id)} className={`rounded-full w-full bg-sky-500 hover:bg-sky-600 ${nextStatus(order?.status) === 'Processing' ? 'bg-purple-600' : ''}`}>Make it {nextStatus(order?.status)}</Button>
                            }
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default OrderDetailSheet;
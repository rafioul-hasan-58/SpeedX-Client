import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { IOrder } from "@/types/order.types";
import { Eye } from "lucide-react";
import moment from "moment";
const OrderDetailSheet = ({ order }: { order: IOrder }) => {
    return (
        <div>
            <Sheet>
                <SheetTrigger>
                    <Button className="px-3 py-2 bg-sky-400 hover:bg-sky-500 cursor-pointer"><Eye/></Button>
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
                                <p className="mr-10">{order.status}</p>
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
                            <article className="mt-3 flex justify-between">
                                <p className="text-gray-500 ">Shipping Cost</p>
                                <p className="mr-10 text-sky-600">BDT.{10.5 * order?.items.reduce((acc, item) => acc + item.quantity, 0)}</p>
                            </article>
                            <article className="mt-3 flex justify-between">
                                <p className="text-gray-500 ">Shipping Cost</p>
                                <p className="mr-10 text-sky-600">BDT.{((10.5 * order?.items.reduce((acc, item) => acc + item.quantity, 0)) + (order?.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)))}</p>
                            </article>
                        </section>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default OrderDetailSheet;
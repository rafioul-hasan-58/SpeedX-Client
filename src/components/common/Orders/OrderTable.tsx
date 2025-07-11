import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IOrder } from "@/types/order.types";
import moment from "moment";
import OrderDetailSheet from "./OrderDetailSheet";

const OrderTable = ({ data }: { data: IOrder[] | undefined }) => {
    return (
        <div className="lg:overflow-x-auto overflow-x-scroll border border-gray-200 ">
            <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-sky-400 h-[35px]">
                    <tr className="">
                        <th scope="col" className="px-4  text-sm font-semibold text-left rtl:text-right text-white ">
                            Customer Name
                        </th>
                        <th scope="col" className="px-4 text-sm font-semibold text-left rtl:text-right text-white ">
                            Price
                        </th>
                        <th scope="col" className="px-4 text-sm font-semibold text-left rtl:text-right text-white ">
                            Date
                        </th>
                        <th scope="col" className="px-4 text-sm font-semibold text-left rtl:text-right text-white ">
                            Status
                        </th>
                        <th scope="col" className="px-4 text-sm font-semibold text-left rtl:text-right text-white ">
                            View
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                    {
                        (data ?? [])?.map((order: IOrder) =>
                            <tr key={order._id} className="w-full">

                                <td className="px-4  text-sm text-gray-500  whitespace-nowrap py-2">
                                    <article className="flex gap-2">
                                        <Avatar>
                                            <AvatarImage
                                                className="relative top-1 rounded-full border border-sky-500"
                                                src={order.buyer.image || "https://github.com/shadcn.png"}
                                            />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h1 className="font-semibold text-black">{order.buyer.name}</h1>
                                            <p className="text-sm">{order.buyer.email}</p>
                                        </div>
                                    </article>
                                </td>
                                <td className="px-4  text-sm  whitespace-nowrap text-sky-500 font-semibold">BDT. {order?.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)}</td>

                                <td className="px-4  text-sm text-gray-500  whitespace-nowrap">{moment.utc(order?.createdAt).format('D MMMM YYYY')}</td>

                                <td className="px-4 py-2 whitespace-nowrap">
                                    <span
                                        className={`inline-block text-xs font-semibold px-3 py-[2px] rounded-sm ${order?.status === "Pending"
                                                ? "text-yellow-600 bg-yellow-100"
                                                : order?.status === "Delivered"
                                                    ? "text-green-700 bg-green-100"
                                                    : order?.status === "Cancelled"
                                                        ? "text-red-600 bg-red-100"
                                                        : order?.status === "Processing"
                                                            ? "text-blue-700 bg-blue-100"
                                                            : order?.status === "Shipped"
                                                                ? "text-purple-700 bg-purple-100"
                                                                : "text-gray-700 bg-gray-100"
                                            }`}
                                    >
                                        {order?.status}
                                    </span>

                                </td>
                                <td className="px-4  text-sm text-gray-500 whitespace-nowrap">
                                    <OrderDetailSheet order={order} />
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { IOrder } from "@/types/order.types";
const OrderDetailSheet = ({ order }: { order: IOrder }) => {
    return (
        <div>
            <Sheet>
                <SheetTrigger>
                    <Button className="bg-white border border-teal-500 text-teal-500">View Details</Button>
                </SheetTrigger>
                <SheetContent className="rounded-md m-4 max-h-screen lg:h-[600px]">
                    <h1 className="text-xl font-semibold border-b pb-3 text-gray-600">Order Details</h1>
                    <p className="text-gray-600">Items</p>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default OrderDetailSheet;
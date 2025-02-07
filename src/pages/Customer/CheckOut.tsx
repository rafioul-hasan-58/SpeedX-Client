import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/features/admin/productManagement.Api";

const CheckOut = () => {
    const { id } = useParams()
    const { data } = useGetProductDetailsQuery(id);
    const checkoutData = data?.data;
    console.log(checkoutData);
    return (
        <div className="w-full flex justify-between mx-32 gap-8">
            <div className="w-1/3 border border-blue-600 bg-white p-3">
                <h1 className="text-[17px] font-semibold">Customer Information</h1>
            </div>
            <div className="w-2/3 border border-red-500 bg-white p-3">
                <h1 className="text-[17px] font-semibold">Order Summery</h1>
            </div>
        </div>
    );
};

export default CheckOut;
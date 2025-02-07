import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/features/admin/productManagement.Api";
import { Button } from "antd";

const CheckOut = () => {
    const { id } = useParams()
    const { data } = useGetProductDetailsQuery(id);
    const checkoutData = data?.data;
    return (
        <div className=" flex justify-between mx-24 gap-5">
            <div className="w-1/3 pt-10">
                <div>
                    <h1 className="text-[17px] mb-2 font-semibold h-[50px] p-3 bg-white">Customer Information</h1>
                </div>
                <div className="bg-white p-4 lg:h-[520px] mb-10">
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-semibold text-gray-500">Full Name</label>
                        <input
                            className="w-full pl-5 py-3.5 border-gray-300  text-gray-700 border focus:outline-none focus:shadow-outline placeholder-gray-500"
                            name='name'
                            type="text"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-semibold text-gray-500">Address Line</label>
                        <input
                            className="w-full pl-5 pt-3 pb-6 border-gray-300  text-gray-700 border focus:outline-none focus:shadow-outline placeholder-gray-500"
                            name='address'
                            type="text"
                            placeholder="Enter your Adress"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-semibold text-gray-500">Email</label>
                        <input
                            className="w-full pl-5 py-3.5 border-gray-300  text-gray-700 border focus:outline-none focus:shadow-outline placeholder-gray-500"
                            name='email'
                            type="email"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-semibold text-gray-500">Phone Number</label>
                        <input
                            className="w-full pl-5 py-3.5 border-gray-300  text-gray-700 border focus:outline-none focus:shadow-outline placeholder-gray-500"
                            name='phone'
                            type="number"
                            placeholder="Enter your Number"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-semibold text-gray-500">Order Note</label>
                        <input
                            className="w-full pl-5 py-3.5 border-gray-300  text-gray-700 border focus:outline-none focus:shadow-outline placeholder-gray-500"
                            name='orderNote'
                            type="text"
                            placeholder="Enter Order Note(Optional)"
                        />
                    </div>
                </div>
            </div>
            <div className="w-2/3   ">
                <div className="pt-10">
                    <h1 className="text-[17px] bg-white mb-2 font-semibold h-[50px] p-3 ">Order Summery</h1>
                </div>
                <div className="bg-white">
                    {/* first child */}
                    <div className="flex justify-between pt-10 mx-10">
                        <div className="flex">
                            <img className=" h-[200px] w-[250px] border-gray-300" src={checkoutData?.image} alt="" />
                            <div className="mt-4">
                                <h1 className="text-lg py-2 font-semibold w-[150px]">{checkoutData?.name}</h1>
                                <p className="text-sm font-semibold pb-2 text-sky-400">Color : <span className="text-black">
                                    {checkoutData?.color}</span></p>
                                <p className="text-lg font-semibold text-gray-500">BDT {checkoutData?.price}</p>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold text-gray-500 mt-16">Quantity 1</h1>
                        </div>
                    </div>
                    {/* second child */}
                    <div className="px-10 mt-5">
                        <h1 className="text-lg font-semibold ">Cart Subtotal</h1>
                        <div className="flex justify-between text-gray-500 py-3.5">
                            <h1>Subtotal</h1>
                            <p>BDT 435353</p>
                        </div>
                        <div className="flex justify-between text-gray-500 border-b pb-6">
                            <h1>Shipping Charge</h1>
                            <p>BDT 0</p>
                        </div>
                        <div className="flex justify-between py-6">
                            <h1>Grand Total</h1>
                            <p>BDT 98347573</p>
                        </div>
                        <div>
                            <Button className="w-full" style={{backgroundColor:'#0ea5e9'}} >Buy Now</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
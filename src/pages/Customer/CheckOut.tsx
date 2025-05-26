import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/features/admin/productManagement.Api";
import { Button } from "antd";
import { useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { usePressOrderMutation } from "../../redux/features/user/userReletedApi";
import { toast } from "sonner";
import { LuLoaderCircle } from "react-icons/lu";
const CheckOut = () => {
    const [pressOrder, { isLoading}] = usePressOrderMutation()
    console.log();
    const [quantity, setQuantity] = useState(1)
    const { id } = useParams()
    const { data } = useGetProductDetailsQuery(id);
    const checkoutData = data?.data;
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const productQuantity = Number(quantity)
        const orderData = {
            product: checkoutData._id,
            quantity: productQuantity,
            status: 'Pending',
            contact: Number(data.contact),
            email: data.email,
            address: data.address,
        }
        const res = await pressOrder(orderData)
        if (res?.data?.success) {

            toast.success(res?.data?.message)
            setTimeout(() => {
            }, 2000);
            reset()
            window.location.href = res?.data?.data?.payment?.checkout_url
        }

    }
    const errorSize = Object.keys(errors).length;
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" flex justify-between mx-24 gap-5">
                <div className="w-1/3 pt-10">
                    <div>
                        <h1 className="text-[17px] mb-2 font-semibold h-[50px] p-3 bg-white">Customer Information</h1>
                    </div>
                    <div className={`bg-white p-4 mb-10 lg:h-[${520 + errorSize * 20}px]`}>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-semibold text-gray-500">Full Name</label>
                            <input
                                className="w-full pl-5 py-3.5 border-gray-300  text-gray-700 border focus:outline-none focus:shadow-outline placeholder-gray-500"
                                {...register("name", { required: "Name is required" })}
                                name='name'
                                type="text"
                                placeholder="Enter your name"
                            />
                            {errors.name && <p className="text-red-500">{errors.name.message as string}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-semibold text-gray-500">Address Line</label>
                            <input
                                className="w-full pl-5 pt-3 pb-6 border-gray-300  text-gray-700 border focus:outline-none focus:shadow-outline placeholder-gray-500"
                                {...register('address', { required: "Address is required" })}
                                name='address'
                                type="text"
                                placeholder="Enter your Adress"
                            />
                            {errors.address && <p className="text-red-500">{errors.address.message as string}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-semibold text-gray-500">Email</label>
                            <input
                                className="w-full pl-5 py-3.5 border-gray-300  text-gray-700 border focus:outline-none focus:shadow-outline placeholder-gray-500"
                                {...register('email', { required: "email is required" })}
                                name='email'
                                type="email"
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="text-red-500">{errors.email.message as string}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-semibold text-gray-500">Phone Number</label>
                            <input
                                className="w-full pl-5 py-3.5 border-gray-300  text-gray-700 border focus:outline-none focus:shadow-outline placeholder-gray-500"
                                {...register('contact', { required: "Contact is required" })}
                                name='contact'
                                type="number"
                                placeholder="Enter your Number"
                            />
                            {errors.contact && <p className="text-red-500">{errors.contact.message as string}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-semibold text-gray-500">Order Note</label>
                            <input
                                className="w-full pl-5 py-3.5 border-gray-300  text-gray-700 border focus:outline-none focus:shadow-outline placeholder-gray-500"
                                {...register('orderNote')}
                                name='orderNote'
                                type="text"
                                placeholder="Enter Order Note(Optional)"
                            />
                        </div>

                    </div>
                </div>
                <div className="w-2/3   lg:h-[520px]">
                    <div className="pt-10">
                        <h1 className="text-[17px] bg-white mb-2 font-semibold h-[50px] p-3 ">Order Summery</h1>
                    </div>
                    <div className="bg-white">
                        {/* first child */}
                        <div className="flex justify-between pt-10 mx-10">
                            <div className="flex gap-5">
                                <img className=" h-[200px] w-[250px] border-gray-300" src={checkoutData?.images[0]} alt="" />
                                <div className="mt-4">
                                    <h1 className="text-lg py-2 font-semibold w-[150px]">{checkoutData?.name}</h1>
                                    <p className="text-sm font-semibold pb-2 text-sky-400">Color : <span className="text-black">
                                        {checkoutData?.color}</span></p>
                                    <p className="text-lg font-semibold text-gray-500">BDT {checkoutData?.price}</p>
                                </div>
                            </div>
                            <div className="flex mt-16 gap-5">
                                <h1 className="text-lg font-semibold text-gray-500 ">Quantity {quantity}</h1>
                                <div className="text-sky-400">
                                    <CiCirclePlus onClick={() => setQuantity(quantity + 1)} />
                                    <CiCircleMinus onClick={() => setQuantity(quantity - 1)} />
                                </div>
                            </div>
                        </div>
                        {/* second child */}
                        <div className="px-10 mt-5 ">
                            <h1 className="text-lg font-semibold ">Cart Subtotal</h1>
                            <div className="flex justify-between text-gray-500 py-3.5">
                                <h1>Subtotal</h1>
                                <p>BDT {quantity * checkoutData?.price}</p>
                            </div>
                            <div className="flex justify-between text-gray-500 border-b pb-6">
                                <h1>Shipping Charge</h1>
                                <p>BDT 0</p>
                            </div>
                            <div className="flex justify-between py-6">
                                <h1>Grand Total</h1>
                                <p>BDT {quantity * checkoutData?.price}</p>
                            </div>
                            <div>
                                <Button htmlType="submit" className="w-full mb-5 uppercase" style={{ backgroundColor: '#0ea5e9', color: 'white', borderRadius: '100px 100px 100px 100px', padding: '20px 0px 20px 0px', fontSize: '15px' }} >{isLoading ? <LuLoaderCircle className="animate-spin" /> : 'Order Now'}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CheckOut;
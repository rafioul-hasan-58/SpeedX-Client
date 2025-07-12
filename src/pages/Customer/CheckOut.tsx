import { useMemo, useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LuLoaderCircle } from "react-icons/lu";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeProduct } from "@/redux/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetBikeDetailsQuery } from "@/redux/features/common/bikeManagementApi";
import { usePressOrderMutation } from "@/redux/features/common/orderManagementApi";
const CheckOut = () => {
    const [pressOrder, { isLoading }] = usePressOrderMutation()
    const [quantity, setQuantity] = useState(1);
    const [searchParams] = useSearchParams();
    // params to check from where users come
    const id = useMemo(() => searchParams.get('productId'), [searchParams]);
    const fromCart = useMemo(() => searchParams.get('from'), [searchParams]);
    // conditional rendering to avoid unnessesary render
    const { data } = useGetBikeDetailsQuery(id, { skip: !id || fromCart === 'cart' });
    // data from cart
    const products = useAppSelector((state) => state.products.products).filter(p => p.isChecked === true);
    const dispatch = useAppDispatch();
    const checkoutData = data?.data;
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const subTotal = products.reduce((total, product) => total + product.price * product.quantity, 0);
    const items = products.map(product => ({
        product: product._id,
        quantity: product.quantity
    }));
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const productQuantity = Number(quantity);
        const orderData = {
            items: fromCart === 'cart' ? items : [
                {
                    product: checkoutData?._id,
                    quantity: productQuantity
                }
            ],
            status: 'Pending',
            contact: Number(data.contact),
            email: data.email,
            address: data.address,
        }
        const res = await pressOrder(orderData);
        // console.log(res);
        if (res?.data?.success) {
            if (fromCart === 'cart') {
                products.forEach(product => {
                    dispatch(removeProduct(product._id))
                })
            }

            toast.success(res?.data?.message);
            setTimeout(() => {
            }, 2000);
            reset()
            window.location.href = res?.data?.data?.payment?.checkout_url
        }

    }
    const user=useAppSelector(selectCurrentUser);
    const errorSize = Object.keys(errors).length;
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="pb-16">
            <div className="flex lg:flex-row flex-col justify-between lg:mx-24 mx-2 lg:gap-5">
                <div className="w-full lg:w-1/3 pt-10">
                    <h1 className="text-[17px] mb-2 font-semibold h-[50px] p-3 bg-white">Customer Information</h1>
                    <div className={`bg-white p-4 mb-10 lg:h-[${520 + errorSize * 20}px] w-full`}>
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
                                defaultValue={user?.email}
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
                <div className={` lg:w-2/3 lg:max-h-[600px]  ${fromCart === 'cart' && products.length > 1 ? 'overflow-y-auto' : ''}`}>
                    <div className="lg:pt-10">
                        <h1 className="text-[17px] bg-white mb-2 font-semibold h-[50px] p-3 ">Order Summery</h1>
                    </div>
                    <div className="bg-white">
                        {/* first child */}
                        {
                            fromCart === 'cart' ? products.map((product) => (<div key={product._id} className="flex justify-between pt-10 lg:mx-10 ">
                                <div className="flex lg:gap-5 gap-2">
                                    <img className=" lg:h-[200px] h-[150px] w-[150px] lg:w-[250px] border-gray-300" src={product?.images[0]} alt="" />
                                    <div className="lg:mt-4">
                                        <h1 className=" text-lg py-2 font-semibold lg:w-[250px] w-[220px]">{product?.name}</h1>
                                        <p className="text-sm font-semibold pb-2 text-sky-400">Color : <span className="text-black">
                                            {product?.color}</span></p>
                                        <p className="text-lg font-semibold text-gray-500">BDT {product?.price}</p>
                                    </div>
                                </div>
                                <div className="flex mt-16 lg:gap-5 ">
                                    <h1 className="w-[100px] text-lg font-semibold text-gray-500 ">Quantity {product.quantity}</h1>
                                </div>
                            </div>
                            ))
                                :
                                <div className="flex justify-between pt-10 lg:mx-10 ">
                                    <div className="flex lg:gap-5 gap-2">
                                        <img className=" lg:h-[200px] h-[150px] w-[150px] lg:w-[250px] border-gray-300" src={checkoutData?.images[0]} alt="" />
                                        <div className="lg:mt-4">
                                            <h1 className=" text-lg py-2 font-semibold lg:w-[250px] w-[220px]">{checkoutData?.name}</h1>
                                            <p className="text-sm font-semibold pb-2 text-sky-400">Color : <span className="text-black">
                                                {checkoutData?.color}</span></p>
                                            <p className="text-lg font-semibold text-gray-500">BDT {checkoutData?.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex mt-16 lg:gap-5 ">
                                        <h1 className="w-[100px] text-lg font-semibold text-gray-500 ">Quantity {quantity}</h1>
                                        <div className="text-sky-400  mr-2">
                                            <CiCirclePlus onClick={() => setQuantity(quantity + 1)} />
                                            <CiCircleMinus onClick={() => setQuantity(quantity - 1)} />
                                        </div>
                                    </div>
                                </div>
                        }
                        {/* second child */}
                        <div className="px-10 mt-5 ">
                            <h1 className="text-lg font-semibold ">Cart Subtotal</h1>
                            <div className="flex justify-between text-gray-500 py-3.5">
                                <h1>Subtotal</h1>
                                <p>BDT {fromCart === 'cart' ? subTotal : quantity * checkoutData?.price}</p>
                            </div>
                            <div className="flex justify-between text-gray-500 border-b pb-6">
                                <h1>Shipping Charge</h1>
                                <p>BDT 0</p>
                            </div>
                            <div className="flex justify-between py-6">
                                <h1>Grand Total</h1>
                                <p>BDT {fromCart === 'cart' ? subTotal : quantity * checkoutData?.price}</p>
                            </div>
                            <div className="pb-8">
                                <Button className="w-full rounded-full bg-sky-400 hover:bg-sky-500">{isLoading ? <LuLoaderCircle className="animate-spin" /> : 'Order Now'}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CheckOut;
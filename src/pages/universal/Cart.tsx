import { Button } from "@/components/ui/button";
import { decreseQuantity, increseQuantity, removeProduct, toggleCheckbox } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Checkbox } from "antd";
import { Minus, Plus, TrashIcon } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
    const products = useAppSelector((state) => state.products.products);
    const dispatch = useAppDispatch();
    const subtotal = products
        .filter(product => product.isChecked)
        .reduce((total, product) => total + product.price * product.quantity, 0);

    return (
        <div className="h-screen w-full flex lg:flex-row flex-col lg:px-24 lg:gap-6 lg:py-12 overflow-y-auto">
            <div className="lg:w-[65%] mx-2">
                <aside className=" bg-white">
                    <p className="text-xl font-semibold py-3 pl-3">My Cart({products?.length})</p>
                </aside>

                {
                    products && products.length > 0 ? products.map((product) => (
                        <aside key={product._id} className="mt-1.5 flex bg-white px-4 py-6 w-full">
                            <section className="flex gap-6 w-full">
                                <Checkbox
                                    checked={product.isChecked}
                                    onChange={() => dispatch(toggleCheckbox(product._id))}
                                    className="relative bottom-10" />
                                <div>
                                    <img className="lg:h-[120px] h-[80px] w-[150px]" src={product.images[0] || "https://res.cloudinary.com/dyyhkoj7b/image/upload/v1748237961/oqbajaiaocn27dqr6ihf.jpg"} alt="project1" />
                                </div>
                                <div className="w-full">
                                    <div className="flex  justify-between">
                                        <p className="font-semibold text-lg">{product.name}</p>
                                        <p className=""><TrashIcon onClick={() => {
                                            dispatch(removeProduct(product._id));
                                            toast.error("Product removed from cart");
                                        }} className="border rounded-full text-gray-500 p-1 hover:bg-red-500 hover:text-white cursor-pointer" size={26} /></p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="my-4"><span className="text-sky-400">Color:</span>{product.color}</p>
                                        <div className="text-gray-500 flex gap-4 items-center">
                                            <p>Quantity</p>
                                            <Minus onClick={() => dispatch(decreseQuantity(product._id))} size={22} className="border border-gray-500 p-0.5 rounded-sm cursor-pointer" />

                                            <p>{product?.quantity}</p>
                                            <Plus onClick={() => dispatch(increseQuantity(product._id))} size={22} className="border border-gray-500 p-0.5 rounded-sm cursor-pointer" />

                                        </div>
                                    </div>
                                    <p className="text-gray-500 font-semibold text-lg">BDT {product.price}</p>
                                </div>
                            </section>
                        </aside>)) : <aside className="mt-4">
                        <p className="text-center text-2xl font-semibold">Your cart is empty</p>
                        <p className="text-gray-500 text-lg text-center py-5">Looks like you haven't added anything yet.</p>
                        <div className="flex justify-center">
                            <Link to='/'>
                                <Button className="bg-sky-500 rounded-full py-3 px-4 text-[15px]">Continue Shoping</Button>
                            </Link>
                        </div>
                    </aside>
                }
            </div>
            <div className="lg:w-[35%] mx-2">
                <aside className=" bg-white">
                    <p className="text-xl font-semibold py-3 pl-3">Order summery</p>
                </aside>
                <aside className="bg-white mt-1.5 p-6">
                    <p className="font-semibold">Cart Subtotal</p>
                    <section className="flex justify-between py-5 text-gray-500 border-b">
                        <p>subtotal</p>
                        <p>BDT {subtotal}</p>
                    </section>
                    <section className="flex justify-between py-6">
                        <p>Total</p>
                        <p className="font-semibold">BDT {subtotal}</p>
                    </section>
                    <section className="flex gap-3">
                        <Checkbox />
                        <p className="text-sm text-gray-500">Upon clicking "Place Order", I confirm I have read and acknowledge all <span className="text-sky-400">terms and policies.</span></p>
                    </section>
                    <Link to={`/customer/check-out?from=cart`}>
                    <Button className="rounded-full my-6 bg-sky-500 w-full py-6 px-2">Proceed To Checkout</Button>
                    </Link>
                </aside>
            </div>
        </div>

    );
};

export default Cart;
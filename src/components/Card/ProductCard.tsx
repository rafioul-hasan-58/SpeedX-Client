
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { IProduct } from '@/types/product.types';
import { Button } from '../ui/button';
import { IoCartOutline } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toast } from 'react-hot-toast';
import { addProduct } from '@/redux/features/cart/cartSlice';



const ProductCard: FC<{ item: IProduct }> = ({ item }) => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.products.products);
    return (
        <article className='border-[3px] bg-white  border-gray-200  lg:h-[410px] rounded-lg '>
            <Link to={`/customer/product-details/${item?._id}`}>
                <img className='lg:h-[200px] w-full  bg-white border-b-[1px] border-gray-200' src={item?.images[0]} alt={item.images[0] || "product img"} />
            </Link>
            <div className='mx-3'>
                <div className='flex justify-between  my-2'>
                    <p className='w-full font-semibold'>{item?.name}</p>
                    {
                        item?.type === 'new' ? <h1 className='lg:block hidden mt-3 text-sky-500 border px-2 rounded-full border-sky-500 h-[25px] text-[12px] font-semibold pt-0.5'>NEW</h1> : <h1 className='lg:block hidden mt-3 text-gray-600 border px-2 rounded-full border-black h-[25px] text-[12px] font-semibold pt-0.5'>USED</h1>
                    }
                </div>
                <p className='text-[20px] text-sky-400 font-semibold'>€{item?.price}</p>
                <div className=' h-[50px]'>
                    <p className='text-[14px] font-semibold text-gray-500'>Available Colors:</p>
                    <p className='w-full font-semibold'>{item?.color}</p>
                </div>
                <div className="flex lg:flex-row flex-col w-full  gap-2 lg:gap-x-2">
                    <Link className='flex-1' to={`/customer/check-out?productId=${item?._id}`}>
                        <Button
                            className="h-[40px] text-white bg-sky-400 border border-sky-400 rounded-full text-[12px] hover:bg-sky-500  w-full"
                        >
                            BUY NOW
                        </Button>
                    </Link>
                    <div className='flex-1' >
                        <Button
                            onClick={() => {
                                const exists = cart.some(p => p._id === item._id);
                                if (exists) {
                                    toast.error('Already Exists')
                                } else {
                                    dispatch(addProduct(item));
                                    toast.success('Product added to cart');
                                }

                            }}
                            className="h-[40px] text-[12px] text-sky-400 bg-white border border-sky-400 rounded-full hover:bg-sky-100  w-full"
                        >
                            <IoCartOutline />
                            Add To Cart
                        </Button>
                    </div>
                </div>

            </div>
        </article>
    );
};

export default ProductCard;
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { IProduct } from '@/types/product.types';
import { Button } from '../ui/button';
import { IoCartOutline } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toast } from 'react-hot-toast';
import { addProduct } from '@/redux/features/cart/cartSlice';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { useGetMyProfileQuery } from '@/redux/features/user/userReletedApi';

const ProductCard: FC<{ item: IProduct }> = ({ item }) => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.products.products);
    const user = useAppSelector(selectCurrentUser);
    const { data: sellerProfile } = useGetMyProfileQuery(item?.addedBy);
    return (
        <article className='border bg-white border-gray-200 rounded-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 h-full lg:max-h-[390px] max-w-[400px]'>
            <Link to={`/customer/product-details/${item?._id}`}>
                <img
                    className='h-48 w-full object-cover rounded-t-lg border-b border-gray-200'
                    src={item?.images[0]}
                    alt={item.images[0] || "product image"}
                />
            </Link>

            <div className='flex flex-col justify-between p-4 h-full'>
                <div className='flex justify-between items-start mb-2'>
                    <p className='font-semibold text-[16px] truncate w-[80%]'>{item?.name}</p>
                    {
                        item.stocks === 0 ? <p className='text-[12px] font-semibold px-2 rounded-full h-[22px] leading-5 border border-red-500 text-red-500'>Sold</p> : <span className={`text-[12px] font-semibold px-2 rounded-full h-[22px] leading-5 ${item?.type === 'new'
                            ? 'text-sky-500 border border-sky-500'
                            : 'text-gray-600 border border-black'
                            }`}>
                            {item?.type?.toUpperCase()}
                        </span>
                    }
                </div>

                <p className='text-[20px] text-sky-400 font-semibold mb-1'>€{item?.price}</p>

                <div className='mb-3'>
                    <p className='text-[14px] font-medium text-gray-500'>Available Colors:</p>
                    <p className='text-[14px] font-semibold text-gray-700 truncate'>{item?.color}</p>
                </div>

                <div className="mt-auto flex flex-col lg:flex-row gap-2">
                    <Link className='flex-1' to={`/customer/check-out?productId=${item?._id}`}>
                        <Button disabled={user?.email === item.addedBy || item.stocks === 0} className="h-10 text-white bg-sky-400 border border-sky-400 rounded-full text-[12px] hover:bg-sky-500 w-full">
                            BUY NOW
                        </Button>
                    </Link>
                    <div className='flex-1'>
                       <Button
                            disabled={user?.email === item.addedBy || item.stocks === 0 ||sellerProfile?.data?.role!=='admin'}
                            onClick={() => {
                                const exists = cart.some(p => p._id === item._id);
                                if (exists) {
                                    toast.error('Already Exists');
                                } else {
                                    dispatch(addProduct(item));
                                    toast.success('Product added to cart');
                                 }
                            }}
                            className="h-10 text-[12px] text-sky-400 bg-white border border-sky-400 rounded-full hover:bg-sky-100 w-full flex items-center justify-center gap-1"
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

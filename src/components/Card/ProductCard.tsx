
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { IProduct } from '@/types/product.types';
import { Button } from '../ui/button';



const ProductCard: FC<{ item: IProduct }> = ({ item }) => {
    return (
        <article className='border-[3px] bg-white  border-gray-200 lg:w-[330px] lg:h-[410px] rounded-lg '>
            <div>
                <img className='lg:h-[200px] w-full  bg-white border-b-[1px] border-gray-200' src={item?.images[0]} alt={item.images[0] || "product img"} />
            </div>
            <div className='mx-3'>
                <div className='flex justify-between  my-2'>
                    <p className='w-[200px] font-semibold'>{item?.name}</p>
                    {
                        item?.type === 'new' ? <h1 className='lg:block hidden mt-3 text-sky-500 border px-2 rounded-full border-sky-500 h-[25px] text-[12px] font-semibold pt-0.5'>NEW</h1> : <h1 className='lg:block hidden mt-3 text-gray-600 border px-2 rounded-full border-black h-[25px] text-[12px] font-semibold pt-0.5'>USED</h1>
                    }
                </div>
                <p className='text-[20px] text-sky-400 font-semibold'>€{item?.price}</p>
                <div className=' h-[50px]'>
                    <p className='text-[14px] font-semibold text-gray-500'>Available Colors:</p>
                    <p className='w-[250px] font-semibold'>{item?.color}</p>
                </div>
                <div className='flex lg:flex-row justify-between flex-col gap-3 lg:mx-7'>
                    <Link to={`/customer/check-out/${item?._id}`} >
                        <Button
                            className="h-[40px] text-white bg-sky-400  border border-sky-400 rounded-full text-[15px] w-full hover:bg-sky-500"
                        >
                            BUY NOW
                        </Button>
                    </Link>
                    <Link to={`/customer/product-details/${item?._id}`}>
                        <Button
                            className="h-[40px] text-[15px] text-sky-400 bg-white border border-sky-400 rounded-full hover:bg-sky-100 w-full"
                        >
                            VIEW MORE
                        </Button>
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;
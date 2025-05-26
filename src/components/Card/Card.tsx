import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { IProduct } from '@/types/product.types';



const Card: FC<{ item: IProduct }> = ({ item }) => {
    return (
        <article className='border-[3px] bg-white  border-gray-200 lg:w-[315px] lg:h-[472px] rounded-lg'>
            <div>
                <img className='lg:h-[200px] w-full  bg-white border-b-[1px] border-gray-200' src={item?.images[0]} alt={item.images[0] || "product img"} />
            </div>
            <div className='mx-3'>
                <div className='flex justify-between  my-4'>
                    <p className='w-[200px] font-semibold'>{item?.name}</p>
                    <h1 className='relative pt-1 top-2 text-sky-400 border-2 px-2 rounded-full border-sky-400 h-[30px] text-[13px] font-bold'>NEW</h1>
                </div>
                <p className=' text-[20px] text-sky-400 font-semibold'>€{item?.price}</p>
                <div className='my-4 h-[70px]'>
                    <p className=' text-[14px] font-semibold text-gray-500'>Available Colors:</p>
                    <p className=' w-[250px] font-semibold'>{item?.color}</p>
                </div>
                <div className='flex justify-between  mx-3'>
                    <Link to={`/customer/check-out/${item?._id}`} >
                        <Button
                            className="px-5 py-3  h-[40px] text-white bg-sky-400 hover:bg-sky-500 border border-sky-400 rounded-full text-[15px]"
                        >
                            BUY NOW
                        </Button>
                    </Link>
                    <Link to={`/customer/product-details/${item?._id}`}>
                        <Button
                            className="px-5  py-3 h-[40px] text-[15px] text-sky-400 bg-white border border-sky-400 rounded-full hover:bg-sky-100"
                        >
                            VIEW MORE
                        </Button>
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default Card;
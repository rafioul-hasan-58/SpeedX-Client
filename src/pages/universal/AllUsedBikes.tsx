import { Checkbox } from 'antd';
import BrandCarosel from '../../components/Brands/BrandCarosel';
import ProductCard from '../../components/Card/ProductCard';
import { useGetAllProductsQuery } from '../../redux/features/admin/productManagement.Api';
import { useEffect, useState } from 'react';
import { IProduct } from '../../types/product.types';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector } from '../../redux/hooks';
interface Filter {
    name: string;
    value: string | number;
}
const AllUsedBikes = () => {
    const [queries, setQueries] = useState<Filter[]>([]);
    const { register, handleSubmit } = useForm();
    const { data: products } = useGetAllProductsQuery(queries);
    const handleBrandBoxChange = (name: string, value: string, checked: boolean) => {
        if (checked) {
            setQueries((prevFilters) => [...prevFilters, { name: `filterBy${name}`, value }]);
        } else {
            setQueries((prevFilters) =>
                prevFilters.filter((filter) => filter.value !== value)
            );
        }
    }
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const minPrice = data.minPrice ? Number(data.minPrice) : null;
        const maxPrice = data.maxPrice ? Number(data.maxPrice) : null;
        setQueries((prevFilters) => {
            const updatedFilters = prevFilters.filter(filter => filter.name !== 'minPrice' && filter.name !== 'maxPrice');

            if (minPrice !== null) {
                updatedFilters.push({ name: 'minPrice', value: minPrice });
            }
            if (maxPrice !== null) {
                updatedFilters.push({ name: 'maxPrice', value: maxPrice });
            }
            return updatedFilters;
        });
        // console.log(data);
    };
    const searchTerm = useAppSelector((state) => state.searchTerm.searchTerm)
    useEffect(() => {
        setQueries((prevFilters) => {
            // Remove existing searchTerm filter
            const updatedFilters = prevFilters.filter(filter => filter.name !== 'searchTerm');

            // Add searchTerm only if it's not empty
            if (searchTerm.trim() !== '') {
                updatedFilters.push({ name: 'searchTerm', value: searchTerm });
            }
            return updatedFilters;
        });
    }, [searchTerm]);
    return (
        <div>
            <div className='mx-[100px] py-12'>
                <h1 className="text-4xl font-bold border-b border-gray-300 pb-6">Top Brands</h1>
                <div className='pt-8 pb-16'>
                    <BrandCarosel />
                </div>
                <h1 className="text-4xl font-bold border-b border-gray-300 pb-6">All Available Bikes</h1>
                <div className='mt-8 flex gap-10'>
                    <div className='bg-white lg:w-[305px] mb-10 lg:h-[760px] pb-16'>
                        <h1 className='text-lg px-8 pt-4 font-semibold pb-4 text-sky-500 border-b border-gray-300'>Filter</h1>
                        <div className='px-8 pt-4'>
                            <h1 className='text-[15px] pb-4 font-semibold'>Brands</h1>
                            <div className='space-y-3.5 pb-4'>
                                <div>
                                    <Checkbox onChange={(e) => handleBrandBoxChange('brand', "Honda", e.target.checked)} style={{ color: 'gray' }}>Honda</Checkbox>
                                </div>
                                <div>
                                    <Checkbox onChange={(e) => handleBrandBoxChange('brand', "KTM", e.target.checked)} style={{ color: 'gray' }}>KTM</Checkbox>
                                </div>
                                <div>
                                    <Checkbox onChange={(e) => handleBrandBoxChange('brand', "BMW", e.target.checked)} style={{ color: 'gray' }}>BMW</Checkbox>
                                </div>
                                <div>
                                    <Checkbox onChange={(e) => handleBrandBoxChange('brand', "Royal Enfield", e.target.checked)} style={{ color: 'gray' }}>Royal Enfield</Checkbox>
                                </div>
                                <div>
                                    <Checkbox onChange={(e) => handleBrandBoxChange('brand', "Hero", e.target.checked)} style={{ color: 'gray' }}>Hero</Checkbox>
                                </div>
                                <div>
                                    <Checkbox onChange={(e) => handleBrandBoxChange('brand', "Yamaha", e.target.checked)} style={{ color: 'gray' }}>Yamaha</Checkbox>
                                </div>
                            </div>
                            <div className='border-y border-gray-200 py-4'>
                                <p className='text-[15px] pb-4 font-semibold '>Price Range</p>
                                <form onChange={handleSubmit(onSubmit)}>
                                    <div className='flex gap-3'>
                                        <input
                                            {...register('maxPrice')}
                                            className='border border-gray-300 w-[100px] h-[35px]  rounded-md pl-4 focus:outline-none'
                                            placeholder='Max'
                                            type="text" />
                                        <input
                                            {...register('minPrice')}
                                            className='border border-gray-300 w-[100px] h-[35px]  rounded-md pl-4 focus:outline-none'
                                            placeholder='Min'
                                            type="text" />
                                    </div>
                                </form>
                            </div>
                            <p className='text-[15px] py-4 font-semibold'>Category</p>
                            <div className='border-b border-gray-200 pb-6'>
                                <div className="space-y-2">
                                    <div>
                                        <Checkbox onChange={(e) => handleBrandBoxChange('color', "Black", e.target.checked)} style={{ color: 'gray' }}>Black</Checkbox>
                                    </div>
                                    <div>
                                        <Checkbox onChange={(e) => handleBrandBoxChange('color', "Red", e.target.checked)} style={{ color: 'gray' }}>Red</Checkbox>
                                    </div>
                                    <div>
                                        <Checkbox onChange={(e) => handleBrandBoxChange('color', "Orange", e.target.checked)} style={{ color: 'gray' }}>Orange</Checkbox>
                                    </div>
                                    <div>
                                        <Checkbox onChange={(e) => handleBrandBoxChange('color', "Blue", e.target.checked)} style={{ color: 'gray' }}>Blue</Checkbox>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='grid lg:grid-cols-3 gap-10 '>
                        {
                            products?.data?.map((item: IProduct) => (
                                <ProductCard key={item.name} item={item}></ProductCard>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUsedBikes;
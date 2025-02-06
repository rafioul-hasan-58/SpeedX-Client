import { Checkbox } from 'antd';
import BrandCarosel from '../../components/Brands/BrandCarosel';
import Card from '../../components/Card/Card';
import { useGetAllProductsQuery } from '../../redux/features/admin/productManagement.Api';
import { useState } from 'react';
interface Filter {
    name: string;
    value: string;
}
const AllProducts = () => {
    const [filters, setFilters] = useState<Filter[]>([]);
    console.log(filters);
    const { data: products } = useGetAllProductsQuery(filters)
    const handleBrandBoxChange = (name: string, value: string, checked: boolean) => {
        if (name === 'brand') {
            if (checked) {
                setFilters((prevFilters) => [...prevFilters, { name: 'filterByBrand', value }]);
            } else {
                setFilters((prevFilters) =>
                    prevFilters.filter((filter) => filter.value !== value)
                );
            }
        } else if (name === 'color') {
            if (checked) {
                setFilters((prevFilters) => [...prevFilters, { name: 'filterByColor', value }]);
            } else {
                setFilters((prevFilters) =>
                    prevFilters.filter((filter) => filter.value !== value)
                );
            }
        }
    }
    return (
        <div className='mx-[100px] pt-12'>
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
                            <div className='flex gap-3'>
                                <input className='focus:border-4 focus:border-sky-200 py-2 border border-gray-300 rounded-lg w-[100px] px-3 focus:outline-sky-300' placeholder='Max' type="text" />

                                <input className='focus:border-4 focus:border-sky-200 py-2 border border-gray-300 rounded-lg w-[100px] px-3 focus:outline-sky-300' placeholder='Min' type="text" />
                            </div>
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
                <div className='grid lg:grid-cols-3 gap-10'>
                    {
                        products?.data?.map((item) => (
                            <Card key={item.name} item={item}></Card>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
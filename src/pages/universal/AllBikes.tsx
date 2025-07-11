import { Checkbox } from 'antd';
import BrandCarosel from '../../components/Brands/BrandCarosel';
import ProductCard from '../../components/Card/ProductCard';
import { useEffect, useState } from 'react';
import { IProduct } from '../../types/product.types';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector } from '../../redux/hooks';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useGetAllProductsQuery } from '@/redux/features/utils/utilsApi';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { BiMenuAltLeft } from "react-icons/bi";
import Loader from '@/components/Loader/Loader';

interface Filter {
    name: string;
    value: string | number;
}
interface TMeta {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
}
const AllBikes = () => {
    const [queries, setQueries] = useState<Filter[]>([]);
    const [searchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const type = searchParams.get('type');
    const bikeType = searchParams.get('bikeType');
    const { pathname } = useLocation();
    const [filterPage, setFilterPage] = useState(false);

    useEffect(() => {
        const newFilters: Filter[] = [];
        if (type) {
            newFilters.push({ name: 'filterBytype', value: type });
        }

        if (bikeType) {
            newFilters.push({ name: 'filterByBikeType', value: bikeType });
        }
        if (newFilters.length > 0) {
            setQueries((prevFilters) => {
                const updatedFilters = [...prevFilters];
                newFilters.forEach((newFilter) => {
                    const index = updatedFilters.findIndex((f) => f.name === newFilter.name);
                    if (index !== -1) {
                        // Replace existing filter
                        updatedFilters[index] = newFilter;
                    } else {
                        // Add new filter
                        updatedFilters.push(newFilter);
                    }
                });

                return updatedFilters;
            });
        }
    }, [type, bikeType, pathname]);

    const { register, handleSubmit } = useForm();
    const { data: products, isLoading } = useGetAllProductsQuery(queries);
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

    const searchTerm = useAppSelector((state) => state.searchTerm.searchTerm);


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

    const meta = products?.meta as TMeta;
    useEffect(() => {
        setQueries((prevFilters) => {
            const otherFilters = prevFilters.filter(f => f.name !== 'page' && f.name !== 'limit');
            return [
                ...otherFilters,
                { name: 'page', value: currentPage },
            ];
        });
    }, [currentPage]);

    return (
        <div>
            <div className='max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-20 py-12'>
                <h1 className="text-4xl font-bold border-b border-gray-300 pb-6">Top Brands</h1>
                <div className='pt-8 pb-16'>
                    <BrandCarosel />
                </div>
                <div className='flex justify-between border-b border-gray-300'>
                    <h1 className="lg:text-4xl text-2xl font-bold  pb-6">All Available Bikes</h1>
                    <div className='mt-1 lg:hidden'>
                        <BiMenuAltLeft onClick={() => setFilterPage(!filterPage)} className='text-2xl text-gray-600' />
                    </div>
                </div>
                <div className='mt-8 flex lg:flex-row flex-col gap-10'>
                    <div className={`bg-white lg:w-[305px] lg:relative absolute mb-10 lg:h-[791px] pb-16 transition-transform duration-300 ${filterPage ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 `}
                    >
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
                                    <Checkbox onChange={(e) => handleBrandBoxChange('brand', "TVS", e.target.checked)} style={{ color: 'gray' }}>TVS</Checkbox>
                                </div>
                                <div>
                                    <Checkbox onChange={(e) => handleBrandBoxChange('brand', "BMW", e.target.checked)} style={{ color: 'gray' }}>BMW</Checkbox>
                                </div>
                                <div>
                                    <Checkbox onChange={(e) => handleBrandBoxChange('brand', "Royal Enfield", e.target.checked)} style={{ color: 'gray' }}>Royal Enfield</Checkbox>
                                </div>
                                <div>
                                    <Checkbox onChange={(e) => handleBrandBoxChange('brand', "bajaj", e.target.checked)} style={{ color: 'gray' }}>Bajaj</Checkbox>
                                </div>
                                <div>
                                    <Checkbox onChange={(e) => handleBrandBoxChange('brand', "Hero", e.target.checked)} style={{ color: 'gray' }}>Hero</Checkbox>
                                </div>
                                <div>
                                    <Checkbox onChange={(e) => handleBrandBoxChange('brand', "Yamaha", e.target.checked)} style={{ color: 'gray' }}>Yamaha</Checkbox>
                                </div>
                            </div>
                            <div className='py-4'>
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
                                        <Checkbox onChange={(e) => handleBrandBoxChange('color', "gray", e.target.checked)} style={{ color: 'gray' }}>Gray</Checkbox>
                                    </div>
                                    <div>
                                        <Checkbox onChange={(e) => handleBrandBoxChange('color', "Blue", e.target.checked)} style={{ color: 'gray' }}>Blue</Checkbox>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='min-h-[300px] w-full'>
                        {isLoading ? (
                            <div className="flex  justify-center w-full h-full min-h-[300px]">
                                <Loader />
                            </div>
                        ) : (
                            <div className='grid lg:grid-cols-3 2xl:grid-cols-4 grid-cols-2 lg:gap-5 gap-2'>
                                {products?.data?.map((item: IProduct) => (
                                    <ProductCard key={item.name} item={item}></ProductCard>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* pagination */}
            {
                (products?.meta?.totalPage ?? 0) > 1 &&
                <div className="pb-8">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <Button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((prev) => prev - 1)}
                                    className="text-sky-500 border border-sky-500 hover:bg-sky-500 hover:text-white bg-white"
                                >
                                    <BiLeftArrow /> Previous
                                </Button>
                            </PaginationItem>

                            <PaginationItem>
                                <div className="flex gap-2">
                                    {[...Array(Math.max(1, meta?.totalPage || 1))].map((_, index) => (
                                        <PaginationItem key={index}>
                                            <PaginationLink
                                                onClick={() => setCurrentPage(index + 1)}
                                                href="#"
                                                className={`border text-sky-400 border-sky-500 hover:bg-sky-500 hover:border-sky-500 hover:text-white ${index === currentPage - 1 ? "bg-sky-500 text-white" : ""
                                                    }`}
                                            >
                                                {index + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                </div>
                            </PaginationItem>

                            <PaginationItem>
                                <Button
                                    disabled={currentPage === meta?.totalPage}
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                    className="bg-sky-500 text-white hover:bg-white border hover:border-sky-500 hover:text-sky-500"
                                >
                                    Next <BiRightArrow />
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            }
        </div>
    );
};

export default AllBikes;
import { useEffect, useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { Filter, TMeta } from "@/types/global";
import Loader from "@/components/Loader/Loader";
import BikeTable from "@/components/Admin/All-Bikes/BikeTable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { setSearchTerm } from "@/redux/features/user/userSlice";
import { GrPowerReset } from "react-icons/gr";
import { useGetAllBikesQuery } from "@/redux/features/common/bikeManagementApi";
const allBrandsArray = [
    { name: 'All' },
    { name: 'Yamaha' },
    { name: 'Honda' },
    { name: 'Suzuki' },
    { name: 'Royal Enfield' },
    { name: 'Hero' },
    { name: 'Bajaj' },
];
const allColorsArray = [
    { name: 'All Colors' },
    { name: 'Red' },
    { name: 'Black' },
    { name: 'Blue' },
    { name: 'Orange' }
];

const AllBikesAdmin = () => {
    // initiate queries for all bikes
    const [queries, setQueries] = useState<Filter[]>([]);
    const tabs = ["All", "Yamaha", "Honda", "Suzuki", "Royal Enfield", "Hero", "Bajaj"];
    const { data: products, isFetching } = useGetAllBikesQuery(queries);
    // get searchTerm from redux
    const searchTerm = useAppSelector((state) => state.searchTerm.searchTerm);
    const [activeTab, setActiveTab] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const meta = products?.meta as TMeta;
    // get product data
    const productData = products?.data;
    const [color, setColor] = useState('All Colors');
    const [resetButtonSpinning, setResetButtonSpinning] = useState(false);
    const dispatch = useAppDispatch();
    const form = useForm();
    const { handleSubmit, register } = form;
    // pagination useEffect
    useEffect(() => {
        setQueries((prevFilters) => {
            const otherFilters = prevFilters.filter(f => f.name !== 'page' && f.name !== 'limit');
            return [
                ...otherFilters,
                { name: 'page', value: currentPage },
                { name: 'limit', value: 5 }
            ];
        });
    }, [currentPage]);
    // searchTerm useEffect
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
    // set Color useEffect
    useEffect(() => {
        setQueries((prevFilters) => {
            // Remove existing color filter
            const updatedFilters = prevFilters.filter(filter => filter.name !== 'filterBycolor');
            updatedFilters.push({ name: 'filterBycolor', value: color !== 'All Colors' ? color : '' });
            return updatedFilters;
        });
    }, [color]);
    // set ActiveTab useEffect
    useEffect(() => {
        setQueries((prevFilters) => {
            // Remove existing color filter
            const updatedFilters = prevFilters.filter(filter => filter.name !== 'filterBybrand');
            updatedFilters.push({ name: 'filterBybrand', value: activeTab !== 'All' ? activeTab : '' });
            return updatedFilters;
        });
    }, [activeTab]);
    // set searchTerm to redux
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        dispatch(setSearchTerm(data.searchTerm));
    }
    // handle reset Button
    const handleResetButton = () => {
        setResetButtonSpinning(true)
        setColor("All Colors");
        setActiveTab("All");
        dispatch(setSearchTerm(""));
        setCurrentPage(1);
        setQueries([]);
        setTimeout(() => {
            setResetButtonSpinning(false)
        }, 1000);
    }
    if (isFetching) return <Loader />
    return (
        <div className="2xl:px-12">
            <section className="container px-2 lg:px-4  mx-auto">
                <h2 className="text-2xl font-semibold">All Products | Admin</h2>
                <p className="text-lg text-gray-500 mb-4">Manage, update, or delete  products from here.</p>
                {/* Tabs */}
                <div className="lg:flex flex-wrap gap-2 mb-4  hidden">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-1.5 text-sm font-medium transition duration-200 border-b-2
                                    ${activeTab === tab
                                    ? `border-b-2 border-sky-400`
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                {/* Search ,Filter & Reset*/}
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                    {/* Search */}
                    <div className="relative">
                        <form onChange={handleSubmit(onSubmit)}>
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pt-0.5">
                                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </span>
                            <input
                                {...register("searchTerm")}
                                type="text"
                                placeholder="Search Products..."
                                className="pl-10 w-[250px] py-1 rounded-sm border border-gray-300 text-sm text-gray-700 placeholder:text-sm bg-white focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </form>
                    </div>
                    {/* Select Color filter */}
                    <Select onValueChange={(value) => setColor(value)}>
                        <SelectTrigger className="w-[120px] h-[32px] text-gray-500 data-[placeholder]:text-gray-500">
                            <SelectValue placeholder={color} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                allColorsArray.map((color) => (<SelectItem key={color.name} className="hover:bg-sky-500 data-[state=checked]:bg-sky-400 data-[state=checked]:text-white" value={color.name}>{color.name}</SelectItem>)) 
                            }
                        </SelectContent>
                    </Select>
                    {/* Select Brand filter */}
                    <Select onValueChange={(value) => setActiveTab(value)}>
                        <SelectTrigger className="w-[120px] h-[32px] text-gray-500 data-[placeholder]:text-gray-500 lg:hidden">
                            <SelectValue placeholder={activeTab} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                allBrandsArray.map((brand) => (<SelectItem key={brand.name} className="hover:bg-sky-500 data-[state=checked]:bg-sky-400 data-[state=checked]:text-white" value={brand.name}>{brand.name}</SelectItem>))
                            }
                        </SelectContent>
                    </Select>
                    <Button onClick={handleResetButton} className="h-[32px] bg-sky-400 text-white px-2.5  flex gap-1"><GrPowerReset className={`${resetButtonSpinning ? 'animate-spin' : 'animate-none'}`} />Reset</Button>
                </div>
                {/* bikes table */}
                <BikeTable products={productData ?? []} />
            </section>
            <section className="pt-4">
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
            </section>
        </div>
    )
};

export default AllBikesAdmin;
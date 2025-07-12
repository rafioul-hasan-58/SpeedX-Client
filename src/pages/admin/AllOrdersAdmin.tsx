import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import Loader from "@/components/Loader/Loader";
import OrderTable from "@/components/common/Orders/OrderTable";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { TMeta } from "@/types/global";
import { GrPowerReset } from "react-icons/gr";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetAllOrdersQuery } from "@/redux/features/common/orderManagementApi";
const allStatusArray = [
    { name: "All" },
    { name: "Pending" },
    { name: "Processing" },
    { name: "Shipped" },
    { name: "Delivered" },
    { name: "Returned" },
    { name: "Cancelled" }
]

const AllOrdersAdmin = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [resetButtonSpinning, setResetButtonSpinning] = useState(false);
    const [activeTab, setActiveTab] = useState("All");
    const queryParams = [];
    if (activeTab !== 'All') {
        queryParams.push({ name: 'status', value: activeTab })
    }
    const { data: orderData, isFetching } = useGetAllOrdersQuery(queryParams);
    const data = orderData?.data;
    const tabs = ["All", "Pending", "Processing", "Shipped", "Delivered", "Returned", "Cancelled"];
    const meta = orderData?.meta as TMeta;
       const handleResetButton = () => {
            setResetButtonSpinning(true);
            setActiveTab("All");
            setCurrentPage(1);
            setTimeout(() => {
                setResetButtonSpinning(false);
            }, 1000);
        }
    if (isFetching) return <Loader />;
    return (
        <div className="pt-5  lg:px-4 px-1 2xl:px-16">
            {/* Heading */}
            <div className="mb-4">
                <h2 className="text-2xl font-semibold">My Orders | Customer</h2>
                <p className="text-lg text-gray-500">Manage, update, or delete customer orders from here.</p>
            </div>
            {/* Tabs */}
            <div className="lg:flex flex-wrap gap-2  mb-4 hidden">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1.5 text-sm font-medium transition duration-200 border-b-2
                                    ${activeTab === tab
                                ? "border-b-2 border-sky-400"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
                {/* Search */}
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pt-0.5">
                        <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search Products..."
                        className="pl-10 w-[250px] py-1 rounded-sm border border-gray-300 text-sm text-gray-700 placeholder:text-sm bg-white focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>
                <Select onValueChange={(value) => setActiveTab(value)}>
                    <SelectTrigger className="w-[120px] h-[32px] text-gray-500 data-[placeholder]:text-gray-500 lg:hidden">
                        <SelectValue placeholder={activeTab} />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            allStatusArray.map((status) => (<SelectItem key={status.name} className="hover:bg-sky-500 data-[state=checked]:bg-sky-400 data-[state=checked]:text-white" value={status.name}>{status.name}</SelectItem>))
                        }
                    </SelectContent>
                </Select>
                <Button onClick={handleResetButton} className="h-[32px] bg-sky-400 text-white px-2.5  flex gap-1"><GrPowerReset className={`${resetButtonSpinning ? 'animate-spin' : 'animate-none'}`} />Reset</Button>

            </div>
            {
                (data?.length ?? 0) > 0 ?
                    <>
                        <OrderTable data={data} />
                        {/* pagination */}
                        {
                            meta?.totalPage > 1 &&
                            <div className="py-6">
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
                    </>
                    :
                    <div className="border-t flex items-center justify-center mt-12 py-10 rounded-sm ">
                        <aside className="mt-4 text-center">
                            <p className="text-2xl font-semibold">Order is Empty</p>
                            <p className="text-gray-500 text-lg py-5">Looks like you haven't added anything yet.</p>
                            <Link to='/'>
                                <Button className="bg-sky-400 hover:bg-sky-500 rounded-full py-3 px-4 text-[15px]">
                                    Continue Shopping
                                </Button>
                            </Link>
                        </aside>
                    </div>
            }
        </div>
    );
};

export default AllOrdersAdmin;

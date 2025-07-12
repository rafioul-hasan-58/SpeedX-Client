import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { Plus } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Filter, TMeta } from "@/types/global";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useGetAllBikesQuery } from "@/redux/features/common/bikeManagementApi";
import BikeTable from "@/components/Admin/All-Bikes/BikeTable";
const MyAddedBikes = () => {
    const user = useAppSelector(selectCurrentUser);
    const [queries, setQueries] = useState<Filter[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { data: products, isFetching } = useGetAllBikesQuery(queries);
    const meta = products?.meta as TMeta;
    useEffect(() => {
        setQueries([{ name: 'addedBy', value: user?.email || '' }])
    }, [user])
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
    if (isFetching) return <Loader />
    return (
        <div>
            {
                (products?.data?.length || 0) > 0 ? <div>
                    <section className="container px-4 mx-auto">
                        <h2 className="text-2xl font-semibold">My Added Products | Customer</h2>
                        <p className="text-lg text-gray-500 mb-4">Manage, update, or delete  products from here.</p>
                        <BikeTable products={products?.data || []} />
                    </section>
                    {/* pagination */}
                    {
                        (products?.data?.length || 0) > 1 && <div className="py-8">
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
                    :
                    <div className="flex justify-center items-center  min-h-[calc(100vh-100px)] px-4">
                        <aside className="">
                            <p className="text-center text-2xl 2xl:text-3xl font-semibold">You have empty data</p>
                            <p className="text-gray-500 text-lg 2xl:text-xl text-center py-5">Looks like you haven't added anything yet.</p>
                            <div className="flex justify-center">
                                <Link to='/customer/dashboard/add-product'>
                                    <Button className="bg-sky-400 hover:bg-sky-500 rounded-full py-3 2xl:py-5 px-4 2xl:px-6 2xl:text-[18px] text-[15px]"><Plus className="h-6 w-6 2xl:h-8 2xl:w-8 text-white font-semibold" /> Add Data</Button>
                                </Link>
                            </div>
                        </aside>
                    </div>
            }
        </div>
    )
};

export default MyAddedBikes;
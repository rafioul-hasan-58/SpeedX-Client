import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import Loader from "../../components/Loader/Loader";
import { Edit, Plus, Trash2 } from "lucide-react";
import { IProduct } from "@/types/product.types";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TMeta } from "@/types/global";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useGetMyAddedBikesQuery, useRemoveBikeMutation } from "@/redux/features/common/bikeManagementApi";
const MyAddedBikes = () => {
    const user = useAppSelector(selectCurrentUser);
    // const [queries, setQueries] = useState<Filter[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { data: products, isFetching } = useGetMyAddedBikesQuery(user?.email || '');
    const [deleteProduct] = useRemoveBikeMutation();
    const handleDelete = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(id)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });

    }
    const meta = products?.meta as TMeta;
    // useEffect(() => {
    //     setQueries((prevFilters) => {
    //         const otherFilters = prevFilters.filter(f => f.name !== 'page' && f.name !== 'limit');
    //         return [
    //             ...otherFilters,
    //             { name: 'page', value: currentPage },
    //             { name: 'limit', value: 5 }
    //         ];
    //     });
    // }, [currentPage]);
    if (isFetching) return <Loader />
    return (
        <div>
            {
                products?.data?.length > 0 ? <div>
                    <section className="container px-4 mx-auto">
                        <h2 className="text-2xl font-semibold">My Added Products | Customer</h2>
                        <p className="text-lg text-gray-500 mb-4">Manage, update, or delete  products from here.</p>
                        <div className="flex flex-col">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200 ">
                                            <thead className="bg-sky-400 ">
                                                <tr>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white ">
                                                        Photo
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white ">
                                                        Name
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white ">
                                                        Price
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white ">
                                                        Color
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white ">
                                                        Update
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white ">
                                                        Delete
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 ">
                                                {
                                                    products?.data?.map((item: IProduct) => <tr key={item._id} className="w-full">
                                                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                            <img src={item?.images[0]} className="w-[90px] " alt="" />
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                            {item?.name}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{item?.price}</td>
                                                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{item?.color}</td>
                                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                            <Link to={`/customer/dashboard/update-bike/${item?._id}`}>
                                                                <Button className="bg-sky-500 text-white h-8 w-8 p-0">
                                                                    <Edit className="h-4 w-4" />
                                                                </Button>
                                                            </Link>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                            <Button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white h-8 w-8 p-0">
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </td>
                                                    </tr>)
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="pt-4">
                        {/* pagination */}

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
                    </section>
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
import { Button } from "antd";
import { useRemoveProductMutation } from "../../redux/features/admin/productManagement.Api";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import Loader from "../../components/Loader/Loader";
import { Edit, Trash2 } from "lucide-react";
import { IProduct } from "@/types/product.types";
import { useGetAllProductsQuery } from "@/redux/features/utils/utilsApi";

const AllProducts = () => {
    const { data: products, isFetching } = useGetAllProductsQuery(undefined)
    const [deleteProduct] = useRemoveProductMutation()
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
    if (isFetching) return <Loader />
    return (
        <div>
            <div>

                <section className="container px-4 mx-auto">
                    <h2 className="text-2xl font-semibold">All Products | Admin</h2>
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
                                                        <Link to={`/admin/update-product/${item?._id}`}>
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
            </div>
        </div>
    )
};

export default AllProducts;
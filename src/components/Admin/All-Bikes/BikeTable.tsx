import { Link } from "react-router-dom";
import { Edit,Trash2 } from "lucide-react";
import { IProduct } from "@/types/product.types";
import Swal from "sweetalert2";
import { useRemoveProductMutation } from "@/redux/features/admin/productManagement.Api";
import { Button } from "@/components/ui/button";
import BikeDetailSheet from "./BikeDetailsSheet";
const BikeTable = ({ products }: { products: IProduct[] }) => {
    const [deleteProduct] = useRemoveProductMutation();

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
    return (
        <div className="flex flex-col">
            <div className="-mx-1 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200 ">
                            <thead className="bg-sky-400 h-[35px]">
                                <tr>
                                    <th scope="col" className="px-4 text-sm font-normal text-left rtl:text-right text-white ">
                                        Photo
                                    </th>
                                    <th scope="col" className="px-4 text-sm font-normal text-left rtl:text-right text-white ">
                                        Name
                                    </th>

                                    <th scope="col" className="px-4  text-sm font-normal text-left rtl:text-right text-white ">
                                        Price
                                    </th>

                                    <th scope="col" className="px-4 text-sm font-normal text-left rtl:text-right text-white ">
                                        View
                                    </th>
                                    <th scope="col" className="px-4 text-sm font-normal text-left rtl:text-right text-white ">
                                        Update
                                    </th>
                                    <th scope="col" className="px-4 py-2.5 text-sm font-normal text-left rtl:text-right text-white ">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 ">
                                {
                                    products?.map((item: IProduct) => <tr key={item._id} className="w-full">

                                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                            <img src={item?.images[0]} className="w-[90px] " alt="" />
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                            {item?.name}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{item?.price}</td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                           <BikeDetailSheet bike={item}/>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            <Link to={`/admin/update-bike/${item?._id}`}>
                                                <Button className="bg-green-500 hover:bg-green-600 text-white h-8 w-8 p-0">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            <Button onClick={() => handleDelete(item._id)} className="bg-red-500 hover:bg-red-600 text-white h-8 w-8 p-0">
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
    );
};

export default BikeTable;
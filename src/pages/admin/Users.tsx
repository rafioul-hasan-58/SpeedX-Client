import Loader from '../../components/Loader/Loader';
import head from '../../assets/logo/Head.avif'
import { useDeleteUserMutation, useGetAllUsersQuery } from "../../redux/features/admin/userManagement.Api";
import { Button } from "antd";
import Swal from 'sweetalert2';
import { Trash2 } from 'lucide-react';

const Users = () => {
    const { data: users, isFetching } = useGetAllUsersQuery(undefined)
    const [deleteUser] = useDeleteUserMutation()
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
                deleteUser(id)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
        console.log(id);
    }
    if (isFetching) return <Loader />
    return (
        <div className='2xl:px-12'>
            <section className="container px-4 mx-auto">
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold">All Users | Admin Panel</h2>
                    <p className="text-lg text-gray-500">Manage, update, or delete customer orders from here.</p>
                </div>
                <div className="flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 ">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-sky-400 ">
                                        <tr>
                                            <th scope="col" className="px-4 py-2 text-[15px] font-normal text-left rtl:text-right text-white ">
                                                Image
                                            </th>
                                            <th scope="col" className="px-4 py-2 text-[15px] font-normal text-left rtl:text-right text-white ">
                                                Name
                                            </th>
                                            <th scope="col" className="px-4 py-2 text-[15px] font-normal text-left rtl:text-right text-white ">
                                                Email
                                            </th>
                                            <th scope="col" className="px-4 py-2 text-[15px] font-normal text-left rtl:text-right text-white ">
                                                Role
                                            </th>
                                            <th scope="col" className="px-4 py-2 text-[15px] font-normal text-left rtl:text-right text-white ">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 ">
                                        {
                                            users?.data?.map((item) => <tr className="w-full">

                                                <td className="px-4 py-2.5 text-sm text-gray-500  whitespace-nowrap">
                                                    <img src={item?.image || head} className="w-[60px] h-[60px] rounded-full border-2 border-sky-400 " alt="" />
                                                </td>
                                                <td className="px-4 py-2.5 text-[15px] text-gray-600 font-semibold whitespace-nowrap">
                                                    {item?.name}
                                                </td>
                                                <td className="px-4 py-2.5 text-[15px] text-sky-500 font-semibold whitespace-nowrap">
                                                    {item?.email}
                                                </td>
                                                <td className="px-4 py-2.5 text-[15px]  text-gray-600 font-semibold whitespace-nowrap">
                                                    {item?.role}
                                                </td>
                                                <td className="px-4 py-2.5 text-sm  text-gray-600 whitespace-nowrap">
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
            </section>
        </div>
    );
};

export default Users;
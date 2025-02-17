import { Link } from "react-router-dom";
import { useGetAllUsersQuery } from "../../redux/features/admin/userManagement.Api";
import { Button } from "antd";

const Users = () => {
    const { data: users } = useGetAllUsersQuery(undefined)
    console.log(users);
    return (
        <div>
            <section className="container px-4 mx-auto">
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
                                            users?.data?.map((item) => <tr className="w-full">

                                                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                    <img src={item?.image} className="w-[90px] " alt="" />
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                    {item?.name}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{item?.price}</td>
                                                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{item?.color}</td>
                                                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                    <Link to={`/admin/update-product/${item?._id}`}>
                                                        <Button>Update</Button>
                                                    </Link>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                    <Button onClick={() => handleDelete(item?._id)}>Delete</Button>
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
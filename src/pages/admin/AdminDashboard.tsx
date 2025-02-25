import RevenueChart from "../../components/Charts/ReviewChart";
import Barchart from "../../components/Charts/Barchart";
import LevelChart from "../../components/Charts/LavelChart";
import { useChangeStatusMutation, useDeleteOrderMutation, useGetAllOrdersQuery, useGetTodaysSaleQuery, useGetTotalSaleQuery } from "../../redux/features/user/userReletedApi";
import moment from "moment";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import Swal from "sweetalert2";
const AdminDashboard = () => {
  // states
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [status, setStatus] = useState('Pending');
  const [isOpen, setIsOpen] = useState(false);
  // today sale
  const { data: todaysData } = useGetTodaysSaleQuery(undefined)
  const { data: totalSale } = useGetTotalSaleQuery(undefined)
  console.log(totalSale);
  const todaysSale = Number((todaysData?.data?.totalSale) / 1000).toFixed(0);
  const todaysRevenue = (Number(todaysSale) * 0.15).toFixed(0);
  const totalRevenue = Number((totalSale?.data?.totalRevenue)/1000).toFixed(0)
  const soldItems = todaysData?.data.items;
  const { data: orders } = useGetAllOrdersQuery(undefined)
  const allOrders = orders?.data
  const [upgradeStatus] = useChangeStatusMutation();
  const [deleteOrder] = useDeleteOrderMutation()
  const handleSubmit = async (id: string | null) => {
    const updatedData = {
      id,
      data: {
        status
      }
    }

    const res = await upgradeStatus(updatedData)
    if (res.data) {
      setIsOpen(false)
    }

  }
  const deleteOrderData = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteOrder(id)
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }
  return (
    <div className="mx-10 mt-6">
      <div className="grid grid-cols-3">
        <div className="flex gap-12 bg-white p-4 lg:w-[350px]">
          <div>
            <h1 className="text-xl font-semibold text-gray-600">Todays Sales</h1>
            <h1 className="text-[22px] font-bold py-1 text-sky-400">€{todaysSale}k</h1>
            <h1 className=" text-gray-500">we have sold {soldItems} products</h1>
          </div>
          <RevenueChart color={'#38BDF8'} value1={75} value2={25} />
        </div>
        <div className="flex gap-12 bg-white p-4 lg:w-[350px]">
          <div>
            <h1 className="text-xl font-semibold text-gray-600">Todays Revenue</h1>
            <h1 className="text-[22px] font-bold py-1 text-green-500">€{todaysRevenue}k</h1>
            <h1 className=" text-gray-500">we have sold {soldItems} products</h1>
          </div>
          <RevenueChart color={'#22c55e'} value1={61} value2={39} />
        </div>
        <div className="flex gap-12 bg-white p-4 lg:w-[350px]">
          <div>
            <h1 className="text-xl font-semibold text-gray-600">Total Revenue</h1>
            <h1 className="text-[22px] font-bold py-1 text-[#F4A261]">€{totalRevenue}k</h1>
            <h1 className=" text-gray-500">we have sold {soldItems} products</h1>
          </div>
          <RevenueChart color={'#F4A261'} value1={45} value2={55} />
        </div>
      </div>
      <div className="mt-5 flex">
        <Barchart />
        <LevelChart />
      </div>
      <div>
        <div>
          <section className="container px-4 pb-10 min-h-screen -mt-3">

            <div className="flex flex-col">
              <div>
                <h1 className="text-2xl font-bold text-sky-400  my-6 pt-3">Latest Orders</h1>
              </div>
              <div className=" sm:-mx-6 ">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 px-0">
                  <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 ">
                      <thead className="bg-sky-400 ">
                        <tr>
                          <th scope="col" className="px-8 py-3.5 text-[16px] font-semibold text-left rtl:text-right text-white ">
                            Products
                          </th>
                          <th scope="col" className="px-4 py-3.5 text-[16px] text-left font-semibold rtl:text-right text-white ">
                            Date
                          </th>
                          <th scope="col" className="px-4 py-3.5 text-[16px] font-semibold text-left rtl:text-right text-white ">
                            Customer Name
                          </th>
                          <th scope="col" className="px-4 py-3.5 text-[16px] font-semibold text-left rtl:text-right text-white ">
                            Price
                          </th>
                          <th scope="col" className="px-4 py-3.5 text-[16px] text-left font-semibold rtl:text-right text-white ">
                            Status
                          </th>
                          <th scope="col" className="px-4 py-3.5text-sm  text-left text-[16px] font-semibold rtl:text-right text-white ">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 ">
                        {
                          allOrders?.map((item: { _id: string; product: { name: string; price: number }; createdAt: string; email: string; status: string }) => <tr className="w-full">
                            <td className="px-8 py-4 text-sm font-semibold text-gray-500  whitespace-nowrap">
                              {item?.product?.name}
                            </td>
                            <td className="px-4 py-4 text-sm font-semibold text-gray-500 whitespace-nowrap">{moment.utc(item?.createdAt).format('D MMMM YYYY')}</td>
                            <td className="px-4 py-4 text-sm font-semibold text-gray-500 whitespace-nowrap">{item?.email}</td>
                            <td className="px-4 py-4 text-sm font-semibold text-gray-500   whitespace-nowrap">{item?.product?.price}</td>
                            <td className="px-4 py-4 text-sm font-semibold text-gray-500 whitespace-nowrap flex gap-1 relative top-1">
                              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                <DialogTrigger asChild>
                                  <Button variant="outline" onClick={() => setSelectedOrder(item?._id)}>
                                    {item?.status}
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <Select defaultValue={item?.status} onValueChange={(value) => setStatus(value)}>
                                    <SelectTrigger className="w-[180px]">
                                      <SelectValue placeholder="Change role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Pending">Pending</SelectItem>
                                      <SelectItem value="Delivered">Delivered</SelectItem>
                                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <DialogFooter>
                                    <Button onClick={() => handleSubmit(selectedOrder)}>Save Change</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                            </td>
                            <td className="relative px-4 py-4 text-sm font-semibold text-gray-500 whitespace-nowrap">
                              <div className="relative inline-block">
                                {/* Options Icon */}
                                <Button onClick={() => deleteOrderData(item?._id)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</Button>
                              </div>
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
    </div>
  );
};

export default AdminDashboard;

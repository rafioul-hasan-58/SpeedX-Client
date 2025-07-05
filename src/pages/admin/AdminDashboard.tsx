import RevenueChart from "../../components/Charts/ReviewChart";
import Barchart from "../../components/Charts/Barchart";
import LevelChart from "../../components/Charts/LavelChart";
import { useGetTodaysSaleQuery, useGetTotalSaleQuery } from "@/redux/features/user/userReletedApi";
import LatestOrders from "../segments/admin/LatestOrders";
const AdminDashboard = () => {
  // states

  // today sale
  const { data: todaysData } = useGetTodaysSaleQuery(undefined);
  const { data: totalSale } = useGetTotalSaleQuery(undefined);
  const todaysSale = Number((todaysData?.data?.totalSale) / 1000).toFixed(0);
  const todaysRevenue = (Number(todaysSale) * 0.15).toFixed(0);
  const totalRevenue = Number((totalSale?.data?.totalRevenue) / 1000).toFixed(0);
  const soldItems = todaysData?.data.items;


  return (
    <div className="mt-6 px-4">
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="flex gap-6 bg-white p-4 w-full sm:w-[300px] md:w-[320px] lg:w-[350px]">
          <div>
            <h1 className="text-xl font-semibold text-gray-600">Todays Sales</h1>
            <h1 className="text-[22px] font-bold py-1 text-sky-400">€{todaysSale}k</h1>
            <h1 className=" text-gray-500">we have sold {soldItems} products</h1>
          </div>
          <RevenueChart color={'#38BDF8'} value1={75} value2={25} />
        </div>

        <div className="flex gap-6 bg-white p-4 w-full sm:w-[300px] md:w-[320px] lg:w-[350px]">
          <div>
            <h1 className="text-xl font-semibold text-gray-600">Todays Revenue</h1>
            <h1 className="text-[22px] font-bold py-1 text-green-500">€{todaysRevenue}k</h1>
            <h1 className=" text-gray-500">we have sold {soldItems} products</h1>
          </div>
          <RevenueChart color={'#22c55e'} value1={61} value2={39} />
        </div>

        <div className="flex gap-6 bg-white p-4 w-full sm:w-[300px] md:w-[320px] lg:w-[350px]">
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
        <LatestOrders />
      </div>
    </div>
  );
};

export default AdminDashboard;

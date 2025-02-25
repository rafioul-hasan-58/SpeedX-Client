import { useGetAvailableStocksQuery } from "../../redux/features/admin/productManagement.Api";
import { motion } from "framer-motion";

export default function AnimatedProgressBar() {
  const { data: stocks } = useGetAvailableStocksQuery(undefined)
  const data = stocks?.data
    ? stocks.data.map((item: { _id: string; totalStocks: number }) => ({
      name: item._id,
      value: item.totalStocks
    }))
    : [];
  return (
    <div className="w-full max-w-sm mx-auto space-y-4 bg-white p-6">
      <div>
        <h1 className="text-xl font-semibold">Available bikes</h1>
      </div>
      {data.map((item: { name: string; value: number }, index: number) => (
        <div key={index}>
          <div className="flex justify-between text-sm font-medium text-gray-700">
            <span>{item.name}</span>
            <span>{item.value}</span>
          </div>
          <div className="w-full h-2 bg-gray-300 rounded-full mt-1 overflow-hidden">
            <motion.div
              className="h-full bg-sky-400 rounded-full"
              initial={{ inlineSize: 0 }}
              animate={{ inlineSize: `${item.value}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            ></motion.div>
          </div>
        </div>
      ))}
    </div>
  );
}

import { motion } from "framer-motion";

export default function AnimatedProgressBar() {
  const data = [
    { name: "Belts", value: 60 },
    { name: "Caps", value: 80 },
    { name: "Others", value: 20 },
  ];

  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      {data.map((item, index) => (
        <div key={index}>
          <div className="flex justify-between text-sm font-medium text-gray-700">
            <span>{item.name}</span>
            <span>{item.value}</span>
          </div>
          <div className="w-full h-2 bg-gray-300 rounded-full mt-1 overflow-hidden">
            <motion.div
              className="h-full bg-blue-500 rounded-full"
              initial={{ width: 0 }} // Start from 0
              animate={{ width: `${item.value}%` }} // Expand to value
              transition={{ duration: 1.5, ease: "easeOut" }} 
            ></motion.div>
          </div>
        </div>
      ))}
    </div>
  );
}

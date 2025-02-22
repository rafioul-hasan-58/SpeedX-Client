
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Completed", value: 75 }, // Adjust this value based on progress
  { name: "Remaining", value: 25 }, // Remaining percentage
];

const COLORS = ["#4285F4", "#E0E0E0"]; // Blue for sales, gray for remaining

const SalesProgressChart = () => {
  
  return (
    <div style={{ textAlign: "center" }}>
      <PieChart width={90} height={90}> {/* Adjusted size */}
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={25} // Adjust inner radius for smaller chart
          outerRadius={43} // Adjust outer radius for smaller chart
          startAngle={90}
          endAngle={-270}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default SalesProgressChart;

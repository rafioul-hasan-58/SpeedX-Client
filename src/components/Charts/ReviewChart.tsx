
import { PieChart, Pie, Cell } from "recharts";




const ReviewChart = ({ value1, value2, color }:{value1:number,value2:number,color:string}) => {
  const data = [
    { name: "Completed", value: value1 },
    { name: "Remaining", value: value2 },
  ];
  const COLORS = [color, "#E0E0E0"];
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
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default ReviewChart;

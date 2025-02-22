import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

// Define the data type
interface ChartData {
    name: string;
    uv: number;
    pv: number;
    amt: number;
}

// Sample data
const data: ChartData[] = [
    { name: "Jan", uv: 60000, pv: 90000, amt: 2400 },
    { name: "Feb", uv: 80000, pv: 39008, amt: 2210 },
    { name: "Mar", uv: 70000, pv: 80000, amt: 2290 },
    { name: "Apr", uv: 67080, pv: 90008, amt: 2000 },
    { name: "May", uv: 48090, pv: 80000, amt: 2181 },
    { name: "Jun", uv: 63090, pv: 80000, amt: 5 },
    { name: "Jul", uv: 39000, pv: 30000, amt: 2100 },
];

const Barchart: React.FC = () => {
    return (
        <ResponsiveContainer width="50%" height={300} style={{ backgroundColor: "#ffffff", paddingTop: "20px", borderRadius: '5px 5px 5px 5px' }}>
            <BarChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid stroke="none" /> {/* Remove dashed lines */}
                <XAxis dataKey="name" />
                <YAxis 
                    ticks={[0, 10000, 20000, 30000, 50000, 70000, 100000]} 
                    tickFormatter={(tick) => `${tick / 1000}k`} 
                    axisLine={false} // Remove the left indicator line
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#38bdf8" style={{ borderRadius: '2px 2px 2px 2px' }} />
                <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Barchart;

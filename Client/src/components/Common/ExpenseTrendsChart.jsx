import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getExpenseByCategory } from "../../utils/ApiRoutes";
import { useParams } from "react-router-dom";
import dayjs from "dayjs"; // Import date formatting library

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow-md text-sm">
        <p className="font-semibold">{payload[0].payload.title}</p>
        <p className="text-gray-600">
          Date: {payload[0].payload.formattedDate}
        </p>
        <p className="text-blue-600">Spent: ${payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const ExpenseTrendChart = ({chartData}) => {
  const { id } = useParams();
  // const [chartData, setChartData] = useState([]);
  // const getChartData = async () => {
  //   try {
  //     const response = await getExpenseByCategory(id);
  //     if (response?.data) {
  //       const formattedData = response.data.map((item) => ({
  //         title: item.title,
  //         spent: item.amount,
  //         formattedDate: dayjs(item.date).format("DD MMM YYYY"),
  //         date: dayjs(item.date).format("DD MMM"),
  //       }));
  
  //       setChartData(formattedData);
  //     } else {
  //       console.error("No expenses found");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching expenses:", error);
  //   }
  // };
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (id) {
  //       await getChartData();
  //     }
  //   };
  
  //   fetchData(); // Call the async function inside useEffect
  // }, [id]); 

  // useEffect(() => {
  //   if (id) {
  //     console.log("chart data ",chartData)
  //   }
  // }, [id]);

  return (
    <div className="w-full p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-4">Spending Trend</h2>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="spent"
              stroke="#007BFF"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 text-center">No data available</p>
      )}
    </div>
  );
};

export default ExpenseTrendChart;

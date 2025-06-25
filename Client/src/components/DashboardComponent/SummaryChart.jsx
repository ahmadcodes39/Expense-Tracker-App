import React, { useState, useEffect } from "react";
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
import { getAllBudgets } from "../../utils/ApiRoutes";

const SummaryChart = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const userId = userInfo?.id;
      const response = await getAllBudgets(userId); 

      console.log("Fetched data:", response.budgets); 

      const chartData = response.budgets.map((budget) => ({
        name: budget.category,
        totalSpend: budget.spentAmount, 
        amount: budget.totalAmount, 
      }));


      setData(chartData);
    } catch (error) {
      console.log("Error fetching budget data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getData(); 
    };

    fetchData(); 
  }, []);

  return (
    <div className="p-5 w-full border-[1px] border-gray-300 rounded-2xl">
      <h2 className="text-black font-bold text-lg mb-4">Activity</h2>
      {data.length>0?
      (

        <ResponsiveContainer height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSpend" stackId="a" fill="#2f3eb1" />
          <Bar dataKey="amount" stackId="a" fill="#c2b6ff" />
        </BarChart>
      </ResponsiveContainer>
        ):
        <p className="text-center py-4 text-gray-500">No Activity Available</p>}
    </div>
  );
};

export default SummaryChart;

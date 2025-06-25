import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

const FinancePerformance = () => {
  // Dummy monthly data
  const data = [
    { month: "Jan", budget: 1000, expense: 850, income: 1200 },
    { month: "Feb", budget: 1200, expense: 1000, income: 1250 },
    { month: "Mar", budget: 1100, expense: 900, income: 1300 },
    { month: "Apr", budget: 1050, expense: 950, income: 1100 },
    { month: "May", budget: 1150, expense: 980, income: 1400 },
    { month: "Jun", budget: 1250, expense: 1020, income: 1350 },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Finance Performance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#22c55e" name="Income" />
          <Bar dataKey="budget" fill="#3b82f6" name="Budget" />
          <Bar dataKey="expense" fill="#ef4444" name="Expense" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinancePerformance;

import React, { useEffect, useState } from "react";
import { getBudgetNames, getAllExpenses } from "../../utils/ApiRoutes"; 
import toast from "react-hot-toast";
import BudgetButton from "../IndividualBudgetComponents/budgetButton";
import { IoMdDownload } from "react-icons/io";
import * as XLSX from "xlsx"; 

const MyExpenseTopBar = ({ setQuery }) => {
  const handleCategoryChange = (e) => {
    setQuery(e.target.value);
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?.id;
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await getBudgetNames(userId);
    if (response) {
      setData(response.budgetNames);
    } else {
      toast.error("Budget names not fetched");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleExportBtn = async () => {
    try {
      const response = await getAllExpenses(userId); 
      if (!response || !response.data) {
        toast.error("No expenses found to export.");
        return;
      }

      const expenses = response.data.map((item) => ({
        Name: item.title,
        Amount: item.amount,
        Date: new Date(item.date).toLocaleDateString(),
        Category: item.category,
      }));

      const worksheet = XLSX.utils.json_to_sheet(expenses);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

      XLSX.writeFile(workbook, "MyExpenses.xlsx"); 
      toast.success("Excel file downloaded!");
    } catch (error) {
      toast.error("Error exporting expenses");
      console.error("Export Error:", error);
    }
  };

  return (
    <div className="flex justify-between items-center bg-white py-4 rounded-lg">
      <h1 className="text-3xl font-semibold text-blue-800">My Expenses</h1>
      <div className="flex items-center gap-4 flex-row-reverse">
        <BudgetButton
          color={"bg-gray-500"}
          onClick={handleExportBtn}
          text={"Export"}
          icon={<IoMdDownload />}
        />
        <div className="flex gap-2.5 items-center">
          <label htmlFor="category" className="text-lg font-medium text-gray-700">
            Category
          </label>
          <select
            onChange={handleCategoryChange}
            className="bg-gray-100 border-[1px] border-gray-300 text-gray-700 rounded-lg p-2 focus:outline-none"
          >
            <option value="all">All</option>
            {data.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default MyExpenseTopBar;

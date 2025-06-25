import React, { useEffect, useState } from "react";
import { addExpense, getSingleBudgets } from "../../utils/ApiRoutes";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom"; 


const AddExpenseForm = () => {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
//   const navigate = useNavigate();  

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?.id;

  const { id } = useParams(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!expenseName || !expenseAmount) {
        toast.error("Please fill in both the title and amount.");
        return;
      }
    try {
      const amount = Number(expenseAmount);

      if (isNaN(amount)) {
        throw new Error("Invalid amount value");
      }

      const response = await addExpense(userId, id, expenseName, amount);
      if (response) {
        await getSingleBudgets(id)
        toast.success(response.message);  
        setExpenseAmount(0)
        setExpenseName("")

      }
    } catch (error) {
      toast.error(error.message || "Expense not added");  
    }
  };

  return (
    <section className="w-1/2 p-6 rounded-lg bg-white ">
      <h2 className="text-lg font-semibold mb-4">Add Expense</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Expense Name</label>
          <input
            type="text"
            placeholder="e.g. Bedroom Decor"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Expense Amount</label>
          <input
            type="number"
            placeholder="e.g. 1000"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 cursor-pointer text-white py-2 rounded-md hover:bg-blue-400 transition"
        >
          Add New Expense
        </button>
      </form>
    </section>
  );
};

export default AddExpenseForm;

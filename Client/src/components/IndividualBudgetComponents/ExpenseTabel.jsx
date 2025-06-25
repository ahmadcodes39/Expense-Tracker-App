import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useParams } from "react-router-dom";
import { getExpenseByCategory } from "../../utils/ApiRoutes";
import DeleteExpenseModal from "./deleteExpenseModal"; // Import modal

const ExpenseTable = ({expenseData}) => {
  const { id } = useParams();
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Fetch expenses
 
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl text-blue-800 font-semibold">Latest Expenses</h1>
      <table className="cursor-default min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left text-sm text-gray-700">Name</th>
            <th className="py-2 px-4 text-left text-sm text-gray-700">Amount</th>
            <th className="py-2 px-4 text-left text-sm text-gray-700">Category</th>
            <th className="py-2 px-4 text-left text-sm text-gray-700">Date</th>
            <th className="py-2 px-4 text-left text-sm text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {expenseData.length > 0 ? (
            expenseData.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-all duration-200`}
              >
                <td className="py-3 px-4 text-sm text-gray-900">{item.title}</td>
                <td className="py-3 px-4 text-sm text-gray-900">${item.amount}</td>
                <td className="py-3 px-4 text-sm text-gray-900">{item.category}</td>
                <td className="py-3 px-4 text-sm text-gray-900">
                  {new Date(item.date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td className="py-3 px-4 text-sm text-red-600 cursor-pointer">
                  <MdDeleteOutline
                    className="text-lg hover:text-red-800 transition-all duration-150"
                    onClick={() => {
                      setSelectedExpense(item);
                      setIsModalOpen(true);
                    }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No expenses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Delete Modal */}
      <DeleteExpenseModal
        id={selectedExpense?._id}
        name={selectedExpense?.title}
        open={isModalOpen}
        close={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ExpenseTable;

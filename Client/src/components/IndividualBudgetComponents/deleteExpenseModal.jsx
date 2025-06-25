import React from "react";
import BudgetButton from "./budgetButton";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteExpense } from "../../utils/ApiRoutes";
import toast from "react-hot-toast";

const DeleteExpenseModal = ({ id, name, open, close }) => {
  if (!open) return null; 
  const handleDelete = async (e) => {
    e.preventDefault();
    const response = await deleteExpense(id);
    if (response) {
      toast.success(response.message || "Expense Deleted Successfully");
      close(); 
    } else {
      toast.error(response.message || "Expense not deleted. Server error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
      <div className="bg-gray-200 p-6 rounded-xl shadow-lg w-96 mx-auto relative">
        <h2 className="text-lg font-bold mb-4">Delete {name} Expense?</h2>
        <div className="flex justify-end gap-2">
          <BudgetButton color="bg-gray-500" text="Cancel" onClick={close} />
          <BudgetButton
            color="bg-red-600"
            icon={<RiDeleteBinLine />}
            text="Delete"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteExpenseModal;

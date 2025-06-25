import React, { useState, useEffect } from "react";
import CreateBudgetModal from "../Modals/CreateBudgetModal";
import CategoryItem from "../CategoriesComponent/CategoryItem";
import { getAllBudgets } from "../../utils/ApiRoutes";
import { useUser } from "../AppContext/UserContext";
import { Link } from "react-router-dom";
const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?.id;

  const loadBudgets = async () => {
    if (!userId) return; 
    try {
      const response = await getAllBudgets(userId);
      console.log(response);
      setBudgets(response.budgets);
    } catch (error) {
      console.log("Failed to fetch budgets:", error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      loadBudgets();
      console.log("User ID is:", userId);
    }
  }, [userId]); 

  const handleCreateBudget = async () => {
    await loadBudgets(); 
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-800 mb-4">My Budgets</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <div
          className="bg-gray-100 p-6 flex flex-col items-center justify-center rounded-2xl shadow-md cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="text-3xl font-bold">+</span>
          <p className="mt-2 text-gray-600">Create New Budget</p>
        </div>

        {/* Display Fetched Budgets */}
        {budgets.length > 0 ? (
          budgets.map((budget, index) => (
            <Link to={`/${budget._id}/${budget.category}`}>
              <CategoryItem
                key={index}
                emoji={budget.emoji || "💰"}
                category={budget.category || "Unknown"}
                items={budget.itemsCount || 0}
                amount={budget.totalAmount || 0}
                spent={budget.spentAmount || 0}
              />
            </Link>
          ))
        ) : (
          <p>No budgets available</p> 
        )}
      </div>

      <CreateBudgetModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateBudget} // Refresh the budget list after adding
      />
    </div>
  );
};

export default Budgets;

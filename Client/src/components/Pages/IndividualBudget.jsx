import React, { useState, useEffect } from "react";
import BudgetTopBar from "../IndividualBudgetComponents/BudgetTopBar";
import { getExpenseByCategory, getSingleBudgets } from "../../utils/ApiRoutes";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import CategoryItem from "../CategoriesComponent/CategoryItem";
import AddExpenseForm from "../IndividualBudgetComponents/AddExpenseForm";
import ExpenseTrendChart from "../Common/ExpenseTrendsChart";
import ExpenseTable from "../IndividualBudgetComponents/ExpenseTabel";
import dayjs from "dayjs";

const IndividualBudget = () => {
  const { id } = useParams();
  const [budgetData, setBudgetData] = useState({});
  const [chartData, setChartData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  const getExpenseData = async () => {
    try {
      const response = await getExpenseByCategory(id);
      if (response?.data) {
        setExpenseData(response.data);
      } else {
        console.error("No expenses found");
        setExpenseData([]);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };
  const getChartData = async () => {
    try {
      const response = await getExpenseByCategory(id);
      if (response?.data) {
        const formattedData = response.data.map((item) => ({
          title: item.title,
          spent: item.amount,
          formattedDate: dayjs(item.date).format("DD MMM YYYY"),
          date: dayjs(item.date).format("DD MMM"),
        }));

        setChartData(formattedData);
      } else {
        console.error("No expenses found");
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const getBudgetData = async () => {
    try {
      const response = await getSingleBudgets(id);
      if (response) {
        setBudgetData(response);
      }
    } catch (error) {
      toast.error(error?.message || "budget data not fetched ");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await getChartData();
        await getBudgetData();
        await getExpenseData();
      }
    };
    fetchData();
  }, [budgetData, chartData,expenseData]);

  return (
    <div className="flex flex-col ">
      <BudgetTopBar />
      <div className="flex justify-between gap-2">
        <section className="w-1/2 flex flex-col gap-2">
          <div>
            {budgetData?.budget ? (
              <CategoryItem
                emoji={budgetData.budget.emoji}
                category={budgetData.budget.category}
                items={budgetData.budget.itemsCount}
                spent={budgetData.budget.spentAmount}
                amount={budgetData.budget.totalAmount}
              />
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div>
            <ExpenseTrendChart chartData={chartData} />
          </div>
        </section>
        <AddExpenseForm />
      </div>
      <div className="mt-9">
        <ExpenseTable expenseData={expenseData} />
      </div>
    </div>
  );
};

export default IndividualBudget;

import Expense from "../models/Expense.js";
import { updateSpentAmount } from "./budgetController.js";
import Budget from "../models/Budget.js";

export const addExpense = async (req, res) => {
  try {
    const { title, amount } = req.body;
    const { userId, budgetId } = req.params;

    // Find the budget to validate category
    const budget = await Budget.findById(budgetId);
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    // Create new expense
    const newExpense = new Expense({
      userId,
      budgetId,
      title,
      amount,
    });

    // Save the expense
    await newExpense.save();

    // Update the budget's spent amount & items count
    budget.spentAmount += amount;
    budget.itemsCount += 1;
    await budget.save();

    res.status(201).json({ message: "Expense added successfully", newExpense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    // Delete the expense
    await Expense.findByIdAndDelete(id);

    // Update the related budget (decrease itemsCount & spentAmount)
    await Budget.findByIdAndUpdate(expense.budgetId, {
      $inc: { itemsCount: -1, spentAmount: -expense.amount },
    });

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete expense", details: error.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, date } = req.body;

    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    const amountValue = amount ? Number(amount) : undefined;
    if (amount && isNaN(amountValue)) {
      return res.status(400).json({ error: "Amount must be a number" });
    }

    // Update the expense
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { title, amount: amountValue, date },
      { new: true, runValidators: true }
    );

    // Adjust the spentAmount in the related Budget
    if (amountValue !== undefined) {
      const difference = amountValue - expense.amount; // Calculate difference in amount
      await Budget.findByIdAndUpdate(expense.budgetId, {
        $inc: { spentAmount: difference },
      });
    }

    res.status(200).json({
      message: "Expense updated successfully",
      data: updatedExpense,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update expense", details: error.message });
  }
};

// Get all expenses for a specific user
export const expenses = async (req, res) => {
  try {
    const { userId } = req.params;

    const getExpenses = await Expense.find({ userId })
      .populate("budgetId", "category") // Fetch only category field from Budget
      .exec();

    if (getExpenses.length === 0) {
      return res
        .status(404)
        .json({ error: "No expenses found against this ID" });
    }

    const formattedExpenses = getExpenses.map((expense) => ({
      _id: expense._id,
      userId: expense.userId,
      title: expense.title,
      amount: expense.amount,
      date: expense.date,
      category: expense.budgetId?.category,
    }));

    res.status(200).json({ data: formattedExpenses });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get expenses",
      details: error.message,
    });
  }
};

// Get a Single Expense by ID
export const singleExpenseDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const itemExist = await Expense.findById(id);
    if (!itemExist) {
      return res.status(404).json({ error: "such item not exist" });
    }
    res.status(200).json({ data: itemExist });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get expenses",
      details: error.message,
    });
  }
};

// Get Expenses by Category
export const expenseByCategory = async (req, res) => {
  try {
    const { budgetId } = req.params;

    const expenses = await Expense.find({ budgetId });

    if (!expenses.length) {
      return res
        .status(404)
        .json({ error: "No expenses found for this budget" });
    }

    res.status(200).json({ data: expenses });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get expenses by budget",
      details: error.message,
    });
  }
};

// Get Expenses Within a Date Range
export const latestTenDaysExpenses = async (req, res) => {
  try {
    const { userId } = req.params;

    // Calculate date range (last 10 days)
    const today = new Date();
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(today.getDate() - 10);

    const recentExpenses = await Expense.find({
      userId: userId,
      date: {
        $gte: tenDaysAgo,
        $lte: today,
      },
    })
      .sort({ date: -1 })
      .populate("budgetId", "category") // Fetch only category field from Budget
      .exec();

    const formattedExpenses = recentExpenses.map((expense) => ({
      _id: expense._id,
      userId: expense.userId,
      title: expense.title,
      amount: expense.amount,
      date: expense.date, 
      category: expense.budgetId?.category,
    }));

    res.status(200).json({ data: formattedExpenses });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch expenses for the last 10 days",
      details: error.message,
    });
  }
};

export const getExpenseSummary = async (req, res) => {
  try {
    const { userId } = req.params;
    const allExpenses = await Expense.find({ userId });

    if (allExpenses.length === 0) {
      return res.status(404).json({ error: "No expenses found" });
    }

    const totalAmount = allExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    const categoryTotal = {};

    allExpenses.forEach((expense) => {
      if (!categoryTotal[expense.category]) {
        categoryTotal[expense.category] = 0;
      }
      categoryTotal[expense.category] += expense.amount;
    });

    res.status(200).json({
      totalAmount,
      expenseCount: allExpenses.length,
      categoryTotal,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get expense summary",
      details: error.message,
    });
  }
};

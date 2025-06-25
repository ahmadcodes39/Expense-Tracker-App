import Budget from "../models/Budget.js";
import Expense from "../models/Expense.js";

// ✅ Add New Budget
export const addBudget = async (req, res) => {
  try {
    const { category,userId, emoji, totalAmount } = req.body;

    const existingBudget = await Budget.findOne({ category, userId });
    if (existingBudget) {
      return res.status(400).json({ message: "Budget category already exists" });
    }

    const budget = await Budget.create({
      userId,
      category,
      emoji,
      totalAmount,
      spentAmount: 0,
    });

    return res.status(200).json({ message: "New budget added successfully", budget });
  } catch (error) {
    res.status(500).json({ message: "Server error", details: error.message });
  }
};

export const getBudgets = async (req, res) => {
  try {
    const { userId } = req.params; 
    const budgets = await Budget.find({ userId });
    return res.status(200).json({ budgets });
    
  } catch (error) {
    res.status(500).json({ message: "Server error", details: error.message });
  }
};

export const getSingleBudget = async (req, res) => {
  try {
    const { budgetId } = req.params;
    const budget = await Budget.findById(budgetId);

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    return res.status(200).json({ budget });
  } catch (error) {
    res.status(500).json({ message: "Server error", details: error.message });
  }
};

export const getBudgetWithExpenses = async (req, res) => {
  try {
    const { budgetId } = req.params;

    // Find budget
    const budget = await Budget.findById(budgetId);
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    const expenses = await Expense.find({ category: budget.category });

    return res.status(200).json({ budget, expenses });
  } catch (error) {
    res.status(500).json({ message: "Server error", details: error.message });
  }
};

export const updateBudget = async (req, res) => {
  try {
    const { budgetId } = req.params;
    const { category, emoji, totalAmount } = req.body;

    const updatedBudget = await Budget.findByIdAndUpdate(
      budgetId,
      { category, emoji, totalAmount },
      { new: true }
    );

    if (!updatedBudget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    return res.status(200).json({ message: "Budget updated", updatedBudget });
  } catch (error) {
    res.status(500).json({ message: "Server error", details: error.message });
  }
};

export const deleteBudget = async (req, res) => {
  try {
    const { budgetId } = req.params;

    const budget = await Budget.findByIdAndDelete(budgetId);
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    await Expense.deleteMany({ budgetId: budget.budgetId });

    return res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", details: error.message });
  }
};

export const updateSpentAmount = async (category) => {
  try {
    const totalSpent = await Expense.aggregate([
      { $match: { category } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const spentAmount = totalSpent.length ? totalSpent[0].total : 0;

    await Budget.findOneAndUpdate(
      { category },
      { spentAmount },
      { new: true }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error", details: error.message });

  }
};


export const getBudgetsName = async (req, res) => {
  try {
    const { userId } = req.params; 
    const budgets = await Budget.find({ userId });

    const budgetNames = budgets.map(budget => budget.category);

    return res.status(200).json({ budgetNames });

  } catch (error) {
    res.status(500).json({ message: "Server error", details: error.message });
  }
};


export const getStats = async (req, res) => {
  try {
    const { userId } = req.params; 
    const budgets = await Budget.find({ userId });

    const totalBudget = budgets.map(budget => budget.totalAmount);
    const totalSpend = budgets.map(budget => budget.spentAmount);

    const totalEntries = budgets.length;

    return res.status(200).json({ totalBudget, totalSpend, totalEntries });

  } catch (error) {
    res.status(500).json({ message: "Server error", details: error.message });
  }
};



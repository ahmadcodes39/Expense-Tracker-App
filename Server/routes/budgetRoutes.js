import express from "express";
import {
  addBudget,
  getBudgets,
  getSingleBudget,
  getBudgetWithExpenses,
  updateBudget, 
  deleteBudget,
  getBudgetsName,
  getStats
} from "../controllers/budgetController.js";
import { authenticateUser } from "../controllers/userController.js";
const router = express.Router(); 

router.post("/:userId/add",authenticateUser, addBudget);
router.get("/:userId/all",authenticateUser, getBudgets); // 
router.get("/:budgetId",authenticateUser, getSingleBudget);
router.get("/:userId/budgetNames",authenticateUser, getBudgetsName);
router.get("/:budgetId/expenses",authenticateUser, getBudgetWithExpenses);
router.get("/:userId/stats",authenticateUser, getStats);
router.put("/:budgetId/update",authenticateUser, updateBudget);
router.delete("/:budgetId/delete",authenticateUser, deleteBudget);

export default router;

import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true, 
  },
  category: {
    type: String,
    required: true,
  },
  itemsCount: {
    type: Number,
    default: 0,
  },
  emoji: {
    type: String,
    default: "💰",
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  spentAmount: {
    type: Number,
    default: 0,
  },
});

// Ensure unique categories per user
BudgetSchema.index({ userId: 1, category: 1 }, { unique: true });

export default mongoose.model("Budget", BudgetSchema);

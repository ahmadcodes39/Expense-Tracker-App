import React, { useState } from "react";
import { Modal } from "@mui/material";
import EmojiPicker from "emoji-picker-react";
import { addBudget } from "../../utils/ApiRoutes";
import toast from "react-hot-toast";

const CreateBudgetModal = ({ open, onClose, onSubmit }) => {
  const [emoji, setEmoji] = useState("💰");
  const [category, setCategory] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?.id;

  const handleEmojiSelect = (emojiData, event) => {
    setEmoji(emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("User object:", userId); // Debugging user object
    console.log("User ID:", userId); // Check if user ID is correct
  
    if (!userId) {
      toast.error("User not found. Please log in.");
      return;
    }
  
    try {
      console.log("Sending request with:", { 
        category, 
        emoji, 
        totalAmount: Number(totalAmount), 
        userId: userId
      });
  
      const response = await addBudget(category,userId, emoji, totalAmount);
      if (response) {
        toast.success(response.message || "Budget added successfully");
        setCategory("");
        setTotalAmount("");
        setEmoji("💰");
        onSubmit({ category, emoji, totalAmount: Number(totalAmount) });
        onClose();
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Something went wrong.");
    }
  };
  

  return (
    <Modal open={open} onClose={onClose}>
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 mx-auto mt-20 relative">
        <h2 className="text-lg font-bold mb-4">Create New Budget</h2>

        {/* Emoji Picker */}
        <div className="relative mb-4">
          <span
            className="text-xl cursor-pointer"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            {emoji}
          </span>
          {showEmojiPicker && (
            <div className="absolute top-12 left-0 z-10 bg-white shadow-md p-2 rounded">
              <EmojiPicker onEmojiClick={handleEmojiSelect} />
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium">Budget Name</label>
          <input
            type="text"
            placeholder="e.g. Home Decor"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />

          <label className="block text-sm font-medium">Budget Amount</label>
          <input
            type="number"
            placeholder="e.g. 5000$"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 cursor-pointer hover:bg-blue-600 text-white p-2 rounded-xl"
          >
            Create Budget
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateBudgetModal;

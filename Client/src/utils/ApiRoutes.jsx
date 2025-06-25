import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// Interceptor to attach the token to headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;

export const signupUser = async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Sign up Error:", error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await API.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await API.post("/auth/forgotPassword", { email });
    return response.data;
  } catch (error) {
    console.error(
      "forgot password Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const updatePassword = async (id, password) => {
  try {
    const response = await API.put(`/auth/update-password/${id}`, { password });
    return response.data;
  } catch (error) {
    console.error(
      "Update password error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const addBudget = async (category, userId, emoji, totalAmount) => {
  try {
    const response = await API.post(`/api/budget/${userId}/add`, {
      category,
      userId,
      emoji,
      totalAmount,
    }); 
    return response.data;
  } catch (error) {
    console.error(
      "budget not added error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAllBudgets = async (userId) => {
  try {
    const response = await API.get(`/api/budget/${userId}/all`);
    return response.data;
  } catch (error) {
    console.error(
      "budgets are not fetched error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getSingleBudgets = async (budgetId) => {
  try {
    const response = await API.get(`/api/budget/${budgetId}`);
    return response.data;
  } catch (error) {
    console.error(
      "budgets are not fetched error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const addExpense = async (userId, budgetId, title, amount) => {
  try {
    const response = await API.post(`/api/addExpense/${userId}/${budgetId}`, {
      title,
      amount,
    });
    return response.data;
  } catch (error) {
    console.error(
      "budgets are not fetched error:",
      error.response?.data || error.message
    );
    throw error;
  }
};


export const getExpenseByCategory = async (budgetId) => { 
  try {
    const response = await API.get(`/api/expense/budget/${budgetId}`);
    return response.data;
  } catch (error) {
    console.error(
      "budgets are not fetched error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteExpense = async (id) => {  
  try {
    const response = await API.delete(`/api/deleteExpense/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "budgets are not fetched error:",
      error.response?.data || error.message
    );
    throw error;
  }
};


export const getAllExpenses = async (userId) => { 
  try {
    const response = await API.get(`/api/expense/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      "budgets are not fetched error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getBudgetNames = async (userId) => {  
  try {
    const response = await API.get(`/api/budget/${userId}/budgetNames`);
    return response.data;
  } catch (error) {
    console.error(
      "budgets are not fetched error:",
      error.response?.data || error.message
    );
    throw error;
  }
};


export const fetchStats = async (userId) => {  
  try {
    const response = await API.get(`/api/budget/${userId}/stats`);
    return response.data;
  } catch (error) {
    console.error(
      "stats are not fetched error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const tenDaysLatestExpenses = async (userId) => {  
  try {
    const response = await API.get(`/api/expenses/${userId}`);
    return response.data;
  } catch (error) {
    console.log(
      "latest expenses are not fetched error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const getProfilePic = async (userId) => { 
  try {
    const response = await API.get(`/auth/profile-pic/${userId}`);
    return response.data;
  } catch (error) {
    console.log(
      "profile pic not fetched",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const uploadPic = async(userId,pic)=>{  
  try {
    const response = await API.post(`/auth/upload-profile-pic/${userId}`,{pic});
    return response.data
  } catch (error) {
    console.log(
      "profile pic not posted",
      error.response?.data || error.message
    );
    throw error;
  }
}
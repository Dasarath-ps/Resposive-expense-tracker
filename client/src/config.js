// API Configuration
export const getApiUrl = () => {
  return import.meta.env.VITE_API_URL || "https://resposive-expense-tracker.onrender.com";
};

export const API_URL = getApiUrl();


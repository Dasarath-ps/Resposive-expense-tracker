import axios from "axios";
//import { API_URL } from "../config.js";

export const getUser = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  let token = localStorage.getItem("token");
  console.log(token);
  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const res = await axios.get(`${apiUrl}/auth/login`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if user data exists
    if (res.data?.user?._id) {
      return res.data.user._id;
    } else if (res.data?.user?._id && res.data.user._id.startsWith("guest_")) {
      // Handle guest users
      return res.data.user._id;
    }

    return null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

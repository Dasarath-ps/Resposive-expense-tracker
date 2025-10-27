import axios from "axios";
import { API_URL } from "../config.js";

export const getUser = async () => {
  let token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${API_URL}/auth/login`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.user._id;
  } catch (error) {
    console.log(error);
  }
};

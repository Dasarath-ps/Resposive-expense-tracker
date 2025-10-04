import axios from "axios";
export const getUser = async () => {
  let token = localStorage.getItem("token");
  try {
    const res = await axios.get("http://localhost:8000/auth/login", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.user._id;
  } catch (error) {
    console.log(error);
  }
};

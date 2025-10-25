import axios from "axios";
export const getUser = async () => {
  const pr = import.meta.env.REACT_APP_API_URL;
  let token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${pr}/auth/login`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.user._id;
  } catch (error) {
    console.log(error);
  }
};

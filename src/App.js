import React from "react";
import Router from "./Router";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./Redux/slices/userSlice";
import { axiosClient } from "./axiosClient";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.user.isAuth);
  const token = localStorage.getItem('token')

  async function getMe() {
    try {
      const response = await axios.get("https://api.check-bets.online/getMe", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        navigate("/");
      }
    } catch (err) {
      navigate("/login");

    }
  }

  React.useEffect(() => {
    getMe()
    // if (!isAuth) {
    // }
  }, [isAuth]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Router />
    </>
  );
}

export default App;

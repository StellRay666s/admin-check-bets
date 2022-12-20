import React from "react";
import Router from "./Router";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./Redux/slices/userSlice";
import { axiosClient } from "./axiosClient";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.user.isAuth);

  async function getMe() {
    const response = await axiosClient.get("/getMe", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    if (response.status === 200) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }

  React.useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  return (
    <>
      <Router />
    </>
  );
}

export default App;

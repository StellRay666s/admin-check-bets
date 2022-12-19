import React from "react";
import Router from "./Router";
import { useDispatch } from "react-redux";
import { setUser } from "./Redux/slices/userSlice";
import { axiosClient } from "./axiosClient";

function App() {
  const dispatch = useDispatch();

  async function getMe() {
    const response = await axiosClient.get("/getMe", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });

    if (response.status === 200) {
      dispatch(setUser(response.data.user));
    }
  }

  React.useEffect(() => {
    getMe();
  });

  return (
    <>
      <Router />s
    </>
  );
}

export default App;

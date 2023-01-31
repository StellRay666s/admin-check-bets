import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../Redux/slices/userSlice";
import { TextField, Button } from "@mui/material";
import { axiosClient } from "../../axiosClient";

import style from "./index.module.scss";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, serPassword] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function login() {
    const response = await axios.post("https://api.check-bets.online/login", {
      email: email,
      password: password,
    });

    if (response.status === 200) {
      dispatch(setUser(response.data.user));

      localStorage.setItem("token", response.data.token);
      navigate("/");
    }
  }

  return (
    <div className={style.wrapper_login}>
      <h2>Check Bets Admin</h2>
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="standard-basic"
        label="Эл.Почта"
        variant="standard"
      />
      <TextField
        value={password}
        onChange={(e) => serPassword(e.target.value)}
        id="standard-basic"
        label="Пароль"
        variant="standard"
      />
      <Button onClick={() => login()} variant="outlined">
        Войти
      </Button>
    </div>
  );
}

export default LoginPage;

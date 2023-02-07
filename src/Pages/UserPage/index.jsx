import React from "react";
import style from "./index.module.scss";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../axiosClient";
import { TextField, Checkbox, FormControlLabel, Button } from "@mui/material";

import Paper from "@mui/material/Paper";
import { setUser } from "../../Redux/slices/userSlice";
import axios from "axios";

function UserPage() {
  const query = useParams();
  const token = localStorage.getItem("token");
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [tariffs, setTarifs] = React.useState([]);
  const [isAddPartner, setIsAddPatner] = React.useState(false);

  async function getUser(query) {
    const response = await axiosClient.get(`http://localhost:8000/getUser`, {
      params: {
        id: query.id,
      },
      headers: {
        authorization: token,
      },
    });
    setName(response.data.name);
    setLastName(response.data.lastname);
    setPhone(response.data.phone);
    setEmail(response.data.email);
    setTarifs(response.data.tariffs);
  }

  function handleChangeCheckbox() {
    setIsAddPatner(!isAddPartner);
  }

  async function saveChangesOnAdminUsers() {
    const response = await axiosClient.patch(
      "http://localhost:8000/saveChangeOnAdmin",
      {
        id: query.id,
        name: name,
        lastname: lastName,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (response.status === 200) {
      console.log("Данные сохранены");
    }
  }

  async function changePartnerTariff() {
    const response = await axiosClient.patch(
      "http://localhost:8000/addPartnerTariff",
      {
        id: query.id,
      }
    );
    if (response.status === 200) {
      console.log("Тариф добавлен");
    }
  }

  async function changeDataProfile() {
    if (isAddPartner) {
      await changePartnerTariff();
      await saveChangesOnAdminUsers();
    } else {
      await saveChangesOnAdminUsers();
    }
  }

  console.log(tariffs.find((item) => item === "Базовый"));

  React.useEffect(() => {
    getUser(query);
  }, [query.id]);

  return (
    <div className={style.wrapper_user_page}>
      <h2>Страница пользователя</h2>
      <div className={style.use_input}>
        <TextField
          id="standard-basic"
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Имя"
          variant="standard"
        />
        <TextField
          id="standard-basic"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          label="Фамилия"
          variant="standard"
        />
        <TextField
          id="standard-basic"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          label="Телефон"
          disabled={true}
          variant="standard"
        />
        <TextField
          disabled={true}
          id="standard-basic"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          label="Эл.Почта"
          variant="standard"
        />
        <TextField
          disabled={true}
          id="standard-basic"
          value={tariffs}
          label="Тарифы"
          variant="standard"
        />

        <FormControlLabel
          control={<Checkbox onChange={() => handleChangeCheckbox()} />}
          disabled={
            tariffs.find((item) => item === "Партнерский") ? true : false
          }
          label="Добавить пользователю партнерский тариф"
        />
        <Button onClick={() => changeDataProfile()} variant="contained">
          Сохранить изменения
        </Button>
      </div>{" "}
    </div>
  );
}

export default UserPage;

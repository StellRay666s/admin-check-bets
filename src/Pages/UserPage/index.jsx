import React from "react";
import style from "./index.module.scss";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../axiosClient";
import { TextField, Checkbox, FormControlLabel, Button } from "@mui/material";

import Paper from "@mui/material/Paper";
import { setUser } from "../../Redux/slices/userSlice";

function UserPage() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [tariffs, setTarifs] = React.useState([]);
  const [isAddPartner, setIsAddPatner] = React.useState(false);

  console.log(isAddPartner);

  async function getUser() {
    const response = await axiosClient.get(`/getUser/id=${id}`, {
      headers: {
        authorization: token,
      },
    });

    console.log(response.data);
    setName(response.data.name);
    setLastName(response.data.lastname);
    setPhone(response.data.phone);
    setEmail(response.data.email);
    setTarifs(response.data.tariffs);
  }

  function handleChangeCheckbox() {
    setIsAddPatner(!isAddPartner);
  }

  React.useEffect(() => {
    getUser();
  }, []);

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
        <FormControlLabel
          control={<Checkbox onChange={() => handleChangeCheckbox()} />}
          label="Добавить пользователю партнерский тариф"
        />
        <Button variant="contained">Сохранить изменения</Button>
      </div>{" "}
    </div>
  );
}

export default UserPage;

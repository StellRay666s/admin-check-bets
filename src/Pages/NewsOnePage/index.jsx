import React from "react";
import { TextField, Fab, Box, Button, ImageListItem } from "@mui/material";
import style from "./index.module.scss";
import { axiosClient } from "../../axiosClient";
import { useParams } from "react-router-dom";

function NewsOnePage() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState("");
  const query = useParams();
  const ref = React.useRef(null);

  async function handleChangeFile(e) {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("image", file);
      const { data } = await axiosClient.post("https://api.check-bets.online/upload", formData);
      console.log(file);
      setImage(data.url);
    } catch (err) {
      console.log(err);
    }
  }

  async function getOneNews() {
    const response = await axiosClient.get(`https://api.check-bets.online/news/${query.id}`, {
      params: {
        id: query.id,
      },
    });

    if (response.status === 200) {
      setTitle(response.data.title);
      setDescription(response.data.description);
      setImage(response.data.image);
    }
  }

  async function updateNews() {
    const response = await axiosClient.patch(`https://api.check-bets.online/news/${query.id}`, {
      title: title,
      description: description,
      image: image,
    });

    if (response.status === 200) {
      console.log("Новость обновлена");
    }
  }

  React.useEffect(() => {
    getOneNews();
  }, [query.id]);

  return (
    <div className={style.wrapper_user_page}>
      <h2>Страница новости</h2>
      <div className={style.use_input}>
        <TextField
          id="standard-basic"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Заголовок"
          variant="standard"
        />
        <TextField
          id="standard-basic"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Текст"
          variant="standard"
          multiline
          rows={10}
          maxRows={10}
        />
        <img src={`https://api.check-bets.online${image}`} />
        <Box
          onClick={() => ref.current.click()}
          sx={{ "& > :not(style)": { m: 1 } }}
        >
          <Fab variant="extended" size="small" color="primary" aria-label="add">
            <input
              onChange={(e) => handleChangeFile(e)}
              ref={ref}
              type={"file"}
              hidden
            />{" "}
            Добавить картинку
          </Fab>
        </Box>
        <Button onClick={() => updateNews()} variant="contained">
          Сохранить изменения
        </Button>
      </div>{" "}
    </div>
  );
}

export default NewsOnePage;

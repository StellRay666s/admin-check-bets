import React from "react";
import style from "./index.module.scss";

import { TextField, Fab, Box, Button, ImageListItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { axiosClient } from "../../axiosClient";
import Editor from "../../Components/Editor";
import axios from "axios";
import { toast } from "react-toastify";
function NewNews() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState([]);
  const query = useParams();
  const ref = React.useRef(null);
  const [blockImage, setBlockImage] = React.useState([]);
  const [content, setContent] = React.useState();
  const navigate = useNavigate();
  async function handleChangeFile(e) {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      console.log(file);
      formData.append("image", file);
      const { data, status } = await axiosClient.post("/upload", formData);
      setImage(data.url);
    } catch (err) {
      console.log(err);
    }
  }

  async function updateNews() {
    try {
      const response = await axiosClient.post(`http://localhost:8000/news`, {
        title: title,
        description: content,
        image: image,
      });

      if (response.status === 200) {
        console.log("Новость обновлена");
        toast.success("Новость добавлена");
        navigate("/news");
      }
    } catch (err) {
      toast.error("Ошибка");
    }
  }

  const [data, setData] = React.useState();

  React.useEffect(() => {}, [query.id]);

  React.useEffect(() => {}, [description]);

  React.useEffect(() => {
    setDescription(description + image);
  }, []);

  return (
    <div className={style.wrapper_user_page}>
      <h2>Страница новости</h2>
      <h2>Картинка на превью</h2>
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
      <img style={{ width: 500 }} src={`http://localhost:8000${image}`} />
      <div className={style.use_input}>
        <TextField
          id="standard-basic"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Заголовок"
          variant="standard"
        />

        {/* <TextField
          id="standard-basic"
          value={description}
          onPaste={(e) => handleChangeFile(e)}
          onChange={(e) => setDescription(e.target.value)}
          label="Текст"
          variant="standard"
          multiline
          rows={10}
          maxRows={10}
        >
          
        </TextField> */}
        <Editor
          content={content}
          setContent={setContent}
          handleChangeFile={handleChangeFile}
        />

        <Button onClick={() => updateNews()} variant="contained">
          Сохранить изменения
        </Button>
        <div></div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: data?.description }} />
    </div>
  );
}

export default NewNews;

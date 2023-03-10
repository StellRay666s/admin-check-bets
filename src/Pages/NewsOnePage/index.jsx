import React from "react";
import { TextField, Fab, Box, Button, ImageListItem } from "@mui/material";
import style from "./index.module.scss";
import { axiosClient } from "../../axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Editor from "../../Components/Editor";

function NewsOnePage() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState("");
  const query = useParams();
  const ref = React.useRef(null);
  const navigate = useNavigate();
  const [content, setContent] = React.useState();

  async function handleChangeFile(e) {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_KEY}/upload`,
        formData
      );
      console.log(file);
      setImage(data.url);
    } catch (err) {
      console.log(err);
    }
  }

  async function getOneNews() {
    const response = await axios.get(
      `${process.env.REACT_APP_API_KEY}/news/${query.id}`,
      {
        headers: {
          AcceptEncoding: "gzip",
        },
        params: {
          id: query.id,
        },
      }
    );

    if (response.status === 200) {
      setTitle(response.data.title);
      setContent(response.data.description);
      setImage(response.data.image);
    }
  }

  const [newContent, setNewContent] = React.useState("");

  React.useEffect(() => {
    console.log(newContent);
  }, [newContent]);

  function setNewData(data) {
    setContent(data);
  }

  async function updateNews() {
    const response = await axiosClient.patch(
      `${process.env.REACT_APP_API_KEY}/news/${query.id}`,
      {
        title: title,
        description: newContent,
        image: image,
      }
    );

    if (response.status === 200) {
      toast.success("?????????????? ?????????????? ??????????????????");
    }
  }

  async function deleteNews() {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_KEY}/news/${query.id}`
    );
    if (response.status === 200) {
      navigate("/news");
      toast.success("?????????????? ??????????????");
    }
  }

  React.useEffect(() => {
    getOneNews();
  }, [query.id]);

  return (
    <div className={style.wrapper_user_page}>
      <h2>???????????????? ??????????????</h2>
      <div className={style.use_input}>
        <TextField
          id="standard-basic"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="??????????????????"
          variant="standard"
        />
        {/* <TextField
          id="standard-basic"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="??????????"
          variant="standard"
          multiline
          rows={10}
          maxRows={10}
        /> */}

        <Editor
          content={content}
          setContent={setContent}
          setNewContent={setNewContent}
        />
        <img src={`${process.env.REACT_APP_API_KEY}${image}`} />
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
            ???????????????? ????????????????
          </Fab>
        </Box>
        <Box onClick={() => deleteNews()} sx={{ "& > :not(style)": { m: 1 } }}>
          <Fab variant="extended" size="small" color="primary" aria-label="add">
            ?????????????? ??????????????
          </Fab>
        </Box>
        <Button onClick={() => updateNews()} variant="contained">
          ?????????????????? ??????????????????
        </Button>
      </div>{" "}
    </div>
  );
}

export default NewsOnePage;

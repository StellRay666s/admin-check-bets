// import React from "react";
// import style from "./index.module.scss";

// import { TextField, Fab, Box, Button, ImageListItem } from "@mui/material";
// import { useParams } from "react-router-dom";
// import { axiosClient } from "../../axiosClient";

// function NewNews() {
//   const [title, setTitle] = React.useState("");
//   const [description, setDescription] = React.useState("");
//   const [image, setImage] = React.useState([]);
//   const query = useParams();
//   const ref = React.useRef(null);
//   const [blockImage, setBlockImage] = React.useState([])


//   async function handleChangeFile(e) {
//     try {
//       const formData = new FormData();
//       const file = e.clipboardData.files[0];
//       formData.append("image", file);
//       const { data, status } = await axiosClient.post("/upload", formData);
//       setImage(data.url)
//       if(status === 200){
//         setBlockImage(<img src={`http://localhost:8000${data.url}`} />)

//       }

//     } catch (err) {
//       console.log(err);
//     }
//   }

//   async function updateNews() {
//     const response = await axiosClient.post(`/news`, {
//       title: title,
//       description: description,
//       image: image,
//     });

//     if (response.status === 200) {
//       console.log("Новость обновлена");
//     }
//   }

//   React.useEffect(() => {}, [query.id]);

//   React.useEffect(()=>{
  
//   },[description])

//   React.useEffect(()=>{
//     setDescription(description + image)

//   },[])

//   return (
//     <div className={style.wrapper_user_page}>
//       {/* <h2>Страница новости</h2>
//       <div className={style.use_input}>
//         <TextField
//           id="standard-basic"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           label="Заголовок"
//           variant="standard"
//         />
   
//         <TextField
//           id="standard-basic"
//           value={description}
//           onPaste={(e) => handleChangeFile(e)}
//           onChange={(e) => setDescription(e.target.value)}
//           label="Текст"
//           variant="standard"
//           multiline
//           rows={10}
//           maxRows={10}
//         >
          
//         </TextField>
//         {/* <img src={`http://localhost:8000${image}`} /> */}
//           {/* {blockImage} sda
//         <Box
//           onClick={() => ref.current.click()}
//           sx={{ "& > :not(style)": { m: 1 } }}
//         >
//           <Fab variant="extended" size="small" color="primary" aria-label="add">
//             <input
          
//               ref={ref}
//               type={"file"}
//               hidden
//             />{" "}
//             Добавить картинку
//           </Fab>
//         </Box>
//         <Button onClick={() => updateNews()} variant="contained">
//           Сохранить изменения
//         </Button>
//         <div c      > */}
// {/* </div> */}
//       {/* </div> */}
//       <Editor
//     </div>
//   );
// }

// export default NewNews;

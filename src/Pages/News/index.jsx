import React from "react";
import style from "./index.module.scss";
import Header from "../../Components/Header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../axiosClient";
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function NewsPage() {
  const [news, setNews] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const [image, setImage] = React.useState("");
  const [page, setPage] = React.useState(1)
  const [count, setCount] = React.useState()

  const navigate = useNavigate();

  async function getNews() {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/getAllNews?offset=${(page*10)-10}`,{
      headers: {
        AcceptEncoding: 'gzip'
      },
    });
    setNews(response.data.rows);
    setCount(response.data.count)
  }

  React.useEffect(() => {
    getNews();
  }, [page]);

  function handleChange(e, value){
    setPage(value)
    console.log(page)
  }

  return (
    <div>
      <Header />
      <div>
        <div className={style.table_wrapper}>
          <TableContainer
            sx={{
              maxWidth: 1440,
            }}
            component={Paper}
          >
            <Button
              onClick={() => navigate("/newNews")}
              sx={{ margin: 2 }}
              variant="contained"
            >
              Добавить новость
            </Button>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Заголовок</TableCell>
                  <TableCell align="center">Просмотры</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {news.map((row) => (
                  <Link to={`/news/${row.id}`}>
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}
                    >
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell align="center">{row.views}</TableCell>
                    </TableRow>
                  </Link>
                ))}
                 <Stack spacing={2}>
        <Pagination onChange={handleChange}  page={page}  count={Math.ceil(count/10)} color="primary" />
        </Stack>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default NewsPage;

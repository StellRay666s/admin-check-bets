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
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../axiosClient";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function UsersPage() {
  const [user, setUser] = React.useState([]);
  const token = localStorage.getItem("token");
  const [page, setPage] = React.useState(1)
  const [count, seCount] = React.useState()
  const navigate = useNavigate();
  async function getUsers() {
    const response = await axiosClient.get(
      `${process.env.REACT_APP_API_KEY}/getUsers?offset=${(page*10)-10}`,
      {
        headers: {
          authorization: token,
        },
      }
    );

    setUser(response.data.rows);
    seCount(response.data.count)
    console.log(response.data)
    if (response.status === 401) {
      navigate("/login");
    }
  }

  React.useEffect(() => {
    getUsers();
    console.log(page)
  }, [page]);

  function handleChange(e, value){
    setPage(value)
    console.log(page)
  }

  return (
    <div>
      <Header />
      <div className={style.table_wrapper}>
        <TableContainer
          sx={{
            maxWidth: 1440,
          }}
          component={Paper}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Имя</TableCell>
                <TableCell align="center">Фамилия</TableCell>
                <TableCell align="center">Эл.Почта</TableCell>
                <TableCell align="center">Телефон</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.map((row) => (
                <Link to={`/user/${row.id}`}>
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                  >
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.lastname}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
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
  );
}

export default UsersPage;

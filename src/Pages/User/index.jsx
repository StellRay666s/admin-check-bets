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

function UsersPage() {
  const [user, setUser] = React.useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  async function getUsers() {
    const response = await axiosClient.get("http://localhost:8000/getUsers", {
      headers: {
        authorization: token,
      },
    });

    setUser(response.data);
    if (response.status === 401) {
      navigate("/login");
    }
  }

  React.useEffect(() => {
    getUsers();
  }, []);

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
                <TableCell align="center">Тариф(ы)</TableCell>
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
                    <TableCell align="center">{row.tariffs}</TableCell>
                  </TableRow>
                </Link>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default UsersPage;

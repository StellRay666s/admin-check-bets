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
import { Link } from "react-router-dom";
import { axiosClient } from "../../axiosClient";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
function UsersPage() {
  const [user, setUser] = React.useState([]);
  const token = localStorage.getItem("token");

  async function getUsers() {
    const response = await axiosClient.get("/getUsers", {
      headers: {
        authorization: token,
      },
    });

    setUser(response.data);
  }

  React.useEffect(() => {
    getUsers();
  }, []);

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
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
                    <TableCell component="th" scope="row">
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

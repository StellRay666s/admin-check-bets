import React from "react";
import style from "./index.module.scss";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../../Redux/slices/userSlice";
import { useDispatch } from "react-redux";

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState();
  const [anchorElUser, setAnchorElUser] = React.useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {};

  const pages = [
    { title: "Пользователи", path: "/" },
    { title: "Новости", path: "/news" },
    {title:"Страницы", path:'/metaTags'},
    {title:"Промо акции", path:'/promos'}
  ];

  function logout() {
    dispatch(clearUser);
    navigate("/login");
    localStorage.setItem("token", "");
  }

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Check Bets
            </Typography>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, index) => (
                <Link to={page.path}>
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>{" "}
                </Link>
              ))}
            </Box>
            <Button onClick={() => logout()} color="inherit">
              Выйти
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Header;

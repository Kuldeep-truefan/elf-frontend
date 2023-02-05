import "../../src/App.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import logo1 from "../assets/img/logo1.png";
import { useNavigate } from "react-router-dom";
import { useState , useEffect} from "react";


const pages = [
  "Dashboard",
  "QUALITY CHECK",
  "AUDIO MISPRONOUNCED",
  "AUDIO QC",
  "SIMPLIFIED NAMES",
  "REDO LIP SYNC",
  "AUDIO MISTREATED",
  "CONFIRM PRONUNCIATION",
];

const settings = ["Profile", "Dashboard", "Logout"];

function Nav() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const showname = localStorage.getItem("username")
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navigate = useNavigate();
  
  const clearLogout = () => {
      localStorage.clear();
    }
  const handleClick = () => document.location.replace('/');
  return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <img src={logo1} sx={{  }}/>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
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
            >
              LOGO
            </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(
                      page === "Dashboard"
                        ? "/home"
                      :page === "QUALITY CHECK"
                        ? "/qc"
                      : page === "AUDIO MISPRONOUNCED"
                      ? "/am"
                      : page === "AUDIO QC"
                      ? "/audioqc"
                      : page === "REDO LIP SYNC"
                      ? "/redlip"
                      : page === "SIMPLIFIED NAMES"
                      ? "/simpname"
                      : page === "AUDIO MISTREATED"
                      ? "/audiomt"
                      : page === "CONFIRM PRONUNCIATION"
                      ? "/confpron"
                      : "/nf"
                    );
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={showname}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={showname} src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} 
                    onClick={() =>{
                    handleCloseUserMenu();
                    if (setting === "Logout"){
                      clearLogout()
                      handleClick()
                      } else if (setting === "Dashboard"){
                        navigate('/home')
                      } else if (setting === "Profile"){
                        navigate('/')
                      }
                    }}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
          </Toolbar>
        </Container>
      </AppBar>
  );
}
export default Nav;

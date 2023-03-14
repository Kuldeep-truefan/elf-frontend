import "../../src/App.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo1 from "../assets/img/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Fade from '@mui/material/Fade';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const pages = [
  "Dashboard",
  "QUALITY CHECK",
  "AUDIO MISPRONOUNCED",
  "AUDIO QC",
  // "SIMPLIFIED NAMES",
  "AUDIO MISTREATED",
  // "REDO LIP SYNC",
  // "CONFIRM PRONUNCIATION",
];

const settings = ["Profile", "Dashboard", "Logout"];

function Nav() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const showname = localStorage.getItem("username");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log('OnClick------->>>>');
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const pageRedirect = (path) =>{
    if (path === "redlip"){
      navigate("/redlip")
    }else if (path === "simpname"){
      navigate("/simpname")
    }else if (path === "audiomt"){
      navigate("/audiomt")
    }else if (path === "confpron"){
      navigate("/confpron")
    }else if(path === "videoupload"){
      navigate("/videoupload")
    }
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const clearLogout = () => {
    localStorage.clear();
  };
  return (
    <div className="navbar-main">      
      <AppBar position="static">
        <Container maxWidth="xl">
          <div className="navbar-child">
          <Toolbar disableGutters>
            <Link to='/'>
              <img src={logo1} sx={{}} />
            </Link>
            <Box>
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
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(
                      page === "Dashboard"
                        ? "/"
                        : page === "QUALITY CHECK"
                        ? "/qc"
                        : page === "AUDIO MISPRONOUNCED"
                        ? "/am"
                        : page === "AUDIO QC"
                        ? "/audioqc"
                        : page === "AUDIO MISTREATED"
                        ? "/audiomt"
                        : "/nf"
                    );
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
              <Button
                // id="fade-button"
                sx={{
                  color: '#fff'
                }}
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleClick}
              >
                Others
              </Button>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={ () => {handleClose(); pageRedirect('simpname');}}>SIMPLIFIED NAMES</MenuItem>
                <MenuItem onClick={ () => {handleClose(); pageRedirect('redlip');}}>REDO LIP SYNC</MenuItem>
                <MenuItem onClick={ () => {handleClose(); pageRedirect('confpron');}}>CONFIRM PRONUNCIATION</MenuItem>
                <MenuItem onClick={ () => {handleClose(); pageRedirect('videoupload');}}>UPLOAD VIDEOS</MenuItem>
              
              </Menu>
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
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu();
                      if (setting === "Logout") {
                        clearLogout();
                        navigate('/login');
                      } else if (setting === "Dashboard") {
                        navigate("/");
                      } else if (setting === "Profile") {
                        navigate("/");
                      }
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
          </div>
        </Container>
      </AppBar>
    </div>
  );
}
export default Nav;

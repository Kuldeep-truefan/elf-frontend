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
import tflogo from "../assets/img/tflogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Fade from '@mui/material/Fade';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const pages = [
  {label:"Dashboard",link:'/'},
  {label:"Quality Check",link:'/quality-check'},
  {label:"Audio Mispronounced",link:'/audio-mispronounced'},
  {label:"Audio QC",link:'/audio-qc'},
  {label:"Simplified Names",link:'/simplified-names'},
  {label:"Audio Mistreated",link:'/audio-mistreated'},
  {label:"Redo Lip Sync",link:'redo-lip-sync'},
  {label:"Confirm Pronunciation",link:'/confirm-pronounciation'},
  {label:"Upload Videos",link:'/upload-video'},
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
              <img src={tflogo} sx={{}} />
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page,index) => (
                <MenuItem key={index} onClick={ () => {handleClose(); navigate(page.link);}}>{page.label}</MenuItem>
              ))}
                 
              {/* <Button
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
              
              </Menu> */}
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

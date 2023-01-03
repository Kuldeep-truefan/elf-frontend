import "./App.css";
import logo1 from "./img/logo1.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";

function Nav() {
  const navigate = useNavigate();
  const handleClick = () => document.location.replace('/');
  const [state, setState] = useState("false");
  const showusername = localStorage.getItem("username").split('"')
  const handleMenu = () => {
    setState(!state);
    console.log("State", state);
  };
  function clearLocalStorage() {
    localStorage.clear();
}
  return (
    <div className="Nav">
      {/* <MenuRoundedIcon fontSize='large'  style={{ color: 'white' }}/> */}
      <Sidebar onClick={handleMenu} />
      <div className="main-logo">
        <img src={logo1} />
      </div>
      <div className="logout-nav">
        <h4 className="user-name" fontFamily={"Courier"}>
          {showusername&&showusername[1]}
        </h4>
        <Button
          // onClick={();, clearLocalStorage();}
          onClick={() => {
            clearLocalStorage();
            handleClick();
          }}
          className="logout-btn"
          variant="outlined"
          style={{ color: "white", border: "0.5px solid white" }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Nav;

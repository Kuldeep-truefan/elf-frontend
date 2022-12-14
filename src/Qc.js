import "./App.css";
import Nav from "./Nav";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
// import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Button, Typography } from "@mui/material";
import VideoModal from "./VideoModal";
import TileController from "./TileController";
import MakePublic from "./VideoModal";
import RowComponent from "./RowComponent";
function Qc() {
  const [comment, setComment] = useState("");
  const [link, setLink] = useState([]);

  // console.log("links at 44",link)

  let FetchLink = async () => {
    fetch("http://127.0.0.1:7000/log/getlink")
      .then((response) => response.json())
      .then((data) => setLink(data.filename));
    // var getlink = await fetch(`http://127.0.0.1:7000/log/getlink`, {
    //       method: 'GET',
    //       headers: {'Content-Type': 'application/json' }
    //     })
    //     getlink.then(response => {
    //       return response.json();
    //     }).then(data => {
    // setLink(data.filename)
  };

  useEffect(() => {
    setComment("Hello This Last Comment");
    FetchLink();
  }, []);

  // let fetchLinks = async()={
  //   fetch(`http://127.0.0.1:7000/log/getlink`, {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ username: username, password: password})
  //   })
  
  return (
    <div className="Qc">
      <Nav />
      <TileController FetchLink={FetchLink} />
      {link.map((item, index) => {
        return <RowComponent key={index} item={item} />;
      })}
    </div>
  );
}

export default Qc;

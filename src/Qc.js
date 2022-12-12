import "./App.css";
// import TextField from "@mui/material/TextField";
// import logo from "./img/logo.png";
// import {
//   Button,
//   Checkbox,
//   FormControlLabel,
//   FormGroup,
//   Typography,
// } from "@mui/material";
// import { pink } from "@mui/material/colors";
// import { useState } from "react";
// import Snackbar from '@mui/material/Snackbar';
import Nav from "./Nav";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
// import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Button, Typography } from "@mui/material";
import VideoModal from "./VideoModal";

function Qc() {
  const [status, setStatus] = useState("");
  const [option, setOptions] = useState("");

  const [open, setOpen] = useState(false);

  const handelClick = (event) => {
    setOpen(!open);
    console.log(open);
  };

  const handleStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleOptions = (event) => {
    setOptions(event.target.value);
  };

  return (
    <div className="Qc">
      <Nav />

      <div className="main-tile">
        <Typography
          sx={{
            fontSize: "11px",
            width: "71.7%",
            marginLeft: "2.4rem",
          }}
        >
          <span className="video-name-dynamic">Sample_4.mp4</span>
        </Typography>
        {/* <TextareaAutosize
          className="remark-area"
          aria-label="minimum height"
          minRows={1}
          placeholder="Last Comments"
        /> */}
        <p className="video-name-dynamic">Audio is not properly comming need changes arrange them in good manner arrange them in good manner them in good manner</p>
      </div>
      <div className="main-tiles">
        {/* <PlayCircleFilledWhiteIcon
          sx={{ fontSize: "3rem", marginTop: ".35rem" }}
          onClick={handelClick}
        /> */}
        <VideoModal onClick={handelClick} open={open} setOpen={setOpen} />

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="select-status">Status</InputLabel>
          <Select
            labelId="select-status"
            id="select-status"
            value={status}
            label="Status"
            onChange={handleStatus}
          >
            <MenuItem value={20}>Approve</MenuItem>
            <MenuItem value={10}>Reject</MenuItem>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="select-options">Options</InputLabel>
          <Select
            labelId="select-options"
            id="select-options"
            value={option}
            label="Options"
            onChange={handleOptions}
          >
            <MenuItem value={10}>Need Changes</MenuItem>
            <MenuItem value={20}>Recheck</MenuItem>
            <MenuItem value={30}>Lips Not Match</MenuItem>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          </Select>
        </FormControl>
        <TextareaAutosize
          className="remark-area"
          aria-label="minimum height"
          minRows={2.2}
          placeholder="Remarks"
        />
        <Button
          variant="contained"
          sx={{ height: "2.5rem", marginTop: ".46rem", backgroundColor:"#D7B8FD" ,color:"white", 
          '&:hover': {
            backgroundColor: '#7F377F',
            color: '#fff',}, 
          }}
        >
          Done
        </Button>
      </div>
      {/* <VideoModal open={open} setOpen={setOpen} /> */}
    </div>
  );
}

export default Qc;

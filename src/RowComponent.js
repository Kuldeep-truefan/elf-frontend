import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./App.css";
// import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Button, Typography } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import VideoModal from "./VideoModal";
import { useState } from "react";
import Alertbox from "./Alertbox";

const RowComponent = ({ item, sbuck, dbuck }) => {
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const [option, setOptions] = useState("");
  const [remark, setRemark] = useState("");
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false)

  const handelClick = (event) => {
    setOpen(!open);
    console.log(open);
  };

  // const handleAlert = (event) => {
  //   setAlertOpen(!alertOpen)
  //   console.log(alertOpen)
  // }

  const handleStatus = (event) => {
    setStatus(event.target.value);
    console.log("Event For handelStatus",event.target.value)
  };
  const handleOptions = (event) => {
    setOptions(event.target.value);
    console.log(event.target.value);
  };

  const handleChange = (event) => {
    setRemark(event.target.value);
    console.log(event.target.value);
  };

  // const handleSubmit = () => {
  //   // const obj ={
  //   //   "video_name": item.video_name,
  //   //   "video_status": "Approved",
  //   //   "video_options": "Redo Lipsync",
  //   //   "video_remarks": "Qc done for this video",
  //   //   "btn_done": "Done"
  //   // }
  //   setComment(remark);
  //   setRemark("");
  // };

  let GetQCDone = async() => {
    console.log("Prining GetQCDone")
    fetch("http://127.0.0.1:7000/log/tilestatus",{
      method:"POST", 
      body: JSON.stringify({ 
        sourceBucket: sbuck , 
        destinationBucket: dbuck,  
        videoName: item,
        videoStatus: status,
        videoOption: option,
        videoRemarks: remark,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
  }
  return (
    <div className="tiles">
      <div className="main-tile">
        <Typography
          sx={{
            // fontSize: "11px",
            // width: "71.7%",
            // marginLeft: "2.4rem",
            position: "relative",
            right: "10%",
            paddingLeft: "1rem",
          }}
        >
          <span className="video-name">{item}</span>
        </Typography>
        {/* <TextareaAutosize
            className="remark-area"
            aria-label="minimum height"
            minRows={1}
            placeholder="Last Comments"
          /> */}
        <p className="video-name-dynamic">No Comment Found</p>
      </div>
      <div className="main-tiles">
        {/* <PlayCircleFilledWhiteIcon
            sx={{ fontSize: "3rem", marginTop: ".35rem" }}
            onClick={handelClick}
          /> */}
        {/* <VideoModal onClick={() => {handelClick(); MakePublic();}}  open={open} setOpen={setOpen} /> */}
        <VideoModal onClick={handelClick} open={open} setOpen={setOpen} item={item}/>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="select-status">Status</InputLabel>
          <Select
            labelId="select-status"
            // id="select-status"
            value={status}
            label="Status"
            onChange={handleStatus}
          >
            <MenuItem value={'Approved'}>Approve</MenuItem>
            <MenuItem value={'Rejected'}>Reject</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="select-options">Reject Reason</InputLabel>
          <Select
            labelId="select-options"
            // id="select-options"
            value={option}
            label="Options"
            onChange={handleOptions}
          >
            <MenuItem value={"Redo Lipsync"}>Redo Lipsync</MenuItem>
            <MenuItem value={"Audio Mistreated"}>Audio Mistreated</MenuItem>
            <MenuItem value={"Audio Mispronounced"}>Audio Mispronounced</MenuItem>
            <MenuItem value={"AV Redo"}>AV Redo</MenuItem>
            <MenuItem value={"AV Sync Mismatch"}>AV Sync Mismatch</MenuItem>
            <MenuItem value={"Fix hi"}>Fix hi</MenuItem>
            <MenuItem value={"Trim Reject"}>Trim Reject</MenuItem>
            <MenuItem value={"Add gap between A & B"}>Add gap between A & B</MenuItem>
            <MenuItem value={"Reduce gap between A & B"}>Reduce gap between A & B</MenuItem>
            <MenuItem value={"AV Redo (mistreated)"}>AV Redo (mistreated)</MenuItem>
            <MenuItem value={"Confirm pronunciation"}>Confirm pronunciation</MenuItem>
          </Select>
        </FormControl>
        <TextareaAutosize
          className="remark-area"
          aria-label="minimum height"
          minRows={2.2}
          placeholder="Remarks"
          value={remark}
          onChange={handleChange}
        />
        <Button
        onClick={GetQCDone}
        variant="contained"
        sx={{
          height: "2.5rem",
          // marginTop: ".46rem",
          backgroundColor: "#D7B8FD",
          color: "white",
          "&:hover": {
            backgroundColor: "#7F377F",
            color: "#fff",
          },
        }}
      >
        Done
      </Button>
        {/* <Alertbox 
        open={alertOpen} setOpen={setAlertOpen} item={item} status={status} remark={remark} option= {option} onClick={handleAlert}
        /> */}
      </div>
      
      {/* <VideoModal open={open} setOpen={setOpen} /> */}
    </div>
  );
};

export default RowComponent;
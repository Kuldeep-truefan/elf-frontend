import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./App.css";
import { Button, Chip, Typography } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import VideoModal from "./VideoModal";
import { useState } from "react";
import {useNavigate } from "react-router-dom";

const RowComponent = ({
  item,
  sbuck,
  dbuck,
  handleClickSendMessage,
  emittedData,
  setLink
}) => {
  const [status, setStatus] = useState("");
  const [option, setOptions] = useState("");
  const [remark, setRemark] = useState("");
  const [open, setOpen] = useState(false);
  // const [alertOpen, setAlertOpen] = useState(false);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('access_token');

  const handelClick = () => {
    setOpen(!open);
    console.log(open);
  };


  const handleStatus = (event) => {
    setStatus(event.target.value);
    console.log("Event For handelStatus", event.target.value);
  };
  const handleOptions = (event) => {
    setOptions(event.target.value);
    console.log(event.target.value);
  };

  const handleChange = (event) => {
    setRemark(event.target.value);
    console.log(event.target.value);
  };

  let GetQCDone = async () => {
    console.log("Checking the access token");
    if (!accessToken) {
      navigate('');
    }
    try{
      fetch("http://34.122.118.251:8000/log/tilestatus", {
          // fetch("http://127.0.0.1:8000/log/tilestatus", {
          method: "POST",
          body: JSON.stringify({
            sourceBucket: sbuck,
            destinationBucket: dbuck,
            videoName: item,
            videoStatus: status,
            videoOption: option,
            videoRemarks: remark,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => response.json()).then((data) => console.log("data", data))
      }
      catch (error) {
        console.log("Error occured", error)
      }
    }
    
  return (
    <div className="tiles">
      <div className="main-tile">
        <div className="main-tile-head">
          <Typography
          className="video-name"
            sx={{
              // fontSize: "11px",
              // width: "71.7%",
              // marginLeft: "2.4rem",
              // position: "relative",
              // right: "10%",
              paddingLeft: "1rem",
            }}
          >{item}
          </Typography>
          {emittedData?.video_id === item && (
            <Chip label={`In progress: ${emittedData?.user}`} sx={{ml:"5px", backgroundColor: 'white'}}/>
          )}
        </div>

        <p className="video-name-dynamic">No Comment Found</p>
      </div>
      <div className="main-tiles">
        <VideoModal
          onClick={handelClick}
          sendMessage={handleClickSendMessage}
          open={open}
          setOpen={setOpen}
          item={item}
          sbuck={sbuck}
        />

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="select-status">Status</InputLabel>
          <Select
            labelId="select-status"
            // id="select-status"
            value={status}
            label="Status"
            onChange={handleStatus}
          >
            <MenuItem value={"Approved"}>Approve</MenuItem>
            <MenuItem value={"Rejected"}>Reject</MenuItem>
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

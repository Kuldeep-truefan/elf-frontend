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

const RowComponent = ({ item }) => {
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const [option, setOptions] = useState("");
  const [remark, setRemark] = useState("");
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

  const handleChange = (event) => {
    setRemark(event.target.value);
  };

  const handleSubmit = () => {
    // const obj ={
    //   "video_name": item.video_name,
    //   "video_status": "Approved",
    //   "video_options": "Redo Lipsync",
    //   "video_remarks": "Qc done for this video",
    //   "btn_done": "Done"
    // }
    setComment(remark);
    setRemark("");
  };
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
        <p className="video-name-dynamic">{comment}</p>
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
            // id="select-options"
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
          value={remark}
          onChange={handleChange}
        />
        <Button
          onClick={handleSubmit}
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
      </div>
      {/* <VideoModal open={open} setOpen={setOpen} /> */}
    </div>
  );
};

export default RowComponent;

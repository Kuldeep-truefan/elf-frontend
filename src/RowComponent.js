import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./App.css";
import { Button, Chip, FormHelperText, Typography } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import VideoModal from "./VideoModal";
import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import { BASE_URL } from "./constants/constant";

const RowComponent = ({
  item,
  sbuck,
  dbuck,
  handleClickSendMessage,
  emittedData,
  setLink,
  index,
  link,
  destbucket 
}) => {
  const [status, setStatus] = useState("");
  const [option, setOptions] = useState("");
  const [remark, setRemark] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  // const [alertOpen, setAlertOpen] = useState(false);
  const navigate = useNavigate();
  // const[required,setRequired]=useState(false)
  const accessToken = localStorage.getItem('authToken');

  const handelClick = () => {

    setOpen(!open);
    console.log(open);
  };



  const handleStatus = (event) => {
    setStatus(event.target.value);
    // if(event.target.value==="Rejected"){
    //   setRequired(true)
    // }
    // else if(event.target.value==="Approved"){
    //   setRequired(false)
    // }
    // console.log("Event For handelStatus", event.target.value);
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
      navigate('/');
    }
    const remainingData=link.filter((x)=>x!==item)
    setLink(remainingData)
    try{
      fetch(`${BASE_URL}/log/tilestatus`, {
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
        .then(response => response.json()).then((data) =>data.success?setLink(remainingData):console.log("not success"))
      }
      catch (error) {
        console.log("Error occured", error)
      }
    }
    // const remainingData=link.filter((x)=>x!==item)

    // const checking=()=>{
    //   const remainingData=link.filter((x)=>x!==item)
    //   console.log(remainingData,"checking")

    // }
    useEffect(() => {
      if(!destbucket) {
        setIsDisabled(true) 
      }
      else if (option && status === 'Rejected' ) setIsDisabled(false) 
      else if (status && status !== 'Rejected') {
        setIsDisabled(false)
      } else {
        setIsDisabled(true)
      }
    }, [status, option, destbucket])
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
            <MenuItem value=""><em>None</em></MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 220 }} size="small" >
          <InputLabel id="select-options">Reason</InputLabel>
          <Select
            labelId="select-options"
            // id="select-options"
            value={option}
            label="Options"
            onChange={handleOptions}>
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
            <MenuItem value=""><em>None</em></MenuItem>
          </Select>
          {/* {required && <FormHelperText>This is required!</FormHelperText>} */}
        </FormControl>
        <TextareaAutosize
          required={true}
          className="remark-area"
          aria-label="minimum height"
          minRows={2.2}
          placeholder="Remarks"
          value={remark}
          onChange={handleChange}/>
        <Button
          onClick={GetQCDone}
          variant="contained"
          disabled={isDisabled}
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

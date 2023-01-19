import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "../App.css";
import { Button, Chip, FormHelperText, Typography } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/constant";
import AudioModal from "../components/am/AudioModal";


const AudioMispronounced = ({
  item,
  sbuck,
  dbuck,
  handleClickSendMessage,
  emittedData,
  setLink,
  index,
  link,
  destbucket,
}) => {
  const [status, setStatus] = useState("");
  const [option, setOptions] = useState("");
  const [remark, setRemark] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [sendFile, setSendFile] = useState("")
  const [folderName, setFolderName] = useState("");

  const navigate = useNavigate();
  // const[required,setRequired]=useState(false)
  const accessToken = localStorage.getItem("authToken");

  const handelClick = () => {
    setOpen(!open);
    console.log(open);
  };

  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleOptions = (event) => {
    setOptions(event.target.value);
    console.log(event.target.value);
  };

  const handleChange = (event) => {
    setRemark(event.target.value);
    console.log(event.target.value);
  };

  const handelFormData = (event) => {
    setSendFile(event.targetfiles[0])
  }

  let UploadAudioFileMispronounced = async () =>{
    try{
      const formData = new FormData();
      formData.append('file', {
        uri: folderName,
        name: `${sendFile}`,
        type: 'audio/wav'
      })
      fetch(`${BASE_URL}/audio/audio_mispronounced`,{
        method: "POST",
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: formData
      })
    }catch (error){
      console.log("Error Occured", error);
    }
  };


  useEffect(() => {
    if (!destbucket) {
      setIsDisabled(false);
    } else if (option && status === "Rejected") setIsDisabled(false);
    else if (status && status !== "Rejected") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [status, option, destbucket]);
  return (
    <div className="am-tiles">
        <h1 className='heading-screens'>Audio Mispronounced</h1>

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
          >
            ritesh-singh.wav
          </Typography>
          {emittedData?.video_id === item && (
            <Chip
              label={`In progress: admin`}
              sx={{ ml: "5px", backgroundColor: "white" }}
            />
          )}
        </div>
        <p className="video-name-dynamic">No Comment Found</p>
      </div>
      <div className="am-main-tiles">
      <AudioModal/>
        <Button
          variant="contained"x
          disabled={isDisabled}
          sx={{
            height: "2.5rem",
            // marginTop: ".46rem",
            backgroundColor: "#D7B8FD",
            color: "white",
            "&:hover": {
              backgroundColor: "#ad6efb",
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
      <br/>
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
          >
            ritesh-singh.wav
          </Typography>
          {emittedData?.video_id === item && (
            <Chip
              label={`In progress: admin`}
              sx={{ ml: "5px", backgroundColor: "white" }}
            />
          )}
        </div>
        <p className="video-name-dynamic">No Comment Found</p>
      </div>
      <div className="am-main-tiles">
      <AudioModal/>
        {/* <TextareaAutosize
          required={true}
          className="remark-area"
          aria-label="minimum height"
          minRows={2.2}
          placeholder="Remarks"
          value= ""
          onChange={handleChange}
        /> */}
        <Button
          variant="contained"
          disabled={isDisabled}
          sx={{
            height: "2.5rem",
            // marginTop: ".46rem",
            backgroundColor: "#D7B8FD",
            color: "white",
            "&:hover": {
              backgroundColor: "#ad6efb",
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

export default AudioMispronounced;

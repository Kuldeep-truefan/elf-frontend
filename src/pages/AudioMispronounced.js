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
  const [sendFile, setSendFile] = useState(null)
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

  const handleFolderName = (event) => {
    console.log("Foldername")
    setFolderName(event.target.value) 
  }
  
  const handleFile = (event) => {
    // const audioUrl = URL.createObjectURL(event.target.files[0]);
    setSendFile(event.target.files[0])
  }
  console.log("sendFile", sendFile)

  let UploadAudioFileMispronounced = async () =>{
    // console.log("It is working");
    // try{
    //   const request = {
    //     "audio": "sendFile.wav",
    //     "folderName": "ak"
    //   }
    //   const formData = new FormData();
    //   // formData.append('file', {url: folderName, name: `${sendFile}`, type: 'audio/wav'})
    //   formData.append('audio',sendFile)
    //   formData.append('folderName', "ak")
    //   console.log("formdata", formData);
    //   fetch(`${BASE_URL}/audio/audio_mispronounced`,{
    //     method: "POST",
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     },
    //     body: formData
    //   })
    // }catch (error){
    //   console.log("Error Occured", error);
    // }
    try{
      let myHeaders = new Headers();
      myHeaders.append("Cookie", "csrftoken=L2ETtVsdGnxYzQ4llNrKESv7Evm5nGa5N7SWvkTt488G43CzM7AnoWHJoxr8GNSC");
  
      let formdata = new FormData();
      formdata.append("audio", sendFile);
      formdata.append("folderName", "jk");
  
      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
      };
      const response = await fetch("http://127.0.0.1:8000/audio/audio_mispronounced", requestOptions);
      const convertToText = await response.text();
      return convertToText 
    }catch(error){
      console.log(error);
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
            onChange={handleFolderName}
            sx={{
              // fontSize: "11px",
              // width: "71.7%",
              // marginLeft: "2.4rem",
              // position: "relative",
              // right: "10%",
              paddingLeft: "1rem",
            }}
          >
            ak
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
      <AudioModal
      onChange={handleFile}
      />
        <Button
          onClick = {UploadAudioFileMispronounced}
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
            onChange={handleFolderName}
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
          onClick = {UploadAudioFileMispronounced}
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
      </div>
    </div>
  );
};

export default AudioMispronounced;

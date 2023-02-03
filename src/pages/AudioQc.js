import React from "react";
import "../App.css";
import { Button, Chip, FormHelperText, Typography } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/constant";
import AudioQcPlayer from "../components/auqc/AudioQcPlayer";
import AudioRecorders from "../components/auqc/AudioRecorders";

const AudioQc = ({
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
  const [audioQcFiles, setAudioQcFiles] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState();
  const navigate = useNavigate();
  // const[required,setRequired]=useState(false)
  const accessToken = localStorage.getItem("authToken");

  const handelClick = () => {
    setOpen(!open);
    console.log(open);
  };

  // const handleStatus = (event) => {
  //   setRemark(event.target.value);
  // };

  // const handleOptions = (event) => {
  //   setOptions(event.target.value);
  //   console.log(event.target.value);
  // };


  let UploadAudioRecored = async (fullFileName, vidAuRec) => {
    try {
      let myHeaders = new Headers();
      myHeaders.append(
        "Cookie",
        "csrftoken=L2ETtVsdGnxYzQ4llNrKESv7Evm5nGa5N7SWvkTt488G43CzM7AnoWHJoxr8GNSC"
      );

      let formdata = new FormData();
      formdata.append("fileName", fullFileName);
      formdata.append("file", recordedAudio);
      formdata.append("folderName", 'audio-remarks');
      formdata.append("videoId", vidAuRec);
      console.log(recordedAudio, "recordedAudio------>>>>>>");

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
      };
      const response = await fetch(`${BASE_URL}/audio/upload-rec-auqc-file`,
        requestOptions
      );
      const convertToText = await response.text();
      return convertToText;
    } catch (error) {
      console.log(error);
    }
  };
  let UpdateQcComtStatus = async (audioQcStatus, audioId, remark) => {
    try{
        fetch(`${BASE_URL}/audio/qccommentstatus`,{
        method: "POST",
        body: JSON.stringify({  
          audioStatus: audioQcStatus,
          audioQcId: audioId,
          audioQcRemarks: remark
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`
        }
      })
      // .then((response) => response.json())
      // .then((data) => setLink(data.filename))
      // setLoading(false); // Stop loading
    }
    catch (error) {
      console.log("Error occured", error)
    }
  }

  const handleChange = (event) => {
    setRemark(event.target.value);
    console.log(event.target.value);
  };

  let FetchAudioQcTiles = async () => {
    console.log("In FetchAudioMisTiles");
    if (!accessToken) {
      navigate("/");
    }
    try {
      // setLoading(true); // Set loading before sending API request
      fetch(`${BASE_URL}/audio/audioqc`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setAudioQcFiles(data.filename))
        // .then((data) => console.log(data));
      // setLoading(false); // Stop loading
    } catch (error) {
      // setLoading(false);
      console.log("Error occured", error);
    }
  };  

  return (
    <div className="am-tiles">
      <h1 className="heading-screens">Audio QC</h1>
      <div className="audio-refresh-btn">
        <Button
          onClick={FetchAudioQcTiles}
          variant="contained"
          disableElevation
          // disabled={isDisabled}
        >
          GET AUDIO QC
        </Button>
      </div>
      {audioQcFiles?.map((value, index) => (
        <div className="au-mis">
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
                {value}
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
            <AudioQcPlayer value={value}/>
            <AudioRecorders setRecordedAudio={setRecordedAudio}/>
            {/* <SettingsVoiceRoundedIcon/> */}
            <TextareaAutosize
              required={true}
              className="remark-area"
              aria-label="minimum height"
              minRows={2.2}
              placeholder="Remarks"
              value={remark}
              onChange={handleChange}
            />
            <div>
              <Button
                variant="contained"
                disabled={isDisabled}
                onClick={() =>{
                  UpdateQcComtStatus("Approved",value.split("_")[3].split("_")[0])
                }}
                sx={{
                  height: "2.5rem",
                  marginRight: "1rem",
                  // marginTop: ".46rem",
                  backgroundColor: "#D7B8FD",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#ad6efb",
                    color: "#fff",
                  },
                }}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                disabled={isDisabled}
                onClick={() =>{
                  UpdateQcComtStatus("Rejected", value.split("_")[3].split(".")[0], remark)
                  UploadAudioRecored(value, value.split("_")[3].split(".")[0])
                }}
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
                Reject
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AudioQc;

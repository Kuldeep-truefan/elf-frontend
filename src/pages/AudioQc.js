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
  const navigate = useNavigate();
  // const[required,setRequired]=useState(false)
  const accessToken = localStorage.getItem("authToken");

  const handelClick = () => {
    setOpen(!open);
    console.log(open);
  };

  // const handleStatus = (event) => {
  //   setStatus(event.target.value);
  // };

  // const handleOptions = (event) => {
  //   setOptions(event.target.value);
  //   console.log(event.target.value);
  // };

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
        .then((data) => console.log(data));
      // setLoading(false); // Stop loading
    } catch (error) {
      // setLoading(false);
      console.log("Error occured", error);
    }
  };

  return (
    <div className="am-tiles">
      <h1 className="heading-screens">Audio Qc</h1>
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
            <AudioQcPlayer />
            <AudioRecorders />
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

import React from "react";
import AudioMistreatedTile from "../components/aumistreated/AudioMistreatedTile";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "../App.css";
import { Button, Chip, FormHelperText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/constant";

const AudioMistreated = ({
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
  const [audioMistreatedFile, setAudioMistreatedFile] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [open, setOpen] = useState(false);
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

  let FetchAudioMisTreated = async () => {
    try {
      // setLoading(true); // Set loading before sending API request
      fetch(`${BASE_URL}/audio/get-amt-files`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setAudioMistreatedFile(data.filename))
        .then((data) => console.log(data));
      // setLoading(false); // Stop loading
    } catch (error) {
      // setLoading(false);
      console.log("Error occured", error);
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
    <div className="amt-tiles">
      <h1 className="heading-screens">Audio Mistreated</h1>
      <div className="audio-refresh-btn">
        <Button
          variant="contained"
          disableElevation
          disabled={isDisabled}
          onClick={FetchAudioMisTreated}
        >
          GET AUDIO Mistreated
        </Button>
      </div>
      {audioMistreatedFile?.map((value, index) => (
        <div key={index} className="au-mt">
          <div className="main-tile">
            <div className="main-tile-head">
              <Typography
                className="video-name"
                sx={{
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
            <AudioMistreatedTile />
            <Button
              variant="contained"
              x
              disabled={isDisabled}
              sx={{
                height: "2.5rem",
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
      ))}
    </div>
  );
};

export default AudioMistreated;


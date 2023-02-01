import "../App.css";
import { Button, Chip, FormHelperText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/constant";
import AudioModal from "../components/am/AudioModal";
import ColorCheckboxes from "../components/CheckBoxPick.js/ColorCheckboxes";

const AudioMispronounced = ({ item, emittedData , sendFile}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [audioFile, setAudioFile] = useState([]);
  const [folderName, setFolderName] = useState("ak");
  const navigate = useNavigate();
  // const[required,setRequired]=useState(false)
  const accessToken = localStorage.getItem("authToken");

  const handelClick = () => {
    setOpen(!open);
    console.log(open);
  };

  // const handleFolderName = (event) => {
  //   setFolderName(event.target.value);
  //   console.log("Foldername", event.target.value);
  // };


  // let UploadAudioFileMispronounced = async (event, fileName, subBuckName) => {
  //   try {
  //     let myHeaders = new Headers();
  //     myHeaders.append(
  //       "Cookie", 
  //       "csrftoken=L2ETtVsdGnxYzQ4llNrKESv7Evm5nGa5N7SWvkTt488G43CzM7AnoWHJoxr8GNSC"
  //     );
  //     // console.log(audiodata, "AUDIODATA");
  //     let formdata = new FormData();
  //     formdata.append("audioData", sendFile.file);
  //     formdata.append("fileName", `${fileName}.wav`);
  //     formdata.append("folderName", `${subBuckName}-raw`);

  //     let requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: formdata,
  //     };
  //     const response = await fetch(
  //       `${BASE_URL}/audio/audio_mispronounced`,
  //       requestOptions
  //     );
  //     const convertToText = await response.text();
  //     return convertToText;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  let FetchAudioMisTiles = async () => {
    if (!accessToken) {
      navigate("/");
    }
    try {
      // setLoading(true); // Set loading before sending API request
      fetch(`${BASE_URL}/audio/audiomis`, {
        method: "GET",
        // body: JSON.stringify({
        //   bucketName: loadbucket,
        // }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setAudioFile(data.filename))
        .then((data) => console.log(data));
      // setLoading(false); // Stop loading
    } catch (error) {
      // setLoading(false);
      console.log("Error occured", error);
    }
  };
  // useEffect(() => {
  //   if (!destbucket) {
  //     setIsDisabled(false);
  //   } else if (option && status === "Rejected") setIsDisabled(false);
  //   else if (status && status !== "Rejected") {
  //     setIsDisabled(false);
  //   } else {
  //     setIsDisabled(true);
  //   }
  // }, [status, option, destbucket]);
  return (
    <div className="aumis-tiles">
      <h1 className="heading-screens">Audio Mispronounced</h1>
      <div className="audio-refresh-btn">
        <Button
          onClick={FetchAudioMisTiles}
          variant="contained"
          disableElevation
          disabled={isDisabled}
          // sx={{
          //   height: "2.5rem",
          //   // marginTop: ".46rem",
          //   backgroundColor: "#D7B8FD",
          //   color: "white",
          //   "&:hover": {
          //     backgroundColor: "#ad6efb",
          //     color: "#fff",
          //   },
          // }}
        >
          GET AUDIO Mispronounced
        </Button>
      </div>
      
      {audioFile?.map((value, index) => (
        <div key={index} className="au-mis">
          <div className="main-tile">
          <ColorCheckboxes/>
            <div className="main-tile-head">
              <Typography
                className="video-name"
                // onChange={handleFolderName}
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
            <AudioModal value={value} sendFile={sendFile}/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AudioMispronounced;

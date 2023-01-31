import React from "react";
import "../App.css";
import { Button, Chip, FormHelperText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/constant";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// import EnglishToHindi from "../components/sn/EnglishToHindi";
// import EnglishToHindi from '../components/sn/EnglishToHindi';
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";

const SimplifiedNames = (
  item,
  sbuck,
  dbuck,
  handleClickSendMessage,
  emittedData,
  setLink,
  index,
  link,
  destbucket
) => {
  const [englishName, setEnglishName] = useState("");
  const [hindiName, setHindiName] = useState("");
  const [confirmName, setConfirmName] = useState("");
  const [doneBtn, setDoneBtn] = useState("");
  const [simpFileName, setSimpFileName] = useState([]);
  const [videoId, setVideoId] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // const[required,setRequired]=useState(false)
  const accessToken = localStorage.getItem("authToken");
  const handelClick = () => {
    setOpen(!open);
    console.log(open);
  };

  const handleEngName = (event) => {
    setEnglishName(event.target.value);
    console.log(event.target.value);
  };

  // const handleHindiName = (event) => {
  //   setHindiName(event.target.value);
  //   console.log(event.target.value);
  // };

  const handleConfirmName = (event) => {
    setConfirmName(event.target.value);
    // console.log(event.target.value);
  };

  let UpdateSimpNames = async (id, button_type) => {
    // const remainingData=link.filter((x)=>x!==item)
    // setLink(remainingData)
    try {
      fetch(`${BASE_URL}/audio/update-simplified-fields`, {
        method: "POST",
        body: JSON.stringify({
          englishName: englishName,
          hindiName: hindiName,
          videoId: id,
          button_type,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // data.success?setLink(remainingData):console.log("No Data Found");
        });
    } catch (error) {
      console.log("Error occured", error);
    }
  };
  // console.log(videoId, "VideoID");
  let FetchSimplifiedNames = async () => {
    if (!accessToken) {
      navigate("/");
    }
    try {
      // setLoading(true); // Set loading before sending API request
      fetch(`${BASE_URL}/audio/simpnametiles`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setSimpFileName(data.filename);
        });
    } catch (error) {
      // setLoading(false);
      console.log("Error occured", error);
    }
  };
  console.log(videoId, "VideoId On Done");

  return (
    <div className="sn-tiles">
      <h1 className="heading-screens">Simplified Names</h1>
      <div className="audio-refresh-btn">
        <Button
          onClick={FetchSimplifiedNames}
          variant="contained"
          disableElevation
        >
          GET Simplified Names
        </Button>
      </div>
      {simpFileName?.map((value, index) => (
        <div key={index} className="au-mis">
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
              <Chip
                label={`In progress: admin`}
                sx={{ ml: "5px", backgroundColor: "white" }}
              />
            </div>
            <p className="video-name-dynamic">Vas Field Value</p>
          </div>
          <div className="main-tiles">
            <TextField
              sx={{
                width: { sm: 200, md: 300 },
                "& .MuiInputBase-root": {
                  width: 250,
                },
                size: "small",
              }}
              id="outlined-basic"
              label="English Name"
              variant="outlined"
              onChange={handleEngName}
            />
            {/* <EnglishToHindi setHindiName={setHindiName} hindiName={hindiName} /> */}
            <ReactTransliterate
              renderComponent={(props) => <textarea {...props} />}
              value={hindiName}
              onChangeText={(text) => {
                setHindiName(text);
              }}
              lang="hi"
            />
            <Button
              // onClick={GetQCDone}
              variant="contained"
              // disabled={isDisabled}
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
              onClick={() =>
                UpdateSimpNames(
                  value.split("_")[3].split(".")[0],"Confirm Name")
              }
            >
              Confirm Name
            </Button>
            <Button
              // onClick={GetQCDone}
              variant="contained"
              // disabled={isDisabled}
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
              onClick={() => {
                UpdateSimpNames(value.split("_")[3].split(".")[0], "Done");
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

export default SimplifiedNames;

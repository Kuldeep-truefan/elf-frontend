import "../../App.css";
import { Button, Chip, FormHelperText, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/constant";
import RedoLipModal from "./RedoLipModal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const RedoLipBox = (
  sbuck,
  handleClickSendMessage,
  destbucket
) => {
  const [status, setStatus] = useState("");
  const [option, setOptions] = useState("");
  const [remark, setRemark] = useState("");
  const [redoTileName, setRedoTileName] = useState([]);
  const [nameCode, setNameCode] = useState("");
  const [newNameCode, setNewNameCode] = useState("");

  const [isDisabled, setIsDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // const[required,setRequired]=useState(false)
  const accessToken = localStorage.getItem("authToken");

  const handelClick = () => {
    setOpen(open);
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
    setNewNameCode(event.target.value);
  };


  let UpdateRedoLipSync = async (videoId) => {
    console.log(videoId, 'VideoId');
    try {
      fetch(`${BASE_URL}/audio/updt-redo-lip-newnamecode`, {
        method: "PUT",
        body: JSON.stringify({
          newNameCode: newNameCode,
          videoId: videoId
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
        });
    } catch (error) {
      console.log("Error occured", error);
    }
  };

  let FetchAudioRedoLipSync = async () => {
    try {
      // setLoading(true); // Set loading before sending API request
      fetch(`${BASE_URL}/audio/get-redo-lip-files`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setRedoTileName(data.filename);
          setNameCode(data.lastnamecode);
        });
      // setLoading(false); // Stop loading
    } catch (error) {
      // setLoading(false);
      console.log("Error occured", error);
    }
  };

  console.log("------------->>>>>>>> ", redoTileName);


  // useEffect(() => {
  //   if (!destbucket) {
  //     setIsDisabled(true);
  //   } else if (option && status === "Rejected") setIsDisabled(false);
  //   else if (status && status !== "Rejected") {
  //     setIsDisabled(false);
  //   } else {
  //     setIsDisabled(true);
  //   }
  // }, [status, option, destbucket]);
  return (
    <div className="tiles">
      <h1 className="heading-screens">Redo Lip Sync</h1>
      <div className="audio-refresh-btn">
        <Button
          variant="contained"
          disableElevation
          onClick={FetchAudioRedoLipSync}
        >
          Get Redo Lip Sync
        </Button>
      </div>
      {redoTileName?.map((value, index) => (
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
              <Chip
                label={`In progress: admin`}
                sx={{ ml: "5px", backgroundColor: "white" }}
              />
            </div>
            <p className="video-name-dynamic">No Comment Found</p>
          </div>
          <div className="main-tiles">
            <RedoLipModal
              onClick={handelClick}
              sendMessage={handleClickSendMessage}
              open={open}
              setOpen={setOpen}
              item={value}
              sbuck={sbuck}
            />
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
            <TextField
              value={nameCode}
              id="outlined-basic"
              disabled="True"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Type Namecode"
              variant="outlined"
              onChange={handleChange}
            />
            </Box>
            <Button
              onClick={() =>{UpdateRedoLipSync(value.split("_")[3].split(".")[0])}}
              variant="contained"
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

export default RedoLipBox;
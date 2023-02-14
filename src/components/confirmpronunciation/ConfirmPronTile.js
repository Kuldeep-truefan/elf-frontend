import React from "react";
import "../../App.css";
import { Button, Chip, FormHelperText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/constant";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import ColorCheckboxes from "../CheckBoxPick.js/ColorCheckboxes";

const ConfirmPronTile = (destbucket) => {
  const [status, setStatus] = useState("");
  const [option, setOptions] = useState("");
  const [audioConfirmPro, setAudioConfirmPro] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [pageCount, setPageCount] = useState("");
  const accessToken = localStorage.getItem("authToken");

  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleOptions = (event) => {
    setOptions(event.target.value);
    console.log(event.target.value);
  };

  let FetchConfirmPronunFiles = async (e, value) => {
    console.log("working----FetchConfirmPronunFiles");
    try {
      fetch(`${BASE_URL}/audio/get-confirm-files`, {
        method: "POST",
        body: JSON.stringify({
          pageNumber: value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setAudioConfirmPro(data.filename);
          setPageCount(data.pagecount);
        });
    } catch (error) {
      console.log("Error occured", error);
    }
  };

  let UpdateConfirmName = async (buttonPressed, engName, videoId) => {
    try {
      fetch(`${BASE_URL}/audio/updt-redo-lip-newnamecode`, {
        method: "PUT",
        body: JSON.stringify({
          englishName: engName,
          buttonPressed: buttonPressed,
          videoId: videoId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((response) => response.json());
    } catch (error) {
      console.log("Error occured", error);
    }
  };

  return (
    <div className="confirm-tiles">
      <h1 className="heading-screens">Confirm Pronunciation</h1>
      <div className="audio-refresh-btn">
        <div className="pagination-class">
        <Button
          variant="contained"
          disableElevation
          onClick={FetchConfirmPronunFiles}
        >
          Confirm Pronunciation Files
        </Button>
          <Pagination
            onChange={(e, value) => FetchConfirmPronunFiles(e, value)}
            count={pageCount}
            variant="outlined"
          />
        </div>
      </div>
      {audioConfirmPro?.map((value, index) => (
        <div key={index} className="au-mt">
          <div className="main-tile">
          <ColorCheckboxes/>
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
          </div>
          <div className="main-tiles">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                sx={{
                  width: { sm: 200, md: 300 },
                  "& .MuiInputBase-root": {
                    width: 250,
                  },
                }}
                id="outlined-basic"
                label="English Name"
                variant="outlined"
              />
            </Box>
            <Button
              variant="contained"
              onClick={() => {
                UpdateConfirmName(
                  "Refunded",
                  value.split("_")[3].split(".")[0]
                );
              }}
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
              Refunded
            </Button>
            <Button
              onClick={() => {
                UpdateConfirmName(
                  "Confirm Name",
                  value.split("_")[3].split(".")[0]
                );
              }}
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
            >
              Confirmed
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConfirmPronTile;

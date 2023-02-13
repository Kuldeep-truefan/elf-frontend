import React from "react";

import "../../App.css";
import { Button, Chip, FormHelperText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/constant";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";

const ConfirmPronTile = (
  destbucket
) => {
  const [status, setStatus] = useState("");
  const [option, setOptions] = useState("");
  const [remark, setRemark] = useState("");
  const [audioConfirmPro, setAudioConfirmPro] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [pageCount, setPageCount] = useState('');
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
    // console.log(event.target.value);
  };

  let FetchConfirmPronunFiles = async (e, value) => {
    console.log('working----FetchConfirmPronunFiles');
    try {
      // setLoading(true); // Set loading before sending API request
      fetch(`${BASE_URL}/audio/get-confirm-files`, {
        method: "POST",
        body: JSON.stringify({
          pageNumber: value
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {setAudioConfirmPro(data.filename)
                          setPageCount(data.pagecount)
        })
    } catch (error) {
      // setLoading(false);
      console.log("Error occured", error);
    }
  };

  let UpdateConfirmName = async (buttonPressed, engName,  videoId ) => {
    try {
      fetch(`${BASE_URL}/audio/updt-redo-lip-newnamecode`, {
        method: "PUT",
        body: JSON.stringify({
          englishName: engName,
          buttonPressed: buttonPressed,
          videoId: videoId
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json());
    } catch (error) {
      console.log("Error occured", error);
    }
  };

  useEffect(() => {
    if (!destbucket) {
      setIsDisabled(true);
    } else if (option && status === "Rejected") setIsDisabled(false);
    else if (status && status !== "Rejected") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [status, option, destbucket]);

  return (
    <div className="confirm-tiles">
      <h1 className="heading-screens">Confirm Pronunciation</h1>
      <div className="audio-refresh-btn">
      <div className="pagination-class">
        <Pagination 
        onChange={(e, value) => FetchConfirmPronunFiles(e, value)}
        count={pageCount} 
        variant="outlined" />
      </div>        
        <Button
          variant="contained"
          disableElevation
          onClick={FetchConfirmPronunFiles}
        >
          Confirm Pronunciation Files
        </Button>
      </div>
      {audioConfirmPro?.map((value, index) => (
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
              onClick={() => {UpdateConfirmName('Refunded', value.split("_")[3].split(".")[0])}}
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
              onClick={() => {UpdateConfirmName('Confirm Name', value.split("_")[3].split(".")[0])}}
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

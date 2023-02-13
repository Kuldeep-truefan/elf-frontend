import React from "react";
import AudioMistreatedTile from "../components/aumistreated/AudioMistreatedTile";
import "../App.css";
import { Button, Chip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/constant";
import Pagination from "@mui/material/Pagination";

const AudioMistreated = ({
  item,
  emittedData,
  destbucket,
}) => {
  const [status, setStatus] = useState("");
  const [option, setOptions] = useState("");
  const [remark, setRemark] = useState("");
  const [audioMistreatedFile, setAudioMistreatedFile] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [pageCount, setPageCount] = useState('');

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

  let FetchAudioMisTreated = async (e, value) => {
    console.log(value, 'Value for FetchAudioMisTreated--------->>> ');
    try {
      // setLoading(true); // Set loading before sending API request
      fetch(`${BASE_URL}/audio/get-amt-files`, {
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
        .then((response) => response)
        .then((data) => {setAudioMistreatedFile(data.filename)
                          setPageCount(data.pagecount)
        })
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
    <div className="amt-tiles">
      <h1 className="heading-screens">Audio Mistreated</h1>
      <div className="audio-refresh-btn">
      <div className="pagination-class">
      <Pagination 
        onChange={(e, value) => FetchAudioMisTreated(e, value)}
        count={pageCount} 
        variant="outlined"/>
      </div>
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
            <AudioMistreatedTile value={value}/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AudioMistreated;


import React from "react";
import "../App.css";
import { Button, Chip, FormHelperText, Typography } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/constant";
import AudioQcPlayer from "../components/auqc/AudioQcPlayer";
import AudioRecorders from "../components/auqc/AudioRecorders";
import Pagination from "@mui/material/Pagination";
import ColorCheckboxes from "../components/CheckBoxPick.js/ColorCheckboxes";

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
  const [remark, setRemark] = useState("");
  const [audioQcFiles, setAudioQcFiles] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState();
  const [pageCount, setPageCount] = useState("");
  const [audioQcData, setAudioQcData] = useState('');

  // const[required,setRequired]=useState(false)
  const accessToken = localStorage.getItem("authToken");

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
      formdata.append("videoId", vidAuRec);

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
      };
      const response = await fetch(
        `${BASE_URL}/audio/upload-rec-auqc-file`,
        requestOptions
      );
      const convertToText = await response.text();
      return convertToText;
    } catch (error) {
      console.log(error);
    }
  };
  let UpdateQcComtStatus = async (
    audioQcStatus,
    audioId,
    remark,
    blobToDelete
  ) => {
    try {
      fetch(`${BASE_URL}/audio/qccommentstatus`, {
        method: "POST",
        body: JSON.stringify({
          audioQc: audioQcStatus,
          audioQcId: audioId,
          audioQcRemarks: remark,
          deleteBlob: blobToDelete ? blobToDelete : "",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // .then((response) => response.json())
      // .then((data) => setLink(data.filename))
      // setLoading(false); // Stop loading
    } catch (error) {
      console.log("Error occured", error);
    }
  };

  const handleChange = (event) => {
    setRemark(event.target.value);
    console.log(event.target.value);
  };

  let FetchAudioQcTiles = async (e, value) => {
    console.log(value, "In FetchAudioQcTiles");
    try {
      // setLoading(true); // Set loading before sending API request
      fetch(`${BASE_URL}/audio/audioqc`, {
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
        .then((response) => response)
        .then((data) => {
          setAudioQcData(data.filename);
          setPageCount(data.pagecount);
        });
      // setLoading(false); // Stop loading
    } catch (error) {
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
        >
          GET AUDIO QC
        </Button>
        <div className="pagination-class">
          <Pagination
            onChange={(e, value) => FetchAudioQcTiles(e ,value)}
            count={pageCount}
            variant="outlined"
          />
        </div>
      </div>
      {audioQcData.length > 0 &&audioQcData?.map(([tileName, comments], index) => (
        <div key={index} className="au-mis">
          <div className="main-tile">
          <ColorCheckboxes/>
            <div className="main-tile-head">
              <Typography
                className="video-name"
                sx={{
                  paddingLeft: "1rem",
                }}
              >
                {tileName}
              </Typography>
              {emittedData?.video_id === item && (
                <Chip
                  label={`In progress: admin`}
                  sx={{ ml: "5px", backgroundColor: "white" }}
                />
              )}
            </div>
            <p className="video-name-dynamic">{comments}</p>
          </div>
          <div className="am-main-tiles">
            <AudioQcPlayer value={tileName} />
            <AudioRecorders setRecordedAudio={setRecordedAudio} />
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
                onClick={() => {
                  UpdateQcComtStatus(
                    "Approved",
                    tileName.split("_")[3].split(".")[0],
                    "",
                    tileName
                  );
                }}
                sx={{
                  height: "2.5rem",
                  marginRight: "1rem",
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
                onClick={() => {
                  UpdateQcComtStatus(
                    "Rejected",
                    tileName.split("_")[3].split(".")[0],
                    remark,
                    ""
                  );
                  UploadAudioRecored(tileName, tileName.split("_")[3].split(".")[0]);
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

import React, { useEffect } from "react";
import AudioMistreatedTile from "../components/aumistreated/AudioMistreatedTile";
import "../App.css";
import { Button, Chip, Typography } from "@mui/material";
import {  useState } from "react";
import { BASE_URL, WEB_BASE_URL } from "../constants/constant";
import Pagination from "@mui/material/Pagination";
import ColorCheckboxes from "../components/CheckBoxPick.js/ColorCheckboxes";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useCallback } from "react";
import { useQuery } from "react-query";

const AudioMistreated = ({ item,  destbucket }) => {
  const [status, setStatus] = useState("");
  const [option, setOptions] = useState("");
  const [remark, setRemark] = useState("");
  const [audioMistreatedFile, setAudioMistreatedFile] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [emittedData, setemittedData] = useState('');
  const accessToken = localStorage.getItem("authToken");
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const [socketUrl, setSocketUrl] = useState(`${WEB_BASE_URL}/audiomis.io/`);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onMessage: (message) => {
      const data = JSON.parse(message?.data);
      setemittedData(JSON.parse(data?.data));
      console.log(message, "message------->>>>>");
    },
  });

  const handleClickAndSendMessage = useCallback(
    (payload) =>
      sendMessage(
        JSON.stringify({
          user: username,
          ...payload,
        })
      ),
    [username]
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

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

  let FetchAudioMisTreated = async (value) => {
      const data = await fetch(`${BASE_URL}/audio/get-amt-files`, {
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

        return data;
      // setLoading(false); // Stop loading
  };

  const { isLoading, data } = useQuery(
    ["FetchAudioMisTreated", pageNumber],
    () => FetchAudioMisTreated(pageNumber), {
      onSuccess: (res) => {
        setPageCount(res.pagecount)
      }
    }
  );

  const { filename: audTreData } = data || {};

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
        <Button
          variant="contained"
          disableElevation
          disabled={isDisabled}
          onClick={FetchAudioMisTreated}
        >
          GET AUDIO Mistreated
        </Button>
          <Pagination
            onChange={(e, value) => {
              setPageNumber(value);
            }}
            count={pageCount}
            page={pageNumber}
            variant="outlined"
          />
        </div>
      </div>
      {audTreData?.length > 0 && audTreData?.map(([tileName, comments], index) => (
        <div key={index} className="au-mt">
          <div className="main-tile">
            <ColorCheckboxes
              tileName={tileName}
              handleClickAndSendMessage={handleClickAndSendMessage}/>
            <div className="main-tile-head">
              <Typography
                className="video-name"
                sx={{
                  paddingLeft: "1rem",
                }}
              >
                {tileName}
              </Typography>
              {!!emittedData &&
              JSON.parse(emittedData)?.filter(
                  (data) => data?.video_id === tileName
                )?.length > 0 && (
                  <Chip
                    label={`In progress: ${
                      JSON.parse(emittedData)?.filter(
                        (data) => data?.video_id === tileName)?.[0]?.user}`}
                    sx={{ ml: "5px", backgroundColor: "white" }}
                  ></Chip>
                )}
            </div>
            <p className="video-name-dynamic">{comments}</p>
          </div>
          <div className="am-main-tiles">
            <AudioMistreatedTile value={comments} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AudioMistreated;

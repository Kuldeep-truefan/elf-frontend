import React from "react";
import AudioMistreatedTile from "../components/aumistreated/AudioMistreatedTile";
import "../App.css";
import { Chip, Typography } from "@mui/material";
import { useState } from "react";
import { BASE_URL, WEB_BASE_URL } from "../constants/constant";
import Pagination from "@mui/material/Pagination";
import ColorCheckboxes from "../components/CheckBoxPick.js/ColorCheckboxes";
// import useWebSocket, { ReadyState } from "react-use-websocket";
import { useCallback } from "react";
import { useQuery } from "react-query";
import RefreshIcon from '@mui/icons-material/Refresh';
import DataTilesLoader from "../components/ExtraComponents/Loaders/DataTilesLoader";
import NoDataFound from "../components/ExtraComponents/NoDataFound";

const AudioMistreated = ({ item, destbucket }) => {
  const [status, setStatus] = useState("");
  const [option, setOptions] = useState("");
  const [remark, setRemark] = useState("");
  const [audioMistreatedFile, setAudioMistreatedFile] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  // const [emittedData, setemittedData] = useState('');
  const accessToken = localStorage.getItem("authToken");
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [audTreData, setAudTreData] = useState([])

  // const [socketUrl, setSocketUrl] = useState(`${WEB_BASE_URL}/ausoket.io/`);
  // const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
  //   onMessage: (message) => {
  //     const data = JSON.parse(message?.data);
  //     setemittedData(JSON.parse(data?.data));
  //   },
  // });

  // const handleClickAndSendMessage = useCallback(
  //   (payload) =>
  //     sendMessage(
  //       JSON.stringify({
  //         user: username,
  //         ...payload,
  //       })
  //     ),
  //   [username]
  // );

  // const connectionStatus = {
  //   [ReadyState.CONNECTING]: "Connecting",
  //   [ReadyState.OPEN]: "Open",
  //   [ReadyState.CLOSING]: "Closing",
  //   [ReadyState.CLOSED]: "Closed",
  //   [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  // }[readyState];

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

  const { isLoading, data, refetch, isFetching } = useQuery(
    ["FetchAudioMisTreated", pageNumber],
    () => FetchAudioMisTreated(pageNumber), {
    onSuccess: (res) => {
      setPageCount(res.pagecount)
      setAudTreData(res.filename)
    }
  }
  );


  return (
    <div className="data-section">
      <div className="section-header">
        <div className="section-header-1">
          <h1 className="heading-screens">Audio Mistreated</h1>
          <div className="audio-refresh-btn">
            <div
              onClick={() => {
                refetch();
              }}
            >
              <RefreshIcon />
            </div>
          </div>
        </div>
        {
          pageNumber === 1 ?
            null
            :
            <div className="pagination-class">
              <Pagination
                onChange={(e, value) => {
                  setPageNumber(value)
                }}
                count={pageCount}
                page={pageNumber}
                variant="outlined"
              />
            </div>
        }
      </div>
      {isLoading || isFetching ?
        <DataTilesLoader /> : audTreData.length > 0 ? audTreData.map(([tileName, comments], index) => (
          <div key={`${tileName}-${index}`} className="tile">
            <div className="main-tile">
              {/* <ColorCheckboxes
                tileName={tileName}
                handleClickAndSendMessage={handleClickAndSendMessage} /> */}
              <div className="main-tile-head">
                <Typography
                  className="video-name"
                  sx={{
                    paddingLeft: "1rem",
                  }}
                >
                  {tileName}
                </Typography>
                {/* {!!emittedData &&
                  JSON.parse(emittedData)?.filter(
                    (data) => data?.video_id === tileName
                  )?.length > 0 && (
                    <Chip
                      label={`In progress: ${JSON.parse(emittedData)?.filter(
                        (data) => data?.video_id === tileName)?.[0]?.user}`}
                        sx={{ ml: "15px", backgroundColor: "#bcddfe", height:'unset',padding:'1px', color:'#1976d2', border:'1px solid #1976d2' }}
                        ></Chip>
                  )} */}
              </div>
              <p className="video-name-dynamic">{comments}</p>
            </div>
            <div className="main-tiles">
              <AudioMistreatedTile value={tileName} pageNumber={pageNumber} />
            </div>
          </div>
        ))
          :
          <NoDataFound />
      }
    </div>
  );
};

export default AudioMistreated;

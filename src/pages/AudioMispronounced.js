import "../App.css";
import { Button, Chip, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { BASE_URL } from "../constants/constant";
import AudioModal from "../components/am/AudioModal";
import ColorCheckboxes from "../components/CheckBoxPick.js/ColorCheckboxes";
import Pagination from "@mui/material/Pagination";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WEB_BASE_URL } from "../constants/constant";
import { useQuery } from "react-query";
import RefreshIcon from '@mui/icons-material/Refresh';
import DataTilesLoader from "../components/ExtraComponents/Loaders/DataTilesLoader";
import NoDataFound from "../components/ExtraComponents/NoDataFound";

const AudioMispronounced = ({ item, sendFile }) => {
  const accessToken = localStorage.getItem("authToken");
  const [emittedData, setemittedData] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [username, setUsername] = useState(localStorage.getItem("username"));

  const [socketUrl, setSocketUrl] = useState(`${WEB_BASE_URL}/audiomis.io/`);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onMessage: (message) => {
      const data = JSON.parse(message?.data);
      setemittedData(JSON.parse(data?.data));
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

  let FetchAudioMisTiles = async (pageNumber) => {
    const data = await fetch(`${BASE_URL}/audio/audiomis`, {
      method: "POST",
      body: JSON.stringify({
        pageNumber,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((response) => response);
    return data;
    // setLoading(false); // Stop loading
  };

  const { isLoading, data, isFetching, refetch } = useQuery(
    ["FetchAudioMisTiles", pageNumber],
    () => FetchAudioMisTiles(pageNumber), {
      onSuccess: (res) => {
        setPageCount(res.pagecount);
      }
    }
  );
  const { filename: misProData } = data || {};
  return (
    <div className="data-section">
      <div className="section-header">
        <div className="section-header-1">
          <h1 className="heading-screens">Audio Mispronounced</h1>
          <div className="audio-refresh-btn">
            <div
              onClick={() => {
                refetch();
              }}
            >
              <RefreshIcon/>
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
                setPageNumber(value)}}
              count={pageCount}
              page={pageNumber}
              variant="outlined"
            />
          </div>
        }
      </div>
      {
        isLoading || isFetching?
        <DataTilesLoader/>
        :
        misProData?.length > 0 ?
        misProData?.map(([tileName, comments], index) => (
          <div key={`${tileName}-${index}`} className="tile">
            <div className="main-tile">
              <ColorCheckboxes
                tileName={tileName}
                handleClickAndSendMessage={handleClickAndSendMessage}
              />
              <div className="main-tile-head">
                <Typography
                  className="video-name"
                  // onChange={handleFolderName}
                  sx={{
                    paddingLeft: "1rem",
                  }}
                >
                  {tileName}
                </Typography>
                {!!emittedData && JSON.parse(emittedData)?.filter(
                  (data) => data?.video_id === tileName
                )?.length > 0 && (
                  <Chip
                    label={`In progress: ${
                      JSON.parse(emittedData)?.filter(
                        (data) => data?.video_id === tileName
                      )?.[0]?.user
                    }`}
                    sx={{ ml: "5px", backgroundColor: "white" }}
                  ></Chip>
                )}
              </div>
              <p className="video-name-dynamic">{comments}</p>
            </div>
            <div className="main-tiles">
              <AudioModal value={tileName} sendFile={sendFile} pageNumber={pageNumber} />
            </div>
          </div>
        ))
        :
        <NoDataFound text={'No data found...'}/>
      }
    </div>
  );
};

export default AudioMispronounced;

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

const AudioMispronounced = ({ item, sendFile }) => {
  const accessToken = localStorage.getItem("authToken");
  const [emittedData, setemittedData] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [username, setUsername] = useState(localStorage.getItem("username"));

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

  const { isLoading, data, isFetching } = useQuery(
    ["FetchAudioMisTiles", pageNumber],
    () => FetchAudioMisTiles(pageNumber)
  );
  const { filename: misProData, pagecount: pageCount } = data || {};
  console.log({misProData})
  return (
    <div className="aumis-tiles">
      <h1 className="heading-screens">Audio Mispronounced</h1>
      <div className="audio-refresh-btn">
        <Button
          onClick={FetchAudioMisTiles}
          variant="contained"
          disableElevation
        >
          GET AUDIO Mispronounced
        </Button>
        <div className="pagination-class">
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

      {misProData?.length > 0 &&
        misProData?.map(([tileName, comments], index) => (
          <div key={index} className="au-mis">
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
            <div className="am-main-tiles">
              <AudioModal value={tileName} sendFile={sendFile} pageNumber={pageNumber} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default AudioMispronounced;

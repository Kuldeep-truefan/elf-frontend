import "../../App.css";
import { Button, Chip, Typography } from "@mui/material";
import { useState } from "react";
import { BASE_URL, WEB_BASE_URL } from "../../constants/constant";
import RedoLipModal from "./RedoLipModal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import ColorCheckboxes from "../CheckBoxPick.js/ColorCheckboxes";

import RefreshIcon from '@mui/icons-material/Refresh';
import useWebSocket, { ReadyState } from "react-use-websocket";

import { useCallback } from "react";
import RedoLipRowTile from "./RedoLipRowTile";
import { useQuery } from "react-query";
import DataTilesLoader from "../ExtraComponents/Loaders/DataTilesLoader";
import NoDataFound from "../ExtraComponents/NoDataFound";

const RedoLipBox = ({sbuck, handleClickSendMessage, destbucket}) => {
  const [newNameCode, setNewNameCode] = useState("");
  const [open, setOpen] = useState(false);
  const [emittedData, setemittedData] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  let FetchAudioRedoLipSync = async (value) => {
    // setLoading(true); // Set loading before sending API request
    const data = await fetch(`${BASE_URL}/audio/get-redo-lip-files`, {
      method: "POST",
      body: JSON.stringify({
        pageNumber: value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => response.json());
    return data;
  };
  const { isLoading, data, isFetching, refetch } = useQuery(
    ["FetchAudioRedoLipSync", pageNumber],
    () => FetchAudioRedoLipSync(pageNumber),
    {
      onSuccess: (res) => {
        setPageCount(res.pagecount);
      },
    }
  );

  const { filename: redoTileName, lastnamecode: nameCode } = data || {};
  const [socketUrl, setSocketUrl] = useState(`${WEB_BASE_URL}/simpredocon.io/`);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onMessage: (message) => {
      const data = JSON.parse(message?.data);
      setemittedData(JSON.parse(data?.data));
    },
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  // const[required,setRequired]=useState(false)
  const accessToken = localStorage.getItem("authToken");

  const handelClick = () => {
    setOpen(open);
  };

  const handleChange = (event) => {
    setNewNameCode(event.target.value);
  };

  let UpdateRedoLipSync = async (videoId) => {
    try {
      fetch(`${BASE_URL}/audio/updt-redo-lip-newnamecode`, {
        method: "PUT",
        body: JSON.stringify({
          newNameCode: newNameCode,
          videoId: videoId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {});
    } catch (error) {
      console.log("Error occured", error);
    }
  };

  return (
    <div className="data-section">
      <div className="section-header">
        <div className="section-header-1">
          <h1 className="heading-screens">Redo Lip Sync</h1>
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
        isLoading?
        <DataTilesLoader/>
        :
       redoTileName?.length > 0 ?
        redoTileName?.map(([tileName, comments, namecode], index) => (
          <RedoLipRowTile
            key={`${tileName}-${index}`}
            tileName={tileName}
            comments={comments}
            nameCode={namecode}
            pageNumber={pageNumber}
          />
        ))
      :
      <NoDataFound text={'No data found...'}/>
      }
    </div>
  );
};

export default RedoLipBox;

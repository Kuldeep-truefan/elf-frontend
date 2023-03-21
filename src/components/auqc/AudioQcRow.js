import React from "react";
import AudioQcPlayer from "./AudioQcPlayer";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useCallback, useState } from "react";
import ColorCheckboxes from "../../components/CheckBoxPick.js/ColorCheckboxes";
import { Chip, Typography } from "@mui/material";
// import useWebSocket, { ReadyState } from "react-use-websocket";
import { BASE_URL, WEB_BASE_URL } from "../../constants/constant";
import { useQueryClient } from "react-query";
import VAS from "../ExtraComponents/VAS";
import { triggerError, triggerSuccess } from "../ExtraComponents/AlertPopups";

const AudioQcRow = ({ index,vas, comments, tileName, item, pageNumber, changeDataStatus }) => {
  const [remark, setRemark] = useState("");
  const queryClient = useQueryClient();
  const [isDisabled, setIsDisabled] = useState(false);
  // const [emittedData, setemittedData] = useState();
  const [username, setUsername] = useState(localStorage.getItem("username"));
  // const [socketUrl, setSocketUrl] = useState(`${WEB_BASE_URL}/ausoket.io/`);
  const [updating, setUpdating] = useState(false)
  

  
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

  const accessToken = localStorage.getItem("authToken");


  let UpdateQcComtStatus = async (
    audioQcStatus,
    audioId,
    remark,
    blobToDelete,
    tileName
  ) => {
    try {
      setUpdating(true)
      const response = await fetch(`${BASE_URL}/audio/qccommentstatus`, {
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
      // if (audioQcStatus === "Rejected") {
      //   await UploadAudioRecored(tileName, audioId);
      // }
      if (response.status === 200) {
        triggerSuccess()
        changeDataStatus('fetching')
        queryClient.invalidateQueries(["FetchAudioQcTiles", pageNumber]);
      }else{
        triggerError()
        setUpdating(false)
        // setTimeout(()=>{
        //   setUploadError(false)
        // },2000)
      }
    } catch (error) {
      console.log("Error occured", error);
    }
  };

  const handleChange = (event) => {
    setRemark(event.target.value);
  };

  

  return (
    <div key={index} className={`tile ${updating ? 'action-performing' : ''}`}>
      <div className="main-tile">
        {/* <ColorCheckboxes
          tileName={tileName}
          handleClickAndSendMessage={handleClickAndSendMessage}
        /> */}
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
                label={`In progress: ${
                  JSON.parse(emittedData)?.filter(
                    (data) => data?.video_id === tileName
                  )?.[0]?.user
                }`}
                sx={{ ml: "15px", backgroundColor: "#bcddfe", height:'unset',padding:'1px', color:'#1976d2', border:'1px solid #1976d2' }}
                ></Chip>
            )} */}
        </div>
        <p className="video-name-dynamic">{comments}</p>
        <VAS vas={vas} />
      </div>
      <div className="main-tiles">
        <AudioQcPlayer value={tileName} />
        <TextareaAutosize
          required={true}
          className="remark-area"
          aria-label="minimum height"
          minRows={2.2}
          placeholder="Remarks"
          value={remark}
          onChange={handleChange}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className={`primary-btn ${isDisabled ? 'disable-btn' : ''}`}
            disabled={isDisabled}
            onClick={() => {
              UpdateQcComtStatus(
                "Approved",
                tileName.split("_")[3].split(".")[0],
                "",
                tileName,
                tileName
              );
            }}
          >
            Approve
          </button>
          <button
            className={`primary-btn ${isDisabled ? 'disable-btn' : ''}`}
            disabled={isDisabled}
            onClick={() => {
              UpdateQcComtStatus(
                "Rejected",
                tileName.split("_")[3].split(".")[0],
                remark,
                tileName,
                tileName
              );
              // UploadAudioRecored(
              //   tileName,
              //   tileName.split("_")[3].split(".")[0]
              // );
            }}
          >
            Reject
          </button>
          <button
            className={`primary-btn ${isDisabled ? 'disable-btn' : ''}`}
            onClick={() => {
              UpdateQcComtStatus(
                "Audio Mistreated",
                tileName.split("_")[3].split(".")[0],
                remark,
                tileName,
                tileName
              );
              // UploadAudioRecored(
              //   tileName,
              //   tileName.split("_")[3].split(".")[0]
              // );
            }}
          >
            Audio Mistreated
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioQcRow;

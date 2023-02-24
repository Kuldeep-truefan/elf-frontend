import React from "react";
import AudioQcPlayer from "./AudioQcPlayer";
import AudioRecorders from "./AudioRecorders";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Button } from "@mui/material";
import { useCallback, useState } from "react";
import ColorCheckboxes from "../../components/CheckBoxPick.js/ColorCheckboxes";
import { Chip, Typography } from "@mui/material";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { BASE_URL, WEB_BASE_URL } from "../../constants/constant";
import { useQueryClient } from "react-query";

const AudioQcRow = ({ index, comments, tileName, item, pageNumber }) => {
  const [remark, setRemark] = useState("");
  const queryClient = useQueryClient();
  const [isDisabled, setIsDisabled] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState();
  const [emittedData, setemittedData] = useState();
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
    blobToDelete,
    tileName
  ) => {
    try {
      await fetch(`${BASE_URL}/audio/qccommentstatus`, {
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
      if (audioQcStatus === "Rejected") {
        await UploadAudioRecored(tileName, audioId);
      }
      queryClient.invalidateQueries(["FetchAudioQcTiles", pageNumber]);
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

  console.log(emittedData, "emittedData----:::::>>>>");

  return (
    <div key={index} className="au-mis">
      <div className="main-tile">
        <ColorCheckboxes
          tileName={tileName}
          handleClickAndSendMessage={handleClickAndSendMessage}
        />
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
        <AudioQcPlayer value={tileName} />
        <AudioRecorders setRecordedAudio={setRecordedAudio} />
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
                tileName,
<<<<<<< HEAD
                tileName
=======
                ""
>>>>>>> 2fea082 (fixed audio player in am screen)
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
                tileName,
                tileName
              );
              UploadAudioRecored(
                tileName,
                tileName.split("_")[3].split(".")[0]
              );
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
  );
};

export default AudioQcRow;

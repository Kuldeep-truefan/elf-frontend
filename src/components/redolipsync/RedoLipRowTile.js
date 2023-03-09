import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useQueryClient } from "react-query";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { BASE_URL, WEB_BASE_URL } from "../../constants/constant";
import ColorCheckboxes from "../CheckBoxPick.js/ColorCheckboxes";
import RedoLipModal from "./RedoLipModal";

const username = localStorage.getItem("username");
const socketUrl = `${WEB_BASE_URL}/ausoket.io/`;
const accessToken = localStorage.getItem("authToken");

const RedoLipRowTile = ({ key, tileName, comments, nameCode, pageNumber }) => {
  const queryClient = useQueryClient();
  const [emittedData, setemittedData] = useState("");
  const [open, setOpen] = useState(false);
  const [newNameCode, setNewNameCode] = useState("");
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onMessage: (message) => {
      const data = JSON.parse(message?.data);
      setemittedData(JSON.parse(data?.data));
    },
  });
  const handleChange = (event) => {
    setNewNameCode(event.target.value);
  };
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
  const handelClick = () => {
    setOpen(open);
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
        .then(() => {
          queryClient.invalidateQueries(["FetchAudioRedoLipSync", pageNumber]);
        })
        .then((data) => {});
    } catch (error) {
      console.log("Error occured", error);
    }
  };
  return (
    <div className="tile">
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
          {emittedData &&
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
      <div className="main-tiles">
        <RedoLipModal
          onClick={handelClick}
          // sendMessage={handleClickSendMessage}
          open={open}
          setOpen={setOpen}
          item={tileName}
          // sbuck={sbuck}
        />
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            value={nameCode}
            id="outlined-basic"
            disabled="True"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Type Namecode"
            variant="outlined"
            onChange={handleChange}
          />
        </Box>
        <Button
          onClick={() => {
            UpdateRedoLipSync(tileName.split("_")[3].split(".")[0]);
          }}
          variant="contained"
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
          Done
        </Button>
      </div>
    </div>
  );
};

export default RedoLipRowTile;

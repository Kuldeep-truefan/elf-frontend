import React, { useCallback, useState } from "react";
import "../../App.css";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

import { Button, Chip, FormHelperText, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, WEB_BASE_URL } from "../../constants/constant";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import ColorCheckboxes from "../CheckBoxPick.js/ColorCheckboxes";
import { useQuery, useQueryClient } from "react-query";

const username = localStorage.getItem("username");
const socketUrl = `${WEB_BASE_URL}/audiomis.io/`;

const ConfirmPronTile = () => {
  const [emittedData, setemittedData] = useState("");
  const queryClient = useQueryClient();
  const [status, setStatus] = useState("");
  const [option, setOptions] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const accessToken = localStorage.getItem("authToken");

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onMessage: (message) => {
      const data = JSON.parse(message?.data);
      setemittedData(JSON.parse(data?.data));
      console.log(message, "message------->>>>>");
    },
  });

  const handleClickAndSendMessage = useCallback(
    (payload) => {
      console.log(payload, "payload");
      if (payload.true) {
        sendMessage(
          JSON.stringify({
            user: username,
            true: true,
            ...payload,
          })
        );
      } else {
        sendMessage(
          JSON.stringify({
            user: username,
            ...payload,
          })
        );
      }
    },
    [username]
  );

  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleOptions = (event) => {
    setOptions(event.target.value);
    console.log(event.target.value);
  };

  let FetchConfirmPronunFiles = async (value) => {
    const data = fetch(`${BASE_URL}/audio/get-confirm-files`, {
      method: "POST",
      body: JSON.stringify({
        pageNumber: value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => response.json());
    // .then((data) => {
    //   setAudioConfirmPro(data.filename);
    //   setPageCount(data.pagecount);
    // });
    return data;
  };

  let UpdateConfirmName = async (buttonPressed, engName, videoId) => {
    try {
      fetch(`${BASE_URL}/audio/updt-redo-lip-newnamecode`, {
        method: "PUT",
        body: JSON.stringify({
          englishName: engName,
          buttonPressed: buttonPressed,
          videoId: videoId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(() => {
        queryClient.invalidateQueries(["FetchConfirmPronunFiles", pageNumber]);
      });
    } catch (error) {
      console.log("Error occured", error);
    }
  };

  const { isLoading, data, isFetching } = useQuery(
    ["FetchConfirmPronunFiles", pageNumber],
    () => FetchConfirmPronunFiles(pageNumber),
    {
      onSuccess: (res) => {
        setPageCount(res.pagecount);
      },
    }
  );
  const { filename: audioConfirmPro } = data || {};
  return (
    <div className="confirm-tiles">
      <h1 className="heading-screens">Confirm Pronunciation</h1>
      <div className="audio-refresh-btn">
        <div className="pagination-class">
          <Button
            variant="contained"
            disableElevation
            onClick={() => window.location.reload(false)}
          >
            Confirm Pronunciation Files
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
      {audioConfirmPro?.map((value, index) => (
        <div key={index} className="au-mt">
          <div className="main-tile">
            <ColorCheckboxes
              tileName={audioConfirmPro}
              handleClickAndSendMessage={handleClickAndSendMessage}
            />
            <div className="main-tile-head">
              <Typography
                className="video-name"
                sx={{
                  paddingLeft: "1rem",
                }}
              >
                {value}
              </Typography>
              {emittedData &&
                JSON.parse(emittedData)?.filter(
                  (data) => data?.video_id === audioConfirmPro
                )?.length > 0 && (
                  <Chip
                    label={`In progress: ${
                      JSON.parse(emittedData)?.filter(
                        (data) => data?.video_id === audioConfirmPro
                      )?.[0]?.user
                    }`}
                    sx={{ ml: "5px", backgroundColor: "white" }}
                  ></Chip>
                )}
            </div>
          </div>
          <div className="main-tiles">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                sx={{
                  width: { sm: 200, md: 300 },
                  "& .MuiInputBase-root": {
                    width: 250,
                  },
                }}
                id="outlined-basic"
                label="English Name"
                variant="outlined"
              />
            </Box>
            <Button
              variant="contained"
              onClick={() => {
                UpdateConfirmName(
                  "Refunded",
                  value.split("_")[3].split(".")[0]
                );
              }}
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
              Refunded
            </Button>
            <Button
              onClick={() => {
                UpdateConfirmName(
                  "Confirm Name",
                  value.split("_")[3].split(".")[0]
                );
              }}
              variant="contained"
              // disabled={isDisabled}
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
              Confirmed
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConfirmPronTile;

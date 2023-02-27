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
import ConfirmPronRow from "./ConfirmPronRow";

const ConfirmPronTile = () => {
  const queryClient = useQueryClient();
  // const [status, setStatus] = useState("");
  // const [option, setOptions] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const accessToken = localStorage.getItem("authToken");





  // const handleStatus = (event) => {
  //   setStatus(event.target.value);
  // };

  // const handleOptions = (event) => {
  //   setOptions(event.target.value);
  // };

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
      fetch(`${BASE_URL}/audio/update-confirm-pronunciation`, {
        method: "POST",
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
        <ConfirmPronRow key={`${value}-${index}`} value={value} />
      ))}
    </div>
  );
};

export default ConfirmPronTile;

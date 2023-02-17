import React from "react";
import "../App.css";
import { Button, Chip, Typography } from "@mui/material";
import { useState } from "react";
import { BASE_URL } from "../constants/constant";
import "react-transliterate/dist/index.css";
import SimpTile from "../components/sn/SimpTile";
import Pagination from "@mui/material/Pagination";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WEB_BASE_URL } from "../constants/constant";
import { useQuery } from "react-query";

const SimplifiedNames = () => {
  const [simpFileName, setSimpFileName] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const accessToken = localStorage.getItem("authToken");

  let FetchSimplifiedNames = async (e, value) => {
    const data = fetch(`${BASE_URL}/audio/simpnametiles`, {
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
      .then((response) => response);
    return data;
  };

  const { isLoading, data } = useQuery(
    ["FetchSimplifiedNames", pageNumber],
    () => FetchSimplifiedNames(pageNumber)
  );

  const { filename: simpNamesData, pagecount: pageCount } = data || {};

  return (
    <div className="sn-tiles">
      <h1 className="heading-screens">Simplified Names</h1>
      <div className="audio-refresh-btn">
        <div className="pagination-class">
          <Button
            onClick={FetchSimplifiedNames}
            variant="contained"
            disableElevation
          >
            GET Simplified Names
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
      {simpNamesData?.length > 0 &&
        simpNamesData?.map(([tileName, vas], index) => (
          <SimpTile key={index} tileName={tileName} vas={vas} pageNumber={pageNumber} />
        ))}
    </div>
  );
};

export default SimplifiedNames;

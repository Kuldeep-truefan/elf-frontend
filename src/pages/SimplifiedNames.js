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
import RefreshIcon from '@mui/icons-material/Refresh';
import DataTilesLoader from "../components/ExtraComponents/Loaders/DataTilesLoader";
import NoDataFound from "../components/ExtraComponents/NoDataFound";

const SimplifiedNames = () => {
  const [simpFileName, setSimpFileName] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const accessToken = localStorage.getItem("authToken");

  let FetchSimplifiedNames = async (value) => {
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

  const { isLoading, data, refetch } = useQuery(
    ["FetchSimplifiedNames", pageNumber],
    () => FetchSimplifiedNames(pageNumber),
    {
      onSuccess: (res) => {
        setPageCount(res.pagecount);
      },
    }
  );

  const { filename: simpNamesData } = data || {};

  return (
    <div className="data-section">
      <div className="section-header">
        <div className="section-header-1">
          <h1 className="heading-screens">Simplified Names</h1>
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
        simpNamesData?.length > 0 ?
        simpNamesData?.map(([tileName, vas], index) => (
          <SimpTile
            key={`${tileName}-${index}`}
            tileName={tileName}
            vas={vas}
            pageNumber={pageNumber}
          />
        ))
      :
      <NoDataFound text={'No data found...'} />
      }
    </div>
  );
};

export default SimplifiedNames;

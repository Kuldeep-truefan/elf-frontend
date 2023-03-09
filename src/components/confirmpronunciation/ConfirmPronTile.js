import React, { useCallback, useState } from "react";
import "../../App.css";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

import { Button,} from "@mui/material";
import { BASE_URL, WEB_BASE_URL } from "../../constants/constant";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import RefreshIcon from '@mui/icons-material/Refresh';
import Pagination from "@mui/material/Pagination";
import ColorCheckboxes from "../CheckBoxPick.js/ColorCheckboxes";
import { useQuery, useQueryClient } from "react-query";
import ConfirmPronRow from "./ConfirmPronRow";
import DataTilesLoader from "../ExtraComponents/Loaders/DataTilesLoader";
import NoDataFound from "../ExtraComponents/NoDataFound";

const ConfirmPronTile = () => {
  const queryClient = useQueryClient();
  // const [status, setStatus] = useState("");
  // const [option, setOptions] = useState("");
  const [audioConfirmPro, setAudioConfirmPro] = useState([])
  const [pageCount, setPageCount] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const accessToken = localStorage.getItem("authToken");

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
    return data;
  };

  const { isLoading, data, isFetching, refetch } = useQuery(
    ["FetchConfirmPronunFiles", pageNumber],
    () => FetchConfirmPronunFiles(pageNumber),
    {
      onSuccess: (res) => {
        setPageCount(res.pagecount);
        setAudioConfirmPro(data)
      },
      onError:(error) =>{
        console.log(error)
      }
    },
    
  );
  return (
    <div className="data-section">
      <div className="section-header">
        <div className="section-header-1">
          <h1 className="heading-screens">Confirm Pronunciation</h1>
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
      audioConfirmPro.length>0?audioConfirmPro.map((value, index) => (
        <ConfirmPronRow key={`${value}-${index}`} value={value} />
      ))
    :
    <NoDataFound text={'No data found...'} />
    }
    </div>
  );
};

export default ConfirmPronTile;

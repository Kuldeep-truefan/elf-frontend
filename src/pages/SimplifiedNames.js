import React from "react";
import "../App.css";
import { useState } from "react";
import { BASE_URL } from "../constants/constant";
import "react-transliterate/dist/index.css";
import SimpTile from "../components/sn/SimpTile";
import Pagination from "@mui/material/Pagination";
import { useQuery } from "react-query";
import RefreshIcon from '@mui/icons-material/Refresh';
import DataTilesLoader from "../components/ExtraComponents/Loaders/DataTilesLoader";
import NoDataFound from "../components/ExtraComponents/NoDataFound";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from '@mui/icons-material/Search';

const SimplifiedNames = () => {
  const [simpFileName, setSimpFileName] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const accessToken = localStorage.getItem("authToken");
  const [simpNamesData, setSimpNamesData] = useState([])
  const [videoSelected, setVideoSelected] = useState('G2P')
  const [audioSelected, setAudioSelected] = useState('Normal');

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

  const { isLoading, data, refetch, isFetching } = useQuery(
    ["FetchSimplifiedNames", pageNumber],
    () => FetchSimplifiedNames(pageNumber),
    {
      onSuccess: (res) => {
        setPageCount(res.pagecount);
        setSimpNamesData(res.filename)
      },
    }
  );

  function handleAudio(e){
    setAudioSelected(e.target.value)
  }
  function handleVideo(e){
    setVideoSelected(e.target.value)
  }

  // const { filename: simpNamesData } = data || {};

  return (
    <div className="data-section">
      <div className="section-header">
        <div className="section-header-1">
          <h1 className="heading-screens">Simplified Names</h1>
          <FormControl sx={{ m: 1, minWidth: 133}} size="small">
            <InputLabel id="load-buck">Video</InputLabel>
            <Select
              labelId="load-buck-lab"
              id="load-buck-id"
              value={videoSelected}
              label="Load Bucket"
              onChange={handleVideo}
            >
              {['G2P','S2S','Mapping','Textgrid'].map((bucket,index) => <MenuItem value={bucket} key={index}>{bucket}</MenuItem>)
              }
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120}} size="small">
            <InputLabel id="load-move">Audio</InputLabel>
            <Select
              labelId="load-move-lab"
              id="load-move-id"
              value={audioSelected}
            label="Load Bucket"
              onChange={handleAudio}
            >
              {['Normal','IPA'].map((bucket,index) => <MenuItem key={index} value={bucket}>{bucket}</MenuItem>)} 
            </Select>
          </FormControl>
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
        isLoading || isFetching?
        <DataTilesLoader/>
        :
        simpNamesData.length > 0 ?
        simpNamesData.map(([tileName, vas], index) => (
          <SimpTile
            key={`${tileName}-${index}`}
            tileName={tileName}
            vas={vas}
            pageNumber={pageNumber}
            videoSelected={videoSelected}
            audioSelected={audioSelected}
          />
        ))
      :
      <NoDataFound text={'No data found...'} />
      }
    </div>
  );
};

export default SimplifiedNames;

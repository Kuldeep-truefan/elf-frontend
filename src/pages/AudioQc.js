import React from "react";
import "../App.css";
import { useState } from "react";
import { BASE_URL } from "../constants/constant";
import Pagination from "@mui/material/Pagination";

import AudioQcRow from "../components/auqc/AudioQcRow";
import {
  useQuery,
} from 'react-query'

const AudioQc = ({
  item,
  emittedData
}) => {
  const accessToken = localStorage.getItem("authToken");
  const [pageNumber, setPageNumber] = useState(1);
  

  let FetchAudioQcTiles = async (value) => {
     const data = await fetch(`${BASE_URL}/audio/audioqc`, {
        method: "POST",
        body: JSON.stringify({
          pageNumber: value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((response) => response.json())
        console.log({data});
        return data
  };
  
  const {isLoading, data, isFetching} = useQuery(['FetchAudioQcTiles', pageNumber],() => FetchAudioQcTiles(pageNumber),)
  const {filename: audioQcData, pagecount: pageCount} = data || {}
  console.log({isFetching}, 'audioQcData.length------->>>>>>>');
  if (isLoading) {
    return <div style={{
      display: 'flex',
      height:'100vh',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
<p>Loading....</p>
    </div>
  }
  return (
    <div className="am-tiles">
      <h1 className="heading-screens">Audio QC</h1>
      <div className="audio-refresh-btn">
        {/* <Button
          onClick={FetchAudioQcTiles}
          variant="contained"
          disableElevation
        >
          GET AUDIO QC
        </Button> */}
        <div className="pagination-class">
          <Pagination
            onChange={(e, value) => {
              console.log(value);
              setPageNumber(value)}}
            count={pageCount}
            page={pageNumber}
            variant="outlined"
          />
        </div>
      </div>
      {audioQcData?.length > 0 &&audioQcData?.map(([tileName, comments], index) => (

        <AudioQcRow item={item} emittedData={emittedData} tileName={tileName} comments={comments} index={index} />
      )
      )}
    </div>
  );
};

export default AudioQc;

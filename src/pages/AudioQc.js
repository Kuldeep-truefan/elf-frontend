import React from "react";
import "../App.css";
import { useState } from "react";
import { BASE_URL } from "../constants/constant";
import Pagination from "@mui/material/Pagination";
import ClockLoader from "react-spinners/ClockLoader";
import AudioQcRow from "../components/auqc/AudioQcRow";
import {
  useQuery,
} from 'react-query'
import Button from "@mui/material/Button";
import { useQueryClient } from "react-query";
import DataTilesLoader from "../components/ExtraComponents/Loaders/DataTilesLoader";

const AudioQc = ({
  item,
  emittedData
}) => {
  const accessToken = localStorage.getItem("authToken");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  // const queryClient = useQueryClient()

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
        return data
  };
  
  const {isLoading, data, isFetching} = useQuery(['FetchAudioQcTiles', pageNumber],() => FetchAudioQcTiles(pageNumber),
  {
    onSuccess: (res) => {
      setPageCount(res.pagecount)
    }
  })
  const {filename: audioQcData } = data || {}
//   if (isLoading) {
//     return <div style={{
//       display: 'flex',
//       height:'100vh',
//       alignItems: 'center',
//       justifyContent: 'center'
//     }}>
// <p>Loading....</p>
//     </div>
//   }
  return (
    <>
    {/* {isLoading && (
      <div
        style={{
          position: "absolute",
          background: "rgba(0,0,0,0.3)",
          zIndex: 2,
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ClockLoader color="#ad6efb" />
      </div>
    )} */}
    <div className="am-tiles">
      <h1 className="heading-screens">Audio QC</h1>
      <div className="audio-refresh-btn">
        <Button
          onClick={() => {
            window.location.reload(false);
            // queryClient.invalidateQueries(["FetchAudioQcTiles", pageNumber]);
          }}
          variant="contained"
          disableElevation
        >
          GET AUDIO QC
        </Button>
        <div className="pagination-class">
          <Pagination
            onChange={(e, value) => {
              setPageNumber(value)}}
            count={pageCount}
            page={pageNumber}
            variant="outlined"
          />
        </div>
      </div>
      {isLoading?<DataTilesLoader/> : audioQcData?.map(([tileName, comments], index) => (

        <AudioQcRow key={`${tileName}-${index}`} item={item} emittedData={emittedData} tileName={tileName} comments={comments} index={index} pageNumber={pageNumber}/>
      )
      )}
      {/* {audioQcData?.length > 0 &&audioQcData?.map(([tileName, comments], index) => (

        <AudioQcRow key={`${tileName}-${index}`} item={item} emittedData={emittedData} tileName={tileName} comments={comments} index={index} pageNumber={pageNumber}/>
      )
      )} */}
    </div>
    </>
  );
};

export default AudioQc;

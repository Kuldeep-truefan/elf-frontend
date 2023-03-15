import React from "react";
import "../App.css";
import { useState } from "react";
import { BASE_URL } from "../constants/constant";
import Pagination from "@mui/material/Pagination";
import RefreshIcon from '@mui/icons-material/Refresh';
import AudioQcRow from "../components/auqc/AudioQcRow";
import {
  useQuery,
} from 'react-query';
import DataTilesLoader from "../components/ExtraComponents/Loaders/DataTilesLoader";
import NoDataFound from "../components/ExtraComponents/NoDataFound";

const AudioQc = ({
  item,
  emittedData
}) => {
  const accessToken = localStorage.getItem("authToken");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [audioQcData, setAudioQcData] = useState([])
  const [loading, setLoading] = useState(true)
  // const queryClient = useQueryClient()

  let FetchAudioQcTiles = async (loadingType='loading',value) => {
    if(loadingType === 'loading'){
      setLoading(true)
    }
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
      .finally(()=>{
        setLoading(false)
      })
        return data
  };
  
  // const [audioQcData, setAudioQcData] = useState({})
  const {isLoading, data, isFetching, refetch} = useQuery(['FetchAudioQcTiles', pageNumber],() => FetchAudioQcTiles(pageNumber),
  {
    onSuccess: (res) => {
      setPageCount(res.pagecount)
      setAudioQcData(res.filename)
    }
  })
  // const audioQcData =  {}
  // const{filename:audioQcData} = data || {}

  const changeDataStatus = (index)=>{
    console.log(index)
    // audioQcData
  }
  

  return (
    <>
    <div className="data-section">
      <div className="section-header">
        <div className="section-header-1">
          <h1 className="heading-screens">Audio QC</h1>
          <div className="audio-refresh-btn">
            <div
              onClick={() => {
                FetchAudioQcTiles();
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
      {loading?
      <DataTilesLoader/> 
      :
      audioQcData.length === 0? 
      <NoDataFound text={'No data found...'}/>
      :
      audioQcData.map(([tileName, comments], index) => (
        <AudioQcRow key={`${tileName}-${index}`} item={item} emittedData={emittedData} tileName={tileName} comments={comments} index={index} pageNumber={pageNumber} changeDataStatus={FetchAudioQcTiles}/>
      )
      )
      }
    </div>
    </>
  );
};

export default AudioQc;

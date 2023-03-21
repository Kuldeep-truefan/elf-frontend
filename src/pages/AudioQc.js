import React, { useEffect, useRef } from "react";
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
import Filter from "../components/filter/Filter";

const AudioQc = ({
  item,
  emittedData
}) => {
  const accessToken = localStorage.getItem("authToken");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [audioQcData, setAudioQcData] = useState([]);
  const [allData, setAllData] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingType, setLoadingType] = useState('loading');


  const filterRef = useRef();

  let FetchAudioQcTiles = async (value) => {
    setLoading(true)
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
      .finally(() => {
        setLoading(false)
      })
    return data
  };

  const { refetch } = useQuery(['FetchAudioQcTiles', pageNumber], () => FetchAudioQcTiles(pageNumber),
    {
      onSuccess: (res) => {
        setPageCount(res.pagecount)
        setAllData(res.filename)
        // setAudioQcData(res.filename)
      }
    })

  const refectData = () => {
    setLoadingType('loading')
    refetch()
  }

  useEffect(()=>{
    filterRef.current.handleFilterData()
  },[allData])

  return (
    <>
      <div className="data-section">
        <div className="section-header">
          <div className="section-header-1">
            <h1 className="heading-screens">Audio QC</h1>
            <div className="audio-refresh-btn">
              <div
                onClick={() => {
                  refectData()
                }}
              >
                <RefreshIcon />
              </div>
            </div>
            <Filter data={allData} setData={setAudioQcData} ref={filterRef} />
          </div>
          {
            pageCount === 1 || !pageCount ?
              null
              :
              <div className="pagination-class">
                <Pagination
                  onChange={(e, value) => {
                    setPageNumber(value)
                  }}
                  count={pageCount}
                  page={pageNumber}
                  variant="outlined"
                />
              </div>
          }
        </div>
        {loadingType === 'loading' && loading ?
          <DataTilesLoader />
          :
          audioQcData.length === 0 ?
            <NoDataFound text={'No data found...'} />
            :
            audioQcData.map(({ simplified_name: tileName, qc_comment: comments, vas }, index) => (
              <AudioQcRow key={`${tileName}-${index}`} vas={vas} item={item} emittedData={emittedData} tileName={tileName} comments={comments} index={index} pageNumber={pageNumber} changeDataStatus={setLoadingType} />
            )
            )
        }
      </div>
    </>
  );
};

export default AudioQc;

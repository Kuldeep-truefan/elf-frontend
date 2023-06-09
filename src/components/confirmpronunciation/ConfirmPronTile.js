import React, { useEffect, useRef, useState } from "react";
import "../../App.css";

import { BASE_URL } from "../../constants/constant";

import RefreshIcon from '@mui/icons-material/Refresh';
import Pagination from "@mui/material/Pagination";
import { useQuery, useQueryClient } from "react-query";
import ConfirmPronRow from "./ConfirmPronRow";
import DataTilesLoader from "../ExtraComponents/Loaders/DataTilesLoader";
import NoDataFound from "../ExtraComponents/NoDataFound";
import Filter from "../filter/Filter";

const ConfirmPronTile = () => {
  const queryClient = useQueryClient();
  const [audioConfirmPro, setAudioConfirmPro] = useState([]);
  const [allData, setAllData] = useState([])
  const [pageCount, setPageCount] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const accessToken = localStorage.getItem("authToken");
  const [loading, setLoading] = useState(true)
  const [loadingType, setLoadingType] = useState('loading');
  
  const filterRef = useRef();

  let FetchConfirmPronunFiles = async (value) => {
    setLoading(true)
    const data = fetch(`${BASE_URL}/audio/get-confirm-files`, {
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
    ;
    return data;
  };

  const reloadData = ()=>{
    setLoadingType('loading')
    refetch()
  }

  const { isLoading, data, isFetching, refetch } = useQuery(
    ["FetchConfirmPronunFiles", pageNumber],
    () => FetchConfirmPronunFiles(pageNumber),
    {
      onSuccess: (res) => {
        setPageCount(res.pagecount?res.pagecount:0);
        setAllData(res.filename?res.filename:[])
      },
      onError:(error) =>{
        console.log(error)
      }
    },
    
  );

  useEffect(()=>{
    filterRef.current.handleFilterData()
  },[allData])

  return (
    <div className="data-section">
      <div className="section-header">
        <div className="section-header-1">
          <h1 className="heading-screens">Confirm Pronunciation</h1>
          <div className="audio-refresh-btn">
            <div
              onClick={() => {
                reloadData();
              }}
            >
              <RefreshIcon/>
            </div>
          </div>
          
        <Filter data={allData}  setData={setAudioConfirmPro} ref={filterRef} />
        </div>
        {
          pageCount === 1 || !pageCount?
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
        loadingType === 'loading' && loading ?
        <DataTilesLoader/>
        :
        audioConfirmPro.length>0?audioConfirmPro.map(({simplified_name:value,vas}, index) => (
        <ConfirmPronRow key={`${value}-${index}`} vas={vas} value={value} changeDataStatus={setLoadingType} />
      ))
    :
    <NoDataFound text={'No data found...'} />
    }
    </div>
  );
};

export default ConfirmPronTile;

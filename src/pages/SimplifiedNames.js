import React, { useEffect, useRef } from "react";
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
import Filter from "../components/filter/Filter";


const SimplifiedNames = () => {
  const [simpFileName, setSimpFileName] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const accessToken = localStorage.getItem("authToken");
  const [simpNamesData, setSimpNamesData] = useState([]);
  const [allData, setAllData] = useState([])
  const [loading, setLoading] = useState(true);
  const [loadingType, setLoadingType] = useState('loading');

  
  const filterRef = useRef();


  let FetchSimplifiedNames = async (value) => {
    setLoading('loading')
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
      .then((response) => response)
      .finally(()=>{
        setLoading(false)
      })
      
    return data;
  };

  const {refetch } = useQuery(["FetchSimplifiedNames", pageNumber],() => FetchSimplifiedNames(pageNumber),
    {
      onSuccess: (res) => {
        setPageCount(res.pagecount?res.pagecount:0);
        setAllData(res.filename?res.filename:[])
      },
    }
  );

  const reloadData = ()=>{
    setLoadingType('loading')
    refetch()
  }

  useEffect(()=>{
    filterRef.current.handleFilterData()
  },[allData])
  

  // const { filename: simpNamesData } = data || {};

  return (
    <div className="data-section" id="simplified_names">
      <div className="section-header">
        <div className="section-header-1">
          <h1 className="heading-screens">Simplified Names</h1>
          
          <div className="audio-refresh-btn">
            <div
              onClick={() => {
                reloadData();
              }}
            >
              <RefreshIcon/>
            </div>
          </div>
        <Filter data={allData}  setData={setSimpNamesData} ref={filterRef} />
        </div>
        {
          pageCount === 1 || !pageCount ?
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
        simpNamesData.length > 0 ?
        simpNamesData.map(({simplified_name:tileName, vas}, index) => (
          <SimpTile
            key={`${tileName}-${index}`}
            tileName={tileName}
            vas={vas}
            pageNumber={pageNumber}
            changeDataStatus={setLoadingType}
          />
        ))
      :
      <NoDataFound text={'No data found...'} />
      }
    </div>
  );
};

export default SimplifiedNames;

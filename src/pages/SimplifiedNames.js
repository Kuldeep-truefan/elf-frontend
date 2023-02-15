import React from "react";
import "../App.css";
import { Button, Chip, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/constant";
import "react-transliterate/dist/index.css";
import SimpTile from "../components/sn/SimpTile";
import Pagination from "@mui/material/Pagination";

const SimplifiedNames = () => {
  const [simpNamesData, setSimpNameData] = useState('');
  const [simpFileName, setSimpFileName] = useState([]);
  const [pageCount, setPageCount] = useState('');
  const accessToken = localStorage.getItem("authToken");

  let FetchSimplifiedNames = async (e, value) => {
    try {
      fetch(`${BASE_URL}/audio/simpnametiles`, {
        method: "POST",
        body: JSON.stringify({
          pageNumber: value
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((response) => response)
        .then((data) => {
          setSimpNameData(data.filename)
          setPageCount(data.pagecount)
        })
    } catch (error) {
      console.log("Error occured", error);
    }
  };

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
        onChange={(e, value) => FetchSimplifiedNames(e, value)}
        count={pageCount} 
        variant="outlined" />
      </div>
      </div>
      {simpNamesData.length > 0 && simpNamesData?.map(([tileName, vas], index) => (
        <SimpTile key={index} value={tileName} vas={vas}/>
      ))}
    </div>
  );
};

export default SimplifiedNames;

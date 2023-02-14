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
  const [englishName, setEnglishName] = useState("");
  const [hinName, setHinName] = useState("");
  const [simpNamesData, setSimpNameData] = useState('');
  const [simpFileName, setSimpFileName] = useState([]);
  const [pageCount, setPageCount] = useState('');
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("authToken");

  const handleEngName = (event) => {
    setEnglishName(event.target.value);
    console.log(event.target.value);
  };

  const handleHinName = (event) => {
    setHinName(event.target.value);
    console.log(event.target.value);
  };

  // let UpdateSimpNames = async (id, button_type) => {
  //   try {
  //     fetch(`${BASE_URL}/audio/update-simplified-fields`, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         englishName: englishName,
  //         hindiName: hindiName,
  //         videoId: id,
  //         button_type,
  //       }),
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //       });
  //   } catch (error) {
  //     console.log("Error occured", error);
  //   }
  // };

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

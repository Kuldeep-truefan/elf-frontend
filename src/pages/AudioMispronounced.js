import "../App.css";
import { Button, Chip, Typography } from "@mui/material";
import { useState } from "react";
import { BASE_URL } from "../constants/constant";
import AudioModal from "../components/am/AudioModal";
import ColorCheckboxes from "../components/CheckBoxPick.js/ColorCheckboxes";
import Pagination from "@mui/material/Pagination";

const AudioMispronounced = ({ item, emittedData , sendFile}) => {
  const [audioFile, setAudioFile] = useState([]);
  // const[required,setRequired]=useState(false)
  const [pageCount, setPageCount] = useState('');
  const [misProData, setMisProData] = useState('');
  // console.log(misProData, 'audioFile--????--->>>>>');
  const accessToken = localStorage.getItem("authToken");

  let FetchAudioMisTiles = async (e, value) => {
    try {
      fetch(`${BASE_URL}/audio/audiomis`, {
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
          setMisProData(data.filename)
          setPageCount(data.pagecount)
        })        
      // setLoading(false); // Stop loading
    } catch (error) {
      console.log("Error occured", error);
    }
  };

  return (
    <div className="aumis-tiles">
      <h1 className="heading-screens">Audio Mispronounced</h1>
      <div className="audio-refresh-btn">
      <div className="pagination-class">
      <Pagination 
        onChange={(e, value) => FetchAudioMisTiles(e, value)}
        count={pageCount} 
        variant="outlined"/>
      </div>
        <Button
          onClick={FetchAudioMisTiles}
          variant="contained"
          disableElevation
        >
          GET AUDIO Mispronounced
        </Button>
      </div>

      {misProData.length > 0 && misProData?.map(([tileName, comments], index) => (
        <div key={index} className="au-mis">
          <div className="main-tile">
          <ColorCheckboxes/>
            <div className="main-tile-head">
              <Typography
                className="video-name"
                // onChange={handleFolderName}
                sx={{
                  paddingLeft: "1rem",
                }}
              >
                {tileName}
              </Typography>
              {emittedData?.video_id === item && (
                <Chip
                  label={`In progress: admin`}
                  sx={{ ml: "5px", backgroundColor: "white" }}
                />
              )}
            </div>
            <p className="video-name-dynamic">{comments}</p>
          </div>
          <div className="am-main-tiles">
            <AudioModal value={tileName} sendFile={sendFile}/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AudioMispronounced;

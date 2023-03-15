import { Chip, Typography } from "@mui/material";
import React from "react";
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";
import "../../App.css";
import { BASE_URL, WEB_BASE_URL } from "../../constants/constant";
import ColorCheckboxes from "../CheckBoxPick.js/ColorCheckboxes";
import { createFilterOptions } from "@mui/material/Autocomplete";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useCallback, useState } from "react";
import { useQueryClient } from "react-query";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from '@mui/icons-material/Search';

const filter = createFilterOptions();
// https://beta.reactjs.org/reference/react-dom/components/textarea for text area customisations

const SimpTile = ({ value, vas, tileName, pageNumber}) => {
  const [englishName, setEnglishName] = useState("");
  const [hindiName, setHindiName] = useState("");
  const queryClient = useQueryClient();
  const accessToken = localStorage.getItem("authToken");
  const [engValue, setEngValue] = React.useState(null);
  // const [emittedData, setemittedData] = useState();
  const [username, setUsername] = useState(localStorage.getItem("username"));
  
  const [videoSelected, setVideoSelected] = useState('Mapping')
  const [audioSelected, setAudioSelected] = useState('IPA');


  // const [socketUrl, setSocketUrl] = useState(`${WEB_BASE_URL}/simpredocon.io/`);
  // const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
  //   onMessage: (message) => {
  //     const data = JSON.parse(message?.data);
  //     setemittedData(JSON.parse(data?.data));
  //   },
  // });
  
  // const handleClickAndSendMessage = useCallback((payload)=>{
  //   if (payload.true){
  //     sendMessage(
  //       JSON.stringify({
  //         user: username,
  //         true:true,
  //         ...payload,
  //       })
  //     )
  //   }
  //   else{
  //     sendMessage(
  //       JSON.stringify({
  //         user: username,
  //         ...payload,
  //       })
  //     )

  //   }
  //   console.log("h`eel")
   
  
  // },[username])

  // const connectionStatus = {
  //   [ReadyState.CONNECTING]: "Connecting",
  //   [ReadyState.OPEN]: "Open",
  //   [ReadyState.CLOSING]: "Closing",
  //   [ReadyState.CLOSED]: "Closed",
  //   [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  // }[readyState];

  const handleEngName = (event) => {
    if(event.target.value.length <=20){
      setEnglishName(event.target.value);
    }
  };

  function handleAudio(e){
    setAudioSelected(e.target.value)
  }
  function handleVideo(e){
    setVideoSelected(e.target.value)
  }

  let UpdateSimpNames = async (id, button_type) => {
    try {
      fetch(`${BASE_URL}/audio/update-simplified-fields`, {
        method: "POST",
        body: JSON.stringify({
          englishName: englishName.trim(),
          hindiName: hindiName.trim(),
          videoId: id,
          button_type,
          videoSelected:videoSelected,
          audioSelected:audioSelected
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          queryClient.invalidateQueries(["FetchSimplifiedNames", pageNumber]);
        });
    } catch (error) {
      console.log("Error occured", error);
    }
  };

  return (
    <div className="tile">
      <div className="main-tile">
        {/* <ColorCheckboxes tileName={tileName} true={true} handleClickAndSendMessage={handleClickAndSendMessage}/> */}
        <div className="main-tile-head">
          <Typography className="video-name" sx={{ paddingLeft: "1rem" }}>
            {tileName}
          </Typography>
          {/* {!!emittedData &&
          JSON.parse(emittedData)?.filter(
            (data) => data?.video_id === tileName
            )?.length > 0 && (
              <Chip
              label={`In progress: ${
                JSON.parse(emittedData)?.filter(
                  (data) => data?.video_id === tileName)?.[0]?.user}`}
                  sx={{ ml: "15px", backgroundColor: "#bcddfe", height:'unset',padding:'1px', color:'#1976d2', border:'1px solid #1976d2' }}
                  ></Chip>
                )} */}
        </div>
        <p className="video-name-dynamic">{vas}</p>
      </div>
      <div className="main-tiles">
        <div className="d-flex">
          <input onChange={handleEngName} value={englishName} className="simp-english-input" type={'text'} placeholder="English(Max 20 characters)"/>
          <ReactTransliterate
            className="simp-hindi-textarea"
            renderComponent={(props) => (
              <input {...props} rows={3} cols={30} placeholder="Hindi" />
            )}
            value={hindiName}
            onChangeText={(text) => {
              setHindiName(text);
            }}
            lang="hi"
          />
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
        </div>
        <div className="d-flex">
          <button
            className="outlined-btn"
            onClick={() =>
              UpdateSimpNames(tileName.split("_")[3], "Confirm Name")
            }
          >
            Confirm name
          </button>
          <button
          className="primary-btn"
            onClick={() => {
              UpdateSimpNames(tileName.split("_")[3], "Done");
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpTile;
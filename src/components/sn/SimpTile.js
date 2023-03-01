import { Button, Chip, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";
import "../../App.css";
import { BASE_URL, WEB_BASE_URL } from "../../constants/constant";
import ColorCheckboxes from "../CheckBoxPick.js/ColorCheckboxes";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useCallback, useState } from "react";
import { useQueryClient } from "react-query";

const filter = createFilterOptions();
// https://beta.reactjs.org/reference/react-dom/components/textarea for text area customisations

const SimpTile = ({ value, vas, tileName, pageNumber}) => {
  const [englishName, setEnglishName] = useState("");
  const [hindiName, setHindiName] = useState("");
  const queryClient = useQueryClient();
  const accessToken = localStorage.getItem("authToken");
  const [engValue, setEngValue] = React.useState(null);
  const [emittedData, setemittedData] = useState();
  const [username, setUsername] = useState(localStorage.getItem("username"));

  const [socketUrl, setSocketUrl] = useState(`${WEB_BASE_URL}/simpredocon.io/`);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onMessage: (message) => {
      const data = JSON.parse(message?.data);
      setemittedData(JSON.parse(data?.data));
    },
  });
  
  const handleClickAndSendMessage = useCallback((payload)=>{
    if (payload.true){
      sendMessage(
        JSON.stringify({
          user: username,
          true:true,
          ...payload,
        })
      )
    }
    else{
      sendMessage(
        JSON.stringify({
          user: username,
          ...payload,
        })
      )

    }
    console.log("h`eel")
   
  
  },[username])

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const handleEngName = (event) => {
    setEnglishName(event.target.value);
    console.log(event.target.value);
  };

  let UpdateSimpNames = async (id, button_type) => {
    try {
      fetch(`${BASE_URL}/audio/update-simplified-fields`, {
        method: "POST",
        body: JSON.stringify({
          englishName: englishName.trim(),
          hindiName: hindiName.trim(),
          videoId: id,
          button_type,
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
    <div className="au-mis">
      <div className="main-tile">
        <ColorCheckboxes tileName={tileName} true={true} handleClickAndSendMessage={handleClickAndSendMessage}/>
        <div className="main-tile-head">
          <Typography className="video-name" sx={{ paddingLeft: "1rem" }}>
            {tileName}
          </Typography>
          {!!emittedData &&
          JSON.parse(emittedData)?.filter(
            (data) => data?.video_id === tileName
            )?.length > 0 && (
              <Chip
              label={`In progress: ${
                JSON.parse(emittedData)?.filter(
                  (data) => data?.video_id === tileName)?.[0]?.user}`}
                  sx={{ ml: "5px", backgroundColor: "white" }}
                  ></Chip>
                )}
        </div>
        <p className="video-name-dynamic">{vas}</p>
      </div>
      <div className="main-tiles">
        <input onChange={handleEngName} value={englishName} className="simp-english-input" type={'text'} placeholder="english"/>
        <ReactTransliterate
          className="simp-hindi-textarea"
          renderComponent={(props) => (
            <input {...props} rows={3} cols={30} placeholder="hindi" />
          )}
          value={hindiName}
          onChangeText={(text) => {
            setHindiName(text);
          }}
          lang="hi"
        />
        <Button
          variant="contained"
          disableElevation
          sx={{
            height: "2.5rem",
            backgroundColor: "#D7B8FD",
            color: "white",
            "&:hover": {
              backgroundColor: "#ad6efb",
              color: "#fff",
              shadow: "0 0 30px rgba(40,40,40,.4)",
            },
            borderRadius: "14px",
          }}
          onClick={() =>
            UpdateSimpNames(tileName.split("_")[3], "Confirm Name")
          }
        >
          Confirm Name
        </Button>
        <Button
          variant="contained"
          sx={{
            height: "2.5rem",
            backgroundColor: "#D7B8FD",
            color: "white",
            "&:hover": {
              backgroundColor: "#ad6efb",
              color: "#fff",
              shadow: "0 0 30px rgba(40,40,40,.4)",
            },
            borderRadius: "14px",
          }}
          onClick={() => {
            UpdateSimpNames(tileName.split("_")[3], "Done");
          }}
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default SimpTile;
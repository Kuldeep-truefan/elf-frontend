import { Button, Chip, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";
import "../../App.css";
import { BASE_URL } from "../../constants/constant";

// https://beta.reactjs.org/reference/react-dom/components/textarea for text area customisations

const SimpTile = ({
    value,
    vas
}) => {
    const [englishName, setEnglishName] = useState("");
    const [hindiName, setHindiName] = useState('');
    const accessToken = localStorage.getItem("authToken");
  
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
              hindiName: hindiName,
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
            });
        } catch (error) {
          console.log("Error occured", error);
        }
      };
  return (
    <div className="au-mis">
    <div className="main-tile">
      <div className="main-tile-head">
        <Typography
          className="video-name"
          sx={{paddingLeft: "1rem"}}>
          {value}
        </Typography>
        <Chip
          label={`In progress: admin`}
          sx={{ ml: "5px", backgroundColor: "white" }}/>
      </div>
      <p className="video-name-dynamic">{vas}</p>
    </div>
    <div className="main-tiles">
      <textarea
      className="simp-hindi-textarea"
        rows={3} cols={30}
        id="outlined-basic"
        // label="English Name"
        placeholder="english"
        variant="outlined"
        onChange={handleEngName}
      />
      <ReactTransliterate
      className="simp-hindi-textarea"
        renderComponent={(props) =>
        <textarea {...props} rows={3} cols={30} placeholder="hindi"/>}
        value={hindiName.trim()}
        onChangeText={(text) => {
          setHindiName(text);
        }}
        lang="hi"/>
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
            shadow: '0 0 30px rgba(40,40,40,.4)'
          },
          borderRadius: '14px'
        }}
        onClick={() =>
          UpdateSimpNames(
            value.split("_")[3].split(".")[0],"Confirm Name")
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
            shadow: '0 0 30px rgba(40,40,40,.4)'
          },
          borderRadius: '14px',

        }}
        onClick={() => {
          UpdateSimpNames(value.split("_")[3].split(".")[0], "Done");
        }}
      >
        Done
      </Button>
    </div>
  </div>
  )
}

export default SimpTile
import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ReactAudioPlayer from 'react-audio-player';
import audio from '../../assets/audio/jf-raw_aabheri.wav'

const AudioQcPlayer = () => {
  return (
    <div>
      <Stack style={{position:"relative"}} direction="row" alignItems="center" spacing={2}>
        {/* <Button variant="contained" component="label">
          Attach Audio
          <input hidden accept="image/*" multiple type="file" />
        </Button> */}
          <ReactAudioPlayer
            src = {audio}
            volume
            crossOrigin
            className
            controls
            />
        <p style={{position:"absolute", top:"2px", left:"35%", fontSize:"12px"}}>Audio File</p>
      </Stack>
    </div>
  );
};

export default AudioQcPlayer;

import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ReactAudioPlayer from 'react-audio-player';
import audio from '../../assets/audio/jf-raw_aabheri.wav'

const AudioModal = () => {
  return (
    <div>
      <Stack style={{position:"relative"}} direction="row" alignItems="center" spacing={2}>
        {/* <Button variant="contained" component="label">
          Attach Audio
          <input hidden accept="image/*" multiple type="file" />
        </Button> */}
          <ReactAudioPlayer
            src = {audio}
            autoPlay
            controls
            />
        <p style={{position:"absolute", top:"2px", left:"10%", fontSize:"12px"}}>Attach Audio</p>
        <ReactAudioPlayer
            src = {audio}
            autoPlay
            controls
            />
        <p style={{position:"absolute", top:"2px", left:"45%", fontSize:"12px"}}>Last Audio</p>
        <ReactAudioPlayer
            src = {audio}
            autoPlay
            controls
            />
        <p style={{position:"absolute", top:"2px", left:"77%", fontSize:"12px"}}>Remarks Audio</p>
      </Stack>
    </div>
  );
};

export default AudioModal;

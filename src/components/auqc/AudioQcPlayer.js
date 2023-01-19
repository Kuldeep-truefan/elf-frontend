import React, { useEffect, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ReactAudioPlayer from 'react-audio-player';
import locaudio from '../../assets/audio/jf-raw_aabheri.wav'

const AudioModal = () => {
  const [showAudio, setShowAudio] = useState({afile:false})

  const [aaudio, setAudio] = useState();
  const previewFile = (e) => {
    const audioUrl = URL.createObjectURL(e.target.files[0]);
    setAudio(audioUrl);
  };
  
  console.log(">>>>>", aaudio);

  return (
    <div>
      <Stack style={{position:"relative"}} direction="row" alignItems="center" spacing={2}>
        {!showAudio.afile?
        <Button variant="contained" component="label" onClick={()=> setShowAudio({...showAudio,afile:!showAudio.afile})}>
          Audio File
        </Button>:<ReactAudioPlayer
          src = {locaudio}
          controls
          />
        } {showAudio.afile&&<p style={{position:"absolute", top:"2px", left:"35%", fontSize:"12px"}}>Last Audio</p>}
      </Stack>
    </div>
  );
};

export default AudioModal;


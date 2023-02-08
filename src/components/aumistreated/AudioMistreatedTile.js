import React, { useEffect, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ReactAudioPlayer from 'react-audio-player';
import locaudio from '../../assets/audio/jf-raw_aabheri.wav'

const AudioMistreatedTile = () => {
  const [showModal, setShowModal] = useState({raw:false, treated:false})

  const [aaudio, setAudio] = useState();
  const previewFile = (e) => {
    const audioUrl = URL.createObjectURL(e.target.files[0]);
    setAudio(audioUrl);
  };


  return (
    <div>
        
      <Stack style={{position:"relative"}} direction="row" alignItems="center" spacing={2}>
      <div style= {{width:"300px"}}>
      {!aaudio? <input type="file" onChange={previewFile} />:<audio src={aaudio} controls />}
      </div>
        {!showModal.raw?
        <Button variant="contained" component="label" onClick={()=> setShowModal({...showModal,raw:!showModal.raw})}>
          Raw Audio
        </Button>:<ReactAudioPlayer
          src = {aaudio}
          controls
          />
        } {showModal.raw&&<p style={{position:"absolute", top:"2px", left:"55%", fontSize:"12px"}}>Raw Audio</p>}
        
        {!showModal.treated?
        <Button variant="contained" component="label" onClick={()=> setShowModal({...showModal,treated:!showModal.treated})}>
          Treated Audio
        </Button>:<ReactAudioPlayer
          src = {aaudio}
          controls
          />
        } {showModal.treated&&<p style={{position:"absolute", top:"2px", left:"70%", fontSize:"12px"}}>Treated Audio</p>}
      </Stack>
    </div>
  );
};

export default AudioMistreatedTile;
import React, { useEffect, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ReactAudioPlayer from 'react-audio-player';
import locaudio from '../../assets/audio/jf-raw_aabheri.wav'
import { BASE_URL } from "../../constants/constant";

const AudioModal = () => {
  const [showAudio, setShowAudio] = useState({afile:false})

  const [aaudio, setAudio] = useState();
  const previewFile = (e) => {
    const audioUrl = URL.createObjectURL(e.target.files[0]);
    setAudio(audioUrl);
  };
  
  let FetchAudioQc = async() => {
    return new Promise(function(resolve, reject) {
     try{
      //  setLoading(true)
       fetch(`${BASE_URL}/log/makepub`, {
       method: "POST",
       body: JSON.stringify({
        //  fileName: fileFirstName&&`${fileFirstName}.wav`,
         fileName: 'ak-raw_Samarpita.wav',
         buckName: "dev-ans-test-final",
        //  subpath:fileBucket&&`${fileBucket}-raw`
        subpath:'ak'
      }),
       headers: {
         "Content-type": "application/json"
     }
   })
     .then(response => response.json())
     .then(json => { 
       resolve(json);
       });
   }
   catch{
     reject("error")
   }
 }).then(
   result => {
      //  setLoading(false);
      setAudio(result.publink)
   }, // shows "done!" after 1 second
   error => alert(error) // doesn't run
 );
};

  return (
    <div>
      <Stack style={{position:"relative"}} direction="row" alignItems="center" spacing={2}>
        {!showAudio.afile?
        <Button variant="contained" component="label" onClick={()=> {
          FetchAudioQc()
          setShowAudio({...showAudio,afile:!showAudio.afile})}
        }
        >
          Audio File
        </Button>:<ReactAudioPlayer
          src = {aaudio}
          controls
          />
        } {showAudio.afile&&<p style={{position:"absolute", top:"2px", left:"35%", fontSize:"12px"}}>Last Audio</p>}
      </Stack>
    </div>
  );
};

export default AudioModal;


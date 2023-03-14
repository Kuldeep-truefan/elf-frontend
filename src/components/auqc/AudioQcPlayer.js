import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ReactAudioPlayer from 'react-audio-player';
import { BASE_URL } from "../../constants/constant";

const AudioModal = ({
    value
  }) => {
  const [showAudio, setShowAudio] = useState({afile:false})

  const [aaudio, setAudio] = useState();
  const previewFile = (e) => {
    const audioUrl = URL.createObjectURL(e.target.files[0]);
    setAudio(audioUrl);
  };
  
  let FetchAudioQc = async(audioQcFileName, qcBucketName) => {
    return new Promise(function(resolve, reject) {
     try{
      //  setLoading(true)
       fetch(`${BASE_URL}/log/makepub`, {
       method: "POST",
       body: JSON.stringify({
        //  fileName: fileFirstName&&`${fileFirstName}.wav`,
         fileName: `${audioQcFileName}.wav`,
         buckName: 'celeb-audio-data',
         subpath:`${qcBucketName}-raw`
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
      setAudio(result.publink)
   },
   error => alert(error) // doesn't run
 );
};

  return (
    <div>
      <Stack style={{position:"relative"}} direction="row" alignItems="center" spacing={2}>
        {!showAudio.afile?
        <Button variant="contained" component="label" onClick={()=> {
          FetchAudioQc(value.split("_")[0], value.split("_")[1])
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


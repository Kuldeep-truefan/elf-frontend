import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from "react";
import { BASE_URL } from "../../constants/constant";
import AudioPlayer from '../audioPlayer/AudioPlayer';
import './PopUp.css';
import VideoModal from '../videoModal/VideoModal';

export default function PopUp({ data }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFetching, setIsFetching] = useState(false)
  const [downloadType, setDownloadType] = useState(null)
  const [downloadAvailable, setDownloadAvailable] = useState(false)
  const [downloadLink, setDownloadLink] = useState('')



  const handleClose = () => {
    setAnchorEl(null);
  };

  let DownloadFiles = async (btnType) => {
    setDownloadType(btnType)
    setIsFetching(true)
    return new Promise(function (resolve, reject) {
      try {
        fetch(`${BASE_URL}/log/makepub`, {
          method: "POST",
          body: JSON.stringify({
            fileName: ["raw", "treated"].includes(btnType)
              ? data.blob.split("_")[0] + ".wav"
              : data.blob + ".mp4",
              buckName: ["raw", "treated"].includes(btnType)
              ? "celeb-audio-data"
              : (btnType ==="redo"?"lipsync-outputs":'approved-videos'),
              subpath: ["raw", "treated"].includes(btnType)
              ? data.subBucket + "-" + btnType
              : null,
          }),
          headers: {
            "Content-type": "application/json",
          },
        })
        .then((response) => response.json())
        .then((json) => {
          resolve(json);
          setDownloadLink(json.publink)  
          console.log(json.publink)
        })
        .finally(()=>{
          setTimeout(()=>{
            setDownloadAvailable(true)
            setIsFetching(false)
          },1000) 
        });
      } catch {
        reject("error");
      }
    });
  };

  return (
    <div className="popup">
      <div className='popup-btns'>
        <Button
          variant="contained"
          onClick={() => {
            handleClose();
            DownloadFiles("raw");
          }}
        >
          Raw
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleClose();
            DownloadFiles("treated");
          }}
        >
          Treated
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleClose();
            DownloadFiles("redo");
          }}
        >
          Redo Lip
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleClose();
            DownloadFiles("Output");
          }}
        >
          Output Video
        </Button>
      </div>
      {
        isFetching?
        <p style={{
          marginTop:'10px'
        }}>Fetching...</p>:
        (
        downloadAvailable && (
        ['raw','treated'].includes(downloadType)?
        ( data.blob.split("_")[0] === 'null'?
          <p style={{
            marginTop:'10px',
            color:'#f00'
          }}>Audio file not found!</p>:
          <div>
            <small>{downloadType.charAt(0).toUpperCase()+downloadType.slice(1) + ' audio'}</small>
            <AudioPlayer link={downloadLink} />
          </div>
        ):
        ( data.blob === 'null'?
          <p style={{
            marginTop:'10px',
            color:'#f00'
          }}>Video file not found!</p>:
          <div>
            <small>{downloadType.charAt(0).toUpperCase()+downloadType.slice(1) + ' video'}</small>
            <VideoModal link={downloadLink} />
          </div>
        ))
        )
      }
    </div>
  );
}

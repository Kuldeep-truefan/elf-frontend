import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import { BASE_URL } from "../../constants/constant";

export default function PopUp({ data }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [downloadAvailable, setDownloadAvailable] = useState(false)
  const [downloadLink, setDownloadLink] = useState('')

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDownload = () => {
    window.location.href = downloadLink ;
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let DownloadFiles = async (btnType) => {
    // console.log(data.blob, data.subBucket+'-'+btnType )
    // console.log(['raw','treated'].includes(btnType)?'cleb-audio-data':'lipsync-outputs')
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
              : "lipsync-outputs",
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
            setDownloadAvailable(true)
          });
      } catch {
        reject("error");
      }
    });
  };

  return (
    <div className="popup">
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
      {downloadAvailable && <a href={downloadLink} onClick={handleDownload} download>Link</a>}
    </div>
  );
}

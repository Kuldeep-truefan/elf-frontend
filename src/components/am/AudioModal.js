import React, { useEffect, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ReactAudioPlayer from "react-audio-player";
import locaudio from "../../assets/audio/jf-raw_aabheri.wav";

const AudioModal = ({
  onChange
}) => {
  const [showModal, setShowModal] = useState({
    attach: false,
    last: false,
    remark: false,
  });

  const [aaudio, setAudio] = useState();
  const previewFile = (e) => {
    const audioUrl = URL.createObjectURL(e.target.files[0]);
    setAudio(audioUrl);
  };

  console.log(">>>>>", aaudio);

  return (
    <div>
      <Stack
        style={{ position: "relative" }}
        direction="row"
        alignItems="center"
        spacing={2}
      >
        {/* <input type="file" onChange={previewFile} /> */}
        <div style={{ width: "300px" }}>
          {!aaudio ? (
            <input type="file" onChange={onChange} />
          ) : (
            <audio src={aaudio} controls />
          )}
        </div>
        {!showModal.last ? (
          <Button
            variant="contained"
            component="label"
            onClick={() =>
              setShowModal({ ...showModal, last: !showModal.last })
            }
          >
            Last Audio
          </Button>
        ) : (
          <ReactAudioPlayer src={locaudio} controls />
        )}{" "}
        {showModal.attach && (
          <p
            style={{
              position: "absolute",
              top: "2px",
              left: "10%",
              fontSize: "12px",
            }}
          >
            Last Audio
          </p>
        )}
        {!showModal.remark ? (
          <Button
            variant="contained"
            component="label"
            onClick={() =>
              setShowModal({ ...showModal, remark: !showModal.remark })
            }
          >
            Remarks Audio
          </Button>
        ) : (
          <ReactAudioPlayer src={locaudio} controls />
        )}{" "}
        {showModal.attach && (
          <p
            style={{
              position: "absolute",
              top: "2px",
              left: "10%",
              fontSize: "12px",
            }}
          >
            Remarks Audio
          </p>
        )}
        {/* <ReactAudioPlayer
            src={locaudio}
            controls
            />
        <p style={{position:"absolute", top:"2px", left:"45%", fontSize:"12px"}}>Last Audio</p> */}
        {/* <ReactAudioPlayer
            src = {locaudio}
            controls
            />
        <p style={{position:"absolute", top:"2px", left:"77%", fontSize:"12px"}}>Remarks Audio</p> */}
      </Stack>
    </div>
  );
};

export default AudioModal;

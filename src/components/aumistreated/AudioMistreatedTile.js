import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ReactAudioPlayer from "react-audio-player";
import { BASE_URL } from "../../constants/constant";
import { useQueryClient } from "react-query";
import { ControlBar, PlaybackRateMenuButton, ReplayControl } from "video-react";
import PlayCircleRounderIcon from "@mui/icons-material/PlayCircleRounded";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { BigPlayButton, Player, PlayToggle } from "video-react";
import ReactLoading from "react-loading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AudioMistreatedTile = (value) => {
  const [showModal, setShowModal] = useState({ raw: false, treated: false });
  const [loading, setLoading] = useState(false);
  const [puburl, setPuburl] = useState(false);
  const [audioUrlMisTreat, setAudioUrlMisTreat] = useState();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const [sendMisTreatFile, setSendMisTreatFile] = useState(null);

  const handleFile = (event) => {
    // if (`${event.target.files[0]?.name}.wav` !== `${fileFirstNameMisTreat}.wav`){
    //   alert("Filename not correct")
    // }else if(`${event.target.files[0]?.name}.wav` === `${fileFirstNameMisTreat}.wav`){
    const audioUrlMisTreat = URL.createObjectURL(event.target.files[0]);
    setSendMisTreatFile({
      url: audioUrlMisTreat,
      file: event.target.files[0],
    });
  };

  const [rawAudioUrl, setRawAudioUrl] = useState();
  const [treatedAudioUrl, setTreatedAudioUrl] = useState();
  let FetchRawAudioMistreated = async (
    fileNameAmt,
    bucketNameAmt,
    audioUrlType
  ) => {
    return new Promise(function (resolve, reject) {
      try {
        fetch(`${BASE_URL}/log/makepub`, {
          method: "POST",
          body: JSON.stringify({
            fileName: fileNameAmt,
            buckName: "celeb-audio-data",
            subpath: bucketNameAmt,
          }),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((json) => {
            resolve(json);
          });
      } catch {
        reject("error");
      }
    }).then(
      (result) => {
        if (audioUrlType === "raw") setRawAudioUrl(result.publink);
        else setTreatedAudioUrl(result.publink);
      },
      (error) => alert(error)
    );
  };

  let UploadAudioMistreatedFile = async () => {
    try {
      let myHeaders = new Headers();
      myHeaders.append(
        "Cookie",
        "csrftoken=L2ETtVsdGnxYzQ4llNrKESv7Evm5nGa5N7SWvkTt488G43CzM7AnoWHJoxr8GNSC"
      );

      let formdata = new FormData();
      formdata.append("audioData", sendMisTreatFile.file);
      formdata.append("fileName", `${value.value.split("_")[0]}.wav`);
      formdata.append("folderName", `${value.value.split("_")[1]}-raw`);
      formdata.append("videoId", value.value.split("_")[3].split(".")[0]);
      formdata.append("screenName", "amt");

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
      };
      const response = await fetch(
        `${BASE_URL}/audio/audio_mispronounced`,
        requestOptions
      );
      const convertToText = await response.text();
      queryClient.invalidateQueries(["FetchAudioMisTreated", value.pageNumber]);
      return convertToText;
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setPuburl(false);
    setOpen(false);
  };

  let FetchPlayVideo = async (video_name) => {
    return new Promise(function (resolve, reject) {
      try {
        setLoading(true);
        fetch(`${BASE_URL}/log/makepub`, {
          method: "POST",
          body: JSON.stringify({
            fileName: video_name,
            buckName: "qc-rejects",
          }),
          headers: {
            "Content-type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((json) => {
            resolve(json);
          });
      } catch {
        reject("error");
      }
    }).then(
      (result) => {
        setLoading(false);
        setPuburl(result.publink);
      },
      (error) => alert(error)
    );
  };

  return (
    <>
      <PlayCircleRounderIcon
        sx={{ fontSize: "3rem", marginTop: ".35rem", color: "#D7B8FD" }}
        onClick={() => {
          handleOpen();
          FetchPlayVideo(value.value.replace(".wav", ".mp4"));
        }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {puburl && (
            <Player playsInline>
              <BigPlayButton position="center" />
              <source src={`${puburl}#t=.01`} type="video/mp4" />
              <ControlBar>
                <PlayToggle />
                <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} />
                <ReplayControl seconds={5} />
              </ControlBar>
            </Player>
          )}
          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              Loading...
              <ReactLoading type="balls" color="#black" />
            </Box>
          )}
        </Box>
      </Modal>
      <div style={{ width: "300px" }}>
        {!sendMisTreatFile?.url ? (
          <input type="file" onChange={handleFile} />
        ) : (
          <audio src={sendMisTreatFile.url} controls />
        )}
      </div>

      <div className="d-flex">
        {!showModal.raw ? (
          <button
          className="primary-btn"
            onClick={() => {
              setShowModal({ ...showModal, raw: !showModal.raw });
              FetchRawAudioMistreated(
                `${value.value.split("_")[0]}.wav`,
                `${value.value.split("_")[1]}-raw`,
                "raw"
              );
            }}
          >
            Raw Audio
          </button>
        ) : (
          <ReactAudioPlayer src={rawAudioUrl} controls />
        )}
        {showModal.raw && (
          <p
            style={{
              position: "absolute",
              top: "2px",
              left: "35%",
              fontSize: "12px",
            }}
          >
            Raw Audio
          </p>
        )}
        {!showModal.treated ? (
          <button
          className="primary-btn"
            onClick={() => {
              setShowModal({ ...showModal, treated: !showModal.treated });
              FetchRawAudioMistreated(
                `${value.value.split("_")[0]}.wav`,
                `${value.value.split("_")[1]}-treated`
              );
            }}
          >
            Treated Audio
          </button>
        ) : (
          <ReactAudioPlayer src={treatedAudioUrl} controls />
        )}
        {showModal.treated && (
          <p
            style={{
              position: "absolute",
              top: "2px",
              left: "66%",
              fontSize: "12px",
            }}
          >
            Treated Audio
          </p>
        )}
        <button
        className="primary-btn"
          onClick={() => {
            UploadAudioMistreatedFile();
          }}
        >
          Done
        </button>
      </div>
    </>
  );
};

export default AudioMistreatedTile;

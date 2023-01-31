import React, { useEffect, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ReactAudioPlayer from "react-audio-player";
// import locaudio from "../../assets/audio/jf-raw_aabheri.wav";
import { BASE_URL } from "../../constants/constant";
const accessToken = localStorage.getItem("authToken");

const AudioModal = ({ value, senFile}) => {
  
  const [sendFile, setSendFile] = useState(null);
  
  const handleFile = (event) => {  
    const audioUrl = URL.createObjectURL(event.target.files[0]);
    setSendFile({
      url: audioUrl,
      file: event.target.files[0],
    });
  };
  const fileFirstName = value.split("_")[0];
  const fileBucket = value.split("_")[1];
  console.log("fileFirstName", fileFirstName);
  const [showModal, setShowModal] = useState({
    attach: false,
    last: false,
    remark: false,
  });
  const [audioUrl, setAudioUrl] = useState(false);
  const [aaudio, setAudio] = useState();
  const previewFile = (e) => {
    const audioUrl = URL.createObjectURL(e.target.files[0]);
    setAudio(audioUrl);
  };

  let FetchPlayAudio = async () => {
    return new Promise(function (resolve, reject) {
      try {
        //  setLoading(true)
        fetch(`${BASE_URL}/log/makepub`, {
          method: "POST",
          body: JSON.stringify({
            fileName: fileFirstName && `${fileFirstName}.wav`,
            buckName: "celeb-audio-data",
            subpath: fileBucket && `${fileBucket}-raw`,
            //  subpath:fileBucket&&`${fileBucket}`
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
        //  setLoading(false);
        setAudioUrl(result.publink);
      }, // shows "done!" after 1 second
      (error) => alert(error) // doesn't run
    );
  };
  let AudioUncracked = async (id) => {
    try {
      fetch(`${BASE_URL}/audio/update-miscracked-field`, {
        method: "PUT",
        body: JSON.stringify({
          videoId: id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.log("Error occured", error);
    }
  };

  let UploadAudioFileMispronounced = async (filename, subBuckName) => {
    try {
      let myHeaders = new Headers();
      myHeaders.append(
        "Cookie",
        "csrftoken=L2ETtVsdGnxYzQ4llNrKESv7Evm5nGa5N7SWvkTt488G43CzM7AnoWHJoxr8GNSC"
      );

      let formdata = new FormData();
      formdata.append("audioData", sendFile.file);
      formdata.append("fileName", `${filename}.wav`);
      formdata.append("folderName", `${subBuckName}-raw`);

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
      return convertToText;
    } catch (error) {
      console.log(error);
    }
  };

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
          {!sendFile?.url ? (
            <input id="audio" type="file" onChange={handleFile} />
          ) : (
            <audio src={sendFile.url} controls />
          )}
        </div>
        {!showModal.last ? (
          <Button
            onClick={() => {
              FetchPlayAudio();
              setShowModal({ ...showModal, last: !showModal.last });
            }}
            variant="contained"
            // disabled={isDisabled}
            sx={{
              height: "2.5rem",
              // marginTop: ".46rem",
              backgroundColor: "#D7B8FD",
              color: "white",
              "&:hover": {
                backgroundColor: "#ad6efb",
                color: "#fff",
              },
            }}
          >
            Last Audio
          </Button>
        ) : (
          <ReactAudioPlayer src={audioUrl} controls />
        )}
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
            onClick={() =>
              setShowModal({ ...showModal, remark: !showModal.remark })
            }
            variant="contained"
            // disabled={isDisabled}
            sx={{
              height: "2.5rem",
              // marginTop: ".46rem",
              backgroundColor: "#D7B8FD",
              color: "white",
              "&:hover": {
                backgroundColor: "#ad6efb",
                color: "#fff",
              },
            }}
          >
            Remarks Audio
          </Button>
        ) : (
          // <Button
          //   variant="contained"
          //   component="label"
          //   onClick={() =>
          //     setShowModal({ ...showModal, remark: !showModal.remark })
          //   }
          // >
          //   Remarks Audio
          // </Button>
          <ReactAudioPlayer src={audioUrl} controls />
        )}
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
            <Button
              onClick={() => {
                AudioUncracked(value.split("_")[3].split(".")[0]);
              }}
              variant="contained"
              sx={{
                height: "2.5rem",
                // marginTop: ".46rem",
                backgroundColor: "#D7B8FD",
                color: "white",
                "&:hover": {
                  backgroundColor: "#ad6efb",
                  color: "#fff",
                },
              }}
            >
              Audio Uncracked
            </Button>
            <Button
              id="donebtn"
              onClick={()=>{UploadAudioFileMispronounced(value.split("_")[0], value.split("_")[1])}}
              variant="contained"
              sx={{
                height: "2.5rem",
                // marginTop: ".46rem",
                backgroundColor: "#D7B8FD",
                color: "white",
                "&:hover": {
                  backgroundColor: "#ad6efb",
                  color: "#fff",
                },
              }}
            >
              Done
            </Button>        
      </Stack>
    </div>
  );
};

export default AudioModal;

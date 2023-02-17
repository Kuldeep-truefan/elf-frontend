import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ReactAudioPlayer from "react-audio-player";
import { BASE_URL } from "../../constants/constant";
import { useQueryClient } from "react-query";
const accessToken = localStorage.getItem("authToken");

const AudioModal = ({ value, pageNumber }) => {
  const [sendFile, setSendFile] = useState(null);
  const fileFirstName = value.split("_")[0];
  const fileBucket = value.split("_")[1];
  const queryClient = useQueryClient()

  
  const handleFile = (event) => {
    let matchWith = `${event.target.files[0]?.name}`
    let matchWithFile = `${fileFirstName}.wav`
    if(matchWith === matchWithFile){
      const audioUrl = URL.createObjectURL(event.target.files[0]);      
      setSendFile({
        url: audioUrl,
        file: event.target.files[0],
      });
    }else if (`${event.target.files[0]?.name}` !== `${fileFirstName}.wav`){
      alert("Filename not matched choose the correct file")
    }
  };

  const [showModal, setShowModal] = useState({
    attach: false,
    last: false,
    remark: false,
  });

  const [audioUrl, setAudioUrl] = useState(false);

  let FetchPlayAudio = async (bucketName, audioFileName, subBucketName=null) => {
    return new Promise(function (resolve, reject) {
      try {
        //  setLoading(true)
        fetch(`${BASE_URL}/log/makepub`, {
          method: "POST",
          body: JSON.stringify({
            fileName: audioFileName,
            buckName: bucketName,
            subpath: subBucketName?subBucketName:null,
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

  let UploadAudioFileMispronounced = async (filename, subBuckName, vid) => {
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
      formdata.append("videoId", vid);
      formdata.append("screenName", 'am');
      
      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
      };
      const response = await fetch(
        `${BASE_URL}/audio/audio_mispronounced`,
        requestOptions
      );
      // if (response.status === 'success') {
        queryClient.invalidateQueries(["FetchAudioMisTiles", pageNumber]);
        setSendFile(null)
      // }
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
          {!sendFile?.url? (
            <input id="audio" type="file" onChange={handleFile}/>
          ):(
            <audio src={sendFile.url} controls />
          )}
        </div>
        {!showModal.last ? (
          <Button
            onClick={() => {
              FetchPlayAudio("celeb-audio-data", fileFirstName && `${fileFirstName}.wav`, fileBucket && `${fileBucket}-raw`);
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
            onClick={() =>{
              FetchPlayAudio("audio-remarks", value);
              setShowModal({ ...showModal, remark: !showModal.remark })
            }}
            variant="contained"
            sx={{
              height: "2.5rem",
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
        <div className="au-dn-uncracked-btns">
        <Button
          onClick={() => {
            if (window.confirm("Do you want to proceed?")) {
              AudioUncracked(value.split("_")[3].split(".")[0]);
            } 
          }}
          variant="contained"
          sx={{
            height: "2.5rem",
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
         &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          id="donebtn"
          onClick={() => {
            UploadAudioFileMispronounced(
              value.split("_")[0],
              value.split("_")[1],
              value.split("_")[3].split(".")[0]
            );
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
          Done
        </Button>
        </div>
      </Stack>
    </div>
  );
};

export default AudioModal;

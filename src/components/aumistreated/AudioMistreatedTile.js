import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ReactAudioPlayer from "react-audio-player";
import { BASE_URL } from "../../constants/constant";

const AudioMistreatedTile = (value) => {
  // console.log(value, 'value----->>>>>');
  const [showModal, setShowModal] = useState({ raw: false, treated: false });
  
  const [audioUrlMisTreat, setAudioUrlMisTreat] = useState();
  
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
  
  const [audioMisPubLink, setAudioMisPubLink] = useState();
  let FetchRawAudioMistreated = async (fileNameAmt, bucketNameAmt) => {
    return new Promise(function (resolve, reject) {
      try {
        fetch(`${BASE_URL}/log/makepub`, {
          method: "POST",
          body: JSON.stringify({
            fileName: fileNameAmt,
            buckName: "dev-ans-test-final",
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
        setAudioMisPubLink(result.publink);
      },
      (error) => alert(error)
    );
  };


  let UploadAudioMistreatedFile = async () => {
    console.log(value.value?.split("_")[3].split('.')[0], 'wng----UploadAudioMistreatedFile>>>>.');
    try {
      let myHeaders = new Headers();
      myHeaders.append(
        "Cookie",
        "csrftoken=L2ETtVsdGnxYzQ4llNrKESv7Evm5nGa5N7SWvkTt488G43CzM7AnoWHJoxr8GNSC"
      );

      let formdata = new FormData();
      formdata.append("audioData", sendMisTreatFile.file);
      formdata.append("fileName", `${value.value.split("_")[0]}.wav`)
      formdata.append("folderName", `${value.value.split("_")[1]}-raw`)
      formdata.append("videoId", value.value.split("_")[3].split(".")[0])
      formdata.append("screenName", 'amt')
      

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
        style={{ position: "relative", width:'100%' }}
        direction="row"
        alignItems="center"
        spacing={2}
      >
        <div style={{ width: "300px" }}>
          {!sendMisTreatFile?.url ? (
            <input type="file" onChange={handleFile} />
          ) : (
            <audio src={sendMisTreatFile.url} controls />
          )}
        </div>

        {!showModal.raw ? (
          <Button
            variant="contained"
            component="label"
            onClick={() => {
              setShowModal({ ...showModal, raw: !showModal.raw });
              FetchRawAudioMistreated(
                `${value.value.split("_")[0]}.wav`,
                `${value.value.split("_")[1]}-raw`
              );
            }}
          >
            Raw Audio
          </Button>
        ) : (
          <ReactAudioPlayer src={audioMisPubLink} controls />
        )}
        {showModal.raw && (
          <p
            style={{
              position: "absolute",
              top: "2px",
              left: "39%",
              fontSize: "12px",
            }}
          >
            Raw Audio
          </p>
        )}
        {!showModal.treated ? (
          <Button
            variant="contained"
            component="label"
            onClick={() => {
              setShowModal({ ...showModal, treated: !showModal.treated });
              FetchRawAudioMistreated(
                `${value.value.split("_")[0]}.wav`,
                `${value.value.split("_")[1]}-treated`
              );
            }}
          >
            Treated Audio
          </Button>
        ) : (
          <ReactAudioPlayer src={audioMisPubLink} controls />
        )}
        {showModal.treated && (
          <p
            style={{
              position: "absolute",
              top: "2px",
              left: "75%",
              fontSize: "12px",
            }}
          >
            Treated Audio
          </p>
        )}
        <Button
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
          onClick={() => {
            UploadAudioMistreatedFile(
          )}}
        >
          Done
        </Button>
      </Stack>
    </div>
  );
};

export default AudioMistreatedTile;

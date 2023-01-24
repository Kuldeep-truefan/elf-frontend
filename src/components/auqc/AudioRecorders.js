import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

import React, { useState } from "react";

const AudioRecorders = (

) => {
  const [url, setUrl] = useState();
  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob) => {
    setUrl(URL.createObjectURL(blob));
    // const audio = document.createElement("audio");
    // audio.src = url;
    // audio.controls = true;
    // document.body.appendChild(audio);
  };

  // let UploadAudioRecored = async () => {
  //   try {
  //     let myHeaders = new Headers();
  //     myHeaders.append(
  //       "Cookie",
  //       "csrftoken=L2ETtVsdGnxYzQ4llNrKESv7Evm5nGa5N7SWvkTt488G43CzM7AnoWHJoxr8GNSC"
  //     );

  //     let formdata = new FormData();
  //     // formdata.append("audio", sendFile.file);
  //     formdata.append("folderName", folderName);

  //     let requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: formdata,
  //     };
  //     const response = await fetch(
  //       "http://127.0.0.1:8000/audio/audio_mispronounced",
  //       requestOptions
  //     );
  //     const convertToText = await response.text();
  //     return convertToText;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        columnGap: "10px",
      }}
    >
      {/* <button onClick={recorderControls.stopRecording}>Stop</button> */}
      <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
      />
      {url && <audio src={url} controls></audio>}
    </div>
  );
};

export default AudioRecorders;
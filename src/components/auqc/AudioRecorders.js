import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

import React, { useState } from "react";

const AudioRecorders = () => {
  const [url, setUrl] = useState();
  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob) => {
    setUrl(URL.createObjectURL(blob));
    // const audio = document.createElement("audio");
    // audio.src = url;
    // audio.controls = true;
    // document.body.appendChild(audio);
  };

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
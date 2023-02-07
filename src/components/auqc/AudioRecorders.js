import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

import React, { useState } from "react";

const AudioRecorders = ({
  setRecordedAudio
}) => {
  const [url, setUrl] = useState();
  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob) => {
    setUrl(URL.createObjectURL(blob));
    setRecordedAudio(blob)
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        columnGap: "10px",
      }}
    >
      <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
      />
      {url && <audio src={url} type='file' controls></audio>}
    </div>
  );
};

export default AudioRecorders;
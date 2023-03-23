import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

import React, { useState } from "react";
import RemarkAudio from "../ExtraComponents/remark-audio/RemarkAudio";
import AudioPlayer from "../audioPlayer/AudioPlayer";

const AudioRecorders = ({
  setRecordedAudio,
  tileName
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
      {url && <AudioPlayer link={url} tileName={tileName} />} 
    </div>
  );
};

export default AudioRecorders;
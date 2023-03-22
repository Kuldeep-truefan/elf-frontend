import React, { useEffect, useState } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import DownloadIcon from '@mui/icons-material/Download';
function AudioPlayer({ link,tileName }) {
  const [isPlaying, setIsPLaying] = useState(false);
  let audio;
  function downloadAudio() {
    const audioElement = audio;
    const audioUrl = audioElement.src;
    const audioFilename = "my-audio-file.mp3";
    const downloadLink = document.createElement("a");

    downloadLink.href = audioUrl;
    downloadLink.target = '_blank'
    downloadLink.download = audioFilename;
    downloadLink.click();
  }
  const playPause = () => {
    if (isPlaying) {
      audio.pause();
      setIsPLaying(false);
    } else {
      audio.play();
      setIsPLaying(true);
    }
  };
  let endAudio = () => {
    setIsPLaying(false);
  };
  useEffect(() => {
    audio = document.getElementById(`myAudio-${tileName.split('_')[3]}`);

    audio.addEventListener("ended", endAudio);
  });
  return (
    <div className="audio-player">
      {isPlaying ? (
        <PauseCircleFilledIcon onClick={playPause} sx={{cursor:'pointer'}} />
      ) : (
        <PlayCircleIcon onClick={playPause}  sx={{cursor:'pointer'}}/>
      )}
      <audio
        id={`myAudio-${tileName.split('_')[3]}`}
        src={link}
      ></audio>

      <div onClick={downloadAudio} ><DownloadIcon sx={{cursor:'pointer'}}/></div>
    </div>
  );
}

export default AudioPlayer;

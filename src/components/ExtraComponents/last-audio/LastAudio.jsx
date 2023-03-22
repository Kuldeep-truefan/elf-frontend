import React, { useEffect, useState } from 'react';
import './LastAudio.css';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import Loader from '../Loaders/Loader';
import { BASE_URL } from '../../../constants/constant';
import { triggerError } from '../AlertPopups';
import DownloadIcon from '@mui/icons-material/Download';

const LastAudio = ({ tileName, firstName, fileBucket, text='Last Audio', audioType='raw' }) => {
    const [showRemarkAudio, setShowRemarkAudio] = useState(false);
    const [loadingAudio, setLoadingAudio] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null)
    let audio;

    const handleFetchAudio = () => {
        setShowRemarkAudio(true)
        setLoadingAudio(true)
        return new Promise(function (resolve, reject) {
            try {
                //  setLoading(true)
                fetch(`${BASE_URL}/log/makepub`, {
                    method: "POST",
                    body: JSON.stringify({
                        fileName: `${firstName}.wav`,
                        buckName: "celeb-audio-data",
                        subpath: fileBucket ? `${fileBucket}-${audioType}` : null,
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
                const audioUrl = result.publink;
                const audio = new Audio(audioUrl);

                audio.addEventListener('loadedmetadata', () => {
                    setLoadingAudio(false)
                    console.log('Audio URL exists');
                    setAudioUrl(result.publink)
                });

                audio.addEventListener('error', () => {
                    setLoadingAudio(false)
                    setShowRemarkAudio(false)
                    triggerError(`${text} not found`)
                    console.log('Audio URL does not exist');
                });

                audio.load();
            }, // shows "done!" after 1 second
            (error) => alert(error) // doesn't run
        );
    }
    const playPause = () => {
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play();
            setIsPlaying(true);
        }
    };
    let endAudio = () => {
        setIsPlaying(false);
    };

    function downloadAudio() {
        const audioElement = audio;
        const audioUrl = `${audioElement.src}&response-content-disposition=attachment`;
        const audioFilename = `${firstName}.wav`;
        const downloadLink = document.createElement("a");

        downloadLink.href = audioUrl;
        // downloadLink.target = '_blank'
        downloadLink.download = audioFilename;
        downloadLink.click();
    }


    useEffect(() => {
        audio = document.getElementById(`${text.split(' ').join('-')}-${tileName.split('_')[3]}`);

        audio.addEventListener("ended", endAudio);
    });
    return (
        <div
            className="outlined-btn"
            id={`${text.split(' ').join('-')}`}
        >
            <audio
                id={`${text.split(' ').join('-')}-${tileName.split('_')[3]}`}
                src={audioUrl}
            >
            </audio>
            {
                showRemarkAudio ?
                    (
                        loadingAudio ?
                            <Loader />
                            :
                            (
                                <div className='d-flex justify-between'>
                                    {

                                        isPlaying ?
                                            <PauseCircleIcon onClick={playPause} />
                                            :
                                            <PlayCircleIcon onClick={playPause} />
                                    }
                                    <DownloadIcon onClick={downloadAudio} />
                                </div>
                            )
                    )
                    :
                    <div onClick={handleFetchAudio}>
                        <AudiotrackIcon />
                        {text}
                    </div>
            }
        </div>
    )
}

export default LastAudio
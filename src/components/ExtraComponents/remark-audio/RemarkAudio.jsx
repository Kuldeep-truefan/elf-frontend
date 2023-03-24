import React, { useEffect, useState } from 'react';
import './RemarkAudio.css';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import Loader from '../Loaders/Loader';
import { BASE_URL } from '../../../constants/constant';
import { triggerError } from '../AlertPopups';

const RemarkAudio = ({ tileName }) => {
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
                        fileName: tileName,
                        buckName: "audio-remarks",
                        //   subpath: subBucketName?subBucketName:null,
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
                    triggerError('Remark audio not found')
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
    useEffect(() => {
        audio = document.getElementById(`myRemarkAudio-${tileName.split('_')[3]}`);

        audio.addEventListener("ended", endAudio);
    });
    return (
        <div
            className="outlined-btn"
            id='remark-audio'
        >
            <audio
                id={`myRemarkAudio-${tileName.split('_')[3]}`}
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
                                isPlaying ?
                                    <PauseCircleIcon onClick={playPause} />
                                    :
                                    <PlayCircleIcon onClick={playPause} />
                            )
                    )
                    :
                    <div onClick={handleFetchAudio}>
                        <AudiotrackIcon />
                        Remarks Audio
                    </div>
            }
        </div>
    )
}

export default RemarkAudio
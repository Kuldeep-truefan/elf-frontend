import React, { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { BASE_URL } from "../../constants/constant";
import { useQueryClient } from "react-query";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import './am.css';
import AudioPlayer from "../audioPlayer/AudioPlayer";
import { triggerError, triggerSuccess } from "../ExtraComponents/AlertPopups";
const accessToken = localStorage.getItem("authToken");

const AudioModal = ({ value, pageNumber, changeDataStatus, setUpdating }) => {
  const [sendFile, setSendFile] = useState(null);
  // const fileFirstName = value.split("-")[0];
  // const fileBucket = value.split("-")[1];
  // console.log(fileFirstName,fileBucket)
  const fileFirstName = value.split("_")[0];
  const fileBucket = value.split("_")[1];
  const queryClient = useQueryClient()

  
  const handleFile = (event) => {
    let matchWith = `${event.target.files[0]?.name}`
    let matchWithFile = `${fileFirstName}.wav`
    console.log(matchWith,matchWithFile)
    if(matchWith === matchWithFile){
      const audioUrl = URL.createObjectURL(event.target.files[0]);      
      setSendFile({
        url: audioUrl,
        file: event.target.files[0],
      });
    }else if (`${event.target.files[0]?.name}` !== `${fileFirstName}.wav`){
      setSendFile(null)
      alert("Filename not matched choose the correct file")
    }
  };

  const [showModal, setShowModal] = useState({
    attach: false,
    last: false,
    remark: false,
  });

  const [lastAudioUrl, setLastAudioUrl] = useState(false);
  const [remarksAudioUrl, setRemarksAudioUrl] = useState(false);

  let FetchPlayAudio = async (bucketName, audioFileName, subBucketName=null, audioUrlType) => {
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
        if(audioUrlType === 'last')
         setLastAudioUrl(result.publink);
        else 
         setRemarksAudioUrl(result.publink);
      }, // shows "done!" after 1 second
      (error) => alert(error) // doesn't run
    );
  };

  let AudioUncracked = async (id) => {
    setUpdating(true)
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
      })
      .then((res)=>{
        if(res.status === 200){
          triggerSuccess('Audio Marked Uncracked')
          changeDataStatus('fetching')
          queryClient.invalidateQueries(["FetchAudioMisTiles", pageNumber]);
        }else{
          setUpdating(false)
          triggerError()
        }
      })
    } catch (error) {
      console.log("Error occured", error);
    }
  };

  let UploadAudioFileMispronounced = async (filename, subBuckName, vid) => {
    try {
      if(!!sendFile){
        setUpdating(true)
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
        if (response.status === 200) {
          triggerSuccess('File Uploaded Successfully')
          changeDataStatus('fetching')
          queryClient.invalidateQueries(["FetchAudioMisTiles", pageNumber]);
          setSendFile(null)
        }else{
          setUpdating(false)
          triggerError('File not uploaded')
          setSendFile(null)
        }
        const convertToText = await response.text();
        return convertToText;
      }else{
        alert('Select file to upload')
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ width: "300px" }}>
        {!sendFile?.url? (
          <>
            <input id="audio" type="file" onChange={handleFile} />
            {/* <div id="audio-input" onClick={()=>{
                document.getElementById('audio').click()
            }}>
              <span><AudioFileIcon/></span> 
              <span>
                {
                  // sendFile?sendFile.file:
                <>Choose audio file +</>
                }
              </span>
            </div> */}
          </>
        ):(
          // <audio src={sendFile.url} controls />
          <AudioPlayer link={sendFile.url}/>
        )}
      </div>
      <div className="d-flex">

        {!showModal.last ? (
          <button
            onClick={() => {
              FetchPlayAudio("celeb-audio-data", fileFirstName && `${fileFirstName}.wav`, fileBucket && `${fileBucket}-raw`, 'last');
              setShowModal({ ...showModal, last: !showModal.last });
            }}
            className="outlined-btn"
          >
            <AudiotrackIcon/>
            Last Audio
          </button>
        ) : (
          // <ReactAudioPlayer src={lastAudioUrl} controls />
          <AudioPlayer link={lastAudioUrl} />
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
          <button
            onClick={() =>{
              FetchPlayAudio("audio-remarks", value);
              setShowModal({ ...showModal, remark: !showModal.remark })
            }}
            className="outlined-btn"
          >
          <AudiotrackIcon/>
            Remarks Audio
          </button>
        ) : ( 
          // <ReactAudioPlayer src={remarksAudioUrl} controls />
          <AudioPlayer link={remarksAudioUrl} />
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
        <button
          onClick={() => {
            if (window.confirm("Do you want to proceed?")) {
              AudioUncracked(value.split("_")[3].split(".")[0]);
            } 
          }}
          className="primary-btn"
        >
          Audio Uncracked
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button
          id="donebtn"
          onClick={() => {
            UploadAudioFileMispronounced(
              value.split("_")[0],
              value.split("_")[1],
              value.split("_")[3].split(".")[0]
            );
          }}
          className="primary-btn"
        >
          {/* Upload  */}
          done
        </button>
      </div>
      </div>
    </>
  );
};

export default AudioModal;

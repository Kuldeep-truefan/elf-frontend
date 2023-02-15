import React, { useEffect } from "react";
import "../App.css";
import { Button } from "@mui/material";
import { useState } from "react";
import { BASE_URL } from "../constants/constant";
import Pagination from "@mui/material/Pagination";

import AudioQcRow from "../components/auqc/AudioQcRow";
import {
  useQuery,
} from 'react-query'

const AudioQc = ({
  item,
  emittedData
}) => {
  // const [remark, setRemark] = useState("");
  // const [audioQcFiles, setAudioQcFiles] = useState([]);
  // const [isDisabled, setIsDisabled] = useState(false);
  // const [recordedAudio, setRecordedAudio] = useState();
  // const [audioQcData, setAudioQcData] = useState('');

  // // const[required,setRequired]=useState(false)
  const accessToken = localStorage.getItem("authToken");
  const [pageNumber, setPageNumber] = useState(1);
  // let UploadAudioRecored = async (fullFileName, vidAuRec) => {
  //   try {
  //     let myHeaders = new Headers();
  //     myHeaders.append(
  //       "Cookie",
  //       "csrftoken=L2ETtVsdGnxYzQ4llNrKESv7Evm5nGa5N7SWvkTt488G43CzM7AnoWHJoxr8GNSC"
  //     );

  //     let formdata = new FormData();
  //     formdata.append("fileName", fullFileName); 
  //     formdata.append("file", recordedAudio);
  //     formdata.append("videoId", vidAuRec);

  //     let requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: formdata,
  //     };
  //     const response = await fetch(
  //       `${BASE_URL}/audio/upload-rec-auqc-file`,
  //       requestOptions
  //     );
  //     const convertToText = await response.text();
  //     return convertToText;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // let UpdateQcComtStatus = async (
  //   audioQcStatus,
  //   audioId,
  //   remark,
  //   blobToDelete
  // ) => {
  //   try {
  //     fetch(`${BASE_URL}/audio/qccommentstatus`, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         audioQc: audioQcStatus,
  //         audioQcId: audioId,
  //         audioQcRemarks: remark,
  //         deleteBlob: blobToDelete ? blobToDelete : "",
  //       }),
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     // .then((response) => response.json())
  //     // .then((data) => setLink(data.filename))
  //     // setLoading(false); // Stop loading
  //   } catch (error) {
  //     console.log("Error occured", error);
  //   }
  // };

  // const handleChange = (event) => {
  //   setRemark(event.target.value);
  //   console.log(event.target.value);
  // };

  let FetchAudioQcTiles = async (value) => {
     const data = await fetch(`${BASE_URL}/audio/audioqc`, {
        method: "POST",
        body: JSON.stringify({
          pageNumber: value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((response) => response.json())
        console.log({data});
        return data
  };
  
  const {isLoading, data, isFetching} = useQuery(['FetchAudioQcTiles', pageNumber],() => FetchAudioQcTiles(pageNumber),)
  const {filename: audioQcData, pagecount: pageCount} = data || {}
  console.log({isFetching}, 'audioQcData.length------->>>>>>>');
  if (isLoading) {
    return <div style={{
      display: 'flex',
      height:'100vh',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
<p>Loading....</p>
    </div>
  }
  return (
    <div className="am-tiles">
      <h1 className="heading-screens">Audio QC</h1>
      <div className="audio-refresh-btn">
        {/* <Button
          onClick={FetchAudioQcTiles}
          variant="contained"
          disableElevation
        >
          GET AUDIO QC
        </Button> */}
        <div className="pagination-class">
          <Pagination
            onChange={(e, value) => {
              console.log(value);
              setPageNumber(value)}}
            count={pageCount}
            page={pageNumber}
            variant="outlined"
          />
        </div>
      </div>
      {audioQcData?.length > 0 &&audioQcData?.map(([tileName, comments], index) => (

        <AudioQcRow item={item} emittedData={emittedData} tileName={tileName} comments={comments} index={index} />
      )
      )}
    </div>
  );
};

export default AudioQc;

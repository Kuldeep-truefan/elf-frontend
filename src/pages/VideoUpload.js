import { useState } from 'react';
import "../App.css";

import { FileUploader } from 'react-drag-drop-files';
// import Button from '@mui/material/Button';
import { BASE_URL } from "../constants/constant";
import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const VideoUpload = () => {

  const [names, setNames] = useState([]);
  const [uploadfiledata, setUploadfiledata] = useState(null);
  const [upl_status, setUpl_status] = useState(false);
  const handleChange = (files) => {
    setUploadfiledata(files);
    const temp_arr = [];
    let len = 0;
    if(files["length"]>5){
      len = 5;
    }
    else{
      len = files["length"];
    }
    for (let i=0;i<len;i++){
        temp_arr.push(files[i]["name"]); 
    }
    setNames(temp_arr);
    console.log(files);
  };
  
  let UploadVideoToBucket = async () => {
    try {
      setUpl_status(true);
      let myHeaders = new Headers();
      myHeaders.append(
        "Cookie",
        "csrftoken=L2ETtVsdGnxYzQ4llNrKESv7Evm5nGa5N7SWvkTt488G43CzM7AnoWHJoxr8GNSC"
      );
      
      let formdata = new FormData();
      if(uploadfiledata!=null){
        for(let i=0;i<names.length;i++){
          formdata.append(""+uploadfiledata[i]["name"], uploadfiledata[i]);
        }
        formdata.append("allFiles", JSON.stringify(names));
        formdata.append("folderName", "qc2");
        console.log(JSON.stringify(names));
      }
      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
      };
      const response = await fetch(
        `${BASE_URL}/audio/upload-video-in-bucks`,
        requestOptions
      )
      .then((response) => response.json())
      .then(() => setUpl_status(false))
      .then(() => setNames([]))
      .then(() => alert("Upload Success!"));
      
    } catch (error) {
      alert("Upload Failed! Please try again!");
      setUpl_status(false);
      document.location.reload(false);
      console.log(error);
    }
  };

  let files_names_list;
  if(names!==[]){
      files_names_list= <ol>
          {names.map(function(name, index){
              return <li key={ index }>{name}</li>;
          })}
      </ol>;
  }
  
  let loading_button;
  if(upl_status===true){
    //loading_button = <Button disabled onClick = {UploadVideoToBucket} variant="contained" disableElevation>Uploading</Button>;
    loading_button = <div style={{marginTop: '10%'}}><LinearProgress /></div>;
    // loading_button = <LinearProgress />;
  }
  else{
    loading_button = <Box textAlign='center'><Button className="upload-button" sx={{width:'100%'}} onClick = {UploadVideoToBucket} variant="contained" disableElevation>Upload</Button></Box>;
  }
  
  return (
    <Stack
        style={{ position: "relative" }}
        direction="column"
        alignItems="center"
      >
      <div className="am-tiles"><h1 className="heading-screens">Upload Videos</h1></div>
      <div className="upload-file-div"> 
          <div className = "upload-file-bar">
          <FileUploader handleChange={handleChange} name="file" types={["MP4"]} multiple={true} label='Upload or Drop a file!'/>
          </div>
          <div className="but-list-video-upload">
          {loading_button}
          <p><span style={{fontWeight: 'bold'}}>Note:</span> You can upload upto 5 videos at a time.</p>
          {files_names_list}
          </div>
      </div>
      </Stack>
  );
}
export default VideoUpload;
import "../../App.css";
import { Button, Chip, FormHelperText, Typography } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/constant";
import RedoLipModal from "./RedoLipModal";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const RedoLipBox = (
    item,
    sbuck,
    dbuck,
    handleClickSendMessage,
    emittedData,
    setLink,
    index,
    link,
    destbucket 
) => {
    const [status, setStatus] = useState("");
    const [option, setOptions] = useState("");
    const [remark, setRemark] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    // const[required,setRequired]=useState(false)
    const accessToken = localStorage.getItem('authToken');
  
    const handelClick = () => {
  
      setOpen(!open);
      console.log(open);
    };
  
    const handleStatus = (event) => {
      setStatus(event.target.value);
    };
  
    const handleOptions = (event) => {
      setOptions(event.target.value);
      console.log(event.target.value);
    };
  
    const handleChange = (event) => {
      setRemark(event.target.value);
      // console.log(event.target.value);
    };
  
    let GetQCDone = async () => {
      // console.log("Checking the access token");
      handleClickSendMessage({msg:"updated",video_id:item})
  
     const saveStatus = status
     const saveOption= option
     const saveRemark = remark
     setStatus('')
     setOptions('')
     setRemark('')
      if (!accessToken) {
        navigate('/');
      }
      const remainingData=link.filter((x)=>x!==item)
      setLink(remainingData)
      try{
        fetch(`${BASE_URL}/log/tilestatus`, {
            method: "POST",
            body: JSON.stringify({
              sourceBucket: sbuck,
              destinationBucket: dbuck,
              videoName: item,
              videoStatus: saveStatus,
              videoOption: saveOption,
              videoRemarks: saveRemark,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${accessToken}`
            }
          })
          .then(response => response.json()).then((data) =>{ 
            data.success?setLink(remainingData):console.log("No Data Found"); 
        })
        }
        catch (error) {
          console.log("Error occured", error)
        }
      }
      useEffect(() => {
        if(!destbucket) {
          setIsDisabled(true) 
        }
        else if (option && status === 'Rejected' ) setIsDisabled(false) 
        else if (status && status !== 'Rejected') {
          setIsDisabled(false)
        } else {
          setIsDisabled(true)
        }
      }, [status, option, destbucket])

  return (
    <div className="tiles">
      <h1 className="heading-screens">Redo Lip Sync</h1>
    <div className="main-tile">
      <div className="main-tile-head">
        <Typography
        className="video-name"
          sx={{
            // fontSize: "11px",
            // width: "71.7%",
            // marginLeft: "2.4rem",
            // position: "relative",
            // right: "10%",
            paddingLeft: "1rem",
          }}
        > Sample_4.mp4
        </Typography>
          <Chip label={`In progress: admin`} sx={{ml:"5px", backgroundColor: 'white'}}/>
      </div>
      <p className="video-name-dynamic">No Comment Found</p>
    </div>
    <div className="main-tiles">
    <RedoLipModal
    onClick={handelClick}
    sendMessage={handleClickSendMessage}
    open={open}
    setOpen={setOpen}
    item={item}
    sbuck={sbuck}
    />
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" disabled="True"  variant="outlined" value="samp dad bald dan"/>
      <TextField id="outlined-basic" label="Type Namecode" variant="outlined" />
    </Box>
      <Button
        // onClick={GetQCDone}
        variant="contained"
        // disabled={isDisabled}
        sx={{
          height: "2.5rem",
          // marginTop: ".46rem",
          backgroundColor: "#D7B8FD",
          color: "white",
          "&:hover": {
            backgroundColor: "#ad6efb",
            color: "#fff",
          },
        }}
      >
        Done
      </Button>
    </div>
  </div>
  )
}

export default RedoLipBox
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PlayCircleRounderIcon from "@mui/icons-material/PlayCircleRounded";
import { BigPlayButton, Player, PlayToggle } from "video-react";
import "../../../node_modules/video-react/dist/video-react.css";
import { ControlBar, PlaybackRateMenuButton, ReplayControl } from "video-react";
import { useState } from "react";
import { BASE_URL } from "../../constants/constant";
import ReactLoading from "react-loading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


export default function VideoModal({ open, setOpen, item, sbuck, sendMessage}) {
  const [puburl, setPuburl] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    console.log("false")
    setPuburl(false)
    setOpen(false)};
   
  let FetchPlayVideo = async() => {
       return new Promise(function(resolve, reject) {
        try{
          setLoading(true)
          fetch(`${BASE_URL}/log/makepub`, {
          method: "POST",
          body: JSON.stringify({
            fileName: item,
            buckName: sbuck 
          }),
          headers: {
            "Content-type": "application/json"
        }
      })
        .then(response => response.json())
        .then(json => { 
          resolve(json);
          });
      }
      catch{
        reject("error")
      }
    }).then(
      result => {
          setLoading(false);
          setPuburl(result.publink)
      }, // shows "done!" after 1 second
      error => alert(error) // doesn't run
    );
    };
    
  return (
    <div>
      <PlayCircleRounderIcon
        sx={{ fontSize: "3rem", marginTop: ".35rem", color:"#1976d2",cursor:'pointer'}}
         onClick={() => {handleOpen(); FetchPlayVideo(); sendMessage({video_id: item})}}
      />
   
      <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
>
        <Box sx={style}>
          {puburl && 
          <Player playsInline>
            <BigPlayButton position="center"/>
            <source src={`${puburl}#t=.01`} type="video/mp4" />
            <ControlBar>
              <PlayToggle />
              <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} />
              <ReplayControl seconds={5}/>
             
            </ControlBar>
          </Player>}
          {loading&&<Box sx={{display:"flex",justifyContent:"center",width:"100%"}}>Loading...<ReactLoading type="balls" color="#black"/></Box>}
        </Box>
      </Modal>
    </div>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PlayCircleRounderIcon from "@mui/icons-material/PlayCircleRounded";
import { BigPlayButton, Player, PlayToggle } from "video-react";
import "../node_modules/video-react/dist/video-react.css";
import { ControlBar, PlaybackRateMenuButton } from "video-react";
import { useState } from "react";
import { WebSocket } from 'ws';

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

// const ws = new WebSocket('ws://127.0.0.1:7000/ws/ac/');
// console.log("Print", ws)
// // const Websoc = () => {

// ws.onmessage = (event) => {
//   console.log(event.data);
// };

// ws.send('Hello, server!');

// ws.close();

export default function VideoModal({ open, setOpen, item, sbuck, sendMessage}) {
  console.log("ITEM", item)
  const handleOpen = () => {
    setOpen(true);
    console.log("true");
  };
  const [puburl, setPuburl] = useState(false);
  const handleClose = () => setOpen(false);
  
  // const [vname, setVname] = useState("");
  
  // let FetchPlayVideo = async() => {
  //   fetch(`http://127.0.0.1:7000/log/makepub`)
  //   .then((res)=> res.json())
  //   .then((data) => console.log(data));
  // };
  let FetchPlayVideo = async() => {
    fetch("http://34.122.118.251:8000/log/makepub", {
    method: "POST",

    body: JSON.stringify({
      fileName: item,
      buckName: sbuck 
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
  }
})
  .then(response => response.json())
  .then(json => setPuburl(json.publink));
}
console.log("puburlllll",puburl)


  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <PlayCircleRounderIcon
        sx={{ fontSize: "3rem", marginTop: ".35rem", color:"#D7B8FD"}}
         onClick={() => {handleOpen(); FetchPlayVideo(); sendMessage({video_id: item})}}
      />
   
      <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          {puburl && 
          <Player
            // ref={(c) => {
            //   this.player = c;
            // }}
             
            playsInline
            // poster= {`${puburl}#t=0.8`}
            //poster="https://www.truefan.in/assets/images/icons/truefan-logo-white.svg"
          >
            <BigPlayButton position="center"/>
            <source src={`${puburl}#t=.01`} type="video/mp4" />
            <ControlBar>
              <PlayToggle />
              <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} />
            </ControlBar>
          </Player>}
        </Box>
      </Modal>
    </div>
  );
}

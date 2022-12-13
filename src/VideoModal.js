import * as React from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PlayCircleRounderIcon from "@mui/icons-material/PlayCircleRounded";
import { BigPlayButton, Player, PlayToggle } from "video-react";
import "../node_modules/video-react/dist/video-react.css";
import { ControlBar, PlaybackRateMenuButton } from "video-react";

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

export default function VideoModal({ open, setOpen }) {
  const handleOpen = () => {
    setOpen(true);
    console.log("true");
  };
  const handleClose = () => setOpen(false);
    
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <PlayCircleRounderIcon
        sx={{ fontSize: "3rem", marginTop: ".35rem", color:"#D7B8FD"
         }}
        onClick={handleOpen}
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
          <Player
            // ref={(c) => {
            //   this.player = c;
            // }}

            playsInline
            poster="https://www.truefan.in/assets/images/icons/truefan-logo-white.svg"
          >
            <BigPlayButton position="center"/>
            <source src={require("./img/Sample_4.mp4")} type="video/mp4" />
            <ControlBar>
              <PlayToggle />
              <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} />
            </ControlBar>
          </Player>
        </Box>
      </Modal>
    </div>
  );
}

import React, { useState } from 'react'
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PlayCircleRounderIcon from "@mui/icons-material/PlayCircleRounded";
import { BigPlayButton, Player, PlayToggle } from "video-react";
import "../../../node_modules/video-react/dist/video-react.css";
import { ControlBar, PlaybackRateMenuButton, ReplayControl } from "video-react";
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
  
const VideoModal = ({link}) => {

    
  const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        console.log("false")
        setOpen(false)
    };


    return (
        <div>
            <button
                className='outlined-btn w-100'
                style={{  marginTop: "10px", color: "#1976d2", cursor: 'pointer' }}
                onClick={() => { handleOpen(); }}
            >
                Play video
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {link &&
                        <Player playsInline>
                            <BigPlayButton position="center" />
                            <source src={`${link}#t=.01`} type="video/mp4" />
                            <ControlBar>
                                <PlayToggle />
                                <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} />
                                <ReplayControl seconds={5} />

                            </ControlBar>
                        </Player>}
                    {/* {<Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>Loading...<ReactLoading type="balls" color="#black" /></Box>} */}
                </Box>
            </Modal>
        </div>
    )
}

export default VideoModal
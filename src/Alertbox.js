import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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

export default function Alertbox({ open, setOpen, item, status, option, remark }) {
    const handleOpen = () => {
        setOpen(true);
        console.log("true");
        };
  const handleClose = () => setOpen(false);

  let GetQCDone = async() => {
    console.log("Prining GetQCDone")
    fetch("http://34.29.72.93:8000/log/tilestatus",{
      method:"POST", 
      body: JSON.stringify({  
        videoName: item,
        videoStatus: status,
        videoOption: option,
        videoRemarks: remark,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
  }
  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{
          height: "2.5rem",
          // marginTop: ".46rem",
          backgroundColor: "#D7B8FD",
          color: "white",
          "&:hover": {
            backgroundColor: "#7F377F",
            color: "#fff",
          },
        }}
      >
        Done
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
        sx={{padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            >This Video will transferred to Finalm QC Folder {item}</Typography>
          <Button variant="outlined" onClick={GetQCDone} sx={{position: 'relative', left: '27%', bottom: '5%'}}>Yes!! Make it Final</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}



import * as React from "react";
// For welcome text
import Typography from "@mui/material/Typography";
import RefreshIcon from '@mui/icons-material/Refresh';
import Stack from "@mui/material/Stack";
import PopUp from "../components/db/PopUp";
import { useState } from "react";

// For sheet thing
import MatTableComp from "../components/db/MatTableComp";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import NewRequestFormModal from "../components/dashboard/NewRequestFormModal";

const Dashboard = () => {
  const showname = localStorage.getItem("username");

  
  const [requestNewModalOpen, setRequestNewModalOpen] = useState(false);
  const handleRequestNewModalOpen = () => setRequestNewModalOpen(true);
  const handleRequestNewModalClose = () => setRequestNewModalOpen(false);

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  
  const callPopUp = () => {
    setIsPopUpOpen(true);
  };

  const refreshDataRef = React.useRef(null); 

  const closePopUp = () => {
    setIsPopUpOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Stack
      style={{ position: "relative" }}
      direction="column"
      alignItems="left"
      padding="1%"
      id="dashboard"
    >
    <Modal
      open={requestNewModalOpen}
      onClose={handleRequestNewModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      id='request-modal'
    >
      <Box sx={style}>
      <NewRequestFormModal />
      </Box>
    </Modal>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
          // paddingRight: "17%",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome{" "}
          <span style={{ fontWeight: "bold" }}>{showname} &#128578;,</span>
        </Typography>
        <div style={{
          display:'flex',
          gap:'10px',
          alignItems:'center'
        }}>
          <button
          className="primary-btn"
          onClick={handleRequestNewModalOpen}
          >
            Create new request
          </button>
          <div className="audio-refresh-btn">
              <div
                onClick={() => {
                  refreshDataRef.current.refetch()
                }}
              >
                <RefreshIcon/>
              </div>
          </div>
        </div>
      </div>
      <MatTableComp openPopUp={callPopUp} ref={refreshDataRef} />
      {isPopUpOpen && <PopUp onClose={closePopUp} />}
    </Stack>
  );
};

export default Dashboard;

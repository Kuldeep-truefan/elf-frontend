import * as React from "react";
// For welcome text
import Typography from "@mui/material/Typography";
import RefreshIcon from '@mui/icons-material/Refresh';
import Stack from "@mui/material/Stack";
import PopUp from "../components/db/PopUp";
import { useState } from "react";

// For sheet thing
import MatTableComp from "../components/db/MatTableComp";

const Dashboard = () => {
  const showname = localStorage.getItem("username");

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  
  const callPopUp = () => {
    setIsPopUpOpen(true);
  };

  const refreshDataRef = React.useRef(null); 

  const closePopUp = () => {
    setIsPopUpOpen(false);
  };

  return (
    <Stack
      style={{ position: "relative" }}
      direction="column"
      alignItems="left"
      padding="1%"
      id="dashboard"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          // paddingLeft: "5%",
          // paddingRight: "17%",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome{" "}
          <span style={{ fontWeight: "bold" }}>{showname} &#128578;,</span>
        </Typography>
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
      <MatTableComp openPopUp={callPopUp} ref={refreshDataRef} />
      {isPopUpOpen && <PopUp onClose={closePopUp} />}
    </Stack>
  );
};

export default Dashboard;

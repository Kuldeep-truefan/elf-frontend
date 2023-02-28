import * as React from "react";

// For welcome text
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// For sheet thing
import MatTableComp from "../components/db/MatTableComp";
const Dashboard = () => {
  const showname = localStorage.getItem("username");
  return (
    <Stack
      style={{ position: "relative" }}
      direction="column"
      alignItems="left"
      padding="1%"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "5%",
          paddingRight: "17%",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome{" "}
          <span style={{ fontWeight: "bold" }}>{showname} &#128578;,</span>
        </Typography>
        <Button
          variant="contained"
          sx={{
            background: "#D7B8FD",
            "&:hover": { backgroundColor: "#ad6efb" },
          }}
          onClick={() => {
            document.location.reload(false);
          }}
        >
          Refresh
        </Button>
      </div>
      <MatTableComp />
    </Stack>
  );
};

export default Dashboard;

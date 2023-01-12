import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const AudioModal = () => {
  return (
    <div>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button variant="contained" component="label">
          Attach Audio
          <input hidden accept="image/*" multiple type="file" />
        </Button>
        <Button variant="contained" component="label">
          Last Audio
          <input hidden accept="image/*" multiple type="file" />
        </Button>
      </Stack>
    </div>
  );
};

export default AudioModal;

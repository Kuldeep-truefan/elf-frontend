import "./App.css";
// import TextField from "@mui/material/TextField";
// import logo from "./img/logo.png";
// import {
//   Button,
//   Checkbox,
//   FormControlLabel,
//   FormGroup,
//   Typography,
// } from "@mui/material";
// import { pink } from "@mui/material/colors";
// import { useState } from "react";
// import Snackbar from '@mui/material/Snackbar';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
// import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Button, Stack, Typography } from "@mui/material";
import VideoModal from "./VideoModal";

function TileController() {

  return (
    <div className="tc">
      <div>
      <Stack spacing={2} direction="row">
        <Button sx={{borderRadius:"1rem"}} variant="outlined">Refresh Tiles</Button>
        <Button sx={{borderRadius:"1rem"}} variant="outlined">Delete</Button>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="select-options">Options</InputLabel>
          <Select
            labelId="select-options"
            id="select-options"
          >
            <MenuItem value={10}>Need Changes</MenuItem>
            <MenuItem value={20}>Recheck</MenuItem>
            <MenuItem value={30}>Lips Not Match</MenuItem>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          </Select>
        </FormControl>        
        <Button sx={{borderRadius:"1rem"}} variant="outlined">Button 5</Button>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="select-options">Options</InputLabel>
          <Select
            labelId="select-options"
            id="select-options"
          >
            <MenuItem value={10}>Need Changes</MenuItem>
            <MenuItem value={20}>Recheck</MenuItem>
            <MenuItem value={30}>Lips Not Match</MenuItem>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          </Select>
        </FormControl>
        <Button sx={{borderRadius:"1rem"}} variant="outlined">Button 2</Button>
        <Button sx={{borderRadius:"1rem"}} variant="outlined">Button 3</Button>
        <Button sx={{borderRadius:"1rem"}} variant="outlined">Button 4</Button>
      </Stack>
      </div>
    </div>
  );
}

export default TileController;

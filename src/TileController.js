import "./App.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useState } from "react";

function TileController({ FetchLink }) {
  // else{
  //   setState({ open: false});
  // }
  const [bucket, setBucket] = useState("");
  const [handlestatus, setHandelstatus] = useState("");
  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="tc">
      <div>
        {/* <Stack spacing={2} direction="row">
          <Button
            sx={{ borderRadius: "1rem" }}
            variant="outlined"
            onClick={FetchLink}
          >
            Refresh Tiles
          </Button>
        </Stack> */}
        <FormControl sx={{ m: 1, minWidth: 135 }} size="small">
          <InputLabel id="demo-select">Load From</InputLabel>
          <Select
            labelId="demo-select"
            id="demo-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>QC2</MenuItem>
            <MenuItem value={20}>Final QC</MenuItem>
            <MenuItem value={30}>Rejects</MenuItem>
            <MenuItem value="none">
              <em>None</em>
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 135 }} size="small">
          <InputLabel id="demo-select-small">Move To</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={11}>QC2</MenuItem>
            <MenuItem value={22}>Final QC</MenuItem>
            <MenuItem value={33}>RTS</MenuItem>
            <MenuItem value="no">
              <em>None</em>
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default TileController;

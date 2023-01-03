import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./App.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function TileController({ setLink, setSbuck, setDbuck}) {
  // else{
  //   setState({ open: false});
  // }
  // const [bucket, setBucket] = useState("");
  // const [handlestatus, setHandelstatus] = useState("");
  const [loadbucket, setLoadbucket] = useState("");
  const [destbucket, setDestMove] = useState("");
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('authToken');

  const handleLoadBucket = (event) => {
    setLoadbucket(event.target.value);
    setSbuck(event.target.value)
    console.log(">>>>>",loadbucket)
  };
  const handleDestBucket = (event) => {
    setDestMove(event.target.value);
    setDbuck(event.target.value)
    console.log(">>>>>",destbucket)
  };

  let FetchLink = async () => {
    if (!accessToken){
      navigate('/')
    }
    try{
        fetch("http://34.29.72.93:8000/log/getlink",{
        // fetch("http://127.0.0.1:8000/log/getlink",{
        method: "POST",
        body: JSON.stringify({  
          bucketName: loadbucket,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((response) => response.json())
      .then((data) => setLink(data.filename));
    }
    catch (error) {
      console.log("Error occured", error)
    }
  }
  const handleClick = () => {
    FetchLink();
  }
  return (
    <div className="tc">
      <div className="tc-inner">
        {/* <Button
          sx={{ borderRadius: "1rem" }}
          variant="outlined"
          // onClick={FetchLink}
        >
          Refresh Tiles
        </Button> */}
        <FormControl sx={{ m: 1, minWidth: 133, position:"relative"}} size="small">
          <InputLabel id="load-buck">Load Bucket</InputLabel>
          <Select
            labelId="load-buck-lab"
            id="load-buck-id"
            value={loadbucket}
            label="Load Bucket"
            onChange={handleLoadBucket}
            // onChange={event => {handleLoadBucket(event); FetchLink()}}
          >
            <MenuItem value="qc2">qc2</MenuItem>
            <MenuItem value="final-qc">final-qc</MenuItem>
            <MenuItem value="qc-rejects">qc-rejects</MenuItem>
            <MenuItem value="truefan_no_logo_celeb_videos_bucket">rts</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120, position:"relative"}} size="small">
          <InputLabel id="load-move">Move To</InputLabel>
          <Select
            labelId="load-move-lab"
            id="load-move-id"
            value={destbucket}
           label="Load Bucket"
            onChange={handleDestBucket}
          >
            <MenuItem value="qc2">qc2</MenuItem>
            <MenuItem value="final-qc">final-qc</MenuItem>
            <MenuItem value="truefan_no_logo_celeb_videos_bucket">rts</MenuItem>
            <MenuItem value="qc-rejects">qc-rejects</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" href="#contained-buttons" onClick = {handleClick} sx={{background: '#D7B8FD', '&:hover':{backgroundColor: '#7F377F'}}}>Refresh</Button>
      </div>
    </div>
  );
}

export default TileController;

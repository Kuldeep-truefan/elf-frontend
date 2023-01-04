import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./App.css";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function TileController({ setLink, setSbuck, setDbuck, destbucket, setDestMove}) {
  // else{
  //   setState({ open: false});
  // }
  // const [bucket, setBucket] = useState("");
  // const [handlestatus, setHandelstatus] = useState("");
  const [loadbucket, setLoadbucket] = useState("");
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('authToken');
  // {label:"test-qc2",value:"dev-ans-test-qc2"}, {label:"test-final",value:"dev-ans-test-final"},
  const [loadbucketoption, setLoadbucketoption] = useState([{label:"test-qc2",value:"dev-ans-test-qc2"}, {label:"test-final",value:"dev-ans-test-final"},{label:"qc2",value:"qc2"}, {label:"final-qc",value:"final-qc"}, {label:"qc-rejects",value:"qc-rejects"}, {label:"rts",value:"truefan_no_logo_celeb_videos_bucket"}])
  const [movebucketoption, setMovebucketoption] = useState([{label:"test-qc2",value:"dev-ans-test-qc2"}, {label:"test-final",value:"dev-ans-test-final"},{label:"qc2",value:"qc2"}, {label:"final-qc",value:"final-qc"}, {label:"rts",value:"truefan_no_logo_celeb_videos_bucket"}, {label:"qc-rejects",value:"qc-rejects"}])
  const defaultloadbucketoption = [{label:"test-qc2",value:"dev-ans-test-qc2"}, {label:"test-final",value:"dev-ans-test-final"},{label:"qc2",value:"qc2"}, {label:"final-qc",value:"final-qc"}, {label:"qc-rejects",value:"qc-rejects"}, {label:"rts",value:"truefan_no_logo_celeb_videos_bucket"}]
  const defaultmovebucketoption = [{label:"test-qc2",value:"dev-ans-test-qc2"}, {label:"test-final",value:"dev-ans-test-final"},{label:"qc2",value:"qc2"}, {label:"final-qc",value:"final-qc"}, {label:"rts",value:"truefan_no_logo_celeb_videos_bucket"}, {label:"qc-rejects",value:"qc-rejects"}]

  useEffect(() => {
    setMovebucketoption(prevState=>{
      const filteredOptions = defaultloadbucketoption.filter(bucket=>bucket?.value!==loadbucket);
      return filteredOptions;
    })
  }, [loadbucket])

  useEffect(() => {
    setLoadbucketoption(prevState=>{
      const filteredOptions = defaultmovebucketoption.filter(bucket=>bucket?.value!==destbucket);
      return filteredOptions;
    })
  }, [destbucket])

  console.log(loadbucket);
  
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
      .then((data) => setLink(data.filename))
      // .then((data) => console.log("Datatatatatatatatatat", data));
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
        <FormControl sx={{ m: 1, minWidth: 133}} size="small">
          <InputLabel id="load-buck">Load From</InputLabel>
          <Select
            labelId="load-buck-lab"
            id="load-buck-id"
            value={loadbucket}
            label="Load Bucket"
            onChange={handleLoadBucket}
            // onChange={event => {handleLoadBucket(event); FetchLink()}}
          >
            {loadbucketoption?.map(bucket => <MenuItem value={bucket.value}>{bucket.label}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120}} size="small">
          <InputLabel id="load-move">Move To</InputLabel>
          <Select
            labelId="load-move-lab"
            id="load-move-id"
            value={destbucket}
           label="Load Bucket"
            onChange={handleDestBucket}
          >
            {movebucketoption?.map(bucket => <MenuItem value={bucket.value}>{bucket.label}</MenuItem>)} 
          </Select>
        </FormControl>
        <Button variant="contained" href="#contained-buttons" onClick = {handleClick} sx={{background: '#D7B8FD', '&:hover':{backgroundColor: '#7F377F'}}}>Refresh</Button>
      </div>
    </div>
  );
}

export default TileController;

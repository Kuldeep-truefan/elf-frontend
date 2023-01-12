import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../../App.css";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { BASE_URL } from "../../constants/constant";
import ReactLoading from "react-loading";

function TileController({ setLink, setSbuck, setDbuck, destbucket, setDestMove, emittedData}) {
  const [loadbucket, setLoadbucket] = useState("");
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('authToken');
  const [loading, setLoading] = useState(false);
  
  // PROD ENV BUCKETS
  const [loadbucketoption, setLoadbucketoption] = useState([{label:"qc2",value:"qc2"}, {label:"final-qc",value:"final-qc"}, {label:"qc-rejects",value:"qc-rejects"}, {label:"rts",value:"truefan_no_logo_celeb_videos_bucket"}])
  const [movebucketoption, setMovebucketoption] = useState([{label:"qc2",value:"qc2"}, {label:"final-qc",value:"final-qc"}, {label:"rts",value:"truefan_no_logo_celeb_videos_bucket"}, {label:"qc-rejects",value:"qc-rejects"}])
  const defaultloadbucketoption = [{label:"qc2",value:"qc2"}, {label:"final-qc",value:"final-qc"}, {label:"qc-rejects",value:"qc-rejects"}, {label:"rts",value:"truefan_no_logo_celeb_videos_bucket"}]
  const defaultmovebucketoption = [{label:"qc2",value:"qc2"}, {label:"final-qc",value:"final-qc"}, {label:"rts",value:"truefan_no_logo_celeb_videos_bucket"}, {label:"qc-rejects",value:"qc-rejects"}]

  // Dev ENV Bucket
  // const [loadbucketoption, setLoadbucketoption] = useState([{label:"test-qc2",value:"dev-ans-test-qc2"}, {label:"test-final",value:"dev-ans-test-final"}])
  // const [movebucketoption, setMovebucketoption] = useState([{label:"test-qc2",value:"dev-ans-test-qc2"}, {label:"test-final",value:"dev-ans-test-final"}])
  // const defaultloadbucketoption = [{label:"test-qc2",value:"dev-ans-test-qc2"}, {label:"test-final",value:"dev-ans-test-final"}]
  // const defaultmovebucketoption = [{label:"test-qc2",value:"dev-ans-test-qc2"}, {label:"test-final",value:"dev-ans-test-final"}]


  useEffect(() => {
    setLoadbucketoption(prevState=>{
      const filteredOptions = defaultmovebucketoption.filter(bucket=>bucket?.value!==destbucket);
      return filteredOptions;
    })
  }, [destbucket])
  
  const handleLoadBucket = (event) => {
    setLoadbucket(event.target.value);
    setSbuck(event.target.value)
  };
  const handleDestBucket = (event) => {
    setDestMove(event.target.value);
    setDbuck(event.target.value)
  };

  let FetchLink = async () => {
    if (!accessToken){
      navigate('/')
    }
    try{
        setLoading(true); // Set loading before sending API request
        fetch(`${BASE_URL}/log/getlink`,{
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
      setLoading(false); // Stop loading
    }
    catch (error) {
      setLoading(false);
      console.log("Error occured", error)
    }
  }
  const handleClick = () => {
    FetchLink();
  }
  return (
    <div className="tc">
      <div className="tc-inner">
        <FormControl sx={{ m: 1, minWidth: 133}} size="small">
          <InputLabel id="load-buck">Load From</InputLabel>
          <Select
            labelId="load-buck-lab"
            id="load-buck-id"
            value={loadbucket}
            label="Load Bucket"
            onChange={handleLoadBucket}
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
        <Button variant="contained" href="#contained-buttons" onClick = {handleClick} sx={{background: '#D7B8FD', '&:hover':{backgroundColor: '#ad6efb'}}}>Refresh</Button>
      </div>
    </div>
  );
}

export default TileController;

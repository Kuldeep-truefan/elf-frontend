import "../../App.css";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from '@mui/icons-material/Search';

function TileController({ setLink, setSbuck, setDbuck, destbucket, setDestMove, emittedData, setPageCount, setLoadbucket, fetchLinkMutate,loadbucket}) {
  const accessToken = localStorage.getItem('authToken');

  // // PROD ENV BUCKETS
  const [loadbucketoption, setLoadbucketoption] = useState([{label:"qc2",value:"qc2"},{label:"n2v-outputs",value:"n2v-outputs"}, {label:"final-qc",value:"final-qc"}, {label:"qc-rejects",value:"qc-rejects"}, {label:"rts",value:"truefan_no_logo_celeb_videos_bucket"}])
  const [movebucketoption, setMovebucketoption] = useState([{label:"qc2",value:"qc2"},{label:"n2v-outputs",value:"n2v-outputs"}, {label:"final-qc",value:"final-qc"}, {label:"rts",value:"truefan_no_logo_celeb_videos_bucket"}, {label:"qc-rejects",value:"qc-rejects"}])
  const defaultloadbucketoption = [{label:"qc2",value:"qc2"},{label:"n2v-outputs",value:"n2v-outputs"}, {label:"final-qc",value:"final-qc"}, {label:"qc-rejects",value:"qc-rejects"}, {label:"rts",value:"truefan_no_logo_celeb_videos_bucket"}]
  const defaultmovebucketoption = [{label:"qc2",value:"qc2"},{label:"n2v-outputs",value:"n2v-outputs"}, {label:"final-qc",value:"final-qc"}, {label:"rts",value:"truefan_no_logo_celeb_videos_bucket"}, {label:"qc-rejects",value:"qc-rejects"}]

  // Dev ENV Bucket
  // const [loadbucketoption, setLoadbucketoption] = useState([{label:"test-qc2",value:"dev-ans-test-qc2"}, {label:"test-final",value:"dev-ans-test-final"}, {label:"qc-rejects",value:"qc-rejects"}])
  // const [movebucketoption, setMovebucketoption] = useState([{label:"test-qc2",value:"dev-ans-test-qc2"}, {label:"test-final",value:"dev-ans-test-final"}, {label:"qc-rejects",value:"qc-rejects"}])
  // const defaultloadbucketoption = [{label:"test-qc2",value:"dev-ans-test-qc2"}, {label:"test-final",value:"dev-ans-test-final"}, {label:"qc-rejects",value:"qc-rejects"}]
  // const defaultmovebucketoption = [{label:"test-qc2",value:"dev-ans-test-qc2"}, {label:"test-final",value:"dev-ans-test-final"}, {label:"qc-rejects",value:"qc-rejects"}]


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


  return (
    // <div className="tc">
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
            {loadbucketoption?.map((bucket,index) => <MenuItem value={bucket.value} key={index}>{bucket.label}</MenuItem>)
            }
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
            {movebucketoption?.map((bucket,index) => <MenuItem key={index} value={bucket.value}>{bucket.label}</MenuItem>)} 
          </Select>
        </FormControl>
        <button href="#contained-buttons" onClick = {() => fetchLinkMutate(1)} className="primary-btn"><SearchIcon />Search</button>
        </div>

  );
}

export default TileController;

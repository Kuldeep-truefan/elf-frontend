import "../../App.css";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import { BASE_URL } from "../../constants/constant";
import Pagination from "@mui/material/Pagination";

function TileController({ setLink, setSbuck, setDbuck, destbucket, setDestMove, emittedData}) {
  const [loadbucket, setLoadbucket] = useState("");
  const [pageCount, setPageCount] = useState('');
  const accessToken = localStorage.getItem('authToken');
  console.log(pageCount, 'pageCount----------->>>>>>.')

  // PROD ENV BUCKETS
  const [loadbucketoption, setLoadbucketoption] = useState([{label:"qc2",value:"qc2"}, {label:"final-qc",value:"final-qc"}, {label:"qc-rejects",value:"qc-rejects"}, {label:"rts",value:"truefan_no_logo_celeb_videos_bucket"}])
  const [movebucketoption, setMovebucketoption] = useState([{label:"qc2",value:"qc2"}, {label:"final-qc",value:"final-qc"}, {label:"rts",value:"truefan_no_logo_celeb_videos_bucket"}, {label:"qc-rejects",value:"qc-rejects"}])
  const defaultloadbucketoption = [{label:"qc2",value:"qc2"}, {label:"final-qc",value:"final-qc"}, {label:"qc-rejects",value:"qc-rejects"}, {label:"rts",value:"truefan_no_logo_celeb_videos_bucket"}]
  const defaultmovebucketoption = [{label:"qc2",value:"qc2"}, {label:"final-qc",value:"final-qc"}, {label:"rts",value:"truefan_no_logo_celeb_videos_bucket"}, {label:"qc-rejects",value:"qc-rejects"}]

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

  let FetchLink = async (value) => {
    console.log('page number',value);
    try{
        fetch(`${BASE_URL}/log/getlink`,{
        method: "POST",
        body: JSON.stringify({  
          bucketName: loadbucket,
          pageNumber: value
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((response) => response.json())
      .then((response) => response)
      .then((data) => {
        setLink(data.filename)
        setPageCount(data.pagecount)
      })
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
        {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
        </div>
        <div className="pagination-class">
        <Pagination 
        onChange={(e, value) => FetchLink(value)}
        count={pageCount} 
        variant="outlined" />
      </div>
    </div>
  );
}

export default TileController;

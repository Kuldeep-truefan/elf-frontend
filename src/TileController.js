import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./App.css";
import { Button } from "@mui/material";

function TileController({ setLink, setSbuck, setDbuck}) {
  // else{
  //   setState({ open: false});
  // }
  // const [bucket, setBucket] = useState("");
  // const [handlestatus, setHandelstatus] = useState("");
  const [loadbucket, setLoadbucket] = useState("");
  const [destbucket, setDestMove] = useState("");

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
    fetch("http://127.0.0.1:7000/log/getlink",{
      method: "POST",
      body: JSON.stringify({  
        bucketName: loadbucket,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((data) => setLink(data.filename));
  };

  useEffect(() => {
    FetchLink();
  }, [loadbucket])


  return (
    <div className="tc">
      <div>
        <Button
          sx={{ borderRadius: "1rem" }}
          variant="outlined"
          // onClick={FetchLink}
        >
          Refresh Tiles
        </Button>
        <FormControl sx={{ m: 1, minWidth: 133 }} size="small">
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
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
            <MenuItem value="rts">RTS</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default TileController;

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "../../App.css";
import { Button, Chip, Typography } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoModal from "./VideoModal";
import { BASE_URL } from "../../constants/constant";
import { useQueryClient } from "react-query";
import VAS from "../ExtraComponents/VAS";
import { triggerError, triggerSuccess } from "../ExtraComponents/AlertPopups";
import AudioRecorders from "../auqc/AudioRecorders";


const RowComponent = ({
  item,
  sbuck,
  comments,
  dbuck,  
  handleClickSendMessage,
  emittedData,
  setLink,
  link,
  destbucket,
  vas,
  changeDataStatus,
  pageNumber
}) => {
  const queryClient = useQueryClient()
  const [status, setStatus] = useState("");
  const [option, setOptions] = useState("");
  const [remark, setRemark] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  const [recordedAudio, setRecordedAudio] = useState(null);
  
  const [updating, setUpdating] = useState(false)
  const accessToken = localStorage.getItem("authToken");

  const handelClick = () => {
    setOpen(!open);
  };

  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleOptions = (event) => {
    setOptions(event.target.value);
  };

  const handleChange = (event) => {
    setRemark(event.target.value);
  };

  
  let UploadAudioRecored = async (fullFileName, vidAuRec) => {
    try {
      let myHeaders = new Headers();
      myHeaders.append(
        "Cookie",
        "csrftoken=L2ETtVsdGnxYzQ4llNrKESv7Evm5nGa5N7SWvkTt488G43CzM7AnoWHJoxr8GNSC"
      );

      let formdata = new FormData();
      formdata.append("fileName", fullFileName);
      formdata.append("file", recordedAudio);
      formdata.append("videoId", vidAuRec);

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
      };
      const response = await fetch(
        `${BASE_URL}/audio/upload-rec-auqc-file`,
        requestOptions
      );
      // const convertToText = await response.text();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const updateStatus = async ()=>{
    const response = await fetch(`${BASE_URL}/log/tilestatus`, {
      method: "POST",
      body: JSON.stringify({
        sourceBucket: sbuck,
        destinationBucket: dbuck,
        videoName: item,
        videoStatus: status,
        videoOption: option,
        videoRemarks: remark,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if(response.status === 200){
      triggerSuccess()
      changeDataStatus('fetching')
      queryClient.invalidateQueries({queryKey:['FetchLinkData']})
    }else{
      triggerError()
      setUpdating(false)
    }
  }

  let GetQCDone = async () => {
    
    setUpdating(true)
    try {

      const result = recordedAudio? await UploadAudioRecored(): true;
      if(result) {
        updateStatus();
      }else{
        triggerError('Remark audio not uploaded')
      }

    } catch (error) {
      console.log("Error occured", error);
    }
  };

  useEffect(() => {
    if (!destbucket) {
      setIsDisabled(true);
    } else if (option && status === "Rejected") setIsDisabled(false);
    else if (status && status !== "Rejected") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [status, option, destbucket]);

  return (
    <div className={`tile ${updating?'action-performing':''}`}>
      <div className="main-tile">
        <div className="main-tile-head">
          <Typography
            className="video-name"
            sx={{
              paddingLeft: "1rem",
            }}
          >
            {item}
          </Typography>
          {!!emittedData &&
            JSON.parse(emittedData)?.filter((data) => data?.video_id === item)?.length >
              0 && (
              <Chip
                label={`In progress: ${
                  JSON.parse(emittedData)?.filter(
                    (data) => data?.video_id === item
                  )?.[0]?.user
                }`}
                sx={{ ml: "15px", backgroundColor: "#bcddfe", height:'unset',padding:'1px', color:'#1976d2', border:'1px solid #1976d2' }}
              />
            )}
        </div>

        <p className="video-name-dynamic">{comments}</p>
        <VAS vas={vas}/>
      </div>
      <div className="main-tiles qc-options">

        <div className="d-flex justify-between align-items-center">
          <VideoModal
            onClick={handelClick}
            sendMessage={handleClickSendMessage}
            open={open}
            setOpen={setOpen}
            item={item}
            sbuck={sbuck}
          />
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="select-status">Status</InputLabel>
            <Select
              labelId="select-status"
              value={status}
              label="Status"
              onChange={handleStatus}
            >
              <MenuItem value={"Approved"}>Approved</MenuItem>
              <MenuItem value={"Rejected"}>Rejected</MenuItem>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
            </Select>
          </FormControl>
          {
            status === 'Rejected' &&
            <>
              <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
                <InputLabel id="select-options">Reason</InputLabel>
                <Select
                  labelId="select-options"
                  value={option}
                  label="Options"
                  onChange={handleOptions}
                >
                  <MenuItem value={"Redo Lipsync"}>Redo Lipsync</MenuItem>
                  <MenuItem value={"Audio Mistreated"}>Audio Mistreated</MenuItem>
                  <MenuItem value={"Audio Mispronounced"}>
                    Audio Mispronounced
                  </MenuItem>
                  <MenuItem value={"AV Redo"}>AV Redo</MenuItem>
                  <MenuItem value={"AV Sync Mismatch"}>AV Sync Mismatch</MenuItem>
                  <MenuItem value={"Fix hi"}>Fix hi</MenuItem>
                  <MenuItem value={"Trim Reject"}>Trim Reject</MenuItem>
                  <MenuItem value={"Add gap between A & B"}>
                    Add gap between A & B
                  </MenuItem>
                  <MenuItem value={"Reduce gap between A & B"}>
                    Reduce gap between A & B
                  </MenuItem>
                  <MenuItem value={"AV Redo (mistreated)"}>
                    AV Redo (mistreated)
                  </MenuItem>
                  <MenuItem value={"Confirm pronunciation"}>
                    Confirm pronunciation
                  </MenuItem>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                </Select>
              </FormControl>
              <TextareaAutosize
                required={true}
                className="remark-area"
                aria-label="minimum height"
                minRows={2.2}
                placeholder="Remarks"
                value={remark}
                onChange={handleChange}
              />
              <AudioRecorders setRecordedAudio={setRecordedAudio} />
            </>
          }
        </div>
        <button
          onClick={GetQCDone}
          className={`primary-btn ${isDisabled?'disabled-btn':''}`}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default RowComponent;

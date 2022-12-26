import "./App.css";
import Nav from "./Nav";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState, useCallback } from "react";
// import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Button, Typography } from "@mui/material";
import VideoModal from "./VideoModal";
import TileController from "./TileController";
import RowComponent from "./RowComponent";
import useWebSocket, { ReadyState } from 'react-use-websocket';

// import Websoc from "./Websoc";

function Qc() {
  const [comment, setComment] = useState("");
  const [link, setLink] = useState([]);
  const [sbuck, setSbuck] = useState([]);
  const [dbuck, setDbuck] = useState([]);
  const [username, setUsername] = useState(localStorage.getItem('username'));

  const [emittedData, setemittedData] = useState({})

  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState('ws://127.0.0.1:8000/socket.io/');
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState,  } = useWebSocket(socketUrl,{
    onMessage:(message)=>{
      console.log(message)
      const data =JSON.parse(message?.data);
      setemittedData(data)
      console.log("message",message)
    }
  });

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  console.log(messageHistory);

  const handleClickSendMessage = useCallback((payload) => sendMessage(JSON.stringify({
    user: username,
    ...payload
  })), [username]); 
  console.log(localStorage.getItem('username'))

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
  
  return (
    <div className="Qc">
      <Nav />
      <TileController setLink={setLink} setSbuck={setSbuck} setDbuck={setDbuck}/>
      {link.map((item, index) => {
        return <RowComponent key={index} handleClickSendMessage={handleClickSendMessage} emittedData={emittedData}  item={item} sbuck={sbuck} dbuck={dbuck} />;
      })}
    </div>
  );
}
export default Qc;
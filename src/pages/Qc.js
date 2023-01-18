import "../App.css";
import { useEffect, useState, useCallback } from "react";
import TileController from "../components/qc/TileController";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { WEB_BASE_URL } from "../constants/constant";
import RowComponent from "../components/qc/RowComponent";

function Qc() {
  const [link, setLink] = useState([]);
  const [sbuck, setSbuck] = useState([]);
  const [dbuck, setDbuck] = useState([]);
  const [destbucket, setDestMove] = useState("");
  const [username, setUsername] = useState(localStorage.getItem('username'));

  const [emittedData, setemittedData] = useState({})

  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState(`${WEB_BASE_URL}/socket.io/`);
  
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState,  } = useWebSocket(socketUrl,{
    onMessage:(message)=>{
      console.log(message, "------------------")
      const data =JSON.parse(message?.data);
      if(data?.msg==="updated"){

      }
      setemittedData(JSON.parse(data?.data))
      // console.log("qc",J);
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
  })),[username]);
  
  console.log(localStorage.getItem('username'))

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
   
  // console.log(setLink, 'setlink')
  return (
    <div className="Qc">
      <h1 className="video-qc-heading">Video Qc</h1>
      <TileController setLink={setLink} setSbuck={setSbuck} emittedData={emittedData} setDbuck={setDbuck} destbucket={destbucket} setDestMove={setDestMove} />
      {link?.map((item, index) => {
        return <RowComponent key={index} setLink={setLink} handleClickSendMessage={handleClickSendMessage} destbucket={destbucket}  emittedData={emittedData}  item={item} sbuck={sbuck} dbuck={dbuck}  index={index} link={link}/>;
      })}
    </div>
  );
}
export default Qc;
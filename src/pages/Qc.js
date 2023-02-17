import "../App.css";
import { useEffect, useState, useCallback } from "react";
import TileController from "../components/qc/TileController";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WEB_BASE_URL } from "../constants/constant";
import RowComponent from "../components/qc/RowComponent";
import * as React from "react";

function Qc() {
  const [link, setLink] = useState("");
  const [sbuck, setSbuck] = useState([]);
  const [dbuck, setDbuck] = useState([]);
  const [destbucket, setDestMove] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [emittedData, setemittedData] = useState();

  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState(`${WEB_BASE_URL}/socket.io/`);

  // const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onMessage: (message) => {
      const data = JSON.parse(message?.data);
      if (data?.msg === "updated") {
      }
      setemittedData(JSON.parse(data?.data));
      console.log("message", message);
    }
  });

  // useEffect(() => {
  //   if (lastMessage !== null) {
  //     setMessageHistory((prev) => prev.concat(lastMessage));
  //   }
  // }, [lastMessage, setMessageHistory]);

  // console.log(messageHistory, 'this is message history');

  const handleClickSendMessage = useCallback(
    (payload) =>
      sendMessage(
        JSON.stringify({
          user: username,
          ...payload,
        })
      ),
    [username]
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  // console.log(setLink, 'setlink')
  return (
    <div className="Qc">
      <h1 className="video-qc-heading">Video QC</h1>

      <TileController
        setLink={setLink}
        setSbuck={setSbuck}
        emittedData={emittedData}
        setDbuck={setDbuck}
        destbucket={destbucket}
        setDestMove={setDestMove}
      />
      {link.length>0 && link?.map(([fileName, comments], index) => {
        return (
          <RowComponent
            key={index}
            comments={comments}
            setLink={setLink}
            handleClickSendMessage={handleClickSendMessage}
            destbucket={destbucket}
            emittedData={emittedData}
            item={fileName}
            sbuck={sbuck}
            dbuck={dbuck}
            index={index}
            link={link}
          />
        );
      })}
    </div>
  );
}
export default Qc;

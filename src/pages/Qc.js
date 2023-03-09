import "../App.css";
import { useEffect, useState, useCallback } from "react";
import TileController from "../components/qc/TileController";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { BASE_URL, WEB_BASE_URL } from "../constants/constant";
import RowComponent from "../components/qc/RowComponent";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import { useMutation } from "react-query";
import ClockLoader from "react-spinners/ClockLoader";
import NoDataFound from '../components/ExtraComponents/NoDataFound'
import DataTilesLoader from "../components/ExtraComponents/Loaders/DataTilesLoader";

function Qc() {
  const [link, setLink] = useState("");
  const [sbuck, setSbuck] = useState([]);
  const [dbuck, setDbuck] = useState([]);
  const [destbucket, setDestMove] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [emittedData, setemittedData] = useState();
  const [pageCount, setPageCount] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadbucket, setLoadbucket] = useState("qc2");

  const accessToken = localStorage.getItem("authToken");
  let FetchLink = async (value) => {
    const data = await fetch(`${BASE_URL}/log/getlink`, {
      method: "POST",
      body: JSON.stringify({
        bucketName: loadbucket,
        pageNumber: value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((response) => response);
    return data;
  };

  const { mutate: fetchLinkMutate, isLoading: fetchLinkLoading } = useMutation(
    FetchLink,
    {
      mutationKey: "fetchLink",
      onSuccess: (res) => {
        console.log({ res });
        setLink(res.filename);
        setPageCount(res.pagecount);
      },
    }
  );

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
    },
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


  return (
    <>
    <div className="data-section"> 
      <div className="section-header">
          <div className="section-header-1">
            <h1 className="heading-screens">Video QC</h1>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
            flexDirection: 'row'
            }}>

                  <TileController
                    setLink={setLink}
                    setSbuck={setSbuck}
                    emittedData={emittedData}
                    setDbuck={setDbuck}
                    destbucket={destbucket}
                    setDestMove={setDestMove}
                    pageNumber={pageNumber}
                    setPageCount={setPageCount}
                    setLoadbucket={setLoadbucket}
                    fetchLinkMutate={fetchLinkMutate}
                  />
                    
            </div>
          </div>
          {
            pageNumber === 1 ?
            null
            :
            <div className="pagination-class">
              <Pagination
                onChange={(e, value) => {
                  setPageNumber(value)}}
                count={pageCount}
                page={pageNumber}
                variant="outlined"
              />
            </div>
          }
        </div>
      {
        fetchLinkLoading ? 
        <DataTilesLoader/>
        :
        link?.length > 0 ?
        link?.map(([fileName, comments], index) => {
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
              fetchLinkMutate={fetchLinkMutate}
              pageNumber={pageNumber}
            />
          )
        }):
        <NoDataFound text={'No data found, may you didn\'t select any option from above'}/>
      }
    </div>
    </>
  );
}
export default Qc;

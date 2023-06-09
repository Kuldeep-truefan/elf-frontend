import "../../App.css";
import { useEffect, useRef, useState } from "react";
import { BASE_URL, WEB_BASE_URL } from "../../constants/constant";
import Pagination from "@mui/material/Pagination";
import RefreshIcon from '@mui/icons-material/Refresh';
// import useWebSocket, { ReadyState } from "react-use-websocket";

import RedoLipRowTile from "./RedoLipRowTile";
import { useQuery } from "react-query";
import DataTilesLoader from "../ExtraComponents/Loaders/DataTilesLoader";
import NoDataFound from "../ExtraComponents/NoDataFound";
import Filter from "../filter/Filter";

const RedoLipBox = ({sbuck, handleClickSendMessage, destbucket}) => {
  const [newNameCode, setNewNameCode] = useState("");
  const [open, setOpen] = useState(false);
  // const [emittedData, setemittedData] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [redoTileName, setRedoTileName] = useState([]);
  const [allData, setAllData] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingType, setLoadingType] = useState('loading');
  
  const filterRef = useRef()

  let FetchAudioRedoLipSync = async (value) => {
    setLoading(true); // Set loading before sending API request
    const data = await fetch(`${BASE_URL}/audio/get-redo-lip-files`, {
      method: "POST",
      body: JSON.stringify({
        pageNumber: value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => response.json())
    .finally(()=>{
      setLoading(false)
    })
    
    return data;
  };
  const { refetch } = useQuery(["FetchAudioRedoLipSync", pageNumber],() => FetchAudioRedoLipSync(pageNumber),
    {
      onSuccess: (res) => {
        setPageCount(res.pagecount?res.pagecount:0);
        setAllData(res.filename?res.filename:[])
      },
    }
  );

  // const [socketUrl, setSocketUrl] = useState(`${WEB_BASE_URL}/simpredocon.io/`);
  // const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
  //   onMessage: (message) => {
  //     const data = JSON.parse(message?.data);
  //     setemittedData(JSON.parse(data?.data));
  //   },
  // });

  // const connectionStatus = {
  //   [ReadyState.CONNECTING]: "Connecting",
  //   [ReadyState.OPEN]: "Open",
  //   [ReadyState.CLOSING]: "Closing",
  //   [ReadyState.CLOSED]: "Closed",
  //   [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  // }[readyState];

  // const[required,setRequired]=useState(false)
  const accessToken = localStorage.getItem("authToken");

  const handelClick = () => {
    setOpen(open);
  };

  const reloadData = () => {
    setLoadingType('loading');
    refetch();
  };

  useEffect
  (()=>{
    filterRef.current.handleFilterData()
  },[allData])

  return (
    <div className="data-section">
      <div className="section-header">
        <div className="section-header-1">
          <h1 className="heading-screens">Redo Lip Sync</h1>
          <div className="audio-refresh-btn">
            <div
              onClick={() => {
                reloadData()
              }}
            >
              <RefreshIcon/>
            </div>
          </div>
          
        <Filter data={allData}  setData={setRedoTileName} ref={filterRef} />
        </div>
        {
          pageCount === 1 || !pageCount ?
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
        loadingType === 'loading' && loading ?
        <DataTilesLoader/>
        :
       redoTileName.length > 0 ?
        redoTileName.map(({simplified_name:tileName, qc_comment:comments, namecode, vas}, index) => (
          <RedoLipRowTile
            key={`${tileName}-${index}`}
            tileName={tileName}
            comments={comments}
            nameCode={namecode}
            pageNumber={pageNumber}
            vas={vas}
            changeDataStatus={setLoadingType}
          />
        ))
      :
      <NoDataFound text={'No data found...'}/>
      }
    </div>
  );
};

export default RedoLipBox;

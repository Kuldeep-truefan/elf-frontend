import "../App.css";
import { Button, Chip, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { BASE_URL } from "../constants/constant";
import AudioModal from "../components/am/AudioModal";
import ColorCheckboxes from "../components/CheckBoxPick.js/ColorCheckboxes";
import Pagination from "@mui/material/Pagination";
// import useWebSocket, { ReadyState } from "react-use-websocket";
import { WEB_BASE_URL } from "../constants/constant";
import { useQuery } from "react-query";
import RefreshIcon from '@mui/icons-material/Refresh';
import DataTilesLoader from "../components/ExtraComponents/Loaders/DataTilesLoader";
import NoDataFound from "../components/ExtraComponents/NoDataFound";
import AudioMisTile from "../components/am/AudioMisTile";
import Filter from "../components/filter/Filter";

const AudioMispronounced = ({ item, sendFile }) => {
  const accessToken = localStorage.getItem("authToken");
  const [emittedData, setemittedData] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [misProData, setMisProData] = useState([]);
  const [allData, setAllData] = useState([])
  const [pageCount, setPageCount] = useState(1);
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [loading, setLoading] = useState(true)
  const [loadingType, setLoadingType] = useState('loading');



  const filterRef = useRef()

  // const [socketUrl, setSocketUrl] = useState(`${WEB_BASE_URL}/audiomis.io/`);
  // const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
  //   onMessage: (message) => {
  //     const data = JSON.parse(message?.data);
  //     setemittedData(JSON.parse(data?.data));
  //   },
  // }); 

  // const handleClickAndSendMessage = useCallback(
  //   (payload) =>
  //     sendMessage(
  //       JSON.stringify({
  //         user: username,
  //         ...payload,
  //       })
  //     ),
  //   [username]
  // );

  // const connectionStatus = {
  //   [ReadyState.CONNECTING]: "Connecting",
  //   [ReadyState.OPEN]: "Open",
  //   [ReadyState.CLOSING]: "Closing",
  //   [ReadyState.CLOSED]: "Closed",
  //   [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  // }[readyState];

  let FetchAudioMisTiles = async (pageNumber) => {
    setLoading(true)
    const data = await fetch(`${BASE_URL}/audio/audiomis`, {
      method: "POST",
      body: JSON.stringify({
        pageNumber,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .finally(() => {
        setLoading(false)
      })
    return data;
  };

  const { refetch } = useQuery(["FetchAudioMisTiles", pageNumber], () => FetchAudioMisTiles(pageNumber),
    {
      onSuccess: (res) => {
        setAllData(res.filename?res.filename:[])
        setPageCount(res.pagecount? res.pagecount:0);
      }
    }
  );
  const reloadData = ()=>{
    setLoadingType('loading')
    refetch()
  }

  useEffect(()=>{
    filterRef.current.handleFilterData()
  },[allData])

  return (
    <div className="data-section">
      <div className="section-header">
        <div className="section-header-1">
          <h1 className="heading-screens">Audio Mispronounced</h1>
          <div className="audio-refresh-btn">
            <div
              onClick={() => {
                reloadData();
                // console.log(filterRef.current)
                // filterRef && filterRef.current && filterRef.current.click()
              }}
            >
              <RefreshIcon />
            </div>
          </div>
          <Filter data={allData} setData={setMisProData} ref={filterRef}  />
        </div>
        {
          pageCount === 1 || !pageCount ?
            null
            :
            <div className="pagination-class">
              <Pagination
                onChange={(e, value) => {
                  setPageNumber(value)
                }}
                count={pageCount}
                page={pageNumber}
                variant="outlined"
              />
            </div>
        }
      </div>
      {
        loadingType === 'loading' && loading ?
          <DataTilesLoader />
          :
          (misProData.length > 0 ?
            misProData.map(({ simplified_name: tileName, qc_comment: comments, vas }, index) => (
              <AudioMisTile key={`${tileName}-${index}`} tileName={tileName} vas={vas} comments={comments} index={index} pageNumber={pageNumber} changeDataStatus={setLoadingType} />
            ))
            :
            <NoDataFound text={'No data found...'} />
          )
      }
    </div>
  );
};

export default AudioMispronounced;

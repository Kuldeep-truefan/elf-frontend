import React, { useState, useCallback } from "react";
// import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import "../../App.css";
import { Chip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { BASE_URL, WEB_BASE_URL } from "../../constants/constant";
import ColorCheckboxes from "../CheckBoxPick.js/ColorCheckboxes";
import { useQueryClient } from "react-query";
import VAS from "../ExtraComponents/VAS";
import { triggerError, triggerSuccess } from "../ExtraComponents/AlertPopups";

const username = localStorage.getItem("username");
const socketUrl = `${WEB_BASE_URL}/simpredocon.io/`;

const ConfirmPronRow = ({ value,vas, changeDataStatus }) => {
    const queryClient = useQueryClient();
    // const [emittedData, setemittedData] = useState("");
    const [engName, setEngName] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const accessToken = localStorage.getItem("authToken");
    const [updating, setUpdating] = useState(false)
    // const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    //     onMessage: (message) => {
    //         const data = JSON.parse(message?.data);
    //         setemittedData(JSON.parse(data?.data));
    //     },
    // });

    // const handleClickAndSendMessage = useCallback(
    //     (payload) => {
    //         if (payload.true) {
    //             sendMessage(
    //                 JSON.stringify({
    //                     user: username,
    //                     true: true,
    //                     ...payload,
    //                 })
    //             );
    //         } else {
    //             sendMessage(
    //                 JSON.stringify({
    //                     user: username,
    //                     ...payload,
    //                 })
    //             );
    //         }
    //     },
    //     [username]
    // );

    const handleChange = (event) => {
        setEngName(event.target.value);
    };

    let UpdateConfirmName = async (buttonPressed, vId) => {
        try {
            if (buttonPressed === 'Refunded' || (buttonPressed === 'Confirm Name' && engName)) {
                setUpdating(true)
                const response = await fetch(`${BASE_URL}/audio/update-confirm-pronunciation`, {
                    method: "POST",
                    body: JSON.stringify({
                        englishName: engName,
                        buttonPressed: buttonPressed,
                        videoId: vId,
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if(response.status === 200){
                    triggerSuccess()
                    changeDataStatus('fetching')
                    queryClient.invalidateQueries(["FetchConfirmPronunFiles", pageNumber]);
                }else{
                    triggerError();
                    setUpdating(false)
                }
                
            } else {
                triggerError('Enter name in the name field')
            }
        } catch (error) {
            console.log("Error occured", error);
        }
    };

    return (
        <div className={`tile ${updating ? 'action-performing' : ''}`}>
            <div className="main-tile">
                {/* <ColorCheckboxes
                    tileName={value}
                    handleClickAndSendMessage={handleClickAndSendMessage}
                /> */}
                <div className="main-tile-head">
                    <Typography
                        className="video-name"
                        sx={{
                            paddingLeft: "1rem",
                        }}
                    >
                        {value}
                    </Typography>
                    {/* {emittedData &&
                        JSON.parse(emittedData)?.filter(
                            (data) => data?.video_id === value
                        )?.length > 0 && (
                            <Chip
                                label={`In progress: ${JSON.parse(emittedData)?.filter(
                                    (data) => data?.video_id === value
                                )?.[0]?.user
                                    }`}
                                    sx={{ ml: "15px", backgroundColor: "#bcddfe", height:'unset',padding:'1px', color:'#1976d2', border:'1px solid #1976d2' }}
                            ></Chip>
                        )} */}
                    <VAS vas={vas}  />
                </div>
            </div>
            <div className="main-tiles">
                <Box
                    component="form"
                    sx={{
                        "& > :not(style)": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <input
                        type="text"
                        id="outlined-basic"
                        label="English Name"
                        variant="outlined"
                        value={engName}
                        onChange={handleChange}
                        placeholder="English name"
                    />
                </Box>
                <div className="d-flex">
                    <button
                        className="outlined-btn"
                        onClick={() => {
                            UpdateConfirmName(
                                "Refunded",
                                value.split("_")[3].split(".")[0]
                            );
                        }}
                    >
                        Refunded
                    </button>
                    <button
                        className="primary-btn"
                        onClick={() => {
                            UpdateConfirmName(
                                "Confirm Name",
                                value.split("_")[3].split(".")[0]
                            );
                        }}
                    >
                        Confirmed
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmPronRow
import React, { useState, useCallback } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import "../../App.css";
import { Button, Chip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { BASE_URL, WEB_BASE_URL } from "../../constants/constant";
import ColorCheckboxes from "../CheckBoxPick.js/ColorCheckboxes";
import { useQueryClient } from "react-query";

const username = localStorage.getItem("username");
const socketUrl = `${WEB_BASE_URL}/simpredocon.io/`;

const ConfirmPronRow = ({ value }) => {
    const queryClient = useQueryClient();
    const [emittedData, setemittedData] = useState("");
    const [engName, setEngName] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const accessToken = localStorage.getItem("authToken");
    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
        onMessage: (message) => {
            const data = JSON.parse(message?.data);
            setemittedData(JSON.parse(data?.data));
        },
    });

    const handleClickAndSendMessage = useCallback(
        (payload) => {
            if (payload.true) {
                sendMessage(
                    JSON.stringify({
                        user: username,
                        true: true,
                        ...payload,
                    })
                );
            } else {
                sendMessage(
                    JSON.stringify({
                        user: username,
                        ...payload,
                    })
                );
            }
        },
        [username]
    );

    const handleChange = (event) => {
        setEngName(event.target.value);
    };

    let UpdateConfirmName = async (buttonPressed, vId) => {
        try {
            fetch(`${BASE_URL}/audio/update-confirm-pronunciation`, {
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
            }).then(() => {
                queryClient.invalidateQueries(["FetchConfirmPronunFiles", pageNumber]);
            });
        } catch (error) {
            console.log("Error occured", error);
        }
    };
    return (
        <div className="tile">
            <div className="main-tile">
                <ColorCheckboxes
                    tileName={value}
                    handleClickAndSendMessage={handleClickAndSendMessage}
                />
                <div className="main-tile-head">
                    <Typography
                        className="video-name"
                        sx={{
                            paddingLeft: "1rem",
                        }}
                    >
                        {value}
                    </Typography>
                    {emittedData &&
                        JSON.parse(emittedData)?.filter(
                            (data) => data?.video_id === value
                        )?.length > 0 && (
                            <Chip
                                label={`In progress: ${JSON.parse(emittedData)?.filter(
                                    (data) => data?.video_id === value
                                )?.[0]?.user
                                    }`}
                                sx={{ ml: "5px", backgroundColor: "white" }}
                            ></Chip>
                        )}
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
                    <TextField
                        sx={{
                            width: { sm: 200, md: 300 },
                            "& .MuiInputBase-root": {
                                width: 250,
                            },
                        }}
                        id="outlined-basic"
                        label="English Name"
                        variant="outlined"
                        value={engName}
                        onChange={handleChange}
                    />
                </Box>
                <Button
                    variant="contained"
                    onClick={() => {
                        UpdateConfirmName(
                            "Refunded",
                            value.split("_")[3].split(".")[0]
                        );
                    }}
                    sx={{
                        height: "2.5rem",
                        backgroundColor: "#D7B8FD",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "#ad6efb",
                            color: "#fff",
                        },
                    }}
                >
                    Refunded
                </Button>
                <Button
                    onClick={() => {
                        UpdateConfirmName(
                            "Confirm Name",
                            value.split("_")[3].split(".")[0]
                        );
                    }}
                    variant="contained"
                    // disabled={isDisabled}
                    sx={{
                        height: "2.5rem",
                        // marginTop: ".46rem",
                        backgroundColor: "#D7B8FD",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "#ad6efb",
                            color: "#fff",
                        },
                    }}
                >
                    Confirmed
                </Button>
            </div>
        </div>
    )
}

export default ConfirmPronRow
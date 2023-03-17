import { Typography } from '@mui/material'
import React, { useState } from 'react'
import AudioModal from './AudioModal'

const AudioMisTile = ({ tileName, comments, changeDataStatus, pageNumber }) => {

    const [updating, setUpdating] = useState(false)
    return (
        <div  className={`tile ${updating ? 'action-performing' : ''}`}>
            <div className="main-tile">
                {/* web socket ---------- */}
                {/* <ColorCheckboxes
                tileName={tileName}
                handleClickAndSendMessage={handleClickAndSendMessage}
              /> */}
                <div className="main-tile-head">
                    <Typography
                        className="video-name"
                        // onChange={handleFolderName}
                        sx={{
                            paddingLeft: "1rem",
                        }}
                    >
                        {tileName}
                    </Typography>
                    {/* {!!emittedData && JSON.parse(emittedData)?.filter(
                  (data) => data?.video_id === tileName
                )?.length > 0 && (
                  <Chip
                    label={`In progress: ${
                      JSON.parse(emittedData)?.filter(
                        (data) => data?.video_id === tileName
                      )?.[0]?.user
                    }`}
                    sx={{ ml: "15px", backgroundColor: "#bcddfe", height:'unset',padding:'1px', color:'#1976d2', border:'1px solid #1976d2' }}
                  ></Chip>
                )} */}
                </div>
                <p className="video-name-dynamic">{comments}</p>
            </div>
            <div className="main-tiles">
                <AudioModal value={tileName} pageNumber={pageNumber} changeDataStatus={changeDataStatus}  setUpdating={setUpdating} />
            </div>
        </div>
    )
}

export default AudioMisTile
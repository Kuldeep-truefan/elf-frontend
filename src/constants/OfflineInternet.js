import React from 'react'
import { Offline, Online } from "react-detect-offline";

const OfflineInternet = () => {
  return (
    <Offline > 
      <div className="offline-compo">
        You're offline right now. Please check your connection.
      </div>
    </Offline>
  )
}

export default OfflineInternet
import React from 'react'
import { Offline, Online } from "react-detect-offline";

const OfflineInternet = () => {
  return (
    <div className="offline-compo">
    <Offline > You're offline right now. Check your connection.</Offline>
    </div>
  )
}

export default OfflineInternet
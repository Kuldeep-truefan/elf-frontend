import React from 'react';
import { Offline } from "react-detect-offline";
import useConnection from '../hooks/useConnection';

const OfflineInternet = () => {
  const [isConnected, isSlowConnection] = useConnection();
    // <Offline > 
    
      // <div className="offline-compo">
        return (
          isConnected?(
            isSlowConnection?  <div className="offline-compo">Slow internet connection</div>:null
          ):
          <div className="offline-compo">
            You're offline right now. Please check your connection.
          </div>)
        
      // </div>
    // </Offline>
}

export default OfflineInternet
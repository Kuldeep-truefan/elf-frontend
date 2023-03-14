import React, { useEffect, useState } from 'react'

const useConnection = () => {
    const [isConnected, setIsConnected] = useState(navigator.onLine);
    const [isSlowConnection, setIsSlowConnection] = useState(false);

    function handleOnline(){
        setIsConnected(true)
    }
    function handleOffline(){
        setIsConnected(false)
    }
    useEffect(()=>{
        let intervalId = null;

        function checkConnection() {
        if (navigator.connection) {
            const connection = navigator.connection;
            if (connection.effectiveType === 'slow-2g' || connection.rtt > 1000) {
            setIsSlowConnection(true);
            } else {
            setIsSlowConnection(false);
            }
        } else {
            setIsSlowConnection(false);
        }
        }

        // Check network conditions every 5 seconds
        intervalId = setInterval(checkConnection, 5000);

        window.addEventListener('online',handleOnline)
        window.addEventListener('offline',handleOffline)

        return () => {
            clearInterval(intervalId);
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
          };
    },[])
  return [isConnected, isSlowConnection]
}

export default useConnection
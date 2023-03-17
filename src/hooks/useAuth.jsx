import { useEffect, useState } from "react";

const useAuth = () => {
    const [auth, setAuth] = useState(localStorage.getItem('authToken'));
    useEffect(()=>{
      setAuth(localStorage.getItem('authToken'))
    },[auth])

    return [auth?true:false]
}

export default useAuth
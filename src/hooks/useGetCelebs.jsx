import React, { useEffect, useState } from 'react'

const useGetCelebs = () => {
    const [celebs, setCelebs] = useState([]);

    useEffect(()=>{
        fetch()
        .then((res)=>res.json())
        .then((data)=>{
            setCelebs(data)
        })
    },[])
  return [celebs]
}

export default useGetCelebs
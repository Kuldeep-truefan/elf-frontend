import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../constants/constant';

const useGetCelebsAndOccasions = (link) => {
    const [data, setData] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        async function fetchData() {
            try {
              const response = await fetch(`${BASE_URL + link}`);
              const json = await response.json();
              setData(json.data);
            } catch (error) {
            console.log(error)
            }
          }
          fetchData()
    },[link])

  return {data}
}

export default useGetCelebsAndOccasions
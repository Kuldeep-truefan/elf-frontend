import React from 'react'
import NoDataImg from '../../assets/img/no-data.png'

const NoDataFound = () => {
  return (
    <div style={{textAlign:'center'}}>
        <img src={NoDataImg} alt="No data found" style={{width:'40%'}} />
        <p>
            No data found...
        </p>
    </div>
  )
}

export default NoDataFound
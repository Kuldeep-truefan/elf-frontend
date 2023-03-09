import React from 'react'
import NoDataImg from '../../assets/img/no-data.png'

const NoDataFound = ({text}) => {
  return (
    <div style={{textAlign:'center'}}>
        <img src={NoDataImg} alt="No data found" style={{width:'40%'}} />
        <p>
            {text}
        </p>
    </div>
  )
}

export default NoDataFound
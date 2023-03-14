import React from 'react';
import NotFoundImg from '../assets/img/404.png'

const PageNotFound = () => {
  return (
    <div className='d-flex'>
      <img src={NotFoundImg} style={{minWidth:'300px',maxWidth:'500px', margin:'auto'}} />
    </div>
    )
  }

export default PageNotFound
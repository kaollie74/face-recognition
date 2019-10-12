import React, { Component } from 'react';

const FaceReognition = ({ Image }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img src={Image} alt='' width='500px' height='auto'/>
      </div>
    </div>
  )
}

export default FaceReognition;
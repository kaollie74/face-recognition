import React, { Component } from 'react';
import './FaceRecognition.css';

const FaceReognition = ({ Image, Box }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img
          id='inputImage'
          src={Image}
          alt=''
          width='500px'
          height='auto'
          
        />
        <div className='boundry-box' style={{ top: Box.topRow, right: Box.rightCol, bottom: Box.bottomRow, left: Box.leftCol}}>

        </div>
      </div>
    </div>
  )
}

export default FaceReognition;
import React, { Component } from 'react';

const Rank = ({name, entries } ) => {
  
  return (
    <>
      <div className='center white f3'>
        <p>{`${name}, your current rank is ...`}</p>
      </div>
      <div className='center white f1'>
        {`${entries}`}
      </div>
    </>
  )
}

export default Rank;
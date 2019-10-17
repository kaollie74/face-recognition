import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
  return (
    <div>
      <p className=' center f3'>
        {'This Magic Brain will detect faces in your pictures. Give it a try.'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input
            name='input'
            onChange={(event) => onInputChange(event, 'input')}
            className='f4 pa2 w-70 center'
            type='text'
          />
          <button
            className='w-30 grow f4 link ph3 pv2 dib whit bg-light-pink'
            onClick={onPictureSubmit}
          >
            Detect
          </button>
        </div>

      </div>
    </div>
  );
}

export default ImageLinkForm;
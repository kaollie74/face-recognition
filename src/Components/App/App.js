import React, { Component } from 'react';
import Particles from 'react-particles-js'
import  Clarifai  from 'clarifai';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import Rank from '../Rank/Rank';
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import './App.css';

require('dotenv').config();
const API_KEY = process.env.REACT_APP_IMAGE
const app = new Clarifai.App({
  apiKey: API_KEY
});

const particlesOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800,

      }
    }
  }
}


class App extends Component {

  state = {
    input: '',
  }

  onInputChange = (event, propsName) => {

    console.log('in onInputChange', event.target.value)
    // this.setState({
    //   input: event.target.value
    // })
  }

  onSubmit = () => {
    console.log('CLICK')

    app.models.predict(
      "a403429f2ddf4b49b307e318f00e528b", 
      "https://samples.clarifai.com/face-det.jpg")
      .then(
      function (response) {
        // do something with response
        console.log(response);
      },
      function (err) {
        // there was an error
      }
    );
  }

  render() {
    return (
      <div>
        <Particles
          className='particles'
          params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
        />
        <FaceRecognition />
      </div>
    )
  }

}

export default App;

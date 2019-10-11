import React, { Component } from 'react';
import Particles from 'react-particles-js'

// Import Components
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import Rank from '../Rank/Rank';

// Import Style sheet
import './App.css';


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
        />
        {/* <FaceRecognition /> */}
      </div>
    )
  }

}

export default App;

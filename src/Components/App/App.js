import React, { Component } from 'react';
import Particles from 'react-particles-js'
import Clarifai from 'clarifai';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import Rank from '../Rank/Rank';
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import SignIn from '../SignIn/SignIn';
import Register from '../Register/Register';
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
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: '',
      joined: new Date()
    }
  }

  // Takes data from API sets each value to a variable.
  // grabs the element id from the current image loaded
  // mathematical decides which value will postion itself around the face.
  // and returns values for css to display border around face.
  calculateFaceLocation = (data) => {
    console.log('in face location')
    const face = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)

    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)
    }

  } // end calculationFaceLocation

  displayFaceBox = (box) => {
    console.log('in displayFaceBox', box)
    this.setState({
      box: box,
    })
  }

  loadUser = (user) => {

    console.log('in load user', user)
    this.setState({
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.date
    })

  }

  onInputChange = (event, propsName) => {

    console.log('in onInputChange', event.target.value)
    this.setState({
      input: event.target.value,
    })
  }

  onRouteChange = (route) => {
    if (route === 'signedout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }

    this.setState({
      route: route
    })

  }// end onRouteChange

  onSubmit = () => {
    this.setState({
      imageUrl: this.state.input
    })

    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response => {
        // do something with response
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => {
        // there was an error
        console.log(err)
      })

  }

  render() {

    const { isSignedIn, imageUrl, route, box } = this.state;

    return (

      <div>
        <Particles
          className='particles'
          params={particlesOptions}
        />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home' ?
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition
              Image={imageUrl}
              Box={box}
            />
          </div>
          :
          this.state.route === 'signin' ?

            <SignIn onRouteChange={this.onRouteChange} />
            :
            <Register
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />



        }

      </div>

    )
  }

}

export default App;

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
import Axios from 'axios';


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

const initialState =  {
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


class App extends Component {

  

  state = initialState;

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

  // update the state with the user information we 
  // recieve from the server
  loadUser = (data) => {
    console.log('in load user', data)
    this.setState({
      user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
      }
    })

  }
  // when user enters url address to picture
  // the function activates and setState to the value
  onInputChange = (event, propsName) => {

    console.log('in onInputChange', event.target.value)
    this.setState({
      [propsName]: event.target.value,
    })
  }

  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }

    this.setState({
      route: route
    })

  }// end onRouteChange

  onPictureSubmit = () => {
    this.setState({
      imageUrl: this.state.input
    })

    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response => {
        //console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        if(response) {
          console.log( this.state.user.id )
          Axios.put('/image',  this.state.user )
          .then( response => {
            this.setState({
              user : {
                ...this.state.user,
                entries: response.data,
              }// end user
            }) // end setState
          }) // end .then
          .catch(error => {
            console.log(`error get response from server`, error)
          })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      }) // .then
      .catch(err => {
        // there was an error
        console.log(err)
      })

  }

  render() {
    console.log('this is state in App.js', this.state)
    const { isSignedIn, imageUrl, route, box, input} = this.state;

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
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}
            />
            <FaceRecognition
              Image={imageUrl}
              Box={box}
            />
          </div>
          :
          this.state.route === 'signin' ?

            <SignIn 
            onRouteChange={this.onRouteChange} 
            loadUser={this.loadUser}
            />
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

import React, { Component } from 'react';

// Import Components
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';

// Import Style sheet
import './App.css';

class App extends Component {

  render() {
    return (
      <div>
        <Navigation />
        <Logo />
        <ImageLinkForm />
        {/* <FaceRecognition /> */}
      </div>
    )
  }

}

export default App;

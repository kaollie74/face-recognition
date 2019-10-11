import React, { Component } from 'react';

// Import Components
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';

import './App.css';

class App extends Component {

  render() {
    return (
      <div>
        <Navigation />
        <Logo />
        {/* <ImageLinkForm />
        <FaceRecognition /> */}
      </div>
    )
  }

}

export default App;

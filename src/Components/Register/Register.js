import React, { Component } from 'react';

class Register extends Component {

  state = {
    name: '',
    email: '',
    password: ''
  }

  // activates when user types in on of the input boxes.
  // the propsName is the field in which the user is typing
  // event.target.value is the exact info the using types out.
  onEventChange = (event, propsName) => {
    this.setState({
      [propsName]: event.target.value
    })
  }

  onSubmit = () => {
    console.log('in onSubmit')
     //this.props.onRouteChange('home')}
  }

  render() {

    console.log('this is state', this.state)
    // destructuring so onRouteChange can be written
    // as 'onRouteChange' instead of 'this.props.onRouteChange 
    const { onRouteChange } = this.props;
    return (

      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>

              {/************************************* NAME INPUT **********************************************/}
              <div className="mt3">

                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  onChange={(event) => this.onEventChange(event, 'name')}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text" name="name" id="name"
                />
              </div>
              {/************************************* EMAIL INPUT **********************************************/}
              <div className="mt3">

                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  onChange={(event) => this.onEventChange(event, 'email')}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              {/************************************* PASSWORD INPUT **********************************************/}
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  onChange={(event) => this.onEventChange(event, 'password')}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>

            </fieldset>
            {/************************************* REGISTER BUTTON **********************************************/}
            <div className="center">
              <input
                onClick= {this.onSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>

    ) // end return 
  } // end render
} // end class

export default Register;
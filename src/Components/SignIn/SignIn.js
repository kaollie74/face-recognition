import React, { Component } from 'react';

class SignIn extends Component {

  state = {
    email: '',
    password: '',
  }

  onEmailChange = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  onPasswordChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  onSubmitSignIn = () => {

    fetch('http://localhost:5000/signin', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }) // end body
        }) // end fetch  
         .then(response =>
          response.json()
        )
        .then(data => {
          if (data === 'success') {
            this.props.onRouteChange('home')
          }

    }) // .then


  }

  render() {

    const { onRouteChange } = this.props
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label
                  className="db fw6 lh-copy f6"
                  htmlFor="email-address"
                >
                  Email
                </label>
                <input
                  onChange={(event) => this.onEmailChange(event)}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label
                  className="db fw6 lh-copy f6"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  onChange={(event) => this.onPasswordChange(event)}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>

            </fieldset>

            <div className="center">
              <input
                onClick={() => this.onSubmitSignIn()}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3 center">
              <p
                onClick={() => onRouteChange('register')}
                href="#0"
                className="f6 link dim black db pointer"
              >
                Register
              </p>

            </div>
          </div>
        </main>
      </article>

    )
  }
}

export default SignIn;
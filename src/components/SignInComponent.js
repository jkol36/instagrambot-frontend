import React, { Component } from 'react'
import firebase from 'firebase'

export default class SigninComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: null
    }
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.authWithEmail = this.authWithEmail.bind(this)
  }
  handleEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  handlePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  authWithEmail(e) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .catch(error => {
      console.log(error)
      this.setState({
        error
      })
    })
  }
  render() {
    return (
      <section id='signin-container' className="cta-form cta-light section-spacing">
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-sm-offset-4">
              <form id="cta-signin-form" className="cta-signin-form">
                <header className="section-header text-center">
                  <h2>Sign In</h2>
                </header>
                <div className="form-group">
                  <input type="email" onChange={this.handleEmail} className="form-control input-lg" id="input-email" placeholder="Email address" required/>
                </div>
                <div className="form-group">
                  <input type="password" onChange={this.handlePassword} className="form-control input-lg" id="input-password" placeholder="Password" required/>
                </div>
                <div className="text-right forgot-password"> <a href="">Forgot your password?</a> </div>
                <div className="form-btn">
                  <button onClick={this.authWithEmail} className="btn btn-primary">SIGN IN</button>
                </div>
                <h3 className="text-center">Don't have an account yet? <a href="/signup">Sign up</a></h3>
              </form>
            </div>
          </div>
          </div>
      </section>
    )
  }
}
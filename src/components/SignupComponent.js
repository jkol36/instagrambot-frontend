import React, { Component } from 'react'
import { newUser } from 'actions/auth'
import firebase from 'firebase'

export default class SignupComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      error: null
    }
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleFirstName = this.handleFirstName.bind(this)
    this.handleLastName = this.handleLastName.bind(this)
    this.signupWithEmail = this.signupWithEmail.bind(this)
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
  handleFirstName(e) {
    this.setState({
      firstName: e.target.value
    })
  }
  handleLastName(e) {
    this.setState({
      lastName: e.target.value
    })
  }
  signupWithEmail(e) {
    const { dispatch } = this.props
    e.preventDefault();
    if(this.state.firstName === '' || this.state.lastName === '') {
      this.setState({
        error: 'You must enter a first / last name'
      })
      return
    }
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((data) => {
      dispatch(newUser({
        uid:data.uid,
        email: data.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        createdAt: Date.now(),
        subscription: 'free'
      }))
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        error
      })
    })

  }
  render() {
    return (
      <section className="cta-form cta-light section-spacing">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-md-5 center-block">
              <form id="cta-signin-form" className="cta-signin-form">
                <header className="section-header text-center">
                  <h2>Sign Up</h2>
                </header>
                <div className="form-group">
                  <input type="email" onChange={this.handleEmail} className="form-control input-lg" id="input-email" placeholder="Email address" required/>
                </div>
                <div className="form-group">
                  <input type="password" onChange={this.handlePassword} className="form-control input-lg" id="input-password" placeholder="Password" required/>
                </div>
                <div className="form-group">
                  <input type="text" onChange={this.handleFirstName} className="form-control input-lg" id="input-firstname" placeholder="First Name" required/>
                </div>
                <div className="form-group">
                  <input type="text" onChange={this.handleLastName} className="form-control input-lg" id="input-lastname" placeholder="Last Name" required/>
                </div>
                <div className="text-right forgot-password"> <a href="">Forgot your password?</a> </div>
                <div className="form-btn">
                  <button onClick={this.signupWithEmail} className="btn btn-primary">SIGN UP</button>
                </div>
                <h3 className="text-center">Already have an account? <a href="/signin">Sign in</a></h3>
              </form>
            </div>
          </div>
          </div>
      </section>
    )
  }
}
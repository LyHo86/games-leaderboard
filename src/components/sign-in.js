import React, { Component } from 'react'

import { connect } from 'react-redux'
import FirebaseAuth from 'react-firebase-auth'

import { saveUser } from '../actions'

import logo from '../logo.svg'

class SignIn extends Component {
  render() {
    return (
      <div>
        <FirebaseAuth
          twitter
          github
          email
          google={{ scopes: ['https://www.googleapis.com/auth/plus.login'] }}
          facebook={{ scopes: [ 'public_profile', 'email', 'user_likes', 'user_friends' ] }}
          // 
          tosUrl='https://www.google.com'
          apiKey='AIzaSyARpP8Wx-8Bllfh6kDiidFFIbjbKNdmeeA'
          authDomain='games-leaderboard.firebaseapp.com'
          databaseURL='https://games-leaderboard.firebaseio.com'
          storageBucket='your-app.appspot.com'
          // 
          onAuthStateChanged={user => {
            console.log(user)
            this.props.saveUser(user)
          }}
        />
        <div>
          <img src={logo} alt="logo" />
          <h2>Welcome to React</h2>
          <button type="button" onClick={() => {}}>Click Me!</button>
          <p>{JSON.stringify(this.props.user)}</p>
        </div>
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

SignIn = connect(
  state => ({
    user: state.user
  }),
  dispatch => ({
    saveUser: (user) => {
      console.log('THIS IS ISDSDSDS')
      dispatch(saveUser(user))
    }
  })
)(SignIn)

export default SignIn
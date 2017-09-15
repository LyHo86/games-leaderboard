import React, { Component } from 'react'
import { connect } from 'react-redux'

import firebase from 'firebase'

import { syncUsers } from '../actions'

import '../App.css'

import StartGame from './start-game'
import SelectPlayers from './select-players'
import Versus from './versus'
import Game from './game'
import Win from './win'

var config = {
  apiKey: "AIzaSyARpP8Wx-8Bllfh6kDiidFFIbjbKNdmeeA",
  authDomain: "games-leaderboard.firebaseapp.com",
  databaseURL: "https://games-leaderboard.firebaseio.com",
  projectId: "games-leaderboard",
  storageBucket: "games-leaderboard.appspot.com",
  messagingSenderId: "158779835038"
}
firebase.initializeApp(config)

var pages = {
  'start': StartGame,
  'select-players': SelectPlayers,
  'versus': Versus,
  'game': Game,
  'win': Win,
}

class App extends Component {
  componentDidMount() {
    var starCountRef = firebase.database().ref('players');
    starCountRef.on('value', (snapshot) => {
      this.props.syncUsers(snapshot.val())
    });
  }
  render() {
    let CurrentComponent = pages[this.props.currentPage]
    return (
        <div>
          <CurrentComponent />
        </div>
    )
  }
}

App = connect(
  state => ({
    currentPage: state.navigation.currentPage
  }),
  dispatch => ({
    syncUsers: (players) => {
      console.log('syncUsers')
      dispatch(syncUsers(players))
    }
  })
)(App)

export default App

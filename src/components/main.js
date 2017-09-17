import React, { Component } from 'react'
import { connect } from 'react-redux'
import ui from 'redux-ui'

import firebase from 'firebase'

import { syncUsers } from '../actions'

import StartGame from './start-game'
import SelectPlayers from './select-players'
import Versus from './versus'
import Game from './game'
import Win from './win'
import AudioMenu from './audio-menu'

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
  constructor(props) {
    super(props)
    this.state = {
      audioIsOn: true,
      backgroundHorizontalOffset: 0,
    }
  }
  componentDidMount() {
    firebase.database().ref('players').on('value', (snapshot) => {
      this.props.syncUsers(snapshot.val())
    })
    this.interval = setInterval(() => this.setState({
      backgroundHorizontalOffset: this.state.backgroundHorizontalOffset - 5
    }), 32)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    let CurrentComponent = pages[this.props.currentPage]
    const notUseMenuMusicFor = ['game']
    return (
        <div id="main" style={{
          backgroundPosition: `${this.state.backgroundHorizontalOffset}px ${this.props.ui.backgroundVerticalOffset}px`
        }}>
          <AudioMenu muted={notUseMenuMusicFor.includes(this.props.currentPage) || !this.state.audioIsOn}/>
          {/*<button onClick={() => this.setState({ audioIsOn: !this.state.audioIsOn })}>
            {this.state.audioIsOn ? 'Mute music' : 'Turn on music'}
          </button>*/}
          <CurrentComponent />
          <div style={{ display: 'flex', flex: 1, backgroundColor: '#190a1b' }}></div>
        </div>
    )
  }
}

App = connect(
  state => ({
    currentPage: state.navigation.currentPage
  }),
  dispatch => ({
    syncUsers: (players) => dispatch(syncUsers(players))
  })
)(App)

App = ui({
  state: {
    backgroundVerticalOffset: -1000
  }
})(App)

export default App

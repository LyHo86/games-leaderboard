import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changePage } from '../actions'

class StartGame extends Component {
  render() {
    return (
        <div>
          <h1>Game</h1>
          <button onClick={this.props.start}>Start</button>
        </div>
    )
  }
}

StartGame = connect(
  state => ({
    user: state.players
  }),
  dispatch => ({
    start: () => {
      dispatch(changePage('select-players'))
    }
  })
)(StartGame)

export default StartGame

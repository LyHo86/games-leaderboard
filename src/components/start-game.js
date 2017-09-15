import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changePage } from '../actions'

class StartGame extends Component {
  render() {
    return (
        <div style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1>Start game</h1>
          <button onClick={this.props.start}>Start</button>
          <button onClick={this.props.gotoLeaderboard}>Leaderboard</button>
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
    },
    gotoLeaderboard: () => {
      dispatch(changePage('leaderboard'))
    }
  })
)(StartGame)

export default StartGame

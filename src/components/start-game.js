import React, { Component } from 'react'
import { connect } from 'react-redux'

import gameOnLogo from '../images/gameon-logo.png'
import tableTennisIcon from '../images/icon-tt.png'
import poolIcon from '../images/icon-pool.png'
import basketballIcon from '../images/icon-basketboall.png'
import leaderboardIcon from '../images/leaderboard-icon.png'

import { changePage } from '../actions'

class StartGame extends Component {
  render() {
    return (
        <div>
          <div>
            <img src={gameOnLogo} />
          </div>
          <div>
            <img src={tableTennisIcon} onClick={this.props.start} />
            <img src={poolIcon} onClick={this.props.start} />
            <img src={basketballIcon} onClick={this.props.start} />
            <img src={leaderboardIcon} onClick={this.props.gotoLeaderboard} />
          </div>
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

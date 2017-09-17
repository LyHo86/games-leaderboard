import React, { Component } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'

import gameOnLogo from '../images/gameon-logo.png'
import tableTennisIcon from '../images/icon-tt.png'
import poolIcon from '../images/icon-pool.png'
import basketballIcon from '../images/icon-basketboall.png'
import leaderboardIcon from '../images/leaderboard-icon.png'

import Leaderboard from './leaderboard'

import { changePage } from '../actions'

class StartGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topOfFooter: 0,
      leaderboardFromTop: 1000 // overdo it until you find the actual value
    }
    this.scrollToLeaderboard = this.scrollToLeaderboard.bind(this)
  }
  componentDidMount() {
    setTimeout(() => {
      let windowHeight = $(window).height()
      let bottomOfFooter = $('#start-game-footer').offset().top + $('#start-game-footer').height()
      let leaderboardFromTop = windowHeight > bottomOfFooter ? windowHeight : bottomOfFooter
      return this.setState({
        topOfFooter: $('#leaderboard').offset().top - 50,
        leaderboardFromTop: leaderboardFromTop
      })
    }, 400)
  }
  scrollToLeaderboard() {
    $('body').animate({
      scrollTop: this.state.topOfFooter
    }, 800)
  }
  render() {
    return (
        <div id='start-game'>
          <div id='start-game-header'>
            <img src={gameOnLogo} />
          </div>
          <div id='start-game-content'>
            <img src={tableTennisIcon} onClick={this.props.start} />
            <img src={poolIcon} onClick={this.props.start} />
            <img src={basketballIcon} onClick={this.props.start} />
          </div>
          <div id='start-game-footer'>
            <h2>Leaderboard</h2>
            <img src={leaderboardIcon} onClick={this.scrollToLeaderboard} />
          </div>
          <Leaderboard style={{ top: this.state.leaderboardFromTop + 80 }}/>
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

import React, { Component } from 'react'
import { connect } from 'react-redux'
import ui from 'redux-ui'

import abusiveQuotes from '../abusiveQuotes.json'

import { changePage, clearSelectedPlayers } from '../actions'

class Win extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countdown: 10
    }
    this._abusiveQuote = abusiveQuotes.abusiveQuotes[Math.round(Math.random()*100) % (abusiveQuotes.abusiveQuotes.length-1)]
  }
  componentDidMount() {
    this.props.updateUI({
      backgroundVerticalOffset: -1400
    })
    this._interval = setInterval(() => {
      this.setState({
        countdown: this.state.countdown - 1
      }, () => {
        if(this.state.countdown == 0) {
          this.props.goHome()
        }
      })
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this._interval)
    this.props.updateUI({
      backgroundVerticalOffset: -1000
    })
  }
  player1() {
    if(!this.props.result) return 
    return this.props.players[this.props.result.player1]
  }

  player2() {
    if(!this.props.result) return 
    return this.props.players[this.props.result.player2]
  }
  render() {
    let player1 = this.player1()
    let player2 = this.player2()
    let draw = false
    if(this.props.result && this.props.result.player1_score > this.props.result.player2_score) {
      player1.win = true
    }
    else if(this.props.result && this.props.result.player1_score < this.props.result.player2_score) {
      player2.win = true
    }
    else {
      draw = true
    }
    return (
      <div id="win-wrapper">
        <div id="win-players">
          <div className="win-player">
            <p>{player1 && player1.name}</p>
            <img src={player1 && player1.avatar} />
            { player1 && player1.win
              ? <p>You win!</p>
              : null }
          </div>
          <div className="win-player">
            <p>{player2 && player2.name}</p>
            <img src={player2 && player2.avatar} />
            { player2 && player2.win
              ? <p>You win!</p>
              : null }
          </div>
        </div>
        <div id="win-abusive-quote-wrapper">
          <p id="win-abusive-quote">{this._abusiveQuote}</p>
        </div>
        <div id="win-footer">
          <p className="win-nav-links" onClick={this.props.goHome}>Go home</p>
          <p className="win-nav-links" onClick={this.props.rematch}>Rematch? {this.state.countdown}</p>
        </div>
      </div>
    )
  }
}

Win = connect(
  state => ({
    players: state.players.players,
    result: state.games.lastGameResult
  }),
  dispatch => ({
    rematch: () => {
      dispatch(changePage('select-players'))
    },
    goHome: () => {
      dispatch(changePage('start'))
      dispatch(clearSelectedPlayers())
    }
  })
)(Win)

Win = ui()(Win)

export default Win

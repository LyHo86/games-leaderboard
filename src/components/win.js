import React, { Component } from 'react'
import { connect } from 'react-redux'

import abusiveQuotes from '../abusiveQuotes.json'

import { changePage } from '../actions'

class Win extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countdown: 10
    }
    this._abusiveQuote = abusiveQuotes.abusiveQuotes[Math.round(Math.random()*100) % (abusiveQuotes.abusiveQuotes.length-1)]
  }
  componentDidMount() {
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
      <div>
        <p>{player1 && player1.name}</p>
        <img src={player1 && player1.avatar} />
        { player1 && player1.win
          ? <p>You win!</p>
          : null }
        <p>{player2 && player2.name}</p>
        <img src={player2 && player2.avatar} />
        { player2 && player2.win
          ? <p>You win!</p>
          : null }
        <p>{this._abusiveQuote}</p>
        <p onClick={this.props.goHome}>Go home</p>
        <p onClick={this.props.rematch}>Rematch? {this.state.countdown}</p>
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
    }
  })
)(Win)

export default Win

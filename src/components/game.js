import React, { Component } from 'react'
import { connect } from 'react-redux'

import { createGame, deleteGame, finishGame, changePage, win } from '../actions'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      player1_score: 0,
      player2_score: 0,
    }
  }
  componentDidMount() {
    this.props.createGame(this.props.player1, this.props.player2)
  }
  componentDidUnmount() {
    this.props.deleteGame(this.props.player1, this.props.player2)
  }
  render() {
    return (
        <div>
          <h1>Game</h1>
          <div>
            <h2>Player 1: {this.props.player1.name}</h2>
            <button onClick={() => this.setState({ player1_score: this.state.player1_score + 1 })}>+</button>
            <button onClick={() => this.setState({ player1_score: this.state.player1_score - 1 })}>-</button>
            <p>{this.state.player1_score}</p>
          </div>
          <div>
            <h2>Player 2: {this.props.player2.name}</h2>
            <button onClick={() => this.setState({ player2_score: this.state.player2_score + 1 })}>+</button>
            <button onClick={() => this.setState({ player2_score: this.state.player2_score - 1 })}>-</button>
            <p>{this.state.player2_score}</p>
          </div>
          <button onClick={() => this.props.finishGame(
            this.props.player1,
            this.props.player2,
            this.state.player1_score,
            this.state.player2_score
          )}>Finish game</button>
        </div>
    )
  }
}

Game = connect(
  state => ({
    player1: state.players.players[state.players.selectedPlayers[0]],
    player2: state.players.players[state.players.selectedPlayers[1]]
  }),
  dispatch => ({
    createGame: (player1, player2) => {
      dispatch(createGame(player1, player2))
    },
    deleteGame: (player1, player2) => {
      dispatch(deleteGame(player1, player2))
    },
    finishGame: (player1, player2, player1_score, player2_score) => {
      dispatch(finishGame(player1, player2, player1_score, player2_score))
      dispatch(changePage('win'))
    }
  })
)(Game)

export default Game

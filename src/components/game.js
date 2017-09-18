import React, { Component } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'

import gameImage from '../images/scoring-bg.png'
import arrowUpIcon from '../images/arrow-up.png'
import arrowDownIcon from '../images/arrow-down.png'
import winButtonImage from '../images/win-button.png'

import punch1Audio from '../audio/punch1.wav'
import punch2Audio from '../audio/punch2.wav'

import AudioInGame from './audio-in-game'
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
        <div id="game-wrapper">
          <AudioInGame muted={false}/>
          <audio id="punch1-audio" src={punch1Audio}>
            <p>If you are reading this, it is because your browser does not support the audio element.</p>
          </audio>
          <audio id="punch2-audio" src={punch2Audio}>
            <p>If you are reading this, it is because your browser does not support the audio element.</p>
          </audio>
          <div id="game-content">
            <img className="game-avatar" src={this.props.player1.avatar} />
            <div className="game-scorer">
              <img src={arrowUpIcon} onClick={() => {
                $('#punch1-audio').trigger("play")
                this.setState({ player1_score: this.state.player1_score + 1 })
              }} />
              <p className="game-score">{this.state.player1_score}</p>
              <img src={arrowDownIcon} onClick={() => this.setState({ player1_score: this.state.player1_score - 1 })} />
            </div>
            <p className="game-score">:</p>
            <div className="game-scorer">
              <img src={arrowUpIcon} onClick={() => {
                $('#punch2-audio').trigger("play")
                this.setState({ player2_score: this.state.player2_score + 1 })
              }} />
              <p className="game-score">{this.state.player2_score}</p>
              <img src={arrowDownIcon} onClick={() => this.setState({ player2_score: this.state.player2_score - 1 })} />
            </div>
            <img className="game-avatar" src={this.props.player2.avatar} />
          </div>
          <img src={winButtonImage} onClick={() => this.props.finishGame(
            this.props.player1,
            this.props.player2,
            this.state.player1_score,
            this.state.player2_score
          )} />
          <div id="game-image">
            <img src={gameImage} />
          </div>
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

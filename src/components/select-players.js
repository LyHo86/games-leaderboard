import React, { Component } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery-easing'

import { changePage, selectPlayerToggle } from '../actions'

import gameOnLogo from '../images/gameon-logo.png'
import startImage from '../images/start.png'
import avatarDefault from '../images/avatar-default.png'

import selectionWav from '../audio/selection.wav'

const highlightImage = require('../images/avatar-border-y.png')


const unSelectedStyle = {
  position: 'relative',
  height: 150,
  width: 150
}

class SelectPlayers extends Component {
  render() {
    let currentRowIdx = 0
    let matrix = Object.keys(this.props.players).reduce((acc, username) => {
      if(acc[currentRowIdx] && acc[currentRowIdx].length >= 5) {
        currentRowIdx++
      }
      acc[currentRowIdx] = acc[currentRowIdx] || []
      acc[currentRowIdx].push(this.props.players[username])
      return acc
    }, [])

    const player1 = this.props.players[this.props.selectedPlayers[0]]
    const player2 = this.props.players[this.props.selectedPlayers[1]]
    return (
        <div id="player-select-wrapper">
          <audio id="select-player-audio" src={selectionWav}>
            <p>If you are reading this, it is because your browser does not support the audio element.</p>
          </audio>
          <div id='player-select-header'>
            <img src={gameOnLogo} />
          </div>

          <div id="player-select-content">

            <div className="side-player-select left-side-player-select">
              <h3>{player1 ? player1.name : 'Select player'}</h3>
              <img src={player1 ? player1.avatar : avatarDefault} />
            </div>

            <div id="center-player-select">
              <h1>Select Players</h1>
              <table id="select-player-table">
                {
                  matrix.map(row => {
                    return (
                      <tr>
                        {
                          row.map(player => {
                            return <td>
                              <div
                                className="select-player-avatar"
                                key={player.username}
                                onClick={this.props.selectPlayerToggle.bind(null, player.username)}>
                                <img src={player.avatar} />
                                {
                                  this.props.selectedPlayers.includes(player.username)
                                      ? <img className="highlight" src={highlightImage} />
                                      : null
                                }
                              </div>
                            </td>
                          })
                        }
                      </tr>
                    )
                  })
                }
              </table>
            </div>

            <div className="side-player-select right-side-player-select">
              <h3>{player2 ? player2.name : 'Select player'}</h3>
              <img src={player2 ? player2.avatar : avatarDefault} />
            </div>

          </div>
          <img id="start-button" src={startImage} onClick={this.props.startGame} />
        </div>
    )
  }
}

SelectPlayers = connect(
  state => ({
    players: state.players.players,
    selectedPlayers: state.players.selectedPlayers,
  }),
  dispatch => ({
    startGame: () => {
      dispatch(changePage('versus'))
    },
    selectPlayerToggle: (username) => {
      $('#select-player-audio').trigger("play")
      dispatch(selectPlayerToggle(username))
    }
  })
)(SelectPlayers)

export default SelectPlayers

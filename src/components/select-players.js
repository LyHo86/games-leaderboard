import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changePage, selectPlayerToggle } from '../actions'

const unSelectedStyle = {
  // borderRadius: 80,
  // borderWidth: 8,
  // borderColor: 'white',
  // borderStyle: 'solid',
  height: 150,
  width: 150
}

const selectedStyle = {
  // borderRadius: 80,
  // borderWidth: 8,
  // borderColor: 'yellow',
  // borderStyle: 'solid',
  height: 150,
  width: 150
}

const sideUnSelectedStyle = {
  // borderRadius: 120,
  // borderWidth: 10,
  // borderColor: 'white',
  // borderStyle: 'solid',
  height: 240,
  width: 240
}

const sideSelectedStyle = {
  // borderRadius: 120,
  // borderWidth: 10,
  // borderColor: 'yellow',
  // borderStyle: 'solid',
  height: 240,
  width: 240
}

class SelectPlayers extends Component {
  render() {
    console.log('this.props.selectedPlayers', this.props.selectedPlayers)
    console.log('this.props.players', this.props.players)
    let currentRowIdx = 0
    let matrix = Object.keys(this.props.players).reduce((acc, username) => {
      if(acc[currentRowIdx] && acc[currentRowIdx].length >= 4) {
        currentRowIdx++
      }
      acc[currentRowIdx] = acc[currentRowIdx] || []
      acc[currentRowIdx].push(this.props.players[username])
      return acc
    }, [])
    console.log('matrix', matrix)

    const player1 = this.props.players[this.props.selectedPlayers[0]]
    const player2 = this.props.players[this.props.selectedPlayers[1]]
    return (
        <div>

          

          <h1>Select Players</h1>
          <table>
            {
              matrix.map(row => {
                return (
                  <tr>
                    {
                      row.map(player => {
                        return <td>
                          <div
                            key={player.username}
                            onClick={this.props.selectPlayerToggle.bind(null, player.username)}>
                            <p>{player.name}</p>
                            <img style={ this.props.selectedPlayers.includes(player.username) ? selectedStyle : unSelectedStyle } src={player.avatar} />
                          </div>
                        </td>
                      })
                    }
                  </tr>
                )
              })
            }
          </table>
          <button onClick={this.props.startGame}>Let's fight!</button>
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
      console.log('username', username)
      dispatch(selectPlayerToggle(username))
    }
  })
)(SelectPlayers)

export default SelectPlayers

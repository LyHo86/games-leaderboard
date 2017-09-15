import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changePage, selectPlayerToggle } from '../actions'

const selectedStyle = {
  borderWidth: 4,
  borderColor: 'black',
  borderStyle: 'solid'
}

class SelectPlayers extends Component {
  render() {
    console.log('this.props.selectedPlayers', this.props.selectedPlayers)
    console.log('this.props.players', this.props.players)
    return (
        <div>
          <h1>Select Players</h1>
          <ul>
            {
              Object.keys(this.props.players).map(username => {
                return (
                  <div
                    style={ this.props.selectedPlayers.includes(username) ? selectedStyle : {} }
                    key={username}
                    onClick={this.props.selectPlayerToggle.bind(null, username)}>
                    <p>{this.props.players[username].name}</p>
                    <img style={{ height: 300, with: 400 }} src={this.props.players[username].avatar} />
                  </div>
                )
              })
            }
          </ul>
          <button onClick={this.props.start}>Start</button>
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
    start: () => {
      dispatch(changePage('select-players'))
    },
    selectPlayerToggle: (username) => {
      console.log('username', username)
      dispatch(selectPlayerToggle(username))
    }
  })
)(SelectPlayers)

export default SelectPlayers

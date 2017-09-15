import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changePage } from '../actions'

class Versus extends Component {
  render() {
    return (
        <div style={{ flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <h1>Versus</h1>
          <div style={{ flex:1, flexDireciton: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <img style={{ height: 300, with: 400 }} src={this.props.player1.avatar} />
            <span>vs.</span>
            <img style={{ height: 300, with: 400 }} src={this.props.player2.avatar} />
          </div>
          <button onClick={this.props.beginScoring}>Go</button>
        </div>  
    )
  }
}

Versus = connect(
  state => ({
    player1: state.players.players[state.players.selectedPlayers[0]],
    player2: state.players.players[state.players.selectedPlayers[1]]
  }),
  dispatch => ({
    beginScoring: () => {
      dispatch(changePage('game'))
    }
  })
)(Versus)

export default Versus

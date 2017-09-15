import React, { Component } from 'react'
import { connect } from 'react-redux'

import versusImage from '../images/versus.png'

import { changePage } from '../actions'

class Versus extends Component {
  render() {
    return (
        <div>
          <div style={{ display: 'flex', flex:1, flexDirection: 'row', justifyContent: 'space-around' }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginRight: '50px' }}>
              <h2>{this.props.player1.name}</h2>
              <img style={{ height: 400, width: 400 }} src={this.props.player1.avatar} />
            </div>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
              <img style={{ position: 'absolute', top: '20px', left: '-150px', display: 'flex', height: 400, with: 400 }} src={versusImage} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '50px' }}>
              <h2>{this.props.player2.name}</h2>
              <img style={{ height: 400, width: 400 }} src={this.props.player2.avatar} />
            </div>
          </div>
          <div style={{ display: 'flex', flex:1, flexDirection: 'row', justifyContent: 'center' }}>
            <button onClick={this.props.beginScoring}>Go</button>
          </div>
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

import React, { Component } from 'react'
import { connect } from 'react-redux'
// import $ from 'jquery'
import $ from 'jquery-easing'

import versusImage from '../images/versus.png'
import gameOnLogo from '../images/gameon-logo.png'

import { changePage } from '../actions'

class Versus extends Component {
  componentDidMount() {
    $('.versus-avatar').animate({
      left: 0
    }, {duration: 1000, easing: 'easeOutBounce'})
    setTimeout(() => {
      $('#versus-wrapper').animate({
        opacity: 0
      }, {duration: 300, easing: 'linear'})
      setTimeout(this.props.beginScoring, 600)
    }, 3500)
  }
  render() {
    return (
        <div id="versus-wrapper">

          <div id='player-select-header'>
            <img src={gameOnLogo} />
          </div>

          <div id="versus-content">
            <div id="versus-player1">
              <h2>{this.props.player1.name}</h2>
              <div className="versus-avatar-wrapper">
                <img className="versus-avatar" src={this.props.player1.avatar} />
              </div>
            </div>
            <div id="versus-image-wrapper">
              <img id="versus-image" src={versusImage} />
            </div>
            <div id="versus-player2">
              <h2>{this.props.player2.name}</h2>
              <div className="versus-avatar-wrapper">
                <img className="versus-avatar" src={this.props.player2.avatar} />
              </div>
            </div>
          </div>
          <div id="versus-footer">
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

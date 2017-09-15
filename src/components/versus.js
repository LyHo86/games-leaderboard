import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changePage } from '../actions'

class Versus extends Component {
  render() {
    return (
        <div>
          <h1>Versus</h1>
          <button onClick={this.props.start}>Start</button>
        </div>
    )
  }
}

Versus = connect(
  state => ({
    user: state.players
  }),
  dispatch => ({
    start: () => {
      dispatch(changePage('select-players'))
    }
  })
)(Versus)

export default Versus

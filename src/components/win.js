import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changePage } from '../actions'

class Win extends Component {
  render() {
    return (
        <div>
          <h1>Win!</h1>
          <button onClick={this.props.start}>Start</button>
        </div>
    )
  }
}

Win = connect(
  state => ({
    user: state.players
  }),
  dispatch => ({
    start: () => {
      dispatch(changePage('select-players'))
    }
  })
)(Win)

export default Win

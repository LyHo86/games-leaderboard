import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changePage } from '../actions'

class Home extends Component {
  render() {
    return (
        <div>
          <h1>Home</h1>
          <button onClick={this.props.start}>Start</button>
        </div>
    )
  }
}

Home = connect(
  state => ({
    user: state.players
  }),
  dispatch => ({
    start: () => {
      dispatch(changePage('select-players'))
    }
  })
)(Home)

export default Home

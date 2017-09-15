import React, { Component } from 'react'
import { connect } from 'react-redux'

import firebase from 'firebase'

import { createGame, deleteGame, finishGame, changePage, win } from '../actions'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
    	games: []
    }
  }
  componentDidMount() {
  	var gamesRef = firebase.database().ref('games')
    gamesRef.on('value', snapshot => {
      this.setState({
      	games: snapshot.val()
      })
    })
  }
  render() {
  	let leaderboard = this.state.games.reduce((acc, game) => {
  		if(!acc[game.player1]) {
  			acc[game.player1] = {
  				name: game.player1,
  				played: 0,
  				won: 0,
  				lost: 0,
  				drawn: 0
  			}
  		}
  		if(!acc[game.player2]) {
  			acc[game.player2] = {
  				name: game.player2,
  				played: 0,
  				won: 0,
  				lost: 0,
  				drawn: 0
  			}
  		}
  		acc[game.player1].played++
  		acc[game.player2].played++
  		if(game.player1_score > game.player2_score) {
  			acc[game.player1].won++
  		}
  		if(game.player1_score < game.player2_score) {
  			acc[game.player1].lost++
  		}
  		if(game.player2_score > game.player1_score) {
  			acc[game.player2].won++
  		}
  		if(game.player2_score < game.player1_score) {
  			acc[game.player2].lost++
  		}
  		if(game.player1_score == game.player2_score) {
  			acc[game.player1].drawn++
  			acc[game.player2].drawn++
  		}
  		return acc
  	}, {})
    return (
        <div style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
           <div style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <h1>Leaderboard</h1>
            <table>
            	<tr>
            		<th>Name</th>
  	          	<th>Played</th>
  	          	<th>Won</th>
                <th>Lost</th>
  	          	<th>Drawn</th>
            	</tr>
        		{ Object.keys(leaderboard).map(row => (
        			<tr>
  		          	<td>{leaderboard[row].name}</td>
  		          	<td>{leaderboard[row].played}</td>
  		          	<td>{leaderboard[row].won}</td>
                  <td>{leaderboard[row].lost}</td>
  		          	<td>{leaderboard[row].drawn}</td>
  	      		</tr>
        		)) }
            </table>
          </div>
        </div>
    )
  }
}

Game = connect(
  state => ({
    // games: state.games.savedGames
  }),
  dispatch => ({
    // createGame: (player1, player2) => {
    //   dispatch(createGame(player1, player2))
    // },
    // deleteGame: (player1, player2) => {
    //   dispatch(deleteGame(player1, player2))
    // },
    // finishGame: (player1, player2, player1_score, player2_score) => {
    //   dispatch(finishGame(player1, player2, player1_score, player2_score))
    //   dispatch(changePage('win'))
    // }
  })
)(Game)

export default Game
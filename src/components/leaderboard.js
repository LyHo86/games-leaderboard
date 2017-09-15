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
  				drawn: 0,
          points: 0
  			}
  		}
  		if(!acc[game.player2]) {
  			acc[game.player2] = {
  				name: game.player2,
  				played: 0,
  				won: 0,
  				lost: 0,
  				drawn: 0,
          points: 0
  			}
  		}
  		acc[game.player1].played++
  		acc[game.player2].played++
  		if(game.player1_score > game.player2_score) {
  			acc[game.player1].won++
  			acc[game.player1].points+=3
      }
      if(game.player1_score < game.player2_score) {
        acc[game.player1].lost++
      }
      if(game.player2_score > game.player1_score) {
        acc[game.player2].won++
        acc[game.player2].points+=3
  		}
  		if(game.player2_score < game.player1_score) {
  			acc[game.player2].lost++
  		}
  		if(game.player1_score == game.player2_score) {
  			acc[game.player1].drawn++
  			acc[game.player2].drawn++
        acc[game.player1].points+=1
        acc[game.player2].points+=1
  		}
  		return acc
  	}, {})
    console.log('leaderboard', leaderboard)
    Object.keys(leaderboard).map(username => {
      console.log('username', username)
      leaderboard[username].averagePointsPerGame = Math.round((leaderboard[username].points / leaderboard[username].played) * 10) / 10
    })
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
                <th>Points</th>
  	          	<th>Avg. pts.</th>
            	</tr>
        		{ Object.keys(leaderboard).sort((a, b) => {
              console.log('a, b', a, b)
              if(leaderboard[a].points < leaderboard[b].points) return 1
              if(leaderboard[a].points > leaderboard[b].points) return -1
              return 0
            }).map(row => (
        			<tr>
  		          	<td>{leaderboard[row].name}</td>
  		          	<td>{leaderboard[row].played}</td>
  		          	<td>{leaderboard[row].won}</td>
                  <td>{leaderboard[row].lost}</td>
                  <td>{leaderboard[row].drawn}</td>
                  <td>{leaderboard[row].points}</td>
  		          	<td>{leaderboard[row].averagePointsPerGame}</td>
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

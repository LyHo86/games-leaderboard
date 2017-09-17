import React, { Component } from 'react'
import { connect } from 'react-redux'

import firebase from 'firebase'
import $ from 'jquery'

import leaderboardTitle from '../images/Leaderboard-title.png'
import coin from '../images/coin.png'

import { createGame, deleteGame, finishGame, changePage, win } from '../actions'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
    	games: []
    }
  }
  componentDidMount() {
    firebase.database().ref('games').on('value', snapshot => {
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
    Object.keys(leaderboard).map(username => {
      leaderboard[username].averagePointsPerGame = Math.round((leaderboard[username].points / leaderboard[username].played) * 10) / 10
    })
    let position = 1
    return (
           <div id="leaderboard" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            position: 'absolute',
            ...this.props.style
          }}>
          <img src={leaderboardTitle} />
            <table id="leaderboard-table">
            	<tr>
                <th></th>
            		<th>Name</th>
  	          	<th>Played</th>
  	          	<th>Won</th>
                <th>Lost</th>
                <th>Drawn</th>
                <th>Points</th>
            	</tr>
        		{ Object.keys(leaderboard).sort((a, b) => {
              if(leaderboard[a].points < leaderboard[b].points) return 1
              if(leaderboard[a].points > leaderboard[b].points) return -1
              return 0
            }).map(row => (
        			<tr>
                  <td style={{ textAlign: 'left' }}>{position++}.</td>
  		          	<td style={{ textAlign: 'left' }}>{leaderboard[row].name}</td>
  		          	<td>{leaderboard[row].played}</td>
  		          	<td>{leaderboard[row].won}</td>
                  <td>{leaderboard[row].lost}</td>
                  <td>{leaderboard[row].drawn}</td>
                  <td><div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}><img style={{ textAlign: 'center' }} src={coin} height={40}/>{leaderboard[row].points}</div></td>
  	      		</tr>
        		)) }
            </table>
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

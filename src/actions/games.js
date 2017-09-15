import firebase from 'firebase'

export const createGame = (player1, player2) => ({
	type: 'CREATE_GAME',
	player1, player2
})

export const deleteGame = (player1, player2) => ({
	type: 'DELETE_GAME',
	player1, player2
})

export const lastGameResult = (game) => ({
	type: 'LAST_GAME_RESULT',
	game
})

export const finishGame = (player1, player2, player1_score, player2_score) => {
	return (dispatch, getState) => {
		let game = getState().games.activeGames[`${player1.username}-vs-${player2.username}`]
		firebase.database().ref('games').once('value').then(snapshot => {
			let games = snapshot.val() || []
			let result = {
				player1: player1.username,
				player2: player2.username,
				player1_score,
				player2_score
			}
			games.push(result)
			firebase.database().ref('games').set(games)
			dispatch(lastGameResult(result))
			dispatch(deleteGame(player1, player2))
		})
	}
}
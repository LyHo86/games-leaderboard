const initialState = {
	players: [],
	activeGames: {}
}

function players(state = initialState, action) {
	switch(action.type) {
		case 'CREATE_GAME': {
			let activeGames = Object.assign({}, state.activeGames)
			activeGames[`${action.player1.username}-vs-${action.player2.username}`] = {
				player1: action.player1,
				player2: action.player2,
			}
			return Object.assign({}, state, {
				activeGames: activeGames
			})
		}
		case 'DELETE_GAME': {
			let activeGames = Object.assign({}, state.activeGames)
			delete activeGames[`${action.player1.username}-vs-${action.player2.username}`]
			return Object.assign({}, state, {
				activeGames: activeGames
			})
		}
		case 'LAST_GAME_RESULT': {
			return Object.assign({}, state, {
				lastGameResult: action.game
			})
		}
		default: {
			return state
		}
	}
}

export default players
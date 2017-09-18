const initialState = {
	players: {},
	// 	richg: {
	// 		username: 'richg',
	// 		avatar: "https://firebasestorage.googleapis.com/v0/b/games-leaderboard.appspot.com/o/avatars%2Frich.png?alt=media&token=2c9b0d87-4050-403b-835c-620178f93851",
	// 		name: "Richard Garner"
	// 	},
	// 	wilsons: {
	// 		username: 'wilsons',
	// 		avatar: "https://firebasestorage.googleapis.com/v0/b/games-leaderboard.appspot.com/o/avatars%2Fwil.png?alt=media&token=94fd7989-2115-4f45-a428-1e2c1b1db82a",
	// 		name: "Wilson Su"
	// 	}
	// },
	selectedPlayers: []
}

function players(state = initialState, action) {
	switch(action.type) {
		case 'SYNC_USERS': {
			return Object.assign({}, state, {
				players: action.players
			})
		}
		case 'SELECT_PLAYER_TOGGLE': {
			let selectedPlayers = state.selectedPlayers.slice(0)
			let alreadySelectedIdx = selectedPlayers.indexOf(action.username)
			if(alreadySelectedIdx !== -1) {
				selectedPlayers.splice(alreadySelectedIdx, 1)
			} else {
				if(selectedPlayers.length <= 1) {
					selectedPlayers.push(action.username)
				}
			}
			return Object.assign({}, state, {
				selectedPlayers
			})
		}
		case 'CLEAR_SELECTED_PLAYERS': {
			return Object.assign({}, state, {
				selectedPlayers: initialState.selectedPlayers
			})
		}
		default: {
			return state
		}
	}
}

export default players
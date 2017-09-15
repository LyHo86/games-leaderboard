const initialState = {
	players: [],
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
			if(alreadySelectedIdx != -1) {
				selectedPlayers.splice(alreadySelectedIdx, 1)
			} else {
				selectedPlayers.push(action.username)
			}
			return Object.assign({}, state, {
				selectedPlayers
			})
		}
		default: {
			return state
		}
	}
}

export default players
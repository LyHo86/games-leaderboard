export const syncUsers = (players) => ({
	type: 'SYNC_USERS',
	players
})

export const selectPlayerToggle = (username) => ({
	type: 'SELECT_PLAYER_TOGGLE',
	username
})

export const clearSelectedPlayers = (username) => ({
	type: 'CLEAR_SELECTED_PLAYERS',
	username
})

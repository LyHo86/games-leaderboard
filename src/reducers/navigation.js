const initialState = {
	// currentPage: 'win'
	currentPage: 'start'
}

function navigation(state = initialState, action) {
	switch(action.type) {
		case 'CHANGE_PAGE': {
			return Object.assign({}, state, {
				currentPage: action.page
			})
		}
		default: {
			return state
		}
	}
}

export default navigation
import { combineReducers } from 'redux'
import { reducer as uiReducer } from 'redux-ui'

import navigation from './navigation.js'
import players from './players.js'
import games from './games.js'

export default combineReducers({
  navigation,
  players,
  games,
  ui: uiReducer
})
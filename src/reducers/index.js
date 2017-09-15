import { combineReducers } from 'redux'

import navigation from './navigation.js'
import players from './players.js'
import games from './games.js'

export default combineReducers({
  navigation,
  players,
  games,
})
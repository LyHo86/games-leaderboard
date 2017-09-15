import { combineReducers } from 'redux'

import navigation from './navigation.js'
import players from './players.js'

export default combineReducers({
  navigation,
  players,
})
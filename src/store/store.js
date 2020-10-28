import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gameStarted: false,
    gamePaused: false,
    gameEnded: false,
    winner: '',
    turn: 'white',
    canEnPassant: null,
    counter: null,
    clocks: [
      {
        id: 1,
        color: 'black',
        selected: false,
      },
      {
        id: 2,
        color: 'white',
        selected: false,
      }
    ]
  },
  mutations,
  getters
})

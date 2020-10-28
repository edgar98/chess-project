export default {
  startGame(state) {
    state.gameStarted = true
  },

  endGame(state) {
    state.gameEnded = true
    state.clocks.forEach(clock => clock.selected = false)
  },

  toggleSelected(state, id) {
    state.clocks.forEach(clock => clock.selected = clock.id !== id)
  },

  togglePause(state) {
    state.gamePaused = !state.gamePaused
  },

  onReset(state) {
    state.gameStarted = false
    state.gameEnded = false
    state.gamePaused = false
    state.turn = 'white'
    state.clocks.forEach(clock => clock.selected = false)
  },

  setWinner(state, id) {
    state.winner = id == 2 ? 'Black' : 'White'
    console.log(state.winner)
  },

  toggleTurn(state) {
    state.turn = state.turn == 'white' ? 'black' : 'white'
  },

  resetEnPassant(state) {
    state.canEnPassant = null
    state.counter = null
  },

  incrementCounter(state) {
    state.counter += 1
  }
}

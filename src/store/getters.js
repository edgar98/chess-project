export default {
  selectedHalf(state) {
    const selectedClock = state.clocks.find(clock => clock.selected)
    if (selectedClock) {
      return selectedClock.id === 1
        ? 'top'
        : 'bottom'
    }
  },
  gameEnded(state) {
    return state.gameEnded
  },

  winner(state) {
    return state.winner
  },

  getTurn(state) {
    return state.turn
  },

  getSelected(state) {
    const selectedClock = state.clocks.find(clock => clock.selected)
    if (selectedClock) {
      return selectedClock.id 
    }
  },

  getEnPassant(state) {
    return state.canEnPassant
  },

  getCounter(state) {
    return state.counter
  }
}

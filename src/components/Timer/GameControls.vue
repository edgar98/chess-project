<template>
  <section class='game-controls'>
    <div v-if="!gameEnded" class="pause">
      <button @click="togglePause" :class="{'is-paused' : gamePaused}">
        <span class="pause__text">pause</span>
      </button>
    </div>
    <div :class="['reset', {'reset--full-width': gameEnded}]">
      <button @click="resetGame">reset</button>
    </div>
    <div v-if='!gameStarted' class='start'>
      <button @click="onClick" :class="{'started' : gameStarted}">
        <span class="start_text">start</span>
      </button>
    </div>
  </section>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    props: ['game'],
    methods: {
      ...mapMutations([
        'togglePause',
        'onReset',
        'startGame',
        'toggleSelected'
      ]),

      onClick() {
        if (!this.gameStarted) {
          this.startGame()
          this.$emit('firstClick', this.id)
        }
        this.toggleSelected(1)
      },

      resetGame() {
        this.onReset()
        this.game.restart()
        this.game.restart()
      }
    },

    computed: {
      ...mapState([
        'gamePaused',
        'gameEnded',
        'gameStarted'
      ])
    }
  }
</script>

<!-- <style src="./game-controls.scss" lang="scss" scoped></style> -->

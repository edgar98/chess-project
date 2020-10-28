<template>
  <div id="app">
    <game />
  </div>
</template>

<script>
import Game from './components/Game.vue'

export default {
  name: 'App',
  components: {
    'game': Game
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  font: 14px "Century Gothic", Futura, sans-serif;
  margin: 20px;
  background-color: #ECECEA;
}

ol, ul {
  padding-left: 30px;
}

.status {
  margin-bottom: 10px;
}

.square {
  /* background: transparent; */
  border: 1px solid transparent;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 48px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 48px;
}

.square:focus {
  outline: none;
}

.kbd-navigation .square:focus {
  background: #ddd;
}

.game-info {
  margin-left: 20px;
}


.icons-attribution, .game-status, .fallen-soldier-block{
  margin-top: 20px;
  min-height: 50px;
}




#player-turn-box{
  width: 32px;
  height: 32px;
  border: 1px solid #000;
  margin-bottom: 10px;
}

h3{
  margin-bottom: 5px;
}
</style>

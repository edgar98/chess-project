<template>
    <div class="game-board">
        <div class="board-row" v-for='i in 8' :key=i>
            <div class="square" v-for='j in 8' :key=j>
                <Square
                    :skey = '(i - 1) * 8 + (j - 1)'
                    :keyVal='(i - 1) * 8 + (j - 1)'
                    :mystyle='squares[(i - 1) * 8 + (j - 1)] ? squares[(i - 1) * 8 + (j - 1)].style : null'
                    :shade='squareShade(i, j)'
                    :myonClick='game.handleClick'
                />
            </div>
        </div>
    </div>
</template>

<script>
import Square from './Square.vue'

export default {
    components: {
        Square
    },
    data () {
        return {
            board: []
        }
    },
    props: [
        'squares',
        'game'
    ],
    methods: {
        squareShade (i, j) {
            return (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j)) ? "light-square" : "dark-square"
        }
    }
}

function isEven(num) {
  return num % 2 === 0
}
</script>

<style>
.board-row:after {
  clear: both;
  content: "";
  display: table;
}
</style>
<template>
    <div>
        <div class="game">
            <div class="game-board">
                <Board
                    :squares='this.squares'
                    :game='this'
                />
            </div>
            <div class='timer'>
                <h4>counter: {{this.getCounter}} can: {{this.canEnPassant}}</h4>
                <GameControls 
                    :game='this'
                />
                <ChessClock
                    v-for="clock in clocks"
                    :key='clock.id'
                    :id='clock.id'
                    :selected='clock.selected'
                    @firstClick='setStartingHalf'
                />
            </div>
            <div class="game-info">
                <h3>Turn</h3>
                <div id="player-turn-box" :class="this.turn">
                </div>
                <div class="game-status">{{this.status}}</div>

                <div class="fallen-soldier-block">
                    <FallenSoldierBlock
                        :whiteFallenSoldiers='this.whiteFallenSoldiers'
                        :blackFallenSoldiers='this.blackFallenSoldiers'
                    />
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import Board from './Board.vue'
import King from '../pieces/king'
import FallenSoldierBlock from './FallenSoldierBlock.vue'
import initialiseChessBoard from '../helpers/board-initialiser.js'
import ChessClock from './Timer/ChessClock.vue'
import GameControls from './Timer/GameControls.vue'

export default {
    components: {
        Board,
        FallenSoldierBlock,
        ChessClock,
        GameControls
    },

    created () {
        this.squares = initialiseChessBoard()
    },

    data () {
        return {
            StartingHalf: null,
            squares: [],
            whiteFallenSoldiers: [],
            blackFallenSoldiers: [],
            player: 1,
            sourceSelection: -1,
            status: '',
            turn: 'white'
        }
    },

    methods: {
        restart() {
            this.StartingHalf =  null,
            this.squares = initialiseChessBoard(),
            this.whiteFallenSoldiers = [],
            this.blackFallenSoldiers = [],
            this.player = 1,
            this.sourceSelection = -1,
            this.status = '',
            this.turn = 'white',
            console.log('restarted')
        },
        setStartingHalf(id) {
            id === 1
                ? this.startingHalf = 'bottom'
                : this.startingHalf = 'top'
        },
        handleClick(i) {
            console.log(i)
        if (!this.gameStarted) {
            this.status = "Start timer to play."
            return
        }
        if (this.gameEnded) {
            this.status = "Game ended. " + 'player ' + this.winner + ' win!'
            return
        }
        if (this.turn != this.getTurn) {
            this.status = "Invalid active timer. Now " + this.turn + "'s move."
            return
        }
        if (this.gamePaused) {
            this.status = "Game is on pause."
            return
        }
        const squares_copy = [...this.squares]
        if (this.sourceSelection === -1) {
            if (!squares_copy[i] || squares_copy[i].player !== this.player) {
                this.status = "Wrong selection. Choose player " + this.player + " pieces."
                if (squares_copy[i]) {
                    squares_copy[i].style = { ...squares_copy[i].style, backgroundColor: "" };
                }
            }
            else {
                squares_copy[i].style = { ...squares_copy[i].style, backgroundColor: "RGB(111,143,114)" }; // Emerald from http://omgchess.blogspot.com/2015/09/chess-board-color-schemes.html
                this.status = "Choose destination for the selected piece",
                this.sourceSelection = i
                let temp = squares_copy[i]
            }
            return
        }

        squares_copy[this.sourceSelection].style = { ...squares_copy[this.sourceSelection].style, backgroundColor: "" };

        if (squares_copy[i] && squares_copy[i].player === this.player) {
            this.status = "Wrong selection. Choose valid source and destination again."
            this.sourceSelection = -1
        }
        else {
            const isDestEnemyOccupied = Boolean(squares_copy[i]);
            const boolSquares = squares_copy.map(function(square) {
                return Boolean(square)
            })
            const isMovePossible = squares_copy[this.sourceSelection].isMovePossible(this.sourceSelection, i, isDestEnemyOccupied, boolSquares);

                if (isMovePossible) {
                    if (squares_copy[i] !== null) {
                        if (squares_copy[i].player === 1) {
                            this.whiteFallenSoldiers.push(squares_copy[i]);
                        }
                        else {
                            this.blackFallenSoldiers.push(squares_copy[i]);
                        }
                    }
                    if (this.getCounter < 1) {
                        if (this.player == 2) {
                            if (this.canEnPassant == i - 8) {
                                console.log('black en passant')
                                this.whiteFallenSoldiers.push(squares_copy[i - 8])
                                squares_copy[i - 8] = null
                            }
                        } else {
                            if (this.canEnPassant == i + 8) {
                                console.log('white en passant')
                                this.blackFallenSoldiers.push(squares_copy[i + 8])
                                squares_copy[i + 8] = null
                            }
                        }
                    }
                    squares_copy[i] = squares_copy[this.sourceSelection];
                    squares_copy[this.sourceSelection] = null;

                    const isCheckMe = this.isCheckForPlayer(squares_copy, this.player)

                    if (isCheckMe) {
                        this.status = "Wrong selection. Choose valid source and destination again. Now you have a check!",
                        this.sourceSelection = -1
                    } else {
                        let player = this.player === 1 ? 2 : 1;
                        let turn = this.turn === 'white' ? 'black' : 'white';

                        this.sourceSelection= -1
                        this.squares = squares_copy
                        // this.whiteFallenSoldiers.push([...whiteFallenSoldiers_new])
                        // this.blackFallenSoldiers.push([...blackFallenSoldiers_new])
                        this.player = player
                        this.status = ''
                        this.turn = turn
                        this.toggleSelected(player)
                        if (this.getCounter > 0) {
                            this.resetEnPassant()
                        } else {
                            this.incrementCounter()
                        }
                    }
                }
                else {
                    this.status = "Wrong selection. Choose valid source and destination again."
                    this.sourceSelection = -1
                }
            }
        },

        getKingPosition(squares, player) {
            return squares.reduce((acc, curr, i) =>
                acc || //King may be only one, if we had found it, returned his position
                ((curr //current squre mustn't be a null
                    && (curr.getPlayer() === player)) //we are looking for aspecial king 
                    && (curr instanceof King)
                    && i), // returned position if all conditions are completed
                null)
        },

        isCheckForPlayer(squares, player) {
            const opponent = player === 1 ? 2 : 1
            const playersKingPosition = this.getKingPosition(squares, player)
            const canPieceKillPlayersKing = (piece, i) => piece.isMovePossible(playersKingPosition, i, squares)
            return squares.reduce((acc, curr, idx) =>
                acc ||
                (curr &&
                    (curr.getPlayer() === opponent) &&
                    canPieceKillPlayersKing(curr, idx)
                    && true),
                false)
        },

        ...mapMutations([
        'toggleSelected',
        'toggleTurn',
        'resetEnPassant',
        'incrementCounter'
      ])
    },

    watch: {
        gameEnded() {
            if (this.gameEnded) this.startingHalf = null
        },

        gameStarted() {
            if (!this.gameStarted) this.startingHalf = null
        },

        turn() {
            this.toggleTurn()
        }
    },

    computed: {
      ...mapState([
        'gameStarted',
        'gameEnded',
        'gamePaused',
        'clocks',
        'winner',
        'canEnPassant'
      ]),

      ...mapGetters([
        'selectedHalf',
        'getTurn',
        'getSelected', 
        'getEnPassant',
        'getCounter'
      ]),

      classObject() {
        return {
          'game-started': this.gameStarted,
          'game-ended': this.gameEnded,
          'top-started': this.startingHalf === 'top',
          'top-selected': this.selectedHalf === 'top',
          'bottom-started': this.startingHalf === 'bottom',
          'bottom-selected': this.selectedHalf === 'bottom'
        }
      }
    }
}
</script>

<style>
.white {
    background-color: white;
}
.black {
    background-color: black;
}
</style>
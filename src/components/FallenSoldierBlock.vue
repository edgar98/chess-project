<template>
    <div>
                <div class='board-row'>
                    <div class='fallen-soldier' v-for='(soldier, index) in this.whiteFallenSoldiers' :key="index">
                        <Square
                            :key='index'
                            :keyVal='index'
                            :piece='soldier'
                            :style='soldier.style'
                        />
                    </div>
                </div>

                <div class='board-row'>
                    <div class='fallen-soldier' v-for='(soldier, index) in this.blackFallenSoldiers' :key="index">
                        <Square
                            :key='index'
                            :keyVal='index'
                            :piece='soldier'
                            :style='soldier.style'
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
    props: [
        'whiteFallenSoldiers',
        'blackFallenSoldiers',
    ],
    // render (h) {
    //     return (
    //         <div>
    //             <div className="board-row">{this.whiteFallenSoldiers.map((ws, index) =>
    //                 this.renderSquare(ws, index)
    //             )}</div>
    //             <div className="board-row">{this.blackFallenSoldiers.map((bs, index) =>
    //                 this.renderSquare(bs, index)
    //             )}</div>
    //         </div>
    //     )
    // },
    // methods: {
    //     renderSquare(square, i, squareShade) {
    //         return (
    //             <Square
    //                 key={i}
    //                 keyVal={i}
    //                 piece={square}
    //                 style={square.style}
    //             />
    //         )
    //     }
    // }
}
</script>

<style>

</style>
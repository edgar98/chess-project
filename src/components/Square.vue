<script>
export default {
    props: [
        'myonClick',
        'mystyle',
        'keyVal',
        'shade',
        'skey'
    ],
    render (h) {
        return (
            <button class={"square " + this.shade}
                onClick={() => this.myonClick(this.keyVal)}
                style={this.mystyle}
                key={this.keyVal}
            >
            </button>
        )
    }
}
</script>

<style>
.square {
  background: transparent;
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
/*Board color scheme Wheat from http://omgchess.blogspot.com/2015/09/chess-board-color-schemes.html*/
.dark-square{
background-color: RGB(187,190,100);
}

.light-square{
    background-color: RGB(234,240,206);
}
</style>
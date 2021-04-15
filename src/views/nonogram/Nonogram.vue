<template>
  <section class="container">
    <div class="game-header game-header-nonogram">
      <h2>
        Nonogram
      </h2>
      <transition name="fade">
        <div id="countdown" v-if="multi">{{ timeleft }}" 🍪 x2</div>
      </transition>
      <nav class="nivells">
        <span data-level="1" @click="createLevel(1)" :class="{current:level==1}">Xupat</span>
        <span data-level="2" @click="createLevel(2)" :class="{current:level==2}">Xunguet</span>
        <span data-level="3" @click="createLevel(3)" :class="{current:level==3}">Xungot</span>
      </nav>
    </div>
    <div class="pad">
      <div :class="'nonogrid x'+size" v-if="generated">
        <span class="c q"></span>
        <span
          class="h"
          v-for="(hint, index) in columnHints"
          :key="'h'+index"
          :class="{completed:hint==columnGame[index]}"
        >
          <strong>{{ hint || 0 }}</strong>
        </span>
        <template v-for="(row,rowIndex) in matrix">
          <span
            class="r"
            :key="'r'+rowIndex"
            :class="{completed:rowHints[rowIndex]==rowGame[rowIndex]}"
          >
            <strong>{{ rowHints[rowIndex] || 0 }}</strong>
          </span>
          <span
            class="c"
            :class="{'sel':column==1,'disc':column==2}"
            v-for="(column, columnIndex) in row"
            v-touch="mark(rowIndex,columnIndex)"
            :key="rowIndex+''+columnIndex"
            v-long-press="300"
            @long-press-start="longPress(rowIndex,columnIndex)"
          ></span>
        </template>
      </div>
    </div>

    <p class="tip">Per marcar una casella amb una creu manten-la pressionada.</p>

    <transition name="fade">
      <div class="winner" v-if="winner" @click="createLevel(level)">
        <div>
          <h2>Molt bé</h2>
          <p>Has guanyat {{points}} galetes</p>
          <p class="galeta">🍪</p>
        </div>
      </div>
    </transition>
  </section>
</template>
<script>
import LongPress from 'vue-directive-long-press'
export default {
  directives: {
    'long-press': LongPress
  },
  data() {
    return {
      generated: false,
      matrix: false,
      level: 2,
      multi: true,
      multiTimer: null,
      timeleft: 0,
      solution: [],
      isSolved: false,
      winner: false,
      solved: false,
      paint: 0,
      panMode: false,
      longpressing: false
    };
  },
  computed: {
    size() {
      let sizes = {
        1: 5,
        2: 10,
        3: 10
      };
      return sizes[this.level];
    },
    points() {
      let pointsByLevel = {
        1: 2,
        2: 4,
        3: 7
      };
      var points = pointsByLevel[this.level];
      if (this.multi) points *= 2;
      return points;
    },
    columnHints() {
      let hints = [];
      for (let i in this.solution) {
        for (let j in this.solution[i]) {
          if (!hints[j]) hints[j] = [this.solution[i][j]];
          else {
            if (this.solution[i][j] == 1) hints[j][hints[j].length - 1]++;
            else hints[j].push(this.solution[i][j]);
          }
        }
      }
      return this.removeZeros(hints);
    },

    rowHints() {
      let hints = [];
      for (let i in this.solution) {
        hints.push([]);
        for (let j in this.solution[i]) {
          if (this.solution[i][j] == 1) {
            if (hints[i].length == 0) hints[i].push(1);
            else hints[i][hints[i].length - 1]++;
          } else {
            if (hints[i].length > 0) hints[i].push(0);
          }
        }
      }
      return this.removeZeros(hints);
    },
    columnGame() {
      let hints = [];
      for (let i in this.matrix) {
        for (let j in this.matrix[i]) {
          let val = this.matrix[i][j] == 1 ? 1 : 0;
          if (!hints[j]) hints[j] = [val];
          else {
            if (val == 1) hints[j][hints[j].length - 1]++;
            else hints[j].push(val);
          }
        }
      }
      return this.removeZeros(hints);
    },
    rowGame() {
      let hints = [];
      for (let i in this.matrix) {
        hints.push([]);
        for (let j in this.matrix[i]) {
          if (this.matrix[i][j] == 1) {
            if (hints[i].length == 0) hints[i].push(1);
            else hints[i][hints[i].length - 1]++;
          } else {
            if (hints[i].length > 0) hints[i].push(0);
          }
        }
      }
      return this.removeZeros(hints);
    }
  },
  watch: {
    matrix() {
      /*
      let isEqual = true;
      for (let i in this.matrix) {
        for (let j in this.matrix[i]) {
          if (
            (this.matrix[i][j] === 1 &&
              this.matrix[i][j] !== this.solution[i][j]) ||
            (this.matrix[i][j] !== 1 && this.solution[i][j] === 1)
          ) {
            isEqual = false;
            break;
          }
        }
        if (!isEqual) break;
      }
      if (isEqual) this.win();
      */
     let isEqual = true;
     for (let i = 0; i < this.size; i++) {
       if (this.rowGame[i]!=this.rowHints[i] || this.columnGame[i] != this.columnHints[i]) {
         isEqual = false;
         break;
       }
       if (!isEqual) break;
     }
     if(isEqual) this.win()
    },
    solution() {
      let matrix = [];
      for (let i = 0; i < this.size; i++) {
        matrix.push([]);
        for (let j = 0; j < this.size; j++) {
          matrix[i].push(0);
        }
      }
      this.matrix = matrix;
      this.generated = true;
    }
  },
  methods: {
    togglePanMode(val) {
      this.panMode = val;
    },
    move(e) {
      let p = e.touches[0];
      let el = document.elementFromPoint(p.clientX, p.clientY);
      let cmp = this.$children.find(c => c.$el === el);
      if (cmp) {
        console.log(cmp)
        //cmp.setActive()
      }
    },
    createLevel(level = 1) {
      this.winner = false;
      this.level = level;
      this.multi = true;
      let dificulty = {
        1: 0.5,
        2: 0.35,
        3: 0.5
      };
      let solution = [];
      for (let i = 0; i < this.size; i++) {
        solution.push([]);
        for (let j = 0; j < this.size; j++) {
          var blackwhite = Math.random() < dificulty[this.level] ? 0 : 1;
          solution[i].push(blackwhite);
        }
      }
      this.solution = solution;
      this.isSolved = false;
      this.startTimer();
    },
    mark(row, column) {
      return () => {
        if (this.longpressing) {
          this.longpressing = false; return;
        }
        if (!this.isSolved) {
          this.$set(
            this.matrix[row],
            column,
            this.toggleStatus(this.matrix[row][column])
          );
        }
      };
    },
    longPress(row,column) {
      if(!this.solved) {
        let status = this.matrix[row][column]?0:2;
        this.$set(
          this.matrix[row],
          column,
          status
        );
      }
      this.longpressing = true;
      window.navigator.vibrate(10);
      return
    },
    markSwiped(row,column) {
      return () => {
        console.log(this.paint);
        if (!this.isSolved) {
          this.$set(
            this.matrix[row],
            column,
            this.paint
          );
        }
      }
    },
    toggleStatus(val) {
      var paint = {
        0: 1,
        1: 2,
        2: 0
      }; 
      this.paint = paint[val];
      return paint[val];
    },
    removeZeros(hints) {
      // remove zeros and turn into string
      for (let i in hints) {
        hints[i] = hints[i].filter(hint => hint > 0).join(" ");
      }
      return hints;
    },
    win() {
      window.navigator.vibrate(100);
      clearInterval(this.multiTimer);
      setTimeout(() => {
        this.winner = true;
      }, 150);
      this.$store.dispatch("saveCookies",{
        cookies: this.points,
        game: 'nono'
      });
    },
    startTimer() {
      var times = {
        1: 15,
        2: 100,
        3: 180
      }
      this.timeleft = times[this.level];
      clearInterval(this.multiTimer);
      this.multiTimer = setInterval(() => {
        if (this.timeleft <= 0) {
          this.multi = false;
          clearInterval(this.multiTimer);
        }
        this.timeleft -= 1;
      }, 1000);
    }
  },
  created() {
    this.createLevel();
  }
};
</script>
<style lang="scss">
.game-header-nonogram {
  margin-bottom: 40px;
  background: blue;
  height: 100px !important;
  background-image: url("../../scss/img/nonogram.jpg");
}
.nonogrid {
  width: 100%;
  display: grid;
  position: relative;
  //grid-gap: 1px;
  span.h {
    padding-top: 200%;
    position: relative;
    background: #FFF;
    line-height: 1;
    border-radius: 10px 10px 0 0;
    background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgb(224, 226, 231) 100%);
    //border-left: 1px solid #fff;
    border-right: 1px solid #FFF;
    strong {
      width: 5px;
    }
  }
  span.c {
    padding-top: 100%;
    //box-shadow: 0 0 2px #ccc inset;
    border-width: 0 1px 1px 0;
    border-color: rgb(224, 226, 231);
    border-style: solid;
  }
  span.q {
    background: #fff !important;
    border: 0 !important;
    box-shadow: none;
  }
  span.r {
    border-radius: 10px 0 0 10px;
    padding-top: 50%;
    position: relative;
    //background: linear-gradient(90deg, #FFF 70%, #efefef 100%);
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgb(224, 226, 231) 100%);
    //box-shadow: 0 0 5px #ddd inset;
    
    strong {
      min-width: 70px;
    }
  }
  strong {
    position: absolute;
    display: block;
    top: 50%;
    left: 50%;
    font-size: 12px;
    transform: translate(-50%, -50%);
  }
  span {
    background: #fff;
    display: block;
    height: 0;
    &.completed {
      color: rgb(158, 164, 179);
      background: rgb(224, 226, 231);
      box-shadow: none;
    }
    &.sel {
      background: #000 !important;
    }
    &.disc {
      background-image: url("../../scss/img/cross.svg");
      background-size: cover;
    }
  }
  &.x5 {
    grid-template-columns: 2fr repeat(5, 1fr);
    grid-column-start: 1;
    grid-column-end: 6;
    grid-row-start: 1;
    grid-row-end: 6;
    strong {
      font-size: 15px;
    }
  }
  &.x10 {
    grid-template-columns: 2fr repeat(10, 1fr);
    grid-column-start: 1;
    grid-column-end: 11;
    grid-row-start: 1;
    grid-row-end: 11;
    &:before {
      position: absolute;
      content: "";
      display: block;
      width: 83.33%;
      height: 2px;
      background: rgb(90, 92, 99);
      top: 57.8%;
      right: 0;
      z-index: 10;
    }
    &:after {
      position: absolute;
      content: "";
      display: block;
      height: 83.4%;
      width: 2px;
      background: rgb(90, 92, 99);
      left: 58.1%;
      bottom: 0;
      z-index: 10;
    }
  }
  &.x15 {
    grid-template-columns: 2fr repeat(15, 1fr);
    grid-column-start: 1;
    grid-column-end: 16;
    grid-row-start: 1;
    grid-row-end: 16;
  }
}
</style>
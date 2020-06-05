<template>
  <section class="container">
    <div class="game-header game-header-nonogram">
      <h2>Nonogram <small>BETA</small></h2>
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
        <span class="h" v-for="(hint, index) in columnHints" :key="'h'+index">
          <strong>{{ hint || 0 }}</strong>
        </span>
        <template v-for="(row,rowIndex) in matrix">
          <span class="r" :key="'r'+rowIndex">
            <strong>{{ rowHints[rowIndex] || 0 }}</strong>
          </span>
          <span
            class="c"
            :class="{'sel':column==1,'disc':column==2}"
            v-for="(column, columnIndex) in row"
            @click="mark(rowIndex,columnIndex)"
            :key="rowIndex+''+columnIndex"
          ></span>
        </template>
      </div>
    </div>

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
export default {
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
      winner: false
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
        1: 1,
        2: 4,
        3: 6
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
    }
  },
  watch: {
    matrix() {
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
    },
  },
  methods: {
    createLevel(level = 1) {
      this.winner = false;
      this.level = level;
      this.multi = true;
      let dificulty = {
        1: 0.5,
        2: 0.35,
        3: 0.5
      }
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
      if (!this.isSolved) {
        this.$set(
          this.matrix[row],
          column,
          this.toggleStatus(this.matrix[row][column])
        );
      }
    },
    toggleStatus(val) {
      if (val == 0) {
        return 1;
      }
      if (val == 1) {
        return 2;
      }
      if (val == 2) {
        return 0;
      }
    },
    removeZeros(hints) {
      // remove zeros and turn into string
      for (let i in hints) {
        hints[i] = hints[i].filter(hint => hint > 0).join(" ");
      }
      return hints;
    },
    win() {
      clearInterval(this.multiTimer);
      this.winner = true;
      this.$store.dispatch('saveCookies',this.points)
    },
    startTimer() {
      this.timeleft = this.level * 40;
      clearInterval(this.multiTimer);
      this.multiTimer = setInterval(() => {
        if (this.timeleft <= 0) {
          this.multi = false;
          clearInterval(this.multiTimer);
        }
        this.timeleft -= 1;
      }, 1000);
    },
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
  background-image: url("../../scss/img/nonogram.jpg")
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
    background: #EEE;
    border-left: 1px solid #FFF;
    strong {
      width: 5px;
    }
  }
  span.c {
    padding-top: 100%;
    border-bottom: #ccc 1px solid;
    border-right: #ccc 1px solid;
  }
  span.q {
    background: #FFF !important;
    border: 0 !important
  }
  span.r {
    border-radius: 10px 0 0 10px;
    padding-top: 50%;
    position: relative;
    background: #EEE;
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
    transform: translate(-50%,-50%);
  }
  span {
    background: #fff;
    display: block;
    height: 0;
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
      content: '';
      display: block;
      width: 83.33%;
      height: 2px;
      background: #999;
      top: 57.6%;
      right: 0;
      z-index: 10;
    }
    &:after {
      position: absolute;
      content: '';
      display: block;
      height: 83.5%;
      width: 2px;
      background: #999;
      left: 57.8%;
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
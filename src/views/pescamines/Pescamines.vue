<template>
  <section class="container">
    <div class="game-header game-header-pescamines">
      <h2>
        Pescamines
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
      <div :class="'minegrid x'+size" v-if="generated">
        <template v-for="(row,rowIndex) in matrix">
          <span
            class="c"
            :class="{'sel':column==1,'disc':column==2}"
            v-for="(column, columnIndex) in row"
            v-touch="mark(rowIndex,columnIndex)"
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
      winner: false,
      solved: false,
      paint: 0,
      panMode: false,
    };
  },
  computed: {
    size() {
      let sizes = {
        1: 8,
        2: 8,
        3: 8
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
        if (!this.isSolved) {
          this.$set(
            this.matrix[row],
            column,
            this.toggleStatus(this.matrix[row][column])
          );
        }
      };
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
      clearInterval(this.multiTimer);
      setTimeout(() => {
        this.winner = true;
      }, 150);
      this.$store.dispatch("saveCookies",{
        cookies: this.points,
        game: 'mines'
      });
    },
    startTimer() {
      var times = {
        1: 40,
        2: 120,
        3: 200
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
.game-header-pescamines {
  margin-bottom: 40px;
  background: blue;
  height: 100px !important;
  background-image: url("../../scss/img/pescamines.jpg");
}
.minegrid {
  width: 100%;
  display: grid;
  position: relative;
  //grid-gap: 1px;
  span.h {
    padding-top: 200%;
    position: relative;
    background: #FFF;
    box-shadow: 0 0 5px #ddd inset;
    line-height: 1;
    border-radius: 10px 10px 0 0;
    background: linear-gradient(180deg, #FFF 70%, #efefef 100%);
    //border-left: 1px solid #fff;
    strong {
      width: 5px;
    }
  }
  span.c {
    padding-top: 100%;
    box-shadow: 0 0 2px #ccc inset;
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
    background: linear-gradient(90deg, #FFF 70%, #efefef 100%);
    box-shadow: 0 0 5px #ddd inset;
    
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
      color: #bbb;
      background: #eee;
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
  &.x8 {
    grid-template-columns: repeat(8, 1fr);
    grid-column-start: 1;
    grid-column-end: 11;
    grid-row-start: 1;
    grid-row-end: 11;
  }
}
</style>
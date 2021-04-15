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
      <div :class="'minegrid x'+size">
          <pescamines-cell
            v-for="(cell, i) in grid"
            :key="i"
            :cell="cell"
            @click.native="clickCell(cell, i)"
            v-long-press="300"
            @long-press-start="longPressCell(cell)"
            
          ></pescamines-cell>
      </div>
      <div class="mineoptions">
        <button class="btn btn-flag" @click="toggleFlag()" :class="{checked: isFlag}"></button>
        <span class="minecounter" v-if="!finished||(finished&&winner)">{{bombCount}}</span>
        <span class="lose" v-if="!winner&&finished" @click="createLevel()">😿</span>
        <button class="btn btn-new" @click="createLevel()"></button>
      </div>
    </div>

    <p class="tip">Per posar una bandera a una casella manten-la pressionada.</p>

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
import PescaminesCell from './PescaminesCell.vue';
import LongPress from 'vue-directive-long-press'
export default {
  directives: {
    'long-press': LongPress
  },
  components: {
    PescaminesCell,
  },
  data() {
    return {
      generated: false,
      matrix: false,
      level: 1,
      multi: true,
      multiTimer: null,
      timeleft: 0,
      finished: false,
      winner: false,
      grid: [],
      bombCount: 0,
      isFlag: false,
      longpressing: false
    };
  },
  computed: {
    size() {
      let sizes = {
        1: 9,
        2: 12,
        3: 14
      };
      return sizes[this.level];
    },
    cols() {
      return this.size;
    },
    rows() {
      return this.size;
    },
    bombs() {
      let bombs = {
        1: 10,
        2: 20,
        3: 35
      };
      return bombs[this.level];
    },
    points() {
      let pointsByLevel = {
        1: 3,
        2: 5,
        3: 8
      };
      var points = pointsByLevel[this.level];
      if (this.multi) points *= 2;
      return points;
    },
  },
  methods: {
    createLevel(level = this.level) {
      this.winner = false;
      this.level = level;
      this.multi = true;
      let grid = [];
      let bombs = this.bombs;
      let size = this.size*this.size;
      for (let i = 0; i < size; i += 1) {
        grid.push({
          hasBomb: false,
          isOpen: false,
          hasFlag: false,
          bombCount: 0,
          neighborhood: null,
        });
      }
      while (bombs > 0) {
        const num = Math.floor(Math.random() * size);
        if (grid[num].hasBomb === false) {
          bombs -= 1;
          grid[num].hasBomb = true;
        }
      }
      this.grid = grid;
      this.finished = false;
      this.bombCount = this.bombs;
      this.startTimer();
    },
    toggleFlag(){
      this.isFlag = !this.isFlag;
    },
    clickCell(cell,i) {
        if(this.longpressing) {
          this.longpressing = false;
          return;
        }
        if (this.finished) {
          return;
        }
        if (cell.isOpen) {
          return;
        }
        if(this.isFlag) {
          this.longPressCell(cell)
          return;
        }
        
        if (cell.hasFlag) {
          return;
        }
        
        if (cell.hasBomb) {
          // todo bomb!
          const { grid } = this;
          grid.forEach((checkCell) => {
            if (checkCell.hasBomb) {
              checkCell.isOpen = true;
            }
          });
          this.finished = true;
          clearInterval(this.multiTimer);
          window.navigator.vibrate(200);
          return;
        }
        this.setNeighborhood(cell, i);
        cell.isOpen = true;
        this.checkNeighborhood(cell);
        this.haveWeWon();
      
    },
    longPressCell(cell) {
      if(!this.bombCount || cell.isOpen) {
        return 
      }
      cell.hasFlag = !cell.hasFlag;
      const { grid } = this;
      const flagCount = grid.reduce((accumulator, currentValue) => {
        if (currentValue.hasFlag) {
          return accumulator + 1;
        }
        return accumulator;
      }, 0);
      this.bombCount = this.bombs - flagCount;
      window.navigator.vibrate(10);
      this.haveWeWon();
      this.longpressing = true;
    },
    checkNeighborhood(cell, force) {
      if (cell.bombCount !== 0 && force !== true) {
        return;
      }
      const { grid } = this;
      cell.neighborhood.forEach((i) => {
        this.clickCell(grid[i], i);
      });
    },
    setNeighborhood(cell, i) {
      if (cell.neighborhood !== null) {
        return;
      }
      const { grid } = this;
      const neighborhood = [];
      let bombCount = 0;
      for (let x = -1; x < 2; x += 1) {
        for (let y = -1; y < 2; y += 1) {
          const cellIndex = this.getIndex(i, x, y);
          if (cellIndex !== false) {
            neighborhood.push(cellIndex);
            if (grid[cellIndex].hasBomb) {
              bombCount += 1;
            }
          }
        }
      }
      cell.bombCount = bombCount;
      cell.neighborhood = neighborhood;
    },
    haveWeWon() {
      if (this.finished) {
        return;
      }
      if (this.bombCount !== 0) {
        return;
      }
      const remainingGrid = this.grid.find(g => !g.isOpen && !g.hasFlag);
      if (!remainingGrid) {
        this.win()
      }
    },
    getIndex(i, x, y) {
      const { cols, rows } = this;
      if (x === 0 && y === 0) {
        return false;
      }
      if ((i % cols) + x < 0 || (i % cols) + x >= cols) {
        return false;
      }
      if (Math.floor(i / cols) + y < 0 || Math.floor(i / cols) + y >= rows) {
        return false;
      }
      return i + (y * cols + x);
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
        this.finished = true;
        this.winner = true;
      }, 150);
      this.$store.dispatch("saveCookies",{
        cookies: this.points,
        game: 'mines'
      });
    },
    startTimer() {
      var times = {
        1: 75,
        2: 120,
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
.game-header-pescamines {
  margin-bottom: 40px;
  height: 100px !important;
  background-image: url("../../scss/img/pescamines.jpg");
}
.minegrid {
  width: 100%;
  display: grid;
  position: relative;
  //grid-gap: 1px;
  border-spacing: 0;
  grid-gap:5px;
  &:before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
  > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
  span {
    &.completed {
      color: #bbb;
      background: #eee;
      box-shadow: none;
    }
  }
  &.x9 {
    grid-template-columns: repeat(9, 1fr);
  }
  &.x12 {
    grid-template-columns: repeat(12, 1fr);
  }
  &.x14 {
    grid-template-columns: repeat(14, 1fr);
  }
}
.mineoptions {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .btn-new {
    width: 42px;
    height: 42px;
    background-size: 60% auto;
    background-position: center;
    background-repeat: no-repeat;
  }
  .btn-flag {
    width: 42px;
    height: 42px;
    background-image: url("../../scss/img/flag.svg");
    background-size: 60% auto;
    background-position: center;
    background-repeat: no-repeat;
    &.checked {
      background-color: yellow;
      box-shadow: 0 0 0 rgba(0,0,0,0) !important;
    }
  }
}
.minecounter {
  width: auto;
  padding-top: 15px;
  padding-right: 30px;
  background-image: url("../../scss/img/bomb.svg");
  background-size: 20px 20px;
  background-position: right center;
  background-repeat: no-repeat;
}
.lose {
  font-size: 42px;
}

</style>
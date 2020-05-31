<template>
  <section class="container">
    <div class="game-header game-header-boles">
      <h2>Les Boles de l'Eladi</h2>

      <transition name="fade">
        <div id="countdown" v-if="multi">{{ timeleft }}" 🍪 x2</div>
      </transition>

      <nav class="nivells">
        <span data-level="1" @click="createLevel(1)" :class="{current:level==1}">Fase 0</span>
        <span data-level="2" @click="createLevel(2)" :class="{current:level==2}">Fase 0,5</span>
        <span data-level="3" @click="createLevel(3)" :class="{current:level==3}">Fase 1</span>
      </nav>
    </div>

    <div class="game pad">
      <div
        class="tube"
        :data-tube="i"
        v-for="(tube,i) in tubes"
        :key="i"
        v-touch="select(i)"
        :class="[{checked: selected==i},{completed: tube.completed}]"
      >
        <ball v-bind:color="bola" v-for="(bola,b) in tube.balls" :key="b">{{bola}}</ball>
      </div>
    </div>

    <div class="controls pad">
      <button class="btn btn-reset" @click="reset()"></button>
      <button class="btn btn-undo" @click="undo()"></button>
      <button class="btn btn-newtube" @click="addTube()"></button>
      <button class="btn btn-new" @click="createLevel(level)"></button>
    </div>
    <div class="controls pad">
      <button class="btn" @click="darkmode()">Dark mode</button>
      <button class="btn" @click="dracmode()">Drac mode</button>
    </div>

    <transition name="fade">
      <div class="winner" v-if="winner" @click="createLevel(level)">
        <div>
          <h2>Molt bé</h2>
          <p>Has guanyat {{galetext[points]}}</p>
          <p class="galeta">🍪</p>
        </div>
      </div>
    </transition>
    
  </section>
</template>
<script>
import Tube from './tube'
import Ball from './Ball'
export default {
  components: {
    'ball': Ball
  },
  data() {
    return {
      balls: [],
      tubes: [],
      steps: [],
      cheat: false,
      multi: true,
      level: 2,
      levels: {
        1: {
          colors: 7,
          tubes: 9
        },
        2: {
          colors: 9,
          tubes: 11
        },
        3: {
          colors: 12,
          tubes: 14
        }
      },
      timeleft: 40,
      multiTimer: null,
      selected: null,
      winner: false,
      galetext: {
        0: "un aplauso",
        1: "una galeteta",
        2: "dues galetetes",
        3: "tres galetes",
        4: "4 galetones",
        5: "5 galetaques",
        6: "6 galetotes",
        8: "8 galetamens",
        10: "10 galetamens\nEts el Déu de les galetes!"
      },
    };
  },
  created() {
    this.createLevel();
  },
  computed: {
    points() {
      let pointsByLevel = {
        1: 1,
        2: 3,
        3: 5
      };
      var points = pointsByLevel[this.level];
      if (this.cheat) points -= 1;
      if (this.multi) points *= 2;
      return points;
    }
  },
  methods: {
    setDefaults() {
      this.winner = false;
      this.balls = [];
      this.tubes = [];
      this.steps = [];
      this.cheat = false;
      this.multi = true;
      this.selected = null;
    },
    createLevel(level = 2) {
      this.setDefaults();
      this.level = level;
      for (let i = 0; i < this.levels[level].tubes; i++) {
        this.tubes.push(new Tube());
      }
      for (let i = 0; i < this.levels[level].colors; i++) {
        for (let j = 0; j < 4; j++) {
          this.balls.push(i);
        }
      }
      this.balls.sort(() => Math.random() - 0.5);
      this.setBalls();
      this.startTimer();
    },
    select(ball) {
      return () => {
        if (this.selected != null) {
          if (this.selected == ball) {
            this.selected = null;
            return false;
          } else {
            this.changeBall(this.selected, ball);
            this.selected = null;
          }
        } else {
          this.selected = ball;
        }
      }
    },
    changeBall(origin, destiny) {
      if (this.tubes[destiny].balls.length < 4) {
        let originBall = this.tubes[origin].lastBall();
        let destinyBall = this.tubes[destiny].lastBall();

        if (!this.tubes[destiny].balls.length || destinyBall == originBall) {
          this.tubes[destiny].pushBall(originBall);
          this.tubes[origin].popBall();

          this.steps.push([origin, destiny]);

          if (
            this.tubes.filter(t => t.completed == 1).length ==
            this.balls.length / 4
          ) {
            this.win();
          }
        }
      }
    },

    addTube() {
      if (!this.cheat) {
        this.tubes.push(new Tube());
        this.cheat = true;
      }
    },

    undo() {
      if (this.steps.length) {
        let lastStep = this.steps.pop();
        let origin = lastStep[0];
        let destiny = lastStep[1];
        this.tubes[origin].pushBall(this.tubes[destiny].lastBall());
        this.tubes[destiny].popBall();
      }
    },

    setBalls() {
      let t = 0;
      this.balls.forEach(ball => {
        let gi = Math.floor(t / 4);
        this.tubes[gi].pushBall(ball);
        t++;
      });
    },

    reset() {
      this.tubes.forEach(tube => {
        tube.balls = [];
        tube.completed = 0;
      });
      this.steps = [];
      this.setBalls();
    },

    win() {

      clearInterval(this.multiTimer);
      this.$store.dispatch('saveCookies',this.points)
      setTimeout(() => {
        this.winner = true;
      }, 100);

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

    darkmode() {
      const el = document.body;
      if (el.classList.contains("darkmode")) {
        el.classList.remove("darkmode")
      } else {
        el.classList.add("darkmode");
      }
    },

    dracmode() {
      const el = document.body;
        if (el.classList.contains("dracmode")) {
          el.classList.remove("dracmode")
        } else {
          el.classList.add("dracmode");
      }
    }

  }
};
</script>
<style lang="scss">
.nivells {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
  span {
    flex-grow: 1;
    cursor: pointer;
    border-radius: 5px 5px 0 0;
    padding: 6px 10px;
    color: #fff;
    &.current {
      background: #fff;
      color: #000;
    }
  }
}
</style>
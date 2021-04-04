<template>
  <section class="container">
    <div class="game-header game-header-mastermind">
      <h2>
        Mastermind
      </h2>
      <transition name="fade">
        <div id="countdown" v-if="multi">{{ timeleft }}" 🍪 x2</div>
      </transition>
    </div>

    <div class="mmboard">
      <div class="mmcode" :class="!(winner||loser)?'hidden':''">
          <span class="mmb" v-for="(color,i) in code" :key="i" :class="'color'+color">?</span>
          <button class="btn btn-new" @click="createLevel()"></button>
      </div>
      <div class="mmguesses">
        <div class="mmguess" v-for="(comb,i) in guess" :key="'comb'+i">
          <div class="ballcontainer">
            <span class="mmb" v-for="(color,c) in comb" :key="'comb'+i+c" :class="'color'+color"></span>
          </div>
          <div class="hint" v-if="comb.length==4">
            <span class="hintball" :class="'h'+h" v-for="(h,hi) in hints[i]" :key="'h'+i+hi"></span>
          </div>
        </div>
      </div>
      <div class="mmballs">
        <span class="mmb color0" @click="setBall(0)"></span>
        <span class="mmb color1" @click="setBall(1)"></span>
        <span class="mmb color2" @click="setBall(2)"></span>
        <span class="mmb color3" @click="setBall(3)"></span>
        <span class="mmb color4" @click="setBall(4)"></span>
        <span class="mmb color5" @click="setBall(5)"></span>
        <button class="btn btn-undo" @click="undo()"></button>
      </div>
    </div>

    <transition name="fade">
      <div class="winner" v-if="winner" @click="createLevel()">
        <div>
          <h2>Molt bé</h2>
          <p>Has guanyat {{points}} galetes</p>
          <p class="galeta">🍪</p>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div class="winner loser" v-if="loser" @click="createLevel()">
        <div>
          <h2>Uuuh!</h2>
          <p>No ho has aconseguit.</p>
          <p class="galeta">😿</p>
        </div>
      </div>
    </transition>

  </section>
</template>
<script>
export default {
  data() {
    return {
      multi: true,
      multiTimer: null,
      timeleft: 0,
      guesses: 0,
      guess: [[],[],[],[],[],[],[],[]],
      code: [],
      winner: false,
      loser: false
    };
  },
  computed: {
    points() {
      var points = (9-this.guesses);
      if (this.multi) points *= 2;
      return points;
    },
    hints() {
      let hints = [];
      this.guess.forEach((balls,g)=>{
          var copycode = [...this.code];
          hints[g] = []
          balls.forEach((ball,i)=>{
            if(copycode[i]==ball) {
              copycode[i] = -1;
              hints[g].push(2)
            }
          })
          balls.forEach((ball,j)=>{
            if (copycode.includes(ball)) {
              hints[g].push(1)
              copycode[copycode.indexOf(balls[j])] = -1;
            }
          })
          hints[g].sort().reverse()
      });
      return hints
    }
  },
  methods: {
    createLevel() {
      this.code = []
      this.guess = [[],[],[],[],[],[],[],[]];
      this.guesses = 0;
      for(let i = 0; i<4; i++) {
        this.code.push(Math.floor(Math.random() * 6));
      }
      this.winner = false;
      this.loser = false;
      this.multi = true;
      this.startTimer();
    },
    setBall(color) {
      this.guess[this.guesses].push(color);
      if(this.guess[this.guesses].length==4) {
        if(JSON.stringify(this.guess[this.guesses])==JSON.stringify(this.code)) {
          this.win()
          console.log("uwah")
        } else {
          this.guesses++
          if(this.guesses>7) {
            this.lose()
          }
        }
      }
    },
    undo() {
      this.guess[this.guesses].pop();
    },
    win() {
      clearInterval(this.multiTimer);
      setTimeout(() => {
        this.winner = true;
      }, 150);
      this.$store.dispatch("saveCookies",{
        cookies: this.points,
        game: 'master'
      });
    },
    lose() {
      clearInterval(this.multiTimer);
      setTimeout(() => {
        this.loser = true;
      }, 150);
    },
    startTimer() {
      this.timeleft = 90;
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
.game-header-mastermind {
  margin-bottom:0;
  height: 100px !important;
  background-image: url("../../scss/img/mastermind.jpg");
}
.mmboard {
  text-align: left;
  height: calc(100vh - 196px);
  .mmcode {
    height: 10%;
    width: 100%;
  }
  .mmballs {
    height: 15%;
  }
  .mmguesses {
    height: 75%;
    .mmguess {
      height: 12.5%;
    }
  }
}
.mmb {
  display: inline-block;

  width: 34px;
        height: 34px;
        border-radius: 30px;
        padding-top: 6px;
        color: rgba(#000,.4);
        text-align: center;
        font-size: 14px;
        line-height: 22px;
  margin: 0 10px 0;
  &.color0 { background: #E71F1F; }
  &.color1 { background: #355FDC; }
  &.color2 { background: #85E631; color: rgba(#000,.2);}
  &.color3 { background: #FBDD23; color: rgba(#000,.2);}
  &.color4 { background: #B622DC; }
  &.color5 { background: #F37D26; }
  -webkit-animation: bounceIn .4s;
  -o-animation: bounceIn .4s;
  animation: bounceIn .4s;
}
.mmcode {
  background: #eee;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 40px;
  border-bottom: 2px solid #000;
  position: relative;
  &.hidden .mmb { background: #ddd; } 
  .btn {
        display: block;
        position: absolute;
        top: 6px;
        right: 30px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: auto 25px;
        height: 40px;
    }
}
.mmguess {
  position: relative;
  height: 50px;
  order: -1;
  border-bottom: 1px solid #eee;
  display: flex;

}
.mmguesses {
  display: flex;
  flex-direction: column-reverse;
}
.mmballs {
  display: flex;
  align-items: center;
  padding-left: 30px;
  padding-bottom: 12px;
  position: relative;
  border-top: 2px solid #000;
  .mmb {
    margin: 0 7px;
  }
  .btn {
        display: block;
        position: absolute;
        right: 30px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: auto 25px;
        height: 40px;
    }
}
.hint {
  margin-left: 0;
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eee;
  .hintball {
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    margin: 0 5px;
    &.h0 {
      background: #FFF;
    }
    &.h1 {
      background: #fff;
    }
    &.h2 {
      background: #333;
    }
  }
}
@keyframes bounceIn {
  0%, 20%, 40%, 60%, 80%, 100% {
    -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }
  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }
  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }
  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9);
  }
  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }
  80% {
    -webkit-transform: scale3d(.97, .97, .97);
    transform: scale3d(.97, .97, .97);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
.ballcontainer {
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 30px;
}
</style>
<template>
  <section class="ranking">
    <div class="container">
    <h2>Rànquing {{month}}</h2>
    <transition name="fade" mode="out-in">
    <div class="ranking-list" v-if="loaded">
      <table class="ranking-table">
        <tr><th></th><th class="text-center">{{month}}</th><th class="text-center">Total</th><th></th></tr>
        <tr v-for="(player, i) in players" :key="'player'+i">
          <td><span class="pos">{{parseInt(i+1)}}</span><strong>{{ player.nom }}</strong> <small>{{player.updated | timeago}}</small></td>
          <td class="text-center r-month">{{numFormat(player.monthcookies)}}</td>
          <td class="text-center">{{numFormat(player.galetes)}}</td>
        </tr>
      </table>
      <!--<p v-for="(player, i) in players" :key="'player'+i">
        <span class="pos">{{parseInt(i+1)}}.</span>
        <span class="galetes">{{player.galetes}}</span>
        <strong :class="player.userid==$parent.userId&&player.nom!='Ningú'?'tu':''">{{ player.nom }}</strong>
        <small>{{player.updated | timeago}}</small>
      </p>-->
    </div>
    </transition>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      loaded: false,
      players: []
    };
  },
  methods: {
    numFormat(num) {
      if(num)
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    },
    fetchData() {
      fetch("https://miau.app/api/index.php", {
        method: "GET"
      })
        .then(response =>{
          return response.json();
        })
        .then(myJson =>{
          this.loaded = true
          this.players = myJson
        })
        .catch(res => {
          console.log(res);
        });
    },
    close() {
      this.$router.go(-1)
    }
  },
  created() {
    this.fetchData();
  },
  computed: {
    userid(){
      return this.$store.getters.user.userId
    },
    month(){
      var date = new Date();
      var mesos = {
        0: 'Gener',
        1: 'Febrer',
        2: 'Març',
        3: 'Abril',
        4: 'Maig',
        5: 'Juny',
        6: 'Juliol',
        7: 'Agost',
        8: 'Setembre',
        9: 'Octubre',
        10: 'Novembre',
        11: 'Desembre'
      }
      return mesos[date.getMonth()]
    }
  },
  watch: {
    $route: "fetchData"
  }
};
</script>
<style lang="scss">
.text-right {
  text-align: right;
}
.text-center {
  text-align: center;
}
.ranking-table {
  width: 100%;
  border-collapse: collapse;
  td {
    font-size: 12px;
  }
  th {
    font-size: 10px;
    font-family: 'Eina',sans-serif;
    padding: 4px 6px;
  }
  td,th {
    padding: 4px 0;
  }
}
.r-month {
  background: rgb(247, 246, 198);
}
.ranking {
  background: #FFF;
  position: fixed;
  top: 48px;
  bottom: 48px;
  width: 100%;
  left: 0;
  padding: 20px;
  font-size: 14px;
  text-align: left;
  overflow-y: auto;
  z-index: 50;
  .container {
    position: relative;
  }
  .ranking-close {
    position: absolute;
    top: 0;
    right: 10px;
    border: 0;
    background: none;
    height: 30px;
    width: 30px;
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iNTEycHgiIGlkPSJMYXllcl8xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cGF0aCBkPSJNNDQzLjYsMzg3LjFMMzEyLjQsMjU1LjRsMTMxLjUtMTMwYzUuNC01LjQsNS40LTE0LjIsMC0xOS42bC0zNy40LTM3LjZjLTIuNi0yLjYtNi4xLTQtOS44LTRjLTMuNywwLTcuMiwxLjUtOS44LDQgIEwyNTYsMTk3LjhMMTI0LjksNjguM2MtMi42LTIuNi02LjEtNC05LjgtNGMtMy43LDAtNy4yLDEuNS05LjgsNEw2OCwxMDUuOWMtNS40LDUuNC01LjQsMTQuMiwwLDE5LjZsMTMxLjUsMTMwTDY4LjQsMzg3LjEgIGMtMi42LDIuNi00LjEsNi4xLTQuMSw5LjhjMCwzLjcsMS40LDcuMiw0LjEsOS44bDM3LjQsMzcuNmMyLjcsMi43LDYuMiw0LjEsOS44LDQuMWMzLjUsMCw3LjEtMS4zLDkuOC00LjFMMjU2LDMxMy4xbDEzMC43LDEzMS4xICBjMi43LDIuNyw2LjIsNC4xLDkuOCw0LjFjMy41LDAsNy4xLTEuMyw5LjgtNC4xbDM3LjQtMzcuNmMyLjYtMi42LDQuMS02LjEsNC4xLTkuOEM0NDcuNywzOTMuMiw0NDYuMiwzODkuNyw0NDMuNiwzODcuMXoiLz48L3N2Zz4=");
    background-size: contain;
    background-repeat: no-repeat;
  }
  h2 {
    margin-top: 0;
    margin-bottom: 10px;
    text-align: center;
  }
  p.top25 {
    color: #666;
    font-size: 15px;
    margin-bottom: 1.5em;
  }
  p {
    margin: 0;
    padding: 4px 0;
    border-bottom: dotted 1px #eee;
  }
  .pos {
    color: rgb(191, 194, 202);
    width: 34px;
    display: inline-block;
    text-align: right;
    padding-right: 10px;
  }
  .galetes {
    width: 50px;
    display: inline-block;
    text-align: center;
  }
  .tu {
    color: orangered;
  }
  small,.timeago {
    color: rgb(185, 189, 197);
    margin-left: 6px;
    font-size: 9px;
    letter-spacing: -0.05em;
  }
}
</style>
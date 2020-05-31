<template>
  <div>
    <header>
      <div class="container pad">
        <router-link :to="'/'" class="eina">miau.app</router-link>
        <span class="userinfo">
          <span class="user">{{ user }}</span>
          &nbsp;🍪
          <span class="cookies">{{ cookies }}</span>
        </span>
      </div>
    </header>

    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>

    <footer>
      <div class="container pad">
        <a @click="toggleRanking()">Rànquing</a>
        <a @click="exportUser()" v-if="userId">Exporta</a>
        <a @click="importUser()">Importa</a>
        <a @click="exit()">Surt</a>
      </div>
    </footer>

    <div class="update" v-if="updateExists">
      <div>
        <p>Tenim una bonica actualització!</p>
        <button
          class="btn-update"
          @click="refreshApp"
        >
          Actualitza
        </button>
      </div>
    </div>

    <transition name="fade" mode="out-in">
      <ranking v-if="showRanking"></ranking>
    </transition>

    <div class="login">
      <div class="pad">
        <h2>Epa! Qui ets?</h2>
        <p>
          Si ets nou, escriu el teu nom:
          <input model="username">
          <button class="btn" @click="register()">A jugar!</button>
        </p>
        <hr>
        <p>
          Tens un codi?<br>
          <input model="code">
          <button class="btn" @click="login()">Login</button>
        </p>
      </div>
    </div>

  </div>
</template>
<script>
import Ranking from './views/Ranking'
export default {
  name: "App",
  components: {
    'ranking': Ranking
  },
  data() {
    return {
      showRanking: false,
      refreshing: false,
      registration: null,
      updateExists: false,
      username: '',
      code: ''
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userId() {
      return this.$store.getters.userId;
    },
    cookies() {
      return this.$store.getters.cookies;
    }
  },
  methods: {
    toggleRanking() {
      this.showRanking = !this.showRanking
    },
    showRefreshUI (e) {
      this.registration = e.detail;
      this.updateExists = true;
    },
    refreshApp () {
      this.updateExists = false;
      if (!this.registration || !this.registration.waiting) { return; }
      this.registration.waiting.postMessage('skipWaiting');
    },
    exit() {
      if(window.confirm("Que perdràs les galetes!")) {
        localStorage.clear()
        window.location.reload();
      }
    },
    register() {
      if(this.username) {
        this.$store.dispatch('login',this.username)
      } else {
        alert("No siguis tímid, home!")
      }
    },
    login() {
      if(this.code) {
        this.$store.loadUserData('login',this.code)
      } else {
        alert("No siguis tímid, home!")
      }
    }
  },
  created() {

    document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });

  }
};
</script>
<style lang="scss">
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background: #FFF;
  width: 100%;
  height: 100%;
  z-index: 101;
  h2 {
    margin-top: 0;
  }
  .pad {
    height: auto;
  }
  input {
    width: 100%;
    padding: 5px 10px;
    border: 2px solid #000;
    background: #eee;
    color: #000;
    border-radius: 3px;
    font-weight: bold;
    text-align: center;
    font-size: 20px;
  }
  hr {
    margin: 20px 0;
      border: 0;
      height: 1px;
      background: #999;
    }
    .btn {
      font-size: 15px;
      margin-top: 10px;
    }
}
</style>
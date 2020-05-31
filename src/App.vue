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
        Tenim una bonica actualització per a tu!
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
      updateExists: false
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
    exportUser() {
      alert("Vols jugar amb el teu usuari des d'un altre mòbil o ordinador? Vés a miau.app, clica a 'importa' i enganxa-hi aquest codi: "+this.userId)
    },
    importUser() {
      var userid = prompt("Enganxa el teu codi d'usuari:");
      this.$store.dispatch('loadUserData',userid)
    },
    exit() {
      if(window.confirm("Que perdràs les galetes!")) {
        localStorage.clear()
        window.location.reload();
      }
    }
  },
  created() {

    this.$store.dispatch('login')

    document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });

  }
};
</script>
<style lang="scss" src="./scss/style.scss"></style>
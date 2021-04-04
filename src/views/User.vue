<template>
  <section class="container pad container-user">
    <h2>{{cookies}} 🍪</h2>
    <p class="form">
      Nom:
      <input v-model="name" class="field">
      <button class="btn" @click="changeName()">Canviar nom</button>
    </p>
    <hr>
    <p>
      Codi d'usuari:
      <br />
      <code class="field">{{$parent.userId}}</code>
    </p>
    <p>El pots fer servir per identificar-te quan vulguis guanyar galetes des d'un altre ordenyador o mòbil.</p>
    <hr>
    <p>
      <button class="btn" @click="exit()">Sortir</button>
    </p>
    <!--
    <hr>
    <p>Idioma</p>
    <button @click="changeLang('en')">English</button>
    -->
  </section>
</template>
<script>
export default {
  data() {
    return {
      name: this.$store.getters.user
    };
  },
  computed: {
    cookies() {
      return this.$store.getters.cookies;
    },
    user() {
      return this.$store.getters.user;
    },
    catid() {
      let idn = parseInt(this.user, 36);
      return ((idn - 1) % 9) + 1;
    }
  },
  methods: {
    exit() {
      if (window.confirm("Que perdràs les galetes!")) {
        this.$store.commit('CLEAR_USER_DATA')
        this.$router.push('/')
      }
    },
    changeName() {
      this.$store.dispatch('changeName',this.name)
    },
    changeLang(lang) {
      this.$store.commit('SET_LANG',lang)
      this.$i18n.locale = lang;
    }
  }
};
</script>
<style lang="scss">
.container-user {
  padding: 20px !important;
}
code {
  -webkit-touch-callout: text !important;
  -webkit-user-select: text !important;
  -khtml-user-select: text !important;
  -moz-user-select: text !important;
  -ms-user-select: text !important;
  user-select: text !important;
}
</style>
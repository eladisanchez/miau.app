<template>
  <section class="container pad container-user">
    <h2>{{user}}</h2>
    <p>
      <strong>Tens {{cookies}} galetaques</strong>
    </p>
    <p>
      Aquest és el teu codi d'usuari:
      <br />
      <code>{{$parent.userId}}</code>
    </p>
    <p>El pots fer servir per identificar-te quan vulguis guanyar galetes des d'un altre ordenyador o mòbil.</p>
    <hr>
    <p>
      <button class="btn" @click="exit()">Sortir</button>
    </p>
  </section>
</template>
<script>
import achievements from "../store/achievements";
export default {
  data() {
    return {
      achievements: achievements
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
    }
  }
};
</script>
<style lang="scss">
.container-user {
  padding: 20px !important;
}
code {
  -webkit-touch-callout: initial;
  -webkit-user-select: initial;
  -khtml-user-select: initial;
  -moz-user-select: initial;
  -ms-user-select: initial;
  user-select: all !important;
}
</style>
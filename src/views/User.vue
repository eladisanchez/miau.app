<template>
  <section class="container pad container-user">

    <h2>Tens {{cookies}} galetes 🍪</h2>

    <p class="form">
      {{$t("nom")}}:
      <input v-model="name" class="field">
      <button class="btn" @click="changeName()"> {{$t("canviar_nom")}}</button>
    </p>

    <p>
      {{$t('codi_usuari')}}:
      <br />
      <code class="field">{{$parent.userId}}</code>
    </p>
    <p>{{$t('codi_instruccions')}}</p>

    <p class="form">
      <button class="btn" @click="exit()">{{$t("sortir")}}</button>
    </p>


    <p class="form">{{$t("idioma")}}:<br>
    <button @click="changeLang('ca')" class="btn">Català</button>
    <button @click="changeLang('en')" class="btn">English</button>
    <button @click="changeLang('es')" class="btn">Castellano</button>
    </p>

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
<template>
  <section class="container pad">
    <div :class="'cat cat'+catid"></div>
    <h1> Hola, {{ user }}.</h1>
    <p class="hola">Has fet caca avui? A què vols jugar?</p>
    <router-link to="boles" class="btn-game btn">Les Boles de l'Eladi</router-link>
  </section>
</template>
<script>
export default {
  computed: {
    user () {
      return this.$store.getters.user
    },
    catid() {
      let idn = parseInt(this.user,36);
      return (idn - 1) % 9 + 1;
    }
  }
};
</script>
<style lang="scss">
.btn-game {
  display: block;
  border: 2px solid #000;
  border-radius: 12px;
  background: #fff;
  text-align: center;
  padding: 10px;
  margin-bottom: 8px;
  text-decoration: none;
  color: #000;
}
.cat {
  height: 280px;
  background-size: 250px 250px;
  background-position: center;
  background-repeat: no-repeat;
  &.cat1 {
    background-image: url("../scss/img/gat1.svg");
  }
  &.cat2 {
    background-image: url("../scss/img/gat2.svg");
  }
  &.cat3 {
    background-image: url("../scss/img/gat3.svg");
  }
  &.cat4 {
    background-image: url("../scss/img/gat4.svg");
  }
  &.cat5 {
    background-image: url("../scss/img/gat5.svg");
  }
  &.cat6 {
    background-image: url("../scss/img/gat6.svg");
  }
  &.cat7 {
    background-image: url("../scss/img/gat7.svg");
  }
  &.cat8 {
    background-image: url("../scss/img/gat8.svg");
  }
  &.cat9 {
    background-image: url("../scss/img/gat9.svg");
  }
}

</style>
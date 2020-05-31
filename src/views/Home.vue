<template>
  <section class="container pad">
    <router-link :class="'cat cat'+catid" :to="'/cat'">
      <span>Clica'm, baby.</span>
    </router-link>
    <h1> Hola, {{ user }}.</h1>
    <p class="hola">Has fet caca avui? A què vols jugar?</p>
    <router-link to="boles" class="btn-game btn">Les Boles de l'Eladi</router-link>
    <p class="aviat">Aviat hi haurà més jocs per anar a fer caca!</p>
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
.aviat {
  color: #999;
}
.cat {
  display: block;
  height: 280px;
  background-size: 250px 250px;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  span {
    background: #000;
    border-radius: 4px;
    transform: translateX(-50%);
    color: #FFF;
    position: absolute;
    letter-spacing: 0;
    font-size: 12px;
    left: 50%;
    top: 10px;
    padding: 4px 10px;
    &:after {
      content: '';
      display: block;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 10px 15px 0 15px;
      border-color: #000 transparent transparent transparent;
      position: absolute;
      left: 50%;
      margin-left: -15px;
      bottom: -10px;
    }
  }
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
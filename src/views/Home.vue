<template>
  <section class="home">
    <div class="container pad">
      <router-link :class="'cat cat' + catid" :to="'/cat'">
        <!--<span>Clica'm, baby.</span>-->
      </router-link>
      <h1 class="hola-nom">{{ $t("hola") }} {{ user }}.</h1>
      <p class="hola">{{ $t("intro") }}</p>
      <div>
        <router-link to="boles" class="btn-game btn"
          >🔵 {{ $t("boles") }}</router-link
        >
        <router-link to="nonogram" class="btn-game btn"
          >🔲 {{ $t("nono") }}</router-link
        >
        <router-link to="mastermind" class="btn-game btn"
          >🧠 {{ $t("master") }}</router-link
        >
        <router-link to="pescamines" class="btn-game btn"
          >🚩 {{ $t("pescamines") }}</router-link
        >
        <button disabled class="btn-game btn">???</button>
      </div>
      <!--<div class="news">
      <h4>NOVETATS!</h4>
      <ul>
        <li>· S'acosta el Pescamines!</li>
      </ul>
    </div>-->
      <!--<p><strong>{{$t("ANUNCIA'T!")}}</strong><br>
    <a href="mailto:hola@miau.app">hola@miau.app</a></p>-->
      <!--<p><a href="https://paypal.me/miauapp?locale.x=es_ES" target="_blank" class="btn btn-donate">Paga'ns una birra 🍺</a></p>-->
    </div>
  </section>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    },
    catid() {
      let idn = parseInt(this.user, 36);
      return ((idn - 1) % 9) + 1;
    },
  },
};
</script>
<style lang="scss">
.home {
  background-image: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 28%,
    rgba(224, 229, 231, 1) 100%
  );
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.hola-nom {
  margin: 0;
}
.hola {
  margin-top: 0;
  margin-bottom: 20px;
}
.btn-game {
  display: block;
  width: 100%;
  border: 2px solid #000;
  border-radius: 12px;
  background: #fff;
  text-align: center;
  padding: 10px;
  margin-bottom: 12px !important;
  text-decoration: none;
  color: #000;
  transition: 0.2s ease all;
  &:disabled {
    color: #ccc;
  }
  animation-name: fadeInUp;
  animation-duration: 0.4s;
  animation-fill-mode: both;
  &:nth-child(1) {
    animation-delay: 0.1s;
  }
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.3s;
  }
  &:nth-child(4) {
    animation-delay: 0.4s;
  }
  &:nth-child(5) {
    animation-delay: 0.5s;
  }
}
.aviat {
  color: #999;
}
a {
  color: #666;
}
.cat {
  display: block;
  height: 180px;
  background-size: 150px 150px;
  background-position: center bottom;
  background-repeat: no-repeat;
  position: relative;
  animation-name: bounce-2;
  animation-timing-function: ease;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  mix-blend-mode: multiply;
  span {
    background: #000;
    border-radius: 4px;
    transform: rotate(4deg);
    color: #fff;
    position: absolute;
    letter-spacing: 0;
    font-size: 12px;
    right: 0;
    top: 10px;
    padding: 4px 10px;
    &:after {
      content: "";
      display: block;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 10px 15px 0 15px;
      border-color: #000 transparent transparent transparent;
      position: absolute;
      left: 50%;
      margin-left: -15px;
      bottom: -9px;
    }
  }
  @for $i from 1 through 9 {
    &.cat#{$i} {
      background-image: url("../scss/img/gats/gat#{$i}.png");
    }
  }
}
@keyframes bounce-2 {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(1.1, 0.9) translateY(0);
  }
  30% {
    transform: scale(0.9, 1.1) translateY(-14px);
  }
  50% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
.news {
  color: #999;
  font-size: 13px;
  h4 {
    width: 100px;
    border-radius: 10px;
    margin: 28px auto 16px auto;
    padding: 3px 5px;
    color: #000;
    background: yellow;
  }
  h5 {
    margin: 6px auto;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    color: #999;
  }
}
</style>
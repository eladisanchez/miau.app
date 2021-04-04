<template>
  <section class="container pad elgat">
    <div :class="'cat cat'+catid"></div>
    <p>El teu gat...</p>
    <ul class="achis">
      <li v-for="(ach,p) in achievements" :key="p" :class="cookies>p?'yes':''">
        <span v-if="cookies>=p"><strong>{{p}} galetes</strong><br>{{ach}}</span>
        <span v-else><strong>{{p}} galetes</strong><br>?????</span>
      </li>
    </ul>
  </section>
</template>
<script>
import achievements from '../store/achievements'
export default {
  data() {
    return {
      achievements: achievements
    }
  },
  computed: {
    cookies() {
      return this.$store.getters.cookies
    },
    user () {
      return this.$store.getters.user
    },
    catid() {
      let idn = parseInt(this.user, 36);
      return ((idn - 1) % 9) + 1;
    }
  }
};
</script>
<style lang="scss">
.elgat {
  padding: 20px;
}
.achis {
  list-style: none;
  margin: 0;
  padding: 0;
  
  li {
    padding: 10px;
    margin-bottom: 5px;
    background: #eee;
    &.yes {
    background: rgb(193, 231, 136);
    border: 1px solid greenyellow;
  }
    strong {
      font-size: 11px;
    }
  }
}
</style>
<template>
  <div>
    <header>
      <div class="container">
        <router-link :to="'/'">miau.app</router-link>
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
      <div class="container">
        Creat per
        <a href>miau;</a>
        | 
        <router-link :to="'/ranking'">Rànquing</router-link>
      </div>
    </footer>

  </div>
</template>
<script>
export default {
  name: 'App',
  computed: {
    user() { return this.$store.getters.user },
    cookies() { return this.$store.getters.cookies }
  },
}
</script>
<style lang="scss" src="./scss/style.scss"></style>
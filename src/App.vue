<template>
<div>

  <!-- Root Foo: {{rootFoo}} <br/>
  Robots Foo: {{robotsFoo}} <br/>
  Users Foo: {{usersFoo}} <br/>
  <br/>
  Root Getter Foo: {{rootGetterFoo}} <br/>
  Robots Getter Foo: {{robotsGetterFoo}} <br/>
  Users Getter Foo: {{usersGetterFoo}} <br/> -->

  <header>
    <nav>
      <ul>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Home' }" exact>
            <img class="logo" src="./assets/build-a-bot-logo.png"/>
            Build-a-bot
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Build' }" exact>
            Build
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'BrowseParts' }" exact>
             Browse
          </router-link>
        </li>
        <li class="nav-item cart">
          <router-link class="nav-link" to="/cart" exact>
            Cart
          </router-link>
          <div class="cart-items">
            {{cart.length}}
          </div>
        </li>
        <li>
            <a class="repo" href="https://github.com/jmcooper/vuejs-fundamentals/tree/master/src" target="_blank">Repo</a>
          </li>
      </ul>
    </nav>
  </header>
  <div class="container">
    <aside class="aside">
      <router-view name="sidebar" />
    </aside>
    <main>
      <router-view />
    </main>
  </div>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    cart() {
      return this.$store.state.robots.cart;
    },

    // rootFoo() {
    //   return this.$store.state.foo;
    // },
    // usersFoo() {
    //   return this.$store.state.users.foo;
    // },

    ...mapState({
      rootFoo: 'foo',
      usersFoo: (state) => state.users.foo, // We have to use this because it is in a different module
    }),

    // robotsFoo() {
    //   return this.$store.state.robots.foo;
    // },

    ...mapState('robots', { robotsFoo: 'foo' }),

    // rootGetterFoo() {
    //   return this.$store.getters.foo;
    // },
    // robotsGetterFoo() {
    //   return this.$store.getters['robots/foo'];
    // },
    // usersGetterFoo() {
    //   return this.$store.getters['users/foo'];
    // },

    ...mapGetters({ rootGettersFoo: 'foo' }),
    ...mapGetters('robots', { robotsGetterFoo: 'foo' }),
    ...mapGetters('users', { usersGetterFoo: 'foo' }),
  },
};
</script>

<style scoped>
  /* .content >>> button {border: 2px solid red; } * We can use the deep selector to style scoped child components */
</style>

<style>
body {
  background: linear-gradient(to bottom, #555, #999);
  background-attachment: fixed;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
main {
  padding: 30px;
  background-color: white;
  width: 964px;
  min-height: 300px;
}
header {
  background-color: #999;
  width: 1184px;
  margin: 0 auto;
}
ul {
  position: relative;
  padding: 3px;
  display: flex;
}
li {
  list-style-type: none;
}
.nav-item {
  display: inline-block;
  padding: 5px 10px;
  font-size: 22px;
  border-right: 1px solid #bbb;
}
.nav-link {
  text-decoration: none;
  color: inherit
}
.nav-item.cart {
  position: relative;
  margin-left: auto;
  border-right: none;
}
.router-link-active {
  color: #fff
}
.logo {
  vertical-align: middle;
  height: 30px;
}
.repo {
  display: block;
  position: absolute;
  width: 50px;
  right: 80px;
  top: 10px;
}
.container {
  display: flex;
  margin: 10px auto 0;
  justify-content: center;
}
.aside {
  padding: 30px;
  background-color: #aaa;
  width: 100px;
  min-height: 300px;
}
.cart-items {
  position: absolute;
  top: -8px;
  right: -12px;
  width: 24px;
  height: 24px;
  font-size: 18px;
  text-align: center;
  display: inline-block;
  border-radius: 100px;
  background-color: mediumseagreen;
}
.nav-link {
  text-decoration: none;
  color: inherit;
}
.router-link-active {
  color: #fff;
}
</style>

<template>
  <div id="nav">
    <router-link class="item" to="/">Home</router-link>
    <router-link class="item" to="/about">About</router-link>
    <router-link class="item" to="/testa">TestA</router-link>
    <router-link class="item" to="/testb">TestB</router-link>
    <router-link class="item" to="/testc">TestC</router-link>
    <router-link class="item" to="/testd">TestD</router-link>
  </div>
  <router-view />
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  .item {
    padding: 0 8px;
  }
}
</style>

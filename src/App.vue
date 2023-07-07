<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/translate">번역기</router-link> |
    <router-link to="/bus_db">BUS 도착정보</router-link> |
    <router-link to="/my_location">내 현재위치</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<template>
  <header class="app-container">
    <Header />
    <Nav />
  </header>
  <router-view class="app-container" />
</template>

<script>
import Header from "./components/Header.vue";
import Nav from "./components/Nav.vue";
export default {
  components: {
    Header,
    Nav,
  },
};
</script>

<style scoped>
.app-container {
  max-width: 1000px;
  width: 90%;
  margin: 0 auto;
  padding: 0rem 3rem;
  background-color: #fff;
}
</style>

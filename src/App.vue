<template>
  <div class="app-container">
    <header v-if="currentLeague">
      <Header />
      <Nav />
    </header>
    <router-view />
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import Header from "./components/Header.vue";
import Nav from "./components/Nav.vue";

export default {
  components: {
    Header,
    Nav,
  },
  setup() {
    const store = useStore();

    const currentLeague = computed(() => store.getters.getCurrentLeague);

    return { currentLeague };
  },
};
</script>

<style scoped>
.app-container {
  max-width: 1000px;
  min-height: 100vh;
  width: 90%;
  margin: 0 auto;
  background-color: #fff;
}
</style>

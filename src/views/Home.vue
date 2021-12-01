<template>
  <div class="home__container">
    <h1>Choose a league</h1>
    <LeagueSelector />
  </div>
</template>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import LeagueSelector from "../components/LeagueSelector.vue";
export default {
  components: {
    LeagueSelector,
  },
  setup() {
    const store = useStore();
    const currentLeague = computed(() => store.getters.getCurrentLeague);
    const allLeagues = computed(() => store.getters.getAllLeagues);

    //set currentLeague to null so the header doesn't chow up on the home page
    store.commit("setCurrentLeague", null);

    const loadCurrentLeague = store.dispatch("loadCurrentLeague");

    return {
      currentLeague,
      allLeagues,
    };
  },
};
</script>
<style scoped>
.home__container {
  height: 100vh;
  width: 100%;
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  margin-bottom: 2rem;
}
</style>
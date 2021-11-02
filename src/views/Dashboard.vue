<template>
  <div v-if="!allLeagues">
    <Loader />
  </div>
  <div v-else>
    <Header />
    <div class="dashboard container">
      <LatestResults class="element_1" />
      <LeagueTable class="element_2" />
      <UpcomingMatches class="element_3" />
      <PlayerStatsGrid class="element_4" />
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
// components
import Header from "../components/Header.vue";
import LatestResults from "../components/LatestResults.vue";
import LeagueTable from "../components/LeagueTable.vue";
import UpcomingMatches from "../components/UpcomingMatches.vue";
import Loader from "../components/Loader.vue";
import PlayerStatsGrid from "../components/PlayerStatsGrid.vue";

export default {
  components: {
    LatestResults,
    LeagueTable,
    UpcomingMatches,
    Header,
    Loader,
    PlayerStatsGrid,
  },
  setup() {
    const store = useStore();
    const currentLeague = computed(() => store.getters.getCurrentLeague);
    const allLeagues = computed(() => store.getters.getAllLeagues);

    const loadCurrentLeague = store.dispatch("loadCurrentLeague");

    return {
      loadCurrentLeague,
      currentLeague,
      allLeagues,
    };
  },
};
</script>

<style>
/** Global styles
*/
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #f2f2f2;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

h1 {
  font-size: 1.5rem;
  font-weight: 900;
}

h2 {
  font-size: 0.9rem;
  font-weight: 900;
}

p {
  font-size: 0.9rem;
  font-weight: 400;
}

/** Utility classes
*/

.purple {
  color: rgb(189, 97, 212);
}

.box-shadow {
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
}

.home_component {
  padding: 0.75rem 1rem;
  background-color: white;
  border-radius: 0.5rem;
  width: 100%;
}

/** Main container style
*/
.container {
  max-width: 1100px;
  width: 90%;
  margin: 0 auto;
}

/** App styles
*/
.box {
  height: 100%;
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  width: 100%;
}

.dashboard {
  height: 100%;
  padding: 1.25rem 0rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr;
  grid-gap: 2rem;
}

@media only screen and (min-width: 700px) {
  .dashboard {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .dashboard .element_1 {
    grid-column: 1/4;
  }

  .dashboard .element_2 {
    grid-column: 1/3;
  }

  .dashboard .element_3 {
    grid-column: 3/4;
  }
  .dashboard .element_4 {
    grid-column: 1/4;
  }
}
</style>

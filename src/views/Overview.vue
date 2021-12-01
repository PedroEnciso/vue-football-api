<template>
  <div v-if="!allLeagues">
    <Loader />
  </div>
  <div v-else>
    <div class="dashboard container">
      <LatestResults class="element_1" />
      <LeagueTable class="element_2" />
      <PlayerStatsGrid class="element_3" />
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
// components
import LatestResults from "../components/LatestResults.vue";
import LeagueTable from "../components/LeagueTable.vue";
import UpcomingMatches from "../components/UpcomingMatches.vue";
import Loader from "../components/Loader.vue";
import PlayerStatsGrid from "../components/PlayerStatsGrid.vue";
// functions
// import loadLeagueData from "../composables/loadLeagueData";

export default {
  components: {
    LatestResults,
    LeagueTable,
    UpcomingMatches,
    Loader,
    PlayerStatsGrid,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const currentLeague = computed(() => store.getters.getCurrentLeague);
    const allLeagues = computed(() => store.getters.getAllLeagues);

    const loadLeagueData = async () => {
      // check if allLeagues is loaded
      if (!allLeagues.value) {
        const loadCurrentLeague = await store.dispatch("loadCurrentLeague");
      }
      // match currentLeague with the id in the route
      const paramLeague = allLeagues.value.filter((league) => {
        return league.id.toString() === route.params.id;
      });
      // check if league exists
      if (!paramLeague[0]) {
        // if not, send to home page (for now)
        router.push("/");
      } else {
        // if it does exist, set current league
        store.commit("setCurrentLeague", paramLeague[0]);
      }
    };
    loadLeagueData();

    return { allLeagues };
  },
};
</script>

<style>
.box {
  height: 100%;
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  width: 100%;
}

.dashboard {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr;
  grid-column-gap: 3rem;
  grid-row-gap: 3rem;
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
}
</style>

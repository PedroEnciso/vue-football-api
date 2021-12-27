<template>
  <PlayerStatsGrid v-if="currentLeague"
    >This is the stats page!</PlayerStatsGrid
  >
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import PlayerStatsGrid from "../components/PlayerStatsGrid.vue";
export default {
  components: {
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

    return { allLeagues, currentLeague };
  },
};
</script>
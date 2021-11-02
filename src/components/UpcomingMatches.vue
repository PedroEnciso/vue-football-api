<template>
  <div class="home_component box-shadow upcoming_matches">
    <h2 class="upcoming_matches_h2">Upcoming Matches</h2>
    <div class="upcoming_matches_matches">
      <h3 v-if="!upcomingMatches">Loading upcoming fixtures...</h3>
      <UpcomingMatch
        v-else
        v-for="match in upcomingMatches"
        :key="match.id"
        :match="match"
        :upcomingMatches="upcomingMatches"
      />
    </div>
  </div>
</template>
<script>
import { computed, watchEffect } from "vue";
import { useStore } from "vuex";
import UpcomingMatch from "./UpcomingMatch.vue";
import getUpcomingMatches from "../composables/getUpcomingMatches";

export default {
  components: {
    UpcomingMatch,
  },
  setup() {
    const store = useStore();
    const currentLeague = computed(() => store.getters.getCurrentLeague);

    const {
      upcomingMatches,
      error,
      loadUpcomingMatches,
    } = getUpcomingMatches();

    watchEffect(() => {
      loadUpcomingMatches(
        currentLeague.value.id,
        currentLeague.value.current_round_id
      );
    });

    return { upcomingMatches, error };
  },
};
</script>
<style>
.upcoming_matches {
  display: flex;
  flex-direction: column;
}

.upcoming_matches_h2 {
  flex: 0 1 auto;
}

.upcoming_matches_matches {
  flex: 1 1 auto;
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  padding-top: 7px;
}
</style>

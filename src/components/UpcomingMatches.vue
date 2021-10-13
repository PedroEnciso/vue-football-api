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
import { ref, watchEffect } from "vue";
import UpcomingMatch from "./UpcomingMatch.vue";
import getUpcomingMatches from "../composables/getUpcomingMatches";

export default {
  components: {
    UpcomingMatch,
  },
  props: ["league_id", "round"],
  setup(props) {
    const totalMatches = ref([]);

    for (let i = 0; i < 6; i++) {
      {
        totalMatches.value.push(i);
      }
    }

    const {
      upcomingMatches,
      error,
      loadUpcomingMatches,
    } = getUpcomingMatches();

    watchEffect(() => {
      loadUpcomingMatches(props.league_id, props.round);
    });

    return { totalMatches, upcomingMatches, error };
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

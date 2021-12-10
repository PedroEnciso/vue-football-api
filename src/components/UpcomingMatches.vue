<template>
  <div class="matches_container">
    <div v-if="currentRoundFixtures" class="upcoming_matches_matches">
      <div class="fixture_nav">
        <button class="fixture_nav_button">&#60; Previous</button>
        <button class="fixture_nav_button">Next ></button>
      </div>
      <UpcomingMatch
        v-for="match in currentRoundFixtures"
        :key="match.id"
        :match="match"
        :upcomingMatches="currentRoundFixtures"
      />
    </div>
  </div>
</template>
<script>
import { computed, watchEffect, ref } from "vue";
import { useStore } from "vuex";
import UpcomingMatch from "./UpcomingMatch.vue";
import getAllFixtures from "../composables/getAllFixtures";

export default {
  components: {
    UpcomingMatch,
  },
  setup() {
    const store = useStore();
    const currentLeague = computed(() => store.getters.getCurrentLeague);
    const currentRoundFixtures = ref(null);
    const currentRoundIndex = ref(null);

    const { allFixtures, error, loadAllFixtures, allTeams } = getAllFixtures();

    const getCurrentRoundData = async () => {
      // load the list of all fixtures and results
      await loadAllFixtures(currentLeague.value.current_season_id);
      console.log(allFixtures.value);
      // loop through all rounds, find the fixtures for the current league
      const indexOfCurrentResults = allFixtures.value.forEach((round) => {
        if (round.id === currentLeague.value.current_round_id) {
          currentRoundIndex.value = round.name - 1;
          hasResults(round);
        }
      });
    };

    // function to check if the round has been played yet
    // this function sets the proper data set to currentRoundFixtures
    const hasResults = (round) => {
      // check if there is any data in the results array
      if (round.results.data[0]) {
        // if yes, set currentRoundFixtures to the results array
        currentRoundFixtures.value = round.results.data;
      } else {
        // if there is no data, point to the fixtures array
        currentRoundFixtures.value = round.fixtures.data;
      }
    };

    getCurrentRoundData();

    return { allFixtures, allTeams, error, currentRoundFixtures };
  },
};
</script>
<style>
.matches_container {
  margin-top: 3rem;
}

.fixture_nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
}

.fixture_nav button {
  text-transform: uppercase;
}

.upcoming_matches_matches {
  padding-top: 7px;
}
</style>

<template>
  <div class="match_page_container">
    <div v-if="currentRoundFixtures" class="upcoming_matches_matches">
      <div class="fixture_nav">
        <button @click="previousRound()" class="fixture_nav_button">
          &#60; Previous
        </button>
        <button @click="nextRound()" class="fixture_nav_button">Next ></button>
      </div>
      <h2 class="round_name">Round {{ currentRound }}</h2>
      <div class="matches_container">
        <UpcomingMatch
          v-for="match in currentRoundFixtures"
          :key="match.id"
          :match="match"
          :upcomingMatches="currentRoundFixtures"
          :allTeams="allTeams"
        />
      </div>
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
    const currentRound = ref(null);

    const { allFixtures, error, loadAllFixtures, allTeams } = getAllFixtures();

    const getCurrentRoundData = async () => {
      // load the list of all fixtures and results
      await loadAllFixtures(currentLeague.value.current_season_id);
      console.log(allFixtures.value);
      // loop through all rounds, find the fixtures for the current league
      allFixtures.value.forEach((round) => {
        if (round.id === currentLeague.value.current_round_id) {
          currentRound.value = round.name;
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

    // change the round shown to the next round
    const nextRound = () => {
      // check if there is a next round. If not, then return
      if (allFixtures.value[currentRound.value]) {
        const nextRoundObject = allFixtures.value[currentRound.value];
        // if there is a next round, call hasResults to set the next round of matches
        hasResults(nextRoundObject);
        // set currentRound to the new round name
        currentRound.value = nextRoundObject.name;
      }
    };

    // change the round shown to the previous round
    const previousRound = () => {
      // check if there is a previous round. If not, then return
      if (currentRound.value - 2 >= 0) {
        const previousRoundObject = allFixtures.value[currentRound.value - 2];
        // if there is a previous round, call hasResults to set the previous round of matches
        hasResults(previousRoundObject);
        // set currentRound to the new round name
        currentRound.value = previousRoundObject.name;
      }
    };

    getCurrentRoundData();

    return {
      allFixtures,
      allTeams,
      error,
      currentRoundFixtures,
      currentRound,
      nextRound,
      previousRound,
    };
  },
};
</script>
<style>
.match_page_container {
  margin-top: 3rem;
}

.fixture_nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  margin: 0 auto;
}

.fixture_nav button {
  text-transform: uppercase;
  font-weight: 600;
}

.upcoming_matches_matches {
  padding-top: 7px;
}

.round_name {
  font-size: 1.2rem;
  text-align: center;
}

.matches_container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
}
</style>

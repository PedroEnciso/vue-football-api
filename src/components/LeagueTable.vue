<template>
  <div>
    <h2>League Table</h2>
    <div class="table box-shadow">
      <TableRow position="0" />
      <h3 v-if="!standings">Loading table data...</h3>
      <TableRow
        v-else
        v-for="team in standings"
        :key="team.team_id"
        :position="team.position"
        :team="team"
      />
    </div>
    <div class="link-container">
      <router-link to="/table" class="page-link">See full table</router-link>
    </div>
  </div>
</template>
<script>
import TableRow from "./TableRow.vue";
import getLeagueStandings from "../composables/getLeagueStandings";
import { watchEffect, computed } from "vue";
import { useStore } from "vuex";

export default {
  components: { TableRow },
  setup() {
    const store = useStore();
    const currentLeague = computed(() => store.getters.getCurrentLeague);

    const { standings, error, loadLeagueStandings } = getLeagueStandings();

    watchEffect(() => {
      loadLeagueStandings(currentLeague.value.current_season_id);
    });

    return { standings, error, currentLeague };
  },
};
</script>
<style>
.table {
  height: fit-content;
  margin-top: 1.5rem;
}

hr {
  border: none;
  height: 2px;
  background-color: #fff;
}
</style>

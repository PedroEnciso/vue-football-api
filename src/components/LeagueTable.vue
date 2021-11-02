<template>
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
  border-radius: 0.5rem;
  overflow: hidden;
  height: fit-content;
}

hr {
  border: none;
  height: 2px;
  background-color: #f2f2f2;
}
</style>

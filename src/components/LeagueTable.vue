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
import { ref, watchEffect } from "vue";

export default {
  components: { TableRow },
  props: ["season_id"],
  setup(props) {
    const { standings, error, loadLeagueStandings } = getLeagueStandings();

    watchEffect(() => {
      loadLeagueStandings(props.season_id);
    });

    return { standings, error };
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

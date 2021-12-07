<template>
  <div>
    <h2 v-if="routeName !== 'Table'">League Table</h2>
    <div :class="routeName === 'Table' ? 'big-margin' : 'small-margin'">
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
    <div v-if="routeName !== 'Table'" class="link-container">
      <router-link
        :to="{
          name: 'Table',
          params: { idType: 'league', id: `${currentLeague.id}` },
        }"
        class="page-link"
        >See full table</router-link
      >
    </div>
  </div>
</template>
<script>
import TableRow from "./TableRow.vue";
import getLeagueStandings from "../composables/getLeagueStandings";
import { watchEffect, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  components: { TableRow },
  setup() {
    // get the route name to hide title/link if on Table page
    const route = useRoute();
    const routeName = ref(route.name);

    const store = useStore();
    const currentLeague = computed(() => store.getters.getCurrentLeague);

    const { standings, error, loadLeagueStandings } = getLeagueStandings();

    // update currentLeague whenever the league is changed
    // I can get rid of all watchEffects if I push a new route when chnaging the league
    //// in the header instead of only updating currentLeague
    watchEffect(() => {
      loadLeagueStandings(currentLeague.value.current_season_id);
    });

    console.log(standings);

    return { standings, error, currentLeague, routeName };
  },
};
</script>
<style>
.small-margin {
  margin-top: 1.5rem;
}

.big-margin {
  margin-top: 3rem;
}

hr {
  border: none;
  height: 2px;
  background-color: #fff;
}
</style>

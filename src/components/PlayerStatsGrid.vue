<template>
  <div
    class="player_stats_grid"
    :class="
      routeName === 'Overview' ? 'overview_columns' : 'stats_columns margin'
    "
  >
    <PlayerStats
      v-if="playerStats"
      title="Top Scorers"
      statType="goals"
      :playerStatsList="topScorers"
      :routeName="routeName"
    />

    <PlayerStats
      v-if="routeName === 'Stats' && playerStats"
      title="Most Assists"
      statType="assists"
      :playerStatsList="topAssists"
    />

    <PlayerStats
      v-if="routeName === 'Stats' && playerStats"
      title="Most Cards"
      statType="cards"
      :playerStatsList="mostCards"
    />
  </div>
</template>
<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import PlayerStats from "./PlayerStats.vue";
import getPlayerStats from "../composables/getPlayerStats";
export default {
  components: {
    PlayerStats,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const currentLeague = computed(() => store.getters.getCurrentLeague);

    const routeName = ref(route.name);

    const {
      playerStats,
      error,
      loadPlayerStats,
      topScorers,
      topAssists,
      mostCards,
    } = getPlayerStats();
    loadPlayerStats(currentLeague.value.current_season_id);

    return { routeName, playerStats, error, topScorers, topAssists, mostCards };
  },
};
</script>
<style>
.player_stats_grid {
  width: 100%;
  display: grid;
  grid-gap: 1.5rem;
}

.margin {
  margin-top: 3rem;
}

.overview_columns {
  grid-template-columns: 1fr;
}

.stats_columns {
  grid-template-columns: 1fr;
}

@media only screen and (min-width: 700px) {
  .stats_columns {
    grid-template-columns: 1fr 1fr;
  }
}

@media only screen and (min-width: 900px) {
  .stats_columns {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>

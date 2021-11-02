<template>
  <div class="player_stats_grid">
    <PlayerStats
      v-if="playerStats"
      title="Top Scorers"
      statType="goals"
      :playerStatsList="topScorers"
    />
    <PlayerStats
      v-if="playerStats"
      title="Top Assits"
      statType="assists"
      :playerStatsList="topAssists"
    />
    <PlayerStats
      v-if="playerStats"
      title="Most Cards"
      statType="cards"
      :playerStatsList="mostCards"
    />
  </div>
</template>
<script>
import { computed, watchEffect } from "vue";
import { useStore } from "vuex";
import PlayerStats from "./PlayerStats.vue";
import getPlayerStats from "../composables/getPlayerStats";
export default {
  components: {
    PlayerStats,
  },
  setup() {
    const store = useStore();
    const currentLeague = computed(() => store.getters.getCurrentLeague);

    const {
      playerStats,
      error,
      loadPlayerStats,
      topScorers,
      topAssists,
      mostCards,
    } = getPlayerStats();
    watchEffect(() => {
      loadPlayerStats(currentLeague.value.current_season_id);
    });

    return { playerStats, error, topScorers, topAssists, mostCards };
  },
};
</script>
<style>
.player_stats_grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
}

@media only screen and (min-width: 700px) {
  .player_stats_grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media only screen and (min-width: 900px) {
  .player_stats_grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>

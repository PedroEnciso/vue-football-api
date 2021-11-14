<template>
  <div class="player_stats_grid">
    <PlayerStats
      v-if="playerStats"
      title="Top Scorers"
      statType="goals"
      :playerStatsList="topScorers"
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
}
</style>

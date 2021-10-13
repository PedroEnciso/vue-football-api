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
import { ref, watchEffect } from "vue";
import PlayerStats from "./PlayerStats.vue";
import getPlayerStats from "../composables/getPlayerStats";
export default {
  props: ["season_id"],
  components: {
    PlayerStats,
  },
  setup(props) {
    const {
      playerStats,
      error,
      loadPlayerStats,
      topScorers,
      topAssists,
      mostCards,
    } = getPlayerStats();
    watchEffect(() => {
      loadPlayerStats(props.season_id);
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

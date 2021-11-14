<template>
  <div class="home_component box-shadow player_stats_component">
    <h2 class="player_stats_title">{{ title }}</h2>
    <PlayerStatsPlayer
      v-for="(player, index) in playerStatsList"
      :player="player"
      :key="player.player_id"
      :playerStatsList="playerStatsList"
      :index="index"
    />
  </div>
</template>
<script>
import PlayerStatsPlayer from "./PlayerStatsPlayer";
export default {
  props: ["playerStatsList", "title", "statType"],
  components: { PlayerStatsPlayer },
};
</script>
<style>
.player_stats_title {
  margin-bottom: 1.5rem;
}

.player_stats_component {
  height: fit-content;
}
</style>

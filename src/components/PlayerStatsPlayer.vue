<template>
  <div class="player_container">
    <div class="stats_player_container">
      <div class="stats_player_stat_container_flex">
        <img
          :class="index === 0 ? 'stats_player_image_top' : 'stats_player_image'"
          :src="player.player.data.image_path"
          :alt="player.player.data.display_name"
        />
      </div>
      <div class="stats_player_information">
        <p class="stats_player_name">
          {{ player.player.data.display_name }}
        </p>
        <div v-if="index === 0" class="stats_player_team">
          <img :src="player.team.data.logo_path" :alt="player.team.data.name" />
          <p>{{ player.team.data.name }}</p>
        </div>
      </div>
    </div>
    <div class="player_stats_player_stat">
      <p :class="index === 0 ? 'top_stat' : 'stat'">
        {{ player.goals }}
      </p>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";

export default {
  props: ["player", "playerStatsList", "index"],
};
</script>
<style scoped>
.player_container {
  display: flex;
  justify-content: space-between;
  background: var(--light-background-color);
  padding: 0.5rem 0.75rem;
  border-radius: 5px;
  margin-bottom: 0.25rem;
}

.stats_player_container {
  display: flex;
  align-items: center;
}

.stats_player_stat_container_flex {
  display: flex;
  align-items: center;
}

.stats_player_image_top {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.stats_player_image {
  width: 35px;
  height: 35px;
  margin-right: 10px;
}

.stats_player_information {
  line-height: 1.5rem;
}

.stats_player_name {
  font-weight: 500;
}

.stats_player_team {
  display: flex;
  align-items: center;
}

.stats_player_team img {
  height: 20px;
  width: 20px;
  margin-right: 5px;
}

.player_stats_player_stat {
  align-self: end;
}

.player_stats_player_stat p {
  font-weight: 500;
}

.top_stat {
  font-size: 2rem;
}

.stat {
  font-size: 1.55rem;
}
</style>

<template>
  <div class="player_stats_player_container" :class="oddEven">
    <div class="player_stats_player_information">
      <p class="player_stats_player_name">
        {{ player.player.data.display_name }}
      </p>
      <div class="player_stats_player_team">
        <img :src="player.team.data.logo_path" :alt="player.team.data.name" />
        <p>{{ player.team.data.name }}</p>
      </div>
      <p class="player_stats_player_stat" v-if="statType === 'goals'">
        {{ player.goals }}
      </p>
      <p class="player_stats_player_stat" v-if="statType === 'assists'">
        {{ player.assists }}
      </p>
      <p class="player_stats_player_stat" v-if="statType === 'cards'">
        {{ totalCards }}
      </p>
    </div>
    <div class="player_stats_player_image">
      <img
        :src="player.player.data.image_path"
        :alt="player.player.data.display_name"
      />
    </div>
  </div>
</template>
<script>
import { computed } from "vue";

export default {
  props: ["player", "statType", "playerStatsList"],
  setup(props) {
    const oddEven = computed(() => {
      const remainder = props.playerStatsList.indexOf(props.player) % 2;
      if (remainder === 1) return "odd";
      return "even";
    });

    const totalCards = computed(() => {
      if (props.statType === "cards") {
        return props.player.redcards + props.player.yellowcards;
      }
      return;
    });

    return { oddEven, totalCards };
  },
};
</script>
<style>
.odd {
  background-color: #ebebeb;
}

.player_stats_player_container {
  display: flex;
  justify-content: space-between;
  padding: 10px 1rem 0rem 1rem;
  margin-left: -1rem;
  margin-right: -1rem;
}

.player_stats_player_information {
  line-height: 1.5rem;
}

.player_stats_player_name {
  font-size: 1rem;
  font-weight: 300;
}

.player_stats_player_team {
  display: flex;
  align-items: center;
}

.player_stats_player_team img {
  height: 20px;
  width: 20px;
  margin-right: 5px;
}

.player_stats_player_team p {
  font-size: 0.9rem;
  font-weight: 300;
}

.player_stats_player_stat {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.75rem;
}

.player_stats_player_image {
  align-self: end;
}

.player_stats_player_image img {
  width: 65px;
  height: 65px;
  margin-bottom: -6px;
}
</style>

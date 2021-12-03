<template>
  <div>
    <h2 class="player_stats_title">{{ title }}</h2>
    <PlayerStatsPlayer
      v-for="(player, index) in playerStatsList"
      :player="player"
      :key="player.player_id"
      :playerStatsList="playerStatsList"
      :index="index"
    />
    <div class="link-container">
      <router-link
        :to="{
          name: 'Stats',
          params: { idType: 'league', id: `${currentLeague.id}` },
        }"
        class="page-link"
        >See all stats</router-link
      >
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import PlayerStatsPlayer from "./PlayerStatsPlayer";
export default {
  props: ["playerStatsList", "title", "statType"],
  components: { PlayerStatsPlayer },
  setup() {
    const store = useStore();
    const currentLeague = computed(() => store.getters.getCurrentLeague);

    return { currentLeague };
  },
};
</script>
<style>
.player_stats_title {
  margin-bottom: 1.5rem;
}
</style>

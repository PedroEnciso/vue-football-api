<template>
  <div v-if="index === 0" class="player_container top_player_container">
    <div class="player_bio">
      <p class="player_name">{{ player.player.data.display_name }}</p>
      <div class="team_line">
        <img
          class="team_img"
          :src="player.team.data.logo_path"
          :alt="player.team.data.name"
        />
        <p>{{ player.team.data.name }}</p>
      </div>
      <p v-if="player.type === 'goals'" class="player_stat">
        {{ player.goals }}
      </p>
      <p v-if="player.type === 'assists'" class="player_stat">
        {{ player.assists }}
      </p>
      <div v-if="player.type === 'cards'" class="card_grid">
        <p class="red other_player_stat">
          {{ player.redcards }} <span class="description">red</span>
        </p>
        <p class="yellow other_player_stat">
          {{ player.yellowcards }} <span class="description">yellow</span>
        </p>
      </div>
    </div>
    <div class="player_photo">
      <img
        :src="player.player.data.image_path"
        :alt="player.player.data.display_name"
      />
    </div>
  </div>

  <div v-if="index > 0" class="player_container other_player_container">
    <div class="other_player_bio">
      <img
        class="other_player_img"
        :src="player.player.data.image_path"
        :alt="player.player.data.display_name"
      />
      <div class="other_player_grid">
        <p>{{ player.player.data.display_name }}</p>
        <div class="other_player_team">
          <img
            class="other_team_img"
            :src="player.team.data.logo_path"
            :alt="player.team.data.name"
          />
          <p>{{ player.team.data.name }}</p>
        </div>
      </div>
    </div>
    <p v-if="player.type === 'goals'" class="other_player_stat">
      {{ player.goals }}
    </p>
    <p v-if="player.type === 'assists'" class="other_player_stat">
      {{ player.assists }}
    </p>
    <div v-if="player.type === 'cards'" class="card_grid">
      <p class="red other_player_stat">{{ player.redcards }}</p>
      <p class="yellow other_player_stat">{{ player.yellowcards }}</p>
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
/** Top player styles */
.player_container {
  width: 100%;
  max-width: 330px;
  padding: 0.75rem 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 0.5rem;
}

.top_player_container {
  background-color: var(--regular-text-color);
}

.player_bio {
  display: grid;
  grid-gap: 0.5rem;
}

.player_name {
  font-size: 0.95rem;
  color: var(--light-background-color);
}

.team_line {
  display: flex;
  align-items: center;
}

.team_img {
  width: 25px;
  margin-right: 10px;
}

.team_line p {
  color: var(--light-background-color);
}

.player_stat {
  font-weight: 500;
  font-size: 1.5rem;
  color: var(--light-background-color);
}

.player_photo {
  display: flex;
}

.player_photo img {
  width: 60px;
}

.card_grid {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-gap: 10px;
}

.red {
  color: rgb(235, 85, 85);
  grid-row: 1/2;
}

.yellow {
  color: rgb(162, 173, 0);
  grid-row: 2/3;
}

.description {
  font-size: 0.9rem;
}

/** Styles for players 2-5 */
.other_player_container {
  background-color: var(--light-background-color);
}

.other_player_bio {
  display: flex;
  align-items: center;
}

.other_player_img {
  width: 45px;
  margin-right: 10px;
}

.other_player_team {
  display: flex;
  align-items: center;
}

.other_player_stat {
  font-size: 1.25rem;
}

.other_player_grid {
  display: grid;
  grid-gap: 0.25rem;
}

.other_team_img {
  width: 20px;
  margin-right: 10px;
}
</style>

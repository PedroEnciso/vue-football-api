<template>
  <div v-if="position === '0'" class="table_row header_row">
    <p></p>
    <p class="position bold-text table_header">Team</p>
    <p class="bold-text table_header">Pl</p>
    <p class="bold-text table_header">W</p>
    <p class="bold-text table_header">D</p>
    <p class="bold-text table_header">L</p>
    <p class="bold-text table_header">+ / -</p>
    <p class="bold-text table_header">GD</p>
    <p class="bold-text table_header">PTS</p>
  </div>
  <div v-else class="table_row">
    <p class="position">{{ position }}</p>
    <router-link
      :to="{
        name: 'TeamView',
        params: { team_id: team.team_id },
      }"
      class="team"
    >
      <img :src="team.team_logo" :alt="team.team_name" />
      <p class="team_name">{{ team.team_name }}</p>
    </router-link>
    <p>{{ team.overall.games_played }}</p>
    <p>{{ team.overall.won }}</p>
    <p>{{ team.overall.draw }}</p>
    <p>{{ team.overall.lost }}</p>
    <p>{{ team.overall.goals_scored }} / {{ team.overall.goals_against }}</p>
    <p>{{ team.overall.goal_diff }}</p>
    <p>{{ team.points }}</p>
  </div>
  <hr v-if="position != 20" />
</template>
<script>
export default {
  props: ["position", "team"],
};
</script>
<style scoped>
.table_row {
  width: 100%;
  padding: 0.75rem 0.75rem;
  display: grid;
  grid-template-columns: 1fr 4fr repeat(7, 1fr);
  align-items: center;
  justify-items: center;
  background-color: var(--light-background-color);
  border-radius: 5px;
  transition: background-color 0.4s;
}

.table_row:hover {
  background-color: #fff;
}

/* Table header styles */
.table_header {
  color: var(--light-text-color);
}

.header_row:hover {
  background-color: var(--light-background-color);
}

/* Table body styles */
.position {
  justify-self: start;
}

.team {
  justify-self: start;
  display: flex;
}

.team img {
  height: 1.2rem;
  margin-right: 0.6rem;
}

.team_name {
  font-weight: 400;
}
</style>

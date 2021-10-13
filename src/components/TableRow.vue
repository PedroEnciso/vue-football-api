<template>
  <div v-if="position === '0'" class="table_row header_row">
    <p></p>
    <h3 class="h3_team">Team</h3>
    <h3>Pl</h3>
    <h3>W</h3>
    <h3>D</h3>
    <h3>L</h3>
    <h3>+/-</h3>
    <h3>GD</h3>
    <h3>PTS</h3>
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
      <h3>{{ team.team_name }}</h3>
    </router-link>
    <p>{{ team.overall.games_played }}</p>
    <p>{{ team.overall.won }}</p>
    <p>{{ team.overall.draw }}</p>
    <p>{{ team.overall.lost }}</p>
    <p>{{ team.overall.goals_scored }}-{{ team.overall.goals_against }}</p>
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
<style>
.table_row {
  width: 100%;
  padding: 0.5rem 0.75rem;
  display: grid;
  grid-template-columns: 1fr 6fr repeat(7, 1fr);
  align-items: center;
  background-color: white;
  justify-items: center;
}

.header_row {
  color: #a5a5a5;
}

.position {
  justify-self: start;
}

.table_row a {
  text-decoration: none;
}

.table_row h3 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2c3e50;
}

.h3_team {
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

.table_row p {
  font-size: 0.8rem;
  font-weight: 400;
}
</style>

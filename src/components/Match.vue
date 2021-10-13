<template>
  <div v-if="match.scores.ft_score" class="match">
    <div class="match_team">
      <img
        class="match_club_crest"
        :src="match.localTeam.data.logo_path"
        :alt="match.localTeam.data.name"
      />
      <h3 class="match_team_name">{{ match.localTeam.data.name }}</h3>
    </div>
    <div class="match_score">
      <p>{{ match.scores.ft_score }}</p>
    </div>
    <div class="match_team">
      <img
        class="match_club_crest"
        :src="match.visitorTeam.data.logo_path"
        :alt="match.visitorTeam.data.name"
      />
      <h3 class="match_team_name">{{ match.visitorTeam.data.name }}</h3>
    </div>
  </div>
</template>
<script>
export default {
  props: ["match"],
};
</script>
<style>
.match {
  height: 100px;
  width: 180px;
  border-radius: 0.5rem;
  border: 1px solid #d1cdcd;
  margin-right: 20px;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.match_team {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.match_club_crest {
  height: 40px;
  width: 40px;
  margin-bottom: 5px;
}

.match_team_name {
  font-size: 0.8rem;
  font-weight: 400;
}

.match_score p {
  white-space: nowrap;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0px 3px;
}

.match_date {
  position: absolute;
  top: 80%;
  left: 50;
}
</style>

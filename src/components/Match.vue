<template>
  <div v-if="match.scores.ft_score" class="match">
    <div class="match_team">
      <img
        class="match_club_crest"
        :src="match.localTeam.data.logo_path"
        :alt="match.localTeam.data.name"
      />
      <p class="match_team_name">{{ match.localTeam.data.name }}</p>
    </div>
    <div class="match_score ">
      <p>{{ match.scores.ft_score }}</p>
    </div>
    <div class="match_team">
      <img
        class="match_club_crest"
        :src="match.visitorTeam.data.logo_path"
        :alt="match.visitorTeam.data.name"
      />
      <p class="match_team_name">{{ match.visitorTeam.data.name }}</p>
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
  height: 115px;
  width: 220px;
  background-color: var(--light-background-color);
  border-radius: 5px;
  margin-right: 20px;
  padding: 10px 15px;
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  place-items: center;
  position: relative;
}

.match_team {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.match_team p {
  color: var(--dark-text-color);
}

.match_club_crest {
  height: 40px;
  width: 40px;
  margin-bottom: 5px;
}

.match_team_name {
  text-align: center;
}

.match_score p {
  white-space: nowrap;
  text-align: center;
  font-weight: 700;
}

.match_date {
  position: absolute;
  top: 80%;
  left: 50;
}
</style>

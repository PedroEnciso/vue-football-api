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
    <div class="match_score">
      <p class="score">{{ match.scores.ft_score }}</p>
    </div>
    <div class="match_team">
      <img
        class="match_club_crest"
        :src="match.visitorTeam.data.logo_path"
        :alt="match.visitorTeam.data.name"
      />
      <p class="match_team_name">{{ match.visitorTeam.data.name }}</p>
    </div>
    <p class="match_date">{{ formattedDate }}</p>
  </div>
</template>
<script>
import { computed } from "vue";
import { DateTime } from "luxon";

export default {
  props: ["match"],
  setup(props) {
    // computed function to change the format of the date given from the API
    const formattedDate = computed(() => {
      return DateTime.fromISO(props.match.time.starting_at.date).toFormat(
        "MM/dd"
      );
    });

    return { formattedDate };
  },
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

.match_score {
  white-space: nowrap;
  text-align: center;
}

.score {
  font-weight: 700;
}

.match_date {
  position: absolute;
  top: 8%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
}
</style>

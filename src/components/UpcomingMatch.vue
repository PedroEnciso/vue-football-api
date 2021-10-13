<template>
  <div>
    <div class="upcoming_matches_match">
      <p class="upcoming_matches_match_date">{{ formattedDate }}</p>
      <div class="upcoming_matches_match_teams">
        <div class="upcoming_matches_team home_team">
          <p>{{ match.localTeam.data.name }}</p>
          <img
            :src="match.localTeam.data.logo_path"
            :alt="match.localTeam.data.name"
          />
        </div>
        <div class="upcoming_matches_time">
          <p>{{ formattedTime }}</p>
        </div>
        <div class="upcoming_matches_team">
          <img
            :src="match.visitorTeam.data.logo_path"
            :alt="match.visitorTeam.data.name"
          />
          <p>{{ match.visitorTeam.data.name }}</p>
        </div>
      </div>
    </div>
    <hr v-if="upcomingMatches.indexOf(match) < 5" class="upcomingMatch_hr" />
  </div>
</template>
<script>
import { computed } from "vue";
import { DateTime } from "luxon";

export default {
  props: ["match", "upcomingMatches"],
  setup(props) {
    // computed function to change the format of the date given from the API
    const formattedDate = computed(() => {
      return DateTime.fromISO(props.match.time.starting_at.date).toFormat(
        "EEE, MMM dd"
      );
    });
    // format the time returned by the API
    const formattedTime = computed(() => {
      return DateTime.fromISO(props.match.time.starting_at.time).toFormat("t");
    });

    return { formattedDate, formattedTime };
  },
};
</script>
<style>
.upcoming_matches_match {
  display: flex;
  flex-direction: column;
}

.upcoming_matches_match_date {
  padding-top: 8px;
  font-size: 0.7rem;
  font-weight: 400;
  color: #a5a5a5;
}

.upcoming_matches_match_teams {
  padding-top: 3px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.upcoming_matches_match_teams .home_team {
  justify-self: right;
}

.upcoming_matches_team {
  display: flex;
  align-items: center;
}

.upcoming_matches_team img {
  height: 30px;
  width: 30px;
  margin: 0px 5px;
}

.upcoming_matches_time {
  padding-left: 8px;
  padding-right: 8px;
  max-width: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upcoming_matches_time p {
  font-size: 0.8rem;
  color: #a5a5a5;
  line-height: 0.9rem;
  font-weight: 400;
}

.upcomingMatch_hr {
  margin-top: 0.75rem;
}
</style>

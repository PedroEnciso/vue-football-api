<template>
  <div class="match_container">
    <div class="match_row">
      <img :src="homeTeam.getBadgeUrl()" :alt="homeTeam.getId()" />
      <p>{{ homeTeam.getName() }}</p>
      <p class="score" v-if="match.scores.ft_score">
        {{ match.scores.localteam_score }}
      </p>
    </div>

    <div class="match_row">
      <img :src="awayTeam.getBadgeUrl()" :alt="awayTeam.getId()" />
      <p>{{ awayTeam.getName() }}</p>
      <p class="score" v-if="match.scores.ft_score">
        {{ match.scores.visitorteam_score }}
      </p>
    </div>
    <div class="match_bottom_row">
      <p>{{ formattedDate }}</p>
      <p>{{ formattedTime }}</p>
    </div>
  </div>
</template>
<script>
import { computed, ref } from "vue";
import { DateTime } from "luxon";

export default {
  props: ["match", "upcomingMatches", "allTeams"],
  setup(props) {
    const homeTeam = ref(null);
    const awayTeam = ref(null);

    // check if the match has been played
    const hasMatchBeenPlayed = computed(() => {
      if (props.match.scores.ft_score) {
        return true;
      } else {
        return false;
      }
    });

    // computed function to change the format of the date given from the API
    const formattedDate = computed(() => {
      return DateTime.fromISO(props.match.time.starting_at.date).toFormat(
        "MMM dd"
      );
    });

    // format the time of the match
    const formattedTime = computed(() => {
      if (hasMatchBeenPlayed.value) {
        return "FT";
      } else {
        return DateTime.fromISO(props.match.time.starting_at.time).toFormat(
          "t"
        );
      }
      return DateTime.fromISO(props.match.time.starting_at.time).toFormat("t");
    });

    // returns the Team object with the home team information
    // must pass in the home team's id
    const getTeamData = (teamId, ref) => {
      props.allTeams.forEach((team) => {
        if (team.getId() === teamId) {
          ref.value = team;
        }
      });
    };

    // assign the data for home and away teams to their refs
    getTeamData(props.match.localteam_id, homeTeam);
    getTeamData(props.match.visitorteam_id, awayTeam);

    return { formattedDate, formattedTime, homeTeam, awayTeam };
  },
};
</script>
<style scoped>
.match_container {
  width: 100%;
  max-width: 300px;
  padding: 1.2rem 1.5rem;
  background-color: var(--light-background-color);
}

.match_row {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  position: relative;
}

.match_row p {
  font-size: 0.95rem;
}

.match_row img {
  width: 35px;
  margin-right: 0.5rem;
}

.score {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  font-weight: 500;
}

.match_bottom_row {
  display: flex;
  justify-content: space-between;
}
</style>

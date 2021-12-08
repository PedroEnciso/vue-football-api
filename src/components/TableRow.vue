<template>
  <div
    v-if="position === '0'"
    class="table_row header_row"
    :class="
      routeName === 'Table' && windowWidth > 600
        ? 'table-view-columns'
        : 'home-view-columns'
    "
  >
    <p></p>
    <p class="position bold-text table_header">Team</p>
    <p class="bold-text table_header">Pl</p>
    <p class="bold-text table_header">W</p>
    <p class="bold-text table_header">D</p>
    <p class="bold-text table_header">L</p>
    <p class="bold-text table_header">+ / -</p>
    <p class="bold-text table_header">GD</p>
    <p class="bold-text table_header">PTS</p>
    <p
      v-if="routeName === 'Table' && windowWidth > 600"
      class="bold-text table_header"
    >
      FORM
    </p>
  </div>
  <div
    v-else
    class="table_row"
    :class="
      routeName === 'Table' && windowWidth > 600
        ? 'table-view-columns'
        : 'home-view-columns'
    "
  >
    <p
      class="position position-mark"
      :class="[
        { promotion: team.description === 'Championship Round' },
        { relegation: team.description === 'Relegation Round' },
      ]"
    >
      {{ position }}
    </p>
    <div class="team">
      <img :src="team.team_logo" :alt="team.team_name" />
      <p class="team_name">{{ team.team_name }}</p>
    </div>
    <p>{{ team.overall.games_played }}</p>
    <p>{{ team.overall.won }}</p>
    <p>{{ team.overall.draw }}</p>
    <p>{{ team.overall.lost }}</p>
    <p>{{ team.overall.goals_scored }} / {{ team.overall.goals_against }}</p>
    <p>{{ team.overall.goal_diff }}</p>
    <p>{{ team.points }}</p>
    <div
      v-if="routeName === 'Table' && windowWidth > 600"
      class="form-container"
    >
      <div
        v-for="(result, index) in recentForm"
        :key="index"
        :class="result"
        class="result"
      >
        <p>{{ result }}</p>
      </div>
    </div>
  </div>
  <hr v-if="position != 20" />
</template>

<script>
import { ref, watchEffect, computed } from "vue";
import { useRoute } from "vue-router";
export default {
  props: ["position", "team", "windowWidth"],
  setup(props) {
    // use route name to determine table columns and include form section
    const route = useRoute();
    const routeName = ref(route.name);
    const recentForm = ref([]);

    const getRecentForm = () => {
      // placeholder array
      const formHolder = [];
      // turn the string form into an array of matches
      let formArray = props.team.recent_form.split("");
      // get results from the last 5 matches
      formArray = formArray.slice(Math.max(formArray.length - 5, 0));
      // return reversed array to get most recent matches first
      return formArray;
    };

    watchEffect(() => {
      // only get recent form if props.team is initialized and user is on Table page
      if (props.team) {
        recentForm.value = getRecentForm();
      }
    });

    return { routeName, recentForm };
  },
};
</script>

<style scoped>
.table_row {
  width: 100%;
  position: relative;
  padding: 0.75rem 0.75rem;
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: var(--light-background-color);
  border-radius: 5px;
  transition: background-color 0.4s;
}

.home-view-columns {
  grid-template-columns: 1fr 8fr repeat(4, 2fr) 4fr repeat(2, 2fr);
}

.table-view-columns {
  grid-template-columns: 1fr 8fr repeat(4, 2fr) 4fr repeat(2, 2fr) 8fr;
}

@media only screen and (max-width: 650px) {
  .table-view-columns {
    grid-template-columns: 1fr 8fr repeat(4, 2fr) 4fr repeat(2, 2fr) 8fr;
  }
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

.position-mark::after {
  width: 3px;
  height: 10px;
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 5px 0px 0px 5px;
}

.promotion::after {
  background-color: rgb(70, 163, 70);
}

.relegation::after {
  background-color: rgb(219, 65, 65);
}

.team {
  justify-self: start;
  display: flex;
  align-items: center;
}

.team img {
  height: 1.2rem;
  margin-right: 0.6rem;
}

.form-container {
  width: 65%;
  display: flex;
  justify-content: space-between;
}

.result {
  width: 20px;
  line-height: 1.5;
  display: grid;
  place-items: center;
  border-radius: 5px;
}

.result p {
  font-weight: 600;
}

.W p {
  color: rgb(70, 163, 70);
}

.L p {
  color: rgb(219, 65, 65);
}

.D p {
  color: var(--light-text-color);
}
</style>

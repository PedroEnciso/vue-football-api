<template>
  <div v-if="allLeagues" class="header">
    <div class="header__league_info">
      <img :src="currentLeague.logo_path" :alt="currentLeague.name" />
      <h1>{{ currentLeague.name }}</h1>
    </div>
    <LeagueSelector />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { mapGetters, useStore } from "vuex";
import LeagueSelector from "./LeagueSelector.vue";
export default {
  components: {
    LeagueSelector,
  },
  setup() {
    const selectedLeagueID = ref("");
    const store = useStore();

    const currentLeague = computed(() => store.getters.getCurrentLeague);
    const allLeagues = computed(() => store.getters.getAllLeagues);

    const selectNewLeague = () => {
      // do nothing if the placeholder is selected
      if (selectedLeagueID.value === "") return;
      const selectedLeague = allLeagues.value.filter(
        (league) => league.id === selectedLeagueID.value
      );
      store.commit("setCurrentLeague", selectedLeague[0]);
    };

    return { selectedLeagueID, selectNewLeague, currentLeague, allLeagues };
  },
};
</script>

<style scoped>
.header {
  padding-top: 3rem;
  padding-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.header__league_info {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-right: 3rem;
}

.header__league_info img {
  height: 45px;
  width: 45px;
  margin-right: 20px;
}

.header select {
  height: fit-content;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  width: 175px;
  background-color: var(--light-background-color);
}

@media only screen and (max-width: 700px) {
  .header {
    flex-direction: column;
    align-items: center;
  }
  form {
    margin-top: 2rem;
  }
}
</style>

<template>
  <div v-if="allLeagues" class="header">
    <div class="header__league_info">
      <img :src="currentLeague.logo_path" :alt="currentLeague.name" />
      <h1>{{ currentLeague.name }}</h1>
    </div>
    <form>
      <select
        v-model="selectedLeagueID"
        autocomplete="off"
        placeholder="Select a league"
      >
        <option value="" disabled selected>Select a league</option>
        <option
          v-for="league in allLeagues"
          :key="league.id"
          :value="league.id"
        >
          {{ league.name }}
        </option>
      </select>
      <button @click="selectNewLeague" class="bold-text" type="button">
        Go
      </button>
    </form>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { mapGetters, useStore } from "vuex";
export default {
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

@media only screen and (max-width: 525px) {
  .header {
    justify-content: center;
  }
  form {
    margin-top: 2rem;
  }
}
</style>

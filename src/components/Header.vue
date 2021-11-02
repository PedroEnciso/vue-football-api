<template>
  <div class="header container">
    <h1>{{ currentLeague.name }}</h1>
    <form>
      <select
        v-model="selectedLeagueID"
        class="box-shadow"
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
      <button @click="selectNewLeague" class="box-shadow" type="button">
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

<style>
.header {
  padding-top: 2rem;
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid white;
}

.header select {
  height: fit-content;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  width: 150px;
}

.header button {
  margin-left: 20px;
  padding: 0.5rem 0.4rem;
  border: none;
  border-radius: 0.75rem;
  background-color: rgb(189, 97, 212);
  color: white;
  cursor: pointer;
  transition: background-color 0.4s;
}

.header button:hover {
  background-color: rgb(227, 117, 255);
}

.header button:active {
  box-shadow: none;
}
</style>

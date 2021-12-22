<template >
  <form>
    <select
      v-model="selectedLeagueID"
      autocomplete="off"
      placeholder="Select a league"
    >
      <option value="" disabled selected>Select a league</option>
      <option v-for="league in allLeagues" :key="league.id" :value="league.id">
        {{ league.name }}
      </option>
    </select>
    <button @click="selectNewLeague" class="bold-text" type="button">Go</button>
  </form>
</template>
<script>
import { ref, computed } from "vue";
import { mapGetters, useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const selectedLeagueID = ref("");
    const store = useStore();
    const router = useRouter();

    const currentLeague = computed(() => store.getters.getCurrentLeague);
    const allLeagues = computed(() => store.getters.getAllLeagues);

    const selectNewLeague = () => {
      // do nothing if the placeholder is selected
      if (selectedLeagueID.value === "") return;
      const selectedLeague = allLeagues.value.filter(
        (league) => league.id === selectedLeagueID.value
      );
      store.commit("setCurrentLeague", selectedLeague[0]);
      router.push(`/overview/league/${selectedLeagueID.value}`);
    };

    return { selectedLeagueID, selectNewLeague, currentLeague, allLeagues };
  },
};
</script>
<style>
select {
  height: fit-content;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  width: 175px;
  background-color: var(--light-background-color);
}
</style>
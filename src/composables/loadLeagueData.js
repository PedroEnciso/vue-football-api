import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const loadLeagueData = async () => {
  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  // const currentLeague = computed(() => store.getters.getCurrentLeague);
  const allLeagues = computed(() => store.getters.getAllLeagues);

  // check if allLeagues is loaded
  if (!allLeagues.value) {
    const loadCurrentLeague = await store.dispatch("loadCurrentLeague");
  }
  // match currentLeague with the id in the route
  const paramLeague = allLeagues.value.filter((league) => {
    return league.id.toString() === route.params.id;
  });
  // check if league exists
  if (!paramLeague[0]) {
    // if not, send to home page (for now)
    router.push("/");
  } else {
    // if it does exist, set current league
    store.commit("setCurrentLeague", paramLeague[0]);
  }

  return allLeagues;
};

export default loadLeagueData;

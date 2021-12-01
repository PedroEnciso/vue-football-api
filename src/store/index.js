import { createStore } from "vuex";
import { useRoute } from "vue-router";
import axios from "axios";

export default createStore({
  state: {
    currentLeague: null,
    allLeagues: null,
  },
  getters: {
    getCurrentLeague: (state) => state.currentLeague,
    getAllLeagues: (state) => state.allLeagues,
  },
  mutations: {
    setCurrentLeague: (state, league) => (state.currentLeague = league),
    setAllLeagues: (state, leagueArray) => (state.allLeagues = leagueArray),
  },
  actions: {
    async loadCurrentLeague({ commit }) {
      const API_TOKEN =
        "bXSpCz0qhyhgfTs692uyNUmWzHPU4aXW3YzwERIvu30bOOp0DB7AzKtJ0lT3";
      const url = `https://soccer.sportmonks.com/api/v2.0/leagues?api_token=${API_TOKEN}`;
      const route = useRoute();
      const response = await axios.get(url);
      // filter out play-off leagues
      const filteredLeagues = response.data.data.filter(
        (league) => !league.name.includes("Play-")
      );
      // check if the app is showing the home page
      if (route.name !== "Home") {
        // if showing the home page, keep currentLeague null so the header doesn't show up on the home page
        commit("setCurrentLeague", filteredLeagues[0]);
      }

      commit("setAllLeagues", filteredLeagues);
    },
  },
});

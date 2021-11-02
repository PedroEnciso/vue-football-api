import { createStore } from "vuex";
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
      const response = await axios.get(url);
      commit("setCurrentLeague", response.data.data[0]);
      // filter out play-off leagues
      const filteredLeagues = response.data.data.filter(
        (league) => !league.name.includes("Play-")
      );
      console.log(filteredLeagues);
      commit("setAllLeagues", filteredLeagues);
    },
  },
});

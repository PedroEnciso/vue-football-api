import { ref } from "vue";

const getPlayerStats = () => {
  // dynamic varibales
  const error = ref(null);
  const playerStats = ref(null);
  const topScorers = ref(null);
  const topAssists = ref(null);
  const mostCards = ref(null);

  // static variables
  const API_TOKEN =
    "bXSpCz0qhyhgfTs692uyNUmWzHPU4aXW3YzwERIvu30bOOp0DB7AzKtJ0lT3";

  const loadPlayerStats = async (season_id) => {
    const url = `https://soccer.sportmonks.com/api/v2.0/topscorers/season/${season_id}?api_token=${API_TOKEN}&include=goalscorers.player,goalscorers.team,assistscorers.player,assistscorers.team,cardscorers.player,cardscorers.team`;
    try {
      let data = await fetch(url);
      // throw error if fetch is unsuccessful
      if (!data.ok) {
        throw Error("Data not available");
      }
      let parsedData = await data.json();
      playerStats.value = parsedData.data;
      // Only get the top 5 goal scorers
      topScorers.value = playerStats.value.goalscorers.data.slice(0, 5);
      topAssists.value = playerStats.value.assistscorers.data.slice(0, 5);
      mostCards.value = playerStats.value.cardscorers.data.slice(0, 5);
    } catch (err) {
      error.value = err.message;
      console.log(`Error message: ${error.value}`);
    }
  };

  return {
    playerStats,
    error,
    loadPlayerStats,
    topScorers,
    topAssists,
    mostCards,
  };
};

export default getPlayerStats;

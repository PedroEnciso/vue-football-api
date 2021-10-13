import { ref } from "vue";
import { DateTime } from "luxon";

const getLeagueStandings = () => {
  // dynamic varibales
  const error = ref(null);
  const standings = ref(null);

  // get today's date
  const date = DateTime.now().toFormat("yyyy-MM-dd");

  // API URL using the date range
  // static variables
  const API_TOKEN =
    "bXSpCz0qhyhgfTs692uyNUmWzHPU4aXW3YzwERIvu30bOOp0DB7AzKtJ0lT3";

  const loadLeagueStandings = async (seasonID) => {
    const url = `https://soccer.sportmonks.com/api/v2.0/standings/season/${seasonID}/date/${date}?api_token=${API_TOKEN}`;
    try {
      let data = await fetch(url);
      // throw error if fetch is unsuccessful
      if (!data.ok) {
        throw Error("Data not available");
      }
      let parsedData = await data.json();
      standings.value = parsedData.data;
    } catch (err) {
      error.value = err.message;
      console.log(`Error message: ${error.value}`);
    }
  };

  return { standings, error, loadLeagueStandings };
};

export default getLeagueStandings;

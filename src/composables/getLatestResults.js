import { ref } from "vue";
import { DateTime } from "luxon";

const getLatestResults = () => {
  // dynamic varibales
  const error = ref(null);
  const latestResults = ref(null);

  // use luxon to get 14 day time frame from the past
  // api uses date format YYYY-MM-DD
  const endDate = DateTime.now().toFormat("yyyy-MM-dd");
  const startDate = DateTime.fromISO(endDate).minus({ days: 90 }).toISODate();

  // API URL using the date range
  // static variables
  const API_TOKEN =
    "bXSpCz0qhyhgfTs692uyNUmWzHPU4aXW3YzwERIvu30bOOp0DB7AzKtJ0lT3";
  const url = `https://soccer.sportmonks.com/api/v2.0/fixtures/between/${startDate}/${endDate}?api_token=${API_TOKEN}&include=localTeam,visitorTeam&leagues=`;

  const loadLatestResults = async (league_id, round) => {
    try {
      let data = await fetch(url + league_id);

      // throw error if fetch is unsuccessful
      if (!data.ok) {
        throw Error("Data not available");
      }
      let parsedData = await data.json();
      latestResults.value = parsedData.data;

      // reverse array so the most recent results are at the front
      latestResults.value = latestResults.value.reverse();

      // filter out all fixtures that do not have the current round ID
      latestResults.value = latestResults.value.filter(
        (match) => match.round_id === round
      );
    } catch (err) {
      error.value = err.message;
    }
  };

  return { latestResults, error, loadLatestResults };
};

export default getLatestResults;

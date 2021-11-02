import { ref } from "vue";
import { DateTime } from "luxon";

const getUpcomingMatches = () => {
  // dynamic varibales
  const error = ref(null);
  const upcomingMatches = ref(null);

  // use luxon to get the next 14 days
  // api uses date format YYYY-MM-DD
  const startDate = DateTime.now().toFormat("yyyy-MM-dd");
  const endDate = DateTime.fromISO(startDate)
    .plus({ days: 14 })
    .toISODate();

  // API URL using the date range
  // static variables
  const API_TOKEN =
    "bXSpCz0qhyhgfTs692uyNUmWzHPU4aXW3YzwERIvu30bOOp0DB7AzKtJ0lT3";
  const url = `https://soccer.sportmonks.com/api/v2.0/fixtures/between/${startDate}/${endDate}?api_token=${API_TOKEN}&include=localTeam,visitorTeam&leagues=`;

  const loadUpcomingMatches = async (league_id, round) => {
    try {
      let data = await fetch(url + league_id);

      // throw error if fetch is unsuccessful
      if (!data.ok) {
        throw Error("Data not available");
      }
      let parsedData = await data.json();
      upcomingMatches.value = parsedData.data;

      // filter out all fixtures that have the current round ID
      upcomingMatches.value = upcomingMatches.value.filter(
        (match) => match.round_id !== round
      );
    } catch (err) {
      error.value = err.message;
    }
  };

  return { upcomingMatches, error, loadUpcomingMatches };
};

export default getUpcomingMatches;

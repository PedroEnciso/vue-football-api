import { ref } from "vue";

const getAllLeagues = () => {
  // dynamic varibales
  const error = ref(null);
  const allLeagues = ref([]);
  const currentLeague = ref();

  // API URL using the date range
  // static variables
  const API_TOKEN =
    "bXSpCz0qhyhgfTs692uyNUmWzHPU4aXW3YzwERIvu30bOOp0DB7AzKtJ0lT3";
  const url = `https://soccer.sportmonks.com/api/v2.0/leagues?api_token=${API_TOKEN}`;

  const loadAllLeagues = async () => {
    try {
      let data = await fetch(url);
      // throw error if fetch is unsuccessful
      if (!data.ok) {
        throw Error("Data not available");
      }
      let parsedData = await data.json();
      allLeagues.value = parsedData.data;
      // filter out the playoff leagues
      allLeagues.value = allLeagues.value.filter(
        (league) => !league.name.includes("Play-")
      );
      currentLeague.value = allLeagues.value[0];
    } catch (err) {
      error.value = err.message;
    }
  };

  return { allLeagues, error, loadAllLeagues, currentLeague };
};

export default getAllLeagues;

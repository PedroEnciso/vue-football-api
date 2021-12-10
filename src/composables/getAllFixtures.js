import { ref } from "vue";

const getAllFixtures = () => {
  // dynamic varibales
  const error = ref(null);
  const allFixtures = ref(null);
  const allTeams = ref([]);

  // API URL using the date range
  // static variables
  const API_TOKEN =
    "bXSpCz0qhyhgfTs692uyNUmWzHPU4aXW3YzwERIvu30bOOp0DB7AzKtJ0lT3";

  // constructor for a team
  const teamFactory = (teamData) => {
    const name = teamData.name;
    const getName = () => {
      return teamData.name;
    };
    const getBadgeUrl = () => {
      return teamData.logo_path;
    };
    const getId = () => {
      return teamData.id;
    };
    return { getName, getBadgeUrl, getId, name };
  };

  const loadAllFixtures = async (seasonID) => {
    const url = `https://soccer.sportmonks.com/api/v2.0/rounds/season/${seasonID}?api_token=${API_TOKEN}&include=fixtures,results`;
    try {
      let data = await fetch(url);
      // throw error if fetch is unsuccessful
      if (!data.ok) {
        throw Error("Data not available");
      }
      let parsedData = await data.json();
      // allFixtures.value = parsedData.data.results.data;
      // allFixtures.value = allFixtures.value.reverse();
      allFixtures.value = parsedData.data;
      await createTeamsList(seasonID);
    } catch (err) {
      error.value = err.message;
    }
  };

  const createTeamsList = async (seasonID) => {
    const teamsURL = `https://soccer.sportmonks.com/api/v2.0/teams/season/${seasonID}?api_token=${API_TOKEN}`;
    try {
      let data = await fetch(teamsURL);
      // throw error if fetch is unsuccessful
      if (!data.ok) {
        throw Error("Data not available");
      }
      let parsedData = await data.json();
      iterateTeamData(parsedData.data);
    } catch (err) {
      error.value = err.message;
    }
  };

  const iterateTeamData = (teamData) => {
    teamData.forEach((team) => {
      const newTeam = teamFactory(team);
      allTeams.value.push(newTeam);
    });
  };

  return { allFixtures, error, loadAllFixtures, allTeams };
};

export default getAllFixtures;

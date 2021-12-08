import { ref } from "vue";

const getAllFixtures = () => {
  // dynamic varibales
  const error = ref(null);
  const allFixtures = ref(null);

  // API URL using the date range
  // static variables
  const API_TOKEN =
    "bXSpCz0qhyhgfTs692uyNUmWzHPU4aXW3YzwERIvu30bOOp0DB7AzKtJ0lT3";
  const url = `https://soccer.sportmonks.com/api/v2.0/seasons/18334?api_token=${API_TOKEN}&include=results`;

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

  const loadAllFixtures = async () => {
    try {
      let data = await fetch(url);
      // throw error if fetch is unsuccessful
      if (!data.ok) {
        throw Error("Data not available");
      }
      let parsedData = await data.json();
      allFixtures.value = parsedData.data;
      console.log("Starting to create teams list");
      console.log(allFixtures.value.id);
      createTeamsList(allFixtures.value.id);
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
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
      console.log("calling iterateTeamData");
      iterateTeamData(parsedData.data);
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };

  const iterateTeamData = (teamData) => {
    const allTeams = [];
    teamData.forEach((team) => {
      const newTeam = teamFactory(team);
      allTeams.push(newTeam);
    });
    console.log(allTeams[0].getName());
  };

  return { allFixtures, error, loadAllFixtures };
};

export default getAllFixtures;

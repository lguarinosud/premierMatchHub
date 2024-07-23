import FootballAPI from "./api";
import { getCachedData, setCachedData } from "./utils.js";

export default class Team {
  constructor() {
    this.footballAPI = new FootballAPI();
    this.CACHE_KEY_TEAM_INFO = "teamInfo";
    this.CACHE_KEY_SQUAD = "teamSquad";
    this.CACHE_KEY_TEAMS = "teams";
  }

  async fetchTeams(league, season) {
    const cachedData = getCachedData(
      `${this.CACHE_KEY_TEAMS}_${league}_${season}`,
    );

    if (cachedData) {
      console.log(
        "Loaded from cache:",
        `cache_${this.CACHE_KEY_TEAMS}_${league}_${season}`,
      );
      return cachedData;
    }

    try {
      const endpoint = `teams?league=${league}&season=${season}`;
      const result = await this.footballAPI.fetchFootballData(endpoint);
      setCachedData(
        `${this.CACHE_KEY_TEAMS}_${league}_${season}`,
        result.response,
      );

      console.log("Loaded from API:", `cache_${league}_${season}`);
      const teams = result.response;
      return teams;
    } catch (error) {
      console.error("Error fetching team info:", error);
      throw error;
    }
  }

  async renderTeams(league, season, scroller) {
    const teams = await this.fetchTeams(league, season);
    const teamsRows = document.querySelectorAll(".teams-row");
    // console.log("Teams: ", teams);

    // Generate the HTML for all teams
    const teamsHTML = teams
      .map(
        (team) => `
            <a href="team/index.html?id=${team.team.id}" class="team-item">
                <img src="${team.team.logo}" alt="${team.team.name} logo">
                <p>${team.team.name}</p>
            </a>
        `,
      )
      .join("");

    if (!scroller) {
      // console.log("Scroller:", scroller);
      // Set the innerHTML of each .teams-row section with the complete list of teams
      teamsRows.forEach((row) => {
        row.innerHTML = teamsHTML;
      });
    } else {
      console.log("Scroller:", scroller);

      const teamsHTMLDuplicated = [];

      // Duplicate the items for the animation
      teamsHTMLDuplicated.push(teamsHTML, teamsHTML);

      teamsRows.forEach((row) => {
        row.innerHTML = teamsHTMLDuplicated;
      });
    }
  }

  async fetchTeamInfo(teamId) {
    const cachedData = getCachedData(`${this.CACHE_KEY_TEAM_INFO}_${teamId}`);

    if (cachedData) {
      console.log("Loaded from cache:", `cache_${teamId}`);
      return cachedData;
    }

    try {
      const endpoint = `teams?id=${teamId}`;
      const result = await this.footballAPI.fetchFootballData(endpoint);
      setCachedData(
        `${this.CACHE_KEY_TEAM_INFO}_${teamId}`,
        result.response[0],
      );
      console.log("Loaded from API:", `cache_${teamId}`);
      return result.response[0];
    } catch (error) {
      console.error("Error fetching team info:", error);
      throw error;
    }
  }

  async fetchTeamSquad(teamId) {
    const cachedData = getCachedData(`${this.CACHE_KEY_SQUAD}_${teamId}`);

    if (cachedData) {
      return cachedData;
    }

    try {
      const endpoint = `players/squads?team=${teamId}`;
      const result = await this.footballAPI.fetchFootballData(endpoint);
      setCachedData(`${this.CACHE_KEY_SQUAD}_${teamId}`, result.response[0]);
      return result.response[0];
    } catch (error) {
      console.error("Error fetching team squad:", error);
      throw error;
    }
  }

  async renderTeamInfo(teamId) {
    try {
      const teamInfo = await this.fetchTeamInfo(teamId);
      const teamSquad = await this.fetchTeamSquad(teamId);
      this.renderTeamDetails(teamInfo, teamSquad);
    } catch (error) {
      console.error("Error rendering team info:", error);
    }
  }

  renderTeamDetails(teamInfo, teamSquad) {
    const mainElement = document.querySelector(".team-container");

    mainElement.innerHTML = `
            <h2>${teamInfo.team.name}</h2>
            <img src="${teamInfo.team.logo}" alt="${teamInfo.team.name} logo">
            <p>Founded: ${teamInfo.team.founded}</p>
            <p>Stadium: ${teamInfo.venue.name}</p>
            <h3>Squad</h3>
            <ul>
                ${teamSquad.players
                  .map(
                    (player) => `
                    <li>${player.name} (${player.position})</li>
                `,
                  )
                  .join("")}
            </ul>
        `;
  }
}

// fixture.js
import FootballAPI from "./api";
import { getCachedData, setCachedData } from "./utils.js";

export default class Fixture {
  constructor() {
    this.footballAPI = new FootballAPI();
  }

  async fetchWithCache(endpoint) {
    const cacheKey = `cache_${endpoint}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      console.debug("Loaded from cache:", `cache_${endpoint}`);
      return cachedData;
    }

    try {
      const result = await this.footballAPI.fetchFootballData(endpoint);
      setCachedData(cacheKey, result);
      console.log("Loaded from API:", `cache_${endpoint}`);
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async fetchCurrentRound(leagueId, season) {
    const endpoint = `fixtures/rounds?league=${leagueId}&season=${season}&current=true`;
    const result = await this.fetchWithCache(endpoint);
    return result.response[0];
  }

  async fetchFixturesForRound(leagueId, season, round) {
    const endpoint = `fixtures?league=${leagueId}&season=${season}&round=${round}`;
    const result = await this.fetchWithCache(endpoint);
    return result;
  }
  async renderFixtures(fixtures) {
    const fixtureContainer = document.querySelector(".fixture-container");
    // Check if an h1 element already exists inside the fixtureContainer

    if (!fixtureContainer) {
      console.error("Container element not found");
      return;
    }

    fixtureContainer.innerHTML = fixtures
      .map(
        (fixture) => `
            <div class="fixture">
                <div class="team home">
                    <img src="/images/TeamEscudo/${fixture.teams.home.name.toLowerCase()}-logo.png" alt="${fixture.teams.home.name} Logo">
                    <span>${fixture.teams.home.name}</span>
                </div>
                <div class="details">
                    <p>${new Date(fixture.fixture.date).toLocaleDateString()}</p>
                    <p>Kick Off: ${new Date(fixture.fixture.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                    <p>${fixture.fixture.venue.name}</p>
                </div>
                <div class="time">
                    <span>${new Date(fixture.fixture.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                </div>
                <div class="team away">
                    <img src="/images/TeamEscudo/${fixture.teams.away.name.toLowerCase()}-logo.png" alt="${fixture.teams.away.name} Logo">
                    <span>${fixture.teams.away.name}</span>
                </div>
            </div>
        `,
      )
      .join("");
  }

  async renderNextRoundFixtures(leagueId, season) {
    try {
      const currentRound = await this.fetchCurrentRound(leagueId, season);
      const fixtures = await this.fetchFixturesForRound(
        leagueId,
        season,
        currentRound,
      );
      const mainElement = document.querySelector(".fixture-container");

      mainElement.innerHTML = fixtures.response
        .map(
          (fixture) => `
                <div class="fixture">
                <div class="team home">
                    <a href="./team/index.html?id=${fixture.teams.home.id}">
                    <img src="./images/TeamEscudo/${fixture.teams.home.name.toLowerCase()}-logo.png" alt="${fixture.teams.home.name} Logo">
                    <span>${fixture.teams.home.name}</span>
                    </a>
                </div>
                <div class="details">
                    <p>${new Date(fixture.fixture.date).toLocaleDateString()}</p>
                    <p>Kick Off: ${new Date(fixture.fixture.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                    <p>${fixture.fixture.venue.name}</p>
                </div>
                <div class="time">
                    <span>${new Date(fixture.fixture.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                </div>
                <div class="team away">
                    <a href="./team/index.html?id=${fixture.teams.away.id}">    
                        <img src="./images/TeamEscudo/${fixture.teams.away.name.toLowerCase()}-logo.png" alt="${fixture.teams.away.name} Logo">
                        <span>${fixture.teams.away.name}</span>
                    </a>
                </div>
            </div>
            `,
        )
        .join("");
    } catch (error) {
      console.error("Error rendering next round fixtures:", error);
    }
  }
}

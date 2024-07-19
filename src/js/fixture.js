// /src/js/fixture.js
import FootballAPI from "./api";

export default class Fixture {
  constructor() {
    this.footballAPI = new FootballAPI();
  }

  async fetchCurrentRound(leagueId, season) {
    try {
      const endpoint = `fixtures/rounds?league=${leagueId}&season=${season}&current=true`;
      const result = await this.footballAPI.fetchFootballData(endpoint);
      return result.response[0];
    } catch (error) {
      console.error("Error fetching current round:", error);
      throw error;
    }
  }

  async fetchFixturesForRound(leagueId, season, round) {
    try {
      const endpoint = `fixtures?league=${leagueId}&season=${season}&round=${round}`;
      const result = await this.footballAPI.fetchFootballData(endpoint);
      return result;
    } catch (error) {
      console.error("Error fetching fixtures for round:", error);
      throw error;
    }
  }

  async renderNextRoundFixtures(leagueId, season) {
    try {
      const currentRound = await this.fetchCurrentRound(leagueId, season);
      const fixtures = await this.fetchFixturesForRound(
        leagueId,
        season,
        currentRound,
      );
      const mainElement = document.querySelector("main");

      mainElement.innerHTML = fixtures.response
        .map(
          (fixture) => `
                <section>
                    <h2>${fixture.teams.home.name} vs ${fixture.teams.away.name}</h2>
                    <p>Date: ${new Date(fixture.fixture.date).toLocaleString()}</p>
                    <p>Venue: ${fixture.fixture.venue.name}</p>
                </section>
            `,
        )
        .join("");
    } catch (error) {
      console.error("Error rendering next round fixtures:", error);
    }
  }
}

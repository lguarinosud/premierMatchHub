import Fixture from "./fixture";

const fixture = new Fixture();

const premierLeagueId = 39; // Verify this ID from the API documentation
const currentSeason = 2024; // Specify the current season

fixture.renderNextRoundFixtures(premierLeagueId, currentSeason);

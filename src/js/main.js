import Fixture from "./fixture";

const premierLeagueId = 39;
const currentSeason = 2024;

const fixture = new Fixture();

document.addEventListener("DOMContentLoaded", () => {
  //fixture.renderFixtures(premierLeagueId, currentSeason);
  fixture.renderNextRoundFixtures(premierLeagueId, currentSeason);
});

import Fixture from "./fixture";
import Team from './teamDetails.js';
import { loadHeaderFooter } from "./utils.js";

// Load Header and footer
loadHeaderFooter()

const premierLeagueId = 39;
const currentSeason = 2024;

const fixture = new Fixture();

const teams = new Team();

const scroller = document.querySelectorAll(".teams-row-container");
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

function addAnimation() {
    scroller.forEach(scroller => {
        scroller.setAttribute('data-animated', true); // "true" duplicates the items for the animation
    })
}

document.addEventListener("DOMContentLoaded", () => {
    //fixture.renderFixtures(premierLeagueId, currentSeason);
    fixture.renderNextRoundFixtures(premierLeagueId, currentSeason);
    teams.renderTeams(premierLeagueId, currentSeason, true);
});



import Team from './teamDetails.js';
import { loadHeaderFooter } from "./utils.js";


const urlParams = new URLSearchParams(window.location.search);
const teamId = urlParams.get('id');


// Load Header and footer
loadHeaderFooter()

const team = new Team();

if (teamId) {
    team.renderTeamInfo(teamId);
} else {
    console.error('Team ID is missing in the URL');
}

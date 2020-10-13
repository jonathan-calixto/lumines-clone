import './styles/index.scss';
import Lumines from './scripts/game.js';

document.querySelector("#start-lumines").addEventListener("click", renderGame);

function renderGame() {
    const canvas = new Lumines();

    
}
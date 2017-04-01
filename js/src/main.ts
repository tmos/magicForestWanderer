import * as $ from "jquery";
import * as jsboard from "./Forest";
import Game from "./Game";

let g = new Game("gameDiv", "scoreDiv");
g.init(3, 3);
g.update(false);

document.getElementById("play").addEventListener("click", (e) => {
    g.update();
});

// Init manual game
document.onkeydown = (e) => {
    switch (e.keyCode) {
        case 13:
            g.update();
            break;
        default:
            break;
    }
};

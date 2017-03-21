import * as $ from "jquery";
import * as jsboard from "./Forest";
import Game from "./Game";

let g = new Game();
g.createForest();
g.getForest().populate();
g.setWanderer();
g.render("game");

// Init manual game
document.onkeydown = (e) => {
    switch (e.keyCode) {
        case 37:
            g.getWanderer().move("left");
            break;
        case 38:
            g.getWanderer().move("up");
            break;
        case 39:
            g.getWanderer().move("right");
            break;
        case 40:
            g.getWanderer().move("down");
            break;
        default:
            break;
    }
    g.render("game");
};

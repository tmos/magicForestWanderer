import * as $ from "jquery";
import * as jsboard from "./Forest";
import Game from "./Game";

let g = new Game("gameDiv", "scoreDiv");
g.init(3, 3);
g.update();

// Init manual game
document.onkeydown = (e) => {
    let arrowKeyHaveBeenPressed = false;
    switch (e.keyCode) {
        case 37:
            g.getWanderer().move("left");
            arrowKeyHaveBeenPressed = true;
            break;
        case 38:
            g.getWanderer().move("up");
            arrowKeyHaveBeenPressed = true;
            break;
        case 39:
            g.getWanderer().move("right");
            arrowKeyHaveBeenPressed = true;
            break;
        case 40:
            g.getWanderer().move("down");
            arrowKeyHaveBeenPressed = true;
            break;
        default:
            break;
    }

    if (arrowKeyHaveBeenPressed) {
        g.update();
    }
};

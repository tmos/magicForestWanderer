import * as $ from "jquery";
import * as jsboard from "./Forest";
import Game from "./Game";

let g = new Game();
g.createForest();
g.getForest().populate();
g.render("game");

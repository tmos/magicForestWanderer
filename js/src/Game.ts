import * as $ from "jquery";
import Forest from "./Forest";

/**
 * It's a game for everyone, except for the wanderer. Poor wanderer...
 */
export default class Game {
    private forest: Forest;

    /**
     * Create the game.
     */
    constructor() {
        //
    }

    /**
     * Create a new forest.
     * @param {number} w Width of the forest
     * @param {number} h Height of the forest
     */
    public createForest(w = 3, h = 3) {
        this.forest = new Forest(w, h);
        return this;
    }

    /**
     * Get the forest.
     */
    public getForest() {
        return this.forest;
    }

    public render(idElem: string) {
        const gameDiv = document.getElementById(idElem);
        const forest = this.getForest().getForest();

        let html: string = "";

        for (let line of forest) {
            html += "<div class=\"row\">";
            for (let floor of line) {
                console.log(floor);
                html += floor.toHtml();
            }
            html += "</div>";
        }
        gameDiv.classList.add(`width${forest.length}`);
        gameDiv.innerHTML = html;
    }
}

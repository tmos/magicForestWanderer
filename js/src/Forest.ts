import {empty, goal, monster, trap, tree} from "./constants";
import Floor from "./Floor";

/**
 * A gloomy dark forest. There are lots of monsters and traps here. Be careful, wanderer...
 */
export default class Forest {
    private forest: Floor[][] = [];
    private width: number = 0;
    private height: number = 0;

    /**
     * Create a new forest
     * @param {number} w The width of the forest
     * @param {number} h The height of the forest
     */
    constructor(w = 3, h = 3) {
        this.width = w;
        this.height = h;
    }

    /**
     * Populate the forest randomly
     * @param {number} maxChances The chances
     */
    public populate(maxChances = 50) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const tmpRand = Math.random() * (maxChances - 0) + 0;

                if (tmpRand === 0) {
                    // It's a monster
                    this.forest[y][x] = new Floor(monster);
                    this.setClues(y, x, monster);
                } else if (tmpRand === 1) {
                    // It's a trap
                    this.forest[y][x] = new Floor(trap);
                    this.setClues(y, x, trap);
                }
            }
        }
    }

    /**
     * Get the content of the floor
     * @param {number} y The y parameter of this floor
     * @param {number} x The x parameter of this floor
     */
    public getFloorContent(y: number, x: number) {
        return this.forest[y][x];
    }

    /**
     * Get da woods
     */
    public getForest() {
        return this.forest;
    }

    /**
     * Set the clues around the main items of the game
     * @param {number} y The y parameter of the item
     * @param {number} x The x parameter of the item
     * @param {string} content The content from the constants
     */
    private setClues(y: number, x: number, content: string) {
        if (y - 1 >= 0) {
            this.forest[y - 1][x].setClue(content);
        }
        if (y + 1 < this.width) {
            this.forest[y + 1][x].setClue(content);
        }
        if (x - 1 >= 0) {
            this.forest[y][x - 1].setClue(content);
        }
        if (y + 1 < this.width) {
            this.forest[y][x + 1].setClue(content);
        }
    }
}

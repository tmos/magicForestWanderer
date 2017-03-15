import {trap, empty, goal, monster, tree} from "./constants";
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
     * @param {*} w The width of the forest
     * @param {*} h The height of the forest
     */
    constructor(w = 4, h = 4) {
        this.width = w;
        this.height = h;
    }

    /**
     * Populate the forest randomly
     * @param {*} maxChances The chances
     */
    public populate(maxChances = 50) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let tmpRand = Math.random() * (maxChances - 0) + 0;

                if (tmpRand === 0) {
                    //It's a monster
                    this.forest[y][x] = new Floor(monster);
                } else if (tmpRand === 1) {
                    //It's a trap
                    this.forest[y][x] = new Floor(trap);
                }
            }

        }
    }
}

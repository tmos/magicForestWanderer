import {trap, trapClue, empty, goal, monster, monsterClue, tree} from "./constants";

/**
 * A gloomy dark forest. There are lots of monsters and traps here. Be careful, wanderer...
 */
export class Forest {
    
    private forest: number[] = [];
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

    public populate(maxChances = 50) {
        for (let line = 0; line < this.width; line++) {
            for (let square = 0; square < this.height; square++) {
                let tmpRand = Math.random() * (maxChances - 0) + 0;

                if (tmpRand === 0) {
                    //@todo: populate using constants
                } else if (tmpRand === 1) {
                    //@todo: populate using constants
                }
            }

        }
    }
}

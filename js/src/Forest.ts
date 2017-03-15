import {deep, deepClue, empty, goal, monster, monsterClue, tree} from "./constants";

export default class Forest {
    /**
     * Create a new forest
     * @param {*} width The width of the forest
     * @param {*} height The height of the forest
     */
    private forest: number[] = [];
    private width: number = 0;
    private height: number = 0;

    constructor(w = 4, h = 4) {
        this.width = w;
        this.height = h;
    }

    public populate(maxChances = 50) {
        for (let line = 0; line < this.width; line++) {
            for (let square = 0; square < this.height; square++) {
                let tmpRand = Math.random() * (maxChances - 0) + 0;

                if (tmpRand === 0) {

                } else if (tmpRand === 1) {

                }
            }

        }
    }
}

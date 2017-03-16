import Forest from "./Forest";

export default class Game {

    private forest: Forest;

    constructor() {
        return this;
    }

    /**
     * Create a new forest
     * @param {number} w Width of the forest
     * @param {number} h Height of the forest
     */
    public createForest(w = 3, h = 3) {
        this.forest = new Forest(w, h);
        return this;
    }

    /**
     * Get the forest
     */
    public getForest() {
        return this.forest;
    }
}

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
        return this;
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
}

import Forest from "./Forest";

export default class Game {

    private forest: Forest;

    constructor() {
        return this;
    }

    /**
     * Create a new forest
     * @param w Width of the forest
     * @param h Height of the forest
     */
    public createForest(w = 4, h = 4) {
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

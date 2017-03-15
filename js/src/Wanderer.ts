import Floor from "./Floor";
import Forest from "./Forest";

export default class Game {
    private forest: Forest;
    private mapWidth: number;
    private mapHeight: number;
    private map: Floor[][];
    private y: number;
    private x: number;

    /**
     * The matrix, where every wanderers are born.
     * @param playerY
     * @param playerX
     * @param darkWoods
     */
    constructor(playerY, playerX, darkWoods: Forest) {
        this.forest = darkWoods;
        const height = darkWoods.getForest().length;
        const width = darkWoods.getForest()[0].length;

        for (let y; y < height; y++) {
            for (let x; x < width; x++) {
                this.map[y][x] = new Floor();
            }
        }
    }

    /**
     * Look what is under your feets, wanderer. And take care...
     */
    public percieve() {
        this.map[this.y][this.x] = this.forest.getFloorContent(this.y, this.x);
    }

    /**
     * Think about what you want to do. But think carrefully.
     */
    public think() {

    }
}

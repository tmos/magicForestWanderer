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
     * @param {*} playerY The y position of the wanderer
     * @param {*} playerX The x position of the wanderer
     * @param {Forest} darkWoods The forest
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
    public perceive() {
        this.map[this.y][this.x] = this.forest.getFloorContent(this.y, this.x);
    }

    /**
     * Think about what you want to do. But think carrefully.
     */
    public think() {
        let thisFloor = this.map[this.y][this.x];
        if (thisFloor.isGoal()) {
            // Oo-De-Lally!!
            // @todo
        } else if (thisFloor.isMonster() || thisFloor.isTrap()) {
            // Too much, too soon, too far to go, too late to play, the game is over
            // @todo
        } else if (thisFloor.isMonsterClue() || thisFloor.isTrapClue()) {
            // @todo
        }
    }
}

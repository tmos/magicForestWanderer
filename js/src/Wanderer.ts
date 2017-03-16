import Floor from "./Floor";
import Forest from "./Forest";

/**
 * The wanderer, the hero of this quest. Good luck son...
 */
export default class Wanderer {
    private forest: Forest;
    private mapWidth: number;
    private mapHeight: number;
    private map: Floor[][];
    private numberVisited: number;
    private y: number;
    private x: number;
    private score: number;

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
        this.numberVisited = 0;
        this.score = 0;

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
        if (thisFloor.isMonsterClue() || thisFloor.isTrapClue()) {
            // @todo
        }
        // @todo
    }

    /**
     * The intrepid wanderer decides to move along...
     * @param {string} way The direction where the wanderer moves
     */
    public move(way: string) {
        // @todo Do move
        // Verify Floor
        let thisFloor = this.map[this.y][this.x];
        if (thisFloor.isGoal()) {
            // Oo-De-Lally!!
            // @todo New forest
        } else if (thisFloor.isMonster() || thisFloor.isTrap()) {
            // Too much, too soon, too far to go, too late to play, the game is over
            // @todo Wanderer die
        }
    }

    /**
     * So the wanderer uses his slingshot. What a warrior!
     * @param {number} y The y position of the target
     * @param {number} x The x position of the target
     */
    public useSlingshot(y, x) {
        if (this.forest.getFloorContent(y, x).isMonster()) {
            this.forest.getFloorContent(y, x).killMonster();
            // @todo Call animation
        }
    }
}

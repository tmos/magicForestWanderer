import Floor from "./Floor";
import Forest from "./Forest";

/**
 * The wanderer, the hero of this quest. Good luck son...
 */
export default class Wanderer {
    private forest: Forest;
    private forestMapWidth: number;
    private forestMapHeight: number;
    private forestMap: Floor[][] = [];
    private y: number;
    private x: number;
    private score: number;

    constructor(playerY: number, playerX: number, darkWoods: Forest) {
        this.forest = darkWoods;
        this.x = playerX;
        this.y = playerY;

        const height = darkWoods.getForest().length;
        const width = darkWoods.getForest()[0].length;

        this.forestMapHeight = height;
        this.forestMapWidth = width;

        this.score = 0;

        for (let y = 0; y < height; y++) {
            this.forestMap[y] = [];
            for (let x = 0; x < width; x++) {
                this.forestMap[y][x] = null;
            }
        }

        return this;
    }

    public isKnown(y: number, x: number) {
        return this.forestMap[y][x] !== null;
    }

    public getPosition() {
        return {x: this.x, y: this.y};
    }

    public toHtml() {
        return `<div class="floorCase wanderer"></div>`;
    }

    public perceive() {
        this.forestMap[this.y][this.x] = this.forest.getFloorContent(this.y, this.x);

        return this;
    }

    public think() {
        let thisFloor = this.forestMap[this.y][this.x];
        if (thisFloor.isMonsterClue() || thisFloor.isTrapClue()) {
            // @todo
        }
        // @todo

        return this;
    }

    public move(direction: string) {
        let currentPos = this.getPosition();
        let newVal;

        switch (direction) {
            case "left":
                newVal = currentPos.x - 1;
                if (newVal >= 0) { this.x = newVal; }
                break;
            case "right":
                newVal = currentPos.x + 1;
                if (newVal < this.forestMapWidth) { this.x = newVal; }
                break;
            case "up":
                newVal = currentPos.y - 1;
                if (newVal >= 0) { this.y = newVal; }
                break;
            case "down":
                newVal = currentPos.y + 1;
                if (newVal < this.forestMapHeight) { this.y = newVal; }
                break;
            default:
                break;
        }

        // Verify Floor
        // let thisFloor = this.forestMap[this.y][this.x];
        // if (thisFloor.isGoal()) {
        //     // @todo Do move
        //     // Oo-De-Lally!!
        //     // @todo New forest
        // } else if (thisFloor.isMonster() || thisFloor.isTrap()) {
        //     // Too much, too soon, too far to go, too late to play, the game is over
        //     // @todo Wanderer die
        // }

        return this;
    }

    public useSlingshot(y: number, x: number) {
        if (this.forest.getFloorContent(y, x).isMonster()) {
            this.forest.getFloorContent(y, x).killMonster();
            // @todo Call animation
        }
    }

    public isOut(): boolean {
        const wayOutPosition = this.forest.getWayOutPosition();

        if (this.x === wayOutPosition.x && this.y === wayOutPosition.y) {
            return true;
        } else {
            return false;
        }
    }
}

import Floor from "./Floor";
import Forest from "./Forest";
import Logical from "./Logical";
// @todo correct the line below
import PathFinding from "pathfinding";

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

    constructor(playerY: number, playerX: number, darkWoods: Forest, score: number = 0) {
        this.forest = darkWoods;
        this.score = score;
        this.x = playerX;
        this.y = playerY;

        const height = darkWoods.getForest().length;
        const width = darkWoods.getForest()[0].length;

        this.forestMapHeight = height;
        this.forestMapWidth = width;

        for (let y = 0; y < height; y++) {
            this.forestMap[y] = [];
            for (let x = 0; x < width; x++) {
                this.forestMap[y][x] = new Floor(y, x);
            }
        }

        return this;
    }

    public getMapHeight() {
        return this.forestMap.length;
    }

    public getMapWidth() {
        return this.forestMap[0].length;
    }

    public isKnown(y: number, x: number) {
        return this.forestMap[y][x].isVisited();
    }

    public setForest(forest: Forest) {
        this.forest = forest;
    }

    public setPosition(y: number, x: number) {
        this.x = x;
        this.y = y;
    }

    public getPosition() {
        return {x: this.x, y: this.y};
    }

    public toHtml() {
        return `<div class="floorCase wanderer"></div>`;
    }

    public watchTheFloor(): Floor {
        const content = this.forest.getFloorContent(this.y, this.x);
        this.forestMap[this.y][this.x] = content;
        this.forestMap[this.y][this.x].setVisited(true);

        return content;
    }

    public updateMap() {
        let monsterClue = false;
        let trapClue = false;
        let numberAdjacentVisited = this.numberAdjacentVisited(this.y, this.x);
        let probability = 0;
        if (numberAdjacentVisited < 4) {
            probability = 1 / ( 4 - numberAdjacentVisited);
        }

        this.forestMap[this.y][this.x] = this.forest.getFloorContent(this.y, this.x);
        this.forestMap[this.y][this.x].setVisited(true);

        // No cheat here, just used for storing the probabilities
        if (this.y + 1 < this.forestMap.length) {
            this.forestMap[this.y + 1][this.x] = this.forest.getFloorContent(this.y + 1, this.x);
        }
        if (this.y - 1 >= 0) {
            this.forestMap[this.y - 1][this.x] = this.forest.getFloorContent(this.y - 1, this.x);
        }
        if (this.x + 1 < this.forestMap[0].length) {
            this.forestMap[this.y][this.x + 1] = this.forest.getFloorContent(this.y, this.x + 1);
        }
        if (this.x - 1 >= 0) {
            this.forestMap[this.y][this.x - 1] = this.forest.getFloorContent(this.y, this.x - 1);
        }

        if (this.forestMap[this.y][this.x].isMonsterClue()) {
            monsterClue = true;
        }
        if (this.forestMap[this.y][this.x].isTrapClue()) {
            trapClue = true;
        }

        // Find adjacent floors
        if (this.y + 1 < this.forestMap.length && !this.forestMap[this.y + 1][this.x].isVisited()) {
            this.forestMap[this.y + 1][this.x].setAccessible(true);
            if (monsterClue) {
                this.forestMap[this.y + 1][this.x].addProbabilityMonster(probability);
            }
            if (trapClue) {
               this.forestMap[this.y + 1][this.x].addProbabilityTrap(probability);
            }
        }
        if (this.y - 1 >= 0 && !this.forestMap[this.y - 1][this.x].isVisited()) {
            this.forestMap[this.y - 1][this.x].setAccessible(true);
            if (monsterClue) {
                this.forestMap[this.y - 1][this.x].addProbabilityMonster(probability);
            }
            if (trapClue) {
               this.forestMap[this.y - 1][this.x].addProbabilityTrap(probability);
            }
        }
        if (this.x + 1 < this.forestMap[0].length && !this.forestMap[this.y][this.x + 1].isVisited()) {
            this.forestMap[this.y][this.x + 1].setAccessible(true);
            if (monsterClue) {
                this.forestMap[this.y][this.x + 1].addProbabilityMonster(probability);
            }
            if (trapClue) {
               this.forestMap[this.y][this.x + 1].addProbabilityTrap(probability);
            }
        }
        if (this.x - 1 >= 0 && !this.forestMap[this.y][this.x - 1].isVisited()) {
            this.forestMap[this.y][this.x - 1].setAccessible(true);
            if (monsterClue) {
                this.forestMap[this.y][this.x - 1].addProbabilityMonster(probability);
            }
            if (trapClue) {
               this.forestMap[this.y][this.x - 1].addProbabilityTrap(probability);
            }
        }

        return this;
    }

    public think() {
        let thisFloor = this.forestMap[this.y][this.x];

        // Find tiles to visit
        let borderMap = [];
        for (let j = 0 ; j < this.getMapHeight() ; j++) {
            for (let i = 0 ; i < this.getMapWidth() ; i++) {
                if (this.forestMap[j][i].isAccessible() && !this.forestMap[j][i].isVisited()) {
                    borderMap.push(this.forestMap[j][i]);
                }
            }
        }

        // Complex logic after this line
        let wandererLogic = new Logical(borderMap);
        let position = -1;
        let destinationFound = false;
        while (((position + 1) < borderMap.length) && !destinationFound) {
            position += 1;
            if (wandererLogic.canGoTo(borderMap[position])) {
                // Tests the logical rules
                destinationFound = (wandererLogic.ruleMonster(borderMap[position]) 
                && wandererLogic.ruleTrap(borderMap[position]));
            }
        }

        let haveToShoot = false;
        let path = [];
        if (destinationFound) {
            if (wandererLogic.shootBefore(borderMap[position])) {
                haveToShoot = true;
            }
            path = this.findPath(thisFloor, borderMap[position], haveToShoot);
        } else {
            // @todo It is impossible
        }

        return this;
    }

    public findPath(start: Floor, destination: Floor, haveToShoot: boolean) {
        // Matrix init
        let matrix = new Array(this.forestMapHeight);
        for (let j = 0; j < this.forestMapHeight; j++) {
            matrix[j] = new Array(this.forestMapWidth);
            for (let i = 0; i < this.forestMapWidth; i++) {
                if (this.forestMap[j][i].isVisited() && !this.forestMap[j][i].isMonster() && !this.forestMap[j][i].isTrap()) {
                    // Walkable
                    matrix[j][i] = 0;
                } else {
                    // Blocked
                    matrix[j][i] = 1;
                }
            }
        }
        // Destination must be walkable
        matrix[destination.getY()][destination.getX()] = 0;

        let grid = new PathFinding.Grid(matrix);
        let finder = new PathFinding.AStarFinder();
        // @todo verify x and y axis order : https://www.npmjs.com/package/pathfinding
        let path = finder.findPath(start.getX(), start.getY(), destination.getX(), destination.getY(), grid);

        let movesPath = this.findMoves(path, haveToShoot);
        return movesPath;
    }

    public findMoves(path: any[], haveToShoot: boolean) {
        let movesPath = [];
        // @todo verify x and y axis order from this.findPath()
        // using https://www.npmjs.com/package/pathfinding , path[i][0] is x and path[i][1] is y
        for (let i = 1; i < path.length; i++) {
            if (path[i][0] == path[i - 1][0]) {
                // x is the same, so the wanderer goes up or down
                if (path[i][1] < path[i - 1][1]) {
                    // The wanderer goes left
                    movesPath.push("left");
                } else if (path[i][1] > path[i - 1][1]) {
                    // The wanderer goes right
                    movesPath.push("right");
                } else {
                    // @todo WTF!
                }
            } else if (path[i][1] == path[i - 1][1]) {
                // y is the same, so the wanderer goes left or right
                if (path[i][0] < path[i - 1][0]) {
                    // The wanderer goes up
                    movesPath.push("up");
                } else if (path[i][0] > path[i - 1][0]) {
                    // The wanderer goes down
                    movesPath.push("down");
                } else {
                    // @todo WTF!
                }
            }
        }

        if (haveToShoot) {
            let shotDirection = "";
            switch (movesPath[movesPath.length - 1]) {
                case "up":
                    shotDirection = "shoot-up";
                    break;
                case "down":
                    shotDirection = "shoot-down";
                    break;
                case "left":
                    shotDirection = "shoot-left";
                    break;
                case "right":
                    shotDirection = "shoot-right";
                    break;
                default:
                    break;
            }
            movesPath.splice(movesPath.length - 1, 0, shotDirection);
        }

        return movesPath;
    }

    public move(direction: string) {
        let currentPos = this.getPosition();
        let newVal;

        // @todo cases "shoot-up", "shoot-down", "shoot-left", "shoot-right"
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

        this.setScore(-1);

        return this;
    }

    public numberAdjacentVisited(y: number, x: number) {
        let num = 0;

        if ( y + 1 < this.forestMap.length && this.forestMap[y + 1][x].isVisited()) {
            num += 1;
        }
        if ( y - 1 >= 0  && this.forestMap[y - 1][x].isVisited()) {
            num += 1;
        }
        if ( x + 1 < this.forestMap[0].length  && this.forestMap[y][x + 1].isVisited()) {
            num += 1;
        }
        if ( x - 1 >= 0  && this.forestMap[y][x - 1].isVisited()) {
            num += 1;
        }
        return num;
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

    public isDead(): boolean {
        if (this.watchTheFloor().isTrap() || this.watchTheFloor().isMonster()) {
            return true;
        } else {
            return false;
        }
    }

    public setScore(val: number) {
        this.score += val;
    }

    public getScore(): number {
        return this.score;
    }

    public getMap(): Floor[][] {
        return this.forestMap;
    }

    public setMap(m: Floor[][]) {
        this.forestMap = m;
    }
}

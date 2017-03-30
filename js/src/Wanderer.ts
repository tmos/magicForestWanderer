import Floor from "./Floor";
import Forest from "./Forest";
import "jsprolog";

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
                this.forestMap[y][x] = null;
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
        return this.forestMap[y][x] !== null;
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

    public perceive() {
        const content = this.forest.getFloorContent(this.y, this.x);
        this.forestMap[this.y][this.x] = content;

        let monsterClue = false;
        let trapClue = false;
        let numberAdjacentVisited = this.numberAdjacentVisited(this.y, this.x);
        let probability = 0;
        if (numberAdjacentVisited < 4) {
            probability = 1 / ( 4 - numberAdjacentVisited);
        }

        this.forestMap[this.y][this.x] = this.forest.getFloorContent(this.y, this.x);
        this.forestMap[this.y + 1][this.x] = this.forest.getFloorContent(this.y + 1, this.x);
        this.forestMap[this.y - 1][this.x] = this.forest.getFloorContent(this.y - 1, this.x);
        this.forestMap[this.y][this.x + 1] = this.forest.getFloorContent(this.y, this.x + 1);
        this.forestMap[this.y][this.x - 1] = this.forest.getFloorContent(this.y, this.x - 1);

        this.forestMap[this.y][this.x].isVisited = true;
        
        if (this.forestMap[this.y][this.x].isMonsterClue()) {
            monsterClue = true;
        }
        if (this.forestMap[this.y][this.x].isTrapClue()) {
            trapClue = true;
        }

        // Find adjacent floors
        if (!this.forestMap[this.y + 1][this.x].isTree() && !this.forestMap[this.y + 1][this.x].isVisited) {
            this.forestMap[this.y + 1][this.x].isAccessible = true;
            if (monsterClue) {
                this.forestMap[this.y + 1][this.x].addProbabilityMonster(probability);
            }
            if (trapClue) {
               this.forestMap[this.y + 1][this.x].addProbabilityTrap(probability); 
            }
        }
        if (!this.forestMap[this.y - 1][this.x].isTree() && !this.forestMap[this.y - 1][this.x].isVisited) {
            this.forestMap[this.y - 1][this.x].isAccessible = true;
            if (monsterClue) {
                this.forestMap[this.y - 1][this.x].addProbabilityMonster(probability);
            }
            if (trapClue) {
               this.forestMap[this.y - 1][this.x].addProbabilityTrap(probability); 
            }
        }
        if (!this.forestMap[this.y][this.x + 1].isTree() && !this.forestMap[this.y][this.x + 1].isVisited) {
            this.forestMap[this.y][this.x + 1].isAccessible = true;
            if (monsterClue) {
                this.forestMap[this.y][this.x + 1].addProbabilityMonster(probability);
            }
            if (trapClue) {
               this.forestMap[this.y][this.x + 1].addProbabilityTrap(probability); 
            }
        }
        if (!this.forestMap[this.y][this.x - 1].isTree() && !this.forestMap[this.y][this.x - 1].isVisited) {
            this.forestMap[this.y][this.x - 1].isAccessible = true;
            if (monsterClue) {
                this.forestMap[this.y][this.x - 1].addProbabilityMonster(probability);
            }
            if (trapClue) {
               this.forestMap[this.y][this.x - 1].addProbabilityTrap(probability); 
            }
        }

        return content;
    }

    public think() {
        let thisFloor = this.forestMap[this.y][this.x];
        
        // Here goes all the logical stuff
        
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

        this.setScore(-10);

        return this;
    }

    public numberAdjacentVisited(y: number, x: number) {
        let number = 0;
        if (!this.forestMap[this.y + 1][this.x].isTree() && this.forestMap[this.y + 1][this.x].isVisited) {
            number += 1;
        }
        if (!this.forestMap[this.y - 1][this.x].isTree() && this.forestMap[this.y - 1][this.x].isVisited) {
            number += 1;
        }
        if (!this.forestMap[this.y][this.x + 1].isTree() && this.forestMap[this.y][this.x + 1].isVisited) {
            number += 1;
        }
        if (!this.forestMap[this.y][this.x - 1].isTree() && this.forestMap[this.y][this.x - 1].isVisited) {
            number += 1;
        }
        return number;
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
        if (this.perceive().isTrap()) {
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
}

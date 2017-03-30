import Floor from "./Floor";
import Forest from "./Forest";

/**
 * The wanderer, the hero of this quest. Good luck son...
 */
export default class Wanderer {
    private forest: Forest;

    private map: Floor[][]; // The map the wanderer draws during his adventure

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
        this.score = 0;

        for (let y; y < height; y++) {
            for (let x; x < width; x++) {
                this.map[y][x] = new Floor();
            }
        }

        return this;
    }

    public getMapHeight() {
        return this.map.length;
    }

    public getMapWidth() {
        return this.map[0].length;
    }

    /**
     * Look what is under your feets, wanderer. And take care...
     */
    public perceive() {
        let monsterClue = false;
        let trapClue = false;
        let numberAdjacentVisited = this.numberAdjacentVisited(this.y, this.x);
        let probability = 0;
        if (numberAdjacentVisited < 4) {
            probability = 1 / ( 4 - numberAdjacentVisited);
        }

        this.map[this.y][this.x] = this.forest.getFloorContent(this.y, this.x);
        this.map[this.y + 1][this.x] = this.forest.getFloorContent(this.y + 1, this.x);
        this.map[this.y - 1][this.x] = this.forest.getFloorContent(this.y - 1, this.x);
        this.map[this.y][this.x + 1] = this.forest.getFloorContent(this.y, this.x + 1);
        this.map[this.y][this.x - 1] = this.forest.getFloorContent(this.y, this.x - 1);

        this.map[this.y][this.x].isVisited = true;
        
        if (this.map[this.y][this.x].isMonsterClue()) {
            monsterClue = true;
        }
        if (this.map[this.y][this.x].isTrapClue()) {
            trapClue = true;
        }

        // Find adjacent floors
        if (!this.map[this.y + 1][this.x].isTree() && !this.map[this.y + 1][this.x].isVisited) {
            this.map[this.y + 1][this.x].isAccessible = true;
            if (monsterClue) {
                this.map[this.y + 1][this.x].addProbabilityMonster(probability);
            }
            if (trapClue) {
               this.map[this.y + 1][this.x].addProbabilityTrap(probability); 
            }
        }
        if (!this.map[this.y - 1][this.x].isTree() && !this.map[this.y - 1][this.x].isVisited) {
            this.map[this.y - 1][this.x].isAccessible = true;
            if (monsterClue) {
                this.map[this.y - 1][this.x].addProbabilityMonster(probability);
            }
            if (trapClue) {
               this.map[this.y - 1][this.x].addProbabilityTrap(probability); 
            }
        }
        if (!this.map[this.y][this.x + 1].isTree() && !this.map[this.y][this.x + 1].isVisited) {
            this.map[this.y][this.x + 1].isAccessible = true;
            if (monsterClue) {
                this.map[this.y][this.x + 1].addProbabilityMonster(probability);
            }
            if (trapClue) {
               this.map[this.y][this.x + 1].addProbabilityTrap(probability); 
            }
        }
        if (!this.map[this.y][this.x - 1].isTree() && !this.map[this.y][this.x - 1].isVisited) {
            this.map[this.y][this.x - 1].isAccessible = true;
            if (monsterClue) {
                this.map[this.y][this.x - 1].addProbabilityMonster(probability);
            }
            if (trapClue) {
               this.map[this.y][this.x - 1].addProbabilityTrap(probability); 
            }
        }
        return this;
    }

    /**
     * Think about what you want to do. But think carrefully.
     */
    public think() {
        let thisFloor = this.map[this.y][this.x];
        
        // Here goes all the logical stuff
        for (let j = 0 ; j < this.getMapHeight() ; j++) {
            for (let i = 0 ; i < this.getMapWidth() ; i++) {
                //
            }
        }
        
        return this;
    }

    public move(y, x) {
        // @todo mettre des UP, DOWN, SHOOT, etc...

        return this;
    }

    /**
     * How many adjacent floors are already visited?
     * @param {number} y The y position of the floor
     * @param {number} x The x position of the floor
     */
    public numberAdjacentVisited(y, x) {
        let number = 0;
        if (!this.map[this.y + 1][this.x].isTree() && this.map[this.y + 1][this.x].isVisited) {
            number += 1;
        }
        if (!this.map[this.y - 1][this.x].isTree() && this.map[this.y - 1][this.x].isVisited) {
            number += 1;
        }
        if (!this.map[this.y][this.x + 1].isTree() && this.map[this.y][this.x + 1].isVisited) {
            number += 1;
        }
        if (!this.map[this.y][this.x - 1].isTree() && this.map[this.y][this.x - 1].isVisited) {
            number += 1;
        }
        return number;
    }

    /**
     * So the wanderer uses his slingshot. What a warrior!
     * @param {number} y The y position of the target
     * @param {number} x The x position of the target
     */
    public useSlingshot(y, x) {
        this.score -= 10;
        // @todo Test that this floor is next the wanderer's
        if (this.forest.getFloorContent(y, x).isMonster()) {
            this.forest.getFloorContent(y, x).killMonster();
            // @todo Call animation
        }
    }
}

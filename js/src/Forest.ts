import {empty, goal, monster, trap, tree} from "./constants";
import Floor from "./Floor";

/**
 * A gloomy dark forest. There are lots of monsters and traps here. Be careful, wanderer...
 */
export default class Forest {
    private forest: Floor[][] = [];
    private width: number = 0;
    private height: number = 0;

    constructor(w = 3, h = 3) {
        this.width = w;
        this.height = h;
    }

    public populate(maxChances = 20) {
        // Set the monsters and traps
        let tmp: Floor[][] = [];
        for (let y = 0; y < this.height; y++) {
            tmp[y] = [];
            for (let x = 0; x < this.width; x++) {
                const tmpRand = Math.floor(Math.random() * (maxChances - 0) + 0);

                if (tmpRand === 0) {
                    // It's a monster!
                    tmp[y][x] = new Floor(monster);
                } else if (tmpRand === 1) {
                    // It's a trap!
                    tmp[y][x] = new Floor(trap);
                } else {
                    tmp[y][x] = new Floor();
                }
            }
        }

        this.forest = tmp;

        // Set the way out
        let isAWayOut = false;
        let outY;
        let outX;
        while (!isAWayOut) {
            outY = Math.floor(Math.random() * (this.forest.length - 0) + 0);
            outX = Math.floor(Math.random() * (this.forest[0].length - 0) + 0);

            if (this.forest[outY][outX].isEmpty) {
                this.forest[outY][outX] = new Floor(goal);
                isAWayOut = true;
            }
        }

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let cell = this.forest[y][x];
                if (cell.isMonster()) {
                    // It's a monster!
                    this.setClues(y, x, monster);
                } else if (cell.isTrap()) {
                    // It's a trap!
                    this.setClues(y, x, trap);
                }
            }
        }

        return this;
    }

    public getFloorContent(y: number, x: number): Floor {
        return this.forest[y][x];
    }

    public getForest(): Floor[][] {
        return this.forest;
    }

    public getWayOutPosition() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.forest[y][x].isGoal()) {
                    return {x, y};
                }
            }
        }
        return undefined;
    }

    private setClues(y: number, x: number, content: string) {
        if (y - 1 >= 0) {
            this.forest[y - 1][x].setClue(content);
        }
        if (y + 1 < this.height) {
            this.forest[y + 1][x].setClue(content);
        }
        if (x - 1 >= 0) {
            this.forest[y][x - 1].setClue(content);
        }
        if (x + 1 < this.width) {
            this.forest[y][x + 1].setClue(content);
        }

        return this;
    }
}

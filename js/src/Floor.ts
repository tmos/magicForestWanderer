import * as $ from "jquery";
import {empty, goal, monster, trap, tree} from "./constants";

/**
 * You'll tell me: "A floor is a floor", and you'll be right.
 * This is not the floor itself that matters, this is what it contains.
 * Is it an horrible monster on this floor? Or a lethal trap? Or a clue for the next floor? You'll see, wanderer...
 */
export default class Floor {
    private x: number;
    private y: number;

    private trap: boolean = false;
    private goal: boolean = false;
    private monster: boolean = false;
    private tree: boolean = false;
    private trapClue: boolean = false;
    private monsterClue: boolean = false;

    public isVisited: boolean = false;
    public isAccessible: boolean = false;
    private probabilityMonster = 0;
    private probabilityTrap = 0;

    constructor(y: number, x: number, element = empty) {
        this.x = x;
        this.y = y;

        if (element === trap) {
            this.trap = true;
        } else if (element === goal) {
            this.goal = true;
        } else if (element === monster) {
            this.monster = true;
        } else if (element === tree) {
            this.tree = true;
        } else {
            // The floor is empty otherwise
        }
    }

    public getX() {
        return this.x;
    }

    public getY() {
        return this.y;
    }

    public isTrap() {
        return this.trap;
    }

    public isGoal() {
        return this.goal;
    }

    public isMonster() {
        return this.monster;
    }

    public isTree() {
        return this.tree;
    }

    public isMonsterClue() {
        return this.monsterClue;
    }

    public isTrapClue() {
        return this.trapClue;
    }

    public isEmpty() {
        if (!this.trap &&
            !this.goal &&
            !this.monster &&
            !this.tree &&
            !this.trapClue &&
            !this.monsterClue) {
                return true;
            }
    }

    public setClue(clueType: string) {
        if (clueType === trap) {
            this.trapClue = true;
        } else if (clueType === monster) {
            this.monsterClue = true;
        }
    }

    /**
     * What is the probability this floor is a monster?
     */
    public getProbabilityMonster() {
        return this.probabilityMonster;
    }

    /**
     * Set the probability this floor is a monster.
     */
    public setProbabilityMonster(probability = 0) {
        this.probabilityMonster = probability;
    }

    /**
     * The probability this floor is a monster evolved.
     */
    public addProbabilityMonster(probability = 0) {
        this.probabilityMonster += probability;
    }

    /**
     * What is the probability this floor is a trap?
     */
    public getProbabilityTrap() {
        return this.probabilityTrap;
    }

    /**
     * Set the probability this floor is a trap.
     */
    public setProbabilityTrap(probability = 0) {
        this.probabilityTrap = probability;
    }

    /**
     * The probability this floor is a trap evolved.
     */
    public addProbabilityTrap(probability = 0) {
        this.probabilityTrap += probability;
    }

    public killMonster() {
        this.monster = false;
    }

    public toHtml(isKnown: boolean = true, additionnalClasses: string[]) {
        let classes: string[] = ["floorCase"].concat(additionnalClasses);

        if (isKnown) {
            classes.push("visited");
        } else {
            classes.push("warFog");
        }

        if (this.isTrap()) {
            classes.push("trap");
        }
        if (this.isGoal()) {
            classes.push("goal");
        }
        if (this.isMonster()) {
            classes.push("monster");
        }
        if (this.isTree()) {
            classes.push("tree");
        }
        if (this.isTrapClue()) {
            classes.push("trapClue");
        }
        if (this.isMonsterClue()) {
            classes.push("monsterClue");
        }

        return `<div class="${classes.join(" ")}"></div>`;
    }
}

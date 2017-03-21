import * as $ from "jquery";
import {empty, goal, monster, trap, tree} from "./constants";

/**
 * You'll tell me: "A floor is a floor", and you'll be right.
 * This is not the floor itself that matters, this is what it contains.
 * Is it an horrible monster on this floor? Or a lethal trap? Or a clue for the next floor? You'll see, wanderer...
 */
export default class Floor {
    private trap: boolean = false;
    private goal: boolean = false;
    private monster: boolean = false;
    private tree: boolean = false;
    private trapClue: boolean = false;
    private monsterClue: boolean = false;

    constructor(element = empty) {
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

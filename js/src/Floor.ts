import {trap, empty, goal, monster, tree} from "./constants";

/**
 * You'll tell me: "A floor is a floor", and you'll be right.
 * This is not the floor itself that matters, this is what it countains.
 * Is it an horrible monster on this floor? Or a lethal trap? Or a clue for the next floor? You'll see, wanderer...
 */
export default class Floor {
    private trap: boolean = false;
    private goal: boolean = false;
    private monster: boolean = false;
    private tree: boolean = false;

    private trapClue: boolean = false;
    private monsterClue: boolean = false;

    /**
     * Create a new floor
     * @param {*} element The element on the floor, must be selected into ./constants.ts
     */
    constructor(element = empty) {
        if (element === trap) {
            this.trap = true;
        } else if (element === goal) {
            this.goal = true;
        } else if (element === monster) {
            this.monster = true;
        } else if (element === tree) {
            this.tree = true;
        }
        //the floor is empty otherwise
    }

    /**
     * Set if there is a trap clue on the floor, or not
     */
    public setTrapClue(isClue = false) {
        this.trapClue = isClue;
    }

    /**
     * Set if there is a monster clue on the floor, or not
     */
    public setMonsterClue(isClue = false) {
        this.monsterClue = isClue;
    }

    /**
     * CLINK! The wanderer have used his slingshot to kill the monster
     */
    public killMonster() {
        this.monster = false;
    }
}

import Floor from "./Floor";

/**
 * All the logical rules.
 */
export default class Logical {

    private borders: Floor[];

    /**
     * @param borders Every accessible unvisited floors.
     */
    constructor(borders: Floor[]) {
        this.borders = borders;
        return this;
    }

    public probablyMonster(x: Floor): boolean {
        return x.getProbabilityMonster() !== 0;
    }

    public probablyTrap(x: Floor): boolean {
        return x.getProbabilityTrap() !== 0;
    }

    /**
     * For each x (not probablyMonster(x) and not probablyTrap(x) => probablyEmpty(x))
     */
    public probablyEmpty(x: Floor): boolean {
        return !this.probablyMonster(x) && !this.probablyTrap(x);
    }

    /**
     * For each x
     *      ((probablyEmpty(x)
     *          or (probablyMonster(x)
     *                  and not probablyTrap(x)
     *                  and (not exists y (probablyEmpty(y))))
     *          or (probablyTrap(x)
     *                  and not exists y (probablyEmpty(y) or (probablyMonster(y) and not probablyTrap(y)))))
     *        => canGoTo(x))
     */
    public canGoTo(x: Floor): boolean {

        // Exists y (probablyEmpty(y))
        function existsEmpty(thisClass: Logical): boolean {
            let i = 0;
            let exists = false;
            while (i < thisClass.borders.length && !exists) {
                exists = thisClass.probablyEmpty(thisClass.borders[i]);
                i++;
            }
            return exists;
        }

        // Exists y (probablyEmpty(y) or (probablyMonster(y) and not probablyTrap(y)))
        function existsEmptyOrMonsterNotTrap(thisClass: Logical): boolean {
            let i = 0;
            let exists = false;
            while (i < thisClass.borders.length && !exists) {
                exists = thisClass.probablyEmpty(thisClass.borders[i])
                || (thisClass.probablyMonster(thisClass.borders[i])
                && !thisClass.probablyTrap(thisClass.borders[i]));
                i++;
            }
            return exists;
        }

        return this.probablyEmpty(x)
        || this.probablyMonster(x) && !this.probablyTrap(x) && !existsEmpty(this)
        || this.probablyTrap(x) && !existsEmptyOrMonsterNotTrap(this);
    }

    /**
     * For each x
     *      ((canGoTo(x) and probablyMonster(x))
     *          => not exists y (probablyMonster(y) and greaterProbabilityMonster(y, x)))
     */
    public ruleMonster(x: Floor): boolean {

        // Exists y (probablyMonster(y) and greaterProbabilityMonster(y, x))
        function existsMonsterMoreProbable(thisClass: Logical, floor: Floor): boolean {
            let i = 0;
            let exists = false;
            while (i < thisClass.borders.length && !exists) {
                exists = thisClass.probablyMonster(thisClass.borders[i])
                && thisClass.greaterProbabilityMonster(thisClass.borders[i], floor);
                i++;
            }
            return exists;
        }

        if (this.canGoTo(x) && this.probablyMonster(x)) {
            return !existsMonsterMoreProbable(this, x);
        } else {
            return true;
        }
    }

    /**
     * For each x (canGoTo(x) and probablyMonster(x) => shootBefore(x))
     */
    public shootBefore(x: Floor): boolean {
        return this.canGoTo(x) && this.probablyMonster(x);
    }

    /**
     * For each x
     *      ((canGoTo(x) and probablyTrap(x))
     *          => not exists y (probablyTrap(y) and smallerProbabilityTrap(y, x)))
     */
    public ruleTrap(x: Floor): boolean {

        // Exists y (probablyTrap(y) and smallerProbabilityTrap(y, x))
        function existsTrapLessProbable(thisClass: Logical, floor: Floor): boolean {
            let i = 0;
            let exists = false;
            while (i < thisClass.borders.length && !exists) {
                exists = thisClass.probablyTrap(thisClass.borders[i])
                && thisClass.smallerProbabilityTrap(thisClass.borders[i], floor);
                i++;
            }
            return exists;
        }

        if (this.canGoTo(x) && this.probablyTrap(x)) {
            return !existsTrapLessProbable(this, x);
        } else {
            return true;
        }
    }

    public greaterProbabilityMonster(y: Floor, x: Floor): boolean {
        return y.getProbabilityMonster() > x.getProbabilityMonster();
    }

    public smallerProbabilityTrap(y: Floor, x: Floor): boolean {
        return y.getProbabilityTrap() < x.getProbabilityTrap();
    }
}

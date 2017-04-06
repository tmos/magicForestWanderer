# M:star:gic Fores:evergreen_tree: Wanderer

## Team members
* [Tom Canac](http://tomcanac.com)
* [Pierre-Louis Faure](https://www.linkedin.com/in/plfaure)

## Introduction
**Magic Forest Wanderer** is a JavaScript program that emulates the actions of a wanderer trying to escape from a misty magic forest. The differents elements in the emulation are:

* <img src="https://github.com/tmos/magicForestWanderer/blob/master/assets/hero.png" height="35"> The **wanderer**. He is trying to escape from the misty magic forest. He is equipped with a slingshot and a map (to remember his completed course).
* <img src="https://github.com/tmos/magicForestWanderer/blob/master/assets/goal.png" height="35"> A **portal**. The wanderer is trying to reach the portal that could make him escape from the forest. Unfortunately, the other portals will only bring him to a wider forest.
* <img src="https://github.com/tmos/magicForestWanderer/blob/master/assets/monster.png" height="35"> A **monster**. There are a lot of these in this forest. If the wanderer wants to survive, he must avoid the tiles that contains monsters. A monster can be killed by a simple stone throw from an adjacent tile.
* <img src="https://github.com/tmos/magicForestWanderer/blob/master/assets/trap.png" height="35"> A **trap**. Traps are lethal for the wanderer. Unfortunately, there is no way to defeat traps.
* <img src="https://github.com/tmos/magicForestWanderer/blob/master/assets/monsterClue.png" height="35"> Some **wanderer’s bones**. They are presents on the tiles adjacent to a monster. The wanderer could use they as clues to choose his next destination tile.
* <img src="https://github.com/tmos/magicForestWanderer/blob/master/assets/trapClue.png" height="35"> Some **twirling leaves**. They are presents on the tiles adjacent to a trap. The wanderer could use they as clues to choose his next destination tile.

## Installation

### Client installation
Nothing to do, just open `index.html`

### Dev installation
In your terminal, type:
```
npm install
gulp
```
## Use
To make the wanderer moves forward, you have to click on the **Next Move!** button, or to press the **Enter** key of your keyboard.

## Code
The code is organised in 5 classes:

* `Game.ts`: the global controller
* `Wanderer.ts`: the wanderer
* `Forest.ts`: the forest (set of tiles)
* `Floor.ts`: each tile informations (monsters, traps, clues and probabilities)
* `Logical.ts`: the logical functions and rules used by the wanderer for his exploration

## Wanderer’s actions
When the wanderer comes to a new tile, he first watches the floor, he updates his map, and he finally chooses his next destination tile and the path to this tile.

### Watch the floor
When the wanderer watches the floor, he uses the function `Floor.setVisited(true)` to mark the tiles under his feet as visited. Then he marks the unvisited adjacent tiles as reachable, using `Floor.setAccessible(true)`.

### Update the map
Once the wanderer watched the floor, he can update his map, using different probabilities. Two probabilities are calculated: the **monster probability** and the **trap probability**. These probabilities are calculated as follows:

*M* is the event *“the tile is a monster”*. *T* is the event *“the tile is a trap”*. *P(M)* and *P(T)* are the corresponding probabilities (for each adjacent tile). Each probability is initialized to *0*. The probabilities are updated on each adjacent tile as follows:

If the wanderer is on a **wanderer’s bones** tile:
* If **no** adjacent tile has been visited: *P(M) = P(M) + ¼* for each adjacent tile.
* If **one** adjacent tiles have been visited: *P(M) = P(M) + ⅓* for each adjacent tile.
* If **two** adjacent tiles have been visited: *P(M) = P(M) + ½* for each adjacent tile.
* If **three** adjacent tiles have been visited: *P(M) = P(M) + 1* for each adjacent tile.

If the wanderer is on a **twirling leaves** tile:
* If no adjacent tile has been visited: *P(T) = P(T) + ¼* for each adjacent tile.
* If one adjacent tiles have been visited: *P(T) = P(T) + ⅓* for each adjacent tile.
* If two adjacent tiles have been visited: *P(T) = P(T) + ½* for each adjacent tile.
* If three adjacent tiles have been visited: *P(T) = P(T) + 1* for each adjacent tile.

If the wanderer is on a tile with **no clue**: *P(M) = 0* and *P(T) = 0* for each adjacent tile.

### Choose the next tile to visit
In what follows, the variables *x* and *y* represents the **border tiles** (reachable unvisited tiles). To choose the next tile to visit, the wanderer uses the following logical rules and functions:

#### Functions
* ***probablyMonster(x):*** the border tile *x* can be a monster.
* ***probablyTrap(x):*** the border tile *x* can be a trap.
* ***greaterProbabilityMonster(x,y):*** the probability a monster is present on the *x* border tile is greater than the probability a monster is present on the *y* border tile.
* ***smallerProbabilityTrap(x,y):*** the probability a trap is on the *x* border tile is smaller than the probability a trap is on the *y* border tile.
* ***probablyEmpty(x):*** *∀x (¬probablyMonster(x) ∧ ¬probablyTrap(x) ⇒ probablyEmpty(x))*
* ***canGoTo(x):*** *∀x (probablyEmpty(x) ∨ (probabltMonster(x) ∧ ¬probablyTrap(x) ∧ ( probablyEmpty(y))) ∨ (probablyTrap(x) ∧ (¬∃y (probablyEmpty(y) ∨ (probablyMonster(y) ∧ ¬probablyTrap(y))))) ⇒ canGoTo(x)*
* ***shootBefore(x):*** *∀x ((canGoTo(x) ∧ probablyMonster(x)) ⇒ shootBefore(x))*

#### Rules
* ***ruleMonsterNotTrap:*** *∀x ((canGoTo(x) ∧ probablyMonster(x) ∧ ¬probablyTrap(x)) ⇒ ¬∃y (probablyMonster(y) ∧ ¬probablyTrap(y) ∧ greaterProbabilityMonster(y,x)))*
* ***ruleMonsterTrap:*** *∀x ((canGoTo(x) ∧ probablyMonster(x) ∧ probablyTrap(x)) ⇒ ¬∃y (probablyMonster(y) ∧ probablyTrap(y) ∧ greaterProbabilityMonster(y,x)))*
* ***ruleTrap:*** *∀x ((canGoTo(x) ∧ probablyTrap(x)) ⇒ ¬∃y (probablyTrap(y) ∧ smallerProbabilityTrap(y,x)))*

### Best path to the next tile
To find the best path to the next tile, the wanderer uses the **A\* algorithm**. To do so, the wanderer first creates a matrix. The tiles that has already been visited and that are safe (there is no monster or trap on this tile), and the destination tile, are marked as **reachable** in this new matrix. The other tiles (unvisited or containing a monster or a trap) are marked as **unreachable**.

For the A\* algorithm, we used the [npm pathfinding library](https://www.npmjs.com/package/pathfinding).

## Score
Each action of the wanderer will affect his final score *S*. This score is initialised to *0*. Consider *n* the total number of tiles of the current forest. The score will vary in function of the following actions:
* *S(portal reached) = S + 10n*
* *S(death) = S - 10n*
* *S(move) = S - 1*
* *S(stone throw) = S - 10*

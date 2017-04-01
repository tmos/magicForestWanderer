(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
/**
 * You'll tell me: "A floor is a floor", and you'll be right.
 * This is not the floor itself that matters, this is what it contains.
 * Is it an horrible monster on this floor? Or a lethal trap? Or a clue for the next floor? You'll see, wanderer...
 */
var Floor = (function () {
    function Floor(y, x, element) {
        if (element === void 0) { element = constants_1.empty; }
        this.visited = false;
        this.accessible = false;
        this.trap = false;
        this.goal = false;
        this.monster = false;
        this.trapClue = false;
        this.monsterClue = false;
        this.probabilityMonster = 0;
        this.probabilityTrap = 0;
        this.x = x;
        this.y = y;
        if (element === constants_1.trap) {
            this.trap = true;
        }
        else if (element === constants_1.goal) {
            this.goal = true;
        }
        else if (element === constants_1.monster) {
            this.monster = true;
        }
        else {
            // The floor is empty otherwise
        }
    }
    Floor.prototype.getX = function () {
        return this.x;
    };
    Floor.prototype.getY = function () {
        return this.y;
    };
    Floor.prototype.isTrap = function () {
        return this.trap;
    };
    Floor.prototype.isGoal = function () {
        return this.goal;
    };
    Floor.prototype.isMonster = function () {
        return this.monster;
    };
    Floor.prototype.isMonsterClue = function () {
        return this.monsterClue;
    };
    Floor.prototype.isTrapClue = function () {
        return this.trapClue;
    };
    Floor.prototype.isEmpty = function () {
        if (!this.trap &&
            !this.goal &&
            !this.monster &&
            !this.trapClue &&
            !this.monsterClue) {
            return true;
        }
    };
    Floor.prototype.setClue = function (clueType) {
        if (clueType === constants_1.trap) {
            this.trapClue = true;
        }
        else if (clueType === constants_1.monster) {
            this.monsterClue = true;
        }
    };
    Floor.prototype.isVisited = function () {
        return this.visited;
    };
    Floor.prototype.setVisited = function (b) {
        if (b === void 0) { b = true; }
        this.visited = b;
    };
    Floor.prototype.isAccessible = function () {
        return this.accessible;
    };
    Floor.prototype.setAccessible = function (b) {
        if (b === void 0) { b = true; }
        this.accessible = b;
    };
    /**
     * What is the probability this floor is a monster?
     */
    Floor.prototype.getProbabilityMonster = function () {
        return this.probabilityMonster;
    };
    /**
     * Set the probability this floor is a monster.
     */
    Floor.prototype.setProbabilityMonster = function (probability) {
        if (probability === void 0) { probability = 0; }
        this.probabilityMonster = probability;
    };
    /**
     * The probability this floor is a monster evolved.
     */
    Floor.prototype.addProbabilityMonster = function (probability) {
        if (probability === void 0) { probability = 0; }
        this.probabilityMonster += probability;
    };
    /**
     * What is the probability this floor is a trap?
     */
    Floor.prototype.getProbabilityTrap = function () {
        return this.probabilityTrap;
    };
    /**
     * Set the probability this floor is a trap.
     */
    Floor.prototype.setProbabilityTrap = function (probability) {
        if (probability === void 0) { probability = 0; }
        this.probabilityTrap = probability;
    };
    /**
     * The probability this floor is a trap evolved.
     */
    Floor.prototype.addProbabilityTrap = function (probability) {
        if (probability === void 0) { probability = 0; }
        this.probabilityTrap += probability;
    };
    Floor.prototype.killMonster = function () {
        this.monster = false;
    };
    Floor.prototype.toHtml = function (isKnown, additionnalClasses) {
        if (isKnown === void 0) { isKnown = true; }
        var classes = ["floorCase"].concat(additionnalClasses);
        if (isKnown) {
            classes.push("visited");
        }
        else {
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
        if (this.isTrapClue()) {
            classes.push("trapClue");
        }
        if (this.isMonsterClue()) {
            classes.push("monsterClue");
        }
        return "<div class=\"" + classes.join(" ") + "\"></div>";
    };
    return Floor;
}());
exports.default = Floor;

},{"./constants":6}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var Floor_1 = require("./Floor");
/**
 * A gloomy dark forest. There are lots of monsters and traps here. Be careful, wanderer...
 */
var Forest = (function () {
    function Forest(w, h) {
        if (w === void 0) { w = 3; }
        if (h === void 0) { h = 3; }
        this.forest = [];
        this.width = 0;
        this.height = 0;
        this.width = w;
        this.height = h;
    }
    Forest.prototype.populate = function (maxChances) {
        if (maxChances === void 0) { maxChances = 20; }
        // Set the monsters and traps
        var tmp = [];
        for (var y = 0; y < this.height; y++) {
            tmp[y] = [];
            for (var x = 0; x < this.width; x++) {
                var tmpRand = Math.floor(Math.random() * (maxChances - 0) + 0);
                if (tmpRand === 0) {
                    // It's a monster!
                    tmp[y][x] = new Floor_1.default(y, x, constants_1.monster);
                }
                else if (tmpRand === 1) {
                    // It's a trap!
                    tmp[y][x] = new Floor_1.default(y, x, constants_1.trap);
                }
                else {
                    tmp[y][x] = new Floor_1.default(y, x);
                }
            }
        }
        this.forest = tmp;
        // Set the way out
        var isAWayOut = false;
        var outY;
        var outX;
        while (!isAWayOut) {
            outY = Math.floor(Math.random() * (this.forest.length - 0) + 0);
            outX = Math.floor(Math.random() * (this.forest[0].length - 0) + 0);
            if (this.forest[outY][outX].isEmpty) {
                this.forest[outY][outX] = new Floor_1.default(outY, outX, constants_1.goal);
                isAWayOut = true;
            }
        }
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var cell = this.forest[y][x];
                if (cell.isMonster()) {
                    // It's a monster!
                    this.setClues(y, x, constants_1.monster);
                }
                else if (cell.isTrap()) {
                    // It's a trap!
                    this.setClues(y, x, constants_1.trap);
                }
            }
        }
        return this;
    };
    Forest.prototype.getFloorContent = function (y, x) {
        return this.forest[y][x];
    };
    Forest.prototype.getForest = function () {
        return this.forest;
    };
    Forest.prototype.getWayOutPosition = function () {
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                if (this.forest[y][x].isGoal()) {
                    return { x: x, y: y };
                }
            }
        }
        return undefined;
    };
    Forest.prototype.getNumberOfCases = function () {
        return this.forest.length * this.forest[0].length;
    };
    Forest.prototype.getWidth = function () {
        return this.forest.length;
    };
    Forest.prototype.getHeight = function () {
        return this.forest[0].length;
    };
    Forest.prototype.setClues = function (y, x, content) {
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
    };
    return Forest;
}());
exports.default = Forest;

},{"./Floor":1,"./constants":6}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swal = require("sweetalert");
var Forest_1 = require("./Forest");
var Wanderer_1 = require("./Wanderer");
/**
 * It's a game for everyone, except for the wanderer. Poor wanderer...
 */
var Game = (function () {
    function Game(gameDiv, scoreDiv) {
        this.gameDiv = document.getElementById(gameDiv);
        this.scoreDiv = document.getElementById(scoreDiv);
    }
    Game.prototype.init = function (w, h) {
        if (w === void 0) { w = 3; }
        if (h === void 0) { h = 3; }
        this.createForest(w, h);
        this.getForest().populate();
        this.setWanderer();
    };
    Game.prototype.update = function (letsPlay) {
        if (letsPlay === void 0) { letsPlay = true; }
        if (letsPlay === true) {
            if (this.wanderer.hasNoMoves() === true) {
                this.wanderer.think();
            }
            this.wanderer.act();
        }
        if (this.wanderer.isDead()) {
            swal({
                text: "You just died. Too bad.",
                title: "☠",
                type: "error",
            });
            this.wanderer.setScore(-(10 * this.getForest().getNumberOfCases()));
            this.setWanderer(this.wanderer.getMap(), this.wanderer.getOrigY(), this.wanderer.getOrigX());
        }
        if (this.wanderer.isOut()) {
            // You just won this forest !
            this.wanderer.setScore(10 * this.getForest().getNumberOfCases());
            // Create the next level
            var newSize = this.getForest().getForest().length + 1;
            swal({
                text: "You just won this forest !",
                title: "⭐️",
                type: "success",
            });
            this.init(newSize, newSize);
        }
        this.wanderer.watchTheFloor();
        this.render();
    };
    Game.prototype.getWanderer = function () {
        return this.wanderer;
    };
    Game.prototype.createForest = function (w, h) {
        if (w === void 0) { w = 3; }
        if (h === void 0) { h = 3; }
        this.currentForest = new Forest_1.default(w, h);
        return this;
    };
    Game.prototype.getForest = function () {
        return this.currentForest;
    };
    Game.prototype.setWanderer = function (m, y, x) {
        if (m === void 0) { m = undefined; }
        if (y === void 0) { y = undefined; }
        if (x === void 0) { x = undefined; }
        var forest = this.currentForest.getForest();
        var isOk = false;
        if (y === undefined && x === undefined) {
            while (!isOk) {
                y = Math.floor(Math.random() * (forest.length - 0) + 0);
                x = Math.floor(Math.random() * (forest[0].length - 0) + 0);
                if (forest[y][x].isEmpty()) {
                    isOk = true;
                }
            }
        }
        var oldScore = 0;
        if (this.wanderer) {
            oldScore = this.wanderer.getScore();
        }
        this.wanderer = new Wanderer_1.default(y, x, this.currentForest, oldScore);
        if (m) {
            this.wanderer.setMap(m);
        }
        return this;
    };
    Game.prototype.render = function () {
        var forest = this.getForest().getForest();
        var wanderer = this.wanderer;
        var html = "";
        for (var y = 0; y < this.currentForest.getForest().length; y++) {
            html += "<div class=\"row\">";
            for (var x = 0; x < this.currentForest.getForest()[0].length; x++) {
                var wandererPos = wanderer.getPosition();
                var floor = this.currentForest.getForest()[y][x];
                var additionnalClasses = [];
                if (wandererPos.x === x && wandererPos.y === y) {
                    additionnalClasses.push("wanderer");
                }
                html += floor.toHtml(this.wanderer.isKnown(y, x), additionnalClasses);
            }
            html += "</div>";
        }
        this.gameDiv.className = "";
        this.gameDiv.classList.add("width" + forest.length);
        this.gameDiv.innerHTML = html;
        this.scoreDiv.innerHTML = wanderer.getScore().toString();
    };
    return Game;
}());
exports.default = Game;

},{"./Forest":2,"./Wanderer":5,"sweetalert":40}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * All the logical rules.
 */
var Logical = (function () {
    /**
     * @param borders Every accessible unvisited floors.
     */
    function Logical(borders) {
        this.borders = borders;
        return this;
    }
    Logical.prototype.probablyMonster = function (x) {
        return x.getProbabilityMonster() !== 0;
    };
    Logical.prototype.probablyTrap = function (x) {
        return x.getProbabilityTrap() !== 0;
    };
    /**
     * For each x (not probablyMonster(x) and not probablyTrap(x) => probablyEmpty(x))
     */
    Logical.prototype.probablyEmpty = function (x) {
        return !this.probablyMonster(x) && !this.probablyTrap(x);
    };
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
    Logical.prototype.canGoTo = function (x) {
        // Exists y (probablyEmpty(y))
        function existsEmpty(thisClass) {
            var i = 0;
            var exists = false;
            while (i < thisClass.borders.length && !exists) {
                exists = thisClass.probablyEmpty(thisClass.borders[i]);
                i++;
            }
            return exists;
        }
        // Exists y (probablyEmpty(y) or (probablyMonster(y) and not probablyTrap(y)))
        function existsEmptyOrMonsterNotTrap(thisClass) {
            var i = 0;
            var exists = false;
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
    };
    /**
     * For each x
     *      ((canGoTo(x) and probablyMonster(x))
     *          => not exists y (probablyMonster(y) and greaterProbabilityMonster(y, x)))
     */
    Logical.prototype.ruleMonster = function (x) {
        // Exists y (probablyMonster(y) and greaterProbabilityMonster(y, x))
        function existsMonsterMoreProbable(thisClass, floor) {
            var i = 0;
            var exists = false;
            while (i < thisClass.borders.length && !exists) {
                exists = thisClass.probablyMonster(thisClass.borders[i])
                    && thisClass.greaterProbabilityMonster(thisClass.borders[i], floor);
                i++;
            }
            return exists;
        }
        if (this.canGoTo(x) && this.probablyMonster(x)) {
            return !existsMonsterMoreProbable(this, x);
        }
        else {
            return true;
        }
    };
    /**
     * For each x (canGoTo(x) and probablyMonster(x) => shootBefore(x))
     */
    Logical.prototype.shootBefore = function (x) {
        return this.canGoTo(x) && this.probablyMonster(x);
    };
    /**
     * For each x
     *      ((canGoTo(x) and probablyTrap(x))
     *          => not exists y (probablyTrap(y) and smallerProbabilityTrap(y, x)))
     */
    Logical.prototype.ruleTrap = function (x) {
        // Exists y (probablyTrap(y) and smallerProbabilityTrap(y, x))
        function existsTrapLessProbable(thisClass, floor) {
            var i = 0;
            var exists = false;
            while (i < thisClass.borders.length && !exists) {
                exists = thisClass.probablyTrap(thisClass.borders[i])
                    && thisClass.smallerProbabilityTrap(thisClass.borders[i], floor);
                i++;
            }
            return exists;
        }
        if (this.canGoTo(x) && this.probablyTrap(x)) {
            return !existsTrapLessProbable(this, x);
        }
        else {
            return true;
        }
    };
    Logical.prototype.greaterProbabilityMonster = function (y, x) {
        return y.getProbabilityMonster() > x.getProbabilityMonster();
    };
    Logical.prototype.smallerProbabilityTrap = function (y, x) {
        return y.getProbabilityTrap() < x.getProbabilityTrap();
    };
    return Logical;
}());
exports.default = Logical;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PathFinding = require("pathfinding");
var Floor_1 = require("./Floor");
var Logical_1 = require("./Logical");
/**
 * The wanderer, the hero of this quest. Good luck son...
 */
var Wanderer = (function () {
    function Wanderer(playerY, playerX, darkWoods, score) {
        if (score === void 0) { score = 0; }
        this.forestMap = [];
        this.actions = [];
        this.forest = darkWoods;
        this.score = score;
        this.x = playerX;
        this.y = playerY;
        this.origX = playerX;
        this.origY = playerY;
        var height = darkWoods.getForest().length;
        var width = darkWoods.getForest()[0].length;
        this.forestMapHeight = height;
        this.forestMapWidth = width;
        for (var y = 0; y < height; y++) {
            this.forestMap[y] = [];
            for (var x = 0; x < width; x++) {
                this.forestMap[y][x] = new Floor_1.default(y, x);
            }
        }
        return this;
    }
    Wanderer.prototype.getMapHeight = function () {
        return this.forestMap.length;
    };
    Wanderer.prototype.getMapWidth = function () {
        return this.forestMap[0].length;
    };
    Wanderer.prototype.isKnown = function (y, x) {
        return this.forestMap[y][x].isVisited();
    };
    Wanderer.prototype.setForest = function (forest) {
        this.forest = forest;
    };
    Wanderer.prototype.setPosition = function (y, x) {
        this.x = x;
        this.y = y;
    };
    Wanderer.prototype.getPosition = function () {
        return { x: this.x, y: this.y };
    };
    Wanderer.prototype.toHtml = function () {
        return "<div class=\"floorCase wanderer\"></div>";
    };
    Wanderer.prototype.watchTheFloor = function () {
        var content = this.forest.getFloorContent(this.y, this.x);
        this.forestMap[this.y][this.x] = content;
        this.forestMap[this.y][this.x].setVisited(true);
        return content;
    };
    Wanderer.prototype.updateMap = function () {
        var monsterClue = false;
        var trapClue = false;
        var numberAdjacentVisited = this.numberAdjacentVisited(this.y, this.x);
        var probability = 0;
        if (numberAdjacentVisited < 4) {
            probability = 1 / (4 - numberAdjacentVisited);
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
    };
    Wanderer.prototype.act = function () {
        if (this.actions.length > 0) {
            var action = this.actions.shift();
            if (action === "left" || action === "right" || action === "up" || action === "down") {
                this.move(action);
            }
            else if (action === "shoot-left" ||
                action === "shoot-right" ||
                action === "shoot-up" ||
                action === "shoot-down") {
                var shootDirection = action.substring(6);
                this.useSlingshot(shootDirection);
            }
        }
        else {
            console.log("acted for nothing");
        }
    };
    Wanderer.prototype.think = function () {
        var thisFloor = this.forestMap[this.y][this.x];
        this.updateMap();
        // Find tiles to visit
        var borderMap = [];
        for (var j = 0; j < this.getMapHeight(); j++) {
            for (var i = 0; i < this.getMapWidth(); i++) {
                if (this.forestMap[j][i].isAccessible() && !this.forestMap[j][i].isVisited()) {
                    borderMap.push(this.forestMap[j][i]);
                }
            }
        }
        // Complex logic after this line
        var wandererLogic = new Logical_1.default(borderMap);
        var position = 0;
        var destinationFound = false;
        while (((position) < borderMap.length) && destinationFound === false) {
            console.log("can go to :");
            console.log(wandererLogic.canGoTo(borderMap[position]));
            if (wandererLogic.canGoTo(borderMap[position])) {
                console.log("pos");
                console.log(borderMap[position]);
                // Tests the logical rules
                console.log("rulemonster :");
                console.log(wandererLogic.ruleMonster(borderMap[position]));
                console.log("ruleTrap:");
                console.log(wandererLogic.ruleTrap(borderMap[position]));
                destinationFound = (wandererLogic.ruleMonster(borderMap[position])
                    && wandererLogic.ruleTrap(borderMap[position]));
            }
            if (destinationFound === false) {
                position++;
            }
        }
        console.log("dest found : " + destinationFound);
        console.log("final destination :");
        console.log(borderMap[position]);
        var haveToShoot = false;
        if (destinationFound) {
            if (wandererLogic.shootBefore(borderMap[position])) {
                haveToShoot = true;
            }
            this.actions = this.findPath(thisFloor, borderMap[position], haveToShoot);
        }
        else {
            // @todo It is impossible
        }
        console.log(this.actions);
        return this;
    };
    Wanderer.prototype.findPath = function (start, destination, haveToShoot) {
        // Matrix init
        var matrix = [];
        for (var y = 0; y < this.forestMapHeight; y++) {
            matrix[y] = [];
            for (var x = 0; x < this.forestMapWidth; x++) {
                if (this.forestMap[y][x].isVisited()
                    && !this.forestMap[y][x].isMonster()
                    && !this.forestMap[y][x].isTrap()) {
                    // Walkable
                    matrix[y][x] = 0;
                }
                else {
                    // Blocked
                    matrix[y][x] = 1;
                }
            }
        }
        // Destination must be walkable
        matrix[destination.getY()][destination.getX()] = 0;
        var grid = new PathFinding.Grid(matrix);
        var finder = new PathFinding.AStarFinder();
        // @todo verify x and y axis order : https://www.npmjs.com/package/pathfinding
        console.log("grid");
        console.log(matrix);
        var path = finder.findPath(start.getX(), start.getY(), destination.getX(), destination.getY(), grid);
        console.log("path");
        console.log(path);
        var movesPath = this.findMoves(path, haveToShoot);
        return movesPath;
    };
    Wanderer.prototype.findMoves = function (path, haveToShoot) {
        var movesPath = [];
        // @todo verify x and y axis order from this.findPath()
        // using https://www.npmjs.com/package/pathfinding , path[i][0] is x and path[i][1] is y
        for (var i = 1; i < path.length; i++) {
            if (path[i][1] === path[i - 1][1]) {
                // x is the same, so the wanderer goes up or down
                if (path[i][0] < path[i - 1][0]) {
                    // The wanderer goes left
                    movesPath.push("left");
                }
                else if (path[i][0] > path[i - 1][0]) {
                    // The wanderer goes right
                    movesPath.push("right");
                }
                else {
                    // @todo WTF!
                }
            }
            else if (path[i][0] === path[i - 1][0]) {
                // y is the same, so the wanderer goes left or right
                if (path[i][1] < path[i - 1][1]) {
                    // The wanderer goes up
                    movesPath.push("up");
                }
                else if (path[i][1] > path[i - 1][1]) {
                    // The wanderer goes down
                    movesPath.push("down");
                }
                else {
                    // @todo WTF!
                }
            }
        }
        if (haveToShoot) {
            var shotDirection = "";
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
    };
    Wanderer.prototype.move = function (direction) {
        var currentPos = this.getPosition();
        var newVal;
        switch (direction) {
            case "left":
                newVal = currentPos.x - 1;
                if (newVal >= 0) {
                    this.x = newVal;
                }
                break;
            case "right":
                newVal = currentPos.x + 1;
                if (newVal < this.forestMapWidth) {
                    this.x = newVal;
                }
                break;
            case "up":
                newVal = currentPos.y - 1;
                if (newVal >= 0) {
                    this.y = newVal;
                }
                break;
            case "down":
                newVal = currentPos.y + 1;
                if (newVal < this.forestMapHeight) {
                    this.y = newVal;
                }
                break;
            default:
                break;
        }
        this.setScore(-1);
        return this;
    };
    Wanderer.prototype.numberAdjacentVisited = function (y, x) {
        var num = 0;
        if (y + 1 < this.forestMap.length && this.forestMap[y + 1][x].isVisited()) {
            num += 1;
        }
        if (y - 1 >= 0 && this.forestMap[y - 1][x].isVisited()) {
            num += 1;
        }
        if (x + 1 < this.forestMap[0].length && this.forestMap[y][x + 1].isVisited()) {
            num += 1;
        }
        if (x - 1 >= 0 && this.forestMap[y][x - 1].isVisited()) {
            num += 1;
        }
        return num;
    };
    Wanderer.prototype.useSlingshot = function (direction) {
        var currentPos = this.getPosition();
        var x = currentPos.x;
        var y = currentPos.y;
        var target;
        switch (direction) {
            case "left":
                target = currentPos.x - 1;
                if (target >= 0) {
                    x = target;
                }
                break;
            case "right":
                target = currentPos.x + 1;
                if (target < this.forestMapWidth) {
                    x = target;
                }
                break;
            case "up":
                target = currentPos.y - 1;
                if (target >= 0) {
                    y = target;
                }
                break;
            case "down":
                target = currentPos.y + 1;
                if (target < this.forestMapHeight) {
                    y = target;
                }
                break;
            default:
                break;
        }
        this.forest.getFloorContent(y, x).killMonster();
        this.setScore(-10);
        return this;
    };
    Wanderer.prototype.isOut = function () {
        var wayOutPosition = this.forest.getWayOutPosition();
        if (this.x === wayOutPosition.x && this.y === wayOutPosition.y) {
            return true;
        }
        else {
            return false;
        }
    };
    Wanderer.prototype.isDead = function () {
        if (this.watchTheFloor().isTrap() || this.watchTheFloor().isMonster()) {
            return true;
        }
        else {
            return false;
        }
    };
    Wanderer.prototype.setScore = function (val) {
        this.score += val;
    };
    Wanderer.prototype.getScore = function () {
        return this.score;
    };
    Wanderer.prototype.getMap = function () {
        return this.forestMap;
    };
    Wanderer.prototype.setMap = function (m) {
        this.forestMap = m;
    };
    Wanderer.prototype.hasNoMoves = function () {
        return this.actions.length === 0;
    };
    Wanderer.prototype.getOrigX = function () {
        return this.origX;
    };
    Wanderer.prototype.getOrigY = function () {
        return this.origY;
    };
    return Wanderer;
}());
exports.default = Wanderer;

},{"./Floor":1,"./Logical":4,"pathfinding":10}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trap = "trap";
exports.empty = "";
exports.goal = "goal";
exports.monster = "monster";
exports.tree = "tree";

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("./Game");
var g = new Game_1.default("gameDiv", "scoreDiv");
g.init(3, 3);
g.update(false);
document.getElementById("play").addEventListener("click", function (e) {
    g.update();
});
// Init manual game
document.onkeydown = function (e) {
    switch (e.keyCode) {
        default:
            g.update();
    }
};

},{"./Game":3}],8:[function(require,module,exports){
module.exports = require('./lib/heap');

},{"./lib/heap":9}],9:[function(require,module,exports){
// Generated by CoffeeScript 1.8.0
(function() {
  var Heap, defaultCmp, floor, heapify, heappop, heappush, heappushpop, heapreplace, insort, min, nlargest, nsmallest, updateItem, _siftdown, _siftup;

  floor = Math.floor, min = Math.min;


  /*
  Default comparison function to be used
   */

  defaultCmp = function(x, y) {
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  };


  /*
  Insert item x in list a, and keep it sorted assuming a is sorted.
  
  If x is already in a, insert it to the right of the rightmost x.
  
  Optional args lo (default 0) and hi (default a.length) bound the slice
  of a to be searched.
   */

  insort = function(a, x, lo, hi, cmp) {
    var mid;
    if (lo == null) {
      lo = 0;
    }
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (lo < 0) {
      throw new Error('lo must be non-negative');
    }
    if (hi == null) {
      hi = a.length;
    }
    while (lo < hi) {
      mid = floor((lo + hi) / 2);
      if (cmp(x, a[mid]) < 0) {
        hi = mid;
      } else {
        lo = mid + 1;
      }
    }
    return ([].splice.apply(a, [lo, lo - lo].concat(x)), x);
  };


  /*
  Push item onto heap, maintaining the heap invariant.
   */

  heappush = function(array, item, cmp) {
    if (cmp == null) {
      cmp = defaultCmp;
    }
    array.push(item);
    return _siftdown(array, 0, array.length - 1, cmp);
  };


  /*
  Pop the smallest item off the heap, maintaining the heap invariant.
   */

  heappop = function(array, cmp) {
    var lastelt, returnitem;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    lastelt = array.pop();
    if (array.length) {
      returnitem = array[0];
      array[0] = lastelt;
      _siftup(array, 0, cmp);
    } else {
      returnitem = lastelt;
    }
    return returnitem;
  };


  /*
  Pop and return the current smallest value, and add the new item.
  
  This is more efficient than heappop() followed by heappush(), and can be
  more appropriate when using a fixed size heap. Note that the value
  returned may be larger than item! That constrains reasonable use of
  this routine unless written as part of a conditional replacement:
      if item > array[0]
        item = heapreplace(array, item)
   */

  heapreplace = function(array, item, cmp) {
    var returnitem;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    returnitem = array[0];
    array[0] = item;
    _siftup(array, 0, cmp);
    return returnitem;
  };


  /*
  Fast version of a heappush followed by a heappop.
   */

  heappushpop = function(array, item, cmp) {
    var _ref;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (array.length && cmp(array[0], item) < 0) {
      _ref = [array[0], item], item = _ref[0], array[0] = _ref[1];
      _siftup(array, 0, cmp);
    }
    return item;
  };


  /*
  Transform list into a heap, in-place, in O(array.length) time.
   */

  heapify = function(array, cmp) {
    var i, _i, _j, _len, _ref, _ref1, _results, _results1;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    _ref1 = (function() {
      _results1 = [];
      for (var _j = 0, _ref = floor(array.length / 2); 0 <= _ref ? _j < _ref : _j > _ref; 0 <= _ref ? _j++ : _j--){ _results1.push(_j); }
      return _results1;
    }).apply(this).reverse();
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      i = _ref1[_i];
      _results.push(_siftup(array, i, cmp));
    }
    return _results;
  };


  /*
  Update the position of the given item in the heap.
  This function should be called every time the item is being modified.
   */

  updateItem = function(array, item, cmp) {
    var pos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    pos = array.indexOf(item);
    if (pos === -1) {
      return;
    }
    _siftdown(array, 0, pos, cmp);
    return _siftup(array, pos, cmp);
  };


  /*
  Find the n largest elements in a dataset.
   */

  nlargest = function(array, n, cmp) {
    var elem, result, _i, _len, _ref;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    result = array.slice(0, n);
    if (!result.length) {
      return result;
    }
    heapify(result, cmp);
    _ref = array.slice(n);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      elem = _ref[_i];
      heappushpop(result, elem, cmp);
    }
    return result.sort(cmp).reverse();
  };


  /*
  Find the n smallest elements in a dataset.
   */

  nsmallest = function(array, n, cmp) {
    var elem, i, los, result, _i, _j, _len, _ref, _ref1, _results;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (n * 10 <= array.length) {
      result = array.slice(0, n).sort(cmp);
      if (!result.length) {
        return result;
      }
      los = result[result.length - 1];
      _ref = array.slice(n);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elem = _ref[_i];
        if (cmp(elem, los) < 0) {
          insort(result, elem, 0, null, cmp);
          result.pop();
          los = result[result.length - 1];
        }
      }
      return result;
    }
    heapify(array, cmp);
    _results = [];
    for (i = _j = 0, _ref1 = min(n, array.length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
      _results.push(heappop(array, cmp));
    }
    return _results;
  };

  _siftdown = function(array, startpos, pos, cmp) {
    var newitem, parent, parentpos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    newitem = array[pos];
    while (pos > startpos) {
      parentpos = (pos - 1) >> 1;
      parent = array[parentpos];
      if (cmp(newitem, parent) < 0) {
        array[pos] = parent;
        pos = parentpos;
        continue;
      }
      break;
    }
    return array[pos] = newitem;
  };

  _siftup = function(array, pos, cmp) {
    var childpos, endpos, newitem, rightpos, startpos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    endpos = array.length;
    startpos = pos;
    newitem = array[pos];
    childpos = 2 * pos + 1;
    while (childpos < endpos) {
      rightpos = childpos + 1;
      if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {
        childpos = rightpos;
      }
      array[pos] = array[childpos];
      pos = childpos;
      childpos = 2 * pos + 1;
    }
    array[pos] = newitem;
    return _siftdown(array, startpos, pos, cmp);
  };

  Heap = (function() {
    Heap.push = heappush;

    Heap.pop = heappop;

    Heap.replace = heapreplace;

    Heap.pushpop = heappushpop;

    Heap.heapify = heapify;

    Heap.updateItem = updateItem;

    Heap.nlargest = nlargest;

    Heap.nsmallest = nsmallest;

    function Heap(cmp) {
      this.cmp = cmp != null ? cmp : defaultCmp;
      this.nodes = [];
    }

    Heap.prototype.push = function(x) {
      return heappush(this.nodes, x, this.cmp);
    };

    Heap.prototype.pop = function() {
      return heappop(this.nodes, this.cmp);
    };

    Heap.prototype.peek = function() {
      return this.nodes[0];
    };

    Heap.prototype.contains = function(x) {
      return this.nodes.indexOf(x) !== -1;
    };

    Heap.prototype.replace = function(x) {
      return heapreplace(this.nodes, x, this.cmp);
    };

    Heap.prototype.pushpop = function(x) {
      return heappushpop(this.nodes, x, this.cmp);
    };

    Heap.prototype.heapify = function() {
      return heapify(this.nodes, this.cmp);
    };

    Heap.prototype.updateItem = function(x) {
      return updateItem(this.nodes, x, this.cmp);
    };

    Heap.prototype.clear = function() {
      return this.nodes = [];
    };

    Heap.prototype.empty = function() {
      return this.nodes.length === 0;
    };

    Heap.prototype.size = function() {
      return this.nodes.length;
    };

    Heap.prototype.clone = function() {
      var heap;
      heap = new Heap();
      heap.nodes = this.nodes.slice(0);
      return heap;
    };

    Heap.prototype.toArray = function() {
      return this.nodes.slice(0);
    };

    Heap.prototype.insert = Heap.prototype.push;

    Heap.prototype.top = Heap.prototype.peek;

    Heap.prototype.front = Heap.prototype.peek;

    Heap.prototype.has = Heap.prototype.contains;

    Heap.prototype.copy = Heap.prototype.clone;

    return Heap;

  })();

  if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
    module.exports = Heap;
  } else {
    window.Heap = Heap;
  }

}).call(this);

},{}],10:[function(require,module,exports){
module.exports = require('./src/PathFinding');

},{"./src/PathFinding":11}],11:[function(require,module,exports){
module.exports = {
    'Heap'                      : require('heap'),
    'Node'                      : require('./core/Node'),
    'Grid'                      : require('./core/Grid'),
    'Util'                      : require('./core/Util'),
    'DiagonalMovement'          : require('./core/DiagonalMovement'),
    'Heuristic'                 : require('./core/Heuristic'),
    'AStarFinder'               : require('./finders/AStarFinder'),
    'BestFirstFinder'           : require('./finders/BestFirstFinder'),
    'BreadthFirstFinder'        : require('./finders/BreadthFirstFinder'),
    'DijkstraFinder'            : require('./finders/DijkstraFinder'),
    'BiAStarFinder'             : require('./finders/BiAStarFinder'),
    'BiBestFirstFinder'         : require('./finders/BiBestFirstFinder'),
    'BiBreadthFirstFinder'      : require('./finders/BiBreadthFirstFinder'),
    'BiDijkstraFinder'          : require('./finders/BiDijkstraFinder'),
    'IDAStarFinder'             : require('./finders/IDAStarFinder'),
    'JumpPointFinder'           : require('./finders/JumpPointFinder'),
};

},{"./core/DiagonalMovement":12,"./core/Grid":13,"./core/Heuristic":14,"./core/Node":15,"./core/Util":16,"./finders/AStarFinder":17,"./finders/BestFirstFinder":18,"./finders/BiAStarFinder":19,"./finders/BiBestFirstFinder":20,"./finders/BiBreadthFirstFinder":21,"./finders/BiDijkstraFinder":22,"./finders/BreadthFirstFinder":23,"./finders/DijkstraFinder":24,"./finders/IDAStarFinder":25,"./finders/JumpPointFinder":30,"heap":8}],12:[function(require,module,exports){
var DiagonalMovement = {
    Always: 1,
    Never: 2,
    IfAtMostOneObstacle: 3,
    OnlyWhenNoObstacles: 4
};

module.exports = DiagonalMovement;
},{}],13:[function(require,module,exports){
var Node = require('./Node');
var DiagonalMovement = require('./DiagonalMovement');

/**
 * The Grid class, which serves as the encapsulation of the layout of the nodes.
 * @constructor
 * @param {number|Array<Array<(number|boolean)>>} width_or_matrix Number of columns of the grid, or matrix
 * @param {number} height Number of rows of the grid.
 * @param {Array<Array<(number|boolean)>>} [matrix] - A 0-1 matrix
 *     representing the walkable status of the nodes(0 or false for walkable).
 *     If the matrix is not supplied, all the nodes will be walkable.  */
function Grid(width_or_matrix, height, matrix) {
    var width;

    if (typeof width_or_matrix !== 'object') {
        width = width_or_matrix;
    } else {
        height = width_or_matrix.length;
        width = width_or_matrix[0].length;
        matrix = width_or_matrix;
    }

    /**
     * The number of columns of the grid.
     * @type number
     */
    this.width = width;
    /**
     * The number of rows of the grid.
     * @type number
     */
    this.height = height;

    /**
     * A 2D array of nodes.
     */
    this.nodes = this._buildNodes(width, height, matrix);
}

/**
 * Build and return the nodes.
 * @private
 * @param {number} width
 * @param {number} height
 * @param {Array<Array<number|boolean>>} [matrix] - A 0-1 matrix representing
 *     the walkable status of the nodes.
 * @see Grid
 */
Grid.prototype._buildNodes = function(width, height, matrix) {
    var i, j,
        nodes = new Array(height);

    for (i = 0; i < height; ++i) {
        nodes[i] = new Array(width);
        for (j = 0; j < width; ++j) {
            nodes[i][j] = new Node(j, i);
        }
    }


    if (matrix === undefined) {
        return nodes;
    }

    if (matrix.length !== height || matrix[0].length !== width) {
        throw new Error('Matrix size does not fit');
    }

    for (i = 0; i < height; ++i) {
        for (j = 0; j < width; ++j) {
            if (matrix[i][j]) {
                // 0, false, null will be walkable
                // while others will be un-walkable
                nodes[i][j].walkable = false;
            }
        }
    }

    return nodes;
};


Grid.prototype.getNodeAt = function(x, y) {
    return this.nodes[y][x];
};


/**
 * Determine whether the node at the given position is walkable.
 * (Also returns false if the position is outside the grid.)
 * @param {number} x - The x coordinate of the node.
 * @param {number} y - The y coordinate of the node.
 * @return {boolean} - The walkability of the node.
 */
Grid.prototype.isWalkableAt = function(x, y) {
    return this.isInside(x, y) && this.nodes[y][x].walkable;
};


/**
 * Determine whether the position is inside the grid.
 * XXX: `grid.isInside(x, y)` is wierd to read.
 * It should be `(x, y) is inside grid`, but I failed to find a better
 * name for this method.
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
Grid.prototype.isInside = function(x, y) {
    return (x >= 0 && x < this.width) && (y >= 0 && y < this.height);
};


/**
 * Set whether the node on the given position is walkable.
 * NOTE: throws exception if the coordinate is not inside the grid.
 * @param {number} x - The x coordinate of the node.
 * @param {number} y - The y coordinate of the node.
 * @param {boolean} walkable - Whether the position is walkable.
 */
Grid.prototype.setWalkableAt = function(x, y, walkable) {
    this.nodes[y][x].walkable = walkable;
};


/**
 * Get the neighbors of the given node.
 *
 *     offsets      diagonalOffsets:
 *  +---+---+---+    +---+---+---+
 *  |   | 0 |   |    | 0 |   | 1 |
 *  +---+---+---+    +---+---+---+
 *  | 3 |   | 1 |    |   |   |   |
 *  +---+---+---+    +---+---+---+
 *  |   | 2 |   |    | 3 |   | 2 |
 *  +---+---+---+    +---+---+---+
 *
 *  When allowDiagonal is true, if offsets[i] is valid, then
 *  diagonalOffsets[i] and
 *  diagonalOffsets[(i + 1) % 4] is valid.
 * @param {Node} node
 * @param {DiagonalMovement} diagonalMovement
 */
Grid.prototype.getNeighbors = function(node, diagonalMovement) {
    var x = node.x,
        y = node.y,
        neighbors = [],
        s0 = false, d0 = false,
        s1 = false, d1 = false,
        s2 = false, d2 = false,
        s3 = false, d3 = false,
        nodes = this.nodes;

    // ↑
    if (this.isWalkableAt(x, y - 1)) {
        neighbors.push(nodes[y - 1][x]);
        s0 = true;
    }
    // →
    if (this.isWalkableAt(x + 1, y)) {
        neighbors.push(nodes[y][x + 1]);
        s1 = true;
    }
    // ↓
    if (this.isWalkableAt(x, y + 1)) {
        neighbors.push(nodes[y + 1][x]);
        s2 = true;
    }
    // ←
    if (this.isWalkableAt(x - 1, y)) {
        neighbors.push(nodes[y][x - 1]);
        s3 = true;
    }

    if (diagonalMovement === DiagonalMovement.Never) {
        return neighbors;
    }

    if (diagonalMovement === DiagonalMovement.OnlyWhenNoObstacles) {
        d0 = s3 && s0;
        d1 = s0 && s1;
        d2 = s1 && s2;
        d3 = s2 && s3;
    } else if (diagonalMovement === DiagonalMovement.IfAtMostOneObstacle) {
        d0 = s3 || s0;
        d1 = s0 || s1;
        d2 = s1 || s2;
        d3 = s2 || s3;
    } else if (diagonalMovement === DiagonalMovement.Always) {
        d0 = true;
        d1 = true;
        d2 = true;
        d3 = true;
    } else {
        throw new Error('Incorrect value of diagonalMovement');
    }

    // ↖
    if (d0 && this.isWalkableAt(x - 1, y - 1)) {
        neighbors.push(nodes[y - 1][x - 1]);
    }
    // ↗
    if (d1 && this.isWalkableAt(x + 1, y - 1)) {
        neighbors.push(nodes[y - 1][x + 1]);
    }
    // ↘
    if (d2 && this.isWalkableAt(x + 1, y + 1)) {
        neighbors.push(nodes[y + 1][x + 1]);
    }
    // ↙
    if (d3 && this.isWalkableAt(x - 1, y + 1)) {
        neighbors.push(nodes[y + 1][x - 1]);
    }

    return neighbors;
};


/**
 * Get a clone of this grid.
 * @return {Grid} Cloned grid.
 */
Grid.prototype.clone = function() {
    var i, j,

        width = this.width,
        height = this.height,
        thisNodes = this.nodes,

        newGrid = new Grid(width, height),
        newNodes = new Array(height);

    for (i = 0; i < height; ++i) {
        newNodes[i] = new Array(width);
        for (j = 0; j < width; ++j) {
            newNodes[i][j] = new Node(j, i, thisNodes[i][j].walkable);
        }
    }

    newGrid.nodes = newNodes;

    return newGrid;
};

module.exports = Grid;

},{"./DiagonalMovement":12,"./Node":15}],14:[function(require,module,exports){
/**
 * @namespace PF.Heuristic
 * @description A collection of heuristic functions.
 */
module.exports = {

  /**
   * Manhattan distance.
   * @param {number} dx - Difference in x.
   * @param {number} dy - Difference in y.
   * @return {number} dx + dy
   */
  manhattan: function(dx, dy) {
      return dx + dy;
  },

  /**
   * Euclidean distance.
   * @param {number} dx - Difference in x.
   * @param {number} dy - Difference in y.
   * @return {number} sqrt(dx * dx + dy * dy)
   */
  euclidean: function(dx, dy) {
      return Math.sqrt(dx * dx + dy * dy);
  },

  /**
   * Octile distance.
   * @param {number} dx - Difference in x.
   * @param {number} dy - Difference in y.
   * @return {number} sqrt(dx * dx + dy * dy) for grids
   */
  octile: function(dx, dy) {
      var F = Math.SQRT2 - 1;
      return (dx < dy) ? F * dx + dy : F * dy + dx;
  },

  /**
   * Chebyshev distance.
   * @param {number} dx - Difference in x.
   * @param {number} dy - Difference in y.
   * @return {number} max(dx, dy)
   */
  chebyshev: function(dx, dy) {
      return Math.max(dx, dy);
  }

};

},{}],15:[function(require,module,exports){
/**
 * A node in grid. 
 * This class holds some basic information about a node and custom 
 * attributes may be added, depending on the algorithms' needs.
 * @constructor
 * @param {number} x - The x coordinate of the node on the grid.
 * @param {number} y - The y coordinate of the node on the grid.
 * @param {boolean} [walkable] - Whether this node is walkable.
 */
function Node(x, y, walkable) {
    /**
     * The x coordinate of the node on the grid.
     * @type number
     */
    this.x = x;
    /**
     * The y coordinate of the node on the grid.
     * @type number
     */
    this.y = y;
    /**
     * Whether this node can be walked through.
     * @type boolean
     */
    this.walkable = (walkable === undefined ? true : walkable);
}

module.exports = Node;

},{}],16:[function(require,module,exports){
/**
 * Backtrace according to the parent records and return the path.
 * (including both start and end nodes)
 * @param {Node} node End node
 * @return {Array<Array<number>>} the path
 */
function backtrace(node) {
    var path = [[node.x, node.y]];
    while (node.parent) {
        node = node.parent;
        path.push([node.x, node.y]);
    }
    return path.reverse();
}
exports.backtrace = backtrace;

/**
 * Backtrace from start and end node, and return the path.
 * (including both start and end nodes)
 * @param {Node}
 * @param {Node}
 */
function biBacktrace(nodeA, nodeB) {
    var pathA = backtrace(nodeA),
        pathB = backtrace(nodeB);
    return pathA.concat(pathB.reverse());
}
exports.biBacktrace = biBacktrace;

/**
 * Compute the length of the path.
 * @param {Array<Array<number>>} path The path
 * @return {number} The length of the path
 */
function pathLength(path) {
    var i, sum = 0, a, b, dx, dy;
    for (i = 1; i < path.length; ++i) {
        a = path[i - 1];
        b = path[i];
        dx = a[0] - b[0];
        dy = a[1] - b[1];
        sum += Math.sqrt(dx * dx + dy * dy);
    }
    return sum;
}
exports.pathLength = pathLength;


/**
 * Given the start and end coordinates, return all the coordinates lying
 * on the line formed by these coordinates, based on Bresenham's algorithm.
 * http://en.wikipedia.org/wiki/Bresenham's_line_algorithm#Simplification
 * @param {number} x0 Start x coordinate
 * @param {number} y0 Start y coordinate
 * @param {number} x1 End x coordinate
 * @param {number} y1 End y coordinate
 * @return {Array<Array<number>>} The coordinates on the line
 */
function interpolate(x0, y0, x1, y1) {
    var abs = Math.abs,
        line = [],
        sx, sy, dx, dy, err, e2;

    dx = abs(x1 - x0);
    dy = abs(y1 - y0);

    sx = (x0 < x1) ? 1 : -1;
    sy = (y0 < y1) ? 1 : -1;

    err = dx - dy;

    while (true) {
        line.push([x0, y0]);

        if (x0 === x1 && y0 === y1) {
            break;
        }
        
        e2 = 2 * err;
        if (e2 > -dy) {
            err = err - dy;
            x0 = x0 + sx;
        }
        if (e2 < dx) {
            err = err + dx;
            y0 = y0 + sy;
        }
    }

    return line;
}
exports.interpolate = interpolate;


/**
 * Given a compressed path, return a new path that has all the segments
 * in it interpolated.
 * @param {Array<Array<number>>} path The path
 * @return {Array<Array<number>>} expanded path
 */
function expandPath(path) {
    var expanded = [],
        len = path.length,
        coord0, coord1,
        interpolated,
        interpolatedLen,
        i, j;

    if (len < 2) {
        return expanded;
    }

    for (i = 0; i < len - 1; ++i) {
        coord0 = path[i];
        coord1 = path[i + 1];

        interpolated = interpolate(coord0[0], coord0[1], coord1[0], coord1[1]);
        interpolatedLen = interpolated.length;
        for (j = 0; j < interpolatedLen - 1; ++j) {
            expanded.push(interpolated[j]);
        }
    }
    expanded.push(path[len - 1]);

    return expanded;
}
exports.expandPath = expandPath;


/**
 * Smoothen the give path.
 * The original path will not be modified; a new path will be returned.
 * @param {PF.Grid} grid
 * @param {Array<Array<number>>} path The path
 */
function smoothenPath(grid, path) {
    var len = path.length,
        x0 = path[0][0],        // path start x
        y0 = path[0][1],        // path start y
        x1 = path[len - 1][0],  // path end x
        y1 = path[len - 1][1],  // path end y
        sx, sy,                 // current start coordinate
        ex, ey,                 // current end coordinate
        newPath,
        i, j, coord, line, testCoord, blocked;

    sx = x0;
    sy = y0;
    newPath = [[sx, sy]];

    for (i = 2; i < len; ++i) {
        coord = path[i];
        ex = coord[0];
        ey = coord[1];
        line = interpolate(sx, sy, ex, ey);

        blocked = false;
        for (j = 1; j < line.length; ++j) {
            testCoord = line[j];

            if (!grid.isWalkableAt(testCoord[0], testCoord[1])) {
                blocked = true;
                break;
            }
        }
        if (blocked) {
            lastValidCoord = path[i - 1];
            newPath.push(lastValidCoord);
            sx = lastValidCoord[0];
            sy = lastValidCoord[1];
        }
    }
    newPath.push([x1, y1]);

    return newPath;
}
exports.smoothenPath = smoothenPath;


/**
 * Compress a path, remove redundant nodes without altering the shape
 * The original path is not modified
 * @param {Array<Array<number>>} path The path
 * @return {Array<Array<number>>} The compressed path
 */
function compressPath(path) {

    // nothing to compress
    if(path.length < 3) {
        return path;
    }

    var compressed = [],
        sx = path[0][0], // start x
        sy = path[0][1], // start y
        px = path[1][0], // second point x
        py = path[1][1], // second point y
        dx = px - sx, // direction between the two points
        dy = py - sy, // direction between the two points
        lx, ly,
        ldx, ldy,
        sq, i;

    // normalize the direction
    sq = Math.sqrt(dx*dx + dy*dy);
    dx /= sq;
    dy /= sq;

    // start the new path
    compressed.push([sx,sy]);

    for(i = 2; i < path.length; i++) {

        // store the last point
        lx = px;
        ly = py;

        // store the last direction
        ldx = dx;
        ldy = dy;

        // next point
        px = path[i][0];
        py = path[i][1];

        // next direction
        dx = px - lx;
        dy = py - ly;

        // normalize
        sq = Math.sqrt(dx*dx + dy*dy);
        dx /= sq;
        dy /= sq;

        // if the direction has changed, store the point
        if ( dx !== ldx || dy !== ldy ) {
            compressed.push([lx,ly]);
        }
    }

    // store the last point
    compressed.push([px,py]);

    return compressed;
}
exports.compressPath = compressPath;

},{}],17:[function(require,module,exports){
var Heap       = require('heap');
var Util       = require('../core/Util');
var Heuristic  = require('../core/Heuristic');
var DiagonalMovement = require('../core/DiagonalMovement');

/**
 * A* path-finder. Based upon https://github.com/bgrins/javascript-astar
 * @constructor
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching 
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 * @param {function} opt.heuristic Heuristic function to estimate the distance
 *     (defaults to manhattan).
 * @param {number} opt.weight Weight to apply to the heuristic to allow for
 *     suboptimal paths, in order to speed up the search.
 */
function AStarFinder(opt) {
    opt = opt || {};
    this.allowDiagonal = opt.allowDiagonal;
    this.dontCrossCorners = opt.dontCrossCorners;
    this.heuristic = opt.heuristic || Heuristic.manhattan;
    this.weight = opt.weight || 1;
    this.diagonalMovement = opt.diagonalMovement;

    if (!this.diagonalMovement) {
        if (!this.allowDiagonal) {
            this.diagonalMovement = DiagonalMovement.Never;
        } else {
            if (this.dontCrossCorners) {
                this.diagonalMovement = DiagonalMovement.OnlyWhenNoObstacles;
            } else {
                this.diagonalMovement = DiagonalMovement.IfAtMostOneObstacle;
            }
        }
    }

    // When diagonal movement is allowed the manhattan heuristic is not
    //admissible. It should be octile instead
    if (this.diagonalMovement === DiagonalMovement.Never) {
        this.heuristic = opt.heuristic || Heuristic.manhattan;
    } else {
        this.heuristic = opt.heuristic || Heuristic.octile;
    }
}

/**
 * Find and return the the path.
 * @return {Array<Array<number>>} The path, including both start and
 *     end positions.
 */
AStarFinder.prototype.findPath = function(startX, startY, endX, endY, grid) {
    var openList = new Heap(function(nodeA, nodeB) {
            return nodeA.f - nodeB.f;
        }),
        startNode = grid.getNodeAt(startX, startY),
        endNode = grid.getNodeAt(endX, endY),
        heuristic = this.heuristic,
        diagonalMovement = this.diagonalMovement,
        weight = this.weight,
        abs = Math.abs, SQRT2 = Math.SQRT2,
        node, neighbors, neighbor, i, l, x, y, ng;

    // set the `g` and `f` value of the start node to be 0
    startNode.g = 0;
    startNode.f = 0;

    // push the start node into the open list
    openList.push(startNode);
    startNode.opened = true;

    // while the open list is not empty
    while (!openList.empty()) {
        // pop the position of node which has the minimum `f` value.
        node = openList.pop();
        node.closed = true;

        // if reached the end position, construct the path and return it
        if (node === endNode) {
            return Util.backtrace(endNode);
        }

        // get neigbours of the current node
        neighbors = grid.getNeighbors(node, diagonalMovement);
        for (i = 0, l = neighbors.length; i < l; ++i) {
            neighbor = neighbors[i];

            if (neighbor.closed) {
                continue;
            }

            x = neighbor.x;
            y = neighbor.y;

            // get the distance between current node and the neighbor
            // and calculate the next g score
            ng = node.g + ((x - node.x === 0 || y - node.y === 0) ? 1 : SQRT2);

            // check if the neighbor has not been inspected yet, or
            // can be reached with smaller cost from the current node
            if (!neighbor.opened || ng < neighbor.g) {
                neighbor.g = ng;
                neighbor.h = neighbor.h || weight * heuristic(abs(x - endX), abs(y - endY));
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.parent = node;

                if (!neighbor.opened) {
                    openList.push(neighbor);
                    neighbor.opened = true;
                } else {
                    // the neighbor can be reached with smaller cost.
                    // Since its f value has been updated, we have to
                    // update its position in the open list
                    openList.updateItem(neighbor);
                }
            }
        } // end for each neighbor
    } // end while not open list empty

    // fail to find the path
    return [];
};

module.exports = AStarFinder;

},{"../core/DiagonalMovement":12,"../core/Heuristic":14,"../core/Util":16,"heap":8}],18:[function(require,module,exports){
var AStarFinder = require('./AStarFinder');

/**
 * Best-First-Search path-finder.
 * @constructor
 * @extends AStarFinder
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 * @param {function} opt.heuristic Heuristic function to estimate the distance
 *     (defaults to manhattan).
 */
function BestFirstFinder(opt) {
    AStarFinder.call(this, opt);

    var orig = this.heuristic;
    this.heuristic = function(dx, dy) {
        return orig(dx, dy) * 1000000;
    };
}

BestFirstFinder.prototype = new AStarFinder();
BestFirstFinder.prototype.constructor = BestFirstFinder;

module.exports = BestFirstFinder;

},{"./AStarFinder":17}],19:[function(require,module,exports){
var Heap       = require('heap');
var Util       = require('../core/Util');
var Heuristic  = require('../core/Heuristic');
var DiagonalMovement = require('../core/DiagonalMovement');

/**
 * A* path-finder.
 * based upon https://github.com/bgrins/javascript-astar
 * @constructor
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 * @param {function} opt.heuristic Heuristic function to estimate the distance
 *     (defaults to manhattan).
 * @param {number} opt.weight Weight to apply to the heuristic to allow for
 *     suboptimal paths, in order to speed up the search.
 */
function BiAStarFinder(opt) {
    opt = opt || {};
    this.allowDiagonal = opt.allowDiagonal;
    this.dontCrossCorners = opt.dontCrossCorners;
    this.diagonalMovement = opt.diagonalMovement;
    this.heuristic = opt.heuristic || Heuristic.manhattan;
    this.weight = opt.weight || 1;

    if (!this.diagonalMovement) {
        if (!this.allowDiagonal) {
            this.diagonalMovement = DiagonalMovement.Never;
        } else {
            if (this.dontCrossCorners) {
                this.diagonalMovement = DiagonalMovement.OnlyWhenNoObstacles;
            } else {
                this.diagonalMovement = DiagonalMovement.IfAtMostOneObstacle;
            }
        }
    }

    //When diagonal movement is allowed the manhattan heuristic is not admissible
    //It should be octile instead
    if (this.diagonalMovement === DiagonalMovement.Never) {
        this.heuristic = opt.heuristic || Heuristic.manhattan;
    } else {
        this.heuristic = opt.heuristic || Heuristic.octile;
    }
}

/**
 * Find and return the the path.
 * @return {Array<Array<number>>} The path, including both start and
 *     end positions.
 */
BiAStarFinder.prototype.findPath = function(startX, startY, endX, endY, grid) {
    var cmp = function(nodeA, nodeB) {
            return nodeA.f - nodeB.f;
        },
        startOpenList = new Heap(cmp),
        endOpenList = new Heap(cmp),
        startNode = grid.getNodeAt(startX, startY),
        endNode = grid.getNodeAt(endX, endY),
        heuristic = this.heuristic,
        diagonalMovement = this.diagonalMovement,
        weight = this.weight,
        abs = Math.abs, SQRT2 = Math.SQRT2,
        node, neighbors, neighbor, i, l, x, y, ng,
        BY_START = 1, BY_END = 2;

    // set the `g` and `f` value of the start node to be 0
    // and push it into the start open list
    startNode.g = 0;
    startNode.f = 0;
    startOpenList.push(startNode);
    startNode.opened = BY_START;

    // set the `g` and `f` value of the end node to be 0
    // and push it into the open open list
    endNode.g = 0;
    endNode.f = 0;
    endOpenList.push(endNode);
    endNode.opened = BY_END;

    // while both the open lists are not empty
    while (!startOpenList.empty() && !endOpenList.empty()) {

        // pop the position of start node which has the minimum `f` value.
        node = startOpenList.pop();
        node.closed = true;

        // get neigbours of the current node
        neighbors = grid.getNeighbors(node, diagonalMovement);
        for (i = 0, l = neighbors.length; i < l; ++i) {
            neighbor = neighbors[i];

            if (neighbor.closed) {
                continue;
            }
            if (neighbor.opened === BY_END) {
                return Util.biBacktrace(node, neighbor);
            }

            x = neighbor.x;
            y = neighbor.y;

            // get the distance between current node and the neighbor
            // and calculate the next g score
            ng = node.g + ((x - node.x === 0 || y - node.y === 0) ? 1 : SQRT2);

            // check if the neighbor has not been inspected yet, or
            // can be reached with smaller cost from the current node
            if (!neighbor.opened || ng < neighbor.g) {
                neighbor.g = ng;
                neighbor.h = neighbor.h ||
                    weight * heuristic(abs(x - endX), abs(y - endY));
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.parent = node;

                if (!neighbor.opened) {
                    startOpenList.push(neighbor);
                    neighbor.opened = BY_START;
                } else {
                    // the neighbor can be reached with smaller cost.
                    // Since its f value has been updated, we have to
                    // update its position in the open list
                    startOpenList.updateItem(neighbor);
                }
            }
        } // end for each neighbor


        // pop the position of end node which has the minimum `f` value.
        node = endOpenList.pop();
        node.closed = true;

        // get neigbours of the current node
        neighbors = grid.getNeighbors(node, diagonalMovement);
        for (i = 0, l = neighbors.length; i < l; ++i) {
            neighbor = neighbors[i];

            if (neighbor.closed) {
                continue;
            }
            if (neighbor.opened === BY_START) {
                return Util.biBacktrace(neighbor, node);
            }

            x = neighbor.x;
            y = neighbor.y;

            // get the distance between current node and the neighbor
            // and calculate the next g score
            ng = node.g + ((x - node.x === 0 || y - node.y === 0) ? 1 : SQRT2);

            // check if the neighbor has not been inspected yet, or
            // can be reached with smaller cost from the current node
            if (!neighbor.opened || ng < neighbor.g) {
                neighbor.g = ng;
                neighbor.h = neighbor.h ||
                    weight * heuristic(abs(x - startX), abs(y - startY));
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.parent = node;

                if (!neighbor.opened) {
                    endOpenList.push(neighbor);
                    neighbor.opened = BY_END;
                } else {
                    // the neighbor can be reached with smaller cost.
                    // Since its f value has been updated, we have to
                    // update its position in the open list
                    endOpenList.updateItem(neighbor);
                }
            }
        } // end for each neighbor
    } // end while not open list empty

    // fail to find the path
    return [];
};

module.exports = BiAStarFinder;

},{"../core/DiagonalMovement":12,"../core/Heuristic":14,"../core/Util":16,"heap":8}],20:[function(require,module,exports){
var BiAStarFinder = require('./BiAStarFinder');

/**
 * Bi-direcitional Best-First-Search path-finder.
 * @constructor
 * @extends BiAStarFinder
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 * @param {function} opt.heuristic Heuristic function to estimate the distance
 *     (defaults to manhattan).
 */
function BiBestFirstFinder(opt) {
    BiAStarFinder.call(this, opt);

    var orig = this.heuristic;
    this.heuristic = function(dx, dy) {
        return orig(dx, dy) * 1000000;
    };
}

BiBestFirstFinder.prototype = new BiAStarFinder();
BiBestFirstFinder.prototype.constructor = BiBestFirstFinder;

module.exports = BiBestFirstFinder;

},{"./BiAStarFinder":19}],21:[function(require,module,exports){
var Util = require('../core/Util');
var DiagonalMovement = require('../core/DiagonalMovement');

/**
 * Bi-directional Breadth-First-Search path finder.
 * @constructor
 * @param {object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 */
function BiBreadthFirstFinder(opt) {
    opt = opt || {};
    this.allowDiagonal = opt.allowDiagonal;
    this.dontCrossCorners = opt.dontCrossCorners;
    this.diagonalMovement = opt.diagonalMovement;

    if (!this.diagonalMovement) {
        if (!this.allowDiagonal) {
            this.diagonalMovement = DiagonalMovement.Never;
        } else {
            if (this.dontCrossCorners) {
                this.diagonalMovement = DiagonalMovement.OnlyWhenNoObstacles;
            } else {
                this.diagonalMovement = DiagonalMovement.IfAtMostOneObstacle;
            }
        }
    }
}


/**
 * Find and return the the path.
 * @return {Array<Array<number>>} The path, including both start and
 *     end positions.
 */
BiBreadthFirstFinder.prototype.findPath = function(startX, startY, endX, endY, grid) {
    var startNode = grid.getNodeAt(startX, startY),
        endNode = grid.getNodeAt(endX, endY),
        startOpenList = [], endOpenList = [],
        neighbors, neighbor, node,
        diagonalMovement = this.diagonalMovement,
        BY_START = 0, BY_END = 1,
        i, l;

    // push the start and end nodes into the queues
    startOpenList.push(startNode);
    startNode.opened = true;
    startNode.by = BY_START;

    endOpenList.push(endNode);
    endNode.opened = true;
    endNode.by = BY_END;

    // while both the queues are not empty
    while (startOpenList.length && endOpenList.length) {

        // expand start open list

        node = startOpenList.shift();
        node.closed = true;

        neighbors = grid.getNeighbors(node, diagonalMovement);
        for (i = 0, l = neighbors.length; i < l; ++i) {
            neighbor = neighbors[i];

            if (neighbor.closed) {
                continue;
            }
            if (neighbor.opened) {
                // if this node has been inspected by the reversed search,
                // then a path is found.
                if (neighbor.by === BY_END) {
                    return Util.biBacktrace(node, neighbor);
                }
                continue;
            }
            startOpenList.push(neighbor);
            neighbor.parent = node;
            neighbor.opened = true;
            neighbor.by = BY_START;
        }

        // expand end open list

        node = endOpenList.shift();
        node.closed = true;

        neighbors = grid.getNeighbors(node, diagonalMovement);
        for (i = 0, l = neighbors.length; i < l; ++i) {
            neighbor = neighbors[i];

            if (neighbor.closed) {
                continue;
            }
            if (neighbor.opened) {
                if (neighbor.by === BY_START) {
                    return Util.biBacktrace(neighbor, node);
                }
                continue;
            }
            endOpenList.push(neighbor);
            neighbor.parent = node;
            neighbor.opened = true;
            neighbor.by = BY_END;
        }
    }

    // fail to find the path
    return [];
};

module.exports = BiBreadthFirstFinder;

},{"../core/DiagonalMovement":12,"../core/Util":16}],22:[function(require,module,exports){
var BiAStarFinder = require('./BiAStarFinder');

/**
 * Bi-directional Dijkstra path-finder.
 * @constructor
 * @extends BiAStarFinder
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 */
function BiDijkstraFinder(opt) {
    BiAStarFinder.call(this, opt);
    this.heuristic = function(dx, dy) {
        return 0;
    };
}

BiDijkstraFinder.prototype = new BiAStarFinder();
BiDijkstraFinder.prototype.constructor = BiDijkstraFinder;

module.exports = BiDijkstraFinder;

},{"./BiAStarFinder":19}],23:[function(require,module,exports){
var Util = require('../core/Util');
var DiagonalMovement = require('../core/DiagonalMovement');

/**
 * Breadth-First-Search path finder.
 * @constructor
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 */
function BreadthFirstFinder(opt) {
    opt = opt || {};
    this.allowDiagonal = opt.allowDiagonal;
    this.dontCrossCorners = opt.dontCrossCorners;
    this.diagonalMovement = opt.diagonalMovement;

    if (!this.diagonalMovement) {
        if (!this.allowDiagonal) {
            this.diagonalMovement = DiagonalMovement.Never;
        } else {
            if (this.dontCrossCorners) {
                this.diagonalMovement = DiagonalMovement.OnlyWhenNoObstacles;
            } else {
                this.diagonalMovement = DiagonalMovement.IfAtMostOneObstacle;
            }
        }
    }
}

/**
 * Find and return the the path.
 * @return {Array<Array<number>>} The path, including both start and
 *     end positions.
 */
BreadthFirstFinder.prototype.findPath = function(startX, startY, endX, endY, grid) {
    var openList = [],
        diagonalMovement = this.diagonalMovement,
        startNode = grid.getNodeAt(startX, startY),
        endNode = grid.getNodeAt(endX, endY),
        neighbors, neighbor, node, i, l;

    // push the start pos into the queue
    openList.push(startNode);
    startNode.opened = true;

    // while the queue is not empty
    while (openList.length) {
        // take the front node from the queue
        node = openList.shift();
        node.closed = true;

        // reached the end position
        if (node === endNode) {
            return Util.backtrace(endNode);
        }

        neighbors = grid.getNeighbors(node, diagonalMovement);
        for (i = 0, l = neighbors.length; i < l; ++i) {
            neighbor = neighbors[i];

            // skip this neighbor if it has been inspected before
            if (neighbor.closed || neighbor.opened) {
                continue;
            }

            openList.push(neighbor);
            neighbor.opened = true;
            neighbor.parent = node;
        }
    }
    
    // fail to find the path
    return [];
};

module.exports = BreadthFirstFinder;

},{"../core/DiagonalMovement":12,"../core/Util":16}],24:[function(require,module,exports){
var AStarFinder = require('./AStarFinder');

/**
 * Dijkstra path-finder.
 * @constructor
 * @extends AStarFinder
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 */
function DijkstraFinder(opt) {
    AStarFinder.call(this, opt);
    this.heuristic = function(dx, dy) {
        return 0;
    };
}

DijkstraFinder.prototype = new AStarFinder();
DijkstraFinder.prototype.constructor = DijkstraFinder;

module.exports = DijkstraFinder;

},{"./AStarFinder":17}],25:[function(require,module,exports){
var Util       = require('../core/Util');
var Heuristic  = require('../core/Heuristic');
var Node       = require('../core/Node');
var DiagonalMovement = require('../core/DiagonalMovement');

/**
 * Iterative Deeping A Star (IDA*) path-finder.
 *
 * Recursion based on:
 *   http://www.apl.jhu.edu/~hall/AI-Programming/IDA-Star.html
 *
 * Path retracing based on:
 *  V. Nageshwara Rao, Vipin Kumar and K. Ramesh
 *  "A Parallel Implementation of Iterative-Deeping-A*", January 1987.
 *  ftp://ftp.cs.utexas.edu/.snapshot/hourly.1/pub/AI-Lab/tech-reports/UT-AI-TR-87-46.pdf
 *
 * @author Gerard Meier (www.gerardmeier.com)
 *
 * @constructor
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 * @param {function} opt.heuristic Heuristic function to estimate the distance
 *     (defaults to manhattan).
 * @param {number} opt.weight Weight to apply to the heuristic to allow for
 *     suboptimal paths, in order to speed up the search.
 * @param {boolean} opt.trackRecursion Whether to track recursion for
 *     statistical purposes.
 * @param {number} opt.timeLimit Maximum execution time. Use <= 0 for infinite.
 */
function IDAStarFinder(opt) {
    opt = opt || {};
    this.allowDiagonal = opt.allowDiagonal;
    this.dontCrossCorners = opt.dontCrossCorners;
    this.diagonalMovement = opt.diagonalMovement;
    this.heuristic = opt.heuristic || Heuristic.manhattan;
    this.weight = opt.weight || 1;
    this.trackRecursion = opt.trackRecursion || false;
    this.timeLimit = opt.timeLimit || Infinity; // Default: no time limit.

    if (!this.diagonalMovement) {
        if (!this.allowDiagonal) {
            this.diagonalMovement = DiagonalMovement.Never;
        } else {
            if (this.dontCrossCorners) {
                this.diagonalMovement = DiagonalMovement.OnlyWhenNoObstacles;
            } else {
                this.diagonalMovement = DiagonalMovement.IfAtMostOneObstacle;
            }
        }
    }

    // When diagonal movement is allowed the manhattan heuristic is not
    // admissible, it should be octile instead
    if (this.diagonalMovement === DiagonalMovement.Never) {
        this.heuristic = opt.heuristic || Heuristic.manhattan;
    } else {
        this.heuristic = opt.heuristic || Heuristic.octile;
    }
}

/**
 * Find and return the the path. When an empty array is returned, either
 * no path is possible, or the maximum execution time is reached.
 *
 * @return {Array<Array<number>>} The path, including both start and
 *     end positions.
 */
IDAStarFinder.prototype.findPath = function(startX, startY, endX, endY, grid) {
    // Used for statistics:
    var nodesVisited = 0;

    // Execution time limitation:
    var startTime = new Date().getTime();

    // Heuristic helper:
    var h = function(a, b) {
        return this.heuristic(Math.abs(b.x - a.x), Math.abs(b.y - a.y));
    }.bind(this);

    // Step cost from a to b:
    var cost = function(a, b) {
        return (a.x === b.x || a.y === b.y) ? 1 : Math.SQRT2;
    };

    /**
     * IDA* search implementation.
     *
     * @param {Node} The node currently expanding from.
     * @param {number} Cost to reach the given node.
     * @param {number} Maximum search depth (cut-off value).
     * @param {Array<Array<number>>} The found route.
     * @param {number} Recursion depth.
     *
     * @return {Object} either a number with the new optimal cut-off depth,
     * or a valid node instance, in which case a path was found.
     */
    var search = function(node, g, cutoff, route, depth) {
        nodesVisited++;

        // Enforce timelimit:
        if (this.timeLimit > 0 &&
            new Date().getTime() - startTime > this.timeLimit * 1000) {
            // Enforced as "path-not-found".
            return Infinity;
        }

        var f = g + h(node, end) * this.weight;

        // We've searched too deep for this iteration.
        if (f > cutoff) {
            return f;
        }

        if (node == end) {
            route[depth] = [node.x, node.y];
            return node;
        }

        var min, t, k, neighbour;

        var neighbours = grid.getNeighbors(node, this.diagonalMovement);

        // Sort the neighbours, gives nicer paths. But, this deviates
        // from the original algorithm - so I left it out.
        //neighbours.sort(function(a, b){
        //    return h(a, end) - h(b, end);
        //});

        
        /*jshint -W084 *///Disable warning: Expected a conditional expression and instead saw an assignment
        for (k = 0, min = Infinity; neighbour = neighbours[k]; ++k) {
        /*jshint +W084 *///Enable warning: Expected a conditional expression and instead saw an assignment
            if (this.trackRecursion) {
                // Retain a copy for visualisation. Due to recursion, this
                // node may be part of other paths too.
                neighbour.retainCount = neighbour.retainCount + 1 || 1;

                if(neighbour.tested !== true) {
                    neighbour.tested = true;
                }
            }

            t = search(neighbour, g + cost(node, neighbour), cutoff, route, depth + 1);

            if (t instanceof Node) {
                route[depth] = [node.x, node.y];

                // For a typical A* linked list, this would work:
                // neighbour.parent = node;
                return t;
            }

            // Decrement count, then determine whether it's actually closed.
            if (this.trackRecursion && (--neighbour.retainCount) === 0) {
                neighbour.tested = false;
            }

            if (t < min) {
                min = t;
            }
        }

        return min;

    }.bind(this);

    // Node instance lookups:
    var start = grid.getNodeAt(startX, startY);
    var end   = grid.getNodeAt(endX, endY);

    // Initial search depth, given the typical heuristic contraints,
    // there should be no cheaper route possible.
    var cutOff = h(start, end);

    var j, route, t;

    // With an overflow protection.
    for (j = 0; true; ++j) {

        route = [];

        // Search till cut-off depth:
        t = search(start, 0, cutOff, route, 0);

        // Route not possible, or not found in time limit.
        if (t === Infinity) {
            return [];
        }

        // If t is a node, it's also the end node. Route is now
        // populated with a valid path to the end node.
        if (t instanceof Node) {
            return route;
        }

        // Try again, this time with a deeper cut-off. The t score
        // is the closest we got to the end node.
        cutOff = t;
    }

    // This _should_ never to be reached.
    return [];
};

module.exports = IDAStarFinder;

},{"../core/DiagonalMovement":12,"../core/Heuristic":14,"../core/Node":15,"../core/Util":16}],26:[function(require,module,exports){
/**
 * @author imor / https://github.com/imor
 */
var JumpPointFinderBase = require('./JumpPointFinderBase');
var DiagonalMovement = require('../core/DiagonalMovement');

/**
 * Path finder using the Jump Point Search algorithm which always moves
 * diagonally irrespective of the number of obstacles.
 */
function JPFAlwaysMoveDiagonally(opt) {
    JumpPointFinderBase.call(this, opt);
}

JPFAlwaysMoveDiagonally.prototype = new JumpPointFinderBase();
JPFAlwaysMoveDiagonally.prototype.constructor = JPFAlwaysMoveDiagonally;

/**
 * Search recursively in the direction (parent -> child), stopping only when a
 * jump point is found.
 * @protected
 * @return {Array<Array<number>>} The x, y coordinate of the jump point
 *     found, or null if not found
 */
JPFAlwaysMoveDiagonally.prototype._jump = function(x, y, px, py) {
    var grid = this.grid,
        dx = x - px, dy = y - py;

    if (!grid.isWalkableAt(x, y)) {
        return null;
    }

    if(this.trackJumpRecursion === true) {
        grid.getNodeAt(x, y).tested = true;
    }

    if (grid.getNodeAt(x, y) === this.endNode) {
        return [x, y];
    }

    // check for forced neighbors
    // along the diagonal
    if (dx !== 0 && dy !== 0) {
        if ((grid.isWalkableAt(x - dx, y + dy) && !grid.isWalkableAt(x - dx, y)) ||
            (grid.isWalkableAt(x + dx, y - dy) && !grid.isWalkableAt(x, y - dy))) {
            return [x, y];
        }
        // when moving diagonally, must check for vertical/horizontal jump points
        if (this._jump(x + dx, y, x, y) || this._jump(x, y + dy, x, y)) {
            return [x, y];
        }
    }
    // horizontally/vertically
    else {
        if( dx !== 0 ) { // moving along x
            if((grid.isWalkableAt(x + dx, y + 1) && !grid.isWalkableAt(x, y + 1)) ||
               (grid.isWalkableAt(x + dx, y - 1) && !grid.isWalkableAt(x, y - 1))) {
                return [x, y];
            }
        }
        else {
            if((grid.isWalkableAt(x + 1, y + dy) && !grid.isWalkableAt(x + 1, y)) ||
               (grid.isWalkableAt(x - 1, y + dy) && !grid.isWalkableAt(x - 1, y))) {
                return [x, y];
            }
        }
    }

    return this._jump(x + dx, y + dy, x, y);
};

/**
 * Find the neighbors for the given node. If the node has a parent,
 * prune the neighbors based on the jump point search algorithm, otherwise
 * return all available neighbors.
 * @return {Array<Array<number>>} The neighbors found.
 */
JPFAlwaysMoveDiagonally.prototype._findNeighbors = function(node) {
    var parent = node.parent,
        x = node.x, y = node.y,
        grid = this.grid,
        px, py, nx, ny, dx, dy,
        neighbors = [], neighborNodes, neighborNode, i, l;

    // directed pruning: can ignore most neighbors, unless forced.
    if (parent) {
        px = parent.x;
        py = parent.y;
        // get the normalized direction of travel
        dx = (x - px) / Math.max(Math.abs(x - px), 1);
        dy = (y - py) / Math.max(Math.abs(y - py), 1);

        // search diagonally
        if (dx !== 0 && dy !== 0) {
            if (grid.isWalkableAt(x, y + dy)) {
                neighbors.push([x, y + dy]);
            }
            if (grid.isWalkableAt(x + dx, y)) {
                neighbors.push([x + dx, y]);
            }
            if (grid.isWalkableAt(x + dx, y + dy)) {
                neighbors.push([x + dx, y + dy]);
            }
            if (!grid.isWalkableAt(x - dx, y)) {
                neighbors.push([x - dx, y + dy]);
            }
            if (!grid.isWalkableAt(x, y - dy)) {
                neighbors.push([x + dx, y - dy]);
            }
        }
        // search horizontally/vertically
        else {
            if(dx === 0) {
                if (grid.isWalkableAt(x, y + dy)) {
                    neighbors.push([x, y + dy]);
                }
                if (!grid.isWalkableAt(x + 1, y)) {
                    neighbors.push([x + 1, y + dy]);
                }
                if (!grid.isWalkableAt(x - 1, y)) {
                    neighbors.push([x - 1, y + dy]);
                }
            }
            else {
                if (grid.isWalkableAt(x + dx, y)) {
                    neighbors.push([x + dx, y]);
                }
                if (!grid.isWalkableAt(x, y + 1)) {
                    neighbors.push([x + dx, y + 1]);
                }
                if (!grid.isWalkableAt(x, y - 1)) {
                    neighbors.push([x + dx, y - 1]);
                }
            }
        }
    }
    // return all neighbors
    else {
        neighborNodes = grid.getNeighbors(node, DiagonalMovement.Always);
        for (i = 0, l = neighborNodes.length; i < l; ++i) {
            neighborNode = neighborNodes[i];
            neighbors.push([neighborNode.x, neighborNode.y]);
        }
    }

    return neighbors;
};

module.exports = JPFAlwaysMoveDiagonally;

},{"../core/DiagonalMovement":12,"./JumpPointFinderBase":31}],27:[function(require,module,exports){
/**
 * @author imor / https://github.com/imor
 */
var JumpPointFinderBase = require('./JumpPointFinderBase');
var DiagonalMovement = require('../core/DiagonalMovement');

/**
 * Path finder using the Jump Point Search algorithm which moves
 * diagonally only when there is at most one obstacle.
 */
function JPFMoveDiagonallyIfAtMostOneObstacle(opt) {
    JumpPointFinderBase.call(this, opt);
}

JPFMoveDiagonallyIfAtMostOneObstacle.prototype = new JumpPointFinderBase();
JPFMoveDiagonallyIfAtMostOneObstacle.prototype.constructor = JPFMoveDiagonallyIfAtMostOneObstacle;

/**
 * Search recursively in the direction (parent -> child), stopping only when a
 * jump point is found.
 * @protected
 * @return {Array<Array<number>>} The x, y coordinate of the jump point
 *     found, or null if not found
 */
JPFMoveDiagonallyIfAtMostOneObstacle.prototype._jump = function(x, y, px, py) {
    var grid = this.grid,
        dx = x - px, dy = y - py;

    if (!grid.isWalkableAt(x, y)) {
        return null;
    }

    if(this.trackJumpRecursion === true) {
        grid.getNodeAt(x, y).tested = true;
    }

    if (grid.getNodeAt(x, y) === this.endNode) {
        return [x, y];
    }

    // check for forced neighbors
    // along the diagonal
    if (dx !== 0 && dy !== 0) {
        if ((grid.isWalkableAt(x - dx, y + dy) && !grid.isWalkableAt(x - dx, y)) ||
            (grid.isWalkableAt(x + dx, y - dy) && !grid.isWalkableAt(x, y - dy))) {
            return [x, y];
        }
        // when moving diagonally, must check for vertical/horizontal jump points
        if (this._jump(x + dx, y, x, y) || this._jump(x, y + dy, x, y)) {
            return [x, y];
        }
    }
    // horizontally/vertically
    else {
        if( dx !== 0 ) { // moving along x
            if((grid.isWalkableAt(x + dx, y + 1) && !grid.isWalkableAt(x, y + 1)) ||
               (grid.isWalkableAt(x + dx, y - 1) && !grid.isWalkableAt(x, y - 1))) {
                return [x, y];
            }
        }
        else {
            if((grid.isWalkableAt(x + 1, y + dy) && !grid.isWalkableAt(x + 1, y)) ||
               (grid.isWalkableAt(x - 1, y + dy) && !grid.isWalkableAt(x - 1, y))) {
                return [x, y];
            }
        }
    }

    // moving diagonally, must make sure one of the vertical/horizontal
    // neighbors is open to allow the path
    if (grid.isWalkableAt(x + dx, y) || grid.isWalkableAt(x, y + dy)) {
        return this._jump(x + dx, y + dy, x, y);
    } else {
        return null;
    }
};

/**
 * Find the neighbors for the given node. If the node has a parent,
 * prune the neighbors based on the jump point search algorithm, otherwise
 * return all available neighbors.
 * @return {Array<Array<number>>} The neighbors found.
 */
JPFMoveDiagonallyIfAtMostOneObstacle.prototype._findNeighbors = function(node) {
    var parent = node.parent,
        x = node.x, y = node.y,
        grid = this.grid,
        px, py, nx, ny, dx, dy,
        neighbors = [], neighborNodes, neighborNode, i, l;

    // directed pruning: can ignore most neighbors, unless forced.
    if (parent) {
        px = parent.x;
        py = parent.y;
        // get the normalized direction of travel
        dx = (x - px) / Math.max(Math.abs(x - px), 1);
        dy = (y - py) / Math.max(Math.abs(y - py), 1);

        // search diagonally
        if (dx !== 0 && dy !== 0) {
            if (grid.isWalkableAt(x, y + dy)) {
                neighbors.push([x, y + dy]);
            }
            if (grid.isWalkableAt(x + dx, y)) {
                neighbors.push([x + dx, y]);
            }
            if (grid.isWalkableAt(x, y + dy) || grid.isWalkableAt(x + dx, y)) {
                neighbors.push([x + dx, y + dy]);
            }
            if (!grid.isWalkableAt(x - dx, y) && grid.isWalkableAt(x, y + dy)) {
                neighbors.push([x - dx, y + dy]);
            }
            if (!grid.isWalkableAt(x, y - dy) && grid.isWalkableAt(x + dx, y)) {
                neighbors.push([x + dx, y - dy]);
            }
        }
        // search horizontally/vertically
        else {
            if(dx === 0) {
                if (grid.isWalkableAt(x, y + dy)) {
                    neighbors.push([x, y + dy]);
                    if (!grid.isWalkableAt(x + 1, y)) {
                        neighbors.push([x + 1, y + dy]);
                    }
                    if (!grid.isWalkableAt(x - 1, y)) {
                        neighbors.push([x - 1, y + dy]);
                    }
                }
            }
            else {
                if (grid.isWalkableAt(x + dx, y)) {
                    neighbors.push([x + dx, y]);
                    if (!grid.isWalkableAt(x, y + 1)) {
                        neighbors.push([x + dx, y + 1]);
                    }
                    if (!grid.isWalkableAt(x, y - 1)) {
                        neighbors.push([x + dx, y - 1]);
                    }
                }
            }
        }
    }
    // return all neighbors
    else {
        neighborNodes = grid.getNeighbors(node, DiagonalMovement.IfAtMostOneObstacle);
        for (i = 0, l = neighborNodes.length; i < l; ++i) {
            neighborNode = neighborNodes[i];
            neighbors.push([neighborNode.x, neighborNode.y]);
        }
    }

    return neighbors;
};

module.exports = JPFMoveDiagonallyIfAtMostOneObstacle;

},{"../core/DiagonalMovement":12,"./JumpPointFinderBase":31}],28:[function(require,module,exports){
/**
 * @author imor / https://github.com/imor
 */
var JumpPointFinderBase = require('./JumpPointFinderBase');
var DiagonalMovement = require('../core/DiagonalMovement');

/**
 * Path finder using the Jump Point Search algorithm which moves
 * diagonally only when there are no obstacles.
 */
function JPFMoveDiagonallyIfNoObstacles(opt) {
    JumpPointFinderBase.call(this, opt);
}

JPFMoveDiagonallyIfNoObstacles.prototype = new JumpPointFinderBase();
JPFMoveDiagonallyIfNoObstacles.prototype.constructor = JPFMoveDiagonallyIfNoObstacles;

/**
 * Search recursively in the direction (parent -> child), stopping only when a
 * jump point is found.
 * @protected
 * @return {Array<Array<number>>} The x, y coordinate of the jump point
 *     found, or null if not found
 */
JPFMoveDiagonallyIfNoObstacles.prototype._jump = function(x, y, px, py) {
    var grid = this.grid,
        dx = x - px, dy = y - py;

    if (!grid.isWalkableAt(x, y)) {
        return null;
    }

    if(this.trackJumpRecursion === true) {
        grid.getNodeAt(x, y).tested = true;
    }

    if (grid.getNodeAt(x, y) === this.endNode) {
        return [x, y];
    }

    // check for forced neighbors
    // along the diagonal
    if (dx !== 0 && dy !== 0) {
        // if ((grid.isWalkableAt(x - dx, y + dy) && !grid.isWalkableAt(x - dx, y)) ||
            // (grid.isWalkableAt(x + dx, y - dy) && !grid.isWalkableAt(x, y - dy))) {
            // return [x, y];
        // }
        // when moving diagonally, must check for vertical/horizontal jump points
        if (this._jump(x + dx, y, x, y) || this._jump(x, y + dy, x, y)) {
            return [x, y];
        }
    }
    // horizontally/vertically
    else {
        if (dx !== 0) {
            if ((grid.isWalkableAt(x, y - 1) && !grid.isWalkableAt(x - dx, y - 1)) ||
                (grid.isWalkableAt(x, y + 1) && !grid.isWalkableAt(x - dx, y + 1))) {
                return [x, y];
            }
        }
        else if (dy !== 0) {
            if ((grid.isWalkableAt(x - 1, y) && !grid.isWalkableAt(x - 1, y - dy)) ||
                (grid.isWalkableAt(x + 1, y) && !grid.isWalkableAt(x + 1, y - dy))) {
                return [x, y];
            }
            // When moving vertically, must check for horizontal jump points
            // if (this._jump(x + 1, y, x, y) || this._jump(x - 1, y, x, y)) {
                // return [x, y];
            // }
        }
    }

    // moving diagonally, must make sure one of the vertical/horizontal
    // neighbors is open to allow the path
    if (grid.isWalkableAt(x + dx, y) && grid.isWalkableAt(x, y + dy)) {
        return this._jump(x + dx, y + dy, x, y);
    } else {
        return null;
    }
};

/**
 * Find the neighbors for the given node. If the node has a parent,
 * prune the neighbors based on the jump point search algorithm, otherwise
 * return all available neighbors.
 * @return {Array<Array<number>>} The neighbors found.
 */
JPFMoveDiagonallyIfNoObstacles.prototype._findNeighbors = function(node) {
    var parent = node.parent,
        x = node.x, y = node.y,
        grid = this.grid,
        px, py, nx, ny, dx, dy,
        neighbors = [], neighborNodes, neighborNode, i, l;

    // directed pruning: can ignore most neighbors, unless forced.
    if (parent) {
        px = parent.x;
        py = parent.y;
        // get the normalized direction of travel
        dx = (x - px) / Math.max(Math.abs(x - px), 1);
        dy = (y - py) / Math.max(Math.abs(y - py), 1);

        // search diagonally
        if (dx !== 0 && dy !== 0) {
            if (grid.isWalkableAt(x, y + dy)) {
                neighbors.push([x, y + dy]);
            }
            if (grid.isWalkableAt(x + dx, y)) {
                neighbors.push([x + dx, y]);
            }
            if (grid.isWalkableAt(x, y + dy) && grid.isWalkableAt(x + dx, y)) {
                neighbors.push([x + dx, y + dy]);
            }
        }
        // search horizontally/vertically
        else {
            var isNextWalkable;
            if (dx !== 0) {
                isNextWalkable = grid.isWalkableAt(x + dx, y);
                var isTopWalkable = grid.isWalkableAt(x, y + 1);
                var isBottomWalkable = grid.isWalkableAt(x, y - 1);

                if (isNextWalkable) {
                    neighbors.push([x + dx, y]);
                    if (isTopWalkable) {
                        neighbors.push([x + dx, y + 1]);
                    }
                    if (isBottomWalkable) {
                        neighbors.push([x + dx, y - 1]);
                    }
                }
                if (isTopWalkable) {
                    neighbors.push([x, y + 1]);
                }
                if (isBottomWalkable) {
                    neighbors.push([x, y - 1]);
                }
            }
            else if (dy !== 0) {
                isNextWalkable = grid.isWalkableAt(x, y + dy);
                var isRightWalkable = grid.isWalkableAt(x + 1, y);
                var isLeftWalkable = grid.isWalkableAt(x - 1, y);

                if (isNextWalkable) {
                    neighbors.push([x, y + dy]);
                    if (isRightWalkable) {
                        neighbors.push([x + 1, y + dy]);
                    }
                    if (isLeftWalkable) {
                        neighbors.push([x - 1, y + dy]);
                    }
                }
                if (isRightWalkable) {
                    neighbors.push([x + 1, y]);
                }
                if (isLeftWalkable) {
                    neighbors.push([x - 1, y]);
                }
            }
        }
    }
    // return all neighbors
    else {
        neighborNodes = grid.getNeighbors(node, DiagonalMovement.OnlyWhenNoObstacles);
        for (i = 0, l = neighborNodes.length; i < l; ++i) {
            neighborNode = neighborNodes[i];
            neighbors.push([neighborNode.x, neighborNode.y]);
        }
    }

    return neighbors;
};

module.exports = JPFMoveDiagonallyIfNoObstacles;

},{"../core/DiagonalMovement":12,"./JumpPointFinderBase":31}],29:[function(require,module,exports){
/**
 * @author imor / https://github.com/imor
 */
var JumpPointFinderBase = require('./JumpPointFinderBase');
var DiagonalMovement = require('../core/DiagonalMovement');

/**
 * Path finder using the Jump Point Search algorithm allowing only horizontal
 * or vertical movements.
 */
function JPFNeverMoveDiagonally(opt) {
    JumpPointFinderBase.call(this, opt);
}

JPFNeverMoveDiagonally.prototype = new JumpPointFinderBase();
JPFNeverMoveDiagonally.prototype.constructor = JPFNeverMoveDiagonally;

/**
 * Search recursively in the direction (parent -> child), stopping only when a
 * jump point is found.
 * @protected
 * @return {Array<Array<number>>} The x, y coordinate of the jump point
 *     found, or null if not found
 */
JPFNeverMoveDiagonally.prototype._jump = function(x, y, px, py) {
    var grid = this.grid,
        dx = x - px, dy = y - py;

    if (!grid.isWalkableAt(x, y)) {
        return null;
    }

    if(this.trackJumpRecursion === true) {
        grid.getNodeAt(x, y).tested = true;
    }

    if (grid.getNodeAt(x, y) === this.endNode) {
        return [x, y];
    }

    if (dx !== 0) {
        if ((grid.isWalkableAt(x, y - 1) && !grid.isWalkableAt(x - dx, y - 1)) ||
            (grid.isWalkableAt(x, y + 1) && !grid.isWalkableAt(x - dx, y + 1))) {
            return [x, y];
        }
    }
    else if (dy !== 0) {
        if ((grid.isWalkableAt(x - 1, y) && !grid.isWalkableAt(x - 1, y - dy)) ||
            (grid.isWalkableAt(x + 1, y) && !grid.isWalkableAt(x + 1, y - dy))) {
            return [x, y];
        }
        //When moving vertically, must check for horizontal jump points
        if (this._jump(x + 1, y, x, y) || this._jump(x - 1, y, x, y)) {
            return [x, y];
        }
    }
    else {
        throw new Error("Only horizontal and vertical movements are allowed");
    }

    return this._jump(x + dx, y + dy, x, y);
};

/**
 * Find the neighbors for the given node. If the node has a parent,
 * prune the neighbors based on the jump point search algorithm, otherwise
 * return all available neighbors.
 * @return {Array<Array<number>>} The neighbors found.
 */
JPFNeverMoveDiagonally.prototype._findNeighbors = function(node) {
    var parent = node.parent,
        x = node.x, y = node.y,
        grid = this.grid,
        px, py, nx, ny, dx, dy,
        neighbors = [], neighborNodes, neighborNode, i, l;

    // directed pruning: can ignore most neighbors, unless forced.
    if (parent) {
        px = parent.x;
        py = parent.y;
        // get the normalized direction of travel
        dx = (x - px) / Math.max(Math.abs(x - px), 1);
        dy = (y - py) / Math.max(Math.abs(y - py), 1);

        if (dx !== 0) {
            if (grid.isWalkableAt(x, y - 1)) {
                neighbors.push([x, y - 1]);
            }
            if (grid.isWalkableAt(x, y + 1)) {
                neighbors.push([x, y + 1]);
            }
            if (grid.isWalkableAt(x + dx, y)) {
                neighbors.push([x + dx, y]);
            }
        }
        else if (dy !== 0) {
            if (grid.isWalkableAt(x - 1, y)) {
                neighbors.push([x - 1, y]);
            }
            if (grid.isWalkableAt(x + 1, y)) {
                neighbors.push([x + 1, y]);
            }
            if (grid.isWalkableAt(x, y + dy)) {
                neighbors.push([x, y + dy]);
            }
        }
    }
    // return all neighbors
    else {
        neighborNodes = grid.getNeighbors(node, DiagonalMovement.Never);
        for (i = 0, l = neighborNodes.length; i < l; ++i) {
            neighborNode = neighborNodes[i];
            neighbors.push([neighborNode.x, neighborNode.y]);
        }
    }

    return neighbors;
};

module.exports = JPFNeverMoveDiagonally;

},{"../core/DiagonalMovement":12,"./JumpPointFinderBase":31}],30:[function(require,module,exports){
/**
 * @author aniero / https://github.com/aniero
 */
var DiagonalMovement = require('../core/DiagonalMovement');
var JPFNeverMoveDiagonally = require('./JPFNeverMoveDiagonally');
var JPFAlwaysMoveDiagonally = require('./JPFAlwaysMoveDiagonally');
var JPFMoveDiagonallyIfNoObstacles = require('./JPFMoveDiagonallyIfNoObstacles');
var JPFMoveDiagonallyIfAtMostOneObstacle = require('./JPFMoveDiagonallyIfAtMostOneObstacle');

/**
 * Path finder using the Jump Point Search algorithm
 * @param {Object} opt
 * @param {function} opt.heuristic Heuristic function to estimate the distance
 *     (defaults to manhattan).
 * @param {DiagonalMovement} opt.diagonalMovement Condition under which diagonal
 *      movement will be allowed.
 */
function JumpPointFinder(opt) {
    opt = opt || {};
    if (opt.diagonalMovement === DiagonalMovement.Never) {
        return new JPFNeverMoveDiagonally(opt);
    } else if (opt.diagonalMovement === DiagonalMovement.Always) {
        return new JPFAlwaysMoveDiagonally(opt);
    } else if (opt.diagonalMovement === DiagonalMovement.OnlyWhenNoObstacles) {
        return new JPFMoveDiagonallyIfNoObstacles(opt);
    } else {
        return new JPFMoveDiagonallyIfAtMostOneObstacle(opt);
    }
}

module.exports = JumpPointFinder;

},{"../core/DiagonalMovement":12,"./JPFAlwaysMoveDiagonally":26,"./JPFMoveDiagonallyIfAtMostOneObstacle":27,"./JPFMoveDiagonallyIfNoObstacles":28,"./JPFNeverMoveDiagonally":29}],31:[function(require,module,exports){
/**
 * @author imor / https://github.com/imor
 */
var Heap       = require('heap');
var Util       = require('../core/Util');
var Heuristic  = require('../core/Heuristic');
var DiagonalMovement = require('../core/DiagonalMovement');

/**
 * Base class for the Jump Point Search algorithm
 * @param {object} opt
 * @param {function} opt.heuristic Heuristic function to estimate the distance
 *     (defaults to manhattan).
 */
function JumpPointFinderBase(opt) {
    opt = opt || {};
    this.heuristic = opt.heuristic || Heuristic.manhattan;
    this.trackJumpRecursion = opt.trackJumpRecursion || false;
}

/**
 * Find and return the path.
 * @return {Array<Array<number>>} The path, including both start and
 *     end positions.
 */
JumpPointFinderBase.prototype.findPath = function(startX, startY, endX, endY, grid) {
    var openList = this.openList = new Heap(function(nodeA, nodeB) {
            return nodeA.f - nodeB.f;
        }),
        startNode = this.startNode = grid.getNodeAt(startX, startY),
        endNode = this.endNode = grid.getNodeAt(endX, endY), node;

    this.grid = grid;


    // set the `g` and `f` value of the start node to be 0
    startNode.g = 0;
    startNode.f = 0;

    // push the start node into the open list
    openList.push(startNode);
    startNode.opened = true;

    // while the open list is not empty
    while (!openList.empty()) {
        // pop the position of node which has the minimum `f` value.
        node = openList.pop();
        node.closed = true;

        if (node === endNode) {
            return Util.expandPath(Util.backtrace(endNode));
        }

        this._identifySuccessors(node);
    }

    // fail to find the path
    return [];
};

/**
 * Identify successors for the given node. Runs a jump point search in the
 * direction of each available neighbor, adding any points found to the open
 * list.
 * @protected
 */
JumpPointFinderBase.prototype._identifySuccessors = function(node) {
    var grid = this.grid,
        heuristic = this.heuristic,
        openList = this.openList,
        endX = this.endNode.x,
        endY = this.endNode.y,
        neighbors, neighbor,
        jumpPoint, i, l,
        x = node.x, y = node.y,
        jx, jy, dx, dy, d, ng, jumpNode,
        abs = Math.abs, max = Math.max;

    neighbors = this._findNeighbors(node);
    for(i = 0, l = neighbors.length; i < l; ++i) {
        neighbor = neighbors[i];
        jumpPoint = this._jump(neighbor[0], neighbor[1], x, y);
        if (jumpPoint) {

            jx = jumpPoint[0];
            jy = jumpPoint[1];
            jumpNode = grid.getNodeAt(jx, jy);

            if (jumpNode.closed) {
                continue;
            }

            // include distance, as parent may not be immediately adjacent:
            d = Heuristic.octile(abs(jx - x), abs(jy - y));
            ng = node.g + d; // next `g` value

            if (!jumpNode.opened || ng < jumpNode.g) {
                jumpNode.g = ng;
                jumpNode.h = jumpNode.h || heuristic(abs(jx - endX), abs(jy - endY));
                jumpNode.f = jumpNode.g + jumpNode.h;
                jumpNode.parent = node;

                if (!jumpNode.opened) {
                    openList.push(jumpNode);
                    jumpNode.opened = true;
                } else {
                    openList.updateItem(jumpNode);
                }
            }
        }
    }
};

module.exports = JumpPointFinderBase;

},{"../core/DiagonalMovement":12,"../core/Heuristic":14,"../core/Util":16,"heap":8}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var defaultParams = {
  title: '',
  text: '',
  type: null,
  allowOutsideClick: false,
  showConfirmButton: true,
  showCancelButton: false,
  closeOnConfirm: true,
  closeOnCancel: true,
  confirmButtonText: 'OK',
  confirmButtonColor: '#8CD4F5',
  cancelButtonText: 'Cancel',
  imageUrl: null,
  imageSize: null,
  timer: null,
  customClass: '',
  html: false,
  animation: true,
  allowEscapeKey: true,
  inputType: 'text',
  inputPlaceholder: '',
  inputValue: '',
  showLoaderOnConfirm: false
};

exports['default'] = defaultParams;
module.exports = exports['default'];
},{}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _colorLuminance = require('./utils');

var _getModal = require('./handle-swal-dom');

var _hasClass$isDescendant = require('./handle-dom');

/*
 * User clicked on "Confirm"/"OK" or "Cancel"
 */
var handleButton = function handleButton(event, params, modal) {
  var e = event || window.event;
  var target = e.target || e.srcElement;

  var targetedConfirm = target.className.indexOf('confirm') !== -1;
  var targetedOverlay = target.className.indexOf('sweet-overlay') !== -1;
  var modalIsVisible = _hasClass$isDescendant.hasClass(modal, 'visible');
  var doneFunctionExists = params.doneFunction && modal.getAttribute('data-has-done-function') === 'true';

  // Since the user can change the background-color of the confirm button programmatically,
  // we must calculate what the color should be on hover/active
  var normalColor, hoverColor, activeColor;
  if (targetedConfirm && params.confirmButtonColor) {
    normalColor = params.confirmButtonColor;
    hoverColor = _colorLuminance.colorLuminance(normalColor, -0.04);
    activeColor = _colorLuminance.colorLuminance(normalColor, -0.14);
  }

  function shouldSetConfirmButtonColor(color) {
    if (targetedConfirm && params.confirmButtonColor) {
      target.style.backgroundColor = color;
    }
  }

  switch (e.type) {
    case 'mouseover':
      shouldSetConfirmButtonColor(hoverColor);
      break;

    case 'mouseout':
      shouldSetConfirmButtonColor(normalColor);
      break;

    case 'mousedown':
      shouldSetConfirmButtonColor(activeColor);
      break;

    case 'mouseup':
      shouldSetConfirmButtonColor(hoverColor);
      break;

    case 'focus':
      var $confirmButton = modal.querySelector('button.confirm');
      var $cancelButton = modal.querySelector('button.cancel');

      if (targetedConfirm) {
        $cancelButton.style.boxShadow = 'none';
      } else {
        $confirmButton.style.boxShadow = 'none';
      }
      break;

    case 'click':
      var clickedOnModal = modal === target;
      var clickedOnModalChild = _hasClass$isDescendant.isDescendant(modal, target);

      // Ignore click outside if allowOutsideClick is false
      if (!clickedOnModal && !clickedOnModalChild && modalIsVisible && !params.allowOutsideClick) {
        break;
      }

      if (targetedConfirm && doneFunctionExists && modalIsVisible) {
        handleConfirm(modal, params);
      } else if (doneFunctionExists && modalIsVisible || targetedOverlay) {
        handleCancel(modal, params);
      } else if (_hasClass$isDescendant.isDescendant(modal, target) && target.tagName === 'BUTTON') {
        sweetAlert.close();
      }
      break;
  }
};

/*
 *  User clicked on "Confirm"/"OK"
 */
var handleConfirm = function handleConfirm(modal, params) {
  var callbackValue = true;

  if (_hasClass$isDescendant.hasClass(modal, 'show-input')) {
    callbackValue = modal.querySelector('input').value;

    if (!callbackValue) {
      callbackValue = '';
    }
  }

  params.doneFunction(callbackValue);

  if (params.closeOnConfirm) {
    sweetAlert.close();
  }
  // Disable cancel and confirm button if the parameter is true
  if (params.showLoaderOnConfirm) {
    sweetAlert.disableButtons();
  }
};

/*
 *  User clicked on "Cancel"
 */
var handleCancel = function handleCancel(modal, params) {
  // Check if callback function expects a parameter (to track cancel actions)
  var functionAsStr = String(params.doneFunction).replace(/\s/g, '');
  var functionHandlesCancel = functionAsStr.substring(0, 9) === 'function(' && functionAsStr.substring(9, 10) !== ')';

  if (functionHandlesCancel) {
    params.doneFunction(false);
  }

  if (params.closeOnCancel) {
    sweetAlert.close();
  }
};

exports['default'] = {
  handleButton: handleButton,
  handleConfirm: handleConfirm,
  handleCancel: handleCancel
};
module.exports = exports['default'];
},{"./handle-dom":34,"./handle-swal-dom":36,"./utils":39}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var hasClass = function hasClass(elem, className) {
  return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
};

var addClass = function addClass(elem, className) {
  if (!hasClass(elem, className)) {
    elem.className += ' ' + className;
  }
};

var removeClass = function removeClass(elem, className) {
  var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
  if (hasClass(elem, className)) {
    while (newClass.indexOf(' ' + className + ' ') >= 0) {
      newClass = newClass.replace(' ' + className + ' ', ' ');
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  }
};

var escapeHtml = function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

var _show = function _show(elem) {
  elem.style.opacity = '';
  elem.style.display = 'block';
};

var show = function show(elems) {
  if (elems && !elems.length) {
    return _show(elems);
  }
  for (var i = 0; i < elems.length; ++i) {
    _show(elems[i]);
  }
};

var _hide = function _hide(elem) {
  elem.style.opacity = '';
  elem.style.display = 'none';
};

var hide = function hide(elems) {
  if (elems && !elems.length) {
    return _hide(elems);
  }
  for (var i = 0; i < elems.length; ++i) {
    _hide(elems[i]);
  }
};

var isDescendant = function isDescendant(parent, child) {
  var node = child.parentNode;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};

var getTopMargin = function getTopMargin(elem) {
  elem.style.left = '-9999px';
  elem.style.display = 'block';

  var height = elem.clientHeight,
      padding;
  if (typeof getComputedStyle !== 'undefined') {
    // IE 8
    padding = parseInt(getComputedStyle(elem).getPropertyValue('padding-top'), 10);
  } else {
    padding = parseInt(elem.currentStyle.padding);
  }

  elem.style.left = '';
  elem.style.display = 'none';
  return '-' + parseInt((height + padding) / 2) + 'px';
};

var fadeIn = function fadeIn(elem, interval) {
  if (+elem.style.opacity < 1) {
    interval = interval || 16;
    elem.style.opacity = 0;
    elem.style.display = 'block';
    var last = +new Date();
    var tick = (function (_tick) {
      function tick() {
        return _tick.apply(this, arguments);
      }

      tick.toString = function () {
        return _tick.toString();
      };

      return tick;
    })(function () {
      elem.style.opacity = +elem.style.opacity + (new Date() - last) / 100;
      last = +new Date();

      if (+elem.style.opacity < 1) {
        setTimeout(tick, interval);
      }
    });
    tick();
  }
  elem.style.display = 'block'; //fallback IE8
};

var fadeOut = function fadeOut(elem, interval) {
  interval = interval || 16;
  elem.style.opacity = 1;
  var last = +new Date();
  var tick = (function (_tick2) {
    function tick() {
      return _tick2.apply(this, arguments);
    }

    tick.toString = function () {
      return _tick2.toString();
    };

    return tick;
  })(function () {
    elem.style.opacity = +elem.style.opacity - (new Date() - last) / 100;
    last = +new Date();

    if (+elem.style.opacity > 0) {
      setTimeout(tick, interval);
    } else {
      elem.style.display = 'none';
    }
  });
  tick();
};

var fireClick = function fireClick(node) {
  // Taken from http://www.nonobtrusive.com/2011/11/29/programatically-fire-crossbrowser-click-event-with-javascript/
  // Then fixed for today's Chrome browser.
  if (typeof MouseEvent === 'function') {
    // Up-to-date approach
    var mevt = new MouseEvent('click', {
      view: window,
      bubbles: false,
      cancelable: true
    });
    node.dispatchEvent(mevt);
  } else if (document.createEvent) {
    // Fallback
    var evt = document.createEvent('MouseEvents');
    evt.initEvent('click', false, false);
    node.dispatchEvent(evt);
  } else if (document.createEventObject) {
    node.fireEvent('onclick');
  } else if (typeof node.onclick === 'function') {
    node.onclick();
  }
};

var stopEventPropagation = function stopEventPropagation(e) {
  // In particular, make sure the space bar doesn't scroll the main window.
  if (typeof e.stopPropagation === 'function') {
    e.stopPropagation();
    e.preventDefault();
  } else if (window.event && window.event.hasOwnProperty('cancelBubble')) {
    window.event.cancelBubble = true;
  }
};

exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.escapeHtml = escapeHtml;
exports._show = _show;
exports.show = show;
exports._hide = _hide;
exports.hide = hide;
exports.isDescendant = isDescendant;
exports.getTopMargin = getTopMargin;
exports.fadeIn = fadeIn;
exports.fadeOut = fadeOut;
exports.fireClick = fireClick;
exports.stopEventPropagation = stopEventPropagation;
},{}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _stopEventPropagation$fireClick = require('./handle-dom');

var _setFocusStyle = require('./handle-swal-dom');

var handleKeyDown = function handleKeyDown(event, params, modal) {
  var e = event || window.event;
  var keyCode = e.keyCode || e.which;

  var $okButton = modal.querySelector('button.confirm');
  var $cancelButton = modal.querySelector('button.cancel');
  var $modalButtons = modal.querySelectorAll('button[tabindex]');

  if ([9, 13, 32, 27].indexOf(keyCode) === -1) {
    // Don't do work on keys we don't care about.
    return;
  }

  var $targetElement = e.target || e.srcElement;

  var btnIndex = -1; // Find the button - note, this is a nodelist, not an array.
  for (var i = 0; i < $modalButtons.length; i++) {
    if ($targetElement === $modalButtons[i]) {
      btnIndex = i;
      break;
    }
  }

  if (keyCode === 9) {
    // TAB
    if (btnIndex === -1) {
      // No button focused. Jump to the confirm button.
      $targetElement = $okButton;
    } else {
      // Cycle to the next button
      if (btnIndex === $modalButtons.length - 1) {
        $targetElement = $modalButtons[0];
      } else {
        $targetElement = $modalButtons[btnIndex + 1];
      }
    }

    _stopEventPropagation$fireClick.stopEventPropagation(e);
    $targetElement.focus();

    if (params.confirmButtonColor) {
      _setFocusStyle.setFocusStyle($targetElement, params.confirmButtonColor);
    }
  } else {
    if (keyCode === 13) {
      if ($targetElement.tagName === 'INPUT') {
        $targetElement = $okButton;
        $okButton.focus();
      }

      if (btnIndex === -1) {
        // ENTER/SPACE clicked outside of a button.
        $targetElement = $okButton;
      } else {
        // Do nothing - let the browser handle it.
        $targetElement = undefined;
      }
    } else if (keyCode === 27 && params.allowEscapeKey === true) {
      $targetElement = $cancelButton;
      _stopEventPropagation$fireClick.fireClick($targetElement, e);
    } else {
      // Fallback - let the browser handle it.
      $targetElement = undefined;
    }
  }
};

exports['default'] = handleKeyDown;
module.exports = exports['default'];
},{"./handle-dom":34,"./handle-swal-dom":36}],36:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _hexToRgb = require('./utils');

var _removeClass$getTopMargin$fadeIn$show$addClass = require('./handle-dom');

var _defaultParams = require('./default-params');

var _defaultParams2 = _interopRequireWildcard(_defaultParams);

/*
 * Add modal + overlay to DOM
 */

var _injectedHTML = require('./injected-html');

var _injectedHTML2 = _interopRequireWildcard(_injectedHTML);

var modalClass = '.sweet-alert';
var overlayClass = '.sweet-overlay';

var sweetAlertInitialize = function sweetAlertInitialize() {
  var sweetWrap = document.createElement('div');
  sweetWrap.innerHTML = _injectedHTML2['default'];

  // Append elements to body
  while (sweetWrap.firstChild) {
    document.body.appendChild(sweetWrap.firstChild);
  }
};

/*
 * Get DOM element of modal
 */
var getModal = (function (_getModal) {
  function getModal() {
    return _getModal.apply(this, arguments);
  }

  getModal.toString = function () {
    return _getModal.toString();
  };

  return getModal;
})(function () {
  var $modal = document.querySelector(modalClass);

  if (!$modal) {
    sweetAlertInitialize();
    $modal = getModal();
  }

  return $modal;
});

/*
 * Get DOM element of input (in modal)
 */
var getInput = function getInput() {
  var $modal = getModal();
  if ($modal) {
    return $modal.querySelector('input');
  }
};

/*
 * Get DOM element of overlay
 */
var getOverlay = function getOverlay() {
  return document.querySelector(overlayClass);
};

/*
 * Add box-shadow style to button (depending on its chosen bg-color)
 */
var setFocusStyle = function setFocusStyle($button, bgColor) {
  var rgbColor = _hexToRgb.hexToRgb(bgColor);
  $button.style.boxShadow = '0 0 2px rgba(' + rgbColor + ', 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)';
};

/*
 * Animation when opening modal
 */
var openModal = function openModal(callback) {
  var $modal = getModal();
  _removeClass$getTopMargin$fadeIn$show$addClass.fadeIn(getOverlay(), 10);
  _removeClass$getTopMargin$fadeIn$show$addClass.show($modal);
  _removeClass$getTopMargin$fadeIn$show$addClass.addClass($modal, 'showSweetAlert');
  _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($modal, 'hideSweetAlert');

  window.previousActiveElement = document.activeElement;
  var $okButton = $modal.querySelector('button.confirm');
  $okButton.focus();

  setTimeout(function () {
    _removeClass$getTopMargin$fadeIn$show$addClass.addClass($modal, 'visible');
  }, 500);

  var timer = $modal.getAttribute('data-timer');

  if (timer !== 'null' && timer !== '') {
    var timerCallback = callback;
    $modal.timeout = setTimeout(function () {
      var doneFunctionExists = (timerCallback || null) && $modal.getAttribute('data-has-done-function') === 'true';
      if (doneFunctionExists) {
        timerCallback(null);
      } else {
        sweetAlert.close();
      }
    }, timer);
  }
};

/*
 * Reset the styling of the input
 * (for example if errors have been shown)
 */
var resetInput = function resetInput() {
  var $modal = getModal();
  var $input = getInput();

  _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($modal, 'show-input');
  $input.value = _defaultParams2['default'].inputValue;
  $input.setAttribute('type', _defaultParams2['default'].inputType);
  $input.setAttribute('placeholder', _defaultParams2['default'].inputPlaceholder);

  resetInputError();
};

var resetInputError = function resetInputError(event) {
  // If press enter => ignore
  if (event && event.keyCode === 13) {
    return false;
  }

  var $modal = getModal();

  var $errorIcon = $modal.querySelector('.sa-input-error');
  _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($errorIcon, 'show');

  var $errorContainer = $modal.querySelector('.sa-error-container');
  _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($errorContainer, 'show');
};

/*
 * Set "margin-top"-property on modal based on its computed height
 */
var fixVerticalPosition = function fixVerticalPosition() {
  var $modal = getModal();
  $modal.style.marginTop = _removeClass$getTopMargin$fadeIn$show$addClass.getTopMargin(getModal());
};

exports.sweetAlertInitialize = sweetAlertInitialize;
exports.getModal = getModal;
exports.getOverlay = getOverlay;
exports.getInput = getInput;
exports.setFocusStyle = setFocusStyle;
exports.openModal = openModal;
exports.resetInput = resetInput;
exports.resetInputError = resetInputError;
exports.fixVerticalPosition = fixVerticalPosition;
},{"./default-params":32,"./handle-dom":34,"./injected-html":37,"./utils":39}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var injectedHTML =

// Dark overlay
"<div class=\"sweet-overlay\" tabIndex=\"-1\"></div>" +

// Modal
"<div class=\"sweet-alert\">" +

// Error icon
"<div class=\"sa-icon sa-error\">\n      <span class=\"sa-x-mark\">\n        <span class=\"sa-line sa-left\"></span>\n        <span class=\"sa-line sa-right\"></span>\n      </span>\n    </div>" +

// Warning icon
"<div class=\"sa-icon sa-warning\">\n      <span class=\"sa-body\"></span>\n      <span class=\"sa-dot\"></span>\n    </div>" +

// Info icon
"<div class=\"sa-icon sa-info\"></div>" +

// Success icon
"<div class=\"sa-icon sa-success\">\n      <span class=\"sa-line sa-tip\"></span>\n      <span class=\"sa-line sa-long\"></span>\n\n      <div class=\"sa-placeholder\"></div>\n      <div class=\"sa-fix\"></div>\n    </div>" + "<div class=\"sa-icon sa-custom\"></div>" +

// Title, text and input
"<h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type=\"text\" tabIndex=\"3\" />\n      <div class=\"sa-input-error\"></div>\n    </fieldset>" +

// Input errors
"<div class=\"sa-error-container\">\n      <div class=\"icon\">!</div>\n      <p>Not valid!</p>\n    </div>" +

// Cancel and confirm buttons
"<div class=\"sa-button-container\">\n      <button class=\"cancel\" tabIndex=\"2\">Cancel</button>\n      <div class=\"sa-confirm-button-container\">\n        <button class=\"confirm\" tabIndex=\"1\">OK</button>" +

// Loading animation
"<div class=\"la-ball-fall\">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div>" +

// End of modal
"</div>";

exports["default"] = injectedHTML;
module.exports = exports["default"];
},{}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _isIE8 = require('./utils');

var _getModal$getInput$setFocusStyle = require('./handle-swal-dom');

var _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide = require('./handle-dom');

var alertTypes = ['error', 'warning', 'info', 'success', 'input', 'prompt'];

/*
 * Set type, text and actions on modal
 */
var setParameters = function setParameters(params) {
  var modal = _getModal$getInput$setFocusStyle.getModal();

  var $title = modal.querySelector('h2');
  var $text = modal.querySelector('p');
  var $cancelBtn = modal.querySelector('button.cancel');
  var $confirmBtn = modal.querySelector('button.confirm');

  /*
   * Title
   */
  $title.innerHTML = params.html ? params.title : _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.title).split('\n').join('<br>');

  /*
   * Text
   */
  $text.innerHTML = params.html ? params.text : _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.text || '').split('\n').join('<br>');
  if (params.text) _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.show($text);

  /*
   * Custom class
   */
  if (params.customClass) {
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass(modal, params.customClass);
    modal.setAttribute('data-custom-class', params.customClass);
  } else {
    // Find previously set classes and remove them
    var customClass = modal.getAttribute('data-custom-class');
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.removeClass(modal, customClass);
    modal.setAttribute('data-custom-class', '');
  }

  /*
   * Icon
   */
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.hide(modal.querySelectorAll('.sa-icon'));

  if (params.type && !_isIE8.isIE8()) {
    var _ret = (function () {

      var validType = false;

      for (var i = 0; i < alertTypes.length; i++) {
        if (params.type === alertTypes[i]) {
          validType = true;
          break;
        }
      }

      if (!validType) {
        logStr('Unknown alert type: ' + params.type);
        return {
          v: false
        };
      }

      var typesWithIcons = ['success', 'error', 'warning', 'info'];
      var $icon = undefined;

      if (typesWithIcons.indexOf(params.type) !== -1) {
        $icon = modal.querySelector('.sa-icon.' + 'sa-' + params.type);
        _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.show($icon);
      }

      var $input = _getModal$getInput$setFocusStyle.getInput();

      // Animate icon
      switch (params.type) {

        case 'success':
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon, 'animate');
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-tip'), 'animateSuccessTip');
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-long'), 'animateSuccessLong');
          break;

        case 'error':
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon, 'animateErrorIcon');
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-x-mark'), 'animateXMark');
          break;

        case 'warning':
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon, 'pulseWarning');
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-body'), 'pulseWarningIns');
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-dot'), 'pulseWarningIns');
          break;

        case 'input':
        case 'prompt':
          $input.setAttribute('type', params.inputType);
          $input.value = params.inputValue;
          $input.setAttribute('placeholder', params.inputPlaceholder);
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass(modal, 'show-input');
          setTimeout(function () {
            $input.focus();
            $input.addEventListener('keyup', swal.resetInputError);
          }, 400);
          break;
      }
    })();

    if (typeof _ret === 'object') {
      return _ret.v;
    }
  }

  /*
   * Custom image
   */
  if (params.imageUrl) {
    var $customIcon = modal.querySelector('.sa-icon.sa-custom');

    $customIcon.style.backgroundImage = 'url(' + params.imageUrl + ')';
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.show($customIcon);

    var _imgWidth = 80;
    var _imgHeight = 80;

    if (params.imageSize) {
      var dimensions = params.imageSize.toString().split('x');
      var imgWidth = dimensions[0];
      var imgHeight = dimensions[1];

      if (!imgWidth || !imgHeight) {
        logStr('Parameter imageSize expects value with format WIDTHxHEIGHT, got ' + params.imageSize);
      } else {
        _imgWidth = imgWidth;
        _imgHeight = imgHeight;
      }
    }

    $customIcon.setAttribute('style', $customIcon.getAttribute('style') + 'width:' + _imgWidth + 'px; height:' + _imgHeight + 'px');
  }

  /*
   * Show cancel button?
   */
  modal.setAttribute('data-has-cancel-button', params.showCancelButton);
  if (params.showCancelButton) {
    $cancelBtn.style.display = 'inline-block';
  } else {
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.hide($cancelBtn);
  }

  /*
   * Show confirm button?
   */
  modal.setAttribute('data-has-confirm-button', params.showConfirmButton);
  if (params.showConfirmButton) {
    $confirmBtn.style.display = 'inline-block';
  } else {
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.hide($confirmBtn);
  }

  /*
   * Custom text on cancel/confirm buttons
   */
  if (params.cancelButtonText) {
    $cancelBtn.innerHTML = _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.cancelButtonText);
  }
  if (params.confirmButtonText) {
    $confirmBtn.innerHTML = _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.confirmButtonText);
  }

  /*
   * Custom color on confirm button
   */
  if (params.confirmButtonColor) {
    // Set confirm button to selected background color
    $confirmBtn.style.backgroundColor = params.confirmButtonColor;

    // Set the confirm button color to the loading ring
    $confirmBtn.style.borderLeftColor = params.confirmLoadingButtonColor;
    $confirmBtn.style.borderRightColor = params.confirmLoadingButtonColor;

    // Set box-shadow to default focused button
    _getModal$getInput$setFocusStyle.setFocusStyle($confirmBtn, params.confirmButtonColor);
  }

  /*
   * Allow outside click
   */
  modal.setAttribute('data-allow-outside-click', params.allowOutsideClick);

  /*
   * Callback function
   */
  var hasDoneFunction = params.doneFunction ? true : false;
  modal.setAttribute('data-has-done-function', hasDoneFunction);

  /*
   * Animation
   */
  if (!params.animation) {
    modal.setAttribute('data-animation', 'none');
  } else if (typeof params.animation === 'string') {
    modal.setAttribute('data-animation', params.animation); // Custom animation
  } else {
    modal.setAttribute('data-animation', 'pop');
  }

  /*
   * Timer
   */
  modal.setAttribute('data-timer', params.timer);
};

exports['default'] = setParameters;
module.exports = exports['default'];
},{"./handle-dom":34,"./handle-swal-dom":36,"./utils":39}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
/*
 * Allow user to pass their own params
 */
var extend = function extend(a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
};

/*
 * Convert HEX codes to RGB values (#000000 -> rgb(0,0,0))
 */
var hexToRgb = function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) : null;
};

/*
 * Check if the user is using Internet Explorer 8 (for fallbacks)
 */
var isIE8 = function isIE8() {
  return window.attachEvent && !window.addEventListener;
};

/*
 * IE compatible logging for developers
 */
var logStr = function logStr(string) {
  if (window.console) {
    // IE...
    window.console.log('SweetAlert: ' + string);
  }
};

/*
 * Set hover, active and focus-states for buttons 
 * (source: http://www.sitepoint.com/javascript-generate-lighter-darker-color)
 */
var colorLuminance = function colorLuminance(hex, lum) {
  // Validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;

  // Convert to decimal and change luminosity
  var rgb = '#';
  var c;
  var i;

  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }

  return rgb;
};

exports.extend = extend;
exports.hexToRgb = hexToRgb;
exports.isIE8 = isIE8;
exports.logStr = logStr;
exports.colorLuminance = colorLuminance;
},{}],40:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
// SweetAlert
// 2014-2015 (c) - Tristan Edwards
// github.com/t4t5/sweetalert

/*
 * jQuery-like functions for manipulating the DOM
 */

var _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation = require('./modules/handle-dom');

/*
 * Handy utilities
 */

var _extend$hexToRgb$isIE8$logStr$colorLuminance = require('./modules/utils');

/*
 *  Handle sweetAlert's DOM elements
 */

var _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition = require('./modules/handle-swal-dom');

// Handle button events and keyboard events

var _handleButton$handleConfirm$handleCancel = require('./modules/handle-click');

var _handleKeyDown = require('./modules/handle-key');

var _handleKeyDown2 = _interopRequireWildcard(_handleKeyDown);

// Default values

var _defaultParams = require('./modules/default-params');

var _defaultParams2 = _interopRequireWildcard(_defaultParams);

var _setParameters = require('./modules/set-params');

var _setParameters2 = _interopRequireWildcard(_setParameters);

/*
 * Remember state in cases where opening and handling a modal will fiddle with it.
 * (We also use window.previousActiveElement as a global variable)
 */
var previousWindowKeyDown;
var lastFocusedButton;

/*
 * Global sweetAlert function
 * (this is what the user calls)
 */
var sweetAlert, swal;

exports['default'] = sweetAlert = swal = function () {
  var customizations = arguments[0];

  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass(document.body, 'stop-scrolling');
  _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.resetInput();

  /*
   * Use argument if defined or default value from params object otherwise.
   * Supports the case where a default value is boolean true and should be
   * overridden by a corresponding explicit argument which is boolean false.
   */
  function argumentOrDefault(key) {
    var args = customizations;
    return args[key] === undefined ? _defaultParams2['default'][key] : args[key];
  }

  if (customizations === undefined) {
    _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr('SweetAlert expects at least 1 attribute!');
    return false;
  }

  var params = _extend$hexToRgb$isIE8$logStr$colorLuminance.extend({}, _defaultParams2['default']);

  switch (typeof customizations) {

    // Ex: swal("Hello", "Just testing", "info");
    case 'string':
      params.title = customizations;
      params.text = arguments[1] || '';
      params.type = arguments[2] || '';
      break;

    // Ex: swal({ title:"Hello", text: "Just testing", type: "info" });
    case 'object':
      if (customizations.title === undefined) {
        _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr('Missing "title" argument!');
        return false;
      }

      params.title = customizations.title;

      for (var customName in _defaultParams2['default']) {
        params[customName] = argumentOrDefault(customName);
      }

      // Show "Confirm" instead of "OK" if cancel button is visible
      params.confirmButtonText = params.showCancelButton ? 'Confirm' : _defaultParams2['default'].confirmButtonText;
      params.confirmButtonText = argumentOrDefault('confirmButtonText');

      // Callback function when clicking on "OK"/"Cancel"
      params.doneFunction = arguments[1] || null;

      break;

    default:
      _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr('Unexpected type of argument! Expected "string" or "object", got ' + typeof customizations);
      return false;

  }

  _setParameters2['default'](params);
  _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.fixVerticalPosition();
  _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.openModal(arguments[1]);

  // Modal interactions
  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();

  /*
   * Make sure all modal buttons respond to all events
   */
  var $buttons = modal.querySelectorAll('button');
  var buttonEvents = ['onclick', 'onmouseover', 'onmouseout', 'onmousedown', 'onmouseup', 'onfocus'];
  var onButtonEvent = function onButtonEvent(e) {
    return _handleButton$handleConfirm$handleCancel.handleButton(e, params, modal);
  };

  for (var btnIndex = 0; btnIndex < $buttons.length; btnIndex++) {
    for (var evtIndex = 0; evtIndex < buttonEvents.length; evtIndex++) {
      var btnEvt = buttonEvents[evtIndex];
      $buttons[btnIndex][btnEvt] = onButtonEvent;
    }
  }

  // Clicking outside the modal dismisses it (if allowed by user)
  _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getOverlay().onclick = onButtonEvent;

  previousWindowKeyDown = window.onkeydown;

  var onKeyEvent = function onKeyEvent(e) {
    return _handleKeyDown2['default'](e, params, modal);
  };
  window.onkeydown = onKeyEvent;

  window.onfocus = function () {
    // When the user has focused away and focused back from the whole window.
    setTimeout(function () {
      // Put in a timeout to jump out of the event sequence.
      // Calling focus() in the event sequence confuses things.
      if (lastFocusedButton !== undefined) {
        lastFocusedButton.focus();
        lastFocusedButton = undefined;
      }
    }, 0);
  };

  // Show alert with enabled buttons always
  swal.enableButtons();
};

/*
 * Set default params for each popup
 * @param {Object} userParams
 */
sweetAlert.setDefaults = swal.setDefaults = function (userParams) {
  if (!userParams) {
    throw new Error('userParams is required');
  }
  if (typeof userParams !== 'object') {
    throw new Error('userParams has to be a object');
  }

  _extend$hexToRgb$isIE8$logStr$colorLuminance.extend(_defaultParams2['default'], userParams);
};

/*
 * Animation when closing modal
 */
sweetAlert.close = swal.close = function () {
  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();

  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.fadeOut(_sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getOverlay(), 5);
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.fadeOut(modal, 5);
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(modal, 'showSweetAlert');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass(modal, 'hideSweetAlert');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(modal, 'visible');

  /*
   * Reset icon animations
   */
  var $successIcon = modal.querySelector('.sa-icon.sa-success');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($successIcon, 'animate');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($successIcon.querySelector('.sa-tip'), 'animateSuccessTip');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($successIcon.querySelector('.sa-long'), 'animateSuccessLong');

  var $errorIcon = modal.querySelector('.sa-icon.sa-error');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorIcon, 'animateErrorIcon');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorIcon.querySelector('.sa-x-mark'), 'animateXMark');

  var $warningIcon = modal.querySelector('.sa-icon.sa-warning');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($warningIcon, 'pulseWarning');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($warningIcon.querySelector('.sa-body'), 'pulseWarningIns');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($warningIcon.querySelector('.sa-dot'), 'pulseWarningIns');

  // Reset custom class (delay so that UI changes aren't visible)
  setTimeout(function () {
    var customClass = modal.getAttribute('data-custom-class');
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(modal, customClass);
  }, 300);

  // Make page scrollable again
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(document.body, 'stop-scrolling');

  // Reset the page to its previous state
  window.onkeydown = previousWindowKeyDown;
  if (window.previousActiveElement) {
    window.previousActiveElement.focus();
  }
  lastFocusedButton = undefined;
  clearTimeout(modal.timeout);

  return true;
};

/*
 * Validation of the input field is done by user
 * If something is wrong => call showInputError with errorMessage
 */
sweetAlert.showInputError = swal.showInputError = function (errorMessage) {
  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();

  var $errorIcon = modal.querySelector('.sa-input-error');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass($errorIcon, 'show');

  var $errorContainer = modal.querySelector('.sa-error-container');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass($errorContainer, 'show');

  $errorContainer.querySelector('p').innerHTML = errorMessage;

  setTimeout(function () {
    sweetAlert.enableButtons();
  }, 1);

  modal.querySelector('input').focus();
};

/*
 * Reset input error DOM elements
 */
sweetAlert.resetInputError = swal.resetInputError = function (event) {
  // If press enter => ignore
  if (event && event.keyCode === 13) {
    return false;
  }

  var $modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();

  var $errorIcon = $modal.querySelector('.sa-input-error');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorIcon, 'show');

  var $errorContainer = $modal.querySelector('.sa-error-container');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorContainer, 'show');
};

/*
 * Disable confirm and cancel buttons
 */
sweetAlert.disableButtons = swal.disableButtons = function (event) {
  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();
  var $confirmButton = modal.querySelector('button.confirm');
  var $cancelButton = modal.querySelector('button.cancel');
  $confirmButton.disabled = true;
  $cancelButton.disabled = true;
};

/*
 * Enable confirm and cancel buttons
 */
sweetAlert.enableButtons = swal.enableButtons = function (event) {
  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();
  var $confirmButton = modal.querySelector('button.confirm');
  var $cancelButton = modal.querySelector('button.cancel');
  $confirmButton.disabled = false;
  $cancelButton.disabled = false;
};

if (typeof window !== 'undefined') {
  // The 'handle-click' module requires
  // that 'sweetAlert' was set as global.
  window.sweetAlert = window.swal = sweetAlert;
} else {
  _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr('SweetAlert is a frontend module!');
}
module.exports = exports['default'];
},{"./modules/default-params":32,"./modules/handle-click":33,"./modules/handle-dom":34,"./modules/handle-key":35,"./modules/handle-swal-dom":36,"./modules/set-params":38,"./modules/utils":39}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9zcmMvRmxvb3IudHMiLCJqcy9zcmMvRm9yZXN0LnRzIiwianMvc3JjL0dhbWUudHMiLCJqcy9zcmMvTG9naWNhbC50cyIsImpzL3NyYy9XYW5kZXJlci50cyIsImpzL3NyYy9jb25zdGFudHMudHMiLCJqcy9zcmMvbWFpbi50cyIsIm5vZGVfbW9kdWxlcy9oZWFwL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2hlYXAvbGliL2hlYXAuanMiLCJub2RlX21vZHVsZXMvcGF0aGZpbmRpbmcvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcGF0aGZpbmRpbmcvc3JjL1BhdGhGaW5kaW5nLmpzIiwibm9kZV9tb2R1bGVzL3BhdGhmaW5kaW5nL3NyYy9jb3JlL0RpYWdvbmFsTW92ZW1lbnQuanMiLCJub2RlX21vZHVsZXMvcGF0aGZpbmRpbmcvc3JjL2NvcmUvR3JpZC5qcyIsIm5vZGVfbW9kdWxlcy9wYXRoZmluZGluZy9zcmMvY29yZS9IZXVyaXN0aWMuanMiLCJub2RlX21vZHVsZXMvcGF0aGZpbmRpbmcvc3JjL2NvcmUvTm9kZS5qcyIsIm5vZGVfbW9kdWxlcy9wYXRoZmluZGluZy9zcmMvY29yZS9VdGlsLmpzIiwibm9kZV9tb2R1bGVzL3BhdGhmaW5kaW5nL3NyYy9maW5kZXJzL0FTdGFyRmluZGVyLmpzIiwibm9kZV9tb2R1bGVzL3BhdGhmaW5kaW5nL3NyYy9maW5kZXJzL0Jlc3RGaXJzdEZpbmRlci5qcyIsIm5vZGVfbW9kdWxlcy9wYXRoZmluZGluZy9zcmMvZmluZGVycy9CaUFTdGFyRmluZGVyLmpzIiwibm9kZV9tb2R1bGVzL3BhdGhmaW5kaW5nL3NyYy9maW5kZXJzL0JpQmVzdEZpcnN0RmluZGVyLmpzIiwibm9kZV9tb2R1bGVzL3BhdGhmaW5kaW5nL3NyYy9maW5kZXJzL0JpQnJlYWR0aEZpcnN0RmluZGVyLmpzIiwibm9kZV9tb2R1bGVzL3BhdGhmaW5kaW5nL3NyYy9maW5kZXJzL0JpRGlqa3N0cmFGaW5kZXIuanMiLCJub2RlX21vZHVsZXMvcGF0aGZpbmRpbmcvc3JjL2ZpbmRlcnMvQnJlYWR0aEZpcnN0RmluZGVyLmpzIiwibm9kZV9tb2R1bGVzL3BhdGhmaW5kaW5nL3NyYy9maW5kZXJzL0RpamtzdHJhRmluZGVyLmpzIiwibm9kZV9tb2R1bGVzL3BhdGhmaW5kaW5nL3NyYy9maW5kZXJzL0lEQVN0YXJGaW5kZXIuanMiLCJub2RlX21vZHVsZXMvcGF0aGZpbmRpbmcvc3JjL2ZpbmRlcnMvSlBGQWx3YXlzTW92ZURpYWdvbmFsbHkuanMiLCJub2RlX21vZHVsZXMvcGF0aGZpbmRpbmcvc3JjL2ZpbmRlcnMvSlBGTW92ZURpYWdvbmFsbHlJZkF0TW9zdE9uZU9ic3RhY2xlLmpzIiwibm9kZV9tb2R1bGVzL3BhdGhmaW5kaW5nL3NyYy9maW5kZXJzL0pQRk1vdmVEaWFnb25hbGx5SWZOb09ic3RhY2xlcy5qcyIsIm5vZGVfbW9kdWxlcy9wYXRoZmluZGluZy9zcmMvZmluZGVycy9KUEZOZXZlck1vdmVEaWFnb25hbGx5LmpzIiwibm9kZV9tb2R1bGVzL3BhdGhmaW5kaW5nL3NyYy9maW5kZXJzL0p1bXBQb2ludEZpbmRlci5qcyIsIm5vZGVfbW9kdWxlcy9wYXRoZmluZGluZy9zcmMvZmluZGVycy9KdW1wUG9pbnRGaW5kZXJCYXNlLmpzIiwibm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQvbGliL21vZHVsZXMvZGVmYXVsdC1wYXJhbXMuanMiLCJub2RlX21vZHVsZXMvc3dlZXRhbGVydC9saWIvbW9kdWxlcy9oYW5kbGUtY2xpY2suanMiLCJub2RlX21vZHVsZXMvc3dlZXRhbGVydC9saWIvbW9kdWxlcy9oYW5kbGUtZG9tLmpzIiwibm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQvbGliL21vZHVsZXMvaGFuZGxlLWtleS5qcyIsIm5vZGVfbW9kdWxlcy9zd2VldGFsZXJ0L2xpYi9tb2R1bGVzL2hhbmRsZS1zd2FsLWRvbS5qcyIsIm5vZGVfbW9kdWxlcy9zd2VldGFsZXJ0L2xpYi9tb2R1bGVzL2luamVjdGVkLWh0bWwuanMiLCJub2RlX21vZHVsZXMvc3dlZXRhbGVydC9saWIvbW9kdWxlcy9zZXQtcGFyYW1zLmpzIiwibm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQvbGliL21vZHVsZXMvdXRpbHMuanMiLCJub2RlX21vZHVsZXMvc3dlZXRhbGVydC9saWIvc3dlZXRhbGVydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQ0EseUNBQTZEO0FBRTdEOzs7O0dBSUc7QUFDSDtJQWNJLGVBQVksQ0FBUyxFQUFFLENBQVMsRUFBRSxPQUFlO1FBQWYsd0JBQUEsRUFBQSwyQkFBZTtRQVZ6QyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsU0FBSSxHQUFZLEtBQUssQ0FBQztRQUN0QixTQUFJLEdBQVksS0FBSyxDQUFDO1FBQ3RCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3Qix1QkFBa0IsR0FBRyxDQUFDLENBQUM7UUFDdkIsb0JBQWUsR0FBRyxDQUFDLENBQUM7UUFHeEIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVYLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxnQkFBSSxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxnQkFBSSxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxtQkFBTyxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUks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LE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekYsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekYsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN6RixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN6RixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqRCxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzlDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDcEIsQ0FBQztRQUVELHVCQUF1QjtRQUN2QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hGLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMxRSxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDWixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RFLENBQUM7UUFDTCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzFFLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEUsQ0FBQztRQUNMLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFD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QUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLENBQUM7SUFDeEQsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2YsQ0FBQyxDQUFDLENBQUM7QUFFSCxtQkFBbUI7QUFDbkIsUUFBUSxDQUFDLFNBQVMsR0FBRyxVQUFDLENBQUM7SUFDbkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDaEI7WUFDSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbkIsQ0FBQztBQUNMLENBQUMsQ0FBQzs7O0FDbEJGO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalhBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdFBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCAqIGFzICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IHtlbXB0eSwgZ29hbCwgbW9uc3RlciwgdHJhcCwgdHJlZX0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbi8qKlxuICogWW91J2xsIHRlbGwgbWU6IFwiQSBmbG9vciBpcyBhIGZsb29yXCIsIGFuZCB5b3UnbGwgYmUgcmlnaHQuXG4gKiBUaGlzIGlzIG5vdCB0aGUgZmxvb3IgaXRzZWxmIHRoYXQgbWF0dGVycywgdGhpcyBpcyB3aGF0IGl0IGNvbnRhaW5zLlxuICogSXMgaXQgYW4gaG9ycmlibGUgbW9uc3RlciBvbiB0aGlzIGZsb29yPyBPciBhIGxldGhhbCB0cmFwPyBPciBhIGNsdWUgZm9yIHRoZSBuZXh0IGZsb29yPyBZb3UnbGwgc2VlLCB3YW5kZXJlci4uLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbG9vciB7XG4gICAgcHJpdmF0ZSB4OiBudW1iZXI7XG4gICAgcHJpdmF0ZSB5OiBudW1iZXI7XG5cbiAgICBwcml2YXRlIHZpc2l0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIGFjY2Vzc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHRyYXA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIGdvYWw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIG1vbnN0ZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHRyYXBDbHVlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBtb25zdGVyQ2x1ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgcHJvYmFiaWxpdHlNb25zdGVyID0gMDtcbiAgICBwcml2YXRlIHByb2JhYmlsaXR5VHJhcCA9IDA7XG5cbiAgICBjb25zdHJ1Y3Rvcih5OiBudW1iZXIsIHg6IG51bWJlciwgZWxlbWVudCA9IGVtcHR5KSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IHRyYXApIHtcbiAgICAgICAgICAgIHRoaXMudHJhcCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCA9PT0gZ29hbCkge1xuICAgICAgICAgICAgdGhpcy5nb2FsID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50ID09PSBtb25zdGVyKSB7XG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXIgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVGhlIGZsb29yIGlzIGVtcHR5IG90aGVyd2lzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldFgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLng7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnk7XG4gICAgfVxuXG4gICAgcHVibGljIGlzVHJhcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhcDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNHb2FsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nb2FsO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc01vbnN0ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXI7XG4gICAgfVxuXG4gICAgcHVibGljIGlzTW9uc3RlckNsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXJDbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc1RyYXBDbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFwQ2x1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNFbXB0eSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRyYXAgJiZcbiAgICAgICAgICAgICF0aGlzLmdvYWwgJiZcbiAgICAgICAgICAgICF0aGlzLm1vbnN0ZXIgJiZcbiAgICAgICAgICAgICF0aGlzLnRyYXBDbHVlICYmXG4gICAgICAgICAgICAhdGhpcy5tb25zdGVyQ2x1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRDbHVlKGNsdWVUeXBlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKGNsdWVUeXBlID09PSB0cmFwKSB7XG4gICAgICAgICAgICB0aGlzLnRyYXBDbHVlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChjbHVlVHlwZSA9PT0gbW9uc3Rlcikge1xuICAgICAgICAgICAgdGhpcy5tb25zdGVyQ2x1ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNWaXNpdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdGVkO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0VmlzaXRlZChiID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnZpc2l0ZWQgPSBiO1xuICAgIH1cbiAgICBwdWJsaWMgaXNBY2Nlc3NpYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY2Nlc3NpYmxlO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0QWNjZXNzaWJsZShiID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmFjY2Vzc2libGUgPSBiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoYXQgaXMgdGhlIHByb2JhYmlsaXR5IHRoaXMgZmxvb3IgaXMgYSBtb25zdGVyP1xuICAgICAqL1xuICAgIHB1YmxpYyBnZXRQcm9iYWJpbGl0eU1vbnN0ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2JhYmlsaXR5TW9uc3RlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHByb2JhYmlsaXR5IHRoaXMgZmxvb3IgaXMgYSBtb25zdGVyLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRQcm9iYWJpbGl0eU1vbnN0ZXIocHJvYmFiaWxpdHkgPSAwKSB7XG4gICAgICAgIHRoaXMucHJvYmFiaWxpdHlNb25zdGVyID0gcHJvYmFiaWxpdHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHByb2JhYmlsaXR5IHRoaXMgZmxvb3IgaXMgYSBtb25zdGVyIGV2b2x2ZWQuXG4gICAgICovXG4gICAgcHVibGljIGFkZFByb2JhYmlsaXR5TW9uc3Rlcihwcm9iYWJpbGl0eSA9IDApIHtcbiAgICAgICAgdGhpcy5wcm9iYWJpbGl0eU1vbnN0ZXIgKz0gcHJvYmFiaWxpdHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hhdCBpcyB0aGUgcHJvYmFiaWxpdHkgdGhpcyBmbG9vciBpcyBhIHRyYXA/XG4gICAgICovXG4gICAgcHVibGljIGdldFByb2JhYmlsaXR5VHJhcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvYmFiaWxpdHlUcmFwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgcHJvYmFiaWxpdHkgdGhpcyBmbG9vciBpcyBhIHRyYXAuXG4gICAgICovXG4gICAgcHVibGljIHNldFByb2JhYmlsaXR5VHJhcChwcm9iYWJpbGl0eSA9IDApIHtcbiAgICAgICAgdGhpcy5wcm9iYWJpbGl0eVRyYXAgPSBwcm9iYWJpbGl0eTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcHJvYmFiaWxpdHkgdGhpcyBmbG9vciBpcyBhIHRyYXAgZXZvbHZlZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkUHJvYmFiaWxpdHlUcmFwKHByb2JhYmlsaXR5ID0gMCkge1xuICAgICAgICB0aGlzLnByb2JhYmlsaXR5VHJhcCArPSBwcm9iYWJpbGl0eTtcbiAgICB9XG5cbiAgICBwdWJsaWMga2lsbE1vbnN0ZXIoKSB7XG4gICAgICAgIHRoaXMubW9uc3RlciA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b0h0bWwoaXNLbm93bjogYm9vbGVhbiA9IHRydWUsIGFkZGl0aW9ubmFsQ2xhc3Nlczogc3RyaW5nW10pIHtcbiAgICAgICAgbGV0IGNsYXNzZXM6IHN0cmluZ1tdID0gW1wiZmxvb3JDYXNlXCJdLmNvbmNhdChhZGRpdGlvbm5hbENsYXNzZXMpO1xuXG4gICAgICAgIGlmIChpc0tub3duKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJ2aXNpdGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKFwid2FyRm9nXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNUcmFwKCkpIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChcInRyYXBcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNHb2FsKCkpIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChcImdvYWxcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNNb25zdGVyKCkpIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChcIm1vbnN0ZXJcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNUcmFwQ2x1ZSgpKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJ0cmFwQ2x1ZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc01vbnN0ZXJDbHVlKCkpIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChcIm1vbnN0ZXJDbHVlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiJHtjbGFzc2VzLmpvaW4oXCIgXCIpfVwiPjwvZGl2PmA7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtlbXB0eSwgZ29hbCwgbW9uc3RlciwgdHJhcCwgdHJlZX0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgRmxvb3IgZnJvbSBcIi4vRmxvb3JcIjtcblxuLyoqXG4gKiBBIGdsb29teSBkYXJrIGZvcmVzdC4gVGhlcmUgYXJlIGxvdHMgb2YgbW9uc3RlcnMgYW5kIHRyYXBzIGhlcmUuIEJlIGNhcmVmdWwsIHdhbmRlcmVyLi4uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcmVzdCB7XG4gICAgcHJpdmF0ZSBmb3Jlc3Q6IEZsb29yW11bXSA9IFtdO1xuICAgIHByaXZhdGUgd2lkdGg6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBoZWlnaHQ6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3Rvcih3ID0gMywgaCA9IDMpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IHc7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaDtcbiAgICB9XG5cbiAgICBwdWJsaWMgcG9wdWxhdGUobWF4Q2hhbmNlcyA9IDIwKSB7XG4gICAgICAgIC8vIFNldCB0aGUgbW9uc3RlcnMgYW5kIHRyYXBzXG4gICAgICAgIGxldCB0bXA6IEZsb29yW11bXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIHRtcFt5XSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLndpZHRoOyB4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0bXBSYW5kID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heENoYW5jZXMgLSAwKSArIDApO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRtcFJhbmQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSXQncyBhIG1vbnN0ZXIhXG4gICAgICAgICAgICAgICAgICAgIHRtcFt5XVt4XSA9IG5ldyBGbG9vcih5LCB4LCBtb25zdGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRtcFJhbmQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSXQncyBhIHRyYXAhXG4gICAgICAgICAgICAgICAgICAgIHRtcFt5XVt4XSA9IG5ldyBGbG9vcih5LCB4LCB0cmFwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0bXBbeV1beF0gPSBuZXcgRmxvb3IoeSwgeCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb3Jlc3QgPSB0bXA7XG5cbiAgICAgICAgLy8gU2V0IHRoZSB3YXkgb3V0XG4gICAgICAgIGxldCBpc0FXYXlPdXQgPSBmYWxzZTtcbiAgICAgICAgbGV0IG91dFk7XG4gICAgICAgIGxldCBvdXRYO1xuICAgICAgICB3aGlsZSAoIWlzQVdheU91dCkge1xuICAgICAgICAgICAgb3V0WSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0aGlzLmZvcmVzdC5sZW5ndGggLSAwKSArIDApO1xuICAgICAgICAgICAgb3V0WCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0aGlzLmZvcmVzdFswXS5sZW5ndGggLSAwKSArIDApO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5mb3Jlc3Rbb3V0WV1bb3V0WF0uaXNFbXB0eSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9yZXN0W291dFldW291dFhdID0gbmV3IEZsb29yKG91dFksIG91dFgsIGdvYWwpO1xuICAgICAgICAgICAgICAgIGlzQVdheU91dCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy53aWR0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGwgPSB0aGlzLmZvcmVzdFt5XVt4XTtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbC5pc01vbnN0ZXIoKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJdCdzIGEgbW9uc3RlciFcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDbHVlcyh5LCB4LCBtb25zdGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNlbGwuaXNUcmFwKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSXQncyBhIHRyYXAhXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q2x1ZXMoeSwgeCwgdHJhcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEZsb29yQ29udGVudCh5OiBudW1iZXIsIHg6IG51bWJlcik6IEZsb29yIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZXN0W3ldW3hdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRGb3Jlc3QoKTogRmxvb3JbXVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZXN0O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRXYXlPdXRQb3NpdGlvbigpIHtcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcmVzdFt5XVt4XS5pc0dvYWwoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge3gsIHl9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXROdW1iZXJPZkNhc2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3Jlc3QubGVuZ3RoICogdGhpcy5mb3Jlc3RbMF0ubGVuZ3RoO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3Jlc3QubGVuZ3RoO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZXN0WzBdLmxlbmd0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldENsdWVzKHk6IG51bWJlciwgeDogbnVtYmVyLCBjb250ZW50OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHkgLSAxID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0W3kgLSAxXVt4XS5zZXRDbHVlKGNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh5ICsgMSA8IHRoaXMuaGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdFt5ICsgMV1beF0uc2V0Q2x1ZShjb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RbeV1beCAtIDFdLnNldENsdWUoY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHggKyAxIDwgdGhpcy53aWR0aCkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RbeV1beCArIDFdLnNldENsdWUoY29udGVudCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCAqIGFzIHN3YWwgZnJvbSBcInN3ZWV0YWxlcnRcIjtcbmltcG9ydCBGbG9vciBmcm9tIFwiLi9GbG9vclwiO1xuaW1wb3J0IEZvcmVzdCBmcm9tIFwiLi9Gb3Jlc3RcIjtcbmltcG9ydCBXYW5kZXJlciBmcm9tIFwiLi9XYW5kZXJlclwiO1xuXG4vKipcbiAqIEl0J3MgYSBnYW1lIGZvciBldmVyeW9uZSwgZXhjZXB0IGZvciB0aGUgd2FuZGVyZXIuIFBvb3Igd2FuZGVyZXIuLi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG4gICAgcHJpdmF0ZSBjdXJyZW50Rm9yZXN0OiBGb3Jlc3Q7XG4gICAgcHJpdmF0ZSB3YW5kZXJlcjogV2FuZGVyZXI7XG4gICAgcHJpdmF0ZSBnYW1lRGl2OiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIHNjb3JlRGl2OiBIVE1MRWxlbWVudDtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihnYW1lRGl2OiBzdHJpbmcsIHNjb3JlRGl2OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5nYW1lRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZ2FtZURpdik7XG4gICAgICAgIHRoaXMuc2NvcmVEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzY29yZURpdik7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXQodyA9IDMsIGggPSAzKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlRm9yZXN0KHcsIGgpO1xuICAgICAgICB0aGlzLmdldEZvcmVzdCgpLnBvcHVsYXRlKCk7XG4gICAgICAgIHRoaXMuc2V0V2FuZGVyZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKGxldHNQbGF5OiBib29sZWFuID0gdHJ1ZSkge1xuXG4gICAgICAgIGlmIChsZXRzUGxheSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMud2FuZGVyZXIuaGFzTm9Nb3ZlcygpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53YW5kZXJlci50aGluaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy53YW5kZXJlci5hY3QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLndhbmRlcmVyLmlzRGVhZCgpKSB7XG4gICAgICAgICAgICBzd2FsKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIllvdSBqdXN0IGRpZWQuIFRvbyBiYWQuXCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi4pigXCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJlcnJvclwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLndhbmRlcmVyLnNldFNjb3JlKC0oMTAgKiB0aGlzLmdldEZvcmVzdCgpLmdldE51bWJlck9mQ2FzZXMoKSkpO1xuICAgICAgICAgICAgdGhpcy5zZXRXYW5kZXJlcih0aGlzLndhbmRlcmVyLmdldE1hcCgpLCB0aGlzLndhbmRlcmVyLmdldE9yaWdZKCksIHRoaXMud2FuZGVyZXIuZ2V0T3JpZ1goKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMud2FuZGVyZXIuaXNPdXQoKSkge1xuICAgICAgICAgICAgLy8gWW91IGp1c3Qgd29uIHRoaXMgZm9yZXN0ICFcbiAgICAgICAgICAgIHRoaXMud2FuZGVyZXIuc2V0U2NvcmUoMTAgKiB0aGlzLmdldEZvcmVzdCgpLmdldE51bWJlck9mQ2FzZXMoKSk7XG4gICAgICAgICAgICAvLyBDcmVhdGUgdGhlIG5leHQgbGV2ZWxcbiAgICAgICAgICAgIGNvbnN0IG5ld1NpemUgPSB0aGlzLmdldEZvcmVzdCgpLmdldEZvcmVzdCgpLmxlbmd0aCArIDE7XG4gICAgICAgICAgICBzd2FsKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIllvdSBqdXN0IHdvbiB0aGlzIGZvcmVzdCAhXCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi4q2Q77iPXCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuaW5pdChuZXdTaXplLCBuZXdTaXplKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud2FuZGVyZXIud2F0Y2hUaGVGbG9vcigpO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRXYW5kZXJlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2FuZGVyZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVGb3Jlc3QodyA9IDMsIGggPSAzKTogR2FtZSB7XG4gICAgICAgIHRoaXMuY3VycmVudEZvcmVzdCA9IG5ldyBGb3Jlc3QodywgaCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Rm9yZXN0KCk6IEZvcmVzdCB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRGb3Jlc3Q7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRXYW5kZXJlcihtOiBGbG9vcltdW10gPSB1bmRlZmluZWQsIHk6IG51bWJlciA9IHVuZGVmaW5lZCwgeDogbnVtYmVyID0gdW5kZWZpbmVkKTogR2FtZSB7XG4gICAgICAgIGNvbnN0IGZvcmVzdCA9IHRoaXMuY3VycmVudEZvcmVzdC5nZXRGb3Jlc3QoKTtcblxuICAgICAgICBsZXQgaXNPayA9IGZhbHNlO1xuICAgICAgICBpZiAoeSA9PT0gdW5kZWZpbmVkICYmIHggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgd2hpbGUgKCFpc09rKSB7XG4gICAgICAgICAgICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChmb3Jlc3QubGVuZ3RoIC0gMCkgKyAwKTtcbiAgICAgICAgICAgICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGZvcmVzdFswXS5sZW5ndGggLSAwKSArIDApO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZvcmVzdFt5XVt4XS5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNPayA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBvbGRTY29yZSA9IDA7XG4gICAgICAgIGlmICh0aGlzLndhbmRlcmVyKSB7XG4gICAgICAgICAgICBvbGRTY29yZSA9IHRoaXMud2FuZGVyZXIuZ2V0U2NvcmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud2FuZGVyZXIgPSBuZXcgV2FuZGVyZXIoeSwgeCwgdGhpcy5jdXJyZW50Rm9yZXN0LCBvbGRTY29yZSk7XG5cbiAgICAgICAgaWYgKG0pIHtcbiAgICAgICAgICAgIHRoaXMud2FuZGVyZXIuc2V0TWFwKG0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGZvcmVzdCA9IHRoaXMuZ2V0Rm9yZXN0KCkuZ2V0Rm9yZXN0KCk7XG4gICAgICAgIGNvbnN0IHdhbmRlcmVyID0gdGhpcy53YW5kZXJlcjtcblxuICAgICAgICBsZXQgaHRtbDogc3RyaW5nID0gXCJcIjtcblxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuY3VycmVudEZvcmVzdC5nZXRGb3Jlc3QoKS5sZW5ndGg7IHkrKykge1xuICAgICAgICAgICAgaHRtbCArPSBcIjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XCI7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuY3VycmVudEZvcmVzdC5nZXRGb3Jlc3QoKVswXS5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgICAgIGxldCB3YW5kZXJlclBvcyA9IHdhbmRlcmVyLmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgbGV0IGZsb29yID0gdGhpcy5jdXJyZW50Rm9yZXN0LmdldEZvcmVzdCgpW3ldW3hdO1xuICAgICAgICAgICAgICAgIGxldCBhZGRpdGlvbm5hbENsYXNzZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGlmICh3YW5kZXJlclBvcy54ID09PSB4ICYmIHdhbmRlcmVyUG9zLnkgPT09IHkpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25uYWxDbGFzc2VzLnB1c2goXCJ3YW5kZXJlclwiKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBodG1sICs9IGZsb29yLnRvSHRtbCh0aGlzLndhbmRlcmVyLmlzS25vd24oeSwgeCksIGFkZGl0aW9ubmFsQ2xhc3Nlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBodG1sICs9IFwiPC9kaXY+XCI7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdhbWVEaXYuY2xhc3NOYW1lID0gXCJcIjtcbiAgICAgICAgdGhpcy5nYW1lRGl2LmNsYXNzTGlzdC5hZGQoYHdpZHRoJHtmb3Jlc3QubGVuZ3RofWApO1xuICAgICAgICB0aGlzLmdhbWVEaXYuaW5uZXJIVE1MID0gaHRtbDtcblxuICAgICAgICB0aGlzLnNjb3JlRGl2LmlubmVySFRNTCA9IHdhbmRlcmVyLmdldFNjb3JlKCkudG9TdHJpbmcoKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCBGbG9vciBmcm9tIFwiLi9GbG9vclwiO1xuXG4vKipcbiAqIEFsbCB0aGUgbG9naWNhbCBydWxlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naWNhbCB7XG5cbiAgICBwcml2YXRlIGJvcmRlcnM6IEZsb29yW107XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYm9yZGVycyBFdmVyeSBhY2Nlc3NpYmxlIHVudmlzaXRlZCBmbG9vcnMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoYm9yZGVyczogRmxvb3JbXSkge1xuICAgICAgICB0aGlzLmJvcmRlcnMgPSBib3JkZXJzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgcHJvYmFibHlNb25zdGVyKHg6IEZsb29yKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB4LmdldFByb2JhYmlsaXR5TW9uc3RlcigpICE9PSAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBwcm9iYWJseVRyYXAoeDogRmxvb3IpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHguZ2V0UHJvYmFiaWxpdHlUcmFwKCkgIT09IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9yIGVhY2ggeCAobm90IHByb2JhYmx5TW9uc3Rlcih4KSBhbmQgbm90IHByb2JhYmx5VHJhcCh4KSA9PiBwcm9iYWJseUVtcHR5KHgpKVxuICAgICAqL1xuICAgIHB1YmxpYyBwcm9iYWJseUVtcHR5KHg6IEZsb29yKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5wcm9iYWJseU1vbnN0ZXIoeCkgJiYgIXRoaXMucHJvYmFibHlUcmFwKHgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvciBlYWNoIHhcbiAgICAgKiAgICAgICgocHJvYmFibHlFbXB0eSh4KVxuICAgICAqICAgICAgICAgIG9yIChwcm9iYWJseU1vbnN0ZXIoeClcbiAgICAgKiAgICAgICAgICAgICAgICAgIGFuZCBub3QgcHJvYmFibHlUcmFwKHgpXG4gICAgICogICAgICAgICAgICAgICAgICBhbmQgKG5vdCBleGlzdHMgeSAocHJvYmFibHlFbXB0eSh5KSkpKVxuICAgICAqICAgICAgICAgIG9yIChwcm9iYWJseVRyYXAoeClcbiAgICAgKiAgICAgICAgICAgICAgICAgIGFuZCBub3QgZXhpc3RzIHkgKHByb2JhYmx5RW1wdHkoeSkgb3IgKHByb2JhYmx5TW9uc3Rlcih5KSBhbmQgbm90IHByb2JhYmx5VHJhcCh5KSkpKSlcbiAgICAgKiAgICAgICAgPT4gY2FuR29Ubyh4KSlcbiAgICAgKi9cbiAgICBwdWJsaWMgY2FuR29Ubyh4OiBGbG9vcik6IGJvb2xlYW4ge1xuXG4gICAgICAgIC8vIEV4aXN0cyB5IChwcm9iYWJseUVtcHR5KHkpKVxuICAgICAgICBmdW5jdGlvbiBleGlzdHNFbXB0eSh0aGlzQ2xhc3M6IExvZ2ljYWwpOiBib29sZWFuIHtcbiAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgIGxldCBleGlzdHMgPSBmYWxzZTtcbiAgICAgICAgICAgIHdoaWxlIChpIDwgdGhpc0NsYXNzLmJvcmRlcnMubGVuZ3RoICYmICFleGlzdHMpIHtcbiAgICAgICAgICAgICAgICBleGlzdHMgPSB0aGlzQ2xhc3MucHJvYmFibHlFbXB0eSh0aGlzQ2xhc3MuYm9yZGVyc1tpXSk7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGV4aXN0cztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEV4aXN0cyB5IChwcm9iYWJseUVtcHR5KHkpIG9yIChwcm9iYWJseU1vbnN0ZXIoeSkgYW5kIG5vdCBwcm9iYWJseVRyYXAoeSkpKVxuICAgICAgICBmdW5jdGlvbiBleGlzdHNFbXB0eU9yTW9uc3Rlck5vdFRyYXAodGhpc0NsYXNzOiBMb2dpY2FsKTogYm9vbGVhbiB7XG4gICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICBsZXQgZXhpc3RzID0gZmFsc2U7XG4gICAgICAgICAgICB3aGlsZSAoaSA8IHRoaXNDbGFzcy5ib3JkZXJzLmxlbmd0aCAmJiAhZXhpc3RzKSB7XG4gICAgICAgICAgICAgICAgZXhpc3RzID0gdGhpc0NsYXNzLnByb2JhYmx5RW1wdHkodGhpc0NsYXNzLmJvcmRlcnNbaV0pXG4gICAgICAgICAgICAgICAgfHwgKHRoaXNDbGFzcy5wcm9iYWJseU1vbnN0ZXIodGhpc0NsYXNzLmJvcmRlcnNbaV0pXG4gICAgICAgICAgICAgICAgJiYgIXRoaXNDbGFzcy5wcm9iYWJseVRyYXAodGhpc0NsYXNzLmJvcmRlcnNbaV0pKTtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZXhpc3RzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvYmFibHlFbXB0eSh4KVxuICAgICAgICB8fCB0aGlzLnByb2JhYmx5TW9uc3Rlcih4KSAmJiAhdGhpcy5wcm9iYWJseVRyYXAoeCkgJiYgIWV4aXN0c0VtcHR5KHRoaXMpXG4gICAgICAgIHx8IHRoaXMucHJvYmFibHlUcmFwKHgpICYmICFleGlzdHNFbXB0eU9yTW9uc3Rlck5vdFRyYXAodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9yIGVhY2ggeFxuICAgICAqICAgICAgKChjYW5Hb1RvKHgpIGFuZCBwcm9iYWJseU1vbnN0ZXIoeCkpXG4gICAgICogICAgICAgICAgPT4gbm90IGV4aXN0cyB5IChwcm9iYWJseU1vbnN0ZXIoeSkgYW5kIGdyZWF0ZXJQcm9iYWJpbGl0eU1vbnN0ZXIoeSwgeCkpKVxuICAgICAqL1xuICAgIHB1YmxpYyBydWxlTW9uc3Rlcih4OiBGbG9vcik6IGJvb2xlYW4ge1xuXG4gICAgICAgIC8vIEV4aXN0cyB5IChwcm9iYWJseU1vbnN0ZXIoeSkgYW5kIGdyZWF0ZXJQcm9iYWJpbGl0eU1vbnN0ZXIoeSwgeCkpXG4gICAgICAgIGZ1bmN0aW9uIGV4aXN0c01vbnN0ZXJNb3JlUHJvYmFibGUodGhpc0NsYXNzOiBMb2dpY2FsLCBmbG9vcjogRmxvb3IpOiBib29sZWFuIHtcbiAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgIGxldCBleGlzdHMgPSBmYWxzZTtcbiAgICAgICAgICAgIHdoaWxlIChpIDwgdGhpc0NsYXNzLmJvcmRlcnMubGVuZ3RoICYmICFleGlzdHMpIHtcbiAgICAgICAgICAgICAgICBleGlzdHMgPSB0aGlzQ2xhc3MucHJvYmFibHlNb25zdGVyKHRoaXNDbGFzcy5ib3JkZXJzW2ldKVxuICAgICAgICAgICAgICAgICYmIHRoaXNDbGFzcy5ncmVhdGVyUHJvYmFiaWxpdHlNb25zdGVyKHRoaXNDbGFzcy5ib3JkZXJzW2ldLCBmbG9vcik7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGV4aXN0cztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNhbkdvVG8oeCkgJiYgdGhpcy5wcm9iYWJseU1vbnN0ZXIoeCkpIHtcbiAgICAgICAgICAgIHJldHVybiAhZXhpc3RzTW9uc3Rlck1vcmVQcm9iYWJsZSh0aGlzLCB4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9yIGVhY2ggeCAoY2FuR29Ubyh4KSBhbmQgcHJvYmFibHlNb25zdGVyKHgpID0+IHNob290QmVmb3JlKHgpKVxuICAgICAqL1xuICAgIHB1YmxpYyBzaG9vdEJlZm9yZSh4OiBGbG9vcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jYW5Hb1RvKHgpICYmIHRoaXMucHJvYmFibHlNb25zdGVyKHgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvciBlYWNoIHhcbiAgICAgKiAgICAgICgoY2FuR29Ubyh4KSBhbmQgcHJvYmFibHlUcmFwKHgpKVxuICAgICAqICAgICAgICAgID0+IG5vdCBleGlzdHMgeSAocHJvYmFibHlUcmFwKHkpIGFuZCBzbWFsbGVyUHJvYmFiaWxpdHlUcmFwKHksIHgpKSlcbiAgICAgKi9cbiAgICBwdWJsaWMgcnVsZVRyYXAoeDogRmxvb3IpOiBib29sZWFuIHtcblxuICAgICAgICAvLyBFeGlzdHMgeSAocHJvYmFibHlUcmFwKHkpIGFuZCBzbWFsbGVyUHJvYmFiaWxpdHlUcmFwKHksIHgpKVxuICAgICAgICBmdW5jdGlvbiBleGlzdHNUcmFwTGVzc1Byb2JhYmxlKHRoaXNDbGFzczogTG9naWNhbCwgZmxvb3I6IEZsb29yKTogYm9vbGVhbiB7XG4gICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICBsZXQgZXhpc3RzID0gZmFsc2U7XG4gICAgICAgICAgICB3aGlsZSAoaSA8IHRoaXNDbGFzcy5ib3JkZXJzLmxlbmd0aCAmJiAhZXhpc3RzKSB7XG4gICAgICAgICAgICAgICAgZXhpc3RzID0gdGhpc0NsYXNzLnByb2JhYmx5VHJhcCh0aGlzQ2xhc3MuYm9yZGVyc1tpXSlcbiAgICAgICAgICAgICAgICAmJiB0aGlzQ2xhc3Muc21hbGxlclByb2JhYmlsaXR5VHJhcCh0aGlzQ2xhc3MuYm9yZGVyc1tpXSwgZmxvb3IpO1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBleGlzdHM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jYW5Hb1RvKHgpICYmIHRoaXMucHJvYmFibHlUcmFwKHgpKSB7XG4gICAgICAgICAgICByZXR1cm4gIWV4aXN0c1RyYXBMZXNzUHJvYmFibGUodGhpcywgeCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBncmVhdGVyUHJvYmFiaWxpdHlNb25zdGVyKHk6IEZsb29yLCB4OiBGbG9vcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4geS5nZXRQcm9iYWJpbGl0eU1vbnN0ZXIoKSA+IHguZ2V0UHJvYmFiaWxpdHlNb25zdGVyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNtYWxsZXJQcm9iYWJpbGl0eVRyYXAoeTogRmxvb3IsIHg6IEZsb29yKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB5LmdldFByb2JhYmlsaXR5VHJhcCgpIDwgeC5nZXRQcm9iYWJpbGl0eVRyYXAoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBQYXRoRmluZGluZyBmcm9tIFwicGF0aGZpbmRpbmdcIjtcbmltcG9ydCBGbG9vciBmcm9tIFwiLi9GbG9vclwiO1xuaW1wb3J0IEZvcmVzdCBmcm9tIFwiLi9Gb3Jlc3RcIjtcbmltcG9ydCBMb2dpY2FsIGZyb20gXCIuL0xvZ2ljYWxcIjtcblxuLyoqXG4gKiBUaGUgd2FuZGVyZXIsIHRoZSBoZXJvIG9mIHRoaXMgcXVlc3QuIEdvb2QgbHVjayBzb24uLi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2FuZGVyZXIge1xuICAgIHByaXZhdGUgZm9yZXN0OiBGb3Jlc3Q7XG4gICAgcHJpdmF0ZSBmb3Jlc3RNYXBXaWR0aDogbnVtYmVyO1xuICAgIHByaXZhdGUgZm9yZXN0TWFwSGVpZ2h0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBmb3Jlc3RNYXA6IEZsb29yW11bXSA9IFtdO1xuICAgIHByaXZhdGUgeTogbnVtYmVyO1xuICAgIHByaXZhdGUgeDogbnVtYmVyO1xuICAgIHByaXZhdGUgb3JpZ1g6IG51bWJlcjtcbiAgICBwcml2YXRlIG9yaWdZOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBzY29yZTogbnVtYmVyO1xuICAgIHByaXZhdGUgYWN0aW9uczogc3RyaW5nW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHBsYXllclk6IG51bWJlciwgcGxheWVyWDogbnVtYmVyLCBkYXJrV29vZHM6IEZvcmVzdCwgc2NvcmU6IG51bWJlciA9IDApIHtcbiAgICAgICAgdGhpcy5mb3Jlc3QgPSBkYXJrV29vZHM7XG4gICAgICAgIHRoaXMuc2NvcmUgPSBzY29yZTtcbiAgICAgICAgdGhpcy54ID0gcGxheWVyWDtcbiAgICAgICAgdGhpcy55ID0gcGxheWVyWTtcbiAgICAgICAgdGhpcy5vcmlnWCA9IHBsYXllclg7XG4gICAgICAgIHRoaXMub3JpZ1kgPSBwbGF5ZXJZO1xuXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IGRhcmtXb29kcy5nZXRGb3Jlc3QoKS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gZGFya1dvb2RzLmdldEZvcmVzdCgpWzBdLmxlbmd0aDtcblxuICAgICAgICB0aGlzLmZvcmVzdE1hcEhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5mb3Jlc3RNYXBXaWR0aCA9IHdpZHRoO1xuXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3ldID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHdpZHRoOyB4KyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt5XVt4XSA9IG5ldyBGbG9vcih5LCB4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNYXBIZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcmVzdE1hcC5sZW5ndGg7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE1hcFdpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3Jlc3RNYXBbMF0ubGVuZ3RoO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0tub3duKHk6IG51bWJlciwgeDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcmVzdE1hcFt5XVt4XS5pc1Zpc2l0ZWQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Rm9yZXN0KGZvcmVzdDogRm9yZXN0KSB7XG4gICAgICAgIHRoaXMuZm9yZXN0ID0gZm9yZXN0O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRQb3NpdGlvbih5OiBudW1iZXIsIHg6IG51bWJlcikge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQb3NpdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHt4OiB0aGlzLngsIHk6IHRoaXMueX07XG4gICAgfVxuXG4gICAgcHVibGljIHRvSHRtbCgpIHtcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiZmxvb3JDYXNlIHdhbmRlcmVyXCI+PC9kaXY+YDtcbiAgICB9XG5cbiAgICBwdWJsaWMgd2F0Y2hUaGVGbG9vcigpOiBGbG9vciB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmZvcmVzdC5nZXRGbG9vckNvbnRlbnQodGhpcy55LCB0aGlzLngpO1xuICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueF0gPSBjb250ZW50O1xuICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueF0uc2V0VmlzaXRlZCh0cnVlKTtcblxuICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlTWFwKCkge1xuICAgICAgICBsZXQgbW9uc3RlckNsdWUgPSBmYWxzZTtcbiAgICAgICAgbGV0IHRyYXBDbHVlID0gZmFsc2U7XG4gICAgICAgIGxldCBudW1iZXJBZGphY2VudFZpc2l0ZWQgPSB0aGlzLm51bWJlckFkamFjZW50VmlzaXRlZCh0aGlzLnksIHRoaXMueCk7XG4gICAgICAgIGxldCBwcm9iYWJpbGl0eSA9IDA7XG4gICAgICAgIGlmIChudW1iZXJBZGphY2VudFZpc2l0ZWQgPCA0KSB7XG4gICAgICAgICAgICBwcm9iYWJpbGl0eSA9IDEgLyAoIDQgLSBudW1iZXJBZGphY2VudFZpc2l0ZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnhdID0gdGhpcy5mb3Jlc3QuZ2V0Rmxvb3JDb250ZW50KHRoaXMueSwgdGhpcy54KTtcbiAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnhdLnNldFZpc2l0ZWQodHJ1ZSk7XG5cbiAgICAgICAgLy8gTm8gY2hlYXQgaGVyZSwganVzdCB1c2VkIGZvciBzdG9yaW5nIHRoZSBwcm9iYWJpbGl0aWVzXG4gICAgICAgIGlmICh0aGlzLnkgKyAxIDwgdGhpcy5mb3Jlc3RNYXAubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnkgKyAxXVt0aGlzLnhdID0gdGhpcy5mb3Jlc3QuZ2V0Rmxvb3JDb250ZW50KHRoaXMueSArIDEsIHRoaXMueCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMueSAtIDEgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55IC0gMV1bdGhpcy54XSA9IHRoaXMuZm9yZXN0LmdldEZsb29yQ29udGVudCh0aGlzLnkgLSAxLCB0aGlzLngpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnggKyAxIDwgdGhpcy5mb3Jlc3RNYXBbMF0ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueCArIDFdID0gdGhpcy5mb3Jlc3QuZ2V0Rmxvb3JDb250ZW50KHRoaXMueSwgdGhpcy54ICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMueCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggLSAxXSA9IHRoaXMuZm9yZXN0LmdldEZsb29yQ29udGVudCh0aGlzLnksIHRoaXMueCAtIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54XS5pc01vbnN0ZXJDbHVlKCkpIHtcbiAgICAgICAgICAgIG1vbnN0ZXJDbHVlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnhdLmlzVHJhcENsdWUoKSkge1xuICAgICAgICAgICAgdHJhcENsdWUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmluZCBhZGphY2VudCBmbG9vcnNcbiAgICAgICAgaWYgKHRoaXMueSArIDEgPCB0aGlzLmZvcmVzdE1hcC5sZW5ndGggJiYgIXRoaXMuZm9yZXN0TWFwW3RoaXMueSArIDFdW3RoaXMueF0uaXNWaXNpdGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueSArIDFdW3RoaXMueF0uc2V0QWNjZXNzaWJsZSh0cnVlKTtcbiAgICAgICAgICAgIGlmIChtb25zdGVyQ2x1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueSArIDFdW3RoaXMueF0uYWRkUHJvYmFiaWxpdHlNb25zdGVyKHByb2JhYmlsaXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0cmFwQ2x1ZSkge1xuICAgICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55ICsgMV1bdGhpcy54XS5hZGRQcm9iYWJpbGl0eVRyYXAocHJvYmFiaWxpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnkgLSAxID49IDAgJiYgIXRoaXMuZm9yZXN0TWFwW3RoaXMueSAtIDFdW3RoaXMueF0uaXNWaXNpdGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueSAtIDFdW3RoaXMueF0uc2V0QWNjZXNzaWJsZSh0cnVlKTtcbiAgICAgICAgICAgIGlmIChtb25zdGVyQ2x1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueSAtIDFdW3RoaXMueF0uYWRkUHJvYmFiaWxpdHlNb25zdGVyKHByb2JhYmlsaXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0cmFwQ2x1ZSkge1xuICAgICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55IC0gMV1bdGhpcy54XS5hZGRQcm9iYWJpbGl0eVRyYXAocHJvYmFiaWxpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnggKyAxIDwgdGhpcy5mb3Jlc3RNYXBbMF0ubGVuZ3RoICYmICF0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueCArIDFdLmlzVmlzaXRlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueCArIDFdLnNldEFjY2Vzc2libGUodHJ1ZSk7XG4gICAgICAgICAgICBpZiAobW9uc3RlckNsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueCArIDFdLmFkZFByb2JhYmlsaXR5TW9uc3Rlcihwcm9iYWJpbGl0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHJhcENsdWUpIHtcbiAgICAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54ICsgMV0uYWRkUHJvYmFiaWxpdHlUcmFwKHByb2JhYmlsaXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy54IC0gMSA+PSAwICYmICF0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueCAtIDFdLmlzVmlzaXRlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueCAtIDFdLnNldEFjY2Vzc2libGUodHJ1ZSk7XG4gICAgICAgICAgICBpZiAobW9uc3RlckNsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueCAtIDFdLmFkZFByb2JhYmlsaXR5TW9uc3Rlcihwcm9iYWJpbGl0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHJhcENsdWUpIHtcbiAgICAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54IC0gMV0uYWRkUHJvYmFiaWxpdHlUcmFwKHByb2JhYmlsaXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBhY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmFjdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgYWN0aW9uID0gdGhpcy5hY3Rpb25zLnNoaWZ0KCk7XG5cbiAgICAgICAgICAgIGlmIChhY3Rpb24gPT09IFwibGVmdFwiIHx8IGFjdGlvbiA9PT0gXCJyaWdodFwiIHx8IGFjdGlvbiA9PT0gXCJ1cFwiIHx8IGFjdGlvbiA9PT0gXCJkb3duXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmUoYWN0aW9uKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSBcInNob290LWxlZnRcIiB8fFxuICAgICAgICAgICAgICAgIGFjdGlvbiA9PT0gXCJzaG9vdC1yaWdodFwiIHx8XG4gICAgICAgICAgICAgICAgYWN0aW9uID09PSBcInNob290LXVwXCIgfHxcbiAgICAgICAgICAgICAgICBhY3Rpb24gPT09IFwic2hvb3QtZG93blwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2hvb3REaXJlY3Rpb24gPSBhY3Rpb24uc3Vic3RyaW5nKDYpO1xuICAgICAgICAgICAgICAgIHRoaXMudXNlU2xpbmdzaG90KHNob290RGlyZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWN0ZWQgZm9yIG5vdGhpbmdcIik7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB0aGluaygpIHtcbiAgICAgICAgbGV0IHRoaXNGbG9vciA9IHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54XTtcblxuICAgICAgICB0aGlzLnVwZGF0ZU1hcCgpO1xuICAgICAgICAvLyBGaW5kIHRpbGVzIHRvIHZpc2l0XG4gICAgICAgIGxldCBib3JkZXJNYXAgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDAgOyBqIDwgdGhpcy5nZXRNYXBIZWlnaHQoKSA7IGorKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgdGhpcy5nZXRNYXBXaWR0aCgpIDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9yZXN0TWFwW2pdW2ldLmlzQWNjZXNzaWJsZSgpICYmICF0aGlzLmZvcmVzdE1hcFtqXVtpXS5pc1Zpc2l0ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICBib3JkZXJNYXAucHVzaCh0aGlzLmZvcmVzdE1hcFtqXVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ29tcGxleCBsb2dpYyBhZnRlciB0aGlzIGxpbmVcbiAgICAgICAgbGV0IHdhbmRlcmVyTG9naWMgPSBuZXcgTG9naWNhbChib3JkZXJNYXApO1xuICAgICAgICBsZXQgcG9zaXRpb24gPSAwO1xuICAgICAgICBsZXQgZGVzdGluYXRpb25Gb3VuZCA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAoKChwb3NpdGlvbikgPCBib3JkZXJNYXAubGVuZ3RoKSAmJiBkZXN0aW5hdGlvbkZvdW5kID09PSBmYWxzZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYW4gZ28gdG8gOlwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHdhbmRlcmVyTG9naWMuY2FuR29Ubyhib3JkZXJNYXBbcG9zaXRpb25dKSk7XG4gICAgICAgICAgICBpZiAod2FuZGVyZXJMb2dpYy5jYW5Hb1RvKGJvcmRlck1hcFtwb3NpdGlvbl0pKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwb3NcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYm9yZGVyTWFwW3Bvc2l0aW9uXSk7XG5cbiAgICAgICAgICAgICAgICAvLyBUZXN0cyB0aGUgbG9naWNhbCBydWxlc1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicnVsZW1vbnN0ZXIgOlwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh3YW5kZXJlckxvZ2ljLnJ1bGVNb25zdGVyKGJvcmRlck1hcFtwb3NpdGlvbl0pKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJ1bGVUcmFwOlwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh3YW5kZXJlckxvZ2ljLnJ1bGVUcmFwKGJvcmRlck1hcFtwb3NpdGlvbl0pKTtcblxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uRm91bmQgPSAod2FuZGVyZXJMb2dpYy5ydWxlTW9uc3Rlcihib3JkZXJNYXBbcG9zaXRpb25dKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgd2FuZGVyZXJMb2dpYy5ydWxlVHJhcChib3JkZXJNYXBbcG9zaXRpb25dKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkZXN0aW5hdGlvbkZvdW5kID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJkZXN0IGZvdW5kIDogXCIgKyBkZXN0aW5hdGlvbkZvdW5kKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJmaW5hbCBkZXN0aW5hdGlvbiA6XCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhib3JkZXJNYXBbcG9zaXRpb25dKTtcblxuXG4gICAgICAgIGxldCBoYXZlVG9TaG9vdCA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChkZXN0aW5hdGlvbkZvdW5kKSB7XG4gICAgICAgICAgICBpZiAod2FuZGVyZXJMb2dpYy5zaG9vdEJlZm9yZShib3JkZXJNYXBbcG9zaXRpb25dKSkge1xuICAgICAgICAgICAgICAgIGhhdmVUb1Nob290ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucyA9IHRoaXMuZmluZFBhdGgodGhpc0Zsb29yLCBib3JkZXJNYXBbcG9zaXRpb25dLCBoYXZlVG9TaG9vdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBAdG9kbyBJdCBpcyBpbXBvc3NpYmxlXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5hY3Rpb25zKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGZpbmRQYXRoKHN0YXJ0OiBGbG9vciwgZGVzdGluYXRpb246IEZsb29yLCBoYXZlVG9TaG9vdDogYm9vbGVhbikge1xuICAgICAgICAvLyBNYXRyaXggaW5pdFxuICAgICAgICBsZXQgbWF0cml4OiBudW1iZXJbXVtdID0gW107XG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5mb3Jlc3RNYXBIZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgbWF0cml4W3ldID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuZm9yZXN0TWFwV2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcmVzdE1hcFt5XVt4XS5pc1Zpc2l0ZWQoKVxuICAgICAgICAgICAgICAgICAgICAmJiAhdGhpcy5mb3Jlc3RNYXBbeV1beF0uaXNNb25zdGVyKClcbiAgICAgICAgICAgICAgICAgICAgJiYgIXRoaXMuZm9yZXN0TWFwW3ldW3hdLmlzVHJhcCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdhbGthYmxlXG4gICAgICAgICAgICAgICAgICAgIG1hdHJpeFt5XVt4XSA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQmxvY2tlZFxuICAgICAgICAgICAgICAgICAgICBtYXRyaXhbeV1beF0gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERlc3RpbmF0aW9uIG11c3QgYmUgd2Fsa2FibGVcbiAgICAgICAgbWF0cml4W2Rlc3RpbmF0aW9uLmdldFkoKV1bZGVzdGluYXRpb24uZ2V0WCgpXSA9IDA7XG5cbiAgICAgICAgbGV0IGdyaWQgPSBuZXcgUGF0aEZpbmRpbmcuR3JpZChtYXRyaXgpO1xuICAgICAgICBsZXQgZmluZGVyID0gbmV3IFBhdGhGaW5kaW5nLkFTdGFyRmluZGVyKCk7XG4gICAgICAgIC8vIEB0b2RvIHZlcmlmeSB4IGFuZCB5IGF4aXMgb3JkZXIgOiBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9wYXRoZmluZGluZ1xuICAgICAgICBjb25zb2xlLmxvZyhcImdyaWRcIik7XG5cbiAgICAgICAgY29uc29sZS5sb2cobWF0cml4KTtcblxuICAgICAgICBsZXQgcGF0aCA9IGZpbmRlci5maW5kUGF0aChzdGFydC5nZXRYKCksIHN0YXJ0LmdldFkoKSwgZGVzdGluYXRpb24uZ2V0WCgpLCBkZXN0aW5hdGlvbi5nZXRZKCksIGdyaWQpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInBhdGhcIik7XG5cbiAgICAgICAgY29uc29sZS5sb2cocGF0aCk7XG5cbiAgICAgICAgbGV0IG1vdmVzUGF0aCA9IHRoaXMuZmluZE1vdmVzKHBhdGgsIGhhdmVUb1Nob290KTtcbiAgICAgICAgcmV0dXJuIG1vdmVzUGF0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZmluZE1vdmVzKHBhdGg6IGFueVtdLCBoYXZlVG9TaG9vdDogYm9vbGVhbikge1xuICAgICAgICBsZXQgbW92ZXNQYXRoID0gW107XG4gICAgICAgIC8vIEB0b2RvIHZlcmlmeSB4IGFuZCB5IGF4aXMgb3JkZXIgZnJvbSB0aGlzLmZpbmRQYXRoKClcbiAgICAgICAgLy8gdXNpbmcgaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvcGF0aGZpbmRpbmcgLCBwYXRoW2ldWzBdIGlzIHggYW5kIHBhdGhbaV1bMV0gaXMgeVxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwYXRoW2ldWzFdID09PSBwYXRoW2kgLSAxXVsxXSkge1xuICAgICAgICAgICAgICAgIC8vIHggaXMgdGhlIHNhbWUsIHNvIHRoZSB3YW5kZXJlciBnb2VzIHVwIG9yIGRvd25cbiAgICAgICAgICAgICAgICBpZiAocGF0aFtpXVswXSA8IHBhdGhbaSAtIDFdWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSB3YW5kZXJlciBnb2VzIGxlZnRcbiAgICAgICAgICAgICAgICAgICAgbW92ZXNQYXRoLnB1c2goXCJsZWZ0XCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGF0aFtpXVswXSA+IHBhdGhbaSAtIDFdWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSB3YW5kZXJlciBnb2VzIHJpZ2h0XG4gICAgICAgICAgICAgICAgICAgIG1vdmVzUGF0aC5wdXNoKFwicmlnaHRcIik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRvZG8gV1RGIVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGF0aFtpXVswXSA9PT0gcGF0aFtpIC0gMV1bMF0pIHtcbiAgICAgICAgICAgICAgICAvLyB5IGlzIHRoZSBzYW1lLCBzbyB0aGUgd2FuZGVyZXIgZ29lcyBsZWZ0IG9yIHJpZ2h0XG4gICAgICAgICAgICAgICAgaWYgKHBhdGhbaV1bMV0gPCBwYXRoW2kgLSAxXVsxXSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgd2FuZGVyZXIgZ29lcyB1cFxuICAgICAgICAgICAgICAgICAgICBtb3Zlc1BhdGgucHVzaChcInVwXCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGF0aFtpXVsxXSA+IHBhdGhbaSAtIDFdWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSB3YW5kZXJlciBnb2VzIGRvd25cbiAgICAgICAgICAgICAgICAgICAgbW92ZXNQYXRoLnB1c2goXCJkb3duXCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEB0b2RvIFdURiFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGF2ZVRvU2hvb3QpIHtcbiAgICAgICAgICAgIGxldCBzaG90RGlyZWN0aW9uID0gXCJcIjtcbiAgICAgICAgICAgIHN3aXRjaCAobW92ZXNQYXRoW21vdmVzUGF0aC5sZW5ndGggLSAxXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ1cFwiOlxuICAgICAgICAgICAgICAgICAgICBzaG90RGlyZWN0aW9uID0gXCJzaG9vdC11cFwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZG93blwiOlxuICAgICAgICAgICAgICAgICAgICBzaG90RGlyZWN0aW9uID0gXCJzaG9vdC1kb3duXCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgICAgICAgICAgICAgIHNob3REaXJlY3Rpb24gPSBcInNob290LWxlZnRcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgICAgICAgICAgICAgIHNob3REaXJlY3Rpb24gPSBcInNob290LXJpZ2h0XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbW92ZXNQYXRoLnNwbGljZShtb3Zlc1BhdGgubGVuZ3RoIC0gMSwgMCwgc2hvdERpcmVjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbW92ZXNQYXRoO1xuICAgIH1cblxuICAgIHB1YmxpYyBtb3ZlKGRpcmVjdGlvbjogc3RyaW5nKSB7XG4gICAgICAgIGxldCBjdXJyZW50UG9zID0gdGhpcy5nZXRQb3NpdGlvbigpO1xuICAgICAgICBsZXQgbmV3VmFsO1xuXG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IGN1cnJlbnRQb3MueCAtIDE7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbCA+PSAwKSB7IHRoaXMueCA9IG5ld1ZhbDsgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgICAgICAgICAgbmV3VmFsID0gY3VycmVudFBvcy54ICsgMTtcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsIDwgdGhpcy5mb3Jlc3RNYXBXaWR0aCkgeyB0aGlzLnggPSBuZXdWYWw7IH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ1cFwiOlxuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IGN1cnJlbnRQb3MueSAtIDE7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbCA+PSAwKSB7IHRoaXMueSA9IG5ld1ZhbDsgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImRvd25cIjpcbiAgICAgICAgICAgICAgICBuZXdWYWwgPSBjdXJyZW50UG9zLnkgKyAxO1xuICAgICAgICAgICAgICAgIGlmIChuZXdWYWwgPCB0aGlzLmZvcmVzdE1hcEhlaWdodCkgeyB0aGlzLnkgPSBuZXdWYWw7IH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFNjb3JlKC0xKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgbnVtYmVyQWRqYWNlbnRWaXNpdGVkKHk6IG51bWJlciwgeDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBudW0gPSAwO1xuXG4gICAgICAgIGlmICggeSArIDEgPCB0aGlzLmZvcmVzdE1hcC5sZW5ndGggJiYgdGhpcy5mb3Jlc3RNYXBbeSArIDFdW3hdLmlzVmlzaXRlZCgpKSB7XG4gICAgICAgICAgICBudW0gKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIHkgLSAxID49IDAgICYmIHRoaXMuZm9yZXN0TWFwW3kgLSAxXVt4XS5pc1Zpc2l0ZWQoKSkge1xuICAgICAgICAgICAgbnVtICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCB4ICsgMSA8IHRoaXMuZm9yZXN0TWFwWzBdLmxlbmd0aCAgJiYgdGhpcy5mb3Jlc3RNYXBbeV1beCArIDFdLmlzVmlzaXRlZCgpKSB7XG4gICAgICAgICAgICBudW0gKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIHggLSAxID49IDAgICYmIHRoaXMuZm9yZXN0TWFwW3ldW3ggLSAxXS5pc1Zpc2l0ZWQoKSkge1xuICAgICAgICAgICAgbnVtICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXNlU2xpbmdzaG90KGRpcmVjdGlvbjogU3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQb3MgPSB0aGlzLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIGxldCB4ID0gY3VycmVudFBvcy54O1xuICAgICAgICBsZXQgeSA9IGN1cnJlbnRQb3MueTtcbiAgICAgICAgbGV0IHRhcmdldDtcblxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSBjdXJyZW50UG9zLnggLSAxO1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgPj0gMCkgeyB4ID0gdGFyZ2V0OyB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSBjdXJyZW50UG9zLnggKyAxO1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgPCB0aGlzLmZvcmVzdE1hcFdpZHRoKSB7IHggPSB0YXJnZXQ7IH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ1cFwiOlxuICAgICAgICAgICAgICAgIHRhcmdldCA9IGN1cnJlbnRQb3MueSAtIDE7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCA+PSAwKSB7IHkgPSB0YXJnZXQ7IH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJkb3duXCI6XG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gY3VycmVudFBvcy55ICsgMTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0IDwgdGhpcy5mb3Jlc3RNYXBIZWlnaHQpIHsgeSA9IHRhcmdldDsgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9yZXN0LmdldEZsb29yQ29udGVudCh5LCB4KS5raWxsTW9uc3RlcigpO1xuXG4gICAgICAgIHRoaXMuc2V0U2NvcmUoLTEwKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNPdXQoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHdheU91dFBvc2l0aW9uID0gdGhpcy5mb3Jlc3QuZ2V0V2F5T3V0UG9zaXRpb24oKTtcblxuICAgICAgICBpZiAodGhpcy54ID09PSB3YXlPdXRQb3NpdGlvbi54ICYmIHRoaXMueSA9PT0gd2F5T3V0UG9zaXRpb24ueSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNEZWFkKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy53YXRjaFRoZUZsb29yKCkuaXNUcmFwKCkgfHwgdGhpcy53YXRjaFRoZUZsb29yKCkuaXNNb25zdGVyKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldFNjb3JlKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2NvcmUgKz0gdmFsO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTY29yZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29yZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TWFwKCk6IEZsb29yW11bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcmVzdE1hcDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0TWFwKG06IEZsb29yW11bXSkge1xuICAgICAgICB0aGlzLmZvcmVzdE1hcCA9IG07XG4gICAgfVxuXG4gICAgcHVibGljIGhhc05vTW92ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGlvbnMubGVuZ3RoID09PSAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRPcmlnWCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmlnWDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0T3JpZ1koKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZ1k7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IHRyYXAgPSBcInRyYXBcIjtcbmV4cG9ydCBjb25zdCBlbXB0eSA9IFwiXCI7XG5leHBvcnQgY29uc3QgZ29hbCA9IFwiZ29hbFwiO1xuZXhwb3J0IGNvbnN0IG1vbnN0ZXIgPSBcIm1vbnN0ZXJcIjtcbmV4cG9ydCBjb25zdCB0cmVlID0gXCJ0cmVlXCI7XG4iLCJpbXBvcnQgKiBhcyAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCAqIGFzIGpzYm9hcmQgZnJvbSBcIi4vRm9yZXN0XCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9HYW1lXCI7XG5cbmxldCBnID0gbmV3IEdhbWUoXCJnYW1lRGl2XCIsIFwic2NvcmVEaXZcIik7XG5nLmluaXQoMywgMyk7XG5nLnVwZGF0ZShmYWxzZSk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBnLnVwZGF0ZSgpO1xufSk7XG5cbi8vIEluaXQgbWFudWFsIGdhbWVcbmRvY3VtZW50Lm9ua2V5ZG93biA9IChlKSA9PiB7XG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGcudXBkYXRlKCk7XG4gICAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvaGVhcCcpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjguMFxuKGZ1bmN0aW9uKCkge1xuICB2YXIgSGVhcCwgZGVmYXVsdENtcCwgZmxvb3IsIGhlYXBpZnksIGhlYXBwb3AsIGhlYXBwdXNoLCBoZWFwcHVzaHBvcCwgaGVhcHJlcGxhY2UsIGluc29ydCwgbWluLCBubGFyZ2VzdCwgbnNtYWxsZXN0LCB1cGRhdGVJdGVtLCBfc2lmdGRvd24sIF9zaWZ0dXA7XG5cbiAgZmxvb3IgPSBNYXRoLmZsb29yLCBtaW4gPSBNYXRoLm1pbjtcblxuXG4gIC8qXG4gIERlZmF1bHQgY29tcGFyaXNvbiBmdW5jdGlvbiB0byBiZSB1c2VkXG4gICAqL1xuXG4gIGRlZmF1bHRDbXAgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgaWYgKHggPCB5KSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIGlmICh4ID4geSkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9O1xuXG5cbiAgLypcbiAgSW5zZXJ0IGl0ZW0geCBpbiBsaXN0IGEsIGFuZCBrZWVwIGl0IHNvcnRlZCBhc3N1bWluZyBhIGlzIHNvcnRlZC5cbiAgXG4gIElmIHggaXMgYWxyZWFkeSBpbiBhLCBpbnNlcnQgaXQgdG8gdGhlIHJpZ2h0IG9mIHRoZSByaWdodG1vc3QgeC5cbiAgXG4gIE9wdGlvbmFsIGFyZ3MgbG8gKGRlZmF1bHQgMCkgYW5kIGhpIChkZWZhdWx0IGEubGVuZ3RoKSBib3VuZCB0aGUgc2xpY2VcbiAgb2YgYSB0byBiZSBzZWFyY2hlZC5cbiAgICovXG5cbiAgaW5zb3J0ID0gZnVuY3Rpb24oYSwgeCwgbG8sIGhpLCBjbXApIHtcbiAgICB2YXIgbWlkO1xuICAgIGlmIChsbyA9PSBudWxsKSB7XG4gICAgICBsbyA9IDA7XG4gICAgfVxuICAgIGlmIChjbXAgPT0gbnVsbCkge1xuICAgICAgY21wID0gZGVmYXVsdENtcDtcbiAgICB9XG4gICAgaWYgKGxvIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdsbyBtdXN0IGJlIG5vbi1uZWdhdGl2ZScpO1xuICAgIH1cbiAgICBpZiAoaGkgPT0gbnVsbCkge1xuICAgICAgaGkgPSBhLmxlbmd0aDtcbiAgICB9XG4gICAgd2hpbGUgKGxvIDwgaGkpIHtcbiAgICAgIG1pZCA9IGZsb29yKChsbyArIGhpKSAvIDIpO1xuICAgICAgaWYgKGNtcCh4LCBhW21pZF0pIDwgMCkge1xuICAgICAgICBoaSA9IG1pZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvID0gbWlkICsgMTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChbXS5zcGxpY2UuYXBwbHkoYSwgW2xvLCBsbyAtIGxvXS5jb25jYXQoeCkpLCB4KTtcbiAgfTtcblxuXG4gIC8qXG4gIFB1c2ggaXRlbSBvbnRvIGhlYXAsIG1haW50YWluaW5nIHRoZSBoZWFwIGludmFyaWFudC5cbiAgICovXG5cbiAgaGVhcHB1c2ggPSBmdW5jdGlvbihhcnJheSwgaXRlbSwgY21wKSB7XG4gICAgaWYgKGNtcCA9PSBudWxsKSB7XG4gICAgICBjbXAgPSBkZWZhdWx0Q21wO1xuICAgIH1cbiAgICBhcnJheS5wdXNoKGl0ZW0pO1xuICAgIHJldHVybiBfc2lmdGRvd24oYXJyYXksIDAsIGFycmF5Lmxlbmd0aCAtIDEsIGNtcCk7XG4gIH07XG5cblxuICAvKlxuICBQb3AgdGhlIHNtYWxsZXN0IGl0ZW0gb2ZmIHRoZSBoZWFwLCBtYWludGFpbmluZyB0aGUgaGVhcCBpbnZhcmlhbnQuXG4gICAqL1xuXG4gIGhlYXBwb3AgPSBmdW5jdGlvbihhcnJheSwgY21wKSB7XG4gICAgdmFyIGxhc3RlbHQsIHJldHVybml0ZW07XG4gICAgaWYgKGNtcCA9PSBudWxsKSB7XG4gICAgICBjbXAgPSBkZWZhdWx0Q21wO1xuICAgIH1cbiAgICBsYXN0ZWx0ID0gYXJyYXkucG9wKCk7XG4gICAgaWYgKGFycmF5Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuaXRlbSA9IGFycmF5WzBdO1xuICAgICAgYXJyYXlbMF0gPSBsYXN0ZWx0O1xuICAgICAgX3NpZnR1cChhcnJheSwgMCwgY21wKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuaXRlbSA9IGxhc3RlbHQ7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5pdGVtO1xuICB9O1xuXG5cbiAgLypcbiAgUG9wIGFuZCByZXR1cm4gdGhlIGN1cnJlbnQgc21hbGxlc3QgdmFsdWUsIGFuZCBhZGQgdGhlIG5ldyBpdGVtLlxuICBcbiAgVGhpcyBpcyBtb3JlIGVmZmljaWVudCB0aGFuIGhlYXBwb3AoKSBmb2xsb3dlZCBieSBoZWFwcHVzaCgpLCBhbmQgY2FuIGJlXG4gIG1vcmUgYXBwcm9wcmlhdGUgd2hlbiB1c2luZyBhIGZpeGVkIHNpemUgaGVhcC4gTm90ZSB0aGF0IHRoZSB2YWx1ZVxuICByZXR1cm5lZCBtYXkgYmUgbGFyZ2VyIHRoYW4gaXRlbSEgVGhhdCBjb25zdHJhaW5zIHJlYXNvbmFibGUgdXNlIG9mXG4gIHRoaXMgcm91dGluZSB1bmxlc3Mgd3JpdHRlbiBhcyBwYXJ0IG9mIGEgY29uZGl0aW9uYWwgcmVwbGFjZW1lbnQ6XG4gICAgICBpZiBpdGVtID4gYXJyYXlbMF1cbiAgICAgICAgaXRlbSA9IGhlYXByZXBsYWNlKGFycmF5LCBpdGVtKVxuICAgKi9cblxuICBoZWFwcmVwbGFjZSA9IGZ1bmN0aW9uKGFycmF5LCBpdGVtLCBjbXApIHtcbiAgICB2YXIgcmV0dXJuaXRlbTtcbiAgICBpZiAoY21wID09IG51bGwpIHtcbiAgICAgIGNtcCA9IGRlZmF1bHRDbXA7XG4gICAgfVxuICAgIHJldHVybml0ZW0gPSBhcnJheVswXTtcbiAgICBhcnJheVswXSA9IGl0ZW07XG4gICAgX3NpZnR1cChhcnJheSwgMCwgY21wKTtcbiAgICByZXR1cm4gcmV0dXJuaXRlbTtcbiAgfTtcblxuXG4gIC8qXG4gIEZhc3QgdmVyc2lvbiBvZiBhIGhlYXBwdXNoIGZvbGxvd2VkIGJ5IGEgaGVhcHBvcC5cbiAgICovXG5cbiAgaGVhcHB1c2hwb3AgPSBmdW5jdGlvbihhcnJheSwgaXRlbSwgY21wKSB7XG4gICAgdmFyIF9yZWY7XG4gICAgaWYgKGNtcCA9PSBudWxsKSB7XG4gICAgICBjbXAgPSBkZWZhdWx0Q21wO1xuICAgIH1cbiAgICBpZiAoYXJyYXkubGVuZ3RoICYmIGNtcChhcnJheVswXSwgaXRlbSkgPCAwKSB7XG4gICAgICBfcmVmID0gW2FycmF5WzBdLCBpdGVtXSwgaXRlbSA9IF9yZWZbMF0sIGFycmF5WzBdID0gX3JlZlsxXTtcbiAgICAgIF9zaWZ0dXAoYXJyYXksIDAsIGNtcCk7XG4gICAgfVxuICAgIHJldHVybiBpdGVtO1xuICB9O1xuXG5cbiAgLypcbiAgVHJhbnNmb3JtIGxpc3QgaW50byBhIGhlYXAsIGluLXBsYWNlLCBpbiBPKGFycmF5Lmxlbmd0aCkgdGltZS5cbiAgICovXG5cbiAgaGVhcGlmeSA9IGZ1bmN0aW9uKGFycmF5LCBjbXApIHtcbiAgICB2YXIgaSwgX2ksIF9qLCBfbGVuLCBfcmVmLCBfcmVmMSwgX3Jlc3VsdHMsIF9yZXN1bHRzMTtcbiAgICBpZiAoY21wID09IG51bGwpIHtcbiAgICAgIGNtcCA9IGRlZmF1bHRDbXA7XG4gICAgfVxuICAgIF9yZWYxID0gKGZ1bmN0aW9uKCkge1xuICAgICAgX3Jlc3VsdHMxID0gW107XG4gICAgICBmb3IgKHZhciBfaiA9IDAsIF9yZWYgPSBmbG9vcihhcnJheS5sZW5ndGggLyAyKTsgMCA8PSBfcmVmID8gX2ogPCBfcmVmIDogX2ogPiBfcmVmOyAwIDw9IF9yZWYgPyBfaisrIDogX2otLSl7IF9yZXN1bHRzMS5wdXNoKF9qKTsgfVxuICAgICAgcmV0dXJuIF9yZXN1bHRzMTtcbiAgICB9KS5hcHBseSh0aGlzKS5yZXZlcnNlKCk7XG4gICAgX3Jlc3VsdHMgPSBbXTtcbiAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYxLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICBpID0gX3JlZjFbX2ldO1xuICAgICAgX3Jlc3VsdHMucHVzaChfc2lmdHVwKGFycmF5LCBpLCBjbXApKTtcbiAgICB9XG4gICAgcmV0dXJuIF9yZXN1bHRzO1xuICB9O1xuXG5cbiAgLypcbiAgVXBkYXRlIHRoZSBwb3NpdGlvbiBvZiB0aGUgZ2l2ZW4gaXRlbSBpbiB0aGUgaGVhcC5cbiAgVGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgY2FsbGVkIGV2ZXJ5IHRpbWUgdGhlIGl0ZW0gaXMgYmVpbmcgbW9kaWZpZWQuXG4gICAqL1xuXG4gIHVwZGF0ZUl0ZW0gPSBmdW5jdGlvbihhcnJheSwgaXRlbSwgY21wKSB7XG4gICAgdmFyIHBvcztcbiAgICBpZiAoY21wID09IG51bGwpIHtcbiAgICAgIGNtcCA9IGRlZmF1bHRDbXA7XG4gICAgfVxuICAgIHBvcyA9IGFycmF5LmluZGV4T2YoaXRlbSk7XG4gICAgaWYgKHBvcyA9PT0gLTEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgX3NpZnRkb3duKGFycmF5LCAwLCBwb3MsIGNtcCk7XG4gICAgcmV0dXJuIF9zaWZ0dXAoYXJyYXksIHBvcywgY21wKTtcbiAgfTtcblxuXG4gIC8qXG4gIEZpbmQgdGhlIG4gbGFyZ2VzdCBlbGVtZW50cyBpbiBhIGRhdGFzZXQuXG4gICAqL1xuXG4gIG5sYXJnZXN0ID0gZnVuY3Rpb24oYXJyYXksIG4sIGNtcCkge1xuICAgIHZhciBlbGVtLCByZXN1bHQsIF9pLCBfbGVuLCBfcmVmO1xuICAgIGlmIChjbXAgPT0gbnVsbCkge1xuICAgICAgY21wID0gZGVmYXVsdENtcDtcbiAgICB9XG4gICAgcmVzdWx0ID0gYXJyYXkuc2xpY2UoMCwgbik7XG4gICAgaWYgKCFyZXN1bHQubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBoZWFwaWZ5KHJlc3VsdCwgY21wKTtcbiAgICBfcmVmID0gYXJyYXkuc2xpY2Uobik7XG4gICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICBlbGVtID0gX3JlZltfaV07XG4gICAgICBoZWFwcHVzaHBvcChyZXN1bHQsIGVsZW0sIGNtcCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQuc29ydChjbXApLnJldmVyc2UoKTtcbiAgfTtcblxuXG4gIC8qXG4gIEZpbmQgdGhlIG4gc21hbGxlc3QgZWxlbWVudHMgaW4gYSBkYXRhc2V0LlxuICAgKi9cblxuICBuc21hbGxlc3QgPSBmdW5jdGlvbihhcnJheSwgbiwgY21wKSB7XG4gICAgdmFyIGVsZW0sIGksIGxvcywgcmVzdWx0LCBfaSwgX2osIF9sZW4sIF9yZWYsIF9yZWYxLCBfcmVzdWx0cztcbiAgICBpZiAoY21wID09IG51bGwpIHtcbiAgICAgIGNtcCA9IGRlZmF1bHRDbXA7XG4gICAgfVxuICAgIGlmIChuICogMTAgPD0gYXJyYXkubGVuZ3RoKSB7XG4gICAgICByZXN1bHQgPSBhcnJheS5zbGljZSgwLCBuKS5zb3J0KGNtcCk7XG4gICAgICBpZiAoIXJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIGxvcyA9IHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV07XG4gICAgICBfcmVmID0gYXJyYXkuc2xpY2Uobik7XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgZWxlbSA9IF9yZWZbX2ldO1xuICAgICAgICBpZiAoY21wKGVsZW0sIGxvcykgPCAwKSB7XG4gICAgICAgICAgaW5zb3J0KHJlc3VsdCwgZWxlbSwgMCwgbnVsbCwgY21wKTtcbiAgICAgICAgICByZXN1bHQucG9wKCk7XG4gICAgICAgICAgbG9zID0gcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaGVhcGlmeShhcnJheSwgY21wKTtcbiAgICBfcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoaSA9IF9qID0gMCwgX3JlZjEgPSBtaW4obiwgYXJyYXkubGVuZ3RoKTsgMCA8PSBfcmVmMSA/IF9qIDwgX3JlZjEgOiBfaiA+IF9yZWYxOyBpID0gMCA8PSBfcmVmMSA/ICsrX2ogOiAtLV9qKSB7XG4gICAgICBfcmVzdWx0cy5wdXNoKGhlYXBwb3AoYXJyYXksIGNtcCkpO1xuICAgIH1cbiAgICByZXR1cm4gX3Jlc3VsdHM7XG4gIH07XG5cbiAgX3NpZnRkb3duID0gZnVuY3Rpb24oYXJyYXksIHN0YXJ0cG9zLCBwb3MsIGNtcCkge1xuICAgIHZhciBuZXdpdGVtLCBwYXJlbnQsIHBhcmVudHBvcztcbiAgICBpZiAoY21wID09IG51bGwpIHtcbiAgICAgIGNtcCA9IGRlZmF1bHRDbXA7XG4gICAgfVxuICAgIG5ld2l0ZW0gPSBhcnJheVtwb3NdO1xuICAgIHdoaWxlIChwb3MgPiBzdGFydHBvcykge1xuICAgICAgcGFyZW50cG9zID0gKHBvcyAtIDEpID4+IDE7XG4gICAgICBwYXJlbnQgPSBhcnJheVtwYXJlbnRwb3NdO1xuICAgICAgaWYgKGNtcChuZXdpdGVtLCBwYXJlbnQpIDwgMCkge1xuICAgICAgICBhcnJheVtwb3NdID0gcGFyZW50O1xuICAgICAgICBwb3MgPSBwYXJlbnRwb3M7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBhcnJheVtwb3NdID0gbmV3aXRlbTtcbiAgfTtcblxuICBfc2lmdHVwID0gZnVuY3Rpb24oYXJyYXksIHBvcywgY21wKSB7XG4gICAgdmFyIGNoaWxkcG9zLCBlbmRwb3MsIG5ld2l0ZW0sIHJpZ2h0cG9zLCBzdGFydHBvcztcbiAgICBpZiAoY21wID09IG51bGwpIHtcbiAgICAgIGNtcCA9IGRlZmF1bHRDbXA7XG4gICAgfVxuICAgIGVuZHBvcyA9IGFycmF5Lmxlbmd0aDtcbiAgICBzdGFydHBvcyA9IHBvcztcbiAgICBuZXdpdGVtID0gYXJyYXlbcG9zXTtcbiAgICBjaGlsZHBvcyA9IDIgKiBwb3MgKyAxO1xuICAgIHdoaWxlIChjaGlsZHBvcyA8IGVuZHBvcykge1xuICAgICAgcmlnaHRwb3MgPSBjaGlsZHBvcyArIDE7XG4gICAgICBpZiAocmlnaHRwb3MgPCBlbmRwb3MgJiYgIShjbXAoYXJyYXlbY2hpbGRwb3NdLCBhcnJheVtyaWdodHBvc10pIDwgMCkpIHtcbiAgICAgICAgY2hpbGRwb3MgPSByaWdodHBvcztcbiAgICAgIH1cbiAgICAgIGFycmF5W3Bvc10gPSBhcnJheVtjaGlsZHBvc107XG4gICAgICBwb3MgPSBjaGlsZHBvcztcbiAgICAgIGNoaWxkcG9zID0gMiAqIHBvcyArIDE7XG4gICAgfVxuICAgIGFycmF5W3Bvc10gPSBuZXdpdGVtO1xuICAgIHJldHVybiBfc2lmdGRvd24oYXJyYXksIHN0YXJ0cG9zLCBwb3MsIGNtcCk7XG4gIH07XG5cbiAgSGVhcCA9IChmdW5jdGlvbigpIHtcbiAgICBIZWFwLnB1c2ggPSBoZWFwcHVzaDtcblxuICAgIEhlYXAucG9wID0gaGVhcHBvcDtcblxuICAgIEhlYXAucmVwbGFjZSA9IGhlYXByZXBsYWNlO1xuXG4gICAgSGVhcC5wdXNocG9wID0gaGVhcHB1c2hwb3A7XG5cbiAgICBIZWFwLmhlYXBpZnkgPSBoZWFwaWZ5O1xuXG4gICAgSGVhcC51cGRhdGVJdGVtID0gdXBkYXRlSXRlbTtcblxuICAgIEhlYXAubmxhcmdlc3QgPSBubGFyZ2VzdDtcblxuICAgIEhlYXAubnNtYWxsZXN0ID0gbnNtYWxsZXN0O1xuXG4gICAgZnVuY3Rpb24gSGVhcChjbXApIHtcbiAgICAgIHRoaXMuY21wID0gY21wICE9IG51bGwgPyBjbXAgOiBkZWZhdWx0Q21wO1xuICAgICAgdGhpcy5ub2RlcyA9IFtdO1xuICAgIH1cblxuICAgIEhlYXAucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gaGVhcHB1c2godGhpcy5ub2RlcywgeCwgdGhpcy5jbXApO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS5wb3AgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBoZWFwcG9wKHRoaXMubm9kZXMsIHRoaXMuY21wKTtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUucGVlayA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZXNbMF07XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZXMuaW5kZXhPZih4KSAhPT0gLTE7XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gaGVhcHJlcGxhY2UodGhpcy5ub2RlcywgeCwgdGhpcy5jbXApO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS5wdXNocG9wID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIGhlYXBwdXNocG9wKHRoaXMubm9kZXMsIHgsIHRoaXMuY21wKTtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUuaGVhcGlmeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGhlYXBpZnkodGhpcy5ub2RlcywgdGhpcy5jbXApO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS51cGRhdGVJdGVtID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHVwZGF0ZUl0ZW0odGhpcy5ub2RlcywgeCwgdGhpcy5jbXApO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZXMgPSBbXTtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUuZW1wdHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGVzLmxlbmd0aCA9PT0gMDtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZXMubGVuZ3RoO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGhlYXA7XG4gICAgICBoZWFwID0gbmV3IEhlYXAoKTtcbiAgICAgIGhlYXAubm9kZXMgPSB0aGlzLm5vZGVzLnNsaWNlKDApO1xuICAgICAgcmV0dXJuIGhlYXA7XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGVzLnNsaWNlKDApO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS5pbnNlcnQgPSBIZWFwLnByb3RvdHlwZS5wdXNoO1xuXG4gICAgSGVhcC5wcm90b3R5cGUudG9wID0gSGVhcC5wcm90b3R5cGUucGVlaztcblxuICAgIEhlYXAucHJvdG90eXBlLmZyb250ID0gSGVhcC5wcm90b3R5cGUucGVlaztcblxuICAgIEhlYXAucHJvdG90eXBlLmhhcyA9IEhlYXAucHJvdG90eXBlLmNvbnRhaW5zO1xuXG4gICAgSGVhcC5wcm90b3R5cGUuY29weSA9IEhlYXAucHJvdG90eXBlLmNsb25lO1xuXG4gICAgcmV0dXJuIEhlYXA7XG5cbiAgfSkoKTtcblxuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUgIT09IG51bGwgPyBtb2R1bGUuZXhwb3J0cyA6IHZvaWQgMCkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gSGVhcDtcbiAgfSBlbHNlIHtcbiAgICB3aW5kb3cuSGVhcCA9IEhlYXA7XG4gIH1cblxufSkuY2FsbCh0aGlzKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9zcmMvUGF0aEZpbmRpbmcnKTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAnSGVhcCcgICAgICAgICAgICAgICAgICAgICAgOiByZXF1aXJlKCdoZWFwJyksXHJcbiAgICAnTm9kZScgICAgICAgICAgICAgICAgICAgICAgOiByZXF1aXJlKCcuL2NvcmUvTm9kZScpLFxyXG4gICAgJ0dyaWQnICAgICAgICAgICAgICAgICAgICAgIDogcmVxdWlyZSgnLi9jb3JlL0dyaWQnKSxcclxuICAgICdVdGlsJyAgICAgICAgICAgICAgICAgICAgICA6IHJlcXVpcmUoJy4vY29yZS9VdGlsJyksXHJcbiAgICAnRGlhZ29uYWxNb3ZlbWVudCcgICAgICAgICAgOiByZXF1aXJlKCcuL2NvcmUvRGlhZ29uYWxNb3ZlbWVudCcpLFxyXG4gICAgJ0hldXJpc3RpYycgICAgICAgICAgICAgICAgIDogcmVxdWlyZSgnLi9jb3JlL0hldXJpc3RpYycpLFxyXG4gICAgJ0FTdGFyRmluZGVyJyAgICAgICAgICAgICAgIDogcmVxdWlyZSgnLi9maW5kZXJzL0FTdGFyRmluZGVyJyksXHJcbiAgICAnQmVzdEZpcnN0RmluZGVyJyAgICAgICAgICAgOiByZXF1aXJlKCcuL2ZpbmRlcnMvQmVzdEZpcnN0RmluZGVyJyksXHJcbiAgICAnQnJlYWR0aEZpcnN0RmluZGVyJyAgICAgICAgOiByZXF1aXJlKCcuL2ZpbmRlcnMvQnJlYWR0aEZpcnN0RmluZGVyJyksXHJcbiAgICAnRGlqa3N0cmFGaW5kZXInICAgICAgICAgICAgOiByZXF1aXJlKCcuL2ZpbmRlcnMvRGlqa3N0cmFGaW5kZXInKSxcclxuICAgICdCaUFTdGFyRmluZGVyJyAgICAgICAgICAgICA6IHJlcXVpcmUoJy4vZmluZGVycy9CaUFTdGFyRmluZGVyJyksXHJcbiAgICAnQmlCZXN0Rmlyc3RGaW5kZXInICAgICAgICAgOiByZXF1aXJlKCcuL2ZpbmRlcnMvQmlCZXN0Rmlyc3RGaW5kZXInKSxcclxuICAgICdCaUJyZWFkdGhGaXJzdEZpbmRlcicgICAgICA6IHJlcXVpcmUoJy4vZmluZGVycy9CaUJyZWFkdGhGaXJzdEZpbmRlcicpLFxyXG4gICAgJ0JpRGlqa3N0cmFGaW5kZXInICAgICAgICAgIDogcmVxdWlyZSgnLi9maW5kZXJzL0JpRGlqa3N0cmFGaW5kZXInKSxcclxuICAgICdJREFTdGFyRmluZGVyJyAgICAgICAgICAgICA6IHJlcXVpcmUoJy4vZmluZGVycy9JREFTdGFyRmluZGVyJyksXHJcbiAgICAnSnVtcFBvaW50RmluZGVyJyAgICAgICAgICAgOiByZXF1aXJlKCcuL2ZpbmRlcnMvSnVtcFBvaW50RmluZGVyJyksXHJcbn07XHJcbiIsInZhciBEaWFnb25hbE1vdmVtZW50ID0ge1xyXG4gICAgQWx3YXlzOiAxLFxyXG4gICAgTmV2ZXI6IDIsXHJcbiAgICBJZkF0TW9zdE9uZU9ic3RhY2xlOiAzLFxyXG4gICAgT25seVdoZW5Ob09ic3RhY2xlczogNFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEaWFnb25hbE1vdmVtZW50OyIsInZhciBOb2RlID0gcmVxdWlyZSgnLi9Ob2RlJyk7XHJcbnZhciBEaWFnb25hbE1vdmVtZW50ID0gcmVxdWlyZSgnLi9EaWFnb25hbE1vdmVtZW50Jyk7XHJcblxyXG4vKipcclxuICogVGhlIEdyaWQgY2xhc3MsIHdoaWNoIHNlcnZlcyBhcyB0aGUgZW5jYXBzdWxhdGlvbiBvZiB0aGUgbGF5b3V0IG9mIHRoZSBub2Rlcy5cclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7bnVtYmVyfEFycmF5PEFycmF5PChudW1iZXJ8Ym9vbGVhbik+Pn0gd2lkdGhfb3JfbWF0cml4IE51bWJlciBvZiBjb2x1bW5zIG9mIHRoZSBncmlkLCBvciBtYXRyaXhcclxuICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCBOdW1iZXIgb2Ygcm93cyBvZiB0aGUgZ3JpZC5cclxuICogQHBhcmFtIHtBcnJheTxBcnJheTwobnVtYmVyfGJvb2xlYW4pPj59IFttYXRyaXhdIC0gQSAwLTEgbWF0cml4XHJcbiAqICAgICByZXByZXNlbnRpbmcgdGhlIHdhbGthYmxlIHN0YXR1cyBvZiB0aGUgbm9kZXMoMCBvciBmYWxzZSBmb3Igd2Fsa2FibGUpLlxyXG4gKiAgICAgSWYgdGhlIG1hdHJpeCBpcyBub3Qgc3VwcGxpZWQsIGFsbCB0aGUgbm9kZXMgd2lsbCBiZSB3YWxrYWJsZS4gICovXHJcbmZ1bmN0aW9uIEdyaWQod2lkdGhfb3JfbWF0cml4LCBoZWlnaHQsIG1hdHJpeCkge1xyXG4gICAgdmFyIHdpZHRoO1xyXG5cclxuICAgIGlmICh0eXBlb2Ygd2lkdGhfb3JfbWF0cml4ICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIHdpZHRoID0gd2lkdGhfb3JfbWF0cml4O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBoZWlnaHQgPSB3aWR0aF9vcl9tYXRyaXgubGVuZ3RoO1xyXG4gICAgICAgIHdpZHRoID0gd2lkdGhfb3JfbWF0cml4WzBdLmxlbmd0aDtcclxuICAgICAgICBtYXRyaXggPSB3aWR0aF9vcl9tYXRyaXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbnVtYmVyIG9mIGNvbHVtbnMgb2YgdGhlIGdyaWQuXHJcbiAgICAgKiBAdHlwZSBudW1iZXJcclxuICAgICAqL1xyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbnVtYmVyIG9mIHJvd3Mgb2YgdGhlIGdyaWQuXHJcbiAgICAgKiBAdHlwZSBudW1iZXJcclxuICAgICAqL1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIDJEIGFycmF5IG9mIG5vZGVzLlxyXG4gICAgICovXHJcbiAgICB0aGlzLm5vZGVzID0gdGhpcy5fYnVpbGROb2Rlcyh3aWR0aCwgaGVpZ2h0LCBtYXRyaXgpO1xyXG59XHJcblxyXG4vKipcclxuICogQnVpbGQgYW5kIHJldHVybiB0aGUgbm9kZXMuXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8bnVtYmVyfGJvb2xlYW4+Pn0gW21hdHJpeF0gLSBBIDAtMSBtYXRyaXggcmVwcmVzZW50aW5nXHJcbiAqICAgICB0aGUgd2Fsa2FibGUgc3RhdHVzIG9mIHRoZSBub2Rlcy5cclxuICogQHNlZSBHcmlkXHJcbiAqL1xyXG5HcmlkLnByb3RvdHlwZS5fYnVpbGROb2RlcyA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQsIG1hdHJpeCkge1xyXG4gICAgdmFyIGksIGosXHJcbiAgICAgICAgbm9kZXMgPSBuZXcgQXJyYXkoaGVpZ2h0KTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgaGVpZ2h0OyArK2kpIHtcclxuICAgICAgICBub2Rlc1tpXSA9IG5ldyBBcnJheSh3aWR0aCk7XHJcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IHdpZHRoOyArK2opIHtcclxuICAgICAgICAgICAgbm9kZXNbaV1bal0gPSBuZXcgTm9kZShqLCBpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlmIChtYXRyaXggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBub2RlcztcclxuICAgIH1cclxuXHJcbiAgICBpZiAobWF0cml4Lmxlbmd0aCAhPT0gaGVpZ2h0IHx8IG1hdHJpeFswXS5sZW5ndGggIT09IHdpZHRoKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYXRyaXggc2l6ZSBkb2VzIG5vdCBmaXQnKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgaGVpZ2h0OyArK2kpIHtcclxuICAgICAgICBmb3IgKGogPSAwOyBqIDwgd2lkdGg7ICsraikge1xyXG4gICAgICAgICAgICBpZiAobWF0cml4W2ldW2pdKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAwLCBmYWxzZSwgbnVsbCB3aWxsIGJlIHdhbGthYmxlXHJcbiAgICAgICAgICAgICAgICAvLyB3aGlsZSBvdGhlcnMgd2lsbCBiZSB1bi13YWxrYWJsZVxyXG4gICAgICAgICAgICAgICAgbm9kZXNbaV1bal0ud2Fsa2FibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbm9kZXM7XHJcbn07XHJcblxyXG5cclxuR3JpZC5wcm90b3R5cGUuZ2V0Tm9kZUF0ID0gZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZXNbeV1beF07XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIERldGVybWluZSB3aGV0aGVyIHRoZSBub2RlIGF0IHRoZSBnaXZlbiBwb3NpdGlvbiBpcyB3YWxrYWJsZS5cclxuICogKEFsc28gcmV0dXJucyBmYWxzZSBpZiB0aGUgcG9zaXRpb24gaXMgb3V0c2lkZSB0aGUgZ3JpZC4pXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gVGhlIHggY29vcmRpbmF0ZSBvZiB0aGUgbm9kZS5cclxuICogQHBhcmFtIHtudW1iZXJ9IHkgLSBUaGUgeSBjb29yZGluYXRlIG9mIHRoZSBub2RlLlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSAtIFRoZSB3YWxrYWJpbGl0eSBvZiB0aGUgbm9kZS5cclxuICovXHJcbkdyaWQucHJvdG90eXBlLmlzV2Fsa2FibGVBdCA9IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgIHJldHVybiB0aGlzLmlzSW5zaWRlKHgsIHkpICYmIHRoaXMubm9kZXNbeV1beF0ud2Fsa2FibGU7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIERldGVybWluZSB3aGV0aGVyIHRoZSBwb3NpdGlvbiBpcyBpbnNpZGUgdGhlIGdyaWQuXHJcbiAqIFhYWDogYGdyaWQuaXNJbnNpZGUoeCwgeSlgIGlzIHdpZXJkIHRvIHJlYWQuXHJcbiAqIEl0IHNob3VsZCBiZSBgKHgsIHkpIGlzIGluc2lkZSBncmlkYCwgYnV0IEkgZmFpbGVkIHRvIGZpbmQgYSBiZXR0ZXJcclxuICogbmFtZSBmb3IgdGhpcyBtZXRob2QuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB5XHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqL1xyXG5HcmlkLnByb3RvdHlwZS5pc0luc2lkZSA9IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgIHJldHVybiAoeCA+PSAwICYmIHggPCB0aGlzLndpZHRoKSAmJiAoeSA+PSAwICYmIHkgPCB0aGlzLmhlaWdodCk7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIFNldCB3aGV0aGVyIHRoZSBub2RlIG9uIHRoZSBnaXZlbiBwb3NpdGlvbiBpcyB3YWxrYWJsZS5cclxuICogTk9URTogdGhyb3dzIGV4Y2VwdGlvbiBpZiB0aGUgY29vcmRpbmF0ZSBpcyBub3QgaW5zaWRlIHRoZSBncmlkLlxyXG4gKiBAcGFyYW0ge251bWJlcn0geCAtIFRoZSB4IGNvb3JkaW5hdGUgb2YgdGhlIG5vZGUuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gVGhlIHkgY29vcmRpbmF0ZSBvZiB0aGUgbm9kZS5cclxuICogQHBhcmFtIHtib29sZWFufSB3YWxrYWJsZSAtIFdoZXRoZXIgdGhlIHBvc2l0aW9uIGlzIHdhbGthYmxlLlxyXG4gKi9cclxuR3JpZC5wcm90b3R5cGUuc2V0V2Fsa2FibGVBdCA9IGZ1bmN0aW9uKHgsIHksIHdhbGthYmxlKSB7XHJcbiAgICB0aGlzLm5vZGVzW3ldW3hdLndhbGthYmxlID0gd2Fsa2FibGU7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgbmVpZ2hib3JzIG9mIHRoZSBnaXZlbiBub2RlLlxyXG4gKlxyXG4gKiAgICAgb2Zmc2V0cyAgICAgIGRpYWdvbmFsT2Zmc2V0czpcclxuICogICstLS0rLS0tKy0tLSsgICAgKy0tLSstLS0rLS0tK1xyXG4gKiAgfCAgIHwgMCB8ICAgfCAgICB8IDAgfCAgIHwgMSB8XHJcbiAqICArLS0tKy0tLSstLS0rICAgICstLS0rLS0tKy0tLStcclxuICogIHwgMyB8ICAgfCAxIHwgICAgfCAgIHwgICB8ICAgfFxyXG4gKiAgKy0tLSstLS0rLS0tKyAgICArLS0tKy0tLSstLS0rXHJcbiAqICB8ICAgfCAyIHwgICB8ICAgIHwgMyB8ICAgfCAyIHxcclxuICogICstLS0rLS0tKy0tLSsgICAgKy0tLSstLS0rLS0tK1xyXG4gKlxyXG4gKiAgV2hlbiBhbGxvd0RpYWdvbmFsIGlzIHRydWUsIGlmIG9mZnNldHNbaV0gaXMgdmFsaWQsIHRoZW5cclxuICogIGRpYWdvbmFsT2Zmc2V0c1tpXSBhbmRcclxuICogIGRpYWdvbmFsT2Zmc2V0c1soaSArIDEpICUgNF0gaXMgdmFsaWQuXHJcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxyXG4gKiBAcGFyYW0ge0RpYWdvbmFsTW92ZW1lbnR9IGRpYWdvbmFsTW92ZW1lbnRcclxuICovXHJcbkdyaWQucHJvdG90eXBlLmdldE5laWdoYm9ycyA9IGZ1bmN0aW9uKG5vZGUsIGRpYWdvbmFsTW92ZW1lbnQpIHtcclxuICAgIHZhciB4ID0gbm9kZS54LFxyXG4gICAgICAgIHkgPSBub2RlLnksXHJcbiAgICAgICAgbmVpZ2hib3JzID0gW10sXHJcbiAgICAgICAgczAgPSBmYWxzZSwgZDAgPSBmYWxzZSxcclxuICAgICAgICBzMSA9IGZhbHNlLCBkMSA9IGZhbHNlLFxyXG4gICAgICAgIHMyID0gZmFsc2UsIGQyID0gZmFsc2UsXHJcbiAgICAgICAgczMgPSBmYWxzZSwgZDMgPSBmYWxzZSxcclxuICAgICAgICBub2RlcyA9IHRoaXMubm9kZXM7XHJcblxyXG4gICAgLy8g4oaRXHJcbiAgICBpZiAodGhpcy5pc1dhbGthYmxlQXQoeCwgeSAtIDEpKSB7XHJcbiAgICAgICAgbmVpZ2hib3JzLnB1c2gobm9kZXNbeSAtIDFdW3hdKTtcclxuICAgICAgICBzMCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICAvLyDihpJcclxuICAgIGlmICh0aGlzLmlzV2Fsa2FibGVBdCh4ICsgMSwgeSkpIHtcclxuICAgICAgICBuZWlnaGJvcnMucHVzaChub2Rlc1t5XVt4ICsgMV0pO1xyXG4gICAgICAgIHMxID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8vIOKGk1xyXG4gICAgaWYgKHRoaXMuaXNXYWxrYWJsZUF0KHgsIHkgKyAxKSkge1xyXG4gICAgICAgIG5laWdoYm9ycy5wdXNoKG5vZGVzW3kgKyAxXVt4XSk7XHJcbiAgICAgICAgczIgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgLy8g4oaQXHJcbiAgICBpZiAodGhpcy5pc1dhbGthYmxlQXQoeCAtIDEsIHkpKSB7XHJcbiAgICAgICAgbmVpZ2hib3JzLnB1c2gobm9kZXNbeV1beCAtIDFdKTtcclxuICAgICAgICBzMyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRpYWdvbmFsTW92ZW1lbnQgPT09IERpYWdvbmFsTW92ZW1lbnQuTmV2ZXIpIHtcclxuICAgICAgICByZXR1cm4gbmVpZ2hib3JzO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkaWFnb25hbE1vdmVtZW50ID09PSBEaWFnb25hbE1vdmVtZW50Lk9ubHlXaGVuTm9PYnN0YWNsZXMpIHtcclxuICAgICAgICBkMCA9IHMzICYmIHMwO1xyXG4gICAgICAgIGQxID0gczAgJiYgczE7XHJcbiAgICAgICAgZDIgPSBzMSAmJiBzMjtcclxuICAgICAgICBkMyA9IHMyICYmIHMzO1xyXG4gICAgfSBlbHNlIGlmIChkaWFnb25hbE1vdmVtZW50ID09PSBEaWFnb25hbE1vdmVtZW50LklmQXRNb3N0T25lT2JzdGFjbGUpIHtcclxuICAgICAgICBkMCA9IHMzIHx8IHMwO1xyXG4gICAgICAgIGQxID0gczAgfHwgczE7XHJcbiAgICAgICAgZDIgPSBzMSB8fCBzMjtcclxuICAgICAgICBkMyA9IHMyIHx8IHMzO1xyXG4gICAgfSBlbHNlIGlmIChkaWFnb25hbE1vdmVtZW50ID09PSBEaWFnb25hbE1vdmVtZW50LkFsd2F5cykge1xyXG4gICAgICAgIGQwID0gdHJ1ZTtcclxuICAgICAgICBkMSA9IHRydWU7XHJcbiAgICAgICAgZDIgPSB0cnVlO1xyXG4gICAgICAgIGQzID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3QgdmFsdWUgb2YgZGlhZ29uYWxNb3ZlbWVudCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOKGllxyXG4gICAgaWYgKGQwICYmIHRoaXMuaXNXYWxrYWJsZUF0KHggLSAxLCB5IC0gMSkpIHtcclxuICAgICAgICBuZWlnaGJvcnMucHVzaChub2Rlc1t5IC0gMV1beCAtIDFdKTtcclxuICAgIH1cclxuICAgIC8vIOKGl1xyXG4gICAgaWYgKGQxICYmIHRoaXMuaXNXYWxrYWJsZUF0KHggKyAxLCB5IC0gMSkpIHtcclxuICAgICAgICBuZWlnaGJvcnMucHVzaChub2Rlc1t5IC0gMV1beCArIDFdKTtcclxuICAgIH1cclxuICAgIC8vIOKGmFxyXG4gICAgaWYgKGQyICYmIHRoaXMuaXNXYWxrYWJsZUF0KHggKyAxLCB5ICsgMSkpIHtcclxuICAgICAgICBuZWlnaGJvcnMucHVzaChub2Rlc1t5ICsgMV1beCArIDFdKTtcclxuICAgIH1cclxuICAgIC8vIOKGmVxyXG4gICAgaWYgKGQzICYmIHRoaXMuaXNXYWxrYWJsZUF0KHggLSAxLCB5ICsgMSkpIHtcclxuICAgICAgICBuZWlnaGJvcnMucHVzaChub2Rlc1t5ICsgMV1beCAtIDFdKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmVpZ2hib3JzO1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBHZXQgYSBjbG9uZSBvZiB0aGlzIGdyaWQuXHJcbiAqIEByZXR1cm4ge0dyaWR9IENsb25lZCBncmlkLlxyXG4gKi9cclxuR3JpZC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBpLCBqLFxyXG5cclxuICAgICAgICB3aWR0aCA9IHRoaXMud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0ID0gdGhpcy5oZWlnaHQsXHJcbiAgICAgICAgdGhpc05vZGVzID0gdGhpcy5ub2RlcyxcclxuXHJcbiAgICAgICAgbmV3R3JpZCA9IG5ldyBHcmlkKHdpZHRoLCBoZWlnaHQpLFxyXG4gICAgICAgIG5ld05vZGVzID0gbmV3IEFycmF5KGhlaWdodCk7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IGhlaWdodDsgKytpKSB7XHJcbiAgICAgICAgbmV3Tm9kZXNbaV0gPSBuZXcgQXJyYXkod2lkdGgpO1xyXG4gICAgICAgIGZvciAoaiA9IDA7IGogPCB3aWR0aDsgKytqKSB7XHJcbiAgICAgICAgICAgIG5ld05vZGVzW2ldW2pdID0gbmV3IE5vZGUoaiwgaSwgdGhpc05vZGVzW2ldW2pdLndhbGthYmxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmV3R3JpZC5ub2RlcyA9IG5ld05vZGVzO1xyXG5cclxuICAgIHJldHVybiBuZXdHcmlkO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHcmlkO1xyXG4iLCIvKipcclxuICogQG5hbWVzcGFjZSBQRi5IZXVyaXN0aWNcclxuICogQGRlc2NyaXB0aW9uIEEgY29sbGVjdGlvbiBvZiBoZXVyaXN0aWMgZnVuY3Rpb25zLlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hbmhhdHRhbiBkaXN0YW5jZS5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gZHggLSBEaWZmZXJlbmNlIGluIHguXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGR5IC0gRGlmZmVyZW5jZSBpbiB5LlxyXG4gICAqIEByZXR1cm4ge251bWJlcn0gZHggKyBkeVxyXG4gICAqL1xyXG4gIG1hbmhhdHRhbjogZnVuY3Rpb24oZHgsIGR5KSB7XHJcbiAgICAgIHJldHVybiBkeCArIGR5O1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIEV1Y2xpZGVhbiBkaXN0YW5jZS5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gZHggLSBEaWZmZXJlbmNlIGluIHguXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGR5IC0gRGlmZmVyZW5jZSBpbiB5LlxyXG4gICAqIEByZXR1cm4ge251bWJlcn0gc3FydChkeCAqIGR4ICsgZHkgKiBkeSlcclxuICAgKi9cclxuICBldWNsaWRlYW46IGZ1bmN0aW9uKGR4LCBkeSkge1xyXG4gICAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBPY3RpbGUgZGlzdGFuY2UuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGR4IC0gRGlmZmVyZW5jZSBpbiB4LlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkeSAtIERpZmZlcmVuY2UgaW4geS5cclxuICAgKiBAcmV0dXJuIHtudW1iZXJ9IHNxcnQoZHggKiBkeCArIGR5ICogZHkpIGZvciBncmlkc1xyXG4gICAqL1xyXG4gIG9jdGlsZTogZnVuY3Rpb24oZHgsIGR5KSB7XHJcbiAgICAgIHZhciBGID0gTWF0aC5TUVJUMiAtIDE7XHJcbiAgICAgIHJldHVybiAoZHggPCBkeSkgPyBGICogZHggKyBkeSA6IEYgKiBkeSArIGR4O1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWJ5c2hldiBkaXN0YW5jZS5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gZHggLSBEaWZmZXJlbmNlIGluIHguXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGR5IC0gRGlmZmVyZW5jZSBpbiB5LlxyXG4gICAqIEByZXR1cm4ge251bWJlcn0gbWF4KGR4LCBkeSlcclxuICAgKi9cclxuICBjaGVieXNoZXY6IGZ1bmN0aW9uKGR4LCBkeSkge1xyXG4gICAgICByZXR1cm4gTWF0aC5tYXgoZHgsIGR5KTtcclxuICB9XHJcblxyXG59O1xyXG4iLCIvKipcclxuICogQSBub2RlIGluIGdyaWQuIFxyXG4gKiBUaGlzIGNsYXNzIGhvbGRzIHNvbWUgYmFzaWMgaW5mb3JtYXRpb24gYWJvdXQgYSBub2RlIGFuZCBjdXN0b20gXHJcbiAqIGF0dHJpYnV0ZXMgbWF5IGJlIGFkZGVkLCBkZXBlbmRpbmcgb24gdGhlIGFsZ29yaXRobXMnIG5lZWRzLlxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtudW1iZXJ9IHggLSBUaGUgeCBjb29yZGluYXRlIG9mIHRoZSBub2RlIG9uIHRoZSBncmlkLlxyXG4gKiBAcGFyYW0ge251bWJlcn0geSAtIFRoZSB5IGNvb3JkaW5hdGUgb2YgdGhlIG5vZGUgb24gdGhlIGdyaWQuXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3dhbGthYmxlXSAtIFdoZXRoZXIgdGhpcyBub2RlIGlzIHdhbGthYmxlLlxyXG4gKi9cclxuZnVuY3Rpb24gTm9kZSh4LCB5LCB3YWxrYWJsZSkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgeCBjb29yZGluYXRlIG9mIHRoZSBub2RlIG9uIHRoZSBncmlkLlxyXG4gICAgICogQHR5cGUgbnVtYmVyXHJcbiAgICAgKi9cclxuICAgIHRoaXMueCA9IHg7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSB5IGNvb3JkaW5hdGUgb2YgdGhlIG5vZGUgb24gdGhlIGdyaWQuXHJcbiAgICAgKiBAdHlwZSBudW1iZXJcclxuICAgICAqL1xyXG4gICAgdGhpcy55ID0geTtcclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciB0aGlzIG5vZGUgY2FuIGJlIHdhbGtlZCB0aHJvdWdoLlxyXG4gICAgICogQHR5cGUgYm9vbGVhblxyXG4gICAgICovXHJcbiAgICB0aGlzLndhbGthYmxlID0gKHdhbGthYmxlID09PSB1bmRlZmluZWQgPyB0cnVlIDogd2Fsa2FibGUpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE5vZGU7XHJcbiIsIi8qKlxyXG4gKiBCYWNrdHJhY2UgYWNjb3JkaW5nIHRvIHRoZSBwYXJlbnQgcmVjb3JkcyBhbmQgcmV0dXJuIHRoZSBwYXRoLlxyXG4gKiAoaW5jbHVkaW5nIGJvdGggc3RhcnQgYW5kIGVuZCBub2RlcylcclxuICogQHBhcmFtIHtOb2RlfSBub2RlIEVuZCBub2RlXHJcbiAqIEByZXR1cm4ge0FycmF5PEFycmF5PG51bWJlcj4+fSB0aGUgcGF0aFxyXG4gKi9cclxuZnVuY3Rpb24gYmFja3RyYWNlKG5vZGUpIHtcclxuICAgIHZhciBwYXRoID0gW1tub2RlLngsIG5vZGUueV1dO1xyXG4gICAgd2hpbGUgKG5vZGUucGFyZW50KSB7XHJcbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50O1xyXG4gICAgICAgIHBhdGgucHVzaChbbm9kZS54LCBub2RlLnldKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXRoLnJldmVyc2UoKTtcclxufVxyXG5leHBvcnRzLmJhY2t0cmFjZSA9IGJhY2t0cmFjZTtcclxuXHJcbi8qKlxyXG4gKiBCYWNrdHJhY2UgZnJvbSBzdGFydCBhbmQgZW5kIG5vZGUsIGFuZCByZXR1cm4gdGhlIHBhdGguXHJcbiAqIChpbmNsdWRpbmcgYm90aCBzdGFydCBhbmQgZW5kIG5vZGVzKVxyXG4gKiBAcGFyYW0ge05vZGV9XHJcbiAqIEBwYXJhbSB7Tm9kZX1cclxuICovXHJcbmZ1bmN0aW9uIGJpQmFja3RyYWNlKG5vZGVBLCBub2RlQikge1xyXG4gICAgdmFyIHBhdGhBID0gYmFja3RyYWNlKG5vZGVBKSxcclxuICAgICAgICBwYXRoQiA9IGJhY2t0cmFjZShub2RlQik7XHJcbiAgICByZXR1cm4gcGF0aEEuY29uY2F0KHBhdGhCLnJldmVyc2UoKSk7XHJcbn1cclxuZXhwb3J0cy5iaUJhY2t0cmFjZSA9IGJpQmFja3RyYWNlO1xyXG5cclxuLyoqXHJcbiAqIENvbXB1dGUgdGhlIGxlbmd0aCBvZiB0aGUgcGF0aC5cclxuICogQHBhcmFtIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gcGF0aCBUaGUgcGF0aFxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBsZW5ndGggb2YgdGhlIHBhdGhcclxuICovXHJcbmZ1bmN0aW9uIHBhdGhMZW5ndGgocGF0aCkge1xyXG4gICAgdmFyIGksIHN1bSA9IDAsIGEsIGIsIGR4LCBkeTtcclxuICAgIGZvciAoaSA9IDE7IGkgPCBwYXRoLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgYSA9IHBhdGhbaSAtIDFdO1xyXG4gICAgICAgIGIgPSBwYXRoW2ldO1xyXG4gICAgICAgIGR4ID0gYVswXSAtIGJbMF07XHJcbiAgICAgICAgZHkgPSBhWzFdIC0gYlsxXTtcclxuICAgICAgICBzdW0gKz0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdW07XHJcbn1cclxuZXhwb3J0cy5wYXRoTGVuZ3RoID0gcGF0aExlbmd0aDtcclxuXHJcblxyXG4vKipcclxuICogR2l2ZW4gdGhlIHN0YXJ0IGFuZCBlbmQgY29vcmRpbmF0ZXMsIHJldHVybiBhbGwgdGhlIGNvb3JkaW5hdGVzIGx5aW5nXHJcbiAqIG9uIHRoZSBsaW5lIGZvcm1lZCBieSB0aGVzZSBjb29yZGluYXRlcywgYmFzZWQgb24gQnJlc2VuaGFtJ3MgYWxnb3JpdGhtLlxyXG4gKiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0JyZXNlbmhhbSdzX2xpbmVfYWxnb3JpdGhtI1NpbXBsaWZpY2F0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB4MCBTdGFydCB4IGNvb3JkaW5hdGVcclxuICogQHBhcmFtIHtudW1iZXJ9IHkwIFN0YXJ0IHkgY29vcmRpbmF0ZVxyXG4gKiBAcGFyYW0ge251bWJlcn0geDEgRW5kIHggY29vcmRpbmF0ZVxyXG4gKiBAcGFyYW0ge251bWJlcn0geTEgRW5kIHkgY29vcmRpbmF0ZVxyXG4gKiBAcmV0dXJuIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gVGhlIGNvb3JkaW5hdGVzIG9uIHRoZSBsaW5lXHJcbiAqL1xyXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZSh4MCwgeTAsIHgxLCB5MSkge1xyXG4gICAgdmFyIGFicyA9IE1hdGguYWJzLFxyXG4gICAgICAgIGxpbmUgPSBbXSxcclxuICAgICAgICBzeCwgc3ksIGR4LCBkeSwgZXJyLCBlMjtcclxuXHJcbiAgICBkeCA9IGFicyh4MSAtIHgwKTtcclxuICAgIGR5ID0gYWJzKHkxIC0geTApO1xyXG5cclxuICAgIHN4ID0gKHgwIDwgeDEpID8gMSA6IC0xO1xyXG4gICAgc3kgPSAoeTAgPCB5MSkgPyAxIDogLTE7XHJcblxyXG4gICAgZXJyID0gZHggLSBkeTtcclxuXHJcbiAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgIGxpbmUucHVzaChbeDAsIHkwXSk7XHJcblxyXG4gICAgICAgIGlmICh4MCA9PT0geDEgJiYgeTAgPT09IHkxKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBlMiA9IDIgKiBlcnI7XHJcbiAgICAgICAgaWYgKGUyID4gLWR5KSB7XHJcbiAgICAgICAgICAgIGVyciA9IGVyciAtIGR5O1xyXG4gICAgICAgICAgICB4MCA9IHgwICsgc3g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlMiA8IGR4KSB7XHJcbiAgICAgICAgICAgIGVyciA9IGVyciArIGR4O1xyXG4gICAgICAgICAgICB5MCA9IHkwICsgc3k7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsaW5lO1xyXG59XHJcbmV4cG9ydHMuaW50ZXJwb2xhdGUgPSBpbnRlcnBvbGF0ZTtcclxuXHJcblxyXG4vKipcclxuICogR2l2ZW4gYSBjb21wcmVzc2VkIHBhdGgsIHJldHVybiBhIG5ldyBwYXRoIHRoYXQgaGFzIGFsbCB0aGUgc2VnbWVudHNcclxuICogaW4gaXQgaW50ZXJwb2xhdGVkLlxyXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PG51bWJlcj4+fSBwYXRoIFRoZSBwYXRoXHJcbiAqIEByZXR1cm4ge0FycmF5PEFycmF5PG51bWJlcj4+fSBleHBhbmRlZCBwYXRoXHJcbiAqL1xyXG5mdW5jdGlvbiBleHBhbmRQYXRoKHBhdGgpIHtcclxuICAgIHZhciBleHBhbmRlZCA9IFtdLFxyXG4gICAgICAgIGxlbiA9IHBhdGgubGVuZ3RoLFxyXG4gICAgICAgIGNvb3JkMCwgY29vcmQxLFxyXG4gICAgICAgIGludGVycG9sYXRlZCxcclxuICAgICAgICBpbnRlcnBvbGF0ZWRMZW4sXHJcbiAgICAgICAgaSwgajtcclxuXHJcbiAgICBpZiAobGVuIDwgMikge1xyXG4gICAgICAgIHJldHVybiBleHBhbmRlZDtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuIC0gMTsgKytpKSB7XHJcbiAgICAgICAgY29vcmQwID0gcGF0aFtpXTtcclxuICAgICAgICBjb29yZDEgPSBwYXRoW2kgKyAxXTtcclxuXHJcbiAgICAgICAgaW50ZXJwb2xhdGVkID0gaW50ZXJwb2xhdGUoY29vcmQwWzBdLCBjb29yZDBbMV0sIGNvb3JkMVswXSwgY29vcmQxWzFdKTtcclxuICAgICAgICBpbnRlcnBvbGF0ZWRMZW4gPSBpbnRlcnBvbGF0ZWQubGVuZ3RoO1xyXG4gICAgICAgIGZvciAoaiA9IDA7IGogPCBpbnRlcnBvbGF0ZWRMZW4gLSAxOyArK2opIHtcclxuICAgICAgICAgICAgZXhwYW5kZWQucHVzaChpbnRlcnBvbGF0ZWRbal0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cGFuZGVkLnB1c2gocGF0aFtsZW4gLSAxXSk7XHJcblxyXG4gICAgcmV0dXJuIGV4cGFuZGVkO1xyXG59XHJcbmV4cG9ydHMuZXhwYW5kUGF0aCA9IGV4cGFuZFBhdGg7XHJcblxyXG5cclxuLyoqXHJcbiAqIFNtb290aGVuIHRoZSBnaXZlIHBhdGguXHJcbiAqIFRoZSBvcmlnaW5hbCBwYXRoIHdpbGwgbm90IGJlIG1vZGlmaWVkOyBhIG5ldyBwYXRoIHdpbGwgYmUgcmV0dXJuZWQuXHJcbiAqIEBwYXJhbSB7UEYuR3JpZH0gZ3JpZFxyXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PG51bWJlcj4+fSBwYXRoIFRoZSBwYXRoXHJcbiAqL1xyXG5mdW5jdGlvbiBzbW9vdGhlblBhdGgoZ3JpZCwgcGF0aCkge1xyXG4gICAgdmFyIGxlbiA9IHBhdGgubGVuZ3RoLFxyXG4gICAgICAgIHgwID0gcGF0aFswXVswXSwgICAgICAgIC8vIHBhdGggc3RhcnQgeFxyXG4gICAgICAgIHkwID0gcGF0aFswXVsxXSwgICAgICAgIC8vIHBhdGggc3RhcnQgeVxyXG4gICAgICAgIHgxID0gcGF0aFtsZW4gLSAxXVswXSwgIC8vIHBhdGggZW5kIHhcclxuICAgICAgICB5MSA9IHBhdGhbbGVuIC0gMV1bMV0sICAvLyBwYXRoIGVuZCB5XHJcbiAgICAgICAgc3gsIHN5LCAgICAgICAgICAgICAgICAgLy8gY3VycmVudCBzdGFydCBjb29yZGluYXRlXHJcbiAgICAgICAgZXgsIGV5LCAgICAgICAgICAgICAgICAgLy8gY3VycmVudCBlbmQgY29vcmRpbmF0ZVxyXG4gICAgICAgIG5ld1BhdGgsXHJcbiAgICAgICAgaSwgaiwgY29vcmQsIGxpbmUsIHRlc3RDb29yZCwgYmxvY2tlZDtcclxuXHJcbiAgICBzeCA9IHgwO1xyXG4gICAgc3kgPSB5MDtcclxuICAgIG5ld1BhdGggPSBbW3N4LCBzeV1dO1xyXG5cclxuICAgIGZvciAoaSA9IDI7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgIGNvb3JkID0gcGF0aFtpXTtcclxuICAgICAgICBleCA9IGNvb3JkWzBdO1xyXG4gICAgICAgIGV5ID0gY29vcmRbMV07XHJcbiAgICAgICAgbGluZSA9IGludGVycG9sYXRlKHN4LCBzeSwgZXgsIGV5KTtcclxuXHJcbiAgICAgICAgYmxvY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAoaiA9IDE7IGogPCBsaW5lLmxlbmd0aDsgKytqKSB7XHJcbiAgICAgICAgICAgIHRlc3RDb29yZCA9IGxpbmVbal07XHJcblxyXG4gICAgICAgICAgICBpZiAoIWdyaWQuaXNXYWxrYWJsZUF0KHRlc3RDb29yZFswXSwgdGVzdENvb3JkWzFdKSkge1xyXG4gICAgICAgICAgICAgICAgYmxvY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYmxvY2tlZCkge1xyXG4gICAgICAgICAgICBsYXN0VmFsaWRDb29yZCA9IHBhdGhbaSAtIDFdO1xyXG4gICAgICAgICAgICBuZXdQYXRoLnB1c2gobGFzdFZhbGlkQ29vcmQpO1xyXG4gICAgICAgICAgICBzeCA9IGxhc3RWYWxpZENvb3JkWzBdO1xyXG4gICAgICAgICAgICBzeSA9IGxhc3RWYWxpZENvb3JkWzFdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG5ld1BhdGgucHVzaChbeDEsIHkxXSk7XHJcblxyXG4gICAgcmV0dXJuIG5ld1BhdGg7XHJcbn1cclxuZXhwb3J0cy5zbW9vdGhlblBhdGggPSBzbW9vdGhlblBhdGg7XHJcblxyXG5cclxuLyoqXHJcbiAqIENvbXByZXNzIGEgcGF0aCwgcmVtb3ZlIHJlZHVuZGFudCBub2RlcyB3aXRob3V0IGFsdGVyaW5nIHRoZSBzaGFwZVxyXG4gKiBUaGUgb3JpZ2luYWwgcGF0aCBpcyBub3QgbW9kaWZpZWRcclxuICogQHBhcmFtIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gcGF0aCBUaGUgcGF0aFxyXG4gKiBAcmV0dXJuIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gVGhlIGNvbXByZXNzZWQgcGF0aFxyXG4gKi9cclxuZnVuY3Rpb24gY29tcHJlc3NQYXRoKHBhdGgpIHtcclxuXHJcbiAgICAvLyBub3RoaW5nIHRvIGNvbXByZXNzXHJcbiAgICBpZihwYXRoLmxlbmd0aCA8IDMpIHtcclxuICAgICAgICByZXR1cm4gcGF0aDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgY29tcHJlc3NlZCA9IFtdLFxyXG4gICAgICAgIHN4ID0gcGF0aFswXVswXSwgLy8gc3RhcnQgeFxyXG4gICAgICAgIHN5ID0gcGF0aFswXVsxXSwgLy8gc3RhcnQgeVxyXG4gICAgICAgIHB4ID0gcGF0aFsxXVswXSwgLy8gc2Vjb25kIHBvaW50IHhcclxuICAgICAgICBweSA9IHBhdGhbMV1bMV0sIC8vIHNlY29uZCBwb2ludCB5XHJcbiAgICAgICAgZHggPSBweCAtIHN4LCAvLyBkaXJlY3Rpb24gYmV0d2VlbiB0aGUgdHdvIHBvaW50c1xyXG4gICAgICAgIGR5ID0gcHkgLSBzeSwgLy8gZGlyZWN0aW9uIGJldHdlZW4gdGhlIHR3byBwb2ludHNcclxuICAgICAgICBseCwgbHksXHJcbiAgICAgICAgbGR4LCBsZHksXHJcbiAgICAgICAgc3EsIGk7XHJcblxyXG4gICAgLy8gbm9ybWFsaXplIHRoZSBkaXJlY3Rpb25cclxuICAgIHNxID0gTWF0aC5zcXJ0KGR4KmR4ICsgZHkqZHkpO1xyXG4gICAgZHggLz0gc3E7XHJcbiAgICBkeSAvPSBzcTtcclxuXHJcbiAgICAvLyBzdGFydCB0aGUgbmV3IHBhdGhcclxuICAgIGNvbXByZXNzZWQucHVzaChbc3gsc3ldKTtcclxuXHJcbiAgICBmb3IoaSA9IDI7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgIC8vIHN0b3JlIHRoZSBsYXN0IHBvaW50XHJcbiAgICAgICAgbHggPSBweDtcclxuICAgICAgICBseSA9IHB5O1xyXG5cclxuICAgICAgICAvLyBzdG9yZSB0aGUgbGFzdCBkaXJlY3Rpb25cclxuICAgICAgICBsZHggPSBkeDtcclxuICAgICAgICBsZHkgPSBkeTtcclxuXHJcbiAgICAgICAgLy8gbmV4dCBwb2ludFxyXG4gICAgICAgIHB4ID0gcGF0aFtpXVswXTtcclxuICAgICAgICBweSA9IHBhdGhbaV1bMV07XHJcblxyXG4gICAgICAgIC8vIG5leHQgZGlyZWN0aW9uXHJcbiAgICAgICAgZHggPSBweCAtIGx4O1xyXG4gICAgICAgIGR5ID0gcHkgLSBseTtcclxuXHJcbiAgICAgICAgLy8gbm9ybWFsaXplXHJcbiAgICAgICAgc3EgPSBNYXRoLnNxcnQoZHgqZHggKyBkeSpkeSk7XHJcbiAgICAgICAgZHggLz0gc3E7XHJcbiAgICAgICAgZHkgLz0gc3E7XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZSBkaXJlY3Rpb24gaGFzIGNoYW5nZWQsIHN0b3JlIHRoZSBwb2ludFxyXG4gICAgICAgIGlmICggZHggIT09IGxkeCB8fCBkeSAhPT0gbGR5ICkge1xyXG4gICAgICAgICAgICBjb21wcmVzc2VkLnB1c2goW2x4LGx5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHN0b3JlIHRoZSBsYXN0IHBvaW50XHJcbiAgICBjb21wcmVzc2VkLnB1c2goW3B4LHB5XSk7XHJcblxyXG4gICAgcmV0dXJuIGNvbXByZXNzZWQ7XHJcbn1cclxuZXhwb3J0cy5jb21wcmVzc1BhdGggPSBjb21wcmVzc1BhdGg7XHJcbiIsInZhciBIZWFwICAgICAgID0gcmVxdWlyZSgnaGVhcCcpO1xyXG52YXIgVXRpbCAgICAgICA9IHJlcXVpcmUoJy4uL2NvcmUvVXRpbCcpO1xyXG52YXIgSGV1cmlzdGljICA9IHJlcXVpcmUoJy4uL2NvcmUvSGV1cmlzdGljJyk7XHJcbnZhciBEaWFnb25hbE1vdmVtZW50ID0gcmVxdWlyZSgnLi4vY29yZS9EaWFnb25hbE1vdmVtZW50Jyk7XHJcblxyXG4vKipcclxuICogQSogcGF0aC1maW5kZXIuIEJhc2VkIHVwb24gaHR0cHM6Ly9naXRodWIuY29tL2Jncmlucy9qYXZhc2NyaXB0LWFzdGFyXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0LmFsbG93RGlhZ29uYWwgV2hldGhlciBkaWFnb25hbCBtb3ZlbWVudCBpcyBhbGxvd2VkLlxyXG4gKiAgICAgRGVwcmVjYXRlZCwgdXNlIGRpYWdvbmFsTW92ZW1lbnQgaW5zdGVhZC5cclxuICogQHBhcmFtIHtib29sZWFufSBvcHQuZG9udENyb3NzQ29ybmVycyBEaXNhbGxvdyBkaWFnb25hbCBtb3ZlbWVudCB0b3VjaGluZyBcclxuICogICAgIGJsb2NrIGNvcm5lcnMuIERlcHJlY2F0ZWQsIHVzZSBkaWFnb25hbE1vdmVtZW50IGluc3RlYWQuXHJcbiAqIEBwYXJhbSB7RGlhZ29uYWxNb3ZlbWVudH0gb3B0LmRpYWdvbmFsTW92ZW1lbnQgQWxsb3dlZCBkaWFnb25hbCBtb3ZlbWVudC5cclxuICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0LmhldXJpc3RpYyBIZXVyaXN0aWMgZnVuY3Rpb24gdG8gZXN0aW1hdGUgdGhlIGRpc3RhbmNlXHJcbiAqICAgICAoZGVmYXVsdHMgdG8gbWFuaGF0dGFuKS5cclxuICogQHBhcmFtIHtudW1iZXJ9IG9wdC53ZWlnaHQgV2VpZ2h0IHRvIGFwcGx5IHRvIHRoZSBoZXVyaXN0aWMgdG8gYWxsb3cgZm9yXHJcbiAqICAgICBzdWJvcHRpbWFsIHBhdGhzLCBpbiBvcmRlciB0byBzcGVlZCB1cCB0aGUgc2VhcmNoLlxyXG4gKi9cclxuZnVuY3Rpb24gQVN0YXJGaW5kZXIob3B0KSB7XHJcbiAgICBvcHQgPSBvcHQgfHwge307XHJcbiAgICB0aGlzLmFsbG93RGlhZ29uYWwgPSBvcHQuYWxsb3dEaWFnb25hbDtcclxuICAgIHRoaXMuZG9udENyb3NzQ29ybmVycyA9IG9wdC5kb250Q3Jvc3NDb3JuZXJzO1xyXG4gICAgdGhpcy5oZXVyaXN0aWMgPSBvcHQuaGV1cmlzdGljIHx8IEhldXJpc3RpYy5tYW5oYXR0YW47XHJcbiAgICB0aGlzLndlaWdodCA9IG9wdC53ZWlnaHQgfHwgMTtcclxuICAgIHRoaXMuZGlhZ29uYWxNb3ZlbWVudCA9IG9wdC5kaWFnb25hbE1vdmVtZW50O1xyXG5cclxuICAgIGlmICghdGhpcy5kaWFnb25hbE1vdmVtZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmFsbG93RGlhZ29uYWwpIHtcclxuICAgICAgICAgICAgdGhpcy5kaWFnb25hbE1vdmVtZW50ID0gRGlhZ29uYWxNb3ZlbWVudC5OZXZlcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kb250Q3Jvc3NDb3JuZXJzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWdvbmFsTW92ZW1lbnQgPSBEaWFnb25hbE1vdmVtZW50Lk9ubHlXaGVuTm9PYnN0YWNsZXM7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWdvbmFsTW92ZW1lbnQgPSBEaWFnb25hbE1vdmVtZW50LklmQXRNb3N0T25lT2JzdGFjbGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gV2hlbiBkaWFnb25hbCBtb3ZlbWVudCBpcyBhbGxvd2VkIHRoZSBtYW5oYXR0YW4gaGV1cmlzdGljIGlzIG5vdFxyXG4gICAgLy9hZG1pc3NpYmxlLiBJdCBzaG91bGQgYmUgb2N0aWxlIGluc3RlYWRcclxuICAgIGlmICh0aGlzLmRpYWdvbmFsTW92ZW1lbnQgPT09IERpYWdvbmFsTW92ZW1lbnQuTmV2ZXIpIHtcclxuICAgICAgICB0aGlzLmhldXJpc3RpYyA9IG9wdC5oZXVyaXN0aWMgfHwgSGV1cmlzdGljLm1hbmhhdHRhbjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5oZXVyaXN0aWMgPSBvcHQuaGV1cmlzdGljIHx8IEhldXJpc3RpYy5vY3RpbGU7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGaW5kIGFuZCByZXR1cm4gdGhlIHRoZSBwYXRoLlxyXG4gKiBAcmV0dXJuIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gVGhlIHBhdGgsIGluY2x1ZGluZyBib3RoIHN0YXJ0IGFuZFxyXG4gKiAgICAgZW5kIHBvc2l0aW9ucy5cclxuICovXHJcbkFTdGFyRmluZGVyLnByb3RvdHlwZS5maW5kUGF0aCA9IGZ1bmN0aW9uKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLCBncmlkKSB7XHJcbiAgICB2YXIgb3Blbkxpc3QgPSBuZXcgSGVhcChmdW5jdGlvbihub2RlQSwgbm9kZUIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGVBLmYgLSBub2RlQi5mO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHN0YXJ0Tm9kZSA9IGdyaWQuZ2V0Tm9kZUF0KHN0YXJ0WCwgc3RhcnRZKSxcclxuICAgICAgICBlbmROb2RlID0gZ3JpZC5nZXROb2RlQXQoZW5kWCwgZW5kWSksXHJcbiAgICAgICAgaGV1cmlzdGljID0gdGhpcy5oZXVyaXN0aWMsXHJcbiAgICAgICAgZGlhZ29uYWxNb3ZlbWVudCA9IHRoaXMuZGlhZ29uYWxNb3ZlbWVudCxcclxuICAgICAgICB3ZWlnaHQgPSB0aGlzLndlaWdodCxcclxuICAgICAgICBhYnMgPSBNYXRoLmFicywgU1FSVDIgPSBNYXRoLlNRUlQyLFxyXG4gICAgICAgIG5vZGUsIG5laWdoYm9ycywgbmVpZ2hib3IsIGksIGwsIHgsIHksIG5nO1xyXG5cclxuICAgIC8vIHNldCB0aGUgYGdgIGFuZCBgZmAgdmFsdWUgb2YgdGhlIHN0YXJ0IG5vZGUgdG8gYmUgMFxyXG4gICAgc3RhcnROb2RlLmcgPSAwO1xyXG4gICAgc3RhcnROb2RlLmYgPSAwO1xyXG5cclxuICAgIC8vIHB1c2ggdGhlIHN0YXJ0IG5vZGUgaW50byB0aGUgb3BlbiBsaXN0XHJcbiAgICBvcGVuTGlzdC5wdXNoKHN0YXJ0Tm9kZSk7XHJcbiAgICBzdGFydE5vZGUub3BlbmVkID0gdHJ1ZTtcclxuXHJcbiAgICAvLyB3aGlsZSB0aGUgb3BlbiBsaXN0IGlzIG5vdCBlbXB0eVxyXG4gICAgd2hpbGUgKCFvcGVuTGlzdC5lbXB0eSgpKSB7XHJcbiAgICAgICAgLy8gcG9wIHRoZSBwb3NpdGlvbiBvZiBub2RlIHdoaWNoIGhhcyB0aGUgbWluaW11bSBgZmAgdmFsdWUuXHJcbiAgICAgICAgbm9kZSA9IG9wZW5MaXN0LnBvcCgpO1xyXG4gICAgICAgIG5vZGUuY2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gaWYgcmVhY2hlZCB0aGUgZW5kIHBvc2l0aW9uLCBjb25zdHJ1Y3QgdGhlIHBhdGggYW5kIHJldHVybiBpdFxyXG4gICAgICAgIGlmIChub2RlID09PSBlbmROb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBVdGlsLmJhY2t0cmFjZShlbmROb2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdldCBuZWlnYm91cnMgb2YgdGhlIGN1cnJlbnQgbm9kZVxyXG4gICAgICAgIG5laWdoYm9ycyA9IGdyaWQuZ2V0TmVpZ2hib3JzKG5vZGUsIGRpYWdvbmFsTW92ZW1lbnQpO1xyXG4gICAgICAgIGZvciAoaSA9IDAsIGwgPSBuZWlnaGJvcnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XHJcbiAgICAgICAgICAgIG5laWdoYm9yID0gbmVpZ2hib3JzW2ldO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5laWdoYm9yLmNsb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHggPSBuZWlnaGJvci54O1xyXG4gICAgICAgICAgICB5ID0gbmVpZ2hib3IueTtcclxuXHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgZGlzdGFuY2UgYmV0d2VlbiBjdXJyZW50IG5vZGUgYW5kIHRoZSBuZWlnaGJvclxyXG4gICAgICAgICAgICAvLyBhbmQgY2FsY3VsYXRlIHRoZSBuZXh0IGcgc2NvcmVcclxuICAgICAgICAgICAgbmcgPSBub2RlLmcgKyAoKHggLSBub2RlLnggPT09IDAgfHwgeSAtIG5vZGUueSA9PT0gMCkgPyAxIDogU1FSVDIpO1xyXG5cclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIG5laWdoYm9yIGhhcyBub3QgYmVlbiBpbnNwZWN0ZWQgeWV0LCBvclxyXG4gICAgICAgICAgICAvLyBjYW4gYmUgcmVhY2hlZCB3aXRoIHNtYWxsZXIgY29zdCBmcm9tIHRoZSBjdXJyZW50IG5vZGVcclxuICAgICAgICAgICAgaWYgKCFuZWlnaGJvci5vcGVuZWQgfHwgbmcgPCBuZWlnaGJvci5nKSB7XHJcbiAgICAgICAgICAgICAgICBuZWlnaGJvci5nID0gbmc7XHJcbiAgICAgICAgICAgICAgICBuZWlnaGJvci5oID0gbmVpZ2hib3IuaCB8fCB3ZWlnaHQgKiBoZXVyaXN0aWMoYWJzKHggLSBlbmRYKSwgYWJzKHkgLSBlbmRZKSk7XHJcbiAgICAgICAgICAgICAgICBuZWlnaGJvci5mID0gbmVpZ2hib3IuZyArIG5laWdoYm9yLmg7XHJcbiAgICAgICAgICAgICAgICBuZWlnaGJvci5wYXJlbnQgPSBub2RlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghbmVpZ2hib3Iub3BlbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3Blbkxpc3QucHVzaChuZWlnaGJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3Iub3BlbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIG5laWdoYm9yIGNhbiBiZSByZWFjaGVkIHdpdGggc21hbGxlciBjb3N0LlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNpbmNlIGl0cyBmIHZhbHVlIGhhcyBiZWVuIHVwZGF0ZWQsIHdlIGhhdmUgdG9cclxuICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgaXRzIHBvc2l0aW9uIGluIHRoZSBvcGVuIGxpc3RcclxuICAgICAgICAgICAgICAgICAgICBvcGVuTGlzdC51cGRhdGVJdGVtKG5laWdoYm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gLy8gZW5kIGZvciBlYWNoIG5laWdoYm9yXHJcbiAgICB9IC8vIGVuZCB3aGlsZSBub3Qgb3BlbiBsaXN0IGVtcHR5XHJcblxyXG4gICAgLy8gZmFpbCB0byBmaW5kIHRoZSBwYXRoXHJcbiAgICByZXR1cm4gW107XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFTdGFyRmluZGVyO1xyXG4iLCJ2YXIgQVN0YXJGaW5kZXIgPSByZXF1aXJlKCcuL0FTdGFyRmluZGVyJyk7XHJcblxyXG4vKipcclxuICogQmVzdC1GaXJzdC1TZWFyY2ggcGF0aC1maW5kZXIuXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAZXh0ZW5kcyBBU3RhckZpbmRlclxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0LmFsbG93RGlhZ29uYWwgV2hldGhlciBkaWFnb25hbCBtb3ZlbWVudCBpcyBhbGxvd2VkLlxyXG4gKiAgICAgRGVwcmVjYXRlZCwgdXNlIGRpYWdvbmFsTW92ZW1lbnQgaW5zdGVhZC5cclxuICogQHBhcmFtIHtib29sZWFufSBvcHQuZG9udENyb3NzQ29ybmVycyBEaXNhbGxvdyBkaWFnb25hbCBtb3ZlbWVudCB0b3VjaGluZ1xyXG4gKiAgICAgYmxvY2sgY29ybmVycy4gRGVwcmVjYXRlZCwgdXNlIGRpYWdvbmFsTW92ZW1lbnQgaW5zdGVhZC5cclxuICogQHBhcmFtIHtEaWFnb25hbE1vdmVtZW50fSBvcHQuZGlhZ29uYWxNb3ZlbWVudCBBbGxvd2VkIGRpYWdvbmFsIG1vdmVtZW50LlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHQuaGV1cmlzdGljIEhldXJpc3RpYyBmdW5jdGlvbiB0byBlc3RpbWF0ZSB0aGUgZGlzdGFuY2VcclxuICogICAgIChkZWZhdWx0cyB0byBtYW5oYXR0YW4pLlxyXG4gKi9cclxuZnVuY3Rpb24gQmVzdEZpcnN0RmluZGVyKG9wdCkge1xyXG4gICAgQVN0YXJGaW5kZXIuY2FsbCh0aGlzLCBvcHQpO1xyXG5cclxuICAgIHZhciBvcmlnID0gdGhpcy5oZXVyaXN0aWM7XHJcbiAgICB0aGlzLmhldXJpc3RpYyA9IGZ1bmN0aW9uKGR4LCBkeSkge1xyXG4gICAgICAgIHJldHVybiBvcmlnKGR4LCBkeSkgKiAxMDAwMDAwO1xyXG4gICAgfTtcclxufVxyXG5cclxuQmVzdEZpcnN0RmluZGVyLnByb3RvdHlwZSA9IG5ldyBBU3RhckZpbmRlcigpO1xyXG5CZXN0Rmlyc3RGaW5kZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmVzdEZpcnN0RmluZGVyO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCZXN0Rmlyc3RGaW5kZXI7XHJcbiIsInZhciBIZWFwICAgICAgID0gcmVxdWlyZSgnaGVhcCcpO1xyXG52YXIgVXRpbCAgICAgICA9IHJlcXVpcmUoJy4uL2NvcmUvVXRpbCcpO1xyXG52YXIgSGV1cmlzdGljICA9IHJlcXVpcmUoJy4uL2NvcmUvSGV1cmlzdGljJyk7XHJcbnZhciBEaWFnb25hbE1vdmVtZW50ID0gcmVxdWlyZSgnLi4vY29yZS9EaWFnb25hbE1vdmVtZW50Jyk7XHJcblxyXG4vKipcclxuICogQSogcGF0aC1maW5kZXIuXHJcbiAqIGJhc2VkIHVwb24gaHR0cHM6Ly9naXRodWIuY29tL2Jncmlucy9qYXZhc2NyaXB0LWFzdGFyXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0LmFsbG93RGlhZ29uYWwgV2hldGhlciBkaWFnb25hbCBtb3ZlbWVudCBpcyBhbGxvd2VkLlxyXG4gKiAgICAgRGVwcmVjYXRlZCwgdXNlIGRpYWdvbmFsTW92ZW1lbnQgaW5zdGVhZC5cclxuICogQHBhcmFtIHtib29sZWFufSBvcHQuZG9udENyb3NzQ29ybmVycyBEaXNhbGxvdyBkaWFnb25hbCBtb3ZlbWVudCB0b3VjaGluZ1xyXG4gKiAgICAgYmxvY2sgY29ybmVycy4gRGVwcmVjYXRlZCwgdXNlIGRpYWdvbmFsTW92ZW1lbnQgaW5zdGVhZC5cclxuICogQHBhcmFtIHtEaWFnb25hbE1vdmVtZW50fSBvcHQuZGlhZ29uYWxNb3ZlbWVudCBBbGxvd2VkIGRpYWdvbmFsIG1vdmVtZW50LlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHQuaGV1cmlzdGljIEhldXJpc3RpYyBmdW5jdGlvbiB0byBlc3RpbWF0ZSB0aGUgZGlzdGFuY2VcclxuICogICAgIChkZWZhdWx0cyB0byBtYW5oYXR0YW4pLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0LndlaWdodCBXZWlnaHQgdG8gYXBwbHkgdG8gdGhlIGhldXJpc3RpYyB0byBhbGxvdyBmb3JcclxuICogICAgIHN1Ym9wdGltYWwgcGF0aHMsIGluIG9yZGVyIHRvIHNwZWVkIHVwIHRoZSBzZWFyY2guXHJcbiAqL1xyXG5mdW5jdGlvbiBCaUFTdGFyRmluZGVyKG9wdCkge1xyXG4gICAgb3B0ID0gb3B0IHx8IHt9O1xyXG4gICAgdGhpcy5hbGxvd0RpYWdvbmFsID0gb3B0LmFsbG93RGlhZ29uYWw7XHJcbiAgICB0aGlzLmRvbnRDcm9zc0Nvcm5lcnMgPSBvcHQuZG9udENyb3NzQ29ybmVycztcclxuICAgIHRoaXMuZGlhZ29uYWxNb3ZlbWVudCA9IG9wdC5kaWFnb25hbE1vdmVtZW50O1xyXG4gICAgdGhpcy5oZXVyaXN0aWMgPSBvcHQuaGV1cmlzdGljIHx8IEhldXJpc3RpYy5tYW5oYXR0YW47XHJcbiAgICB0aGlzLndlaWdodCA9IG9wdC53ZWlnaHQgfHwgMTtcclxuXHJcbiAgICBpZiAoIXRoaXMuZGlhZ29uYWxNb3ZlbWVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5hbGxvd0RpYWdvbmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlhZ29uYWxNb3ZlbWVudCA9IERpYWdvbmFsTW92ZW1lbnQuTmV2ZXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZG9udENyb3NzQ29ybmVycykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWFnb25hbE1vdmVtZW50ID0gRGlhZ29uYWxNb3ZlbWVudC5Pbmx5V2hlbk5vT2JzdGFjbGVzO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWFnb25hbE1vdmVtZW50ID0gRGlhZ29uYWxNb3ZlbWVudC5JZkF0TW9zdE9uZU9ic3RhY2xlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vV2hlbiBkaWFnb25hbCBtb3ZlbWVudCBpcyBhbGxvd2VkIHRoZSBtYW5oYXR0YW4gaGV1cmlzdGljIGlzIG5vdCBhZG1pc3NpYmxlXHJcbiAgICAvL0l0IHNob3VsZCBiZSBvY3RpbGUgaW5zdGVhZFxyXG4gICAgaWYgKHRoaXMuZGlhZ29uYWxNb3ZlbWVudCA9PT0gRGlhZ29uYWxNb3ZlbWVudC5OZXZlcikge1xyXG4gICAgICAgIHRoaXMuaGV1cmlzdGljID0gb3B0LmhldXJpc3RpYyB8fCBIZXVyaXN0aWMubWFuaGF0dGFuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmhldXJpc3RpYyA9IG9wdC5oZXVyaXN0aWMgfHwgSGV1cmlzdGljLm9jdGlsZTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmQgYW5kIHJldHVybiB0aGUgdGhlIHBhdGguXHJcbiAqIEByZXR1cm4ge0FycmF5PEFycmF5PG51bWJlcj4+fSBUaGUgcGF0aCwgaW5jbHVkaW5nIGJvdGggc3RhcnQgYW5kXHJcbiAqICAgICBlbmQgcG9zaXRpb25zLlxyXG4gKi9cclxuQmlBU3RhckZpbmRlci5wcm90b3R5cGUuZmluZFBhdGggPSBmdW5jdGlvbihzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSwgZ3JpZCkge1xyXG4gICAgdmFyIGNtcCA9IGZ1bmN0aW9uKG5vZGVBLCBub2RlQikge1xyXG4gICAgICAgICAgICByZXR1cm4gbm9kZUEuZiAtIG5vZGVCLmY7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFydE9wZW5MaXN0ID0gbmV3IEhlYXAoY21wKSxcclxuICAgICAgICBlbmRPcGVuTGlzdCA9IG5ldyBIZWFwKGNtcCksXHJcbiAgICAgICAgc3RhcnROb2RlID0gZ3JpZC5nZXROb2RlQXQoc3RhcnRYLCBzdGFydFkpLFxyXG4gICAgICAgIGVuZE5vZGUgPSBncmlkLmdldE5vZGVBdChlbmRYLCBlbmRZKSxcclxuICAgICAgICBoZXVyaXN0aWMgPSB0aGlzLmhldXJpc3RpYyxcclxuICAgICAgICBkaWFnb25hbE1vdmVtZW50ID0gdGhpcy5kaWFnb25hbE1vdmVtZW50LFxyXG4gICAgICAgIHdlaWdodCA9IHRoaXMud2VpZ2h0LFxyXG4gICAgICAgIGFicyA9IE1hdGguYWJzLCBTUVJUMiA9IE1hdGguU1FSVDIsXHJcbiAgICAgICAgbm9kZSwgbmVpZ2hib3JzLCBuZWlnaGJvciwgaSwgbCwgeCwgeSwgbmcsXHJcbiAgICAgICAgQllfU1RBUlQgPSAxLCBCWV9FTkQgPSAyO1xyXG5cclxuICAgIC8vIHNldCB0aGUgYGdgIGFuZCBgZmAgdmFsdWUgb2YgdGhlIHN0YXJ0IG5vZGUgdG8gYmUgMFxyXG4gICAgLy8gYW5kIHB1c2ggaXQgaW50byB0aGUgc3RhcnQgb3BlbiBsaXN0XHJcbiAgICBzdGFydE5vZGUuZyA9IDA7XHJcbiAgICBzdGFydE5vZGUuZiA9IDA7XHJcbiAgICBzdGFydE9wZW5MaXN0LnB1c2goc3RhcnROb2RlKTtcclxuICAgIHN0YXJ0Tm9kZS5vcGVuZWQgPSBCWV9TVEFSVDtcclxuXHJcbiAgICAvLyBzZXQgdGhlIGBnYCBhbmQgYGZgIHZhbHVlIG9mIHRoZSBlbmQgbm9kZSB0byBiZSAwXHJcbiAgICAvLyBhbmQgcHVzaCBpdCBpbnRvIHRoZSBvcGVuIG9wZW4gbGlzdFxyXG4gICAgZW5kTm9kZS5nID0gMDtcclxuICAgIGVuZE5vZGUuZiA9IDA7XHJcbiAgICBlbmRPcGVuTGlzdC5wdXNoKGVuZE5vZGUpO1xyXG4gICAgZW5kTm9kZS5vcGVuZWQgPSBCWV9FTkQ7XHJcblxyXG4gICAgLy8gd2hpbGUgYm90aCB0aGUgb3BlbiBsaXN0cyBhcmUgbm90IGVtcHR5XHJcbiAgICB3aGlsZSAoIXN0YXJ0T3Blbkxpc3QuZW1wdHkoKSAmJiAhZW5kT3Blbkxpc3QuZW1wdHkoKSkge1xyXG5cclxuICAgICAgICAvLyBwb3AgdGhlIHBvc2l0aW9uIG9mIHN0YXJ0IG5vZGUgd2hpY2ggaGFzIHRoZSBtaW5pbXVtIGBmYCB2YWx1ZS5cclxuICAgICAgICBub2RlID0gc3RhcnRPcGVuTGlzdC5wb3AoKTtcclxuICAgICAgICBub2RlLmNsb3NlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIGdldCBuZWlnYm91cnMgb2YgdGhlIGN1cnJlbnQgbm9kZVxyXG4gICAgICAgIG5laWdoYm9ycyA9IGdyaWQuZ2V0TmVpZ2hib3JzKG5vZGUsIGRpYWdvbmFsTW92ZW1lbnQpO1xyXG4gICAgICAgIGZvciAoaSA9IDAsIGwgPSBuZWlnaGJvcnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XHJcbiAgICAgICAgICAgIG5laWdoYm9yID0gbmVpZ2hib3JzW2ldO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5laWdoYm9yLmNsb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5laWdoYm9yLm9wZW5lZCA9PT0gQllfRU5EKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVXRpbC5iaUJhY2t0cmFjZShub2RlLCBuZWlnaGJvcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHggPSBuZWlnaGJvci54O1xyXG4gICAgICAgICAgICB5ID0gbmVpZ2hib3IueTtcclxuXHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgZGlzdGFuY2UgYmV0d2VlbiBjdXJyZW50IG5vZGUgYW5kIHRoZSBuZWlnaGJvclxyXG4gICAgICAgICAgICAvLyBhbmQgY2FsY3VsYXRlIHRoZSBuZXh0IGcgc2NvcmVcclxuICAgICAgICAgICAgbmcgPSBub2RlLmcgKyAoKHggLSBub2RlLnggPT09IDAgfHwgeSAtIG5vZGUueSA9PT0gMCkgPyAxIDogU1FSVDIpO1xyXG5cclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIG5laWdoYm9yIGhhcyBub3QgYmVlbiBpbnNwZWN0ZWQgeWV0LCBvclxyXG4gICAgICAgICAgICAvLyBjYW4gYmUgcmVhY2hlZCB3aXRoIHNtYWxsZXIgY29zdCBmcm9tIHRoZSBjdXJyZW50IG5vZGVcclxuICAgICAgICAgICAgaWYgKCFuZWlnaGJvci5vcGVuZWQgfHwgbmcgPCBuZWlnaGJvci5nKSB7XHJcbiAgICAgICAgICAgICAgICBuZWlnaGJvci5nID0gbmc7XHJcbiAgICAgICAgICAgICAgICBuZWlnaGJvci5oID0gbmVpZ2hib3IuaCB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHdlaWdodCAqIGhldXJpc3RpYyhhYnMoeCAtIGVuZFgpLCBhYnMoeSAtIGVuZFkpKTtcclxuICAgICAgICAgICAgICAgIG5laWdoYm9yLmYgPSBuZWlnaGJvci5nICsgbmVpZ2hib3IuaDtcclxuICAgICAgICAgICAgICAgIG5laWdoYm9yLnBhcmVudCA9IG5vZGU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFuZWlnaGJvci5vcGVuZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydE9wZW5MaXN0LnB1c2gobmVpZ2hib3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5laWdoYm9yLm9wZW5lZCA9IEJZX1NUQVJUO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgbmVpZ2hib3IgY2FuIGJlIHJlYWNoZWQgd2l0aCBzbWFsbGVyIGNvc3QuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2luY2UgaXRzIGYgdmFsdWUgaGFzIGJlZW4gdXBkYXRlZCwgd2UgaGF2ZSB0b1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBpdHMgcG9zaXRpb24gaW4gdGhlIG9wZW4gbGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0T3Blbkxpc3QudXBkYXRlSXRlbShuZWlnaGJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IC8vIGVuZCBmb3IgZWFjaCBuZWlnaGJvclxyXG5cclxuXHJcbiAgICAgICAgLy8gcG9wIHRoZSBwb3NpdGlvbiBvZiBlbmQgbm9kZSB3aGljaCBoYXMgdGhlIG1pbmltdW0gYGZgIHZhbHVlLlxyXG4gICAgICAgIG5vZGUgPSBlbmRPcGVuTGlzdC5wb3AoKTtcclxuICAgICAgICBub2RlLmNsb3NlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIGdldCBuZWlnYm91cnMgb2YgdGhlIGN1cnJlbnQgbm9kZVxyXG4gICAgICAgIG5laWdoYm9ycyA9IGdyaWQuZ2V0TmVpZ2hib3JzKG5vZGUsIGRpYWdvbmFsTW92ZW1lbnQpO1xyXG4gICAgICAgIGZvciAoaSA9IDAsIGwgPSBuZWlnaGJvcnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XHJcbiAgICAgICAgICAgIG5laWdoYm9yID0gbmVpZ2hib3JzW2ldO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5laWdoYm9yLmNsb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5laWdoYm9yLm9wZW5lZCA9PT0gQllfU1RBUlQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBVdGlsLmJpQmFja3RyYWNlKG5laWdoYm9yLCBub2RlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgeCA9IG5laWdoYm9yLng7XHJcbiAgICAgICAgICAgIHkgPSBuZWlnaGJvci55O1xyXG5cclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBkaXN0YW5jZSBiZXR3ZWVuIGN1cnJlbnQgbm9kZSBhbmQgdGhlIG5laWdoYm9yXHJcbiAgICAgICAgICAgIC8vIGFuZCBjYWxjdWxhdGUgdGhlIG5leHQgZyBzY29yZVxyXG4gICAgICAgICAgICBuZyA9IG5vZGUuZyArICgoeCAtIG5vZGUueCA9PT0gMCB8fCB5IC0gbm9kZS55ID09PSAwKSA/IDEgOiBTUVJUMik7XHJcblxyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgbmVpZ2hib3IgaGFzIG5vdCBiZWVuIGluc3BlY3RlZCB5ZXQsIG9yXHJcbiAgICAgICAgICAgIC8vIGNhbiBiZSByZWFjaGVkIHdpdGggc21hbGxlciBjb3N0IGZyb20gdGhlIGN1cnJlbnQgbm9kZVxyXG4gICAgICAgICAgICBpZiAoIW5laWdoYm9yLm9wZW5lZCB8fCBuZyA8IG5laWdoYm9yLmcpIHtcclxuICAgICAgICAgICAgICAgIG5laWdoYm9yLmcgPSBuZztcclxuICAgICAgICAgICAgICAgIG5laWdoYm9yLmggPSBuZWlnaGJvci5oIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgd2VpZ2h0ICogaGV1cmlzdGljKGFicyh4IC0gc3RhcnRYKSwgYWJzKHkgLSBzdGFydFkpKTtcclxuICAgICAgICAgICAgICAgIG5laWdoYm9yLmYgPSBuZWlnaGJvci5nICsgbmVpZ2hib3IuaDtcclxuICAgICAgICAgICAgICAgIG5laWdoYm9yLnBhcmVudCA9IG5vZGU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFuZWlnaGJvci5vcGVuZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbmRPcGVuTGlzdC5wdXNoKG5laWdoYm9yKTtcclxuICAgICAgICAgICAgICAgICAgICBuZWlnaGJvci5vcGVuZWQgPSBCWV9FTkQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBuZWlnaGJvciBjYW4gYmUgcmVhY2hlZCB3aXRoIHNtYWxsZXIgY29zdC5cclxuICAgICAgICAgICAgICAgICAgICAvLyBTaW5jZSBpdHMgZiB2YWx1ZSBoYXMgYmVlbiB1cGRhdGVkLCB3ZSBoYXZlIHRvXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXBkYXRlIGl0cyBwb3NpdGlvbiBpbiB0aGUgb3BlbiBsaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgZW5kT3Blbkxpc3QudXBkYXRlSXRlbShuZWlnaGJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IC8vIGVuZCBmb3IgZWFjaCBuZWlnaGJvclxyXG4gICAgfSAvLyBlbmQgd2hpbGUgbm90IG9wZW4gbGlzdCBlbXB0eVxyXG5cclxuICAgIC8vIGZhaWwgdG8gZmluZCB0aGUgcGF0aFxyXG4gICAgcmV0dXJuIFtdO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCaUFTdGFyRmluZGVyO1xyXG4iLCJ2YXIgQmlBU3RhckZpbmRlciA9IHJlcXVpcmUoJy4vQmlBU3RhckZpbmRlcicpO1xyXG5cclxuLyoqXHJcbiAqIEJpLWRpcmVjaXRpb25hbCBCZXN0LUZpcnN0LVNlYXJjaCBwYXRoLWZpbmRlci5cclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBleHRlbmRzIEJpQVN0YXJGaW5kZXJcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdC5hbGxvd0RpYWdvbmFsIFdoZXRoZXIgZGlhZ29uYWwgbW92ZW1lbnQgaXMgYWxsb3dlZC5cclxuICogICAgIERlcHJlY2F0ZWQsIHVzZSBkaWFnb25hbE1vdmVtZW50IGluc3RlYWQuXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0LmRvbnRDcm9zc0Nvcm5lcnMgRGlzYWxsb3cgZGlhZ29uYWwgbW92ZW1lbnQgdG91Y2hpbmdcclxuICogICAgIGJsb2NrIGNvcm5lcnMuIERlcHJlY2F0ZWQsIHVzZSBkaWFnb25hbE1vdmVtZW50IGluc3RlYWQuXHJcbiAqIEBwYXJhbSB7RGlhZ29uYWxNb3ZlbWVudH0gb3B0LmRpYWdvbmFsTW92ZW1lbnQgQWxsb3dlZCBkaWFnb25hbCBtb3ZlbWVudC5cclxuICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0LmhldXJpc3RpYyBIZXVyaXN0aWMgZnVuY3Rpb24gdG8gZXN0aW1hdGUgdGhlIGRpc3RhbmNlXHJcbiAqICAgICAoZGVmYXVsdHMgdG8gbWFuaGF0dGFuKS5cclxuICovXHJcbmZ1bmN0aW9uIEJpQmVzdEZpcnN0RmluZGVyKG9wdCkge1xyXG4gICAgQmlBU3RhckZpbmRlci5jYWxsKHRoaXMsIG9wdCk7XHJcblxyXG4gICAgdmFyIG9yaWcgPSB0aGlzLmhldXJpc3RpYztcclxuICAgIHRoaXMuaGV1cmlzdGljID0gZnVuY3Rpb24oZHgsIGR5KSB7XHJcbiAgICAgICAgcmV0dXJuIG9yaWcoZHgsIGR5KSAqIDEwMDAwMDA7XHJcbiAgICB9O1xyXG59XHJcblxyXG5CaUJlc3RGaXJzdEZpbmRlci5wcm90b3R5cGUgPSBuZXcgQmlBU3RhckZpbmRlcigpO1xyXG5CaUJlc3RGaXJzdEZpbmRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCaUJlc3RGaXJzdEZpbmRlcjtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQmlCZXN0Rmlyc3RGaW5kZXI7XHJcbiIsInZhciBVdGlsID0gcmVxdWlyZSgnLi4vY29yZS9VdGlsJyk7XHJcbnZhciBEaWFnb25hbE1vdmVtZW50ID0gcmVxdWlyZSgnLi4vY29yZS9EaWFnb25hbE1vdmVtZW50Jyk7XHJcblxyXG4vKipcclxuICogQmktZGlyZWN0aW9uYWwgQnJlYWR0aC1GaXJzdC1TZWFyY2ggcGF0aCBmaW5kZXIuXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0LmFsbG93RGlhZ29uYWwgV2hldGhlciBkaWFnb25hbCBtb3ZlbWVudCBpcyBhbGxvd2VkLlxyXG4gKiAgICAgRGVwcmVjYXRlZCwgdXNlIGRpYWdvbmFsTW92ZW1lbnQgaW5zdGVhZC5cclxuICogQHBhcmFtIHtib29sZWFufSBvcHQuZG9udENyb3NzQ29ybmVycyBEaXNhbGxvdyBkaWFnb25hbCBtb3ZlbWVudCB0b3VjaGluZ1xyXG4gKiAgICAgYmxvY2sgY29ybmVycy4gRGVwcmVjYXRlZCwgdXNlIGRpYWdvbmFsTW92ZW1lbnQgaW5zdGVhZC5cclxuICogQHBhcmFtIHtEaWFnb25hbE1vdmVtZW50fSBvcHQuZGlhZ29uYWxNb3ZlbWVudCBBbGxvd2VkIGRpYWdvbmFsIG1vdmVtZW50LlxyXG4gKi9cclxuZnVuY3Rpb24gQmlCcmVhZHRoRmlyc3RGaW5kZXIob3B0KSB7XHJcbiAgICBvcHQgPSBvcHQgfHwge307XHJcbiAgICB0aGlzLmFsbG93RGlhZ29uYWwgPSBvcHQuYWxsb3dEaWFnb25hbDtcclxuICAgIHRoaXMuZG9udENyb3NzQ29ybmVycyA9IG9wdC5kb250Q3Jvc3NDb3JuZXJzO1xyXG4gICAgdGhpcy5kaWFnb25hbE1vdmVtZW50ID0gb3B0LmRpYWdvbmFsTW92ZW1lbnQ7XHJcblxyXG4gICAgaWYgKCF0aGlzLmRpYWdvbmFsTW92ZW1lbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYWxsb3dEaWFnb25hbCkge1xyXG4gICAgICAgICAgICB0aGlzLmRpYWdvbmFsTW92ZW1lbnQgPSBEaWFnb25hbE1vdmVtZW50Lk5ldmVyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRvbnRDcm9zc0Nvcm5lcnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlhZ29uYWxNb3ZlbWVudCA9IERpYWdvbmFsTW92ZW1lbnQuT25seVdoZW5Ob09ic3RhY2xlcztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlhZ29uYWxNb3ZlbWVudCA9IERpYWdvbmFsTW92ZW1lbnQuSWZBdE1vc3RPbmVPYnN0YWNsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBGaW5kIGFuZCByZXR1cm4gdGhlIHRoZSBwYXRoLlxyXG4gKiBAcmV0dXJuIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gVGhlIHBhdGgsIGluY2x1ZGluZyBib3RoIHN0YXJ0IGFuZFxyXG4gKiAgICAgZW5kIHBvc2l0aW9ucy5cclxuICovXHJcbkJpQnJlYWR0aEZpcnN0RmluZGVyLnByb3RvdHlwZS5maW5kUGF0aCA9IGZ1bmN0aW9uKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLCBncmlkKSB7XHJcbiAgICB2YXIgc3RhcnROb2RlID0gZ3JpZC5nZXROb2RlQXQoc3RhcnRYLCBzdGFydFkpLFxyXG4gICAgICAgIGVuZE5vZGUgPSBncmlkLmdldE5vZGVBdChlbmRYLCBlbmRZKSxcclxuICAgICAgICBzdGFydE9wZW5MaXN0ID0gW10sIGVuZE9wZW5MaXN0ID0gW10sXHJcbiAgICAgICAgbmVpZ2hib3JzLCBuZWlnaGJvciwgbm9kZSxcclxuICAgICAgICBkaWFnb25hbE1vdmVtZW50ID0gdGhpcy5kaWFnb25hbE1vdmVtZW50LFxyXG4gICAgICAgIEJZX1NUQVJUID0gMCwgQllfRU5EID0gMSxcclxuICAgICAgICBpLCBsO1xyXG5cclxuICAgIC8vIHB1c2ggdGhlIHN0YXJ0IGFuZCBlbmQgbm9kZXMgaW50byB0aGUgcXVldWVzXHJcbiAgICBzdGFydE9wZW5MaXN0LnB1c2goc3RhcnROb2RlKTtcclxuICAgIHN0YXJ0Tm9kZS5vcGVuZWQgPSB0cnVlO1xyXG4gICAgc3RhcnROb2RlLmJ5ID0gQllfU1RBUlQ7XHJcblxyXG4gICAgZW5kT3Blbkxpc3QucHVzaChlbmROb2RlKTtcclxuICAgIGVuZE5vZGUub3BlbmVkID0gdHJ1ZTtcclxuICAgIGVuZE5vZGUuYnkgPSBCWV9FTkQ7XHJcblxyXG4gICAgLy8gd2hpbGUgYm90aCB0aGUgcXVldWVzIGFyZSBub3QgZW1wdHlcclxuICAgIHdoaWxlIChzdGFydE9wZW5MaXN0Lmxlbmd0aCAmJiBlbmRPcGVuTGlzdC5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgLy8gZXhwYW5kIHN0YXJ0IG9wZW4gbGlzdFxyXG5cclxuICAgICAgICBub2RlID0gc3RhcnRPcGVuTGlzdC5zaGlmdCgpO1xyXG4gICAgICAgIG5vZGUuY2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgbmVpZ2hib3JzID0gZ3JpZC5nZXROZWlnaGJvcnMobm9kZSwgZGlhZ29uYWxNb3ZlbWVudCk7XHJcbiAgICAgICAgZm9yIChpID0gMCwgbCA9IG5laWdoYm9ycy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcclxuICAgICAgICAgICAgbmVpZ2hib3IgPSBuZWlnaGJvcnNbaV07XHJcblxyXG4gICAgICAgICAgICBpZiAobmVpZ2hib3IuY2xvc2VkKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobmVpZ2hib3Iub3BlbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGlzIG5vZGUgaGFzIGJlZW4gaW5zcGVjdGVkIGJ5IHRoZSByZXZlcnNlZCBzZWFyY2gsXHJcbiAgICAgICAgICAgICAgICAvLyB0aGVuIGEgcGF0aCBpcyBmb3VuZC5cclxuICAgICAgICAgICAgICAgIGlmIChuZWlnaGJvci5ieSA9PT0gQllfRU5EKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFV0aWwuYmlCYWNrdHJhY2Uobm9kZSwgbmVpZ2hib3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RhcnRPcGVuTGlzdC5wdXNoKG5laWdoYm9yKTtcclxuICAgICAgICAgICAgbmVpZ2hib3IucGFyZW50ID0gbm9kZTtcclxuICAgICAgICAgICAgbmVpZ2hib3Iub3BlbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgbmVpZ2hib3IuYnkgPSBCWV9TVEFSVDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGV4cGFuZCBlbmQgb3BlbiBsaXN0XHJcblxyXG4gICAgICAgIG5vZGUgPSBlbmRPcGVuTGlzdC5zaGlmdCgpO1xyXG4gICAgICAgIG5vZGUuY2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgbmVpZ2hib3JzID0gZ3JpZC5nZXROZWlnaGJvcnMobm9kZSwgZGlhZ29uYWxNb3ZlbWVudCk7XHJcbiAgICAgICAgZm9yIChpID0gMCwgbCA9IG5laWdoYm9ycy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcclxuICAgICAgICAgICAgbmVpZ2hib3IgPSBuZWlnaGJvcnNbaV07XHJcblxyXG4gICAgICAgICAgICBpZiAobmVpZ2hib3IuY2xvc2VkKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobmVpZ2hib3Iub3BlbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobmVpZ2hib3IuYnkgPT09IEJZX1NUQVJUKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFV0aWwuYmlCYWNrdHJhY2UobmVpZ2hib3IsIG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZW5kT3Blbkxpc3QucHVzaChuZWlnaGJvcik7XHJcbiAgICAgICAgICAgIG5laWdoYm9yLnBhcmVudCA9IG5vZGU7XHJcbiAgICAgICAgICAgIG5laWdoYm9yLm9wZW5lZCA9IHRydWU7XHJcbiAgICAgICAgICAgIG5laWdoYm9yLmJ5ID0gQllfRU5EO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBmYWlsIHRvIGZpbmQgdGhlIHBhdGhcclxuICAgIHJldHVybiBbXTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQmlCcmVhZHRoRmlyc3RGaW5kZXI7XHJcbiIsInZhciBCaUFTdGFyRmluZGVyID0gcmVxdWlyZSgnLi9CaUFTdGFyRmluZGVyJyk7XHJcblxyXG4vKipcclxuICogQmktZGlyZWN0aW9uYWwgRGlqa3N0cmEgcGF0aC1maW5kZXIuXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAZXh0ZW5kcyBCaUFTdGFyRmluZGVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRcclxuICogQHBhcmFtIHtib29sZWFufSBvcHQuYWxsb3dEaWFnb25hbCBXaGV0aGVyIGRpYWdvbmFsIG1vdmVtZW50IGlzIGFsbG93ZWQuXHJcbiAqICAgICBEZXByZWNhdGVkLCB1c2UgZGlhZ29uYWxNb3ZlbWVudCBpbnN0ZWFkLlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdC5kb250Q3Jvc3NDb3JuZXJzIERpc2FsbG93IGRpYWdvbmFsIG1vdmVtZW50IHRvdWNoaW5nXHJcbiAqICAgICBibG9jayBjb3JuZXJzLiBEZXByZWNhdGVkLCB1c2UgZGlhZ29uYWxNb3ZlbWVudCBpbnN0ZWFkLlxyXG4gKiBAcGFyYW0ge0RpYWdvbmFsTW92ZW1lbnR9IG9wdC5kaWFnb25hbE1vdmVtZW50IEFsbG93ZWQgZGlhZ29uYWwgbW92ZW1lbnQuXHJcbiAqL1xyXG5mdW5jdGlvbiBCaURpamtzdHJhRmluZGVyKG9wdCkge1xyXG4gICAgQmlBU3RhckZpbmRlci5jYWxsKHRoaXMsIG9wdCk7XHJcbiAgICB0aGlzLmhldXJpc3RpYyA9IGZ1bmN0aW9uKGR4LCBkeSkge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfTtcclxufVxyXG5cclxuQmlEaWprc3RyYUZpbmRlci5wcm90b3R5cGUgPSBuZXcgQmlBU3RhckZpbmRlcigpO1xyXG5CaURpamtzdHJhRmluZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJpRGlqa3N0cmFGaW5kZXI7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJpRGlqa3N0cmFGaW5kZXI7XHJcbiIsInZhciBVdGlsID0gcmVxdWlyZSgnLi4vY29yZS9VdGlsJyk7XHJcbnZhciBEaWFnb25hbE1vdmVtZW50ID0gcmVxdWlyZSgnLi4vY29yZS9EaWFnb25hbE1vdmVtZW50Jyk7XHJcblxyXG4vKipcclxuICogQnJlYWR0aC1GaXJzdC1TZWFyY2ggcGF0aCBmaW5kZXIuXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0LmFsbG93RGlhZ29uYWwgV2hldGhlciBkaWFnb25hbCBtb3ZlbWVudCBpcyBhbGxvd2VkLlxyXG4gKiAgICAgRGVwcmVjYXRlZCwgdXNlIGRpYWdvbmFsTW92ZW1lbnQgaW5zdGVhZC5cclxuICogQHBhcmFtIHtib29sZWFufSBvcHQuZG9udENyb3NzQ29ybmVycyBEaXNhbGxvdyBkaWFnb25hbCBtb3ZlbWVudCB0b3VjaGluZ1xyXG4gKiAgICAgYmxvY2sgY29ybmVycy4gRGVwcmVjYXRlZCwgdXNlIGRpYWdvbmFsTW92ZW1lbnQgaW5zdGVhZC5cclxuICogQHBhcmFtIHtEaWFnb25hbE1vdmVtZW50fSBvcHQuZGlhZ29uYWxNb3ZlbWVudCBBbGxvd2VkIGRpYWdvbmFsIG1vdmVtZW50LlxyXG4gKi9cclxuZnVuY3Rpb24gQnJlYWR0aEZpcnN0RmluZGVyKG9wdCkge1xyXG4gICAgb3B0ID0gb3B0IHx8IHt9O1xyXG4gICAgdGhpcy5hbGxvd0RpYWdvbmFsID0gb3B0LmFsbG93RGlhZ29uYWw7XHJcbiAgICB0aGlzLmRvbnRDcm9zc0Nvcm5lcnMgPSBvcHQuZG9udENyb3NzQ29ybmVycztcclxuICAgIHRoaXMuZGlhZ29uYWxNb3ZlbWVudCA9IG9wdC5kaWFnb25hbE1vdmVtZW50O1xyXG5cclxuICAgIGlmICghdGhpcy5kaWFnb25hbE1vdmVtZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmFsbG93RGlhZ29uYWwpIHtcclxuICAgICAgICAgICAgdGhpcy5kaWFnb25hbE1vdmVtZW50ID0gRGlhZ29uYWxNb3ZlbWVudC5OZXZlcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kb250Q3Jvc3NDb3JuZXJzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWdvbmFsTW92ZW1lbnQgPSBEaWFnb25hbE1vdmVtZW50Lk9ubHlXaGVuTm9PYnN0YWNsZXM7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWdvbmFsTW92ZW1lbnQgPSBEaWFnb25hbE1vdmVtZW50LklmQXRNb3N0T25lT2JzdGFjbGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGaW5kIGFuZCByZXR1cm4gdGhlIHRoZSBwYXRoLlxyXG4gKiBAcmV0dXJuIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gVGhlIHBhdGgsIGluY2x1ZGluZyBib3RoIHN0YXJ0IGFuZFxyXG4gKiAgICAgZW5kIHBvc2l0aW9ucy5cclxuICovXHJcbkJyZWFkdGhGaXJzdEZpbmRlci5wcm90b3R5cGUuZmluZFBhdGggPSBmdW5jdGlvbihzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSwgZ3JpZCkge1xyXG4gICAgdmFyIG9wZW5MaXN0ID0gW10sXHJcbiAgICAgICAgZGlhZ29uYWxNb3ZlbWVudCA9IHRoaXMuZGlhZ29uYWxNb3ZlbWVudCxcclxuICAgICAgICBzdGFydE5vZGUgPSBncmlkLmdldE5vZGVBdChzdGFydFgsIHN0YXJ0WSksXHJcbiAgICAgICAgZW5kTm9kZSA9IGdyaWQuZ2V0Tm9kZUF0KGVuZFgsIGVuZFkpLFxyXG4gICAgICAgIG5laWdoYm9ycywgbmVpZ2hib3IsIG5vZGUsIGksIGw7XHJcblxyXG4gICAgLy8gcHVzaCB0aGUgc3RhcnQgcG9zIGludG8gdGhlIHF1ZXVlXHJcbiAgICBvcGVuTGlzdC5wdXNoKHN0YXJ0Tm9kZSk7XHJcbiAgICBzdGFydE5vZGUub3BlbmVkID0gdHJ1ZTtcclxuXHJcbiAgICAvLyB3aGlsZSB0aGUgcXVldWUgaXMgbm90IGVtcHR5XHJcbiAgICB3aGlsZSAob3Blbkxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgLy8gdGFrZSB0aGUgZnJvbnQgbm9kZSBmcm9tIHRoZSBxdWV1ZVxyXG4gICAgICAgIG5vZGUgPSBvcGVuTGlzdC5zaGlmdCgpO1xyXG4gICAgICAgIG5vZGUuY2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gcmVhY2hlZCB0aGUgZW5kIHBvc2l0aW9uXHJcbiAgICAgICAgaWYgKG5vZGUgPT09IGVuZE5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFV0aWwuYmFja3RyYWNlKGVuZE5vZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmVpZ2hib3JzID0gZ3JpZC5nZXROZWlnaGJvcnMobm9kZSwgZGlhZ29uYWxNb3ZlbWVudCk7XHJcbiAgICAgICAgZm9yIChpID0gMCwgbCA9IG5laWdoYm9ycy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcclxuICAgICAgICAgICAgbmVpZ2hib3IgPSBuZWlnaGJvcnNbaV07XHJcblxyXG4gICAgICAgICAgICAvLyBza2lwIHRoaXMgbmVpZ2hib3IgaWYgaXQgaGFzIGJlZW4gaW5zcGVjdGVkIGJlZm9yZVxyXG4gICAgICAgICAgICBpZiAobmVpZ2hib3IuY2xvc2VkIHx8IG5laWdoYm9yLm9wZW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG9wZW5MaXN0LnB1c2gobmVpZ2hib3IpO1xyXG4gICAgICAgICAgICBuZWlnaGJvci5vcGVuZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBuZWlnaGJvci5wYXJlbnQgPSBub2RlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gZmFpbCB0byBmaW5kIHRoZSBwYXRoXHJcbiAgICByZXR1cm4gW107XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJyZWFkdGhGaXJzdEZpbmRlcjtcclxuIiwidmFyIEFTdGFyRmluZGVyID0gcmVxdWlyZSgnLi9BU3RhckZpbmRlcicpO1xyXG5cclxuLyoqXHJcbiAqIERpamtzdHJhIHBhdGgtZmluZGVyLlxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQGV4dGVuZHMgQVN0YXJGaW5kZXJcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdC5hbGxvd0RpYWdvbmFsIFdoZXRoZXIgZGlhZ29uYWwgbW92ZW1lbnQgaXMgYWxsb3dlZC5cclxuICogICAgIERlcHJlY2F0ZWQsIHVzZSBkaWFnb25hbE1vdmVtZW50IGluc3RlYWQuXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0LmRvbnRDcm9zc0Nvcm5lcnMgRGlzYWxsb3cgZGlhZ29uYWwgbW92ZW1lbnQgdG91Y2hpbmdcclxuICogICAgIGJsb2NrIGNvcm5lcnMuIERlcHJlY2F0ZWQsIHVzZSBkaWFnb25hbE1vdmVtZW50IGluc3RlYWQuXHJcbiAqIEBwYXJhbSB7RGlhZ29uYWxNb3ZlbWVudH0gb3B0LmRpYWdvbmFsTW92ZW1lbnQgQWxsb3dlZCBkaWFnb25hbCBtb3ZlbWVudC5cclxuICovXHJcbmZ1bmN0aW9uIERpamtzdHJhRmluZGVyKG9wdCkge1xyXG4gICAgQVN0YXJGaW5kZXIuY2FsbCh0aGlzLCBvcHQpO1xyXG4gICAgdGhpcy5oZXVyaXN0aWMgPSBmdW5jdGlvbihkeCwgZHkpIHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH07XHJcbn1cclxuXHJcbkRpamtzdHJhRmluZGVyLnByb3RvdHlwZSA9IG5ldyBBU3RhckZpbmRlcigpO1xyXG5EaWprc3RyYUZpbmRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBEaWprc3RyYUZpbmRlcjtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGlqa3N0cmFGaW5kZXI7XHJcbiIsInZhciBVdGlsICAgICAgID0gcmVxdWlyZSgnLi4vY29yZS9VdGlsJyk7XHJcbnZhciBIZXVyaXN0aWMgID0gcmVxdWlyZSgnLi4vY29yZS9IZXVyaXN0aWMnKTtcclxudmFyIE5vZGUgICAgICAgPSByZXF1aXJlKCcuLi9jb3JlL05vZGUnKTtcclxudmFyIERpYWdvbmFsTW92ZW1lbnQgPSByZXF1aXJlKCcuLi9jb3JlL0RpYWdvbmFsTW92ZW1lbnQnKTtcclxuXHJcbi8qKlxyXG4gKiBJdGVyYXRpdmUgRGVlcGluZyBBIFN0YXIgKElEQSopIHBhdGgtZmluZGVyLlxyXG4gKlxyXG4gKiBSZWN1cnNpb24gYmFzZWQgb246XHJcbiAqICAgaHR0cDovL3d3dy5hcGwuamh1LmVkdS9+aGFsbC9BSS1Qcm9ncmFtbWluZy9JREEtU3Rhci5odG1sXHJcbiAqXHJcbiAqIFBhdGggcmV0cmFjaW5nIGJhc2VkIG9uOlxyXG4gKiAgVi4gTmFnZXNod2FyYSBSYW8sIFZpcGluIEt1bWFyIGFuZCBLLiBSYW1lc2hcclxuICogIFwiQSBQYXJhbGxlbCBJbXBsZW1lbnRhdGlvbiBvZiBJdGVyYXRpdmUtRGVlcGluZy1BKlwiLCBKYW51YXJ5IDE5ODcuXHJcbiAqICBmdHA6Ly9mdHAuY3MudXRleGFzLmVkdS8uc25hcHNob3QvaG91cmx5LjEvcHViL0FJLUxhYi90ZWNoLXJlcG9ydHMvVVQtQUktVFItODctNDYucGRmXHJcbiAqXHJcbiAqIEBhdXRob3IgR2VyYXJkIE1laWVyICh3d3cuZ2VyYXJkbWVpZXIuY29tKVxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdC5hbGxvd0RpYWdvbmFsIFdoZXRoZXIgZGlhZ29uYWwgbW92ZW1lbnQgaXMgYWxsb3dlZC5cclxuICogICAgIERlcHJlY2F0ZWQsIHVzZSBkaWFnb25hbE1vdmVtZW50IGluc3RlYWQuXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0LmRvbnRDcm9zc0Nvcm5lcnMgRGlzYWxsb3cgZGlhZ29uYWwgbW92ZW1lbnQgdG91Y2hpbmdcclxuICogICAgIGJsb2NrIGNvcm5lcnMuIERlcHJlY2F0ZWQsIHVzZSBkaWFnb25hbE1vdmVtZW50IGluc3RlYWQuXHJcbiAqIEBwYXJhbSB7RGlhZ29uYWxNb3ZlbWVudH0gb3B0LmRpYWdvbmFsTW92ZW1lbnQgQWxsb3dlZCBkaWFnb25hbCBtb3ZlbWVudC5cclxuICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0LmhldXJpc3RpYyBIZXVyaXN0aWMgZnVuY3Rpb24gdG8gZXN0aW1hdGUgdGhlIGRpc3RhbmNlXHJcbiAqICAgICAoZGVmYXVsdHMgdG8gbWFuaGF0dGFuKS5cclxuICogQHBhcmFtIHtudW1iZXJ9IG9wdC53ZWlnaHQgV2VpZ2h0IHRvIGFwcGx5IHRvIHRoZSBoZXVyaXN0aWMgdG8gYWxsb3cgZm9yXHJcbiAqICAgICBzdWJvcHRpbWFsIHBhdGhzLCBpbiBvcmRlciB0byBzcGVlZCB1cCB0aGUgc2VhcmNoLlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdC50cmFja1JlY3Vyc2lvbiBXaGV0aGVyIHRvIHRyYWNrIHJlY3Vyc2lvbiBmb3JcclxuICogICAgIHN0YXRpc3RpY2FsIHB1cnBvc2VzLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0LnRpbWVMaW1pdCBNYXhpbXVtIGV4ZWN1dGlvbiB0aW1lLiBVc2UgPD0gMCBmb3IgaW5maW5pdGUuXHJcbiAqL1xyXG5mdW5jdGlvbiBJREFTdGFyRmluZGVyKG9wdCkge1xyXG4gICAgb3B0ID0gb3B0IHx8IHt9O1xyXG4gICAgdGhpcy5hbGxvd0RpYWdvbmFsID0gb3B0LmFsbG93RGlhZ29uYWw7XHJcbiAgICB0aGlzLmRvbnRDcm9zc0Nvcm5lcnMgPSBvcHQuZG9udENyb3NzQ29ybmVycztcclxuICAgIHRoaXMuZGlhZ29uYWxNb3ZlbWVudCA9IG9wdC5kaWFnb25hbE1vdmVtZW50O1xyXG4gICAgdGhpcy5oZXVyaXN0aWMgPSBvcHQuaGV1cmlzdGljIHx8IEhldXJpc3RpYy5tYW5oYXR0YW47XHJcbiAgICB0aGlzLndlaWdodCA9IG9wdC53ZWlnaHQgfHwgMTtcclxuICAgIHRoaXMudHJhY2tSZWN1cnNpb24gPSBvcHQudHJhY2tSZWN1cnNpb24gfHwgZmFsc2U7XHJcbiAgICB0aGlzLnRpbWVMaW1pdCA9IG9wdC50aW1lTGltaXQgfHwgSW5maW5pdHk7IC8vIERlZmF1bHQ6IG5vIHRpbWUgbGltaXQuXHJcblxyXG4gICAgaWYgKCF0aGlzLmRpYWdvbmFsTW92ZW1lbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYWxsb3dEaWFnb25hbCkge1xyXG4gICAgICAgICAgICB0aGlzLmRpYWdvbmFsTW92ZW1lbnQgPSBEaWFnb25hbE1vdmVtZW50Lk5ldmVyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRvbnRDcm9zc0Nvcm5lcnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlhZ29uYWxNb3ZlbWVudCA9IERpYWdvbmFsTW92ZW1lbnQuT25seVdoZW5Ob09ic3RhY2xlcztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlhZ29uYWxNb3ZlbWVudCA9IERpYWdvbmFsTW92ZW1lbnQuSWZBdE1vc3RPbmVPYnN0YWNsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBXaGVuIGRpYWdvbmFsIG1vdmVtZW50IGlzIGFsbG93ZWQgdGhlIG1hbmhhdHRhbiBoZXVyaXN0aWMgaXMgbm90XHJcbiAgICAvLyBhZG1pc3NpYmxlLCBpdCBzaG91bGQgYmUgb2N0aWxlIGluc3RlYWRcclxuICAgIGlmICh0aGlzLmRpYWdvbmFsTW92ZW1lbnQgPT09IERpYWdvbmFsTW92ZW1lbnQuTmV2ZXIpIHtcclxuICAgICAgICB0aGlzLmhldXJpc3RpYyA9IG9wdC5oZXVyaXN0aWMgfHwgSGV1cmlzdGljLm1hbmhhdHRhbjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5oZXVyaXN0aWMgPSBvcHQuaGV1cmlzdGljIHx8IEhldXJpc3RpYy5vY3RpbGU7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGaW5kIGFuZCByZXR1cm4gdGhlIHRoZSBwYXRoLiBXaGVuIGFuIGVtcHR5IGFycmF5IGlzIHJldHVybmVkLCBlaXRoZXJcclxuICogbm8gcGF0aCBpcyBwb3NzaWJsZSwgb3IgdGhlIG1heGltdW0gZXhlY3V0aW9uIHRpbWUgaXMgcmVhY2hlZC5cclxuICpcclxuICogQHJldHVybiB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IFRoZSBwYXRoLCBpbmNsdWRpbmcgYm90aCBzdGFydCBhbmRcclxuICogICAgIGVuZCBwb3NpdGlvbnMuXHJcbiAqL1xyXG5JREFTdGFyRmluZGVyLnByb3RvdHlwZS5maW5kUGF0aCA9IGZ1bmN0aW9uKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLCBncmlkKSB7XHJcbiAgICAvLyBVc2VkIGZvciBzdGF0aXN0aWNzOlxyXG4gICAgdmFyIG5vZGVzVmlzaXRlZCA9IDA7XHJcblxyXG4gICAgLy8gRXhlY3V0aW9uIHRpbWUgbGltaXRhdGlvbjpcclxuICAgIHZhciBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHJcbiAgICAvLyBIZXVyaXN0aWMgaGVscGVyOlxyXG4gICAgdmFyIGggPSBmdW5jdGlvbihhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGV1cmlzdGljKE1hdGguYWJzKGIueCAtIGEueCksIE1hdGguYWJzKGIueSAtIGEueSkpO1xyXG4gICAgfS5iaW5kKHRoaXMpO1xyXG5cclxuICAgIC8vIFN0ZXAgY29zdCBmcm9tIGEgdG8gYjpcclxuICAgIHZhciBjb3N0ID0gZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICAgIHJldHVybiAoYS54ID09PSBiLnggfHwgYS55ID09PSBiLnkpID8gMSA6IE1hdGguU1FSVDI7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSURBKiBzZWFyY2ggaW1wbGVtZW50YXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtOb2RlfSBUaGUgbm9kZSBjdXJyZW50bHkgZXhwYW5kaW5nIGZyb20uXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gQ29zdCB0byByZWFjaCB0aGUgZ2l2ZW4gbm9kZS5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBNYXhpbXVtIHNlYXJjaCBkZXB0aCAoY3V0LW9mZiB2YWx1ZSkuXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEFycmF5PG51bWJlcj4+fSBUaGUgZm91bmQgcm91dGUuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gUmVjdXJzaW9uIGRlcHRoLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gZWl0aGVyIGEgbnVtYmVyIHdpdGggdGhlIG5ldyBvcHRpbWFsIGN1dC1vZmYgZGVwdGgsXHJcbiAgICAgKiBvciBhIHZhbGlkIG5vZGUgaW5zdGFuY2UsIGluIHdoaWNoIGNhc2UgYSBwYXRoIHdhcyBmb3VuZC5cclxuICAgICAqL1xyXG4gICAgdmFyIHNlYXJjaCA9IGZ1bmN0aW9uKG5vZGUsIGcsIGN1dG9mZiwgcm91dGUsIGRlcHRoKSB7XHJcbiAgICAgICAgbm9kZXNWaXNpdGVkKys7XHJcblxyXG4gICAgICAgIC8vIEVuZm9yY2UgdGltZWxpbWl0OlxyXG4gICAgICAgIGlmICh0aGlzLnRpbWVMaW1pdCA+IDAgJiZcclxuICAgICAgICAgICAgbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBzdGFydFRpbWUgPiB0aGlzLnRpbWVMaW1pdCAqIDEwMDApIHtcclxuICAgICAgICAgICAgLy8gRW5mb3JjZWQgYXMgXCJwYXRoLW5vdC1mb3VuZFwiLlxyXG4gICAgICAgICAgICByZXR1cm4gSW5maW5pdHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZiA9IGcgKyBoKG5vZGUsIGVuZCkgKiB0aGlzLndlaWdodDtcclxuXHJcbiAgICAgICAgLy8gV2UndmUgc2VhcmNoZWQgdG9vIGRlZXAgZm9yIHRoaXMgaXRlcmF0aW9uLlxyXG4gICAgICAgIGlmIChmID4gY3V0b2ZmKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5vZGUgPT0gZW5kKSB7XHJcbiAgICAgICAgICAgIHJvdXRlW2RlcHRoXSA9IFtub2RlLngsIG5vZGUueV07XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIG1pbiwgdCwgaywgbmVpZ2hib3VyO1xyXG5cclxuICAgICAgICB2YXIgbmVpZ2hib3VycyA9IGdyaWQuZ2V0TmVpZ2hib3JzKG5vZGUsIHRoaXMuZGlhZ29uYWxNb3ZlbWVudCk7XHJcblxyXG4gICAgICAgIC8vIFNvcnQgdGhlIG5laWdoYm91cnMsIGdpdmVzIG5pY2VyIHBhdGhzLiBCdXQsIHRoaXMgZGV2aWF0ZXNcclxuICAgICAgICAvLyBmcm9tIHRoZSBvcmlnaW5hbCBhbGdvcml0aG0gLSBzbyBJIGxlZnQgaXQgb3V0LlxyXG4gICAgICAgIC8vbmVpZ2hib3Vycy5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xyXG4gICAgICAgIC8vICAgIHJldHVybiBoKGEsIGVuZCkgLSBoKGIsIGVuZCk7XHJcbiAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLypqc2hpbnQgLVcwODQgKi8vL0Rpc2FibGUgd2FybmluZzogRXhwZWN0ZWQgYSBjb25kaXRpb25hbCBleHByZXNzaW9uIGFuZCBpbnN0ZWFkIHNhdyBhbiBhc3NpZ25tZW50XHJcbiAgICAgICAgZm9yIChrID0gMCwgbWluID0gSW5maW5pdHk7IG5laWdoYm91ciA9IG5laWdoYm91cnNba107ICsraykge1xyXG4gICAgICAgIC8qanNoaW50ICtXMDg0ICovLy9FbmFibGUgd2FybmluZzogRXhwZWN0ZWQgYSBjb25kaXRpb25hbCBleHByZXNzaW9uIGFuZCBpbnN0ZWFkIHNhdyBhbiBhc3NpZ25tZW50XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrUmVjdXJzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZXRhaW4gYSBjb3B5IGZvciB2aXN1YWxpc2F0aW9uLiBEdWUgdG8gcmVjdXJzaW9uLCB0aGlzXHJcbiAgICAgICAgICAgICAgICAvLyBub2RlIG1heSBiZSBwYXJ0IG9mIG90aGVyIHBhdGhzIHRvby5cclxuICAgICAgICAgICAgICAgIG5laWdoYm91ci5yZXRhaW5Db3VudCA9IG5laWdoYm91ci5yZXRhaW5Db3VudCArIDEgfHwgMTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihuZWlnaGJvdXIudGVzdGVkICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3VyLnRlc3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHQgPSBzZWFyY2gobmVpZ2hib3VyLCBnICsgY29zdChub2RlLCBuZWlnaGJvdXIpLCBjdXRvZmYsIHJvdXRlLCBkZXB0aCArIDEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHQgaW5zdGFuY2VvZiBOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZVtkZXB0aF0gPSBbbm9kZS54LCBub2RlLnldO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEZvciBhIHR5cGljYWwgQSogbGlua2VkIGxpc3QsIHRoaXMgd291bGQgd29yazpcclxuICAgICAgICAgICAgICAgIC8vIG5laWdoYm91ci5wYXJlbnQgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIERlY3JlbWVudCBjb3VudCwgdGhlbiBkZXRlcm1pbmUgd2hldGhlciBpdCdzIGFjdHVhbGx5IGNsb3NlZC5cclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2tSZWN1cnNpb24gJiYgKC0tbmVpZ2hib3VyLnJldGFpbkNvdW50KSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbmVpZ2hib3VyLnRlc3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodCA8IG1pbikge1xyXG4gICAgICAgICAgICAgICAgbWluID0gdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1pbjtcclxuXHJcbiAgICB9LmJpbmQodGhpcyk7XHJcblxyXG4gICAgLy8gTm9kZSBpbnN0YW5jZSBsb29rdXBzOlxyXG4gICAgdmFyIHN0YXJ0ID0gZ3JpZC5nZXROb2RlQXQoc3RhcnRYLCBzdGFydFkpO1xyXG4gICAgdmFyIGVuZCAgID0gZ3JpZC5nZXROb2RlQXQoZW5kWCwgZW5kWSk7XHJcblxyXG4gICAgLy8gSW5pdGlhbCBzZWFyY2ggZGVwdGgsIGdpdmVuIHRoZSB0eXBpY2FsIGhldXJpc3RpYyBjb250cmFpbnRzLFxyXG4gICAgLy8gdGhlcmUgc2hvdWxkIGJlIG5vIGNoZWFwZXIgcm91dGUgcG9zc2libGUuXHJcbiAgICB2YXIgY3V0T2ZmID0gaChzdGFydCwgZW5kKTtcclxuXHJcbiAgICB2YXIgaiwgcm91dGUsIHQ7XHJcblxyXG4gICAgLy8gV2l0aCBhbiBvdmVyZmxvdyBwcm90ZWN0aW9uLlxyXG4gICAgZm9yIChqID0gMDsgdHJ1ZTsgKytqKSB7XHJcblxyXG4gICAgICAgIHJvdXRlID0gW107XHJcblxyXG4gICAgICAgIC8vIFNlYXJjaCB0aWxsIGN1dC1vZmYgZGVwdGg6XHJcbiAgICAgICAgdCA9IHNlYXJjaChzdGFydCwgMCwgY3V0T2ZmLCByb3V0ZSwgMCk7XHJcblxyXG4gICAgICAgIC8vIFJvdXRlIG5vdCBwb3NzaWJsZSwgb3Igbm90IGZvdW5kIGluIHRpbWUgbGltaXQuXHJcbiAgICAgICAgaWYgKHQgPT09IEluZmluaXR5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIHQgaXMgYSBub2RlLCBpdCdzIGFsc28gdGhlIGVuZCBub2RlLiBSb3V0ZSBpcyBub3dcclxuICAgICAgICAvLyBwb3B1bGF0ZWQgd2l0aCBhIHZhbGlkIHBhdGggdG8gdGhlIGVuZCBub2RlLlxyXG4gICAgICAgIGlmICh0IGluc3RhbmNlb2YgTm9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcm91dGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUcnkgYWdhaW4sIHRoaXMgdGltZSB3aXRoIGEgZGVlcGVyIGN1dC1vZmYuIFRoZSB0IHNjb3JlXHJcbiAgICAgICAgLy8gaXMgdGhlIGNsb3Nlc3Qgd2UgZ290IHRvIHRoZSBlbmQgbm9kZS5cclxuICAgICAgICBjdXRPZmYgPSB0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoaXMgX3Nob3VsZF8gbmV2ZXIgdG8gYmUgcmVhY2hlZC5cclxuICAgIHJldHVybiBbXTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSURBU3RhckZpbmRlcjtcclxuIiwiLyoqXHJcbiAqIEBhdXRob3IgaW1vciAvIGh0dHBzOi8vZ2l0aHViLmNvbS9pbW9yXHJcbiAqL1xyXG52YXIgSnVtcFBvaW50RmluZGVyQmFzZSA9IHJlcXVpcmUoJy4vSnVtcFBvaW50RmluZGVyQmFzZScpO1xyXG52YXIgRGlhZ29uYWxNb3ZlbWVudCA9IHJlcXVpcmUoJy4uL2NvcmUvRGlhZ29uYWxNb3ZlbWVudCcpO1xyXG5cclxuLyoqXHJcbiAqIFBhdGggZmluZGVyIHVzaW5nIHRoZSBKdW1wIFBvaW50IFNlYXJjaCBhbGdvcml0aG0gd2hpY2ggYWx3YXlzIG1vdmVzXHJcbiAqIGRpYWdvbmFsbHkgaXJyZXNwZWN0aXZlIG9mIHRoZSBudW1iZXIgb2Ygb2JzdGFjbGVzLlxyXG4gKi9cclxuZnVuY3Rpb24gSlBGQWx3YXlzTW92ZURpYWdvbmFsbHkob3B0KSB7XHJcbiAgICBKdW1wUG9pbnRGaW5kZXJCYXNlLmNhbGwodGhpcywgb3B0KTtcclxufVxyXG5cclxuSlBGQWx3YXlzTW92ZURpYWdvbmFsbHkucHJvdG90eXBlID0gbmV3IEp1bXBQb2ludEZpbmRlckJhc2UoKTtcclxuSlBGQWx3YXlzTW92ZURpYWdvbmFsbHkucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gSlBGQWx3YXlzTW92ZURpYWdvbmFsbHk7XHJcblxyXG4vKipcclxuICogU2VhcmNoIHJlY3Vyc2l2ZWx5IGluIHRoZSBkaXJlY3Rpb24gKHBhcmVudCAtPiBjaGlsZCksIHN0b3BwaW5nIG9ubHkgd2hlbiBhXHJcbiAqIGp1bXAgcG9pbnQgaXMgZm91bmQuXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHJldHVybiB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IFRoZSB4LCB5IGNvb3JkaW5hdGUgb2YgdGhlIGp1bXAgcG9pbnRcclxuICogICAgIGZvdW5kLCBvciBudWxsIGlmIG5vdCBmb3VuZFxyXG4gKi9cclxuSlBGQWx3YXlzTW92ZURpYWdvbmFsbHkucHJvdG90eXBlLl9qdW1wID0gZnVuY3Rpb24oeCwgeSwgcHgsIHB5KSB7XHJcbiAgICB2YXIgZ3JpZCA9IHRoaXMuZ3JpZCxcclxuICAgICAgICBkeCA9IHggLSBweCwgZHkgPSB5IC0gcHk7XHJcblxyXG4gICAgaWYgKCFncmlkLmlzV2Fsa2FibGVBdCh4LCB5KSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHRoaXMudHJhY2tKdW1wUmVjdXJzaW9uID09PSB0cnVlKSB7XHJcbiAgICAgICAgZ3JpZC5nZXROb2RlQXQoeCwgeSkudGVzdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZ3JpZC5nZXROb2RlQXQoeCwgeSkgPT09IHRoaXMuZW5kTm9kZSkge1xyXG4gICAgICAgIHJldHVybiBbeCwgeV07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2hlY2sgZm9yIGZvcmNlZCBuZWlnaGJvcnNcclxuICAgIC8vIGFsb25nIHRoZSBkaWFnb25hbFxyXG4gICAgaWYgKGR4ICE9PSAwICYmIGR5ICE9PSAwKSB7XHJcbiAgICAgICAgaWYgKChncmlkLmlzV2Fsa2FibGVBdCh4IC0gZHgsIHkgKyBkeSkgJiYgIWdyaWQuaXNXYWxrYWJsZUF0KHggLSBkeCwgeSkpIHx8XHJcbiAgICAgICAgICAgIChncmlkLmlzV2Fsa2FibGVBdCh4ICsgZHgsIHkgLSBkeSkgJiYgIWdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgLSBkeSkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbeCwgeV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHdoZW4gbW92aW5nIGRpYWdvbmFsbHksIG11c3QgY2hlY2sgZm9yIHZlcnRpY2FsL2hvcml6b250YWwganVtcCBwb2ludHNcclxuICAgICAgICBpZiAodGhpcy5fanVtcCh4ICsgZHgsIHksIHgsIHkpIHx8IHRoaXMuX2p1bXAoeCwgeSArIGR5LCB4LCB5KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gW3gsIHldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGhvcml6b250YWxseS92ZXJ0aWNhbGx5XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpZiggZHggIT09IDAgKSB7IC8vIG1vdmluZyBhbG9uZyB4XHJcbiAgICAgICAgICAgIGlmKChncmlkLmlzV2Fsa2FibGVBdCh4ICsgZHgsIHkgKyAxKSAmJiAhZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSArIDEpKSB8fFxyXG4gICAgICAgICAgICAgICAoZ3JpZC5pc1dhbGthYmxlQXQoeCArIGR4LCB5IC0gMSkgJiYgIWdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgLSAxKSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbeCwgeV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmKChncmlkLmlzV2Fsa2FibGVBdCh4ICsgMSwgeSArIGR5KSAmJiAhZ3JpZC5pc1dhbGthYmxlQXQoeCArIDEsIHkpKSB8fFxyXG4gICAgICAgICAgICAgICAoZ3JpZC5pc1dhbGthYmxlQXQoeCAtIDEsIHkgKyBkeSkgJiYgIWdyaWQuaXNXYWxrYWJsZUF0KHggLSAxLCB5KSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbeCwgeV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX2p1bXAoeCArIGR4LCB5ICsgZHksIHgsIHkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZpbmQgdGhlIG5laWdoYm9ycyBmb3IgdGhlIGdpdmVuIG5vZGUuIElmIHRoZSBub2RlIGhhcyBhIHBhcmVudCxcclxuICogcHJ1bmUgdGhlIG5laWdoYm9ycyBiYXNlZCBvbiB0aGUganVtcCBwb2ludCBzZWFyY2ggYWxnb3JpdGhtLCBvdGhlcndpc2VcclxuICogcmV0dXJuIGFsbCBhdmFpbGFibGUgbmVpZ2hib3JzLlxyXG4gKiBAcmV0dXJuIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gVGhlIG5laWdoYm9ycyBmb3VuZC5cclxuICovXHJcbkpQRkFsd2F5c01vdmVEaWFnb25hbGx5LnByb3RvdHlwZS5fZmluZE5laWdoYm9ycyA9IGZ1bmN0aW9uKG5vZGUpIHtcclxuICAgIHZhciBwYXJlbnQgPSBub2RlLnBhcmVudCxcclxuICAgICAgICB4ID0gbm9kZS54LCB5ID0gbm9kZS55LFxyXG4gICAgICAgIGdyaWQgPSB0aGlzLmdyaWQsXHJcbiAgICAgICAgcHgsIHB5LCBueCwgbnksIGR4LCBkeSxcclxuICAgICAgICBuZWlnaGJvcnMgPSBbXSwgbmVpZ2hib3JOb2RlcywgbmVpZ2hib3JOb2RlLCBpLCBsO1xyXG5cclxuICAgIC8vIGRpcmVjdGVkIHBydW5pbmc6IGNhbiBpZ25vcmUgbW9zdCBuZWlnaGJvcnMsIHVubGVzcyBmb3JjZWQuXHJcbiAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgcHggPSBwYXJlbnQueDtcclxuICAgICAgICBweSA9IHBhcmVudC55O1xyXG4gICAgICAgIC8vIGdldCB0aGUgbm9ybWFsaXplZCBkaXJlY3Rpb24gb2YgdHJhdmVsXHJcbiAgICAgICAgZHggPSAoeCAtIHB4KSAvIE1hdGgubWF4KE1hdGguYWJzKHggLSBweCksIDEpO1xyXG4gICAgICAgIGR5ID0gKHkgLSBweSkgLyBNYXRoLm1heChNYXRoLmFicyh5IC0gcHkpLCAxKTtcclxuXHJcbiAgICAgICAgLy8gc2VhcmNoIGRpYWdvbmFsbHlcclxuICAgICAgICBpZiAoZHggIT09IDAgJiYgZHkgIT09IDApIHtcclxuICAgICAgICAgICAgaWYgKGdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgKyBkeSkpIHtcclxuICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4LCB5ICsgZHldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZ3JpZC5pc1dhbGthYmxlQXQoeCArIGR4LCB5KSkge1xyXG4gICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggKyBkeCwgeV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChncmlkLmlzV2Fsa2FibGVBdCh4ICsgZHgsIHkgKyBkeSkpIHtcclxuICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgZHgsIHkgKyBkeV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghZ3JpZC5pc1dhbGthYmxlQXQoeCAtIGR4LCB5KSkge1xyXG4gICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggLSBkeCwgeSArIGR5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFncmlkLmlzV2Fsa2FibGVBdCh4LCB5IC0gZHkpKSB7XHJcbiAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCArIGR4LCB5IC0gZHldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzZWFyY2ggaG9yaXpvbnRhbGx5L3ZlcnRpY2FsbHlcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYoZHggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChncmlkLmlzV2Fsa2FibGVBdCh4LCB5ICsgZHkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3gsIHkgKyBkeV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFncmlkLmlzV2Fsa2FibGVBdCh4ICsgMSwgeSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCArIDEsIHkgKyBkeV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFncmlkLmlzV2Fsa2FibGVBdCh4IC0gMSwgeSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCAtIDEsIHkgKyBkeV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdyaWQuaXNXYWxrYWJsZUF0KHggKyBkeCwgeSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCArIGR4LCB5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgKyAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgZHgsIHkgKyAxXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgZHgsIHkgLSAxXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyByZXR1cm4gYWxsIG5laWdoYm9yc1xyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgbmVpZ2hib3JOb2RlcyA9IGdyaWQuZ2V0TmVpZ2hib3JzKG5vZGUsIERpYWdvbmFsTW92ZW1lbnQuQWx3YXlzKTtcclxuICAgICAgICBmb3IgKGkgPSAwLCBsID0gbmVpZ2hib3JOb2Rlcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcclxuICAgICAgICAgICAgbmVpZ2hib3JOb2RlID0gbmVpZ2hib3JOb2Rlc1tpXTtcclxuICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW25laWdoYm9yTm9kZS54LCBuZWlnaGJvck5vZGUueV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmVpZ2hib3JzO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBKUEZBbHdheXNNb3ZlRGlhZ29uYWxseTtcclxuIiwiLyoqXHJcbiAqIEBhdXRob3IgaW1vciAvIGh0dHBzOi8vZ2l0aHViLmNvbS9pbW9yXHJcbiAqL1xyXG52YXIgSnVtcFBvaW50RmluZGVyQmFzZSA9IHJlcXVpcmUoJy4vSnVtcFBvaW50RmluZGVyQmFzZScpO1xyXG52YXIgRGlhZ29uYWxNb3ZlbWVudCA9IHJlcXVpcmUoJy4uL2NvcmUvRGlhZ29uYWxNb3ZlbWVudCcpO1xyXG5cclxuLyoqXHJcbiAqIFBhdGggZmluZGVyIHVzaW5nIHRoZSBKdW1wIFBvaW50IFNlYXJjaCBhbGdvcml0aG0gd2hpY2ggbW92ZXNcclxuICogZGlhZ29uYWxseSBvbmx5IHdoZW4gdGhlcmUgaXMgYXQgbW9zdCBvbmUgb2JzdGFjbGUuXHJcbiAqL1xyXG5mdW5jdGlvbiBKUEZNb3ZlRGlhZ29uYWxseUlmQXRNb3N0T25lT2JzdGFjbGUob3B0KSB7XHJcbiAgICBKdW1wUG9pbnRGaW5kZXJCYXNlLmNhbGwodGhpcywgb3B0KTtcclxufVxyXG5cclxuSlBGTW92ZURpYWdvbmFsbHlJZkF0TW9zdE9uZU9ic3RhY2xlLnByb3RvdHlwZSA9IG5ldyBKdW1wUG9pbnRGaW5kZXJCYXNlKCk7XHJcbkpQRk1vdmVEaWFnb25hbGx5SWZBdE1vc3RPbmVPYnN0YWNsZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBKUEZNb3ZlRGlhZ29uYWxseUlmQXRNb3N0T25lT2JzdGFjbGU7XHJcblxyXG4vKipcclxuICogU2VhcmNoIHJlY3Vyc2l2ZWx5IGluIHRoZSBkaXJlY3Rpb24gKHBhcmVudCAtPiBjaGlsZCksIHN0b3BwaW5nIG9ubHkgd2hlbiBhXHJcbiAqIGp1bXAgcG9pbnQgaXMgZm91bmQuXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHJldHVybiB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IFRoZSB4LCB5IGNvb3JkaW5hdGUgb2YgdGhlIGp1bXAgcG9pbnRcclxuICogICAgIGZvdW5kLCBvciBudWxsIGlmIG5vdCBmb3VuZFxyXG4gKi9cclxuSlBGTW92ZURpYWdvbmFsbHlJZkF0TW9zdE9uZU9ic3RhY2xlLnByb3RvdHlwZS5fanVtcCA9IGZ1bmN0aW9uKHgsIHksIHB4LCBweSkge1xyXG4gICAgdmFyIGdyaWQgPSB0aGlzLmdyaWQsXHJcbiAgICAgICAgZHggPSB4IC0gcHgsIGR5ID0geSAtIHB5O1xyXG5cclxuICAgIGlmICghZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSkpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpZih0aGlzLnRyYWNrSnVtcFJlY3Vyc2lvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGdyaWQuZ2V0Tm9kZUF0KHgsIHkpLnRlc3RlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGdyaWQuZ2V0Tm9kZUF0KHgsIHkpID09PSB0aGlzLmVuZE5vZGUpIHtcclxuICAgICAgICByZXR1cm4gW3gsIHldO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNoZWNrIGZvciBmb3JjZWQgbmVpZ2hib3JzXHJcbiAgICAvLyBhbG9uZyB0aGUgZGlhZ29uYWxcclxuICAgIGlmIChkeCAhPT0gMCAmJiBkeSAhPT0gMCkge1xyXG4gICAgICAgIGlmICgoZ3JpZC5pc1dhbGthYmxlQXQoeCAtIGR4LCB5ICsgZHkpICYmICFncmlkLmlzV2Fsa2FibGVBdCh4IC0gZHgsIHkpKSB8fFxyXG4gICAgICAgICAgICAoZ3JpZC5pc1dhbGthYmxlQXQoeCArIGR4LCB5IC0gZHkpICYmICFncmlkLmlzV2Fsa2FibGVBdCh4LCB5IC0gZHkpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gW3gsIHldO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB3aGVuIG1vdmluZyBkaWFnb25hbGx5LCBtdXN0IGNoZWNrIGZvciB2ZXJ0aWNhbC9ob3Jpem9udGFsIGp1bXAgcG9pbnRzXHJcbiAgICAgICAgaWYgKHRoaXMuX2p1bXAoeCArIGR4LCB5LCB4LCB5KSB8fCB0aGlzLl9qdW1wKHgsIHkgKyBkeSwgeCwgeSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFt4LCB5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBob3Jpem9udGFsbHkvdmVydGljYWxseVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWYoIGR4ICE9PSAwICkgeyAvLyBtb3ZpbmcgYWxvbmcgeFxyXG4gICAgICAgICAgICBpZigoZ3JpZC5pc1dhbGthYmxlQXQoeCArIGR4LCB5ICsgMSkgJiYgIWdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgKyAxKSkgfHxcclxuICAgICAgICAgICAgICAgKGdyaWQuaXNXYWxrYWJsZUF0KHggKyBkeCwgeSAtIDEpICYmICFncmlkLmlzV2Fsa2FibGVBdCh4LCB5IC0gMSkpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW3gsIHldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZigoZ3JpZC5pc1dhbGthYmxlQXQoeCArIDEsIHkgKyBkeSkgJiYgIWdyaWQuaXNXYWxrYWJsZUF0KHggKyAxLCB5KSkgfHxcclxuICAgICAgICAgICAgICAgKGdyaWQuaXNXYWxrYWJsZUF0KHggLSAxLCB5ICsgZHkpICYmICFncmlkLmlzV2Fsa2FibGVBdCh4IC0gMSwgeSkpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW3gsIHldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIG1vdmluZyBkaWFnb25hbGx5LCBtdXN0IG1ha2Ugc3VyZSBvbmUgb2YgdGhlIHZlcnRpY2FsL2hvcml6b250YWxcclxuICAgIC8vIG5laWdoYm9ycyBpcyBvcGVuIHRvIGFsbG93IHRoZSBwYXRoXHJcbiAgICBpZiAoZ3JpZC5pc1dhbGthYmxlQXQoeCArIGR4LCB5KSB8fCBncmlkLmlzV2Fsa2FibGVBdCh4LCB5ICsgZHkpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2p1bXAoeCArIGR4LCB5ICsgZHksIHgsIHkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBGaW5kIHRoZSBuZWlnaGJvcnMgZm9yIHRoZSBnaXZlbiBub2RlLiBJZiB0aGUgbm9kZSBoYXMgYSBwYXJlbnQsXHJcbiAqIHBydW5lIHRoZSBuZWlnaGJvcnMgYmFzZWQgb24gdGhlIGp1bXAgcG9pbnQgc2VhcmNoIGFsZ29yaXRobSwgb3RoZXJ3aXNlXHJcbiAqIHJldHVybiBhbGwgYXZhaWxhYmxlIG5laWdoYm9ycy5cclxuICogQHJldHVybiB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IFRoZSBuZWlnaGJvcnMgZm91bmQuXHJcbiAqL1xyXG5KUEZNb3ZlRGlhZ29uYWxseUlmQXRNb3N0T25lT2JzdGFjbGUucHJvdG90eXBlLl9maW5kTmVpZ2hib3JzID0gZnVuY3Rpb24obm9kZSkge1xyXG4gICAgdmFyIHBhcmVudCA9IG5vZGUucGFyZW50LFxyXG4gICAgICAgIHggPSBub2RlLngsIHkgPSBub2RlLnksXHJcbiAgICAgICAgZ3JpZCA9IHRoaXMuZ3JpZCxcclxuICAgICAgICBweCwgcHksIG54LCBueSwgZHgsIGR5LFxyXG4gICAgICAgIG5laWdoYm9ycyA9IFtdLCBuZWlnaGJvck5vZGVzLCBuZWlnaGJvck5vZGUsIGksIGw7XHJcblxyXG4gICAgLy8gZGlyZWN0ZWQgcHJ1bmluZzogY2FuIGlnbm9yZSBtb3N0IG5laWdoYm9ycywgdW5sZXNzIGZvcmNlZC5cclxuICAgIGlmIChwYXJlbnQpIHtcclxuICAgICAgICBweCA9IHBhcmVudC54O1xyXG4gICAgICAgIHB5ID0gcGFyZW50Lnk7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBub3JtYWxpemVkIGRpcmVjdGlvbiBvZiB0cmF2ZWxcclxuICAgICAgICBkeCA9ICh4IC0gcHgpIC8gTWF0aC5tYXgoTWF0aC5hYnMoeCAtIHB4KSwgMSk7XHJcbiAgICAgICAgZHkgPSAoeSAtIHB5KSAvIE1hdGgubWF4KE1hdGguYWJzKHkgLSBweSksIDEpO1xyXG5cclxuICAgICAgICAvLyBzZWFyY2ggZGlhZ29uYWxseVxyXG4gICAgICAgIGlmIChkeCAhPT0gMCAmJiBkeSAhPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSArIGR5KSkge1xyXG4gICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3gsIHkgKyBkeV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChncmlkLmlzV2Fsa2FibGVBdCh4ICsgZHgsIHkpKSB7XHJcbiAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCArIGR4LCB5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgKyBkeSkgfHwgZ3JpZC5pc1dhbGthYmxlQXQoeCArIGR4LCB5KSkge1xyXG4gICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggKyBkeCwgeSArIGR5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFncmlkLmlzV2Fsa2FibGVBdCh4IC0gZHgsIHkpICYmIGdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgKyBkeSkpIHtcclxuICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4IC0gZHgsIHkgKyBkeV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSAtIGR5KSAmJiBncmlkLmlzV2Fsa2FibGVBdCh4ICsgZHgsIHkpKSB7XHJcbiAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCArIGR4LCB5IC0gZHldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzZWFyY2ggaG9yaXpvbnRhbGx5L3ZlcnRpY2FsbHlcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYoZHggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChncmlkLmlzV2Fsa2FibGVBdCh4LCB5ICsgZHkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3gsIHkgKyBkeV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZ3JpZC5pc1dhbGthYmxlQXQoeCArIDEsIHkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgMSwgeSArIGR5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZ3JpZC5pc1dhbGthYmxlQXQoeCAtIDEsIHkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4IC0gMSwgeSArIGR5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdyaWQuaXNXYWxrYWJsZUF0KHggKyBkeCwgeSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCArIGR4LCB5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFncmlkLmlzV2Fsa2FibGVBdCh4LCB5ICsgMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggKyBkeCwgeSArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFncmlkLmlzV2Fsa2FibGVBdCh4LCB5IC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggKyBkeCwgeSAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyByZXR1cm4gYWxsIG5laWdoYm9yc1xyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgbmVpZ2hib3JOb2RlcyA9IGdyaWQuZ2V0TmVpZ2hib3JzKG5vZGUsIERpYWdvbmFsTW92ZW1lbnQuSWZBdE1vc3RPbmVPYnN0YWNsZSk7XHJcbiAgICAgICAgZm9yIChpID0gMCwgbCA9IG5laWdoYm9yTm9kZXMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XHJcbiAgICAgICAgICAgIG5laWdoYm9yTm9kZSA9IG5laWdoYm9yTm9kZXNbaV07XHJcbiAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFtuZWlnaGJvck5vZGUueCwgbmVpZ2hib3JOb2RlLnldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5laWdoYm9ycztcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSlBGTW92ZURpYWdvbmFsbHlJZkF0TW9zdE9uZU9ic3RhY2xlO1xyXG4iLCIvKipcclxuICogQGF1dGhvciBpbW9yIC8gaHR0cHM6Ly9naXRodWIuY29tL2ltb3JcclxuICovXHJcbnZhciBKdW1wUG9pbnRGaW5kZXJCYXNlID0gcmVxdWlyZSgnLi9KdW1wUG9pbnRGaW5kZXJCYXNlJyk7XHJcbnZhciBEaWFnb25hbE1vdmVtZW50ID0gcmVxdWlyZSgnLi4vY29yZS9EaWFnb25hbE1vdmVtZW50Jyk7XHJcblxyXG4vKipcclxuICogUGF0aCBmaW5kZXIgdXNpbmcgdGhlIEp1bXAgUG9pbnQgU2VhcmNoIGFsZ29yaXRobSB3aGljaCBtb3Zlc1xyXG4gKiBkaWFnb25hbGx5IG9ubHkgd2hlbiB0aGVyZSBhcmUgbm8gb2JzdGFjbGVzLlxyXG4gKi9cclxuZnVuY3Rpb24gSlBGTW92ZURpYWdvbmFsbHlJZk5vT2JzdGFjbGVzKG9wdCkge1xyXG4gICAgSnVtcFBvaW50RmluZGVyQmFzZS5jYWxsKHRoaXMsIG9wdCk7XHJcbn1cclxuXHJcbkpQRk1vdmVEaWFnb25hbGx5SWZOb09ic3RhY2xlcy5wcm90b3R5cGUgPSBuZXcgSnVtcFBvaW50RmluZGVyQmFzZSgpO1xyXG5KUEZNb3ZlRGlhZ29uYWxseUlmTm9PYnN0YWNsZXMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gSlBGTW92ZURpYWdvbmFsbHlJZk5vT2JzdGFjbGVzO1xyXG5cclxuLyoqXHJcbiAqIFNlYXJjaCByZWN1cnNpdmVseSBpbiB0aGUgZGlyZWN0aW9uIChwYXJlbnQgLT4gY2hpbGQpLCBzdG9wcGluZyBvbmx5IHdoZW4gYVxyXG4gKiBqdW1wIHBvaW50IGlzIGZvdW5kLlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEByZXR1cm4ge0FycmF5PEFycmF5PG51bWJlcj4+fSBUaGUgeCwgeSBjb29yZGluYXRlIG9mIHRoZSBqdW1wIHBvaW50XHJcbiAqICAgICBmb3VuZCwgb3IgbnVsbCBpZiBub3QgZm91bmRcclxuICovXHJcbkpQRk1vdmVEaWFnb25hbGx5SWZOb09ic3RhY2xlcy5wcm90b3R5cGUuX2p1bXAgPSBmdW5jdGlvbih4LCB5LCBweCwgcHkpIHtcclxuICAgIHZhciBncmlkID0gdGhpcy5ncmlkLFxyXG4gICAgICAgIGR4ID0geCAtIHB4LCBkeSA9IHkgLSBweTtcclxuXHJcbiAgICBpZiAoIWdyaWQuaXNXYWxrYWJsZUF0KHgsIHkpKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYodGhpcy50cmFja0p1bXBSZWN1cnNpb24gPT09IHRydWUpIHtcclxuICAgICAgICBncmlkLmdldE5vZGVBdCh4LCB5KS50ZXN0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChncmlkLmdldE5vZGVBdCh4LCB5KSA9PT0gdGhpcy5lbmROb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIFt4LCB5XTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjaGVjayBmb3IgZm9yY2VkIG5laWdoYm9yc1xyXG4gICAgLy8gYWxvbmcgdGhlIGRpYWdvbmFsXHJcbiAgICBpZiAoZHggIT09IDAgJiYgZHkgIT09IDApIHtcclxuICAgICAgICAvLyBpZiAoKGdyaWQuaXNXYWxrYWJsZUF0KHggLSBkeCwgeSArIGR5KSAmJiAhZ3JpZC5pc1dhbGthYmxlQXQoeCAtIGR4LCB5KSkgfHxcclxuICAgICAgICAgICAgLy8gKGdyaWQuaXNXYWxrYWJsZUF0KHggKyBkeCwgeSAtIGR5KSAmJiAhZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSAtIGR5KSkpIHtcclxuICAgICAgICAgICAgLy8gcmV0dXJuIFt4LCB5XTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gd2hlbiBtb3ZpbmcgZGlhZ29uYWxseSwgbXVzdCBjaGVjayBmb3IgdmVydGljYWwvaG9yaXpvbnRhbCBqdW1wIHBvaW50c1xyXG4gICAgICAgIGlmICh0aGlzLl9qdW1wKHggKyBkeCwgeSwgeCwgeSkgfHwgdGhpcy5fanVtcCh4LCB5ICsgZHksIHgsIHkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbeCwgeV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gaG9yaXpvbnRhbGx5L3ZlcnRpY2FsbHlcclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlmIChkeCAhPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoKGdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgLSAxKSAmJiAhZ3JpZC5pc1dhbGthYmxlQXQoeCAtIGR4LCB5IC0gMSkpIHx8XHJcbiAgICAgICAgICAgICAgICAoZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSArIDEpICYmICFncmlkLmlzV2Fsa2FibGVBdCh4IC0gZHgsIHkgKyAxKSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbeCwgeV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZHkgIT09IDApIHtcclxuICAgICAgICAgICAgaWYgKChncmlkLmlzV2Fsa2FibGVBdCh4IC0gMSwgeSkgJiYgIWdyaWQuaXNXYWxrYWJsZUF0KHggLSAxLCB5IC0gZHkpKSB8fFxyXG4gICAgICAgICAgICAgICAgKGdyaWQuaXNXYWxrYWJsZUF0KHggKyAxLCB5KSAmJiAhZ3JpZC5pc1dhbGthYmxlQXQoeCArIDEsIHkgLSBkeSkpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW3gsIHldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFdoZW4gbW92aW5nIHZlcnRpY2FsbHksIG11c3QgY2hlY2sgZm9yIGhvcml6b250YWwganVtcCBwb2ludHNcclxuICAgICAgICAgICAgLy8gaWYgKHRoaXMuX2p1bXAoeCArIDEsIHksIHgsIHkpIHx8IHRoaXMuX2p1bXAoeCAtIDEsIHksIHgsIHkpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gW3gsIHldO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIG1vdmluZyBkaWFnb25hbGx5LCBtdXN0IG1ha2Ugc3VyZSBvbmUgb2YgdGhlIHZlcnRpY2FsL2hvcml6b250YWxcclxuICAgIC8vIG5laWdoYm9ycyBpcyBvcGVuIHRvIGFsbG93IHRoZSBwYXRoXHJcbiAgICBpZiAoZ3JpZC5pc1dhbGthYmxlQXQoeCArIGR4LCB5KSAmJiBncmlkLmlzV2Fsa2FibGVBdCh4LCB5ICsgZHkpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2p1bXAoeCArIGR4LCB5ICsgZHksIHgsIHkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBGaW5kIHRoZSBuZWlnaGJvcnMgZm9yIHRoZSBnaXZlbiBub2RlLiBJZiB0aGUgbm9kZSBoYXMgYSBwYXJlbnQsXHJcbiAqIHBydW5lIHRoZSBuZWlnaGJvcnMgYmFzZWQgb24gdGhlIGp1bXAgcG9pbnQgc2VhcmNoIGFsZ29yaXRobSwgb3RoZXJ3aXNlXHJcbiAqIHJldHVybiBhbGwgYXZhaWxhYmxlIG5laWdoYm9ycy5cclxuICogQHJldHVybiB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IFRoZSBuZWlnaGJvcnMgZm91bmQuXHJcbiAqL1xyXG5KUEZNb3ZlRGlhZ29uYWxseUlmTm9PYnN0YWNsZXMucHJvdG90eXBlLl9maW5kTmVpZ2hib3JzID0gZnVuY3Rpb24obm9kZSkge1xyXG4gICAgdmFyIHBhcmVudCA9IG5vZGUucGFyZW50LFxyXG4gICAgICAgIHggPSBub2RlLngsIHkgPSBub2RlLnksXHJcbiAgICAgICAgZ3JpZCA9IHRoaXMuZ3JpZCxcclxuICAgICAgICBweCwgcHksIG54LCBueSwgZHgsIGR5LFxyXG4gICAgICAgIG5laWdoYm9ycyA9IFtdLCBuZWlnaGJvck5vZGVzLCBuZWlnaGJvck5vZGUsIGksIGw7XHJcblxyXG4gICAgLy8gZGlyZWN0ZWQgcHJ1bmluZzogY2FuIGlnbm9yZSBtb3N0IG5laWdoYm9ycywgdW5sZXNzIGZvcmNlZC5cclxuICAgIGlmIChwYXJlbnQpIHtcclxuICAgICAgICBweCA9IHBhcmVudC54O1xyXG4gICAgICAgIHB5ID0gcGFyZW50Lnk7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBub3JtYWxpemVkIGRpcmVjdGlvbiBvZiB0cmF2ZWxcclxuICAgICAgICBkeCA9ICh4IC0gcHgpIC8gTWF0aC5tYXgoTWF0aC5hYnMoeCAtIHB4KSwgMSk7XHJcbiAgICAgICAgZHkgPSAoeSAtIHB5KSAvIE1hdGgubWF4KE1hdGguYWJzKHkgLSBweSksIDEpO1xyXG5cclxuICAgICAgICAvLyBzZWFyY2ggZGlhZ29uYWxseVxyXG4gICAgICAgIGlmIChkeCAhPT0gMCAmJiBkeSAhPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSArIGR5KSkge1xyXG4gICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3gsIHkgKyBkeV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChncmlkLmlzV2Fsa2FibGVBdCh4ICsgZHgsIHkpKSB7XHJcbiAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCArIGR4LCB5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgKyBkeSkgJiYgZ3JpZC5pc1dhbGthYmxlQXQoeCArIGR4LCB5KSkge1xyXG4gICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggKyBkeCwgeSArIGR5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc2VhcmNoIGhvcml6b250YWxseS92ZXJ0aWNhbGx5XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBpc05leHRXYWxrYWJsZTtcclxuICAgICAgICAgICAgaWYgKGR4ICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpc05leHRXYWxrYWJsZSA9IGdyaWQuaXNXYWxrYWJsZUF0KHggKyBkeCwgeSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNUb3BXYWxrYWJsZSA9IGdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgKyAxKTtcclxuICAgICAgICAgICAgICAgIHZhciBpc0JvdHRvbVdhbGthYmxlID0gZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSAtIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc05leHRXYWxrYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgZHgsIHldKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNUb3BXYWxrYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCArIGR4LCB5ICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNCb3R0b21XYWxrYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCArIGR4LCB5IC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc1RvcFdhbGthYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3gsIHkgKyAxXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNCb3R0b21XYWxrYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4LCB5IC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGR5ICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpc05leHRXYWxrYWJsZSA9IGdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgKyBkeSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNSaWdodFdhbGthYmxlID0gZ3JpZC5pc1dhbGthYmxlQXQoeCArIDEsIHkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzTGVmdFdhbGthYmxlID0gZ3JpZC5pc1dhbGthYmxlQXQoeCAtIDEsIHkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc05leHRXYWxrYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4LCB5ICsgZHldKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNSaWdodFdhbGthYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgMSwgeSArIGR5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0xlZnRXYWxrYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCAtIDEsIHkgKyBkeV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc1JpZ2h0V2Fsa2FibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCArIDEsIHldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc0xlZnRXYWxrYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4IC0gMSwgeV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gcmV0dXJuIGFsbCBuZWlnaGJvcnNcclxuICAgIGVsc2Uge1xyXG4gICAgICAgIG5laWdoYm9yTm9kZXMgPSBncmlkLmdldE5laWdoYm9ycyhub2RlLCBEaWFnb25hbE1vdmVtZW50Lk9ubHlXaGVuTm9PYnN0YWNsZXMpO1xyXG4gICAgICAgIGZvciAoaSA9IDAsIGwgPSBuZWlnaGJvck5vZGVzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xyXG4gICAgICAgICAgICBuZWlnaGJvck5vZGUgPSBuZWlnaGJvck5vZGVzW2ldO1xyXG4gICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbbmVpZ2hib3JOb2RlLngsIG5laWdoYm9yTm9kZS55XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZWlnaGJvcnM7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEpQRk1vdmVEaWFnb25hbGx5SWZOb09ic3RhY2xlcztcclxuIiwiLyoqXHJcbiAqIEBhdXRob3IgaW1vciAvIGh0dHBzOi8vZ2l0aHViLmNvbS9pbW9yXHJcbiAqL1xyXG52YXIgSnVtcFBvaW50RmluZGVyQmFzZSA9IHJlcXVpcmUoJy4vSnVtcFBvaW50RmluZGVyQmFzZScpO1xyXG52YXIgRGlhZ29uYWxNb3ZlbWVudCA9IHJlcXVpcmUoJy4uL2NvcmUvRGlhZ29uYWxNb3ZlbWVudCcpO1xyXG5cclxuLyoqXHJcbiAqIFBhdGggZmluZGVyIHVzaW5nIHRoZSBKdW1wIFBvaW50IFNlYXJjaCBhbGdvcml0aG0gYWxsb3dpbmcgb25seSBob3Jpem9udGFsXHJcbiAqIG9yIHZlcnRpY2FsIG1vdmVtZW50cy5cclxuICovXHJcbmZ1bmN0aW9uIEpQRk5ldmVyTW92ZURpYWdvbmFsbHkob3B0KSB7XHJcbiAgICBKdW1wUG9pbnRGaW5kZXJCYXNlLmNhbGwodGhpcywgb3B0KTtcclxufVxyXG5cclxuSlBGTmV2ZXJNb3ZlRGlhZ29uYWxseS5wcm90b3R5cGUgPSBuZXcgSnVtcFBvaW50RmluZGVyQmFzZSgpO1xyXG5KUEZOZXZlck1vdmVEaWFnb25hbGx5LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEpQRk5ldmVyTW92ZURpYWdvbmFsbHk7XHJcblxyXG4vKipcclxuICogU2VhcmNoIHJlY3Vyc2l2ZWx5IGluIHRoZSBkaXJlY3Rpb24gKHBhcmVudCAtPiBjaGlsZCksIHN0b3BwaW5nIG9ubHkgd2hlbiBhXHJcbiAqIGp1bXAgcG9pbnQgaXMgZm91bmQuXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHJldHVybiB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IFRoZSB4LCB5IGNvb3JkaW5hdGUgb2YgdGhlIGp1bXAgcG9pbnRcclxuICogICAgIGZvdW5kLCBvciBudWxsIGlmIG5vdCBmb3VuZFxyXG4gKi9cclxuSlBGTmV2ZXJNb3ZlRGlhZ29uYWxseS5wcm90b3R5cGUuX2p1bXAgPSBmdW5jdGlvbih4LCB5LCBweCwgcHkpIHtcclxuICAgIHZhciBncmlkID0gdGhpcy5ncmlkLFxyXG4gICAgICAgIGR4ID0geCAtIHB4LCBkeSA9IHkgLSBweTtcclxuXHJcbiAgICBpZiAoIWdyaWQuaXNXYWxrYWJsZUF0KHgsIHkpKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYodGhpcy50cmFja0p1bXBSZWN1cnNpb24gPT09IHRydWUpIHtcclxuICAgICAgICBncmlkLmdldE5vZGVBdCh4LCB5KS50ZXN0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChncmlkLmdldE5vZGVBdCh4LCB5KSA9PT0gdGhpcy5lbmROb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIFt4LCB5XTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZHggIT09IDApIHtcclxuICAgICAgICBpZiAoKGdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgLSAxKSAmJiAhZ3JpZC5pc1dhbGthYmxlQXQoeCAtIGR4LCB5IC0gMSkpIHx8XHJcbiAgICAgICAgICAgIChncmlkLmlzV2Fsa2FibGVBdCh4LCB5ICsgMSkgJiYgIWdyaWQuaXNXYWxrYWJsZUF0KHggLSBkeCwgeSArIDEpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gW3gsIHldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGR5ICE9PSAwKSB7XHJcbiAgICAgICAgaWYgKChncmlkLmlzV2Fsa2FibGVBdCh4IC0gMSwgeSkgJiYgIWdyaWQuaXNXYWxrYWJsZUF0KHggLSAxLCB5IC0gZHkpKSB8fFxyXG4gICAgICAgICAgICAoZ3JpZC5pc1dhbGthYmxlQXQoeCArIDEsIHkpICYmICFncmlkLmlzV2Fsa2FibGVBdCh4ICsgMSwgeSAtIGR5KSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFt4LCB5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9XaGVuIG1vdmluZyB2ZXJ0aWNhbGx5LCBtdXN0IGNoZWNrIGZvciBob3Jpem9udGFsIGp1bXAgcG9pbnRzXHJcbiAgICAgICAgaWYgKHRoaXMuX2p1bXAoeCArIDEsIHksIHgsIHkpIHx8IHRoaXMuX2p1bXAoeCAtIDEsIHksIHgsIHkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbeCwgeV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT25seSBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBtb3ZlbWVudHMgYXJlIGFsbG93ZWRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX2p1bXAoeCArIGR4LCB5ICsgZHksIHgsIHkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZpbmQgdGhlIG5laWdoYm9ycyBmb3IgdGhlIGdpdmVuIG5vZGUuIElmIHRoZSBub2RlIGhhcyBhIHBhcmVudCxcclxuICogcHJ1bmUgdGhlIG5laWdoYm9ycyBiYXNlZCBvbiB0aGUganVtcCBwb2ludCBzZWFyY2ggYWxnb3JpdGhtLCBvdGhlcndpc2VcclxuICogcmV0dXJuIGFsbCBhdmFpbGFibGUgbmVpZ2hib3JzLlxyXG4gKiBAcmV0dXJuIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gVGhlIG5laWdoYm9ycyBmb3VuZC5cclxuICovXHJcbkpQRk5ldmVyTW92ZURpYWdvbmFsbHkucHJvdG90eXBlLl9maW5kTmVpZ2hib3JzID0gZnVuY3Rpb24obm9kZSkge1xyXG4gICAgdmFyIHBhcmVudCA9IG5vZGUucGFyZW50LFxyXG4gICAgICAgIHggPSBub2RlLngsIHkgPSBub2RlLnksXHJcbiAgICAgICAgZ3JpZCA9IHRoaXMuZ3JpZCxcclxuICAgICAgICBweCwgcHksIG54LCBueSwgZHgsIGR5LFxyXG4gICAgICAgIG5laWdoYm9ycyA9IFtdLCBuZWlnaGJvck5vZGVzLCBuZWlnaGJvck5vZGUsIGksIGw7XHJcblxyXG4gICAgLy8gZGlyZWN0ZWQgcHJ1bmluZzogY2FuIGlnbm9yZSBtb3N0IG5laWdoYm9ycywgdW5sZXNzIGZvcmNlZC5cclxuICAgIGlmIChwYXJlbnQpIHtcclxuICAgICAgICBweCA9IHBhcmVudC54O1xyXG4gICAgICAgIHB5ID0gcGFyZW50Lnk7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBub3JtYWxpemVkIGRpcmVjdGlvbiBvZiB0cmF2ZWxcclxuICAgICAgICBkeCA9ICh4IC0gcHgpIC8gTWF0aC5tYXgoTWF0aC5hYnMoeCAtIHB4KSwgMSk7XHJcbiAgICAgICAgZHkgPSAoeSAtIHB5KSAvIE1hdGgubWF4KE1hdGguYWJzKHkgLSBweSksIDEpO1xyXG5cclxuICAgICAgICBpZiAoZHggIT09IDApIHtcclxuICAgICAgICAgICAgaWYgKGdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3gsIHkgLSAxXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgKyAxKSkge1xyXG4gICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3gsIHkgKyAxXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGdyaWQuaXNXYWxrYWJsZUF0KHggKyBkeCwgeSkpIHtcclxuICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgZHgsIHldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkeSAhPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoZ3JpZC5pc1dhbGthYmxlQXQoeCAtIDEsIHkpKSB7XHJcbiAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCAtIDEsIHldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZ3JpZC5pc1dhbGthYmxlQXQoeCArIDEsIHkpKSB7XHJcbiAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCArIDEsIHldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSArIGR5KSkge1xyXG4gICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3gsIHkgKyBkeV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gcmV0dXJuIGFsbCBuZWlnaGJvcnNcclxuICAgIGVsc2Uge1xyXG4gICAgICAgIG5laWdoYm9yTm9kZXMgPSBncmlkLmdldE5laWdoYm9ycyhub2RlLCBEaWFnb25hbE1vdmVtZW50Lk5ldmVyKTtcclxuICAgICAgICBmb3IgKGkgPSAwLCBsID0gbmVpZ2hib3JOb2Rlcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcclxuICAgICAgICAgICAgbmVpZ2hib3JOb2RlID0gbmVpZ2hib3JOb2Rlc1tpXTtcclxuICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW25laWdoYm9yTm9kZS54LCBuZWlnaGJvck5vZGUueV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmVpZ2hib3JzO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBKUEZOZXZlck1vdmVEaWFnb25hbGx5O1xyXG4iLCIvKipcclxuICogQGF1dGhvciBhbmllcm8gLyBodHRwczovL2dpdGh1Yi5jb20vYW5pZXJvXHJcbiAqL1xyXG52YXIgRGlhZ29uYWxNb3ZlbWVudCA9IHJlcXVpcmUoJy4uL2NvcmUvRGlhZ29uYWxNb3ZlbWVudCcpO1xyXG52YXIgSlBGTmV2ZXJNb3ZlRGlhZ29uYWxseSA9IHJlcXVpcmUoJy4vSlBGTmV2ZXJNb3ZlRGlhZ29uYWxseScpO1xyXG52YXIgSlBGQWx3YXlzTW92ZURpYWdvbmFsbHkgPSByZXF1aXJlKCcuL0pQRkFsd2F5c01vdmVEaWFnb25hbGx5Jyk7XHJcbnZhciBKUEZNb3ZlRGlhZ29uYWxseUlmTm9PYnN0YWNsZXMgPSByZXF1aXJlKCcuL0pQRk1vdmVEaWFnb25hbGx5SWZOb09ic3RhY2xlcycpO1xyXG52YXIgSlBGTW92ZURpYWdvbmFsbHlJZkF0TW9zdE9uZU9ic3RhY2xlID0gcmVxdWlyZSgnLi9KUEZNb3ZlRGlhZ29uYWxseUlmQXRNb3N0T25lT2JzdGFjbGUnKTtcclxuXHJcbi8qKlxyXG4gKiBQYXRoIGZpbmRlciB1c2luZyB0aGUgSnVtcCBQb2ludCBTZWFyY2ggYWxnb3JpdGhtXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0LmhldXJpc3RpYyBIZXVyaXN0aWMgZnVuY3Rpb24gdG8gZXN0aW1hdGUgdGhlIGRpc3RhbmNlXHJcbiAqICAgICAoZGVmYXVsdHMgdG8gbWFuaGF0dGFuKS5cclxuICogQHBhcmFtIHtEaWFnb25hbE1vdmVtZW50fSBvcHQuZGlhZ29uYWxNb3ZlbWVudCBDb25kaXRpb24gdW5kZXIgd2hpY2ggZGlhZ29uYWxcclxuICogICAgICBtb3ZlbWVudCB3aWxsIGJlIGFsbG93ZWQuXHJcbiAqL1xyXG5mdW5jdGlvbiBKdW1wUG9pbnRGaW5kZXIob3B0KSB7XHJcbiAgICBvcHQgPSBvcHQgfHwge307XHJcbiAgICBpZiAob3B0LmRpYWdvbmFsTW92ZW1lbnQgPT09IERpYWdvbmFsTW92ZW1lbnQuTmV2ZXIpIHtcclxuICAgICAgICByZXR1cm4gbmV3IEpQRk5ldmVyTW92ZURpYWdvbmFsbHkob3B0KTtcclxuICAgIH0gZWxzZSBpZiAob3B0LmRpYWdvbmFsTW92ZW1lbnQgPT09IERpYWdvbmFsTW92ZW1lbnQuQWx3YXlzKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBKUEZBbHdheXNNb3ZlRGlhZ29uYWxseShvcHQpO1xyXG4gICAgfSBlbHNlIGlmIChvcHQuZGlhZ29uYWxNb3ZlbWVudCA9PT0gRGlhZ29uYWxNb3ZlbWVudC5Pbmx5V2hlbk5vT2JzdGFjbGVzKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBKUEZNb3ZlRGlhZ29uYWxseUlmTm9PYnN0YWNsZXMob3B0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBKUEZNb3ZlRGlhZ29uYWxseUlmQXRNb3N0T25lT2JzdGFjbGUob3B0KTtcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBKdW1wUG9pbnRGaW5kZXI7XHJcbiIsIi8qKlxyXG4gKiBAYXV0aG9yIGltb3IgLyBodHRwczovL2dpdGh1Yi5jb20vaW1vclxyXG4gKi9cclxudmFyIEhlYXAgICAgICAgPSByZXF1aXJlKCdoZWFwJyk7XHJcbnZhciBVdGlsICAgICAgID0gcmVxdWlyZSgnLi4vY29yZS9VdGlsJyk7XHJcbnZhciBIZXVyaXN0aWMgID0gcmVxdWlyZSgnLi4vY29yZS9IZXVyaXN0aWMnKTtcclxudmFyIERpYWdvbmFsTW92ZW1lbnQgPSByZXF1aXJlKCcuLi9jb3JlL0RpYWdvbmFsTW92ZW1lbnQnKTtcclxuXHJcbi8qKlxyXG4gKiBCYXNlIGNsYXNzIGZvciB0aGUgSnVtcCBQb2ludCBTZWFyY2ggYWxnb3JpdGhtXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0LmhldXJpc3RpYyBIZXVyaXN0aWMgZnVuY3Rpb24gdG8gZXN0aW1hdGUgdGhlIGRpc3RhbmNlXHJcbiAqICAgICAoZGVmYXVsdHMgdG8gbWFuaGF0dGFuKS5cclxuICovXHJcbmZ1bmN0aW9uIEp1bXBQb2ludEZpbmRlckJhc2Uob3B0KSB7XHJcbiAgICBvcHQgPSBvcHQgfHwge307XHJcbiAgICB0aGlzLmhldXJpc3RpYyA9IG9wdC5oZXVyaXN0aWMgfHwgSGV1cmlzdGljLm1hbmhhdHRhbjtcclxuICAgIHRoaXMudHJhY2tKdW1wUmVjdXJzaW9uID0gb3B0LnRyYWNrSnVtcFJlY3Vyc2lvbiB8fCBmYWxzZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmQgYW5kIHJldHVybiB0aGUgcGF0aC5cclxuICogQHJldHVybiB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IFRoZSBwYXRoLCBpbmNsdWRpbmcgYm90aCBzdGFydCBhbmRcclxuICogICAgIGVuZCBwb3NpdGlvbnMuXHJcbiAqL1xyXG5KdW1wUG9pbnRGaW5kZXJCYXNlLnByb3RvdHlwZS5maW5kUGF0aCA9IGZ1bmN0aW9uKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLCBncmlkKSB7XHJcbiAgICB2YXIgb3Blbkxpc3QgPSB0aGlzLm9wZW5MaXN0ID0gbmV3IEhlYXAoZnVuY3Rpb24obm9kZUEsIG5vZGVCKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlQS5mIC0gbm9kZUIuZjtcclxuICAgICAgICB9KSxcclxuICAgICAgICBzdGFydE5vZGUgPSB0aGlzLnN0YXJ0Tm9kZSA9IGdyaWQuZ2V0Tm9kZUF0KHN0YXJ0WCwgc3RhcnRZKSxcclxuICAgICAgICBlbmROb2RlID0gdGhpcy5lbmROb2RlID0gZ3JpZC5nZXROb2RlQXQoZW5kWCwgZW5kWSksIG5vZGU7XHJcblxyXG4gICAgdGhpcy5ncmlkID0gZ3JpZDtcclxuXHJcblxyXG4gICAgLy8gc2V0IHRoZSBgZ2AgYW5kIGBmYCB2YWx1ZSBvZiB0aGUgc3RhcnQgbm9kZSB0byBiZSAwXHJcbiAgICBzdGFydE5vZGUuZyA9IDA7XHJcbiAgICBzdGFydE5vZGUuZiA9IDA7XHJcblxyXG4gICAgLy8gcHVzaCB0aGUgc3RhcnQgbm9kZSBpbnRvIHRoZSBvcGVuIGxpc3RcclxuICAgIG9wZW5MaXN0LnB1c2goc3RhcnROb2RlKTtcclxuICAgIHN0YXJ0Tm9kZS5vcGVuZWQgPSB0cnVlO1xyXG5cclxuICAgIC8vIHdoaWxlIHRoZSBvcGVuIGxpc3QgaXMgbm90IGVtcHR5XHJcbiAgICB3aGlsZSAoIW9wZW5MaXN0LmVtcHR5KCkpIHtcclxuICAgICAgICAvLyBwb3AgdGhlIHBvc2l0aW9uIG9mIG5vZGUgd2hpY2ggaGFzIHRoZSBtaW5pbXVtIGBmYCB2YWx1ZS5cclxuICAgICAgICBub2RlID0gb3Blbkxpc3QucG9wKCk7XHJcbiAgICAgICAgbm9kZS5jbG9zZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAobm9kZSA9PT0gZW5kTm9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gVXRpbC5leHBhbmRQYXRoKFV0aWwuYmFja3RyYWNlKGVuZE5vZGUpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2lkZW50aWZ5U3VjY2Vzc29ycyhub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBmYWlsIHRvIGZpbmQgdGhlIHBhdGhcclxuICAgIHJldHVybiBbXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBJZGVudGlmeSBzdWNjZXNzb3JzIGZvciB0aGUgZ2l2ZW4gbm9kZS4gUnVucyBhIGp1bXAgcG9pbnQgc2VhcmNoIGluIHRoZVxyXG4gKiBkaXJlY3Rpb24gb2YgZWFjaCBhdmFpbGFibGUgbmVpZ2hib3IsIGFkZGluZyBhbnkgcG9pbnRzIGZvdW5kIHRvIHRoZSBvcGVuXHJcbiAqIGxpc3QuXHJcbiAqIEBwcm90ZWN0ZWRcclxuICovXHJcbkp1bXBQb2ludEZpbmRlckJhc2UucHJvdG90eXBlLl9pZGVudGlmeVN1Y2Nlc3NvcnMgPSBmdW5jdGlvbihub2RlKSB7XHJcbiAgICB2YXIgZ3JpZCA9IHRoaXMuZ3JpZCxcclxuICAgICAgICBoZXVyaXN0aWMgPSB0aGlzLmhldXJpc3RpYyxcclxuICAgICAgICBvcGVuTGlzdCA9IHRoaXMub3Blbkxpc3QsXHJcbiAgICAgICAgZW5kWCA9IHRoaXMuZW5kTm9kZS54LFxyXG4gICAgICAgIGVuZFkgPSB0aGlzLmVuZE5vZGUueSxcclxuICAgICAgICBuZWlnaGJvcnMsIG5laWdoYm9yLFxyXG4gICAgICAgIGp1bXBQb2ludCwgaSwgbCxcclxuICAgICAgICB4ID0gbm9kZS54LCB5ID0gbm9kZS55LFxyXG4gICAgICAgIGp4LCBqeSwgZHgsIGR5LCBkLCBuZywganVtcE5vZGUsXHJcbiAgICAgICAgYWJzID0gTWF0aC5hYnMsIG1heCA9IE1hdGgubWF4O1xyXG5cclxuICAgIG5laWdoYm9ycyA9IHRoaXMuX2ZpbmROZWlnaGJvcnMobm9kZSk7XHJcbiAgICBmb3IoaSA9IDAsIGwgPSBuZWlnaGJvcnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XHJcbiAgICAgICAgbmVpZ2hib3IgPSBuZWlnaGJvcnNbaV07XHJcbiAgICAgICAganVtcFBvaW50ID0gdGhpcy5fanVtcChuZWlnaGJvclswXSwgbmVpZ2hib3JbMV0sIHgsIHkpO1xyXG4gICAgICAgIGlmIChqdW1wUG9pbnQpIHtcclxuXHJcbiAgICAgICAgICAgIGp4ID0ganVtcFBvaW50WzBdO1xyXG4gICAgICAgICAgICBqeSA9IGp1bXBQb2ludFsxXTtcclxuICAgICAgICAgICAganVtcE5vZGUgPSBncmlkLmdldE5vZGVBdChqeCwgankpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGp1bXBOb2RlLmNsb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGluY2x1ZGUgZGlzdGFuY2UsIGFzIHBhcmVudCBtYXkgbm90IGJlIGltbWVkaWF0ZWx5IGFkamFjZW50OlxyXG4gICAgICAgICAgICBkID0gSGV1cmlzdGljLm9jdGlsZShhYnMoanggLSB4KSwgYWJzKGp5IC0geSkpO1xyXG4gICAgICAgICAgICBuZyA9IG5vZGUuZyArIGQ7IC8vIG5leHQgYGdgIHZhbHVlXHJcblxyXG4gICAgICAgICAgICBpZiAoIWp1bXBOb2RlLm9wZW5lZCB8fCBuZyA8IGp1bXBOb2RlLmcpIHtcclxuICAgICAgICAgICAgICAgIGp1bXBOb2RlLmcgPSBuZztcclxuICAgICAgICAgICAgICAgIGp1bXBOb2RlLmggPSBqdW1wTm9kZS5oIHx8IGhldXJpc3RpYyhhYnMoanggLSBlbmRYKSwgYWJzKGp5IC0gZW5kWSkpO1xyXG4gICAgICAgICAgICAgICAganVtcE5vZGUuZiA9IGp1bXBOb2RlLmcgKyBqdW1wTm9kZS5oO1xyXG4gICAgICAgICAgICAgICAganVtcE5vZGUucGFyZW50ID0gbm9kZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWp1bXBOb2RlLm9wZW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5MaXN0LnB1c2goanVtcE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGp1bXBOb2RlLm9wZW5lZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5MaXN0LnVwZGF0ZUl0ZW0oanVtcE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBKdW1wUG9pbnRGaW5kZXJCYXNlO1xyXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIGRlZmF1bHRQYXJhbXMgPSB7XG4gIHRpdGxlOiAnJyxcbiAgdGV4dDogJycsXG4gIHR5cGU6IG51bGwsXG4gIGFsbG93T3V0c2lkZUNsaWNrOiBmYWxzZSxcbiAgc2hvd0NvbmZpcm1CdXR0b246IHRydWUsXG4gIHNob3dDYW5jZWxCdXR0b246IGZhbHNlLFxuICBjbG9zZU9uQ29uZmlybTogdHJ1ZSxcbiAgY2xvc2VPbkNhbmNlbDogdHJ1ZSxcbiAgY29uZmlybUJ1dHRvblRleHQ6ICdPSycsXG4gIGNvbmZpcm1CdXR0b25Db2xvcjogJyM4Q0Q0RjUnLFxuICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsJyxcbiAgaW1hZ2VVcmw6IG51bGwsXG4gIGltYWdlU2l6ZTogbnVsbCxcbiAgdGltZXI6IG51bGwsXG4gIGN1c3RvbUNsYXNzOiAnJyxcbiAgaHRtbDogZmFsc2UsXG4gIGFuaW1hdGlvbjogdHJ1ZSxcbiAgYWxsb3dFc2NhcGVLZXk6IHRydWUsXG4gIGlucHV0VHlwZTogJ3RleHQnLFxuICBpbnB1dFBsYWNlaG9sZGVyOiAnJyxcbiAgaW5wdXRWYWx1ZTogJycsXG4gIHNob3dMb2FkZXJPbkNvbmZpcm06IGZhbHNlXG59O1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBkZWZhdWx0UGFyYW1zO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jb2xvckx1bWluYW5jZSA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIF9nZXRNb2RhbCA9IHJlcXVpcmUoJy4vaGFuZGxlLXN3YWwtZG9tJyk7XG5cbnZhciBfaGFzQ2xhc3MkaXNEZXNjZW5kYW50ID0gcmVxdWlyZSgnLi9oYW5kbGUtZG9tJyk7XG5cbi8qXG4gKiBVc2VyIGNsaWNrZWQgb24gXCJDb25maXJtXCIvXCJPS1wiIG9yIFwiQ2FuY2VsXCJcbiAqL1xudmFyIGhhbmRsZUJ1dHRvbiA9IGZ1bmN0aW9uIGhhbmRsZUJ1dHRvbihldmVudCwgcGFyYW1zLCBtb2RhbCkge1xuICB2YXIgZSA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcbiAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblxuICB2YXIgdGFyZ2V0ZWRDb25maXJtID0gdGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKCdjb25maXJtJykgIT09IC0xO1xuICB2YXIgdGFyZ2V0ZWRPdmVybGF5ID0gdGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKCdzd2VldC1vdmVybGF5JykgIT09IC0xO1xuICB2YXIgbW9kYWxJc1Zpc2libGUgPSBfaGFzQ2xhc3MkaXNEZXNjZW5kYW50Lmhhc0NsYXNzKG1vZGFsLCAndmlzaWJsZScpO1xuICB2YXIgZG9uZUZ1bmN0aW9uRXhpc3RzID0gcGFyYW1zLmRvbmVGdW5jdGlvbiAmJiBtb2RhbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaGFzLWRvbmUtZnVuY3Rpb24nKSA9PT0gJ3RydWUnO1xuXG4gIC8vIFNpbmNlIHRoZSB1c2VyIGNhbiBjaGFuZ2UgdGhlIGJhY2tncm91bmQtY29sb3Igb2YgdGhlIGNvbmZpcm0gYnV0dG9uIHByb2dyYW1tYXRpY2FsbHksXG4gIC8vIHdlIG11c3QgY2FsY3VsYXRlIHdoYXQgdGhlIGNvbG9yIHNob3VsZCBiZSBvbiBob3Zlci9hY3RpdmVcbiAgdmFyIG5vcm1hbENvbG9yLCBob3ZlckNvbG9yLCBhY3RpdmVDb2xvcjtcbiAgaWYgKHRhcmdldGVkQ29uZmlybSAmJiBwYXJhbXMuY29uZmlybUJ1dHRvbkNvbG9yKSB7XG4gICAgbm9ybWFsQ29sb3IgPSBwYXJhbXMuY29uZmlybUJ1dHRvbkNvbG9yO1xuICAgIGhvdmVyQ29sb3IgPSBfY29sb3JMdW1pbmFuY2UuY29sb3JMdW1pbmFuY2Uobm9ybWFsQ29sb3IsIC0wLjA0KTtcbiAgICBhY3RpdmVDb2xvciA9IF9jb2xvckx1bWluYW5jZS5jb2xvckx1bWluYW5jZShub3JtYWxDb2xvciwgLTAuMTQpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkU2V0Q29uZmlybUJ1dHRvbkNvbG9yKGNvbG9yKSB7XG4gICAgaWYgKHRhcmdldGVkQ29uZmlybSAmJiBwYXJhbXMuY29uZmlybUJ1dHRvbkNvbG9yKSB7XG4gICAgICB0YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XG4gICAgfVxuICB9XG5cbiAgc3dpdGNoIChlLnR5cGUpIHtcbiAgICBjYXNlICdtb3VzZW92ZXInOlxuICAgICAgc2hvdWxkU2V0Q29uZmlybUJ1dHRvbkNvbG9yKGhvdmVyQ29sb3IpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdtb3VzZW91dCc6XG4gICAgICBzaG91bGRTZXRDb25maXJtQnV0dG9uQ29sb3Iobm9ybWFsQ29sb3IpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdtb3VzZWRvd24nOlxuICAgICAgc2hvdWxkU2V0Q29uZmlybUJ1dHRvbkNvbG9yKGFjdGl2ZUNvbG9yKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnbW91c2V1cCc6XG4gICAgICBzaG91bGRTZXRDb25maXJtQnV0dG9uQ29sb3IoaG92ZXJDb2xvcik7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2ZvY3VzJzpcbiAgICAgIHZhciAkY29uZmlybUJ1dHRvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5jb25maXJtJyk7XG4gICAgICB2YXIgJGNhbmNlbEJ1dHRvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5jYW5jZWwnKTtcblxuICAgICAgaWYgKHRhcmdldGVkQ29uZmlybSkge1xuICAgICAgICAkY2FuY2VsQnV0dG9uLnN0eWxlLmJveFNoYWRvdyA9ICdub25lJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRjb25maXJtQnV0dG9uLnN0eWxlLmJveFNoYWRvdyA9ICdub25lJztcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnY2xpY2snOlxuICAgICAgdmFyIGNsaWNrZWRPbk1vZGFsID0gbW9kYWwgPT09IHRhcmdldDtcbiAgICAgIHZhciBjbGlja2VkT25Nb2RhbENoaWxkID0gX2hhc0NsYXNzJGlzRGVzY2VuZGFudC5pc0Rlc2NlbmRhbnQobW9kYWwsIHRhcmdldCk7XG5cbiAgICAgIC8vIElnbm9yZSBjbGljayBvdXRzaWRlIGlmIGFsbG93T3V0c2lkZUNsaWNrIGlzIGZhbHNlXG4gICAgICBpZiAoIWNsaWNrZWRPbk1vZGFsICYmICFjbGlja2VkT25Nb2RhbENoaWxkICYmIG1vZGFsSXNWaXNpYmxlICYmICFwYXJhbXMuYWxsb3dPdXRzaWRlQ2xpY2spIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmICh0YXJnZXRlZENvbmZpcm0gJiYgZG9uZUZ1bmN0aW9uRXhpc3RzICYmIG1vZGFsSXNWaXNpYmxlKSB7XG4gICAgICAgIGhhbmRsZUNvbmZpcm0obW9kYWwsIHBhcmFtcyk7XG4gICAgICB9IGVsc2UgaWYgKGRvbmVGdW5jdGlvbkV4aXN0cyAmJiBtb2RhbElzVmlzaWJsZSB8fCB0YXJnZXRlZE92ZXJsYXkpIHtcbiAgICAgICAgaGFuZGxlQ2FuY2VsKG1vZGFsLCBwYXJhbXMpO1xuICAgICAgfSBlbHNlIGlmIChfaGFzQ2xhc3MkaXNEZXNjZW5kYW50LmlzRGVzY2VuZGFudChtb2RhbCwgdGFyZ2V0KSAmJiB0YXJnZXQudGFnTmFtZSA9PT0gJ0JVVFRPTicpIHtcbiAgICAgICAgc3dlZXRBbGVydC5jbG9zZSgpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gIH1cbn07XG5cbi8qXG4gKiAgVXNlciBjbGlja2VkIG9uIFwiQ29uZmlybVwiL1wiT0tcIlxuICovXG52YXIgaGFuZGxlQ29uZmlybSA9IGZ1bmN0aW9uIGhhbmRsZUNvbmZpcm0obW9kYWwsIHBhcmFtcykge1xuICB2YXIgY2FsbGJhY2tWYWx1ZSA9IHRydWU7XG5cbiAgaWYgKF9oYXNDbGFzcyRpc0Rlc2NlbmRhbnQuaGFzQ2xhc3MobW9kYWwsICdzaG93LWlucHV0JykpIHtcbiAgICBjYWxsYmFja1ZhbHVlID0gbW9kYWwucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZTtcblxuICAgIGlmICghY2FsbGJhY2tWYWx1ZSkge1xuICAgICAgY2FsbGJhY2tWYWx1ZSA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIHBhcmFtcy5kb25lRnVuY3Rpb24oY2FsbGJhY2tWYWx1ZSk7XG5cbiAgaWYgKHBhcmFtcy5jbG9zZU9uQ29uZmlybSkge1xuICAgIHN3ZWV0QWxlcnQuY2xvc2UoKTtcbiAgfVxuICAvLyBEaXNhYmxlIGNhbmNlbCBhbmQgY29uZmlybSBidXR0b24gaWYgdGhlIHBhcmFtZXRlciBpcyB0cnVlXG4gIGlmIChwYXJhbXMuc2hvd0xvYWRlck9uQ29uZmlybSkge1xuICAgIHN3ZWV0QWxlcnQuZGlzYWJsZUJ1dHRvbnMoKTtcbiAgfVxufTtcblxuLypcbiAqICBVc2VyIGNsaWNrZWQgb24gXCJDYW5jZWxcIlxuICovXG52YXIgaGFuZGxlQ2FuY2VsID0gZnVuY3Rpb24gaGFuZGxlQ2FuY2VsKG1vZGFsLCBwYXJhbXMpIHtcbiAgLy8gQ2hlY2sgaWYgY2FsbGJhY2sgZnVuY3Rpb24gZXhwZWN0cyBhIHBhcmFtZXRlciAodG8gdHJhY2sgY2FuY2VsIGFjdGlvbnMpXG4gIHZhciBmdW5jdGlvbkFzU3RyID0gU3RyaW5nKHBhcmFtcy5kb25lRnVuY3Rpb24pLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gIHZhciBmdW5jdGlvbkhhbmRsZXNDYW5jZWwgPSBmdW5jdGlvbkFzU3RyLnN1YnN0cmluZygwLCA5KSA9PT0gJ2Z1bmN0aW9uKCcgJiYgZnVuY3Rpb25Bc1N0ci5zdWJzdHJpbmcoOSwgMTApICE9PSAnKSc7XG5cbiAgaWYgKGZ1bmN0aW9uSGFuZGxlc0NhbmNlbCkge1xuICAgIHBhcmFtcy5kb25lRnVuY3Rpb24oZmFsc2UpO1xuICB9XG5cbiAgaWYgKHBhcmFtcy5jbG9zZU9uQ2FuY2VsKSB7XG4gICAgc3dlZXRBbGVydC5jbG9zZSgpO1xuICB9XG59O1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSB7XG4gIGhhbmRsZUJ1dHRvbjogaGFuZGxlQnV0dG9uLFxuICBoYW5kbGVDb25maXJtOiBoYW5kbGVDb25maXJtLFxuICBoYW5kbGVDYW5jZWw6IGhhbmRsZUNhbmNlbFxufTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgaGFzQ2xhc3MgPSBmdW5jdGlvbiBoYXNDbGFzcyhlbGVtLCBjbGFzc05hbWUpIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoJyAnICsgY2xhc3NOYW1lICsgJyAnKS50ZXN0KCcgJyArIGVsZW0uY2xhc3NOYW1lICsgJyAnKTtcbn07XG5cbnZhciBhZGRDbGFzcyA9IGZ1bmN0aW9uIGFkZENsYXNzKGVsZW0sIGNsYXNzTmFtZSkge1xuICBpZiAoIWhhc0NsYXNzKGVsZW0sIGNsYXNzTmFtZSkpIHtcbiAgICBlbGVtLmNsYXNzTmFtZSArPSAnICcgKyBjbGFzc05hbWU7XG4gIH1cbn07XG5cbnZhciByZW1vdmVDbGFzcyA9IGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGVsZW0sIGNsYXNzTmFtZSkge1xuICB2YXIgbmV3Q2xhc3MgPSAnICcgKyBlbGVtLmNsYXNzTmFtZS5yZXBsYWNlKC9bXFx0XFxyXFxuXS9nLCAnICcpICsgJyAnO1xuICBpZiAoaGFzQ2xhc3MoZWxlbSwgY2xhc3NOYW1lKSkge1xuICAgIHdoaWxlIChuZXdDbGFzcy5pbmRleE9mKCcgJyArIGNsYXNzTmFtZSArICcgJykgPj0gMCkge1xuICAgICAgbmV3Q2xhc3MgPSBuZXdDbGFzcy5yZXBsYWNlKCcgJyArIGNsYXNzTmFtZSArICcgJywgJyAnKTtcbiAgICB9XG4gICAgZWxlbS5jbGFzc05hbWUgPSBuZXdDbGFzcy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gIH1cbn07XG5cbnZhciBlc2NhcGVIdG1sID0gZnVuY3Rpb24gZXNjYXBlSHRtbChzdHIpIHtcbiAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3RyKSk7XG4gIHJldHVybiBkaXYuaW5uZXJIVE1MO1xufTtcblxudmFyIF9zaG93ID0gZnVuY3Rpb24gX3Nob3coZWxlbSkge1xuICBlbGVtLnN0eWxlLm9wYWNpdHkgPSAnJztcbiAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbn07XG5cbnZhciBzaG93ID0gZnVuY3Rpb24gc2hvdyhlbGVtcykge1xuICBpZiAoZWxlbXMgJiYgIWVsZW1zLmxlbmd0aCkge1xuICAgIHJldHVybiBfc2hvdyhlbGVtcyk7XG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtcy5sZW5ndGg7ICsraSkge1xuICAgIF9zaG93KGVsZW1zW2ldKTtcbiAgfVxufTtcblxudmFyIF9oaWRlID0gZnVuY3Rpb24gX2hpZGUoZWxlbSkge1xuICBlbGVtLnN0eWxlLm9wYWNpdHkgPSAnJztcbiAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufTtcblxudmFyIGhpZGUgPSBmdW5jdGlvbiBoaWRlKGVsZW1zKSB7XG4gIGlmIChlbGVtcyAmJiAhZWxlbXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIF9oaWRlKGVsZW1zKTtcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgX2hpZGUoZWxlbXNbaV0pO1xuICB9XG59O1xuXG52YXIgaXNEZXNjZW5kYW50ID0gZnVuY3Rpb24gaXNEZXNjZW5kYW50KHBhcmVudCwgY2hpbGQpIHtcbiAgdmFyIG5vZGUgPSBjaGlsZC5wYXJlbnROb2RlO1xuICB3aGlsZSAobm9kZSAhPT0gbnVsbCkge1xuICAgIGlmIChub2RlID09PSBwYXJlbnQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbnZhciBnZXRUb3BNYXJnaW4gPSBmdW5jdGlvbiBnZXRUb3BNYXJnaW4oZWxlbSkge1xuICBlbGVtLnN0eWxlLmxlZnQgPSAnLTk5OTlweCc7XG4gIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgdmFyIGhlaWdodCA9IGVsZW0uY2xpZW50SGVpZ2h0LFxuICAgICAgcGFkZGluZztcbiAgaWYgKHR5cGVvZiBnZXRDb21wdXRlZFN0eWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIElFIDhcbiAgICBwYWRkaW5nID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKS5nZXRQcm9wZXJ0eVZhbHVlKCdwYWRkaW5nLXRvcCcpLCAxMCk7XG4gIH0gZWxzZSB7XG4gICAgcGFkZGluZyA9IHBhcnNlSW50KGVsZW0uY3VycmVudFN0eWxlLnBhZGRpbmcpO1xuICB9XG5cbiAgZWxlbS5zdHlsZS5sZWZ0ID0gJyc7XG4gIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmV0dXJuICctJyArIHBhcnNlSW50KChoZWlnaHQgKyBwYWRkaW5nKSAvIDIpICsgJ3B4Jztcbn07XG5cbnZhciBmYWRlSW4gPSBmdW5jdGlvbiBmYWRlSW4oZWxlbSwgaW50ZXJ2YWwpIHtcbiAgaWYgKCtlbGVtLnN0eWxlLm9wYWNpdHkgPCAxKSB7XG4gICAgaW50ZXJ2YWwgPSBpbnRlcnZhbCB8fCAxNjtcbiAgICBlbGVtLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgdmFyIGxhc3QgPSArbmV3IERhdGUoKTtcbiAgICB2YXIgdGljayA9IChmdW5jdGlvbiAoX3RpY2spIHtcbiAgICAgIGZ1bmN0aW9uIHRpY2soKSB7XG4gICAgICAgIHJldHVybiBfdGljay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICB0aWNrLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX3RpY2sudG9TdHJpbmcoKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiB0aWNrO1xuICAgIH0pKGZ1bmN0aW9uICgpIHtcbiAgICAgIGVsZW0uc3R5bGUub3BhY2l0eSA9ICtlbGVtLnN0eWxlLm9wYWNpdHkgKyAobmV3IERhdGUoKSAtIGxhc3QpIC8gMTAwO1xuICAgICAgbGFzdCA9ICtuZXcgRGF0ZSgpO1xuXG4gICAgICBpZiAoK2VsZW0uc3R5bGUub3BhY2l0eSA8IDEpIHtcbiAgICAgICAgc2V0VGltZW91dCh0aWNrLCBpbnRlcnZhbCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGljaygpO1xuICB9XG4gIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7IC8vZmFsbGJhY2sgSUU4XG59O1xuXG52YXIgZmFkZU91dCA9IGZ1bmN0aW9uIGZhZGVPdXQoZWxlbSwgaW50ZXJ2YWwpIHtcbiAgaW50ZXJ2YWwgPSBpbnRlcnZhbCB8fCAxNjtcbiAgZWxlbS5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgdmFyIGxhc3QgPSArbmV3IERhdGUoKTtcbiAgdmFyIHRpY2sgPSAoZnVuY3Rpb24gKF90aWNrMikge1xuICAgIGZ1bmN0aW9uIHRpY2soKSB7XG4gICAgICByZXR1cm4gX3RpY2syLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgdGljay50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGljazIudG9TdHJpbmcoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRpY2s7XG4gIH0pKGZ1bmN0aW9uICgpIHtcbiAgICBlbGVtLnN0eWxlLm9wYWNpdHkgPSArZWxlbS5zdHlsZS5vcGFjaXR5IC0gKG5ldyBEYXRlKCkgLSBsYXN0KSAvIDEwMDtcbiAgICBsYXN0ID0gK25ldyBEYXRlKCk7XG5cbiAgICBpZiAoK2VsZW0uc3R5bGUub3BhY2l0eSA+IDApIHtcbiAgICAgIHNldFRpbWVvdXQodGljaywgaW50ZXJ2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICB9KTtcbiAgdGljaygpO1xufTtcblxudmFyIGZpcmVDbGljayA9IGZ1bmN0aW9uIGZpcmVDbGljayhub2RlKSB7XG4gIC8vIFRha2VuIGZyb20gaHR0cDovL3d3dy5ub25vYnRydXNpdmUuY29tLzIwMTEvMTEvMjkvcHJvZ3JhbWF0aWNhbGx5LWZpcmUtY3Jvc3Nicm93c2VyLWNsaWNrLWV2ZW50LXdpdGgtamF2YXNjcmlwdC9cbiAgLy8gVGhlbiBmaXhlZCBmb3IgdG9kYXkncyBDaHJvbWUgYnJvd3Nlci5cbiAgaWYgKHR5cGVvZiBNb3VzZUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gVXAtdG8tZGF0ZSBhcHByb2FjaFxuICAgIHZhciBtZXZ0ID0gbmV3IE1vdXNlRXZlbnQoJ2NsaWNrJywge1xuICAgICAgdmlldzogd2luZG93LFxuICAgICAgYnViYmxlczogZmFsc2UsXG4gICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KG1ldnQpO1xuICB9IGVsc2UgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50KSB7XG4gICAgLy8gRmFsbGJhY2tcbiAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnRzJyk7XG4gICAgZXZ0LmluaXRFdmVudCgnY2xpY2snLCBmYWxzZSwgZmFsc2UpO1xuICAgIG5vZGUuZGlzcGF0Y2hFdmVudChldnQpO1xuICB9IGVsc2UgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KSB7XG4gICAgbm9kZS5maXJlRXZlbnQoJ29uY2xpY2snKTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygbm9kZS5vbmNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgbm9kZS5vbmNsaWNrKCk7XG4gIH1cbn07XG5cbnZhciBzdG9wRXZlbnRQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uIHN0b3BFdmVudFByb3BhZ2F0aW9uKGUpIHtcbiAgLy8gSW4gcGFydGljdWxhciwgbWFrZSBzdXJlIHRoZSBzcGFjZSBiYXIgZG9lc24ndCBzY3JvbGwgdGhlIG1haW4gd2luZG93LlxuICBpZiAodHlwZW9mIGUuc3RvcFByb3BhZ2F0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH0gZWxzZSBpZiAod2luZG93LmV2ZW50ICYmIHdpbmRvdy5ldmVudC5oYXNPd25Qcm9wZXJ0eSgnY2FuY2VsQnViYmxlJykpIHtcbiAgICB3aW5kb3cuZXZlbnQuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgfVxufTtcblxuZXhwb3J0cy5oYXNDbGFzcyA9IGhhc0NsYXNzO1xuZXhwb3J0cy5hZGRDbGFzcyA9IGFkZENsYXNzO1xuZXhwb3J0cy5yZW1vdmVDbGFzcyA9IHJlbW92ZUNsYXNzO1xuZXhwb3J0cy5lc2NhcGVIdG1sID0gZXNjYXBlSHRtbDtcbmV4cG9ydHMuX3Nob3cgPSBfc2hvdztcbmV4cG9ydHMuc2hvdyA9IHNob3c7XG5leHBvcnRzLl9oaWRlID0gX2hpZGU7XG5leHBvcnRzLmhpZGUgPSBoaWRlO1xuZXhwb3J0cy5pc0Rlc2NlbmRhbnQgPSBpc0Rlc2NlbmRhbnQ7XG5leHBvcnRzLmdldFRvcE1hcmdpbiA9IGdldFRvcE1hcmdpbjtcbmV4cG9ydHMuZmFkZUluID0gZmFkZUluO1xuZXhwb3J0cy5mYWRlT3V0ID0gZmFkZU91dDtcbmV4cG9ydHMuZmlyZUNsaWNrID0gZmlyZUNsaWNrO1xuZXhwb3J0cy5zdG9wRXZlbnRQcm9wYWdhdGlvbiA9IHN0b3BFdmVudFByb3BhZ2F0aW9uOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfc3RvcEV2ZW50UHJvcGFnYXRpb24kZmlyZUNsaWNrID0gcmVxdWlyZSgnLi9oYW5kbGUtZG9tJyk7XG5cbnZhciBfc2V0Rm9jdXNTdHlsZSA9IHJlcXVpcmUoJy4vaGFuZGxlLXN3YWwtZG9tJyk7XG5cbnZhciBoYW5kbGVLZXlEb3duID0gZnVuY3Rpb24gaGFuZGxlS2V5RG93bihldmVudCwgcGFyYW1zLCBtb2RhbCkge1xuICB2YXIgZSA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcbiAgdmFyIGtleUNvZGUgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcblxuICB2YXIgJG9rQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignYnV0dG9uLmNvbmZpcm0nKTtcbiAgdmFyICRjYW5jZWxCdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCdidXR0b24uY2FuY2VsJyk7XG4gIHZhciAkbW9kYWxCdXR0b25zID0gbW9kYWwucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uW3RhYmluZGV4XScpO1xuXG4gIGlmIChbOSwgMTMsIDMyLCAyN10uaW5kZXhPZihrZXlDb2RlKSA9PT0gLTEpIHtcbiAgICAvLyBEb24ndCBkbyB3b3JrIG9uIGtleXMgd2UgZG9uJ3QgY2FyZSBhYm91dC5cbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgJHRhcmdldEVsZW1lbnQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG5cbiAgdmFyIGJ0bkluZGV4ID0gLTE7IC8vIEZpbmQgdGhlIGJ1dHRvbiAtIG5vdGUsIHRoaXMgaXMgYSBub2RlbGlzdCwgbm90IGFuIGFycmF5LlxuICBmb3IgKHZhciBpID0gMDsgaSA8ICRtb2RhbEJ1dHRvbnMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoJHRhcmdldEVsZW1lbnQgPT09ICRtb2RhbEJ1dHRvbnNbaV0pIHtcbiAgICAgIGJ0bkluZGV4ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChrZXlDb2RlID09PSA5KSB7XG4gICAgLy8gVEFCXG4gICAgaWYgKGJ0bkluZGV4ID09PSAtMSkge1xuICAgICAgLy8gTm8gYnV0dG9uIGZvY3VzZWQuIEp1bXAgdG8gdGhlIGNvbmZpcm0gYnV0dG9uLlxuICAgICAgJHRhcmdldEVsZW1lbnQgPSAkb2tCdXR0b247XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEN5Y2xlIHRvIHRoZSBuZXh0IGJ1dHRvblxuICAgICAgaWYgKGJ0bkluZGV4ID09PSAkbW9kYWxCdXR0b25zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgJHRhcmdldEVsZW1lbnQgPSAkbW9kYWxCdXR0b25zWzBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHRhcmdldEVsZW1lbnQgPSAkbW9kYWxCdXR0b25zW2J0bkluZGV4ICsgMV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgX3N0b3BFdmVudFByb3BhZ2F0aW9uJGZpcmVDbGljay5zdG9wRXZlbnRQcm9wYWdhdGlvbihlKTtcbiAgICAkdGFyZ2V0RWxlbWVudC5mb2N1cygpO1xuXG4gICAgaWYgKHBhcmFtcy5jb25maXJtQnV0dG9uQ29sb3IpIHtcbiAgICAgIF9zZXRGb2N1c1N0eWxlLnNldEZvY3VzU3R5bGUoJHRhcmdldEVsZW1lbnQsIHBhcmFtcy5jb25maXJtQnV0dG9uQ29sb3IpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoa2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIGlmICgkdGFyZ2V0RWxlbWVudC50YWdOYW1lID09PSAnSU5QVVQnKSB7XG4gICAgICAgICR0YXJnZXRFbGVtZW50ID0gJG9rQnV0dG9uO1xuICAgICAgICAkb2tCdXR0b24uZm9jdXMoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGJ0bkluZGV4ID09PSAtMSkge1xuICAgICAgICAvLyBFTlRFUi9TUEFDRSBjbGlja2VkIG91dHNpZGUgb2YgYSBidXR0b24uXG4gICAgICAgICR0YXJnZXRFbGVtZW50ID0gJG9rQnV0dG9uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRG8gbm90aGluZyAtIGxldCB0aGUgYnJvd3NlciBoYW5kbGUgaXQuXG4gICAgICAgICR0YXJnZXRFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gMjcgJiYgcGFyYW1zLmFsbG93RXNjYXBlS2V5ID09PSB0cnVlKSB7XG4gICAgICAkdGFyZ2V0RWxlbWVudCA9ICRjYW5jZWxCdXR0b247XG4gICAgICBfc3RvcEV2ZW50UHJvcGFnYXRpb24kZmlyZUNsaWNrLmZpcmVDbGljaygkdGFyZ2V0RWxlbWVudCwgZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEZhbGxiYWNrIC0gbGV0IHRoZSBicm93c2VyIGhhbmRsZSBpdC5cbiAgICAgICR0YXJnZXRFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gaGFuZGxlS2V5RG93bjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9oZXhUb1JnYiA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIF9yZW1vdmVDbGFzcyRnZXRUb3BNYXJnaW4kZmFkZUluJHNob3ckYWRkQ2xhc3MgPSByZXF1aXJlKCcuL2hhbmRsZS1kb20nKTtcblxudmFyIF9kZWZhdWx0UGFyYW1zID0gcmVxdWlyZSgnLi9kZWZhdWx0LXBhcmFtcycpO1xuXG52YXIgX2RlZmF1bHRQYXJhbXMyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2RlZmF1bHRQYXJhbXMpO1xuXG4vKlxuICogQWRkIG1vZGFsICsgb3ZlcmxheSB0byBET01cbiAqL1xuXG52YXIgX2luamVjdGVkSFRNTCA9IHJlcXVpcmUoJy4vaW5qZWN0ZWQtaHRtbCcpO1xuXG52YXIgX2luamVjdGVkSFRNTDIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfaW5qZWN0ZWRIVE1MKTtcblxudmFyIG1vZGFsQ2xhc3MgPSAnLnN3ZWV0LWFsZXJ0JztcbnZhciBvdmVybGF5Q2xhc3MgPSAnLnN3ZWV0LW92ZXJsYXknO1xuXG52YXIgc3dlZXRBbGVydEluaXRpYWxpemUgPSBmdW5jdGlvbiBzd2VldEFsZXJ0SW5pdGlhbGl6ZSgpIHtcbiAgdmFyIHN3ZWV0V3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBzd2VldFdyYXAuaW5uZXJIVE1MID0gX2luamVjdGVkSFRNTDJbJ2RlZmF1bHQnXTtcblxuICAvLyBBcHBlbmQgZWxlbWVudHMgdG8gYm9keVxuICB3aGlsZSAoc3dlZXRXcmFwLmZpcnN0Q2hpbGQpIHtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHN3ZWV0V3JhcC5maXJzdENoaWxkKTtcbiAgfVxufTtcblxuLypcbiAqIEdldCBET00gZWxlbWVudCBvZiBtb2RhbFxuICovXG52YXIgZ2V0TW9kYWwgPSAoZnVuY3Rpb24gKF9nZXRNb2RhbCkge1xuICBmdW5jdGlvbiBnZXRNb2RhbCgpIHtcbiAgICByZXR1cm4gX2dldE1vZGFsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBnZXRNb2RhbC50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX2dldE1vZGFsLnRvU3RyaW5nKCk7XG4gIH07XG5cbiAgcmV0dXJuIGdldE1vZGFsO1xufSkoZnVuY3Rpb24gKCkge1xuICB2YXIgJG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb2RhbENsYXNzKTtcblxuICBpZiAoISRtb2RhbCkge1xuICAgIHN3ZWV0QWxlcnRJbml0aWFsaXplKCk7XG4gICAgJG1vZGFsID0gZ2V0TW9kYWwoKTtcbiAgfVxuXG4gIHJldHVybiAkbW9kYWw7XG59KTtcblxuLypcbiAqIEdldCBET00gZWxlbWVudCBvZiBpbnB1dCAoaW4gbW9kYWwpXG4gKi9cbnZhciBnZXRJbnB1dCA9IGZ1bmN0aW9uIGdldElucHV0KCkge1xuICB2YXIgJG1vZGFsID0gZ2V0TW9kYWwoKTtcbiAgaWYgKCRtb2RhbCkge1xuICAgIHJldHVybiAkbW9kYWwucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcbiAgfVxufTtcblxuLypcbiAqIEdldCBET00gZWxlbWVudCBvZiBvdmVybGF5XG4gKi9cbnZhciBnZXRPdmVybGF5ID0gZnVuY3Rpb24gZ2V0T3ZlcmxheSgpIHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3ZlcmxheUNsYXNzKTtcbn07XG5cbi8qXG4gKiBBZGQgYm94LXNoYWRvdyBzdHlsZSB0byBidXR0b24gKGRlcGVuZGluZyBvbiBpdHMgY2hvc2VuIGJnLWNvbG9yKVxuICovXG52YXIgc2V0Rm9jdXNTdHlsZSA9IGZ1bmN0aW9uIHNldEZvY3VzU3R5bGUoJGJ1dHRvbiwgYmdDb2xvcikge1xuICB2YXIgcmdiQ29sb3IgPSBfaGV4VG9SZ2IuaGV4VG9SZ2IoYmdDb2xvcik7XG4gICRidXR0b24uc3R5bGUuYm94U2hhZG93ID0gJzAgMCAycHggcmdiYSgnICsgcmdiQ29sb3IgKyAnLCAwLjgpLCBpbnNldCAwIDAgMCAxcHggcmdiYSgwLCAwLCAwLCAwLjA1KSc7XG59O1xuXG4vKlxuICogQW5pbWF0aW9uIHdoZW4gb3BlbmluZyBtb2RhbFxuICovXG52YXIgb3Blbk1vZGFsID0gZnVuY3Rpb24gb3Blbk1vZGFsKGNhbGxiYWNrKSB7XG4gIHZhciAkbW9kYWwgPSBnZXRNb2RhbCgpO1xuICBfcmVtb3ZlQ2xhc3MkZ2V0VG9wTWFyZ2luJGZhZGVJbiRzaG93JGFkZENsYXNzLmZhZGVJbihnZXRPdmVybGF5KCksIDEwKTtcbiAgX3JlbW92ZUNsYXNzJGdldFRvcE1hcmdpbiRmYWRlSW4kc2hvdyRhZGRDbGFzcy5zaG93KCRtb2RhbCk7XG4gIF9yZW1vdmVDbGFzcyRnZXRUb3BNYXJnaW4kZmFkZUluJHNob3ckYWRkQ2xhc3MuYWRkQ2xhc3MoJG1vZGFsLCAnc2hvd1N3ZWV0QWxlcnQnKTtcbiAgX3JlbW92ZUNsYXNzJGdldFRvcE1hcmdpbiRmYWRlSW4kc2hvdyRhZGRDbGFzcy5yZW1vdmVDbGFzcygkbW9kYWwsICdoaWRlU3dlZXRBbGVydCcpO1xuXG4gIHdpbmRvdy5wcmV2aW91c0FjdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICB2YXIgJG9rQnV0dG9uID0gJG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5jb25maXJtJyk7XG4gICRva0J1dHRvbi5mb2N1cygpO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIF9yZW1vdmVDbGFzcyRnZXRUb3BNYXJnaW4kZmFkZUluJHNob3ckYWRkQ2xhc3MuYWRkQ2xhc3MoJG1vZGFsLCAndmlzaWJsZScpO1xuICB9LCA1MDApO1xuXG4gIHZhciB0aW1lciA9ICRtb2RhbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGltZXInKTtcblxuICBpZiAodGltZXIgIT09ICdudWxsJyAmJiB0aW1lciAhPT0gJycpIHtcbiAgICB2YXIgdGltZXJDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICRtb2RhbC50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgZG9uZUZ1bmN0aW9uRXhpc3RzID0gKHRpbWVyQ2FsbGJhY2sgfHwgbnVsbCkgJiYgJG1vZGFsLmdldEF0dHJpYnV0ZSgnZGF0YS1oYXMtZG9uZS1mdW5jdGlvbicpID09PSAndHJ1ZSc7XG4gICAgICBpZiAoZG9uZUZ1bmN0aW9uRXhpc3RzKSB7XG4gICAgICAgIHRpbWVyQ2FsbGJhY2sobnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2VldEFsZXJ0LmNsb3NlKCk7XG4gICAgICB9XG4gICAgfSwgdGltZXIpO1xuICB9XG59O1xuXG4vKlxuICogUmVzZXQgdGhlIHN0eWxpbmcgb2YgdGhlIGlucHV0XG4gKiAoZm9yIGV4YW1wbGUgaWYgZXJyb3JzIGhhdmUgYmVlbiBzaG93bilcbiAqL1xudmFyIHJlc2V0SW5wdXQgPSBmdW5jdGlvbiByZXNldElucHV0KCkge1xuICB2YXIgJG1vZGFsID0gZ2V0TW9kYWwoKTtcbiAgdmFyICRpbnB1dCA9IGdldElucHV0KCk7XG5cbiAgX3JlbW92ZUNsYXNzJGdldFRvcE1hcmdpbiRmYWRlSW4kc2hvdyRhZGRDbGFzcy5yZW1vdmVDbGFzcygkbW9kYWwsICdzaG93LWlucHV0Jyk7XG4gICRpbnB1dC52YWx1ZSA9IF9kZWZhdWx0UGFyYW1zMlsnZGVmYXVsdCddLmlucHV0VmFsdWU7XG4gICRpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCBfZGVmYXVsdFBhcmFtczJbJ2RlZmF1bHQnXS5pbnB1dFR5cGUpO1xuICAkaW5wdXQuc2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicsIF9kZWZhdWx0UGFyYW1zMlsnZGVmYXVsdCddLmlucHV0UGxhY2Vob2xkZXIpO1xuXG4gIHJlc2V0SW5wdXRFcnJvcigpO1xufTtcblxudmFyIHJlc2V0SW5wdXRFcnJvciA9IGZ1bmN0aW9uIHJlc2V0SW5wdXRFcnJvcihldmVudCkge1xuICAvLyBJZiBwcmVzcyBlbnRlciA9PiBpZ25vcmVcbiAgaWYgKGV2ZW50ICYmIGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyICRtb2RhbCA9IGdldE1vZGFsKCk7XG5cbiAgdmFyICRlcnJvckljb24gPSAkbW9kYWwucXVlcnlTZWxlY3RvcignLnNhLWlucHV0LWVycm9yJyk7XG4gIF9yZW1vdmVDbGFzcyRnZXRUb3BNYXJnaW4kZmFkZUluJHNob3ckYWRkQ2xhc3MucmVtb3ZlQ2xhc3MoJGVycm9ySWNvbiwgJ3Nob3cnKTtcblxuICB2YXIgJGVycm9yQ29udGFpbmVyID0gJG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zYS1lcnJvci1jb250YWluZXInKTtcbiAgX3JlbW92ZUNsYXNzJGdldFRvcE1hcmdpbiRmYWRlSW4kc2hvdyRhZGRDbGFzcy5yZW1vdmVDbGFzcygkZXJyb3JDb250YWluZXIsICdzaG93Jyk7XG59O1xuXG4vKlxuICogU2V0IFwibWFyZ2luLXRvcFwiLXByb3BlcnR5IG9uIG1vZGFsIGJhc2VkIG9uIGl0cyBjb21wdXRlZCBoZWlnaHRcbiAqL1xudmFyIGZpeFZlcnRpY2FsUG9zaXRpb24gPSBmdW5jdGlvbiBmaXhWZXJ0aWNhbFBvc2l0aW9uKCkge1xuICB2YXIgJG1vZGFsID0gZ2V0TW9kYWwoKTtcbiAgJG1vZGFsLnN0eWxlLm1hcmdpblRvcCA9IF9yZW1vdmVDbGFzcyRnZXRUb3BNYXJnaW4kZmFkZUluJHNob3ckYWRkQ2xhc3MuZ2V0VG9wTWFyZ2luKGdldE1vZGFsKCkpO1xufTtcblxuZXhwb3J0cy5zd2VldEFsZXJ0SW5pdGlhbGl6ZSA9IHN3ZWV0QWxlcnRJbml0aWFsaXplO1xuZXhwb3J0cy5nZXRNb2RhbCA9IGdldE1vZGFsO1xuZXhwb3J0cy5nZXRPdmVybGF5ID0gZ2V0T3ZlcmxheTtcbmV4cG9ydHMuZ2V0SW5wdXQgPSBnZXRJbnB1dDtcbmV4cG9ydHMuc2V0Rm9jdXNTdHlsZSA9IHNldEZvY3VzU3R5bGU7XG5leHBvcnRzLm9wZW5Nb2RhbCA9IG9wZW5Nb2RhbDtcbmV4cG9ydHMucmVzZXRJbnB1dCA9IHJlc2V0SW5wdXQ7XG5leHBvcnRzLnJlc2V0SW5wdXRFcnJvciA9IHJlc2V0SW5wdXRFcnJvcjtcbmV4cG9ydHMuZml4VmVydGljYWxQb3NpdGlvbiA9IGZpeFZlcnRpY2FsUG9zaXRpb247IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgaW5qZWN0ZWRIVE1MID1cblxuLy8gRGFyayBvdmVybGF5XG5cIjxkaXYgY2xhc3M9XFxcInN3ZWV0LW92ZXJsYXlcXFwiIHRhYkluZGV4PVxcXCItMVxcXCI+PC9kaXY+XCIgK1xuXG4vLyBNb2RhbFxuXCI8ZGl2IGNsYXNzPVxcXCJzd2VldC1hbGVydFxcXCI+XCIgK1xuXG4vLyBFcnJvciBpY29uXG5cIjxkaXYgY2xhc3M9XFxcInNhLWljb24gc2EtZXJyb3JcXFwiPlxcbiAgICAgIDxzcGFuIGNsYXNzPVxcXCJzYS14LW1hcmtcXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInNhLWxpbmUgc2EtbGVmdFxcXCI+PC9zcGFuPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInNhLWxpbmUgc2EtcmlnaHRcXFwiPjwvc3Bhbj5cXG4gICAgICA8L3NwYW4+XFxuICAgIDwvZGl2PlwiICtcblxuLy8gV2FybmluZyBpY29uXG5cIjxkaXYgY2xhc3M9XFxcInNhLWljb24gc2Etd2FybmluZ1xcXCI+XFxuICAgICAgPHNwYW4gY2xhc3M9XFxcInNhLWJvZHlcXFwiPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cXFwic2EtZG90XFxcIj48L3NwYW4+XFxuICAgIDwvZGl2PlwiICtcblxuLy8gSW5mbyBpY29uXG5cIjxkaXYgY2xhc3M9XFxcInNhLWljb24gc2EtaW5mb1xcXCI+PC9kaXY+XCIgK1xuXG4vLyBTdWNjZXNzIGljb25cblwiPGRpdiBjbGFzcz1cXFwic2EtaWNvbiBzYS1zdWNjZXNzXFxcIj5cXG4gICAgICA8c3BhbiBjbGFzcz1cXFwic2EtbGluZSBzYS10aXBcXFwiPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cXFwic2EtbGluZSBzYS1sb25nXFxcIj48L3NwYW4+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cXFwic2EtcGxhY2Vob2xkZXJcXFwiPjwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcInNhLWZpeFxcXCI+PC9kaXY+XFxuICAgIDwvZGl2PlwiICsgXCI8ZGl2IGNsYXNzPVxcXCJzYS1pY29uIHNhLWN1c3RvbVxcXCI+PC9kaXY+XCIgK1xuXG4vLyBUaXRsZSwgdGV4dCBhbmQgaW5wdXRcblwiPGgyPlRpdGxlPC9oMj5cXG4gICAgPHA+VGV4dDwvcD5cXG4gICAgPGZpZWxkc2V0PlxcbiAgICAgIDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiB0YWJJbmRleD1cXFwiM1xcXCIgLz5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJzYS1pbnB1dC1lcnJvclxcXCI+PC9kaXY+XFxuICAgIDwvZmllbGRzZXQ+XCIgK1xuXG4vLyBJbnB1dCBlcnJvcnNcblwiPGRpdiBjbGFzcz1cXFwic2EtZXJyb3ItY29udGFpbmVyXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJpY29uXFxcIj4hPC9kaXY+XFxuICAgICAgPHA+Tm90IHZhbGlkITwvcD5cXG4gICAgPC9kaXY+XCIgK1xuXG4vLyBDYW5jZWwgYW5kIGNvbmZpcm0gYnV0dG9uc1xuXCI8ZGl2IGNsYXNzPVxcXCJzYS1idXR0b24tY29udGFpbmVyXFxcIj5cXG4gICAgICA8YnV0dG9uIGNsYXNzPVxcXCJjYW5jZWxcXFwiIHRhYkluZGV4PVxcXCIyXFxcIj5DYW5jZWw8L2J1dHRvbj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJzYS1jb25maXJtLWJ1dHRvbi1jb250YWluZXJcXFwiPlxcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwiY29uZmlybVxcXCIgdGFiSW5kZXg9XFxcIjFcXFwiPk9LPC9idXR0b24+XCIgK1xuXG4vLyBMb2FkaW5nIGFuaW1hdGlvblxuXCI8ZGl2IGNsYXNzPVxcXCJsYS1iYWxsLWZhbGxcXFwiPlxcbiAgICAgICAgICA8ZGl2PjwvZGl2PlxcbiAgICAgICAgICA8ZGl2PjwvZGl2PlxcbiAgICAgICAgICA8ZGl2PjwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlwiICtcblxuLy8gRW5kIG9mIG1vZGFsXG5cIjwvZGl2PlwiO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGluamVjdGVkSFRNTDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9pc0lFOCA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIF9nZXRNb2RhbCRnZXRJbnB1dCRzZXRGb2N1c1N0eWxlID0gcmVxdWlyZSgnLi9oYW5kbGUtc3dhbC1kb20nKTtcblxudmFyIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZSA9IHJlcXVpcmUoJy4vaGFuZGxlLWRvbScpO1xuXG52YXIgYWxlcnRUeXBlcyA9IFsnZXJyb3InLCAnd2FybmluZycsICdpbmZvJywgJ3N1Y2Nlc3MnLCAnaW5wdXQnLCAncHJvbXB0J107XG5cbi8qXG4gKiBTZXQgdHlwZSwgdGV4dCBhbmQgYWN0aW9ucyBvbiBtb2RhbFxuICovXG52YXIgc2V0UGFyYW1ldGVycyA9IGZ1bmN0aW9uIHNldFBhcmFtZXRlcnMocGFyYW1zKSB7XG4gIHZhciBtb2RhbCA9IF9nZXRNb2RhbCRnZXRJbnB1dCRzZXRGb2N1c1N0eWxlLmdldE1vZGFsKCk7XG5cbiAgdmFyICR0aXRsZSA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2gyJyk7XG4gIHZhciAkdGV4dCA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ3AnKTtcbiAgdmFyICRjYW5jZWxCdG4gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCdidXR0b24uY2FuY2VsJyk7XG4gIHZhciAkY29uZmlybUJ0biA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5jb25maXJtJyk7XG5cbiAgLypcbiAgICogVGl0bGVcbiAgICovXG4gICR0aXRsZS5pbm5lckhUTUwgPSBwYXJhbXMuaHRtbCA/IHBhcmFtcy50aXRsZSA6IF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZS5lc2NhcGVIdG1sKHBhcmFtcy50aXRsZSkuc3BsaXQoJ1xcbicpLmpvaW4oJzxicj4nKTtcblxuICAvKlxuICAgKiBUZXh0XG4gICAqL1xuICAkdGV4dC5pbm5lckhUTUwgPSBwYXJhbXMuaHRtbCA/IHBhcmFtcy50ZXh0IDogX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlLmVzY2FwZUh0bWwocGFyYW1zLnRleHQgfHwgJycpLnNwbGl0KCdcXG4nKS5qb2luKCc8YnI+Jyk7XG4gIGlmIChwYXJhbXMudGV4dCkgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlLnNob3coJHRleHQpO1xuXG4gIC8qXG4gICAqIEN1c3RvbSBjbGFzc1xuICAgKi9cbiAgaWYgKHBhcmFtcy5jdXN0b21DbGFzcykge1xuICAgIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZS5hZGRDbGFzcyhtb2RhbCwgcGFyYW1zLmN1c3RvbUNsYXNzKTtcbiAgICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtY3VzdG9tLWNsYXNzJywgcGFyYW1zLmN1c3RvbUNsYXNzKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBGaW5kIHByZXZpb3VzbHkgc2V0IGNsYXNzZXMgYW5kIHJlbW92ZSB0aGVtXG4gICAgdmFyIGN1c3RvbUNsYXNzID0gbW9kYWwuZ2V0QXR0cmlidXRlKCdkYXRhLWN1c3RvbS1jbGFzcycpO1xuICAgIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZS5yZW1vdmVDbGFzcyhtb2RhbCwgY3VzdG9tQ2xhc3MpO1xuICAgIG1vZGFsLnNldEF0dHJpYnV0ZSgnZGF0YS1jdXN0b20tY2xhc3MnLCAnJyk7XG4gIH1cblxuICAvKlxuICAgKiBJY29uXG4gICAqL1xuICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUuaGlkZShtb2RhbC5xdWVyeVNlbGVjdG9yQWxsKCcuc2EtaWNvbicpKTtcblxuICBpZiAocGFyYW1zLnR5cGUgJiYgIV9pc0lFOC5pc0lFOCgpKSB7XG4gICAgdmFyIF9yZXQgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgICB2YXIgdmFsaWRUeXBlID0gZmFsc2U7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWxlcnRUeXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAocGFyYW1zLnR5cGUgPT09IGFsZXJ0VHlwZXNbaV0pIHtcbiAgICAgICAgICB2YWxpZFR5cGUgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghdmFsaWRUeXBlKSB7XG4gICAgICAgIGxvZ1N0cignVW5rbm93biBhbGVydCB0eXBlOiAnICsgcGFyYW1zLnR5cGUpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHY6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHZhciB0eXBlc1dpdGhJY29ucyA9IFsnc3VjY2VzcycsICdlcnJvcicsICd3YXJuaW5nJywgJ2luZm8nXTtcbiAgICAgIHZhciAkaWNvbiA9IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHR5cGVzV2l0aEljb25zLmluZGV4T2YocGFyYW1zLnR5cGUpICE9PSAtMSkge1xuICAgICAgICAkaWNvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zYS1pY29uLicgKyAnc2EtJyArIHBhcmFtcy50eXBlKTtcbiAgICAgICAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlLnNob3coJGljb24pO1xuICAgICAgfVxuXG4gICAgICB2YXIgJGlucHV0ID0gX2dldE1vZGFsJGdldElucHV0JHNldEZvY3VzU3R5bGUuZ2V0SW5wdXQoKTtcblxuICAgICAgLy8gQW5pbWF0ZSBpY29uXG4gICAgICBzd2l0Y2ggKHBhcmFtcy50eXBlKSB7XG5cbiAgICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICAgICAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlLmFkZENsYXNzKCRpY29uLCAnYW5pbWF0ZScpO1xuICAgICAgICAgIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZS5hZGRDbGFzcygkaWNvbi5xdWVyeVNlbGVjdG9yKCcuc2EtdGlwJyksICdhbmltYXRlU3VjY2Vzc1RpcCcpO1xuICAgICAgICAgIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZS5hZGRDbGFzcygkaWNvbi5xdWVyeVNlbGVjdG9yKCcuc2EtbG9uZycpLCAnYW5pbWF0ZVN1Y2Nlc3NMb25nJyk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICAgIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZS5hZGRDbGFzcygkaWNvbiwgJ2FuaW1hdGVFcnJvckljb24nKTtcbiAgICAgICAgICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUuYWRkQ2xhc3MoJGljb24ucXVlcnlTZWxlY3RvcignLnNhLXgtbWFyaycpLCAnYW5pbWF0ZVhNYXJrJyk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnd2FybmluZyc6XG4gICAgICAgICAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlLmFkZENsYXNzKCRpY29uLCAncHVsc2VXYXJuaW5nJyk7XG4gICAgICAgICAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlLmFkZENsYXNzKCRpY29uLnF1ZXJ5U2VsZWN0b3IoJy5zYS1ib2R5JyksICdwdWxzZVdhcm5pbmdJbnMnKTtcbiAgICAgICAgICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUuYWRkQ2xhc3MoJGljb24ucXVlcnlTZWxlY3RvcignLnNhLWRvdCcpLCAncHVsc2VXYXJuaW5nSW5zJyk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnaW5wdXQnOlxuICAgICAgICBjYXNlICdwcm9tcHQnOlxuICAgICAgICAgICRpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCBwYXJhbXMuaW5wdXRUeXBlKTtcbiAgICAgICAgICAkaW5wdXQudmFsdWUgPSBwYXJhbXMuaW5wdXRWYWx1ZTtcbiAgICAgICAgICAkaW5wdXQuc2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicsIHBhcmFtcy5pbnB1dFBsYWNlaG9sZGVyKTtcbiAgICAgICAgICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUuYWRkQ2xhc3MobW9kYWwsICdzaG93LWlucHV0Jyk7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgICRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHN3YWwucmVzZXRJbnB1dEVycm9yKTtcbiAgICAgICAgICB9LCA0MDApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pKCk7XG5cbiAgICBpZiAodHlwZW9mIF9yZXQgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gX3JldC52O1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIEN1c3RvbSBpbWFnZVxuICAgKi9cbiAgaWYgKHBhcmFtcy5pbWFnZVVybCkge1xuICAgIHZhciAkY3VzdG9tSWNvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zYS1pY29uLnNhLWN1c3RvbScpO1xuXG4gICAgJGN1c3RvbUljb24uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybCgnICsgcGFyYW1zLmltYWdlVXJsICsgJyknO1xuICAgIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZS5zaG93KCRjdXN0b21JY29uKTtcblxuICAgIHZhciBfaW1nV2lkdGggPSA4MDtcbiAgICB2YXIgX2ltZ0hlaWdodCA9IDgwO1xuXG4gICAgaWYgKHBhcmFtcy5pbWFnZVNpemUpIHtcbiAgICAgIHZhciBkaW1lbnNpb25zID0gcGFyYW1zLmltYWdlU2l6ZS50b1N0cmluZygpLnNwbGl0KCd4Jyk7XG4gICAgICB2YXIgaW1nV2lkdGggPSBkaW1lbnNpb25zWzBdO1xuICAgICAgdmFyIGltZ0hlaWdodCA9IGRpbWVuc2lvbnNbMV07XG5cbiAgICAgIGlmICghaW1nV2lkdGggfHwgIWltZ0hlaWdodCkge1xuICAgICAgICBsb2dTdHIoJ1BhcmFtZXRlciBpbWFnZVNpemUgZXhwZWN0cyB2YWx1ZSB3aXRoIGZvcm1hdCBXSURUSHhIRUlHSFQsIGdvdCAnICsgcGFyYW1zLmltYWdlU2l6ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfaW1nV2lkdGggPSBpbWdXaWR0aDtcbiAgICAgICAgX2ltZ0hlaWdodCA9IGltZ0hlaWdodDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAkY3VzdG9tSWNvbi5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJGN1c3RvbUljb24uZ2V0QXR0cmlidXRlKCdzdHlsZScpICsgJ3dpZHRoOicgKyBfaW1nV2lkdGggKyAncHg7IGhlaWdodDonICsgX2ltZ0hlaWdodCArICdweCcpO1xuICB9XG5cbiAgLypcbiAgICogU2hvdyBjYW5jZWwgYnV0dG9uP1xuICAgKi9cbiAgbW9kYWwuc2V0QXR0cmlidXRlKCdkYXRhLWhhcy1jYW5jZWwtYnV0dG9uJywgcGFyYW1zLnNob3dDYW5jZWxCdXR0b24pO1xuICBpZiAocGFyYW1zLnNob3dDYW5jZWxCdXR0b24pIHtcbiAgICAkY2FuY2VsQnRuLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcbiAgfSBlbHNlIHtcbiAgICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUuaGlkZSgkY2FuY2VsQnRuKTtcbiAgfVxuXG4gIC8qXG4gICAqIFNob3cgY29uZmlybSBidXR0b24/XG4gICAqL1xuICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaGFzLWNvbmZpcm0tYnV0dG9uJywgcGFyYW1zLnNob3dDb25maXJtQnV0dG9uKTtcbiAgaWYgKHBhcmFtcy5zaG93Q29uZmlybUJ1dHRvbikge1xuICAgICRjb25maXJtQnRuLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcbiAgfSBlbHNlIHtcbiAgICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUuaGlkZSgkY29uZmlybUJ0bik7XG4gIH1cblxuICAvKlxuICAgKiBDdXN0b20gdGV4dCBvbiBjYW5jZWwvY29uZmlybSBidXR0b25zXG4gICAqL1xuICBpZiAocGFyYW1zLmNhbmNlbEJ1dHRvblRleHQpIHtcbiAgICAkY2FuY2VsQnRuLmlubmVySFRNTCA9IF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZS5lc2NhcGVIdG1sKHBhcmFtcy5jYW5jZWxCdXR0b25UZXh0KTtcbiAgfVxuICBpZiAocGFyYW1zLmNvbmZpcm1CdXR0b25UZXh0KSB7XG4gICAgJGNvbmZpcm1CdG4uaW5uZXJIVE1MID0gX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlLmVzY2FwZUh0bWwocGFyYW1zLmNvbmZpcm1CdXR0b25UZXh0KTtcbiAgfVxuXG4gIC8qXG4gICAqIEN1c3RvbSBjb2xvciBvbiBjb25maXJtIGJ1dHRvblxuICAgKi9cbiAgaWYgKHBhcmFtcy5jb25maXJtQnV0dG9uQ29sb3IpIHtcbiAgICAvLyBTZXQgY29uZmlybSBidXR0b24gdG8gc2VsZWN0ZWQgYmFja2dyb3VuZCBjb2xvclxuICAgICRjb25maXJtQnRuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHBhcmFtcy5jb25maXJtQnV0dG9uQ29sb3I7XG5cbiAgICAvLyBTZXQgdGhlIGNvbmZpcm0gYnV0dG9uIGNvbG9yIHRvIHRoZSBsb2FkaW5nIHJpbmdcbiAgICAkY29uZmlybUJ0bi5zdHlsZS5ib3JkZXJMZWZ0Q29sb3IgPSBwYXJhbXMuY29uZmlybUxvYWRpbmdCdXR0b25Db2xvcjtcbiAgICAkY29uZmlybUJ0bi5zdHlsZS5ib3JkZXJSaWdodENvbG9yID0gcGFyYW1zLmNvbmZpcm1Mb2FkaW5nQnV0dG9uQ29sb3I7XG5cbiAgICAvLyBTZXQgYm94LXNoYWRvdyB0byBkZWZhdWx0IGZvY3VzZWQgYnV0dG9uXG4gICAgX2dldE1vZGFsJGdldElucHV0JHNldEZvY3VzU3R5bGUuc2V0Rm9jdXNTdHlsZSgkY29uZmlybUJ0biwgcGFyYW1zLmNvbmZpcm1CdXR0b25Db2xvcik7XG4gIH1cblxuICAvKlxuICAgKiBBbGxvdyBvdXRzaWRlIGNsaWNrXG4gICAqL1xuICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWxsb3ctb3V0c2lkZS1jbGljaycsIHBhcmFtcy5hbGxvd091dHNpZGVDbGljayk7XG5cbiAgLypcbiAgICogQ2FsbGJhY2sgZnVuY3Rpb25cbiAgICovXG4gIHZhciBoYXNEb25lRnVuY3Rpb24gPSBwYXJhbXMuZG9uZUZ1bmN0aW9uID8gdHJ1ZSA6IGZhbHNlO1xuICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaGFzLWRvbmUtZnVuY3Rpb24nLCBoYXNEb25lRnVuY3Rpb24pO1xuXG4gIC8qXG4gICAqIEFuaW1hdGlvblxuICAgKi9cbiAgaWYgKCFwYXJhbXMuYW5pbWF0aW9uKSB7XG4gICAgbW9kYWwuc2V0QXR0cmlidXRlKCdkYXRhLWFuaW1hdGlvbicsICdub25lJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcy5hbmltYXRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgbW9kYWwuc2V0QXR0cmlidXRlKCdkYXRhLWFuaW1hdGlvbicsIHBhcmFtcy5hbmltYXRpb24pOyAvLyBDdXN0b20gYW5pbWF0aW9uXG4gIH0gZWxzZSB7XG4gICAgbW9kYWwuc2V0QXR0cmlidXRlKCdkYXRhLWFuaW1hdGlvbicsICdwb3AnKTtcbiAgfVxuXG4gIC8qXG4gICAqIFRpbWVyXG4gICAqL1xuICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGltZXInLCBwYXJhbXMudGltZXIpO1xufTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gc2V0UGFyYW1ldGVycztcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG4vKlxuICogQWxsb3cgdXNlciB0byBwYXNzIHRoZWlyIG93biBwYXJhbXNcbiAqL1xudmFyIGV4dGVuZCA9IGZ1bmN0aW9uIGV4dGVuZChhLCBiKSB7XG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGIuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYTtcbn07XG5cbi8qXG4gKiBDb252ZXJ0IEhFWCBjb2RlcyB0byBSR0IgdmFsdWVzICgjMDAwMDAwIC0+IHJnYigwLDAsMCkpXG4gKi9cbnZhciBoZXhUb1JnYiA9IGZ1bmN0aW9uIGhleFRvUmdiKGhleCkge1xuICB2YXIgcmVzdWx0ID0gL14jPyhbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KSQvaS5leGVjKGhleCk7XG4gIHJldHVybiByZXN1bHQgPyBwYXJzZUludChyZXN1bHRbMV0sIDE2KSArICcsICcgKyBwYXJzZUludChyZXN1bHRbMl0sIDE2KSArICcsICcgKyBwYXJzZUludChyZXN1bHRbM10sIDE2KSA6IG51bGw7XG59O1xuXG4vKlxuICogQ2hlY2sgaWYgdGhlIHVzZXIgaXMgdXNpbmcgSW50ZXJuZXQgRXhwbG9yZXIgOCAoZm9yIGZhbGxiYWNrcylcbiAqL1xudmFyIGlzSUU4ID0gZnVuY3Rpb24gaXNJRTgoKSB7XG4gIHJldHVybiB3aW5kb3cuYXR0YWNoRXZlbnQgJiYgIXdpbmRvdy5hZGRFdmVudExpc3RlbmVyO1xufTtcblxuLypcbiAqIElFIGNvbXBhdGlibGUgbG9nZ2luZyBmb3IgZGV2ZWxvcGVyc1xuICovXG52YXIgbG9nU3RyID0gZnVuY3Rpb24gbG9nU3RyKHN0cmluZykge1xuICBpZiAod2luZG93LmNvbnNvbGUpIHtcbiAgICAvLyBJRS4uLlxuICAgIHdpbmRvdy5jb25zb2xlLmxvZygnU3dlZXRBbGVydDogJyArIHN0cmluZyk7XG4gIH1cbn07XG5cbi8qXG4gKiBTZXQgaG92ZXIsIGFjdGl2ZSBhbmQgZm9jdXMtc3RhdGVzIGZvciBidXR0b25zIFxuICogKHNvdXJjZTogaHR0cDovL3d3dy5zaXRlcG9pbnQuY29tL2phdmFzY3JpcHQtZ2VuZXJhdGUtbGlnaHRlci1kYXJrZXItY29sb3IpXG4gKi9cbnZhciBjb2xvckx1bWluYW5jZSA9IGZ1bmN0aW9uIGNvbG9yTHVtaW5hbmNlKGhleCwgbHVtKSB7XG4gIC8vIFZhbGlkYXRlIGhleCBzdHJpbmdcbiAgaGV4ID0gU3RyaW5nKGhleCkucmVwbGFjZSgvW14wLTlhLWZdL2dpLCAnJyk7XG4gIGlmIChoZXgubGVuZ3RoIDwgNikge1xuICAgIGhleCA9IGhleFswXSArIGhleFswXSArIGhleFsxXSArIGhleFsxXSArIGhleFsyXSArIGhleFsyXTtcbiAgfVxuICBsdW0gPSBsdW0gfHwgMDtcblxuICAvLyBDb252ZXJ0IHRvIGRlY2ltYWwgYW5kIGNoYW5nZSBsdW1pbm9zaXR5XG4gIHZhciByZ2IgPSAnIyc7XG4gIHZhciBjO1xuICB2YXIgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgYyA9IHBhcnNlSW50KGhleC5zdWJzdHIoaSAqIDIsIDIpLCAxNik7XG4gICAgYyA9IE1hdGgucm91bmQoTWF0aC5taW4oTWF0aC5tYXgoMCwgYyArIGMgKiBsdW0pLCAyNTUpKS50b1N0cmluZygxNik7XG4gICAgcmdiICs9ICgnMDAnICsgYykuc3Vic3RyKGMubGVuZ3RoKTtcbiAgfVxuXG4gIHJldHVybiByZ2I7XG59O1xuXG5leHBvcnRzLmV4dGVuZCA9IGV4dGVuZDtcbmV4cG9ydHMuaGV4VG9SZ2IgPSBoZXhUb1JnYjtcbmV4cG9ydHMuaXNJRTggPSBpc0lFODtcbmV4cG9ydHMubG9nU3RyID0gbG9nU3RyO1xuZXhwb3J0cy5jb2xvckx1bWluYW5jZSA9IGNvbG9yTHVtaW5hbmNlOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbi8vIFN3ZWV0QWxlcnRcbi8vIDIwMTQtMjAxNSAoYykgLSBUcmlzdGFuIEVkd2FyZHNcbi8vIGdpdGh1Yi5jb20vdDR0NS9zd2VldGFsZXJ0XG5cbi8qXG4gKiBqUXVlcnktbGlrZSBmdW5jdGlvbnMgZm9yIG1hbmlwdWxhdGluZyB0aGUgRE9NXG4gKi9cblxudmFyIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZSRpc0Rlc2NlbmRhbnQkZ2V0VG9wTWFyZ2luJGZhZGVJbiRmYWRlT3V0JGZpcmVDbGljayRzdG9wRXZlbnRQcm9wYWdhdGlvbiA9IHJlcXVpcmUoJy4vbW9kdWxlcy9oYW5kbGUtZG9tJyk7XG5cbi8qXG4gKiBIYW5keSB1dGlsaXRpZXNcbiAqL1xuXG52YXIgX2V4dGVuZCRoZXhUb1JnYiRpc0lFOCRsb2dTdHIkY29sb3JMdW1pbmFuY2UgPSByZXF1aXJlKCcuL21vZHVsZXMvdXRpbHMnKTtcblxuLypcbiAqICBIYW5kbGUgc3dlZXRBbGVydCdzIERPTSBlbGVtZW50c1xuICovXG5cbnZhciBfc3dlZXRBbGVydEluaXRpYWxpemUkZ2V0TW9kYWwkZ2V0T3ZlcmxheSRnZXRJbnB1dCRzZXRGb2N1c1N0eWxlJG9wZW5Nb2RhbCRyZXNldElucHV0JGZpeFZlcnRpY2FsUG9zaXRpb24gPSByZXF1aXJlKCcuL21vZHVsZXMvaGFuZGxlLXN3YWwtZG9tJyk7XG5cbi8vIEhhbmRsZSBidXR0b24gZXZlbnRzIGFuZCBrZXlib2FyZCBldmVudHNcblxudmFyIF9oYW5kbGVCdXR0b24kaGFuZGxlQ29uZmlybSRoYW5kbGVDYW5jZWwgPSByZXF1aXJlKCcuL21vZHVsZXMvaGFuZGxlLWNsaWNrJyk7XG5cbnZhciBfaGFuZGxlS2V5RG93biA9IHJlcXVpcmUoJy4vbW9kdWxlcy9oYW5kbGUta2V5Jyk7XG5cbnZhciBfaGFuZGxlS2V5RG93bjIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfaGFuZGxlS2V5RG93bik7XG5cbi8vIERlZmF1bHQgdmFsdWVzXG5cbnZhciBfZGVmYXVsdFBhcmFtcyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9kZWZhdWx0LXBhcmFtcycpO1xuXG52YXIgX2RlZmF1bHRQYXJhbXMyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2RlZmF1bHRQYXJhbXMpO1xuXG52YXIgX3NldFBhcmFtZXRlcnMgPSByZXF1aXJlKCcuL21vZHVsZXMvc2V0LXBhcmFtcycpO1xuXG52YXIgX3NldFBhcmFtZXRlcnMyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3NldFBhcmFtZXRlcnMpO1xuXG4vKlxuICogUmVtZW1iZXIgc3RhdGUgaW4gY2FzZXMgd2hlcmUgb3BlbmluZyBhbmQgaGFuZGxpbmcgYSBtb2RhbCB3aWxsIGZpZGRsZSB3aXRoIGl0LlxuICogKFdlIGFsc28gdXNlIHdpbmRvdy5wcmV2aW91c0FjdGl2ZUVsZW1lbnQgYXMgYSBnbG9iYWwgdmFyaWFibGUpXG4gKi9cbnZhciBwcmV2aW91c1dpbmRvd0tleURvd247XG52YXIgbGFzdEZvY3VzZWRCdXR0b247XG5cbi8qXG4gKiBHbG9iYWwgc3dlZXRBbGVydCBmdW5jdGlvblxuICogKHRoaXMgaXMgd2hhdCB0aGUgdXNlciBjYWxscylcbiAqL1xudmFyIHN3ZWV0QWxlcnQsIHN3YWw7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHN3ZWV0QWxlcnQgPSBzd2FsID0gZnVuY3Rpb24gKCkge1xuICB2YXIgY3VzdG9taXphdGlvbnMgPSBhcmd1bWVudHNbMF07XG5cbiAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlJGlzRGVzY2VuZGFudCRnZXRUb3BNYXJnaW4kZmFkZUluJGZhZGVPdXQkZmlyZUNsaWNrJHN0b3BFdmVudFByb3BhZ2F0aW9uLmFkZENsYXNzKGRvY3VtZW50LmJvZHksICdzdG9wLXNjcm9sbGluZycpO1xuICBfc3dlZXRBbGVydEluaXRpYWxpemUkZ2V0TW9kYWwkZ2V0T3ZlcmxheSRnZXRJbnB1dCRzZXRGb2N1c1N0eWxlJG9wZW5Nb2RhbCRyZXNldElucHV0JGZpeFZlcnRpY2FsUG9zaXRpb24ucmVzZXRJbnB1dCgpO1xuXG4gIC8qXG4gICAqIFVzZSBhcmd1bWVudCBpZiBkZWZpbmVkIG9yIGRlZmF1bHQgdmFsdWUgZnJvbSBwYXJhbXMgb2JqZWN0IG90aGVyd2lzZS5cbiAgICogU3VwcG9ydHMgdGhlIGNhc2Ugd2hlcmUgYSBkZWZhdWx0IHZhbHVlIGlzIGJvb2xlYW4gdHJ1ZSBhbmQgc2hvdWxkIGJlXG4gICAqIG92ZXJyaWRkZW4gYnkgYSBjb3JyZXNwb25kaW5nIGV4cGxpY2l0IGFyZ3VtZW50IHdoaWNoIGlzIGJvb2xlYW4gZmFsc2UuXG4gICAqL1xuICBmdW5jdGlvbiBhcmd1bWVudE9yRGVmYXVsdChrZXkpIHtcbiAgICB2YXIgYXJncyA9IGN1c3RvbWl6YXRpb25zO1xuICAgIHJldHVybiBhcmdzW2tleV0gPT09IHVuZGVmaW5lZCA/IF9kZWZhdWx0UGFyYW1zMlsnZGVmYXVsdCddW2tleV0gOiBhcmdzW2tleV07XG4gIH1cblxuICBpZiAoY3VzdG9taXphdGlvbnMgPT09IHVuZGVmaW5lZCkge1xuICAgIF9leHRlbmQkaGV4VG9SZ2IkaXNJRTgkbG9nU3RyJGNvbG9yTHVtaW5hbmNlLmxvZ1N0cignU3dlZXRBbGVydCBleHBlY3RzIGF0IGxlYXN0IDEgYXR0cmlidXRlIScpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBwYXJhbXMgPSBfZXh0ZW5kJGhleFRvUmdiJGlzSUU4JGxvZ1N0ciRjb2xvckx1bWluYW5jZS5leHRlbmQoe30sIF9kZWZhdWx0UGFyYW1zMlsnZGVmYXVsdCddKTtcblxuICBzd2l0Y2ggKHR5cGVvZiBjdXN0b21pemF0aW9ucykge1xuXG4gICAgLy8gRXg6IHN3YWwoXCJIZWxsb1wiLCBcIkp1c3QgdGVzdGluZ1wiLCBcImluZm9cIik7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHBhcmFtcy50aXRsZSA9IGN1c3RvbWl6YXRpb25zO1xuICAgICAgcGFyYW1zLnRleHQgPSBhcmd1bWVudHNbMV0gfHwgJyc7XG4gICAgICBwYXJhbXMudHlwZSA9IGFyZ3VtZW50c1syXSB8fCAnJztcbiAgICAgIGJyZWFrO1xuXG4gICAgLy8gRXg6IHN3YWwoeyB0aXRsZTpcIkhlbGxvXCIsIHRleHQ6IFwiSnVzdCB0ZXN0aW5nXCIsIHR5cGU6IFwiaW5mb1wiIH0pO1xuICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICBpZiAoY3VzdG9taXphdGlvbnMudGl0bGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBfZXh0ZW5kJGhleFRvUmdiJGlzSUU4JGxvZ1N0ciRjb2xvckx1bWluYW5jZS5sb2dTdHIoJ01pc3NpbmcgXCJ0aXRsZVwiIGFyZ3VtZW50IScpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHBhcmFtcy50aXRsZSA9IGN1c3RvbWl6YXRpb25zLnRpdGxlO1xuXG4gICAgICBmb3IgKHZhciBjdXN0b21OYW1lIGluIF9kZWZhdWx0UGFyYW1zMlsnZGVmYXVsdCddKSB7XG4gICAgICAgIHBhcmFtc1tjdXN0b21OYW1lXSA9IGFyZ3VtZW50T3JEZWZhdWx0KGN1c3RvbU5hbWUpO1xuICAgICAgfVxuXG4gICAgICAvLyBTaG93IFwiQ29uZmlybVwiIGluc3RlYWQgb2YgXCJPS1wiIGlmIGNhbmNlbCBidXR0b24gaXMgdmlzaWJsZVxuICAgICAgcGFyYW1zLmNvbmZpcm1CdXR0b25UZXh0ID0gcGFyYW1zLnNob3dDYW5jZWxCdXR0b24gPyAnQ29uZmlybScgOiBfZGVmYXVsdFBhcmFtczJbJ2RlZmF1bHQnXS5jb25maXJtQnV0dG9uVGV4dDtcbiAgICAgIHBhcmFtcy5jb25maXJtQnV0dG9uVGV4dCA9IGFyZ3VtZW50T3JEZWZhdWx0KCdjb25maXJtQnV0dG9uVGV4dCcpO1xuXG4gICAgICAvLyBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIGNsaWNraW5nIG9uIFwiT0tcIi9cIkNhbmNlbFwiXG4gICAgICBwYXJhbXMuZG9uZUZ1bmN0aW9uID0gYXJndW1lbnRzWzFdIHx8IG51bGw7XG5cbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIF9leHRlbmQkaGV4VG9SZ2IkaXNJRTgkbG9nU3RyJGNvbG9yTHVtaW5hbmNlLmxvZ1N0cignVW5leHBlY3RlZCB0eXBlIG9mIGFyZ3VtZW50ISBFeHBlY3RlZCBcInN0cmluZ1wiIG9yIFwib2JqZWN0XCIsIGdvdCAnICsgdHlwZW9mIGN1c3RvbWl6YXRpb25zKTtcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICB9XG5cbiAgX3NldFBhcmFtZXRlcnMyWydkZWZhdWx0J10ocGFyYW1zKTtcbiAgX3N3ZWV0QWxlcnRJbml0aWFsaXplJGdldE1vZGFsJGdldE92ZXJsYXkkZ2V0SW5wdXQkc2V0Rm9jdXNTdHlsZSRvcGVuTW9kYWwkcmVzZXRJbnB1dCRmaXhWZXJ0aWNhbFBvc2l0aW9uLmZpeFZlcnRpY2FsUG9zaXRpb24oKTtcbiAgX3N3ZWV0QWxlcnRJbml0aWFsaXplJGdldE1vZGFsJGdldE92ZXJsYXkkZ2V0SW5wdXQkc2V0Rm9jdXNTdHlsZSRvcGVuTW9kYWwkcmVzZXRJbnB1dCRmaXhWZXJ0aWNhbFBvc2l0aW9uLm9wZW5Nb2RhbChhcmd1bWVudHNbMV0pO1xuXG4gIC8vIE1vZGFsIGludGVyYWN0aW9uc1xuICB2YXIgbW9kYWwgPSBfc3dlZXRBbGVydEluaXRpYWxpemUkZ2V0TW9kYWwkZ2V0T3ZlcmxheSRnZXRJbnB1dCRzZXRGb2N1c1N0eWxlJG9wZW5Nb2RhbCRyZXNldElucHV0JGZpeFZlcnRpY2FsUG9zaXRpb24uZ2V0TW9kYWwoKTtcblxuICAvKlxuICAgKiBNYWtlIHN1cmUgYWxsIG1vZGFsIGJ1dHRvbnMgcmVzcG9uZCB0byBhbGwgZXZlbnRzXG4gICAqL1xuICB2YXIgJGJ1dHRvbnMgPSBtb2RhbC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcbiAgdmFyIGJ1dHRvbkV2ZW50cyA9IFsnb25jbGljaycsICdvbm1vdXNlb3ZlcicsICdvbm1vdXNlb3V0JywgJ29ubW91c2Vkb3duJywgJ29ubW91c2V1cCcsICdvbmZvY3VzJ107XG4gIHZhciBvbkJ1dHRvbkV2ZW50ID0gZnVuY3Rpb24gb25CdXR0b25FdmVudChlKSB7XG4gICAgcmV0dXJuIF9oYW5kbGVCdXR0b24kaGFuZGxlQ29uZmlybSRoYW5kbGVDYW5jZWwuaGFuZGxlQnV0dG9uKGUsIHBhcmFtcywgbW9kYWwpO1xuICB9O1xuXG4gIGZvciAodmFyIGJ0bkluZGV4ID0gMDsgYnRuSW5kZXggPCAkYnV0dG9ucy5sZW5ndGg7IGJ0bkluZGV4KyspIHtcbiAgICBmb3IgKHZhciBldnRJbmRleCA9IDA7IGV2dEluZGV4IDwgYnV0dG9uRXZlbnRzLmxlbmd0aDsgZXZ0SW5kZXgrKykge1xuICAgICAgdmFyIGJ0bkV2dCA9IGJ1dHRvbkV2ZW50c1tldnRJbmRleF07XG4gICAgICAkYnV0dG9uc1tidG5JbmRleF1bYnRuRXZ0XSA9IG9uQnV0dG9uRXZlbnQ7XG4gICAgfVxuICB9XG5cbiAgLy8gQ2xpY2tpbmcgb3V0c2lkZSB0aGUgbW9kYWwgZGlzbWlzc2VzIGl0IChpZiBhbGxvd2VkIGJ5IHVzZXIpXG4gIF9zd2VldEFsZXJ0SW5pdGlhbGl6ZSRnZXRNb2RhbCRnZXRPdmVybGF5JGdldElucHV0JHNldEZvY3VzU3R5bGUkb3Blbk1vZGFsJHJlc2V0SW5wdXQkZml4VmVydGljYWxQb3NpdGlvbi5nZXRPdmVybGF5KCkub25jbGljayA9IG9uQnV0dG9uRXZlbnQ7XG5cbiAgcHJldmlvdXNXaW5kb3dLZXlEb3duID0gd2luZG93Lm9ua2V5ZG93bjtcblxuICB2YXIgb25LZXlFdmVudCA9IGZ1bmN0aW9uIG9uS2V5RXZlbnQoZSkge1xuICAgIHJldHVybiBfaGFuZGxlS2V5RG93bjJbJ2RlZmF1bHQnXShlLCBwYXJhbXMsIG1vZGFsKTtcbiAgfTtcbiAgd2luZG93Lm9ua2V5ZG93biA9IG9uS2V5RXZlbnQ7XG5cbiAgd2luZG93Lm9uZm9jdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gV2hlbiB0aGUgdXNlciBoYXMgZm9jdXNlZCBhd2F5IGFuZCBmb2N1c2VkIGJhY2sgZnJvbSB0aGUgd2hvbGUgd2luZG93LlxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgLy8gUHV0IGluIGEgdGltZW91dCB0byBqdW1wIG91dCBvZiB0aGUgZXZlbnQgc2VxdWVuY2UuXG4gICAgICAvLyBDYWxsaW5nIGZvY3VzKCkgaW4gdGhlIGV2ZW50IHNlcXVlbmNlIGNvbmZ1c2VzIHRoaW5ncy5cbiAgICAgIGlmIChsYXN0Rm9jdXNlZEJ1dHRvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxhc3RGb2N1c2VkQnV0dG9uLmZvY3VzKCk7XG4gICAgICAgIGxhc3RGb2N1c2VkQnV0dG9uID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0sIDApO1xuICB9O1xuXG4gIC8vIFNob3cgYWxlcnQgd2l0aCBlbmFibGVkIGJ1dHRvbnMgYWx3YXlzXG4gIHN3YWwuZW5hYmxlQnV0dG9ucygpO1xufTtcblxuLypcbiAqIFNldCBkZWZhdWx0IHBhcmFtcyBmb3IgZWFjaCBwb3B1cFxuICogQHBhcmFtIHtPYmplY3R9IHVzZXJQYXJhbXNcbiAqL1xuc3dlZXRBbGVydC5zZXREZWZhdWx0cyA9IHN3YWwuc2V0RGVmYXVsdHMgPSBmdW5jdGlvbiAodXNlclBhcmFtcykge1xuICBpZiAoIXVzZXJQYXJhbXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZXJQYXJhbXMgaXMgcmVxdWlyZWQnKTtcbiAgfVxuICBpZiAodHlwZW9mIHVzZXJQYXJhbXMgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1c2VyUGFyYW1zIGhhcyB0byBiZSBhIG9iamVjdCcpO1xuICB9XG5cbiAgX2V4dGVuZCRoZXhUb1JnYiRpc0lFOCRsb2dTdHIkY29sb3JMdW1pbmFuY2UuZXh0ZW5kKF9kZWZhdWx0UGFyYW1zMlsnZGVmYXVsdCddLCB1c2VyUGFyYW1zKTtcbn07XG5cbi8qXG4gKiBBbmltYXRpb24gd2hlbiBjbG9zaW5nIG1vZGFsXG4gKi9cbnN3ZWV0QWxlcnQuY2xvc2UgPSBzd2FsLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgbW9kYWwgPSBfc3dlZXRBbGVydEluaXRpYWxpemUkZ2V0TW9kYWwkZ2V0T3ZlcmxheSRnZXRJbnB1dCRzZXRGb2N1c1N0eWxlJG9wZW5Nb2RhbCRyZXNldElucHV0JGZpeFZlcnRpY2FsUG9zaXRpb24uZ2V0TW9kYWwoKTtcblxuICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUkaXNEZXNjZW5kYW50JGdldFRvcE1hcmdpbiRmYWRlSW4kZmFkZU91dCRmaXJlQ2xpY2skc3RvcEV2ZW50UHJvcGFnYXRpb24uZmFkZU91dChfc3dlZXRBbGVydEluaXRpYWxpemUkZ2V0TW9kYWwkZ2V0T3ZlcmxheSRnZXRJbnB1dCRzZXRGb2N1c1N0eWxlJG9wZW5Nb2RhbCRyZXNldElucHV0JGZpeFZlcnRpY2FsUG9zaXRpb24uZ2V0T3ZlcmxheSgpLCA1KTtcbiAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlJGlzRGVzY2VuZGFudCRnZXRUb3BNYXJnaW4kZmFkZUluJGZhZGVPdXQkZmlyZUNsaWNrJHN0b3BFdmVudFByb3BhZ2F0aW9uLmZhZGVPdXQobW9kYWwsIDUpO1xuICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUkaXNEZXNjZW5kYW50JGdldFRvcE1hcmdpbiRmYWRlSW4kZmFkZU91dCRmaXJlQ2xpY2skc3RvcEV2ZW50UHJvcGFnYXRpb24ucmVtb3ZlQ2xhc3MobW9kYWwsICdzaG93U3dlZXRBbGVydCcpO1xuICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUkaXNEZXNjZW5kYW50JGdldFRvcE1hcmdpbiRmYWRlSW4kZmFkZU91dCRmaXJlQ2xpY2skc3RvcEV2ZW50UHJvcGFnYXRpb24uYWRkQ2xhc3MobW9kYWwsICdoaWRlU3dlZXRBbGVydCcpO1xuICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUkaXNEZXNjZW5kYW50JGdldFRvcE1hcmdpbiRmYWRlSW4kZmFkZU91dCRmaXJlQ2xpY2skc3RvcEV2ZW50UHJvcGFnYXRpb24ucmVtb3ZlQ2xhc3MobW9kYWwsICd2aXNpYmxlJyk7XG5cbiAgLypcbiAgICogUmVzZXQgaWNvbiBhbmltYXRpb25zXG4gICAqL1xuICB2YXIgJHN1Y2Nlc3NJY29uID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnNhLWljb24uc2Etc3VjY2VzcycpO1xuICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUkaXNEZXNjZW5kYW50JGdldFRvcE1hcmdpbiRmYWRlSW4kZmFkZU91dCRmaXJlQ2xpY2skc3RvcEV2ZW50UHJvcGFnYXRpb24ucmVtb3ZlQ2xhc3MoJHN1Y2Nlc3NJY29uLCAnYW5pbWF0ZScpO1xuICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUkaXNEZXNjZW5kYW50JGdldFRvcE1hcmdpbiRmYWRlSW4kZmFkZU91dCRmaXJlQ2xpY2skc3RvcEV2ZW50UHJvcGFnYXRpb24ucmVtb3ZlQ2xhc3MoJHN1Y2Nlc3NJY29uLnF1ZXJ5U2VsZWN0b3IoJy5zYS10aXAnKSwgJ2FuaW1hdGVTdWNjZXNzVGlwJyk7XG4gIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZSRpc0Rlc2NlbmRhbnQkZ2V0VG9wTWFyZ2luJGZhZGVJbiRmYWRlT3V0JGZpcmVDbGljayRzdG9wRXZlbnRQcm9wYWdhdGlvbi5yZW1vdmVDbGFzcygkc3VjY2Vzc0ljb24ucXVlcnlTZWxlY3RvcignLnNhLWxvbmcnKSwgJ2FuaW1hdGVTdWNjZXNzTG9uZycpO1xuXG4gIHZhciAkZXJyb3JJY29uID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnNhLWljb24uc2EtZXJyb3InKTtcbiAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlJGlzRGVzY2VuZGFudCRnZXRUb3BNYXJnaW4kZmFkZUluJGZhZGVPdXQkZmlyZUNsaWNrJHN0b3BFdmVudFByb3BhZ2F0aW9uLnJlbW92ZUNsYXNzKCRlcnJvckljb24sICdhbmltYXRlRXJyb3JJY29uJyk7XG4gIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZSRpc0Rlc2NlbmRhbnQkZ2V0VG9wTWFyZ2luJGZhZGVJbiRmYWRlT3V0JGZpcmVDbGljayRzdG9wRXZlbnRQcm9wYWdhdGlvbi5yZW1vdmVDbGFzcygkZXJyb3JJY29uLnF1ZXJ5U2VsZWN0b3IoJy5zYS14LW1hcmsnKSwgJ2FuaW1hdGVYTWFyaycpO1xuXG4gIHZhciAkd2FybmluZ0ljb24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2EtaWNvbi5zYS13YXJuaW5nJyk7XG4gIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZSRpc0Rlc2NlbmRhbnQkZ2V0VG9wTWFyZ2luJGZhZGVJbiRmYWRlT3V0JGZpcmVDbGljayRzdG9wRXZlbnRQcm9wYWdhdGlvbi5yZW1vdmVDbGFzcygkd2FybmluZ0ljb24sICdwdWxzZVdhcm5pbmcnKTtcbiAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlJGlzRGVzY2VuZGFudCRnZXRUb3BNYXJnaW4kZmFkZUluJGZhZGVPdXQkZmlyZUNsaWNrJHN0b3BFdmVudFByb3BhZ2F0aW9uLnJlbW92ZUNsYXNzKCR3YXJuaW5nSWNvbi5xdWVyeVNlbGVjdG9yKCcuc2EtYm9keScpLCAncHVsc2VXYXJuaW5nSW5zJyk7XG4gIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZSRpc0Rlc2NlbmRhbnQkZ2V0VG9wTWFyZ2luJGZhZGVJbiRmYWRlT3V0JGZpcmVDbGljayRzdG9wRXZlbnRQcm9wYWdhdGlvbi5yZW1vdmVDbGFzcygkd2FybmluZ0ljb24ucXVlcnlTZWxlY3RvcignLnNhLWRvdCcpLCAncHVsc2VXYXJuaW5nSW5zJyk7XG5cbiAgLy8gUmVzZXQgY3VzdG9tIGNsYXNzIChkZWxheSBzbyB0aGF0IFVJIGNoYW5nZXMgYXJlbid0IHZpc2libGUpXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjdXN0b21DbGFzcyA9IG1vZGFsLmdldEF0dHJpYnV0ZSgnZGF0YS1jdXN0b20tY2xhc3MnKTtcbiAgICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUkaXNEZXNjZW5kYW50JGdldFRvcE1hcmdpbiRmYWRlSW4kZmFkZU91dCRmaXJlQ2xpY2skc3RvcEV2ZW50UHJvcGFnYXRpb24ucmVtb3ZlQ2xhc3MobW9kYWwsIGN1c3RvbUNsYXNzKTtcbiAgfSwgMzAwKTtcblxuICAvLyBNYWtlIHBhZ2Ugc2Nyb2xsYWJsZSBhZ2FpblxuICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUkaXNEZXNjZW5kYW50JGdldFRvcE1hcmdpbiRmYWRlSW4kZmFkZU91dCRmaXJlQ2xpY2skc3RvcEV2ZW50UHJvcGFnYXRpb24ucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3N0b3Atc2Nyb2xsaW5nJyk7XG5cbiAgLy8gUmVzZXQgdGhlIHBhZ2UgdG8gaXRzIHByZXZpb3VzIHN0YXRlXG4gIHdpbmRvdy5vbmtleWRvd24gPSBwcmV2aW91c1dpbmRvd0tleURvd247XG4gIGlmICh3aW5kb3cucHJldmlvdXNBY3RpdmVFbGVtZW50KSB7XG4gICAgd2luZG93LnByZXZpb3VzQWN0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG4gIGxhc3RGb2N1c2VkQnV0dG9uID0gdW5kZWZpbmVkO1xuICBjbGVhclRpbWVvdXQobW9kYWwudGltZW91dCk7XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKlxuICogVmFsaWRhdGlvbiBvZiB0aGUgaW5wdXQgZmllbGQgaXMgZG9uZSBieSB1c2VyXG4gKiBJZiBzb21ldGhpbmcgaXMgd3JvbmcgPT4gY2FsbCBzaG93SW5wdXRFcnJvciB3aXRoIGVycm9yTWVzc2FnZVxuICovXG5zd2VldEFsZXJ0LnNob3dJbnB1dEVycm9yID0gc3dhbC5zaG93SW5wdXRFcnJvciA9IGZ1bmN0aW9uIChlcnJvck1lc3NhZ2UpIHtcbiAgdmFyIG1vZGFsID0gX3N3ZWV0QWxlcnRJbml0aWFsaXplJGdldE1vZGFsJGdldE92ZXJsYXkkZ2V0SW5wdXQkc2V0Rm9jdXNTdHlsZSRvcGVuTW9kYWwkcmVzZXRJbnB1dCRmaXhWZXJ0aWNhbFBvc2l0aW9uLmdldE1vZGFsKCk7XG5cbiAgdmFyICRlcnJvckljb24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2EtaW5wdXQtZXJyb3InKTtcbiAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlJGlzRGVzY2VuZGFudCRnZXRUb3BNYXJnaW4kZmFkZUluJGZhZGVPdXQkZmlyZUNsaWNrJHN0b3BFdmVudFByb3BhZ2F0aW9uLmFkZENsYXNzKCRlcnJvckljb24sICdzaG93Jyk7XG5cbiAgdmFyICRlcnJvckNvbnRhaW5lciA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zYS1lcnJvci1jb250YWluZXInKTtcbiAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlJGlzRGVzY2VuZGFudCRnZXRUb3BNYXJnaW4kZmFkZUluJGZhZGVPdXQkZmlyZUNsaWNrJHN0b3BFdmVudFByb3BhZ2F0aW9uLmFkZENsYXNzKCRlcnJvckNvbnRhaW5lciwgJ3Nob3cnKTtcblxuICAkZXJyb3JDb250YWluZXIucXVlcnlTZWxlY3RvcigncCcpLmlubmVySFRNTCA9IGVycm9yTWVzc2FnZTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBzd2VldEFsZXJ0LmVuYWJsZUJ1dHRvbnMoKTtcbiAgfSwgMSk7XG5cbiAgbW9kYWwucXVlcnlTZWxlY3RvcignaW5wdXQnKS5mb2N1cygpO1xufTtcblxuLypcbiAqIFJlc2V0IGlucHV0IGVycm9yIERPTSBlbGVtZW50c1xuICovXG5zd2VldEFsZXJ0LnJlc2V0SW5wdXRFcnJvciA9IHN3YWwucmVzZXRJbnB1dEVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIC8vIElmIHByZXNzIGVudGVyID0+IGlnbm9yZVxuICBpZiAoZXZlbnQgJiYgZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgJG1vZGFsID0gX3N3ZWV0QWxlcnRJbml0aWFsaXplJGdldE1vZGFsJGdldE92ZXJsYXkkZ2V0SW5wdXQkc2V0Rm9jdXNTdHlsZSRvcGVuTW9kYWwkcmVzZXRJbnB1dCRmaXhWZXJ0aWNhbFBvc2l0aW9uLmdldE1vZGFsKCk7XG5cbiAgdmFyICRlcnJvckljb24gPSAkbW9kYWwucXVlcnlTZWxlY3RvcignLnNhLWlucHV0LWVycm9yJyk7XG4gIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZSRpc0Rlc2NlbmRhbnQkZ2V0VG9wTWFyZ2luJGZhZGVJbiRmYWRlT3V0JGZpcmVDbGljayRzdG9wRXZlbnRQcm9wYWdhdGlvbi5yZW1vdmVDbGFzcygkZXJyb3JJY29uLCAnc2hvdycpO1xuXG4gIHZhciAkZXJyb3JDb250YWluZXIgPSAkbW9kYWwucXVlcnlTZWxlY3RvcignLnNhLWVycm9yLWNvbnRhaW5lcicpO1xuICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUkaXNEZXNjZW5kYW50JGdldFRvcE1hcmdpbiRmYWRlSW4kZmFkZU91dCRmaXJlQ2xpY2skc3RvcEV2ZW50UHJvcGFnYXRpb24ucmVtb3ZlQ2xhc3MoJGVycm9yQ29udGFpbmVyLCAnc2hvdycpO1xufTtcblxuLypcbiAqIERpc2FibGUgY29uZmlybSBhbmQgY2FuY2VsIGJ1dHRvbnNcbiAqL1xuc3dlZXRBbGVydC5kaXNhYmxlQnV0dG9ucyA9IHN3YWwuZGlzYWJsZUJ1dHRvbnMgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgdmFyIG1vZGFsID0gX3N3ZWV0QWxlcnRJbml0aWFsaXplJGdldE1vZGFsJGdldE92ZXJsYXkkZ2V0SW5wdXQkc2V0Rm9jdXNTdHlsZSRvcGVuTW9kYWwkcmVzZXRJbnB1dCRmaXhWZXJ0aWNhbFBvc2l0aW9uLmdldE1vZGFsKCk7XG4gIHZhciAkY29uZmlybUJ1dHRvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5jb25maXJtJyk7XG4gIHZhciAkY2FuY2VsQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignYnV0dG9uLmNhbmNlbCcpO1xuICAkY29uZmlybUJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICRjYW5jZWxCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xufTtcblxuLypcbiAqIEVuYWJsZSBjb25maXJtIGFuZCBjYW5jZWwgYnV0dG9uc1xuICovXG5zd2VldEFsZXJ0LmVuYWJsZUJ1dHRvbnMgPSBzd2FsLmVuYWJsZUJ1dHRvbnMgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgdmFyIG1vZGFsID0gX3N3ZWV0QWxlcnRJbml0aWFsaXplJGdldE1vZGFsJGdldE92ZXJsYXkkZ2V0SW5wdXQkc2V0Rm9jdXNTdHlsZSRvcGVuTW9kYWwkcmVzZXRJbnB1dCRmaXhWZXJ0aWNhbFBvc2l0aW9uLmdldE1vZGFsKCk7XG4gIHZhciAkY29uZmlybUJ1dHRvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5jb25maXJtJyk7XG4gIHZhciAkY2FuY2VsQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignYnV0dG9uLmNhbmNlbCcpO1xuICAkY29uZmlybUJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAkY2FuY2VsQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG59O1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgLy8gVGhlICdoYW5kbGUtY2xpY2snIG1vZHVsZSByZXF1aXJlc1xuICAvLyB0aGF0ICdzd2VldEFsZXJ0JyB3YXMgc2V0IGFzIGdsb2JhbC5cbiAgd2luZG93LnN3ZWV0QWxlcnQgPSB3aW5kb3cuc3dhbCA9IHN3ZWV0QWxlcnQ7XG59IGVsc2Uge1xuICBfZXh0ZW5kJGhleFRvUmdiJGlzSUU4JGxvZ1N0ciRjb2xvckx1bWluYW5jZS5sb2dTdHIoJ1N3ZWV0QWxlcnQgaXMgYSBmcm9udGVuZCBtb2R1bGUhJyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiXX0=

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
     *      ((canGoTo(x) and probablyMonster(x) and not probablyTrap(x))
     *          => not exists y (probablyMonster(y) and not probablyTrap(y) and greaterProbabilityMonster(y, x)))
     */
    Logical.prototype.ruleMonsterNotTrap = function (x) {
        // Exists y (probablyMonster(y) and not probablyTrap(y) and greaterProbabilityMonster(y, x))
        function existsMonsterMoreProbable(thisClass, floor) {
            var i = 0;
            var exists = false;
            while (i < thisClass.borders.length && !exists) {
                exists = thisClass.probablyMonster(thisClass.borders[i])
                    && !thisClass.probablyTrap(thisClass.borders[i])
                    && thisClass.greaterProbabilityMonster(thisClass.borders[i], floor);
                i++;
            }
            return exists;
        }
        if (this.canGoTo(x) && this.probablyMonster(x) && !this.probablyTrap(x)) {
            return !existsMonsterMoreProbable(this, x);
        }
        else {
            return true;
        }
    };
    /**
     * For each x
     *      ((canGoTo(x) and probablyMonster(x) and probablyTrap(x))
     *          => not exists y (probablyMonster(y) and probablyTrap(y) and greaterProbabilityMonster(y, x)))
     */
    Logical.prototype.ruleMonsterTrap = function (x) {
        // Exists y (probablyMonster(y) and probablyTrap(y) and greaterProbabilityMonster(y, x))
        function existsMonsterTrapMoreProbable(thisClass, floor) {
            var i = 0;
            var exists = false;
            while (i < thisClass.borders.length && !exists) {
                exists = thisClass.probablyMonster(thisClass.borders[i])
                    && thisClass.probablyTrap(thisClass.borders[i])
                    && thisClass.greaterProbabilityMonster(thisClass.borders[i], floor);
                i++;
            }
            return exists;
        }
        if (this.canGoTo(x) && this.probablyMonster(x) && this.probablyTrap(x)) {
            return !existsMonsterTrapMoreProbable(this, x);
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
            else {
                this.forestMap[this.y + 1][this.x].setProbabilityMonster(0);
            }
            if (trapClue) {
                this.forestMap[this.y + 1][this.x].addProbabilityTrap(probability);
            }
            else {
                this.forestMap[this.y + 1][this.x].setProbabilityTrap(0);
            }
        }
        if (this.y - 1 >= 0 && !this.forestMap[this.y - 1][this.x].isVisited()) {
            this.forestMap[this.y - 1][this.x].setAccessible(true);
            if (monsterClue) {
                this.forestMap[this.y - 1][this.x].addProbabilityMonster(probability);
            }
            else {
                this.forestMap[this.y - 1][this.x].setProbabilityMonster(0);
            }
            if (trapClue) {
                this.forestMap[this.y - 1][this.x].addProbabilityTrap(probability);
            }
            else {
                this.forestMap[this.y - 1][this.x].setProbabilityTrap(0);
            }
        }
        if (this.x + 1 < this.forestMap[0].length && !this.forestMap[this.y][this.x + 1].isVisited()) {
            this.forestMap[this.y][this.x + 1].setAccessible(true);
            if (monsterClue) {
                this.forestMap[this.y][this.x + 1].addProbabilityMonster(probability);
            }
            else {
                this.forestMap[this.y][this.x + 1].setProbabilityMonster(0);
            }
            if (trapClue) {
                this.forestMap[this.y][this.x + 1].addProbabilityTrap(probability);
            }
            else {
                this.forestMap[this.y][this.x + 1].setProbabilityTrap(0);
            }
        }
        if (this.x - 1 >= 0 && !this.forestMap[this.y][this.x - 1].isVisited()) {
            this.forestMap[this.y][this.x - 1].setAccessible(true);
            if (monsterClue) {
                this.forestMap[this.y][this.x - 1].addProbabilityMonster(probability);
            }
            else {
                this.forestMap[this.y][this.x - 1].setProbabilityMonster(0);
            }
            if (trapClue) {
                this.forestMap[this.y][this.x - 1].addProbabilityTrap(probability);
            }
            else {
                this.forestMap[this.y][this.x - 1].setProbabilityTrap(0);
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
            // @todo
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
            if (wandererLogic.canGoTo(borderMap[position])) {
                // Tests the logical rules
                destinationFound = (wandererLogic.ruleMonsterNotTrap(borderMap[position])
                    && wandererLogic.ruleMonsterTrap(borderMap[position])
                    && wandererLogic.ruleTrap(borderMap[position]));
            }
            if (destinationFound === false) {
                position++;
            }
        }
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
        var path = finder.findPath(start.getX(), start.getY(), destination.getX(), destination.getY(), grid);
        var movesPath = this.findMoves(path, haveToShoot);
        return movesPath;
    };
    Wanderer.prototype.findMoves = function (path, haveToShoot) {
        var movesPath = [];
        // path[i][1] is x and path[i][0] is y
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
        case 13:
            g.update();
            break;
        default:
            break;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9zcmMvRmxvb3IudHMiLCJqcy9zcmMvRm9yZXN0LnRzIiwianMvc3JjL0dhbWUudHMiLCJqcy9zcmMvTG9naWNhbC50cyIsImpzL3NyYy9XYW5kZXJlci50cyIsImpzL3NyYy9jb25zdGFudHMudHMiLCJqcy9zcmMvbWFpbi50cyIsIm5vZGVfbW9kdWxlcy9oZWFwL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2hlYXAvbGliL2hlYXAuanMiLCJub2RlX21vZHVsZXMvcGF0aGZpbmRpbmcvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcGF0aGZpbmRpbmcvc3JjL1BhdGhGaW5kaW5nLmpzIiwibm9kZV9tb2R1bGVzL3BhdGhmaW5kaW5nL3NyYy9jb3JlL0RpYWdvbmFsTW92ZW1lbnQuanMiLCJub2RlX21vZHVsZXMvcGF0aGZpbmRpbmcvc3JjL2NvcmUvR3JpZC5qcyIsIm5vZGVfbW9kdWxlcy9wYXRoZmluZGluZy9zcmMvY29yZS9IZXVyaXN0aWMuanMiLCJub2RlX21vZHVsZXMvcGF0aGZpbmRpbmcvc3JjL2NvcmUvTm9kZS5qcyIsIm5vZGVfbW9kdWxlcy9wYXRoZmluZGluZy9zcmMvY29yZS9VdGlsLmpzIiwibm9kZV9tb2R1bGVzL3BhdGhmaW5kaW5nL3NyYy9maW5kZXJzL0FTdGFyRmluZGVyLmpzIiwibm9kZV9tb2R1bGVzL3BhdGhmaW5kaW5nL3NyYy9maW5kZXJzL0Jlc3RGaXJzdEZpbmRlci5qcyIsIm5vZGVfbW9kdWxlcy9wYXRoZmluZGluZy9zcmMvZmluZGVycy9CaUFTdGFyRmluZGVyLmpzIiwibm9kZV9tb2R1bGVzL3BhdGhmaW5kaW5nL3NyYy9maW5kZXJzL0JpQmVzdEZpcnN0RmluZGVyLmpzIiwibm9kZV9tb2R1bGVzL3BhdGhmaW5kaW5nL3NyYy9maW5kZXJzL0JpQnJlYWR0aEZpcnN0RmluZGVyLmpzIiwibm9kZV9tb2R1bGVzL3BhdGhmaW5kaW5nL3NyYy9maW5kZXJzL0JpRGlqa3N0cmFGaW5kZXIuanMiLCJub2RlX21vZHVsZXMvcGF0aGZpbmRpbmcvc3JjL2ZpbmRlcnMvQnJlYWR0aEZpcnN0RmluZGVyLmpzIiwibm9kZV9tb2R1bGVzL3BhdGhmaW5kaW5nL3NyYy9maW5kZXJzL0RpamtzdHJhRmluZGVyLmpzIiwibm9kZV9tb2R1bGVzL3BhdGhmaW5kaW5nL3NyYy9maW5kZXJzL0lEQVN0YXJGaW5kZXIuanMiLCJub2RlX21vZHVsZXMvcGF0aGZpbmRpbmcvc3JjL2ZpbmRlcnMvSlBGQWx3YXlzTW92ZURpYWdvbmFsbHkuanMiLCJub2RlX21vZHVsZXMvcGF0aGZpbmRpbmcvc3JjL2ZpbmRlcnMvSlBGTW92ZURpYWdvbmFsbHlJZkF0TW9zdE9uZU9ic3RhY2xlLmpzIiwibm9kZV9tb2R1bGVzL3BhdGhmaW5kaW5nL3NyYy9maW5kZXJzL0pQRk1vdmVEaWFnb25hbGx5SWZOb09ic3RhY2xlcy5qcyIsIm5vZGVfbW9kdWxlcy9wYXRoZmluZGluZy9zcmMvZmluZGVycy9KUEZOZXZlck1vdmVEaWFnb25hbGx5LmpzIiwibm9kZV9tb2R1bGVzL3BhdGhmaW5kaW5nL3NyYy9maW5kZXJzL0p1bXBQb2ludEZpbmRlci5qcyIsIm5vZGVfbW9kdWxlcy9wYXRoZmluZGluZy9zcmMvZmluZGVycy9KdW1wUG9pbnRGaW5kZXJCYXNlLmpzIiwibm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQvbGliL21vZHVsZXMvZGVmYXVsdC1wYXJhbXMuanMiLCJub2RlX21vZHVsZXMvc3dlZXRhbGVydC9saWIvbW9kdWxlcy9oYW5kbGUtY2xpY2suanMiLCJub2RlX21vZHVsZXMvc3dlZXRhbGVydC9saWIvbW9kdWxlcy9oYW5kbGUtZG9tLmpzIiwibm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQvbGliL21vZHVsZXMvaGFuZGxlLWtleS5qcyIsIm5vZGVfbW9kdWxlcy9zd2VldGFsZXJ0L2xpYi9tb2R1bGVzL2hhbmRsZS1zd2FsLWRvbS5qcyIsIm5vZGVfbW9kdWxlcy9zd2VldGFsZXJ0L2xpYi9tb2R1bGVzL2luamVjdGVkLWh0bWwuanMiLCJub2RlX21vZHVsZXMvc3dlZXRhbGVydC9saWIvbW9kdWxlcy9zZXQtcGFyYW1zLmpzIiwibm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQvbGliL21vZHVsZXMvdXRpbHMuanMiLCJub2RlX21vZHVsZXMvc3dlZXRhbGVydC9saWIvc3dlZXRhbGVydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQ0EseUNBQTZEO0FBRTdEOzs7O0dBSUc7QUFDSDtJQWNJLGVBQVksQ0FBUyxFQUFFLENBQVMsRUFBRSxPQUFlO1FBQWYsd0JBQUEsRUFBQSwyQkFBZTtRQVZ6QyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsU0FBSSxHQUFZLEtBQUssQ0FBQztRQUN0QixTQUFJLEdBQVksS0FBSyxDQUFDO1FBQ3RCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3Qix1QkFBa0IsR0FBRyxDQUFDLENBQUM7UUFDdkIsb0JBQWUsR0FBRyxDQUFDLENBQUM7UUFHeEIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVYLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxnQkFBSSxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxnQkFBSSxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxtQkFBTyxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUN4QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSiwrQkFBK0I7UUFDbkMsQ0FBQztJQUNMLENBQUM7SUFFTSxvQkFBSSxHQUFYO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVNLG9CQUFJLEdBQVg7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBRU0sc0JBQU0sR0FBYjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxzQkFBTSxHQUFiO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVNLHlCQUFTLEdBQWhCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVNLDZCQUFhLEdBQXBCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztJQUVNLDBCQUFVLEdBQWpCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVNLHVCQUFPLEdBQWQ7UUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQ1YsQ0FBQyxJQUFJLENBQUMsSUFBSTtZQUNWLENBQUMsSUFBSSxDQUFDLE9BQU87WUFDYixDQUFDLElBQUksQ0FBQyxRQUFRO1lBQ2QsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7SUFDVCxDQUFDO0lBRU0sdUJBQU8sR0FBZCxVQUFlLFFBQWdCO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxnQkFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUN6QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxtQkFBTyxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUM1QixDQUFDO0lBQ0wsQ0FBQztJQUVNLHlCQUFTLEdBQWhCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUNNLDBCQUFVLEdBQWpCLFVBQWtCLENBQVE7UUFBUixrQkFBQSxFQUFBLFFBQVE7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUNNLDRCQUFZLEdBQW5CO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUNNLDZCQUFhLEdBQXBCLFVBQXFCLENBQVE7UUFBUixrQkFBQSxFQUFBLFFBQVE7UUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVEOztPQUVHO0lBQ0kscUNBQXFCLEdBQTVCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxxQ0FBcUIsR0FBNUIsVUFBNkIsV0FBZTtRQUFmLDRCQUFBLEVBQUEsZUFBZTtRQUN4QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsV0FBVyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7T0FFRztJQUNJLHFDQUFxQixHQUE1QixVQUE2QixXQUFlO1FBQWYsNEJBQUEsRUFBQSxlQUFlO1FBQ3hDLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxXQUFXLENBQUM7SUFDM0MsQ0FBQztJQUVEOztPQUVHO0lBQ0ksa0NBQWtCLEdBQXpCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDaEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksa0NBQWtCLEdBQXpCLFVBQTBCLFdBQWU7UUFBZiw0QkFBQSxFQUFBLGVBQWU7UUFDckMsSUFBSSxDQUFDLGVBQWUsR0FBRyxXQUFXLENBQUM7SUFDdkMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksa0NBQWtCLEdBQXpCLFVBQTBCLFdBQWU7UUFBZiw0QkFBQSxFQUFBLGVBQWU7UUFDckMsSUFBSSxDQUFDLGVBQWUsSUFBSSxXQUFXLENBQUM7SUFDeEMsQ0FBQztJQUVNLDJCQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVNLHNCQUFNLEdBQWIsVUFBYyxPQUF1QixFQUFFLGtCQUE0QjtRQUFyRCx3QkFBQSxFQUFBLGNBQXVCO1FBQ2pDLElBQUksT0FBTyxHQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFFakUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNWLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoQixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekIsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkIsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQixPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUVELE1BQU0sQ0FBQyxrQkFBZSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFVLENBQUM7SUFDdEQsQ0FBQztJQUNMLFlBQUM7QUFBRCxDQWpLQSxBQWlLQyxJQUFBOzs7Ozs7QUN6S0QseUNBQTZEO0FBQzdELGlDQUE0QjtBQUU1Qjs7R0FFRztBQUNIO0lBS0ksZ0JBQVksQ0FBSyxFQUFFLENBQUs7UUFBWixrQkFBQSxFQUFBLEtBQUs7UUFBRSxrQkFBQSxFQUFBLEtBQUs7UUFKaEIsV0FBTSxHQUFjLEVBQUUsQ0FBQztRQUN2QixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFHdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRU0seUJBQVEsR0FBZixVQUFnQixVQUFlO1FBQWYsMkJBQUEsRUFBQSxlQUFlO1FBQzNCLDZCQUE2QjtRQUM3QixJQUFJLEdBQUcsR0FBYyxFQUFFLENBQUM7UUFDeEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDbkMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNaLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNsQyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFFakUsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2hCLGtCQUFrQjtvQkFDbEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksZUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsbUJBQU8sQ0FBQyxDQUFDO2dCQUN6QyxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkIsZUFBZTtvQkFDZixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxlQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxnQkFBSSxDQUFDLENBQUM7Z0JBQ3RDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksZUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDaEMsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFFbEIsa0JBQWtCO1FBQ2xCLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLElBQUksQ0FBQztRQUNULElBQUksSUFBSSxDQUFDO1FBQ1QsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2hCLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRW5FLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLGVBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLGdCQUFJLENBQUMsQ0FBQztnQkFDdEQsU0FBUyxHQUFHLElBQUksQ0FBQztZQUNyQixDQUFDO1FBQ0wsQ0FBQztRQUVELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ25DLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNsQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNuQixrQkFBa0I7b0JBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxtQkFBTyxDQUFDLENBQUM7Z0JBQ2pDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLGVBQWU7b0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLGdCQUFJLENBQUMsQ0FBQztnQkFDOUIsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sZ0NBQWUsR0FBdEIsVUFBdUIsQ0FBUyxFQUFFLENBQVM7UUFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVNLDBCQUFTLEdBQWhCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVNLGtDQUFpQixHQUF4QjtRQUNJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ25DLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNsQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDN0IsTUFBTSxDQUFDLEVBQUMsQ0FBQyxHQUFBLEVBQUUsQ0FBQyxHQUFBLEVBQUMsQ0FBQztnQkFDbEIsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRU0saUNBQWdCLEdBQXZCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ3RELENBQUM7SUFFTSx5QkFBUSxHQUFmO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQzlCLENBQUM7SUFFTSwwQkFBUyxHQUFoQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNqQyxDQUFDO0lBRU8seUJBQVEsR0FBaEIsVUFBaUIsQ0FBUyxFQUFFLENBQVMsRUFBRSxPQUFlO1FBQ2xELEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQTdHQSxBQTZHQyxJQUFBOzs7Ozs7QUNsSEQsaUNBQW1DO0FBRW5DLG1DQUE4QjtBQUM5Qix1Q0FBa0M7QUFFbEM7O0dBRUc7QUFDSDtJQU1JLGNBQW1CLE9BQWUsRUFBRSxRQUFnQjtRQUNoRCxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSxtQkFBSSxHQUFYLFVBQVksQ0FBSyxFQUFFLENBQUs7UUFBWixrQkFBQSxFQUFBLEtBQUs7UUFBRSxrQkFBQSxFQUFBLEtBQUs7UUFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU0scUJBQU0sR0FBYixVQUFjLFFBQXdCO1FBQXhCLHlCQUFBLEVBQUEsZUFBd0I7UUFFbEMsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzFCLENBQUM7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUM7Z0JBQ0QsSUFBSSxFQUFFLHlCQUF5QjtnQkFDL0IsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLE9BQU87YUFDaEIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ2pHLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4Qiw2QkFBNkI7WUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7WUFDakUsd0JBQXdCO1lBQ3hCLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQztnQkFDRCxJQUFJLEVBQUUsNEJBQTRCO2dCQUNsQyxLQUFLLEVBQUUsSUFBSTtnQkFDWCxJQUFJLEVBQUUsU0FBUzthQUNsQixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVNLDBCQUFXLEdBQWxCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVPLDJCQUFZLEdBQXBCLFVBQXFCLENBQUssRUFBRSxDQUFLO1FBQVosa0JBQUEsRUFBQSxLQUFLO1FBQUUsa0JBQUEsRUFBQSxLQUFLO1FBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxnQkFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTyx3QkFBUyxHQUFqQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFFTywwQkFBVyxHQUFuQixVQUFvQixDQUF3QixFQUFFLENBQXFCLEVBQUUsQ0FBcUI7UUFBdEUsa0JBQUEsRUFBQSxhQUF3QjtRQUFFLGtCQUFBLEVBQUEsYUFBcUI7UUFBRSxrQkFBQSxFQUFBLGFBQXFCO1FBQ3RGLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFOUMsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLElBQUksQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDckMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNYLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBRTNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3pCLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUNELElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoQixRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4QyxDQUFDO1FBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGtCQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRWpFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU8scUJBQU0sR0FBZDtRQUNJLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM1QyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRS9CLElBQUksSUFBSSxHQUFXLEVBQUUsQ0FBQztRQUV0QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDN0QsSUFBSSxJQUFJLHFCQUFxQixDQUFDO1lBQzlCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDaEUsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUN6QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztnQkFFNUIsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3hDLENBQUM7Z0JBRUQsSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFDMUUsQ0FBQztZQUNELElBQUksSUFBSSxRQUFRLENBQUM7UUFDckIsQ0FBQztRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBUSxNQUFNLENBQUMsTUFBUSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBRTlCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM3RCxDQUFDO0lBRUwsV0FBQztBQUFELENBMUhBLEFBMEhDLElBQUE7Ozs7OztBQ2pJRDs7R0FFRztBQUNIO0lBSUk7O09BRUc7SUFDSCxpQkFBWSxPQUFnQjtRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxpQ0FBZSxHQUF0QixVQUF1QixDQUFRO1FBQzNCLE1BQU0sQ0FBQyxDQUFDLENBQUMscUJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLDhCQUFZLEdBQW5CLFVBQW9CLENBQVE7UUFDeEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSwrQkFBYSxHQUFwQixVQUFxQixDQUFRO1FBQ3pCLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSSx5QkFBTyxHQUFkLFVBQWUsQ0FBUTtRQUVuQiw4QkFBOEI7UUFDOUIscUJBQXFCLFNBQWtCO1lBQ25DLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNWLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNuQixPQUFPLENBQUMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUM3QyxNQUFNLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZELENBQUMsRUFBRSxDQUFDO1lBQ1IsQ0FBQztZQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUVELDhFQUE4RTtRQUM5RSxxQ0FBcUMsU0FBa0I7WUFDbkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ25CLE9BQU8sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQzdDLE1BQU0sR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7dUJBQ25ELENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOzJCQUNoRCxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELENBQUMsRUFBRSxDQUFDO1lBQ1IsQ0FBQztZQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztlQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7ZUFDdEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksb0NBQWtCLEdBQXpCLFVBQTBCLENBQVE7UUFFOUIsNEZBQTRGO1FBQzVGLG1DQUFtQyxTQUFrQixFQUFFLEtBQVk7WUFDL0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ25CLE9BQU8sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQzdDLE1BQU0sR0FBRyxTQUFTLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7dUJBQ3JELENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3VCQUM3QyxTQUFTLENBQUMseUJBQXlCLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDcEUsQ0FBQyxFQUFFLENBQUM7WUFDUixDQUFDO1lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEUsTUFBTSxDQUFDLENBQUMseUJBQXlCLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksaUNBQWUsR0FBdEIsVUFBdUIsQ0FBUTtRQUUzQix3RkFBd0Y7UUFDeEYsdUNBQXVDLFNBQWtCLEVBQUUsS0FBWTtZQUNuRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDVixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDbkIsT0FBTyxDQUFDLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDN0MsTUFBTSxHQUFHLFNBQVMsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzt1QkFDckQsU0FBUyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3VCQUM1QyxTQUFTLENBQUMseUJBQXlCLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDcEUsQ0FBQyxFQUFFLENBQUM7WUFDUixDQUFDO1lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLE1BQU0sQ0FBQyxDQUFDLDZCQUE2QixDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSSw2QkFBVyxHQUFsQixVQUFtQixDQUFRO1FBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSwwQkFBUSxHQUFmLFVBQWdCLENBQVE7UUFFcEIsOERBQThEO1FBQzlELGdDQUFnQyxTQUFrQixFQUFFLEtBQVk7WUFDNUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ25CLE9BQU8sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQzdDLE1BQU0sR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7dUJBQ2xELFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNqRSxDQUFDLEVBQUUsQ0FBQztZQUNSLENBQUM7WUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLE1BQU0sQ0FBQyxDQUFDLHNCQUFzQixDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7SUFDTCxDQUFDO0lBRU0sMkNBQXlCLEdBQWhDLFVBQWlDLENBQVEsRUFBRSxDQUFRO1FBQy9DLE1BQU0sQ0FBQyxDQUFDLENBQUMscUJBQXFCLEVBQUUsR0FBRyxDQUFDLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUNqRSxDQUFDO0lBRU0sd0NBQXNCLEdBQTdCLFVBQThCLENBQVEsRUFBRSxDQUFRO1FBQzVDLE1BQU0sQ0FBQyxDQUFDLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUMzRCxDQUFDO0lBQ0wsY0FBQztBQUFELENBbEtBLEFBa0tDLElBQUE7Ozs7OztBQ3ZLRCx5Q0FBMkM7QUFDM0MsaUNBQTRCO0FBRTVCLHFDQUFnQztBQUVoQzs7R0FFRztBQUNIO0lBWUksa0JBQVksT0FBZSxFQUFFLE9BQWUsRUFBRSxTQUFpQixFQUFFLEtBQWlCO1FBQWpCLHNCQUFBLEVBQUEsU0FBaUI7UUFSMUUsY0FBUyxHQUFjLEVBQUUsQ0FBQztRQU0xQixZQUFPLEdBQWEsRUFBRSxDQUFDO1FBRzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1FBRXJCLElBQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDNUMsSUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUU5QyxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQztRQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUU1QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxlQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNDLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sK0JBQVksR0FBbkI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7SUFDakMsQ0FBQztJQUVNLDhCQUFXLEdBQWxCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ3BDLENBQUM7SUFFTSwwQkFBTyxHQUFkLFVBQWUsQ0FBUyxFQUFFLENBQVM7UUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVNLDRCQUFTLEdBQWhCLFVBQWlCLE1BQWM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUVNLDhCQUFXLEdBQWxCLFVBQW1CLENBQVMsRUFBRSxDQUFTO1FBQ25DLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZixDQUFDO0lBRU0sOEJBQVcsR0FBbEI7UUFDSSxNQUFNLENBQUMsRUFBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTSx5QkFBTSxHQUFiO1FBQ0ksTUFBTSxDQUFDLDBDQUF3QyxDQUFDO0lBQ3BELENBQUM7SUFFTSxnQ0FBYSxHQUFwQjtRQUNJLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFTSw0QkFBUyxHQUFoQjtRQUNJLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxxQkFBcUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkUsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsV0FBVyxHQUFHLENBQUMsR0FBRyxDQUFFLENBQUMsR0FBRyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoRCx5REFBeUQ7UUFDekQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekYsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekYsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakQsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN2QixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM5QyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLENBQUM7UUFFRCx1QkFBdUI7UUFDdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4RixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDMUUsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEUsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN2RSxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RCxDQUFDO1FBQ0wsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMxRSxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRSxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDWCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZFLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdELENBQUM7UUFDTCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMzRixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDMUUsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEUsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN2RSxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RCxDQUFDO1FBQ0wsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMxRSxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRSxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDWCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZFLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdELENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sc0JBQUcsR0FBVjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUVwQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxJQUFJLE1BQU0sS0FBSyxPQUFPLElBQUksTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDbEYsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0QixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxZQUFZO2dCQUM5QixNQUFNLEtBQUssYUFBYTtnQkFDeEIsTUFBTSxLQUFLLFVBQVU7Z0JBQ3JCLE1BQU0sS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3RDLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixRQUFRO1FBQ1osQ0FBQztJQUNMLENBQUM7SUFFTSx3QkFBSyxHQUFaO1FBQ0ksSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRS9DLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixzQkFBc0I7UUFDdEIsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDN0MsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDNUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUMzRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekMsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBRUQsZ0NBQWdDO1FBQ2hDLElBQUksYUFBYSxHQUFHLElBQUksaUJBQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDN0IsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLGdCQUFnQixLQUFLLEtBQUssRUFBRSxDQUFDO1lBQ25FLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU3QywwQkFBMEI7Z0JBQzFCLGdCQUFnQixHQUFHLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQzt1QkFDbEQsYUFBYSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7dUJBQ2xELGFBQWEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RSxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsUUFBUSxFQUFFLENBQUM7WUFDZixDQUFDO1FBQ0wsQ0FBQztRQUdELElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztRQUV4QixFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDbkIsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDdkIsQ0FBQztZQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzlFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLHlCQUF5QjtRQUM3QixDQUFDO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sMkJBQVEsR0FBZixVQUFnQixLQUFZLEVBQUUsV0FBa0IsRUFBRSxXQUFvQjtRQUNsRSxjQUFjO1FBQ2QsSUFBSSxNQUFNLEdBQWUsRUFBRSxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDZixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDM0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUU7dUJBQzdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUU7dUJBQ2pDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3BDLFdBQVc7b0JBQ1gsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixVQUFVO29CQUNWLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JCLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUVELCtCQUErQjtRQUMvQixNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRW5ELElBQUksSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QyxJQUFJLE1BQU0sR0FBRyxJQUFJLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMzQyw4RUFBOEU7UUFFOUUsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFckcsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbEQsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRU0sNEJBQVMsR0FBaEIsVUFBaUIsSUFBVyxFQUFFLFdBQW9CO1FBQzlDLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNuQixzQ0FBc0M7UUFDdEMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxpREFBaUQ7Z0JBQ2pELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUIseUJBQXlCO29CQUN6QixTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMzQixDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JDLDBCQUEwQjtvQkFDMUIsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDNUIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixhQUFhO2dCQUNqQixDQUFDO1lBQ0wsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLG9EQUFvRDtnQkFDcEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM5Qix1QkFBdUI7b0JBQ3ZCLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckMseUJBQXlCO29CQUN6QixTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMzQixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLGFBQWE7Z0JBQ2pCLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7WUFDdkIsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxLQUFLLElBQUk7b0JBQ0wsYUFBYSxHQUFHLFVBQVUsQ0FBQztvQkFDM0IsS0FBSyxDQUFDO2dCQUNWLEtBQUssTUFBTTtvQkFDUCxhQUFhLEdBQUcsWUFBWSxDQUFDO29CQUM3QixLQUFLLENBQUM7Z0JBQ1YsS0FBSyxNQUFNO29CQUNQLGFBQWEsR0FBRyxZQUFZLENBQUM7b0JBQzdCLEtBQUssQ0FBQztnQkFDVixLQUFLLE9BQU87b0JBQ1IsYUFBYSxHQUFHLGFBQWEsQ0FBQztvQkFDOUIsS0FBSyxDQUFDO2dCQUNWO29CQUNJLEtBQUssQ0FBQztZQUNkLENBQUM7WUFDRCxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUM3RCxDQUFDO1FBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRU0sdUJBQUksR0FBWCxVQUFZLFNBQWlCO1FBQ3pCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQyxJQUFJLE1BQU0sQ0FBQztRQUVYLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDaEIsS0FBSyxNQUFNO2dCQUNQLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDMUIsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7Z0JBQUMsQ0FBQztnQkFDckMsS0FBSyxDQUFDO1lBQ1YsS0FBSyxPQUFPO2dCQUNSLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDMUIsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO2dCQUFDLENBQUM7Z0JBQ3RELEtBQUssQ0FBQztZQUNWLEtBQUssSUFBSTtnQkFDTCxNQUFNLEdBQUcsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzFCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO2dCQUFDLENBQUM7Z0JBQ3JDLEtBQUssQ0FBQztZQUNWLEtBQUssTUFBTTtnQkFDUCxNQUFNLEdBQUcsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzFCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztnQkFBQyxDQUFDO2dCQUN2RCxLQUFLLENBQUM7WUFDVjtnQkFDSSxLQUFLLENBQUM7UUFDZCxDQUFDO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWxCLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLHdDQUFxQixHQUE1QixVQUE2QixDQUFTLEVBQUUsQ0FBUztRQUM3QyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFWixFQUFFLENBQUMsQ0FBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6RSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ2IsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2RCxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ2IsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzdFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDYixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDYixDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFTSwrQkFBWSxHQUFuQixVQUFvQixTQUFpQjtRQUNqQyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLElBQUksTUFBTSxDQUFDO1FBRVgsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNoQixLQUFLLE1BQU07Z0JBQ1AsTUFBTSxHQUFHLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQixFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO2dCQUFDLENBQUM7Z0JBQ2hDLEtBQUssQ0FBQztZQUNWLEtBQUssT0FBTztnQkFDUixNQUFNLEdBQUcsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzFCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztvQkFBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO2dCQUFDLENBQUM7Z0JBQ2pELEtBQUssQ0FBQztZQUNWLEtBQUssSUFBSTtnQkFDTCxNQUFNLEdBQUcsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzFCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7Z0JBQUMsQ0FBQztnQkFDaEMsS0FBSyxDQUFDO1lBQ1YsS0FBSyxNQUFNO2dCQUNQLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDMUIsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO29CQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7Z0JBQUMsQ0FBQztnQkFDbEQsS0FBSyxDQUFDO1lBQ1Y7Z0JBQ0ksS0FBSyxDQUFDO1FBQ2QsQ0FBQztRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVoRCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFbkIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sd0JBQUssR0FBWjtRQUNJLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV2RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLGNBQWMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztJQUNMLENBQUM7SUFFTSx5QkFBTSxHQUFiO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLE1BQU0sRUFBRSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEUsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7SUFDTCxDQUFDO0lBRU0sMkJBQVEsR0FBZixVQUFnQixHQUFXO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDO0lBQ3RCLENBQUM7SUFFTSwyQkFBUSxHQUFmO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVNLHlCQUFNLEdBQWI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRU0seUJBQU0sR0FBYixVQUFjLENBQVk7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVNLDZCQUFVLEdBQWpCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU0sMkJBQVEsR0FBZjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFTSwyQkFBUSxHQUFmO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQXZiQSxBQXViQyxJQUFBOzs7Ozs7QUMvYlksUUFBQSxJQUFJLEdBQUcsTUFBTSxDQUFDO0FBQ2QsUUFBQSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ1gsUUFBQSxJQUFJLEdBQUcsTUFBTSxDQUFDO0FBQ2QsUUFBQSxPQUFPLEdBQUcsU0FBUyxDQUFDO0FBQ3BCLFFBQUEsSUFBSSxHQUFHLE1BQU0sQ0FBQzs7Ozs7QUNGM0IsK0JBQTBCO0FBRTFCLElBQUksQ0FBQyxHQUFHLElBQUksY0FBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN4QyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNiLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFaEIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFDO0lBQ3hELENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNmLENBQUMsQ0FBQyxDQUFDO0FBRUgsbUJBQW1CO0FBQ25CLFFBQVEsQ0FBQyxTQUFTLEdBQUcsVUFBQyxDQUFDO0lBQ25CLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLEtBQUssRUFBRTtZQUNILENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNYLEtBQUssQ0FBQztRQUNWO1lBQ0ksS0FBSyxDQUFDO0lBQ2QsQ0FBQztBQUNMLENBQUMsQ0FBQzs7O0FDckJGO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalhBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdFBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCAqIGFzICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IHtlbXB0eSwgZ29hbCwgbW9uc3RlciwgdHJhcCwgdHJlZX0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbi8qKlxuICogWW91J2xsIHRlbGwgbWU6IFwiQSBmbG9vciBpcyBhIGZsb29yXCIsIGFuZCB5b3UnbGwgYmUgcmlnaHQuXG4gKiBUaGlzIGlzIG5vdCB0aGUgZmxvb3IgaXRzZWxmIHRoYXQgbWF0dGVycywgdGhpcyBpcyB3aGF0IGl0IGNvbnRhaW5zLlxuICogSXMgaXQgYW4gaG9ycmlibGUgbW9uc3RlciBvbiB0aGlzIGZsb29yPyBPciBhIGxldGhhbCB0cmFwPyBPciBhIGNsdWUgZm9yIHRoZSBuZXh0IGZsb29yPyBZb3UnbGwgc2VlLCB3YW5kZXJlci4uLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbG9vciB7XG4gICAgcHJpdmF0ZSB4OiBudW1iZXI7XG4gICAgcHJpdmF0ZSB5OiBudW1iZXI7XG5cbiAgICBwcml2YXRlIHZpc2l0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIGFjY2Vzc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHRyYXA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIGdvYWw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIG1vbnN0ZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHRyYXBDbHVlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBtb25zdGVyQ2x1ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgcHJvYmFiaWxpdHlNb25zdGVyID0gMDtcbiAgICBwcml2YXRlIHByb2JhYmlsaXR5VHJhcCA9IDA7XG5cbiAgICBjb25zdHJ1Y3Rvcih5OiBudW1iZXIsIHg6IG51bWJlciwgZWxlbWVudCA9IGVtcHR5KSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG5cbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IHRyYXApIHtcbiAgICAgICAgICAgIHRoaXMudHJhcCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCA9PT0gZ29hbCkge1xuICAgICAgICAgICAgdGhpcy5nb2FsID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50ID09PSBtb25zdGVyKSB7XG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXIgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVGhlIGZsb29yIGlzIGVtcHR5IG90aGVyd2lzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldFgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLng7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnk7XG4gICAgfVxuXG4gICAgcHVibGljIGlzVHJhcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhcDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNHb2FsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nb2FsO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc01vbnN0ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXI7XG4gICAgfVxuXG4gICAgcHVibGljIGlzTW9uc3RlckNsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXJDbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc1RyYXBDbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFwQ2x1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNFbXB0eSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRyYXAgJiZcbiAgICAgICAgICAgICF0aGlzLmdvYWwgJiZcbiAgICAgICAgICAgICF0aGlzLm1vbnN0ZXIgJiZcbiAgICAgICAgICAgICF0aGlzLnRyYXBDbHVlICYmXG4gICAgICAgICAgICAhdGhpcy5tb25zdGVyQ2x1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRDbHVlKGNsdWVUeXBlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKGNsdWVUeXBlID09PSB0cmFwKSB7XG4gICAgICAgICAgICB0aGlzLnRyYXBDbHVlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChjbHVlVHlwZSA9PT0gbW9uc3Rlcikge1xuICAgICAgICAgICAgdGhpcy5tb25zdGVyQ2x1ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNWaXNpdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdGVkO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0VmlzaXRlZChiID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnZpc2l0ZWQgPSBiO1xuICAgIH1cbiAgICBwdWJsaWMgaXNBY2Nlc3NpYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY2Nlc3NpYmxlO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0QWNjZXNzaWJsZShiID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmFjY2Vzc2libGUgPSBiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoYXQgaXMgdGhlIHByb2JhYmlsaXR5IHRoaXMgZmxvb3IgaXMgYSBtb25zdGVyP1xuICAgICAqL1xuICAgIHB1YmxpYyBnZXRQcm9iYWJpbGl0eU1vbnN0ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2JhYmlsaXR5TW9uc3RlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHByb2JhYmlsaXR5IHRoaXMgZmxvb3IgaXMgYSBtb25zdGVyLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRQcm9iYWJpbGl0eU1vbnN0ZXIocHJvYmFiaWxpdHkgPSAwKSB7XG4gICAgICAgIHRoaXMucHJvYmFiaWxpdHlNb25zdGVyID0gcHJvYmFiaWxpdHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHByb2JhYmlsaXR5IHRoaXMgZmxvb3IgaXMgYSBtb25zdGVyIGV2b2x2ZWQuXG4gICAgICovXG4gICAgcHVibGljIGFkZFByb2JhYmlsaXR5TW9uc3Rlcihwcm9iYWJpbGl0eSA9IDApIHtcbiAgICAgICAgdGhpcy5wcm9iYWJpbGl0eU1vbnN0ZXIgKz0gcHJvYmFiaWxpdHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hhdCBpcyB0aGUgcHJvYmFiaWxpdHkgdGhpcyBmbG9vciBpcyBhIHRyYXA/XG4gICAgICovXG4gICAgcHVibGljIGdldFByb2JhYmlsaXR5VHJhcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvYmFiaWxpdHlUcmFwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgcHJvYmFiaWxpdHkgdGhpcyBmbG9vciBpcyBhIHRyYXAuXG4gICAgICovXG4gICAgcHVibGljIHNldFByb2JhYmlsaXR5VHJhcChwcm9iYWJpbGl0eSA9IDApIHtcbiAgICAgICAgdGhpcy5wcm9iYWJpbGl0eVRyYXAgPSBwcm9iYWJpbGl0eTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcHJvYmFiaWxpdHkgdGhpcyBmbG9vciBpcyBhIHRyYXAgZXZvbHZlZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkUHJvYmFiaWxpdHlUcmFwKHByb2JhYmlsaXR5ID0gMCkge1xuICAgICAgICB0aGlzLnByb2JhYmlsaXR5VHJhcCArPSBwcm9iYWJpbGl0eTtcbiAgICB9XG5cbiAgICBwdWJsaWMga2lsbE1vbnN0ZXIoKSB7XG4gICAgICAgIHRoaXMubW9uc3RlciA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b0h0bWwoaXNLbm93bjogYm9vbGVhbiA9IHRydWUsIGFkZGl0aW9ubmFsQ2xhc3Nlczogc3RyaW5nW10pIHtcbiAgICAgICAgbGV0IGNsYXNzZXM6IHN0cmluZ1tdID0gW1wiZmxvb3JDYXNlXCJdLmNvbmNhdChhZGRpdGlvbm5hbENsYXNzZXMpO1xuXG4gICAgICAgIGlmIChpc0tub3duKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJ2aXNpdGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKFwid2FyRm9nXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNUcmFwKCkpIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChcInRyYXBcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNHb2FsKCkpIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChcImdvYWxcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNNb25zdGVyKCkpIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChcIm1vbnN0ZXJcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNUcmFwQ2x1ZSgpKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJ0cmFwQ2x1ZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc01vbnN0ZXJDbHVlKCkpIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChcIm1vbnN0ZXJDbHVlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiJHtjbGFzc2VzLmpvaW4oXCIgXCIpfVwiPjwvZGl2PmA7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtlbXB0eSwgZ29hbCwgbW9uc3RlciwgdHJhcCwgdHJlZX0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgRmxvb3IgZnJvbSBcIi4vRmxvb3JcIjtcblxuLyoqXG4gKiBBIGdsb29teSBkYXJrIGZvcmVzdC4gVGhlcmUgYXJlIGxvdHMgb2YgbW9uc3RlcnMgYW5kIHRyYXBzIGhlcmUuIEJlIGNhcmVmdWwsIHdhbmRlcmVyLi4uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcmVzdCB7XG4gICAgcHJpdmF0ZSBmb3Jlc3Q6IEZsb29yW11bXSA9IFtdO1xuICAgIHByaXZhdGUgd2lkdGg6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBoZWlnaHQ6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3Rvcih3ID0gMywgaCA9IDMpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IHc7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaDtcbiAgICB9XG5cbiAgICBwdWJsaWMgcG9wdWxhdGUobWF4Q2hhbmNlcyA9IDIwKSB7XG4gICAgICAgIC8vIFNldCB0aGUgbW9uc3RlcnMgYW5kIHRyYXBzXG4gICAgICAgIGxldCB0bXA6IEZsb29yW11bXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIHRtcFt5XSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLndpZHRoOyB4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0bXBSYW5kID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heENoYW5jZXMgLSAwKSArIDApO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRtcFJhbmQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSXQncyBhIG1vbnN0ZXIhXG4gICAgICAgICAgICAgICAgICAgIHRtcFt5XVt4XSA9IG5ldyBGbG9vcih5LCB4LCBtb25zdGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRtcFJhbmQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSXQncyBhIHRyYXAhXG4gICAgICAgICAgICAgICAgICAgIHRtcFt5XVt4XSA9IG5ldyBGbG9vcih5LCB4LCB0cmFwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0bXBbeV1beF0gPSBuZXcgRmxvb3IoeSwgeCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb3Jlc3QgPSB0bXA7XG5cbiAgICAgICAgLy8gU2V0IHRoZSB3YXkgb3V0XG4gICAgICAgIGxldCBpc0FXYXlPdXQgPSBmYWxzZTtcbiAgICAgICAgbGV0IG91dFk7XG4gICAgICAgIGxldCBvdXRYO1xuICAgICAgICB3aGlsZSAoIWlzQVdheU91dCkge1xuICAgICAgICAgICAgb3V0WSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0aGlzLmZvcmVzdC5sZW5ndGggLSAwKSArIDApO1xuICAgICAgICAgICAgb3V0WCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0aGlzLmZvcmVzdFswXS5sZW5ndGggLSAwKSArIDApO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5mb3Jlc3Rbb3V0WV1bb3V0WF0uaXNFbXB0eSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9yZXN0W291dFldW291dFhdID0gbmV3IEZsb29yKG91dFksIG91dFgsIGdvYWwpO1xuICAgICAgICAgICAgICAgIGlzQVdheU91dCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy53aWR0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGwgPSB0aGlzLmZvcmVzdFt5XVt4XTtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbC5pc01vbnN0ZXIoKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJdCdzIGEgbW9uc3RlciFcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDbHVlcyh5LCB4LCBtb25zdGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNlbGwuaXNUcmFwKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSXQncyBhIHRyYXAhXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q2x1ZXMoeSwgeCwgdHJhcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEZsb29yQ29udGVudCh5OiBudW1iZXIsIHg6IG51bWJlcik6IEZsb29yIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZXN0W3ldW3hdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRGb3Jlc3QoKTogRmxvb3JbXVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZXN0O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRXYXlPdXRQb3NpdGlvbigpIHtcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcmVzdFt5XVt4XS5pc0dvYWwoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge3gsIHl9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXROdW1iZXJPZkNhc2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3Jlc3QubGVuZ3RoICogdGhpcy5mb3Jlc3RbMF0ubGVuZ3RoO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3Jlc3QubGVuZ3RoO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZXN0WzBdLmxlbmd0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldENsdWVzKHk6IG51bWJlciwgeDogbnVtYmVyLCBjb250ZW50OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHkgLSAxID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0W3kgLSAxXVt4XS5zZXRDbHVlKGNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh5ICsgMSA8IHRoaXMuaGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdFt5ICsgMV1beF0uc2V0Q2x1ZShjb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RbeV1beCAtIDFdLnNldENsdWUoY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHggKyAxIDwgdGhpcy53aWR0aCkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RbeV1beCArIDFdLnNldENsdWUoY29udGVudCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCAqIGFzIHN3YWwgZnJvbSBcInN3ZWV0YWxlcnRcIjtcbmltcG9ydCBGbG9vciBmcm9tIFwiLi9GbG9vclwiO1xuaW1wb3J0IEZvcmVzdCBmcm9tIFwiLi9Gb3Jlc3RcIjtcbmltcG9ydCBXYW5kZXJlciBmcm9tIFwiLi9XYW5kZXJlclwiO1xuXG4vKipcbiAqIEl0J3MgYSBnYW1lIGZvciBldmVyeW9uZSwgZXhjZXB0IGZvciB0aGUgd2FuZGVyZXIuIFBvb3Igd2FuZGVyZXIuLi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG4gICAgcHJpdmF0ZSBjdXJyZW50Rm9yZXN0OiBGb3Jlc3Q7XG4gICAgcHJpdmF0ZSB3YW5kZXJlcjogV2FuZGVyZXI7XG4gICAgcHJpdmF0ZSBnYW1lRGl2OiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIHNjb3JlRGl2OiBIVE1MRWxlbWVudDtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihnYW1lRGl2OiBzdHJpbmcsIHNjb3JlRGl2OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5nYW1lRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZ2FtZURpdik7XG4gICAgICAgIHRoaXMuc2NvcmVEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzY29yZURpdik7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXQodyA9IDMsIGggPSAzKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlRm9yZXN0KHcsIGgpO1xuICAgICAgICB0aGlzLmdldEZvcmVzdCgpLnBvcHVsYXRlKCk7XG4gICAgICAgIHRoaXMuc2V0V2FuZGVyZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKGxldHNQbGF5OiBib29sZWFuID0gdHJ1ZSkge1xuXG4gICAgICAgIGlmIChsZXRzUGxheSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMud2FuZGVyZXIuaGFzTm9Nb3ZlcygpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53YW5kZXJlci50aGluaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy53YW5kZXJlci5hY3QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLndhbmRlcmVyLmlzRGVhZCgpKSB7XG4gICAgICAgICAgICBzd2FsKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIllvdSBqdXN0IGRpZWQuIFRvbyBiYWQuXCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi4pigXCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJlcnJvclwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLndhbmRlcmVyLnNldFNjb3JlKC0oMTAgKiB0aGlzLmdldEZvcmVzdCgpLmdldE51bWJlck9mQ2FzZXMoKSkpO1xuICAgICAgICAgICAgdGhpcy5zZXRXYW5kZXJlcih0aGlzLndhbmRlcmVyLmdldE1hcCgpLCB0aGlzLndhbmRlcmVyLmdldE9yaWdZKCksIHRoaXMud2FuZGVyZXIuZ2V0T3JpZ1goKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMud2FuZGVyZXIuaXNPdXQoKSkge1xuICAgICAgICAgICAgLy8gWW91IGp1c3Qgd29uIHRoaXMgZm9yZXN0ICFcbiAgICAgICAgICAgIHRoaXMud2FuZGVyZXIuc2V0U2NvcmUoMTAgKiB0aGlzLmdldEZvcmVzdCgpLmdldE51bWJlck9mQ2FzZXMoKSk7XG4gICAgICAgICAgICAvLyBDcmVhdGUgdGhlIG5leHQgbGV2ZWxcbiAgICAgICAgICAgIGNvbnN0IG5ld1NpemUgPSB0aGlzLmdldEZvcmVzdCgpLmdldEZvcmVzdCgpLmxlbmd0aCArIDE7XG4gICAgICAgICAgICBzd2FsKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIllvdSBqdXN0IHdvbiB0aGlzIGZvcmVzdCAhXCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi4q2Q77iPXCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuaW5pdChuZXdTaXplLCBuZXdTaXplKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud2FuZGVyZXIud2F0Y2hUaGVGbG9vcigpO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRXYW5kZXJlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2FuZGVyZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVGb3Jlc3QodyA9IDMsIGggPSAzKTogR2FtZSB7XG4gICAgICAgIHRoaXMuY3VycmVudEZvcmVzdCA9IG5ldyBGb3Jlc3QodywgaCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Rm9yZXN0KCk6IEZvcmVzdCB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRGb3Jlc3Q7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRXYW5kZXJlcihtOiBGbG9vcltdW10gPSB1bmRlZmluZWQsIHk6IG51bWJlciA9IHVuZGVmaW5lZCwgeDogbnVtYmVyID0gdW5kZWZpbmVkKTogR2FtZSB7XG4gICAgICAgIGNvbnN0IGZvcmVzdCA9IHRoaXMuY3VycmVudEZvcmVzdC5nZXRGb3Jlc3QoKTtcblxuICAgICAgICBsZXQgaXNPayA9IGZhbHNlO1xuICAgICAgICBpZiAoeSA9PT0gdW5kZWZpbmVkICYmIHggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgd2hpbGUgKCFpc09rKSB7XG4gICAgICAgICAgICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChmb3Jlc3QubGVuZ3RoIC0gMCkgKyAwKTtcbiAgICAgICAgICAgICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGZvcmVzdFswXS5sZW5ndGggLSAwKSArIDApO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZvcmVzdFt5XVt4XS5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNPayA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBvbGRTY29yZSA9IDA7XG4gICAgICAgIGlmICh0aGlzLndhbmRlcmVyKSB7XG4gICAgICAgICAgICBvbGRTY29yZSA9IHRoaXMud2FuZGVyZXIuZ2V0U2NvcmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud2FuZGVyZXIgPSBuZXcgV2FuZGVyZXIoeSwgeCwgdGhpcy5jdXJyZW50Rm9yZXN0LCBvbGRTY29yZSk7XG5cbiAgICAgICAgaWYgKG0pIHtcbiAgICAgICAgICAgIHRoaXMud2FuZGVyZXIuc2V0TWFwKG0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGZvcmVzdCA9IHRoaXMuZ2V0Rm9yZXN0KCkuZ2V0Rm9yZXN0KCk7XG4gICAgICAgIGNvbnN0IHdhbmRlcmVyID0gdGhpcy53YW5kZXJlcjtcblxuICAgICAgICBsZXQgaHRtbDogc3RyaW5nID0gXCJcIjtcblxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuY3VycmVudEZvcmVzdC5nZXRGb3Jlc3QoKS5sZW5ndGg7IHkrKykge1xuICAgICAgICAgICAgaHRtbCArPSBcIjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XCI7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuY3VycmVudEZvcmVzdC5nZXRGb3Jlc3QoKVswXS5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgICAgIGxldCB3YW5kZXJlclBvcyA9IHdhbmRlcmVyLmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgbGV0IGZsb29yID0gdGhpcy5jdXJyZW50Rm9yZXN0LmdldEZvcmVzdCgpW3ldW3hdO1xuICAgICAgICAgICAgICAgIGxldCBhZGRpdGlvbm5hbENsYXNzZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGlmICh3YW5kZXJlclBvcy54ID09PSB4ICYmIHdhbmRlcmVyUG9zLnkgPT09IHkpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25uYWxDbGFzc2VzLnB1c2goXCJ3YW5kZXJlclwiKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBodG1sICs9IGZsb29yLnRvSHRtbCh0aGlzLndhbmRlcmVyLmlzS25vd24oeSwgeCksIGFkZGl0aW9ubmFsQ2xhc3Nlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBodG1sICs9IFwiPC9kaXY+XCI7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdhbWVEaXYuY2xhc3NOYW1lID0gXCJcIjtcbiAgICAgICAgdGhpcy5nYW1lRGl2LmNsYXNzTGlzdC5hZGQoYHdpZHRoJHtmb3Jlc3QubGVuZ3RofWApO1xuICAgICAgICB0aGlzLmdhbWVEaXYuaW5uZXJIVE1MID0gaHRtbDtcblxuICAgICAgICB0aGlzLnNjb3JlRGl2LmlubmVySFRNTCA9IHdhbmRlcmVyLmdldFNjb3JlKCkudG9TdHJpbmcoKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCBGbG9vciBmcm9tIFwiLi9GbG9vclwiO1xuXG4vKipcbiAqIEFsbCB0aGUgbG9naWNhbCBydWxlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naWNhbCB7XG5cbiAgICBwcml2YXRlIGJvcmRlcnM6IEZsb29yW107XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYm9yZGVycyBFdmVyeSBhY2Nlc3NpYmxlIHVudmlzaXRlZCBmbG9vcnMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoYm9yZGVyczogRmxvb3JbXSkge1xuICAgICAgICB0aGlzLmJvcmRlcnMgPSBib3JkZXJzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgcHJvYmFibHlNb25zdGVyKHg6IEZsb29yKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB4LmdldFByb2JhYmlsaXR5TW9uc3RlcigpICE9PSAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBwcm9iYWJseVRyYXAoeDogRmxvb3IpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHguZ2V0UHJvYmFiaWxpdHlUcmFwKCkgIT09IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9yIGVhY2ggeCAobm90IHByb2JhYmx5TW9uc3Rlcih4KSBhbmQgbm90IHByb2JhYmx5VHJhcCh4KSA9PiBwcm9iYWJseUVtcHR5KHgpKVxuICAgICAqL1xuICAgIHB1YmxpYyBwcm9iYWJseUVtcHR5KHg6IEZsb29yKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5wcm9iYWJseU1vbnN0ZXIoeCkgJiYgIXRoaXMucHJvYmFibHlUcmFwKHgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvciBlYWNoIHhcbiAgICAgKiAgICAgICgocHJvYmFibHlFbXB0eSh4KVxuICAgICAqICAgICAgICAgIG9yIChwcm9iYWJseU1vbnN0ZXIoeClcbiAgICAgKiAgICAgICAgICAgICAgICAgIGFuZCBub3QgcHJvYmFibHlUcmFwKHgpXG4gICAgICogICAgICAgICAgICAgICAgICBhbmQgKG5vdCBleGlzdHMgeSAocHJvYmFibHlFbXB0eSh5KSkpKVxuICAgICAqICAgICAgICAgIG9yIChwcm9iYWJseVRyYXAoeClcbiAgICAgKiAgICAgICAgICAgICAgICAgIGFuZCBub3QgZXhpc3RzIHkgKHByb2JhYmx5RW1wdHkoeSkgb3IgKHByb2JhYmx5TW9uc3Rlcih5KSBhbmQgbm90IHByb2JhYmx5VHJhcCh5KSkpKSlcbiAgICAgKiAgICAgICAgPT4gY2FuR29Ubyh4KSlcbiAgICAgKi9cbiAgICBwdWJsaWMgY2FuR29Ubyh4OiBGbG9vcik6IGJvb2xlYW4ge1xuXG4gICAgICAgIC8vIEV4aXN0cyB5IChwcm9iYWJseUVtcHR5KHkpKVxuICAgICAgICBmdW5jdGlvbiBleGlzdHNFbXB0eSh0aGlzQ2xhc3M6IExvZ2ljYWwpOiBib29sZWFuIHtcbiAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgIGxldCBleGlzdHMgPSBmYWxzZTtcbiAgICAgICAgICAgIHdoaWxlIChpIDwgdGhpc0NsYXNzLmJvcmRlcnMubGVuZ3RoICYmICFleGlzdHMpIHtcbiAgICAgICAgICAgICAgICBleGlzdHMgPSB0aGlzQ2xhc3MucHJvYmFibHlFbXB0eSh0aGlzQ2xhc3MuYm9yZGVyc1tpXSk7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGV4aXN0cztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEV4aXN0cyB5IChwcm9iYWJseUVtcHR5KHkpIG9yIChwcm9iYWJseU1vbnN0ZXIoeSkgYW5kIG5vdCBwcm9iYWJseVRyYXAoeSkpKVxuICAgICAgICBmdW5jdGlvbiBleGlzdHNFbXB0eU9yTW9uc3Rlck5vdFRyYXAodGhpc0NsYXNzOiBMb2dpY2FsKTogYm9vbGVhbiB7XG4gICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICBsZXQgZXhpc3RzID0gZmFsc2U7XG4gICAgICAgICAgICB3aGlsZSAoaSA8IHRoaXNDbGFzcy5ib3JkZXJzLmxlbmd0aCAmJiAhZXhpc3RzKSB7XG4gICAgICAgICAgICAgICAgZXhpc3RzID0gdGhpc0NsYXNzLnByb2JhYmx5RW1wdHkodGhpc0NsYXNzLmJvcmRlcnNbaV0pXG4gICAgICAgICAgICAgICAgfHwgKHRoaXNDbGFzcy5wcm9iYWJseU1vbnN0ZXIodGhpc0NsYXNzLmJvcmRlcnNbaV0pXG4gICAgICAgICAgICAgICAgJiYgIXRoaXNDbGFzcy5wcm9iYWJseVRyYXAodGhpc0NsYXNzLmJvcmRlcnNbaV0pKTtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZXhpc3RzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvYmFibHlFbXB0eSh4KVxuICAgICAgICB8fCB0aGlzLnByb2JhYmx5TW9uc3Rlcih4KSAmJiAhdGhpcy5wcm9iYWJseVRyYXAoeCkgJiYgIWV4aXN0c0VtcHR5KHRoaXMpXG4gICAgICAgIHx8IHRoaXMucHJvYmFibHlUcmFwKHgpICYmICFleGlzdHNFbXB0eU9yTW9uc3Rlck5vdFRyYXAodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9yIGVhY2ggeFxuICAgICAqICAgICAgKChjYW5Hb1RvKHgpIGFuZCBwcm9iYWJseU1vbnN0ZXIoeCkgYW5kIG5vdCBwcm9iYWJseVRyYXAoeCkpXG4gICAgICogICAgICAgICAgPT4gbm90IGV4aXN0cyB5IChwcm9iYWJseU1vbnN0ZXIoeSkgYW5kIG5vdCBwcm9iYWJseVRyYXAoeSkgYW5kIGdyZWF0ZXJQcm9iYWJpbGl0eU1vbnN0ZXIoeSwgeCkpKVxuICAgICAqL1xuICAgIHB1YmxpYyBydWxlTW9uc3Rlck5vdFRyYXAoeDogRmxvb3IpOiBib29sZWFuIHtcblxuICAgICAgICAvLyBFeGlzdHMgeSAocHJvYmFibHlNb25zdGVyKHkpIGFuZCBub3QgcHJvYmFibHlUcmFwKHkpIGFuZCBncmVhdGVyUHJvYmFiaWxpdHlNb25zdGVyKHksIHgpKVxuICAgICAgICBmdW5jdGlvbiBleGlzdHNNb25zdGVyTW9yZVByb2JhYmxlKHRoaXNDbGFzczogTG9naWNhbCwgZmxvb3I6IEZsb29yKTogYm9vbGVhbiB7XG4gICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICBsZXQgZXhpc3RzID0gZmFsc2U7XG4gICAgICAgICAgICB3aGlsZSAoaSA8IHRoaXNDbGFzcy5ib3JkZXJzLmxlbmd0aCAmJiAhZXhpc3RzKSB7XG4gICAgICAgICAgICAgICAgZXhpc3RzID0gdGhpc0NsYXNzLnByb2JhYmx5TW9uc3Rlcih0aGlzQ2xhc3MuYm9yZGVyc1tpXSlcbiAgICAgICAgICAgICAgICAmJiAhdGhpc0NsYXNzLnByb2JhYmx5VHJhcCh0aGlzQ2xhc3MuYm9yZGVyc1tpXSlcbiAgICAgICAgICAgICAgICAmJiB0aGlzQ2xhc3MuZ3JlYXRlclByb2JhYmlsaXR5TW9uc3Rlcih0aGlzQ2xhc3MuYm9yZGVyc1tpXSwgZmxvb3IpO1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBleGlzdHM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jYW5Hb1RvKHgpICYmIHRoaXMucHJvYmFibHlNb25zdGVyKHgpICYmICF0aGlzLnByb2JhYmx5VHJhcCh4KSkge1xuICAgICAgICAgICAgcmV0dXJuICFleGlzdHNNb25zdGVyTW9yZVByb2JhYmxlKHRoaXMsIHgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb3IgZWFjaCB4XG4gICAgICogICAgICAoKGNhbkdvVG8oeCkgYW5kIHByb2JhYmx5TW9uc3Rlcih4KSBhbmQgcHJvYmFibHlUcmFwKHgpKVxuICAgICAqICAgICAgICAgID0+IG5vdCBleGlzdHMgeSAocHJvYmFibHlNb25zdGVyKHkpIGFuZCBwcm9iYWJseVRyYXAoeSkgYW5kIGdyZWF0ZXJQcm9iYWJpbGl0eU1vbnN0ZXIoeSwgeCkpKVxuICAgICAqL1xuICAgIHB1YmxpYyBydWxlTW9uc3RlclRyYXAoeDogRmxvb3IpOiBib29sZWFuIHtcblxuICAgICAgICAvLyBFeGlzdHMgeSAocHJvYmFibHlNb25zdGVyKHkpIGFuZCBwcm9iYWJseVRyYXAoeSkgYW5kIGdyZWF0ZXJQcm9iYWJpbGl0eU1vbnN0ZXIoeSwgeCkpXG4gICAgICAgIGZ1bmN0aW9uIGV4aXN0c01vbnN0ZXJUcmFwTW9yZVByb2JhYmxlKHRoaXNDbGFzczogTG9naWNhbCwgZmxvb3I6IEZsb29yKTogYm9vbGVhbiB7XG4gICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICBsZXQgZXhpc3RzID0gZmFsc2U7XG4gICAgICAgICAgICB3aGlsZSAoaSA8IHRoaXNDbGFzcy5ib3JkZXJzLmxlbmd0aCAmJiAhZXhpc3RzKSB7XG4gICAgICAgICAgICAgICAgZXhpc3RzID0gdGhpc0NsYXNzLnByb2JhYmx5TW9uc3Rlcih0aGlzQ2xhc3MuYm9yZGVyc1tpXSlcbiAgICAgICAgICAgICAgICAmJiB0aGlzQ2xhc3MucHJvYmFibHlUcmFwKHRoaXNDbGFzcy5ib3JkZXJzW2ldKVxuICAgICAgICAgICAgICAgICYmIHRoaXNDbGFzcy5ncmVhdGVyUHJvYmFiaWxpdHlNb25zdGVyKHRoaXNDbGFzcy5ib3JkZXJzW2ldLCBmbG9vcik7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGV4aXN0cztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNhbkdvVG8oeCkgJiYgdGhpcy5wcm9iYWJseU1vbnN0ZXIoeCkgJiYgdGhpcy5wcm9iYWJseVRyYXAoeCkpIHtcbiAgICAgICAgICAgIHJldHVybiAhZXhpc3RzTW9uc3RlclRyYXBNb3JlUHJvYmFibGUodGhpcywgeCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvciBlYWNoIHggKGNhbkdvVG8oeCkgYW5kIHByb2JhYmx5TW9uc3Rlcih4KSA9PiBzaG9vdEJlZm9yZSh4KSlcbiAgICAgKi9cbiAgICBwdWJsaWMgc2hvb3RCZWZvcmUoeDogRmxvb3IpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FuR29Ubyh4KSAmJiB0aGlzLnByb2JhYmx5TW9uc3Rlcih4KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb3IgZWFjaCB4XG4gICAgICogICAgICAoKGNhbkdvVG8oeCkgYW5kIHByb2JhYmx5VHJhcCh4KSlcbiAgICAgKiAgICAgICAgICA9PiBub3QgZXhpc3RzIHkgKHByb2JhYmx5VHJhcCh5KSBhbmQgc21hbGxlclByb2JhYmlsaXR5VHJhcCh5LCB4KSkpXG4gICAgICovXG4gICAgcHVibGljIHJ1bGVUcmFwKHg6IEZsb29yKTogYm9vbGVhbiB7XG5cbiAgICAgICAgLy8gRXhpc3RzIHkgKHByb2JhYmx5VHJhcCh5KSBhbmQgc21hbGxlclByb2JhYmlsaXR5VHJhcCh5LCB4KSlcbiAgICAgICAgZnVuY3Rpb24gZXhpc3RzVHJhcExlc3NQcm9iYWJsZSh0aGlzQ2xhc3M6IExvZ2ljYWwsIGZsb29yOiBGbG9vcik6IGJvb2xlYW4ge1xuICAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICAgbGV0IGV4aXN0cyA9IGZhbHNlO1xuICAgICAgICAgICAgd2hpbGUgKGkgPCB0aGlzQ2xhc3MuYm9yZGVycy5sZW5ndGggJiYgIWV4aXN0cykge1xuICAgICAgICAgICAgICAgIGV4aXN0cyA9IHRoaXNDbGFzcy5wcm9iYWJseVRyYXAodGhpc0NsYXNzLmJvcmRlcnNbaV0pXG4gICAgICAgICAgICAgICAgJiYgdGhpc0NsYXNzLnNtYWxsZXJQcm9iYWJpbGl0eVRyYXAodGhpc0NsYXNzLmJvcmRlcnNbaV0sIGZsb29yKTtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZXhpc3RzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2FuR29Ubyh4KSAmJiB0aGlzLnByb2JhYmx5VHJhcCh4KSkge1xuICAgICAgICAgICAgcmV0dXJuICFleGlzdHNUcmFwTGVzc1Byb2JhYmxlKHRoaXMsIHgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ3JlYXRlclByb2JhYmlsaXR5TW9uc3Rlcih5OiBGbG9vciwgeDogRmxvb3IpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHkuZ2V0UHJvYmFiaWxpdHlNb25zdGVyKCkgPiB4LmdldFByb2JhYmlsaXR5TW9uc3RlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzbWFsbGVyUHJvYmFiaWxpdHlUcmFwKHk6IEZsb29yLCB4OiBGbG9vcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4geS5nZXRQcm9iYWJpbGl0eVRyYXAoKSA8IHguZ2V0UHJvYmFiaWxpdHlUcmFwKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgUGF0aEZpbmRpbmcgZnJvbSBcInBhdGhmaW5kaW5nXCI7XG5pbXBvcnQgRmxvb3IgZnJvbSBcIi4vRmxvb3JcIjtcbmltcG9ydCBGb3Jlc3QgZnJvbSBcIi4vRm9yZXN0XCI7XG5pbXBvcnQgTG9naWNhbCBmcm9tIFwiLi9Mb2dpY2FsXCI7XG5cbi8qKlxuICogVGhlIHdhbmRlcmVyLCB0aGUgaGVybyBvZiB0aGlzIHF1ZXN0LiBHb29kIGx1Y2sgc29uLi4uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbmRlcmVyIHtcbiAgICBwcml2YXRlIGZvcmVzdDogRm9yZXN0O1xuICAgIHByaXZhdGUgZm9yZXN0TWFwV2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIGZvcmVzdE1hcEhlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgZm9yZXN0TWFwOiBGbG9vcltdW10gPSBbXTtcbiAgICBwcml2YXRlIHk6IG51bWJlcjtcbiAgICBwcml2YXRlIHg6IG51bWJlcjtcbiAgICBwcml2YXRlIG9yaWdYOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBvcmlnWTogbnVtYmVyO1xuICAgIHByaXZhdGUgc2NvcmU6IG51bWJlcjtcbiAgICBwcml2YXRlIGFjdGlvbnM6IHN0cmluZ1tdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXJZOiBudW1iZXIsIHBsYXllclg6IG51bWJlciwgZGFya1dvb2RzOiBGb3Jlc3QsIHNjb3JlOiBudW1iZXIgPSAwKSB7XG4gICAgICAgIHRoaXMuZm9yZXN0ID0gZGFya1dvb2RzO1xuICAgICAgICB0aGlzLnNjb3JlID0gc2NvcmU7XG4gICAgICAgIHRoaXMueCA9IHBsYXllclg7XG4gICAgICAgIHRoaXMueSA9IHBsYXllclk7XG4gICAgICAgIHRoaXMub3JpZ1ggPSBwbGF5ZXJYO1xuICAgICAgICB0aGlzLm9yaWdZID0gcGxheWVyWTtcblxuICAgICAgICBjb25zdCBoZWlnaHQgPSBkYXJrV29vZHMuZ2V0Rm9yZXN0KCkubGVuZ3RoO1xuICAgICAgICBjb25zdCB3aWR0aCA9IGRhcmtXb29kcy5nZXRGb3Jlc3QoKVswXS5sZW5ndGg7XG5cbiAgICAgICAgdGhpcy5mb3Jlc3RNYXBIZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuZm9yZXN0TWFwV2lkdGggPSB3aWR0aDtcblxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt5XSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbeV1beF0gPSBuZXcgRmxvb3IoeSwgeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TWFwSGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3Jlc3RNYXAubGVuZ3RoO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNYXBXaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZXN0TWFwWzBdLmxlbmd0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNLbm93bih5OiBudW1iZXIsIHg6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3Jlc3RNYXBbeV1beF0uaXNWaXNpdGVkKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEZvcmVzdChmb3Jlc3Q6IEZvcmVzdCkge1xuICAgICAgICB0aGlzLmZvcmVzdCA9IGZvcmVzdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0UG9zaXRpb24oeTogbnVtYmVyLCB4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UG9zaXRpb24oKSB7XG4gICAgICAgIHJldHVybiB7eDogdGhpcy54LCB5OiB0aGlzLnl9O1xuICAgIH1cblxuICAgIHB1YmxpYyB0b0h0bWwoKSB7XG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cImZsb29yQ2FzZSB3YW5kZXJlclwiPjwvZGl2PmA7XG4gICAgfVxuXG4gICAgcHVibGljIHdhdGNoVGhlRmxvb3IoKTogRmxvb3Ige1xuICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5mb3Jlc3QuZ2V0Rmxvb3JDb250ZW50KHRoaXMueSwgdGhpcy54KTtcbiAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnhdID0gY29udGVudDtcbiAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnhdLnNldFZpc2l0ZWQodHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZU1hcCgpIHtcbiAgICAgICAgbGV0IG1vbnN0ZXJDbHVlID0gZmFsc2U7XG4gICAgICAgIGxldCB0cmFwQ2x1ZSA9IGZhbHNlO1xuICAgICAgICBsZXQgbnVtYmVyQWRqYWNlbnRWaXNpdGVkID0gdGhpcy5udW1iZXJBZGphY2VudFZpc2l0ZWQodGhpcy55LCB0aGlzLngpO1xuICAgICAgICBsZXQgcHJvYmFiaWxpdHkgPSAwO1xuICAgICAgICBpZiAobnVtYmVyQWRqYWNlbnRWaXNpdGVkIDwgNCkge1xuICAgICAgICAgICAgcHJvYmFiaWxpdHkgPSAxIC8gKCA0IC0gbnVtYmVyQWRqYWNlbnRWaXNpdGVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54XSA9IHRoaXMuZm9yZXN0LmdldEZsb29yQ29udGVudCh0aGlzLnksIHRoaXMueCk7XG4gICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54XS5zZXRWaXNpdGVkKHRydWUpO1xuXG4gICAgICAgIC8vIE5vIGNoZWF0IGhlcmUsIGp1c3QgdXNlZCBmb3Igc3RvcmluZyB0aGUgcHJvYmFiaWxpdGllc1xuICAgICAgICBpZiAodGhpcy55ICsgMSA8IHRoaXMuZm9yZXN0TWFwLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55ICsgMV1bdGhpcy54XSA9IHRoaXMuZm9yZXN0LmdldEZsb29yQ29udGVudCh0aGlzLnkgKyAxLCB0aGlzLngpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnkgLSAxID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueSAtIDFdW3RoaXMueF0gPSB0aGlzLmZvcmVzdC5nZXRGbG9vckNvbnRlbnQodGhpcy55IC0gMSwgdGhpcy54KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy54ICsgMSA8IHRoaXMuZm9yZXN0TWFwWzBdLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggKyAxXSA9IHRoaXMuZm9yZXN0LmdldEZsb29yQ29udGVudCh0aGlzLnksIHRoaXMueCArIDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnggLSAxID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54IC0gMV0gPSB0aGlzLmZvcmVzdC5nZXRGbG9vckNvbnRlbnQodGhpcy55LCB0aGlzLnggLSAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueF0uaXNNb25zdGVyQ2x1ZSgpKSB7XG4gICAgICAgICAgICBtb25zdGVyQ2x1ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54XS5pc1RyYXBDbHVlKCkpIHtcbiAgICAgICAgICAgIHRyYXBDbHVlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpbmQgYWRqYWNlbnQgZmxvb3JzXG4gICAgICAgIGlmICh0aGlzLnkgKyAxIDwgdGhpcy5mb3Jlc3RNYXAubGVuZ3RoICYmICF0aGlzLmZvcmVzdE1hcFt0aGlzLnkgKyAxXVt0aGlzLnhdLmlzVmlzaXRlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnkgKyAxXVt0aGlzLnhdLnNldEFjY2Vzc2libGUodHJ1ZSk7XG4gICAgICAgICAgICBpZiAobW9uc3RlckNsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnkgKyAxXVt0aGlzLnhdLmFkZFByb2JhYmlsaXR5TW9uc3Rlcihwcm9iYWJpbGl0eSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueSArIDFdW3RoaXMueF0uc2V0UHJvYmFiaWxpdHlNb25zdGVyKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRyYXBDbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55ICsgMV1bdGhpcy54XS5hZGRQcm9iYWJpbGl0eVRyYXAocHJvYmFiaWxpdHkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnkgKyAxXVt0aGlzLnhdLnNldFByb2JhYmlsaXR5VHJhcCgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy55IC0gMSA+PSAwICYmICF0aGlzLmZvcmVzdE1hcFt0aGlzLnkgLSAxXVt0aGlzLnhdLmlzVmlzaXRlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnkgLSAxXVt0aGlzLnhdLnNldEFjY2Vzc2libGUodHJ1ZSk7XG4gICAgICAgICAgICBpZiAobW9uc3RlckNsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnkgLSAxXVt0aGlzLnhdLmFkZFByb2JhYmlsaXR5TW9uc3Rlcihwcm9iYWJpbGl0eSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueSAtIDFdW3RoaXMueF0uc2V0UHJvYmFiaWxpdHlNb25zdGVyKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRyYXBDbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55IC0gMV1bdGhpcy54XS5hZGRQcm9iYWJpbGl0eVRyYXAocHJvYmFiaWxpdHkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnkgLSAxXVt0aGlzLnhdLnNldFByb2JhYmlsaXR5VHJhcCgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy54ICsgMSA8IHRoaXMuZm9yZXN0TWFwWzBdLmxlbmd0aCAmJiAhdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggKyAxXS5pc1Zpc2l0ZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggKyAxXS5zZXRBY2Nlc3NpYmxlKHRydWUpO1xuICAgICAgICAgICAgaWYgKG1vbnN0ZXJDbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggKyAxXS5hZGRQcm9iYWJpbGl0eU1vbnN0ZXIocHJvYmFiaWxpdHkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueCArIDFdLnNldFByb2JhYmlsaXR5TW9uc3RlcigwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0cmFwQ2x1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54ICsgMV0uYWRkUHJvYmFiaWxpdHlUcmFwKHByb2JhYmlsaXR5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggKyAxXS5zZXRQcm9iYWJpbGl0eVRyYXAoMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMueCAtIDEgPj0gMCAmJiAhdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggLSAxXS5pc1Zpc2l0ZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggLSAxXS5zZXRBY2Nlc3NpYmxlKHRydWUpO1xuICAgICAgICAgICAgaWYgKG1vbnN0ZXJDbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggLSAxXS5hZGRQcm9iYWJpbGl0eU1vbnN0ZXIocHJvYmFiaWxpdHkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueCAtIDFdLnNldFByb2JhYmlsaXR5TW9uc3RlcigwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0cmFwQ2x1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54IC0gMV0uYWRkUHJvYmFiaWxpdHlUcmFwKHByb2JhYmlsaXR5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggLSAxXS5zZXRQcm9iYWJpbGl0eVRyYXAoMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgYWN0KCkge1xuICAgICAgICBpZiAodGhpcy5hY3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuYWN0aW9ucy5zaGlmdCgpO1xuXG4gICAgICAgICAgICBpZiAoYWN0aW9uID09PSBcImxlZnRcIiB8fCBhY3Rpb24gPT09IFwicmlnaHRcIiB8fCBhY3Rpb24gPT09IFwidXBcIiB8fCBhY3Rpb24gPT09IFwiZG93blwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlKGFjdGlvbik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gXCJzaG9vdC1sZWZ0XCIgfHxcbiAgICAgICAgICAgICAgICBhY3Rpb24gPT09IFwic2hvb3QtcmlnaHRcIiB8fFxuICAgICAgICAgICAgICAgIGFjdGlvbiA9PT0gXCJzaG9vdC11cFwiIHx8XG4gICAgICAgICAgICAgICAgYWN0aW9uID09PSBcInNob290LWRvd25cIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNob290RGlyZWN0aW9uID0gYWN0aW9uLnN1YnN0cmluZyg2KTtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZVNsaW5nc2hvdChzaG9vdERpcmVjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBAdG9kb1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHRoaW5rKCkge1xuICAgICAgICBsZXQgdGhpc0Zsb29yID0gdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnhdO1xuXG4gICAgICAgIHRoaXMudXBkYXRlTWFwKCk7XG4gICAgICAgIC8vIEZpbmQgdGlsZXMgdG8gdmlzaXRcbiAgICAgICAgbGV0IGJvcmRlck1hcCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBqID0gMCA7IGogPCB0aGlzLmdldE1hcEhlaWdodCgpIDsgaisrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCB0aGlzLmdldE1hcFdpZHRoKCkgOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3Jlc3RNYXBbal1baV0uaXNBY2Nlc3NpYmxlKCkgJiYgIXRoaXMuZm9yZXN0TWFwW2pdW2ldLmlzVmlzaXRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlck1hcC5wdXNoKHRoaXMuZm9yZXN0TWFwW2pdW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDb21wbGV4IGxvZ2ljIGFmdGVyIHRoaXMgbGluZVxuICAgICAgICBsZXQgd2FuZGVyZXJMb2dpYyA9IG5ldyBMb2dpY2FsKGJvcmRlck1hcCk7XG4gICAgICAgIGxldCBwb3NpdGlvbiA9IDA7XG4gICAgICAgIGxldCBkZXN0aW5hdGlvbkZvdW5kID0gZmFsc2U7XG4gICAgICAgIHdoaWxlICgoKHBvc2l0aW9uKSA8IGJvcmRlck1hcC5sZW5ndGgpICYmIGRlc3RpbmF0aW9uRm91bmQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAod2FuZGVyZXJMb2dpYy5jYW5Hb1RvKGJvcmRlck1hcFtwb3NpdGlvbl0pKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBUZXN0cyB0aGUgbG9naWNhbCBydWxlc1xuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uRm91bmQgPSAod2FuZGVyZXJMb2dpYy5ydWxlTW9uc3Rlck5vdFRyYXAoYm9yZGVyTWFwW3Bvc2l0aW9uXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHdhbmRlcmVyTG9naWMucnVsZU1vbnN0ZXJUcmFwKGJvcmRlck1hcFtwb3NpdGlvbl0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB3YW5kZXJlckxvZ2ljLnJ1bGVUcmFwKGJvcmRlck1hcFtwb3NpdGlvbl0pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRlc3RpbmF0aW9uRm91bmQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb24rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgbGV0IGhhdmVUb1Nob290ID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKGRlc3RpbmF0aW9uRm91bmQpIHtcbiAgICAgICAgICAgIGlmICh3YW5kZXJlckxvZ2ljLnNob290QmVmb3JlKGJvcmRlck1hcFtwb3NpdGlvbl0pKSB7XG4gICAgICAgICAgICAgICAgaGF2ZVRvU2hvb3QgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zID0gdGhpcy5maW5kUGF0aCh0aGlzRmxvb3IsIGJvcmRlck1hcFtwb3NpdGlvbl0sIGhhdmVUb1Nob290KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEB0b2RvIEl0IGlzIGltcG9zc2libGVcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmFjdGlvbnMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZmluZFBhdGgoc3RhcnQ6IEZsb29yLCBkZXN0aW5hdGlvbjogRmxvb3IsIGhhdmVUb1Nob290OiBib29sZWFuKSB7XG4gICAgICAgIC8vIE1hdHJpeCBpbml0XG4gICAgICAgIGxldCBtYXRyaXg6IG51bWJlcltdW10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmZvcmVzdE1hcEhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICBtYXRyaXhbeV0gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5mb3Jlc3RNYXBXaWR0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9yZXN0TWFwW3ldW3hdLmlzVmlzaXRlZCgpXG4gICAgICAgICAgICAgICAgICAgICYmICF0aGlzLmZvcmVzdE1hcFt5XVt4XS5pc01vbnN0ZXIoKVxuICAgICAgICAgICAgICAgICAgICAmJiAhdGhpcy5mb3Jlc3RNYXBbeV1beF0uaXNUcmFwKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gV2Fsa2FibGVcbiAgICAgICAgICAgICAgICAgICAgbWF0cml4W3ldW3hdID0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBCbG9ja2VkXG4gICAgICAgICAgICAgICAgICAgIG1hdHJpeFt5XVt4XSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGVzdGluYXRpb24gbXVzdCBiZSB3YWxrYWJsZVxuICAgICAgICBtYXRyaXhbZGVzdGluYXRpb24uZ2V0WSgpXVtkZXN0aW5hdGlvbi5nZXRYKCldID0gMDtcblxuICAgICAgICBsZXQgZ3JpZCA9IG5ldyBQYXRoRmluZGluZy5HcmlkKG1hdHJpeCk7XG4gICAgICAgIGxldCBmaW5kZXIgPSBuZXcgUGF0aEZpbmRpbmcuQVN0YXJGaW5kZXIoKTtcbiAgICAgICAgLy8gQHRvZG8gdmVyaWZ5IHggYW5kIHkgYXhpcyBvcmRlciA6IGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL3BhdGhmaW5kaW5nXG5cbiAgICAgICAgbGV0IHBhdGggPSBmaW5kZXIuZmluZFBhdGgoc3RhcnQuZ2V0WCgpLCBzdGFydC5nZXRZKCksIGRlc3RpbmF0aW9uLmdldFgoKSwgZGVzdGluYXRpb24uZ2V0WSgpLCBncmlkKTtcblxuICAgICAgICBsZXQgbW92ZXNQYXRoID0gdGhpcy5maW5kTW92ZXMocGF0aCwgaGF2ZVRvU2hvb3QpO1xuICAgICAgICByZXR1cm4gbW92ZXNQYXRoO1xuICAgIH1cblxuICAgIHB1YmxpYyBmaW5kTW92ZXMocGF0aDogYW55W10sIGhhdmVUb1Nob290OiBib29sZWFuKSB7XG4gICAgICAgIGxldCBtb3Zlc1BhdGggPSBbXTtcbiAgICAgICAgLy8gcGF0aFtpXVsxXSBpcyB4IGFuZCBwYXRoW2ldWzBdIGlzIHlcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocGF0aFtpXVsxXSA9PT0gcGF0aFtpIC0gMV1bMV0pIHtcbiAgICAgICAgICAgICAgICAvLyB4IGlzIHRoZSBzYW1lLCBzbyB0aGUgd2FuZGVyZXIgZ29lcyB1cCBvciBkb3duXG4gICAgICAgICAgICAgICAgaWYgKHBhdGhbaV1bMF0gPCBwYXRoW2kgLSAxXVswXSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgd2FuZGVyZXIgZ29lcyBsZWZ0XG4gICAgICAgICAgICAgICAgICAgIG1vdmVzUGF0aC5wdXNoKFwibGVmdFwiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhdGhbaV1bMF0gPiBwYXRoW2kgLSAxXVswXSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgd2FuZGVyZXIgZ29lcyByaWdodFxuICAgICAgICAgICAgICAgICAgICBtb3Zlc1BhdGgucHVzaChcInJpZ2h0XCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEB0b2RvIFdURiFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhdGhbaV1bMF0gPT09IHBhdGhbaSAtIDFdWzBdKSB7XG4gICAgICAgICAgICAgICAgLy8geSBpcyB0aGUgc2FtZSwgc28gdGhlIHdhbmRlcmVyIGdvZXMgbGVmdCBvciByaWdodFxuICAgICAgICAgICAgICAgIGlmIChwYXRoW2ldWzFdIDwgcGF0aFtpIC0gMV1bMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHdhbmRlcmVyIGdvZXMgdXBcbiAgICAgICAgICAgICAgICAgICAgbW92ZXNQYXRoLnB1c2goXCJ1cFwiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhdGhbaV1bMV0gPiBwYXRoW2kgLSAxXVsxXSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgd2FuZGVyZXIgZ29lcyBkb3duXG4gICAgICAgICAgICAgICAgICAgIG1vdmVzUGF0aC5wdXNoKFwiZG93blwiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBAdG9kbyBXVEYhXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhdmVUb1Nob290KSB7XG4gICAgICAgICAgICBsZXQgc2hvdERpcmVjdGlvbiA9IFwiXCI7XG4gICAgICAgICAgICBzd2l0Y2ggKG1vdmVzUGF0aFttb3Zlc1BhdGgubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwidXBcIjpcbiAgICAgICAgICAgICAgICAgICAgc2hvdERpcmVjdGlvbiA9IFwic2hvb3QtdXBcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImRvd25cIjpcbiAgICAgICAgICAgICAgICAgICAgc2hvdERpcmVjdGlvbiA9IFwic2hvb3QtZG93blwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICAgICAgICAgICAgICBzaG90RGlyZWN0aW9uID0gXCJzaG9vdC1sZWZ0XCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICAgICAgICAgICAgICBzaG90RGlyZWN0aW9uID0gXCJzaG9vdC1yaWdodFwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1vdmVzUGF0aC5zcGxpY2UobW92ZXNQYXRoLmxlbmd0aCAtIDEsIDAsIHNob3REaXJlY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1vdmVzUGF0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgbW92ZShkaXJlY3Rpb246IHN0cmluZykge1xuICAgICAgICBsZXQgY3VycmVudFBvcyA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgbGV0IG5ld1ZhbDtcblxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgICAgICAgICBuZXdWYWwgPSBjdXJyZW50UG9zLnggLSAxO1xuICAgICAgICAgICAgICAgIGlmIChuZXdWYWwgPj0gMCkgeyB0aGlzLnggPSBuZXdWYWw7IH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IGN1cnJlbnRQb3MueCArIDE7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbCA8IHRoaXMuZm9yZXN0TWFwV2lkdGgpIHsgdGhpcy54ID0gbmV3VmFsOyB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidXBcIjpcbiAgICAgICAgICAgICAgICBuZXdWYWwgPSBjdXJyZW50UG9zLnkgLSAxO1xuICAgICAgICAgICAgICAgIGlmIChuZXdWYWwgPj0gMCkgeyB0aGlzLnkgPSBuZXdWYWw7IH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJkb3duXCI6XG4gICAgICAgICAgICAgICAgbmV3VmFsID0gY3VycmVudFBvcy55ICsgMTtcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsIDwgdGhpcy5mb3Jlc3RNYXBIZWlnaHQpIHsgdGhpcy55ID0gbmV3VmFsOyB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTY29yZSgtMSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIG51bWJlckFkamFjZW50VmlzaXRlZCh5OiBudW1iZXIsIHg6IG51bWJlcikge1xuICAgICAgICBsZXQgbnVtID0gMDtcblxuICAgICAgICBpZiAoIHkgKyAxIDwgdGhpcy5mb3Jlc3RNYXAubGVuZ3RoICYmIHRoaXMuZm9yZXN0TWFwW3kgKyAxXVt4XS5pc1Zpc2l0ZWQoKSkge1xuICAgICAgICAgICAgbnVtICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCB5IC0gMSA+PSAwICAmJiB0aGlzLmZvcmVzdE1hcFt5IC0gMV1beF0uaXNWaXNpdGVkKCkpIHtcbiAgICAgICAgICAgIG51bSArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmICggeCArIDEgPCB0aGlzLmZvcmVzdE1hcFswXS5sZW5ndGggICYmIHRoaXMuZm9yZXN0TWFwW3ldW3ggKyAxXS5pc1Zpc2l0ZWQoKSkge1xuICAgICAgICAgICAgbnVtICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCB4IC0gMSA+PSAwICAmJiB0aGlzLmZvcmVzdE1hcFt5XVt4IC0gMV0uaXNWaXNpdGVkKCkpIHtcbiAgICAgICAgICAgIG51bSArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudW07XG4gICAgfVxuXG4gICAgcHVibGljIHVzZVNsaW5nc2hvdChkaXJlY3Rpb246IFN0cmluZykge1xuICAgICAgICBjb25zdCBjdXJyZW50UG9zID0gdGhpcy5nZXRQb3NpdGlvbigpO1xuICAgICAgICBsZXQgeCA9IGN1cnJlbnRQb3MueDtcbiAgICAgICAgbGV0IHkgPSBjdXJyZW50UG9zLnk7XG4gICAgICAgIGxldCB0YXJnZXQ7XG5cbiAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gY3VycmVudFBvcy54IC0gMTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ID49IDApIHsgeCA9IHRhcmdldDsgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gY3VycmVudFBvcy54ICsgMTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0IDwgdGhpcy5mb3Jlc3RNYXBXaWR0aCkgeyB4ID0gdGFyZ2V0OyB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidXBcIjpcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSBjdXJyZW50UG9zLnkgLSAxO1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgPj0gMCkgeyB5ID0gdGFyZ2V0OyB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZG93blwiOlxuICAgICAgICAgICAgICAgIHRhcmdldCA9IGN1cnJlbnRQb3MueSArIDE7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCA8IHRoaXMuZm9yZXN0TWFwSGVpZ2h0KSB7IHkgPSB0YXJnZXQ7IH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvcmVzdC5nZXRGbG9vckNvbnRlbnQoeSwgeCkua2lsbE1vbnN0ZXIoKTtcblxuICAgICAgICB0aGlzLnNldFNjb3JlKC0xMCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGlzT3V0KCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCB3YXlPdXRQb3NpdGlvbiA9IHRoaXMuZm9yZXN0LmdldFdheU91dFBvc2l0aW9uKCk7XG5cbiAgICAgICAgaWYgKHRoaXMueCA9PT0gd2F5T3V0UG9zaXRpb24ueCAmJiB0aGlzLnkgPT09IHdheU91dFBvc2l0aW9uLnkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGlzRGVhZCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMud2F0Y2hUaGVGbG9vcigpLmlzVHJhcCgpIHx8IHRoaXMud2F0Y2hUaGVGbG9vcigpLmlzTW9uc3RlcigpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTY29yZSh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNjb3JlICs9IHZhbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2NvcmUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcmU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE1hcCgpOiBGbG9vcltdW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3Jlc3RNYXA7XG4gICAgfVxuXG4gICAgcHVibGljIHNldE1hcChtOiBGbG9vcltdW10pIHtcbiAgICAgICAgdGhpcy5mb3Jlc3RNYXAgPSBtO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYXNOb01vdmVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3Rpb25zLmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0T3JpZ1goKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZ1g7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE9yaWdZKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm9yaWdZO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjb25zdCB0cmFwID0gXCJ0cmFwXCI7XG5leHBvcnQgY29uc3QgZW1wdHkgPSBcIlwiO1xuZXhwb3J0IGNvbnN0IGdvYWwgPSBcImdvYWxcIjtcbmV4cG9ydCBjb25zdCBtb25zdGVyID0gXCJtb25zdGVyXCI7XG5leHBvcnQgY29uc3QgdHJlZSA9IFwidHJlZVwiO1xuIiwiaW1wb3J0ICogYXMgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgKiBhcyBqc2JvYXJkIGZyb20gXCIuL0ZvcmVzdFwiO1xuaW1wb3J0IEdhbWUgZnJvbSBcIi4vR2FtZVwiO1xuXG5sZXQgZyA9IG5ldyBHYW1lKFwiZ2FtZURpdlwiLCBcInNjb3JlRGl2XCIpO1xuZy5pbml0KDMsIDMpO1xuZy51cGRhdGUoZmFsc2UpO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgZy51cGRhdGUoKTtcbn0pO1xuXG4vLyBJbml0IG1hbnVhbCBnYW1lXG5kb2N1bWVudC5vbmtleWRvd24gPSAoZSkgPT4ge1xuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICBnLnVwZGF0ZSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9oZWFwJyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuOC4wXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBIZWFwLCBkZWZhdWx0Q21wLCBmbG9vciwgaGVhcGlmeSwgaGVhcHBvcCwgaGVhcHB1c2gsIGhlYXBwdXNocG9wLCBoZWFwcmVwbGFjZSwgaW5zb3J0LCBtaW4sIG5sYXJnZXN0LCBuc21hbGxlc3QsIHVwZGF0ZUl0ZW0sIF9zaWZ0ZG93biwgX3NpZnR1cDtcblxuICBmbG9vciA9IE1hdGguZmxvb3IsIG1pbiA9IE1hdGgubWluO1xuXG5cbiAgLypcbiAgRGVmYXVsdCBjb21wYXJpc29uIGZ1bmN0aW9uIHRvIGJlIHVzZWRcbiAgICovXG5cbiAgZGVmYXVsdENtcCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICBpZiAoeCA8IHkpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgaWYgKHggPiB5KSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH07XG5cblxuICAvKlxuICBJbnNlcnQgaXRlbSB4IGluIGxpc3QgYSwgYW5kIGtlZXAgaXQgc29ydGVkIGFzc3VtaW5nIGEgaXMgc29ydGVkLlxuICBcbiAgSWYgeCBpcyBhbHJlYWR5IGluIGEsIGluc2VydCBpdCB0byB0aGUgcmlnaHQgb2YgdGhlIHJpZ2h0bW9zdCB4LlxuICBcbiAgT3B0aW9uYWwgYXJncyBsbyAoZGVmYXVsdCAwKSBhbmQgaGkgKGRlZmF1bHQgYS5sZW5ndGgpIGJvdW5kIHRoZSBzbGljZVxuICBvZiBhIHRvIGJlIHNlYXJjaGVkLlxuICAgKi9cblxuICBpbnNvcnQgPSBmdW5jdGlvbihhLCB4LCBsbywgaGksIGNtcCkge1xuICAgIHZhciBtaWQ7XG4gICAgaWYgKGxvID09IG51bGwpIHtcbiAgICAgIGxvID0gMDtcbiAgICB9XG4gICAgaWYgKGNtcCA9PSBudWxsKSB7XG4gICAgICBjbXAgPSBkZWZhdWx0Q21wO1xuICAgIH1cbiAgICBpZiAobG8gPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xvIG11c3QgYmUgbm9uLW5lZ2F0aXZlJyk7XG4gICAgfVxuICAgIGlmIChoaSA9PSBudWxsKSB7XG4gICAgICBoaSA9IGEubGVuZ3RoO1xuICAgIH1cbiAgICB3aGlsZSAobG8gPCBoaSkge1xuICAgICAgbWlkID0gZmxvb3IoKGxvICsgaGkpIC8gMik7XG4gICAgICBpZiAoY21wKHgsIGFbbWlkXSkgPCAwKSB7XG4gICAgICAgIGhpID0gbWlkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG8gPSBtaWQgKyAxO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKFtdLnNwbGljZS5hcHBseShhLCBbbG8sIGxvIC0gbG9dLmNvbmNhdCh4KSksIHgpO1xuICB9O1xuXG5cbiAgLypcbiAgUHVzaCBpdGVtIG9udG8gaGVhcCwgbWFpbnRhaW5pbmcgdGhlIGhlYXAgaW52YXJpYW50LlxuICAgKi9cblxuICBoZWFwcHVzaCA9IGZ1bmN0aW9uKGFycmF5LCBpdGVtLCBjbXApIHtcbiAgICBpZiAoY21wID09IG51bGwpIHtcbiAgICAgIGNtcCA9IGRlZmF1bHRDbXA7XG4gICAgfVxuICAgIGFycmF5LnB1c2goaXRlbSk7XG4gICAgcmV0dXJuIF9zaWZ0ZG93bihhcnJheSwgMCwgYXJyYXkubGVuZ3RoIC0gMSwgY21wKTtcbiAgfTtcblxuXG4gIC8qXG4gIFBvcCB0aGUgc21hbGxlc3QgaXRlbSBvZmYgdGhlIGhlYXAsIG1haW50YWluaW5nIHRoZSBoZWFwIGludmFyaWFudC5cbiAgICovXG5cbiAgaGVhcHBvcCA9IGZ1bmN0aW9uKGFycmF5LCBjbXApIHtcbiAgICB2YXIgbGFzdGVsdCwgcmV0dXJuaXRlbTtcbiAgICBpZiAoY21wID09IG51bGwpIHtcbiAgICAgIGNtcCA9IGRlZmF1bHRDbXA7XG4gICAgfVxuICAgIGxhc3RlbHQgPSBhcnJheS5wb3AoKTtcbiAgICBpZiAoYXJyYXkubGVuZ3RoKSB7XG4gICAgICByZXR1cm5pdGVtID0gYXJyYXlbMF07XG4gICAgICBhcnJheVswXSA9IGxhc3RlbHQ7XG4gICAgICBfc2lmdHVwKGFycmF5LCAwLCBjbXApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm5pdGVtID0gbGFzdGVsdDtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybml0ZW07XG4gIH07XG5cblxuICAvKlxuICBQb3AgYW5kIHJldHVybiB0aGUgY3VycmVudCBzbWFsbGVzdCB2YWx1ZSwgYW5kIGFkZCB0aGUgbmV3IGl0ZW0uXG4gIFxuICBUaGlzIGlzIG1vcmUgZWZmaWNpZW50IHRoYW4gaGVhcHBvcCgpIGZvbGxvd2VkIGJ5IGhlYXBwdXNoKCksIGFuZCBjYW4gYmVcbiAgbW9yZSBhcHByb3ByaWF0ZSB3aGVuIHVzaW5nIGEgZml4ZWQgc2l6ZSBoZWFwLiBOb3RlIHRoYXQgdGhlIHZhbHVlXG4gIHJldHVybmVkIG1heSBiZSBsYXJnZXIgdGhhbiBpdGVtISBUaGF0IGNvbnN0cmFpbnMgcmVhc29uYWJsZSB1c2Ugb2ZcbiAgdGhpcyByb3V0aW5lIHVubGVzcyB3cml0dGVuIGFzIHBhcnQgb2YgYSBjb25kaXRpb25hbCByZXBsYWNlbWVudDpcbiAgICAgIGlmIGl0ZW0gPiBhcnJheVswXVxuICAgICAgICBpdGVtID0gaGVhcHJlcGxhY2UoYXJyYXksIGl0ZW0pXG4gICAqL1xuXG4gIGhlYXByZXBsYWNlID0gZnVuY3Rpb24oYXJyYXksIGl0ZW0sIGNtcCkge1xuICAgIHZhciByZXR1cm5pdGVtO1xuICAgIGlmIChjbXAgPT0gbnVsbCkge1xuICAgICAgY21wID0gZGVmYXVsdENtcDtcbiAgICB9XG4gICAgcmV0dXJuaXRlbSA9IGFycmF5WzBdO1xuICAgIGFycmF5WzBdID0gaXRlbTtcbiAgICBfc2lmdHVwKGFycmF5LCAwLCBjbXApO1xuICAgIHJldHVybiByZXR1cm5pdGVtO1xuICB9O1xuXG5cbiAgLypcbiAgRmFzdCB2ZXJzaW9uIG9mIGEgaGVhcHB1c2ggZm9sbG93ZWQgYnkgYSBoZWFwcG9wLlxuICAgKi9cblxuICBoZWFwcHVzaHBvcCA9IGZ1bmN0aW9uKGFycmF5LCBpdGVtLCBjbXApIHtcbiAgICB2YXIgX3JlZjtcbiAgICBpZiAoY21wID09IG51bGwpIHtcbiAgICAgIGNtcCA9IGRlZmF1bHRDbXA7XG4gICAgfVxuICAgIGlmIChhcnJheS5sZW5ndGggJiYgY21wKGFycmF5WzBdLCBpdGVtKSA8IDApIHtcbiAgICAgIF9yZWYgPSBbYXJyYXlbMF0sIGl0ZW1dLCBpdGVtID0gX3JlZlswXSwgYXJyYXlbMF0gPSBfcmVmWzFdO1xuICAgICAgX3NpZnR1cChhcnJheSwgMCwgY21wKTtcbiAgICB9XG4gICAgcmV0dXJuIGl0ZW07XG4gIH07XG5cblxuICAvKlxuICBUcmFuc2Zvcm0gbGlzdCBpbnRvIGEgaGVhcCwgaW4tcGxhY2UsIGluIE8oYXJyYXkubGVuZ3RoKSB0aW1lLlxuICAgKi9cblxuICBoZWFwaWZ5ID0gZnVuY3Rpb24oYXJyYXksIGNtcCkge1xuICAgIHZhciBpLCBfaSwgX2osIF9sZW4sIF9yZWYsIF9yZWYxLCBfcmVzdWx0cywgX3Jlc3VsdHMxO1xuICAgIGlmIChjbXAgPT0gbnVsbCkge1xuICAgICAgY21wID0gZGVmYXVsdENtcDtcbiAgICB9XG4gICAgX3JlZjEgPSAoZnVuY3Rpb24oKSB7XG4gICAgICBfcmVzdWx0czEgPSBbXTtcbiAgICAgIGZvciAodmFyIF9qID0gMCwgX3JlZiA9IGZsb29yKGFycmF5Lmxlbmd0aCAvIDIpOyAwIDw9IF9yZWYgPyBfaiA8IF9yZWYgOiBfaiA+IF9yZWY7IDAgPD0gX3JlZiA/IF9qKysgOiBfai0tKXsgX3Jlc3VsdHMxLnB1c2goX2opOyB9XG4gICAgICByZXR1cm4gX3Jlc3VsdHMxO1xuICAgIH0pLmFwcGx5KHRoaXMpLnJldmVyc2UoKTtcbiAgICBfcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZjEubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgIGkgPSBfcmVmMVtfaV07XG4gICAgICBfcmVzdWx0cy5wdXNoKF9zaWZ0dXAoYXJyYXksIGksIGNtcCkpO1xuICAgIH1cbiAgICByZXR1cm4gX3Jlc3VsdHM7XG4gIH07XG5cblxuICAvKlxuICBVcGRhdGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBnaXZlbiBpdGVtIGluIHRoZSBoZWFwLlxuICBUaGlzIGZ1bmN0aW9uIHNob3VsZCBiZSBjYWxsZWQgZXZlcnkgdGltZSB0aGUgaXRlbSBpcyBiZWluZyBtb2RpZmllZC5cbiAgICovXG5cbiAgdXBkYXRlSXRlbSA9IGZ1bmN0aW9uKGFycmF5LCBpdGVtLCBjbXApIHtcbiAgICB2YXIgcG9zO1xuICAgIGlmIChjbXAgPT0gbnVsbCkge1xuICAgICAgY21wID0gZGVmYXVsdENtcDtcbiAgICB9XG4gICAgcG9zID0gYXJyYXkuaW5kZXhPZihpdGVtKTtcbiAgICBpZiAocG9zID09PSAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBfc2lmdGRvd24oYXJyYXksIDAsIHBvcywgY21wKTtcbiAgICByZXR1cm4gX3NpZnR1cChhcnJheSwgcG9zLCBjbXApO1xuICB9O1xuXG5cbiAgLypcbiAgRmluZCB0aGUgbiBsYXJnZXN0IGVsZW1lbnRzIGluIGEgZGF0YXNldC5cbiAgICovXG5cbiAgbmxhcmdlc3QgPSBmdW5jdGlvbihhcnJheSwgbiwgY21wKSB7XG4gICAgdmFyIGVsZW0sIHJlc3VsdCwgX2ksIF9sZW4sIF9yZWY7XG4gICAgaWYgKGNtcCA9PSBudWxsKSB7XG4gICAgICBjbXAgPSBkZWZhdWx0Q21wO1xuICAgIH1cbiAgICByZXN1bHQgPSBhcnJheS5zbGljZSgwLCBuKTtcbiAgICBpZiAoIXJlc3VsdC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGhlYXBpZnkocmVzdWx0LCBjbXApO1xuICAgIF9yZWYgPSBhcnJheS5zbGljZShuKTtcbiAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgIGVsZW0gPSBfcmVmW19pXTtcbiAgICAgIGhlYXBwdXNocG9wKHJlc3VsdCwgZWxlbSwgY21wKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdC5zb3J0KGNtcCkucmV2ZXJzZSgpO1xuICB9O1xuXG5cbiAgLypcbiAgRmluZCB0aGUgbiBzbWFsbGVzdCBlbGVtZW50cyBpbiBhIGRhdGFzZXQuXG4gICAqL1xuXG4gIG5zbWFsbGVzdCA9IGZ1bmN0aW9uKGFycmF5LCBuLCBjbXApIHtcbiAgICB2YXIgZWxlbSwgaSwgbG9zLCByZXN1bHQsIF9pLCBfaiwgX2xlbiwgX3JlZiwgX3JlZjEsIF9yZXN1bHRzO1xuICAgIGlmIChjbXAgPT0gbnVsbCkge1xuICAgICAgY21wID0gZGVmYXVsdENtcDtcbiAgICB9XG4gICAgaWYgKG4gKiAxMCA8PSBhcnJheS5sZW5ndGgpIHtcbiAgICAgIHJlc3VsdCA9IGFycmF5LnNsaWNlKDAsIG4pLnNvcnQoY21wKTtcbiAgICAgIGlmICghcmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgICAgbG9zID0gcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXTtcbiAgICAgIF9yZWYgPSBhcnJheS5zbGljZShuKTtcbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZi5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICBlbGVtID0gX3JlZltfaV07XG4gICAgICAgIGlmIChjbXAoZWxlbSwgbG9zKSA8IDApIHtcbiAgICAgICAgICBpbnNvcnQocmVzdWx0LCBlbGVtLCAwLCBudWxsLCBjbXApO1xuICAgICAgICAgIHJlc3VsdC5wb3AoKTtcbiAgICAgICAgICBsb3MgPSByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBoZWFwaWZ5KGFycmF5LCBjbXApO1xuICAgIF9yZXN1bHRzID0gW107XG4gICAgZm9yIChpID0gX2ogPSAwLCBfcmVmMSA9IG1pbihuLCBhcnJheS5sZW5ndGgpOyAwIDw9IF9yZWYxID8gX2ogPCBfcmVmMSA6IF9qID4gX3JlZjE7IGkgPSAwIDw9IF9yZWYxID8gKytfaiA6IC0tX2opIHtcbiAgICAgIF9yZXN1bHRzLnB1c2goaGVhcHBvcChhcnJheSwgY21wKSk7XG4gICAgfVxuICAgIHJldHVybiBfcmVzdWx0cztcbiAgfTtcblxuICBfc2lmdGRvd24gPSBmdW5jdGlvbihhcnJheSwgc3RhcnRwb3MsIHBvcywgY21wKSB7XG4gICAgdmFyIG5ld2l0ZW0sIHBhcmVudCwgcGFyZW50cG9zO1xuICAgIGlmIChjbXAgPT0gbnVsbCkge1xuICAgICAgY21wID0gZGVmYXVsdENtcDtcbiAgICB9XG4gICAgbmV3aXRlbSA9IGFycmF5W3Bvc107XG4gICAgd2hpbGUgKHBvcyA+IHN0YXJ0cG9zKSB7XG4gICAgICBwYXJlbnRwb3MgPSAocG9zIC0gMSkgPj4gMTtcbiAgICAgIHBhcmVudCA9IGFycmF5W3BhcmVudHBvc107XG4gICAgICBpZiAoY21wKG5ld2l0ZW0sIHBhcmVudCkgPCAwKSB7XG4gICAgICAgIGFycmF5W3Bvc10gPSBwYXJlbnQ7XG4gICAgICAgIHBvcyA9IHBhcmVudHBvcztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5W3Bvc10gPSBuZXdpdGVtO1xuICB9O1xuXG4gIF9zaWZ0dXAgPSBmdW5jdGlvbihhcnJheSwgcG9zLCBjbXApIHtcbiAgICB2YXIgY2hpbGRwb3MsIGVuZHBvcywgbmV3aXRlbSwgcmlnaHRwb3MsIHN0YXJ0cG9zO1xuICAgIGlmIChjbXAgPT0gbnVsbCkge1xuICAgICAgY21wID0gZGVmYXVsdENtcDtcbiAgICB9XG4gICAgZW5kcG9zID0gYXJyYXkubGVuZ3RoO1xuICAgIHN0YXJ0cG9zID0gcG9zO1xuICAgIG5ld2l0ZW0gPSBhcnJheVtwb3NdO1xuICAgIGNoaWxkcG9zID0gMiAqIHBvcyArIDE7XG4gICAgd2hpbGUgKGNoaWxkcG9zIDwgZW5kcG9zKSB7XG4gICAgICByaWdodHBvcyA9IGNoaWxkcG9zICsgMTtcbiAgICAgIGlmIChyaWdodHBvcyA8IGVuZHBvcyAmJiAhKGNtcChhcnJheVtjaGlsZHBvc10sIGFycmF5W3JpZ2h0cG9zXSkgPCAwKSkge1xuICAgICAgICBjaGlsZHBvcyA9IHJpZ2h0cG9zO1xuICAgICAgfVxuICAgICAgYXJyYXlbcG9zXSA9IGFycmF5W2NoaWxkcG9zXTtcbiAgICAgIHBvcyA9IGNoaWxkcG9zO1xuICAgICAgY2hpbGRwb3MgPSAyICogcG9zICsgMTtcbiAgICB9XG4gICAgYXJyYXlbcG9zXSA9IG5ld2l0ZW07XG4gICAgcmV0dXJuIF9zaWZ0ZG93bihhcnJheSwgc3RhcnRwb3MsIHBvcywgY21wKTtcbiAgfTtcblxuICBIZWFwID0gKGZ1bmN0aW9uKCkge1xuICAgIEhlYXAucHVzaCA9IGhlYXBwdXNoO1xuXG4gICAgSGVhcC5wb3AgPSBoZWFwcG9wO1xuXG4gICAgSGVhcC5yZXBsYWNlID0gaGVhcHJlcGxhY2U7XG5cbiAgICBIZWFwLnB1c2hwb3AgPSBoZWFwcHVzaHBvcDtcblxuICAgIEhlYXAuaGVhcGlmeSA9IGhlYXBpZnk7XG5cbiAgICBIZWFwLnVwZGF0ZUl0ZW0gPSB1cGRhdGVJdGVtO1xuXG4gICAgSGVhcC5ubGFyZ2VzdCA9IG5sYXJnZXN0O1xuXG4gICAgSGVhcC5uc21hbGxlc3QgPSBuc21hbGxlc3Q7XG5cbiAgICBmdW5jdGlvbiBIZWFwKGNtcCkge1xuICAgICAgdGhpcy5jbXAgPSBjbXAgIT0gbnVsbCA/IGNtcCA6IGRlZmF1bHRDbXA7XG4gICAgICB0aGlzLm5vZGVzID0gW107XG4gICAgfVxuXG4gICAgSGVhcC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiBoZWFwcHVzaCh0aGlzLm5vZGVzLCB4LCB0aGlzLmNtcCk7XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLnBvcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGhlYXBwb3AodGhpcy5ub2RlcywgdGhpcy5jbXApO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS5wZWVrID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2Rlc1swXTtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2Rlcy5pbmRleE9mKHgpICE9PSAtMTtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiBoZWFwcmVwbGFjZSh0aGlzLm5vZGVzLCB4LCB0aGlzLmNtcCk7XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLnB1c2hwb3AgPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gaGVhcHB1c2hwb3AodGhpcy5ub2RlcywgeCwgdGhpcy5jbXApO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS5oZWFwaWZ5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gaGVhcGlmeSh0aGlzLm5vZGVzLCB0aGlzLmNtcCk7XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLnVwZGF0ZUl0ZW0gPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gdXBkYXRlSXRlbSh0aGlzLm5vZGVzLCB4LCB0aGlzLmNtcCk7XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2RlcyA9IFtdO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS5lbXB0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZXMubGVuZ3RoID09PSAwO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2Rlcy5sZW5ndGg7XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaGVhcDtcbiAgICAgIGhlYXAgPSBuZXcgSGVhcCgpO1xuICAgICAgaGVhcC5ub2RlcyA9IHRoaXMubm9kZXMuc2xpY2UoMCk7XG4gICAgICByZXR1cm4gaGVhcDtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZXMuc2xpY2UoMCk7XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLmluc2VydCA9IEhlYXAucHJvdG90eXBlLnB1c2g7XG5cbiAgICBIZWFwLnByb3RvdHlwZS50b3AgPSBIZWFwLnByb3RvdHlwZS5wZWVrO1xuXG4gICAgSGVhcC5wcm90b3R5cGUuZnJvbnQgPSBIZWFwLnByb3RvdHlwZS5wZWVrO1xuXG4gICAgSGVhcC5wcm90b3R5cGUuaGFzID0gSGVhcC5wcm90b3R5cGUuY29udGFpbnM7XG5cbiAgICBIZWFwLnByb3RvdHlwZS5jb3B5ID0gSGVhcC5wcm90b3R5cGUuY2xvbmU7XG5cbiAgICByZXR1cm4gSGVhcDtcblxuICB9KSgpO1xuXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiICYmIG1vZHVsZSAhPT0gbnVsbCA/IG1vZHVsZS5leHBvcnRzIDogdm9pZCAwKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBIZWFwO1xuICB9IGVsc2Uge1xuICAgIHdpbmRvdy5IZWFwID0gSGVhcDtcbiAgfVxuXG59KS5jYWxsKHRoaXMpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3NyYy9QYXRoRmluZGluZycpO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgICdIZWFwJyAgICAgICAgICAgICAgICAgICAgICA6IHJlcXVpcmUoJ2hlYXAnKSxcclxuICAgICdOb2RlJyAgICAgICAgICAgICAgICAgICAgICA6IHJlcXVpcmUoJy4vY29yZS9Ob2RlJyksXHJcbiAgICAnR3JpZCcgICAgICAgICAgICAgICAgICAgICAgOiByZXF1aXJlKCcuL2NvcmUvR3JpZCcpLFxyXG4gICAgJ1V0aWwnICAgICAgICAgICAgICAgICAgICAgIDogcmVxdWlyZSgnLi9jb3JlL1V0aWwnKSxcclxuICAgICdEaWFnb25hbE1vdmVtZW50JyAgICAgICAgICA6IHJlcXVpcmUoJy4vY29yZS9EaWFnb25hbE1vdmVtZW50JyksXHJcbiAgICAnSGV1cmlzdGljJyAgICAgICAgICAgICAgICAgOiByZXF1aXJlKCcuL2NvcmUvSGV1cmlzdGljJyksXHJcbiAgICAnQVN0YXJGaW5kZXInICAgICAgICAgICAgICAgOiByZXF1aXJlKCcuL2ZpbmRlcnMvQVN0YXJGaW5kZXInKSxcclxuICAgICdCZXN0Rmlyc3RGaW5kZXInICAgICAgICAgICA6IHJlcXVpcmUoJy4vZmluZGVycy9CZXN0Rmlyc3RGaW5kZXInKSxcclxuICAgICdCcmVhZHRoRmlyc3RGaW5kZXInICAgICAgICA6IHJlcXVpcmUoJy4vZmluZGVycy9CcmVhZHRoRmlyc3RGaW5kZXInKSxcclxuICAgICdEaWprc3RyYUZpbmRlcicgICAgICAgICAgICA6IHJlcXVpcmUoJy4vZmluZGVycy9EaWprc3RyYUZpbmRlcicpLFxyXG4gICAgJ0JpQVN0YXJGaW5kZXInICAgICAgICAgICAgIDogcmVxdWlyZSgnLi9maW5kZXJzL0JpQVN0YXJGaW5kZXInKSxcclxuICAgICdCaUJlc3RGaXJzdEZpbmRlcicgICAgICAgICA6IHJlcXVpcmUoJy4vZmluZGVycy9CaUJlc3RGaXJzdEZpbmRlcicpLFxyXG4gICAgJ0JpQnJlYWR0aEZpcnN0RmluZGVyJyAgICAgIDogcmVxdWlyZSgnLi9maW5kZXJzL0JpQnJlYWR0aEZpcnN0RmluZGVyJyksXHJcbiAgICAnQmlEaWprc3RyYUZpbmRlcicgICAgICAgICAgOiByZXF1aXJlKCcuL2ZpbmRlcnMvQmlEaWprc3RyYUZpbmRlcicpLFxyXG4gICAgJ0lEQVN0YXJGaW5kZXInICAgICAgICAgICAgIDogcmVxdWlyZSgnLi9maW5kZXJzL0lEQVN0YXJGaW5kZXInKSxcclxuICAgICdKdW1wUG9pbnRGaW5kZXInICAgICAgICAgICA6IHJlcXVpcmUoJy4vZmluZGVycy9KdW1wUG9pbnRGaW5kZXInKSxcclxufTtcclxuIiwidmFyIERpYWdvbmFsTW92ZW1lbnQgPSB7XHJcbiAgICBBbHdheXM6IDEsXHJcbiAgICBOZXZlcjogMixcclxuICAgIElmQXRNb3N0T25lT2JzdGFjbGU6IDMsXHJcbiAgICBPbmx5V2hlbk5vT2JzdGFjbGVzOiA0XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERpYWdvbmFsTW92ZW1lbnQ7IiwidmFyIE5vZGUgPSByZXF1aXJlKCcuL05vZGUnKTtcclxudmFyIERpYWdvbmFsTW92ZW1lbnQgPSByZXF1aXJlKCcuL0RpYWdvbmFsTW92ZW1lbnQnKTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgR3JpZCBjbGFzcywgd2hpY2ggc2VydmVzIGFzIHRoZSBlbmNhcHN1bGF0aW9uIG9mIHRoZSBsYXlvdXQgb2YgdGhlIG5vZGVzLlxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtudW1iZXJ8QXJyYXk8QXJyYXk8KG51bWJlcnxib29sZWFuKT4+fSB3aWR0aF9vcl9tYXRyaXggTnVtYmVyIG9mIGNvbHVtbnMgb2YgdGhlIGdyaWQsIG9yIG1hdHJpeFxyXG4gKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IE51bWJlciBvZiByb3dzIG9mIHRoZSBncmlkLlxyXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PChudW1iZXJ8Ym9vbGVhbik+Pn0gW21hdHJpeF0gLSBBIDAtMSBtYXRyaXhcclxuICogICAgIHJlcHJlc2VudGluZyB0aGUgd2Fsa2FibGUgc3RhdHVzIG9mIHRoZSBub2RlcygwIG9yIGZhbHNlIGZvciB3YWxrYWJsZSkuXHJcbiAqICAgICBJZiB0aGUgbWF0cml4IGlzIG5vdCBzdXBwbGllZCwgYWxsIHRoZSBub2RlcyB3aWxsIGJlIHdhbGthYmxlLiAgKi9cclxuZnVuY3Rpb24gR3JpZCh3aWR0aF9vcl9tYXRyaXgsIGhlaWdodCwgbWF0cml4KSB7XHJcbiAgICB2YXIgd2lkdGg7XHJcblxyXG4gICAgaWYgKHR5cGVvZiB3aWR0aF9vcl9tYXRyaXggIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgd2lkdGggPSB3aWR0aF9vcl9tYXRyaXg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGhlaWdodCA9IHdpZHRoX29yX21hdHJpeC5sZW5ndGg7XHJcbiAgICAgICAgd2lkdGggPSB3aWR0aF9vcl9tYXRyaXhbMF0ubGVuZ3RoO1xyXG4gICAgICAgIG1hdHJpeCA9IHdpZHRoX29yX21hdHJpeDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBudW1iZXIgb2YgY29sdW1ucyBvZiB0aGUgZ3JpZC5cclxuICAgICAqIEB0eXBlIG51bWJlclxyXG4gICAgICovXHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBudW1iZXIgb2Ygcm93cyBvZiB0aGUgZ3JpZC5cclxuICAgICAqIEB0eXBlIG51bWJlclxyXG4gICAgICovXHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEEgMkQgYXJyYXkgb2Ygbm9kZXMuXHJcbiAgICAgKi9cclxuICAgIHRoaXMubm9kZXMgPSB0aGlzLl9idWlsZE5vZGVzKHdpZHRoLCBoZWlnaHQsIG1hdHJpeCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCdWlsZCBhbmQgcmV0dXJuIHRoZSBub2Rlcy5cclxuICogQHByaXZhdGVcclxuICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICogQHBhcmFtIHtBcnJheTxBcnJheTxudW1iZXJ8Ym9vbGVhbj4+fSBbbWF0cml4XSAtIEEgMC0xIG1hdHJpeCByZXByZXNlbnRpbmdcclxuICogICAgIHRoZSB3YWxrYWJsZSBzdGF0dXMgb2YgdGhlIG5vZGVzLlxyXG4gKiBAc2VlIEdyaWRcclxuICovXHJcbkdyaWQucHJvdG90eXBlLl9idWlsZE5vZGVzID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCwgbWF0cml4KSB7XHJcbiAgICB2YXIgaSwgaixcclxuICAgICAgICBub2RlcyA9IG5ldyBBcnJheShoZWlnaHQpO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBoZWlnaHQ7ICsraSkge1xyXG4gICAgICAgIG5vZGVzW2ldID0gbmV3IEFycmF5KHdpZHRoKTtcclxuICAgICAgICBmb3IgKGogPSAwOyBqIDwgd2lkdGg7ICsraikge1xyXG4gICAgICAgICAgICBub2Rlc1tpXVtqXSA9IG5ldyBOb2RlKGosIGkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgaWYgKG1hdHJpeCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIG5vZGVzO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtYXRyaXgubGVuZ3RoICE9PSBoZWlnaHQgfHwgbWF0cml4WzBdLmxlbmd0aCAhPT0gd2lkdGgpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hdHJpeCBzaXplIGRvZXMgbm90IGZpdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBoZWlnaHQ7ICsraSkge1xyXG4gICAgICAgIGZvciAoaiA9IDA7IGogPCB3aWR0aDsgKytqKSB7XHJcbiAgICAgICAgICAgIGlmIChtYXRyaXhbaV1bal0pIHtcclxuICAgICAgICAgICAgICAgIC8vIDAsIGZhbHNlLCBudWxsIHdpbGwgYmUgd2Fsa2FibGVcclxuICAgICAgICAgICAgICAgIC8vIHdoaWxlIG90aGVycyB3aWxsIGJlIHVuLXdhbGthYmxlXHJcbiAgICAgICAgICAgICAgICBub2Rlc1tpXVtqXS53YWxrYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBub2RlcztcclxufTtcclxuXHJcblxyXG5HcmlkLnByb3RvdHlwZS5nZXROb2RlQXQgPSBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5ub2Rlc1t5XVt4XTtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIG5vZGUgYXQgdGhlIGdpdmVuIHBvc2l0aW9uIGlzIHdhbGthYmxlLlxyXG4gKiAoQWxzbyByZXR1cm5zIGZhbHNlIGlmIHRoZSBwb3NpdGlvbiBpcyBvdXRzaWRlIHRoZSBncmlkLilcclxuICogQHBhcmFtIHtudW1iZXJ9IHggLSBUaGUgeCBjb29yZGluYXRlIG9mIHRoZSBub2RlLlxyXG4gKiBAcGFyYW0ge251bWJlcn0geSAtIFRoZSB5IGNvb3JkaW5hdGUgb2YgdGhlIG5vZGUuXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IC0gVGhlIHdhbGthYmlsaXR5IG9mIHRoZSBub2RlLlxyXG4gKi9cclxuR3JpZC5wcm90b3R5cGUuaXNXYWxrYWJsZUF0ID0gZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaXNJbnNpZGUoeCwgeSkgJiYgdGhpcy5ub2Rlc1t5XVt4XS53YWxrYWJsZTtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIHBvc2l0aW9uIGlzIGluc2lkZSB0aGUgZ3JpZC5cclxuICogWFhYOiBgZ3JpZC5pc0luc2lkZSh4LCB5KWAgaXMgd2llcmQgdG8gcmVhZC5cclxuICogSXQgc2hvdWxkIGJlIGAoeCwgeSkgaXMgaW5zaWRlIGdyaWRgLCBidXQgSSBmYWlsZWQgdG8gZmluZCBhIGJldHRlclxyXG4gKiBuYW1lIGZvciB0aGlzIG1ldGhvZC5cclxuICogQHBhcmFtIHtudW1iZXJ9IHhcclxuICogQHBhcmFtIHtudW1iZXJ9IHlcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICovXHJcbkdyaWQucHJvdG90eXBlLmlzSW5zaWRlID0gZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgcmV0dXJuICh4ID49IDAgJiYgeCA8IHRoaXMud2lkdGgpICYmICh5ID49IDAgJiYgeSA8IHRoaXMuaGVpZ2h0KTtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogU2V0IHdoZXRoZXIgdGhlIG5vZGUgb24gdGhlIGdpdmVuIHBvc2l0aW9uIGlzIHdhbGthYmxlLlxyXG4gKiBOT1RFOiB0aHJvd3MgZXhjZXB0aW9uIGlmIHRoZSBjb29yZGluYXRlIGlzIG5vdCBpbnNpZGUgdGhlIGdyaWQuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gVGhlIHggY29vcmRpbmF0ZSBvZiB0aGUgbm9kZS5cclxuICogQHBhcmFtIHtudW1iZXJ9IHkgLSBUaGUgeSBjb29yZGluYXRlIG9mIHRoZSBub2RlLlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHdhbGthYmxlIC0gV2hldGhlciB0aGUgcG9zaXRpb24gaXMgd2Fsa2FibGUuXHJcbiAqL1xyXG5HcmlkLnByb3RvdHlwZS5zZXRXYWxrYWJsZUF0ID0gZnVuY3Rpb24oeCwgeSwgd2Fsa2FibGUpIHtcclxuICAgIHRoaXMubm9kZXNbeV1beF0ud2Fsa2FibGUgPSB3YWxrYWJsZTtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogR2V0IHRoZSBuZWlnaGJvcnMgb2YgdGhlIGdpdmVuIG5vZGUuXHJcbiAqXHJcbiAqICAgICBvZmZzZXRzICAgICAgZGlhZ29uYWxPZmZzZXRzOlxyXG4gKiAgKy0tLSstLS0rLS0tKyAgICArLS0tKy0tLSstLS0rXHJcbiAqICB8ICAgfCAwIHwgICB8ICAgIHwgMCB8ICAgfCAxIHxcclxuICogICstLS0rLS0tKy0tLSsgICAgKy0tLSstLS0rLS0tK1xyXG4gKiAgfCAzIHwgICB8IDEgfCAgICB8ICAgfCAgIHwgICB8XHJcbiAqICArLS0tKy0tLSstLS0rICAgICstLS0rLS0tKy0tLStcclxuICogIHwgICB8IDIgfCAgIHwgICAgfCAzIHwgICB8IDIgfFxyXG4gKiAgKy0tLSstLS0rLS0tKyAgICArLS0tKy0tLSstLS0rXHJcbiAqXHJcbiAqICBXaGVuIGFsbG93RGlhZ29uYWwgaXMgdHJ1ZSwgaWYgb2Zmc2V0c1tpXSBpcyB2YWxpZCwgdGhlblxyXG4gKiAgZGlhZ29uYWxPZmZzZXRzW2ldIGFuZFxyXG4gKiAgZGlhZ29uYWxPZmZzZXRzWyhpICsgMSkgJSA0XSBpcyB2YWxpZC5cclxuICogQHBhcmFtIHtOb2RlfSBub2RlXHJcbiAqIEBwYXJhbSB7RGlhZ29uYWxNb3ZlbWVudH0gZGlhZ29uYWxNb3ZlbWVudFxyXG4gKi9cclxuR3JpZC5wcm90b3R5cGUuZ2V0TmVpZ2hib3JzID0gZnVuY3Rpb24obm9kZSwgZGlhZ29uYWxNb3ZlbWVudCkge1xyXG4gICAgdmFyIHggPSBub2RlLngsXHJcbiAgICAgICAgeSA9IG5vZGUueSxcclxuICAgICAgICBuZWlnaGJvcnMgPSBbXSxcclxuICAgICAgICBzMCA9IGZhbHNlLCBkMCA9IGZhbHNlLFxyXG4gICAgICAgIHMxID0gZmFsc2UsIGQxID0gZmFsc2UsXHJcbiAgICAgICAgczIgPSBmYWxzZSwgZDIgPSBmYWxzZSxcclxuICAgICAgICBzMyA9IGZhbHNlLCBkMyA9IGZhbHNlLFxyXG4gICAgICAgIG5vZGVzID0gdGhpcy5ub2RlcztcclxuXHJcbiAgICAvLyDihpFcclxuICAgIGlmICh0aGlzLmlzV2Fsa2FibGVBdCh4LCB5IC0gMSkpIHtcclxuICAgICAgICBuZWlnaGJvcnMucHVzaChub2Rlc1t5IC0gMV1beF0pO1xyXG4gICAgICAgIHMwID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8vIOKGklxyXG4gICAgaWYgKHRoaXMuaXNXYWxrYWJsZUF0KHggKyAxLCB5KSkge1xyXG4gICAgICAgIG5laWdoYm9ycy5wdXNoKG5vZGVzW3ldW3ggKyAxXSk7XHJcbiAgICAgICAgczEgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgLy8g4oaTXHJcbiAgICBpZiAodGhpcy5pc1dhbGthYmxlQXQoeCwgeSArIDEpKSB7XHJcbiAgICAgICAgbmVpZ2hib3JzLnB1c2gobm9kZXNbeSArIDFdW3hdKTtcclxuICAgICAgICBzMiA9IHRydWU7XHJcbiAgICB9XHJcbiAgICAvLyDihpBcclxuICAgIGlmICh0aGlzLmlzV2Fsa2FibGVBdCh4IC0gMSwgeSkpIHtcclxuICAgICAgICBuZWlnaGJvcnMucHVzaChub2Rlc1t5XVt4IC0gMV0pO1xyXG4gICAgICAgIHMzID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGlhZ29uYWxNb3ZlbWVudCA9PT0gRGlhZ29uYWxNb3ZlbWVudC5OZXZlcikge1xyXG4gICAgICAgIHJldHVybiBuZWlnaGJvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRpYWdvbmFsTW92ZW1lbnQgPT09IERpYWdvbmFsTW92ZW1lbnQuT25seVdoZW5Ob09ic3RhY2xlcykge1xyXG4gICAgICAgIGQwID0gczMgJiYgczA7XHJcbiAgICAgICAgZDEgPSBzMCAmJiBzMTtcclxuICAgICAgICBkMiA9IHMxICYmIHMyO1xyXG4gICAgICAgIGQzID0gczIgJiYgczM7XHJcbiAgICB9IGVsc2UgaWYgKGRpYWdvbmFsTW92ZW1lbnQgPT09IERpYWdvbmFsTW92ZW1lbnQuSWZBdE1vc3RPbmVPYnN0YWNsZSkge1xyXG4gICAgICAgIGQwID0gczMgfHwgczA7XHJcbiAgICAgICAgZDEgPSBzMCB8fCBzMTtcclxuICAgICAgICBkMiA9IHMxIHx8IHMyO1xyXG4gICAgICAgIGQzID0gczIgfHwgczM7XHJcbiAgICB9IGVsc2UgaWYgKGRpYWdvbmFsTW92ZW1lbnQgPT09IERpYWdvbmFsTW92ZW1lbnQuQWx3YXlzKSB7XHJcbiAgICAgICAgZDAgPSB0cnVlO1xyXG4gICAgICAgIGQxID0gdHJ1ZTtcclxuICAgICAgICBkMiA9IHRydWU7XHJcbiAgICAgICAgZDMgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luY29ycmVjdCB2YWx1ZSBvZiBkaWFnb25hbE1vdmVtZW50Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g4oaWXHJcbiAgICBpZiAoZDAgJiYgdGhpcy5pc1dhbGthYmxlQXQoeCAtIDEsIHkgLSAxKSkge1xyXG4gICAgICAgIG5laWdoYm9ycy5wdXNoKG5vZGVzW3kgLSAxXVt4IC0gMV0pO1xyXG4gICAgfVxyXG4gICAgLy8g4oaXXHJcbiAgICBpZiAoZDEgJiYgdGhpcy5pc1dhbGthYmxlQXQoeCArIDEsIHkgLSAxKSkge1xyXG4gICAgICAgIG5laWdoYm9ycy5wdXNoKG5vZGVzW3kgLSAxXVt4ICsgMV0pO1xyXG4gICAgfVxyXG4gICAgLy8g4oaYXHJcbiAgICBpZiAoZDIgJiYgdGhpcy5pc1dhbGthYmxlQXQoeCArIDEsIHkgKyAxKSkge1xyXG4gICAgICAgIG5laWdoYm9ycy5wdXNoKG5vZGVzW3kgKyAxXVt4ICsgMV0pO1xyXG4gICAgfVxyXG4gICAgLy8g4oaZXHJcbiAgICBpZiAoZDMgJiYgdGhpcy5pc1dhbGthYmxlQXQoeCAtIDEsIHkgKyAxKSkge1xyXG4gICAgICAgIG5laWdoYm9ycy5wdXNoKG5vZGVzW3kgKyAxXVt4IC0gMV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZWlnaGJvcnM7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIEdldCBhIGNsb25lIG9mIHRoaXMgZ3JpZC5cclxuICogQHJldHVybiB7R3JpZH0gQ2xvbmVkIGdyaWQuXHJcbiAqL1xyXG5HcmlkLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGksIGosXHJcblxyXG4gICAgICAgIHdpZHRoID0gdGhpcy53aWR0aCxcclxuICAgICAgICBoZWlnaHQgPSB0aGlzLmhlaWdodCxcclxuICAgICAgICB0aGlzTm9kZXMgPSB0aGlzLm5vZGVzLFxyXG5cclxuICAgICAgICBuZXdHcmlkID0gbmV3IEdyaWQod2lkdGgsIGhlaWdodCksXHJcbiAgICAgICAgbmV3Tm9kZXMgPSBuZXcgQXJyYXkoaGVpZ2h0KTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgaGVpZ2h0OyArK2kpIHtcclxuICAgICAgICBuZXdOb2Rlc1tpXSA9IG5ldyBBcnJheSh3aWR0aCk7XHJcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IHdpZHRoOyArK2opIHtcclxuICAgICAgICAgICAgbmV3Tm9kZXNbaV1bal0gPSBuZXcgTm9kZShqLCBpLCB0aGlzTm9kZXNbaV1bal0ud2Fsa2FibGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZXdHcmlkLm5vZGVzID0gbmV3Tm9kZXM7XHJcblxyXG4gICAgcmV0dXJuIG5ld0dyaWQ7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdyaWQ7XHJcbiIsIi8qKlxyXG4gKiBAbmFtZXNwYWNlIFBGLkhldXJpc3RpY1xyXG4gKiBAZGVzY3JpcHRpb24gQSBjb2xsZWN0aW9uIG9mIGhldXJpc3RpYyBmdW5jdGlvbnMuXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgLyoqXHJcbiAgICogTWFuaGF0dGFuIGRpc3RhbmNlLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkeCAtIERpZmZlcmVuY2UgaW4geC5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gZHkgLSBEaWZmZXJlbmNlIGluIHkuXHJcbiAgICogQHJldHVybiB7bnVtYmVyfSBkeCArIGR5XHJcbiAgICovXHJcbiAgbWFuaGF0dGFuOiBmdW5jdGlvbihkeCwgZHkpIHtcclxuICAgICAgcmV0dXJuIGR4ICsgZHk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogRXVjbGlkZWFuIGRpc3RhbmNlLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkeCAtIERpZmZlcmVuY2UgaW4geC5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gZHkgLSBEaWZmZXJlbmNlIGluIHkuXHJcbiAgICogQHJldHVybiB7bnVtYmVyfSBzcXJ0KGR4ICogZHggKyBkeSAqIGR5KVxyXG4gICAqL1xyXG4gIGV1Y2xpZGVhbjogZnVuY3Rpb24oZHgsIGR5KSB7XHJcbiAgICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIE9jdGlsZSBkaXN0YW5jZS5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gZHggLSBEaWZmZXJlbmNlIGluIHguXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGR5IC0gRGlmZmVyZW5jZSBpbiB5LlxyXG4gICAqIEByZXR1cm4ge251bWJlcn0gc3FydChkeCAqIGR4ICsgZHkgKiBkeSkgZm9yIGdyaWRzXHJcbiAgICovXHJcbiAgb2N0aWxlOiBmdW5jdGlvbihkeCwgZHkpIHtcclxuICAgICAgdmFyIEYgPSBNYXRoLlNRUlQyIC0gMTtcclxuICAgICAgcmV0dXJuIChkeCA8IGR5KSA/IEYgKiBkeCArIGR5IDogRiAqIGR5ICsgZHg7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlYnlzaGV2IGRpc3RhbmNlLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkeCAtIERpZmZlcmVuY2UgaW4geC5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gZHkgLSBEaWZmZXJlbmNlIGluIHkuXHJcbiAgICogQHJldHVybiB7bnVtYmVyfSBtYXgoZHgsIGR5KVxyXG4gICAqL1xyXG4gIGNoZWJ5c2hldjogZnVuY3Rpb24oZHgsIGR5KSB7XHJcbiAgICAgIHJldHVybiBNYXRoLm1heChkeCwgZHkpO1xyXG4gIH1cclxuXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBBIG5vZGUgaW4gZ3JpZC4gXHJcbiAqIFRoaXMgY2xhc3MgaG9sZHMgc29tZSBiYXNpYyBpbmZvcm1hdGlvbiBhYm91dCBhIG5vZGUgYW5kIGN1c3RvbSBcclxuICogYXR0cmlidXRlcyBtYXkgYmUgYWRkZWQsIGRlcGVuZGluZyBvbiB0aGUgYWxnb3JpdGhtcycgbmVlZHMuXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge251bWJlcn0geCAtIFRoZSB4IGNvb3JkaW5hdGUgb2YgdGhlIG5vZGUgb24gdGhlIGdyaWQuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gVGhlIHkgY29vcmRpbmF0ZSBvZiB0aGUgbm9kZSBvbiB0aGUgZ3JpZC5cclxuICogQHBhcmFtIHtib29sZWFufSBbd2Fsa2FibGVdIC0gV2hldGhlciB0aGlzIG5vZGUgaXMgd2Fsa2FibGUuXHJcbiAqL1xyXG5mdW5jdGlvbiBOb2RlKHgsIHksIHdhbGthYmxlKSB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSB4IGNvb3JkaW5hdGUgb2YgdGhlIG5vZGUgb24gdGhlIGdyaWQuXHJcbiAgICAgKiBAdHlwZSBudW1iZXJcclxuICAgICAqL1xyXG4gICAgdGhpcy54ID0geDtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIHkgY29vcmRpbmF0ZSBvZiB0aGUgbm9kZSBvbiB0aGUgZ3JpZC5cclxuICAgICAqIEB0eXBlIG51bWJlclxyXG4gICAgICovXHJcbiAgICB0aGlzLnkgPSB5O1xyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRoaXMgbm9kZSBjYW4gYmUgd2Fsa2VkIHRocm91Z2guXHJcbiAgICAgKiBAdHlwZSBib29sZWFuXHJcbiAgICAgKi9cclxuICAgIHRoaXMud2Fsa2FibGUgPSAod2Fsa2FibGUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiB3YWxrYWJsZSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTm9kZTtcclxuIiwiLyoqXHJcbiAqIEJhY2t0cmFjZSBhY2NvcmRpbmcgdG8gdGhlIHBhcmVudCByZWNvcmRzIGFuZCByZXR1cm4gdGhlIHBhdGguXHJcbiAqIChpbmNsdWRpbmcgYm90aCBzdGFydCBhbmQgZW5kIG5vZGVzKVxyXG4gKiBAcGFyYW0ge05vZGV9IG5vZGUgRW5kIG5vZGVcclxuICogQHJldHVybiB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IHRoZSBwYXRoXHJcbiAqL1xyXG5mdW5jdGlvbiBiYWNrdHJhY2Uobm9kZSkge1xyXG4gICAgdmFyIHBhdGggPSBbW25vZGUueCwgbm9kZS55XV07XHJcbiAgICB3aGlsZSAobm9kZS5wYXJlbnQpIHtcclxuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgcGF0aC5wdXNoKFtub2RlLngsIG5vZGUueV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhdGgucmV2ZXJzZSgpO1xyXG59XHJcbmV4cG9ydHMuYmFja3RyYWNlID0gYmFja3RyYWNlO1xyXG5cclxuLyoqXHJcbiAqIEJhY2t0cmFjZSBmcm9tIHN0YXJ0IGFuZCBlbmQgbm9kZSwgYW5kIHJldHVybiB0aGUgcGF0aC5cclxuICogKGluY2x1ZGluZyBib3RoIHN0YXJ0IGFuZCBlbmQgbm9kZXMpXHJcbiAqIEBwYXJhbSB7Tm9kZX1cclxuICogQHBhcmFtIHtOb2RlfVxyXG4gKi9cclxuZnVuY3Rpb24gYmlCYWNrdHJhY2Uobm9kZUEsIG5vZGVCKSB7XHJcbiAgICB2YXIgcGF0aEEgPSBiYWNrdHJhY2Uobm9kZUEpLFxyXG4gICAgICAgIHBhdGhCID0gYmFja3RyYWNlKG5vZGVCKTtcclxuICAgIHJldHVybiBwYXRoQS5jb25jYXQocGF0aEIucmV2ZXJzZSgpKTtcclxufVxyXG5leHBvcnRzLmJpQmFja3RyYWNlID0gYmlCYWNrdHJhY2U7XHJcblxyXG4vKipcclxuICogQ29tcHV0ZSB0aGUgbGVuZ3RoIG9mIHRoZSBwYXRoLlxyXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PG51bWJlcj4+fSBwYXRoIFRoZSBwYXRoXHJcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGxlbmd0aCBvZiB0aGUgcGF0aFxyXG4gKi9cclxuZnVuY3Rpb24gcGF0aExlbmd0aChwYXRoKSB7XHJcbiAgICB2YXIgaSwgc3VtID0gMCwgYSwgYiwgZHgsIGR5O1xyXG4gICAgZm9yIChpID0gMTsgaSA8IHBhdGgubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBhID0gcGF0aFtpIC0gMV07XHJcbiAgICAgICAgYiA9IHBhdGhbaV07XHJcbiAgICAgICAgZHggPSBhWzBdIC0gYlswXTtcclxuICAgICAgICBkeSA9IGFbMV0gLSBiWzFdO1xyXG4gICAgICAgIHN1bSArPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1bTtcclxufVxyXG5leHBvcnRzLnBhdGhMZW5ndGggPSBwYXRoTGVuZ3RoO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBHaXZlbiB0aGUgc3RhcnQgYW5kIGVuZCBjb29yZGluYXRlcywgcmV0dXJuIGFsbCB0aGUgY29vcmRpbmF0ZXMgbHlpbmdcclxuICogb24gdGhlIGxpbmUgZm9ybWVkIGJ5IHRoZXNlIGNvb3JkaW5hdGVzLCBiYXNlZCBvbiBCcmVzZW5oYW0ncyBhbGdvcml0aG0uXHJcbiAqIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQnJlc2VuaGFtJ3NfbGluZV9hbGdvcml0aG0jU2ltcGxpZmljYXRpb25cclxuICogQHBhcmFtIHtudW1iZXJ9IHgwIFN0YXJ0IHggY29vcmRpbmF0ZVxyXG4gKiBAcGFyYW0ge251bWJlcn0geTAgU3RhcnQgeSBjb29yZGluYXRlXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB4MSBFbmQgeCBjb29yZGluYXRlXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB5MSBFbmQgeSBjb29yZGluYXRlXHJcbiAqIEByZXR1cm4ge0FycmF5PEFycmF5PG51bWJlcj4+fSBUaGUgY29vcmRpbmF0ZXMgb24gdGhlIGxpbmVcclxuICovXHJcbmZ1bmN0aW9uIGludGVycG9sYXRlKHgwLCB5MCwgeDEsIHkxKSB7XHJcbiAgICB2YXIgYWJzID0gTWF0aC5hYnMsXHJcbiAgICAgICAgbGluZSA9IFtdLFxyXG4gICAgICAgIHN4LCBzeSwgZHgsIGR5LCBlcnIsIGUyO1xyXG5cclxuICAgIGR4ID0gYWJzKHgxIC0geDApO1xyXG4gICAgZHkgPSBhYnMoeTEgLSB5MCk7XHJcblxyXG4gICAgc3ggPSAoeDAgPCB4MSkgPyAxIDogLTE7XHJcbiAgICBzeSA9ICh5MCA8IHkxKSA/IDEgOiAtMTtcclxuXHJcbiAgICBlcnIgPSBkeCAtIGR5O1xyXG5cclxuICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgbGluZS5wdXNoKFt4MCwgeTBdKTtcclxuXHJcbiAgICAgICAgaWYgKHgwID09PSB4MSAmJiB5MCA9PT0geTEpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGUyID0gMiAqIGVycjtcclxuICAgICAgICBpZiAoZTIgPiAtZHkpIHtcclxuICAgICAgICAgICAgZXJyID0gZXJyIC0gZHk7XHJcbiAgICAgICAgICAgIHgwID0geDAgKyBzeDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGUyIDwgZHgpIHtcclxuICAgICAgICAgICAgZXJyID0gZXJyICsgZHg7XHJcbiAgICAgICAgICAgIHkwID0geTAgKyBzeTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxpbmU7XHJcbn1cclxuZXhwb3J0cy5pbnRlcnBvbGF0ZSA9IGludGVycG9sYXRlO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBHaXZlbiBhIGNvbXByZXNzZWQgcGF0aCwgcmV0dXJuIGEgbmV3IHBhdGggdGhhdCBoYXMgYWxsIHRoZSBzZWdtZW50c1xyXG4gKiBpbiBpdCBpbnRlcnBvbGF0ZWQuXHJcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IHBhdGggVGhlIHBhdGhcclxuICogQHJldHVybiB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IGV4cGFuZGVkIHBhdGhcclxuICovXHJcbmZ1bmN0aW9uIGV4cGFuZFBhdGgocGF0aCkge1xyXG4gICAgdmFyIGV4cGFuZGVkID0gW10sXHJcbiAgICAgICAgbGVuID0gcGF0aC5sZW5ndGgsXHJcbiAgICAgICAgY29vcmQwLCBjb29yZDEsXHJcbiAgICAgICAgaW50ZXJwb2xhdGVkLFxyXG4gICAgICAgIGludGVycG9sYXRlZExlbixcclxuICAgICAgICBpLCBqO1xyXG5cclxuICAgIGlmIChsZW4gPCAyKSB7XHJcbiAgICAgICAgcmV0dXJuIGV4cGFuZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW4gLSAxOyArK2kpIHtcclxuICAgICAgICBjb29yZDAgPSBwYXRoW2ldO1xyXG4gICAgICAgIGNvb3JkMSA9IHBhdGhbaSArIDFdO1xyXG5cclxuICAgICAgICBpbnRlcnBvbGF0ZWQgPSBpbnRlcnBvbGF0ZShjb29yZDBbMF0sIGNvb3JkMFsxXSwgY29vcmQxWzBdLCBjb29yZDFbMV0pO1xyXG4gICAgICAgIGludGVycG9sYXRlZExlbiA9IGludGVycG9sYXRlZC5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IGludGVycG9sYXRlZExlbiAtIDE7ICsraikge1xyXG4gICAgICAgICAgICBleHBhbmRlZC5wdXNoKGludGVycG9sYXRlZFtqXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwYW5kZWQucHVzaChwYXRoW2xlbiAtIDFdKTtcclxuXHJcbiAgICByZXR1cm4gZXhwYW5kZWQ7XHJcbn1cclxuZXhwb3J0cy5leHBhbmRQYXRoID0gZXhwYW5kUGF0aDtcclxuXHJcblxyXG4vKipcclxuICogU21vb3RoZW4gdGhlIGdpdmUgcGF0aC5cclxuICogVGhlIG9yaWdpbmFsIHBhdGggd2lsbCBub3QgYmUgbW9kaWZpZWQ7IGEgbmV3IHBhdGggd2lsbCBiZSByZXR1cm5lZC5cclxuICogQHBhcmFtIHtQRi5HcmlkfSBncmlkXHJcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IHBhdGggVGhlIHBhdGhcclxuICovXHJcbmZ1bmN0aW9uIHNtb290aGVuUGF0aChncmlkLCBwYXRoKSB7XHJcbiAgICB2YXIgbGVuID0gcGF0aC5sZW5ndGgsXHJcbiAgICAgICAgeDAgPSBwYXRoWzBdWzBdLCAgICAgICAgLy8gcGF0aCBzdGFydCB4XHJcbiAgICAgICAgeTAgPSBwYXRoWzBdWzFdLCAgICAgICAgLy8gcGF0aCBzdGFydCB5XHJcbiAgICAgICAgeDEgPSBwYXRoW2xlbiAtIDFdWzBdLCAgLy8gcGF0aCBlbmQgeFxyXG4gICAgICAgIHkxID0gcGF0aFtsZW4gLSAxXVsxXSwgIC8vIHBhdGggZW5kIHlcclxuICAgICAgICBzeCwgc3ksICAgICAgICAgICAgICAgICAvLyBjdXJyZW50IHN0YXJ0IGNvb3JkaW5hdGVcclxuICAgICAgICBleCwgZXksICAgICAgICAgICAgICAgICAvLyBjdXJyZW50IGVuZCBjb29yZGluYXRlXHJcbiAgICAgICAgbmV3UGF0aCxcclxuICAgICAgICBpLCBqLCBjb29yZCwgbGluZSwgdGVzdENvb3JkLCBibG9ja2VkO1xyXG5cclxuICAgIHN4ID0geDA7XHJcbiAgICBzeSA9IHkwO1xyXG4gICAgbmV3UGF0aCA9IFtbc3gsIHN5XV07XHJcblxyXG4gICAgZm9yIChpID0gMjsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgY29vcmQgPSBwYXRoW2ldO1xyXG4gICAgICAgIGV4ID0gY29vcmRbMF07XHJcbiAgICAgICAgZXkgPSBjb29yZFsxXTtcclxuICAgICAgICBsaW5lID0gaW50ZXJwb2xhdGUoc3gsIHN5LCBleCwgZXkpO1xyXG5cclxuICAgICAgICBibG9ja2VkID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChqID0gMTsgaiA8IGxpbmUubGVuZ3RoOyArK2opIHtcclxuICAgICAgICAgICAgdGVzdENvb3JkID0gbGluZVtqXTtcclxuXHJcbiAgICAgICAgICAgIGlmICghZ3JpZC5pc1dhbGthYmxlQXQodGVzdENvb3JkWzBdLCB0ZXN0Q29vcmRbMV0pKSB7XHJcbiAgICAgICAgICAgICAgICBibG9ja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChibG9ja2VkKSB7XHJcbiAgICAgICAgICAgIGxhc3RWYWxpZENvb3JkID0gcGF0aFtpIC0gMV07XHJcbiAgICAgICAgICAgIG5ld1BhdGgucHVzaChsYXN0VmFsaWRDb29yZCk7XHJcbiAgICAgICAgICAgIHN4ID0gbGFzdFZhbGlkQ29vcmRbMF07XHJcbiAgICAgICAgICAgIHN5ID0gbGFzdFZhbGlkQ29vcmRbMV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbmV3UGF0aC5wdXNoKFt4MSwgeTFdKTtcclxuXHJcbiAgICByZXR1cm4gbmV3UGF0aDtcclxufVxyXG5leHBvcnRzLnNtb290aGVuUGF0aCA9IHNtb290aGVuUGF0aDtcclxuXHJcblxyXG4vKipcclxuICogQ29tcHJlc3MgYSBwYXRoLCByZW1vdmUgcmVkdW5kYW50IG5vZGVzIHdpdGhvdXQgYWx0ZXJpbmcgdGhlIHNoYXBlXHJcbiAqIFRoZSBvcmlnaW5hbCBwYXRoIGlzIG5vdCBtb2RpZmllZFxyXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5PG51bWJlcj4+fSBwYXRoIFRoZSBwYXRoXHJcbiAqIEByZXR1cm4ge0FycmF5PEFycmF5PG51bWJlcj4+fSBUaGUgY29tcHJlc3NlZCBwYXRoXHJcbiAqL1xyXG5mdW5jdGlvbiBjb21wcmVzc1BhdGgocGF0aCkge1xyXG5cclxuICAgIC8vIG5vdGhpbmcgdG8gY29tcHJlc3NcclxuICAgIGlmKHBhdGgubGVuZ3RoIDwgMykge1xyXG4gICAgICAgIHJldHVybiBwYXRoO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBjb21wcmVzc2VkID0gW10sXHJcbiAgICAgICAgc3ggPSBwYXRoWzBdWzBdLCAvLyBzdGFydCB4XHJcbiAgICAgICAgc3kgPSBwYXRoWzBdWzFdLCAvLyBzdGFydCB5XHJcbiAgICAgICAgcHggPSBwYXRoWzFdWzBdLCAvLyBzZWNvbmQgcG9pbnQgeFxyXG4gICAgICAgIHB5ID0gcGF0aFsxXVsxXSwgLy8gc2Vjb25kIHBvaW50IHlcclxuICAgICAgICBkeCA9IHB4IC0gc3gsIC8vIGRpcmVjdGlvbiBiZXR3ZWVuIHRoZSB0d28gcG9pbnRzXHJcbiAgICAgICAgZHkgPSBweSAtIHN5LCAvLyBkaXJlY3Rpb24gYmV0d2VlbiB0aGUgdHdvIHBvaW50c1xyXG4gICAgICAgIGx4LCBseSxcclxuICAgICAgICBsZHgsIGxkeSxcclxuICAgICAgICBzcSwgaTtcclxuXHJcbiAgICAvLyBub3JtYWxpemUgdGhlIGRpcmVjdGlvblxyXG4gICAgc3EgPSBNYXRoLnNxcnQoZHgqZHggKyBkeSpkeSk7XHJcbiAgICBkeCAvPSBzcTtcclxuICAgIGR5IC89IHNxO1xyXG5cclxuICAgIC8vIHN0YXJ0IHRoZSBuZXcgcGF0aFxyXG4gICAgY29tcHJlc3NlZC5wdXNoKFtzeCxzeV0pO1xyXG5cclxuICAgIGZvcihpID0gMjsgaSA8IHBhdGgubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgLy8gc3RvcmUgdGhlIGxhc3QgcG9pbnRcclxuICAgICAgICBseCA9IHB4O1xyXG4gICAgICAgIGx5ID0gcHk7XHJcblxyXG4gICAgICAgIC8vIHN0b3JlIHRoZSBsYXN0IGRpcmVjdGlvblxyXG4gICAgICAgIGxkeCA9IGR4O1xyXG4gICAgICAgIGxkeSA9IGR5O1xyXG5cclxuICAgICAgICAvLyBuZXh0IHBvaW50XHJcbiAgICAgICAgcHggPSBwYXRoW2ldWzBdO1xyXG4gICAgICAgIHB5ID0gcGF0aFtpXVsxXTtcclxuXHJcbiAgICAgICAgLy8gbmV4dCBkaXJlY3Rpb25cclxuICAgICAgICBkeCA9IHB4IC0gbHg7XHJcbiAgICAgICAgZHkgPSBweSAtIGx5O1xyXG5cclxuICAgICAgICAvLyBub3JtYWxpemVcclxuICAgICAgICBzcSA9IE1hdGguc3FydChkeCpkeCArIGR5KmR5KTtcclxuICAgICAgICBkeCAvPSBzcTtcclxuICAgICAgICBkeSAvPSBzcTtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhlIGRpcmVjdGlvbiBoYXMgY2hhbmdlZCwgc3RvcmUgdGhlIHBvaW50XHJcbiAgICAgICAgaWYgKCBkeCAhPT0gbGR4IHx8IGR5ICE9PSBsZHkgKSB7XHJcbiAgICAgICAgICAgIGNvbXByZXNzZWQucHVzaChbbHgsbHldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3RvcmUgdGhlIGxhc3QgcG9pbnRcclxuICAgIGNvbXByZXNzZWQucHVzaChbcHgscHldKTtcclxuXHJcbiAgICByZXR1cm4gY29tcHJlc3NlZDtcclxufVxyXG5leHBvcnRzLmNvbXByZXNzUGF0aCA9IGNvbXByZXNzUGF0aDtcclxuIiwidmFyIEhlYXAgICAgICAgPSByZXF1aXJlKCdoZWFwJyk7XHJcbnZhciBVdGlsICAgICAgID0gcmVxdWlyZSgnLi4vY29yZS9VdGlsJyk7XHJcbnZhciBIZXVyaXN0aWMgID0gcmVxdWlyZSgnLi4vY29yZS9IZXVyaXN0aWMnKTtcclxudmFyIERpYWdvbmFsTW92ZW1lbnQgPSByZXF1aXJlKCcuLi9jb3JlL0RpYWdvbmFsTW92ZW1lbnQnKTtcclxuXHJcbi8qKlxyXG4gKiBBKiBwYXRoLWZpbmRlci4gQmFzZWQgdXBvbiBodHRwczovL2dpdGh1Yi5jb20vYmdyaW5zL2phdmFzY3JpcHQtYXN0YXJcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRcclxuICogQHBhcmFtIHtib29sZWFufSBvcHQuYWxsb3dEaWFnb25hbCBXaGV0aGVyIGRpYWdvbmFsIG1vdmVtZW50IGlzIGFsbG93ZWQuXHJcbiAqICAgICBEZXByZWNhdGVkLCB1c2UgZGlhZ29uYWxNb3ZlbWVudCBpbnN0ZWFkLlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdC5kb250Q3Jvc3NDb3JuZXJzIERpc2FsbG93IGRpYWdvbmFsIG1vdmVtZW50IHRvdWNoaW5nIFxyXG4gKiAgICAgYmxvY2sgY29ybmVycy4gRGVwcmVjYXRlZCwgdXNlIGRpYWdvbmFsTW92ZW1lbnQgaW5zdGVhZC5cclxuICogQHBhcmFtIHtEaWFnb25hbE1vdmVtZW50fSBvcHQuZGlhZ29uYWxNb3ZlbWVudCBBbGxvd2VkIGRpYWdvbmFsIG1vdmVtZW50LlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHQuaGV1cmlzdGljIEhldXJpc3RpYyBmdW5jdGlvbiB0byBlc3RpbWF0ZSB0aGUgZGlzdGFuY2VcclxuICogICAgIChkZWZhdWx0cyB0byBtYW5oYXR0YW4pLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0LndlaWdodCBXZWlnaHQgdG8gYXBwbHkgdG8gdGhlIGhldXJpc3RpYyB0byBhbGxvdyBmb3JcclxuICogICAgIHN1Ym9wdGltYWwgcGF0aHMsIGluIG9yZGVyIHRvIHNwZWVkIHVwIHRoZSBzZWFyY2guXHJcbiAqL1xyXG5mdW5jdGlvbiBBU3RhckZpbmRlcihvcHQpIHtcclxuICAgIG9wdCA9IG9wdCB8fCB7fTtcclxuICAgIHRoaXMuYWxsb3dEaWFnb25hbCA9IG9wdC5hbGxvd0RpYWdvbmFsO1xyXG4gICAgdGhpcy5kb250Q3Jvc3NDb3JuZXJzID0gb3B0LmRvbnRDcm9zc0Nvcm5lcnM7XHJcbiAgICB0aGlzLmhldXJpc3RpYyA9IG9wdC5oZXVyaXN0aWMgfHwgSGV1cmlzdGljLm1hbmhhdHRhbjtcclxuICAgIHRoaXMud2VpZ2h0ID0gb3B0LndlaWdodCB8fCAxO1xyXG4gICAgdGhpcy5kaWFnb25hbE1vdmVtZW50ID0gb3B0LmRpYWdvbmFsTW92ZW1lbnQ7XHJcblxyXG4gICAgaWYgKCF0aGlzLmRpYWdvbmFsTW92ZW1lbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYWxsb3dEaWFnb25hbCkge1xyXG4gICAgICAgICAgICB0aGlzLmRpYWdvbmFsTW92ZW1lbnQgPSBEaWFnb25hbE1vdmVtZW50Lk5ldmVyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRvbnRDcm9zc0Nvcm5lcnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlhZ29uYWxNb3ZlbWVudCA9IERpYWdvbmFsTW92ZW1lbnQuT25seVdoZW5Ob09ic3RhY2xlcztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlhZ29uYWxNb3ZlbWVudCA9IERpYWdvbmFsTW92ZW1lbnQuSWZBdE1vc3RPbmVPYnN0YWNsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBXaGVuIGRpYWdvbmFsIG1vdmVtZW50IGlzIGFsbG93ZWQgdGhlIG1hbmhhdHRhbiBoZXVyaXN0aWMgaXMgbm90XHJcbiAgICAvL2FkbWlzc2libGUuIEl0IHNob3VsZCBiZSBvY3RpbGUgaW5zdGVhZFxyXG4gICAgaWYgKHRoaXMuZGlhZ29uYWxNb3ZlbWVudCA9PT0gRGlhZ29uYWxNb3ZlbWVudC5OZXZlcikge1xyXG4gICAgICAgIHRoaXMuaGV1cmlzdGljID0gb3B0LmhldXJpc3RpYyB8fCBIZXVyaXN0aWMubWFuaGF0dGFuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmhldXJpc3RpYyA9IG9wdC5oZXVyaXN0aWMgfHwgSGV1cmlzdGljLm9jdGlsZTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmQgYW5kIHJldHVybiB0aGUgdGhlIHBhdGguXHJcbiAqIEByZXR1cm4ge0FycmF5PEFycmF5PG51bWJlcj4+fSBUaGUgcGF0aCwgaW5jbHVkaW5nIGJvdGggc3RhcnQgYW5kXHJcbiAqICAgICBlbmQgcG9zaXRpb25zLlxyXG4gKi9cclxuQVN0YXJGaW5kZXIucHJvdG90eXBlLmZpbmRQYXRoID0gZnVuY3Rpb24oc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFksIGdyaWQpIHtcclxuICAgIHZhciBvcGVuTGlzdCA9IG5ldyBIZWFwKGZ1bmN0aW9uKG5vZGVBLCBub2RlQikge1xyXG4gICAgICAgICAgICByZXR1cm4gbm9kZUEuZiAtIG5vZGVCLmY7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgc3RhcnROb2RlID0gZ3JpZC5nZXROb2RlQXQoc3RhcnRYLCBzdGFydFkpLFxyXG4gICAgICAgIGVuZE5vZGUgPSBncmlkLmdldE5vZGVBdChlbmRYLCBlbmRZKSxcclxuICAgICAgICBoZXVyaXN0aWMgPSB0aGlzLmhldXJpc3RpYyxcclxuICAgICAgICBkaWFnb25hbE1vdmVtZW50ID0gdGhpcy5kaWFnb25hbE1vdmVtZW50LFxyXG4gICAgICAgIHdlaWdodCA9IHRoaXMud2VpZ2h0LFxyXG4gICAgICAgIGFicyA9IE1hdGguYWJzLCBTUVJUMiA9IE1hdGguU1FSVDIsXHJcbiAgICAgICAgbm9kZSwgbmVpZ2hib3JzLCBuZWlnaGJvciwgaSwgbCwgeCwgeSwgbmc7XHJcblxyXG4gICAgLy8gc2V0IHRoZSBgZ2AgYW5kIGBmYCB2YWx1ZSBvZiB0aGUgc3RhcnQgbm9kZSB0byBiZSAwXHJcbiAgICBzdGFydE5vZGUuZyA9IDA7XHJcbiAgICBzdGFydE5vZGUuZiA9IDA7XHJcblxyXG4gICAgLy8gcHVzaCB0aGUgc3RhcnQgbm9kZSBpbnRvIHRoZSBvcGVuIGxpc3RcclxuICAgIG9wZW5MaXN0LnB1c2goc3RhcnROb2RlKTtcclxuICAgIHN0YXJ0Tm9kZS5vcGVuZWQgPSB0cnVlO1xyXG5cclxuICAgIC8vIHdoaWxlIHRoZSBvcGVuIGxpc3QgaXMgbm90IGVtcHR5XHJcbiAgICB3aGlsZSAoIW9wZW5MaXN0LmVtcHR5KCkpIHtcclxuICAgICAgICAvLyBwb3AgdGhlIHBvc2l0aW9uIG9mIG5vZGUgd2hpY2ggaGFzIHRoZSBtaW5pbXVtIGBmYCB2YWx1ZS5cclxuICAgICAgICBub2RlID0gb3Blbkxpc3QucG9wKCk7XHJcbiAgICAgICAgbm9kZS5jbG9zZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyBpZiByZWFjaGVkIHRoZSBlbmQgcG9zaXRpb24sIGNvbnN0cnVjdCB0aGUgcGF0aCBhbmQgcmV0dXJuIGl0XHJcbiAgICAgICAgaWYgKG5vZGUgPT09IGVuZE5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFV0aWwuYmFja3RyYWNlKGVuZE5vZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZ2V0IG5laWdib3VycyBvZiB0aGUgY3VycmVudCBub2RlXHJcbiAgICAgICAgbmVpZ2hib3JzID0gZ3JpZC5nZXROZWlnaGJvcnMobm9kZSwgZGlhZ29uYWxNb3ZlbWVudCk7XHJcbiAgICAgICAgZm9yIChpID0gMCwgbCA9IG5laWdoYm9ycy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcclxuICAgICAgICAgICAgbmVpZ2hib3IgPSBuZWlnaGJvcnNbaV07XHJcblxyXG4gICAgICAgICAgICBpZiAobmVpZ2hib3IuY2xvc2VkKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgeCA9IG5laWdoYm9yLng7XHJcbiAgICAgICAgICAgIHkgPSBuZWlnaGJvci55O1xyXG5cclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBkaXN0YW5jZSBiZXR3ZWVuIGN1cnJlbnQgbm9kZSBhbmQgdGhlIG5laWdoYm9yXHJcbiAgICAgICAgICAgIC8vIGFuZCBjYWxjdWxhdGUgdGhlIG5leHQgZyBzY29yZVxyXG4gICAgICAgICAgICBuZyA9IG5vZGUuZyArICgoeCAtIG5vZGUueCA9PT0gMCB8fCB5IC0gbm9kZS55ID09PSAwKSA/IDEgOiBTUVJUMik7XHJcblxyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgbmVpZ2hib3IgaGFzIG5vdCBiZWVuIGluc3BlY3RlZCB5ZXQsIG9yXHJcbiAgICAgICAgICAgIC8vIGNhbiBiZSByZWFjaGVkIHdpdGggc21hbGxlciBjb3N0IGZyb20gdGhlIGN1cnJlbnQgbm9kZVxyXG4gICAgICAgICAgICBpZiAoIW5laWdoYm9yLm9wZW5lZCB8fCBuZyA8IG5laWdoYm9yLmcpIHtcclxuICAgICAgICAgICAgICAgIG5laWdoYm9yLmcgPSBuZztcclxuICAgICAgICAgICAgICAgIG5laWdoYm9yLmggPSBuZWlnaGJvci5oIHx8IHdlaWdodCAqIGhldXJpc3RpYyhhYnMoeCAtIGVuZFgpLCBhYnMoeSAtIGVuZFkpKTtcclxuICAgICAgICAgICAgICAgIG5laWdoYm9yLmYgPSBuZWlnaGJvci5nICsgbmVpZ2hib3IuaDtcclxuICAgICAgICAgICAgICAgIG5laWdoYm9yLnBhcmVudCA9IG5vZGU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFuZWlnaGJvci5vcGVuZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuTGlzdC5wdXNoKG5laWdoYm9yKTtcclxuICAgICAgICAgICAgICAgICAgICBuZWlnaGJvci5vcGVuZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgbmVpZ2hib3IgY2FuIGJlIHJlYWNoZWQgd2l0aCBzbWFsbGVyIGNvc3QuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2luY2UgaXRzIGYgdmFsdWUgaGFzIGJlZW4gdXBkYXRlZCwgd2UgaGF2ZSB0b1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBpdHMgcG9zaXRpb24gaW4gdGhlIG9wZW4gbGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5MaXN0LnVwZGF0ZUl0ZW0obmVpZ2hib3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAvLyBlbmQgZm9yIGVhY2ggbmVpZ2hib3JcclxuICAgIH0gLy8gZW5kIHdoaWxlIG5vdCBvcGVuIGxpc3QgZW1wdHlcclxuXHJcbiAgICAvLyBmYWlsIHRvIGZpbmQgdGhlIHBhdGhcclxuICAgIHJldHVybiBbXTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQVN0YXJGaW5kZXI7XHJcbiIsInZhciBBU3RhckZpbmRlciA9IHJlcXVpcmUoJy4vQVN0YXJGaW5kZXInKTtcclxuXHJcbi8qKlxyXG4gKiBCZXN0LUZpcnN0LVNlYXJjaCBwYXRoLWZpbmRlci5cclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBleHRlbmRzIEFTdGFyRmluZGVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRcclxuICogQHBhcmFtIHtib29sZWFufSBvcHQuYWxsb3dEaWFnb25hbCBXaGV0aGVyIGRpYWdvbmFsIG1vdmVtZW50IGlzIGFsbG93ZWQuXHJcbiAqICAgICBEZXByZWNhdGVkLCB1c2UgZGlhZ29uYWxNb3ZlbWVudCBpbnN0ZWFkLlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdC5kb250Q3Jvc3NDb3JuZXJzIERpc2FsbG93IGRpYWdvbmFsIG1vdmVtZW50IHRvdWNoaW5nXHJcbiAqICAgICBibG9jayBjb3JuZXJzLiBEZXByZWNhdGVkLCB1c2UgZGlhZ29uYWxNb3ZlbWVudCBpbnN0ZWFkLlxyXG4gKiBAcGFyYW0ge0RpYWdvbmFsTW92ZW1lbnR9IG9wdC5kaWFnb25hbE1vdmVtZW50IEFsbG93ZWQgZGlhZ29uYWwgbW92ZW1lbnQuXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdC5oZXVyaXN0aWMgSGV1cmlzdGljIGZ1bmN0aW9uIHRvIGVzdGltYXRlIHRoZSBkaXN0YW5jZVxyXG4gKiAgICAgKGRlZmF1bHRzIHRvIG1hbmhhdHRhbikuXHJcbiAqL1xyXG5mdW5jdGlvbiBCZXN0Rmlyc3RGaW5kZXIob3B0KSB7XHJcbiAgICBBU3RhckZpbmRlci5jYWxsKHRoaXMsIG9wdCk7XHJcblxyXG4gICAgdmFyIG9yaWcgPSB0aGlzLmhldXJpc3RpYztcclxuICAgIHRoaXMuaGV1cmlzdGljID0gZnVuY3Rpb24oZHgsIGR5KSB7XHJcbiAgICAgICAgcmV0dXJuIG9yaWcoZHgsIGR5KSAqIDEwMDAwMDA7XHJcbiAgICB9O1xyXG59XHJcblxyXG5CZXN0Rmlyc3RGaW5kZXIucHJvdG90eXBlID0gbmV3IEFTdGFyRmluZGVyKCk7XHJcbkJlc3RGaXJzdEZpbmRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCZXN0Rmlyc3RGaW5kZXI7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJlc3RGaXJzdEZpbmRlcjtcclxuIiwidmFyIEhlYXAgICAgICAgPSByZXF1aXJlKCdoZWFwJyk7XHJcbnZhciBVdGlsICAgICAgID0gcmVxdWlyZSgnLi4vY29yZS9VdGlsJyk7XHJcbnZhciBIZXVyaXN0aWMgID0gcmVxdWlyZSgnLi4vY29yZS9IZXVyaXN0aWMnKTtcclxudmFyIERpYWdvbmFsTW92ZW1lbnQgPSByZXF1aXJlKCcuLi9jb3JlL0RpYWdvbmFsTW92ZW1lbnQnKTtcclxuXHJcbi8qKlxyXG4gKiBBKiBwYXRoLWZpbmRlci5cclxuICogYmFzZWQgdXBvbiBodHRwczovL2dpdGh1Yi5jb20vYmdyaW5zL2phdmFzY3JpcHQtYXN0YXJcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRcclxuICogQHBhcmFtIHtib29sZWFufSBvcHQuYWxsb3dEaWFnb25hbCBXaGV0aGVyIGRpYWdvbmFsIG1vdmVtZW50IGlzIGFsbG93ZWQuXHJcbiAqICAgICBEZXByZWNhdGVkLCB1c2UgZGlhZ29uYWxNb3ZlbWVudCBpbnN0ZWFkLlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdC5kb250Q3Jvc3NDb3JuZXJzIERpc2FsbG93IGRpYWdvbmFsIG1vdmVtZW50IHRvdWNoaW5nXHJcbiAqICAgICBibG9jayBjb3JuZXJzLiBEZXByZWNhdGVkLCB1c2UgZGlhZ29uYWxNb3ZlbWVudCBpbnN0ZWFkLlxyXG4gKiBAcGFyYW0ge0RpYWdvbmFsTW92ZW1lbnR9IG9wdC5kaWFnb25hbE1vdmVtZW50IEFsbG93ZWQgZGlhZ29uYWwgbW92ZW1lbnQuXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdC5oZXVyaXN0aWMgSGV1cmlzdGljIGZ1bmN0aW9uIHRvIGVzdGltYXRlIHRoZSBkaXN0YW5jZVxyXG4gKiAgICAgKGRlZmF1bHRzIHRvIG1hbmhhdHRhbikuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBvcHQud2VpZ2h0IFdlaWdodCB0byBhcHBseSB0byB0aGUgaGV1cmlzdGljIHRvIGFsbG93IGZvclxyXG4gKiAgICAgc3Vib3B0aW1hbCBwYXRocywgaW4gb3JkZXIgdG8gc3BlZWQgdXAgdGhlIHNlYXJjaC5cclxuICovXHJcbmZ1bmN0aW9uIEJpQVN0YXJGaW5kZXIob3B0KSB7XHJcbiAgICBvcHQgPSBvcHQgfHwge307XHJcbiAgICB0aGlzLmFsbG93RGlhZ29uYWwgPSBvcHQuYWxsb3dEaWFnb25hbDtcclxuICAgIHRoaXMuZG9udENyb3NzQ29ybmVycyA9IG9wdC5kb250Q3Jvc3NDb3JuZXJzO1xyXG4gICAgdGhpcy5kaWFnb25hbE1vdmVtZW50ID0gb3B0LmRpYWdvbmFsTW92ZW1lbnQ7XHJcbiAgICB0aGlzLmhldXJpc3RpYyA9IG9wdC5oZXVyaXN0aWMgfHwgSGV1cmlzdGljLm1hbmhhdHRhbjtcclxuICAgIHRoaXMud2VpZ2h0ID0gb3B0LndlaWdodCB8fCAxO1xyXG5cclxuICAgIGlmICghdGhpcy5kaWFnb25hbE1vdmVtZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmFsbG93RGlhZ29uYWwpIHtcclxuICAgICAgICAgICAgdGhpcy5kaWFnb25hbE1vdmVtZW50ID0gRGlhZ29uYWxNb3ZlbWVudC5OZXZlcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kb250Q3Jvc3NDb3JuZXJzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWdvbmFsTW92ZW1lbnQgPSBEaWFnb25hbE1vdmVtZW50Lk9ubHlXaGVuTm9PYnN0YWNsZXM7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWdvbmFsTW92ZW1lbnQgPSBEaWFnb25hbE1vdmVtZW50LklmQXRNb3N0T25lT2JzdGFjbGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9XaGVuIGRpYWdvbmFsIG1vdmVtZW50IGlzIGFsbG93ZWQgdGhlIG1hbmhhdHRhbiBoZXVyaXN0aWMgaXMgbm90IGFkbWlzc2libGVcclxuICAgIC8vSXQgc2hvdWxkIGJlIG9jdGlsZSBpbnN0ZWFkXHJcbiAgICBpZiAodGhpcy5kaWFnb25hbE1vdmVtZW50ID09PSBEaWFnb25hbE1vdmVtZW50Lk5ldmVyKSB7XHJcbiAgICAgICAgdGhpcy5oZXVyaXN0aWMgPSBvcHQuaGV1cmlzdGljIHx8IEhldXJpc3RpYy5tYW5oYXR0YW47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuaGV1cmlzdGljID0gb3B0LmhldXJpc3RpYyB8fCBIZXVyaXN0aWMub2N0aWxlO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogRmluZCBhbmQgcmV0dXJuIHRoZSB0aGUgcGF0aC5cclxuICogQHJldHVybiB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IFRoZSBwYXRoLCBpbmNsdWRpbmcgYm90aCBzdGFydCBhbmRcclxuICogICAgIGVuZCBwb3NpdGlvbnMuXHJcbiAqL1xyXG5CaUFTdGFyRmluZGVyLnByb3RvdHlwZS5maW5kUGF0aCA9IGZ1bmN0aW9uKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLCBncmlkKSB7XHJcbiAgICB2YXIgY21wID0gZnVuY3Rpb24obm9kZUEsIG5vZGVCKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlQS5mIC0gbm9kZUIuZjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXJ0T3Blbkxpc3QgPSBuZXcgSGVhcChjbXApLFxyXG4gICAgICAgIGVuZE9wZW5MaXN0ID0gbmV3IEhlYXAoY21wKSxcclxuICAgICAgICBzdGFydE5vZGUgPSBncmlkLmdldE5vZGVBdChzdGFydFgsIHN0YXJ0WSksXHJcbiAgICAgICAgZW5kTm9kZSA9IGdyaWQuZ2V0Tm9kZUF0KGVuZFgsIGVuZFkpLFxyXG4gICAgICAgIGhldXJpc3RpYyA9IHRoaXMuaGV1cmlzdGljLFxyXG4gICAgICAgIGRpYWdvbmFsTW92ZW1lbnQgPSB0aGlzLmRpYWdvbmFsTW92ZW1lbnQsXHJcbiAgICAgICAgd2VpZ2h0ID0gdGhpcy53ZWlnaHQsXHJcbiAgICAgICAgYWJzID0gTWF0aC5hYnMsIFNRUlQyID0gTWF0aC5TUVJUMixcclxuICAgICAgICBub2RlLCBuZWlnaGJvcnMsIG5laWdoYm9yLCBpLCBsLCB4LCB5LCBuZyxcclxuICAgICAgICBCWV9TVEFSVCA9IDEsIEJZX0VORCA9IDI7XHJcblxyXG4gICAgLy8gc2V0IHRoZSBgZ2AgYW5kIGBmYCB2YWx1ZSBvZiB0aGUgc3RhcnQgbm9kZSB0byBiZSAwXHJcbiAgICAvLyBhbmQgcHVzaCBpdCBpbnRvIHRoZSBzdGFydCBvcGVuIGxpc3RcclxuICAgIHN0YXJ0Tm9kZS5nID0gMDtcclxuICAgIHN0YXJ0Tm9kZS5mID0gMDtcclxuICAgIHN0YXJ0T3Blbkxpc3QucHVzaChzdGFydE5vZGUpO1xyXG4gICAgc3RhcnROb2RlLm9wZW5lZCA9IEJZX1NUQVJUO1xyXG5cclxuICAgIC8vIHNldCB0aGUgYGdgIGFuZCBgZmAgdmFsdWUgb2YgdGhlIGVuZCBub2RlIHRvIGJlIDBcclxuICAgIC8vIGFuZCBwdXNoIGl0IGludG8gdGhlIG9wZW4gb3BlbiBsaXN0XHJcbiAgICBlbmROb2RlLmcgPSAwO1xyXG4gICAgZW5kTm9kZS5mID0gMDtcclxuICAgIGVuZE9wZW5MaXN0LnB1c2goZW5kTm9kZSk7XHJcbiAgICBlbmROb2RlLm9wZW5lZCA9IEJZX0VORDtcclxuXHJcbiAgICAvLyB3aGlsZSBib3RoIHRoZSBvcGVuIGxpc3RzIGFyZSBub3QgZW1wdHlcclxuICAgIHdoaWxlICghc3RhcnRPcGVuTGlzdC5lbXB0eSgpICYmICFlbmRPcGVuTGlzdC5lbXB0eSgpKSB7XHJcblxyXG4gICAgICAgIC8vIHBvcCB0aGUgcG9zaXRpb24gb2Ygc3RhcnQgbm9kZSB3aGljaCBoYXMgdGhlIG1pbmltdW0gYGZgIHZhbHVlLlxyXG4gICAgICAgIG5vZGUgPSBzdGFydE9wZW5MaXN0LnBvcCgpO1xyXG4gICAgICAgIG5vZGUuY2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IG5laWdib3VycyBvZiB0aGUgY3VycmVudCBub2RlXHJcbiAgICAgICAgbmVpZ2hib3JzID0gZ3JpZC5nZXROZWlnaGJvcnMobm9kZSwgZGlhZ29uYWxNb3ZlbWVudCk7XHJcbiAgICAgICAgZm9yIChpID0gMCwgbCA9IG5laWdoYm9ycy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcclxuICAgICAgICAgICAgbmVpZ2hib3IgPSBuZWlnaGJvcnNbaV07XHJcblxyXG4gICAgICAgICAgICBpZiAobmVpZ2hib3IuY2xvc2VkKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobmVpZ2hib3Iub3BlbmVkID09PSBCWV9FTkQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBVdGlsLmJpQmFja3RyYWNlKG5vZGUsIG5laWdoYm9yKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgeCA9IG5laWdoYm9yLng7XHJcbiAgICAgICAgICAgIHkgPSBuZWlnaGJvci55O1xyXG5cclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBkaXN0YW5jZSBiZXR3ZWVuIGN1cnJlbnQgbm9kZSBhbmQgdGhlIG5laWdoYm9yXHJcbiAgICAgICAgICAgIC8vIGFuZCBjYWxjdWxhdGUgdGhlIG5leHQgZyBzY29yZVxyXG4gICAgICAgICAgICBuZyA9IG5vZGUuZyArICgoeCAtIG5vZGUueCA9PT0gMCB8fCB5IC0gbm9kZS55ID09PSAwKSA/IDEgOiBTUVJUMik7XHJcblxyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgbmVpZ2hib3IgaGFzIG5vdCBiZWVuIGluc3BlY3RlZCB5ZXQsIG9yXHJcbiAgICAgICAgICAgIC8vIGNhbiBiZSByZWFjaGVkIHdpdGggc21hbGxlciBjb3N0IGZyb20gdGhlIGN1cnJlbnQgbm9kZVxyXG4gICAgICAgICAgICBpZiAoIW5laWdoYm9yLm9wZW5lZCB8fCBuZyA8IG5laWdoYm9yLmcpIHtcclxuICAgICAgICAgICAgICAgIG5laWdoYm9yLmcgPSBuZztcclxuICAgICAgICAgICAgICAgIG5laWdoYm9yLmggPSBuZWlnaGJvci5oIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgd2VpZ2h0ICogaGV1cmlzdGljKGFicyh4IC0gZW5kWCksIGFicyh5IC0gZW5kWSkpO1xyXG4gICAgICAgICAgICAgICAgbmVpZ2hib3IuZiA9IG5laWdoYm9yLmcgKyBuZWlnaGJvci5oO1xyXG4gICAgICAgICAgICAgICAgbmVpZ2hib3IucGFyZW50ID0gbm9kZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW5laWdoYm9yLm9wZW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0T3Blbkxpc3QucHVzaChuZWlnaGJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3Iub3BlbmVkID0gQllfU1RBUlQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBuZWlnaGJvciBjYW4gYmUgcmVhY2hlZCB3aXRoIHNtYWxsZXIgY29zdC5cclxuICAgICAgICAgICAgICAgICAgICAvLyBTaW5jZSBpdHMgZiB2YWx1ZSBoYXMgYmVlbiB1cGRhdGVkLCB3ZSBoYXZlIHRvXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXBkYXRlIGl0cyBwb3NpdGlvbiBpbiB0aGUgb3BlbiBsaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRPcGVuTGlzdC51cGRhdGVJdGVtKG5laWdoYm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gLy8gZW5kIGZvciBlYWNoIG5laWdoYm9yXHJcblxyXG5cclxuICAgICAgICAvLyBwb3AgdGhlIHBvc2l0aW9uIG9mIGVuZCBub2RlIHdoaWNoIGhhcyB0aGUgbWluaW11bSBgZmAgdmFsdWUuXHJcbiAgICAgICAgbm9kZSA9IGVuZE9wZW5MaXN0LnBvcCgpO1xyXG4gICAgICAgIG5vZGUuY2xvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IG5laWdib3VycyBvZiB0aGUgY3VycmVudCBub2RlXHJcbiAgICAgICAgbmVpZ2hib3JzID0gZ3JpZC5nZXROZWlnaGJvcnMobm9kZSwgZGlhZ29uYWxNb3ZlbWVudCk7XHJcbiAgICAgICAgZm9yIChpID0gMCwgbCA9IG5laWdoYm9ycy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcclxuICAgICAgICAgICAgbmVpZ2hib3IgPSBuZWlnaGJvcnNbaV07XHJcblxyXG4gICAgICAgICAgICBpZiAobmVpZ2hib3IuY2xvc2VkKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobmVpZ2hib3Iub3BlbmVkID09PSBCWV9TVEFSVCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0aWwuYmlCYWNrdHJhY2UobmVpZ2hib3IsIG5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB4ID0gbmVpZ2hib3IueDtcclxuICAgICAgICAgICAgeSA9IG5laWdoYm9yLnk7XHJcblxyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIGRpc3RhbmNlIGJldHdlZW4gY3VycmVudCBub2RlIGFuZCB0aGUgbmVpZ2hib3JcclxuICAgICAgICAgICAgLy8gYW5kIGNhbGN1bGF0ZSB0aGUgbmV4dCBnIHNjb3JlXHJcbiAgICAgICAgICAgIG5nID0gbm9kZS5nICsgKCh4IC0gbm9kZS54ID09PSAwIHx8IHkgLSBub2RlLnkgPT09IDApID8gMSA6IFNRUlQyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBuZWlnaGJvciBoYXMgbm90IGJlZW4gaW5zcGVjdGVkIHlldCwgb3JcclxuICAgICAgICAgICAgLy8gY2FuIGJlIHJlYWNoZWQgd2l0aCBzbWFsbGVyIGNvc3QgZnJvbSB0aGUgY3VycmVudCBub2RlXHJcbiAgICAgICAgICAgIGlmICghbmVpZ2hib3Iub3BlbmVkIHx8IG5nIDwgbmVpZ2hib3IuZykge1xyXG4gICAgICAgICAgICAgICAgbmVpZ2hib3IuZyA9IG5nO1xyXG4gICAgICAgICAgICAgICAgbmVpZ2hib3IuaCA9IG5laWdoYm9yLmggfHxcclxuICAgICAgICAgICAgICAgICAgICB3ZWlnaHQgKiBoZXVyaXN0aWMoYWJzKHggLSBzdGFydFgpLCBhYnMoeSAtIHN0YXJ0WSkpO1xyXG4gICAgICAgICAgICAgICAgbmVpZ2hib3IuZiA9IG5laWdoYm9yLmcgKyBuZWlnaGJvci5oO1xyXG4gICAgICAgICAgICAgICAgbmVpZ2hib3IucGFyZW50ID0gbm9kZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW5laWdoYm9yLm9wZW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZE9wZW5MaXN0LnB1c2gobmVpZ2hib3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5laWdoYm9yLm9wZW5lZCA9IEJZX0VORDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIG5laWdoYm9yIGNhbiBiZSByZWFjaGVkIHdpdGggc21hbGxlciBjb3N0LlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNpbmNlIGl0cyBmIHZhbHVlIGhhcyBiZWVuIHVwZGF0ZWQsIHdlIGhhdmUgdG9cclxuICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgaXRzIHBvc2l0aW9uIGluIHRoZSBvcGVuIGxpc3RcclxuICAgICAgICAgICAgICAgICAgICBlbmRPcGVuTGlzdC51cGRhdGVJdGVtKG5laWdoYm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gLy8gZW5kIGZvciBlYWNoIG5laWdoYm9yXHJcbiAgICB9IC8vIGVuZCB3aGlsZSBub3Qgb3BlbiBsaXN0IGVtcHR5XHJcblxyXG4gICAgLy8gZmFpbCB0byBmaW5kIHRoZSBwYXRoXHJcbiAgICByZXR1cm4gW107XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJpQVN0YXJGaW5kZXI7XHJcbiIsInZhciBCaUFTdGFyRmluZGVyID0gcmVxdWlyZSgnLi9CaUFTdGFyRmluZGVyJyk7XHJcblxyXG4vKipcclxuICogQmktZGlyZWNpdGlvbmFsIEJlc3QtRmlyc3QtU2VhcmNoIHBhdGgtZmluZGVyLlxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQGV4dGVuZHMgQmlBU3RhckZpbmRlclxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0LmFsbG93RGlhZ29uYWwgV2hldGhlciBkaWFnb25hbCBtb3ZlbWVudCBpcyBhbGxvd2VkLlxyXG4gKiAgICAgRGVwcmVjYXRlZCwgdXNlIGRpYWdvbmFsTW92ZW1lbnQgaW5zdGVhZC5cclxuICogQHBhcmFtIHtib29sZWFufSBvcHQuZG9udENyb3NzQ29ybmVycyBEaXNhbGxvdyBkaWFnb25hbCBtb3ZlbWVudCB0b3VjaGluZ1xyXG4gKiAgICAgYmxvY2sgY29ybmVycy4gRGVwcmVjYXRlZCwgdXNlIGRpYWdvbmFsTW92ZW1lbnQgaW5zdGVhZC5cclxuICogQHBhcmFtIHtEaWFnb25hbE1vdmVtZW50fSBvcHQuZGlhZ29uYWxNb3ZlbWVudCBBbGxvd2VkIGRpYWdvbmFsIG1vdmVtZW50LlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHQuaGV1cmlzdGljIEhldXJpc3RpYyBmdW5jdGlvbiB0byBlc3RpbWF0ZSB0aGUgZGlzdGFuY2VcclxuICogICAgIChkZWZhdWx0cyB0byBtYW5oYXR0YW4pLlxyXG4gKi9cclxuZnVuY3Rpb24gQmlCZXN0Rmlyc3RGaW5kZXIob3B0KSB7XHJcbiAgICBCaUFTdGFyRmluZGVyLmNhbGwodGhpcywgb3B0KTtcclxuXHJcbiAgICB2YXIgb3JpZyA9IHRoaXMuaGV1cmlzdGljO1xyXG4gICAgdGhpcy5oZXVyaXN0aWMgPSBmdW5jdGlvbihkeCwgZHkpIHtcclxuICAgICAgICByZXR1cm4gb3JpZyhkeCwgZHkpICogMTAwMDAwMDtcclxuICAgIH07XHJcbn1cclxuXHJcbkJpQmVzdEZpcnN0RmluZGVyLnByb3RvdHlwZSA9IG5ldyBCaUFTdGFyRmluZGVyKCk7XHJcbkJpQmVzdEZpcnN0RmluZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJpQmVzdEZpcnN0RmluZGVyO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCaUJlc3RGaXJzdEZpbmRlcjtcclxuIiwidmFyIFV0aWwgPSByZXF1aXJlKCcuLi9jb3JlL1V0aWwnKTtcclxudmFyIERpYWdvbmFsTW92ZW1lbnQgPSByZXF1aXJlKCcuLi9jb3JlL0RpYWdvbmFsTW92ZW1lbnQnKTtcclxuXHJcbi8qKlxyXG4gKiBCaS1kaXJlY3Rpb25hbCBCcmVhZHRoLUZpcnN0LVNlYXJjaCBwYXRoIGZpbmRlci5cclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRcclxuICogQHBhcmFtIHtib29sZWFufSBvcHQuYWxsb3dEaWFnb25hbCBXaGV0aGVyIGRpYWdvbmFsIG1vdmVtZW50IGlzIGFsbG93ZWQuXHJcbiAqICAgICBEZXByZWNhdGVkLCB1c2UgZGlhZ29uYWxNb3ZlbWVudCBpbnN0ZWFkLlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdC5kb250Q3Jvc3NDb3JuZXJzIERpc2FsbG93IGRpYWdvbmFsIG1vdmVtZW50IHRvdWNoaW5nXHJcbiAqICAgICBibG9jayBjb3JuZXJzLiBEZXByZWNhdGVkLCB1c2UgZGlhZ29uYWxNb3ZlbWVudCBpbnN0ZWFkLlxyXG4gKiBAcGFyYW0ge0RpYWdvbmFsTW92ZW1lbnR9IG9wdC5kaWFnb25hbE1vdmVtZW50IEFsbG93ZWQgZGlhZ29uYWwgbW92ZW1lbnQuXHJcbiAqL1xyXG5mdW5jdGlvbiBCaUJyZWFkdGhGaXJzdEZpbmRlcihvcHQpIHtcclxuICAgIG9wdCA9IG9wdCB8fCB7fTtcclxuICAgIHRoaXMuYWxsb3dEaWFnb25hbCA9IG9wdC5hbGxvd0RpYWdvbmFsO1xyXG4gICAgdGhpcy5kb250Q3Jvc3NDb3JuZXJzID0gb3B0LmRvbnRDcm9zc0Nvcm5lcnM7XHJcbiAgICB0aGlzLmRpYWdvbmFsTW92ZW1lbnQgPSBvcHQuZGlhZ29uYWxNb3ZlbWVudDtcclxuXHJcbiAgICBpZiAoIXRoaXMuZGlhZ29uYWxNb3ZlbWVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5hbGxvd0RpYWdvbmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlhZ29uYWxNb3ZlbWVudCA9IERpYWdvbmFsTW92ZW1lbnQuTmV2ZXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZG9udENyb3NzQ29ybmVycykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWFnb25hbE1vdmVtZW50ID0gRGlhZ29uYWxNb3ZlbWVudC5Pbmx5V2hlbk5vT2JzdGFjbGVzO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWFnb25hbE1vdmVtZW50ID0gRGlhZ29uYWxNb3ZlbWVudC5JZkF0TW9zdE9uZU9ic3RhY2xlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIEZpbmQgYW5kIHJldHVybiB0aGUgdGhlIHBhdGguXHJcbiAqIEByZXR1cm4ge0FycmF5PEFycmF5PG51bWJlcj4+fSBUaGUgcGF0aCwgaW5jbHVkaW5nIGJvdGggc3RhcnQgYW5kXHJcbiAqICAgICBlbmQgcG9zaXRpb25zLlxyXG4gKi9cclxuQmlCcmVhZHRoRmlyc3RGaW5kZXIucHJvdG90eXBlLmZpbmRQYXRoID0gZnVuY3Rpb24oc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFksIGdyaWQpIHtcclxuICAgIHZhciBzdGFydE5vZGUgPSBncmlkLmdldE5vZGVBdChzdGFydFgsIHN0YXJ0WSksXHJcbiAgICAgICAgZW5kTm9kZSA9IGdyaWQuZ2V0Tm9kZUF0KGVuZFgsIGVuZFkpLFxyXG4gICAgICAgIHN0YXJ0T3Blbkxpc3QgPSBbXSwgZW5kT3Blbkxpc3QgPSBbXSxcclxuICAgICAgICBuZWlnaGJvcnMsIG5laWdoYm9yLCBub2RlLFxyXG4gICAgICAgIGRpYWdvbmFsTW92ZW1lbnQgPSB0aGlzLmRpYWdvbmFsTW92ZW1lbnQsXHJcbiAgICAgICAgQllfU1RBUlQgPSAwLCBCWV9FTkQgPSAxLFxyXG4gICAgICAgIGksIGw7XHJcblxyXG4gICAgLy8gcHVzaCB0aGUgc3RhcnQgYW5kIGVuZCBub2RlcyBpbnRvIHRoZSBxdWV1ZXNcclxuICAgIHN0YXJ0T3Blbkxpc3QucHVzaChzdGFydE5vZGUpO1xyXG4gICAgc3RhcnROb2RlLm9wZW5lZCA9IHRydWU7XHJcbiAgICBzdGFydE5vZGUuYnkgPSBCWV9TVEFSVDtcclxuXHJcbiAgICBlbmRPcGVuTGlzdC5wdXNoKGVuZE5vZGUpO1xyXG4gICAgZW5kTm9kZS5vcGVuZWQgPSB0cnVlO1xyXG4gICAgZW5kTm9kZS5ieSA9IEJZX0VORDtcclxuXHJcbiAgICAvLyB3aGlsZSBib3RoIHRoZSBxdWV1ZXMgYXJlIG5vdCBlbXB0eVxyXG4gICAgd2hpbGUgKHN0YXJ0T3Blbkxpc3QubGVuZ3RoICYmIGVuZE9wZW5MaXN0Lmxlbmd0aCkge1xyXG5cclxuICAgICAgICAvLyBleHBhbmQgc3RhcnQgb3BlbiBsaXN0XHJcblxyXG4gICAgICAgIG5vZGUgPSBzdGFydE9wZW5MaXN0LnNoaWZ0KCk7XHJcbiAgICAgICAgbm9kZS5jbG9zZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBuZWlnaGJvcnMgPSBncmlkLmdldE5laWdoYm9ycyhub2RlLCBkaWFnb25hbE1vdmVtZW50KTtcclxuICAgICAgICBmb3IgKGkgPSAwLCBsID0gbmVpZ2hib3JzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xyXG4gICAgICAgICAgICBuZWlnaGJvciA9IG5laWdoYm9yc1tpXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuZWlnaGJvci5jbG9zZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChuZWlnaGJvci5vcGVuZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIHRoaXMgbm9kZSBoYXMgYmVlbiBpbnNwZWN0ZWQgYnkgdGhlIHJldmVyc2VkIHNlYXJjaCxcclxuICAgICAgICAgICAgICAgIC8vIHRoZW4gYSBwYXRoIGlzIGZvdW5kLlxyXG4gICAgICAgICAgICAgICAgaWYgKG5laWdoYm9yLmJ5ID09PSBCWV9FTkQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVXRpbC5iaUJhY2t0cmFjZShub2RlLCBuZWlnaGJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdGFydE9wZW5MaXN0LnB1c2gobmVpZ2hib3IpO1xyXG4gICAgICAgICAgICBuZWlnaGJvci5wYXJlbnQgPSBub2RlO1xyXG4gICAgICAgICAgICBuZWlnaGJvci5vcGVuZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBuZWlnaGJvci5ieSA9IEJZX1NUQVJUO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZXhwYW5kIGVuZCBvcGVuIGxpc3RcclxuXHJcbiAgICAgICAgbm9kZSA9IGVuZE9wZW5MaXN0LnNoaWZ0KCk7XHJcbiAgICAgICAgbm9kZS5jbG9zZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBuZWlnaGJvcnMgPSBncmlkLmdldE5laWdoYm9ycyhub2RlLCBkaWFnb25hbE1vdmVtZW50KTtcclxuICAgICAgICBmb3IgKGkgPSAwLCBsID0gbmVpZ2hib3JzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xyXG4gICAgICAgICAgICBuZWlnaGJvciA9IG5laWdoYm9yc1tpXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuZWlnaGJvci5jbG9zZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChuZWlnaGJvci5vcGVuZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChuZWlnaGJvci5ieSA9PT0gQllfU1RBUlQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVXRpbC5iaUJhY2t0cmFjZShuZWlnaGJvciwgbm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbmRPcGVuTGlzdC5wdXNoKG5laWdoYm9yKTtcclxuICAgICAgICAgICAgbmVpZ2hib3IucGFyZW50ID0gbm9kZTtcclxuICAgICAgICAgICAgbmVpZ2hib3Iub3BlbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgbmVpZ2hib3IuYnkgPSBCWV9FTkQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGZhaWwgdG8gZmluZCB0aGUgcGF0aFxyXG4gICAgcmV0dXJuIFtdO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCaUJyZWFkdGhGaXJzdEZpbmRlcjtcclxuIiwidmFyIEJpQVN0YXJGaW5kZXIgPSByZXF1aXJlKCcuL0JpQVN0YXJGaW5kZXInKTtcclxuXHJcbi8qKlxyXG4gKiBCaS1kaXJlY3Rpb25hbCBEaWprc3RyYSBwYXRoLWZpbmRlci5cclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBleHRlbmRzIEJpQVN0YXJGaW5kZXJcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdFxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdC5hbGxvd0RpYWdvbmFsIFdoZXRoZXIgZGlhZ29uYWwgbW92ZW1lbnQgaXMgYWxsb3dlZC5cclxuICogICAgIERlcHJlY2F0ZWQsIHVzZSBkaWFnb25hbE1vdmVtZW50IGluc3RlYWQuXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0LmRvbnRDcm9zc0Nvcm5lcnMgRGlzYWxsb3cgZGlhZ29uYWwgbW92ZW1lbnQgdG91Y2hpbmdcclxuICogICAgIGJsb2NrIGNvcm5lcnMuIERlcHJlY2F0ZWQsIHVzZSBkaWFnb25hbE1vdmVtZW50IGluc3RlYWQuXHJcbiAqIEBwYXJhbSB7RGlhZ29uYWxNb3ZlbWVudH0gb3B0LmRpYWdvbmFsTW92ZW1lbnQgQWxsb3dlZCBkaWFnb25hbCBtb3ZlbWVudC5cclxuICovXHJcbmZ1bmN0aW9uIEJpRGlqa3N0cmFGaW5kZXIob3B0KSB7XHJcbiAgICBCaUFTdGFyRmluZGVyLmNhbGwodGhpcywgb3B0KTtcclxuICAgIHRoaXMuaGV1cmlzdGljID0gZnVuY3Rpb24oZHgsIGR5KSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9O1xyXG59XHJcblxyXG5CaURpamtzdHJhRmluZGVyLnByb3RvdHlwZSA9IG5ldyBCaUFTdGFyRmluZGVyKCk7XHJcbkJpRGlqa3N0cmFGaW5kZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmlEaWprc3RyYUZpbmRlcjtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQmlEaWprc3RyYUZpbmRlcjtcclxuIiwidmFyIFV0aWwgPSByZXF1aXJlKCcuLi9jb3JlL1V0aWwnKTtcclxudmFyIERpYWdvbmFsTW92ZW1lbnQgPSByZXF1aXJlKCcuLi9jb3JlL0RpYWdvbmFsTW92ZW1lbnQnKTtcclxuXHJcbi8qKlxyXG4gKiBCcmVhZHRoLUZpcnN0LVNlYXJjaCBwYXRoIGZpbmRlci5cclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRcclxuICogQHBhcmFtIHtib29sZWFufSBvcHQuYWxsb3dEaWFnb25hbCBXaGV0aGVyIGRpYWdvbmFsIG1vdmVtZW50IGlzIGFsbG93ZWQuXHJcbiAqICAgICBEZXByZWNhdGVkLCB1c2UgZGlhZ29uYWxNb3ZlbWVudCBpbnN0ZWFkLlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdC5kb250Q3Jvc3NDb3JuZXJzIERpc2FsbG93IGRpYWdvbmFsIG1vdmVtZW50IHRvdWNoaW5nXHJcbiAqICAgICBibG9jayBjb3JuZXJzLiBEZXByZWNhdGVkLCB1c2UgZGlhZ29uYWxNb3ZlbWVudCBpbnN0ZWFkLlxyXG4gKiBAcGFyYW0ge0RpYWdvbmFsTW92ZW1lbnR9IG9wdC5kaWFnb25hbE1vdmVtZW50IEFsbG93ZWQgZGlhZ29uYWwgbW92ZW1lbnQuXHJcbiAqL1xyXG5mdW5jdGlvbiBCcmVhZHRoRmlyc3RGaW5kZXIob3B0KSB7XHJcbiAgICBvcHQgPSBvcHQgfHwge307XHJcbiAgICB0aGlzLmFsbG93RGlhZ29uYWwgPSBvcHQuYWxsb3dEaWFnb25hbDtcclxuICAgIHRoaXMuZG9udENyb3NzQ29ybmVycyA9IG9wdC5kb250Q3Jvc3NDb3JuZXJzO1xyXG4gICAgdGhpcy5kaWFnb25hbE1vdmVtZW50ID0gb3B0LmRpYWdvbmFsTW92ZW1lbnQ7XHJcblxyXG4gICAgaWYgKCF0aGlzLmRpYWdvbmFsTW92ZW1lbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYWxsb3dEaWFnb25hbCkge1xyXG4gICAgICAgICAgICB0aGlzLmRpYWdvbmFsTW92ZW1lbnQgPSBEaWFnb25hbE1vdmVtZW50Lk5ldmVyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRvbnRDcm9zc0Nvcm5lcnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlhZ29uYWxNb3ZlbWVudCA9IERpYWdvbmFsTW92ZW1lbnQuT25seVdoZW5Ob09ic3RhY2xlcztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlhZ29uYWxNb3ZlbWVudCA9IERpYWdvbmFsTW92ZW1lbnQuSWZBdE1vc3RPbmVPYnN0YWNsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmQgYW5kIHJldHVybiB0aGUgdGhlIHBhdGguXHJcbiAqIEByZXR1cm4ge0FycmF5PEFycmF5PG51bWJlcj4+fSBUaGUgcGF0aCwgaW5jbHVkaW5nIGJvdGggc3RhcnQgYW5kXHJcbiAqICAgICBlbmQgcG9zaXRpb25zLlxyXG4gKi9cclxuQnJlYWR0aEZpcnN0RmluZGVyLnByb3RvdHlwZS5maW5kUGF0aCA9IGZ1bmN0aW9uKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLCBncmlkKSB7XHJcbiAgICB2YXIgb3Blbkxpc3QgPSBbXSxcclxuICAgICAgICBkaWFnb25hbE1vdmVtZW50ID0gdGhpcy5kaWFnb25hbE1vdmVtZW50LFxyXG4gICAgICAgIHN0YXJ0Tm9kZSA9IGdyaWQuZ2V0Tm9kZUF0KHN0YXJ0WCwgc3RhcnRZKSxcclxuICAgICAgICBlbmROb2RlID0gZ3JpZC5nZXROb2RlQXQoZW5kWCwgZW5kWSksXHJcbiAgICAgICAgbmVpZ2hib3JzLCBuZWlnaGJvciwgbm9kZSwgaSwgbDtcclxuXHJcbiAgICAvLyBwdXNoIHRoZSBzdGFydCBwb3MgaW50byB0aGUgcXVldWVcclxuICAgIG9wZW5MaXN0LnB1c2goc3RhcnROb2RlKTtcclxuICAgIHN0YXJ0Tm9kZS5vcGVuZWQgPSB0cnVlO1xyXG5cclxuICAgIC8vIHdoaWxlIHRoZSBxdWV1ZSBpcyBub3QgZW1wdHlcclxuICAgIHdoaWxlIChvcGVuTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAvLyB0YWtlIHRoZSBmcm9udCBub2RlIGZyb20gdGhlIHF1ZXVlXHJcbiAgICAgICAgbm9kZSA9IG9wZW5MaXN0LnNoaWZ0KCk7XHJcbiAgICAgICAgbm9kZS5jbG9zZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyByZWFjaGVkIHRoZSBlbmQgcG9zaXRpb25cclxuICAgICAgICBpZiAobm9kZSA9PT0gZW5kTm9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gVXRpbC5iYWNrdHJhY2UoZW5kTm9kZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZWlnaGJvcnMgPSBncmlkLmdldE5laWdoYm9ycyhub2RlLCBkaWFnb25hbE1vdmVtZW50KTtcclxuICAgICAgICBmb3IgKGkgPSAwLCBsID0gbmVpZ2hib3JzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xyXG4gICAgICAgICAgICBuZWlnaGJvciA9IG5laWdoYm9yc1tpXTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNraXAgdGhpcyBuZWlnaGJvciBpZiBpdCBoYXMgYmVlbiBpbnNwZWN0ZWQgYmVmb3JlXHJcbiAgICAgICAgICAgIGlmIChuZWlnaGJvci5jbG9zZWQgfHwgbmVpZ2hib3Iub3BlbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb3Blbkxpc3QucHVzaChuZWlnaGJvcik7XHJcbiAgICAgICAgICAgIG5laWdoYm9yLm9wZW5lZCA9IHRydWU7XHJcbiAgICAgICAgICAgIG5laWdoYm9yLnBhcmVudCA9IG5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBmYWlsIHRvIGZpbmQgdGhlIHBhdGhcclxuICAgIHJldHVybiBbXTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQnJlYWR0aEZpcnN0RmluZGVyO1xyXG4iLCJ2YXIgQVN0YXJGaW5kZXIgPSByZXF1aXJlKCcuL0FTdGFyRmluZGVyJyk7XHJcblxyXG4vKipcclxuICogRGlqa3N0cmEgcGF0aC1maW5kZXIuXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAZXh0ZW5kcyBBU3RhckZpbmRlclxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0LmFsbG93RGlhZ29uYWwgV2hldGhlciBkaWFnb25hbCBtb3ZlbWVudCBpcyBhbGxvd2VkLlxyXG4gKiAgICAgRGVwcmVjYXRlZCwgdXNlIGRpYWdvbmFsTW92ZW1lbnQgaW5zdGVhZC5cclxuICogQHBhcmFtIHtib29sZWFufSBvcHQuZG9udENyb3NzQ29ybmVycyBEaXNhbGxvdyBkaWFnb25hbCBtb3ZlbWVudCB0b3VjaGluZ1xyXG4gKiAgICAgYmxvY2sgY29ybmVycy4gRGVwcmVjYXRlZCwgdXNlIGRpYWdvbmFsTW92ZW1lbnQgaW5zdGVhZC5cclxuICogQHBhcmFtIHtEaWFnb25hbE1vdmVtZW50fSBvcHQuZGlhZ29uYWxNb3ZlbWVudCBBbGxvd2VkIGRpYWdvbmFsIG1vdmVtZW50LlxyXG4gKi9cclxuZnVuY3Rpb24gRGlqa3N0cmFGaW5kZXIob3B0KSB7XHJcbiAgICBBU3RhckZpbmRlci5jYWxsKHRoaXMsIG9wdCk7XHJcbiAgICB0aGlzLmhldXJpc3RpYyA9IGZ1bmN0aW9uKGR4LCBkeSkge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfTtcclxufVxyXG5cclxuRGlqa3N0cmFGaW5kZXIucHJvdG90eXBlID0gbmV3IEFTdGFyRmluZGVyKCk7XHJcbkRpamtzdHJhRmluZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IERpamtzdHJhRmluZGVyO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEaWprc3RyYUZpbmRlcjtcclxuIiwidmFyIFV0aWwgICAgICAgPSByZXF1aXJlKCcuLi9jb3JlL1V0aWwnKTtcclxudmFyIEhldXJpc3RpYyAgPSByZXF1aXJlKCcuLi9jb3JlL0hldXJpc3RpYycpO1xyXG52YXIgTm9kZSAgICAgICA9IHJlcXVpcmUoJy4uL2NvcmUvTm9kZScpO1xyXG52YXIgRGlhZ29uYWxNb3ZlbWVudCA9IHJlcXVpcmUoJy4uL2NvcmUvRGlhZ29uYWxNb3ZlbWVudCcpO1xyXG5cclxuLyoqXHJcbiAqIEl0ZXJhdGl2ZSBEZWVwaW5nIEEgU3RhciAoSURBKikgcGF0aC1maW5kZXIuXHJcbiAqXHJcbiAqIFJlY3Vyc2lvbiBiYXNlZCBvbjpcclxuICogICBodHRwOi8vd3d3LmFwbC5qaHUuZWR1L35oYWxsL0FJLVByb2dyYW1taW5nL0lEQS1TdGFyLmh0bWxcclxuICpcclxuICogUGF0aCByZXRyYWNpbmcgYmFzZWQgb246XHJcbiAqICBWLiBOYWdlc2h3YXJhIFJhbywgVmlwaW4gS3VtYXIgYW5kIEsuIFJhbWVzaFxyXG4gKiAgXCJBIFBhcmFsbGVsIEltcGxlbWVudGF0aW9uIG9mIEl0ZXJhdGl2ZS1EZWVwaW5nLUEqXCIsIEphbnVhcnkgMTk4Ny5cclxuICogIGZ0cDovL2Z0cC5jcy51dGV4YXMuZWR1Ly5zbmFwc2hvdC9ob3VybHkuMS9wdWIvQUktTGFiL3RlY2gtcmVwb3J0cy9VVC1BSS1UUi04Ny00Ni5wZGZcclxuICpcclxuICogQGF1dGhvciBHZXJhcmQgTWVpZXIgKHd3dy5nZXJhcmRtZWllci5jb20pXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0LmFsbG93RGlhZ29uYWwgV2hldGhlciBkaWFnb25hbCBtb3ZlbWVudCBpcyBhbGxvd2VkLlxyXG4gKiAgICAgRGVwcmVjYXRlZCwgdXNlIGRpYWdvbmFsTW92ZW1lbnQgaW5zdGVhZC5cclxuICogQHBhcmFtIHtib29sZWFufSBvcHQuZG9udENyb3NzQ29ybmVycyBEaXNhbGxvdyBkaWFnb25hbCBtb3ZlbWVudCB0b3VjaGluZ1xyXG4gKiAgICAgYmxvY2sgY29ybmVycy4gRGVwcmVjYXRlZCwgdXNlIGRpYWdvbmFsTW92ZW1lbnQgaW5zdGVhZC5cclxuICogQHBhcmFtIHtEaWFnb25hbE1vdmVtZW50fSBvcHQuZGlhZ29uYWxNb3ZlbWVudCBBbGxvd2VkIGRpYWdvbmFsIG1vdmVtZW50LlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHQuaGV1cmlzdGljIEhldXJpc3RpYyBmdW5jdGlvbiB0byBlc3RpbWF0ZSB0aGUgZGlzdGFuY2VcclxuICogICAgIChkZWZhdWx0cyB0byBtYW5oYXR0YW4pLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0LndlaWdodCBXZWlnaHQgdG8gYXBwbHkgdG8gdGhlIGhldXJpc3RpYyB0byBhbGxvdyBmb3JcclxuICogICAgIHN1Ym9wdGltYWwgcGF0aHMsIGluIG9yZGVyIHRvIHNwZWVkIHVwIHRoZSBzZWFyY2guXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0LnRyYWNrUmVjdXJzaW9uIFdoZXRoZXIgdG8gdHJhY2sgcmVjdXJzaW9uIGZvclxyXG4gKiAgICAgc3RhdGlzdGljYWwgcHVycG9zZXMuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBvcHQudGltZUxpbWl0IE1heGltdW0gZXhlY3V0aW9uIHRpbWUuIFVzZSA8PSAwIGZvciBpbmZpbml0ZS5cclxuICovXHJcbmZ1bmN0aW9uIElEQVN0YXJGaW5kZXIob3B0KSB7XHJcbiAgICBvcHQgPSBvcHQgfHwge307XHJcbiAgICB0aGlzLmFsbG93RGlhZ29uYWwgPSBvcHQuYWxsb3dEaWFnb25hbDtcclxuICAgIHRoaXMuZG9udENyb3NzQ29ybmVycyA9IG9wdC5kb250Q3Jvc3NDb3JuZXJzO1xyXG4gICAgdGhpcy5kaWFnb25hbE1vdmVtZW50ID0gb3B0LmRpYWdvbmFsTW92ZW1lbnQ7XHJcbiAgICB0aGlzLmhldXJpc3RpYyA9IG9wdC5oZXVyaXN0aWMgfHwgSGV1cmlzdGljLm1hbmhhdHRhbjtcclxuICAgIHRoaXMud2VpZ2h0ID0gb3B0LndlaWdodCB8fCAxO1xyXG4gICAgdGhpcy50cmFja1JlY3Vyc2lvbiA9IG9wdC50cmFja1JlY3Vyc2lvbiB8fCBmYWxzZTtcclxuICAgIHRoaXMudGltZUxpbWl0ID0gb3B0LnRpbWVMaW1pdCB8fCBJbmZpbml0eTsgLy8gRGVmYXVsdDogbm8gdGltZSBsaW1pdC5cclxuXHJcbiAgICBpZiAoIXRoaXMuZGlhZ29uYWxNb3ZlbWVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5hbGxvd0RpYWdvbmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlhZ29uYWxNb3ZlbWVudCA9IERpYWdvbmFsTW92ZW1lbnQuTmV2ZXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZG9udENyb3NzQ29ybmVycykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWFnb25hbE1vdmVtZW50ID0gRGlhZ29uYWxNb3ZlbWVudC5Pbmx5V2hlbk5vT2JzdGFjbGVzO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWFnb25hbE1vdmVtZW50ID0gRGlhZ29uYWxNb3ZlbWVudC5JZkF0TW9zdE9uZU9ic3RhY2xlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFdoZW4gZGlhZ29uYWwgbW92ZW1lbnQgaXMgYWxsb3dlZCB0aGUgbWFuaGF0dGFuIGhldXJpc3RpYyBpcyBub3RcclxuICAgIC8vIGFkbWlzc2libGUsIGl0IHNob3VsZCBiZSBvY3RpbGUgaW5zdGVhZFxyXG4gICAgaWYgKHRoaXMuZGlhZ29uYWxNb3ZlbWVudCA9PT0gRGlhZ29uYWxNb3ZlbWVudC5OZXZlcikge1xyXG4gICAgICAgIHRoaXMuaGV1cmlzdGljID0gb3B0LmhldXJpc3RpYyB8fCBIZXVyaXN0aWMubWFuaGF0dGFuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmhldXJpc3RpYyA9IG9wdC5oZXVyaXN0aWMgfHwgSGV1cmlzdGljLm9jdGlsZTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmQgYW5kIHJldHVybiB0aGUgdGhlIHBhdGguIFdoZW4gYW4gZW1wdHkgYXJyYXkgaXMgcmV0dXJuZWQsIGVpdGhlclxyXG4gKiBubyBwYXRoIGlzIHBvc3NpYmxlLCBvciB0aGUgbWF4aW11bSBleGVjdXRpb24gdGltZSBpcyByZWFjaGVkLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gVGhlIHBhdGgsIGluY2x1ZGluZyBib3RoIHN0YXJ0IGFuZFxyXG4gKiAgICAgZW5kIHBvc2l0aW9ucy5cclxuICovXHJcbklEQVN0YXJGaW5kZXIucHJvdG90eXBlLmZpbmRQYXRoID0gZnVuY3Rpb24oc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFksIGdyaWQpIHtcclxuICAgIC8vIFVzZWQgZm9yIHN0YXRpc3RpY3M6XHJcbiAgICB2YXIgbm9kZXNWaXNpdGVkID0gMDtcclxuXHJcbiAgICAvLyBFeGVjdXRpb24gdGltZSBsaW1pdGF0aW9uOlxyXG4gICAgdmFyIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cclxuICAgIC8vIEhldXJpc3RpYyBoZWxwZXI6XHJcbiAgICB2YXIgaCA9IGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZXVyaXN0aWMoTWF0aC5hYnMoYi54IC0gYS54KSwgTWF0aC5hYnMoYi55IC0gYS55KSk7XHJcbiAgICB9LmJpbmQodGhpcyk7XHJcblxyXG4gICAgLy8gU3RlcCBjb3N0IGZyb20gYSB0byBiOlxyXG4gICAgdmFyIGNvc3QgPSBmdW5jdGlvbihhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIChhLnggPT09IGIueCB8fCBhLnkgPT09IGIueSkgPyAxIDogTWF0aC5TUVJUMjtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJREEqIHNlYXJjaCBpbXBsZW1lbnRhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge05vZGV9IFRoZSBub2RlIGN1cnJlbnRseSBleHBhbmRpbmcgZnJvbS5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBDb3N0IHRvIHJlYWNoIHRoZSBnaXZlbiBub2RlLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IE1heGltdW0gc2VhcmNoIGRlcHRoIChjdXQtb2ZmIHZhbHVlKS5cclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IFRoZSBmb3VuZCByb3V0ZS5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBSZWN1cnNpb24gZGVwdGguXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBlaXRoZXIgYSBudW1iZXIgd2l0aCB0aGUgbmV3IG9wdGltYWwgY3V0LW9mZiBkZXB0aCxcclxuICAgICAqIG9yIGEgdmFsaWQgbm9kZSBpbnN0YW5jZSwgaW4gd2hpY2ggY2FzZSBhIHBhdGggd2FzIGZvdW5kLlxyXG4gICAgICovXHJcbiAgICB2YXIgc2VhcmNoID0gZnVuY3Rpb24obm9kZSwgZywgY3V0b2ZmLCByb3V0ZSwgZGVwdGgpIHtcclxuICAgICAgICBub2Rlc1Zpc2l0ZWQrKztcclxuXHJcbiAgICAgICAgLy8gRW5mb3JjZSB0aW1lbGltaXQ6XHJcbiAgICAgICAgaWYgKHRoaXMudGltZUxpbWl0ID4gMCAmJlxyXG4gICAgICAgICAgICBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHN0YXJ0VGltZSA+IHRoaXMudGltZUxpbWl0ICogMTAwMCkge1xyXG4gICAgICAgICAgICAvLyBFbmZvcmNlZCBhcyBcInBhdGgtbm90LWZvdW5kXCIuXHJcbiAgICAgICAgICAgIHJldHVybiBJbmZpbml0eTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBmID0gZyArIGgobm9kZSwgZW5kKSAqIHRoaXMud2VpZ2h0O1xyXG5cclxuICAgICAgICAvLyBXZSd2ZSBzZWFyY2hlZCB0b28gZGVlcCBmb3IgdGhpcyBpdGVyYXRpb24uXHJcbiAgICAgICAgaWYgKGYgPiBjdXRvZmYpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobm9kZSA9PSBlbmQpIHtcclxuICAgICAgICAgICAgcm91dGVbZGVwdGhdID0gW25vZGUueCwgbm9kZS55XTtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbWluLCB0LCBrLCBuZWlnaGJvdXI7XHJcblxyXG4gICAgICAgIHZhciBuZWlnaGJvdXJzID0gZ3JpZC5nZXROZWlnaGJvcnMobm9kZSwgdGhpcy5kaWFnb25hbE1vdmVtZW50KTtcclxuXHJcbiAgICAgICAgLy8gU29ydCB0aGUgbmVpZ2hib3VycywgZ2l2ZXMgbmljZXIgcGF0aHMuIEJ1dCwgdGhpcyBkZXZpYXRlc1xyXG4gICAgICAgIC8vIGZyb20gdGhlIG9yaWdpbmFsIGFsZ29yaXRobSAtIHNvIEkgbGVmdCBpdCBvdXQuXHJcbiAgICAgICAgLy9uZWlnaGJvdXJzLnNvcnQoZnVuY3Rpb24oYSwgYil7XHJcbiAgICAgICAgLy8gICAgcmV0dXJuIGgoYSwgZW5kKSAtIGgoYiwgZW5kKTtcclxuICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICAvKmpzaGludCAtVzA4NCAqLy8vRGlzYWJsZSB3YXJuaW5nOiBFeHBlY3RlZCBhIGNvbmRpdGlvbmFsIGV4cHJlc3Npb24gYW5kIGluc3RlYWQgc2F3IGFuIGFzc2lnbm1lbnRcclxuICAgICAgICBmb3IgKGsgPSAwLCBtaW4gPSBJbmZpbml0eTsgbmVpZ2hib3VyID0gbmVpZ2hib3Vyc1trXTsgKytrKSB7XHJcbiAgICAgICAgLypqc2hpbnQgK1cwODQgKi8vL0VuYWJsZSB3YXJuaW5nOiBFeHBlY3RlZCBhIGNvbmRpdGlvbmFsIGV4cHJlc3Npb24gYW5kIGluc3RlYWQgc2F3IGFuIGFzc2lnbm1lbnRcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2tSZWN1cnNpb24pIHtcclxuICAgICAgICAgICAgICAgIC8vIFJldGFpbiBhIGNvcHkgZm9yIHZpc3VhbGlzYXRpb24uIER1ZSB0byByZWN1cnNpb24sIHRoaXNcclxuICAgICAgICAgICAgICAgIC8vIG5vZGUgbWF5IGJlIHBhcnQgb2Ygb3RoZXIgcGF0aHMgdG9vLlxyXG4gICAgICAgICAgICAgICAgbmVpZ2hib3VyLnJldGFpbkNvdW50ID0gbmVpZ2hib3VyLnJldGFpbkNvdW50ICsgMSB8fCAxO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKG5laWdoYm91ci50ZXN0ZWQgIT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZWlnaGJvdXIudGVzdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdCA9IHNlYXJjaChuZWlnaGJvdXIsIGcgKyBjb3N0KG5vZGUsIG5laWdoYm91ciksIGN1dG9mZiwgcm91dGUsIGRlcHRoICsgMSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodCBpbnN0YW5jZW9mIE5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlW2RlcHRoXSA9IFtub2RlLngsIG5vZGUueV07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRm9yIGEgdHlwaWNhbCBBKiBsaW5rZWQgbGlzdCwgdGhpcyB3b3VsZCB3b3JrOlxyXG4gICAgICAgICAgICAgICAgLy8gbmVpZ2hib3VyLnBhcmVudCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRGVjcmVtZW50IGNvdW50LCB0aGVuIGRldGVybWluZSB3aGV0aGVyIGl0J3MgYWN0dWFsbHkgY2xvc2VkLlxyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFja1JlY3Vyc2lvbiAmJiAoLS1uZWlnaGJvdXIucmV0YWluQ291bnQpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBuZWlnaGJvdXIudGVzdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0IDwgbWluKSB7XHJcbiAgICAgICAgICAgICAgICBtaW4gPSB0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWluO1xyXG5cclxuICAgIH0uYmluZCh0aGlzKTtcclxuXHJcbiAgICAvLyBOb2RlIGluc3RhbmNlIGxvb2t1cHM6XHJcbiAgICB2YXIgc3RhcnQgPSBncmlkLmdldE5vZGVBdChzdGFydFgsIHN0YXJ0WSk7XHJcbiAgICB2YXIgZW5kICAgPSBncmlkLmdldE5vZGVBdChlbmRYLCBlbmRZKTtcclxuXHJcbiAgICAvLyBJbml0aWFsIHNlYXJjaCBkZXB0aCwgZ2l2ZW4gdGhlIHR5cGljYWwgaGV1cmlzdGljIGNvbnRyYWludHMsXHJcbiAgICAvLyB0aGVyZSBzaG91bGQgYmUgbm8gY2hlYXBlciByb3V0ZSBwb3NzaWJsZS5cclxuICAgIHZhciBjdXRPZmYgPSBoKHN0YXJ0LCBlbmQpO1xyXG5cclxuICAgIHZhciBqLCByb3V0ZSwgdDtcclxuXHJcbiAgICAvLyBXaXRoIGFuIG92ZXJmbG93IHByb3RlY3Rpb24uXHJcbiAgICBmb3IgKGogPSAwOyB0cnVlOyArK2opIHtcclxuXHJcbiAgICAgICAgcm91dGUgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gU2VhcmNoIHRpbGwgY3V0LW9mZiBkZXB0aDpcclxuICAgICAgICB0ID0gc2VhcmNoKHN0YXJ0LCAwLCBjdXRPZmYsIHJvdXRlLCAwKTtcclxuXHJcbiAgICAgICAgLy8gUm91dGUgbm90IHBvc3NpYmxlLCBvciBub3QgZm91bmQgaW4gdGltZSBsaW1pdC5cclxuICAgICAgICBpZiAodCA9PT0gSW5maW5pdHkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgdCBpcyBhIG5vZGUsIGl0J3MgYWxzbyB0aGUgZW5kIG5vZGUuIFJvdXRlIGlzIG5vd1xyXG4gICAgICAgIC8vIHBvcHVsYXRlZCB3aXRoIGEgdmFsaWQgcGF0aCB0byB0aGUgZW5kIG5vZGUuXHJcbiAgICAgICAgaWYgKHQgaW5zdGFuY2VvZiBOb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByb3V0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRyeSBhZ2FpbiwgdGhpcyB0aW1lIHdpdGggYSBkZWVwZXIgY3V0LW9mZi4gVGhlIHQgc2NvcmVcclxuICAgICAgICAvLyBpcyB0aGUgY2xvc2VzdCB3ZSBnb3QgdG8gdGhlIGVuZCBub2RlLlxyXG4gICAgICAgIGN1dE9mZiA9IHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhpcyBfc2hvdWxkXyBuZXZlciB0byBiZSByZWFjaGVkLlxyXG4gICAgcmV0dXJuIFtdO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJREFTdGFyRmluZGVyO1xyXG4iLCIvKipcclxuICogQGF1dGhvciBpbW9yIC8gaHR0cHM6Ly9naXRodWIuY29tL2ltb3JcclxuICovXHJcbnZhciBKdW1wUG9pbnRGaW5kZXJCYXNlID0gcmVxdWlyZSgnLi9KdW1wUG9pbnRGaW5kZXJCYXNlJyk7XHJcbnZhciBEaWFnb25hbE1vdmVtZW50ID0gcmVxdWlyZSgnLi4vY29yZS9EaWFnb25hbE1vdmVtZW50Jyk7XHJcblxyXG4vKipcclxuICogUGF0aCBmaW5kZXIgdXNpbmcgdGhlIEp1bXAgUG9pbnQgU2VhcmNoIGFsZ29yaXRobSB3aGljaCBhbHdheXMgbW92ZXNcclxuICogZGlhZ29uYWxseSBpcnJlc3BlY3RpdmUgb2YgdGhlIG51bWJlciBvZiBvYnN0YWNsZXMuXHJcbiAqL1xyXG5mdW5jdGlvbiBKUEZBbHdheXNNb3ZlRGlhZ29uYWxseShvcHQpIHtcclxuICAgIEp1bXBQb2ludEZpbmRlckJhc2UuY2FsbCh0aGlzLCBvcHQpO1xyXG59XHJcblxyXG5KUEZBbHdheXNNb3ZlRGlhZ29uYWxseS5wcm90b3R5cGUgPSBuZXcgSnVtcFBvaW50RmluZGVyQmFzZSgpO1xyXG5KUEZBbHdheXNNb3ZlRGlhZ29uYWxseS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBKUEZBbHdheXNNb3ZlRGlhZ29uYWxseTtcclxuXHJcbi8qKlxyXG4gKiBTZWFyY2ggcmVjdXJzaXZlbHkgaW4gdGhlIGRpcmVjdGlvbiAocGFyZW50IC0+IGNoaWxkKSwgc3RvcHBpbmcgb25seSB3aGVuIGFcclxuICoganVtcCBwb2ludCBpcyBmb3VuZC5cclxuICogQHByb3RlY3RlZFxyXG4gKiBAcmV0dXJuIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gVGhlIHgsIHkgY29vcmRpbmF0ZSBvZiB0aGUganVtcCBwb2ludFxyXG4gKiAgICAgZm91bmQsIG9yIG51bGwgaWYgbm90IGZvdW5kXHJcbiAqL1xyXG5KUEZBbHdheXNNb3ZlRGlhZ29uYWxseS5wcm90b3R5cGUuX2p1bXAgPSBmdW5jdGlvbih4LCB5LCBweCwgcHkpIHtcclxuICAgIHZhciBncmlkID0gdGhpcy5ncmlkLFxyXG4gICAgICAgIGR4ID0geCAtIHB4LCBkeSA9IHkgLSBweTtcclxuXHJcbiAgICBpZiAoIWdyaWQuaXNXYWxrYWJsZUF0KHgsIHkpKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYodGhpcy50cmFja0p1bXBSZWN1cnNpb24gPT09IHRydWUpIHtcclxuICAgICAgICBncmlkLmdldE5vZGVBdCh4LCB5KS50ZXN0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChncmlkLmdldE5vZGVBdCh4LCB5KSA9PT0gdGhpcy5lbmROb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIFt4LCB5XTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjaGVjayBmb3IgZm9yY2VkIG5laWdoYm9yc1xyXG4gICAgLy8gYWxvbmcgdGhlIGRpYWdvbmFsXHJcbiAgICBpZiAoZHggIT09IDAgJiYgZHkgIT09IDApIHtcclxuICAgICAgICBpZiAoKGdyaWQuaXNXYWxrYWJsZUF0KHggLSBkeCwgeSArIGR5KSAmJiAhZ3JpZC5pc1dhbGthYmxlQXQoeCAtIGR4LCB5KSkgfHxcclxuICAgICAgICAgICAgKGdyaWQuaXNXYWxrYWJsZUF0KHggKyBkeCwgeSAtIGR5KSAmJiAhZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSAtIGR5KSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFt4LCB5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gd2hlbiBtb3ZpbmcgZGlhZ29uYWxseSwgbXVzdCBjaGVjayBmb3IgdmVydGljYWwvaG9yaXpvbnRhbCBqdW1wIHBvaW50c1xyXG4gICAgICAgIGlmICh0aGlzLl9qdW1wKHggKyBkeCwgeSwgeCwgeSkgfHwgdGhpcy5fanVtcCh4LCB5ICsgZHksIHgsIHkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbeCwgeV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gaG9yaXpvbnRhbGx5L3ZlcnRpY2FsbHlcclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlmKCBkeCAhPT0gMCApIHsgLy8gbW92aW5nIGFsb25nIHhcclxuICAgICAgICAgICAgaWYoKGdyaWQuaXNXYWxrYWJsZUF0KHggKyBkeCwgeSArIDEpICYmICFncmlkLmlzV2Fsa2FibGVBdCh4LCB5ICsgMSkpIHx8XHJcbiAgICAgICAgICAgICAgIChncmlkLmlzV2Fsa2FibGVBdCh4ICsgZHgsIHkgLSAxKSAmJiAhZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSAtIDEpKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFt4LCB5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYoKGdyaWQuaXNXYWxrYWJsZUF0KHggKyAxLCB5ICsgZHkpICYmICFncmlkLmlzV2Fsa2FibGVBdCh4ICsgMSwgeSkpIHx8XHJcbiAgICAgICAgICAgICAgIChncmlkLmlzV2Fsa2FibGVBdCh4IC0gMSwgeSArIGR5KSAmJiAhZ3JpZC5pc1dhbGthYmxlQXQoeCAtIDEsIHkpKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFt4LCB5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fanVtcCh4ICsgZHgsIHkgKyBkeSwgeCwgeSk7XHJcbn07XHJcblxyXG4vKipcclxuICogRmluZCB0aGUgbmVpZ2hib3JzIGZvciB0aGUgZ2l2ZW4gbm9kZS4gSWYgdGhlIG5vZGUgaGFzIGEgcGFyZW50LFxyXG4gKiBwcnVuZSB0aGUgbmVpZ2hib3JzIGJhc2VkIG9uIHRoZSBqdW1wIHBvaW50IHNlYXJjaCBhbGdvcml0aG0sIG90aGVyd2lzZVxyXG4gKiByZXR1cm4gYWxsIGF2YWlsYWJsZSBuZWlnaGJvcnMuXHJcbiAqIEByZXR1cm4ge0FycmF5PEFycmF5PG51bWJlcj4+fSBUaGUgbmVpZ2hib3JzIGZvdW5kLlxyXG4gKi9cclxuSlBGQWx3YXlzTW92ZURpYWdvbmFsbHkucHJvdG90eXBlLl9maW5kTmVpZ2hib3JzID0gZnVuY3Rpb24obm9kZSkge1xyXG4gICAgdmFyIHBhcmVudCA9IG5vZGUucGFyZW50LFxyXG4gICAgICAgIHggPSBub2RlLngsIHkgPSBub2RlLnksXHJcbiAgICAgICAgZ3JpZCA9IHRoaXMuZ3JpZCxcclxuICAgICAgICBweCwgcHksIG54LCBueSwgZHgsIGR5LFxyXG4gICAgICAgIG5laWdoYm9ycyA9IFtdLCBuZWlnaGJvck5vZGVzLCBuZWlnaGJvck5vZGUsIGksIGw7XHJcblxyXG4gICAgLy8gZGlyZWN0ZWQgcHJ1bmluZzogY2FuIGlnbm9yZSBtb3N0IG5laWdoYm9ycywgdW5sZXNzIGZvcmNlZC5cclxuICAgIGlmIChwYXJlbnQpIHtcclxuICAgICAgICBweCA9IHBhcmVudC54O1xyXG4gICAgICAgIHB5ID0gcGFyZW50Lnk7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBub3JtYWxpemVkIGRpcmVjdGlvbiBvZiB0cmF2ZWxcclxuICAgICAgICBkeCA9ICh4IC0gcHgpIC8gTWF0aC5tYXgoTWF0aC5hYnMoeCAtIHB4KSwgMSk7XHJcbiAgICAgICAgZHkgPSAoeSAtIHB5KSAvIE1hdGgubWF4KE1hdGguYWJzKHkgLSBweSksIDEpO1xyXG5cclxuICAgICAgICAvLyBzZWFyY2ggZGlhZ29uYWxseVxyXG4gICAgICAgIGlmIChkeCAhPT0gMCAmJiBkeSAhPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSArIGR5KSkge1xyXG4gICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3gsIHkgKyBkeV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChncmlkLmlzV2Fsa2FibGVBdCh4ICsgZHgsIHkpKSB7XHJcbiAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCArIGR4LCB5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGdyaWQuaXNXYWxrYWJsZUF0KHggKyBkeCwgeSArIGR5KSkge1xyXG4gICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggKyBkeCwgeSArIGR5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFncmlkLmlzV2Fsa2FibGVBdCh4IC0gZHgsIHkpKSB7XHJcbiAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCAtIGR4LCB5ICsgZHldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgLSBkeSkpIHtcclxuICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgZHgsIHkgLSBkeV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNlYXJjaCBob3Jpem9udGFsbHkvdmVydGljYWxseVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZihkeCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgKyBkeSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCwgeSArIGR5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWdyaWQuaXNXYWxrYWJsZUF0KHggKyAxLCB5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgMSwgeSArIGR5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWdyaWQuaXNXYWxrYWJsZUF0KHggLSAxLCB5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4IC0gMSwgeSArIGR5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ3JpZC5pc1dhbGthYmxlQXQoeCArIGR4LCB5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgZHgsIHldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSArIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggKyBkeCwgeSArIDFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggKyBkeCwgeSAtIDFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIHJldHVybiBhbGwgbmVpZ2hib3JzXHJcbiAgICBlbHNlIHtcclxuICAgICAgICBuZWlnaGJvck5vZGVzID0gZ3JpZC5nZXROZWlnaGJvcnMobm9kZSwgRGlhZ29uYWxNb3ZlbWVudC5BbHdheXMpO1xyXG4gICAgICAgIGZvciAoaSA9IDAsIGwgPSBuZWlnaGJvck5vZGVzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xyXG4gICAgICAgICAgICBuZWlnaGJvck5vZGUgPSBuZWlnaGJvck5vZGVzW2ldO1xyXG4gICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbbmVpZ2hib3JOb2RlLngsIG5laWdoYm9yTm9kZS55XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZWlnaGJvcnM7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEpQRkFsd2F5c01vdmVEaWFnb25hbGx5O1xyXG4iLCIvKipcclxuICogQGF1dGhvciBpbW9yIC8gaHR0cHM6Ly9naXRodWIuY29tL2ltb3JcclxuICovXHJcbnZhciBKdW1wUG9pbnRGaW5kZXJCYXNlID0gcmVxdWlyZSgnLi9KdW1wUG9pbnRGaW5kZXJCYXNlJyk7XHJcbnZhciBEaWFnb25hbE1vdmVtZW50ID0gcmVxdWlyZSgnLi4vY29yZS9EaWFnb25hbE1vdmVtZW50Jyk7XHJcblxyXG4vKipcclxuICogUGF0aCBmaW5kZXIgdXNpbmcgdGhlIEp1bXAgUG9pbnQgU2VhcmNoIGFsZ29yaXRobSB3aGljaCBtb3Zlc1xyXG4gKiBkaWFnb25hbGx5IG9ubHkgd2hlbiB0aGVyZSBpcyBhdCBtb3N0IG9uZSBvYnN0YWNsZS5cclxuICovXHJcbmZ1bmN0aW9uIEpQRk1vdmVEaWFnb25hbGx5SWZBdE1vc3RPbmVPYnN0YWNsZShvcHQpIHtcclxuICAgIEp1bXBQb2ludEZpbmRlckJhc2UuY2FsbCh0aGlzLCBvcHQpO1xyXG59XHJcblxyXG5KUEZNb3ZlRGlhZ29uYWxseUlmQXRNb3N0T25lT2JzdGFjbGUucHJvdG90eXBlID0gbmV3IEp1bXBQb2ludEZpbmRlckJhc2UoKTtcclxuSlBGTW92ZURpYWdvbmFsbHlJZkF0TW9zdE9uZU9ic3RhY2xlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEpQRk1vdmVEaWFnb25hbGx5SWZBdE1vc3RPbmVPYnN0YWNsZTtcclxuXHJcbi8qKlxyXG4gKiBTZWFyY2ggcmVjdXJzaXZlbHkgaW4gdGhlIGRpcmVjdGlvbiAocGFyZW50IC0+IGNoaWxkKSwgc3RvcHBpbmcgb25seSB3aGVuIGFcclxuICoganVtcCBwb2ludCBpcyBmb3VuZC5cclxuICogQHByb3RlY3RlZFxyXG4gKiBAcmV0dXJuIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gVGhlIHgsIHkgY29vcmRpbmF0ZSBvZiB0aGUganVtcCBwb2ludFxyXG4gKiAgICAgZm91bmQsIG9yIG51bGwgaWYgbm90IGZvdW5kXHJcbiAqL1xyXG5KUEZNb3ZlRGlhZ29uYWxseUlmQXRNb3N0T25lT2JzdGFjbGUucHJvdG90eXBlLl9qdW1wID0gZnVuY3Rpb24oeCwgeSwgcHgsIHB5KSB7XHJcbiAgICB2YXIgZ3JpZCA9IHRoaXMuZ3JpZCxcclxuICAgICAgICBkeCA9IHggLSBweCwgZHkgPSB5IC0gcHk7XHJcblxyXG4gICAgaWYgKCFncmlkLmlzV2Fsa2FibGVBdCh4LCB5KSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHRoaXMudHJhY2tKdW1wUmVjdXJzaW9uID09PSB0cnVlKSB7XHJcbiAgICAgICAgZ3JpZC5nZXROb2RlQXQoeCwgeSkudGVzdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZ3JpZC5nZXROb2RlQXQoeCwgeSkgPT09IHRoaXMuZW5kTm9kZSkge1xyXG4gICAgICAgIHJldHVybiBbeCwgeV07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2hlY2sgZm9yIGZvcmNlZCBuZWlnaGJvcnNcclxuICAgIC8vIGFsb25nIHRoZSBkaWFnb25hbFxyXG4gICAgaWYgKGR4ICE9PSAwICYmIGR5ICE9PSAwKSB7XHJcbiAgICAgICAgaWYgKChncmlkLmlzV2Fsa2FibGVBdCh4IC0gZHgsIHkgKyBkeSkgJiYgIWdyaWQuaXNXYWxrYWJsZUF0KHggLSBkeCwgeSkpIHx8XHJcbiAgICAgICAgICAgIChncmlkLmlzV2Fsa2FibGVBdCh4ICsgZHgsIHkgLSBkeSkgJiYgIWdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgLSBkeSkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbeCwgeV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHdoZW4gbW92aW5nIGRpYWdvbmFsbHksIG11c3QgY2hlY2sgZm9yIHZlcnRpY2FsL2hvcml6b250YWwganVtcCBwb2ludHNcclxuICAgICAgICBpZiAodGhpcy5fanVtcCh4ICsgZHgsIHksIHgsIHkpIHx8IHRoaXMuX2p1bXAoeCwgeSArIGR5LCB4LCB5KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gW3gsIHldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGhvcml6b250YWxseS92ZXJ0aWNhbGx5XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpZiggZHggIT09IDAgKSB7IC8vIG1vdmluZyBhbG9uZyB4XHJcbiAgICAgICAgICAgIGlmKChncmlkLmlzV2Fsa2FibGVBdCh4ICsgZHgsIHkgKyAxKSAmJiAhZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSArIDEpKSB8fFxyXG4gICAgICAgICAgICAgICAoZ3JpZC5pc1dhbGthYmxlQXQoeCArIGR4LCB5IC0gMSkgJiYgIWdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgLSAxKSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbeCwgeV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmKChncmlkLmlzV2Fsa2FibGVBdCh4ICsgMSwgeSArIGR5KSAmJiAhZ3JpZC5pc1dhbGthYmxlQXQoeCArIDEsIHkpKSB8fFxyXG4gICAgICAgICAgICAgICAoZ3JpZC5pc1dhbGthYmxlQXQoeCAtIDEsIHkgKyBkeSkgJiYgIWdyaWQuaXNXYWxrYWJsZUF0KHggLSAxLCB5KSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbeCwgeV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbW92aW5nIGRpYWdvbmFsbHksIG11c3QgbWFrZSBzdXJlIG9uZSBvZiB0aGUgdmVydGljYWwvaG9yaXpvbnRhbFxyXG4gICAgLy8gbmVpZ2hib3JzIGlzIG9wZW4gdG8gYWxsb3cgdGhlIHBhdGhcclxuICAgIGlmIChncmlkLmlzV2Fsa2FibGVBdCh4ICsgZHgsIHkpIHx8IGdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgKyBkeSkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fanVtcCh4ICsgZHgsIHkgKyBkeSwgeCwgeSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZpbmQgdGhlIG5laWdoYm9ycyBmb3IgdGhlIGdpdmVuIG5vZGUuIElmIHRoZSBub2RlIGhhcyBhIHBhcmVudCxcclxuICogcHJ1bmUgdGhlIG5laWdoYm9ycyBiYXNlZCBvbiB0aGUganVtcCBwb2ludCBzZWFyY2ggYWxnb3JpdGhtLCBvdGhlcndpc2VcclxuICogcmV0dXJuIGFsbCBhdmFpbGFibGUgbmVpZ2hib3JzLlxyXG4gKiBAcmV0dXJuIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gVGhlIG5laWdoYm9ycyBmb3VuZC5cclxuICovXHJcbkpQRk1vdmVEaWFnb25hbGx5SWZBdE1vc3RPbmVPYnN0YWNsZS5wcm90b3R5cGUuX2ZpbmROZWlnaGJvcnMgPSBmdW5jdGlvbihub2RlKSB7XHJcbiAgICB2YXIgcGFyZW50ID0gbm9kZS5wYXJlbnQsXHJcbiAgICAgICAgeCA9IG5vZGUueCwgeSA9IG5vZGUueSxcclxuICAgICAgICBncmlkID0gdGhpcy5ncmlkLFxyXG4gICAgICAgIHB4LCBweSwgbngsIG55LCBkeCwgZHksXHJcbiAgICAgICAgbmVpZ2hib3JzID0gW10sIG5laWdoYm9yTm9kZXMsIG5laWdoYm9yTm9kZSwgaSwgbDtcclxuXHJcbiAgICAvLyBkaXJlY3RlZCBwcnVuaW5nOiBjYW4gaWdub3JlIG1vc3QgbmVpZ2hib3JzLCB1bmxlc3MgZm9yY2VkLlxyXG4gICAgaWYgKHBhcmVudCkge1xyXG4gICAgICAgIHB4ID0gcGFyZW50Lng7XHJcbiAgICAgICAgcHkgPSBwYXJlbnQueTtcclxuICAgICAgICAvLyBnZXQgdGhlIG5vcm1hbGl6ZWQgZGlyZWN0aW9uIG9mIHRyYXZlbFxyXG4gICAgICAgIGR4ID0gKHggLSBweCkgLyBNYXRoLm1heChNYXRoLmFicyh4IC0gcHgpLCAxKTtcclxuICAgICAgICBkeSA9ICh5IC0gcHkpIC8gTWF0aC5tYXgoTWF0aC5hYnMoeSAtIHB5KSwgMSk7XHJcblxyXG4gICAgICAgIC8vIHNlYXJjaCBkaWFnb25hbGx5XHJcbiAgICAgICAgaWYgKGR4ICE9PSAwICYmIGR5ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChncmlkLmlzV2Fsa2FibGVBdCh4LCB5ICsgZHkpKSB7XHJcbiAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCwgeSArIGR5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGdyaWQuaXNXYWxrYWJsZUF0KHggKyBkeCwgeSkpIHtcclxuICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgZHgsIHldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSArIGR5KSB8fCBncmlkLmlzV2Fsa2FibGVBdCh4ICsgZHgsIHkpKSB7XHJcbiAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCArIGR4LCB5ICsgZHldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWdyaWQuaXNXYWxrYWJsZUF0KHggLSBkeCwgeSkgJiYgZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSArIGR5KSkge1xyXG4gICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggLSBkeCwgeSArIGR5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFncmlkLmlzV2Fsa2FibGVBdCh4LCB5IC0gZHkpICYmIGdyaWQuaXNXYWxrYWJsZUF0KHggKyBkeCwgeSkpIHtcclxuICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgZHgsIHkgLSBkeV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNlYXJjaCBob3Jpem9udGFsbHkvdmVydGljYWxseVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZihkeCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgKyBkeSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCwgeSArIGR5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFncmlkLmlzV2Fsa2FibGVBdCh4ICsgMSwgeSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggKyAxLCB5ICsgZHldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFncmlkLmlzV2Fsa2FibGVBdCh4IC0gMSwgeSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggLSAxLCB5ICsgZHldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ3JpZC5pc1dhbGthYmxlQXQoeCArIGR4LCB5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgZHgsIHldKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgKyAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCArIGR4LCB5ICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCArIGR4LCB5IC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIHJldHVybiBhbGwgbmVpZ2hib3JzXHJcbiAgICBlbHNlIHtcclxuICAgICAgICBuZWlnaGJvck5vZGVzID0gZ3JpZC5nZXROZWlnaGJvcnMobm9kZSwgRGlhZ29uYWxNb3ZlbWVudC5JZkF0TW9zdE9uZU9ic3RhY2xlKTtcclxuICAgICAgICBmb3IgKGkgPSAwLCBsID0gbmVpZ2hib3JOb2Rlcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcclxuICAgICAgICAgICAgbmVpZ2hib3JOb2RlID0gbmVpZ2hib3JOb2Rlc1tpXTtcclxuICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW25laWdoYm9yTm9kZS54LCBuZWlnaGJvck5vZGUueV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmVpZ2hib3JzO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBKUEZNb3ZlRGlhZ29uYWxseUlmQXRNb3N0T25lT2JzdGFjbGU7XHJcbiIsIi8qKlxyXG4gKiBAYXV0aG9yIGltb3IgLyBodHRwczovL2dpdGh1Yi5jb20vaW1vclxyXG4gKi9cclxudmFyIEp1bXBQb2ludEZpbmRlckJhc2UgPSByZXF1aXJlKCcuL0p1bXBQb2ludEZpbmRlckJhc2UnKTtcclxudmFyIERpYWdvbmFsTW92ZW1lbnQgPSByZXF1aXJlKCcuLi9jb3JlL0RpYWdvbmFsTW92ZW1lbnQnKTtcclxuXHJcbi8qKlxyXG4gKiBQYXRoIGZpbmRlciB1c2luZyB0aGUgSnVtcCBQb2ludCBTZWFyY2ggYWxnb3JpdGhtIHdoaWNoIG1vdmVzXHJcbiAqIGRpYWdvbmFsbHkgb25seSB3aGVuIHRoZXJlIGFyZSBubyBvYnN0YWNsZXMuXHJcbiAqL1xyXG5mdW5jdGlvbiBKUEZNb3ZlRGlhZ29uYWxseUlmTm9PYnN0YWNsZXMob3B0KSB7XHJcbiAgICBKdW1wUG9pbnRGaW5kZXJCYXNlLmNhbGwodGhpcywgb3B0KTtcclxufVxyXG5cclxuSlBGTW92ZURpYWdvbmFsbHlJZk5vT2JzdGFjbGVzLnByb3RvdHlwZSA9IG5ldyBKdW1wUG9pbnRGaW5kZXJCYXNlKCk7XHJcbkpQRk1vdmVEaWFnb25hbGx5SWZOb09ic3RhY2xlcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBKUEZNb3ZlRGlhZ29uYWxseUlmTm9PYnN0YWNsZXM7XHJcblxyXG4vKipcclxuICogU2VhcmNoIHJlY3Vyc2l2ZWx5IGluIHRoZSBkaXJlY3Rpb24gKHBhcmVudCAtPiBjaGlsZCksIHN0b3BwaW5nIG9ubHkgd2hlbiBhXHJcbiAqIGp1bXAgcG9pbnQgaXMgZm91bmQuXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHJldHVybiB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IFRoZSB4LCB5IGNvb3JkaW5hdGUgb2YgdGhlIGp1bXAgcG9pbnRcclxuICogICAgIGZvdW5kLCBvciBudWxsIGlmIG5vdCBmb3VuZFxyXG4gKi9cclxuSlBGTW92ZURpYWdvbmFsbHlJZk5vT2JzdGFjbGVzLnByb3RvdHlwZS5fanVtcCA9IGZ1bmN0aW9uKHgsIHksIHB4LCBweSkge1xyXG4gICAgdmFyIGdyaWQgPSB0aGlzLmdyaWQsXHJcbiAgICAgICAgZHggPSB4IC0gcHgsIGR5ID0geSAtIHB5O1xyXG5cclxuICAgIGlmICghZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSkpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpZih0aGlzLnRyYWNrSnVtcFJlY3Vyc2lvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGdyaWQuZ2V0Tm9kZUF0KHgsIHkpLnRlc3RlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGdyaWQuZ2V0Tm9kZUF0KHgsIHkpID09PSB0aGlzLmVuZE5vZGUpIHtcclxuICAgICAgICByZXR1cm4gW3gsIHldO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNoZWNrIGZvciBmb3JjZWQgbmVpZ2hib3JzXHJcbiAgICAvLyBhbG9uZyB0aGUgZGlhZ29uYWxcclxuICAgIGlmIChkeCAhPT0gMCAmJiBkeSAhPT0gMCkge1xyXG4gICAgICAgIC8vIGlmICgoZ3JpZC5pc1dhbGthYmxlQXQoeCAtIGR4LCB5ICsgZHkpICYmICFncmlkLmlzV2Fsa2FibGVBdCh4IC0gZHgsIHkpKSB8fFxyXG4gICAgICAgICAgICAvLyAoZ3JpZC5pc1dhbGthYmxlQXQoeCArIGR4LCB5IC0gZHkpICYmICFncmlkLmlzV2Fsa2FibGVBdCh4LCB5IC0gZHkpKSkge1xyXG4gICAgICAgICAgICAvLyByZXR1cm4gW3gsIHldO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyB3aGVuIG1vdmluZyBkaWFnb25hbGx5LCBtdXN0IGNoZWNrIGZvciB2ZXJ0aWNhbC9ob3Jpem9udGFsIGp1bXAgcG9pbnRzXHJcbiAgICAgICAgaWYgKHRoaXMuX2p1bXAoeCArIGR4LCB5LCB4LCB5KSB8fCB0aGlzLl9qdW1wKHgsIHkgKyBkeSwgeCwgeSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFt4LCB5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBob3Jpem9udGFsbHkvdmVydGljYWxseVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKGR4ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmICgoZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSAtIDEpICYmICFncmlkLmlzV2Fsa2FibGVBdCh4IC0gZHgsIHkgLSAxKSkgfHxcclxuICAgICAgICAgICAgICAgIChncmlkLmlzV2Fsa2FibGVBdCh4LCB5ICsgMSkgJiYgIWdyaWQuaXNXYWxrYWJsZUF0KHggLSBkeCwgeSArIDEpKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFt4LCB5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkeSAhPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoKGdyaWQuaXNXYWxrYWJsZUF0KHggLSAxLCB5KSAmJiAhZ3JpZC5pc1dhbGthYmxlQXQoeCAtIDEsIHkgLSBkeSkpIHx8XHJcbiAgICAgICAgICAgICAgICAoZ3JpZC5pc1dhbGthYmxlQXQoeCArIDEsIHkpICYmICFncmlkLmlzV2Fsa2FibGVBdCh4ICsgMSwgeSAtIGR5KSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbeCwgeV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gV2hlbiBtb3ZpbmcgdmVydGljYWxseSwgbXVzdCBjaGVjayBmb3IgaG9yaXpvbnRhbCBqdW1wIHBvaW50c1xyXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5fanVtcCh4ICsgMSwgeSwgeCwgeSkgfHwgdGhpcy5fanVtcCh4IC0gMSwgeSwgeCwgeSkpIHtcclxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBbeCwgeV07XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbW92aW5nIGRpYWdvbmFsbHksIG11c3QgbWFrZSBzdXJlIG9uZSBvZiB0aGUgdmVydGljYWwvaG9yaXpvbnRhbFxyXG4gICAgLy8gbmVpZ2hib3JzIGlzIG9wZW4gdG8gYWxsb3cgdGhlIHBhdGhcclxuICAgIGlmIChncmlkLmlzV2Fsa2FibGVBdCh4ICsgZHgsIHkpICYmIGdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgKyBkeSkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fanVtcCh4ICsgZHgsIHkgKyBkeSwgeCwgeSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZpbmQgdGhlIG5laWdoYm9ycyBmb3IgdGhlIGdpdmVuIG5vZGUuIElmIHRoZSBub2RlIGhhcyBhIHBhcmVudCxcclxuICogcHJ1bmUgdGhlIG5laWdoYm9ycyBiYXNlZCBvbiB0aGUganVtcCBwb2ludCBzZWFyY2ggYWxnb3JpdGhtLCBvdGhlcndpc2VcclxuICogcmV0dXJuIGFsbCBhdmFpbGFibGUgbmVpZ2hib3JzLlxyXG4gKiBAcmV0dXJuIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gVGhlIG5laWdoYm9ycyBmb3VuZC5cclxuICovXHJcbkpQRk1vdmVEaWFnb25hbGx5SWZOb09ic3RhY2xlcy5wcm90b3R5cGUuX2ZpbmROZWlnaGJvcnMgPSBmdW5jdGlvbihub2RlKSB7XHJcbiAgICB2YXIgcGFyZW50ID0gbm9kZS5wYXJlbnQsXHJcbiAgICAgICAgeCA9IG5vZGUueCwgeSA9IG5vZGUueSxcclxuICAgICAgICBncmlkID0gdGhpcy5ncmlkLFxyXG4gICAgICAgIHB4LCBweSwgbngsIG55LCBkeCwgZHksXHJcbiAgICAgICAgbmVpZ2hib3JzID0gW10sIG5laWdoYm9yTm9kZXMsIG5laWdoYm9yTm9kZSwgaSwgbDtcclxuXHJcbiAgICAvLyBkaXJlY3RlZCBwcnVuaW5nOiBjYW4gaWdub3JlIG1vc3QgbmVpZ2hib3JzLCB1bmxlc3MgZm9yY2VkLlxyXG4gICAgaWYgKHBhcmVudCkge1xyXG4gICAgICAgIHB4ID0gcGFyZW50Lng7XHJcbiAgICAgICAgcHkgPSBwYXJlbnQueTtcclxuICAgICAgICAvLyBnZXQgdGhlIG5vcm1hbGl6ZWQgZGlyZWN0aW9uIG9mIHRyYXZlbFxyXG4gICAgICAgIGR4ID0gKHggLSBweCkgLyBNYXRoLm1heChNYXRoLmFicyh4IC0gcHgpLCAxKTtcclxuICAgICAgICBkeSA9ICh5IC0gcHkpIC8gTWF0aC5tYXgoTWF0aC5hYnMoeSAtIHB5KSwgMSk7XHJcblxyXG4gICAgICAgIC8vIHNlYXJjaCBkaWFnb25hbGx5XHJcbiAgICAgICAgaWYgKGR4ICE9PSAwICYmIGR5ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChncmlkLmlzV2Fsa2FibGVBdCh4LCB5ICsgZHkpKSB7XHJcbiAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCwgeSArIGR5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGdyaWQuaXNXYWxrYWJsZUF0KHggKyBkeCwgeSkpIHtcclxuICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgZHgsIHldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSArIGR5KSAmJiBncmlkLmlzV2Fsa2FibGVBdCh4ICsgZHgsIHkpKSB7XHJcbiAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCArIGR4LCB5ICsgZHldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzZWFyY2ggaG9yaXpvbnRhbGx5L3ZlcnRpY2FsbHlcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGlzTmV4dFdhbGthYmxlO1xyXG4gICAgICAgICAgICBpZiAoZHggIT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlzTmV4dFdhbGthYmxlID0gZ3JpZC5pc1dhbGthYmxlQXQoeCArIGR4LCB5KTtcclxuICAgICAgICAgICAgICAgIHZhciBpc1RvcFdhbGthYmxlID0gZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSArIDEpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzQm90dG9tV2Fsa2FibGUgPSBncmlkLmlzV2Fsa2FibGVBdCh4LCB5IC0gMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzTmV4dFdhbGthYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggKyBkeCwgeV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1RvcFdhbGthYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgZHgsIHkgKyAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0JvdHRvbVdhbGthYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgZHgsIHkgLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzVG9wV2Fsa2FibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCwgeSArIDFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc0JvdHRvbVdhbGthYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3gsIHkgLSAxXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZHkgIT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlzTmV4dFdhbGthYmxlID0gZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSArIGR5KTtcclxuICAgICAgICAgICAgICAgIHZhciBpc1JpZ2h0V2Fsa2FibGUgPSBncmlkLmlzV2Fsa2FibGVBdCh4ICsgMSwgeSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNMZWZ0V2Fsa2FibGUgPSBncmlkLmlzV2Fsa2FibGVBdCh4IC0gMSwgeSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzTmV4dFdhbGthYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3gsIHkgKyBkeV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1JpZ2h0V2Fsa2FibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggKyAxLCB5ICsgZHldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTGVmdFdhbGthYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4IC0gMSwgeSArIGR5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzUmlnaHRXYWxrYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgMSwgeV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzTGVmdFdhbGthYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggLSAxLCB5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyByZXR1cm4gYWxsIG5laWdoYm9yc1xyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgbmVpZ2hib3JOb2RlcyA9IGdyaWQuZ2V0TmVpZ2hib3JzKG5vZGUsIERpYWdvbmFsTW92ZW1lbnQuT25seVdoZW5Ob09ic3RhY2xlcyk7XHJcbiAgICAgICAgZm9yIChpID0gMCwgbCA9IG5laWdoYm9yTm9kZXMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XHJcbiAgICAgICAgICAgIG5laWdoYm9yTm9kZSA9IG5laWdoYm9yTm9kZXNbaV07XHJcbiAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFtuZWlnaGJvck5vZGUueCwgbmVpZ2hib3JOb2RlLnldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5laWdoYm9ycztcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSlBGTW92ZURpYWdvbmFsbHlJZk5vT2JzdGFjbGVzO1xyXG4iLCIvKipcclxuICogQGF1dGhvciBpbW9yIC8gaHR0cHM6Ly9naXRodWIuY29tL2ltb3JcclxuICovXHJcbnZhciBKdW1wUG9pbnRGaW5kZXJCYXNlID0gcmVxdWlyZSgnLi9KdW1wUG9pbnRGaW5kZXJCYXNlJyk7XHJcbnZhciBEaWFnb25hbE1vdmVtZW50ID0gcmVxdWlyZSgnLi4vY29yZS9EaWFnb25hbE1vdmVtZW50Jyk7XHJcblxyXG4vKipcclxuICogUGF0aCBmaW5kZXIgdXNpbmcgdGhlIEp1bXAgUG9pbnQgU2VhcmNoIGFsZ29yaXRobSBhbGxvd2luZyBvbmx5IGhvcml6b250YWxcclxuICogb3IgdmVydGljYWwgbW92ZW1lbnRzLlxyXG4gKi9cclxuZnVuY3Rpb24gSlBGTmV2ZXJNb3ZlRGlhZ29uYWxseShvcHQpIHtcclxuICAgIEp1bXBQb2ludEZpbmRlckJhc2UuY2FsbCh0aGlzLCBvcHQpO1xyXG59XHJcblxyXG5KUEZOZXZlck1vdmVEaWFnb25hbGx5LnByb3RvdHlwZSA9IG5ldyBKdW1wUG9pbnRGaW5kZXJCYXNlKCk7XHJcbkpQRk5ldmVyTW92ZURpYWdvbmFsbHkucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gSlBGTmV2ZXJNb3ZlRGlhZ29uYWxseTtcclxuXHJcbi8qKlxyXG4gKiBTZWFyY2ggcmVjdXJzaXZlbHkgaW4gdGhlIGRpcmVjdGlvbiAocGFyZW50IC0+IGNoaWxkKSwgc3RvcHBpbmcgb25seSB3aGVuIGFcclxuICoganVtcCBwb2ludCBpcyBmb3VuZC5cclxuICogQHByb3RlY3RlZFxyXG4gKiBAcmV0dXJuIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gVGhlIHgsIHkgY29vcmRpbmF0ZSBvZiB0aGUganVtcCBwb2ludFxyXG4gKiAgICAgZm91bmQsIG9yIG51bGwgaWYgbm90IGZvdW5kXHJcbiAqL1xyXG5KUEZOZXZlck1vdmVEaWFnb25hbGx5LnByb3RvdHlwZS5fanVtcCA9IGZ1bmN0aW9uKHgsIHksIHB4LCBweSkge1xyXG4gICAgdmFyIGdyaWQgPSB0aGlzLmdyaWQsXHJcbiAgICAgICAgZHggPSB4IC0gcHgsIGR5ID0geSAtIHB5O1xyXG5cclxuICAgIGlmICghZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSkpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpZih0aGlzLnRyYWNrSnVtcFJlY3Vyc2lvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGdyaWQuZ2V0Tm9kZUF0KHgsIHkpLnRlc3RlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGdyaWQuZ2V0Tm9kZUF0KHgsIHkpID09PSB0aGlzLmVuZE5vZGUpIHtcclxuICAgICAgICByZXR1cm4gW3gsIHldO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkeCAhPT0gMCkge1xyXG4gICAgICAgIGlmICgoZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSAtIDEpICYmICFncmlkLmlzV2Fsa2FibGVBdCh4IC0gZHgsIHkgLSAxKSkgfHxcclxuICAgICAgICAgICAgKGdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgKyAxKSAmJiAhZ3JpZC5pc1dhbGthYmxlQXQoeCAtIGR4LCB5ICsgMSkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbeCwgeV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZHkgIT09IDApIHtcclxuICAgICAgICBpZiAoKGdyaWQuaXNXYWxrYWJsZUF0KHggLSAxLCB5KSAmJiAhZ3JpZC5pc1dhbGthYmxlQXQoeCAtIDEsIHkgLSBkeSkpIHx8XHJcbiAgICAgICAgICAgIChncmlkLmlzV2Fsa2FibGVBdCh4ICsgMSwgeSkgJiYgIWdyaWQuaXNXYWxrYWJsZUF0KHggKyAxLCB5IC0gZHkpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gW3gsIHldO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1doZW4gbW92aW5nIHZlcnRpY2FsbHksIG11c3QgY2hlY2sgZm9yIGhvcml6b250YWwganVtcCBwb2ludHNcclxuICAgICAgICBpZiAodGhpcy5fanVtcCh4ICsgMSwgeSwgeCwgeSkgfHwgdGhpcy5fanVtcCh4IC0gMSwgeSwgeCwgeSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFt4LCB5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IGhvcml6b250YWwgYW5kIHZlcnRpY2FsIG1vdmVtZW50cyBhcmUgYWxsb3dlZFwiKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fanVtcCh4ICsgZHgsIHkgKyBkeSwgeCwgeSk7XHJcbn07XHJcblxyXG4vKipcclxuICogRmluZCB0aGUgbmVpZ2hib3JzIGZvciB0aGUgZ2l2ZW4gbm9kZS4gSWYgdGhlIG5vZGUgaGFzIGEgcGFyZW50LFxyXG4gKiBwcnVuZSB0aGUgbmVpZ2hib3JzIGJhc2VkIG9uIHRoZSBqdW1wIHBvaW50IHNlYXJjaCBhbGdvcml0aG0sIG90aGVyd2lzZVxyXG4gKiByZXR1cm4gYWxsIGF2YWlsYWJsZSBuZWlnaGJvcnMuXHJcbiAqIEByZXR1cm4ge0FycmF5PEFycmF5PG51bWJlcj4+fSBUaGUgbmVpZ2hib3JzIGZvdW5kLlxyXG4gKi9cclxuSlBGTmV2ZXJNb3ZlRGlhZ29uYWxseS5wcm90b3R5cGUuX2ZpbmROZWlnaGJvcnMgPSBmdW5jdGlvbihub2RlKSB7XHJcbiAgICB2YXIgcGFyZW50ID0gbm9kZS5wYXJlbnQsXHJcbiAgICAgICAgeCA9IG5vZGUueCwgeSA9IG5vZGUueSxcclxuICAgICAgICBncmlkID0gdGhpcy5ncmlkLFxyXG4gICAgICAgIHB4LCBweSwgbngsIG55LCBkeCwgZHksXHJcbiAgICAgICAgbmVpZ2hib3JzID0gW10sIG5laWdoYm9yTm9kZXMsIG5laWdoYm9yTm9kZSwgaSwgbDtcclxuXHJcbiAgICAvLyBkaXJlY3RlZCBwcnVuaW5nOiBjYW4gaWdub3JlIG1vc3QgbmVpZ2hib3JzLCB1bmxlc3MgZm9yY2VkLlxyXG4gICAgaWYgKHBhcmVudCkge1xyXG4gICAgICAgIHB4ID0gcGFyZW50Lng7XHJcbiAgICAgICAgcHkgPSBwYXJlbnQueTtcclxuICAgICAgICAvLyBnZXQgdGhlIG5vcm1hbGl6ZWQgZGlyZWN0aW9uIG9mIHRyYXZlbFxyXG4gICAgICAgIGR4ID0gKHggLSBweCkgLyBNYXRoLm1heChNYXRoLmFicyh4IC0gcHgpLCAxKTtcclxuICAgICAgICBkeSA9ICh5IC0gcHkpIC8gTWF0aC5tYXgoTWF0aC5hYnMoeSAtIHB5KSwgMSk7XHJcblxyXG4gICAgICAgIGlmIChkeCAhPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCwgeSAtIDFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSArIDEpKSB7XHJcbiAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCwgeSArIDFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZ3JpZC5pc1dhbGthYmxlQXQoeCArIGR4LCB5KSkge1xyXG4gICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggKyBkeCwgeV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGR5ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChncmlkLmlzV2Fsa2FibGVBdCh4IC0gMSwgeSkpIHtcclxuICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4IC0gMSwgeV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChncmlkLmlzV2Fsa2FibGVBdCh4ICsgMSwgeSkpIHtcclxuICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgMSwgeV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChncmlkLmlzV2Fsa2FibGVBdCh4LCB5ICsgZHkpKSB7XHJcbiAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCwgeSArIGR5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyByZXR1cm4gYWxsIG5laWdoYm9yc1xyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgbmVpZ2hib3JOb2RlcyA9IGdyaWQuZ2V0TmVpZ2hib3JzKG5vZGUsIERpYWdvbmFsTW92ZW1lbnQuTmV2ZXIpO1xyXG4gICAgICAgIGZvciAoaSA9IDAsIGwgPSBuZWlnaGJvck5vZGVzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xyXG4gICAgICAgICAgICBuZWlnaGJvck5vZGUgPSBuZWlnaGJvck5vZGVzW2ldO1xyXG4gICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbbmVpZ2hib3JOb2RlLngsIG5laWdoYm9yTm9kZS55XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZWlnaGJvcnM7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEpQRk5ldmVyTW92ZURpYWdvbmFsbHk7XHJcbiIsIi8qKlxyXG4gKiBAYXV0aG9yIGFuaWVybyAvIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmllcm9cclxuICovXHJcbnZhciBEaWFnb25hbE1vdmVtZW50ID0gcmVxdWlyZSgnLi4vY29yZS9EaWFnb25hbE1vdmVtZW50Jyk7XHJcbnZhciBKUEZOZXZlck1vdmVEaWFnb25hbGx5ID0gcmVxdWlyZSgnLi9KUEZOZXZlck1vdmVEaWFnb25hbGx5Jyk7XHJcbnZhciBKUEZBbHdheXNNb3ZlRGlhZ29uYWxseSA9IHJlcXVpcmUoJy4vSlBGQWx3YXlzTW92ZURpYWdvbmFsbHknKTtcclxudmFyIEpQRk1vdmVEaWFnb25hbGx5SWZOb09ic3RhY2xlcyA9IHJlcXVpcmUoJy4vSlBGTW92ZURpYWdvbmFsbHlJZk5vT2JzdGFjbGVzJyk7XHJcbnZhciBKUEZNb3ZlRGlhZ29uYWxseUlmQXRNb3N0T25lT2JzdGFjbGUgPSByZXF1aXJlKCcuL0pQRk1vdmVEaWFnb25hbGx5SWZBdE1vc3RPbmVPYnN0YWNsZScpO1xyXG5cclxuLyoqXHJcbiAqIFBhdGggZmluZGVyIHVzaW5nIHRoZSBKdW1wIFBvaW50IFNlYXJjaCBhbGdvcml0aG1cclxuICogQHBhcmFtIHtPYmplY3R9IG9wdFxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHQuaGV1cmlzdGljIEhldXJpc3RpYyBmdW5jdGlvbiB0byBlc3RpbWF0ZSB0aGUgZGlzdGFuY2VcclxuICogICAgIChkZWZhdWx0cyB0byBtYW5oYXR0YW4pLlxyXG4gKiBAcGFyYW0ge0RpYWdvbmFsTW92ZW1lbnR9IG9wdC5kaWFnb25hbE1vdmVtZW50IENvbmRpdGlvbiB1bmRlciB3aGljaCBkaWFnb25hbFxyXG4gKiAgICAgIG1vdmVtZW50IHdpbGwgYmUgYWxsb3dlZC5cclxuICovXHJcbmZ1bmN0aW9uIEp1bXBQb2ludEZpbmRlcihvcHQpIHtcclxuICAgIG9wdCA9IG9wdCB8fCB7fTtcclxuICAgIGlmIChvcHQuZGlhZ29uYWxNb3ZlbWVudCA9PT0gRGlhZ29uYWxNb3ZlbWVudC5OZXZlcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgSlBGTmV2ZXJNb3ZlRGlhZ29uYWxseShvcHQpO1xyXG4gICAgfSBlbHNlIGlmIChvcHQuZGlhZ29uYWxNb3ZlbWVudCA9PT0gRGlhZ29uYWxNb3ZlbWVudC5BbHdheXMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IEpQRkFsd2F5c01vdmVEaWFnb25hbGx5KG9wdCk7XHJcbiAgICB9IGVsc2UgaWYgKG9wdC5kaWFnb25hbE1vdmVtZW50ID09PSBEaWFnb25hbE1vdmVtZW50Lk9ubHlXaGVuTm9PYnN0YWNsZXMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IEpQRk1vdmVEaWFnb25hbGx5SWZOb09ic3RhY2xlcyhvcHQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbmV3IEpQRk1vdmVEaWFnb25hbGx5SWZBdE1vc3RPbmVPYnN0YWNsZShvcHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEp1bXBQb2ludEZpbmRlcjtcclxuIiwiLyoqXHJcbiAqIEBhdXRob3IgaW1vciAvIGh0dHBzOi8vZ2l0aHViLmNvbS9pbW9yXHJcbiAqL1xyXG52YXIgSGVhcCAgICAgICA9IHJlcXVpcmUoJ2hlYXAnKTtcclxudmFyIFV0aWwgICAgICAgPSByZXF1aXJlKCcuLi9jb3JlL1V0aWwnKTtcclxudmFyIEhldXJpc3RpYyAgPSByZXF1aXJlKCcuLi9jb3JlL0hldXJpc3RpYycpO1xyXG52YXIgRGlhZ29uYWxNb3ZlbWVudCA9IHJlcXVpcmUoJy4uL2NvcmUvRGlhZ29uYWxNb3ZlbWVudCcpO1xyXG5cclxuLyoqXHJcbiAqIEJhc2UgY2xhc3MgZm9yIHRoZSBKdW1wIFBvaW50IFNlYXJjaCBhbGdvcml0aG1cclxuICogQHBhcmFtIHtvYmplY3R9IG9wdFxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHQuaGV1cmlzdGljIEhldXJpc3RpYyBmdW5jdGlvbiB0byBlc3RpbWF0ZSB0aGUgZGlzdGFuY2VcclxuICogICAgIChkZWZhdWx0cyB0byBtYW5oYXR0YW4pLlxyXG4gKi9cclxuZnVuY3Rpb24gSnVtcFBvaW50RmluZGVyQmFzZShvcHQpIHtcclxuICAgIG9wdCA9IG9wdCB8fCB7fTtcclxuICAgIHRoaXMuaGV1cmlzdGljID0gb3B0LmhldXJpc3RpYyB8fCBIZXVyaXN0aWMubWFuaGF0dGFuO1xyXG4gICAgdGhpcy50cmFja0p1bXBSZWN1cnNpb24gPSBvcHQudHJhY2tKdW1wUmVjdXJzaW9uIHx8IGZhbHNlO1xyXG59XHJcblxyXG4vKipcclxuICogRmluZCBhbmQgcmV0dXJuIHRoZSBwYXRoLlxyXG4gKiBAcmV0dXJuIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gVGhlIHBhdGgsIGluY2x1ZGluZyBib3RoIHN0YXJ0IGFuZFxyXG4gKiAgICAgZW5kIHBvc2l0aW9ucy5cclxuICovXHJcbkp1bXBQb2ludEZpbmRlckJhc2UucHJvdG90eXBlLmZpbmRQYXRoID0gZnVuY3Rpb24oc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFksIGdyaWQpIHtcclxuICAgIHZhciBvcGVuTGlzdCA9IHRoaXMub3Blbkxpc3QgPSBuZXcgSGVhcChmdW5jdGlvbihub2RlQSwgbm9kZUIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGVBLmYgLSBub2RlQi5mO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHN0YXJ0Tm9kZSA9IHRoaXMuc3RhcnROb2RlID0gZ3JpZC5nZXROb2RlQXQoc3RhcnRYLCBzdGFydFkpLFxyXG4gICAgICAgIGVuZE5vZGUgPSB0aGlzLmVuZE5vZGUgPSBncmlkLmdldE5vZGVBdChlbmRYLCBlbmRZKSwgbm9kZTtcclxuXHJcbiAgICB0aGlzLmdyaWQgPSBncmlkO1xyXG5cclxuXHJcbiAgICAvLyBzZXQgdGhlIGBnYCBhbmQgYGZgIHZhbHVlIG9mIHRoZSBzdGFydCBub2RlIHRvIGJlIDBcclxuICAgIHN0YXJ0Tm9kZS5nID0gMDtcclxuICAgIHN0YXJ0Tm9kZS5mID0gMDtcclxuXHJcbiAgICAvLyBwdXNoIHRoZSBzdGFydCBub2RlIGludG8gdGhlIG9wZW4gbGlzdFxyXG4gICAgb3Blbkxpc3QucHVzaChzdGFydE5vZGUpO1xyXG4gICAgc3RhcnROb2RlLm9wZW5lZCA9IHRydWU7XHJcblxyXG4gICAgLy8gd2hpbGUgdGhlIG9wZW4gbGlzdCBpcyBub3QgZW1wdHlcclxuICAgIHdoaWxlICghb3Blbkxpc3QuZW1wdHkoKSkge1xyXG4gICAgICAgIC8vIHBvcCB0aGUgcG9zaXRpb24gb2Ygbm9kZSB3aGljaCBoYXMgdGhlIG1pbmltdW0gYGZgIHZhbHVlLlxyXG4gICAgICAgIG5vZGUgPSBvcGVuTGlzdC5wb3AoKTtcclxuICAgICAgICBub2RlLmNsb3NlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmIChub2RlID09PSBlbmROb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBVdGlsLmV4cGFuZFBhdGgoVXRpbC5iYWNrdHJhY2UoZW5kTm9kZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faWRlbnRpZnlTdWNjZXNzb3JzKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGZhaWwgdG8gZmluZCB0aGUgcGF0aFxyXG4gICAgcmV0dXJuIFtdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIElkZW50aWZ5IHN1Y2Nlc3NvcnMgZm9yIHRoZSBnaXZlbiBub2RlLiBSdW5zIGEganVtcCBwb2ludCBzZWFyY2ggaW4gdGhlXHJcbiAqIGRpcmVjdGlvbiBvZiBlYWNoIGF2YWlsYWJsZSBuZWlnaGJvciwgYWRkaW5nIGFueSBwb2ludHMgZm91bmQgdG8gdGhlIG9wZW5cclxuICogbGlzdC5cclxuICogQHByb3RlY3RlZFxyXG4gKi9cclxuSnVtcFBvaW50RmluZGVyQmFzZS5wcm90b3R5cGUuX2lkZW50aWZ5U3VjY2Vzc29ycyA9IGZ1bmN0aW9uKG5vZGUpIHtcclxuICAgIHZhciBncmlkID0gdGhpcy5ncmlkLFxyXG4gICAgICAgIGhldXJpc3RpYyA9IHRoaXMuaGV1cmlzdGljLFxyXG4gICAgICAgIG9wZW5MaXN0ID0gdGhpcy5vcGVuTGlzdCxcclxuICAgICAgICBlbmRYID0gdGhpcy5lbmROb2RlLngsXHJcbiAgICAgICAgZW5kWSA9IHRoaXMuZW5kTm9kZS55LFxyXG4gICAgICAgIG5laWdoYm9ycywgbmVpZ2hib3IsXHJcbiAgICAgICAganVtcFBvaW50LCBpLCBsLFxyXG4gICAgICAgIHggPSBub2RlLngsIHkgPSBub2RlLnksXHJcbiAgICAgICAgangsIGp5LCBkeCwgZHksIGQsIG5nLCBqdW1wTm9kZSxcclxuICAgICAgICBhYnMgPSBNYXRoLmFicywgbWF4ID0gTWF0aC5tYXg7XHJcblxyXG4gICAgbmVpZ2hib3JzID0gdGhpcy5fZmluZE5laWdoYm9ycyhub2RlKTtcclxuICAgIGZvcihpID0gMCwgbCA9IG5laWdoYm9ycy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcclxuICAgICAgICBuZWlnaGJvciA9IG5laWdoYm9yc1tpXTtcclxuICAgICAgICBqdW1wUG9pbnQgPSB0aGlzLl9qdW1wKG5laWdoYm9yWzBdLCBuZWlnaGJvclsxXSwgeCwgeSk7XHJcbiAgICAgICAgaWYgKGp1bXBQb2ludCkge1xyXG5cclxuICAgICAgICAgICAganggPSBqdW1wUG9pbnRbMF07XHJcbiAgICAgICAgICAgIGp5ID0ganVtcFBvaW50WzFdO1xyXG4gICAgICAgICAgICBqdW1wTm9kZSA9IGdyaWQuZ2V0Tm9kZUF0KGp4LCBqeSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoanVtcE5vZGUuY2xvc2VkKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaW5jbHVkZSBkaXN0YW5jZSwgYXMgcGFyZW50IG1heSBub3QgYmUgaW1tZWRpYXRlbHkgYWRqYWNlbnQ6XHJcbiAgICAgICAgICAgIGQgPSBIZXVyaXN0aWMub2N0aWxlKGFicyhqeCAtIHgpLCBhYnMoankgLSB5KSk7XHJcbiAgICAgICAgICAgIG5nID0gbm9kZS5nICsgZDsgLy8gbmV4dCBgZ2AgdmFsdWVcclxuXHJcbiAgICAgICAgICAgIGlmICghanVtcE5vZGUub3BlbmVkIHx8IG5nIDwganVtcE5vZGUuZykge1xyXG4gICAgICAgICAgICAgICAganVtcE5vZGUuZyA9IG5nO1xyXG4gICAgICAgICAgICAgICAganVtcE5vZGUuaCA9IGp1bXBOb2RlLmggfHwgaGV1cmlzdGljKGFicyhqeCAtIGVuZFgpLCBhYnMoankgLSBlbmRZKSk7XHJcbiAgICAgICAgICAgICAgICBqdW1wTm9kZS5mID0ganVtcE5vZGUuZyArIGp1bXBOb2RlLmg7XHJcbiAgICAgICAgICAgICAgICBqdW1wTm9kZS5wYXJlbnQgPSBub2RlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghanVtcE5vZGUub3BlbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3Blbkxpc3QucHVzaChqdW1wTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAganVtcE5vZGUub3BlbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3Blbkxpc3QudXBkYXRlSXRlbShqdW1wTm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEp1bXBQb2ludEZpbmRlckJhc2U7XHJcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgZGVmYXVsdFBhcmFtcyA9IHtcbiAgdGl0bGU6ICcnLFxuICB0ZXh0OiAnJyxcbiAgdHlwZTogbnVsbCxcbiAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlLFxuICBzaG93Q29uZmlybUJ1dHRvbjogdHJ1ZSxcbiAgc2hvd0NhbmNlbEJ1dHRvbjogZmFsc2UsXG4gIGNsb3NlT25Db25maXJtOiB0cnVlLFxuICBjbG9zZU9uQ2FuY2VsOiB0cnVlLFxuICBjb25maXJtQnV0dG9uVGV4dDogJ09LJyxcbiAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzhDRDRGNScsXG4gIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWwnLFxuICBpbWFnZVVybDogbnVsbCxcbiAgaW1hZ2VTaXplOiBudWxsLFxuICB0aW1lcjogbnVsbCxcbiAgY3VzdG9tQ2xhc3M6ICcnLFxuICBodG1sOiBmYWxzZSxcbiAgYW5pbWF0aW9uOiB0cnVlLFxuICBhbGxvd0VzY2FwZUtleTogdHJ1ZSxcbiAgaW5wdXRUeXBlOiAndGV4dCcsXG4gIGlucHV0UGxhY2Vob2xkZXI6ICcnLFxuICBpbnB1dFZhbHVlOiAnJyxcbiAgc2hvd0xvYWRlck9uQ29uZmlybTogZmFsc2Vcbn07XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGRlZmF1bHRQYXJhbXM7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NvbG9yTHVtaW5hbmNlID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgX2dldE1vZGFsID0gcmVxdWlyZSgnLi9oYW5kbGUtc3dhbC1kb20nKTtcblxudmFyIF9oYXNDbGFzcyRpc0Rlc2NlbmRhbnQgPSByZXF1aXJlKCcuL2hhbmRsZS1kb20nKTtcblxuLypcbiAqIFVzZXIgY2xpY2tlZCBvbiBcIkNvbmZpcm1cIi9cIk9LXCIgb3IgXCJDYW5jZWxcIlxuICovXG52YXIgaGFuZGxlQnV0dG9uID0gZnVuY3Rpb24gaGFuZGxlQnV0dG9uKGV2ZW50LCBwYXJhbXMsIG1vZGFsKSB7XG4gIHZhciBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50O1xuICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuXG4gIHZhciB0YXJnZXRlZENvbmZpcm0gPSB0YXJnZXQuY2xhc3NOYW1lLmluZGV4T2YoJ2NvbmZpcm0nKSAhPT0gLTE7XG4gIHZhciB0YXJnZXRlZE92ZXJsYXkgPSB0YXJnZXQuY2xhc3NOYW1lLmluZGV4T2YoJ3N3ZWV0LW92ZXJsYXknKSAhPT0gLTE7XG4gIHZhciBtb2RhbElzVmlzaWJsZSA9IF9oYXNDbGFzcyRpc0Rlc2NlbmRhbnQuaGFzQ2xhc3MobW9kYWwsICd2aXNpYmxlJyk7XG4gIHZhciBkb25lRnVuY3Rpb25FeGlzdHMgPSBwYXJhbXMuZG9uZUZ1bmN0aW9uICYmIG1vZGFsLmdldEF0dHJpYnV0ZSgnZGF0YS1oYXMtZG9uZS1mdW5jdGlvbicpID09PSAndHJ1ZSc7XG5cbiAgLy8gU2luY2UgdGhlIHVzZXIgY2FuIGNoYW5nZSB0aGUgYmFja2dyb3VuZC1jb2xvciBvZiB0aGUgY29uZmlybSBidXR0b24gcHJvZ3JhbW1hdGljYWxseSxcbiAgLy8gd2UgbXVzdCBjYWxjdWxhdGUgd2hhdCB0aGUgY29sb3Igc2hvdWxkIGJlIG9uIGhvdmVyL2FjdGl2ZVxuICB2YXIgbm9ybWFsQ29sb3IsIGhvdmVyQ29sb3IsIGFjdGl2ZUNvbG9yO1xuICBpZiAodGFyZ2V0ZWRDb25maXJtICYmIHBhcmFtcy5jb25maXJtQnV0dG9uQ29sb3IpIHtcbiAgICBub3JtYWxDb2xvciA9IHBhcmFtcy5jb25maXJtQnV0dG9uQ29sb3I7XG4gICAgaG92ZXJDb2xvciA9IF9jb2xvckx1bWluYW5jZS5jb2xvckx1bWluYW5jZShub3JtYWxDb2xvciwgLTAuMDQpO1xuICAgIGFjdGl2ZUNvbG9yID0gX2NvbG9yTHVtaW5hbmNlLmNvbG9yTHVtaW5hbmNlKG5vcm1hbENvbG9yLCAtMC4xNCk7XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRTZXRDb25maXJtQnV0dG9uQ29sb3IoY29sb3IpIHtcbiAgICBpZiAodGFyZ2V0ZWRDb25maXJtICYmIHBhcmFtcy5jb25maXJtQnV0dG9uQ29sb3IpIHtcbiAgICAgIHRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcbiAgICB9XG4gIH1cblxuICBzd2l0Y2ggKGUudHlwZSkge1xuICAgIGNhc2UgJ21vdXNlb3Zlcic6XG4gICAgICBzaG91bGRTZXRDb25maXJtQnV0dG9uQ29sb3IoaG92ZXJDb2xvcik7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ21vdXNlb3V0JzpcbiAgICAgIHNob3VsZFNldENvbmZpcm1CdXR0b25Db2xvcihub3JtYWxDb2xvcik7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ21vdXNlZG93bic6XG4gICAgICBzaG91bGRTZXRDb25maXJtQnV0dG9uQ29sb3IoYWN0aXZlQ29sb3IpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdtb3VzZXVwJzpcbiAgICAgIHNob3VsZFNldENvbmZpcm1CdXR0b25Db2xvcihob3ZlckNvbG9yKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnZm9jdXMnOlxuICAgICAgdmFyICRjb25maXJtQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignYnV0dG9uLmNvbmZpcm0nKTtcbiAgICAgIHZhciAkY2FuY2VsQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignYnV0dG9uLmNhbmNlbCcpO1xuXG4gICAgICBpZiAodGFyZ2V0ZWRDb25maXJtKSB7XG4gICAgICAgICRjYW5jZWxCdXR0b24uc3R5bGUuYm94U2hhZG93ID0gJ25vbmUnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJGNvbmZpcm1CdXR0b24uc3R5bGUuYm94U2hhZG93ID0gJ25vbmUnO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdjbGljayc6XG4gICAgICB2YXIgY2xpY2tlZE9uTW9kYWwgPSBtb2RhbCA9PT0gdGFyZ2V0O1xuICAgICAgdmFyIGNsaWNrZWRPbk1vZGFsQ2hpbGQgPSBfaGFzQ2xhc3MkaXNEZXNjZW5kYW50LmlzRGVzY2VuZGFudChtb2RhbCwgdGFyZ2V0KTtcblxuICAgICAgLy8gSWdub3JlIGNsaWNrIG91dHNpZGUgaWYgYWxsb3dPdXRzaWRlQ2xpY2sgaXMgZmFsc2VcbiAgICAgIGlmICghY2xpY2tlZE9uTW9kYWwgJiYgIWNsaWNrZWRPbk1vZGFsQ2hpbGQgJiYgbW9kYWxJc1Zpc2libGUgJiYgIXBhcmFtcy5hbGxvd091dHNpZGVDbGljaykge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKHRhcmdldGVkQ29uZmlybSAmJiBkb25lRnVuY3Rpb25FeGlzdHMgJiYgbW9kYWxJc1Zpc2libGUpIHtcbiAgICAgICAgaGFuZGxlQ29uZmlybShtb2RhbCwgcGFyYW1zKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9uZUZ1bmN0aW9uRXhpc3RzICYmIG1vZGFsSXNWaXNpYmxlIHx8IHRhcmdldGVkT3ZlcmxheSkge1xuICAgICAgICBoYW5kbGVDYW5jZWwobW9kYWwsIHBhcmFtcyk7XG4gICAgICB9IGVsc2UgaWYgKF9oYXNDbGFzcyRpc0Rlc2NlbmRhbnQuaXNEZXNjZW5kYW50KG1vZGFsLCB0YXJnZXQpICYmIHRhcmdldC50YWdOYW1lID09PSAnQlVUVE9OJykge1xuICAgICAgICBzd2VldEFsZXJ0LmNsb3NlKCk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxufTtcblxuLypcbiAqICBVc2VyIGNsaWNrZWQgb24gXCJDb25maXJtXCIvXCJPS1wiXG4gKi9cbnZhciBoYW5kbGVDb25maXJtID0gZnVuY3Rpb24gaGFuZGxlQ29uZmlybShtb2RhbCwgcGFyYW1zKSB7XG4gIHZhciBjYWxsYmFja1ZhbHVlID0gdHJ1ZTtcblxuICBpZiAoX2hhc0NsYXNzJGlzRGVzY2VuZGFudC5oYXNDbGFzcyhtb2RhbCwgJ3Nob3ctaW5wdXQnKSkge1xuICAgIGNhbGxiYWNrVmFsdWUgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlO1xuXG4gICAgaWYgKCFjYWxsYmFja1ZhbHVlKSB7XG4gICAgICBjYWxsYmFja1ZhbHVlID0gJyc7XG4gICAgfVxuICB9XG5cbiAgcGFyYW1zLmRvbmVGdW5jdGlvbihjYWxsYmFja1ZhbHVlKTtcblxuICBpZiAocGFyYW1zLmNsb3NlT25Db25maXJtKSB7XG4gICAgc3dlZXRBbGVydC5jbG9zZSgpO1xuICB9XG4gIC8vIERpc2FibGUgY2FuY2VsIGFuZCBjb25maXJtIGJ1dHRvbiBpZiB0aGUgcGFyYW1ldGVyIGlzIHRydWVcbiAgaWYgKHBhcmFtcy5zaG93TG9hZGVyT25Db25maXJtKSB7XG4gICAgc3dlZXRBbGVydC5kaXNhYmxlQnV0dG9ucygpO1xuICB9XG59O1xuXG4vKlxuICogIFVzZXIgY2xpY2tlZCBvbiBcIkNhbmNlbFwiXG4gKi9cbnZhciBoYW5kbGVDYW5jZWwgPSBmdW5jdGlvbiBoYW5kbGVDYW5jZWwobW9kYWwsIHBhcmFtcykge1xuICAvLyBDaGVjayBpZiBjYWxsYmFjayBmdW5jdGlvbiBleHBlY3RzIGEgcGFyYW1ldGVyICh0byB0cmFjayBjYW5jZWwgYWN0aW9ucylcbiAgdmFyIGZ1bmN0aW9uQXNTdHIgPSBTdHJpbmcocGFyYW1zLmRvbmVGdW5jdGlvbikucmVwbGFjZSgvXFxzL2csICcnKTtcbiAgdmFyIGZ1bmN0aW9uSGFuZGxlc0NhbmNlbCA9IGZ1bmN0aW9uQXNTdHIuc3Vic3RyaW5nKDAsIDkpID09PSAnZnVuY3Rpb24oJyAmJiBmdW5jdGlvbkFzU3RyLnN1YnN0cmluZyg5LCAxMCkgIT09ICcpJztcblxuICBpZiAoZnVuY3Rpb25IYW5kbGVzQ2FuY2VsKSB7XG4gICAgcGFyYW1zLmRvbmVGdW5jdGlvbihmYWxzZSk7XG4gIH1cblxuICBpZiAocGFyYW1zLmNsb3NlT25DYW5jZWwpIHtcbiAgICBzd2VldEFsZXJ0LmNsb3NlKCk7XG4gIH1cbn07XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHtcbiAgaGFuZGxlQnV0dG9uOiBoYW5kbGVCdXR0b24sXG4gIGhhbmRsZUNvbmZpcm06IGhhbmRsZUNvbmZpcm0sXG4gIGhhbmRsZUNhbmNlbDogaGFuZGxlQ2FuY2VsXG59O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBoYXNDbGFzcyA9IGZ1bmN0aW9uIGhhc0NsYXNzKGVsZW0sIGNsYXNzTmFtZSkge1xuICByZXR1cm4gbmV3IFJlZ0V4cCgnICcgKyBjbGFzc05hbWUgKyAnICcpLnRlc3QoJyAnICsgZWxlbS5jbGFzc05hbWUgKyAnICcpO1xufTtcblxudmFyIGFkZENsYXNzID0gZnVuY3Rpb24gYWRkQ2xhc3MoZWxlbSwgY2xhc3NOYW1lKSB7XG4gIGlmICghaGFzQ2xhc3MoZWxlbSwgY2xhc3NOYW1lKSkge1xuICAgIGVsZW0uY2xhc3NOYW1lICs9ICcgJyArIGNsYXNzTmFtZTtcbiAgfVxufTtcblxudmFyIHJlbW92ZUNsYXNzID0gZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoZWxlbSwgY2xhc3NOYW1lKSB7XG4gIHZhciBuZXdDbGFzcyA9ICcgJyArIGVsZW0uY2xhc3NOYW1lLnJlcGxhY2UoL1tcXHRcXHJcXG5dL2csICcgJykgKyAnICc7XG4gIGlmIChoYXNDbGFzcyhlbGVtLCBjbGFzc05hbWUpKSB7XG4gICAgd2hpbGUgKG5ld0NsYXNzLmluZGV4T2YoJyAnICsgY2xhc3NOYW1lICsgJyAnKSA+PSAwKSB7XG4gICAgICBuZXdDbGFzcyA9IG5ld0NsYXNzLnJlcGxhY2UoJyAnICsgY2xhc3NOYW1lICsgJyAnLCAnICcpO1xuICAgIH1cbiAgICBlbGVtLmNsYXNzTmFtZSA9IG5ld0NsYXNzLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbiAgfVxufTtcblxudmFyIGVzY2FwZUh0bWwgPSBmdW5jdGlvbiBlc2NhcGVIdG1sKHN0cikge1xuICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHIpKTtcbiAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XG59O1xuXG52YXIgX3Nob3cgPSBmdW5jdGlvbiBfc2hvdyhlbGVtKSB7XG4gIGVsZW0uc3R5bGUub3BhY2l0eSA9ICcnO1xuICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufTtcblxudmFyIHNob3cgPSBmdW5jdGlvbiBzaG93KGVsZW1zKSB7XG4gIGlmIChlbGVtcyAmJiAhZWxlbXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIF9zaG93KGVsZW1zKTtcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgX3Nob3coZWxlbXNbaV0pO1xuICB9XG59O1xuXG52YXIgX2hpZGUgPSBmdW5jdGlvbiBfaGlkZShlbGVtKSB7XG4gIGVsZW0uc3R5bGUub3BhY2l0eSA9ICcnO1xuICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59O1xuXG52YXIgaGlkZSA9IGZ1bmN0aW9uIGhpZGUoZWxlbXMpIHtcbiAgaWYgKGVsZW1zICYmICFlbGVtcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gX2hpZGUoZWxlbXMpO1xuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbXMubGVuZ3RoOyArK2kpIHtcbiAgICBfaGlkZShlbGVtc1tpXSk7XG4gIH1cbn07XG5cbnZhciBpc0Rlc2NlbmRhbnQgPSBmdW5jdGlvbiBpc0Rlc2NlbmRhbnQocGFyZW50LCBjaGlsZCkge1xuICB2YXIgbm9kZSA9IGNoaWxkLnBhcmVudE5vZGU7XG4gIHdoaWxlIChub2RlICE9PSBudWxsKSB7XG4gICAgaWYgKG5vZGUgPT09IHBhcmVudCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxudmFyIGdldFRvcE1hcmdpbiA9IGZ1bmN0aW9uIGdldFRvcE1hcmdpbihlbGVtKSB7XG4gIGVsZW0uc3R5bGUubGVmdCA9ICctOTk5OXB4JztcbiAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICB2YXIgaGVpZ2h0ID0gZWxlbS5jbGllbnRIZWlnaHQsXG4gICAgICBwYWRkaW5nO1xuICBpZiAodHlwZW9mIGdldENvbXB1dGVkU3R5bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gSUUgOFxuICAgIHBhZGRpbmcgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGVsZW0pLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctdG9wJyksIDEwKTtcbiAgfSBlbHNlIHtcbiAgICBwYWRkaW5nID0gcGFyc2VJbnQoZWxlbS5jdXJyZW50U3R5bGUucGFkZGluZyk7XG4gIH1cblxuICBlbGVtLnN0eWxlLmxlZnQgPSAnJztcbiAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXR1cm4gJy0nICsgcGFyc2VJbnQoKGhlaWdodCArIHBhZGRpbmcpIC8gMikgKyAncHgnO1xufTtcblxudmFyIGZhZGVJbiA9IGZ1bmN0aW9uIGZhZGVJbihlbGVtLCBpbnRlcnZhbCkge1xuICBpZiAoK2VsZW0uc3R5bGUub3BhY2l0eSA8IDEpIHtcbiAgICBpbnRlcnZhbCA9IGludGVydmFsIHx8IDE2O1xuICAgIGVsZW0uc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB2YXIgbGFzdCA9ICtuZXcgRGF0ZSgpO1xuICAgIHZhciB0aWNrID0gKGZ1bmN0aW9uIChfdGljaykge1xuICAgICAgZnVuY3Rpb24gdGljaygpIHtcbiAgICAgICAgcmV0dXJuIF90aWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHRpY2sudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGljay50b1N0cmluZygpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHRpY2s7XG4gICAgfSkoZnVuY3Rpb24gKCkge1xuICAgICAgZWxlbS5zdHlsZS5vcGFjaXR5ID0gK2VsZW0uc3R5bGUub3BhY2l0eSArIChuZXcgRGF0ZSgpIC0gbGFzdCkgLyAxMDA7XG4gICAgICBsYXN0ID0gK25ldyBEYXRlKCk7XG5cbiAgICAgIGlmICgrZWxlbS5zdHlsZS5vcGFjaXR5IDwgMSkge1xuICAgICAgICBzZXRUaW1lb3V0KHRpY2ssIGludGVydmFsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aWNrKCk7XG4gIH1cbiAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJzsgLy9mYWxsYmFjayBJRThcbn07XG5cbnZhciBmYWRlT3V0ID0gZnVuY3Rpb24gZmFkZU91dChlbGVtLCBpbnRlcnZhbCkge1xuICBpbnRlcnZhbCA9IGludGVydmFsIHx8IDE2O1xuICBlbGVtLnN0eWxlLm9wYWNpdHkgPSAxO1xuICB2YXIgbGFzdCA9ICtuZXcgRGF0ZSgpO1xuICB2YXIgdGljayA9IChmdW5jdGlvbiAoX3RpY2syKSB7XG4gICAgZnVuY3Rpb24gdGljaygpIHtcbiAgICAgIHJldHVybiBfdGljazIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICB0aWNrLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aWNrMi50b1N0cmluZygpO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGljaztcbiAgfSkoZnVuY3Rpb24gKCkge1xuICAgIGVsZW0uc3R5bGUub3BhY2l0eSA9ICtlbGVtLnN0eWxlLm9wYWNpdHkgLSAobmV3IERhdGUoKSAtIGxhc3QpIC8gMTAwO1xuICAgIGxhc3QgPSArbmV3IERhdGUoKTtcblxuICAgIGlmICgrZWxlbS5zdHlsZS5vcGFjaXR5ID4gMCkge1xuICAgICAgc2V0VGltZW91dCh0aWNrLCBpbnRlcnZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG4gIH0pO1xuICB0aWNrKCk7XG59O1xuXG52YXIgZmlyZUNsaWNrID0gZnVuY3Rpb24gZmlyZUNsaWNrKG5vZGUpIHtcbiAgLy8gVGFrZW4gZnJvbSBodHRwOi8vd3d3Lm5vbm9idHJ1c2l2ZS5jb20vMjAxMS8xMS8yOS9wcm9ncmFtYXRpY2FsbHktZmlyZS1jcm9zc2Jyb3dzZXItY2xpY2stZXZlbnQtd2l0aC1qYXZhc2NyaXB0L1xuICAvLyBUaGVuIGZpeGVkIGZvciB0b2RheSdzIENocm9tZSBicm93c2VyLlxuICBpZiAodHlwZW9mIE1vdXNlRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBVcC10by1kYXRlIGFwcHJvYWNoXG4gICAgdmFyIG1ldnQgPSBuZXcgTW91c2VFdmVudCgnY2xpY2snLCB7XG4gICAgICB2aWV3OiB3aW5kb3csXG4gICAgICBidWJibGVzOiBmYWxzZSxcbiAgICAgIGNhbmNlbGFibGU6IHRydWVcbiAgICB9KTtcbiAgICBub2RlLmRpc3BhdGNoRXZlbnQobWV2dCk7XG4gIH0gZWxzZSBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnQpIHtcbiAgICAvLyBGYWxsYmFja1xuICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudHMnKTtcbiAgICBldnQuaW5pdEV2ZW50KCdjbGljaycsIGZhbHNlLCBmYWxzZSk7XG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gIH0gZWxzZSBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QpIHtcbiAgICBub2RlLmZpcmVFdmVudCgnb25jbGljaycpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBub2RlLm9uY2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICBub2RlLm9uY2xpY2soKTtcbiAgfVxufTtcblxudmFyIHN0b3BFdmVudFByb3BhZ2F0aW9uID0gZnVuY3Rpb24gc3RvcEV2ZW50UHJvcGFnYXRpb24oZSkge1xuICAvLyBJbiBwYXJ0aWN1bGFyLCBtYWtlIHN1cmUgdGhlIHNwYWNlIGJhciBkb2Vzbid0IHNjcm9sbCB0aGUgbWFpbiB3aW5kb3cuXG4gIGlmICh0eXBlb2YgZS5zdG9wUHJvcGFnYXRpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfSBlbHNlIGlmICh3aW5kb3cuZXZlbnQgJiYgd2luZG93LmV2ZW50Lmhhc093blByb3BlcnR5KCdjYW5jZWxCdWJibGUnKSkge1xuICAgIHdpbmRvdy5ldmVudC5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICB9XG59O1xuXG5leHBvcnRzLmhhc0NsYXNzID0gaGFzQ2xhc3M7XG5leHBvcnRzLmFkZENsYXNzID0gYWRkQ2xhc3M7XG5leHBvcnRzLnJlbW92ZUNsYXNzID0gcmVtb3ZlQ2xhc3M7XG5leHBvcnRzLmVzY2FwZUh0bWwgPSBlc2NhcGVIdG1sO1xuZXhwb3J0cy5fc2hvdyA9IF9zaG93O1xuZXhwb3J0cy5zaG93ID0gc2hvdztcbmV4cG9ydHMuX2hpZGUgPSBfaGlkZTtcbmV4cG9ydHMuaGlkZSA9IGhpZGU7XG5leHBvcnRzLmlzRGVzY2VuZGFudCA9IGlzRGVzY2VuZGFudDtcbmV4cG9ydHMuZ2V0VG9wTWFyZ2luID0gZ2V0VG9wTWFyZ2luO1xuZXhwb3J0cy5mYWRlSW4gPSBmYWRlSW47XG5leHBvcnRzLmZhZGVPdXQgPSBmYWRlT3V0O1xuZXhwb3J0cy5maXJlQ2xpY2sgPSBmaXJlQ2xpY2s7XG5leHBvcnRzLnN0b3BFdmVudFByb3BhZ2F0aW9uID0gc3RvcEV2ZW50UHJvcGFnYXRpb247IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9zdG9wRXZlbnRQcm9wYWdhdGlvbiRmaXJlQ2xpY2sgPSByZXF1aXJlKCcuL2hhbmRsZS1kb20nKTtcblxudmFyIF9zZXRGb2N1c1N0eWxlID0gcmVxdWlyZSgnLi9oYW5kbGUtc3dhbC1kb20nKTtcblxudmFyIGhhbmRsZUtleURvd24gPSBmdW5jdGlvbiBoYW5kbGVLZXlEb3duKGV2ZW50LCBwYXJhbXMsIG1vZGFsKSB7XG4gIHZhciBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50O1xuICB2YXIga2V5Q29kZSA9IGUua2V5Q29kZSB8fCBlLndoaWNoO1xuXG4gIHZhciAkb2tCdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCdidXR0b24uY29uZmlybScpO1xuICB2YXIgJGNhbmNlbEJ1dHRvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5jYW5jZWwnKTtcbiAgdmFyICRtb2RhbEJ1dHRvbnMgPSBtb2RhbC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b25bdGFiaW5kZXhdJyk7XG5cbiAgaWYgKFs5LCAxMywgMzIsIDI3XS5pbmRleE9mKGtleUNvZGUpID09PSAtMSkge1xuICAgIC8vIERvbid0IGRvIHdvcmsgb24ga2V5cyB3ZSBkb24ndCBjYXJlIGFib3V0LlxuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciAkdGFyZ2V0RWxlbWVudCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblxuICB2YXIgYnRuSW5kZXggPSAtMTsgLy8gRmluZCB0aGUgYnV0dG9uIC0gbm90ZSwgdGhpcyBpcyBhIG5vZGVsaXN0LCBub3QgYW4gYXJyYXkuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgJG1vZGFsQnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgIGlmICgkdGFyZ2V0RWxlbWVudCA9PT0gJG1vZGFsQnV0dG9uc1tpXSkge1xuICAgICAgYnRuSW5kZXggPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKGtleUNvZGUgPT09IDkpIHtcbiAgICAvLyBUQUJcbiAgICBpZiAoYnRuSW5kZXggPT09IC0xKSB7XG4gICAgICAvLyBObyBidXR0b24gZm9jdXNlZC4gSnVtcCB0byB0aGUgY29uZmlybSBidXR0b24uXG4gICAgICAkdGFyZ2V0RWxlbWVudCA9ICRva0J1dHRvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ3ljbGUgdG8gdGhlIG5leHQgYnV0dG9uXG4gICAgICBpZiAoYnRuSW5kZXggPT09ICRtb2RhbEJ1dHRvbnMubGVuZ3RoIC0gMSkge1xuICAgICAgICAkdGFyZ2V0RWxlbWVudCA9ICRtb2RhbEJ1dHRvbnNbMF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkdGFyZ2V0RWxlbWVudCA9ICRtb2RhbEJ1dHRvbnNbYnRuSW5kZXggKyAxXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfc3RvcEV2ZW50UHJvcGFnYXRpb24kZmlyZUNsaWNrLnN0b3BFdmVudFByb3BhZ2F0aW9uKGUpO1xuICAgICR0YXJnZXRFbGVtZW50LmZvY3VzKCk7XG5cbiAgICBpZiAocGFyYW1zLmNvbmZpcm1CdXR0b25Db2xvcikge1xuICAgICAgX3NldEZvY3VzU3R5bGUuc2V0Rm9jdXNTdHlsZSgkdGFyZ2V0RWxlbWVudCwgcGFyYW1zLmNvbmZpcm1CdXR0b25Db2xvcik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChrZXlDb2RlID09PSAxMykge1xuICAgICAgaWYgKCR0YXJnZXRFbGVtZW50LnRhZ05hbWUgPT09ICdJTlBVVCcpIHtcbiAgICAgICAgJHRhcmdldEVsZW1lbnQgPSAkb2tCdXR0b247XG4gICAgICAgICRva0J1dHRvbi5mb2N1cygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYnRuSW5kZXggPT09IC0xKSB7XG4gICAgICAgIC8vIEVOVEVSL1NQQUNFIGNsaWNrZWQgb3V0c2lkZSBvZiBhIGJ1dHRvbi5cbiAgICAgICAgJHRhcmdldEVsZW1lbnQgPSAkb2tCdXR0b247XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBEbyBub3RoaW5nIC0gbGV0IHRoZSBicm93c2VyIGhhbmRsZSBpdC5cbiAgICAgICAgJHRhcmdldEVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSAyNyAmJiBwYXJhbXMuYWxsb3dFc2NhcGVLZXkgPT09IHRydWUpIHtcbiAgICAgICR0YXJnZXRFbGVtZW50ID0gJGNhbmNlbEJ1dHRvbjtcbiAgICAgIF9zdG9wRXZlbnRQcm9wYWdhdGlvbiRmaXJlQ2xpY2suZmlyZUNsaWNrKCR0YXJnZXRFbGVtZW50LCBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRmFsbGJhY2sgLSBsZXQgdGhlIGJyb3dzZXIgaGFuZGxlIGl0LlxuICAgICAgJHRhcmdldEVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBoYW5kbGVLZXlEb3duO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2hleFRvUmdiID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgX3JlbW92ZUNsYXNzJGdldFRvcE1hcmdpbiRmYWRlSW4kc2hvdyRhZGRDbGFzcyA9IHJlcXVpcmUoJy4vaGFuZGxlLWRvbScpO1xuXG52YXIgX2RlZmF1bHRQYXJhbXMgPSByZXF1aXJlKCcuL2RlZmF1bHQtcGFyYW1zJyk7XG5cbnZhciBfZGVmYXVsdFBhcmFtczIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfZGVmYXVsdFBhcmFtcyk7XG5cbi8qXG4gKiBBZGQgbW9kYWwgKyBvdmVybGF5IHRvIERPTVxuICovXG5cbnZhciBfaW5qZWN0ZWRIVE1MID0gcmVxdWlyZSgnLi9pbmplY3RlZC1odG1sJyk7XG5cbnZhciBfaW5qZWN0ZWRIVE1MMiA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9pbmplY3RlZEhUTUwpO1xuXG52YXIgbW9kYWxDbGFzcyA9ICcuc3dlZXQtYWxlcnQnO1xudmFyIG92ZXJsYXlDbGFzcyA9ICcuc3dlZXQtb3ZlcmxheSc7XG5cbnZhciBzd2VldEFsZXJ0SW5pdGlhbGl6ZSA9IGZ1bmN0aW9uIHN3ZWV0QWxlcnRJbml0aWFsaXplKCkge1xuICB2YXIgc3dlZXRXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHN3ZWV0V3JhcC5pbm5lckhUTUwgPSBfaW5qZWN0ZWRIVE1MMlsnZGVmYXVsdCddO1xuXG4gIC8vIEFwcGVuZCBlbGVtZW50cyB0byBib2R5XG4gIHdoaWxlIChzd2VldFdyYXAuZmlyc3RDaGlsZCkge1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc3dlZXRXcmFwLmZpcnN0Q2hpbGQpO1xuICB9XG59O1xuXG4vKlxuICogR2V0IERPTSBlbGVtZW50IG9mIG1vZGFsXG4gKi9cbnZhciBnZXRNb2RhbCA9IChmdW5jdGlvbiAoX2dldE1vZGFsKSB7XG4gIGZ1bmN0aW9uIGdldE1vZGFsKCkge1xuICAgIHJldHVybiBfZ2V0TW9kYWwuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIGdldE1vZGFsLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfZ2V0TW9kYWwudG9TdHJpbmcoKTtcbiAgfTtcblxuICByZXR1cm4gZ2V0TW9kYWw7XG59KShmdW5jdGlvbiAoKSB7XG4gIHZhciAkbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vZGFsQ2xhc3MpO1xuXG4gIGlmICghJG1vZGFsKSB7XG4gICAgc3dlZXRBbGVydEluaXRpYWxpemUoKTtcbiAgICAkbW9kYWwgPSBnZXRNb2RhbCgpO1xuICB9XG5cbiAgcmV0dXJuICRtb2RhbDtcbn0pO1xuXG4vKlxuICogR2V0IERPTSBlbGVtZW50IG9mIGlucHV0IChpbiBtb2RhbClcbiAqL1xudmFyIGdldElucHV0ID0gZnVuY3Rpb24gZ2V0SW5wdXQoKSB7XG4gIHZhciAkbW9kYWwgPSBnZXRNb2RhbCgpO1xuICBpZiAoJG1vZGFsKSB7XG4gICAgcmV0dXJuICRtb2RhbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuICB9XG59O1xuXG4vKlxuICogR2V0IERPTSBlbGVtZW50IG9mIG92ZXJsYXlcbiAqL1xudmFyIGdldE92ZXJsYXkgPSBmdW5jdGlvbiBnZXRPdmVybGF5KCkge1xuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvdmVybGF5Q2xhc3MpO1xufTtcblxuLypcbiAqIEFkZCBib3gtc2hhZG93IHN0eWxlIHRvIGJ1dHRvbiAoZGVwZW5kaW5nIG9uIGl0cyBjaG9zZW4gYmctY29sb3IpXG4gKi9cbnZhciBzZXRGb2N1c1N0eWxlID0gZnVuY3Rpb24gc2V0Rm9jdXNTdHlsZSgkYnV0dG9uLCBiZ0NvbG9yKSB7XG4gIHZhciByZ2JDb2xvciA9IF9oZXhUb1JnYi5oZXhUb1JnYihiZ0NvbG9yKTtcbiAgJGJ1dHRvbi5zdHlsZS5ib3hTaGFkb3cgPSAnMCAwIDJweCByZ2JhKCcgKyByZ2JDb2xvciArICcsIDAuOCksIGluc2V0IDAgMCAwIDFweCByZ2JhKDAsIDAsIDAsIDAuMDUpJztcbn07XG5cbi8qXG4gKiBBbmltYXRpb24gd2hlbiBvcGVuaW5nIG1vZGFsXG4gKi9cbnZhciBvcGVuTW9kYWwgPSBmdW5jdGlvbiBvcGVuTW9kYWwoY2FsbGJhY2spIHtcbiAgdmFyICRtb2RhbCA9IGdldE1vZGFsKCk7XG4gIF9yZW1vdmVDbGFzcyRnZXRUb3BNYXJnaW4kZmFkZUluJHNob3ckYWRkQ2xhc3MuZmFkZUluKGdldE92ZXJsYXkoKSwgMTApO1xuICBfcmVtb3ZlQ2xhc3MkZ2V0VG9wTWFyZ2luJGZhZGVJbiRzaG93JGFkZENsYXNzLnNob3coJG1vZGFsKTtcbiAgX3JlbW92ZUNsYXNzJGdldFRvcE1hcmdpbiRmYWRlSW4kc2hvdyRhZGRDbGFzcy5hZGRDbGFzcygkbW9kYWwsICdzaG93U3dlZXRBbGVydCcpO1xuICBfcmVtb3ZlQ2xhc3MkZ2V0VG9wTWFyZ2luJGZhZGVJbiRzaG93JGFkZENsYXNzLnJlbW92ZUNsYXNzKCRtb2RhbCwgJ2hpZGVTd2VldEFsZXJ0Jyk7XG5cbiAgd2luZG93LnByZXZpb3VzQWN0aXZlRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gIHZhciAkb2tCdXR0b24gPSAkbW9kYWwucXVlcnlTZWxlY3RvcignYnV0dG9uLmNvbmZpcm0nKTtcbiAgJG9rQnV0dG9uLmZvY3VzKCk7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgX3JlbW92ZUNsYXNzJGdldFRvcE1hcmdpbiRmYWRlSW4kc2hvdyRhZGRDbGFzcy5hZGRDbGFzcygkbW9kYWwsICd2aXNpYmxlJyk7XG4gIH0sIDUwMCk7XG5cbiAgdmFyIHRpbWVyID0gJG1vZGFsLmdldEF0dHJpYnV0ZSgnZGF0YS10aW1lcicpO1xuXG4gIGlmICh0aW1lciAhPT0gJ251bGwnICYmIHRpbWVyICE9PSAnJykge1xuICAgIHZhciB0aW1lckNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgJG1vZGFsLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBkb25lRnVuY3Rpb25FeGlzdHMgPSAodGltZXJDYWxsYmFjayB8fCBudWxsKSAmJiAkbW9kYWwuZ2V0QXR0cmlidXRlKCdkYXRhLWhhcy1kb25lLWZ1bmN0aW9uJykgPT09ICd0cnVlJztcbiAgICAgIGlmIChkb25lRnVuY3Rpb25FeGlzdHMpIHtcbiAgICAgICAgdGltZXJDYWxsYmFjayhudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3ZWV0QWxlcnQuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9LCB0aW1lcik7XG4gIH1cbn07XG5cbi8qXG4gKiBSZXNldCB0aGUgc3R5bGluZyBvZiB0aGUgaW5wdXRcbiAqIChmb3IgZXhhbXBsZSBpZiBlcnJvcnMgaGF2ZSBiZWVuIHNob3duKVxuICovXG52YXIgcmVzZXRJbnB1dCA9IGZ1bmN0aW9uIHJlc2V0SW5wdXQoKSB7XG4gIHZhciAkbW9kYWwgPSBnZXRNb2RhbCgpO1xuICB2YXIgJGlucHV0ID0gZ2V0SW5wdXQoKTtcblxuICBfcmVtb3ZlQ2xhc3MkZ2V0VG9wTWFyZ2luJGZhZGVJbiRzaG93JGFkZENsYXNzLnJlbW92ZUNsYXNzKCRtb2RhbCwgJ3Nob3ctaW5wdXQnKTtcbiAgJGlucHV0LnZhbHVlID0gX2RlZmF1bHRQYXJhbXMyWydkZWZhdWx0J10uaW5wdXRWYWx1ZTtcbiAgJGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsIF9kZWZhdWx0UGFyYW1zMlsnZGVmYXVsdCddLmlucHV0VHlwZSk7XG4gICRpbnB1dC5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgX2RlZmF1bHRQYXJhbXMyWydkZWZhdWx0J10uaW5wdXRQbGFjZWhvbGRlcik7XG5cbiAgcmVzZXRJbnB1dEVycm9yKCk7XG59O1xuXG52YXIgcmVzZXRJbnB1dEVycm9yID0gZnVuY3Rpb24gcmVzZXRJbnB1dEVycm9yKGV2ZW50KSB7XG4gIC8vIElmIHByZXNzIGVudGVyID0+IGlnbm9yZVxuICBpZiAoZXZlbnQgJiYgZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgJG1vZGFsID0gZ2V0TW9kYWwoKTtcblxuICB2YXIgJGVycm9ySWNvbiA9ICRtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2EtaW5wdXQtZXJyb3InKTtcbiAgX3JlbW92ZUNsYXNzJGdldFRvcE1hcmdpbiRmYWRlSW4kc2hvdyRhZGRDbGFzcy5yZW1vdmVDbGFzcygkZXJyb3JJY29uLCAnc2hvdycpO1xuXG4gIHZhciAkZXJyb3JDb250YWluZXIgPSAkbW9kYWwucXVlcnlTZWxlY3RvcignLnNhLWVycm9yLWNvbnRhaW5lcicpO1xuICBfcmVtb3ZlQ2xhc3MkZ2V0VG9wTWFyZ2luJGZhZGVJbiRzaG93JGFkZENsYXNzLnJlbW92ZUNsYXNzKCRlcnJvckNvbnRhaW5lciwgJ3Nob3cnKTtcbn07XG5cbi8qXG4gKiBTZXQgXCJtYXJnaW4tdG9wXCItcHJvcGVydHkgb24gbW9kYWwgYmFzZWQgb24gaXRzIGNvbXB1dGVkIGhlaWdodFxuICovXG52YXIgZml4VmVydGljYWxQb3NpdGlvbiA9IGZ1bmN0aW9uIGZpeFZlcnRpY2FsUG9zaXRpb24oKSB7XG4gIHZhciAkbW9kYWwgPSBnZXRNb2RhbCgpO1xuICAkbW9kYWwuc3R5bGUubWFyZ2luVG9wID0gX3JlbW92ZUNsYXNzJGdldFRvcE1hcmdpbiRmYWRlSW4kc2hvdyRhZGRDbGFzcy5nZXRUb3BNYXJnaW4oZ2V0TW9kYWwoKSk7XG59O1xuXG5leHBvcnRzLnN3ZWV0QWxlcnRJbml0aWFsaXplID0gc3dlZXRBbGVydEluaXRpYWxpemU7XG5leHBvcnRzLmdldE1vZGFsID0gZ2V0TW9kYWw7XG5leHBvcnRzLmdldE92ZXJsYXkgPSBnZXRPdmVybGF5O1xuZXhwb3J0cy5nZXRJbnB1dCA9IGdldElucHV0O1xuZXhwb3J0cy5zZXRGb2N1c1N0eWxlID0gc2V0Rm9jdXNTdHlsZTtcbmV4cG9ydHMub3Blbk1vZGFsID0gb3Blbk1vZGFsO1xuZXhwb3J0cy5yZXNldElucHV0ID0gcmVzZXRJbnB1dDtcbmV4cG9ydHMucmVzZXRJbnB1dEVycm9yID0gcmVzZXRJbnB1dEVycm9yO1xuZXhwb3J0cy5maXhWZXJ0aWNhbFBvc2l0aW9uID0gZml4VmVydGljYWxQb3NpdGlvbjsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBpbmplY3RlZEhUTUwgPVxuXG4vLyBEYXJrIG92ZXJsYXlcblwiPGRpdiBjbGFzcz1cXFwic3dlZXQtb3ZlcmxheVxcXCIgdGFiSW5kZXg9XFxcIi0xXFxcIj48L2Rpdj5cIiArXG5cbi8vIE1vZGFsXG5cIjxkaXYgY2xhc3M9XFxcInN3ZWV0LWFsZXJ0XFxcIj5cIiArXG5cbi8vIEVycm9yIGljb25cblwiPGRpdiBjbGFzcz1cXFwic2EtaWNvbiBzYS1lcnJvclxcXCI+XFxuICAgICAgPHNwYW4gY2xhc3M9XFxcInNhLXgtbWFya1xcXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwic2EtbGluZSBzYS1sZWZ0XFxcIj48L3NwYW4+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwic2EtbGluZSBzYS1yaWdodFxcXCI+PC9zcGFuPlxcbiAgICAgIDwvc3Bhbj5cXG4gICAgPC9kaXY+XCIgK1xuXG4vLyBXYXJuaW5nIGljb25cblwiPGRpdiBjbGFzcz1cXFwic2EtaWNvbiBzYS13YXJuaW5nXFxcIj5cXG4gICAgICA8c3BhbiBjbGFzcz1cXFwic2EtYm9keVxcXCI+PC9zcGFuPlxcbiAgICAgIDxzcGFuIGNsYXNzPVxcXCJzYS1kb3RcXFwiPjwvc3Bhbj5cXG4gICAgPC9kaXY+XCIgK1xuXG4vLyBJbmZvIGljb25cblwiPGRpdiBjbGFzcz1cXFwic2EtaWNvbiBzYS1pbmZvXFxcIj48L2Rpdj5cIiArXG5cbi8vIFN1Y2Nlc3MgaWNvblxuXCI8ZGl2IGNsYXNzPVxcXCJzYS1pY29uIHNhLXN1Y2Nlc3NcXFwiPlxcbiAgICAgIDxzcGFuIGNsYXNzPVxcXCJzYS1saW5lIHNhLXRpcFxcXCI+PC9zcGFuPlxcbiAgICAgIDxzcGFuIGNsYXNzPVxcXCJzYS1saW5lIHNhLWxvbmdcXFwiPjwvc3Bhbj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJzYS1wbGFjZWhvbGRlclxcXCI+PC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwic2EtZml4XFxcIj48L2Rpdj5cXG4gICAgPC9kaXY+XCIgKyBcIjxkaXYgY2xhc3M9XFxcInNhLWljb24gc2EtY3VzdG9tXFxcIj48L2Rpdj5cIiArXG5cbi8vIFRpdGxlLCB0ZXh0IGFuZCBpbnB1dFxuXCI8aDI+VGl0bGU8L2gyPlxcbiAgICA8cD5UZXh0PC9wPlxcbiAgICA8ZmllbGRzZXQ+XFxuICAgICAgPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIHRhYkluZGV4PVxcXCIzXFxcIiAvPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcInNhLWlucHV0LWVycm9yXFxcIj48L2Rpdj5cXG4gICAgPC9maWVsZHNldD5cIiArXG5cbi8vIElucHV0IGVycm9yc1xuXCI8ZGl2IGNsYXNzPVxcXCJzYS1lcnJvci1jb250YWluZXJcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImljb25cXFwiPiE8L2Rpdj5cXG4gICAgICA8cD5Ob3QgdmFsaWQhPC9wPlxcbiAgICA8L2Rpdj5cIiArXG5cbi8vIENhbmNlbCBhbmQgY29uZmlybSBidXR0b25zXG5cIjxkaXYgY2xhc3M9XFxcInNhLWJ1dHRvbi1jb250YWluZXJcXFwiPlxcbiAgICAgIDxidXR0b24gY2xhc3M9XFxcImNhbmNlbFxcXCIgdGFiSW5kZXg9XFxcIjJcXFwiPkNhbmNlbDwvYnV0dG9uPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcInNhLWNvbmZpcm0tYnV0dG9uLWNvbnRhaW5lclxcXCI+XFxuICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJjb25maXJtXFxcIiB0YWJJbmRleD1cXFwiMVxcXCI+T0s8L2J1dHRvbj5cIiArXG5cbi8vIExvYWRpbmcgYW5pbWF0aW9uXG5cIjxkaXYgY2xhc3M9XFxcImxhLWJhbGwtZmFsbFxcXCI+XFxuICAgICAgICAgIDxkaXY+PC9kaXY+XFxuICAgICAgICAgIDxkaXY+PC9kaXY+XFxuICAgICAgICAgIDxkaXY+PC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XCIgK1xuXG4vLyBFbmQgb2YgbW9kYWxcblwiPC9kaXY+XCI7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gaW5qZWN0ZWRIVE1MO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lzSUU4ID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgX2dldE1vZGFsJGdldElucHV0JHNldEZvY3VzU3R5bGUgPSByZXF1aXJlKCcuL2hhbmRsZS1zd2FsLWRvbScpO1xuXG52YXIgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlID0gcmVxdWlyZSgnLi9oYW5kbGUtZG9tJyk7XG5cbnZhciBhbGVydFR5cGVzID0gWydlcnJvcicsICd3YXJuaW5nJywgJ2luZm8nLCAnc3VjY2VzcycsICdpbnB1dCcsICdwcm9tcHQnXTtcblxuLypcbiAqIFNldCB0eXBlLCB0ZXh0IGFuZCBhY3Rpb25zIG9uIG1vZGFsXG4gKi9cbnZhciBzZXRQYXJhbWV0ZXJzID0gZnVuY3Rpb24gc2V0UGFyYW1ldGVycyhwYXJhbXMpIHtcbiAgdmFyIG1vZGFsID0gX2dldE1vZGFsJGdldElucHV0JHNldEZvY3VzU3R5bGUuZ2V0TW9kYWwoKTtcblxuICB2YXIgJHRpdGxlID0gbW9kYWwucXVlcnlTZWxlY3RvcignaDInKTtcbiAgdmFyICR0ZXh0ID0gbW9kYWwucXVlcnlTZWxlY3RvcigncCcpO1xuICB2YXIgJGNhbmNlbEJ0biA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5jYW5jZWwnKTtcbiAgdmFyICRjb25maXJtQnRuID0gbW9kYWwucXVlcnlTZWxlY3RvcignYnV0dG9uLmNvbmZpcm0nKTtcblxuICAvKlxuICAgKiBUaXRsZVxuICAgKi9cbiAgJHRpdGxlLmlubmVySFRNTCA9IHBhcmFtcy5odG1sID8gcGFyYW1zLnRpdGxlIDogX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlLmVzY2FwZUh0bWwocGFyYW1zLnRpdGxlKS5zcGxpdCgnXFxuJykuam9pbignPGJyPicpO1xuXG4gIC8qXG4gICAqIFRleHRcbiAgICovXG4gICR0ZXh0LmlubmVySFRNTCA9IHBhcmFtcy5odG1sID8gcGFyYW1zLnRleHQgOiBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUuZXNjYXBlSHRtbChwYXJhbXMudGV4dCB8fCAnJykuc3BsaXQoJ1xcbicpLmpvaW4oJzxicj4nKTtcbiAgaWYgKHBhcmFtcy50ZXh0KSBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUuc2hvdygkdGV4dCk7XG5cbiAgLypcbiAgICogQ3VzdG9tIGNsYXNzXG4gICAqL1xuICBpZiAocGFyYW1zLmN1c3RvbUNsYXNzKSB7XG4gICAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlLmFkZENsYXNzKG1vZGFsLCBwYXJhbXMuY3VzdG9tQ2xhc3MpO1xuICAgIG1vZGFsLnNldEF0dHJpYnV0ZSgnZGF0YS1jdXN0b20tY2xhc3MnLCBwYXJhbXMuY3VzdG9tQ2xhc3MpO1xuICB9IGVsc2Uge1xuICAgIC8vIEZpbmQgcHJldmlvdXNseSBzZXQgY2xhc3NlcyBhbmQgcmVtb3ZlIHRoZW1cbiAgICB2YXIgY3VzdG9tQ2xhc3MgPSBtb2RhbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY3VzdG9tLWNsYXNzJyk7XG4gICAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlLnJlbW92ZUNsYXNzKG1vZGFsLCBjdXN0b21DbGFzcyk7XG4gICAgbW9kYWwuc2V0QXR0cmlidXRlKCdkYXRhLWN1c3RvbS1jbGFzcycsICcnKTtcbiAgfVxuXG4gIC8qXG4gICAqIEljb25cbiAgICovXG4gIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZS5oaWRlKG1vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zYS1pY29uJykpO1xuXG4gIGlmIChwYXJhbXMudHlwZSAmJiAhX2lzSUU4LmlzSUU4KCkpIHtcbiAgICB2YXIgX3JldCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICAgIHZhciB2YWxpZFR5cGUgPSBmYWxzZTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGVydFR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChwYXJhbXMudHlwZSA9PT0gYWxlcnRUeXBlc1tpXSkge1xuICAgICAgICAgIHZhbGlkVHlwZSA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCF2YWxpZFR5cGUpIHtcbiAgICAgICAgbG9nU3RyKCdVbmtub3duIGFsZXJ0IHR5cGU6ICcgKyBwYXJhbXMudHlwZSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdjogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgdmFyIHR5cGVzV2l0aEljb25zID0gWydzdWNjZXNzJywgJ2Vycm9yJywgJ3dhcm5pbmcnLCAnaW5mbyddO1xuICAgICAgdmFyICRpY29uID0gdW5kZWZpbmVkO1xuXG4gICAgICBpZiAodHlwZXNXaXRoSWNvbnMuaW5kZXhPZihwYXJhbXMudHlwZSkgIT09IC0xKSB7XG4gICAgICAgICRpY29uID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnNhLWljb24uJyArICdzYS0nICsgcGFyYW1zLnR5cGUpO1xuICAgICAgICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUuc2hvdygkaWNvbik7XG4gICAgICB9XG5cbiAgICAgIHZhciAkaW5wdXQgPSBfZ2V0TW9kYWwkZ2V0SW5wdXQkc2V0Rm9jdXNTdHlsZS5nZXRJbnB1dCgpO1xuXG4gICAgICAvLyBBbmltYXRlIGljb25cbiAgICAgIHN3aXRjaCAocGFyYW1zLnR5cGUpIHtcblxuICAgICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUuYWRkQ2xhc3MoJGljb24sICdhbmltYXRlJyk7XG4gICAgICAgICAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlLmFkZENsYXNzKCRpY29uLnF1ZXJ5U2VsZWN0b3IoJy5zYS10aXAnKSwgJ2FuaW1hdGVTdWNjZXNzVGlwJyk7XG4gICAgICAgICAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlLmFkZENsYXNzKCRpY29uLnF1ZXJ5U2VsZWN0b3IoJy5zYS1sb25nJyksICdhbmltYXRlU3VjY2Vzc0xvbmcnKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgICAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlLmFkZENsYXNzKCRpY29uLCAnYW5pbWF0ZUVycm9ySWNvbicpO1xuICAgICAgICAgIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZS5hZGRDbGFzcygkaWNvbi5xdWVyeVNlbGVjdG9yKCcuc2EteC1tYXJrJyksICdhbmltYXRlWE1hcmsnKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgICAgICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUuYWRkQ2xhc3MoJGljb24sICdwdWxzZVdhcm5pbmcnKTtcbiAgICAgICAgICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUuYWRkQ2xhc3MoJGljb24ucXVlcnlTZWxlY3RvcignLnNhLWJvZHknKSwgJ3B1bHNlV2FybmluZ0lucycpO1xuICAgICAgICAgIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZS5hZGRDbGFzcygkaWNvbi5xdWVyeVNlbGVjdG9yKCcuc2EtZG90JyksICdwdWxzZVdhcm5pbmdJbnMnKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdpbnB1dCc6XG4gICAgICAgIGNhc2UgJ3Byb21wdCc6XG4gICAgICAgICAgJGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsIHBhcmFtcy5pbnB1dFR5cGUpO1xuICAgICAgICAgICRpbnB1dC52YWx1ZSA9IHBhcmFtcy5pbnB1dFZhbHVlO1xuICAgICAgICAgICRpbnB1dC5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgcGFyYW1zLmlucHV0UGxhY2Vob2xkZXIpO1xuICAgICAgICAgIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZS5hZGRDbGFzcyhtb2RhbCwgJ3Nob3ctaW5wdXQnKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRpbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgJGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgc3dhbC5yZXNldElucHV0RXJyb3IpO1xuICAgICAgICAgIH0sIDQwMCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSkoKTtcblxuICAgIGlmICh0eXBlb2YgX3JldCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBfcmV0LnY7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogQ3VzdG9tIGltYWdlXG4gICAqL1xuICBpZiAocGFyYW1zLmltYWdlVXJsKSB7XG4gICAgdmFyICRjdXN0b21JY29uID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnNhLWljb24uc2EtY3VzdG9tJyk7XG5cbiAgICAkY3VzdG9tSWNvbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKCcgKyBwYXJhbXMuaW1hZ2VVcmwgKyAnKSc7XG4gICAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlLnNob3coJGN1c3RvbUljb24pO1xuXG4gICAgdmFyIF9pbWdXaWR0aCA9IDgwO1xuICAgIHZhciBfaW1nSGVpZ2h0ID0gODA7XG5cbiAgICBpZiAocGFyYW1zLmltYWdlU2l6ZSkge1xuICAgICAgdmFyIGRpbWVuc2lvbnMgPSBwYXJhbXMuaW1hZ2VTaXplLnRvU3RyaW5nKCkuc3BsaXQoJ3gnKTtcbiAgICAgIHZhciBpbWdXaWR0aCA9IGRpbWVuc2lvbnNbMF07XG4gICAgICB2YXIgaW1nSGVpZ2h0ID0gZGltZW5zaW9uc1sxXTtcblxuICAgICAgaWYgKCFpbWdXaWR0aCB8fCAhaW1nSGVpZ2h0KSB7XG4gICAgICAgIGxvZ1N0cignUGFyYW1ldGVyIGltYWdlU2l6ZSBleHBlY3RzIHZhbHVlIHdpdGggZm9ybWF0IFdJRFRIeEhFSUdIVCwgZ290ICcgKyBwYXJhbXMuaW1hZ2VTaXplKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9pbWdXaWR0aCA9IGltZ1dpZHRoO1xuICAgICAgICBfaW1nSGVpZ2h0ID0gaW1nSGVpZ2h0O1xuICAgICAgfVxuICAgIH1cblxuICAgICRjdXN0b21JY29uLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAkY3VzdG9tSWNvbi5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykgKyAnd2lkdGg6JyArIF9pbWdXaWR0aCArICdweDsgaGVpZ2h0OicgKyBfaW1nSGVpZ2h0ICsgJ3B4Jyk7XG4gIH1cblxuICAvKlxuICAgKiBTaG93IGNhbmNlbCBidXR0b24/XG4gICAqL1xuICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaGFzLWNhbmNlbC1idXR0b24nLCBwYXJhbXMuc2hvd0NhbmNlbEJ1dHRvbik7XG4gIGlmIChwYXJhbXMuc2hvd0NhbmNlbEJ1dHRvbikge1xuICAgICRjYW5jZWxCdG4uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICB9IGVsc2Uge1xuICAgIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZS5oaWRlKCRjYW5jZWxCdG4pO1xuICB9XG5cbiAgLypcbiAgICogU2hvdyBjb25maXJtIGJ1dHRvbj9cbiAgICovXG4gIG1vZGFsLnNldEF0dHJpYnV0ZSgnZGF0YS1oYXMtY29uZmlybS1idXR0b24nLCBwYXJhbXMuc2hvd0NvbmZpcm1CdXR0b24pO1xuICBpZiAocGFyYW1zLnNob3dDb25maXJtQnV0dG9uKSB7XG4gICAgJGNvbmZpcm1CdG4uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICB9IGVsc2Uge1xuICAgIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZS5oaWRlKCRjb25maXJtQnRuKTtcbiAgfVxuXG4gIC8qXG4gICAqIEN1c3RvbSB0ZXh0IG9uIGNhbmNlbC9jb25maXJtIGJ1dHRvbnNcbiAgICovXG4gIGlmIChwYXJhbXMuY2FuY2VsQnV0dG9uVGV4dCkge1xuICAgICRjYW5jZWxCdG4uaW5uZXJIVE1MID0gX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlLmVzY2FwZUh0bWwocGFyYW1zLmNhbmNlbEJ1dHRvblRleHQpO1xuICB9XG4gIGlmIChwYXJhbXMuY29uZmlybUJ1dHRvblRleHQpIHtcbiAgICAkY29uZmlybUJ0bi5pbm5lckhUTUwgPSBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUuZXNjYXBlSHRtbChwYXJhbXMuY29uZmlybUJ1dHRvblRleHQpO1xuICB9XG5cbiAgLypcbiAgICogQ3VzdG9tIGNvbG9yIG9uIGNvbmZpcm0gYnV0dG9uXG4gICAqL1xuICBpZiAocGFyYW1zLmNvbmZpcm1CdXR0b25Db2xvcikge1xuICAgIC8vIFNldCBjb25maXJtIGJ1dHRvbiB0byBzZWxlY3RlZCBiYWNrZ3JvdW5kIGNvbG9yXG4gICAgJGNvbmZpcm1CdG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gcGFyYW1zLmNvbmZpcm1CdXR0b25Db2xvcjtcblxuICAgIC8vIFNldCB0aGUgY29uZmlybSBidXR0b24gY29sb3IgdG8gdGhlIGxvYWRpbmcgcmluZ1xuICAgICRjb25maXJtQnRuLnN0eWxlLmJvcmRlckxlZnRDb2xvciA9IHBhcmFtcy5jb25maXJtTG9hZGluZ0J1dHRvbkNvbG9yO1xuICAgICRjb25maXJtQnRuLnN0eWxlLmJvcmRlclJpZ2h0Q29sb3IgPSBwYXJhbXMuY29uZmlybUxvYWRpbmdCdXR0b25Db2xvcjtcblxuICAgIC8vIFNldCBib3gtc2hhZG93IHRvIGRlZmF1bHQgZm9jdXNlZCBidXR0b25cbiAgICBfZ2V0TW9kYWwkZ2V0SW5wdXQkc2V0Rm9jdXNTdHlsZS5zZXRGb2N1c1N0eWxlKCRjb25maXJtQnRuLCBwYXJhbXMuY29uZmlybUJ1dHRvbkNvbG9yKTtcbiAgfVxuXG4gIC8qXG4gICAqIEFsbG93IG91dHNpZGUgY2xpY2tcbiAgICovXG4gIG1vZGFsLnNldEF0dHJpYnV0ZSgnZGF0YS1hbGxvdy1vdXRzaWRlLWNsaWNrJywgcGFyYW1zLmFsbG93T3V0c2lkZUNsaWNrKTtcblxuICAvKlxuICAgKiBDYWxsYmFjayBmdW5jdGlvblxuICAgKi9cbiAgdmFyIGhhc0RvbmVGdW5jdGlvbiA9IHBhcmFtcy5kb25lRnVuY3Rpb24gPyB0cnVlIDogZmFsc2U7XG4gIG1vZGFsLnNldEF0dHJpYnV0ZSgnZGF0YS1oYXMtZG9uZS1mdW5jdGlvbicsIGhhc0RvbmVGdW5jdGlvbik7XG5cbiAgLypcbiAgICogQW5pbWF0aW9uXG4gICAqL1xuICBpZiAoIXBhcmFtcy5hbmltYXRpb24pIHtcbiAgICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYW5pbWF0aW9uJywgJ25vbmUnKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zLmFuaW1hdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYW5pbWF0aW9uJywgcGFyYW1zLmFuaW1hdGlvbik7IC8vIEN1c3RvbSBhbmltYXRpb25cbiAgfSBlbHNlIHtcbiAgICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYW5pbWF0aW9uJywgJ3BvcCcpO1xuICB9XG5cbiAgLypcbiAgICogVGltZXJcbiAgICovXG4gIG1vZGFsLnNldEF0dHJpYnV0ZSgnZGF0YS10aW1lcicsIHBhcmFtcy50aW1lcik7XG59O1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBzZXRQYXJhbWV0ZXJzO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbi8qXG4gKiBBbGxvdyB1c2VyIHRvIHBhc3MgdGhlaXIgb3duIHBhcmFtc1xuICovXG52YXIgZXh0ZW5kID0gZnVuY3Rpb24gZXh0ZW5kKGEsIGIpIHtcbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoYi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiBhO1xufTtcblxuLypcbiAqIENvbnZlcnQgSEVYIGNvZGVzIHRvIFJHQiB2YWx1ZXMgKCMwMDAwMDAgLT4gcmdiKDAsMCwwKSlcbiAqL1xudmFyIGhleFRvUmdiID0gZnVuY3Rpb24gaGV4VG9SZ2IoaGV4KSB7XG4gIHZhciByZXN1bHQgPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoaGV4KTtcbiAgcmV0dXJuIHJlc3VsdCA/IHBhcnNlSW50KHJlc3VsdFsxXSwgMTYpICsgJywgJyArIHBhcnNlSW50KHJlc3VsdFsyXSwgMTYpICsgJywgJyArIHBhcnNlSW50KHJlc3VsdFszXSwgMTYpIDogbnVsbDtcbn07XG5cbi8qXG4gKiBDaGVjayBpZiB0aGUgdXNlciBpcyB1c2luZyBJbnRlcm5ldCBFeHBsb3JlciA4IChmb3IgZmFsbGJhY2tzKVxuICovXG52YXIgaXNJRTggPSBmdW5jdGlvbiBpc0lFOCgpIHtcbiAgcmV0dXJuIHdpbmRvdy5hdHRhY2hFdmVudCAmJiAhd2luZG93LmFkZEV2ZW50TGlzdGVuZXI7XG59O1xuXG4vKlxuICogSUUgY29tcGF0aWJsZSBsb2dnaW5nIGZvciBkZXZlbG9wZXJzXG4gKi9cbnZhciBsb2dTdHIgPSBmdW5jdGlvbiBsb2dTdHIoc3RyaW5nKSB7XG4gIGlmICh3aW5kb3cuY29uc29sZSkge1xuICAgIC8vIElFLi4uXG4gICAgd2luZG93LmNvbnNvbGUubG9nKCdTd2VldEFsZXJ0OiAnICsgc3RyaW5nKTtcbiAgfVxufTtcblxuLypcbiAqIFNldCBob3ZlciwgYWN0aXZlIGFuZCBmb2N1cy1zdGF0ZXMgZm9yIGJ1dHRvbnMgXG4gKiAoc291cmNlOiBodHRwOi8vd3d3LnNpdGVwb2ludC5jb20vamF2YXNjcmlwdC1nZW5lcmF0ZS1saWdodGVyLWRhcmtlci1jb2xvcilcbiAqL1xudmFyIGNvbG9yTHVtaW5hbmNlID0gZnVuY3Rpb24gY29sb3JMdW1pbmFuY2UoaGV4LCBsdW0pIHtcbiAgLy8gVmFsaWRhdGUgaGV4IHN0cmluZ1xuICBoZXggPSBTdHJpbmcoaGV4KS5yZXBsYWNlKC9bXjAtOWEtZl0vZ2ksICcnKTtcbiAgaWYgKGhleC5sZW5ndGggPCA2KSB7XG4gICAgaGV4ID0gaGV4WzBdICsgaGV4WzBdICsgaGV4WzFdICsgaGV4WzFdICsgaGV4WzJdICsgaGV4WzJdO1xuICB9XG4gIGx1bSA9IGx1bSB8fCAwO1xuXG4gIC8vIENvbnZlcnQgdG8gZGVjaW1hbCBhbmQgY2hhbmdlIGx1bWlub3NpdHlcbiAgdmFyIHJnYiA9ICcjJztcbiAgdmFyIGM7XG4gIHZhciBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICBjID0gcGFyc2VJbnQoaGV4LnN1YnN0cihpICogMiwgMiksIDE2KTtcbiAgICBjID0gTWF0aC5yb3VuZChNYXRoLm1pbihNYXRoLm1heCgwLCBjICsgYyAqIGx1bSksIDI1NSkpLnRvU3RyaW5nKDE2KTtcbiAgICByZ2IgKz0gKCcwMCcgKyBjKS5zdWJzdHIoYy5sZW5ndGgpO1xuICB9XG5cbiAgcmV0dXJuIHJnYjtcbn07XG5cbmV4cG9ydHMuZXh0ZW5kID0gZXh0ZW5kO1xuZXhwb3J0cy5oZXhUb1JnYiA9IGhleFRvUmdiO1xuZXhwb3J0cy5pc0lFOCA9IGlzSUU4O1xuZXhwb3J0cy5sb2dTdHIgPSBsb2dTdHI7XG5leHBvcnRzLmNvbG9yTHVtaW5hbmNlID0gY29sb3JMdW1pbmFuY2U7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuLy8gU3dlZXRBbGVydFxuLy8gMjAxNC0yMDE1IChjKSAtIFRyaXN0YW4gRWR3YXJkc1xuLy8gZ2l0aHViLmNvbS90NHQ1L3N3ZWV0YWxlcnRcblxuLypcbiAqIGpRdWVyeS1saWtlIGZ1bmN0aW9ucyBmb3IgbWFuaXB1bGF0aW5nIHRoZSBET01cbiAqL1xuXG52YXIgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlJGlzRGVzY2VuZGFudCRnZXRUb3BNYXJnaW4kZmFkZUluJGZhZGVPdXQkZmlyZUNsaWNrJHN0b3BFdmVudFByb3BhZ2F0aW9uID0gcmVxdWlyZSgnLi9tb2R1bGVzL2hhbmRsZS1kb20nKTtcblxuLypcbiAqIEhhbmR5IHV0aWxpdGllc1xuICovXG5cbnZhciBfZXh0ZW5kJGhleFRvUmdiJGlzSUU4JGxvZ1N0ciRjb2xvckx1bWluYW5jZSA9IHJlcXVpcmUoJy4vbW9kdWxlcy91dGlscycpO1xuXG4vKlxuICogIEhhbmRsZSBzd2VldEFsZXJ0J3MgRE9NIGVsZW1lbnRzXG4gKi9cblxudmFyIF9zd2VldEFsZXJ0SW5pdGlhbGl6ZSRnZXRNb2RhbCRnZXRPdmVybGF5JGdldElucHV0JHNldEZvY3VzU3R5bGUkb3Blbk1vZGFsJHJlc2V0SW5wdXQkZml4VmVydGljYWxQb3NpdGlvbiA9IHJlcXVpcmUoJy4vbW9kdWxlcy9oYW5kbGUtc3dhbC1kb20nKTtcblxuLy8gSGFuZGxlIGJ1dHRvbiBldmVudHMgYW5kIGtleWJvYXJkIGV2ZW50c1xuXG52YXIgX2hhbmRsZUJ1dHRvbiRoYW5kbGVDb25maXJtJGhhbmRsZUNhbmNlbCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9oYW5kbGUtY2xpY2snKTtcblxudmFyIF9oYW5kbGVLZXlEb3duID0gcmVxdWlyZSgnLi9tb2R1bGVzL2hhbmRsZS1rZXknKTtcblxudmFyIF9oYW5kbGVLZXlEb3duMiA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9oYW5kbGVLZXlEb3duKTtcblxuLy8gRGVmYXVsdCB2YWx1ZXNcblxudmFyIF9kZWZhdWx0UGFyYW1zID0gcmVxdWlyZSgnLi9tb2R1bGVzL2RlZmF1bHQtcGFyYW1zJyk7XG5cbnZhciBfZGVmYXVsdFBhcmFtczIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfZGVmYXVsdFBhcmFtcyk7XG5cbnZhciBfc2V0UGFyYW1ldGVycyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9zZXQtcGFyYW1zJyk7XG5cbnZhciBfc2V0UGFyYW1ldGVyczIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfc2V0UGFyYW1ldGVycyk7XG5cbi8qXG4gKiBSZW1lbWJlciBzdGF0ZSBpbiBjYXNlcyB3aGVyZSBvcGVuaW5nIGFuZCBoYW5kbGluZyBhIG1vZGFsIHdpbGwgZmlkZGxlIHdpdGggaXQuXG4gKiAoV2UgYWxzbyB1c2Ugd2luZG93LnByZXZpb3VzQWN0aXZlRWxlbWVudCBhcyBhIGdsb2JhbCB2YXJpYWJsZSlcbiAqL1xudmFyIHByZXZpb3VzV2luZG93S2V5RG93bjtcbnZhciBsYXN0Rm9jdXNlZEJ1dHRvbjtcblxuLypcbiAqIEdsb2JhbCBzd2VldEFsZXJ0IGZ1bmN0aW9uXG4gKiAodGhpcyBpcyB3aGF0IHRoZSB1c2VyIGNhbGxzKVxuICovXG52YXIgc3dlZXRBbGVydCwgc3dhbDtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gc3dlZXRBbGVydCA9IHN3YWwgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBjdXN0b21pemF0aW9ucyA9IGFyZ3VtZW50c1swXTtcblxuICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUkaXNEZXNjZW5kYW50JGdldFRvcE1hcmdpbiRmYWRlSW4kZmFkZU91dCRmaXJlQ2xpY2skc3RvcEV2ZW50UHJvcGFnYXRpb24uYWRkQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3N0b3Atc2Nyb2xsaW5nJyk7XG4gIF9zd2VldEFsZXJ0SW5pdGlhbGl6ZSRnZXRNb2RhbCRnZXRPdmVybGF5JGdldElucHV0JHNldEZvY3VzU3R5bGUkb3Blbk1vZGFsJHJlc2V0SW5wdXQkZml4VmVydGljYWxQb3NpdGlvbi5yZXNldElucHV0KCk7XG5cbiAgLypcbiAgICogVXNlIGFyZ3VtZW50IGlmIGRlZmluZWQgb3IgZGVmYXVsdCB2YWx1ZSBmcm9tIHBhcmFtcyBvYmplY3Qgb3RoZXJ3aXNlLlxuICAgKiBTdXBwb3J0cyB0aGUgY2FzZSB3aGVyZSBhIGRlZmF1bHQgdmFsdWUgaXMgYm9vbGVhbiB0cnVlIGFuZCBzaG91bGQgYmVcbiAgICogb3ZlcnJpZGRlbiBieSBhIGNvcnJlc3BvbmRpbmcgZXhwbGljaXQgYXJndW1lbnQgd2hpY2ggaXMgYm9vbGVhbiBmYWxzZS5cbiAgICovXG4gIGZ1bmN0aW9uIGFyZ3VtZW50T3JEZWZhdWx0KGtleSkge1xuICAgIHZhciBhcmdzID0gY3VzdG9taXphdGlvbnM7XG4gICAgcmV0dXJuIGFyZ3Nba2V5XSA9PT0gdW5kZWZpbmVkID8gX2RlZmF1bHRQYXJhbXMyWydkZWZhdWx0J11ba2V5XSA6IGFyZ3Nba2V5XTtcbiAgfVxuXG4gIGlmIChjdXN0b21pemF0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgX2V4dGVuZCRoZXhUb1JnYiRpc0lFOCRsb2dTdHIkY29sb3JMdW1pbmFuY2UubG9nU3RyKCdTd2VldEFsZXJ0IGV4cGVjdHMgYXQgbGVhc3QgMSBhdHRyaWJ1dGUhJyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHBhcmFtcyA9IF9leHRlbmQkaGV4VG9SZ2IkaXNJRTgkbG9nU3RyJGNvbG9yTHVtaW5hbmNlLmV4dGVuZCh7fSwgX2RlZmF1bHRQYXJhbXMyWydkZWZhdWx0J10pO1xuXG4gIHN3aXRjaCAodHlwZW9mIGN1c3RvbWl6YXRpb25zKSB7XG5cbiAgICAvLyBFeDogc3dhbChcIkhlbGxvXCIsIFwiSnVzdCB0ZXN0aW5nXCIsIFwiaW5mb1wiKTtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcGFyYW1zLnRpdGxlID0gY3VzdG9taXphdGlvbnM7XG4gICAgICBwYXJhbXMudGV4dCA9IGFyZ3VtZW50c1sxXSB8fCAnJztcbiAgICAgIHBhcmFtcy50eXBlID0gYXJndW1lbnRzWzJdIHx8ICcnO1xuICAgICAgYnJlYWs7XG5cbiAgICAvLyBFeDogc3dhbCh7IHRpdGxlOlwiSGVsbG9cIiwgdGV4dDogXCJKdXN0IHRlc3RpbmdcIiwgdHlwZTogXCJpbmZvXCIgfSk7XG4gICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgIGlmIChjdXN0b21pemF0aW9ucy50aXRsZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIF9leHRlbmQkaGV4VG9SZ2IkaXNJRTgkbG9nU3RyJGNvbG9yTHVtaW5hbmNlLmxvZ1N0cignTWlzc2luZyBcInRpdGxlXCIgYXJndW1lbnQhJyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcGFyYW1zLnRpdGxlID0gY3VzdG9taXphdGlvbnMudGl0bGU7XG5cbiAgICAgIGZvciAodmFyIGN1c3RvbU5hbWUgaW4gX2RlZmF1bHRQYXJhbXMyWydkZWZhdWx0J10pIHtcbiAgICAgICAgcGFyYW1zW2N1c3RvbU5hbWVdID0gYXJndW1lbnRPckRlZmF1bHQoY3VzdG9tTmFtZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNob3cgXCJDb25maXJtXCIgaW5zdGVhZCBvZiBcIk9LXCIgaWYgY2FuY2VsIGJ1dHRvbiBpcyB2aXNpYmxlXG4gICAgICBwYXJhbXMuY29uZmlybUJ1dHRvblRleHQgPSBwYXJhbXMuc2hvd0NhbmNlbEJ1dHRvbiA/ICdDb25maXJtJyA6IF9kZWZhdWx0UGFyYW1zMlsnZGVmYXVsdCddLmNvbmZpcm1CdXR0b25UZXh0O1xuICAgICAgcGFyYW1zLmNvbmZpcm1CdXR0b25UZXh0ID0gYXJndW1lbnRPckRlZmF1bHQoJ2NvbmZpcm1CdXR0b25UZXh0Jyk7XG5cbiAgICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gY2xpY2tpbmcgb24gXCJPS1wiL1wiQ2FuY2VsXCJcbiAgICAgIHBhcmFtcy5kb25lRnVuY3Rpb24gPSBhcmd1bWVudHNbMV0gfHwgbnVsbDtcblxuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgX2V4dGVuZCRoZXhUb1JnYiRpc0lFOCRsb2dTdHIkY29sb3JMdW1pbmFuY2UubG9nU3RyKCdVbmV4cGVjdGVkIHR5cGUgb2YgYXJndW1lbnQhIEV4cGVjdGVkIFwic3RyaW5nXCIgb3IgXCJvYmplY3RcIiwgZ290ICcgKyB0eXBlb2YgY3VzdG9taXphdGlvbnMpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gIH1cblxuICBfc2V0UGFyYW1ldGVyczJbJ2RlZmF1bHQnXShwYXJhbXMpO1xuICBfc3dlZXRBbGVydEluaXRpYWxpemUkZ2V0TW9kYWwkZ2V0T3ZlcmxheSRnZXRJbnB1dCRzZXRGb2N1c1N0eWxlJG9wZW5Nb2RhbCRyZXNldElucHV0JGZpeFZlcnRpY2FsUG9zaXRpb24uZml4VmVydGljYWxQb3NpdGlvbigpO1xuICBfc3dlZXRBbGVydEluaXRpYWxpemUkZ2V0TW9kYWwkZ2V0T3ZlcmxheSRnZXRJbnB1dCRzZXRGb2N1c1N0eWxlJG9wZW5Nb2RhbCRyZXNldElucHV0JGZpeFZlcnRpY2FsUG9zaXRpb24ub3Blbk1vZGFsKGFyZ3VtZW50c1sxXSk7XG5cbiAgLy8gTW9kYWwgaW50ZXJhY3Rpb25zXG4gIHZhciBtb2RhbCA9IF9zd2VldEFsZXJ0SW5pdGlhbGl6ZSRnZXRNb2RhbCRnZXRPdmVybGF5JGdldElucHV0JHNldEZvY3VzU3R5bGUkb3Blbk1vZGFsJHJlc2V0SW5wdXQkZml4VmVydGljYWxQb3NpdGlvbi5nZXRNb2RhbCgpO1xuXG4gIC8qXG4gICAqIE1ha2Ugc3VyZSBhbGwgbW9kYWwgYnV0dG9ucyByZXNwb25kIHRvIGFsbCBldmVudHNcbiAgICovXG4gIHZhciAkYnV0dG9ucyA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuICB2YXIgYnV0dG9uRXZlbnRzID0gWydvbmNsaWNrJywgJ29ubW91c2VvdmVyJywgJ29ubW91c2VvdXQnLCAnb25tb3VzZWRvd24nLCAnb25tb3VzZXVwJywgJ29uZm9jdXMnXTtcbiAgdmFyIG9uQnV0dG9uRXZlbnQgPSBmdW5jdGlvbiBvbkJ1dHRvbkV2ZW50KGUpIHtcbiAgICByZXR1cm4gX2hhbmRsZUJ1dHRvbiRoYW5kbGVDb25maXJtJGhhbmRsZUNhbmNlbC5oYW5kbGVCdXR0b24oZSwgcGFyYW1zLCBtb2RhbCk7XG4gIH07XG5cbiAgZm9yICh2YXIgYnRuSW5kZXggPSAwOyBidG5JbmRleCA8ICRidXR0b25zLmxlbmd0aDsgYnRuSW5kZXgrKykge1xuICAgIGZvciAodmFyIGV2dEluZGV4ID0gMDsgZXZ0SW5kZXggPCBidXR0b25FdmVudHMubGVuZ3RoOyBldnRJbmRleCsrKSB7XG4gICAgICB2YXIgYnRuRXZ0ID0gYnV0dG9uRXZlbnRzW2V2dEluZGV4XTtcbiAgICAgICRidXR0b25zW2J0bkluZGV4XVtidG5FdnRdID0gb25CdXR0b25FdmVudDtcbiAgICB9XG4gIH1cblxuICAvLyBDbGlja2luZyBvdXRzaWRlIHRoZSBtb2RhbCBkaXNtaXNzZXMgaXQgKGlmIGFsbG93ZWQgYnkgdXNlcilcbiAgX3N3ZWV0QWxlcnRJbml0aWFsaXplJGdldE1vZGFsJGdldE92ZXJsYXkkZ2V0SW5wdXQkc2V0Rm9jdXNTdHlsZSRvcGVuTW9kYWwkcmVzZXRJbnB1dCRmaXhWZXJ0aWNhbFBvc2l0aW9uLmdldE92ZXJsYXkoKS5vbmNsaWNrID0gb25CdXR0b25FdmVudDtcblxuICBwcmV2aW91c1dpbmRvd0tleURvd24gPSB3aW5kb3cub25rZXlkb3duO1xuXG4gIHZhciBvbktleUV2ZW50ID0gZnVuY3Rpb24gb25LZXlFdmVudChlKSB7XG4gICAgcmV0dXJuIF9oYW5kbGVLZXlEb3duMlsnZGVmYXVsdCddKGUsIHBhcmFtcywgbW9kYWwpO1xuICB9O1xuICB3aW5kb3cub25rZXlkb3duID0gb25LZXlFdmVudDtcblxuICB3aW5kb3cub25mb2N1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBXaGVuIHRoZSB1c2VyIGhhcyBmb2N1c2VkIGF3YXkgYW5kIGZvY3VzZWQgYmFjayBmcm9tIHRoZSB3aG9sZSB3aW5kb3cuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBQdXQgaW4gYSB0aW1lb3V0IHRvIGp1bXAgb3V0IG9mIHRoZSBldmVudCBzZXF1ZW5jZS5cbiAgICAgIC8vIENhbGxpbmcgZm9jdXMoKSBpbiB0aGUgZXZlbnQgc2VxdWVuY2UgY29uZnVzZXMgdGhpbmdzLlxuICAgICAgaWYgKGxhc3RGb2N1c2VkQnV0dG9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbGFzdEZvY3VzZWRCdXR0b24uZm9jdXMoKTtcbiAgICAgICAgbGFzdEZvY3VzZWRCdXR0b24gPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSwgMCk7XG4gIH07XG5cbiAgLy8gU2hvdyBhbGVydCB3aXRoIGVuYWJsZWQgYnV0dG9ucyBhbHdheXNcbiAgc3dhbC5lbmFibGVCdXR0b25zKCk7XG59O1xuXG4vKlxuICogU2V0IGRlZmF1bHQgcGFyYW1zIGZvciBlYWNoIHBvcHVwXG4gKiBAcGFyYW0ge09iamVjdH0gdXNlclBhcmFtc1xuICovXG5zd2VldEFsZXJ0LnNldERlZmF1bHRzID0gc3dhbC5zZXREZWZhdWx0cyA9IGZ1bmN0aW9uICh1c2VyUGFyYW1zKSB7XG4gIGlmICghdXNlclBhcmFtcykge1xuICAgIHRocm93IG5ldyBFcnJvcigndXNlclBhcmFtcyBpcyByZXF1aXJlZCcpO1xuICB9XG4gIGlmICh0eXBlb2YgdXNlclBhcmFtcyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZXJQYXJhbXMgaGFzIHRvIGJlIGEgb2JqZWN0Jyk7XG4gIH1cblxuICBfZXh0ZW5kJGhleFRvUmdiJGlzSUU4JGxvZ1N0ciRjb2xvckx1bWluYW5jZS5leHRlbmQoX2RlZmF1bHRQYXJhbXMyWydkZWZhdWx0J10sIHVzZXJQYXJhbXMpO1xufTtcblxuLypcbiAqIEFuaW1hdGlvbiB3aGVuIGNsb3NpbmcgbW9kYWxcbiAqL1xuc3dlZXRBbGVydC5jbG9zZSA9IHN3YWwuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBtb2RhbCA9IF9zd2VldEFsZXJ0SW5pdGlhbGl6ZSRnZXRNb2RhbCRnZXRPdmVybGF5JGdldElucHV0JHNldEZvY3VzU3R5bGUkb3Blbk1vZGFsJHJlc2V0SW5wdXQkZml4VmVydGljYWxQb3NpdGlvbi5nZXRNb2RhbCgpO1xuXG4gIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZSRpc0Rlc2NlbmRhbnQkZ2V0VG9wTWFyZ2luJGZhZGVJbiRmYWRlT3V0JGZpcmVDbGljayRzdG9wRXZlbnRQcm9wYWdhdGlvbi5mYWRlT3V0KF9zd2VldEFsZXJ0SW5pdGlhbGl6ZSRnZXRNb2RhbCRnZXRPdmVybGF5JGdldElucHV0JHNldEZvY3VzU3R5bGUkb3Blbk1vZGFsJHJlc2V0SW5wdXQkZml4VmVydGljYWxQb3NpdGlvbi5nZXRPdmVybGF5KCksIDUpO1xuICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUkaXNEZXNjZW5kYW50JGdldFRvcE1hcmdpbiRmYWRlSW4kZmFkZU91dCRmaXJlQ2xpY2skc3RvcEV2ZW50UHJvcGFnYXRpb24uZmFkZU91dChtb2RhbCwgNSk7XG4gIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZSRpc0Rlc2NlbmRhbnQkZ2V0VG9wTWFyZ2luJGZhZGVJbiRmYWRlT3V0JGZpcmVDbGljayRzdG9wRXZlbnRQcm9wYWdhdGlvbi5yZW1vdmVDbGFzcyhtb2RhbCwgJ3Nob3dTd2VldEFsZXJ0Jyk7XG4gIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZSRpc0Rlc2NlbmRhbnQkZ2V0VG9wTWFyZ2luJGZhZGVJbiRmYWRlT3V0JGZpcmVDbGljayRzdG9wRXZlbnRQcm9wYWdhdGlvbi5hZGRDbGFzcyhtb2RhbCwgJ2hpZGVTd2VldEFsZXJ0Jyk7XG4gIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZSRpc0Rlc2NlbmRhbnQkZ2V0VG9wTWFyZ2luJGZhZGVJbiRmYWRlT3V0JGZpcmVDbGljayRzdG9wRXZlbnRQcm9wYWdhdGlvbi5yZW1vdmVDbGFzcyhtb2RhbCwgJ3Zpc2libGUnKTtcblxuICAvKlxuICAgKiBSZXNldCBpY29uIGFuaW1hdGlvbnNcbiAgICovXG4gIHZhciAkc3VjY2Vzc0ljb24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2EtaWNvbi5zYS1zdWNjZXNzJyk7XG4gIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZSRpc0Rlc2NlbmRhbnQkZ2V0VG9wTWFyZ2luJGZhZGVJbiRmYWRlT3V0JGZpcmVDbGljayRzdG9wRXZlbnRQcm9wYWdhdGlvbi5yZW1vdmVDbGFzcygkc3VjY2Vzc0ljb24sICdhbmltYXRlJyk7XG4gIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZSRpc0Rlc2NlbmRhbnQkZ2V0VG9wTWFyZ2luJGZhZGVJbiRmYWRlT3V0JGZpcmVDbGljayRzdG9wRXZlbnRQcm9wYWdhdGlvbi5yZW1vdmVDbGFzcygkc3VjY2Vzc0ljb24ucXVlcnlTZWxlY3RvcignLnNhLXRpcCcpLCAnYW5pbWF0ZVN1Y2Nlc3NUaXAnKTtcbiAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlJGlzRGVzY2VuZGFudCRnZXRUb3BNYXJnaW4kZmFkZUluJGZhZGVPdXQkZmlyZUNsaWNrJHN0b3BFdmVudFByb3BhZ2F0aW9uLnJlbW92ZUNsYXNzKCRzdWNjZXNzSWNvbi5xdWVyeVNlbGVjdG9yKCcuc2EtbG9uZycpLCAnYW5pbWF0ZVN1Y2Nlc3NMb25nJyk7XG5cbiAgdmFyICRlcnJvckljb24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2EtaWNvbi5zYS1lcnJvcicpO1xuICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUkaXNEZXNjZW5kYW50JGdldFRvcE1hcmdpbiRmYWRlSW4kZmFkZU91dCRmaXJlQ2xpY2skc3RvcEV2ZW50UHJvcGFnYXRpb24ucmVtb3ZlQ2xhc3MoJGVycm9ySWNvbiwgJ2FuaW1hdGVFcnJvckljb24nKTtcbiAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlJGlzRGVzY2VuZGFudCRnZXRUb3BNYXJnaW4kZmFkZUluJGZhZGVPdXQkZmlyZUNsaWNrJHN0b3BFdmVudFByb3BhZ2F0aW9uLnJlbW92ZUNsYXNzKCRlcnJvckljb24ucXVlcnlTZWxlY3RvcignLnNhLXgtbWFyaycpLCAnYW5pbWF0ZVhNYXJrJyk7XG5cbiAgdmFyICR3YXJuaW5nSWNvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zYS1pY29uLnNhLXdhcm5pbmcnKTtcbiAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlJGlzRGVzY2VuZGFudCRnZXRUb3BNYXJnaW4kZmFkZUluJGZhZGVPdXQkZmlyZUNsaWNrJHN0b3BFdmVudFByb3BhZ2F0aW9uLnJlbW92ZUNsYXNzKCR3YXJuaW5nSWNvbiwgJ3B1bHNlV2FybmluZycpO1xuICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUkaXNEZXNjZW5kYW50JGdldFRvcE1hcmdpbiRmYWRlSW4kZmFkZU91dCRmaXJlQ2xpY2skc3RvcEV2ZW50UHJvcGFnYXRpb24ucmVtb3ZlQ2xhc3MoJHdhcm5pbmdJY29uLnF1ZXJ5U2VsZWN0b3IoJy5zYS1ib2R5JyksICdwdWxzZVdhcm5pbmdJbnMnKTtcbiAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlJGlzRGVzY2VuZGFudCRnZXRUb3BNYXJnaW4kZmFkZUluJGZhZGVPdXQkZmlyZUNsaWNrJHN0b3BFdmVudFByb3BhZ2F0aW9uLnJlbW92ZUNsYXNzKCR3YXJuaW5nSWNvbi5xdWVyeVNlbGVjdG9yKCcuc2EtZG90JyksICdwdWxzZVdhcm5pbmdJbnMnKTtcblxuICAvLyBSZXNldCBjdXN0b20gY2xhc3MgKGRlbGF5IHNvIHRoYXQgVUkgY2hhbmdlcyBhcmVuJ3QgdmlzaWJsZSlcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGN1c3RvbUNsYXNzID0gbW9kYWwuZ2V0QXR0cmlidXRlKCdkYXRhLWN1c3RvbS1jbGFzcycpO1xuICAgIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZSRpc0Rlc2NlbmRhbnQkZ2V0VG9wTWFyZ2luJGZhZGVJbiRmYWRlT3V0JGZpcmVDbGljayRzdG9wRXZlbnRQcm9wYWdhdGlvbi5yZW1vdmVDbGFzcyhtb2RhbCwgY3VzdG9tQ2xhc3MpO1xuICB9LCAzMDApO1xuXG4gIC8vIE1ha2UgcGFnZSBzY3JvbGxhYmxlIGFnYWluXG4gIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZSRpc0Rlc2NlbmRhbnQkZ2V0VG9wTWFyZ2luJGZhZGVJbiRmYWRlT3V0JGZpcmVDbGljayRzdG9wRXZlbnRQcm9wYWdhdGlvbi5yZW1vdmVDbGFzcyhkb2N1bWVudC5ib2R5LCAnc3RvcC1zY3JvbGxpbmcnKTtcblxuICAvLyBSZXNldCB0aGUgcGFnZSB0byBpdHMgcHJldmlvdXMgc3RhdGVcbiAgd2luZG93Lm9ua2V5ZG93biA9IHByZXZpb3VzV2luZG93S2V5RG93bjtcbiAgaWYgKHdpbmRvdy5wcmV2aW91c0FjdGl2ZUVsZW1lbnQpIHtcbiAgICB3aW5kb3cucHJldmlvdXNBY3RpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cbiAgbGFzdEZvY3VzZWRCdXR0b24gPSB1bmRlZmluZWQ7XG4gIGNsZWFyVGltZW91dChtb2RhbC50aW1lb3V0KTtcblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qXG4gKiBWYWxpZGF0aW9uIG9mIHRoZSBpbnB1dCBmaWVsZCBpcyBkb25lIGJ5IHVzZXJcbiAqIElmIHNvbWV0aGluZyBpcyB3cm9uZyA9PiBjYWxsIHNob3dJbnB1dEVycm9yIHdpdGggZXJyb3JNZXNzYWdlXG4gKi9cbnN3ZWV0QWxlcnQuc2hvd0lucHV0RXJyb3IgPSBzd2FsLnNob3dJbnB1dEVycm9yID0gZnVuY3Rpb24gKGVycm9yTWVzc2FnZSkge1xuICB2YXIgbW9kYWwgPSBfc3dlZXRBbGVydEluaXRpYWxpemUkZ2V0TW9kYWwkZ2V0T3ZlcmxheSRnZXRJbnB1dCRzZXRGb2N1c1N0eWxlJG9wZW5Nb2RhbCRyZXNldElucHV0JGZpeFZlcnRpY2FsUG9zaXRpb24uZ2V0TW9kYWwoKTtcblxuICB2YXIgJGVycm9ySWNvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zYS1pbnB1dC1lcnJvcicpO1xuICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUkaXNEZXNjZW5kYW50JGdldFRvcE1hcmdpbiRmYWRlSW4kZmFkZU91dCRmaXJlQ2xpY2skc3RvcEV2ZW50UHJvcGFnYXRpb24uYWRkQ2xhc3MoJGVycm9ySWNvbiwgJ3Nob3cnKTtcblxuICB2YXIgJGVycm9yQ29udGFpbmVyID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnNhLWVycm9yLWNvbnRhaW5lcicpO1xuICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUkaXNEZXNjZW5kYW50JGdldFRvcE1hcmdpbiRmYWRlSW4kZmFkZU91dCRmaXJlQ2xpY2skc3RvcEV2ZW50UHJvcGFnYXRpb24uYWRkQ2xhc3MoJGVycm9yQ29udGFpbmVyLCAnc2hvdycpO1xuXG4gICRlcnJvckNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdwJykuaW5uZXJIVE1MID0gZXJyb3JNZXNzYWdlO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHN3ZWV0QWxlcnQuZW5hYmxlQnV0dG9ucygpO1xuICB9LCAxKTtcblxuICBtb2RhbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLmZvY3VzKCk7XG59O1xuXG4vKlxuICogUmVzZXQgaW5wdXQgZXJyb3IgRE9NIGVsZW1lbnRzXG4gKi9cbnN3ZWV0QWxlcnQucmVzZXRJbnB1dEVycm9yID0gc3dhbC5yZXNldElucHV0RXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgLy8gSWYgcHJlc3MgZW50ZXIgPT4gaWdub3JlXG4gIGlmIChldmVudCAmJiBldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciAkbW9kYWwgPSBfc3dlZXRBbGVydEluaXRpYWxpemUkZ2V0TW9kYWwkZ2V0T3ZlcmxheSRnZXRJbnB1dCRzZXRGb2N1c1N0eWxlJG9wZW5Nb2RhbCRyZXNldElucHV0JGZpeFZlcnRpY2FsUG9zaXRpb24uZ2V0TW9kYWwoKTtcblxuICB2YXIgJGVycm9ySWNvbiA9ICRtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2EtaW5wdXQtZXJyb3InKTtcbiAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlJGlzRGVzY2VuZGFudCRnZXRUb3BNYXJnaW4kZmFkZUluJGZhZGVPdXQkZmlyZUNsaWNrJHN0b3BFdmVudFByb3BhZ2F0aW9uLnJlbW92ZUNsYXNzKCRlcnJvckljb24sICdzaG93Jyk7XG5cbiAgdmFyICRlcnJvckNvbnRhaW5lciA9ICRtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2EtZXJyb3ItY29udGFpbmVyJyk7XG4gIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZSRpc0Rlc2NlbmRhbnQkZ2V0VG9wTWFyZ2luJGZhZGVJbiRmYWRlT3V0JGZpcmVDbGljayRzdG9wRXZlbnRQcm9wYWdhdGlvbi5yZW1vdmVDbGFzcygkZXJyb3JDb250YWluZXIsICdzaG93Jyk7XG59O1xuXG4vKlxuICogRGlzYWJsZSBjb25maXJtIGFuZCBjYW5jZWwgYnV0dG9uc1xuICovXG5zd2VldEFsZXJ0LmRpc2FibGVCdXR0b25zID0gc3dhbC5kaXNhYmxlQnV0dG9ucyA9IGZ1bmN0aW9uIChldmVudCkge1xuICB2YXIgbW9kYWwgPSBfc3dlZXRBbGVydEluaXRpYWxpemUkZ2V0TW9kYWwkZ2V0T3ZlcmxheSRnZXRJbnB1dCRzZXRGb2N1c1N0eWxlJG9wZW5Nb2RhbCRyZXNldElucHV0JGZpeFZlcnRpY2FsUG9zaXRpb24uZ2V0TW9kYWwoKTtcbiAgdmFyICRjb25maXJtQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignYnV0dG9uLmNvbmZpcm0nKTtcbiAgdmFyICRjYW5jZWxCdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCdidXR0b24uY2FuY2VsJyk7XG4gICRjb25maXJtQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgJGNhbmNlbEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG59O1xuXG4vKlxuICogRW5hYmxlIGNvbmZpcm0gYW5kIGNhbmNlbCBidXR0b25zXG4gKi9cbnN3ZWV0QWxlcnQuZW5hYmxlQnV0dG9ucyA9IHN3YWwuZW5hYmxlQnV0dG9ucyA9IGZ1bmN0aW9uIChldmVudCkge1xuICB2YXIgbW9kYWwgPSBfc3dlZXRBbGVydEluaXRpYWxpemUkZ2V0TW9kYWwkZ2V0T3ZlcmxheSRnZXRJbnB1dCRzZXRGb2N1c1N0eWxlJG9wZW5Nb2RhbCRyZXNldElucHV0JGZpeFZlcnRpY2FsUG9zaXRpb24uZ2V0TW9kYWwoKTtcbiAgdmFyICRjb25maXJtQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignYnV0dG9uLmNvbmZpcm0nKTtcbiAgdmFyICRjYW5jZWxCdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCdidXR0b24uY2FuY2VsJyk7XG4gICRjb25maXJtQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICRjYW5jZWxCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbn07XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAvLyBUaGUgJ2hhbmRsZS1jbGljaycgbW9kdWxlIHJlcXVpcmVzXG4gIC8vIHRoYXQgJ3N3ZWV0QWxlcnQnIHdhcyBzZXQgYXMgZ2xvYmFsLlxuICB3aW5kb3cuc3dlZXRBbGVydCA9IHdpbmRvdy5zd2FsID0gc3dlZXRBbGVydDtcbn0gZWxzZSB7XG4gIF9leHRlbmQkaGV4VG9SZ2IkaXNJRTgkbG9nU3RyJGNvbG9yTHVtaW5hbmNlLmxvZ1N0cignU3dlZXRBbGVydCBpcyBhIGZyb250ZW5kIG1vZHVsZSEnKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyJdfQ==

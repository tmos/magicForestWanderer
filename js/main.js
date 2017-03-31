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
    function Floor(element) {
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

},{"./constants":5}],2:[function(require,module,exports){
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
                    tmp[y][x] = new Floor_1.default(constants_1.monster);
                }
                else if (tmpRand === 1) {
                    // It's a trap!
                    tmp[y][x] = new Floor_1.default(constants_1.trap);
                }
                else {
                    tmp[y][x] = new Floor_1.default();
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
                this.forest[outY][outX] = new Floor_1.default(constants_1.goal);
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

},{"./Floor":1,"./constants":5}],3:[function(require,module,exports){
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
        this.update();
    };
    Game.prototype.update = function () {
        this.wanderer.updateMap();
        if (this.wanderer.isDead()) {
            swal({
                title: "☠",
                text: "You just died. Too bad.",
                type: "error",
            });
            this.wanderer.setScore(-(10 * this.getForest().getNumberOfCases()));
            this.setWanderer(this.wanderer.getMap());
        }
        if (this.wanderer.isOut()) {
            // You just won this forest !
            this.wanderer.setScore(10 * this.getForest().getNumberOfCases());
            // Create the next level
            var newSize = this.getForest().getForest().length + 1;
            swal({
                title: "⭐️",
                text: "You just won this forest !",
                type: "success",
            });
            this.init(newSize, newSize);
        }
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
    Game.prototype.setWanderer = function (m) {
        if (m === void 0) { m = undefined; }
        var forest = this.currentForest.getForest();
        var isOk = false;
        var y;
        var x;
        while (!isOk) {
            y = Math.floor(Math.random() * (forest.length - 0) + 0);
            x = Math.floor(Math.random() * (forest[0].length - 0) + 0);
            if (forest[y][x].isEmpty) {
                isOk = true;
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

},{"./Forest":2,"./Wanderer":4,"sweetalert":19}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jsprolog");
var Floor_1 = require("./Floor");
/**
 * The wanderer, the hero of this quest. Good luck son...
 */
var Wanderer = (function () {
    function Wanderer(playerY, playerX, darkWoods, score) {
        if (score === void 0) { score = 0; }
        this.forestMap = [];
        this.forest = darkWoods;
        this.score = score;
        this.x = playerX;
        this.y = playerY;
        var height = darkWoods.getForest().length;
        var width = darkWoods.getForest()[0].length;
        this.forestMapHeight = height;
        this.forestMapWidth = width;
        for (var y = 0; y < height; y++) {
            this.forestMap[y] = [];
            for (var x = 0; x < width; x++) {
                this.forestMap[y][x] = new Floor_1.default();
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
        return this.forestMap[this.y][this.x];
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
    Wanderer.prototype.think = function () {
        var thisFloor = this.forestMap[this.y][this.x];
        // Here goes all the logical stuff
        return this;
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
        this.setScore(-10);
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
    Wanderer.prototype.useSlingshot = function (y, x) {
        if (this.forest.getFloorContent(y, x).isMonster()) {
            this.forest.getFloorContent(y, x).killMonster();
            // @todo Call animation
        }
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
    return Wanderer;
}());
exports.default = Wanderer;

},{"./Floor":1,"jsprolog":7}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trap = "trap";
exports.empty = "";
exports.goal = "goal";
exports.monster = "monster";
exports.tree = "tree";

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("./Game");
var g = new Game_1.default("gameDiv", "scoreDiv");
g.init(3, 3);
g.update();
// Init manual game
document.onkeydown = function (e) {
    var arrowKeyHaveBeenPressed = false;
    switch (e.keyCode) {
        case 37:
            g.getWanderer().move("left");
            arrowKeyHaveBeenPressed = true;
            break;
        case 38:
            g.getWanderer().move("up");
            arrowKeyHaveBeenPressed = true;
            break;
        case 39:
            g.getWanderer().move("right");
            arrowKeyHaveBeenPressed = true;
            break;
        case 40:
            g.getWanderer().move("down");
            arrowKeyHaveBeenPressed = true;
            break;
        default:
            break;
    }
    if (arrowKeyHaveBeenPressed) {
        g.update();
    }
};

},{"./Game":3}],7:[function(require,module,exports){
"use strict";
var AST = require('./prologAST');
var Parser = require('./prologParser');
var Solver = require('./prologSolver');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { AST: AST, Parser: Parser, Solver: Solver };

},{"./prologAST":8,"./prologParser":9,"./prologSolver":10}],8:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (PartType) {
    PartType[PartType["Variable"] = 0] = "Variable";
    PartType[PartType["Atom"] = 1] = "Atom";
    PartType[PartType["Term"] = 2] = "Term";
})(exports.PartType || (exports.PartType = {}));
var PartType = exports.PartType;
var Part = (function () {
    /**
     * @class Part
     * @classdesc Part := Variable(name) | Atom(name) | Term(name, partlist)
     * @param {string} name Name of the variable/atom/term
     */
    function Part(name) {
        this.name = name;
    }
    Part.prototype.toString = function () {
        return this.name;
    };
    return Part;
}());
exports.Part = Part;
var Variable = (function (_super) {
    __extends(Variable, _super);
    function Variable(name) {
        _super.call(this, name);
    }
    return Variable;
}(Part));
exports.Variable = Variable;
Variable.prototype.type = PartType.Variable; // TODO:  verify if it's faster than instanceof checks
var Atom = (function (_super) {
    __extends(Atom, _super);
    function Atom(head) {
        _super.call(this, head);
    }
    Atom.Nil = new Atom(null);
    return Atom;
}(Part));
exports.Atom = Atom;
Atom.prototype.type = PartType.Atom; // TODO:  verify if it's faster than instanceof checks
/**
 * Term(name, list)
 */
var Term = (function (_super) {
    __extends(Term, _super);
    function Term(head, list) {
        _super.call(this, head);
        this.partlist = new Partlist(list);
    }
    Term.prototype.toString = function () {
        var result = "";
        if (this.name == "cons") {
            var x = this;
            while (x instanceof Term && x.name == "cons" && x.partlist.list.length == 2) {
                x = x.partlist.list[1];
            }
            if ((x === Atom.Nil) || x instanceof Variable) {
                x = this;
                result += "[";
                var com = false;
                while (x.type == PartType.Term && x.name == "cons" && x.partlist.list.length == 2) {
                    if (com) {
                        result += ", ";
                    }
                    result += x.partlist.list[0].toString();
                    com = true;
                    x = x.partlist.list[1];
                }
                if (x.type == PartType.Variable) {
                    result += " | ";
                }
                result += "]";
                return result;
            }
            else {
                result += "ERROR: unexpected atom: " + x.toString();
            }
        }
        result += this.name + "(" + this.partlist.toString() + ")";
        return result;
    };
    ;
    return Term;
}(Part));
exports.Term = Term;
Term.prototype.type = PartType.Term; // TODO:  verify if it's faster than instanceof checks
var Partlist = (function () {
    function Partlist(list) {
        this.list = list;
    }
    Partlist.prototype.toString = function () {
        return this.list.map(function (e) { return e.toString(); }).join(", ");
    };
    return Partlist;
}());
exports.Partlist = Partlist;
/**
 * Rule(head, bodylist): Part(head), [:- Body(bodylist)].
 */
var Rule = (function () {
    function Rule(head, bodylist) {
        this.head = head;
        this.body = bodylist && new Partlist(bodylist);
    }
    Object.defineProperty(Rule.prototype, "isFact", {
        get: function () {
            return !this.body;
        },
        enumerable: true,
        configurable: true
    });
    Rule.prototype.toString = function () {
        return this.head.toString() + (this.body ? " :- " + this.body.toString() + "." : ".");
    };
    return Rule;
}());
exports.Rule = Rule;
function listOfArray(array, cdr) {
    cdr = cdr || Atom.Nil;
    for (var i = array.length, car; car = array[--i];) {
        cdr = new Term("cons", [car, cdr]);
    }
    return cdr;
}
exports.listOfArray = listOfArray;

},{}],9:[function(require,module,exports){
"use strict";
var prologAST_1 = require('./prologAST');
/**
 * Parses the DB
 */
function parse(string) {
    var tk = new Tokeniser(string), rules = [];
    while (tk.current != null) {
        rules.push(parseRule(tk));
    }
    return rules;
}
exports.parse = parse;
function parseQuery(string) {
    var tk = new Tokeniser(string);
    return new prologAST_1.Partlist(parseBody(tk));
}
exports.parseQuery = parseQuery;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { parse: parse, parseQuery: parseQuery };
var tokenizerRules = [
    [/^([\(\)\.,\[\]\|]|\:\-)/, 0 /* Punc */],
    [/^([A-Z_][a-zA-Z0-9_]*)/, 1 /* Var */],
    [/^("[^"]*")/, 2 /* Id */],
    [/^([a-z][a-zA-Z0-9_]*)/, 2 /* Id */],
    [/^(-?\d+(\.\d+)?)/, 2 /* Id */, function (x) { return +x; }],
    [/^(\+|\-|\*|\/|\=|\!)/, 2 /* Id */]
];
var Tokeniser = (function () {
    function Tokeniser(source) {
        this.remainder = source;
        this.current = null;
        this.type = null; // "eof", TokenType.Id, TokenType.Var, TokenType.Punc etc.        
        this.consume(); // Load up the first token.
    }
    Tokeniser.prototype.consume = function () {
        if (this.type == 3 /* EOF */)
            return;
        // Eat any leading WS and %-style comments
        var r = this.remainder.match(/^(\s+|([%].*)[\n\r]+)*/);
        if (r) {
            this.remainder = this.remainder.substring(r[0].length);
        }
        if (!this.remainder.length) {
            this.current = null;
            this.type = 3 /* EOF */;
            return;
        }
        for (var i = 0, rule; rule = tokenizerRules[i++];) {
            if (r = this.remainder.match(rule[0])) {
                this.remainder = this.remainder.substring(r[0].length);
                this.type = rule[1];
                this.current = typeof (rule[2]) === "function" ? rule[2](r[1]) : r[1];
                return;
            }
        }
        throw "Unexpected tokenizer input";
    };
    Tokeniser.prototype.accept = function (type, symbol) {
        if (this.type === type && (typeof (symbol) === "undefined" || this.current === symbol)) {
            this.accepted = this.current;
            this.consume();
            return true;
        }
        return false;
    };
    Tokeniser.prototype.expect = function (type, symbol) {
        if (!this.accept(type, symbol)) {
            throw this.type === 3 /* EOF */ ? "Syntax error: unexpected end of file" : "Syntax error: unexpected token " + this.current;
        }
        return true; // TODO: no need for boolean?
    };
    return Tokeniser;
}());
//////////////////////////////////////////////////////////////////////
function parseRule(tk) {
    // Rule := Term . | Term :- PartList .
    var h = parseTerm(tk);
    if (tk.accept(0 /* Punc */, ".")) {
        return new prologAST_1.Rule(h);
    }
    tk.expect(0 /* Punc */, ":-");
    var b = parseBody(tk);
    return new prologAST_1.Rule(h, b);
}
function parseTerm(tk) {
    tk.expect(2 /* Id */);
    var name = tk.accepted;
    // accept fail and ! w/o ()
    if (tk.current != "(" && (name == "fail" || name === "!")) {
        return new prologAST_1.Term(name, []);
    }
    tk.expect(0 /* Punc */, "(");
    var p = [];
    while (tk.current !== "eof") {
        p.push(parsePart(tk));
        if (tk.accept(0 /* Punc */, ")")) {
            break;
        }
        tk.expect(0 /* Punc */, ",");
    }
    return new prologAST_1.Term(name, p);
}
function parsePart(tk) {
    // Part -> var | id | id(optParamList)
    // Part -> [ listBit ] ::-> cons(...)
    if (tk.accept(1 /* Var */)) {
        return new prologAST_1.Variable(tk.accepted);
    }
    // Parse a list (syntactic sugar goes here)
    if (tk.accept(0 /* Punc */, "[")) {
        return parseList(tk);
    }
    tk.expect(2 /* Id */);
    var name = tk.accepted;
    if (!tk.accept(0 /* Punc */, "(")) {
        return new prologAST_1.Atom(name);
    }
    var p = [];
    while (tk.type !== 3 /* EOF */) {
        p.push(parsePart(tk));
        if (tk.accept(0 /* Punc */, ")")) {
            break;
        }
        tk.expect(0 /* Punc */, ",");
    }
    return new prologAST_1.Term(name, p);
}
function parseList(tk) {
    // empty list
    if (tk.accept(0 /* Punc */, "]")) {
        return prologAST_1.Atom.Nil;
    }
    // Get a list of parts into l
    var l = [];
    while (tk.current !== "eof") {
        l.push(parsePart(tk));
        if (!tk.accept(0 /* Punc */, ",")) {
            break;
        }
    }
    // Find the end of the list ... "| Var ]" or "]".
    var append;
    if (tk.accept(0 /* Punc */, "|")) {
        tk.expect(1 /* Var */);
        append = new prologAST_1.Variable(tk.accepted);
    }
    else {
        append = prologAST_1.Atom.Nil;
    }
    tk.expect(0 /* Punc */, "]");
    //// Construct list
    //for (var i = l.length; i--;) {
    //    append = new Term("cons", [l[i], append]);
    //}
    return prologAST_1.listOfArray(l, append);
}
function parseBody(tk) {
    var terms = [];
    while (tk.current !== "eof") {
        terms.push(parseTerm(tk));
        if (tk.accept(0 /* Punc */, ".")) {
            break;
        }
        else {
            tk.expect(0 /* Punc */, ",");
        }
    }
    return terms;
}

},{"./prologAST":8}],10:[function(require,module,exports){
"use strict";
var prologAST_1 = require('./prologAST');
exports.options = {
    maxIterations: null,
    experimental: {
        tailRecursion: false
    }
};
/**
 * executes a query agains the database
 * @param db compiled rule database
 * @param query compiled query
 * @returns iterator to iterate through results
 */
function query(rulesDB, query) {
    var vars = varNames(query.list), cdb = {};
    // maybe move to parser level, idk
    for (var i = 0, name, rule; i < rulesDB.length; i++) {
        rule = rulesDB[i];
        name = rule.head.name;
        if (name in cdb) {
            cdb[name].push(rule);
        }
        else {
            cdb[name] = [rule];
        }
    }
    var iterator = new Iterator();
    var cont = getdtreeiterator(query.list, cdb, function (bindingContext) {
        var result = {};
        for (var i = 0, v; v = vars[i++];) {
            result[v.name] = termToJsValue(bindingContext.value(v));
        }
        iterator.current = result;
    });
    Iterator.prototype.next = function () {
        var i = 0;
        this.current = null;
        while (cont != null && !this.current) {
            cont = cont();
            if (typeof (exports.options.maxIterations) === "number" && exports.options.maxIterations <= ++i) {
                throw "iteration limit reached";
            }
        }
        return !!this.current;
    };
    return iterator;
    function Iterator() { }
}
exports.query = query;
;
/**
 * Get a list of all variables mentioned in a list of Terms.
 */
function varNames(list) {
    var out = [], vars = {}, t, n;
    list = list.slice(0); // clone   
    while (list.length) {
        t = list.pop();
        if (t instanceof prologAST_1.Variable) {
            n = t.name;
            // ignore special variable _
            // push only new names
            if (n !== "_" && out.indexOf(n) === -1) {
                out.push(n);
                vars[n] = t;
            }
        }
        else if (t instanceof prologAST_1.Term) {
            // we don't care about tree walk order
            Array.prototype.push.apply(list, t.partlist.list);
        }
    }
    return out.map(function (name) { return vars[name]; });
}
var builtinPredicates = {
    "!/0": function (loop, goals, idx, bindingContext, fbacktrack) {
        var nextgoals = goals.slice(1); // cut always succeeds
        return loop(nextgoals, 0, new BindingContext(bindingContext), function () {
            return fbacktrack && fbacktrack(true, goals[0].parent);
        });
    },
    "fail/0": function (loop, goals, idx, bindingContext, fbacktrack) {
        return fbacktrack; // FAIL
    },
    "call/1": function (loop, goals, idx, bindingContext, fbacktrack) {
        var first = bindingContext.value(goals[0].partlist.list[0]);
        if (!(first instanceof prologAST_1.Term)) {
            return fbacktrack; // FAIL
        }
        var ng = goals.slice(0);
        ng[0] = first;
        first.parent = goals[0];
        return loop(ng, 0, bindingContext, fbacktrack);
    },
    "=/2": function (loop, goals, idx, bindingContext, fbacktrack) {
        var ctx = new BindingContext(bindingContext);
        if (ctx.unify(goals[0].partlist.list[0], goals[0].partlist.list[1])) {
            return loop(goals.slice(1), 0, ctx, fbacktrack);
        }
        else {
            return fbacktrack; // FAIL
        }
    },
    "findall/3": function (loop, goals, idx, bindingContext, fbacktrack, db) {
        var args = goals[0].partlist.list, results = [];
        return getdtreeiterator([args[1]], db, collect, bindingContext, report);
        function collect(ctx) {
            results.push(ctx.value(args[0]));
        }
        function report() {
            var result = prologAST_1.listOfArray(results);
            if (bindingContext.unify(args[2], result)) {
                return loop(goals.slice(1), 0, bindingContext, fbacktrack);
            }
            else {
                return fbacktrack;
            }
        }
    },
    "is/2": function (loop, goals, idx, bindingContext, fbacktrack) {
        var args = goals[0].partlist.list, expression = bindingContext.value(args[1]), ctx = new BindingContext(bindingContext);
        if (varNames([expression]).length) {
            return fbacktrack; // TODO: prolog exception "ERROR: is/2: Arguments are not sufficiently instantiated"
        }
        // build evaluation queue:
        var queue = [expression], acc = [], c, i, x, l;
        while (queue.length) {
            x = queue.pop();
            acc.push(x);
            if (x instanceof prologAST_1.Term) {
                Array.prototype.push.apply(queue, x.partlist.list);
            }
        }
        // evaluate
        queue = acc;
        acc = [];
        i = queue.length;
        while (i--) {
            x = queue[i];
            if (x instanceof prologAST_1.Term) {
                c = x.partlist.list.length;
                l = acc.splice(-c, c);
                switch (x.name) {
                    case "+":
                        acc.push(l[0] + l[1]);
                        break;
                    case "-":
                        acc.push(l[0] - l[1]);
                        break;
                    case "*":
                        acc.push(l[0] * l[1]);
                        break;
                    case "/":
                        acc.push(l[0] / l[1]);
                        break;
                    default:
                        return fbacktrack; // TODO: prolog exception "ERROR: is/2: Arithmetic: `{x.name}' is not a function"
                }
            }
            else {
                if (typeof (x.name) === "number") {
                    acc.push(x.name);
                }
                else {
                    // TODO: handle functions like pi e etc
                    return fbacktrack;
                }
            }
        }
        if (ctx.unify(args[0], new prologAST_1.Atom(acc[0]))) {
            return loop(goals.slice(1), 0, ctx, fbacktrack);
        }
        else {
            return fbacktrack;
        }
    }
};
/**
 * The main proving engine
 * @param originalGoals original goals to prove
 * @param rulesDB prolog database to consult with
 * @param fsuccess success callback
 * @returns a function to perform next step
 */
function getdtreeiterator(originalGoals, rulesDB, fsuccess, rootBindingContext, rootBacktrack) {
    "use strict";
    var tailEnabled = exports.options.experimental.tailRecursion;
    return function () { return loop(originalGoals, 0, rootBindingContext || null, rootBacktrack || null); };
    // main loop continuation
    function loop(goals, idx, parentBindingContext, fbacktrack) {
        if (!goals.length) {
            fsuccess(parentBindingContext);
            return fbacktrack;
        }
        var currentGoal = goals[0], currentBindingContext = new BindingContext(parentBindingContext), currentGoalVarNames, rule, varMap, renamedHead, nextGoalsVarNames, existing;
        // TODO: add support for builtins with variable arity (like call/2+)
        var builtin = builtinPredicates[currentGoal.name + "/" + currentGoal.partlist.list.length];
        if (typeof (builtin) === "function") {
            return builtin(loop, goals, idx, currentBindingContext, fbacktrack, rulesDB);
        }
        // searching for next matching rule        
        for (var i = idx, db = rulesDB[currentGoal.name], dblen = db && db.length; i < dblen; i++) {
            rule = db[i];
            varMap = {};
            renamedHead = new prologAST_1.Term(rule.head.name, currentBindingContext.renameVariables(rule.head.partlist.list, currentGoal, varMap));
            renamedHead.parent = currentGoal.parent;
            if (!currentBindingContext.unify(currentGoal, renamedHead)) {
                continue;
            }
            var nextGoals = goals.slice(1); // current head succeeded            
            if (rule.body != null) {
                nextGoals = currentBindingContext.renameVariables(rule.body.list, renamedHead, varMap).concat(nextGoals);
            }
            // TODO: remove 'free' variables (need to check values as well)
            if (rule.body != null && nextGoals.length === 1) {
                // call in a tail position: reusing parent variables                
                // prevents context groth in some recursive scenarios
                if (tailEnabled) {
                    currentGoalVarNames = varNames([currentGoal]);
                    nextGoalsVarNames = varNames(nextGoals);
                    existing = nextGoalsVarNames.concat(currentGoalVarNames).map(function (e) { return e.name; });
                    if (currentGoalVarNames.length === nextGoalsVarNames.length) {
                        for (var vn in varMap) {
                            for (var cv, cn, nn, k = currentGoalVarNames.length; k--;) {
                                cn = currentGoalVarNames[k];
                                nn = nextGoalsVarNames[k];
                                cv = currentBindingContext.value(cn);
                                if (cn.name != nn.name && varMap[vn] === nn) {
                                    // do not short-cut if cn's value references nn
                                    // TODO: probably need to check other variables
                                    if (cv && varNames([cv]).indexOf(nn) !== -1) {
                                        continue;
                                    }
                                    varMap[vn] = cn;
                                    currentBindingContext.ctx[cn.name] = currentBindingContext.ctx[nn.name];
                                    currentBindingContext.unbind(nn.name);
                                }
                            }
                        }
                        // re-rename vars in next goals (can be optimised)
                        nextGoals = currentBindingContext.renameVariables(rule.body.list, renamedHead, varMap);
                    }
                }
                return function levelDownTail() {
                    // skipping backtracking to the same level because it's the last goal                        
                    // TODO: removing extra stuff from binding context                                                
                    return loop(nextGoals, 0, currentBindingContext, fbacktrack);
                };
            }
            else {
                /// CURRENT BACKTRACK CONTINUATION  ///
                /// WHEN INVOKED BACKTRACKS TO THE  ///
                /// NEXT RULE IN THE PREVIOUS LEVEL ///
                var fCurrentBT = function (cut, parent) {
                    if (cut) {
                        return fbacktrack && fbacktrack(parent.parent !== goals[0].parent, parent);
                    }
                    else {
                        return loop(goals, i + 1, parentBindingContext, fbacktrack);
                    }
                };
                return function levelDown() {
                    return loop(nextGoals, 0, currentBindingContext, fCurrentBT);
                };
            }
        }
        return fbacktrack;
    }
}
;
/**
 * helper function to convert terms to result values returned by query function
 */
function termToJsValue(v) {
    if (v instanceof prologAST_1.Atom) {
        return v === prologAST_1.Atom.Nil ? [] : v.name;
    }
    if (v instanceof prologAST_1.Term && v.name === "cons") {
        var t = [];
        while (v.partlist && v.name !== "nil") {
            t.push(termToJsValue(v.partlist.list[0]));
            v = v.partlist.list[1];
        }
        return t;
    }
    return v.toString();
}
/**
 * creates binding context for variables
 */
function BindingContext(parent) {
    this.ctx = Object.create(parent && parent.ctx || {});
}
/**
 * fine-print the context (for debugging purposes)
 * ! SLOW because of for-in
 */
BindingContext.prototype.toString = function toString() {
    var r = [], p = [];
    for (var key in this.ctx) {
        Array.prototype.push.call(Object.prototype.hasOwnProperty.call(this.ctx, key) ? r : p, key + " = " + this.ctx[key]);
    }
    return r.join(", ") + " || " + p.join(", ");
};
var globalGoalCounter = 0;
/**
 * renames variables to make sure names are unique
 * @param list list of terms to rename
 * @param parent parent term (parent is used in cut)
 * @param varMap (out) map of variable mappings, used to make sure that both head and body have same names
 * @returns new term with renamed variables
 */
BindingContext.prototype.renameVariables = function renameVariables(list, parent, varMap) {
    var out = [], queue = [], stack = [list], clen, tmp, v;
    // prepare depth-first queue
    while (stack.length) {
        list = stack.pop();
        queue.push(list);
        if (list instanceof Array) {
            list.length && Array.prototype.push.apply(stack, list);
        }
        else if (list instanceof prologAST_1.Term) {
            list.partlist.list.length && Array.prototype.push.apply(stack, list.partlist.list);
        }
    }
    // process depth-first queue
    var vars = varMap || {}, _ = new prologAST_1.Variable("_");
    for (var i = queue.length - 1; i >= 0; i--) {
        list = queue[i];
        if (list instanceof prologAST_1.Atom) {
            out.push(list);
        }
        else if (list instanceof prologAST_1.Variable) {
            if (list.name === "_") {
                v = _;
            }
            else {
                v = vars[list.name] || (vars[list.name] = new prologAST_1.Variable("_G" + (globalGoalCounter++)));
            }
            out.push(v);
        }
        else if (list instanceof prologAST_1.Term) {
            clen = list.partlist.list.length;
            tmp = new prologAST_1.Term(list.name, out.splice(-clen, clen));
            for (var pl = tmp.partlist.list, k = pl.length; k--;) {
                if (pl[k] instanceof prologAST_1.Term) {
                    pl[k].parent = tmp;
                }
            }
            tmp.parent = parent;
            out.push(tmp);
        }
        else {
            clen = list.length;
            clen && Array.prototype.push.apply(out, out.splice(-clen, clen));
        }
    }
    return out;
};
/**
 * Binds variable to a value in the context
 * @param name name of the variable to bind
 * @param value value to bind to the variable
 */
BindingContext.prototype.bind = function (name, value) {
    this.ctx[name] = value;
};
/**
 * Unbinds variable in the CURRENT context
 * Variable remains bound in parent contexts
 * and might be resolved though proto chain
 * @param name variable name to unbind
 */
BindingContext.prototype.unbind = function (name) {
    delete this.ctx[name];
};
/**
 * Gets the value of the term, recursively replacing variables with bound values
 * @param x term to calculate value for
 * @returns value of term x
 */
BindingContext.prototype.value = function value(x) {
    var queue = [x], acc = [], c, i;
    while (queue.length) {
        x = queue.pop();
        acc.push(x);
        if (x instanceof prologAST_1.Term) {
            Array.prototype.push.apply(queue, x.partlist.list);
        }
        else if (x instanceof prologAST_1.Variable) {
            c = this.ctx[x.name];
            if (c) {
                acc.pop();
                queue.push(c);
            }
        }
    }
    queue = acc;
    acc = [];
    i = queue.length;
    while (i--) {
        x = queue[i];
        if (x instanceof prologAST_1.Term) {
            c = x.partlist.list.length;
            acc.push(new prologAST_1.Term(x.name, acc.splice(-c, c)));
        }
        else
            acc.push(x);
    }
    return acc[0];
};
/**
 * Unifies terms x and y, renaming and binding variables in process
 * !! mutates variable names (altering x, y and varMap in main loop)
 * @returns true if terms unify, false otherwise
 */
BindingContext.prototype.unify = function unify(x, y) {
    var toSetNames = [], toSet = {}, acc = [], queue = [this.value(x), this.value(y)], xpl, ypl, i, len;
    while (queue.length) {
        x = queue.pop();
        y = queue.pop();
        if (x instanceof prologAST_1.Term && y instanceof prologAST_1.Term) {
            xpl = x.partlist.list;
            ypl = y.partlist.list;
            if (x.name == y.name && xpl.length == ypl.length) {
                for (i = 0, len = xpl.length; i < len; i++) {
                    queue.push(xpl[i], ypl[i]);
                }
            }
            else {
                return false;
            }
        }
        else {
            if ((x instanceof prologAST_1.Atom || y instanceof prologAST_1.Atom) && !(x instanceof prologAST_1.Variable || y instanceof prologAST_1.Variable)) {
                if (!(x instanceof prologAST_1.Atom && y instanceof prologAST_1.Atom && x.name == y.name)) {
                    return false;
                }
            }
            acc.push(x, y);
        }
    }
    i = acc.length;
    while (i) {
        y = acc[--i];
        x = acc[--i];
        if (x instanceof prologAST_1.Variable) {
            if (x.name === "_") {
                continue;
            }
            if (toSetNames.indexOf(x.name) === -1) {
                toSetNames.push(x.name);
            }
            else if (toSet[x.name].name !== y.name) {
                return false;
            }
            toSet[x.name] = y;
        }
        else if (y instanceof prologAST_1.Variable) {
            if (y.name === "_") {
                continue;
            }
            if (toSetNames.indexOf(y.name) === -1) {
                toSetNames.push(y.name);
            }
            else if (toSet[y.name].name !== x.name) {
                return false;
            }
            toSet[y.name] = x;
        }
    }
    // renaming unified variables
    // it's guaranteed that variable with the same name is the same instance within rule, see renameVariables()
    var varmap = {}, key;
    for (i = 0; key = toSetNames[i++];) {
        if (toSet[key] instanceof prologAST_1.Variable) {
            varmap[toSet[key].name] = key;
            toSet[key].name = key;
        }
    }
    // bind values to variables (minding renames)
    for (i = 0; key = toSetNames[i++];) {
        if (!(toSet[key] instanceof prologAST_1.Variable)) {
            this.bind(varmap[key] || key, toSet[key]);
        }
    }
    return true;
};

},{"./prologAST":8}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
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
},{"./handle-dom":13,"./handle-swal-dom":15,"./utils":18}],13:[function(require,module,exports){
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
},{}],14:[function(require,module,exports){
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
},{"./handle-dom":13,"./handle-swal-dom":15}],15:[function(require,module,exports){
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
},{"./default-params":11,"./handle-dom":13,"./injected-html":16,"./utils":18}],16:[function(require,module,exports){
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
},{}],17:[function(require,module,exports){
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
},{"./handle-dom":13,"./handle-swal-dom":15,"./utils":18}],18:[function(require,module,exports){
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
},{}],19:[function(require,module,exports){
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
},{"./modules/default-params":11,"./modules/handle-click":12,"./modules/handle-dom":13,"./modules/handle-key":14,"./modules/handle-swal-dom":15,"./modules/set-params":17,"./modules/utils":18}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9zcmMvRmxvb3IudHMiLCJqcy9zcmMvRm9yZXN0LnRzIiwianMvc3JjL0dhbWUudHMiLCJqcy9zcmMvV2FuZGVyZXIudHMiLCJqcy9zcmMvY29uc3RhbnRzLnRzIiwianMvc3JjL21haW4udHMiLCJub2RlX21vZHVsZXMvanNwcm9sb2cvZGlzdC9qc3Byb2xvZy5qcyIsIm5vZGVfbW9kdWxlcy9qc3Byb2xvZy9kaXN0L3Byb2xvZ0FTVC5qcyIsIm5vZGVfbW9kdWxlcy9qc3Byb2xvZy9kaXN0L3Byb2xvZ1BhcnNlci5qcyIsIm5vZGVfbW9kdWxlcy9qc3Byb2xvZy9kaXN0L3Byb2xvZ1NvbHZlci5qcyIsIm5vZGVfbW9kdWxlcy9zd2VldGFsZXJ0L2xpYi9tb2R1bGVzL2RlZmF1bHQtcGFyYW1zLmpzIiwibm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQvbGliL21vZHVsZXMvaGFuZGxlLWNsaWNrLmpzIiwibm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQvbGliL21vZHVsZXMvaGFuZGxlLWRvbS5qcyIsIm5vZGVfbW9kdWxlcy9zd2VldGFsZXJ0L2xpYi9tb2R1bGVzL2hhbmRsZS1rZXkuanMiLCJub2RlX21vZHVsZXMvc3dlZXRhbGVydC9saWIvbW9kdWxlcy9oYW5kbGUtc3dhbC1kb20uanMiLCJub2RlX21vZHVsZXMvc3dlZXRhbGVydC9saWIvbW9kdWxlcy9pbmplY3RlZC1odG1sLmpzIiwibm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQvbGliL21vZHVsZXMvc2V0LXBhcmFtcy5qcyIsIm5vZGVfbW9kdWxlcy9zd2VldGFsZXJ0L2xpYi9tb2R1bGVzL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQvbGliL3N3ZWV0YWxlcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBLHlDQUE2RDtBQUU3RDs7OztHQUlHO0FBQ0g7SUFXSSxlQUFZLE9BQWU7UUFB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QyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLENBQUM7UUFHRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pELFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDdkIsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDOUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNwQixDQUFDO1FBRUQsdUJBQXVCO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzFFLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEUsQ0FBQztRQUNMLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDMUUsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0RSxDQUFDO1FBQ0wsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzFFLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEUsQ0FBQztRQUNMLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6ZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0ICogYXMgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQge2VtcHR5LCBnb2FsLCBtb25zdGVyLCB0cmFwLCB0cmVlfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBZb3UnbGwgdGVsbCBtZTogXCJBIGZsb29yIGlzIGEgZmxvb3JcIiwgYW5kIHlvdSdsbCBiZSByaWdodC5cbiAqIFRoaXMgaXMgbm90IHRoZSBmbG9vciBpdHNlbGYgdGhhdCBtYXR0ZXJzLCB0aGlzIGlzIHdoYXQgaXQgY29udGFpbnMuXG4gKiBJcyBpdCBhbiBob3JyaWJsZSBtb25zdGVyIG9uIHRoaXMgZmxvb3I/IE9yIGEgbGV0aGFsIHRyYXA/IE9yIGEgY2x1ZSBmb3IgdGhlIG5leHQgZmxvb3I/IFlvdSdsbCBzZWUsIHdhbmRlcmVyLi4uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsb29yIHtcbiAgICBwcml2YXRlIHZpc2l0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIGFjY2Vzc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHRyYXA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIGdvYWw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIG1vbnN0ZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHRyYXBDbHVlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBtb25zdGVyQ2x1ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgcHJvYmFiaWxpdHlNb25zdGVyID0gMDtcbiAgICBwcml2YXRlIHByb2JhYmlsaXR5VHJhcCA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50ID0gZW1wdHkpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IHRyYXApIHtcbiAgICAgICAgICAgIHRoaXMudHJhcCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCA9PT0gZ29hbCkge1xuICAgICAgICAgICAgdGhpcy5nb2FsID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50ID09PSBtb25zdGVyKSB7XG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXIgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVGhlIGZsb29yIGlzIGVtcHR5IG90aGVyd2lzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGlzVHJhcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhcDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNHb2FsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nb2FsO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc01vbnN0ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXI7XG4gICAgfVxuXG4gICAgcHVibGljIGlzTW9uc3RlckNsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXJDbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc1RyYXBDbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFwQ2x1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNFbXB0eSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRyYXAgJiZcbiAgICAgICAgICAgICF0aGlzLmdvYWwgJiZcbiAgICAgICAgICAgICF0aGlzLm1vbnN0ZXIgJiZcbiAgICAgICAgICAgICF0aGlzLnRyYXBDbHVlICYmXG4gICAgICAgICAgICAhdGhpcy5tb25zdGVyQ2x1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRDbHVlKGNsdWVUeXBlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKGNsdWVUeXBlID09PSB0cmFwKSB7XG4gICAgICAgICAgICB0aGlzLnRyYXBDbHVlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChjbHVlVHlwZSA9PT0gbW9uc3Rlcikge1xuICAgICAgICAgICAgdGhpcy5tb25zdGVyQ2x1ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNWaXNpdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpdGVkO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0VmlzaXRlZChiID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnZpc2l0ZWQgPSBiO1xuICAgIH1cbiAgICBwdWJsaWMgaXNBY2Nlc3NpYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY2Nlc3NpYmxlO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0QWNjZXNzaWJsZShiID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmFjY2Vzc2libGUgPSBiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoYXQgaXMgdGhlIHByb2JhYmlsaXR5IHRoaXMgZmxvb3IgaXMgYSBtb25zdGVyP1xuICAgICAqL1xuICAgIHB1YmxpYyBnZXRQcm9iYWJpbGl0eU1vbnN0ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2JhYmlsaXR5TW9uc3RlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHByb2JhYmlsaXR5IHRoaXMgZmxvb3IgaXMgYSBtb25zdGVyLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRQcm9iYWJpbGl0eU1vbnN0ZXIocHJvYmFiaWxpdHkgPSAwKSB7XG4gICAgICAgIHRoaXMucHJvYmFiaWxpdHlNb25zdGVyID0gcHJvYmFiaWxpdHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHByb2JhYmlsaXR5IHRoaXMgZmxvb3IgaXMgYSBtb25zdGVyIGV2b2x2ZWQuXG4gICAgICovXG4gICAgcHVibGljIGFkZFByb2JhYmlsaXR5TW9uc3Rlcihwcm9iYWJpbGl0eSA9IDApIHtcbiAgICAgICAgdGhpcy5wcm9iYWJpbGl0eU1vbnN0ZXIgKz0gcHJvYmFiaWxpdHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hhdCBpcyB0aGUgcHJvYmFiaWxpdHkgdGhpcyBmbG9vciBpcyBhIHRyYXA/XG4gICAgICovXG4gICAgcHVibGljIGdldFByb2JhYmlsaXR5VHJhcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvYmFiaWxpdHlUcmFwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgcHJvYmFiaWxpdHkgdGhpcyBmbG9vciBpcyBhIHRyYXAuXG4gICAgICovXG4gICAgcHVibGljIHNldFByb2JhYmlsaXR5VHJhcChwcm9iYWJpbGl0eSA9IDApIHtcbiAgICAgICAgdGhpcy5wcm9iYWJpbGl0eVRyYXAgPSBwcm9iYWJpbGl0eTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcHJvYmFiaWxpdHkgdGhpcyBmbG9vciBpcyBhIHRyYXAgZXZvbHZlZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkUHJvYmFiaWxpdHlUcmFwKHByb2JhYmlsaXR5ID0gMCkge1xuICAgICAgICB0aGlzLnByb2JhYmlsaXR5VHJhcCArPSBwcm9iYWJpbGl0eTtcbiAgICB9XG5cbiAgICBwdWJsaWMga2lsbE1vbnN0ZXIoKSB7XG4gICAgICAgIHRoaXMubW9uc3RlciA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b0h0bWwoaXNLbm93bjogYm9vbGVhbiA9IHRydWUsIGFkZGl0aW9ubmFsQ2xhc3Nlczogc3RyaW5nW10pIHtcbiAgICAgICAgbGV0IGNsYXNzZXM6IHN0cmluZ1tdID0gW1wiZmxvb3JDYXNlXCJdLmNvbmNhdChhZGRpdGlvbm5hbENsYXNzZXMpO1xuXG4gICAgICAgIGlmIChpc0tub3duKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJ2aXNpdGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKFwid2FyRm9nXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNUcmFwKCkpIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChcInRyYXBcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNHb2FsKCkpIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChcImdvYWxcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNNb25zdGVyKCkpIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChcIm1vbnN0ZXJcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNUcmFwQ2x1ZSgpKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJ0cmFwQ2x1ZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc01vbnN0ZXJDbHVlKCkpIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChcIm1vbnN0ZXJDbHVlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiJHtjbGFzc2VzLmpvaW4oXCIgXCIpfVwiPjwvZGl2PmA7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtlbXB0eSwgZ29hbCwgbW9uc3RlciwgdHJhcCwgdHJlZX0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgRmxvb3IgZnJvbSBcIi4vRmxvb3JcIjtcblxuLyoqXG4gKiBBIGdsb29teSBkYXJrIGZvcmVzdC4gVGhlcmUgYXJlIGxvdHMgb2YgbW9uc3RlcnMgYW5kIHRyYXBzIGhlcmUuIEJlIGNhcmVmdWwsIHdhbmRlcmVyLi4uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcmVzdCB7XG4gICAgcHJpdmF0ZSBmb3Jlc3Q6IEZsb29yW11bXSA9IFtdO1xuICAgIHByaXZhdGUgd2lkdGg6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBoZWlnaHQ6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3Rvcih3ID0gMywgaCA9IDMpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IHc7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaDtcbiAgICB9XG5cbiAgICBwdWJsaWMgcG9wdWxhdGUobWF4Q2hhbmNlcyA9IDIwKSB7XG4gICAgICAgIC8vIFNldCB0aGUgbW9uc3RlcnMgYW5kIHRyYXBzXG4gICAgICAgIGxldCB0bXA6IEZsb29yW11bXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIHRtcFt5XSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLndpZHRoOyB4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0bXBSYW5kID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heENoYW5jZXMgLSAwKSArIDApO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRtcFJhbmQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSXQncyBhIG1vbnN0ZXIhXG4gICAgICAgICAgICAgICAgICAgIHRtcFt5XVt4XSA9IG5ldyBGbG9vcihtb25zdGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRtcFJhbmQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSXQncyBhIHRyYXAhXG4gICAgICAgICAgICAgICAgICAgIHRtcFt5XVt4XSA9IG5ldyBGbG9vcih0cmFwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0bXBbeV1beF0gPSBuZXcgRmxvb3IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvcmVzdCA9IHRtcDtcblxuICAgICAgICAvLyBTZXQgdGhlIHdheSBvdXRcbiAgICAgICAgbGV0IGlzQVdheU91dCA9IGZhbHNlO1xuICAgICAgICBsZXQgb3V0WTtcbiAgICAgICAgbGV0IG91dFg7XG4gICAgICAgIHdoaWxlICghaXNBV2F5T3V0KSB7XG4gICAgICAgICAgICBvdXRZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHRoaXMuZm9yZXN0Lmxlbmd0aCAtIDApICsgMCk7XG4gICAgICAgICAgICBvdXRYID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHRoaXMuZm9yZXN0WzBdLmxlbmd0aCAtIDApICsgMCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZvcmVzdFtvdXRZXVtvdXRYXS5pc0VtcHR5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3Jlc3Rbb3V0WV1bb3V0WF0gPSBuZXcgRmxvb3IoZ29hbCk7XG4gICAgICAgICAgICAgICAgaXNBV2F5T3V0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5oZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLndpZHRoOyB4KyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbCA9IHRoaXMuZm9yZXN0W3ldW3hdO1xuICAgICAgICAgICAgICAgIGlmIChjZWxsLmlzTW9uc3RlcigpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEl0J3MgYSBtb25zdGVyIVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENsdWVzKHksIHgsIG1vbnN0ZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2VsbC5pc1RyYXAoKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJdCdzIGEgdHJhcCFcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDbHVlcyh5LCB4LCB0cmFwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Rmxvb3JDb250ZW50KHk6IG51bWJlciwgeDogbnVtYmVyKTogRmxvb3Ige1xuICAgICAgICByZXR1cm4gdGhpcy5mb3Jlc3RbeV1beF07XG4gICAgfVxuXG4gICAgcHVibGljIGdldEZvcmVzdCgpOiBGbG9vcltdW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3Jlc3Q7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFdheU91dFBvc2l0aW9uKCkge1xuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy53aWR0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9yZXN0W3ldW3hdLmlzR29hbCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7eCwgeX07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE51bWJlck9mQ2FzZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcmVzdC5sZW5ndGggKiB0aGlzLmZvcmVzdFswXS5sZW5ndGg7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcmVzdC5sZW5ndGg7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3Jlc3RbMF0ubGVuZ3RoO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0Q2x1ZXMoeTogbnVtYmVyLCB4OiBudW1iZXIsIGNvbnRlbnQ6IHN0cmluZykge1xuICAgICAgICBpZiAoeSAtIDEgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RbeSAtIDFdW3hdLnNldENsdWUoY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHkgKyAxIDwgdGhpcy5oZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0W3kgKyAxXVt4XS5zZXRDbHVlKGNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh4IC0gMSA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdFt5XVt4IC0gMV0uc2V0Q2x1ZShjb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeCArIDEgPCB0aGlzLndpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdFt5XVt4ICsgMV0uc2V0Q2x1ZShjb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0ICogYXMgc3dhbCBmcm9tIFwic3dlZXRhbGVydFwiO1xuaW1wb3J0IEZsb29yIGZyb20gXCIuL0Zsb29yXCI7XG5pbXBvcnQgRm9yZXN0IGZyb20gXCIuL0ZvcmVzdFwiO1xuaW1wb3J0IFdhbmRlcmVyIGZyb20gXCIuL1dhbmRlcmVyXCI7XG5cbi8qKlxuICogSXQncyBhIGdhbWUgZm9yIGV2ZXJ5b25lLCBleGNlcHQgZm9yIHRoZSB3YW5kZXJlci4gUG9vciB3YW5kZXJlci4uLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcbiAgICBwcml2YXRlIGN1cnJlbnRGb3Jlc3Q6IEZvcmVzdDtcbiAgICBwcml2YXRlIHdhbmRlcmVyOiBXYW5kZXJlcjtcbiAgICBwcml2YXRlIGdhbWVEaXY6IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgc2NvcmVEaXY6IEhUTUxFbGVtZW50O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGdhbWVEaXY6IHN0cmluZywgc2NvcmVEaXY6IHN0cmluZykge1xuICAgICAgICB0aGlzLmdhbWVEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChnYW1lRGl2KTtcbiAgICAgICAgdGhpcy5zY29yZURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNjb3JlRGl2KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdCh3ID0gMywgaCA9IDMpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVGb3Jlc3QodywgaCk7XG4gICAgICAgIHRoaXMuZ2V0Rm9yZXN0KCkucG9wdWxhdGUoKTtcbiAgICAgICAgdGhpcy5zZXRXYW5kZXJlcigpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMud2FuZGVyZXIudXBkYXRlTWFwKCk7XG5cbiAgICAgICAgaWYgKHRoaXMud2FuZGVyZXIuaXNEZWFkKCkpIHtcbiAgICAgICAgICAgIHN3YWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuKYoFwiLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwiWW91IGp1c3QgZGllZC4gVG9vIGJhZC5cIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImVycm9yXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMud2FuZGVyZXIuc2V0U2NvcmUoLSgxMCAqIHRoaXMuZ2V0Rm9yZXN0KCkuZ2V0TnVtYmVyT2ZDYXNlcygpKSk7XG4gICAgICAgICAgICB0aGlzLnNldFdhbmRlcmVyKHRoaXMud2FuZGVyZXIuZ2V0TWFwKCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLndhbmRlcmVyLmlzT3V0KCkpIHtcbiAgICAgICAgICAgIC8vIFlvdSBqdXN0IHdvbiB0aGlzIGZvcmVzdCAhXG4gICAgICAgICAgICB0aGlzLndhbmRlcmVyLnNldFNjb3JlKDEwICogdGhpcy5nZXRGb3Jlc3QoKS5nZXROdW1iZXJPZkNhc2VzKCkpO1xuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBuZXh0IGxldmVsXG4gICAgICAgICAgICBjb25zdCBuZXdTaXplID0gdGhpcy5nZXRGb3Jlc3QoKS5nZXRGb3Jlc3QoKS5sZW5ndGggKyAxO1xuICAgICAgICAgICAgc3dhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi4q2Q77iPXCIsXG4gICAgICAgICAgICAgICAgdGV4dDogXCJZb3UganVzdCB3b24gdGhpcyBmb3Jlc3QgIVwiLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmluaXQobmV3U2l6ZSwgbmV3U2l6ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRXYW5kZXJlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2FuZGVyZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVGb3Jlc3QodyA9IDMsIGggPSAzKTogR2FtZSB7XG4gICAgICAgIHRoaXMuY3VycmVudEZvcmVzdCA9IG5ldyBGb3Jlc3QodywgaCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Rm9yZXN0KCk6IEZvcmVzdCB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRGb3Jlc3Q7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRXYW5kZXJlcihtOiBGbG9vcltdW10gPSB1bmRlZmluZWQpOiBHYW1lIHtcbiAgICAgICAgY29uc3QgZm9yZXN0ID0gdGhpcy5jdXJyZW50Rm9yZXN0LmdldEZvcmVzdCgpO1xuXG4gICAgICAgIGxldCBpc09rID0gZmFsc2U7XG4gICAgICAgIGxldCB5O1xuICAgICAgICBsZXQgeDtcbiAgICAgICAgd2hpbGUgKCFpc09rKSB7XG4gICAgICAgICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGZvcmVzdC5sZW5ndGggLSAwKSArIDApO1xuICAgICAgICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChmb3Jlc3RbMF0ubGVuZ3RoIC0gMCkgKyAwKTtcblxuICAgICAgICAgICAgaWYgKGZvcmVzdFt5XVt4XS5pc0VtcHR5KSB7XG4gICAgICAgICAgICAgICAgaXNPayA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG9sZFNjb3JlID0gMDtcbiAgICAgICAgaWYgKHRoaXMud2FuZGVyZXIpIHtcbiAgICAgICAgICAgIG9sZFNjb3JlID0gdGhpcy53YW5kZXJlci5nZXRTY29yZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud2FuZGVyZXIgPSBuZXcgV2FuZGVyZXIoeSwgeCwgdGhpcy5jdXJyZW50Rm9yZXN0LCBvbGRTY29yZSk7XG5cbiAgICAgICAgaWYgKG0pIHtcbiAgICAgICAgICAgIHRoaXMud2FuZGVyZXIuc2V0TWFwKG0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGZvcmVzdCA9IHRoaXMuZ2V0Rm9yZXN0KCkuZ2V0Rm9yZXN0KCk7XG4gICAgICAgIGNvbnN0IHdhbmRlcmVyID0gdGhpcy53YW5kZXJlcjtcblxuICAgICAgICBsZXQgaHRtbDogc3RyaW5nID0gXCJcIjtcblxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuY3VycmVudEZvcmVzdC5nZXRGb3Jlc3QoKS5sZW5ndGg7IHkrKykge1xuICAgICAgICAgICAgaHRtbCArPSBcIjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XCI7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuY3VycmVudEZvcmVzdC5nZXRGb3Jlc3QoKVswXS5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgICAgIGxldCB3YW5kZXJlclBvcyA9IHdhbmRlcmVyLmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgbGV0IGZsb29yID0gdGhpcy5jdXJyZW50Rm9yZXN0LmdldEZvcmVzdCgpW3ldW3hdO1xuICAgICAgICAgICAgICAgIGxldCBhZGRpdGlvbm5hbENsYXNzZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGlmICh3YW5kZXJlclBvcy54ID09PSB4ICYmIHdhbmRlcmVyUG9zLnkgPT09IHkpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25uYWxDbGFzc2VzLnB1c2goXCJ3YW5kZXJlclwiKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBodG1sICs9IGZsb29yLnRvSHRtbCh0aGlzLndhbmRlcmVyLmlzS25vd24oeSwgeCksIGFkZGl0aW9ubmFsQ2xhc3Nlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBodG1sICs9IFwiPC9kaXY+XCI7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdhbWVEaXYuY2xhc3NOYW1lID0gXCJcIjtcbiAgICAgICAgdGhpcy5nYW1lRGl2LmNsYXNzTGlzdC5hZGQoYHdpZHRoJHtmb3Jlc3QubGVuZ3RofWApO1xuICAgICAgICB0aGlzLmdhbWVEaXYuaW5uZXJIVE1MID0gaHRtbDtcblxuICAgICAgICB0aGlzLnNjb3JlRGl2LmlubmVySFRNTCA9IHdhbmRlcmVyLmdldFNjb3JlKCkudG9TdHJpbmcoKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCBcImpzcHJvbG9nXCI7XG5pbXBvcnQgRmxvb3IgZnJvbSBcIi4vRmxvb3JcIjtcbmltcG9ydCBGb3Jlc3QgZnJvbSBcIi4vRm9yZXN0XCI7XG5cbi8qKlxuICogVGhlIHdhbmRlcmVyLCB0aGUgaGVybyBvZiB0aGlzIHF1ZXN0LiBHb29kIGx1Y2sgc29uLi4uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbmRlcmVyIHtcbiAgICBwcml2YXRlIGZvcmVzdDogRm9yZXN0O1xuICAgIHByaXZhdGUgZm9yZXN0TWFwV2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIGZvcmVzdE1hcEhlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgZm9yZXN0TWFwOiBGbG9vcltdW10gPSBbXTtcbiAgICBwcml2YXRlIHk6IG51bWJlcjtcbiAgICBwcml2YXRlIHg6IG51bWJlcjtcbiAgICBwcml2YXRlIHNjb3JlOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXJZOiBudW1iZXIsIHBsYXllclg6IG51bWJlciwgZGFya1dvb2RzOiBGb3Jlc3QsIHNjb3JlOiBudW1iZXIgPSAwKSB7XG4gICAgICAgIHRoaXMuZm9yZXN0ID0gZGFya1dvb2RzO1xuICAgICAgICB0aGlzLnNjb3JlID0gc2NvcmU7XG4gICAgICAgIHRoaXMueCA9IHBsYXllclg7XG4gICAgICAgIHRoaXMueSA9IHBsYXllclk7XG5cbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gZGFya1dvb2RzLmdldEZvcmVzdCgpLmxlbmd0aDtcbiAgICAgICAgY29uc3Qgd2lkdGggPSBkYXJrV29vZHMuZ2V0Rm9yZXN0KClbMF0ubGVuZ3RoO1xuXG4gICAgICAgIHRoaXMuZm9yZXN0TWFwSGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLmZvcmVzdE1hcFdpZHRoID0gd2lkdGg7XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBoZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbeV0gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgd2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3ldW3hdID0gbmV3IEZsb29yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TWFwSGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3Jlc3RNYXAubGVuZ3RoO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNYXBXaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZXN0TWFwWzBdLmxlbmd0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNLbm93bih5OiBudW1iZXIsIHg6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3Jlc3RNYXBbeV1beF0uaXNWaXNpdGVkKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEZvcmVzdChmb3Jlc3Q6IEZvcmVzdCkge1xuICAgICAgICB0aGlzLmZvcmVzdCA9IGZvcmVzdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0UG9zaXRpb24oeTogbnVtYmVyLCB4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UG9zaXRpb24oKSB7XG4gICAgICAgIHJldHVybiB7eDogdGhpcy54LCB5OiB0aGlzLnl9O1xuICAgIH1cblxuICAgIHB1YmxpYyB0b0h0bWwoKSB7XG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cImZsb29yQ2FzZSB3YW5kZXJlclwiPjwvZGl2PmA7XG4gICAgfVxuXG4gICAgcHVibGljIHdhdGNoVGhlRmxvb3IoKTogRmxvb3Ige1xuICAgICAgICByZXR1cm4gdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnhdO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVNYXAoKSB7XG4gICAgICAgIGxldCBtb25zdGVyQ2x1ZSA9IGZhbHNlO1xuICAgICAgICBsZXQgdHJhcENsdWUgPSBmYWxzZTtcbiAgICAgICAgbGV0IG51bWJlckFkamFjZW50VmlzaXRlZCA9IHRoaXMubnVtYmVyQWRqYWNlbnRWaXNpdGVkKHRoaXMueSwgdGhpcy54KTtcbiAgICAgICAgbGV0IHByb2JhYmlsaXR5ID0gMDtcbiAgICAgICAgaWYgKG51bWJlckFkamFjZW50VmlzaXRlZCA8IDQpIHtcbiAgICAgICAgICAgIHByb2JhYmlsaXR5ID0gMSAvICggNCAtIG51bWJlckFkamFjZW50VmlzaXRlZCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueF0gPSB0aGlzLmZvcmVzdC5nZXRGbG9vckNvbnRlbnQodGhpcy55LCB0aGlzLngpO1xuICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueF0uc2V0VmlzaXRlZCh0cnVlKTtcblxuICAgICAgICAvLyBObyBjaGVhdCBoZXJlLCBqdXN0IHVzZWQgZm9yIHN0b3JpbmcgdGhlIHByb2JhYmlsaXRpZXNcbiAgICAgICAgaWYgKHRoaXMueSArIDEgPCB0aGlzLmZvcmVzdE1hcC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueSArIDFdW3RoaXMueF0gPSB0aGlzLmZvcmVzdC5nZXRGbG9vckNvbnRlbnQodGhpcy55ICsgMSwgdGhpcy54KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy55IC0gMSA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnkgLSAxXVt0aGlzLnhdID0gdGhpcy5mb3Jlc3QuZ2V0Rmxvb3JDb250ZW50KHRoaXMueSAtIDEsIHRoaXMueCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMueCArIDEgPCB0aGlzLmZvcmVzdE1hcFswXS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54ICsgMV0gPSB0aGlzLmZvcmVzdC5nZXRGbG9vckNvbnRlbnQodGhpcy55LCB0aGlzLnggKyAxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy54IC0gMSA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueCAtIDFdID0gdGhpcy5mb3Jlc3QuZ2V0Rmxvb3JDb250ZW50KHRoaXMueSwgdGhpcy54IC0gMSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICh0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueF0uaXNNb25zdGVyQ2x1ZSgpKSB7XG4gICAgICAgICAgICBtb25zdGVyQ2x1ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54XS5pc1RyYXBDbHVlKCkpIHtcbiAgICAgICAgICAgIHRyYXBDbHVlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpbmQgYWRqYWNlbnQgZmxvb3JzXG4gICAgICAgIGlmICh0aGlzLnkgKyAxIDwgdGhpcy5mb3Jlc3RNYXAubGVuZ3RoICYmICF0aGlzLmZvcmVzdE1hcFt0aGlzLnkgKyAxXVt0aGlzLnhdLmlzVmlzaXRlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnkgKyAxXVt0aGlzLnhdLnNldEFjY2Vzc2libGUodHJ1ZSk7XG4gICAgICAgICAgICBpZiAobW9uc3RlckNsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnkgKyAxXVt0aGlzLnhdLmFkZFByb2JhYmlsaXR5TW9uc3Rlcihwcm9iYWJpbGl0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHJhcENsdWUpIHtcbiAgICAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueSArIDFdW3RoaXMueF0uYWRkUHJvYmFiaWxpdHlUcmFwKHByb2JhYmlsaXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy55IC0gMSA+PSAwICYmICF0aGlzLmZvcmVzdE1hcFt0aGlzLnkgLSAxXVt0aGlzLnhdLmlzVmlzaXRlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnkgLSAxXVt0aGlzLnhdLnNldEFjY2Vzc2libGUodHJ1ZSk7XG4gICAgICAgICAgICBpZiAobW9uc3RlckNsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnkgLSAxXVt0aGlzLnhdLmFkZFByb2JhYmlsaXR5TW9uc3Rlcihwcm9iYWJpbGl0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHJhcENsdWUpIHtcbiAgICAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueSAtIDFdW3RoaXMueF0uYWRkUHJvYmFiaWxpdHlUcmFwKHByb2JhYmlsaXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy54ICsgMSA8IHRoaXMuZm9yZXN0TWFwWzBdLmxlbmd0aCAmJiAhdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggKyAxXS5pc1Zpc2l0ZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggKyAxXS5zZXRBY2Nlc3NpYmxlKHRydWUpO1xuICAgICAgICAgICAgaWYgKG1vbnN0ZXJDbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggKyAxXS5hZGRQcm9iYWJpbGl0eU1vbnN0ZXIocHJvYmFiaWxpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRyYXBDbHVlKSB7XG4gICAgICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueCArIDFdLmFkZFByb2JhYmlsaXR5VHJhcChwcm9iYWJpbGl0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMueCAtIDEgPj0gMCAmJiAhdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggLSAxXS5pc1Zpc2l0ZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggLSAxXS5zZXRBY2Nlc3NpYmxlKHRydWUpO1xuICAgICAgICAgICAgaWYgKG1vbnN0ZXJDbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggLSAxXS5hZGRQcm9iYWJpbGl0eU1vbnN0ZXIocHJvYmFiaWxpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRyYXBDbHVlKSB7XG4gICAgICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueCAtIDFdLmFkZFByb2JhYmlsaXR5VHJhcChwcm9iYWJpbGl0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgdGhpbmsoKSB7XG4gICAgICAgIGxldCB0aGlzRmxvb3IgPSB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueF07XG5cbiAgICAgICAgLy8gSGVyZSBnb2VzIGFsbCB0aGUgbG9naWNhbCBzdHVmZlxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBtb3ZlKGRpcmVjdGlvbjogc3RyaW5nKSB7XG4gICAgICAgIGxldCBjdXJyZW50UG9zID0gdGhpcy5nZXRQb3NpdGlvbigpO1xuICAgICAgICBsZXQgbmV3VmFsO1xuXG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IGN1cnJlbnRQb3MueCAtIDE7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbCA+PSAwKSB7IHRoaXMueCA9IG5ld1ZhbDsgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgICAgICAgICAgbmV3VmFsID0gY3VycmVudFBvcy54ICsgMTtcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsIDwgdGhpcy5mb3Jlc3RNYXBXaWR0aCkgeyB0aGlzLnggPSBuZXdWYWw7IH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ1cFwiOlxuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IGN1cnJlbnRQb3MueSAtIDE7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbCA+PSAwKSB7IHRoaXMueSA9IG5ld1ZhbDsgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImRvd25cIjpcbiAgICAgICAgICAgICAgICBuZXdWYWwgPSBjdXJyZW50UG9zLnkgKyAxO1xuICAgICAgICAgICAgICAgIGlmIChuZXdWYWwgPCB0aGlzLmZvcmVzdE1hcEhlaWdodCkgeyB0aGlzLnkgPSBuZXdWYWw7IH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFNjb3JlKC0xMCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIG51bWJlckFkamFjZW50VmlzaXRlZCh5OiBudW1iZXIsIHg6IG51bWJlcikge1xuICAgICAgICBsZXQgbnVtID0gMDtcblxuICAgICAgICBpZiAoIHkgKyAxIDwgdGhpcy5mb3Jlc3RNYXAubGVuZ3RoICYmIHRoaXMuZm9yZXN0TWFwW3kgKyAxXVt4XS5pc1Zpc2l0ZWQoKSkge1xuICAgICAgICAgICAgbnVtICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCB5IC0gMSA+PSAwICAmJiB0aGlzLmZvcmVzdE1hcFt5IC0gMV1beF0uaXNWaXNpdGVkKCkpIHtcbiAgICAgICAgICAgIG51bSArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmICggeCArIDEgPCB0aGlzLmZvcmVzdE1hcFswXS5sZW5ndGggICYmIHRoaXMuZm9yZXN0TWFwW3ldW3ggKyAxXS5pc1Zpc2l0ZWQoKSkge1xuICAgICAgICAgICAgbnVtICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCB4IC0gMSA+PSAwICAmJiB0aGlzLmZvcmVzdE1hcFt5XVt4IC0gMV0uaXNWaXNpdGVkKCkpIHtcbiAgICAgICAgICAgIG51bSArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudW07XG4gICAgfVxuXG4gICAgcHVibGljIHVzZVNsaW5nc2hvdCh5OiBudW1iZXIsIHg6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5mb3Jlc3QuZ2V0Rmxvb3JDb250ZW50KHksIHgpLmlzTW9uc3RlcigpKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdC5nZXRGbG9vckNvbnRlbnQoeSwgeCkua2lsbE1vbnN0ZXIoKTtcbiAgICAgICAgICAgIC8vIEB0b2RvIENhbGwgYW5pbWF0aW9uXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNPdXQoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHdheU91dFBvc2l0aW9uID0gdGhpcy5mb3Jlc3QuZ2V0V2F5T3V0UG9zaXRpb24oKTtcblxuICAgICAgICBpZiAodGhpcy54ID09PSB3YXlPdXRQb3NpdGlvbi54ICYmIHRoaXMueSA9PT0gd2F5T3V0UG9zaXRpb24ueSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNEZWFkKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy53YXRjaFRoZUZsb29yKCkuaXNUcmFwKCkgfHwgdGhpcy53YXRjaFRoZUZsb29yKCkuaXNNb25zdGVyKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldFNjb3JlKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2NvcmUgKz0gdmFsO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTY29yZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29yZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TWFwKCk6IEZsb29yW11bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcmVzdE1hcDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0TWFwKG06IEZsb29yW11bXSkge1xuICAgICAgICB0aGlzLmZvcmVzdE1hcCA9IG07XG4gICAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IHRyYXAgPSBcInRyYXBcIjtcbmV4cG9ydCBjb25zdCBlbXB0eSA9IFwiXCI7XG5leHBvcnQgY29uc3QgZ29hbCA9IFwiZ29hbFwiO1xuZXhwb3J0IGNvbnN0IG1vbnN0ZXIgPSBcIm1vbnN0ZXJcIjtcbmV4cG9ydCBjb25zdCB0cmVlID0gXCJ0cmVlXCI7XG4iLCJpbXBvcnQgKiBhcyAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCAqIGFzIGpzYm9hcmQgZnJvbSBcIi4vRm9yZXN0XCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9HYW1lXCI7XG5cbmxldCBnID0gbmV3IEdhbWUoXCJnYW1lRGl2XCIsIFwic2NvcmVEaXZcIik7XG5nLmluaXQoMywgMyk7XG5nLnVwZGF0ZSgpO1xuXG4vLyBJbml0IG1hbnVhbCBnYW1lXG5kb2N1bWVudC5vbmtleWRvd24gPSAoZSkgPT4ge1xuICAgIGxldCBhcnJvd0tleUhhdmVCZWVuUHJlc3NlZCA9IGZhbHNlO1xuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgICBnLmdldFdhbmRlcmVyKCkubW92ZShcImxlZnRcIik7XG4gICAgICAgICAgICBhcnJvd0tleUhhdmVCZWVuUHJlc3NlZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgIGcuZ2V0V2FuZGVyZXIoKS5tb3ZlKFwidXBcIik7XG4gICAgICAgICAgICBhcnJvd0tleUhhdmVCZWVuUHJlc3NlZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgIGcuZ2V0V2FuZGVyZXIoKS5tb3ZlKFwicmlnaHRcIik7XG4gICAgICAgICAgICBhcnJvd0tleUhhdmVCZWVuUHJlc3NlZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgIGcuZ2V0V2FuZGVyZXIoKS5tb3ZlKFwiZG93blwiKTtcbiAgICAgICAgICAgIGFycm93S2V5SGF2ZUJlZW5QcmVzc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGFycm93S2V5SGF2ZUJlZW5QcmVzc2VkKSB7XG4gICAgICAgIGcudXBkYXRlKCk7XG4gICAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgQVNUID0gcmVxdWlyZSgnLi9wcm9sb2dBU1QnKTtcclxudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4vcHJvbG9nUGFyc2VyJyk7XHJcbnZhciBTb2x2ZXIgPSByZXF1aXJlKCcuL3Byb2xvZ1NvbHZlcicpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IHsgQVNUOiBBU1QsIFBhcnNlcjogUGFyc2VyLCBTb2x2ZXI6IFNvbHZlciB9O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufTtcclxuKGZ1bmN0aW9uIChQYXJ0VHlwZSkge1xyXG4gICAgUGFydFR5cGVbUGFydFR5cGVbXCJWYXJpYWJsZVwiXSA9IDBdID0gXCJWYXJpYWJsZVwiO1xyXG4gICAgUGFydFR5cGVbUGFydFR5cGVbXCJBdG9tXCJdID0gMV0gPSBcIkF0b21cIjtcclxuICAgIFBhcnRUeXBlW1BhcnRUeXBlW1wiVGVybVwiXSA9IDJdID0gXCJUZXJtXCI7XHJcbn0pKGV4cG9ydHMuUGFydFR5cGUgfHwgKGV4cG9ydHMuUGFydFR5cGUgPSB7fSkpO1xyXG52YXIgUGFydFR5cGUgPSBleHBvcnRzLlBhcnRUeXBlO1xyXG52YXIgUGFydCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIEBjbGFzcyBQYXJ0XHJcbiAgICAgKiBAY2xhc3NkZXNjIFBhcnQgOj0gVmFyaWFibGUobmFtZSkgfCBBdG9tKG5hbWUpIHwgVGVybShuYW1lLCBwYXJ0bGlzdClcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIE5hbWUgb2YgdGhlIHZhcmlhYmxlL2F0b20vdGVybVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBQYXJ0KG5hbWUpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgfVxyXG4gICAgUGFydC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUGFydDtcclxufSgpKTtcclxuZXhwb3J0cy5QYXJ0ID0gUGFydDtcclxudmFyIFZhcmlhYmxlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhWYXJpYWJsZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFZhcmlhYmxlKG5hbWUpIHtcclxuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCBuYW1lKTtcclxuICAgIH1cclxuICAgIHJldHVybiBWYXJpYWJsZTtcclxufShQYXJ0KSk7XHJcbmV4cG9ydHMuVmFyaWFibGUgPSBWYXJpYWJsZTtcclxuVmFyaWFibGUucHJvdG90eXBlLnR5cGUgPSBQYXJ0VHlwZS5WYXJpYWJsZTsgLy8gVE9ETzogIHZlcmlmeSBpZiBpdCdzIGZhc3RlciB0aGFuIGluc3RhbmNlb2YgY2hlY2tzXHJcbnZhciBBdG9tID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhBdG9tLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gQXRvbShoZWFkKSB7XHJcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgaGVhZCk7XHJcbiAgICB9XHJcbiAgICBBdG9tLk5pbCA9IG5ldyBBdG9tKG51bGwpO1xyXG4gICAgcmV0dXJuIEF0b207XHJcbn0oUGFydCkpO1xyXG5leHBvcnRzLkF0b20gPSBBdG9tO1xyXG5BdG9tLnByb3RvdHlwZS50eXBlID0gUGFydFR5cGUuQXRvbTsgLy8gVE9ETzogIHZlcmlmeSBpZiBpdCdzIGZhc3RlciB0aGFuIGluc3RhbmNlb2YgY2hlY2tzXHJcbi8qKlxyXG4gKiBUZXJtKG5hbWUsIGxpc3QpXHJcbiAqL1xyXG52YXIgVGVybSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoVGVybSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFRlcm0oaGVhZCwgbGlzdCkge1xyXG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIGhlYWQpO1xyXG4gICAgICAgIHRoaXMucGFydGxpc3QgPSBuZXcgUGFydGxpc3QobGlzdCk7XHJcbiAgICB9XHJcbiAgICBUZXJtLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gXCJcIjtcclxuICAgICAgICBpZiAodGhpcy5uYW1lID09IFwiY29uc1wiKSB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gdGhpcztcclxuICAgICAgICAgICAgd2hpbGUgKHggaW5zdGFuY2VvZiBUZXJtICYmIHgubmFtZSA9PSBcImNvbnNcIiAmJiB4LnBhcnRsaXN0Lmxpc3QubGVuZ3RoID09IDIpIHtcclxuICAgICAgICAgICAgICAgIHggPSB4LnBhcnRsaXN0Lmxpc3RbMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCh4ID09PSBBdG9tLk5pbCkgfHwgeCBpbnN0YW5jZW9mIFZhcmlhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICB4ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIltcIjtcclxuICAgICAgICAgICAgICAgIHZhciBjb20gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHdoaWxlICh4LnR5cGUgPT0gUGFydFR5cGUuVGVybSAmJiB4Lm5hbWUgPT0gXCJjb25zXCIgJiYgeC5wYXJ0bGlzdC5saXN0Lmxlbmd0aCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCIsIFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0geC5wYXJ0bGlzdC5saXN0WzBdLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB4ID0geC5wYXJ0bGlzdC5saXN0WzFdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHgudHlwZSA9PSBQYXJ0VHlwZS5WYXJpYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIiB8IFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiXVwiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIkVSUk9SOiB1bmV4cGVjdGVkIGF0b206IFwiICsgeC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc3VsdCArPSB0aGlzLm5hbWUgKyBcIihcIiArIHRoaXMucGFydGxpc3QudG9TdHJpbmcoKSArIFwiKVwiO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG4gICAgO1xyXG4gICAgcmV0dXJuIFRlcm07XHJcbn0oUGFydCkpO1xyXG5leHBvcnRzLlRlcm0gPSBUZXJtO1xyXG5UZXJtLnByb3RvdHlwZS50eXBlID0gUGFydFR5cGUuVGVybTsgLy8gVE9ETzogIHZlcmlmeSBpZiBpdCdzIGZhc3RlciB0aGFuIGluc3RhbmNlb2YgY2hlY2tzXHJcbnZhciBQYXJ0bGlzdCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBQYXJ0bGlzdChsaXN0KSB7XHJcbiAgICAgICAgdGhpcy5saXN0ID0gbGlzdDtcclxuICAgIH1cclxuICAgIFBhcnRsaXN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0Lm1hcChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS50b1N0cmluZygpOyB9KS5qb2luKFwiLCBcIik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFBhcnRsaXN0O1xyXG59KCkpO1xyXG5leHBvcnRzLlBhcnRsaXN0ID0gUGFydGxpc3Q7XHJcbi8qKlxyXG4gKiBSdWxlKGhlYWQsIGJvZHlsaXN0KTogUGFydChoZWFkKSwgWzotIEJvZHkoYm9keWxpc3QpXS5cclxuICovXHJcbnZhciBSdWxlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFJ1bGUoaGVhZCwgYm9keWxpc3QpIHtcclxuICAgICAgICB0aGlzLmhlYWQgPSBoZWFkO1xyXG4gICAgICAgIHRoaXMuYm9keSA9IGJvZHlsaXN0ICYmIG5ldyBQYXJ0bGlzdChib2R5bGlzdCk7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUnVsZS5wcm90b3R5cGUsIFwiaXNGYWN0XCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICF0aGlzLmJvZHk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBSdWxlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZWFkLnRvU3RyaW5nKCkgKyAodGhpcy5ib2R5ID8gXCIgOi0gXCIgKyB0aGlzLmJvZHkudG9TdHJpbmcoKSArIFwiLlwiIDogXCIuXCIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBSdWxlO1xyXG59KCkpO1xyXG5leHBvcnRzLlJ1bGUgPSBSdWxlO1xyXG5mdW5jdGlvbiBsaXN0T2ZBcnJheShhcnJheSwgY2RyKSB7XHJcbiAgICBjZHIgPSBjZHIgfHwgQXRvbS5OaWw7XHJcbiAgICBmb3IgKHZhciBpID0gYXJyYXkubGVuZ3RoLCBjYXI7IGNhciA9IGFycmF5Wy0taV07KSB7XHJcbiAgICAgICAgY2RyID0gbmV3IFRlcm0oXCJjb25zXCIsIFtjYXIsIGNkcl0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNkcjtcclxufVxyXG5leHBvcnRzLmxpc3RPZkFycmF5ID0gbGlzdE9mQXJyYXk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgcHJvbG9nQVNUXzEgPSByZXF1aXJlKCcuL3Byb2xvZ0FTVCcpO1xyXG4vKipcclxuICogUGFyc2VzIHRoZSBEQlxyXG4gKi9cclxuZnVuY3Rpb24gcGFyc2Uoc3RyaW5nKSB7XHJcbiAgICB2YXIgdGsgPSBuZXcgVG9rZW5pc2VyKHN0cmluZyksIHJ1bGVzID0gW107XHJcbiAgICB3aGlsZSAodGsuY3VycmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgcnVsZXMucHVzaChwYXJzZVJ1bGUodGspKTtcclxuICAgIH1cclxuICAgIHJldHVybiBydWxlcztcclxufVxyXG5leHBvcnRzLnBhcnNlID0gcGFyc2U7XHJcbmZ1bmN0aW9uIHBhcnNlUXVlcnkoc3RyaW5nKSB7XHJcbiAgICB2YXIgdGsgPSBuZXcgVG9rZW5pc2VyKHN0cmluZyk7XHJcbiAgICByZXR1cm4gbmV3IHByb2xvZ0FTVF8xLlBhcnRsaXN0KHBhcnNlQm9keSh0aykpO1xyXG59XHJcbmV4cG9ydHMucGFyc2VRdWVyeSA9IHBhcnNlUXVlcnk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0geyBwYXJzZTogcGFyc2UsIHBhcnNlUXVlcnk6IHBhcnNlUXVlcnkgfTtcclxudmFyIHRva2VuaXplclJ1bGVzID0gW1xyXG4gICAgWy9eKFtcXChcXClcXC4sXFxbXFxdXFx8XXxcXDpcXC0pLywgMCAvKiBQdW5jICovXSxcclxuICAgIFsvXihbQS1aX11bYS16QS1aMC05X10qKS8sIDEgLyogVmFyICovXSxcclxuICAgIFsvXihcIlteXCJdKlwiKS8sIDIgLyogSWQgKi9dLFxyXG4gICAgWy9eKFthLXpdW2EtekEtWjAtOV9dKikvLCAyIC8qIElkICovXSxcclxuICAgIFsvXigtP1xcZCsoXFwuXFxkKyk/KS8sIDIgLyogSWQgKi8sIGZ1bmN0aW9uICh4KSB7IHJldHVybiAreDsgfV0sXHJcbiAgICBbL14oXFwrfFxcLXxcXCp8XFwvfFxcPXxcXCEpLywgMiAvKiBJZCAqL11cclxuXTtcclxudmFyIFRva2VuaXNlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBUb2tlbmlzZXIoc291cmNlKSB7XHJcbiAgICAgICAgdGhpcy5yZW1haW5kZXIgPSBzb3VyY2U7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnR5cGUgPSBudWxsOyAvLyBcImVvZlwiLCBUb2tlblR5cGUuSWQsIFRva2VuVHlwZS5WYXIsIFRva2VuVHlwZS5QdW5jIGV0Yy4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY29uc3VtZSgpOyAvLyBMb2FkIHVwIHRoZSBmaXJzdCB0b2tlbi5cclxuICAgIH1cclxuICAgIFRva2VuaXNlci5wcm90b3R5cGUuY29uc3VtZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy50eXBlID09IDMgLyogRU9GICovKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gRWF0IGFueSBsZWFkaW5nIFdTIGFuZCAlLXN0eWxlIGNvbW1lbnRzXHJcbiAgICAgICAgdmFyIHIgPSB0aGlzLnJlbWFpbmRlci5tYXRjaCgvXihcXHMrfChbJV0uKilbXFxuXFxyXSspKi8pO1xyXG4gICAgICAgIGlmIChyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtYWluZGVyID0gdGhpcy5yZW1haW5kZXIuc3Vic3RyaW5nKHJbMF0ubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLnJlbWFpbmRlci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy50eXBlID0gMyAvKiBFT0YgKi87XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHJ1bGU7IHJ1bGUgPSB0b2tlbml6ZXJSdWxlc1tpKytdOykge1xyXG4gICAgICAgICAgICBpZiAociA9IHRoaXMucmVtYWluZGVyLm1hdGNoKHJ1bGVbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbWFpbmRlciA9IHRoaXMucmVtYWluZGVyLnN1YnN0cmluZyhyWzBdLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPSBydWxlWzFdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gdHlwZW9mIChydWxlWzJdKSA9PT0gXCJmdW5jdGlvblwiID8gcnVsZVsyXShyWzFdKSA6IHJbMV07XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgXCJVbmV4cGVjdGVkIHRva2VuaXplciBpbnB1dFwiO1xyXG4gICAgfTtcclxuICAgIFRva2VuaXNlci5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24gKHR5cGUsIHN5bWJvbCkge1xyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IHR5cGUgJiYgKHR5cGVvZiAoc3ltYm9sKSA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0aGlzLmN1cnJlbnQgPT09IHN5bWJvbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5hY2NlcHRlZCA9IHRoaXMuY3VycmVudDtcclxuICAgICAgICAgICAgdGhpcy5jb25zdW1lKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgVG9rZW5pc2VyLnByb3RvdHlwZS5leHBlY3QgPSBmdW5jdGlvbiAodHlwZSwgc3ltYm9sKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmFjY2VwdCh0eXBlLCBzeW1ib2wpKSB7XHJcbiAgICAgICAgICAgIHRocm93IHRoaXMudHlwZSA9PT0gMyAvKiBFT0YgKi8gPyBcIlN5bnRheCBlcnJvcjogdW5leHBlY3RlZCBlbmQgb2YgZmlsZVwiIDogXCJTeW50YXggZXJyb3I6IHVuZXhwZWN0ZWQgdG9rZW4gXCIgKyB0aGlzLmN1cnJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlOyAvLyBUT0RPOiBubyBuZWVkIGZvciBib29sZWFuP1xyXG4gICAgfTtcclxuICAgIHJldHVybiBUb2tlbmlzZXI7XHJcbn0oKSk7XHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuZnVuY3Rpb24gcGFyc2VSdWxlKHRrKSB7XHJcbiAgICAvLyBSdWxlIDo9IFRlcm0gLiB8IFRlcm0gOi0gUGFydExpc3QgLlxyXG4gICAgdmFyIGggPSBwYXJzZVRlcm0odGspO1xyXG4gICAgaWYgKHRrLmFjY2VwdCgwIC8qIFB1bmMgKi8sIFwiLlwiKSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgcHJvbG9nQVNUXzEuUnVsZShoKTtcclxuICAgIH1cclxuICAgIHRrLmV4cGVjdCgwIC8qIFB1bmMgKi8sIFwiOi1cIik7XHJcbiAgICB2YXIgYiA9IHBhcnNlQm9keSh0ayk7XHJcbiAgICByZXR1cm4gbmV3IHByb2xvZ0FTVF8xLlJ1bGUoaCwgYik7XHJcbn1cclxuZnVuY3Rpb24gcGFyc2VUZXJtKHRrKSB7XHJcbiAgICB0ay5leHBlY3QoMiAvKiBJZCAqLyk7XHJcbiAgICB2YXIgbmFtZSA9IHRrLmFjY2VwdGVkO1xyXG4gICAgLy8gYWNjZXB0IGZhaWwgYW5kICEgdy9vICgpXHJcbiAgICBpZiAodGsuY3VycmVudCAhPSBcIihcIiAmJiAobmFtZSA9PSBcImZhaWxcIiB8fCBuYW1lID09PSBcIiFcIikpIHtcclxuICAgICAgICByZXR1cm4gbmV3IHByb2xvZ0FTVF8xLlRlcm0obmFtZSwgW10pO1xyXG4gICAgfVxyXG4gICAgdGsuZXhwZWN0KDAgLyogUHVuYyAqLywgXCIoXCIpO1xyXG4gICAgdmFyIHAgPSBbXTtcclxuICAgIHdoaWxlICh0ay5jdXJyZW50ICE9PSBcImVvZlwiKSB7XHJcbiAgICAgICAgcC5wdXNoKHBhcnNlUGFydCh0aykpO1xyXG4gICAgICAgIGlmICh0ay5hY2NlcHQoMCAvKiBQdW5jICovLCBcIilcIikpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRrLmV4cGVjdCgwIC8qIFB1bmMgKi8sIFwiLFwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgcHJvbG9nQVNUXzEuVGVybShuYW1lLCBwKTtcclxufVxyXG5mdW5jdGlvbiBwYXJzZVBhcnQodGspIHtcclxuICAgIC8vIFBhcnQgLT4gdmFyIHwgaWQgfCBpZChvcHRQYXJhbUxpc3QpXHJcbiAgICAvLyBQYXJ0IC0+IFsgbGlzdEJpdCBdIDo6LT4gY29ucyguLi4pXHJcbiAgICBpZiAodGsuYWNjZXB0KDEgLyogVmFyICovKSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgcHJvbG9nQVNUXzEuVmFyaWFibGUodGsuYWNjZXB0ZWQpO1xyXG4gICAgfVxyXG4gICAgLy8gUGFyc2UgYSBsaXN0IChzeW50YWN0aWMgc3VnYXIgZ29lcyBoZXJlKVxyXG4gICAgaWYgKHRrLmFjY2VwdCgwIC8qIFB1bmMgKi8sIFwiW1wiKSkge1xyXG4gICAgICAgIHJldHVybiBwYXJzZUxpc3QodGspO1xyXG4gICAgfVxyXG4gICAgdGsuZXhwZWN0KDIgLyogSWQgKi8pO1xyXG4gICAgdmFyIG5hbWUgPSB0ay5hY2NlcHRlZDtcclxuICAgIGlmICghdGsuYWNjZXB0KDAgLyogUHVuYyAqLywgXCIoXCIpKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBwcm9sb2dBU1RfMS5BdG9tKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgdmFyIHAgPSBbXTtcclxuICAgIHdoaWxlICh0ay50eXBlICE9PSAzIC8qIEVPRiAqLykge1xyXG4gICAgICAgIHAucHVzaChwYXJzZVBhcnQodGspKTtcclxuICAgICAgICBpZiAodGsuYWNjZXB0KDAgLyogUHVuYyAqLywgXCIpXCIpKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0ay5leHBlY3QoMCAvKiBQdW5jICovLCBcIixcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IHByb2xvZ0FTVF8xLlRlcm0obmFtZSwgcCk7XHJcbn1cclxuZnVuY3Rpb24gcGFyc2VMaXN0KHRrKSB7XHJcbiAgICAvLyBlbXB0eSBsaXN0XHJcbiAgICBpZiAodGsuYWNjZXB0KDAgLyogUHVuYyAqLywgXCJdXCIpKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb2xvZ0FTVF8xLkF0b20uTmlsO1xyXG4gICAgfVxyXG4gICAgLy8gR2V0IGEgbGlzdCBvZiBwYXJ0cyBpbnRvIGxcclxuICAgIHZhciBsID0gW107XHJcbiAgICB3aGlsZSAodGsuY3VycmVudCAhPT0gXCJlb2ZcIikge1xyXG4gICAgICAgIGwucHVzaChwYXJzZVBhcnQodGspKTtcclxuICAgICAgICBpZiAoIXRrLmFjY2VwdCgwIC8qIFB1bmMgKi8sIFwiLFwiKSkge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBGaW5kIHRoZSBlbmQgb2YgdGhlIGxpc3QgLi4uIFwifCBWYXIgXVwiIG9yIFwiXVwiLlxyXG4gICAgdmFyIGFwcGVuZDtcclxuICAgIGlmICh0ay5hY2NlcHQoMCAvKiBQdW5jICovLCBcInxcIikpIHtcclxuICAgICAgICB0ay5leHBlY3QoMSAvKiBWYXIgKi8pO1xyXG4gICAgICAgIGFwcGVuZCA9IG5ldyBwcm9sb2dBU1RfMS5WYXJpYWJsZSh0ay5hY2NlcHRlZCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBhcHBlbmQgPSBwcm9sb2dBU1RfMS5BdG9tLk5pbDtcclxuICAgIH1cclxuICAgIHRrLmV4cGVjdCgwIC8qIFB1bmMgKi8sIFwiXVwiKTtcclxuICAgIC8vLy8gQ29uc3RydWN0IGxpc3RcclxuICAgIC8vZm9yICh2YXIgaSA9IGwubGVuZ3RoOyBpLS07KSB7XHJcbiAgICAvLyAgICBhcHBlbmQgPSBuZXcgVGVybShcImNvbnNcIiwgW2xbaV0sIGFwcGVuZF0pO1xyXG4gICAgLy99XHJcbiAgICByZXR1cm4gcHJvbG9nQVNUXzEubGlzdE9mQXJyYXkobCwgYXBwZW5kKTtcclxufVxyXG5mdW5jdGlvbiBwYXJzZUJvZHkodGspIHtcclxuICAgIHZhciB0ZXJtcyA9IFtdO1xyXG4gICAgd2hpbGUgKHRrLmN1cnJlbnQgIT09IFwiZW9mXCIpIHtcclxuICAgICAgICB0ZXJtcy5wdXNoKHBhcnNlVGVybSh0aykpO1xyXG4gICAgICAgIGlmICh0ay5hY2NlcHQoMCAvKiBQdW5jICovLCBcIi5cIikpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0ay5leHBlY3QoMCAvKiBQdW5jICovLCBcIixcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRlcm1zO1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgcHJvbG9nQVNUXzEgPSByZXF1aXJlKCcuL3Byb2xvZ0FTVCcpO1xyXG5leHBvcnRzLm9wdGlvbnMgPSB7XHJcbiAgICBtYXhJdGVyYXRpb25zOiBudWxsLFxyXG4gICAgZXhwZXJpbWVudGFsOiB7XHJcbiAgICAgICAgdGFpbFJlY3Vyc2lvbjogZmFsc2VcclxuICAgIH1cclxufTtcclxuLyoqXHJcbiAqIGV4ZWN1dGVzIGEgcXVlcnkgYWdhaW5zIHRoZSBkYXRhYmFzZVxyXG4gKiBAcGFyYW0gZGIgY29tcGlsZWQgcnVsZSBkYXRhYmFzZVxyXG4gKiBAcGFyYW0gcXVlcnkgY29tcGlsZWQgcXVlcnlcclxuICogQHJldHVybnMgaXRlcmF0b3IgdG8gaXRlcmF0ZSB0aHJvdWdoIHJlc3VsdHNcclxuICovXHJcbmZ1bmN0aW9uIHF1ZXJ5KHJ1bGVzREIsIHF1ZXJ5KSB7XHJcbiAgICB2YXIgdmFycyA9IHZhck5hbWVzKHF1ZXJ5Lmxpc3QpLCBjZGIgPSB7fTtcclxuICAgIC8vIG1heWJlIG1vdmUgdG8gcGFyc2VyIGxldmVsLCBpZGtcclxuICAgIGZvciAodmFyIGkgPSAwLCBuYW1lLCBydWxlOyBpIDwgcnVsZXNEQi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHJ1bGUgPSBydWxlc0RCW2ldO1xyXG4gICAgICAgIG5hbWUgPSBydWxlLmhlYWQubmFtZTtcclxuICAgICAgICBpZiAobmFtZSBpbiBjZGIpIHtcclxuICAgICAgICAgICAgY2RiW25hbWVdLnB1c2gocnVsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjZGJbbmFtZV0gPSBbcnVsZV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFyIGl0ZXJhdG9yID0gbmV3IEl0ZXJhdG9yKCk7XHJcbiAgICB2YXIgY29udCA9IGdldGR0cmVlaXRlcmF0b3IocXVlcnkubGlzdCwgY2RiLCBmdW5jdGlvbiAoYmluZGluZ0NvbnRleHQpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHY7IHYgPSB2YXJzW2krK107KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdFt2Lm5hbWVdID0gdGVybVRvSnNWYWx1ZShiaW5kaW5nQ29udGV4dC52YWx1ZSh2KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGl0ZXJhdG9yLmN1cnJlbnQgPSByZXN1bHQ7XHJcbiAgICB9KTtcclxuICAgIEl0ZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICB0aGlzLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIHdoaWxlIChjb250ICE9IG51bGwgJiYgIXRoaXMuY3VycmVudCkge1xyXG4gICAgICAgICAgICBjb250ID0gY29udCgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIChleHBvcnRzLm9wdGlvbnMubWF4SXRlcmF0aW9ucykgPT09IFwibnVtYmVyXCIgJiYgZXhwb3J0cy5vcHRpb25zLm1heEl0ZXJhdGlvbnMgPD0gKytpKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBcIml0ZXJhdGlvbiBsaW1pdCByZWFjaGVkXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5jdXJyZW50O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBpdGVyYXRvcjtcclxuICAgIGZ1bmN0aW9uIEl0ZXJhdG9yKCkgeyB9XHJcbn1cclxuZXhwb3J0cy5xdWVyeSA9IHF1ZXJ5O1xyXG47XHJcbi8qKlxyXG4gKiBHZXQgYSBsaXN0IG9mIGFsbCB2YXJpYWJsZXMgbWVudGlvbmVkIGluIGEgbGlzdCBvZiBUZXJtcy5cclxuICovXHJcbmZ1bmN0aW9uIHZhck5hbWVzKGxpc3QpIHtcclxuICAgIHZhciBvdXQgPSBbXSwgdmFycyA9IHt9LCB0LCBuO1xyXG4gICAgbGlzdCA9IGxpc3Quc2xpY2UoMCk7IC8vIGNsb25lICAgXHJcbiAgICB3aGlsZSAobGlzdC5sZW5ndGgpIHtcclxuICAgICAgICB0ID0gbGlzdC5wb3AoKTtcclxuICAgICAgICBpZiAodCBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlZhcmlhYmxlKSB7XHJcbiAgICAgICAgICAgIG4gPSB0Lm5hbWU7XHJcbiAgICAgICAgICAgIC8vIGlnbm9yZSBzcGVjaWFsIHZhcmlhYmxlIF9cclxuICAgICAgICAgICAgLy8gcHVzaCBvbmx5IG5ldyBuYW1lc1xyXG4gICAgICAgICAgICBpZiAobiAhPT0gXCJfXCIgJiYgb3V0LmluZGV4T2YobikgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBvdXQucHVzaChuKTtcclxuICAgICAgICAgICAgICAgIHZhcnNbbl0gPSB0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHQgaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5UZXJtKSB7XHJcbiAgICAgICAgICAgIC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgdHJlZSB3YWxrIG9yZGVyXHJcbiAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGxpc3QsIHQucGFydGxpc3QubGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dC5tYXAoZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIHZhcnNbbmFtZV07IH0pO1xyXG59XHJcbnZhciBidWlsdGluUHJlZGljYXRlcyA9IHtcclxuICAgIFwiIS8wXCI6IGZ1bmN0aW9uIChsb29wLCBnb2FscywgaWR4LCBiaW5kaW5nQ29udGV4dCwgZmJhY2t0cmFjaykge1xyXG4gICAgICAgIHZhciBuZXh0Z29hbHMgPSBnb2Fscy5zbGljZSgxKTsgLy8gY3V0IGFsd2F5cyBzdWNjZWVkc1xyXG4gICAgICAgIHJldHVybiBsb29wKG5leHRnb2FscywgMCwgbmV3IEJpbmRpbmdDb250ZXh0KGJpbmRpbmdDb250ZXh0KSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmJhY2t0cmFjayAmJiBmYmFja3RyYWNrKHRydWUsIGdvYWxzWzBdLnBhcmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgXCJmYWlsLzBcIjogZnVuY3Rpb24gKGxvb3AsIGdvYWxzLCBpZHgsIGJpbmRpbmdDb250ZXh0LCBmYmFja3RyYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIGZiYWNrdHJhY2s7IC8vIEZBSUxcclxuICAgIH0sXHJcbiAgICBcImNhbGwvMVwiOiBmdW5jdGlvbiAobG9vcCwgZ29hbHMsIGlkeCwgYmluZGluZ0NvbnRleHQsIGZiYWNrdHJhY2spIHtcclxuICAgICAgICB2YXIgZmlyc3QgPSBiaW5kaW5nQ29udGV4dC52YWx1ZShnb2Fsc1swXS5wYXJ0bGlzdC5saXN0WzBdKTtcclxuICAgICAgICBpZiAoIShmaXJzdCBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlRlcm0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYmFja3RyYWNrOyAvLyBGQUlMXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBuZyA9IGdvYWxzLnNsaWNlKDApO1xyXG4gICAgICAgIG5nWzBdID0gZmlyc3Q7XHJcbiAgICAgICAgZmlyc3QucGFyZW50ID0gZ29hbHNbMF07XHJcbiAgICAgICAgcmV0dXJuIGxvb3AobmcsIDAsIGJpbmRpbmdDb250ZXh0LCBmYmFja3RyYWNrKTtcclxuICAgIH0sXHJcbiAgICBcIj0vMlwiOiBmdW5jdGlvbiAobG9vcCwgZ29hbHMsIGlkeCwgYmluZGluZ0NvbnRleHQsIGZiYWNrdHJhY2spIHtcclxuICAgICAgICB2YXIgY3R4ID0gbmV3IEJpbmRpbmdDb250ZXh0KGJpbmRpbmdDb250ZXh0KTtcclxuICAgICAgICBpZiAoY3R4LnVuaWZ5KGdvYWxzWzBdLnBhcnRsaXN0Lmxpc3RbMF0sIGdvYWxzWzBdLnBhcnRsaXN0Lmxpc3RbMV0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsb29wKGdvYWxzLnNsaWNlKDEpLCAwLCBjdHgsIGZiYWNrdHJhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZiYWNrdHJhY2s7IC8vIEZBSUxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJmaW5kYWxsLzNcIjogZnVuY3Rpb24gKGxvb3AsIGdvYWxzLCBpZHgsIGJpbmRpbmdDb250ZXh0LCBmYmFja3RyYWNrLCBkYikge1xyXG4gICAgICAgIHZhciBhcmdzID0gZ29hbHNbMF0ucGFydGxpc3QubGlzdCwgcmVzdWx0cyA9IFtdO1xyXG4gICAgICAgIHJldHVybiBnZXRkdHJlZWl0ZXJhdG9yKFthcmdzWzFdXSwgZGIsIGNvbGxlY3QsIGJpbmRpbmdDb250ZXh0LCByZXBvcnQpO1xyXG4gICAgICAgIGZ1bmN0aW9uIGNvbGxlY3QoY3R4KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChjdHgudmFsdWUoYXJnc1swXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiByZXBvcnQoKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBwcm9sb2dBU1RfMS5saXN0T2ZBcnJheShyZXN1bHRzKTtcclxuICAgICAgICAgICAgaWYgKGJpbmRpbmdDb250ZXh0LnVuaWZ5KGFyZ3NbMl0sIHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsb29wKGdvYWxzLnNsaWNlKDEpLCAwLCBiaW5kaW5nQ29udGV4dCwgZmJhY2t0cmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmJhY2t0cmFjaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcImlzLzJcIjogZnVuY3Rpb24gKGxvb3AsIGdvYWxzLCBpZHgsIGJpbmRpbmdDb250ZXh0LCBmYmFja3RyYWNrKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBnb2Fsc1swXS5wYXJ0bGlzdC5saXN0LCBleHByZXNzaW9uID0gYmluZGluZ0NvbnRleHQudmFsdWUoYXJnc1sxXSksIGN0eCA9IG5ldyBCaW5kaW5nQ29udGV4dChiaW5kaW5nQ29udGV4dCk7XHJcbiAgICAgICAgaWYgKHZhck5hbWVzKFtleHByZXNzaW9uXSkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYmFja3RyYWNrOyAvLyBUT0RPOiBwcm9sb2cgZXhjZXB0aW9uIFwiRVJST1I6IGlzLzI6IEFyZ3VtZW50cyBhcmUgbm90IHN1ZmZpY2llbnRseSBpbnN0YW50aWF0ZWRcIlxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBidWlsZCBldmFsdWF0aW9uIHF1ZXVlOlxyXG4gICAgICAgIHZhciBxdWV1ZSA9IFtleHByZXNzaW9uXSwgYWNjID0gW10sIGMsIGksIHgsIGw7XHJcbiAgICAgICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB4ID0gcXVldWUucG9wKCk7XHJcbiAgICAgICAgICAgIGFjYy5wdXNoKHgpO1xyXG4gICAgICAgICAgICBpZiAoeCBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlRlcm0pIHtcclxuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHF1ZXVlLCB4LnBhcnRsaXN0Lmxpc3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGV2YWx1YXRlXHJcbiAgICAgICAgcXVldWUgPSBhY2M7XHJcbiAgICAgICAgYWNjID0gW107XHJcbiAgICAgICAgaSA9IHF1ZXVlLmxlbmd0aDtcclxuICAgICAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgICAgIHggPSBxdWV1ZVtpXTtcclxuICAgICAgICAgICAgaWYgKHggaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5UZXJtKSB7XHJcbiAgICAgICAgICAgICAgICBjID0geC5wYXJ0bGlzdC5saXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGwgPSBhY2Muc3BsaWNlKC1jLCBjKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoeC5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIitcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWNjLnB1c2gobFswXSArIGxbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiLVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2MucHVzaChsWzBdIC0gbFsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCIqXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjYy5wdXNoKGxbMF0gKiBsWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIi9cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWNjLnB1c2gobFswXSAvIGxbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmJhY2t0cmFjazsgLy8gVE9ETzogcHJvbG9nIGV4Y2VwdGlvbiBcIkVSUk9SOiBpcy8yOiBBcml0aG1ldGljOiBge3gubmFtZX0nIGlzIG5vdCBhIGZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKHgubmFtZSkgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBhY2MucHVzaCh4Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogaGFuZGxlIGZ1bmN0aW9ucyBsaWtlIHBpIGUgZXRjXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZiYWNrdHJhY2s7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGN0eC51bmlmeShhcmdzWzBdLCBuZXcgcHJvbG9nQVNUXzEuQXRvbShhY2NbMF0pKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbG9vcChnb2Fscy5zbGljZSgxKSwgMCwgY3R4LCBmYmFja3RyYWNrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYmFja3RyYWNrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuLyoqXHJcbiAqIFRoZSBtYWluIHByb3ZpbmcgZW5naW5lXHJcbiAqIEBwYXJhbSBvcmlnaW5hbEdvYWxzIG9yaWdpbmFsIGdvYWxzIHRvIHByb3ZlXHJcbiAqIEBwYXJhbSBydWxlc0RCIHByb2xvZyBkYXRhYmFzZSB0byBjb25zdWx0IHdpdGhcclxuICogQHBhcmFtIGZzdWNjZXNzIHN1Y2Nlc3MgY2FsbGJhY2tcclxuICogQHJldHVybnMgYSBmdW5jdGlvbiB0byBwZXJmb3JtIG5leHQgc3RlcFxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0ZHRyZWVpdGVyYXRvcihvcmlnaW5hbEdvYWxzLCBydWxlc0RCLCBmc3VjY2Vzcywgcm9vdEJpbmRpbmdDb250ZXh0LCByb290QmFja3RyYWNrKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciB0YWlsRW5hYmxlZCA9IGV4cG9ydHMub3B0aW9ucy5leHBlcmltZW50YWwudGFpbFJlY3Vyc2lvbjtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiBsb29wKG9yaWdpbmFsR29hbHMsIDAsIHJvb3RCaW5kaW5nQ29udGV4dCB8fCBudWxsLCByb290QmFja3RyYWNrIHx8IG51bGwpOyB9O1xyXG4gICAgLy8gbWFpbiBsb29wIGNvbnRpbnVhdGlvblxyXG4gICAgZnVuY3Rpb24gbG9vcChnb2FscywgaWR4LCBwYXJlbnRCaW5kaW5nQ29udGV4dCwgZmJhY2t0cmFjaykge1xyXG4gICAgICAgIGlmICghZ29hbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZzdWNjZXNzKHBhcmVudEJpbmRpbmdDb250ZXh0KTtcclxuICAgICAgICAgICAgcmV0dXJuIGZiYWNrdHJhY2s7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjdXJyZW50R29hbCA9IGdvYWxzWzBdLCBjdXJyZW50QmluZGluZ0NvbnRleHQgPSBuZXcgQmluZGluZ0NvbnRleHQocGFyZW50QmluZGluZ0NvbnRleHQpLCBjdXJyZW50R29hbFZhck5hbWVzLCBydWxlLCB2YXJNYXAsIHJlbmFtZWRIZWFkLCBuZXh0R29hbHNWYXJOYW1lcywgZXhpc3Rpbmc7XHJcbiAgICAgICAgLy8gVE9ETzogYWRkIHN1cHBvcnQgZm9yIGJ1aWx0aW5zIHdpdGggdmFyaWFibGUgYXJpdHkgKGxpa2UgY2FsbC8yKylcclxuICAgICAgICB2YXIgYnVpbHRpbiA9IGJ1aWx0aW5QcmVkaWNhdGVzW2N1cnJlbnRHb2FsLm5hbWUgKyBcIi9cIiArIGN1cnJlbnRHb2FsLnBhcnRsaXN0Lmxpc3QubGVuZ3RoXTtcclxuICAgICAgICBpZiAodHlwZW9mIChidWlsdGluKSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBidWlsdGluKGxvb3AsIGdvYWxzLCBpZHgsIGN1cnJlbnRCaW5kaW5nQ29udGV4dCwgZmJhY2t0cmFjaywgcnVsZXNEQik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNlYXJjaGluZyBmb3IgbmV4dCBtYXRjaGluZyBydWxlICAgICAgICBcclxuICAgICAgICBmb3IgKHZhciBpID0gaWR4LCBkYiA9IHJ1bGVzREJbY3VycmVudEdvYWwubmFtZV0sIGRibGVuID0gZGIgJiYgZGIubGVuZ3RoOyBpIDwgZGJsZW47IGkrKykge1xyXG4gICAgICAgICAgICBydWxlID0gZGJbaV07XHJcbiAgICAgICAgICAgIHZhck1hcCA9IHt9O1xyXG4gICAgICAgICAgICByZW5hbWVkSGVhZCA9IG5ldyBwcm9sb2dBU1RfMS5UZXJtKHJ1bGUuaGVhZC5uYW1lLCBjdXJyZW50QmluZGluZ0NvbnRleHQucmVuYW1lVmFyaWFibGVzKHJ1bGUuaGVhZC5wYXJ0bGlzdC5saXN0LCBjdXJyZW50R29hbCwgdmFyTWFwKSk7XHJcbiAgICAgICAgICAgIHJlbmFtZWRIZWFkLnBhcmVudCA9IGN1cnJlbnRHb2FsLnBhcmVudDtcclxuICAgICAgICAgICAgaWYgKCFjdXJyZW50QmluZGluZ0NvbnRleHQudW5pZnkoY3VycmVudEdvYWwsIHJlbmFtZWRIZWFkKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG5leHRHb2FscyA9IGdvYWxzLnNsaWNlKDEpOyAvLyBjdXJyZW50IGhlYWQgc3VjY2VlZGVkICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChydWxlLmJvZHkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbmV4dEdvYWxzID0gY3VycmVudEJpbmRpbmdDb250ZXh0LnJlbmFtZVZhcmlhYmxlcyhydWxlLmJvZHkubGlzdCwgcmVuYW1lZEhlYWQsIHZhck1hcCkuY29uY2F0KG5leHRHb2Fscyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gVE9ETzogcmVtb3ZlICdmcmVlJyB2YXJpYWJsZXMgKG5lZWQgdG8gY2hlY2sgdmFsdWVzIGFzIHdlbGwpXHJcbiAgICAgICAgICAgIGlmIChydWxlLmJvZHkgIT0gbnVsbCAmJiBuZXh0R29hbHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjYWxsIGluIGEgdGFpbCBwb3NpdGlvbjogcmV1c2luZyBwYXJlbnQgdmFyaWFibGVzICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gcHJldmVudHMgY29udGV4dCBncm90aCBpbiBzb21lIHJlY3Vyc2l2ZSBzY2VuYXJpb3NcclxuICAgICAgICAgICAgICAgIGlmICh0YWlsRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRHb2FsVmFyTmFtZXMgPSB2YXJOYW1lcyhbY3VycmVudEdvYWxdKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0R29hbHNWYXJOYW1lcyA9IHZhck5hbWVzKG5leHRHb2Fscyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcgPSBuZXh0R29hbHNWYXJOYW1lcy5jb25jYXQoY3VycmVudEdvYWxWYXJOYW1lcykubWFwKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWU7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50R29hbFZhck5hbWVzLmxlbmd0aCA9PT0gbmV4dEdvYWxzVmFyTmFtZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHZuIGluIHZhck1hcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgY3YsIGNuLCBubiwgayA9IGN1cnJlbnRHb2FsVmFyTmFtZXMubGVuZ3RoOyBrLS07KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gPSBjdXJyZW50R29hbFZhck5hbWVzW2tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5uID0gbmV4dEdvYWxzVmFyTmFtZXNba107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3YgPSBjdXJyZW50QmluZGluZ0NvbnRleHQudmFsdWUoY24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbi5uYW1lICE9IG5uLm5hbWUgJiYgdmFyTWFwW3ZuXSA9PT0gbm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG8gbm90IHNob3J0LWN1dCBpZiBjbidzIHZhbHVlIHJlZmVyZW5jZXMgbm5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogcHJvYmFibHkgbmVlZCB0byBjaGVjayBvdGhlciB2YXJpYWJsZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN2ICYmIHZhck5hbWVzKFtjdl0pLmluZGV4T2Yobm4pICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyTWFwW3ZuXSA9IGNuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50QmluZGluZ0NvbnRleHQuY3R4W2NuLm5hbWVdID0gY3VycmVudEJpbmRpbmdDb250ZXh0LmN0eFtubi5uYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEJpbmRpbmdDb250ZXh0LnVuYmluZChubi5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmUtcmVuYW1lIHZhcnMgaW4gbmV4dCBnb2FscyAoY2FuIGJlIG9wdGltaXNlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEdvYWxzID0gY3VycmVudEJpbmRpbmdDb250ZXh0LnJlbmFtZVZhcmlhYmxlcyhydWxlLmJvZHkubGlzdCwgcmVuYW1lZEhlYWQsIHZhck1hcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGxldmVsRG93blRhaWwoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2tpcHBpbmcgYmFja3RyYWNraW5nIHRvIHRoZSBzYW1lIGxldmVsIGJlY2F1c2UgaXQncyB0aGUgbGFzdCBnb2FsICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogcmVtb3ZpbmcgZXh0cmEgc3R1ZmYgZnJvbSBiaW5kaW5nIGNvbnRleHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9vcChuZXh0R29hbHMsIDAsIGN1cnJlbnRCaW5kaW5nQ29udGV4dCwgZmJhY2t0cmFjayk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8vIENVUlJFTlQgQkFDS1RSQUNLIENPTlRJTlVBVElPTiAgLy8vXHJcbiAgICAgICAgICAgICAgICAvLy8gV0hFTiBJTlZPS0VEIEJBQ0tUUkFDS1MgVE8gVEhFICAvLy9cclxuICAgICAgICAgICAgICAgIC8vLyBORVhUIFJVTEUgSU4gVEhFIFBSRVZJT1VTIExFVkVMIC8vL1xyXG4gICAgICAgICAgICAgICAgdmFyIGZDdXJyZW50QlQgPSBmdW5jdGlvbiAoY3V0LCBwYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYmFja3RyYWNrICYmIGZiYWNrdHJhY2socGFyZW50LnBhcmVudCAhPT0gZ29hbHNbMF0ucGFyZW50LCBwYXJlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxvb3AoZ29hbHMsIGkgKyAxLCBwYXJlbnRCaW5kaW5nQ29udGV4dCwgZmJhY2t0cmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBsZXZlbERvd24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxvb3AobmV4dEdvYWxzLCAwLCBjdXJyZW50QmluZGluZ0NvbnRleHQsIGZDdXJyZW50QlQpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmJhY2t0cmFjaztcclxuICAgIH1cclxufVxyXG47XHJcbi8qKlxyXG4gKiBoZWxwZXIgZnVuY3Rpb24gdG8gY29udmVydCB0ZXJtcyB0byByZXN1bHQgdmFsdWVzIHJldHVybmVkIGJ5IHF1ZXJ5IGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiB0ZXJtVG9Kc1ZhbHVlKHYpIHtcclxuICAgIGlmICh2IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuQXRvbSkge1xyXG4gICAgICAgIHJldHVybiB2ID09PSBwcm9sb2dBU1RfMS5BdG9tLk5pbCA/IFtdIDogdi5uYW1lO1xyXG4gICAgfVxyXG4gICAgaWYgKHYgaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5UZXJtICYmIHYubmFtZSA9PT0gXCJjb25zXCIpIHtcclxuICAgICAgICB2YXIgdCA9IFtdO1xyXG4gICAgICAgIHdoaWxlICh2LnBhcnRsaXN0ICYmIHYubmFtZSAhPT0gXCJuaWxcIikge1xyXG4gICAgICAgICAgICB0LnB1c2godGVybVRvSnNWYWx1ZSh2LnBhcnRsaXN0Lmxpc3RbMF0pKTtcclxuICAgICAgICAgICAgdiA9IHYucGFydGxpc3QubGlzdFsxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdi50b1N0cmluZygpO1xyXG59XHJcbi8qKlxyXG4gKiBjcmVhdGVzIGJpbmRpbmcgY29udGV4dCBmb3IgdmFyaWFibGVzXHJcbiAqL1xyXG5mdW5jdGlvbiBCaW5kaW5nQ29udGV4dChwYXJlbnQpIHtcclxuICAgIHRoaXMuY3R4ID0gT2JqZWN0LmNyZWF0ZShwYXJlbnQgJiYgcGFyZW50LmN0eCB8fCB7fSk7XHJcbn1cclxuLyoqXHJcbiAqIGZpbmUtcHJpbnQgdGhlIGNvbnRleHQgKGZvciBkZWJ1Z2dpbmcgcHVycG9zZXMpXHJcbiAqICEgU0xPVyBiZWNhdXNlIG9mIGZvci1pblxyXG4gKi9cclxuQmluZGluZ0NvbnRleHQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcbiAgICB2YXIgciA9IFtdLCBwID0gW107XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5jdHgpIHtcclxuICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5jYWxsKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLmN0eCwga2V5KSA/IHIgOiBwLCBrZXkgKyBcIiA9IFwiICsgdGhpcy5jdHhba2V5XSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gci5qb2luKFwiLCBcIikgKyBcIiB8fCBcIiArIHAuam9pbihcIiwgXCIpO1xyXG59O1xyXG52YXIgZ2xvYmFsR29hbENvdW50ZXIgPSAwO1xyXG4vKipcclxuICogcmVuYW1lcyB2YXJpYWJsZXMgdG8gbWFrZSBzdXJlIG5hbWVzIGFyZSB1bmlxdWVcclxuICogQHBhcmFtIGxpc3QgbGlzdCBvZiB0ZXJtcyB0byByZW5hbWVcclxuICogQHBhcmFtIHBhcmVudCBwYXJlbnQgdGVybSAocGFyZW50IGlzIHVzZWQgaW4gY3V0KVxyXG4gKiBAcGFyYW0gdmFyTWFwIChvdXQpIG1hcCBvZiB2YXJpYWJsZSBtYXBwaW5ncywgdXNlZCB0byBtYWtlIHN1cmUgdGhhdCBib3RoIGhlYWQgYW5kIGJvZHkgaGF2ZSBzYW1lIG5hbWVzXHJcbiAqIEByZXR1cm5zIG5ldyB0ZXJtIHdpdGggcmVuYW1lZCB2YXJpYWJsZXNcclxuICovXHJcbkJpbmRpbmdDb250ZXh0LnByb3RvdHlwZS5yZW5hbWVWYXJpYWJsZXMgPSBmdW5jdGlvbiByZW5hbWVWYXJpYWJsZXMobGlzdCwgcGFyZW50LCB2YXJNYXApIHtcclxuICAgIHZhciBvdXQgPSBbXSwgcXVldWUgPSBbXSwgc3RhY2sgPSBbbGlzdF0sIGNsZW4sIHRtcCwgdjtcclxuICAgIC8vIHByZXBhcmUgZGVwdGgtZmlyc3QgcXVldWVcclxuICAgIHdoaWxlIChzdGFjay5sZW5ndGgpIHtcclxuICAgICAgICBsaXN0ID0gc3RhY2sucG9wKCk7XHJcbiAgICAgICAgcXVldWUucHVzaChsaXN0KTtcclxuICAgICAgICBpZiAobGlzdCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIGxpc3QubGVuZ3RoICYmIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHN0YWNrLCBsaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobGlzdCBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlRlcm0pIHtcclxuICAgICAgICAgICAgbGlzdC5wYXJ0bGlzdC5saXN0Lmxlbmd0aCAmJiBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShzdGFjaywgbGlzdC5wYXJ0bGlzdC5saXN0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBwcm9jZXNzIGRlcHRoLWZpcnN0IHF1ZXVlXHJcbiAgICB2YXIgdmFycyA9IHZhck1hcCB8fCB7fSwgXyA9IG5ldyBwcm9sb2dBU1RfMS5WYXJpYWJsZShcIl9cIik7XHJcbiAgICBmb3IgKHZhciBpID0gcXVldWUubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICBsaXN0ID0gcXVldWVbaV07XHJcbiAgICAgICAgaWYgKGxpc3QgaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5BdG9tKSB7XHJcbiAgICAgICAgICAgIG91dC5wdXNoKGxpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChsaXN0IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuVmFyaWFibGUpIHtcclxuICAgICAgICAgICAgaWYgKGxpc3QubmFtZSA9PT0gXCJfXCIpIHtcclxuICAgICAgICAgICAgICAgIHYgPSBfO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdiA9IHZhcnNbbGlzdC5uYW1lXSB8fCAodmFyc1tsaXN0Lm5hbWVdID0gbmV3IHByb2xvZ0FTVF8xLlZhcmlhYmxlKFwiX0dcIiArIChnbG9iYWxHb2FsQ291bnRlcisrKSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG91dC5wdXNoKHYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChsaXN0IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuVGVybSkge1xyXG4gICAgICAgICAgICBjbGVuID0gbGlzdC5wYXJ0bGlzdC5saXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgdG1wID0gbmV3IHByb2xvZ0FTVF8xLlRlcm0obGlzdC5uYW1lLCBvdXQuc3BsaWNlKC1jbGVuLCBjbGVuKSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHBsID0gdG1wLnBhcnRsaXN0Lmxpc3QsIGsgPSBwbC5sZW5ndGg7IGstLTspIHtcclxuICAgICAgICAgICAgICAgIGlmIChwbFtrXSBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlRlcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICBwbFtrXS5wYXJlbnQgPSB0bXA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdG1wLnBhcmVudCA9IHBhcmVudDtcclxuICAgICAgICAgICAgb3V0LnB1c2godG1wKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNsZW4gPSBsaXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgY2xlbiAmJiBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShvdXQsIG91dC5zcGxpY2UoLWNsZW4sIGNsZW4pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0O1xyXG59O1xyXG4vKipcclxuICogQmluZHMgdmFyaWFibGUgdG8gYSB2YWx1ZSBpbiB0aGUgY29udGV4dFxyXG4gKiBAcGFyYW0gbmFtZSBuYW1lIG9mIHRoZSB2YXJpYWJsZSB0byBiaW5kXHJcbiAqIEBwYXJhbSB2YWx1ZSB2YWx1ZSB0byBiaW5kIHRvIHRoZSB2YXJpYWJsZVxyXG4gKi9cclxuQmluZGluZ0NvbnRleHQucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgIHRoaXMuY3R4W25hbWVdID0gdmFsdWU7XHJcbn07XHJcbi8qKlxyXG4gKiBVbmJpbmRzIHZhcmlhYmxlIGluIHRoZSBDVVJSRU5UIGNvbnRleHRcclxuICogVmFyaWFibGUgcmVtYWlucyBib3VuZCBpbiBwYXJlbnQgY29udGV4dHNcclxuICogYW5kIG1pZ2h0IGJlIHJlc29sdmVkIHRob3VnaCBwcm90byBjaGFpblxyXG4gKiBAcGFyYW0gbmFtZSB2YXJpYWJsZSBuYW1lIHRvIHVuYmluZFxyXG4gKi9cclxuQmluZGluZ0NvbnRleHQucHJvdG90eXBlLnVuYmluZCA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICBkZWxldGUgdGhpcy5jdHhbbmFtZV07XHJcbn07XHJcbi8qKlxyXG4gKiBHZXRzIHRoZSB2YWx1ZSBvZiB0aGUgdGVybSwgcmVjdXJzaXZlbHkgcmVwbGFjaW5nIHZhcmlhYmxlcyB3aXRoIGJvdW5kIHZhbHVlc1xyXG4gKiBAcGFyYW0geCB0ZXJtIHRvIGNhbGN1bGF0ZSB2YWx1ZSBmb3JcclxuICogQHJldHVybnMgdmFsdWUgb2YgdGVybSB4XHJcbiAqL1xyXG5CaW5kaW5nQ29udGV4dC5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiB2YWx1ZSh4KSB7XHJcbiAgICB2YXIgcXVldWUgPSBbeF0sIGFjYyA9IFtdLCBjLCBpO1xyXG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCkge1xyXG4gICAgICAgIHggPSBxdWV1ZS5wb3AoKTtcclxuICAgICAgICBhY2MucHVzaCh4KTtcclxuICAgICAgICBpZiAoeCBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlRlcm0pIHtcclxuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkocXVldWUsIHgucGFydGxpc3QubGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHggaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5WYXJpYWJsZSkge1xyXG4gICAgICAgICAgICBjID0gdGhpcy5jdHhbeC5uYW1lXTtcclxuICAgICAgICAgICAgaWYgKGMpIHtcclxuICAgICAgICAgICAgICAgIGFjYy5wb3AoKTtcclxuICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBxdWV1ZSA9IGFjYztcclxuICAgIGFjYyA9IFtdO1xyXG4gICAgaSA9IHF1ZXVlLmxlbmd0aDtcclxuICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICB4ID0gcXVldWVbaV07XHJcbiAgICAgICAgaWYgKHggaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5UZXJtKSB7XHJcbiAgICAgICAgICAgIGMgPSB4LnBhcnRsaXN0Lmxpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICBhY2MucHVzaChuZXcgcHJvbG9nQVNUXzEuVGVybSh4Lm5hbWUsIGFjYy5zcGxpY2UoLWMsIGMpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgYWNjLnB1c2goeCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWNjWzBdO1xyXG59O1xyXG4vKipcclxuICogVW5pZmllcyB0ZXJtcyB4IGFuZCB5LCByZW5hbWluZyBhbmQgYmluZGluZyB2YXJpYWJsZXMgaW4gcHJvY2Vzc1xyXG4gKiAhISBtdXRhdGVzIHZhcmlhYmxlIG5hbWVzIChhbHRlcmluZyB4LCB5IGFuZCB2YXJNYXAgaW4gbWFpbiBsb29wKVxyXG4gKiBAcmV0dXJucyB0cnVlIGlmIHRlcm1zIHVuaWZ5LCBmYWxzZSBvdGhlcndpc2VcclxuICovXHJcbkJpbmRpbmdDb250ZXh0LnByb3RvdHlwZS51bmlmeSA9IGZ1bmN0aW9uIHVuaWZ5KHgsIHkpIHtcclxuICAgIHZhciB0b1NldE5hbWVzID0gW10sIHRvU2V0ID0ge30sIGFjYyA9IFtdLCBxdWV1ZSA9IFt0aGlzLnZhbHVlKHgpLCB0aGlzLnZhbHVlKHkpXSwgeHBsLCB5cGwsIGksIGxlbjtcclxuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGgpIHtcclxuICAgICAgICB4ID0gcXVldWUucG9wKCk7XHJcbiAgICAgICAgeSA9IHF1ZXVlLnBvcCgpO1xyXG4gICAgICAgIGlmICh4IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuVGVybSAmJiB5IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuVGVybSkge1xyXG4gICAgICAgICAgICB4cGwgPSB4LnBhcnRsaXN0Lmxpc3Q7XHJcbiAgICAgICAgICAgIHlwbCA9IHkucGFydGxpc3QubGlzdDtcclxuICAgICAgICAgICAgaWYgKHgubmFtZSA9PSB5Lm5hbWUgJiYgeHBsLmxlbmd0aCA9PSB5cGwubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSB4cGwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKHhwbFtpXSwgeXBsW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCh4IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuQXRvbSB8fCB5IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuQXRvbSkgJiYgISh4IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuVmFyaWFibGUgfHwgeSBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlZhcmlhYmxlKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEoeCBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLkF0b20gJiYgeSBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLkF0b20gJiYgeC5uYW1lID09IHkubmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYWNjLnB1c2goeCwgeSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaSA9IGFjYy5sZW5ndGg7XHJcbiAgICB3aGlsZSAoaSkge1xyXG4gICAgICAgIHkgPSBhY2NbLS1pXTtcclxuICAgICAgICB4ID0gYWNjWy0taV07XHJcbiAgICAgICAgaWYgKHggaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5WYXJpYWJsZSkge1xyXG4gICAgICAgICAgICBpZiAoeC5uYW1lID09PSBcIl9cIikge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRvU2V0TmFtZXMuaW5kZXhPZih4Lm5hbWUpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdG9TZXROYW1lcy5wdXNoKHgubmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodG9TZXRbeC5uYW1lXS5uYW1lICE9PSB5Lm5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0b1NldFt4Lm5hbWVdID0geTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoeSBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlZhcmlhYmxlKSB7XHJcbiAgICAgICAgICAgIGlmICh5Lm5hbWUgPT09IFwiX1wiKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodG9TZXROYW1lcy5pbmRleE9mKHkubmFtZSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0b1NldE5hbWVzLnB1c2goeS5uYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0b1NldFt5Lm5hbWVdLm5hbWUgIT09IHgubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRvU2V0W3kubmFtZV0gPSB4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIHJlbmFtaW5nIHVuaWZpZWQgdmFyaWFibGVzXHJcbiAgICAvLyBpdCdzIGd1YXJhbnRlZWQgdGhhdCB2YXJpYWJsZSB3aXRoIHRoZSBzYW1lIG5hbWUgaXMgdGhlIHNhbWUgaW5zdGFuY2Ugd2l0aGluIHJ1bGUsIHNlZSByZW5hbWVWYXJpYWJsZXMoKVxyXG4gICAgdmFyIHZhcm1hcCA9IHt9LCBrZXk7XHJcbiAgICBmb3IgKGkgPSAwOyBrZXkgPSB0b1NldE5hbWVzW2krK107KSB7XHJcbiAgICAgICAgaWYgKHRvU2V0W2tleV0gaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5WYXJpYWJsZSkge1xyXG4gICAgICAgICAgICB2YXJtYXBbdG9TZXRba2V5XS5uYW1lXSA9IGtleTtcclxuICAgICAgICAgICAgdG9TZXRba2V5XS5uYW1lID0ga2V5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGJpbmQgdmFsdWVzIHRvIHZhcmlhYmxlcyAobWluZGluZyByZW5hbWVzKVxyXG4gICAgZm9yIChpID0gMDsga2V5ID0gdG9TZXROYW1lc1tpKytdOykge1xyXG4gICAgICAgIGlmICghKHRvU2V0W2tleV0gaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5WYXJpYWJsZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5iaW5kKHZhcm1hcFtrZXldIHx8IGtleSwgdG9TZXRba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgZGVmYXVsdFBhcmFtcyA9IHtcbiAgdGl0bGU6ICcnLFxuICB0ZXh0OiAnJyxcbiAgdHlwZTogbnVsbCxcbiAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlLFxuICBzaG93Q29uZmlybUJ1dHRvbjogdHJ1ZSxcbiAgc2hvd0NhbmNlbEJ1dHRvbjogZmFsc2UsXG4gIGNsb3NlT25Db25maXJtOiB0cnVlLFxuICBjbG9zZU9uQ2FuY2VsOiB0cnVlLFxuICBjb25maXJtQnV0dG9uVGV4dDogJ09LJyxcbiAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzhDRDRGNScsXG4gIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWwnLFxuICBpbWFnZVVybDogbnVsbCxcbiAgaW1hZ2VTaXplOiBudWxsLFxuICB0aW1lcjogbnVsbCxcbiAgY3VzdG9tQ2xhc3M6ICcnLFxuICBodG1sOiBmYWxzZSxcbiAgYW5pbWF0aW9uOiB0cnVlLFxuICBhbGxvd0VzY2FwZUtleTogdHJ1ZSxcbiAgaW5wdXRUeXBlOiAndGV4dCcsXG4gIGlucHV0UGxhY2Vob2xkZXI6ICcnLFxuICBpbnB1dFZhbHVlOiAnJyxcbiAgc2hvd0xvYWRlck9uQ29uZmlybTogZmFsc2Vcbn07XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGRlZmF1bHRQYXJhbXM7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NvbG9yTHVtaW5hbmNlID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgX2dldE1vZGFsID0gcmVxdWlyZSgnLi9oYW5kbGUtc3dhbC1kb20nKTtcblxudmFyIF9oYXNDbGFzcyRpc0Rlc2NlbmRhbnQgPSByZXF1aXJlKCcuL2hhbmRsZS1kb20nKTtcblxuLypcbiAqIFVzZXIgY2xpY2tlZCBvbiBcIkNvbmZpcm1cIi9cIk9LXCIgb3IgXCJDYW5jZWxcIlxuICovXG52YXIgaGFuZGxlQnV0dG9uID0gZnVuY3Rpb24gaGFuZGxlQnV0dG9uKGV2ZW50LCBwYXJhbXMsIG1vZGFsKSB7XG4gIHZhciBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50O1xuICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuXG4gIHZhciB0YXJnZXRlZENvbmZpcm0gPSB0YXJnZXQuY2xhc3NOYW1lLmluZGV4T2YoJ2NvbmZpcm0nKSAhPT0gLTE7XG4gIHZhciB0YXJnZXRlZE92ZXJsYXkgPSB0YXJnZXQuY2xhc3NOYW1lLmluZGV4T2YoJ3N3ZWV0LW92ZXJsYXknKSAhPT0gLTE7XG4gIHZhciBtb2RhbElzVmlzaWJsZSA9IF9oYXNDbGFzcyRpc0Rlc2NlbmRhbnQuaGFzQ2xhc3MobW9kYWwsICd2aXNpYmxlJyk7XG4gIHZhciBkb25lRnVuY3Rpb25FeGlzdHMgPSBwYXJhbXMuZG9uZUZ1bmN0aW9uICYmIG1vZGFsLmdldEF0dHJpYnV0ZSgnZGF0YS1oYXMtZG9uZS1mdW5jdGlvbicpID09PSAndHJ1ZSc7XG5cbiAgLy8gU2luY2UgdGhlIHVzZXIgY2FuIGNoYW5nZSB0aGUgYmFja2dyb3VuZC1jb2xvciBvZiB0aGUgY29uZmlybSBidXR0b24gcHJvZ3JhbW1hdGljYWxseSxcbiAgLy8gd2UgbXVzdCBjYWxjdWxhdGUgd2hhdCB0aGUgY29sb3Igc2hvdWxkIGJlIG9uIGhvdmVyL2FjdGl2ZVxuICB2YXIgbm9ybWFsQ29sb3IsIGhvdmVyQ29sb3IsIGFjdGl2ZUNvbG9yO1xuICBpZiAodGFyZ2V0ZWRDb25maXJtICYmIHBhcmFtcy5jb25maXJtQnV0dG9uQ29sb3IpIHtcbiAgICBub3JtYWxDb2xvciA9IHBhcmFtcy5jb25maXJtQnV0dG9uQ29sb3I7XG4gICAgaG92ZXJDb2xvciA9IF9jb2xvckx1bWluYW5jZS5jb2xvckx1bWluYW5jZShub3JtYWxDb2xvciwgLTAuMDQpO1xuICAgIGFjdGl2ZUNvbG9yID0gX2NvbG9yTHVtaW5hbmNlLmNvbG9yTHVtaW5hbmNlKG5vcm1hbENvbG9yLCAtMC4xNCk7XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRTZXRDb25maXJtQnV0dG9uQ29sb3IoY29sb3IpIHtcbiAgICBpZiAodGFyZ2V0ZWRDb25maXJtICYmIHBhcmFtcy5jb25maXJtQnV0dG9uQ29sb3IpIHtcbiAgICAgIHRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcbiAgICB9XG4gIH1cblxuICBzd2l0Y2ggKGUudHlwZSkge1xuICAgIGNhc2UgJ21vdXNlb3Zlcic6XG4gICAgICBzaG91bGRTZXRDb25maXJtQnV0dG9uQ29sb3IoaG92ZXJDb2xvcik7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ21vdXNlb3V0JzpcbiAgICAgIHNob3VsZFNldENvbmZpcm1CdXR0b25Db2xvcihub3JtYWxDb2xvcik7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ21vdXNlZG93bic6XG4gICAgICBzaG91bGRTZXRDb25maXJtQnV0dG9uQ29sb3IoYWN0aXZlQ29sb3IpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdtb3VzZXVwJzpcbiAgICAgIHNob3VsZFNldENvbmZpcm1CdXR0b25Db2xvcihob3ZlckNvbG9yKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnZm9jdXMnOlxuICAgICAgdmFyICRjb25maXJtQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignYnV0dG9uLmNvbmZpcm0nKTtcbiAgICAgIHZhciAkY2FuY2VsQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignYnV0dG9uLmNhbmNlbCcpO1xuXG4gICAgICBpZiAodGFyZ2V0ZWRDb25maXJtKSB7XG4gICAgICAgICRjYW5jZWxCdXR0b24uc3R5bGUuYm94U2hhZG93ID0gJ25vbmUnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJGNvbmZpcm1CdXR0b24uc3R5bGUuYm94U2hhZG93ID0gJ25vbmUnO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdjbGljayc6XG4gICAgICB2YXIgY2xpY2tlZE9uTW9kYWwgPSBtb2RhbCA9PT0gdGFyZ2V0O1xuICAgICAgdmFyIGNsaWNrZWRPbk1vZGFsQ2hpbGQgPSBfaGFzQ2xhc3MkaXNEZXNjZW5kYW50LmlzRGVzY2VuZGFudChtb2RhbCwgdGFyZ2V0KTtcblxuICAgICAgLy8gSWdub3JlIGNsaWNrIG91dHNpZGUgaWYgYWxsb3dPdXRzaWRlQ2xpY2sgaXMgZmFsc2VcbiAgICAgIGlmICghY2xpY2tlZE9uTW9kYWwgJiYgIWNsaWNrZWRPbk1vZGFsQ2hpbGQgJiYgbW9kYWxJc1Zpc2libGUgJiYgIXBhcmFtcy5hbGxvd091dHNpZGVDbGljaykge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKHRhcmdldGVkQ29uZmlybSAmJiBkb25lRnVuY3Rpb25FeGlzdHMgJiYgbW9kYWxJc1Zpc2libGUpIHtcbiAgICAgICAgaGFuZGxlQ29uZmlybShtb2RhbCwgcGFyYW1zKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9uZUZ1bmN0aW9uRXhpc3RzICYmIG1vZGFsSXNWaXNpYmxlIHx8IHRhcmdldGVkT3ZlcmxheSkge1xuICAgICAgICBoYW5kbGVDYW5jZWwobW9kYWwsIHBhcmFtcyk7XG4gICAgICB9IGVsc2UgaWYgKF9oYXNDbGFzcyRpc0Rlc2NlbmRhbnQuaXNEZXNjZW5kYW50KG1vZGFsLCB0YXJnZXQpICYmIHRhcmdldC50YWdOYW1lID09PSAnQlVUVE9OJykge1xuICAgICAgICBzd2VldEFsZXJ0LmNsb3NlKCk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxufTtcblxuLypcbiAqICBVc2VyIGNsaWNrZWQgb24gXCJDb25maXJtXCIvXCJPS1wiXG4gKi9cbnZhciBoYW5kbGVDb25maXJtID0gZnVuY3Rpb24gaGFuZGxlQ29uZmlybShtb2RhbCwgcGFyYW1zKSB7XG4gIHZhciBjYWxsYmFja1ZhbHVlID0gdHJ1ZTtcblxuICBpZiAoX2hhc0NsYXNzJGlzRGVzY2VuZGFudC5oYXNDbGFzcyhtb2RhbCwgJ3Nob3ctaW5wdXQnKSkge1xuICAgIGNhbGxiYWNrVmFsdWUgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlO1xuXG4gICAgaWYgKCFjYWxsYmFja1ZhbHVlKSB7XG4gICAgICBjYWxsYmFja1ZhbHVlID0gJyc7XG4gICAgfVxuICB9XG5cbiAgcGFyYW1zLmRvbmVGdW5jdGlvbihjYWxsYmFja1ZhbHVlKTtcblxuICBpZiAocGFyYW1zLmNsb3NlT25Db25maXJtKSB7XG4gICAgc3dlZXRBbGVydC5jbG9zZSgpO1xuICB9XG4gIC8vIERpc2FibGUgY2FuY2VsIGFuZCBjb25maXJtIGJ1dHRvbiBpZiB0aGUgcGFyYW1ldGVyIGlzIHRydWVcbiAgaWYgKHBhcmFtcy5zaG93TG9hZGVyT25Db25maXJtKSB7XG4gICAgc3dlZXRBbGVydC5kaXNhYmxlQnV0dG9ucygpO1xuICB9XG59O1xuXG4vKlxuICogIFVzZXIgY2xpY2tlZCBvbiBcIkNhbmNlbFwiXG4gKi9cbnZhciBoYW5kbGVDYW5jZWwgPSBmdW5jdGlvbiBoYW5kbGVDYW5jZWwobW9kYWwsIHBhcmFtcykge1xuICAvLyBDaGVjayBpZiBjYWxsYmFjayBmdW5jdGlvbiBleHBlY3RzIGEgcGFyYW1ldGVyICh0byB0cmFjayBjYW5jZWwgYWN0aW9ucylcbiAgdmFyIGZ1bmN0aW9uQXNTdHIgPSBTdHJpbmcocGFyYW1zLmRvbmVGdW5jdGlvbikucmVwbGFjZSgvXFxzL2csICcnKTtcbiAgdmFyIGZ1bmN0aW9uSGFuZGxlc0NhbmNlbCA9IGZ1bmN0aW9uQXNTdHIuc3Vic3RyaW5nKDAsIDkpID09PSAnZnVuY3Rpb24oJyAmJiBmdW5jdGlvbkFzU3RyLnN1YnN0cmluZyg5LCAxMCkgIT09ICcpJztcblxuICBpZiAoZnVuY3Rpb25IYW5kbGVzQ2FuY2VsKSB7XG4gICAgcGFyYW1zLmRvbmVGdW5jdGlvbihmYWxzZSk7XG4gIH1cblxuICBpZiAocGFyYW1zLmNsb3NlT25DYW5jZWwpIHtcbiAgICBzd2VldEFsZXJ0LmNsb3NlKCk7XG4gIH1cbn07XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHtcbiAgaGFuZGxlQnV0dG9uOiBoYW5kbGVCdXR0b24sXG4gIGhhbmRsZUNvbmZpcm06IGhhbmRsZUNvbmZpcm0sXG4gIGhhbmRsZUNhbmNlbDogaGFuZGxlQ2FuY2VsXG59O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBoYXNDbGFzcyA9IGZ1bmN0aW9uIGhhc0NsYXNzKGVsZW0sIGNsYXNzTmFtZSkge1xuICByZXR1cm4gbmV3IFJlZ0V4cCgnICcgKyBjbGFzc05hbWUgKyAnICcpLnRlc3QoJyAnICsgZWxlbS5jbGFzc05hbWUgKyAnICcpO1xufTtcblxudmFyIGFkZENsYXNzID0gZnVuY3Rpb24gYWRkQ2xhc3MoZWxlbSwgY2xhc3NOYW1lKSB7XG4gIGlmICghaGFzQ2xhc3MoZWxlbSwgY2xhc3NOYW1lKSkge1xuICAgIGVsZW0uY2xhc3NOYW1lICs9ICcgJyArIGNsYXNzTmFtZTtcbiAgfVxufTtcblxudmFyIHJlbW92ZUNsYXNzID0gZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoZWxlbSwgY2xhc3NOYW1lKSB7XG4gIHZhciBuZXdDbGFzcyA9ICcgJyArIGVsZW0uY2xhc3NOYW1lLnJlcGxhY2UoL1tcXHRcXHJcXG5dL2csICcgJykgKyAnICc7XG4gIGlmIChoYXNDbGFzcyhlbGVtLCBjbGFzc05hbWUpKSB7XG4gICAgd2hpbGUgKG5ld0NsYXNzLmluZGV4T2YoJyAnICsgY2xhc3NOYW1lICsgJyAnKSA+PSAwKSB7XG4gICAgICBuZXdDbGFzcyA9IG5ld0NsYXNzLnJlcGxhY2UoJyAnICsgY2xhc3NOYW1lICsgJyAnLCAnICcpO1xuICAgIH1cbiAgICBlbGVtLmNsYXNzTmFtZSA9IG5ld0NsYXNzLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbiAgfVxufTtcblxudmFyIGVzY2FwZUh0bWwgPSBmdW5jdGlvbiBlc2NhcGVIdG1sKHN0cikge1xuICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHIpKTtcbiAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XG59O1xuXG52YXIgX3Nob3cgPSBmdW5jdGlvbiBfc2hvdyhlbGVtKSB7XG4gIGVsZW0uc3R5bGUub3BhY2l0eSA9ICcnO1xuICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufTtcblxudmFyIHNob3cgPSBmdW5jdGlvbiBzaG93KGVsZW1zKSB7XG4gIGlmIChlbGVtcyAmJiAhZWxlbXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIF9zaG93KGVsZW1zKTtcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgX3Nob3coZWxlbXNbaV0pO1xuICB9XG59O1xuXG52YXIgX2hpZGUgPSBmdW5jdGlvbiBfaGlkZShlbGVtKSB7XG4gIGVsZW0uc3R5bGUub3BhY2l0eSA9ICcnO1xuICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59O1xuXG52YXIgaGlkZSA9IGZ1bmN0aW9uIGhpZGUoZWxlbXMpIHtcbiAgaWYgKGVsZW1zICYmICFlbGVtcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gX2hpZGUoZWxlbXMpO1xuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbXMubGVuZ3RoOyArK2kpIHtcbiAgICBfaGlkZShlbGVtc1tpXSk7XG4gIH1cbn07XG5cbnZhciBpc0Rlc2NlbmRhbnQgPSBmdW5jdGlvbiBpc0Rlc2NlbmRhbnQocGFyZW50LCBjaGlsZCkge1xuICB2YXIgbm9kZSA9IGNoaWxkLnBhcmVudE5vZGU7XG4gIHdoaWxlIChub2RlICE9PSBudWxsKSB7XG4gICAgaWYgKG5vZGUgPT09IHBhcmVudCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxudmFyIGdldFRvcE1hcmdpbiA9IGZ1bmN0aW9uIGdldFRvcE1hcmdpbihlbGVtKSB7XG4gIGVsZW0uc3R5bGUubGVmdCA9ICctOTk5OXB4JztcbiAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICB2YXIgaGVpZ2h0ID0gZWxlbS5jbGllbnRIZWlnaHQsXG4gICAgICBwYWRkaW5nO1xuICBpZiAodHlwZW9mIGdldENvbXB1dGVkU3R5bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gSUUgOFxuICAgIHBhZGRpbmcgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGVsZW0pLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctdG9wJyksIDEwKTtcbiAgfSBlbHNlIHtcbiAgICBwYWRkaW5nID0gcGFyc2VJbnQoZWxlbS5jdXJyZW50U3R5bGUucGFkZGluZyk7XG4gIH1cblxuICBlbGVtLnN0eWxlLmxlZnQgPSAnJztcbiAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXR1cm4gJy0nICsgcGFyc2VJbnQoKGhlaWdodCArIHBhZGRpbmcpIC8gMikgKyAncHgnO1xufTtcblxudmFyIGZhZGVJbiA9IGZ1bmN0aW9uIGZhZGVJbihlbGVtLCBpbnRlcnZhbCkge1xuICBpZiAoK2VsZW0uc3R5bGUub3BhY2l0eSA8IDEpIHtcbiAgICBpbnRlcnZhbCA9IGludGVydmFsIHx8IDE2O1xuICAgIGVsZW0uc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB2YXIgbGFzdCA9ICtuZXcgRGF0ZSgpO1xuICAgIHZhciB0aWNrID0gKGZ1bmN0aW9uIChfdGljaykge1xuICAgICAgZnVuY3Rpb24gdGljaygpIHtcbiAgICAgICAgcmV0dXJuIF90aWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHRpY2sudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGljay50b1N0cmluZygpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHRpY2s7XG4gICAgfSkoZnVuY3Rpb24gKCkge1xuICAgICAgZWxlbS5zdHlsZS5vcGFjaXR5ID0gK2VsZW0uc3R5bGUub3BhY2l0eSArIChuZXcgRGF0ZSgpIC0gbGFzdCkgLyAxMDA7XG4gICAgICBsYXN0ID0gK25ldyBEYXRlKCk7XG5cbiAgICAgIGlmICgrZWxlbS5zdHlsZS5vcGFjaXR5IDwgMSkge1xuICAgICAgICBzZXRUaW1lb3V0KHRpY2ssIGludGVydmFsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aWNrKCk7XG4gIH1cbiAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJzsgLy9mYWxsYmFjayBJRThcbn07XG5cbnZhciBmYWRlT3V0ID0gZnVuY3Rpb24gZmFkZU91dChlbGVtLCBpbnRlcnZhbCkge1xuICBpbnRlcnZhbCA9IGludGVydmFsIHx8IDE2O1xuICBlbGVtLnN0eWxlLm9wYWNpdHkgPSAxO1xuICB2YXIgbGFzdCA9ICtuZXcgRGF0ZSgpO1xuICB2YXIgdGljayA9IChmdW5jdGlvbiAoX3RpY2syKSB7XG4gICAgZnVuY3Rpb24gdGljaygpIHtcbiAgICAgIHJldHVybiBfdGljazIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICB0aWNrLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aWNrMi50b1N0cmluZygpO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGljaztcbiAgfSkoZnVuY3Rpb24gKCkge1xuICAgIGVsZW0uc3R5bGUub3BhY2l0eSA9ICtlbGVtLnN0eWxlLm9wYWNpdHkgLSAobmV3IERhdGUoKSAtIGxhc3QpIC8gMTAwO1xuICAgIGxhc3QgPSArbmV3IERhdGUoKTtcblxuICAgIGlmICgrZWxlbS5zdHlsZS5vcGFjaXR5ID4gMCkge1xuICAgICAgc2V0VGltZW91dCh0aWNrLCBpbnRlcnZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG4gIH0pO1xuICB0aWNrKCk7XG59O1xuXG52YXIgZmlyZUNsaWNrID0gZnVuY3Rpb24gZmlyZUNsaWNrKG5vZGUpIHtcbiAgLy8gVGFrZW4gZnJvbSBodHRwOi8vd3d3Lm5vbm9idHJ1c2l2ZS5jb20vMjAxMS8xMS8yOS9wcm9ncmFtYXRpY2FsbHktZmlyZS1jcm9zc2Jyb3dzZXItY2xpY2stZXZlbnQtd2l0aC1qYXZhc2NyaXB0L1xuICAvLyBUaGVuIGZpeGVkIGZvciB0b2RheSdzIENocm9tZSBicm93c2VyLlxuICBpZiAodHlwZW9mIE1vdXNlRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBVcC10by1kYXRlIGFwcHJvYWNoXG4gICAgdmFyIG1ldnQgPSBuZXcgTW91c2VFdmVudCgnY2xpY2snLCB7XG4gICAgICB2aWV3OiB3aW5kb3csXG4gICAgICBidWJibGVzOiBmYWxzZSxcbiAgICAgIGNhbmNlbGFibGU6IHRydWVcbiAgICB9KTtcbiAgICBub2RlLmRpc3BhdGNoRXZlbnQobWV2dCk7XG4gIH0gZWxzZSBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnQpIHtcbiAgICAvLyBGYWxsYmFja1xuICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudHMnKTtcbiAgICBldnQuaW5pdEV2ZW50KCdjbGljaycsIGZhbHNlLCBmYWxzZSk7XG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gIH0gZWxzZSBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QpIHtcbiAgICBub2RlLmZpcmVFdmVudCgnb25jbGljaycpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBub2RlLm9uY2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICBub2RlLm9uY2xpY2soKTtcbiAgfVxufTtcblxudmFyIHN0b3BFdmVudFByb3BhZ2F0aW9uID0gZnVuY3Rpb24gc3RvcEV2ZW50UHJvcGFnYXRpb24oZSkge1xuICAvLyBJbiBwYXJ0aWN1bGFyLCBtYWtlIHN1cmUgdGhlIHNwYWNlIGJhciBkb2Vzbid0IHNjcm9sbCB0aGUgbWFpbiB3aW5kb3cuXG4gIGlmICh0eXBlb2YgZS5zdG9wUHJvcGFnYXRpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfSBlbHNlIGlmICh3aW5kb3cuZXZlbnQgJiYgd2luZG93LmV2ZW50Lmhhc093blByb3BlcnR5KCdjYW5jZWxCdWJibGUnKSkge1xuICAgIHdpbmRvdy5ldmVudC5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICB9XG59O1xuXG5leHBvcnRzLmhhc0NsYXNzID0gaGFzQ2xhc3M7XG5leHBvcnRzLmFkZENsYXNzID0gYWRkQ2xhc3M7XG5leHBvcnRzLnJlbW92ZUNsYXNzID0gcmVtb3ZlQ2xhc3M7XG5leHBvcnRzLmVzY2FwZUh0bWwgPSBlc2NhcGVIdG1sO1xuZXhwb3J0cy5fc2hvdyA9IF9zaG93O1xuZXhwb3J0cy5zaG93ID0gc2hvdztcbmV4cG9ydHMuX2hpZGUgPSBfaGlkZTtcbmV4cG9ydHMuaGlkZSA9IGhpZGU7XG5leHBvcnRzLmlzRGVzY2VuZGFudCA9IGlzRGVzY2VuZGFudDtcbmV4cG9ydHMuZ2V0VG9wTWFyZ2luID0gZ2V0VG9wTWFyZ2luO1xuZXhwb3J0cy5mYWRlSW4gPSBmYWRlSW47XG5leHBvcnRzLmZhZGVPdXQgPSBmYWRlT3V0O1xuZXhwb3J0cy5maXJlQ2xpY2sgPSBmaXJlQ2xpY2s7XG5leHBvcnRzLnN0b3BFdmVudFByb3BhZ2F0aW9uID0gc3RvcEV2ZW50UHJvcGFnYXRpb247IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9zdG9wRXZlbnRQcm9wYWdhdGlvbiRmaXJlQ2xpY2sgPSByZXF1aXJlKCcuL2hhbmRsZS1kb20nKTtcblxudmFyIF9zZXRGb2N1c1N0eWxlID0gcmVxdWlyZSgnLi9oYW5kbGUtc3dhbC1kb20nKTtcblxudmFyIGhhbmRsZUtleURvd24gPSBmdW5jdGlvbiBoYW5kbGVLZXlEb3duKGV2ZW50LCBwYXJhbXMsIG1vZGFsKSB7XG4gIHZhciBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50O1xuICB2YXIga2V5Q29kZSA9IGUua2V5Q29kZSB8fCBlLndoaWNoO1xuXG4gIHZhciAkb2tCdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCdidXR0b24uY29uZmlybScpO1xuICB2YXIgJGNhbmNlbEJ1dHRvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5jYW5jZWwnKTtcbiAgdmFyICRtb2RhbEJ1dHRvbnMgPSBtb2RhbC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b25bdGFiaW5kZXhdJyk7XG5cbiAgaWYgKFs5LCAxMywgMzIsIDI3XS5pbmRleE9mKGtleUNvZGUpID09PSAtMSkge1xuICAgIC8vIERvbid0IGRvIHdvcmsgb24ga2V5cyB3ZSBkb24ndCBjYXJlIGFib3V0LlxuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciAkdGFyZ2V0RWxlbWVudCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblxuICB2YXIgYnRuSW5kZXggPSAtMTsgLy8gRmluZCB0aGUgYnV0dG9uIC0gbm90ZSwgdGhpcyBpcyBhIG5vZGVsaXN0LCBub3QgYW4gYXJyYXkuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgJG1vZGFsQnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgIGlmICgkdGFyZ2V0RWxlbWVudCA9PT0gJG1vZGFsQnV0dG9uc1tpXSkge1xuICAgICAgYnRuSW5kZXggPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKGtleUNvZGUgPT09IDkpIHtcbiAgICAvLyBUQUJcbiAgICBpZiAoYnRuSW5kZXggPT09IC0xKSB7XG4gICAgICAvLyBObyBidXR0b24gZm9jdXNlZC4gSnVtcCB0byB0aGUgY29uZmlybSBidXR0b24uXG4gICAgICAkdGFyZ2V0RWxlbWVudCA9ICRva0J1dHRvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ3ljbGUgdG8gdGhlIG5leHQgYnV0dG9uXG4gICAgICBpZiAoYnRuSW5kZXggPT09ICRtb2RhbEJ1dHRvbnMubGVuZ3RoIC0gMSkge1xuICAgICAgICAkdGFyZ2V0RWxlbWVudCA9ICRtb2RhbEJ1dHRvbnNbMF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkdGFyZ2V0RWxlbWVudCA9ICRtb2RhbEJ1dHRvbnNbYnRuSW5kZXggKyAxXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfc3RvcEV2ZW50UHJvcGFnYXRpb24kZmlyZUNsaWNrLnN0b3BFdmVudFByb3BhZ2F0aW9uKGUpO1xuICAgICR0YXJnZXRFbGVtZW50LmZvY3VzKCk7XG5cbiAgICBpZiAocGFyYW1zLmNvbmZpcm1CdXR0b25Db2xvcikge1xuICAgICAgX3NldEZvY3VzU3R5bGUuc2V0Rm9jdXNTdHlsZSgkdGFyZ2V0RWxlbWVudCwgcGFyYW1zLmNvbmZpcm1CdXR0b25Db2xvcik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChrZXlDb2RlID09PSAxMykge1xuICAgICAgaWYgKCR0YXJnZXRFbGVtZW50LnRhZ05hbWUgPT09ICdJTlBVVCcpIHtcbiAgICAgICAgJHRhcmdldEVsZW1lbnQgPSAkb2tCdXR0b247XG4gICAgICAgICRva0J1dHRvbi5mb2N1cygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYnRuSW5kZXggPT09IC0xKSB7XG4gICAgICAgIC8vIEVOVEVSL1NQQUNFIGNsaWNrZWQgb3V0c2lkZSBvZiBhIGJ1dHRvbi5cbiAgICAgICAgJHRhcmdldEVsZW1lbnQgPSAkb2tCdXR0b247XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBEbyBub3RoaW5nIC0gbGV0IHRoZSBicm93c2VyIGhhbmRsZSBpdC5cbiAgICAgICAgJHRhcmdldEVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChrZXlDb2RlID09PSAyNyAmJiBwYXJhbXMuYWxsb3dFc2NhcGVLZXkgPT09IHRydWUpIHtcbiAgICAgICR0YXJnZXRFbGVtZW50ID0gJGNhbmNlbEJ1dHRvbjtcbiAgICAgIF9zdG9wRXZlbnRQcm9wYWdhdGlvbiRmaXJlQ2xpY2suZmlyZUNsaWNrKCR0YXJnZXRFbGVtZW50LCBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRmFsbGJhY2sgLSBsZXQgdGhlIGJyb3dzZXIgaGFuZGxlIGl0LlxuICAgICAgJHRhcmdldEVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBoYW5kbGVLZXlEb3duO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2hleFRvUmdiID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgX3JlbW92ZUNsYXNzJGdldFRvcE1hcmdpbiRmYWRlSW4kc2hvdyRhZGRDbGFzcyA9IHJlcXVpcmUoJy4vaGFuZGxlLWRvbScpO1xuXG52YXIgX2RlZmF1bHRQYXJhbXMgPSByZXF1aXJlKCcuL2RlZmF1bHQtcGFyYW1zJyk7XG5cbnZhciBfZGVmYXVsdFBhcmFtczIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfZGVmYXVsdFBhcmFtcyk7XG5cbi8qXG4gKiBBZGQgbW9kYWwgKyBvdmVybGF5IHRvIERPTVxuICovXG5cbnZhciBfaW5qZWN0ZWRIVE1MID0gcmVxdWlyZSgnLi9pbmplY3RlZC1odG1sJyk7XG5cbnZhciBfaW5qZWN0ZWRIVE1MMiA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9pbmplY3RlZEhUTUwpO1xuXG52YXIgbW9kYWxDbGFzcyA9ICcuc3dlZXQtYWxlcnQnO1xudmFyIG92ZXJsYXlDbGFzcyA9ICcuc3dlZXQtb3ZlcmxheSc7XG5cbnZhciBzd2VldEFsZXJ0SW5pdGlhbGl6ZSA9IGZ1bmN0aW9uIHN3ZWV0QWxlcnRJbml0aWFsaXplKCkge1xuICB2YXIgc3dlZXRXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHN3ZWV0V3JhcC5pbm5lckhUTUwgPSBfaW5qZWN0ZWRIVE1MMlsnZGVmYXVsdCddO1xuXG4gIC8vIEFwcGVuZCBlbGVtZW50cyB0byBib2R5XG4gIHdoaWxlIChzd2VldFdyYXAuZmlyc3RDaGlsZCkge1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc3dlZXRXcmFwLmZpcnN0Q2hpbGQpO1xuICB9XG59O1xuXG4vKlxuICogR2V0IERPTSBlbGVtZW50IG9mIG1vZGFsXG4gKi9cbnZhciBnZXRNb2RhbCA9IChmdW5jdGlvbiAoX2dldE1vZGFsKSB7XG4gIGZ1bmN0aW9uIGdldE1vZGFsKCkge1xuICAgIHJldHVybiBfZ2V0TW9kYWwuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIGdldE1vZGFsLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfZ2V0TW9kYWwudG9TdHJpbmcoKTtcbiAgfTtcblxuICByZXR1cm4gZ2V0TW9kYWw7XG59KShmdW5jdGlvbiAoKSB7XG4gIHZhciAkbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vZGFsQ2xhc3MpO1xuXG4gIGlmICghJG1vZGFsKSB7XG4gICAgc3dlZXRBbGVydEluaXRpYWxpemUoKTtcbiAgICAkbW9kYWwgPSBnZXRNb2RhbCgpO1xuICB9XG5cbiAgcmV0dXJuICRtb2RhbDtcbn0pO1xuXG4vKlxuICogR2V0IERPTSBlbGVtZW50IG9mIGlucHV0IChpbiBtb2RhbClcbiAqL1xudmFyIGdldElucHV0ID0gZnVuY3Rpb24gZ2V0SW5wdXQoKSB7XG4gIHZhciAkbW9kYWwgPSBnZXRNb2RhbCgpO1xuICBpZiAoJG1vZGFsKSB7XG4gICAgcmV0dXJuICRtb2RhbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuICB9XG59O1xuXG4vKlxuICogR2V0IERPTSBlbGVtZW50IG9mIG92ZXJsYXlcbiAqL1xudmFyIGdldE92ZXJsYXkgPSBmdW5jdGlvbiBnZXRPdmVybGF5KCkge1xuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvdmVybGF5Q2xhc3MpO1xufTtcblxuLypcbiAqIEFkZCBib3gtc2hhZG93IHN0eWxlIHRvIGJ1dHRvbiAoZGVwZW5kaW5nIG9uIGl0cyBjaG9zZW4gYmctY29sb3IpXG4gKi9cbnZhciBzZXRGb2N1c1N0eWxlID0gZnVuY3Rpb24gc2V0Rm9jdXNTdHlsZSgkYnV0dG9uLCBiZ0NvbG9yKSB7XG4gIHZhciByZ2JDb2xvciA9IF9oZXhUb1JnYi5oZXhUb1JnYihiZ0NvbG9yKTtcbiAgJGJ1dHRvbi5zdHlsZS5ib3hTaGFkb3cgPSAnMCAwIDJweCByZ2JhKCcgKyByZ2JDb2xvciArICcsIDAuOCksIGluc2V0IDAgMCAwIDFweCByZ2JhKDAsIDAsIDAsIDAuMDUpJztcbn07XG5cbi8qXG4gKiBBbmltYXRpb24gd2hlbiBvcGVuaW5nIG1vZGFsXG4gKi9cbnZhciBvcGVuTW9kYWwgPSBmdW5jdGlvbiBvcGVuTW9kYWwoY2FsbGJhY2spIHtcbiAgdmFyICRtb2RhbCA9IGdldE1vZGFsKCk7XG4gIF9yZW1vdmVDbGFzcyRnZXRUb3BNYXJnaW4kZmFkZUluJHNob3ckYWRkQ2xhc3MuZmFkZUluKGdldE92ZXJsYXkoKSwgMTApO1xuICBfcmVtb3ZlQ2xhc3MkZ2V0VG9wTWFyZ2luJGZhZGVJbiRzaG93JGFkZENsYXNzLnNob3coJG1vZGFsKTtcbiAgX3JlbW92ZUNsYXNzJGdldFRvcE1hcmdpbiRmYWRlSW4kc2hvdyRhZGRDbGFzcy5hZGRDbGFzcygkbW9kYWwsICdzaG93U3dlZXRBbGVydCcpO1xuICBfcmVtb3ZlQ2xhc3MkZ2V0VG9wTWFyZ2luJGZhZGVJbiRzaG93JGFkZENsYXNzLnJlbW92ZUNsYXNzKCRtb2RhbCwgJ2hpZGVTd2VldEFsZXJ0Jyk7XG5cbiAgd2luZG93LnByZXZpb3VzQWN0aXZlRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gIHZhciAkb2tCdXR0b24gPSAkbW9kYWwucXVlcnlTZWxlY3RvcignYnV0dG9uLmNvbmZpcm0nKTtcbiAgJG9rQnV0dG9uLmZvY3VzKCk7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgX3JlbW92ZUNsYXNzJGdldFRvcE1hcmdpbiRmYWRlSW4kc2hvdyRhZGRDbGFzcy5hZGRDbGFzcygkbW9kYWwsICd2aXNpYmxlJyk7XG4gIH0sIDUwMCk7XG5cbiAgdmFyIHRpbWVyID0gJG1vZGFsLmdldEF0dHJpYnV0ZSgnZGF0YS10aW1lcicpO1xuXG4gIGlmICh0aW1lciAhPT0gJ251bGwnICYmIHRpbWVyICE9PSAnJykge1xuICAgIHZhciB0aW1lckNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgJG1vZGFsLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBkb25lRnVuY3Rpb25FeGlzdHMgPSAodGltZXJDYWxsYmFjayB8fCBudWxsKSAmJiAkbW9kYWwuZ2V0QXR0cmlidXRlKCdkYXRhLWhhcy1kb25lLWZ1bmN0aW9uJykgPT09ICd0cnVlJztcbiAgICAgIGlmIChkb25lRnVuY3Rpb25FeGlzdHMpIHtcbiAgICAgICAgdGltZXJDYWxsYmFjayhudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3ZWV0QWxlcnQuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9LCB0aW1lcik7XG4gIH1cbn07XG5cbi8qXG4gKiBSZXNldCB0aGUgc3R5bGluZyBvZiB0aGUgaW5wdXRcbiAqIChmb3IgZXhhbXBsZSBpZiBlcnJvcnMgaGF2ZSBiZWVuIHNob3duKVxuICovXG52YXIgcmVzZXRJbnB1dCA9IGZ1bmN0aW9uIHJlc2V0SW5wdXQoKSB7XG4gIHZhciAkbW9kYWwgPSBnZXRNb2RhbCgpO1xuICB2YXIgJGlucHV0ID0gZ2V0SW5wdXQoKTtcblxuICBfcmVtb3ZlQ2xhc3MkZ2V0VG9wTWFyZ2luJGZhZGVJbiRzaG93JGFkZENsYXNzLnJlbW92ZUNsYXNzKCRtb2RhbCwgJ3Nob3ctaW5wdXQnKTtcbiAgJGlucHV0LnZhbHVlID0gX2RlZmF1bHRQYXJhbXMyWydkZWZhdWx0J10uaW5wdXRWYWx1ZTtcbiAgJGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsIF9kZWZhdWx0UGFyYW1zMlsnZGVmYXVsdCddLmlucHV0VHlwZSk7XG4gICRpbnB1dC5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgX2RlZmF1bHRQYXJhbXMyWydkZWZhdWx0J10uaW5wdXRQbGFjZWhvbGRlcik7XG5cbiAgcmVzZXRJbnB1dEVycm9yKCk7XG59O1xuXG52YXIgcmVzZXRJbnB1dEVycm9yID0gZnVuY3Rpb24gcmVzZXRJbnB1dEVycm9yKGV2ZW50KSB7XG4gIC8vIElmIHByZXNzIGVudGVyID0+IGlnbm9yZVxuICBpZiAoZXZlbnQgJiYgZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgJG1vZGFsID0gZ2V0TW9kYWwoKTtcblxuICB2YXIgJGVycm9ySWNvbiA9ICRtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2EtaW5wdXQtZXJyb3InKTtcbiAgX3JlbW92ZUNsYXNzJGdldFRvcE1hcmdpbiRmYWRlSW4kc2hvdyRhZGRDbGFzcy5yZW1vdmVDbGFzcygkZXJyb3JJY29uLCAnc2hvdycpO1xuXG4gIHZhciAkZXJyb3JDb250YWluZXIgPSAkbW9kYWwucXVlcnlTZWxlY3RvcignLnNhLWVycm9yLWNvbnRhaW5lcicpO1xuICBfcmVtb3ZlQ2xhc3MkZ2V0VG9wTWFyZ2luJGZhZGVJbiRzaG93JGFkZENsYXNzLnJlbW92ZUNsYXNzKCRlcnJvckNvbnRhaW5lciwgJ3Nob3cnKTtcbn07XG5cbi8qXG4gKiBTZXQgXCJtYXJnaW4tdG9wXCItcHJvcGVydHkgb24gbW9kYWwgYmFzZWQgb24gaXRzIGNvbXB1dGVkIGhlaWdodFxuICovXG52YXIgZml4VmVydGljYWxQb3NpdGlvbiA9IGZ1bmN0aW9uIGZpeFZlcnRpY2FsUG9zaXRpb24oKSB7XG4gIHZhciAkbW9kYWwgPSBnZXRNb2RhbCgpO1xuICAkbW9kYWwuc3R5bGUubWFyZ2luVG9wID0gX3JlbW92ZUNsYXNzJGdldFRvcE1hcmdpbiRmYWRlSW4kc2hvdyRhZGRDbGFzcy5nZXRUb3BNYXJnaW4oZ2V0TW9kYWwoKSk7XG59O1xuXG5leHBvcnRzLnN3ZWV0QWxlcnRJbml0aWFsaXplID0gc3dlZXRBbGVydEluaXRpYWxpemU7XG5leHBvcnRzLmdldE1vZGFsID0gZ2V0TW9kYWw7XG5leHBvcnRzLmdldE92ZXJsYXkgPSBnZXRPdmVybGF5O1xuZXhwb3J0cy5nZXRJbnB1dCA9IGdldElucHV0O1xuZXhwb3J0cy5zZXRGb2N1c1N0eWxlID0gc2V0Rm9jdXNTdHlsZTtcbmV4cG9ydHMub3Blbk1vZGFsID0gb3Blbk1vZGFsO1xuZXhwb3J0cy5yZXNldElucHV0ID0gcmVzZXRJbnB1dDtcbmV4cG9ydHMucmVzZXRJbnB1dEVycm9yID0gcmVzZXRJbnB1dEVycm9yO1xuZXhwb3J0cy5maXhWZXJ0aWNhbFBvc2l0aW9uID0gZml4VmVydGljYWxQb3NpdGlvbjsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBpbmplY3RlZEhUTUwgPVxuXG4vLyBEYXJrIG92ZXJsYXlcblwiPGRpdiBjbGFzcz1cXFwic3dlZXQtb3ZlcmxheVxcXCIgdGFiSW5kZXg9XFxcIi0xXFxcIj48L2Rpdj5cIiArXG5cbi8vIE1vZGFsXG5cIjxkaXYgY2xhc3M9XFxcInN3ZWV0LWFsZXJ0XFxcIj5cIiArXG5cbi8vIEVycm9yIGljb25cblwiPGRpdiBjbGFzcz1cXFwic2EtaWNvbiBzYS1lcnJvclxcXCI+XFxuICAgICAgPHNwYW4gY2xhc3M9XFxcInNhLXgtbWFya1xcXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwic2EtbGluZSBzYS1sZWZ0XFxcIj48L3NwYW4+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwic2EtbGluZSBzYS1yaWdodFxcXCI+PC9zcGFuPlxcbiAgICAgIDwvc3Bhbj5cXG4gICAgPC9kaXY+XCIgK1xuXG4vLyBXYXJuaW5nIGljb25cblwiPGRpdiBjbGFzcz1cXFwic2EtaWNvbiBzYS13YXJuaW5nXFxcIj5cXG4gICAgICA8c3BhbiBjbGFzcz1cXFwic2EtYm9keVxcXCI+PC9zcGFuPlxcbiAgICAgIDxzcGFuIGNsYXNzPVxcXCJzYS1kb3RcXFwiPjwvc3Bhbj5cXG4gICAgPC9kaXY+XCIgK1xuXG4vLyBJbmZvIGljb25cblwiPGRpdiBjbGFzcz1cXFwic2EtaWNvbiBzYS1pbmZvXFxcIj48L2Rpdj5cIiArXG5cbi8vIFN1Y2Nlc3MgaWNvblxuXCI8ZGl2IGNsYXNzPVxcXCJzYS1pY29uIHNhLXN1Y2Nlc3NcXFwiPlxcbiAgICAgIDxzcGFuIGNsYXNzPVxcXCJzYS1saW5lIHNhLXRpcFxcXCI+PC9zcGFuPlxcbiAgICAgIDxzcGFuIGNsYXNzPVxcXCJzYS1saW5lIHNhLWxvbmdcXFwiPjwvc3Bhbj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJzYS1wbGFjZWhvbGRlclxcXCI+PC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwic2EtZml4XFxcIj48L2Rpdj5cXG4gICAgPC9kaXY+XCIgKyBcIjxkaXYgY2xhc3M9XFxcInNhLWljb24gc2EtY3VzdG9tXFxcIj48L2Rpdj5cIiArXG5cbi8vIFRpdGxlLCB0ZXh0IGFuZCBpbnB1dFxuXCI8aDI+VGl0bGU8L2gyPlxcbiAgICA8cD5UZXh0PC9wPlxcbiAgICA8ZmllbGRzZXQ+XFxuICAgICAgPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIHRhYkluZGV4PVxcXCIzXFxcIiAvPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcInNhLWlucHV0LWVycm9yXFxcIj48L2Rpdj5cXG4gICAgPC9maWVsZHNldD5cIiArXG5cbi8vIElucHV0IGVycm9yc1xuXCI8ZGl2IGNsYXNzPVxcXCJzYS1lcnJvci1jb250YWluZXJcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImljb25cXFwiPiE8L2Rpdj5cXG4gICAgICA8cD5Ob3QgdmFsaWQhPC9wPlxcbiAgICA8L2Rpdj5cIiArXG5cbi8vIENhbmNlbCBhbmQgY29uZmlybSBidXR0b25zXG5cIjxkaXYgY2xhc3M9XFxcInNhLWJ1dHRvbi1jb250YWluZXJcXFwiPlxcbiAgICAgIDxidXR0b24gY2xhc3M9XFxcImNhbmNlbFxcXCIgdGFiSW5kZXg9XFxcIjJcXFwiPkNhbmNlbDwvYnV0dG9uPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcInNhLWNvbmZpcm0tYnV0dG9uLWNvbnRhaW5lclxcXCI+XFxuICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJjb25maXJtXFxcIiB0YWJJbmRleD1cXFwiMVxcXCI+T0s8L2J1dHRvbj5cIiArXG5cbi8vIExvYWRpbmcgYW5pbWF0aW9uXG5cIjxkaXYgY2xhc3M9XFxcImxhLWJhbGwtZmFsbFxcXCI+XFxuICAgICAgICAgIDxkaXY+PC9kaXY+XFxuICAgICAgICAgIDxkaXY+PC9kaXY+XFxuICAgICAgICAgIDxkaXY+PC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XCIgK1xuXG4vLyBFbmQgb2YgbW9kYWxcblwiPC9kaXY+XCI7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gaW5qZWN0ZWRIVE1MO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lzSUU4ID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgX2dldE1vZGFsJGdldElucHV0JHNldEZvY3VzU3R5bGUgPSByZXF1aXJlKCcuL2hhbmRsZS1zd2FsLWRvbScpO1xuXG52YXIgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlID0gcmVxdWlyZSgnLi9oYW5kbGUtZG9tJyk7XG5cbnZhciBhbGVydFR5cGVzID0gWydlcnJvcicsICd3YXJuaW5nJywgJ2luZm8nLCAnc3VjY2VzcycsICdpbnB1dCcsICdwcm9tcHQnXTtcblxuLypcbiAqIFNldCB0eXBlLCB0ZXh0IGFuZCBhY3Rpb25zIG9uIG1vZGFsXG4gKi9cbnZhciBzZXRQYXJhbWV0ZXJzID0gZnVuY3Rpb24gc2V0UGFyYW1ldGVycyhwYXJhbXMpIHtcbiAgdmFyIG1vZGFsID0gX2dldE1vZGFsJGdldElucHV0JHNldEZvY3VzU3R5bGUuZ2V0TW9kYWwoKTtcblxuICB2YXIgJHRpdGxlID0gbW9kYWwucXVlcnlTZWxlY3RvcignaDInKTtcbiAgdmFyICR0ZXh0ID0gbW9kYWwucXVlcnlTZWxlY3RvcigncCcpO1xuICB2YXIgJGNhbmNlbEJ0biA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5jYW5jZWwnKTtcbiAgdmFyICRjb25maXJtQnRuID0gbW9kYWwucXVlcnlTZWxlY3RvcignYnV0dG9uLmNvbmZpcm0nKTtcblxuICAvKlxuICAgKiBUaXRsZVxuICAgKi9cbiAgJHRpdGxlLmlubmVySFRNTCA9IHBhcmFtcy5odG1sID8gcGFyYW1zLnRpdGxlIDogX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlLmVzY2FwZUh0bWwocGFyYW1zLnRpdGxlKS5zcGxpdCgnXFxuJykuam9pbignPGJyPicpO1xuXG4gIC8qXG4gICAqIFRleHRcbiAgICovXG4gICR0ZXh0LmlubmVySFRNTCA9IHBhcmFtcy5odG1sID8gcGFyYW1zLnRleHQgOiBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUuZXNjYXBlSHRtbChwYXJhbXMudGV4dCB8fCAnJykuc3BsaXQoJ1xcbicpLmpvaW4oJzxicj4nKTtcbiAgaWYgKHBhcmFtcy50ZXh0KSBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUuc2hvdygkdGV4dCk7XG5cbiAgLypcbiAgICogQ3VzdG9tIGNsYXNzXG4gICAqL1xuICBpZiAocGFyYW1zLmN1c3RvbUNsYXNzKSB7XG4gICAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlLmFkZENsYXNzKG1vZGFsLCBwYXJhbXMuY3VzdG9tQ2xhc3MpO1xuICAgIG1vZGFsLnNldEF0dHJpYnV0ZSgnZGF0YS1jdXN0b20tY2xhc3MnLCBwYXJhbXMuY3VzdG9tQ2xhc3MpO1xuICB9IGVsc2Uge1xuICAgIC8vIEZpbmQgcHJldmlvdXNseSBzZXQgY2xhc3NlcyBhbmQgcmVtb3ZlIHRoZW1cbiAgICB2YXIgY3VzdG9tQ2xhc3MgPSBtb2RhbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY3VzdG9tLWNsYXNzJyk7XG4gICAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlLnJlbW92ZUNsYXNzKG1vZGFsLCBjdXN0b21DbGFzcyk7XG4gICAgbW9kYWwuc2V0QXR0cmlidXRlKCdkYXRhLWN1c3RvbS1jbGFzcycsICcnKTtcbiAgfVxuXG4gIC8qXG4gICAqIEljb25cbiAgICovXG4gIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZS5oaWRlKG1vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zYS1pY29uJykpO1xuXG4gIGlmIChwYXJhbXMudHlwZSAmJiAhX2lzSUU4LmlzSUU4KCkpIHtcbiAgICB2YXIgX3JldCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICAgIHZhciB2YWxpZFR5cGUgPSBmYWxzZTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGVydFR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChwYXJhbXMudHlwZSA9PT0gYWxlcnRUeXBlc1tpXSkge1xuICAgICAgICAgIHZhbGlkVHlwZSA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCF2YWxpZFR5cGUpIHtcbiAgICAgICAgbG9nU3RyKCdVbmtub3duIGFsZXJ0IHR5cGU6ICcgKyBwYXJhbXMudHlwZSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdjogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgdmFyIHR5cGVzV2l0aEljb25zID0gWydzdWNjZXNzJywgJ2Vycm9yJywgJ3dhcm5pbmcnLCAnaW5mbyddO1xuICAgICAgdmFyICRpY29uID0gdW5kZWZpbmVkO1xuXG4gICAgICBpZiAodHlwZXNXaXRoSWNvbnMuaW5kZXhPZihwYXJhbXMudHlwZSkgIT09IC0xKSB7XG4gICAgICAgICRpY29uID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnNhLWljb24uJyArICdzYS0nICsgcGFyYW1zLnR5cGUpO1xuICAgICAgICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUuc2hvdygkaWNvbik7XG4gICAgICB9XG5cbiAgICAgIHZhciAkaW5wdXQgPSBfZ2V0TW9kYWwkZ2V0SW5wdXQkc2V0Rm9jdXNTdHlsZS5nZXRJbnB1dCgpO1xuXG4gICAgICAvLyBBbmltYXRlIGljb25cbiAgICAgIHN3aXRjaCAocGFyYW1zLnR5cGUpIHtcblxuICAgICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUuYWRkQ2xhc3MoJGljb24sICdhbmltYXRlJyk7XG4gICAgICAgICAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlLmFkZENsYXNzKCRpY29uLnF1ZXJ5U2VsZWN0b3IoJy5zYS10aXAnKSwgJ2FuaW1hdGVTdWNjZXNzVGlwJyk7XG4gICAgICAgICAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlLmFkZENsYXNzKCRpY29uLnF1ZXJ5U2VsZWN0b3IoJy5zYS1sb25nJyksICdhbmltYXRlU3VjY2Vzc0xvbmcnKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgICAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlLmFkZENsYXNzKCRpY29uLCAnYW5pbWF0ZUVycm9ySWNvbicpO1xuICAgICAgICAgIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZS5hZGRDbGFzcygkaWNvbi5xdWVyeVNlbGVjdG9yKCcuc2EteC1tYXJrJyksICdhbmltYXRlWE1hcmsnKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgICAgICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUuYWRkQ2xhc3MoJGljb24sICdwdWxzZVdhcm5pbmcnKTtcbiAgICAgICAgICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUuYWRkQ2xhc3MoJGljb24ucXVlcnlTZWxlY3RvcignLnNhLWJvZHknKSwgJ3B1bHNlV2FybmluZ0lucycpO1xuICAgICAgICAgIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZS5hZGRDbGFzcygkaWNvbi5xdWVyeVNlbGVjdG9yKCcuc2EtZG90JyksICdwdWxzZVdhcm5pbmdJbnMnKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdpbnB1dCc6XG4gICAgICAgIGNhc2UgJ3Byb21wdCc6XG4gICAgICAgICAgJGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsIHBhcmFtcy5pbnB1dFR5cGUpO1xuICAgICAgICAgICRpbnB1dC52YWx1ZSA9IHBhcmFtcy5pbnB1dFZhbHVlO1xuICAgICAgICAgICRpbnB1dC5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgcGFyYW1zLmlucHV0UGxhY2Vob2xkZXIpO1xuICAgICAgICAgIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZS5hZGRDbGFzcyhtb2RhbCwgJ3Nob3ctaW5wdXQnKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRpbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgJGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgc3dhbC5yZXNldElucHV0RXJyb3IpO1xuICAgICAgICAgIH0sIDQwMCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSkoKTtcblxuICAgIGlmICh0eXBlb2YgX3JldCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBfcmV0LnY7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogQ3VzdG9tIGltYWdlXG4gICAqL1xuICBpZiAocGFyYW1zLmltYWdlVXJsKSB7XG4gICAgdmFyICRjdXN0b21JY29uID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnNhLWljb24uc2EtY3VzdG9tJyk7XG5cbiAgICAkY3VzdG9tSWNvbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKCcgKyBwYXJhbXMuaW1hZ2VVcmwgKyAnKSc7XG4gICAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlLnNob3coJGN1c3RvbUljb24pO1xuXG4gICAgdmFyIF9pbWdXaWR0aCA9IDgwO1xuICAgIHZhciBfaW1nSGVpZ2h0ID0gODA7XG5cbiAgICBpZiAocGFyYW1zLmltYWdlU2l6ZSkge1xuICAgICAgdmFyIGRpbWVuc2lvbnMgPSBwYXJhbXMuaW1hZ2VTaXplLnRvU3RyaW5nKCkuc3BsaXQoJ3gnKTtcbiAgICAgIHZhciBpbWdXaWR0aCA9IGRpbWVuc2lvbnNbMF07XG4gICAgICB2YXIgaW1nSGVpZ2h0ID0gZGltZW5zaW9uc1sxXTtcblxuICAgICAgaWYgKCFpbWdXaWR0aCB8fCAhaW1nSGVpZ2h0KSB7XG4gICAgICAgIGxvZ1N0cignUGFyYW1ldGVyIGltYWdlU2l6ZSBleHBlY3RzIHZhbHVlIHdpdGggZm9ybWF0IFdJRFRIeEhFSUdIVCwgZ290ICcgKyBwYXJhbXMuaW1hZ2VTaXplKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9pbWdXaWR0aCA9IGltZ1dpZHRoO1xuICAgICAgICBfaW1nSGVpZ2h0ID0gaW1nSGVpZ2h0O1xuICAgICAgfVxuICAgIH1cblxuICAgICRjdXN0b21JY29uLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAkY3VzdG9tSWNvbi5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykgKyAnd2lkdGg6JyArIF9pbWdXaWR0aCArICdweDsgaGVpZ2h0OicgKyBfaW1nSGVpZ2h0ICsgJ3B4Jyk7XG4gIH1cblxuICAvKlxuICAgKiBTaG93IGNhbmNlbCBidXR0b24/XG4gICAqL1xuICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaGFzLWNhbmNlbC1idXR0b24nLCBwYXJhbXMuc2hvd0NhbmNlbEJ1dHRvbik7XG4gIGlmIChwYXJhbXMuc2hvd0NhbmNlbEJ1dHRvbikge1xuICAgICRjYW5jZWxCdG4uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICB9IGVsc2Uge1xuICAgIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZS5oaWRlKCRjYW5jZWxCdG4pO1xuICB9XG5cbiAgLypcbiAgICogU2hvdyBjb25maXJtIGJ1dHRvbj9cbiAgICovXG4gIG1vZGFsLnNldEF0dHJpYnV0ZSgnZGF0YS1oYXMtY29uZmlybS1idXR0b24nLCBwYXJhbXMuc2hvd0NvbmZpcm1CdXR0b24pO1xuICBpZiAocGFyYW1zLnNob3dDb25maXJtQnV0dG9uKSB7XG4gICAgJGNvbmZpcm1CdG4uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICB9IGVsc2Uge1xuICAgIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZS5oaWRlKCRjb25maXJtQnRuKTtcbiAgfVxuXG4gIC8qXG4gICAqIEN1c3RvbSB0ZXh0IG9uIGNhbmNlbC9jb25maXJtIGJ1dHRvbnNcbiAgICovXG4gIGlmIChwYXJhbXMuY2FuY2VsQnV0dG9uVGV4dCkge1xuICAgICRjYW5jZWxCdG4uaW5uZXJIVE1MID0gX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlLmVzY2FwZUh0bWwocGFyYW1zLmNhbmNlbEJ1dHRvblRleHQpO1xuICB9XG4gIGlmIChwYXJhbXMuY29uZmlybUJ1dHRvblRleHQpIHtcbiAgICAkY29uZmlybUJ0bi5pbm5lckhUTUwgPSBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUuZXNjYXBlSHRtbChwYXJhbXMuY29uZmlybUJ1dHRvblRleHQpO1xuICB9XG5cbiAgLypcbiAgICogQ3VzdG9tIGNvbG9yIG9uIGNvbmZpcm0gYnV0dG9uXG4gICAqL1xuICBpZiAocGFyYW1zLmNvbmZpcm1CdXR0b25Db2xvcikge1xuICAgIC8vIFNldCBjb25maXJtIGJ1dHRvbiB0byBzZWxlY3RlZCBiYWNrZ3JvdW5kIGNvbG9yXG4gICAgJGNvbmZpcm1CdG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gcGFyYW1zLmNvbmZpcm1CdXR0b25Db2xvcjtcblxuICAgIC8vIFNldCB0aGUgY29uZmlybSBidXR0b24gY29sb3IgdG8gdGhlIGxvYWRpbmcgcmluZ1xuICAgICRjb25maXJtQnRuLnN0eWxlLmJvcmRlckxlZnRDb2xvciA9IHBhcmFtcy5jb25maXJtTG9hZGluZ0J1dHRvbkNvbG9yO1xuICAgICRjb25maXJtQnRuLnN0eWxlLmJvcmRlclJpZ2h0Q29sb3IgPSBwYXJhbXMuY29uZmlybUxvYWRpbmdCdXR0b25Db2xvcjtcblxuICAgIC8vIFNldCBib3gtc2hhZG93IHRvIGRlZmF1bHQgZm9jdXNlZCBidXR0b25cbiAgICBfZ2V0TW9kYWwkZ2V0SW5wdXQkc2V0Rm9jdXNTdHlsZS5zZXRGb2N1c1N0eWxlKCRjb25maXJtQnRuLCBwYXJhbXMuY29uZmlybUJ1dHRvbkNvbG9yKTtcbiAgfVxuXG4gIC8qXG4gICAqIEFsbG93IG91dHNpZGUgY2xpY2tcbiAgICovXG4gIG1vZGFsLnNldEF0dHJpYnV0ZSgnZGF0YS1hbGxvdy1vdXRzaWRlLWNsaWNrJywgcGFyYW1zLmFsbG93T3V0c2lkZUNsaWNrKTtcblxuICAvKlxuICAgKiBDYWxsYmFjayBmdW5jdGlvblxuICAgKi9cbiAgdmFyIGhhc0RvbmVGdW5jdGlvbiA9IHBhcmFtcy5kb25lRnVuY3Rpb24gPyB0cnVlIDogZmFsc2U7XG4gIG1vZGFsLnNldEF0dHJpYnV0ZSgnZGF0YS1oYXMtZG9uZS1mdW5jdGlvbicsIGhhc0RvbmVGdW5jdGlvbik7XG5cbiAgLypcbiAgICogQW5pbWF0aW9uXG4gICAqL1xuICBpZiAoIXBhcmFtcy5hbmltYXRpb24pIHtcbiAgICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYW5pbWF0aW9uJywgJ25vbmUnKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zLmFuaW1hdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYW5pbWF0aW9uJywgcGFyYW1zLmFuaW1hdGlvbik7IC8vIEN1c3RvbSBhbmltYXRpb25cbiAgfSBlbHNlIHtcbiAgICBtb2RhbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYW5pbWF0aW9uJywgJ3BvcCcpO1xuICB9XG5cbiAgLypcbiAgICogVGltZXJcbiAgICovXG4gIG1vZGFsLnNldEF0dHJpYnV0ZSgnZGF0YS10aW1lcicsIHBhcmFtcy50aW1lcik7XG59O1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBzZXRQYXJhbWV0ZXJzO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbi8qXG4gKiBBbGxvdyB1c2VyIHRvIHBhc3MgdGhlaXIgb3duIHBhcmFtc1xuICovXG52YXIgZXh0ZW5kID0gZnVuY3Rpb24gZXh0ZW5kKGEsIGIpIHtcbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoYi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiBhO1xufTtcblxuLypcbiAqIENvbnZlcnQgSEVYIGNvZGVzIHRvIFJHQiB2YWx1ZXMgKCMwMDAwMDAgLT4gcmdiKDAsMCwwKSlcbiAqL1xudmFyIGhleFRvUmdiID0gZnVuY3Rpb24gaGV4VG9SZ2IoaGV4KSB7XG4gIHZhciByZXN1bHQgPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoaGV4KTtcbiAgcmV0dXJuIHJlc3VsdCA/IHBhcnNlSW50KHJlc3VsdFsxXSwgMTYpICsgJywgJyArIHBhcnNlSW50KHJlc3VsdFsyXSwgMTYpICsgJywgJyArIHBhcnNlSW50KHJlc3VsdFszXSwgMTYpIDogbnVsbDtcbn07XG5cbi8qXG4gKiBDaGVjayBpZiB0aGUgdXNlciBpcyB1c2luZyBJbnRlcm5ldCBFeHBsb3JlciA4IChmb3IgZmFsbGJhY2tzKVxuICovXG52YXIgaXNJRTggPSBmdW5jdGlvbiBpc0lFOCgpIHtcbiAgcmV0dXJuIHdpbmRvdy5hdHRhY2hFdmVudCAmJiAhd2luZG93LmFkZEV2ZW50TGlzdGVuZXI7XG59O1xuXG4vKlxuICogSUUgY29tcGF0aWJsZSBsb2dnaW5nIGZvciBkZXZlbG9wZXJzXG4gKi9cbnZhciBsb2dTdHIgPSBmdW5jdGlvbiBsb2dTdHIoc3RyaW5nKSB7XG4gIGlmICh3aW5kb3cuY29uc29sZSkge1xuICAgIC8vIElFLi4uXG4gICAgd2luZG93LmNvbnNvbGUubG9nKCdTd2VldEFsZXJ0OiAnICsgc3RyaW5nKTtcbiAgfVxufTtcblxuLypcbiAqIFNldCBob3ZlciwgYWN0aXZlIGFuZCBmb2N1cy1zdGF0ZXMgZm9yIGJ1dHRvbnMgXG4gKiAoc291cmNlOiBodHRwOi8vd3d3LnNpdGVwb2ludC5jb20vamF2YXNjcmlwdC1nZW5lcmF0ZS1saWdodGVyLWRhcmtlci1jb2xvcilcbiAqL1xudmFyIGNvbG9yTHVtaW5hbmNlID0gZnVuY3Rpb24gY29sb3JMdW1pbmFuY2UoaGV4LCBsdW0pIHtcbiAgLy8gVmFsaWRhdGUgaGV4IHN0cmluZ1xuICBoZXggPSBTdHJpbmcoaGV4KS5yZXBsYWNlKC9bXjAtOWEtZl0vZ2ksICcnKTtcbiAgaWYgKGhleC5sZW5ndGggPCA2KSB7XG4gICAgaGV4ID0gaGV4WzBdICsgaGV4WzBdICsgaGV4WzFdICsgaGV4WzFdICsgaGV4WzJdICsgaGV4WzJdO1xuICB9XG4gIGx1bSA9IGx1bSB8fCAwO1xuXG4gIC8vIENvbnZlcnQgdG8gZGVjaW1hbCBhbmQgY2hhbmdlIGx1bWlub3NpdHlcbiAgdmFyIHJnYiA9ICcjJztcbiAgdmFyIGM7XG4gIHZhciBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICBjID0gcGFyc2VJbnQoaGV4LnN1YnN0cihpICogMiwgMiksIDE2KTtcbiAgICBjID0gTWF0aC5yb3VuZChNYXRoLm1pbihNYXRoLm1heCgwLCBjICsgYyAqIGx1bSksIDI1NSkpLnRvU3RyaW5nKDE2KTtcbiAgICByZ2IgKz0gKCcwMCcgKyBjKS5zdWJzdHIoYy5sZW5ndGgpO1xuICB9XG5cbiAgcmV0dXJuIHJnYjtcbn07XG5cbmV4cG9ydHMuZXh0ZW5kID0gZXh0ZW5kO1xuZXhwb3J0cy5oZXhUb1JnYiA9IGhleFRvUmdiO1xuZXhwb3J0cy5pc0lFOCA9IGlzSUU4O1xuZXhwb3J0cy5sb2dTdHIgPSBsb2dTdHI7XG5leHBvcnRzLmNvbG9yTHVtaW5hbmNlID0gY29sb3JMdW1pbmFuY2U7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuLy8gU3dlZXRBbGVydFxuLy8gMjAxNC0yMDE1IChjKSAtIFRyaXN0YW4gRWR3YXJkc1xuLy8gZ2l0aHViLmNvbS90NHQ1L3N3ZWV0YWxlcnRcblxuLypcbiAqIGpRdWVyeS1saWtlIGZ1bmN0aW9ucyBmb3IgbWFuaXB1bGF0aW5nIHRoZSBET01cbiAqL1xuXG52YXIgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlJGlzRGVzY2VuZGFudCRnZXRUb3BNYXJnaW4kZmFkZUluJGZhZGVPdXQkZmlyZUNsaWNrJHN0b3BFdmVudFByb3BhZ2F0aW9uID0gcmVxdWlyZSgnLi9tb2R1bGVzL2hhbmRsZS1kb20nKTtcblxuLypcbiAqIEhhbmR5IHV0aWxpdGllc1xuICovXG5cbnZhciBfZXh0ZW5kJGhleFRvUmdiJGlzSUU4JGxvZ1N0ciRjb2xvckx1bWluYW5jZSA9IHJlcXVpcmUoJy4vbW9kdWxlcy91dGlscycpO1xuXG4vKlxuICogIEhhbmRsZSBzd2VldEFsZXJ0J3MgRE9NIGVsZW1lbnRzXG4gKi9cblxudmFyIF9zd2VldEFsZXJ0SW5pdGlhbGl6ZSRnZXRNb2RhbCRnZXRPdmVybGF5JGdldElucHV0JHNldEZvY3VzU3R5bGUkb3Blbk1vZGFsJHJlc2V0SW5wdXQkZml4VmVydGljYWxQb3NpdGlvbiA9IHJlcXVpcmUoJy4vbW9kdWxlcy9oYW5kbGUtc3dhbC1kb20nKTtcblxuLy8gSGFuZGxlIGJ1dHRvbiBldmVudHMgYW5kIGtleWJvYXJkIGV2ZW50c1xuXG52YXIgX2hhbmRsZUJ1dHRvbiRoYW5kbGVDb25maXJtJGhhbmRsZUNhbmNlbCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9oYW5kbGUtY2xpY2snKTtcblxudmFyIF9oYW5kbGVLZXlEb3duID0gcmVxdWlyZSgnLi9tb2R1bGVzL2hhbmRsZS1rZXknKTtcblxudmFyIF9oYW5kbGVLZXlEb3duMiA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9oYW5kbGVLZXlEb3duKTtcblxuLy8gRGVmYXVsdCB2YWx1ZXNcblxudmFyIF9kZWZhdWx0UGFyYW1zID0gcmVxdWlyZSgnLi9tb2R1bGVzL2RlZmF1bHQtcGFyYW1zJyk7XG5cbnZhciBfZGVmYXVsdFBhcmFtczIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfZGVmYXVsdFBhcmFtcyk7XG5cbnZhciBfc2V0UGFyYW1ldGVycyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9zZXQtcGFyYW1zJyk7XG5cbnZhciBfc2V0UGFyYW1ldGVyczIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfc2V0UGFyYW1ldGVycyk7XG5cbi8qXG4gKiBSZW1lbWJlciBzdGF0ZSBpbiBjYXNlcyB3aGVyZSBvcGVuaW5nIGFuZCBoYW5kbGluZyBhIG1vZGFsIHdpbGwgZmlkZGxlIHdpdGggaXQuXG4gKiAoV2UgYWxzbyB1c2Ugd2luZG93LnByZXZpb3VzQWN0aXZlRWxlbWVudCBhcyBhIGdsb2JhbCB2YXJpYWJsZSlcbiAqL1xudmFyIHByZXZpb3VzV2luZG93S2V5RG93bjtcbnZhciBsYXN0Rm9jdXNlZEJ1dHRvbjtcblxuLypcbiAqIEdsb2JhbCBzd2VldEFsZXJ0IGZ1bmN0aW9uXG4gKiAodGhpcyBpcyB3aGF0IHRoZSB1c2VyIGNhbGxzKVxuICovXG52YXIgc3dlZXRBbGVydCwgc3dhbDtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gc3dlZXRBbGVydCA9IHN3YWwgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBjdXN0b21pemF0aW9ucyA9IGFyZ3VtZW50c1swXTtcblxuICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUkaXNEZXNjZW5kYW50JGdldFRvcE1hcmdpbiRmYWRlSW4kZmFkZU91dCRmaXJlQ2xpY2skc3RvcEV2ZW50UHJvcGFnYXRpb24uYWRkQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3N0b3Atc2Nyb2xsaW5nJyk7XG4gIF9zd2VldEFsZXJ0SW5pdGlhbGl6ZSRnZXRNb2RhbCRnZXRPdmVybGF5JGdldElucHV0JHNldEZvY3VzU3R5bGUkb3Blbk1vZGFsJHJlc2V0SW5wdXQkZml4VmVydGljYWxQb3NpdGlvbi5yZXNldElucHV0KCk7XG5cbiAgLypcbiAgICogVXNlIGFyZ3VtZW50IGlmIGRlZmluZWQgb3IgZGVmYXVsdCB2YWx1ZSBmcm9tIHBhcmFtcyBvYmplY3Qgb3RoZXJ3aXNlLlxuICAgKiBTdXBwb3J0cyB0aGUgY2FzZSB3aGVyZSBhIGRlZmF1bHQgdmFsdWUgaXMgYm9vbGVhbiB0cnVlIGFuZCBzaG91bGQgYmVcbiAgICogb3ZlcnJpZGRlbiBieSBhIGNvcnJlc3BvbmRpbmcgZXhwbGljaXQgYXJndW1lbnQgd2hpY2ggaXMgYm9vbGVhbiBmYWxzZS5cbiAgICovXG4gIGZ1bmN0aW9uIGFyZ3VtZW50T3JEZWZhdWx0KGtleSkge1xuICAgIHZhciBhcmdzID0gY3VzdG9taXphdGlvbnM7XG4gICAgcmV0dXJuIGFyZ3Nba2V5XSA9PT0gdW5kZWZpbmVkID8gX2RlZmF1bHRQYXJhbXMyWydkZWZhdWx0J11ba2V5XSA6IGFyZ3Nba2V5XTtcbiAgfVxuXG4gIGlmIChjdXN0b21pemF0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgX2V4dGVuZCRoZXhUb1JnYiRpc0lFOCRsb2dTdHIkY29sb3JMdW1pbmFuY2UubG9nU3RyKCdTd2VldEFsZXJ0IGV4cGVjdHMgYXQgbGVhc3QgMSBhdHRyaWJ1dGUhJyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHBhcmFtcyA9IF9leHRlbmQkaGV4VG9SZ2IkaXNJRTgkbG9nU3RyJGNvbG9yTHVtaW5hbmNlLmV4dGVuZCh7fSwgX2RlZmF1bHRQYXJhbXMyWydkZWZhdWx0J10pO1xuXG4gIHN3aXRjaCAodHlwZW9mIGN1c3RvbWl6YXRpb25zKSB7XG5cbiAgICAvLyBFeDogc3dhbChcIkhlbGxvXCIsIFwiSnVzdCB0ZXN0aW5nXCIsIFwiaW5mb1wiKTtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcGFyYW1zLnRpdGxlID0gY3VzdG9taXphdGlvbnM7XG4gICAgICBwYXJhbXMudGV4dCA9IGFyZ3VtZW50c1sxXSB8fCAnJztcbiAgICAgIHBhcmFtcy50eXBlID0gYXJndW1lbnRzWzJdIHx8ICcnO1xuICAgICAgYnJlYWs7XG5cbiAgICAvLyBFeDogc3dhbCh7IHRpdGxlOlwiSGVsbG9cIiwgdGV4dDogXCJKdXN0IHRlc3RpbmdcIiwgdHlwZTogXCJpbmZvXCIgfSk7XG4gICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgIGlmIChjdXN0b21pemF0aW9ucy50aXRsZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIF9leHRlbmQkaGV4VG9SZ2IkaXNJRTgkbG9nU3RyJGNvbG9yTHVtaW5hbmNlLmxvZ1N0cignTWlzc2luZyBcInRpdGxlXCIgYXJndW1lbnQhJyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcGFyYW1zLnRpdGxlID0gY3VzdG9taXphdGlvbnMudGl0bGU7XG5cbiAgICAgIGZvciAodmFyIGN1c3RvbU5hbWUgaW4gX2RlZmF1bHRQYXJhbXMyWydkZWZhdWx0J10pIHtcbiAgICAgICAgcGFyYW1zW2N1c3RvbU5hbWVdID0gYXJndW1lbnRPckRlZmF1bHQoY3VzdG9tTmFtZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNob3cgXCJDb25maXJtXCIgaW5zdGVhZCBvZiBcIk9LXCIgaWYgY2FuY2VsIGJ1dHRvbiBpcyB2aXNpYmxlXG4gICAgICBwYXJhbXMuY29uZmlybUJ1dHRvblRleHQgPSBwYXJhbXMuc2hvd0NhbmNlbEJ1dHRvbiA/ICdDb25maXJtJyA6IF9kZWZhdWx0UGFyYW1zMlsnZGVmYXVsdCddLmNvbmZpcm1CdXR0b25UZXh0O1xuICAgICAgcGFyYW1zLmNvbmZpcm1CdXR0b25UZXh0ID0gYXJndW1lbnRPckRlZmF1bHQoJ2NvbmZpcm1CdXR0b25UZXh0Jyk7XG5cbiAgICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gY2xpY2tpbmcgb24gXCJPS1wiL1wiQ2FuY2VsXCJcbiAgICAgIHBhcmFtcy5kb25lRnVuY3Rpb24gPSBhcmd1bWVudHNbMV0gfHwgbnVsbDtcblxuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgX2V4dGVuZCRoZXhUb1JnYiRpc0lFOCRsb2dTdHIkY29sb3JMdW1pbmFuY2UubG9nU3RyKCdVbmV4cGVjdGVkIHR5cGUgb2YgYXJndW1lbnQhIEV4cGVjdGVkIFwic3RyaW5nXCIgb3IgXCJvYmplY3RcIiwgZ290ICcgKyB0eXBlb2YgY3VzdG9taXphdGlvbnMpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gIH1cblxuICBfc2V0UGFyYW1ldGVyczJbJ2RlZmF1bHQnXShwYXJhbXMpO1xuICBfc3dlZXRBbGVydEluaXRpYWxpemUkZ2V0TW9kYWwkZ2V0T3ZlcmxheSRnZXRJbnB1dCRzZXRGb2N1c1N0eWxlJG9wZW5Nb2RhbCRyZXNldElucHV0JGZpeFZlcnRpY2FsUG9zaXRpb24uZml4VmVydGljYWxQb3NpdGlvbigpO1xuICBfc3dlZXRBbGVydEluaXRpYWxpemUkZ2V0TW9kYWwkZ2V0T3ZlcmxheSRnZXRJbnB1dCRzZXRGb2N1c1N0eWxlJG9wZW5Nb2RhbCRyZXNldElucHV0JGZpeFZlcnRpY2FsUG9zaXRpb24ub3Blbk1vZGFsKGFyZ3VtZW50c1sxXSk7XG5cbiAgLy8gTW9kYWwgaW50ZXJhY3Rpb25zXG4gIHZhciBtb2RhbCA9IF9zd2VldEFsZXJ0SW5pdGlhbGl6ZSRnZXRNb2RhbCRnZXRPdmVybGF5JGdldElucHV0JHNldEZvY3VzU3R5bGUkb3Blbk1vZGFsJHJlc2V0SW5wdXQkZml4VmVydGljYWxQb3NpdGlvbi5nZXRNb2RhbCgpO1xuXG4gIC8qXG4gICAqIE1ha2Ugc3VyZSBhbGwgbW9kYWwgYnV0dG9ucyByZXNwb25kIHRvIGFsbCBldmVudHNcbiAgICovXG4gIHZhciAkYnV0dG9ucyA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuICB2YXIgYnV0dG9uRXZlbnRzID0gWydvbmNsaWNrJywgJ29ubW91c2VvdmVyJywgJ29ubW91c2VvdXQnLCAnb25tb3VzZWRvd24nLCAnb25tb3VzZXVwJywgJ29uZm9jdXMnXTtcbiAgdmFyIG9uQnV0dG9uRXZlbnQgPSBmdW5jdGlvbiBvbkJ1dHRvbkV2ZW50KGUpIHtcbiAgICByZXR1cm4gX2hhbmRsZUJ1dHRvbiRoYW5kbGVDb25maXJtJGhhbmRsZUNhbmNlbC5oYW5kbGVCdXR0b24oZSwgcGFyYW1zLCBtb2RhbCk7XG4gIH07XG5cbiAgZm9yICh2YXIgYnRuSW5kZXggPSAwOyBidG5JbmRleCA8ICRidXR0b25zLmxlbmd0aDsgYnRuSW5kZXgrKykge1xuICAgIGZvciAodmFyIGV2dEluZGV4ID0gMDsgZXZ0SW5kZXggPCBidXR0b25FdmVudHMubGVuZ3RoOyBldnRJbmRleCsrKSB7XG4gICAgICB2YXIgYnRuRXZ0ID0gYnV0dG9uRXZlbnRzW2V2dEluZGV4XTtcbiAgICAgICRidXR0b25zW2J0bkluZGV4XVtidG5FdnRdID0gb25CdXR0b25FdmVudDtcbiAgICB9XG4gIH1cblxuICAvLyBDbGlja2luZyBvdXRzaWRlIHRoZSBtb2RhbCBkaXNtaXNzZXMgaXQgKGlmIGFsbG93ZWQgYnkgdXNlcilcbiAgX3N3ZWV0QWxlcnRJbml0aWFsaXplJGdldE1vZGFsJGdldE92ZXJsYXkkZ2V0SW5wdXQkc2V0Rm9jdXNTdHlsZSRvcGVuTW9kYWwkcmVzZXRJbnB1dCRmaXhWZXJ0aWNhbFBvc2l0aW9uLmdldE92ZXJsYXkoKS5vbmNsaWNrID0gb25CdXR0b25FdmVudDtcblxuICBwcmV2aW91c1dpbmRvd0tleURvd24gPSB3aW5kb3cub25rZXlkb3duO1xuXG4gIHZhciBvbktleUV2ZW50ID0gZnVuY3Rpb24gb25LZXlFdmVudChlKSB7XG4gICAgcmV0dXJuIF9oYW5kbGVLZXlEb3duMlsnZGVmYXVsdCddKGUsIHBhcmFtcywgbW9kYWwpO1xuICB9O1xuICB3aW5kb3cub25rZXlkb3duID0gb25LZXlFdmVudDtcblxuICB3aW5kb3cub25mb2N1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBXaGVuIHRoZSB1c2VyIGhhcyBmb2N1c2VkIGF3YXkgYW5kIGZvY3VzZWQgYmFjayBmcm9tIHRoZSB3aG9sZSB3aW5kb3cuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBQdXQgaW4gYSB0aW1lb3V0IHRvIGp1bXAgb3V0IG9mIHRoZSBldmVudCBzZXF1ZW5jZS5cbiAgICAgIC8vIENhbGxpbmcgZm9jdXMoKSBpbiB0aGUgZXZlbnQgc2VxdWVuY2UgY29uZnVzZXMgdGhpbmdzLlxuICAgICAgaWYgKGxhc3RGb2N1c2VkQnV0dG9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbGFzdEZvY3VzZWRCdXR0b24uZm9jdXMoKTtcbiAgICAgICAgbGFzdEZvY3VzZWRCdXR0b24gPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSwgMCk7XG4gIH07XG5cbiAgLy8gU2hvdyBhbGVydCB3aXRoIGVuYWJsZWQgYnV0dG9ucyBhbHdheXNcbiAgc3dhbC5lbmFibGVCdXR0b25zKCk7XG59O1xuXG4vKlxuICogU2V0IGRlZmF1bHQgcGFyYW1zIGZvciBlYWNoIHBvcHVwXG4gKiBAcGFyYW0ge09iamVjdH0gdXNlclBhcmFtc1xuICovXG5zd2VldEFsZXJ0LnNldERlZmF1bHRzID0gc3dhbC5zZXREZWZhdWx0cyA9IGZ1bmN0aW9uICh1c2VyUGFyYW1zKSB7XG4gIGlmICghdXNlclBhcmFtcykge1xuICAgIHRocm93IG5ldyBFcnJvcigndXNlclBhcmFtcyBpcyByZXF1aXJlZCcpO1xuICB9XG4gIGlmICh0eXBlb2YgdXNlclBhcmFtcyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZXJQYXJhbXMgaGFzIHRvIGJlIGEgb2JqZWN0Jyk7XG4gIH1cblxuICBfZXh0ZW5kJGhleFRvUmdiJGlzSUU4JGxvZ1N0ciRjb2xvckx1bWluYW5jZS5leHRlbmQoX2RlZmF1bHRQYXJhbXMyWydkZWZhdWx0J10sIHVzZXJQYXJhbXMpO1xufTtcblxuLypcbiAqIEFuaW1hdGlvbiB3aGVuIGNsb3NpbmcgbW9kYWxcbiAqL1xuc3dlZXRBbGVydC5jbG9zZSA9IHN3YWwuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBtb2RhbCA9IF9zd2VldEFsZXJ0SW5pdGlhbGl6ZSRnZXRNb2RhbCRnZXRPdmVybGF5JGdldElucHV0JHNldEZvY3VzU3R5bGUkb3Blbk1vZGFsJHJlc2V0SW5wdXQkZml4VmVydGljYWxQb3NpdGlvbi5nZXRNb2RhbCgpO1xuXG4gIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZSRpc0Rlc2NlbmRhbnQkZ2V0VG9wTWFyZ2luJGZhZGVJbiRmYWRlT3V0JGZpcmVDbGljayRzdG9wRXZlbnRQcm9wYWdhdGlvbi5mYWRlT3V0KF9zd2VldEFsZXJ0SW5pdGlhbGl6ZSRnZXRNb2RhbCRnZXRPdmVybGF5JGdldElucHV0JHNldEZvY3VzU3R5bGUkb3Blbk1vZGFsJHJlc2V0SW5wdXQkZml4VmVydGljYWxQb3NpdGlvbi5nZXRPdmVybGF5KCksIDUpO1xuICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUkaXNEZXNjZW5kYW50JGdldFRvcE1hcmdpbiRmYWRlSW4kZmFkZU91dCRmaXJlQ2xpY2skc3RvcEV2ZW50UHJvcGFnYXRpb24uZmFkZU91dChtb2RhbCwgNSk7XG4gIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZSRpc0Rlc2NlbmRhbnQkZ2V0VG9wTWFyZ2luJGZhZGVJbiRmYWRlT3V0JGZpcmVDbGljayRzdG9wRXZlbnRQcm9wYWdhdGlvbi5yZW1vdmVDbGFzcyhtb2RhbCwgJ3Nob3dTd2VldEFsZXJ0Jyk7XG4gIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZSRpc0Rlc2NlbmRhbnQkZ2V0VG9wTWFyZ2luJGZhZGVJbiRmYWRlT3V0JGZpcmVDbGljayRzdG9wRXZlbnRQcm9wYWdhdGlvbi5hZGRDbGFzcyhtb2RhbCwgJ2hpZGVTd2VldEFsZXJ0Jyk7XG4gIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZSRpc0Rlc2NlbmRhbnQkZ2V0VG9wTWFyZ2luJGZhZGVJbiRmYWRlT3V0JGZpcmVDbGljayRzdG9wRXZlbnRQcm9wYWdhdGlvbi5yZW1vdmVDbGFzcyhtb2RhbCwgJ3Zpc2libGUnKTtcblxuICAvKlxuICAgKiBSZXNldCBpY29uIGFuaW1hdGlvbnNcbiAgICovXG4gIHZhciAkc3VjY2Vzc0ljb24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2EtaWNvbi5zYS1zdWNjZXNzJyk7XG4gIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZSRpc0Rlc2NlbmRhbnQkZ2V0VG9wTWFyZ2luJGZhZGVJbiRmYWRlT3V0JGZpcmVDbGljayRzdG9wRXZlbnRQcm9wYWdhdGlvbi5yZW1vdmVDbGFzcygkc3VjY2Vzc0ljb24sICdhbmltYXRlJyk7XG4gIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZSRpc0Rlc2NlbmRhbnQkZ2V0VG9wTWFyZ2luJGZhZGVJbiRmYWRlT3V0JGZpcmVDbGljayRzdG9wRXZlbnRQcm9wYWdhdGlvbi5yZW1vdmVDbGFzcygkc3VjY2Vzc0ljb24ucXVlcnlTZWxlY3RvcignLnNhLXRpcCcpLCAnYW5pbWF0ZVN1Y2Nlc3NUaXAnKTtcbiAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlJGlzRGVzY2VuZGFudCRnZXRUb3BNYXJnaW4kZmFkZUluJGZhZGVPdXQkZmlyZUNsaWNrJHN0b3BFdmVudFByb3BhZ2F0aW9uLnJlbW92ZUNsYXNzKCRzdWNjZXNzSWNvbi5xdWVyeVNlbGVjdG9yKCcuc2EtbG9uZycpLCAnYW5pbWF0ZVN1Y2Nlc3NMb25nJyk7XG5cbiAgdmFyICRlcnJvckljb24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2EtaWNvbi5zYS1lcnJvcicpO1xuICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUkaXNEZXNjZW5kYW50JGdldFRvcE1hcmdpbiRmYWRlSW4kZmFkZU91dCRmaXJlQ2xpY2skc3RvcEV2ZW50UHJvcGFnYXRpb24ucmVtb3ZlQ2xhc3MoJGVycm9ySWNvbiwgJ2FuaW1hdGVFcnJvckljb24nKTtcbiAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlJGlzRGVzY2VuZGFudCRnZXRUb3BNYXJnaW4kZmFkZUluJGZhZGVPdXQkZmlyZUNsaWNrJHN0b3BFdmVudFByb3BhZ2F0aW9uLnJlbW92ZUNsYXNzKCRlcnJvckljb24ucXVlcnlTZWxlY3RvcignLnNhLXgtbWFyaycpLCAnYW5pbWF0ZVhNYXJrJyk7XG5cbiAgdmFyICR3YXJuaW5nSWNvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zYS1pY29uLnNhLXdhcm5pbmcnKTtcbiAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlJGlzRGVzY2VuZGFudCRnZXRUb3BNYXJnaW4kZmFkZUluJGZhZGVPdXQkZmlyZUNsaWNrJHN0b3BFdmVudFByb3BhZ2F0aW9uLnJlbW92ZUNsYXNzKCR3YXJuaW5nSWNvbiwgJ3B1bHNlV2FybmluZycpO1xuICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUkaXNEZXNjZW5kYW50JGdldFRvcE1hcmdpbiRmYWRlSW4kZmFkZU91dCRmaXJlQ2xpY2skc3RvcEV2ZW50UHJvcGFnYXRpb24ucmVtb3ZlQ2xhc3MoJHdhcm5pbmdJY29uLnF1ZXJ5U2VsZWN0b3IoJy5zYS1ib2R5JyksICdwdWxzZVdhcm5pbmdJbnMnKTtcbiAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlJGlzRGVzY2VuZGFudCRnZXRUb3BNYXJnaW4kZmFkZUluJGZhZGVPdXQkZmlyZUNsaWNrJHN0b3BFdmVudFByb3BhZ2F0aW9uLnJlbW92ZUNsYXNzKCR3YXJuaW5nSWNvbi5xdWVyeVNlbGVjdG9yKCcuc2EtZG90JyksICdwdWxzZVdhcm5pbmdJbnMnKTtcblxuICAvLyBSZXNldCBjdXN0b20gY2xhc3MgKGRlbGF5IHNvIHRoYXQgVUkgY2hhbmdlcyBhcmVuJ3QgdmlzaWJsZSlcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGN1c3RvbUNsYXNzID0gbW9kYWwuZ2V0QXR0cmlidXRlKCdkYXRhLWN1c3RvbS1jbGFzcycpO1xuICAgIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZSRpc0Rlc2NlbmRhbnQkZ2V0VG9wTWFyZ2luJGZhZGVJbiRmYWRlT3V0JGZpcmVDbGljayRzdG9wRXZlbnRQcm9wYWdhdGlvbi5yZW1vdmVDbGFzcyhtb2RhbCwgY3VzdG9tQ2xhc3MpO1xuICB9LCAzMDApO1xuXG4gIC8vIE1ha2UgcGFnZSBzY3JvbGxhYmxlIGFnYWluXG4gIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZSRpc0Rlc2NlbmRhbnQkZ2V0VG9wTWFyZ2luJGZhZGVJbiRmYWRlT3V0JGZpcmVDbGljayRzdG9wRXZlbnRQcm9wYWdhdGlvbi5yZW1vdmVDbGFzcyhkb2N1bWVudC5ib2R5LCAnc3RvcC1zY3JvbGxpbmcnKTtcblxuICAvLyBSZXNldCB0aGUgcGFnZSB0byBpdHMgcHJldmlvdXMgc3RhdGVcbiAgd2luZG93Lm9ua2V5ZG93biA9IHByZXZpb3VzV2luZG93S2V5RG93bjtcbiAgaWYgKHdpbmRvdy5wcmV2aW91c0FjdGl2ZUVsZW1lbnQpIHtcbiAgICB3aW5kb3cucHJldmlvdXNBY3RpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cbiAgbGFzdEZvY3VzZWRCdXR0b24gPSB1bmRlZmluZWQ7XG4gIGNsZWFyVGltZW91dChtb2RhbC50aW1lb3V0KTtcblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qXG4gKiBWYWxpZGF0aW9uIG9mIHRoZSBpbnB1dCBmaWVsZCBpcyBkb25lIGJ5IHVzZXJcbiAqIElmIHNvbWV0aGluZyBpcyB3cm9uZyA9PiBjYWxsIHNob3dJbnB1dEVycm9yIHdpdGggZXJyb3JNZXNzYWdlXG4gKi9cbnN3ZWV0QWxlcnQuc2hvd0lucHV0RXJyb3IgPSBzd2FsLnNob3dJbnB1dEVycm9yID0gZnVuY3Rpb24gKGVycm9yTWVzc2FnZSkge1xuICB2YXIgbW9kYWwgPSBfc3dlZXRBbGVydEluaXRpYWxpemUkZ2V0TW9kYWwkZ2V0T3ZlcmxheSRnZXRJbnB1dCRzZXRGb2N1c1N0eWxlJG9wZW5Nb2RhbCRyZXNldElucHV0JGZpeFZlcnRpY2FsUG9zaXRpb24uZ2V0TW9kYWwoKTtcblxuICB2YXIgJGVycm9ySWNvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zYS1pbnB1dC1lcnJvcicpO1xuICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUkaXNEZXNjZW5kYW50JGdldFRvcE1hcmdpbiRmYWRlSW4kZmFkZU91dCRmaXJlQ2xpY2skc3RvcEV2ZW50UHJvcGFnYXRpb24uYWRkQ2xhc3MoJGVycm9ySWNvbiwgJ3Nob3cnKTtcblxuICB2YXIgJGVycm9yQ29udGFpbmVyID0gbW9kYWwucXVlcnlTZWxlY3RvcignLnNhLWVycm9yLWNvbnRhaW5lcicpO1xuICBfaGFzQ2xhc3MkYWRkQ2xhc3MkcmVtb3ZlQ2xhc3MkZXNjYXBlSHRtbCRfc2hvdyRzaG93JF9oaWRlJGhpZGUkaXNEZXNjZW5kYW50JGdldFRvcE1hcmdpbiRmYWRlSW4kZmFkZU91dCRmaXJlQ2xpY2skc3RvcEV2ZW50UHJvcGFnYXRpb24uYWRkQ2xhc3MoJGVycm9yQ29udGFpbmVyLCAnc2hvdycpO1xuXG4gICRlcnJvckNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdwJykuaW5uZXJIVE1MID0gZXJyb3JNZXNzYWdlO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHN3ZWV0QWxlcnQuZW5hYmxlQnV0dG9ucygpO1xuICB9LCAxKTtcblxuICBtb2RhbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLmZvY3VzKCk7XG59O1xuXG4vKlxuICogUmVzZXQgaW5wdXQgZXJyb3IgRE9NIGVsZW1lbnRzXG4gKi9cbnN3ZWV0QWxlcnQucmVzZXRJbnB1dEVycm9yID0gc3dhbC5yZXNldElucHV0RXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgLy8gSWYgcHJlc3MgZW50ZXIgPT4gaWdub3JlXG4gIGlmIChldmVudCAmJiBldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciAkbW9kYWwgPSBfc3dlZXRBbGVydEluaXRpYWxpemUkZ2V0TW9kYWwkZ2V0T3ZlcmxheSRnZXRJbnB1dCRzZXRGb2N1c1N0eWxlJG9wZW5Nb2RhbCRyZXNldElucHV0JGZpeFZlcnRpY2FsUG9zaXRpb24uZ2V0TW9kYWwoKTtcblxuICB2YXIgJGVycm9ySWNvbiA9ICRtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2EtaW5wdXQtZXJyb3InKTtcbiAgX2hhc0NsYXNzJGFkZENsYXNzJHJlbW92ZUNsYXNzJGVzY2FwZUh0bWwkX3Nob3ckc2hvdyRfaGlkZSRoaWRlJGlzRGVzY2VuZGFudCRnZXRUb3BNYXJnaW4kZmFkZUluJGZhZGVPdXQkZmlyZUNsaWNrJHN0b3BFdmVudFByb3BhZ2F0aW9uLnJlbW92ZUNsYXNzKCRlcnJvckljb24sICdzaG93Jyk7XG5cbiAgdmFyICRlcnJvckNvbnRhaW5lciA9ICRtb2RhbC5xdWVyeVNlbGVjdG9yKCcuc2EtZXJyb3ItY29udGFpbmVyJyk7XG4gIF9oYXNDbGFzcyRhZGRDbGFzcyRyZW1vdmVDbGFzcyRlc2NhcGVIdG1sJF9zaG93JHNob3ckX2hpZGUkaGlkZSRpc0Rlc2NlbmRhbnQkZ2V0VG9wTWFyZ2luJGZhZGVJbiRmYWRlT3V0JGZpcmVDbGljayRzdG9wRXZlbnRQcm9wYWdhdGlvbi5yZW1vdmVDbGFzcygkZXJyb3JDb250YWluZXIsICdzaG93Jyk7XG59O1xuXG4vKlxuICogRGlzYWJsZSBjb25maXJtIGFuZCBjYW5jZWwgYnV0dG9uc1xuICovXG5zd2VldEFsZXJ0LmRpc2FibGVCdXR0b25zID0gc3dhbC5kaXNhYmxlQnV0dG9ucyA9IGZ1bmN0aW9uIChldmVudCkge1xuICB2YXIgbW9kYWwgPSBfc3dlZXRBbGVydEluaXRpYWxpemUkZ2V0TW9kYWwkZ2V0T3ZlcmxheSRnZXRJbnB1dCRzZXRGb2N1c1N0eWxlJG9wZW5Nb2RhbCRyZXNldElucHV0JGZpeFZlcnRpY2FsUG9zaXRpb24uZ2V0TW9kYWwoKTtcbiAgdmFyICRjb25maXJtQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignYnV0dG9uLmNvbmZpcm0nKTtcbiAgdmFyICRjYW5jZWxCdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCdidXR0b24uY2FuY2VsJyk7XG4gICRjb25maXJtQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgJGNhbmNlbEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG59O1xuXG4vKlxuICogRW5hYmxlIGNvbmZpcm0gYW5kIGNhbmNlbCBidXR0b25zXG4gKi9cbnN3ZWV0QWxlcnQuZW5hYmxlQnV0dG9ucyA9IHN3YWwuZW5hYmxlQnV0dG9ucyA9IGZ1bmN0aW9uIChldmVudCkge1xuICB2YXIgbW9kYWwgPSBfc3dlZXRBbGVydEluaXRpYWxpemUkZ2V0TW9kYWwkZ2V0T3ZlcmxheSRnZXRJbnB1dCRzZXRGb2N1c1N0eWxlJG9wZW5Nb2RhbCRyZXNldElucHV0JGZpeFZlcnRpY2FsUG9zaXRpb24uZ2V0TW9kYWwoKTtcbiAgdmFyICRjb25maXJtQnV0dG9uID0gbW9kYWwucXVlcnlTZWxlY3RvcignYnV0dG9uLmNvbmZpcm0nKTtcbiAgdmFyICRjYW5jZWxCdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCdidXR0b24uY2FuY2VsJyk7XG4gICRjb25maXJtQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICRjYW5jZWxCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbn07XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAvLyBUaGUgJ2hhbmRsZS1jbGljaycgbW9kdWxlIHJlcXVpcmVzXG4gIC8vIHRoYXQgJ3N3ZWV0QWxlcnQnIHdhcyBzZXQgYXMgZ2xvYmFsLlxuICB3aW5kb3cuc3dlZXRBbGVydCA9IHdpbmRvdy5zd2FsID0gc3dlZXRBbGVydDtcbn0gZWxzZSB7XG4gIF9leHRlbmQkaGV4VG9SZ2IkaXNJRTgkbG9nU3RyJGNvbG9yTHVtaW5hbmNlLmxvZ1N0cignU3dlZXRBbGVydCBpcyBhIGZyb250ZW5kIG1vZHVsZSEnKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyJdfQ==

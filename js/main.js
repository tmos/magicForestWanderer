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
        this.render();
    };
    Game.prototype.update = function () {
        if (this.wanderer.isDead()) {
            alert("You die.");
            this.wanderer.setScore(-(10 * this.getForest().getNumberOfCases()));
        }
        if (this.wanderer.isOut()) {
            // You just won this forest !
            this.wanderer.setScore(10 * this.getForest().getNumberOfCases());
            // Create the next level
            var newSize = this.getForest().getForest().length + 1;
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
    Game.prototype.setWanderer = function () {
        var forest = this.currentForest.getForest();
        if (!forest) {
            return undefined;
        }
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

},{"./Forest":2,"./Wanderer":4}],4:[function(require,module,exports){
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
        return this.forestMap[y][x] !== null;
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
        return this.forest.getFloorContent(this.y, this.x);
    };
    Wanderer.prototype.updateMap = function () {
        var content = this.forest.getFloorContent(this.y, this.x);
        this.forestMap[this.y][this.x] = content;
        var monsterClue = false;
        var trapClue = false;
        var numberAdjacentVisited = this.numberAdjacentVisited(this.y, this.x);
        var probability = 0;
        if (numberAdjacentVisited < 4) {
            probability = 1 / (4 - numberAdjacentVisited);
        }
        this.forestMap[this.y][this.x] = this.forest.getFloorContent(this.y, this.x);
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
        this.forestMap[this.y][this.x].setVisited(true);
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
        return content;
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

},{"./prologAST":8}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9zcmMvRmxvb3IudHMiLCJqcy9zcmMvRm9yZXN0LnRzIiwianMvc3JjL0dhbWUudHMiLCJqcy9zcmMvV2FuZGVyZXIudHMiLCJqcy9zcmMvY29uc3RhbnRzLnRzIiwianMvc3JjL21haW4udHMiLCJub2RlX21vZHVsZXMvanNwcm9sb2cvZGlzdC9qc3Byb2xvZy5qcyIsIm5vZGVfbW9kdWxlcy9qc3Byb2xvZy9kaXN0L3Byb2xvZ0FTVC5qcyIsIm5vZGVfbW9kdWxlcy9qc3Byb2xvZy9kaXN0L3Byb2xvZ1BhcnNlci5qcyIsIm5vZGVfbW9kdWxlcy9qc3Byb2xvZy9kaXN0L3Byb2xvZ1NvbHZlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQ0EseUNBQTZEO0FBRTdEOzs7O0dBSUc7QUFDSDtJQVdJLGVBQVksT0FBZTtRQUFmLHdCQUFBLEVBQUEsMkJBQWU7UUFWbkIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLFNBQUksR0FBWSxLQUFLLENBQUM7UUFDdEIsU0FBSSxHQUFZLEtBQUssQ0FBQztRQUN0QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0IsdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO1FBR3hCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxnQkFBSSxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxnQkFBSSxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO1FBQUMs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QyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLENBQUM7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakQsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN2QixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM5QyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLENBQUM7UUFFRCx1QkFBdUI7UUFDdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4RixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDMUUsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0RSxDQUFDO1FBQ0wsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMxRSxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDWixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RFLENBQUM7UUFDTCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMzRixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDMUUsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0RSxDQUFDO1FBQ0wsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMxRSxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDWixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RFLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRU0sd0JBQUssR0FBWjtRQUNJLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUvQyxrQ0FBa0M7UUFFbEMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sdUJBQUksR0FBWCxVQUFZLFNBQWlCO1FBQ3pCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQyxJQUFJLE1BQU0sQ0FBQztRQUVYLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDaEIsS0FBSyxNQUFNO2dCQUNQLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDMUIsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7Z0JBQUMsQ0FBQztnQkFDckMsS0FBSyxDQUFDO1lBQ1YsS0FBSyxPQUFPO2dCQUNSLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDMUIsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO2dCQUFDLENBQUM7Z0JBQ3RELEtBQUssQ0FBQztZQUNWLEtBQUssSUFBSTtnQkFDTCxNQUFNLEdBQUcsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzFCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO2dCQUFDLENBQUM7Z0JBQ3JDLEtBQUssQ0FBQztZQUNWLEtBQUssTUFBTTtnQkFDUCxNQUFNLEdBQUcsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzFCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztnQkFBQyxDQUFDO2dCQUN2RCxLQUFLLENBQUM7WUFDVjtnQkFDSSxLQUFLLENBQUM7UUFDZCxDQUFDO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRW5CLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLHdDQUFxQixHQUE1QixVQUE2QixDQUFTLEVBQUUsQ0FBUztRQUM3QyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFWixFQUFFLENBQUMsQ0FBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6RSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ2IsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2RCxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ2IsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzdFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDYixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDYixDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFTSwrQkFBWSxHQUFuQixVQUFvQixDQUFTLEVBQUUsQ0FBUztRQUNwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNoRCx1QkFBdUI7UUFDM0IsQ0FBQztJQUNMLENBQUM7SUFFTSx3QkFBSyxHQUFaO1FBQ0ksSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRXZELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssY0FBYyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxLQUFLLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO0lBQ0wsQ0FBQztJQUVNLHlCQUFNLEdBQWI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwRSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztJQUNMLENBQUM7SUFFTSwyQkFBUSxHQUFmLFVBQWdCLEdBQVc7UUFDdkIsSUFBSSxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUM7SUFDdEIsQ0FBQztJQUVNLDJCQUFRLEdBQWY7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBQ0wsZUFBQztBQUFELENBck9BLEFBcU9DLElBQUE7Ozs7OztBQzVPWSxRQUFBLElBQUksR0FBRyxNQUFNLENBQUM7QUFDZCxRQUFBLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDWCxRQUFBLElBQUksR0FBRyxNQUFNLENBQUM7QUFDZCxRQUFBLE9BQU8sR0FBRyxTQUFTLENBQUM7QUFDcEIsUUFBQSxJQUFJLEdBQUcsTUFBTSxDQUFDOzs7OztBQ0YzQiwrQkFBMEI7QUFFMUIsSUFBSSxDQUFDLEdBQUcsSUFBSSxjQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3hDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2IsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRVgsbUJBQW1CO0FBQ25CLFFBQVEsQ0FBQyxTQUFTLEdBQUcsVUFBQyxDQUFDO0lBQ25CLElBQUksdUJBQXVCLEdBQUcsS0FBSyxDQUFDO0lBQ3BDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLEtBQUssRUFBRTtZQUNILENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0IsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO1lBQy9CLEtBQUssQ0FBQztRQUNWLEtBQUssRUFBRTtZQUNILENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO1lBQy9CLEtBQUssQ0FBQztRQUNWLEtBQUssRUFBRTtZQUNILENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUIsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO1lBQy9CLEtBQUssQ0FBQztRQUNWLEtBQUssRUFBRTtZQUNILENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0IsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO1lBQy9CLEtBQUssQ0FBQztRQUNWO1lBQ0ksS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUVELEVBQUUsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDZixDQUFDO0FBQ0wsQ0FBQyxDQUFDOzs7QUNuQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCAqIGFzICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IHtlbXB0eSwgZ29hbCwgbW9uc3RlciwgdHJhcCwgdHJlZX0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbi8qKlxuICogWW91J2xsIHRlbGwgbWU6IFwiQSBmbG9vciBpcyBhIGZsb29yXCIsIGFuZCB5b3UnbGwgYmUgcmlnaHQuXG4gKiBUaGlzIGlzIG5vdCB0aGUgZmxvb3IgaXRzZWxmIHRoYXQgbWF0dGVycywgdGhpcyBpcyB3aGF0IGl0IGNvbnRhaW5zLlxuICogSXMgaXQgYW4gaG9ycmlibGUgbW9uc3RlciBvbiB0aGlzIGZsb29yPyBPciBhIGxldGhhbCB0cmFwPyBPciBhIGNsdWUgZm9yIHRoZSBuZXh0IGZsb29yPyBZb3UnbGwgc2VlLCB3YW5kZXJlci4uLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbG9vciB7XG4gICAgcHJpdmF0ZSB2aXNpdGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBhY2Nlc3NpYmxlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSB0cmFwOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBnb2FsOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBtb25zdGVyOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSB0cmFwQ2x1ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgbW9uc3RlckNsdWU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHByb2JhYmlsaXR5TW9uc3RlciA9IDA7XG4gICAgcHJpdmF0ZSBwcm9iYWJpbGl0eVRyYXAgPSAwO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCA9IGVtcHR5KSB7XG4gICAgICAgIGlmIChlbGVtZW50ID09PSB0cmFwKSB7XG4gICAgICAgICAgICB0aGlzLnRyYXAgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgPT09IGdvYWwpIHtcbiAgICAgICAgICAgIHRoaXMuZ29hbCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCA9PT0gbW9uc3Rlcikge1xuICAgICAgICAgICAgdGhpcy5tb25zdGVyID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRoZSBmbG9vciBpcyBlbXB0eSBvdGhlcndpc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBpc1RyYXAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYXA7XG4gICAgfVxuXG4gICAgcHVibGljIGlzR29hbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ29hbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNNb25zdGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc01vbnN0ZXJDbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyQ2x1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNUcmFwQ2x1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhcENsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIGlzRW1wdHkoKSB7XG4gICAgICAgIGlmICghdGhpcy50cmFwICYmXG4gICAgICAgICAgICAhdGhpcy5nb2FsICYmXG4gICAgICAgICAgICAhdGhpcy5tb25zdGVyICYmXG4gICAgICAgICAgICAhdGhpcy50cmFwQ2x1ZSAmJlxuICAgICAgICAgICAgIXRoaXMubW9uc3RlckNsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Q2x1ZShjbHVlVHlwZTogc3RyaW5nKSB7XG4gICAgICAgIGlmIChjbHVlVHlwZSA9PT0gdHJhcCkge1xuICAgICAgICAgICAgdGhpcy50cmFwQ2x1ZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoY2x1ZVR5cGUgPT09IG1vbnN0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMubW9uc3RlckNsdWUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGlzVmlzaXRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaXRlZDtcbiAgICB9XG4gICAgcHVibGljIHNldFZpc2l0ZWQoYiA9IHRydWUpIHtcbiAgICAgICAgdGhpcy52aXNpdGVkID0gYjtcbiAgICB9XG4gICAgcHVibGljIGlzQWNjZXNzaWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWNjZXNzaWJsZTtcbiAgICB9XG4gICAgcHVibGljIHNldEFjY2Vzc2libGUoYiA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5hY2Nlc3NpYmxlID0gYjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGF0IGlzIHRoZSBwcm9iYWJpbGl0eSB0aGlzIGZsb29yIGlzIGEgbW9uc3Rlcj9cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UHJvYmFiaWxpdHlNb25zdGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9iYWJpbGl0eU1vbnN0ZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBwcm9iYWJpbGl0eSB0aGlzIGZsb29yIGlzIGEgbW9uc3Rlci5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0UHJvYmFiaWxpdHlNb25zdGVyKHByb2JhYmlsaXR5ID0gMCkge1xuICAgICAgICB0aGlzLnByb2JhYmlsaXR5TW9uc3RlciA9IHByb2JhYmlsaXR5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBwcm9iYWJpbGl0eSB0aGlzIGZsb29yIGlzIGEgbW9uc3RlciBldm9sdmVkLlxuICAgICAqL1xuICAgIHB1YmxpYyBhZGRQcm9iYWJpbGl0eU1vbnN0ZXIocHJvYmFiaWxpdHkgPSAwKSB7XG4gICAgICAgIHRoaXMucHJvYmFiaWxpdHlNb25zdGVyICs9IHByb2JhYmlsaXR5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoYXQgaXMgdGhlIHByb2JhYmlsaXR5IHRoaXMgZmxvb3IgaXMgYSB0cmFwP1xuICAgICAqL1xuICAgIHB1YmxpYyBnZXRQcm9iYWJpbGl0eVRyYXAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2JhYmlsaXR5VHJhcDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHByb2JhYmlsaXR5IHRoaXMgZmxvb3IgaXMgYSB0cmFwLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRQcm9iYWJpbGl0eVRyYXAocHJvYmFiaWxpdHkgPSAwKSB7XG4gICAgICAgIHRoaXMucHJvYmFiaWxpdHlUcmFwID0gcHJvYmFiaWxpdHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHByb2JhYmlsaXR5IHRoaXMgZmxvb3IgaXMgYSB0cmFwIGV2b2x2ZWQuXG4gICAgICovXG4gICAgcHVibGljIGFkZFByb2JhYmlsaXR5VHJhcChwcm9iYWJpbGl0eSA9IDApIHtcbiAgICAgICAgdGhpcy5wcm9iYWJpbGl0eVRyYXAgKz0gcHJvYmFiaWxpdHk7XG4gICAgfVxuXG4gICAgcHVibGljIGtpbGxNb25zdGVyKCkge1xuICAgICAgICB0aGlzLm1vbnN0ZXIgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9IdG1sKGlzS25vd246IGJvb2xlYW4gPSB0cnVlLCBhZGRpdGlvbm5hbENsYXNzZXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIGxldCBjbGFzc2VzOiBzdHJpbmdbXSA9IFtcImZsb29yQ2FzZVwiXS5jb25jYXQoYWRkaXRpb25uYWxDbGFzc2VzKTtcblxuICAgICAgICBpZiAoaXNLbm93bikge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKFwidmlzaXRlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChcIndhckZvZ1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzVHJhcCgpKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJ0cmFwXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzR29hbCgpKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJnb2FsXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzTW9uc3RlcigpKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJtb25zdGVyXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzVHJhcENsdWUoKSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKFwidHJhcENsdWVcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNNb25zdGVyQ2x1ZSgpKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJtb25zdGVyQ2x1ZVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIiR7Y2xhc3Nlcy5qb2luKFwiIFwiKX1cIj48L2Rpdj5gO1xuICAgIH1cbn1cbiIsImltcG9ydCB7ZW1wdHksIGdvYWwsIG1vbnN0ZXIsIHRyYXAsIHRyZWV9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IEZsb29yIGZyb20gXCIuL0Zsb29yXCI7XG5cbi8qKlxuICogQSBnbG9vbXkgZGFyayBmb3Jlc3QuIFRoZXJlIGFyZSBsb3RzIG9mIG1vbnN0ZXJzIGFuZCB0cmFwcyBoZXJlLiBCZSBjYXJlZnVsLCB3YW5kZXJlci4uLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3Jlc3Qge1xuICAgIHByaXZhdGUgZm9yZXN0OiBGbG9vcltdW10gPSBbXTtcbiAgICBwcml2YXRlIHdpZHRoOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgaGVpZ2h0OiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IodyA9IDMsIGggPSAzKSB7XG4gICAgICAgIHRoaXMud2lkdGggPSB3O1xuICAgICAgICB0aGlzLmhlaWdodCA9IGg7XG4gICAgfVxuXG4gICAgcHVibGljIHBvcHVsYXRlKG1heENoYW5jZXMgPSAyMCkge1xuICAgICAgICAvLyBTZXQgdGhlIG1vbnN0ZXJzIGFuZCB0cmFwc1xuICAgICAgICBsZXQgdG1wOiBGbG9vcltdW10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICB0bXBbeV0gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy53aWR0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG1wUmFuZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXhDaGFuY2VzIC0gMCkgKyAwKTtcblxuICAgICAgICAgICAgICAgIGlmICh0bXBSYW5kID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEl0J3MgYSBtb25zdGVyIVxuICAgICAgICAgICAgICAgICAgICB0bXBbeV1beF0gPSBuZXcgRmxvb3IobW9uc3Rlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0bXBSYW5kID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEl0J3MgYSB0cmFwIVxuICAgICAgICAgICAgICAgICAgICB0bXBbeV1beF0gPSBuZXcgRmxvb3IodHJhcCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdG1wW3ldW3hdID0gbmV3IEZsb29yKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb3Jlc3QgPSB0bXA7XG5cbiAgICAgICAgLy8gU2V0IHRoZSB3YXkgb3V0XG4gICAgICAgIGxldCBpc0FXYXlPdXQgPSBmYWxzZTtcbiAgICAgICAgbGV0IG91dFk7XG4gICAgICAgIGxldCBvdXRYO1xuICAgICAgICB3aGlsZSAoIWlzQVdheU91dCkge1xuICAgICAgICAgICAgb3V0WSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0aGlzLmZvcmVzdC5sZW5ndGggLSAwKSArIDApO1xuICAgICAgICAgICAgb3V0WCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0aGlzLmZvcmVzdFswXS5sZW5ndGggLSAwKSArIDApO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5mb3Jlc3Rbb3V0WV1bb3V0WF0uaXNFbXB0eSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9yZXN0W291dFldW291dFhdID0gbmV3IEZsb29yKGdvYWwpO1xuICAgICAgICAgICAgICAgIGlzQVdheU91dCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy53aWR0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGwgPSB0aGlzLmZvcmVzdFt5XVt4XTtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbC5pc01vbnN0ZXIoKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJdCdzIGEgbW9uc3RlciFcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDbHVlcyh5LCB4LCBtb25zdGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNlbGwuaXNUcmFwKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSXQncyBhIHRyYXAhXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q2x1ZXMoeSwgeCwgdHJhcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEZsb29yQ29udGVudCh5OiBudW1iZXIsIHg6IG51bWJlcik6IEZsb29yIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZXN0W3ldW3hdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRGb3Jlc3QoKTogRmxvb3JbXVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZXN0O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRXYXlPdXRQb3NpdGlvbigpIHtcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcmVzdFt5XVt4XS5pc0dvYWwoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge3gsIHl9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXROdW1iZXJPZkNhc2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3Jlc3QubGVuZ3RoICogdGhpcy5mb3Jlc3RbMF0ubGVuZ3RoO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0Q2x1ZXMoeTogbnVtYmVyLCB4OiBudW1iZXIsIGNvbnRlbnQ6IHN0cmluZykge1xuICAgICAgICBpZiAoeSAtIDEgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RbeSAtIDFdW3hdLnNldENsdWUoY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHkgKyAxIDwgdGhpcy5oZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0W3kgKyAxXVt4XS5zZXRDbHVlKGNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh4IC0gMSA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdFt5XVt4IC0gMV0uc2V0Q2x1ZShjb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeCArIDEgPCB0aGlzLndpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdFt5XVt4ICsgMV0uc2V0Q2x1ZShjb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IEZvcmVzdCBmcm9tIFwiLi9Gb3Jlc3RcIjtcbmltcG9ydCBXYW5kZXJlciBmcm9tIFwiLi9XYW5kZXJlclwiO1xuXG4vKipcbiAqIEl0J3MgYSBnYW1lIGZvciBldmVyeW9uZSwgZXhjZXB0IGZvciB0aGUgd2FuZGVyZXIuIFBvb3Igd2FuZGVyZXIuLi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG4gICAgcHJpdmF0ZSBjdXJyZW50Rm9yZXN0OiBGb3Jlc3Q7XG4gICAgcHJpdmF0ZSB3YW5kZXJlcjogV2FuZGVyZXI7XG4gICAgcHJpdmF0ZSBnYW1lRGl2OiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIHNjb3JlRGl2OiBIVE1MRWxlbWVudDtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihnYW1lRGl2OiBzdHJpbmcsIHNjb3JlRGl2OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5nYW1lRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZ2FtZURpdik7XG4gICAgICAgIHRoaXMuc2NvcmVEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzY29yZURpdik7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXQodyA9IDMsIGggPSAzKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlRm9yZXN0KHcsIGgpO1xuICAgICAgICB0aGlzLmdldEZvcmVzdCgpLnBvcHVsYXRlKCk7XG4gICAgICAgIHRoaXMuc2V0V2FuZGVyZXIoKTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy53YW5kZXJlci5pc0RlYWQoKSkge1xuICAgICAgICAgICAgYWxlcnQoXCJZb3UgZGllLlwiKTtcbiAgICAgICAgICAgIHRoaXMud2FuZGVyZXIuc2V0U2NvcmUoLSgxMCAqIHRoaXMuZ2V0Rm9yZXN0KCkuZ2V0TnVtYmVyT2ZDYXNlcygpKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMud2FuZGVyZXIuaXNPdXQoKSkge1xuICAgICAgICAgICAgLy8gWW91IGp1c3Qgd29uIHRoaXMgZm9yZXN0ICFcbiAgICAgICAgICAgIHRoaXMud2FuZGVyZXIuc2V0U2NvcmUoMTAgKiB0aGlzLmdldEZvcmVzdCgpLmdldE51bWJlck9mQ2FzZXMoKSk7XG4gICAgICAgICAgICAvLyBDcmVhdGUgdGhlIG5leHQgbGV2ZWxcbiAgICAgICAgICAgIGNvbnN0IG5ld1NpemUgPSB0aGlzLmdldEZvcmVzdCgpLmdldEZvcmVzdCgpLmxlbmd0aCArIDE7XG4gICAgICAgICAgICB0aGlzLmluaXQobmV3U2l6ZSwgbmV3U2l6ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0V2FuZGVyZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndhbmRlcmVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlRm9yZXN0KHcgPSAzLCBoID0gMyk6IEdhbWUge1xuICAgICAgICB0aGlzLmN1cnJlbnRGb3Jlc3QgPSBuZXcgRm9yZXN0KHcsIGgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEZvcmVzdCgpOiBGb3Jlc3Qge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50Rm9yZXN0O1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0V2FuZGVyZXIoKTogR2FtZSB7XG4gICAgICAgIGNvbnN0IGZvcmVzdCA9IHRoaXMuY3VycmVudEZvcmVzdC5nZXRGb3Jlc3QoKTtcblxuICAgICAgICBpZiAoIWZvcmVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaXNPayA9IGZhbHNlO1xuICAgICAgICBsZXQgeTtcbiAgICAgICAgbGV0IHg7XG4gICAgICAgIHdoaWxlICghaXNPaykge1xuICAgICAgICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChmb3Jlc3QubGVuZ3RoIC0gMCkgKyAwKTtcbiAgICAgICAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoZm9yZXN0WzBdLmxlbmd0aCAtIDApICsgMCk7XG5cbiAgICAgICAgICAgIGlmIChmb3Jlc3RbeV1beF0uaXNFbXB0eSkge1xuICAgICAgICAgICAgICAgIGlzT2sgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBvbGRTY29yZSA9IDA7XG4gICAgICAgIGlmICh0aGlzLndhbmRlcmVyKSB7XG4gICAgICAgICAgICBvbGRTY29yZSA9IHRoaXMud2FuZGVyZXIuZ2V0U2NvcmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndhbmRlcmVyID0gbmV3IFdhbmRlcmVyKHksIHgsIHRoaXMuY3VycmVudEZvcmVzdCwgb2xkU2NvcmUpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBmb3Jlc3QgPSB0aGlzLmdldEZvcmVzdCgpLmdldEZvcmVzdCgpO1xuICAgICAgICBjb25zdCB3YW5kZXJlciA9IHRoaXMud2FuZGVyZXI7XG5cbiAgICAgICAgbGV0IGh0bWw6IHN0cmluZyA9IFwiXCI7XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmN1cnJlbnRGb3Jlc3QuZ2V0Rm9yZXN0KCkubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgICAgIGh0bWwgKz0gXCI8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlwiO1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmN1cnJlbnRGb3Jlc3QuZ2V0Rm9yZXN0KClbMF0ubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICAgICAgICBsZXQgd2FuZGVyZXJQb3MgPSB3YW5kZXJlci5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIGxldCBmbG9vciA9IHRoaXMuY3VycmVudEZvcmVzdC5nZXRGb3Jlc3QoKVt5XVt4XTtcbiAgICAgICAgICAgICAgICBsZXQgYWRkaXRpb25uYWxDbGFzc2VzID0gW107XG5cbiAgICAgICAgICAgICAgICBpZiAod2FuZGVyZXJQb3MueCA9PT0geCAmJiB3YW5kZXJlclBvcy55ID09PSB5KSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9ubmFsQ2xhc3Nlcy5wdXNoKFwid2FuZGVyZXJcIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaHRtbCArPSBmbG9vci50b0h0bWwodGhpcy53YW5kZXJlci5pc0tub3duKHksIHgpLCBhZGRpdGlvbm5hbENsYXNzZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaHRtbCArPSBcIjwvZGl2PlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nYW1lRGl2LmNsYXNzTmFtZSA9IFwiXCI7XG4gICAgICAgIHRoaXMuZ2FtZURpdi5jbGFzc0xpc3QuYWRkKGB3aWR0aCR7Zm9yZXN0Lmxlbmd0aH1gKTtcbiAgICAgICAgdGhpcy5nYW1lRGl2LmlubmVySFRNTCA9IGh0bWw7XG5cbiAgICAgICAgdGhpcy5zY29yZURpdi5pbm5lckhUTUwgPSB3YW5kZXJlci5nZXRTY29yZSgpLnRvU3RyaW5nKCk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgXCJqc3Byb2xvZ1wiO1xuaW1wb3J0IEZsb29yIGZyb20gXCIuL0Zsb29yXCI7XG5pbXBvcnQgRm9yZXN0IGZyb20gXCIuL0ZvcmVzdFwiO1xuXG4vKipcbiAqIFRoZSB3YW5kZXJlciwgdGhlIGhlcm8gb2YgdGhpcyBxdWVzdC4gR29vZCBsdWNrIHNvbi4uLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYW5kZXJlciB7XG4gICAgcHJpdmF0ZSBmb3Jlc3Q6IEZvcmVzdDtcbiAgICBwcml2YXRlIGZvcmVzdE1hcFdpZHRoOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBmb3Jlc3RNYXBIZWlnaHQ6IG51bWJlcjtcbiAgICBwcml2YXRlIGZvcmVzdE1hcDogRmxvb3JbXVtdID0gW107XG4gICAgcHJpdmF0ZSB5OiBudW1iZXI7XG4gICAgcHJpdmF0ZSB4OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBzY29yZTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IocGxheWVyWTogbnVtYmVyLCBwbGF5ZXJYOiBudW1iZXIsIGRhcmtXb29kczogRm9yZXN0LCBzY29yZTogbnVtYmVyID0gMCkge1xuICAgICAgICB0aGlzLmZvcmVzdCA9IGRhcmtXb29kcztcbiAgICAgICAgdGhpcy5zY29yZSA9IHNjb3JlO1xuICAgICAgICB0aGlzLnggPSBwbGF5ZXJYO1xuICAgICAgICB0aGlzLnkgPSBwbGF5ZXJZO1xuXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IGRhcmtXb29kcy5nZXRGb3Jlc3QoKS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gZGFya1dvb2RzLmdldEZvcmVzdCgpWzBdLmxlbmd0aDtcblxuICAgICAgICB0aGlzLmZvcmVzdE1hcEhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5mb3Jlc3RNYXBXaWR0aCA9IHdpZHRoO1xuXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3ldID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHdpZHRoOyB4KyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt5XVt4XSA9IG5ldyBGbG9vcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE1hcEhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZXN0TWFwLmxlbmd0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TWFwV2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcmVzdE1hcFswXS5sZW5ndGg7XG4gICAgfVxuXG4gICAgcHVibGljIGlzS25vd24oeTogbnVtYmVyLCB4OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZXN0TWFwW3ldW3hdICE9PSBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRGb3Jlc3QoZm9yZXN0OiBGb3Jlc3QpIHtcbiAgICAgICAgdGhpcy5mb3Jlc3QgPSBmb3Jlc3Q7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFBvc2l0aW9uKHk6IG51bWJlciwgeDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFBvc2l0aW9uKCkge1xuICAgICAgICByZXR1cm4ge3g6IHRoaXMueCwgeTogdGhpcy55fTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9IdG1sKCkge1xuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJmbG9vckNhc2Ugd2FuZGVyZXJcIj48L2Rpdj5gO1xuICAgIH1cblxuICAgIHB1YmxpYyB3YXRjaFRoZUZsb29yKCk6IEZsb29yIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZXN0LmdldEZsb29yQ29udGVudCh0aGlzLnksIHRoaXMueCk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZU1hcCgpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuZm9yZXN0LmdldEZsb29yQ29udGVudCh0aGlzLnksIHRoaXMueCk7XG4gICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54XSA9IGNvbnRlbnQ7XG5cbiAgICAgICAgbGV0IG1vbnN0ZXJDbHVlID0gZmFsc2U7XG4gICAgICAgIGxldCB0cmFwQ2x1ZSA9IGZhbHNlO1xuICAgICAgICBsZXQgbnVtYmVyQWRqYWNlbnRWaXNpdGVkID0gdGhpcy5udW1iZXJBZGphY2VudFZpc2l0ZWQodGhpcy55LCB0aGlzLngpO1xuICAgICAgICBsZXQgcHJvYmFiaWxpdHkgPSAwO1xuICAgICAgICBpZiAobnVtYmVyQWRqYWNlbnRWaXNpdGVkIDwgNCkge1xuICAgICAgICAgICAgcHJvYmFiaWxpdHkgPSAxIC8gKCA0IC0gbnVtYmVyQWRqYWNlbnRWaXNpdGVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54XSA9IHRoaXMuZm9yZXN0LmdldEZsb29yQ29udGVudCh0aGlzLnksIHRoaXMueCk7XG5cbiAgICAgICAgaWYgKHRoaXMueSArIDEgPCB0aGlzLmZvcmVzdE1hcC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueSArIDFdW3RoaXMueF0gPSB0aGlzLmZvcmVzdC5nZXRGbG9vckNvbnRlbnQodGhpcy55ICsgMSwgdGhpcy54KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy55IC0gMSA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnkgLSAxXVt0aGlzLnhdID0gdGhpcy5mb3Jlc3QuZ2V0Rmxvb3JDb250ZW50KHRoaXMueSAtIDEsIHRoaXMueCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMueCArIDEgPCB0aGlzLmZvcmVzdE1hcFswXS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54ICsgMV0gPSB0aGlzLmZvcmVzdC5nZXRGbG9vckNvbnRlbnQodGhpcy55LCB0aGlzLnggKyAxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy54IC0gMSA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueCAtIDFdID0gdGhpcy5mb3Jlc3QuZ2V0Rmxvb3JDb250ZW50KHRoaXMueSwgdGhpcy54IC0gMSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueF0uc2V0VmlzaXRlZCh0cnVlKTtcblxuICAgICAgICBpZiAodGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnhdLmlzTW9uc3RlckNsdWUoKSkge1xuICAgICAgICAgICAgbW9uc3RlckNsdWUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueF0uaXNUcmFwQ2x1ZSgpKSB7XG4gICAgICAgICAgICB0cmFwQ2x1ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGaW5kIGFkamFjZW50IGZsb29yc1xuICAgICAgICBpZiAodGhpcy55ICsgMSA8IHRoaXMuZm9yZXN0TWFwLmxlbmd0aCAmJiAhdGhpcy5mb3Jlc3RNYXBbdGhpcy55ICsgMV1bdGhpcy54XS5pc1Zpc2l0ZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55ICsgMV1bdGhpcy54XS5zZXRBY2Nlc3NpYmxlKHRydWUpO1xuICAgICAgICAgICAgaWYgKG1vbnN0ZXJDbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55ICsgMV1bdGhpcy54XS5hZGRQcm9iYWJpbGl0eU1vbnN0ZXIocHJvYmFiaWxpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRyYXBDbHVlKSB7XG4gICAgICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnkgKyAxXVt0aGlzLnhdLmFkZFByb2JhYmlsaXR5VHJhcChwcm9iYWJpbGl0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMueSAtIDEgPj0gMCAmJiAhdGhpcy5mb3Jlc3RNYXBbdGhpcy55IC0gMV1bdGhpcy54XS5pc1Zpc2l0ZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55IC0gMV1bdGhpcy54XS5zZXRBY2Nlc3NpYmxlKHRydWUpO1xuICAgICAgICAgICAgaWYgKG1vbnN0ZXJDbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55IC0gMV1bdGhpcy54XS5hZGRQcm9iYWJpbGl0eU1vbnN0ZXIocHJvYmFiaWxpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRyYXBDbHVlKSB7XG4gICAgICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnkgLSAxXVt0aGlzLnhdLmFkZFByb2JhYmlsaXR5VHJhcChwcm9iYWJpbGl0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMueCArIDEgPCB0aGlzLmZvcmVzdE1hcFswXS5sZW5ndGggJiYgIXRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54ICsgMV0uaXNWaXNpdGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54ICsgMV0uc2V0QWNjZXNzaWJsZSh0cnVlKTtcbiAgICAgICAgICAgIGlmIChtb25zdGVyQ2x1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54ICsgMV0uYWRkUHJvYmFiaWxpdHlNb25zdGVyKHByb2JhYmlsaXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0cmFwQ2x1ZSkge1xuICAgICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggKyAxXS5hZGRQcm9iYWJpbGl0eVRyYXAocHJvYmFiaWxpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnggLSAxID49IDAgJiYgIXRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54IC0gMV0uaXNWaXNpdGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54IC0gMV0uc2V0QWNjZXNzaWJsZSh0cnVlKTtcbiAgICAgICAgICAgIGlmIChtb25zdGVyQ2x1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54IC0gMV0uYWRkUHJvYmFiaWxpdHlNb25zdGVyKHByb2JhYmlsaXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0cmFwQ2x1ZSkge1xuICAgICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggLSAxXS5hZGRQcm9iYWJpbGl0eVRyYXAocHJvYmFiaWxpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIHRoaW5rKCkge1xuICAgICAgICBsZXQgdGhpc0Zsb29yID0gdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnhdO1xuXG4gICAgICAgIC8vIEhlcmUgZ29lcyBhbGwgdGhlIGxvZ2ljYWwgc3R1ZmZcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgbW92ZShkaXJlY3Rpb246IHN0cmluZykge1xuICAgICAgICBsZXQgY3VycmVudFBvcyA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgbGV0IG5ld1ZhbDtcblxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgICAgICAgICBuZXdWYWwgPSBjdXJyZW50UG9zLnggLSAxO1xuICAgICAgICAgICAgICAgIGlmIChuZXdWYWwgPj0gMCkgeyB0aGlzLnggPSBuZXdWYWw7IH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IGN1cnJlbnRQb3MueCArIDE7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbCA8IHRoaXMuZm9yZXN0TWFwV2lkdGgpIHsgdGhpcy54ID0gbmV3VmFsOyB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidXBcIjpcbiAgICAgICAgICAgICAgICBuZXdWYWwgPSBjdXJyZW50UG9zLnkgLSAxO1xuICAgICAgICAgICAgICAgIGlmIChuZXdWYWwgPj0gMCkgeyB0aGlzLnkgPSBuZXdWYWw7IH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJkb3duXCI6XG4gICAgICAgICAgICAgICAgbmV3VmFsID0gY3VycmVudFBvcy55ICsgMTtcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsIDwgdGhpcy5mb3Jlc3RNYXBIZWlnaHQpIHsgdGhpcy55ID0gbmV3VmFsOyB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTY29yZSgtMTApO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBudW1iZXJBZGphY2VudFZpc2l0ZWQoeTogbnVtYmVyLCB4OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IG51bSA9IDA7XG5cbiAgICAgICAgaWYgKCB5ICsgMSA8IHRoaXMuZm9yZXN0TWFwLmxlbmd0aCAmJiB0aGlzLmZvcmVzdE1hcFt5ICsgMV1beF0uaXNWaXNpdGVkKCkpIHtcbiAgICAgICAgICAgIG51bSArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmICggeSAtIDEgPj0gMCAgJiYgdGhpcy5mb3Jlc3RNYXBbeSAtIDFdW3hdLmlzVmlzaXRlZCgpKSB7XG4gICAgICAgICAgICBudW0gKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIHggKyAxIDwgdGhpcy5mb3Jlc3RNYXBbMF0ubGVuZ3RoICAmJiB0aGlzLmZvcmVzdE1hcFt5XVt4ICsgMV0uaXNWaXNpdGVkKCkpIHtcbiAgICAgICAgICAgIG51bSArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmICggeCAtIDEgPj0gMCAgJiYgdGhpcy5mb3Jlc3RNYXBbeV1beCAtIDFdLmlzVmlzaXRlZCgpKSB7XG4gICAgICAgICAgICBudW0gKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVtO1xuICAgIH1cblxuICAgIHB1YmxpYyB1c2VTbGluZ3Nob3QoeTogbnVtYmVyLCB4OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuZm9yZXN0LmdldEZsb29yQ29udGVudCh5LCB4KS5pc01vbnN0ZXIoKSkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3QuZ2V0Rmxvb3JDb250ZW50KHksIHgpLmtpbGxNb25zdGVyKCk7XG4gICAgICAgICAgICAvLyBAdG9kbyBDYWxsIGFuaW1hdGlvblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGlzT3V0KCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCB3YXlPdXRQb3NpdGlvbiA9IHRoaXMuZm9yZXN0LmdldFdheU91dFBvc2l0aW9uKCk7XG5cbiAgICAgICAgaWYgKHRoaXMueCA9PT0gd2F5T3V0UG9zaXRpb24ueCAmJiB0aGlzLnkgPT09IHdheU91dFBvc2l0aW9uLnkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGlzRGVhZCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMud2F0Y2hUaGVGbG9vcigpLmlzVHJhcCgpIHx8IHRoaXMud2F0Y2hUaGVGbG9vcigpLmlzTW9uc3RlcigpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTY29yZSh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNjb3JlICs9IHZhbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2NvcmUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcmU7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IHRyYXAgPSBcInRyYXBcIjtcbmV4cG9ydCBjb25zdCBlbXB0eSA9IFwiXCI7XG5leHBvcnQgY29uc3QgZ29hbCA9IFwiZ29hbFwiO1xuZXhwb3J0IGNvbnN0IG1vbnN0ZXIgPSBcIm1vbnN0ZXJcIjtcbmV4cG9ydCBjb25zdCB0cmVlID0gXCJ0cmVlXCI7XG4iLCJpbXBvcnQgKiBhcyAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCAqIGFzIGpzYm9hcmQgZnJvbSBcIi4vRm9yZXN0XCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9HYW1lXCI7XG5cbmxldCBnID0gbmV3IEdhbWUoXCJnYW1lRGl2XCIsIFwic2NvcmVEaXZcIik7XG5nLmluaXQoMywgMyk7XG5nLnVwZGF0ZSgpO1xuXG4vLyBJbml0IG1hbnVhbCBnYW1lXG5kb2N1bWVudC5vbmtleWRvd24gPSAoZSkgPT4ge1xuICAgIGxldCBhcnJvd0tleUhhdmVCZWVuUHJlc3NlZCA9IGZhbHNlO1xuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgICBnLmdldFdhbmRlcmVyKCkubW92ZShcImxlZnRcIik7XG4gICAgICAgICAgICBhcnJvd0tleUhhdmVCZWVuUHJlc3NlZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgIGcuZ2V0V2FuZGVyZXIoKS5tb3ZlKFwidXBcIik7XG4gICAgICAgICAgICBhcnJvd0tleUhhdmVCZWVuUHJlc3NlZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgIGcuZ2V0V2FuZGVyZXIoKS5tb3ZlKFwicmlnaHRcIik7XG4gICAgICAgICAgICBhcnJvd0tleUhhdmVCZWVuUHJlc3NlZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgIGcuZ2V0V2FuZGVyZXIoKS5tb3ZlKFwiZG93blwiKTtcbiAgICAgICAgICAgIGFycm93S2V5SGF2ZUJlZW5QcmVzc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGFycm93S2V5SGF2ZUJlZW5QcmVzc2VkKSB7XG4gICAgICAgIGcudXBkYXRlKCk7XG4gICAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgQVNUID0gcmVxdWlyZSgnLi9wcm9sb2dBU1QnKTtcclxudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4vcHJvbG9nUGFyc2VyJyk7XHJcbnZhciBTb2x2ZXIgPSByZXF1aXJlKCcuL3Byb2xvZ1NvbHZlcicpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IHsgQVNUOiBBU1QsIFBhcnNlcjogUGFyc2VyLCBTb2x2ZXI6IFNvbHZlciB9O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufTtcclxuKGZ1bmN0aW9uIChQYXJ0VHlwZSkge1xyXG4gICAgUGFydFR5cGVbUGFydFR5cGVbXCJWYXJpYWJsZVwiXSA9IDBdID0gXCJWYXJpYWJsZVwiO1xyXG4gICAgUGFydFR5cGVbUGFydFR5cGVbXCJBdG9tXCJdID0gMV0gPSBcIkF0b21cIjtcclxuICAgIFBhcnRUeXBlW1BhcnRUeXBlW1wiVGVybVwiXSA9IDJdID0gXCJUZXJtXCI7XHJcbn0pKGV4cG9ydHMuUGFydFR5cGUgfHwgKGV4cG9ydHMuUGFydFR5cGUgPSB7fSkpO1xyXG52YXIgUGFydFR5cGUgPSBleHBvcnRzLlBhcnRUeXBlO1xyXG52YXIgUGFydCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIEBjbGFzcyBQYXJ0XHJcbiAgICAgKiBAY2xhc3NkZXNjIFBhcnQgOj0gVmFyaWFibGUobmFtZSkgfCBBdG9tKG5hbWUpIHwgVGVybShuYW1lLCBwYXJ0bGlzdClcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIE5hbWUgb2YgdGhlIHZhcmlhYmxlL2F0b20vdGVybVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBQYXJ0KG5hbWUpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgfVxyXG4gICAgUGFydC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUGFydDtcclxufSgpKTtcclxuZXhwb3J0cy5QYXJ0ID0gUGFydDtcclxudmFyIFZhcmlhYmxlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhWYXJpYWJsZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFZhcmlhYmxlKG5hbWUpIHtcclxuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCBuYW1lKTtcclxuICAgIH1cclxuICAgIHJldHVybiBWYXJpYWJsZTtcclxufShQYXJ0KSk7XHJcbmV4cG9ydHMuVmFyaWFibGUgPSBWYXJpYWJsZTtcclxuVmFyaWFibGUucHJvdG90eXBlLnR5cGUgPSBQYXJ0VHlwZS5WYXJpYWJsZTsgLy8gVE9ETzogIHZlcmlmeSBpZiBpdCdzIGZhc3RlciB0aGFuIGluc3RhbmNlb2YgY2hlY2tzXHJcbnZhciBBdG9tID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhBdG9tLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gQXRvbShoZWFkKSB7XHJcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgaGVhZCk7XHJcbiAgICB9XHJcbiAgICBBdG9tLk5pbCA9IG5ldyBBdG9tKG51bGwpO1xyXG4gICAgcmV0dXJuIEF0b207XHJcbn0oUGFydCkpO1xyXG5leHBvcnRzLkF0b20gPSBBdG9tO1xyXG5BdG9tLnByb3RvdHlwZS50eXBlID0gUGFydFR5cGUuQXRvbTsgLy8gVE9ETzogIHZlcmlmeSBpZiBpdCdzIGZhc3RlciB0aGFuIGluc3RhbmNlb2YgY2hlY2tzXHJcbi8qKlxyXG4gKiBUZXJtKG5hbWUsIGxpc3QpXHJcbiAqL1xyXG52YXIgVGVybSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoVGVybSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFRlcm0oaGVhZCwgbGlzdCkge1xyXG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIGhlYWQpO1xyXG4gICAgICAgIHRoaXMucGFydGxpc3QgPSBuZXcgUGFydGxpc3QobGlzdCk7XHJcbiAgICB9XHJcbiAgICBUZXJtLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gXCJcIjtcclxuICAgICAgICBpZiAodGhpcy5uYW1lID09IFwiY29uc1wiKSB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gdGhpcztcclxuICAgICAgICAgICAgd2hpbGUgKHggaW5zdGFuY2VvZiBUZXJtICYmIHgubmFtZSA9PSBcImNvbnNcIiAmJiB4LnBhcnRsaXN0Lmxpc3QubGVuZ3RoID09IDIpIHtcclxuICAgICAgICAgICAgICAgIHggPSB4LnBhcnRsaXN0Lmxpc3RbMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCh4ID09PSBBdG9tLk5pbCkgfHwgeCBpbnN0YW5jZW9mIFZhcmlhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICB4ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIltcIjtcclxuICAgICAgICAgICAgICAgIHZhciBjb20gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHdoaWxlICh4LnR5cGUgPT0gUGFydFR5cGUuVGVybSAmJiB4Lm5hbWUgPT0gXCJjb25zXCIgJiYgeC5wYXJ0bGlzdC5saXN0Lmxlbmd0aCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCIsIFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0geC5wYXJ0bGlzdC5saXN0WzBdLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB4ID0geC5wYXJ0bGlzdC5saXN0WzFdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHgudHlwZSA9PSBQYXJ0VHlwZS5WYXJpYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIiB8IFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiXVwiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIkVSUk9SOiB1bmV4cGVjdGVkIGF0b206IFwiICsgeC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc3VsdCArPSB0aGlzLm5hbWUgKyBcIihcIiArIHRoaXMucGFydGxpc3QudG9TdHJpbmcoKSArIFwiKVwiO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG4gICAgO1xyXG4gICAgcmV0dXJuIFRlcm07XHJcbn0oUGFydCkpO1xyXG5leHBvcnRzLlRlcm0gPSBUZXJtO1xyXG5UZXJtLnByb3RvdHlwZS50eXBlID0gUGFydFR5cGUuVGVybTsgLy8gVE9ETzogIHZlcmlmeSBpZiBpdCdzIGZhc3RlciB0aGFuIGluc3RhbmNlb2YgY2hlY2tzXHJcbnZhciBQYXJ0bGlzdCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBQYXJ0bGlzdChsaXN0KSB7XHJcbiAgICAgICAgdGhpcy5saXN0ID0gbGlzdDtcclxuICAgIH1cclxuICAgIFBhcnRsaXN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0Lm1hcChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS50b1N0cmluZygpOyB9KS5qb2luKFwiLCBcIik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFBhcnRsaXN0O1xyXG59KCkpO1xyXG5leHBvcnRzLlBhcnRsaXN0ID0gUGFydGxpc3Q7XHJcbi8qKlxyXG4gKiBSdWxlKGhlYWQsIGJvZHlsaXN0KTogUGFydChoZWFkKSwgWzotIEJvZHkoYm9keWxpc3QpXS5cclxuICovXHJcbnZhciBSdWxlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFJ1bGUoaGVhZCwgYm9keWxpc3QpIHtcclxuICAgICAgICB0aGlzLmhlYWQgPSBoZWFkO1xyXG4gICAgICAgIHRoaXMuYm9keSA9IGJvZHlsaXN0ICYmIG5ldyBQYXJ0bGlzdChib2R5bGlzdCk7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUnVsZS5wcm90b3R5cGUsIFwiaXNGYWN0XCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICF0aGlzLmJvZHk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBSdWxlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZWFkLnRvU3RyaW5nKCkgKyAodGhpcy5ib2R5ID8gXCIgOi0gXCIgKyB0aGlzLmJvZHkudG9TdHJpbmcoKSArIFwiLlwiIDogXCIuXCIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBSdWxlO1xyXG59KCkpO1xyXG5leHBvcnRzLlJ1bGUgPSBSdWxlO1xyXG5mdW5jdGlvbiBsaXN0T2ZBcnJheShhcnJheSwgY2RyKSB7XHJcbiAgICBjZHIgPSBjZHIgfHwgQXRvbS5OaWw7XHJcbiAgICBmb3IgKHZhciBpID0gYXJyYXkubGVuZ3RoLCBjYXI7IGNhciA9IGFycmF5Wy0taV07KSB7XHJcbiAgICAgICAgY2RyID0gbmV3IFRlcm0oXCJjb25zXCIsIFtjYXIsIGNkcl0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNkcjtcclxufVxyXG5leHBvcnRzLmxpc3RPZkFycmF5ID0gbGlzdE9mQXJyYXk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgcHJvbG9nQVNUXzEgPSByZXF1aXJlKCcuL3Byb2xvZ0FTVCcpO1xyXG4vKipcclxuICogUGFyc2VzIHRoZSBEQlxyXG4gKi9cclxuZnVuY3Rpb24gcGFyc2Uoc3RyaW5nKSB7XHJcbiAgICB2YXIgdGsgPSBuZXcgVG9rZW5pc2VyKHN0cmluZyksIHJ1bGVzID0gW107XHJcbiAgICB3aGlsZSAodGsuY3VycmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgcnVsZXMucHVzaChwYXJzZVJ1bGUodGspKTtcclxuICAgIH1cclxuICAgIHJldHVybiBydWxlcztcclxufVxyXG5leHBvcnRzLnBhcnNlID0gcGFyc2U7XHJcbmZ1bmN0aW9uIHBhcnNlUXVlcnkoc3RyaW5nKSB7XHJcbiAgICB2YXIgdGsgPSBuZXcgVG9rZW5pc2VyKHN0cmluZyk7XHJcbiAgICByZXR1cm4gbmV3IHByb2xvZ0FTVF8xLlBhcnRsaXN0KHBhcnNlQm9keSh0aykpO1xyXG59XHJcbmV4cG9ydHMucGFyc2VRdWVyeSA9IHBhcnNlUXVlcnk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0geyBwYXJzZTogcGFyc2UsIHBhcnNlUXVlcnk6IHBhcnNlUXVlcnkgfTtcclxudmFyIHRva2VuaXplclJ1bGVzID0gW1xyXG4gICAgWy9eKFtcXChcXClcXC4sXFxbXFxdXFx8XXxcXDpcXC0pLywgMCAvKiBQdW5jICovXSxcclxuICAgIFsvXihbQS1aX11bYS16QS1aMC05X10qKS8sIDEgLyogVmFyICovXSxcclxuICAgIFsvXihcIlteXCJdKlwiKS8sIDIgLyogSWQgKi9dLFxyXG4gICAgWy9eKFthLXpdW2EtekEtWjAtOV9dKikvLCAyIC8qIElkICovXSxcclxuICAgIFsvXigtP1xcZCsoXFwuXFxkKyk/KS8sIDIgLyogSWQgKi8sIGZ1bmN0aW9uICh4KSB7IHJldHVybiAreDsgfV0sXHJcbiAgICBbL14oXFwrfFxcLXxcXCp8XFwvfFxcPXxcXCEpLywgMiAvKiBJZCAqL11cclxuXTtcclxudmFyIFRva2VuaXNlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBUb2tlbmlzZXIoc291cmNlKSB7XHJcbiAgICAgICAgdGhpcy5yZW1haW5kZXIgPSBzb3VyY2U7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnR5cGUgPSBudWxsOyAvLyBcImVvZlwiLCBUb2tlblR5cGUuSWQsIFRva2VuVHlwZS5WYXIsIFRva2VuVHlwZS5QdW5jIGV0Yy4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY29uc3VtZSgpOyAvLyBMb2FkIHVwIHRoZSBmaXJzdCB0b2tlbi5cclxuICAgIH1cclxuICAgIFRva2VuaXNlci5wcm90b3R5cGUuY29uc3VtZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy50eXBlID09IDMgLyogRU9GICovKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gRWF0IGFueSBsZWFkaW5nIFdTIGFuZCAlLXN0eWxlIGNvbW1lbnRzXHJcbiAgICAgICAgdmFyIHIgPSB0aGlzLnJlbWFpbmRlci5tYXRjaCgvXihcXHMrfChbJV0uKilbXFxuXFxyXSspKi8pO1xyXG4gICAgICAgIGlmIChyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtYWluZGVyID0gdGhpcy5yZW1haW5kZXIuc3Vic3RyaW5nKHJbMF0ubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLnJlbWFpbmRlci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy50eXBlID0gMyAvKiBFT0YgKi87XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHJ1bGU7IHJ1bGUgPSB0b2tlbml6ZXJSdWxlc1tpKytdOykge1xyXG4gICAgICAgICAgICBpZiAociA9IHRoaXMucmVtYWluZGVyLm1hdGNoKHJ1bGVbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbWFpbmRlciA9IHRoaXMucmVtYWluZGVyLnN1YnN0cmluZyhyWzBdLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPSBydWxlWzFdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gdHlwZW9mIChydWxlWzJdKSA9PT0gXCJmdW5jdGlvblwiID8gcnVsZVsyXShyWzFdKSA6IHJbMV07XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgXCJVbmV4cGVjdGVkIHRva2VuaXplciBpbnB1dFwiO1xyXG4gICAgfTtcclxuICAgIFRva2VuaXNlci5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24gKHR5cGUsIHN5bWJvbCkge1xyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IHR5cGUgJiYgKHR5cGVvZiAoc3ltYm9sKSA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0aGlzLmN1cnJlbnQgPT09IHN5bWJvbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5hY2NlcHRlZCA9IHRoaXMuY3VycmVudDtcclxuICAgICAgICAgICAgdGhpcy5jb25zdW1lKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgVG9rZW5pc2VyLnByb3RvdHlwZS5leHBlY3QgPSBmdW5jdGlvbiAodHlwZSwgc3ltYm9sKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmFjY2VwdCh0eXBlLCBzeW1ib2wpKSB7XHJcbiAgICAgICAgICAgIHRocm93IHRoaXMudHlwZSA9PT0gMyAvKiBFT0YgKi8gPyBcIlN5bnRheCBlcnJvcjogdW5leHBlY3RlZCBlbmQgb2YgZmlsZVwiIDogXCJTeW50YXggZXJyb3I6IHVuZXhwZWN0ZWQgdG9rZW4gXCIgKyB0aGlzLmN1cnJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlOyAvLyBUT0RPOiBubyBuZWVkIGZvciBib29sZWFuP1xyXG4gICAgfTtcclxuICAgIHJldHVybiBUb2tlbmlzZXI7XHJcbn0oKSk7XHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuZnVuY3Rpb24gcGFyc2VSdWxlKHRrKSB7XHJcbiAgICAvLyBSdWxlIDo9IFRlcm0gLiB8IFRlcm0gOi0gUGFydExpc3QgLlxyXG4gICAgdmFyIGggPSBwYXJzZVRlcm0odGspO1xyXG4gICAgaWYgKHRrLmFjY2VwdCgwIC8qIFB1bmMgKi8sIFwiLlwiKSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgcHJvbG9nQVNUXzEuUnVsZShoKTtcclxuICAgIH1cclxuICAgIHRrLmV4cGVjdCgwIC8qIFB1bmMgKi8sIFwiOi1cIik7XHJcbiAgICB2YXIgYiA9IHBhcnNlQm9keSh0ayk7XHJcbiAgICByZXR1cm4gbmV3IHByb2xvZ0FTVF8xLlJ1bGUoaCwgYik7XHJcbn1cclxuZnVuY3Rpb24gcGFyc2VUZXJtKHRrKSB7XHJcbiAgICB0ay5leHBlY3QoMiAvKiBJZCAqLyk7XHJcbiAgICB2YXIgbmFtZSA9IHRrLmFjY2VwdGVkO1xyXG4gICAgLy8gYWNjZXB0IGZhaWwgYW5kICEgdy9vICgpXHJcbiAgICBpZiAodGsuY3VycmVudCAhPSBcIihcIiAmJiAobmFtZSA9PSBcImZhaWxcIiB8fCBuYW1lID09PSBcIiFcIikpIHtcclxuICAgICAgICByZXR1cm4gbmV3IHByb2xvZ0FTVF8xLlRlcm0obmFtZSwgW10pO1xyXG4gICAgfVxyXG4gICAgdGsuZXhwZWN0KDAgLyogUHVuYyAqLywgXCIoXCIpO1xyXG4gICAgdmFyIHAgPSBbXTtcclxuICAgIHdoaWxlICh0ay5jdXJyZW50ICE9PSBcImVvZlwiKSB7XHJcbiAgICAgICAgcC5wdXNoKHBhcnNlUGFydCh0aykpO1xyXG4gICAgICAgIGlmICh0ay5hY2NlcHQoMCAvKiBQdW5jICovLCBcIilcIikpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRrLmV4cGVjdCgwIC8qIFB1bmMgKi8sIFwiLFwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgcHJvbG9nQVNUXzEuVGVybShuYW1lLCBwKTtcclxufVxyXG5mdW5jdGlvbiBwYXJzZVBhcnQodGspIHtcclxuICAgIC8vIFBhcnQgLT4gdmFyIHwgaWQgfCBpZChvcHRQYXJhbUxpc3QpXHJcbiAgICAvLyBQYXJ0IC0+IFsgbGlzdEJpdCBdIDo6LT4gY29ucyguLi4pXHJcbiAgICBpZiAodGsuYWNjZXB0KDEgLyogVmFyICovKSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgcHJvbG9nQVNUXzEuVmFyaWFibGUodGsuYWNjZXB0ZWQpO1xyXG4gICAgfVxyXG4gICAgLy8gUGFyc2UgYSBsaXN0IChzeW50YWN0aWMgc3VnYXIgZ29lcyBoZXJlKVxyXG4gICAgaWYgKHRrLmFjY2VwdCgwIC8qIFB1bmMgKi8sIFwiW1wiKSkge1xyXG4gICAgICAgIHJldHVybiBwYXJzZUxpc3QodGspO1xyXG4gICAgfVxyXG4gICAgdGsuZXhwZWN0KDIgLyogSWQgKi8pO1xyXG4gICAgdmFyIG5hbWUgPSB0ay5hY2NlcHRlZDtcclxuICAgIGlmICghdGsuYWNjZXB0KDAgLyogUHVuYyAqLywgXCIoXCIpKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBwcm9sb2dBU1RfMS5BdG9tKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgdmFyIHAgPSBbXTtcclxuICAgIHdoaWxlICh0ay50eXBlICE9PSAzIC8qIEVPRiAqLykge1xyXG4gICAgICAgIHAucHVzaChwYXJzZVBhcnQodGspKTtcclxuICAgICAgICBpZiAodGsuYWNjZXB0KDAgLyogUHVuYyAqLywgXCIpXCIpKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0ay5leHBlY3QoMCAvKiBQdW5jICovLCBcIixcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IHByb2xvZ0FTVF8xLlRlcm0obmFtZSwgcCk7XHJcbn1cclxuZnVuY3Rpb24gcGFyc2VMaXN0KHRrKSB7XHJcbiAgICAvLyBlbXB0eSBsaXN0XHJcbiAgICBpZiAodGsuYWNjZXB0KDAgLyogUHVuYyAqLywgXCJdXCIpKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb2xvZ0FTVF8xLkF0b20uTmlsO1xyXG4gICAgfVxyXG4gICAgLy8gR2V0IGEgbGlzdCBvZiBwYXJ0cyBpbnRvIGxcclxuICAgIHZhciBsID0gW107XHJcbiAgICB3aGlsZSAodGsuY3VycmVudCAhPT0gXCJlb2ZcIikge1xyXG4gICAgICAgIGwucHVzaChwYXJzZVBhcnQodGspKTtcclxuICAgICAgICBpZiAoIXRrLmFjY2VwdCgwIC8qIFB1bmMgKi8sIFwiLFwiKSkge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBGaW5kIHRoZSBlbmQgb2YgdGhlIGxpc3QgLi4uIFwifCBWYXIgXVwiIG9yIFwiXVwiLlxyXG4gICAgdmFyIGFwcGVuZDtcclxuICAgIGlmICh0ay5hY2NlcHQoMCAvKiBQdW5jICovLCBcInxcIikpIHtcclxuICAgICAgICB0ay5leHBlY3QoMSAvKiBWYXIgKi8pO1xyXG4gICAgICAgIGFwcGVuZCA9IG5ldyBwcm9sb2dBU1RfMS5WYXJpYWJsZSh0ay5hY2NlcHRlZCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBhcHBlbmQgPSBwcm9sb2dBU1RfMS5BdG9tLk5pbDtcclxuICAgIH1cclxuICAgIHRrLmV4cGVjdCgwIC8qIFB1bmMgKi8sIFwiXVwiKTtcclxuICAgIC8vLy8gQ29uc3RydWN0IGxpc3RcclxuICAgIC8vZm9yICh2YXIgaSA9IGwubGVuZ3RoOyBpLS07KSB7XHJcbiAgICAvLyAgICBhcHBlbmQgPSBuZXcgVGVybShcImNvbnNcIiwgW2xbaV0sIGFwcGVuZF0pO1xyXG4gICAgLy99XHJcbiAgICByZXR1cm4gcHJvbG9nQVNUXzEubGlzdE9mQXJyYXkobCwgYXBwZW5kKTtcclxufVxyXG5mdW5jdGlvbiBwYXJzZUJvZHkodGspIHtcclxuICAgIHZhciB0ZXJtcyA9IFtdO1xyXG4gICAgd2hpbGUgKHRrLmN1cnJlbnQgIT09IFwiZW9mXCIpIHtcclxuICAgICAgICB0ZXJtcy5wdXNoKHBhcnNlVGVybSh0aykpO1xyXG4gICAgICAgIGlmICh0ay5hY2NlcHQoMCAvKiBQdW5jICovLCBcIi5cIikpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0ay5leHBlY3QoMCAvKiBQdW5jICovLCBcIixcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRlcm1zO1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgcHJvbG9nQVNUXzEgPSByZXF1aXJlKCcuL3Byb2xvZ0FTVCcpO1xyXG5leHBvcnRzLm9wdGlvbnMgPSB7XHJcbiAgICBtYXhJdGVyYXRpb25zOiBudWxsLFxyXG4gICAgZXhwZXJpbWVudGFsOiB7XHJcbiAgICAgICAgdGFpbFJlY3Vyc2lvbjogZmFsc2VcclxuICAgIH1cclxufTtcclxuLyoqXHJcbiAqIGV4ZWN1dGVzIGEgcXVlcnkgYWdhaW5zIHRoZSBkYXRhYmFzZVxyXG4gKiBAcGFyYW0gZGIgY29tcGlsZWQgcnVsZSBkYXRhYmFzZVxyXG4gKiBAcGFyYW0gcXVlcnkgY29tcGlsZWQgcXVlcnlcclxuICogQHJldHVybnMgaXRlcmF0b3IgdG8gaXRlcmF0ZSB0aHJvdWdoIHJlc3VsdHNcclxuICovXHJcbmZ1bmN0aW9uIHF1ZXJ5KHJ1bGVzREIsIHF1ZXJ5KSB7XHJcbiAgICB2YXIgdmFycyA9IHZhck5hbWVzKHF1ZXJ5Lmxpc3QpLCBjZGIgPSB7fTtcclxuICAgIC8vIG1heWJlIG1vdmUgdG8gcGFyc2VyIGxldmVsLCBpZGtcclxuICAgIGZvciAodmFyIGkgPSAwLCBuYW1lLCBydWxlOyBpIDwgcnVsZXNEQi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHJ1bGUgPSBydWxlc0RCW2ldO1xyXG4gICAgICAgIG5hbWUgPSBydWxlLmhlYWQubmFtZTtcclxuICAgICAgICBpZiAobmFtZSBpbiBjZGIpIHtcclxuICAgICAgICAgICAgY2RiW25hbWVdLnB1c2gocnVsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjZGJbbmFtZV0gPSBbcnVsZV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFyIGl0ZXJhdG9yID0gbmV3IEl0ZXJhdG9yKCk7XHJcbiAgICB2YXIgY29udCA9IGdldGR0cmVlaXRlcmF0b3IocXVlcnkubGlzdCwgY2RiLCBmdW5jdGlvbiAoYmluZGluZ0NvbnRleHQpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHY7IHYgPSB2YXJzW2krK107KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdFt2Lm5hbWVdID0gdGVybVRvSnNWYWx1ZShiaW5kaW5nQ29udGV4dC52YWx1ZSh2KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGl0ZXJhdG9yLmN1cnJlbnQgPSByZXN1bHQ7XHJcbiAgICB9KTtcclxuICAgIEl0ZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICB0aGlzLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIHdoaWxlIChjb250ICE9IG51bGwgJiYgIXRoaXMuY3VycmVudCkge1xyXG4gICAgICAgICAgICBjb250ID0gY29udCgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIChleHBvcnRzLm9wdGlvbnMubWF4SXRlcmF0aW9ucykgPT09IFwibnVtYmVyXCIgJiYgZXhwb3J0cy5vcHRpb25zLm1heEl0ZXJhdGlvbnMgPD0gKytpKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBcIml0ZXJhdGlvbiBsaW1pdCByZWFjaGVkXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5jdXJyZW50O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBpdGVyYXRvcjtcclxuICAgIGZ1bmN0aW9uIEl0ZXJhdG9yKCkgeyB9XHJcbn1cclxuZXhwb3J0cy5xdWVyeSA9IHF1ZXJ5O1xyXG47XHJcbi8qKlxyXG4gKiBHZXQgYSBsaXN0IG9mIGFsbCB2YXJpYWJsZXMgbWVudGlvbmVkIGluIGEgbGlzdCBvZiBUZXJtcy5cclxuICovXHJcbmZ1bmN0aW9uIHZhck5hbWVzKGxpc3QpIHtcclxuICAgIHZhciBvdXQgPSBbXSwgdmFycyA9IHt9LCB0LCBuO1xyXG4gICAgbGlzdCA9IGxpc3Quc2xpY2UoMCk7IC8vIGNsb25lICAgXHJcbiAgICB3aGlsZSAobGlzdC5sZW5ndGgpIHtcclxuICAgICAgICB0ID0gbGlzdC5wb3AoKTtcclxuICAgICAgICBpZiAodCBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlZhcmlhYmxlKSB7XHJcbiAgICAgICAgICAgIG4gPSB0Lm5hbWU7XHJcbiAgICAgICAgICAgIC8vIGlnbm9yZSBzcGVjaWFsIHZhcmlhYmxlIF9cclxuICAgICAgICAgICAgLy8gcHVzaCBvbmx5IG5ldyBuYW1lc1xyXG4gICAgICAgICAgICBpZiAobiAhPT0gXCJfXCIgJiYgb3V0LmluZGV4T2YobikgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBvdXQucHVzaChuKTtcclxuICAgICAgICAgICAgICAgIHZhcnNbbl0gPSB0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHQgaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5UZXJtKSB7XHJcbiAgICAgICAgICAgIC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgdHJlZSB3YWxrIG9yZGVyXHJcbiAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGxpc3QsIHQucGFydGxpc3QubGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dC5tYXAoZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIHZhcnNbbmFtZV07IH0pO1xyXG59XHJcbnZhciBidWlsdGluUHJlZGljYXRlcyA9IHtcclxuICAgIFwiIS8wXCI6IGZ1bmN0aW9uIChsb29wLCBnb2FscywgaWR4LCBiaW5kaW5nQ29udGV4dCwgZmJhY2t0cmFjaykge1xyXG4gICAgICAgIHZhciBuZXh0Z29hbHMgPSBnb2Fscy5zbGljZSgxKTsgLy8gY3V0IGFsd2F5cyBzdWNjZWVkc1xyXG4gICAgICAgIHJldHVybiBsb29wKG5leHRnb2FscywgMCwgbmV3IEJpbmRpbmdDb250ZXh0KGJpbmRpbmdDb250ZXh0KSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmJhY2t0cmFjayAmJiBmYmFja3RyYWNrKHRydWUsIGdvYWxzWzBdLnBhcmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgXCJmYWlsLzBcIjogZnVuY3Rpb24gKGxvb3AsIGdvYWxzLCBpZHgsIGJpbmRpbmdDb250ZXh0LCBmYmFja3RyYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIGZiYWNrdHJhY2s7IC8vIEZBSUxcclxuICAgIH0sXHJcbiAgICBcImNhbGwvMVwiOiBmdW5jdGlvbiAobG9vcCwgZ29hbHMsIGlkeCwgYmluZGluZ0NvbnRleHQsIGZiYWNrdHJhY2spIHtcclxuICAgICAgICB2YXIgZmlyc3QgPSBiaW5kaW5nQ29udGV4dC52YWx1ZShnb2Fsc1swXS5wYXJ0bGlzdC5saXN0WzBdKTtcclxuICAgICAgICBpZiAoIShmaXJzdCBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlRlcm0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYmFja3RyYWNrOyAvLyBGQUlMXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBuZyA9IGdvYWxzLnNsaWNlKDApO1xyXG4gICAgICAgIG5nWzBdID0gZmlyc3Q7XHJcbiAgICAgICAgZmlyc3QucGFyZW50ID0gZ29hbHNbMF07XHJcbiAgICAgICAgcmV0dXJuIGxvb3AobmcsIDAsIGJpbmRpbmdDb250ZXh0LCBmYmFja3RyYWNrKTtcclxuICAgIH0sXHJcbiAgICBcIj0vMlwiOiBmdW5jdGlvbiAobG9vcCwgZ29hbHMsIGlkeCwgYmluZGluZ0NvbnRleHQsIGZiYWNrdHJhY2spIHtcclxuICAgICAgICB2YXIgY3R4ID0gbmV3IEJpbmRpbmdDb250ZXh0KGJpbmRpbmdDb250ZXh0KTtcclxuICAgICAgICBpZiAoY3R4LnVuaWZ5KGdvYWxzWzBdLnBhcnRsaXN0Lmxpc3RbMF0sIGdvYWxzWzBdLnBhcnRsaXN0Lmxpc3RbMV0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsb29wKGdvYWxzLnNsaWNlKDEpLCAwLCBjdHgsIGZiYWNrdHJhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZiYWNrdHJhY2s7IC8vIEZBSUxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJmaW5kYWxsLzNcIjogZnVuY3Rpb24gKGxvb3AsIGdvYWxzLCBpZHgsIGJpbmRpbmdDb250ZXh0LCBmYmFja3RyYWNrLCBkYikge1xyXG4gICAgICAgIHZhciBhcmdzID0gZ29hbHNbMF0ucGFydGxpc3QubGlzdCwgcmVzdWx0cyA9IFtdO1xyXG4gICAgICAgIHJldHVybiBnZXRkdHJlZWl0ZXJhdG9yKFthcmdzWzFdXSwgZGIsIGNvbGxlY3QsIGJpbmRpbmdDb250ZXh0LCByZXBvcnQpO1xyXG4gICAgICAgIGZ1bmN0aW9uIGNvbGxlY3QoY3R4KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChjdHgudmFsdWUoYXJnc1swXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiByZXBvcnQoKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBwcm9sb2dBU1RfMS5saXN0T2ZBcnJheShyZXN1bHRzKTtcclxuICAgICAgICAgICAgaWYgKGJpbmRpbmdDb250ZXh0LnVuaWZ5KGFyZ3NbMl0sIHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsb29wKGdvYWxzLnNsaWNlKDEpLCAwLCBiaW5kaW5nQ29udGV4dCwgZmJhY2t0cmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmJhY2t0cmFjaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcImlzLzJcIjogZnVuY3Rpb24gKGxvb3AsIGdvYWxzLCBpZHgsIGJpbmRpbmdDb250ZXh0LCBmYmFja3RyYWNrKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBnb2Fsc1swXS5wYXJ0bGlzdC5saXN0LCBleHByZXNzaW9uID0gYmluZGluZ0NvbnRleHQudmFsdWUoYXJnc1sxXSksIGN0eCA9IG5ldyBCaW5kaW5nQ29udGV4dChiaW5kaW5nQ29udGV4dCk7XHJcbiAgICAgICAgaWYgKHZhck5hbWVzKFtleHByZXNzaW9uXSkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYmFja3RyYWNrOyAvLyBUT0RPOiBwcm9sb2cgZXhjZXB0aW9uIFwiRVJST1I6IGlzLzI6IEFyZ3VtZW50cyBhcmUgbm90IHN1ZmZpY2llbnRseSBpbnN0YW50aWF0ZWRcIlxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBidWlsZCBldmFsdWF0aW9uIHF1ZXVlOlxyXG4gICAgICAgIHZhciBxdWV1ZSA9IFtleHByZXNzaW9uXSwgYWNjID0gW10sIGMsIGksIHgsIGw7XHJcbiAgICAgICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB4ID0gcXVldWUucG9wKCk7XHJcbiAgICAgICAgICAgIGFjYy5wdXNoKHgpO1xyXG4gICAgICAgICAgICBpZiAoeCBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlRlcm0pIHtcclxuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHF1ZXVlLCB4LnBhcnRsaXN0Lmxpc3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGV2YWx1YXRlXHJcbiAgICAgICAgcXVldWUgPSBhY2M7XHJcbiAgICAgICAgYWNjID0gW107XHJcbiAgICAgICAgaSA9IHF1ZXVlLmxlbmd0aDtcclxuICAgICAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgICAgIHggPSBxdWV1ZVtpXTtcclxuICAgICAgICAgICAgaWYgKHggaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5UZXJtKSB7XHJcbiAgICAgICAgICAgICAgICBjID0geC5wYXJ0bGlzdC5saXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGwgPSBhY2Muc3BsaWNlKC1jLCBjKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoeC5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIitcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWNjLnB1c2gobFswXSArIGxbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiLVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2MucHVzaChsWzBdIC0gbFsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCIqXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjYy5wdXNoKGxbMF0gKiBsWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIi9cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWNjLnB1c2gobFswXSAvIGxbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmJhY2t0cmFjazsgLy8gVE9ETzogcHJvbG9nIGV4Y2VwdGlvbiBcIkVSUk9SOiBpcy8yOiBBcml0aG1ldGljOiBge3gubmFtZX0nIGlzIG5vdCBhIGZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKHgubmFtZSkgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBhY2MucHVzaCh4Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogaGFuZGxlIGZ1bmN0aW9ucyBsaWtlIHBpIGUgZXRjXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZiYWNrdHJhY2s7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGN0eC51bmlmeShhcmdzWzBdLCBuZXcgcHJvbG9nQVNUXzEuQXRvbShhY2NbMF0pKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbG9vcChnb2Fscy5zbGljZSgxKSwgMCwgY3R4LCBmYmFja3RyYWNrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYmFja3RyYWNrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuLyoqXHJcbiAqIFRoZSBtYWluIHByb3ZpbmcgZW5naW5lXHJcbiAqIEBwYXJhbSBvcmlnaW5hbEdvYWxzIG9yaWdpbmFsIGdvYWxzIHRvIHByb3ZlXHJcbiAqIEBwYXJhbSBydWxlc0RCIHByb2xvZyBkYXRhYmFzZSB0byBjb25zdWx0IHdpdGhcclxuICogQHBhcmFtIGZzdWNjZXNzIHN1Y2Nlc3MgY2FsbGJhY2tcclxuICogQHJldHVybnMgYSBmdW5jdGlvbiB0byBwZXJmb3JtIG5leHQgc3RlcFxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0ZHRyZWVpdGVyYXRvcihvcmlnaW5hbEdvYWxzLCBydWxlc0RCLCBmc3VjY2Vzcywgcm9vdEJpbmRpbmdDb250ZXh0LCByb290QmFja3RyYWNrKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciB0YWlsRW5hYmxlZCA9IGV4cG9ydHMub3B0aW9ucy5leHBlcmltZW50YWwudGFpbFJlY3Vyc2lvbjtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiBsb29wKG9yaWdpbmFsR29hbHMsIDAsIHJvb3RCaW5kaW5nQ29udGV4dCB8fCBudWxsLCByb290QmFja3RyYWNrIHx8IG51bGwpOyB9O1xyXG4gICAgLy8gbWFpbiBsb29wIGNvbnRpbnVhdGlvblxyXG4gICAgZnVuY3Rpb24gbG9vcChnb2FscywgaWR4LCBwYXJlbnRCaW5kaW5nQ29udGV4dCwgZmJhY2t0cmFjaykge1xyXG4gICAgICAgIGlmICghZ29hbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZzdWNjZXNzKHBhcmVudEJpbmRpbmdDb250ZXh0KTtcclxuICAgICAgICAgICAgcmV0dXJuIGZiYWNrdHJhY2s7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjdXJyZW50R29hbCA9IGdvYWxzWzBdLCBjdXJyZW50QmluZGluZ0NvbnRleHQgPSBuZXcgQmluZGluZ0NvbnRleHQocGFyZW50QmluZGluZ0NvbnRleHQpLCBjdXJyZW50R29hbFZhck5hbWVzLCBydWxlLCB2YXJNYXAsIHJlbmFtZWRIZWFkLCBuZXh0R29hbHNWYXJOYW1lcywgZXhpc3Rpbmc7XHJcbiAgICAgICAgLy8gVE9ETzogYWRkIHN1cHBvcnQgZm9yIGJ1aWx0aW5zIHdpdGggdmFyaWFibGUgYXJpdHkgKGxpa2UgY2FsbC8yKylcclxuICAgICAgICB2YXIgYnVpbHRpbiA9IGJ1aWx0aW5QcmVkaWNhdGVzW2N1cnJlbnRHb2FsLm5hbWUgKyBcIi9cIiArIGN1cnJlbnRHb2FsLnBhcnRsaXN0Lmxpc3QubGVuZ3RoXTtcclxuICAgICAgICBpZiAodHlwZW9mIChidWlsdGluKSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBidWlsdGluKGxvb3AsIGdvYWxzLCBpZHgsIGN1cnJlbnRCaW5kaW5nQ29udGV4dCwgZmJhY2t0cmFjaywgcnVsZXNEQik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNlYXJjaGluZyBmb3IgbmV4dCBtYXRjaGluZyBydWxlICAgICAgICBcclxuICAgICAgICBmb3IgKHZhciBpID0gaWR4LCBkYiA9IHJ1bGVzREJbY3VycmVudEdvYWwubmFtZV0sIGRibGVuID0gZGIgJiYgZGIubGVuZ3RoOyBpIDwgZGJsZW47IGkrKykge1xyXG4gICAgICAgICAgICBydWxlID0gZGJbaV07XHJcbiAgICAgICAgICAgIHZhck1hcCA9IHt9O1xyXG4gICAgICAgICAgICByZW5hbWVkSGVhZCA9IG5ldyBwcm9sb2dBU1RfMS5UZXJtKHJ1bGUuaGVhZC5uYW1lLCBjdXJyZW50QmluZGluZ0NvbnRleHQucmVuYW1lVmFyaWFibGVzKHJ1bGUuaGVhZC5wYXJ0bGlzdC5saXN0LCBjdXJyZW50R29hbCwgdmFyTWFwKSk7XHJcbiAgICAgICAgICAgIHJlbmFtZWRIZWFkLnBhcmVudCA9IGN1cnJlbnRHb2FsLnBhcmVudDtcclxuICAgICAgICAgICAgaWYgKCFjdXJyZW50QmluZGluZ0NvbnRleHQudW5pZnkoY3VycmVudEdvYWwsIHJlbmFtZWRIZWFkKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG5leHRHb2FscyA9IGdvYWxzLnNsaWNlKDEpOyAvLyBjdXJyZW50IGhlYWQgc3VjY2VlZGVkICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChydWxlLmJvZHkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbmV4dEdvYWxzID0gY3VycmVudEJpbmRpbmdDb250ZXh0LnJlbmFtZVZhcmlhYmxlcyhydWxlLmJvZHkubGlzdCwgcmVuYW1lZEhlYWQsIHZhck1hcCkuY29uY2F0KG5leHRHb2Fscyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gVE9ETzogcmVtb3ZlICdmcmVlJyB2YXJpYWJsZXMgKG5lZWQgdG8gY2hlY2sgdmFsdWVzIGFzIHdlbGwpXHJcbiAgICAgICAgICAgIGlmIChydWxlLmJvZHkgIT0gbnVsbCAmJiBuZXh0R29hbHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjYWxsIGluIGEgdGFpbCBwb3NpdGlvbjogcmV1c2luZyBwYXJlbnQgdmFyaWFibGVzICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gcHJldmVudHMgY29udGV4dCBncm90aCBpbiBzb21lIHJlY3Vyc2l2ZSBzY2VuYXJpb3NcclxuICAgICAgICAgICAgICAgIGlmICh0YWlsRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRHb2FsVmFyTmFtZXMgPSB2YXJOYW1lcyhbY3VycmVudEdvYWxdKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0R29hbHNWYXJOYW1lcyA9IHZhck5hbWVzKG5leHRHb2Fscyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcgPSBuZXh0R29hbHNWYXJOYW1lcy5jb25jYXQoY3VycmVudEdvYWxWYXJOYW1lcykubWFwKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWU7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50R29hbFZhck5hbWVzLmxlbmd0aCA9PT0gbmV4dEdvYWxzVmFyTmFtZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHZuIGluIHZhck1hcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgY3YsIGNuLCBubiwgayA9IGN1cnJlbnRHb2FsVmFyTmFtZXMubGVuZ3RoOyBrLS07KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gPSBjdXJyZW50R29hbFZhck5hbWVzW2tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5uID0gbmV4dEdvYWxzVmFyTmFtZXNba107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3YgPSBjdXJyZW50QmluZGluZ0NvbnRleHQudmFsdWUoY24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbi5uYW1lICE9IG5uLm5hbWUgJiYgdmFyTWFwW3ZuXSA9PT0gbm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG8gbm90IHNob3J0LWN1dCBpZiBjbidzIHZhbHVlIHJlZmVyZW5jZXMgbm5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogcHJvYmFibHkgbmVlZCB0byBjaGVjayBvdGhlciB2YXJpYWJsZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN2ICYmIHZhck5hbWVzKFtjdl0pLmluZGV4T2Yobm4pICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyTWFwW3ZuXSA9IGNuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50QmluZGluZ0NvbnRleHQuY3R4W2NuLm5hbWVdID0gY3VycmVudEJpbmRpbmdDb250ZXh0LmN0eFtubi5uYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEJpbmRpbmdDb250ZXh0LnVuYmluZChubi5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmUtcmVuYW1lIHZhcnMgaW4gbmV4dCBnb2FscyAoY2FuIGJlIG9wdGltaXNlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEdvYWxzID0gY3VycmVudEJpbmRpbmdDb250ZXh0LnJlbmFtZVZhcmlhYmxlcyhydWxlLmJvZHkubGlzdCwgcmVuYW1lZEhlYWQsIHZhck1hcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGxldmVsRG93blRhaWwoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2tpcHBpbmcgYmFja3RyYWNraW5nIHRvIHRoZSBzYW1lIGxldmVsIGJlY2F1c2UgaXQncyB0aGUgbGFzdCBnb2FsICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogcmVtb3ZpbmcgZXh0cmEgc3R1ZmYgZnJvbSBiaW5kaW5nIGNvbnRleHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9vcChuZXh0R29hbHMsIDAsIGN1cnJlbnRCaW5kaW5nQ29udGV4dCwgZmJhY2t0cmFjayk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8vIENVUlJFTlQgQkFDS1RSQUNLIENPTlRJTlVBVElPTiAgLy8vXHJcbiAgICAgICAgICAgICAgICAvLy8gV0hFTiBJTlZPS0VEIEJBQ0tUUkFDS1MgVE8gVEhFICAvLy9cclxuICAgICAgICAgICAgICAgIC8vLyBORVhUIFJVTEUgSU4gVEhFIFBSRVZJT1VTIExFVkVMIC8vL1xyXG4gICAgICAgICAgICAgICAgdmFyIGZDdXJyZW50QlQgPSBmdW5jdGlvbiAoY3V0LCBwYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYmFja3RyYWNrICYmIGZiYWNrdHJhY2socGFyZW50LnBhcmVudCAhPT0gZ29hbHNbMF0ucGFyZW50LCBwYXJlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxvb3AoZ29hbHMsIGkgKyAxLCBwYXJlbnRCaW5kaW5nQ29udGV4dCwgZmJhY2t0cmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBsZXZlbERvd24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxvb3AobmV4dEdvYWxzLCAwLCBjdXJyZW50QmluZGluZ0NvbnRleHQsIGZDdXJyZW50QlQpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmJhY2t0cmFjaztcclxuICAgIH1cclxufVxyXG47XHJcbi8qKlxyXG4gKiBoZWxwZXIgZnVuY3Rpb24gdG8gY29udmVydCB0ZXJtcyB0byByZXN1bHQgdmFsdWVzIHJldHVybmVkIGJ5IHF1ZXJ5IGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiB0ZXJtVG9Kc1ZhbHVlKHYpIHtcclxuICAgIGlmICh2IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuQXRvbSkge1xyXG4gICAgICAgIHJldHVybiB2ID09PSBwcm9sb2dBU1RfMS5BdG9tLk5pbCA/IFtdIDogdi5uYW1lO1xyXG4gICAgfVxyXG4gICAgaWYgKHYgaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5UZXJtICYmIHYubmFtZSA9PT0gXCJjb25zXCIpIHtcclxuICAgICAgICB2YXIgdCA9IFtdO1xyXG4gICAgICAgIHdoaWxlICh2LnBhcnRsaXN0ICYmIHYubmFtZSAhPT0gXCJuaWxcIikge1xyXG4gICAgICAgICAgICB0LnB1c2godGVybVRvSnNWYWx1ZSh2LnBhcnRsaXN0Lmxpc3RbMF0pKTtcclxuICAgICAgICAgICAgdiA9IHYucGFydGxpc3QubGlzdFsxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdi50b1N0cmluZygpO1xyXG59XHJcbi8qKlxyXG4gKiBjcmVhdGVzIGJpbmRpbmcgY29udGV4dCBmb3IgdmFyaWFibGVzXHJcbiAqL1xyXG5mdW5jdGlvbiBCaW5kaW5nQ29udGV4dChwYXJlbnQpIHtcclxuICAgIHRoaXMuY3R4ID0gT2JqZWN0LmNyZWF0ZShwYXJlbnQgJiYgcGFyZW50LmN0eCB8fCB7fSk7XHJcbn1cclxuLyoqXHJcbiAqIGZpbmUtcHJpbnQgdGhlIGNvbnRleHQgKGZvciBkZWJ1Z2dpbmcgcHVycG9zZXMpXHJcbiAqICEgU0xPVyBiZWNhdXNlIG9mIGZvci1pblxyXG4gKi9cclxuQmluZGluZ0NvbnRleHQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcbiAgICB2YXIgciA9IFtdLCBwID0gW107XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5jdHgpIHtcclxuICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5jYWxsKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLmN0eCwga2V5KSA/IHIgOiBwLCBrZXkgKyBcIiA9IFwiICsgdGhpcy5jdHhba2V5XSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gci5qb2luKFwiLCBcIikgKyBcIiB8fCBcIiArIHAuam9pbihcIiwgXCIpO1xyXG59O1xyXG52YXIgZ2xvYmFsR29hbENvdW50ZXIgPSAwO1xyXG4vKipcclxuICogcmVuYW1lcyB2YXJpYWJsZXMgdG8gbWFrZSBzdXJlIG5hbWVzIGFyZSB1bmlxdWVcclxuICogQHBhcmFtIGxpc3QgbGlzdCBvZiB0ZXJtcyB0byByZW5hbWVcclxuICogQHBhcmFtIHBhcmVudCBwYXJlbnQgdGVybSAocGFyZW50IGlzIHVzZWQgaW4gY3V0KVxyXG4gKiBAcGFyYW0gdmFyTWFwIChvdXQpIG1hcCBvZiB2YXJpYWJsZSBtYXBwaW5ncywgdXNlZCB0byBtYWtlIHN1cmUgdGhhdCBib3RoIGhlYWQgYW5kIGJvZHkgaGF2ZSBzYW1lIG5hbWVzXHJcbiAqIEByZXR1cm5zIG5ldyB0ZXJtIHdpdGggcmVuYW1lZCB2YXJpYWJsZXNcclxuICovXHJcbkJpbmRpbmdDb250ZXh0LnByb3RvdHlwZS5yZW5hbWVWYXJpYWJsZXMgPSBmdW5jdGlvbiByZW5hbWVWYXJpYWJsZXMobGlzdCwgcGFyZW50LCB2YXJNYXApIHtcclxuICAgIHZhciBvdXQgPSBbXSwgcXVldWUgPSBbXSwgc3RhY2sgPSBbbGlzdF0sIGNsZW4sIHRtcCwgdjtcclxuICAgIC8vIHByZXBhcmUgZGVwdGgtZmlyc3QgcXVldWVcclxuICAgIHdoaWxlIChzdGFjay5sZW5ndGgpIHtcclxuICAgICAgICBsaXN0ID0gc3RhY2sucG9wKCk7XHJcbiAgICAgICAgcXVldWUucHVzaChsaXN0KTtcclxuICAgICAgICBpZiAobGlzdCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIGxpc3QubGVuZ3RoICYmIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHN0YWNrLCBsaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobGlzdCBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlRlcm0pIHtcclxuICAgICAgICAgICAgbGlzdC5wYXJ0bGlzdC5saXN0Lmxlbmd0aCAmJiBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShzdGFjaywgbGlzdC5wYXJ0bGlzdC5saXN0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBwcm9jZXNzIGRlcHRoLWZpcnN0IHF1ZXVlXHJcbiAgICB2YXIgdmFycyA9IHZhck1hcCB8fCB7fSwgXyA9IG5ldyBwcm9sb2dBU1RfMS5WYXJpYWJsZShcIl9cIik7XHJcbiAgICBmb3IgKHZhciBpID0gcXVldWUubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICBsaXN0ID0gcXVldWVbaV07XHJcbiAgICAgICAgaWYgKGxpc3QgaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5BdG9tKSB7XHJcbiAgICAgICAgICAgIG91dC5wdXNoKGxpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChsaXN0IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuVmFyaWFibGUpIHtcclxuICAgICAgICAgICAgaWYgKGxpc3QubmFtZSA9PT0gXCJfXCIpIHtcclxuICAgICAgICAgICAgICAgIHYgPSBfO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdiA9IHZhcnNbbGlzdC5uYW1lXSB8fCAodmFyc1tsaXN0Lm5hbWVdID0gbmV3IHByb2xvZ0FTVF8xLlZhcmlhYmxlKFwiX0dcIiArIChnbG9iYWxHb2FsQ291bnRlcisrKSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG91dC5wdXNoKHYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChsaXN0IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuVGVybSkge1xyXG4gICAgICAgICAgICBjbGVuID0gbGlzdC5wYXJ0bGlzdC5saXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgdG1wID0gbmV3IHByb2xvZ0FTVF8xLlRlcm0obGlzdC5uYW1lLCBvdXQuc3BsaWNlKC1jbGVuLCBjbGVuKSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHBsID0gdG1wLnBhcnRsaXN0Lmxpc3QsIGsgPSBwbC5sZW5ndGg7IGstLTspIHtcclxuICAgICAgICAgICAgICAgIGlmIChwbFtrXSBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlRlcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICBwbFtrXS5wYXJlbnQgPSB0bXA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdG1wLnBhcmVudCA9IHBhcmVudDtcclxuICAgICAgICAgICAgb3V0LnB1c2godG1wKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNsZW4gPSBsaXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgY2xlbiAmJiBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShvdXQsIG91dC5zcGxpY2UoLWNsZW4sIGNsZW4pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0O1xyXG59O1xyXG4vKipcclxuICogQmluZHMgdmFyaWFibGUgdG8gYSB2YWx1ZSBpbiB0aGUgY29udGV4dFxyXG4gKiBAcGFyYW0gbmFtZSBuYW1lIG9mIHRoZSB2YXJpYWJsZSB0byBiaW5kXHJcbiAqIEBwYXJhbSB2YWx1ZSB2YWx1ZSB0byBiaW5kIHRvIHRoZSB2YXJpYWJsZVxyXG4gKi9cclxuQmluZGluZ0NvbnRleHQucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgIHRoaXMuY3R4W25hbWVdID0gdmFsdWU7XHJcbn07XHJcbi8qKlxyXG4gKiBVbmJpbmRzIHZhcmlhYmxlIGluIHRoZSBDVVJSRU5UIGNvbnRleHRcclxuICogVmFyaWFibGUgcmVtYWlucyBib3VuZCBpbiBwYXJlbnQgY29udGV4dHNcclxuICogYW5kIG1pZ2h0IGJlIHJlc29sdmVkIHRob3VnaCBwcm90byBjaGFpblxyXG4gKiBAcGFyYW0gbmFtZSB2YXJpYWJsZSBuYW1lIHRvIHVuYmluZFxyXG4gKi9cclxuQmluZGluZ0NvbnRleHQucHJvdG90eXBlLnVuYmluZCA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICBkZWxldGUgdGhpcy5jdHhbbmFtZV07XHJcbn07XHJcbi8qKlxyXG4gKiBHZXRzIHRoZSB2YWx1ZSBvZiB0aGUgdGVybSwgcmVjdXJzaXZlbHkgcmVwbGFjaW5nIHZhcmlhYmxlcyB3aXRoIGJvdW5kIHZhbHVlc1xyXG4gKiBAcGFyYW0geCB0ZXJtIHRvIGNhbGN1bGF0ZSB2YWx1ZSBmb3JcclxuICogQHJldHVybnMgdmFsdWUgb2YgdGVybSB4XHJcbiAqL1xyXG5CaW5kaW5nQ29udGV4dC5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiB2YWx1ZSh4KSB7XHJcbiAgICB2YXIgcXVldWUgPSBbeF0sIGFjYyA9IFtdLCBjLCBpO1xyXG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCkge1xyXG4gICAgICAgIHggPSBxdWV1ZS5wb3AoKTtcclxuICAgICAgICBhY2MucHVzaCh4KTtcclxuICAgICAgICBpZiAoeCBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlRlcm0pIHtcclxuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkocXVldWUsIHgucGFydGxpc3QubGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHggaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5WYXJpYWJsZSkge1xyXG4gICAgICAgICAgICBjID0gdGhpcy5jdHhbeC5uYW1lXTtcclxuICAgICAgICAgICAgaWYgKGMpIHtcclxuICAgICAgICAgICAgICAgIGFjYy5wb3AoKTtcclxuICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBxdWV1ZSA9IGFjYztcclxuICAgIGFjYyA9IFtdO1xyXG4gICAgaSA9IHF1ZXVlLmxlbmd0aDtcclxuICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICB4ID0gcXVldWVbaV07XHJcbiAgICAgICAgaWYgKHggaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5UZXJtKSB7XHJcbiAgICAgICAgICAgIGMgPSB4LnBhcnRsaXN0Lmxpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICBhY2MucHVzaChuZXcgcHJvbG9nQVNUXzEuVGVybSh4Lm5hbWUsIGFjYy5zcGxpY2UoLWMsIGMpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgYWNjLnB1c2goeCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWNjWzBdO1xyXG59O1xyXG4vKipcclxuICogVW5pZmllcyB0ZXJtcyB4IGFuZCB5LCByZW5hbWluZyBhbmQgYmluZGluZyB2YXJpYWJsZXMgaW4gcHJvY2Vzc1xyXG4gKiAhISBtdXRhdGVzIHZhcmlhYmxlIG5hbWVzIChhbHRlcmluZyB4LCB5IGFuZCB2YXJNYXAgaW4gbWFpbiBsb29wKVxyXG4gKiBAcmV0dXJucyB0cnVlIGlmIHRlcm1zIHVuaWZ5LCBmYWxzZSBvdGhlcndpc2VcclxuICovXHJcbkJpbmRpbmdDb250ZXh0LnByb3RvdHlwZS51bmlmeSA9IGZ1bmN0aW9uIHVuaWZ5KHgsIHkpIHtcclxuICAgIHZhciB0b1NldE5hbWVzID0gW10sIHRvU2V0ID0ge30sIGFjYyA9IFtdLCBxdWV1ZSA9IFt0aGlzLnZhbHVlKHgpLCB0aGlzLnZhbHVlKHkpXSwgeHBsLCB5cGwsIGksIGxlbjtcclxuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGgpIHtcclxuICAgICAgICB4ID0gcXVldWUucG9wKCk7XHJcbiAgICAgICAgeSA9IHF1ZXVlLnBvcCgpO1xyXG4gICAgICAgIGlmICh4IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuVGVybSAmJiB5IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuVGVybSkge1xyXG4gICAgICAgICAgICB4cGwgPSB4LnBhcnRsaXN0Lmxpc3Q7XHJcbiAgICAgICAgICAgIHlwbCA9IHkucGFydGxpc3QubGlzdDtcclxuICAgICAgICAgICAgaWYgKHgubmFtZSA9PSB5Lm5hbWUgJiYgeHBsLmxlbmd0aCA9PSB5cGwubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSB4cGwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKHhwbFtpXSwgeXBsW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCh4IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuQXRvbSB8fCB5IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuQXRvbSkgJiYgISh4IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuVmFyaWFibGUgfHwgeSBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlZhcmlhYmxlKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEoeCBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLkF0b20gJiYgeSBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLkF0b20gJiYgeC5uYW1lID09IHkubmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYWNjLnB1c2goeCwgeSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaSA9IGFjYy5sZW5ndGg7XHJcbiAgICB3aGlsZSAoaSkge1xyXG4gICAgICAgIHkgPSBhY2NbLS1pXTtcclxuICAgICAgICB4ID0gYWNjWy0taV07XHJcbiAgICAgICAgaWYgKHggaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5WYXJpYWJsZSkge1xyXG4gICAgICAgICAgICBpZiAoeC5uYW1lID09PSBcIl9cIikge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRvU2V0TmFtZXMuaW5kZXhPZih4Lm5hbWUpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdG9TZXROYW1lcy5wdXNoKHgubmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodG9TZXRbeC5uYW1lXS5uYW1lICE9PSB5Lm5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0b1NldFt4Lm5hbWVdID0geTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoeSBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlZhcmlhYmxlKSB7XHJcbiAgICAgICAgICAgIGlmICh5Lm5hbWUgPT09IFwiX1wiKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodG9TZXROYW1lcy5pbmRleE9mKHkubmFtZSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0b1NldE5hbWVzLnB1c2goeS5uYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0b1NldFt5Lm5hbWVdLm5hbWUgIT09IHgubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRvU2V0W3kubmFtZV0gPSB4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIHJlbmFtaW5nIHVuaWZpZWQgdmFyaWFibGVzXHJcbiAgICAvLyBpdCdzIGd1YXJhbnRlZWQgdGhhdCB2YXJpYWJsZSB3aXRoIHRoZSBzYW1lIG5hbWUgaXMgdGhlIHNhbWUgaW5zdGFuY2Ugd2l0aGluIHJ1bGUsIHNlZSByZW5hbWVWYXJpYWJsZXMoKVxyXG4gICAgdmFyIHZhcm1hcCA9IHt9LCBrZXk7XHJcbiAgICBmb3IgKGkgPSAwOyBrZXkgPSB0b1NldE5hbWVzW2krK107KSB7XHJcbiAgICAgICAgaWYgKHRvU2V0W2tleV0gaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5WYXJpYWJsZSkge1xyXG4gICAgICAgICAgICB2YXJtYXBbdG9TZXRba2V5XS5uYW1lXSA9IGtleTtcclxuICAgICAgICAgICAgdG9TZXRba2V5XS5uYW1lID0ga2V5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGJpbmQgdmFsdWVzIHRvIHZhcmlhYmxlcyAobWluZGluZyByZW5hbWVzKVxyXG4gICAgZm9yIChpID0gMDsga2V5ID0gdG9TZXROYW1lc1tpKytdOykge1xyXG4gICAgICAgIGlmICghKHRvU2V0W2tleV0gaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5WYXJpYWJsZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5iaW5kKHZhcm1hcFtrZXldIHx8IGtleSwgdG9TZXRba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcbiJdfQ==

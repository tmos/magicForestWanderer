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
        this.trap = false;
        this.goal = false;
        this.monster = false;
        this.tree = false;
        this.trapClue = false;
        this.monsterClue = false;
        this.isVisited = false;
        this.isAccessible = false;
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
        else if (element === constants_1.tree) {
            this.tree = true;
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
    Floor.prototype.isTree = function () {
        return this.tree;
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
            !this.tree &&
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
        if (this.isTree()) {
            classes.push("tree");
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
            alert('You die.');
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
                this.forestMap[y][x] = null;
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
    Wanderer.prototype.perceive = function () {
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
        this.forestMap[this.y + 1][this.x] = this.forest.getFloorContent(this.y + 1, this.x);
        this.forestMap[this.y - 1][this.x] = this.forest.getFloorContent(this.y - 1, this.x);
        this.forestMap[this.y][this.x + 1] = this.forest.getFloorContent(this.y, this.x + 1);
        this.forestMap[this.y][this.x - 1] = this.forest.getFloorContent(this.y, this.x - 1);
        this.forestMap[this.y][this.x].isVisited = true;
        if (this.forestMap[this.y][this.x].isMonsterClue()) {
            monsterClue = true;
        }
        if (this.forestMap[this.y][this.x].isTrapClue()) {
            trapClue = true;
        }
        // Find adjacent floors
        if (!this.forestMap[this.y + 1][this.x].isTree() && !this.forestMap[this.y + 1][this.x].isVisited) {
            this.forestMap[this.y + 1][this.x].isAccessible = true;
            if (monsterClue) {
                this.forestMap[this.y + 1][this.x].addProbabilityMonster(probability);
            }
            if (trapClue) {
                this.forestMap[this.y + 1][this.x].addProbabilityTrap(probability);
            }
        }
        if (!this.forestMap[this.y - 1][this.x].isTree() && !this.forestMap[this.y - 1][this.x].isVisited) {
            this.forestMap[this.y - 1][this.x].isAccessible = true;
            if (monsterClue) {
                this.forestMap[this.y - 1][this.x].addProbabilityMonster(probability);
            }
            if (trapClue) {
                this.forestMap[this.y - 1][this.x].addProbabilityTrap(probability);
            }
        }
        if (!this.forestMap[this.y][this.x + 1].isTree() && !this.forestMap[this.y][this.x + 1].isVisited) {
            this.forestMap[this.y][this.x + 1].isAccessible = true;
            if (monsterClue) {
                this.forestMap[this.y][this.x + 1].addProbabilityMonster(probability);
            }
            if (trapClue) {
                this.forestMap[this.y][this.x + 1].addProbabilityTrap(probability);
            }
        }
        if (!this.forestMap[this.y][this.x - 1].isTree() && !this.forestMap[this.y][this.x - 1].isVisited) {
            this.forestMap[this.y][this.x - 1].isAccessible = true;
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
        var number = 0;
        if (!this.forestMap[this.y + 1][this.x].isTree() && this.forestMap[this.y + 1][this.x].isVisited) {
            number += 1;
        }
        if (!this.forestMap[this.y - 1][this.x].isTree() && this.forestMap[this.y - 1][this.x].isVisited) {
            number += 1;
        }
        if (!this.forestMap[this.y][this.x + 1].isTree() && this.forestMap[this.y][this.x + 1].isVisited) {
            number += 1;
        }
        if (!this.forestMap[this.y][this.x - 1].isTree() && this.forestMap[this.y][this.x - 1].isVisited) {
            number += 1;
        }
        return number;
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
        if (this.perceive().isTrap()) {
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

},{"jsprolog":7}],5:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9zcmMvRmxvb3IudHMiLCJqcy9zcmMvRm9yZXN0LnRzIiwianMvc3JjL0dhbWUudHMiLCJqcy9zcmMvV2FuZGVyZXIudHMiLCJqcy9zcmMvY29uc3RhbnRzLnRzIiwianMvc3JjL21haW4udHMiLCJub2RlX21vZHVsZXMvanNwcm9sb2cvZGlzdC9qc3Byb2xvZy5qcyIsIm5vZGVfbW9kdWxlcy9qc3Byb2xvZy9kaXN0L3Byb2xvZ0FTVC5qcyIsIm5vZGVfbW9kdWxlcy9qc3Byb2xvZy9kaXN0L3Byb2xvZ1BhcnNlci5qcyIsIm5vZGVfbW9kdWxlcy9qc3Byb2xvZy9kaXN0L3Byb2xvZ1NvbHZlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQ0EseUNBQTZEO0FBRTdEOzs7O0dBSUc7QUFDSDtJQWFJLGVBQVksT0FBZTtRQUFmLHdCQUFBLEVBQUEsMkJBQWU7UUFabkIsU0FBSSxHQUFZLEtBQUssQ0FBQztRQUN0QixTQUFJLEdBQVksS0FBSyxDQUFDO1FBQ3RCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsU0FBSSxHQUFZLEtBQUssQ0FBQztRQUN0QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBRTlCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFDN0IsdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO1FBR3hCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxnQkFBSSxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxnQkFBSSxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsSUFBSSxHQUFH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QyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNoRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDdkQsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzFFLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEUsQ0FBQztRQUNMLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDaEcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElB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LEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0IsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO1lBQy9CLEtBQUssQ0FBQztRQUNWLEtBQUssRUFBRTtZQUNILENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO1lBQy9CLEtBQUssQ0FBQztRQUNWLEtBQUssRUFBRTtZQUNILENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUIsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO1lBQy9CLEtBQUssQ0FBQztRQUNWLEtBQUssRUFBRTtZQUNILENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0IsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO1lBQy9CLEtBQUssQ0FBQztRQUNWO1lBQ0ksS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUVELEVBQUUsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDZixDQUFDO0FBQ0wsQ0FBQyxDQUFDOzs7QUNuQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCAqIGFzICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IHtlbXB0eSwgZ29hbCwgbW9uc3RlciwgdHJhcCwgdHJlZX0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbi8qKlxuICogWW91J2xsIHRlbGwgbWU6IFwiQSBmbG9vciBpcyBhIGZsb29yXCIsIGFuZCB5b3UnbGwgYmUgcmlnaHQuXG4gKiBUaGlzIGlzIG5vdCB0aGUgZmxvb3IgaXRzZWxmIHRoYXQgbWF0dGVycywgdGhpcyBpcyB3aGF0IGl0IGNvbnRhaW5zLlxuICogSXMgaXQgYW4gaG9ycmlibGUgbW9uc3RlciBvbiB0aGlzIGZsb29yPyBPciBhIGxldGhhbCB0cmFwPyBPciBhIGNsdWUgZm9yIHRoZSBuZXh0IGZsb29yPyBZb3UnbGwgc2VlLCB3YW5kZXJlci4uLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbG9vciB7XG4gICAgcHJpdmF0ZSB0cmFwOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBnb2FsOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBtb25zdGVyOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSB0cmVlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSB0cmFwQ2x1ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgbW9uc3RlckNsdWU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBpc1Zpc2l0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgaXNBY2Nlc3NpYmxlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBwcm9iYWJpbGl0eU1vbnN0ZXIgPSAwO1xuICAgIHByaXZhdGUgcHJvYmFiaWxpdHlUcmFwID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQgPSBlbXB0eSkge1xuICAgICAgICBpZiAoZWxlbWVudCA9PT0gdHJhcCkge1xuICAgICAgICAgICAgdGhpcy50cmFwID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50ID09PSBnb2FsKSB7XG4gICAgICAgICAgICB0aGlzLmdvYWwgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgPT09IG1vbnN0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMubW9uc3RlciA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCA9PT0gdHJlZSkge1xuICAgICAgICAgICAgdGhpcy50cmVlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRoZSBmbG9vciBpcyBlbXB0eSBvdGhlcndpc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBpc1RyYXAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYXA7XG4gICAgfVxuXG4gICAgcHVibGljIGlzR29hbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ29hbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNNb25zdGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc1RyZWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWU7XG4gICAgfVxuXG4gICAgcHVibGljIGlzTW9uc3RlckNsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXJDbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc1RyYXBDbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFwQ2x1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNFbXB0eSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRyYXAgJiZcbiAgICAgICAgICAgICF0aGlzLmdvYWwgJiZcbiAgICAgICAgICAgICF0aGlzLm1vbnN0ZXIgJiZcbiAgICAgICAgICAgICF0aGlzLnRyZWUgJiZcbiAgICAgICAgICAgICF0aGlzLnRyYXBDbHVlICYmXG4gICAgICAgICAgICAhdGhpcy5tb25zdGVyQ2x1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRDbHVlKGNsdWVUeXBlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKGNsdWVUeXBlID09PSB0cmFwKSB7XG4gICAgICAgICAgICB0aGlzLnRyYXBDbHVlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChjbHVlVHlwZSA9PT0gbW9uc3Rlcikge1xuICAgICAgICAgICAgdGhpcy5tb25zdGVyQ2x1ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGF0IGlzIHRoZSBwcm9iYWJpbGl0eSB0aGlzIGZsb29yIGlzIGEgbW9uc3Rlcj9cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UHJvYmFiaWxpdHlNb25zdGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9iYWJpbGl0eU1vbnN0ZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBwcm9iYWJpbGl0eSB0aGlzIGZsb29yIGlzIGEgbW9uc3Rlci5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0UHJvYmFiaWxpdHlNb25zdGVyKHByb2JhYmlsaXR5ID0gMCkge1xuICAgICAgICB0aGlzLnByb2JhYmlsaXR5TW9uc3RlciA9IHByb2JhYmlsaXR5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBwcm9iYWJpbGl0eSB0aGlzIGZsb29yIGlzIGEgbW9uc3RlciBldm9sdmVkLlxuICAgICAqL1xuICAgIHB1YmxpYyBhZGRQcm9iYWJpbGl0eU1vbnN0ZXIocHJvYmFiaWxpdHkgPSAwKSB7XG4gICAgICAgIHRoaXMucHJvYmFiaWxpdHlNb25zdGVyICs9IHByb2JhYmlsaXR5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoYXQgaXMgdGhlIHByb2JhYmlsaXR5IHRoaXMgZmxvb3IgaXMgYSB0cmFwP1xuICAgICAqL1xuICAgIHB1YmxpYyBnZXRQcm9iYWJpbGl0eVRyYXAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2JhYmlsaXR5VHJhcDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHByb2JhYmlsaXR5IHRoaXMgZmxvb3IgaXMgYSB0cmFwLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRQcm9iYWJpbGl0eVRyYXAocHJvYmFiaWxpdHkgPSAwKSB7XG4gICAgICAgIHRoaXMucHJvYmFiaWxpdHlUcmFwID0gcHJvYmFiaWxpdHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHByb2JhYmlsaXR5IHRoaXMgZmxvb3IgaXMgYSB0cmFwIGV2b2x2ZWQuXG4gICAgICovXG4gICAgcHVibGljIGFkZFByb2JhYmlsaXR5VHJhcChwcm9iYWJpbGl0eSA9IDApIHtcbiAgICAgICAgdGhpcy5wcm9iYWJpbGl0eVRyYXAgKz0gcHJvYmFiaWxpdHk7XG4gICAgfVxuXG4gICAgcHVibGljIGtpbGxNb25zdGVyKCkge1xuICAgICAgICB0aGlzLm1vbnN0ZXIgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9IdG1sKGlzS25vd246IGJvb2xlYW4gPSB0cnVlLCBhZGRpdGlvbm5hbENsYXNzZXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIGxldCBjbGFzc2VzOiBzdHJpbmdbXSA9IFtcImZsb29yQ2FzZVwiXS5jb25jYXQoYWRkaXRpb25uYWxDbGFzc2VzKTtcblxuICAgICAgICBpZiAoaXNLbm93bikge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKFwidmlzaXRlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChcIndhckZvZ1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzVHJhcCgpKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJ0cmFwXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzR29hbCgpKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJnb2FsXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzTW9uc3RlcigpKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJtb25zdGVyXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzVHJlZSgpKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJ0cmVlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzVHJhcENsdWUoKSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKFwidHJhcENsdWVcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNNb25zdGVyQ2x1ZSgpKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJtb25zdGVyQ2x1ZVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIiR7Y2xhc3Nlcy5qb2luKFwiIFwiKX1cIj48L2Rpdj5gO1xuICAgIH1cbn1cbiIsImltcG9ydCB7ZW1wdHksIGdvYWwsIG1vbnN0ZXIsIHRyYXAsIHRyZWV9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IEZsb29yIGZyb20gXCIuL0Zsb29yXCI7XG5cbi8qKlxuICogQSBnbG9vbXkgZGFyayBmb3Jlc3QuIFRoZXJlIGFyZSBsb3RzIG9mIG1vbnN0ZXJzIGFuZCB0cmFwcyBoZXJlLiBCZSBjYXJlZnVsLCB3YW5kZXJlci4uLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3Jlc3Qge1xuICAgIHByaXZhdGUgZm9yZXN0OiBGbG9vcltdW10gPSBbXTtcbiAgICBwcml2YXRlIHdpZHRoOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgaGVpZ2h0OiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IodyA9IDMsIGggPSAzKSB7XG4gICAgICAgIHRoaXMud2lkdGggPSB3O1xuICAgICAgICB0aGlzLmhlaWdodCA9IGg7XG4gICAgfVxuXG4gICAgcHVibGljIHBvcHVsYXRlKG1heENoYW5jZXMgPSAyMCkge1xuICAgICAgICAvLyBTZXQgdGhlIG1vbnN0ZXJzIGFuZCB0cmFwc1xuICAgICAgICBsZXQgdG1wOiBGbG9vcltdW10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICB0bXBbeV0gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy53aWR0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG1wUmFuZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXhDaGFuY2VzIC0gMCkgKyAwKTtcblxuICAgICAgICAgICAgICAgIGlmICh0bXBSYW5kID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEl0J3MgYSBtb25zdGVyIVxuICAgICAgICAgICAgICAgICAgICB0bXBbeV1beF0gPSBuZXcgRmxvb3IobW9uc3Rlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0bXBSYW5kID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEl0J3MgYSB0cmFwIVxuICAgICAgICAgICAgICAgICAgICB0bXBbeV1beF0gPSBuZXcgRmxvb3IodHJhcCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdG1wW3ldW3hdID0gbmV3IEZsb29yKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb3Jlc3QgPSB0bXA7XG5cbiAgICAgICAgLy8gU2V0IHRoZSB3YXkgb3V0XG4gICAgICAgIGxldCBpc0FXYXlPdXQgPSBmYWxzZTtcbiAgICAgICAgbGV0IG91dFk7XG4gICAgICAgIGxldCBvdXRYO1xuICAgICAgICB3aGlsZSAoIWlzQVdheU91dCkge1xuICAgICAgICAgICAgb3V0WSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0aGlzLmZvcmVzdC5sZW5ndGggLSAwKSArIDApO1xuICAgICAgICAgICAgb3V0WCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0aGlzLmZvcmVzdFswXS5sZW5ndGggLSAwKSArIDApO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5mb3Jlc3Rbb3V0WV1bb3V0WF0uaXNFbXB0eSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9yZXN0W291dFldW291dFhdID0gbmV3IEZsb29yKGdvYWwpO1xuICAgICAgICAgICAgICAgIGlzQVdheU91dCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy53aWR0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGwgPSB0aGlzLmZvcmVzdFt5XVt4XTtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbC5pc01vbnN0ZXIoKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJdCdzIGEgbW9uc3RlciFcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDbHVlcyh5LCB4LCBtb25zdGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNlbGwuaXNUcmFwKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSXQncyBhIHRyYXAhXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q2x1ZXMoeSwgeCwgdHJhcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEZsb29yQ29udGVudCh5OiBudW1iZXIsIHg6IG51bWJlcik6IEZsb29yIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZXN0W3ldW3hdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRGb3Jlc3QoKTogRmxvb3JbXVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZXN0O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRXYXlPdXRQb3NpdGlvbigpIHtcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcmVzdFt5XVt4XS5pc0dvYWwoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge3gsIHl9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXROdW1iZXJPZkNhc2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3Jlc3QubGVuZ3RoICogdGhpcy5mb3Jlc3RbMF0ubGVuZ3RoO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0Q2x1ZXMoeTogbnVtYmVyLCB4OiBudW1iZXIsIGNvbnRlbnQ6IHN0cmluZykge1xuICAgICAgICBpZiAoeSAtIDEgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RbeSAtIDFdW3hdLnNldENsdWUoY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHkgKyAxIDwgdGhpcy5oZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0W3kgKyAxXVt4XS5zZXRDbHVlKGNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh4IC0gMSA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdFt5XVt4IC0gMV0uc2V0Q2x1ZShjb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeCArIDEgPCB0aGlzLndpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdFt5XVt4ICsgMV0uc2V0Q2x1ZShjb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IEZvcmVzdCBmcm9tIFwiLi9Gb3Jlc3RcIjtcbmltcG9ydCBXYW5kZXJlciBmcm9tIFwiLi9XYW5kZXJlclwiO1xuXG4vKipcbiAqIEl0J3MgYSBnYW1lIGZvciBldmVyeW9uZSwgZXhjZXB0IGZvciB0aGUgd2FuZGVyZXIuIFBvb3Igd2FuZGVyZXIuLi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG4gICAgcHJpdmF0ZSBjdXJyZW50Rm9yZXN0OiBGb3Jlc3Q7XG4gICAgcHJpdmF0ZSB3YW5kZXJlcjogV2FuZGVyZXI7XG4gICAgcHJpdmF0ZSBnYW1lRGl2OiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIHNjb3JlRGl2OiBIVE1MRWxlbWVudDtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihnYW1lRGl2OiBzdHJpbmcsIHNjb3JlRGl2OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5nYW1lRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZ2FtZURpdik7XG4gICAgICAgIHRoaXMuc2NvcmVEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzY29yZURpdik7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXQodyA9IDMsIGggPSAzKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlRm9yZXN0KHcsIGgpO1xuICAgICAgICB0aGlzLmdldEZvcmVzdCgpLnBvcHVsYXRlKCk7XG4gICAgICAgIHRoaXMuc2V0V2FuZGVyZXIoKTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy53YW5kZXJlci5pc0RlYWQoKSkge1xuICAgICAgICAgICAgYWxlcnQoJ1lvdSBkaWUuJyk7XG4gICAgICAgICAgICB0aGlzLndhbmRlcmVyLnNldFNjb3JlKC0oMTAgKiB0aGlzLmdldEZvcmVzdCgpLmdldE51bWJlck9mQ2FzZXMoKSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLndhbmRlcmVyLmlzT3V0KCkpIHtcbiAgICAgICAgICAgIC8vIFlvdSBqdXN0IHdvbiB0aGlzIGZvcmVzdCAhXG4gICAgICAgICAgICB0aGlzLndhbmRlcmVyLnNldFNjb3JlKDEwICogdGhpcy5nZXRGb3Jlc3QoKS5nZXROdW1iZXJPZkNhc2VzKCkpO1xuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBuZXh0IGxldmVsXG4gICAgICAgICAgICBjb25zdCBuZXdTaXplID0gdGhpcy5nZXRGb3Jlc3QoKS5nZXRGb3Jlc3QoKS5sZW5ndGggKyAxO1xuICAgICAgICAgICAgdGhpcy5pbml0KG5ld1NpemUsIG5ld1NpemUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFdhbmRlcmVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53YW5kZXJlcjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUZvcmVzdCh3ID0gMywgaCA9IDMpOiBHYW1lIHtcbiAgICAgICAgdGhpcy5jdXJyZW50Rm9yZXN0ID0gbmV3IEZvcmVzdCh3LCBoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRGb3Jlc3QoKTogRm9yZXN0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudEZvcmVzdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFdhbmRlcmVyKCk6IEdhbWUge1xuICAgICAgICBjb25zdCBmb3Jlc3QgPSB0aGlzLmN1cnJlbnRGb3Jlc3QuZ2V0Rm9yZXN0KCk7XG5cbiAgICAgICAgaWYgKCFmb3Jlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGlzT2sgPSBmYWxzZTtcbiAgICAgICAgbGV0IHk7XG4gICAgICAgIGxldCB4O1xuICAgICAgICB3aGlsZSAoIWlzT2spIHtcbiAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoZm9yZXN0Lmxlbmd0aCAtIDApICsgMCk7XG4gICAgICAgICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGZvcmVzdFswXS5sZW5ndGggLSAwKSArIDApO1xuXG4gICAgICAgICAgICBpZiAoZm9yZXN0W3ldW3hdLmlzRW1wdHkpIHtcbiAgICAgICAgICAgICAgICBpc09rID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgb2xkU2NvcmUgPSAwO1xuICAgICAgICBpZiAodGhpcy53YW5kZXJlcikge1xuICAgICAgICAgICAgb2xkU2NvcmUgPSB0aGlzLndhbmRlcmVyLmdldFNjb3JlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53YW5kZXJlciA9IG5ldyBXYW5kZXJlcih5LCB4LCB0aGlzLmN1cnJlbnRGb3Jlc3QsIG9sZFNjb3JlKTtcblxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBmb3Jlc3QgPSB0aGlzLmdldEZvcmVzdCgpLmdldEZvcmVzdCgpO1xuICAgICAgICBjb25zdCB3YW5kZXJlciA9IHRoaXMud2FuZGVyZXI7XG5cbiAgICAgICAgbGV0IGh0bWw6IHN0cmluZyA9IFwiXCI7XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmN1cnJlbnRGb3Jlc3QuZ2V0Rm9yZXN0KCkubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgICAgIGh0bWwgKz0gXCI8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlwiO1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmN1cnJlbnRGb3Jlc3QuZ2V0Rm9yZXN0KClbMF0ubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICAgICAgICBsZXQgd2FuZGVyZXJQb3MgPSB3YW5kZXJlci5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIGxldCBmbG9vciA9IHRoaXMuY3VycmVudEZvcmVzdC5nZXRGb3Jlc3QoKVt5XVt4XTtcbiAgICAgICAgICAgICAgICBsZXQgYWRkaXRpb25uYWxDbGFzc2VzID0gW107XG5cbiAgICAgICAgICAgICAgICBpZiAod2FuZGVyZXJQb3MueCA9PT0geCAmJiB3YW5kZXJlclBvcy55ID09PSB5KSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9ubmFsQ2xhc3Nlcy5wdXNoKFwid2FuZGVyZXJcIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaHRtbCArPSBmbG9vci50b0h0bWwodGhpcy53YW5kZXJlci5pc0tub3duKHksIHgpLCBhZGRpdGlvbm5hbENsYXNzZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaHRtbCArPSBcIjwvZGl2PlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nYW1lRGl2LmNsYXNzTmFtZSA9IFwiXCI7XG4gICAgICAgIHRoaXMuZ2FtZURpdi5jbGFzc0xpc3QuYWRkKGB3aWR0aCR7Zm9yZXN0Lmxlbmd0aH1gKTtcbiAgICAgICAgdGhpcy5nYW1lRGl2LmlubmVySFRNTCA9IGh0bWw7XG5cbiAgICAgICAgdGhpcy5zY29yZURpdi5pbm5lckhUTUwgPSB3YW5kZXJlci5nZXRTY29yZSgpLnRvU3RyaW5nKCk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgRmxvb3IgZnJvbSBcIi4vRmxvb3JcIjtcbmltcG9ydCBGb3Jlc3QgZnJvbSBcIi4vRm9yZXN0XCI7XG5pbXBvcnQgXCJqc3Byb2xvZ1wiO1xuXG4vKipcbiAqIFRoZSB3YW5kZXJlciwgdGhlIGhlcm8gb2YgdGhpcyBxdWVzdC4gR29vZCBsdWNrIHNvbi4uLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYW5kZXJlciB7XG4gICAgcHJpdmF0ZSBmb3Jlc3Q6IEZvcmVzdDtcbiAgICBwcml2YXRlIGZvcmVzdE1hcFdpZHRoOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBmb3Jlc3RNYXBIZWlnaHQ6IG51bWJlcjtcbiAgICBwcml2YXRlIGZvcmVzdE1hcDogRmxvb3JbXVtdID0gW107XG4gICAgcHJpdmF0ZSB5OiBudW1iZXI7XG4gICAgcHJpdmF0ZSB4OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBzY29yZTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IocGxheWVyWTogbnVtYmVyLCBwbGF5ZXJYOiBudW1iZXIsIGRhcmtXb29kczogRm9yZXN0LCBzY29yZTogbnVtYmVyID0gMCkge1xuICAgICAgICB0aGlzLmZvcmVzdCA9IGRhcmtXb29kcztcbiAgICAgICAgdGhpcy5zY29yZSA9IHNjb3JlO1xuICAgICAgICB0aGlzLnggPSBwbGF5ZXJYO1xuICAgICAgICB0aGlzLnkgPSBwbGF5ZXJZO1xuXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IGRhcmtXb29kcy5nZXRGb3Jlc3QoKS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gZGFya1dvb2RzLmdldEZvcmVzdCgpWzBdLmxlbmd0aDtcblxuICAgICAgICB0aGlzLmZvcmVzdE1hcEhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5mb3Jlc3RNYXBXaWR0aCA9IHdpZHRoO1xuXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3ldID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHdpZHRoOyB4KyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt5XVt4XSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TWFwSGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3Jlc3RNYXAubGVuZ3RoO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNYXBXaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZXN0TWFwWzBdLmxlbmd0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNLbm93bih5OiBudW1iZXIsIHg6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3Jlc3RNYXBbeV1beF0gIT09IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEZvcmVzdChmb3Jlc3Q6IEZvcmVzdCkge1xuICAgICAgICB0aGlzLmZvcmVzdCA9IGZvcmVzdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0UG9zaXRpb24oeTogbnVtYmVyLCB4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UG9zaXRpb24oKSB7XG4gICAgICAgIHJldHVybiB7eDogdGhpcy54LCB5OiB0aGlzLnl9O1xuICAgIH1cblxuICAgIHB1YmxpYyB0b0h0bWwoKSB7XG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cImZsb29yQ2FzZSB3YW5kZXJlclwiPjwvZGl2PmA7XG4gICAgfVxuXG4gICAgcHVibGljIHBlcmNlaXZlKCkge1xuICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5mb3Jlc3QuZ2V0Rmxvb3JDb250ZW50KHRoaXMueSwgdGhpcy54KTtcbiAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnhdID0gY29udGVudDtcblxuICAgICAgICBsZXQgbW9uc3RlckNsdWUgPSBmYWxzZTtcbiAgICAgICAgbGV0IHRyYXBDbHVlID0gZmFsc2U7XG4gICAgICAgIGxldCBudW1iZXJBZGphY2VudFZpc2l0ZWQgPSB0aGlzLm51bWJlckFkamFjZW50VmlzaXRlZCh0aGlzLnksIHRoaXMueCk7XG4gICAgICAgIGxldCBwcm9iYWJpbGl0eSA9IDA7XG4gICAgICAgIGlmIChudW1iZXJBZGphY2VudFZpc2l0ZWQgPCA0KSB7XG4gICAgICAgICAgICBwcm9iYWJpbGl0eSA9IDEgLyAoIDQgLSBudW1iZXJBZGphY2VudFZpc2l0ZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnhdID0gdGhpcy5mb3Jlc3QuZ2V0Rmxvb3JDb250ZW50KHRoaXMueSwgdGhpcy54KTtcbiAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55ICsgMV1bdGhpcy54XSA9IHRoaXMuZm9yZXN0LmdldEZsb29yQ29udGVudCh0aGlzLnkgKyAxLCB0aGlzLngpO1xuICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnkgLSAxXVt0aGlzLnhdID0gdGhpcy5mb3Jlc3QuZ2V0Rmxvb3JDb250ZW50KHRoaXMueSAtIDEsIHRoaXMueCk7XG4gICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54ICsgMV0gPSB0aGlzLmZvcmVzdC5nZXRGbG9vckNvbnRlbnQodGhpcy55LCB0aGlzLnggKyAxKTtcbiAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggLSAxXSA9IHRoaXMuZm9yZXN0LmdldEZsb29yQ29udGVudCh0aGlzLnksIHRoaXMueCAtIDEpO1xuXG4gICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54XS5pc1Zpc2l0ZWQgPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54XS5pc01vbnN0ZXJDbHVlKCkpIHtcbiAgICAgICAgICAgIG1vbnN0ZXJDbHVlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnhdLmlzVHJhcENsdWUoKSkge1xuICAgICAgICAgICAgdHJhcENsdWUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmluZCBhZGphY2VudCBmbG9vcnNcbiAgICAgICAgaWYgKCF0aGlzLmZvcmVzdE1hcFt0aGlzLnkgKyAxXVt0aGlzLnhdLmlzVHJlZSgpICYmICF0aGlzLmZvcmVzdE1hcFt0aGlzLnkgKyAxXVt0aGlzLnhdLmlzVmlzaXRlZCkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55ICsgMV1bdGhpcy54XS5pc0FjY2Vzc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKG1vbnN0ZXJDbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55ICsgMV1bdGhpcy54XS5hZGRQcm9iYWJpbGl0eU1vbnN0ZXIocHJvYmFiaWxpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRyYXBDbHVlKSB7XG4gICAgICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnkgKyAxXVt0aGlzLnhdLmFkZFByb2JhYmlsaXR5VHJhcChwcm9iYWJpbGl0eSk7IFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5mb3Jlc3RNYXBbdGhpcy55IC0gMV1bdGhpcy54XS5pc1RyZWUoKSAmJiAhdGhpcy5mb3Jlc3RNYXBbdGhpcy55IC0gMV1bdGhpcy54XS5pc1Zpc2l0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueSAtIDFdW3RoaXMueF0uaXNBY2Nlc3NpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChtb25zdGVyQ2x1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueSAtIDFdW3RoaXMueF0uYWRkUHJvYmFiaWxpdHlNb25zdGVyKHByb2JhYmlsaXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0cmFwQ2x1ZSkge1xuICAgICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55IC0gMV1bdGhpcy54XS5hZGRQcm9iYWJpbGl0eVRyYXAocHJvYmFiaWxpdHkpOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54ICsgMV0uaXNUcmVlKCkgJiYgIXRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54ICsgMV0uaXNWaXNpdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueCArIDFdLmlzQWNjZXNzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICBpZiAobW9uc3RlckNsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueCArIDFdLmFkZFByb2JhYmlsaXR5TW9uc3Rlcihwcm9iYWJpbGl0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHJhcENsdWUpIHtcbiAgICAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54ICsgMV0uYWRkUHJvYmFiaWxpdHlUcmFwKHByb2JhYmlsaXR5KTsgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueCAtIDFdLmlzVHJlZSgpICYmICF0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueCAtIDFdLmlzVmlzaXRlZCkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggLSAxXS5pc0FjY2Vzc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKG1vbnN0ZXJDbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggLSAxXS5hZGRQcm9iYWJpbGl0eU1vbnN0ZXIocHJvYmFiaWxpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRyYXBDbHVlKSB7XG4gICAgICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueCAtIDFdLmFkZFByb2JhYmlsaXR5VHJhcChwcm9iYWJpbGl0eSk7IFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIHRoaW5rKCkge1xuICAgICAgICBsZXQgdGhpc0Zsb29yID0gdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnhdO1xuICAgICAgICBcbiAgICAgICAgLy8gSGVyZSBnb2VzIGFsbCB0aGUgbG9naWNhbCBzdHVmZlxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIG1vdmUoZGlyZWN0aW9uOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRQb3MgPSB0aGlzLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIGxldCBuZXdWYWw7XG5cbiAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgICAgICAgICAgbmV3VmFsID0gY3VycmVudFBvcy54IC0gMTtcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsID49IDApIHsgdGhpcy54ID0gbmV3VmFsOyB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgICAgICAgICBuZXdWYWwgPSBjdXJyZW50UG9zLnggKyAxO1xuICAgICAgICAgICAgICAgIGlmIChuZXdWYWwgPCB0aGlzLmZvcmVzdE1hcFdpZHRoKSB7IHRoaXMueCA9IG5ld1ZhbDsgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInVwXCI6XG4gICAgICAgICAgICAgICAgbmV3VmFsID0gY3VycmVudFBvcy55IC0gMTtcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsID49IDApIHsgdGhpcy55ID0gbmV3VmFsOyB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZG93blwiOlxuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IGN1cnJlbnRQb3MueSArIDE7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbCA8IHRoaXMuZm9yZXN0TWFwSGVpZ2h0KSB7IHRoaXMueSA9IG5ld1ZhbDsgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U2NvcmUoLTEwKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgbnVtYmVyQWRqYWNlbnRWaXNpdGVkKHk6IG51bWJlciwgeDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBudW1iZXIgPSAwO1xuICAgICAgICBpZiAoIXRoaXMuZm9yZXN0TWFwW3RoaXMueSArIDFdW3RoaXMueF0uaXNUcmVlKCkgJiYgdGhpcy5mb3Jlc3RNYXBbdGhpcy55ICsgMV1bdGhpcy54XS5pc1Zpc2l0ZWQpIHtcbiAgICAgICAgICAgIG51bWJlciArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5mb3Jlc3RNYXBbdGhpcy55IC0gMV1bdGhpcy54XS5pc1RyZWUoKSAmJiB0aGlzLmZvcmVzdE1hcFt0aGlzLnkgLSAxXVt0aGlzLnhdLmlzVmlzaXRlZCkge1xuICAgICAgICAgICAgbnVtYmVyICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueCArIDFdLmlzVHJlZSgpICYmIHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54ICsgMV0uaXNWaXNpdGVkKSB7XG4gICAgICAgICAgICBudW1iZXIgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54IC0gMV0uaXNUcmVlKCkgJiYgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggLSAxXS5pc1Zpc2l0ZWQpIHtcbiAgICAgICAgICAgIG51bWJlciArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudW1iZXI7XG4gICAgfVxuXG4gICAgcHVibGljIHVzZVNsaW5nc2hvdCh5OiBudW1iZXIsIHg6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5mb3Jlc3QuZ2V0Rmxvb3JDb250ZW50KHksIHgpLmlzTW9uc3RlcigpKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdC5nZXRGbG9vckNvbnRlbnQoeSwgeCkua2lsbE1vbnN0ZXIoKTtcbiAgICAgICAgICAgIC8vIEB0b2RvIENhbGwgYW5pbWF0aW9uXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNPdXQoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHdheU91dFBvc2l0aW9uID0gdGhpcy5mb3Jlc3QuZ2V0V2F5T3V0UG9zaXRpb24oKTtcblxuICAgICAgICBpZiAodGhpcy54ID09PSB3YXlPdXRQb3NpdGlvbi54ICYmIHRoaXMueSA9PT0gd2F5T3V0UG9zaXRpb24ueSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNEZWFkKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5wZXJjZWl2ZSgpLmlzVHJhcCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTY29yZSh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNjb3JlICs9IHZhbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2NvcmUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcmU7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IHRyYXAgPSBcInRyYXBcIjtcbmV4cG9ydCBjb25zdCBlbXB0eSA9IFwiXCI7XG5leHBvcnQgY29uc3QgZ29hbCA9IFwiZ29hbFwiO1xuZXhwb3J0IGNvbnN0IG1vbnN0ZXIgPSBcIm1vbnN0ZXJcIjtcbmV4cG9ydCBjb25zdCB0cmVlID0gXCJ0cmVlXCI7XG4iLCJpbXBvcnQgKiBhcyAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCAqIGFzIGpzYm9hcmQgZnJvbSBcIi4vRm9yZXN0XCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9HYW1lXCI7XG5cbmxldCBnID0gbmV3IEdhbWUoXCJnYW1lRGl2XCIsIFwic2NvcmVEaXZcIik7XG5nLmluaXQoMywgMyk7XG5nLnVwZGF0ZSgpO1xuXG4vLyBJbml0IG1hbnVhbCBnYW1lXG5kb2N1bWVudC5vbmtleWRvd24gPSAoZSkgPT4ge1xuICAgIGxldCBhcnJvd0tleUhhdmVCZWVuUHJlc3NlZCA9IGZhbHNlO1xuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgICBnLmdldFdhbmRlcmVyKCkubW92ZShcImxlZnRcIik7XG4gICAgICAgICAgICBhcnJvd0tleUhhdmVCZWVuUHJlc3NlZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgIGcuZ2V0V2FuZGVyZXIoKS5tb3ZlKFwidXBcIik7XG4gICAgICAgICAgICBhcnJvd0tleUhhdmVCZWVuUHJlc3NlZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgIGcuZ2V0V2FuZGVyZXIoKS5tb3ZlKFwicmlnaHRcIik7XG4gICAgICAgICAgICBhcnJvd0tleUhhdmVCZWVuUHJlc3NlZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgIGcuZ2V0V2FuZGVyZXIoKS5tb3ZlKFwiZG93blwiKTtcbiAgICAgICAgICAgIGFycm93S2V5SGF2ZUJlZW5QcmVzc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGFycm93S2V5SGF2ZUJlZW5QcmVzc2VkKSB7XG4gICAgICAgIGcudXBkYXRlKCk7XG4gICAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgQVNUID0gcmVxdWlyZSgnLi9wcm9sb2dBU1QnKTtcclxudmFyIFBhcnNlciA9IHJlcXVpcmUoJy4vcHJvbG9nUGFyc2VyJyk7XHJcbnZhciBTb2x2ZXIgPSByZXF1aXJlKCcuL3Byb2xvZ1NvbHZlcicpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IHsgQVNUOiBBU1QsIFBhcnNlcjogUGFyc2VyLCBTb2x2ZXI6IFNvbHZlciB9O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufTtcclxuKGZ1bmN0aW9uIChQYXJ0VHlwZSkge1xyXG4gICAgUGFydFR5cGVbUGFydFR5cGVbXCJWYXJpYWJsZVwiXSA9IDBdID0gXCJWYXJpYWJsZVwiO1xyXG4gICAgUGFydFR5cGVbUGFydFR5cGVbXCJBdG9tXCJdID0gMV0gPSBcIkF0b21cIjtcclxuICAgIFBhcnRUeXBlW1BhcnRUeXBlW1wiVGVybVwiXSA9IDJdID0gXCJUZXJtXCI7XHJcbn0pKGV4cG9ydHMuUGFydFR5cGUgfHwgKGV4cG9ydHMuUGFydFR5cGUgPSB7fSkpO1xyXG52YXIgUGFydFR5cGUgPSBleHBvcnRzLlBhcnRUeXBlO1xyXG52YXIgUGFydCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIEBjbGFzcyBQYXJ0XHJcbiAgICAgKiBAY2xhc3NkZXNjIFBhcnQgOj0gVmFyaWFibGUobmFtZSkgfCBBdG9tKG5hbWUpIHwgVGVybShuYW1lLCBwYXJ0bGlzdClcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIE5hbWUgb2YgdGhlIHZhcmlhYmxlL2F0b20vdGVybVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBQYXJ0KG5hbWUpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgfVxyXG4gICAgUGFydC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUGFydDtcclxufSgpKTtcclxuZXhwb3J0cy5QYXJ0ID0gUGFydDtcclxudmFyIFZhcmlhYmxlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhWYXJpYWJsZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFZhcmlhYmxlKG5hbWUpIHtcclxuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCBuYW1lKTtcclxuICAgIH1cclxuICAgIHJldHVybiBWYXJpYWJsZTtcclxufShQYXJ0KSk7XHJcbmV4cG9ydHMuVmFyaWFibGUgPSBWYXJpYWJsZTtcclxuVmFyaWFibGUucHJvdG90eXBlLnR5cGUgPSBQYXJ0VHlwZS5WYXJpYWJsZTsgLy8gVE9ETzogIHZlcmlmeSBpZiBpdCdzIGZhc3RlciB0aGFuIGluc3RhbmNlb2YgY2hlY2tzXHJcbnZhciBBdG9tID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhBdG9tLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gQXRvbShoZWFkKSB7XHJcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgaGVhZCk7XHJcbiAgICB9XHJcbiAgICBBdG9tLk5pbCA9IG5ldyBBdG9tKG51bGwpO1xyXG4gICAgcmV0dXJuIEF0b207XHJcbn0oUGFydCkpO1xyXG5leHBvcnRzLkF0b20gPSBBdG9tO1xyXG5BdG9tLnByb3RvdHlwZS50eXBlID0gUGFydFR5cGUuQXRvbTsgLy8gVE9ETzogIHZlcmlmeSBpZiBpdCdzIGZhc3RlciB0aGFuIGluc3RhbmNlb2YgY2hlY2tzXHJcbi8qKlxyXG4gKiBUZXJtKG5hbWUsIGxpc3QpXHJcbiAqL1xyXG52YXIgVGVybSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoVGVybSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFRlcm0oaGVhZCwgbGlzdCkge1xyXG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIGhlYWQpO1xyXG4gICAgICAgIHRoaXMucGFydGxpc3QgPSBuZXcgUGFydGxpc3QobGlzdCk7XHJcbiAgICB9XHJcbiAgICBUZXJtLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gXCJcIjtcclxuICAgICAgICBpZiAodGhpcy5uYW1lID09IFwiY29uc1wiKSB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gdGhpcztcclxuICAgICAgICAgICAgd2hpbGUgKHggaW5zdGFuY2VvZiBUZXJtICYmIHgubmFtZSA9PSBcImNvbnNcIiAmJiB4LnBhcnRsaXN0Lmxpc3QubGVuZ3RoID09IDIpIHtcclxuICAgICAgICAgICAgICAgIHggPSB4LnBhcnRsaXN0Lmxpc3RbMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCh4ID09PSBBdG9tLk5pbCkgfHwgeCBpbnN0YW5jZW9mIFZhcmlhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICB4ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIltcIjtcclxuICAgICAgICAgICAgICAgIHZhciBjb20gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHdoaWxlICh4LnR5cGUgPT0gUGFydFR5cGUuVGVybSAmJiB4Lm5hbWUgPT0gXCJjb25zXCIgJiYgeC5wYXJ0bGlzdC5saXN0Lmxlbmd0aCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCIsIFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0geC5wYXJ0bGlzdC5saXN0WzBdLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB4ID0geC5wYXJ0bGlzdC5saXN0WzFdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHgudHlwZSA9PSBQYXJ0VHlwZS5WYXJpYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIiB8IFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiXVwiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIkVSUk9SOiB1bmV4cGVjdGVkIGF0b206IFwiICsgeC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc3VsdCArPSB0aGlzLm5hbWUgKyBcIihcIiArIHRoaXMucGFydGxpc3QudG9TdHJpbmcoKSArIFwiKVwiO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG4gICAgO1xyXG4gICAgcmV0dXJuIFRlcm07XHJcbn0oUGFydCkpO1xyXG5leHBvcnRzLlRlcm0gPSBUZXJtO1xyXG5UZXJtLnByb3RvdHlwZS50eXBlID0gUGFydFR5cGUuVGVybTsgLy8gVE9ETzogIHZlcmlmeSBpZiBpdCdzIGZhc3RlciB0aGFuIGluc3RhbmNlb2YgY2hlY2tzXHJcbnZhciBQYXJ0bGlzdCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBQYXJ0bGlzdChsaXN0KSB7XHJcbiAgICAgICAgdGhpcy5saXN0ID0gbGlzdDtcclxuICAgIH1cclxuICAgIFBhcnRsaXN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0Lm1hcChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS50b1N0cmluZygpOyB9KS5qb2luKFwiLCBcIik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFBhcnRsaXN0O1xyXG59KCkpO1xyXG5leHBvcnRzLlBhcnRsaXN0ID0gUGFydGxpc3Q7XHJcbi8qKlxyXG4gKiBSdWxlKGhlYWQsIGJvZHlsaXN0KTogUGFydChoZWFkKSwgWzotIEJvZHkoYm9keWxpc3QpXS5cclxuICovXHJcbnZhciBSdWxlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFJ1bGUoaGVhZCwgYm9keWxpc3QpIHtcclxuICAgICAgICB0aGlzLmhlYWQgPSBoZWFkO1xyXG4gICAgICAgIHRoaXMuYm9keSA9IGJvZHlsaXN0ICYmIG5ldyBQYXJ0bGlzdChib2R5bGlzdCk7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUnVsZS5wcm90b3R5cGUsIFwiaXNGYWN0XCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICF0aGlzLmJvZHk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBSdWxlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZWFkLnRvU3RyaW5nKCkgKyAodGhpcy5ib2R5ID8gXCIgOi0gXCIgKyB0aGlzLmJvZHkudG9TdHJpbmcoKSArIFwiLlwiIDogXCIuXCIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBSdWxlO1xyXG59KCkpO1xyXG5leHBvcnRzLlJ1bGUgPSBSdWxlO1xyXG5mdW5jdGlvbiBsaXN0T2ZBcnJheShhcnJheSwgY2RyKSB7XHJcbiAgICBjZHIgPSBjZHIgfHwgQXRvbS5OaWw7XHJcbiAgICBmb3IgKHZhciBpID0gYXJyYXkubGVuZ3RoLCBjYXI7IGNhciA9IGFycmF5Wy0taV07KSB7XHJcbiAgICAgICAgY2RyID0gbmV3IFRlcm0oXCJjb25zXCIsIFtjYXIsIGNkcl0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNkcjtcclxufVxyXG5leHBvcnRzLmxpc3RPZkFycmF5ID0gbGlzdE9mQXJyYXk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgcHJvbG9nQVNUXzEgPSByZXF1aXJlKCcuL3Byb2xvZ0FTVCcpO1xyXG4vKipcclxuICogUGFyc2VzIHRoZSBEQlxyXG4gKi9cclxuZnVuY3Rpb24gcGFyc2Uoc3RyaW5nKSB7XHJcbiAgICB2YXIgdGsgPSBuZXcgVG9rZW5pc2VyKHN0cmluZyksIHJ1bGVzID0gW107XHJcbiAgICB3aGlsZSAodGsuY3VycmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgcnVsZXMucHVzaChwYXJzZVJ1bGUodGspKTtcclxuICAgIH1cclxuICAgIHJldHVybiBydWxlcztcclxufVxyXG5leHBvcnRzLnBhcnNlID0gcGFyc2U7XHJcbmZ1bmN0aW9uIHBhcnNlUXVlcnkoc3RyaW5nKSB7XHJcbiAgICB2YXIgdGsgPSBuZXcgVG9rZW5pc2VyKHN0cmluZyk7XHJcbiAgICByZXR1cm4gbmV3IHByb2xvZ0FTVF8xLlBhcnRsaXN0KHBhcnNlQm9keSh0aykpO1xyXG59XHJcbmV4cG9ydHMucGFyc2VRdWVyeSA9IHBhcnNlUXVlcnk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0geyBwYXJzZTogcGFyc2UsIHBhcnNlUXVlcnk6IHBhcnNlUXVlcnkgfTtcclxudmFyIHRva2VuaXplclJ1bGVzID0gW1xyXG4gICAgWy9eKFtcXChcXClcXC4sXFxbXFxdXFx8XXxcXDpcXC0pLywgMCAvKiBQdW5jICovXSxcclxuICAgIFsvXihbQS1aX11bYS16QS1aMC05X10qKS8sIDEgLyogVmFyICovXSxcclxuICAgIFsvXihcIlteXCJdKlwiKS8sIDIgLyogSWQgKi9dLFxyXG4gICAgWy9eKFthLXpdW2EtekEtWjAtOV9dKikvLCAyIC8qIElkICovXSxcclxuICAgIFsvXigtP1xcZCsoXFwuXFxkKyk/KS8sIDIgLyogSWQgKi8sIGZ1bmN0aW9uICh4KSB7IHJldHVybiAreDsgfV0sXHJcbiAgICBbL14oXFwrfFxcLXxcXCp8XFwvfFxcPXxcXCEpLywgMiAvKiBJZCAqL11cclxuXTtcclxudmFyIFRva2VuaXNlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBUb2tlbmlzZXIoc291cmNlKSB7XHJcbiAgICAgICAgdGhpcy5yZW1haW5kZXIgPSBzb3VyY2U7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnR5cGUgPSBudWxsOyAvLyBcImVvZlwiLCBUb2tlblR5cGUuSWQsIFRva2VuVHlwZS5WYXIsIFRva2VuVHlwZS5QdW5jIGV0Yy4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY29uc3VtZSgpOyAvLyBMb2FkIHVwIHRoZSBmaXJzdCB0b2tlbi5cclxuICAgIH1cclxuICAgIFRva2VuaXNlci5wcm90b3R5cGUuY29uc3VtZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy50eXBlID09IDMgLyogRU9GICovKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gRWF0IGFueSBsZWFkaW5nIFdTIGFuZCAlLXN0eWxlIGNvbW1lbnRzXHJcbiAgICAgICAgdmFyIHIgPSB0aGlzLnJlbWFpbmRlci5tYXRjaCgvXihcXHMrfChbJV0uKilbXFxuXFxyXSspKi8pO1xyXG4gICAgICAgIGlmIChyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtYWluZGVyID0gdGhpcy5yZW1haW5kZXIuc3Vic3RyaW5nKHJbMF0ubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLnJlbWFpbmRlci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy50eXBlID0gMyAvKiBFT0YgKi87XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHJ1bGU7IHJ1bGUgPSB0b2tlbml6ZXJSdWxlc1tpKytdOykge1xyXG4gICAgICAgICAgICBpZiAociA9IHRoaXMucmVtYWluZGVyLm1hdGNoKHJ1bGVbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbWFpbmRlciA9IHRoaXMucmVtYWluZGVyLnN1YnN0cmluZyhyWzBdLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPSBydWxlWzFdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gdHlwZW9mIChydWxlWzJdKSA9PT0gXCJmdW5jdGlvblwiID8gcnVsZVsyXShyWzFdKSA6IHJbMV07XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgXCJVbmV4cGVjdGVkIHRva2VuaXplciBpbnB1dFwiO1xyXG4gICAgfTtcclxuICAgIFRva2VuaXNlci5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24gKHR5cGUsIHN5bWJvbCkge1xyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IHR5cGUgJiYgKHR5cGVvZiAoc3ltYm9sKSA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0aGlzLmN1cnJlbnQgPT09IHN5bWJvbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5hY2NlcHRlZCA9IHRoaXMuY3VycmVudDtcclxuICAgICAgICAgICAgdGhpcy5jb25zdW1lKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgVG9rZW5pc2VyLnByb3RvdHlwZS5leHBlY3QgPSBmdW5jdGlvbiAodHlwZSwgc3ltYm9sKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmFjY2VwdCh0eXBlLCBzeW1ib2wpKSB7XHJcbiAgICAgICAgICAgIHRocm93IHRoaXMudHlwZSA9PT0gMyAvKiBFT0YgKi8gPyBcIlN5bnRheCBlcnJvcjogdW5leHBlY3RlZCBlbmQgb2YgZmlsZVwiIDogXCJTeW50YXggZXJyb3I6IHVuZXhwZWN0ZWQgdG9rZW4gXCIgKyB0aGlzLmN1cnJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlOyAvLyBUT0RPOiBubyBuZWVkIGZvciBib29sZWFuP1xyXG4gICAgfTtcclxuICAgIHJldHVybiBUb2tlbmlzZXI7XHJcbn0oKSk7XHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuZnVuY3Rpb24gcGFyc2VSdWxlKHRrKSB7XHJcbiAgICAvLyBSdWxlIDo9IFRlcm0gLiB8IFRlcm0gOi0gUGFydExpc3QgLlxyXG4gICAgdmFyIGggPSBwYXJzZVRlcm0odGspO1xyXG4gICAgaWYgKHRrLmFjY2VwdCgwIC8qIFB1bmMgKi8sIFwiLlwiKSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgcHJvbG9nQVNUXzEuUnVsZShoKTtcclxuICAgIH1cclxuICAgIHRrLmV4cGVjdCgwIC8qIFB1bmMgKi8sIFwiOi1cIik7XHJcbiAgICB2YXIgYiA9IHBhcnNlQm9keSh0ayk7XHJcbiAgICByZXR1cm4gbmV3IHByb2xvZ0FTVF8xLlJ1bGUoaCwgYik7XHJcbn1cclxuZnVuY3Rpb24gcGFyc2VUZXJtKHRrKSB7XHJcbiAgICB0ay5leHBlY3QoMiAvKiBJZCAqLyk7XHJcbiAgICB2YXIgbmFtZSA9IHRrLmFjY2VwdGVkO1xyXG4gICAgLy8gYWNjZXB0IGZhaWwgYW5kICEgdy9vICgpXHJcbiAgICBpZiAodGsuY3VycmVudCAhPSBcIihcIiAmJiAobmFtZSA9PSBcImZhaWxcIiB8fCBuYW1lID09PSBcIiFcIikpIHtcclxuICAgICAgICByZXR1cm4gbmV3IHByb2xvZ0FTVF8xLlRlcm0obmFtZSwgW10pO1xyXG4gICAgfVxyXG4gICAgdGsuZXhwZWN0KDAgLyogUHVuYyAqLywgXCIoXCIpO1xyXG4gICAgdmFyIHAgPSBbXTtcclxuICAgIHdoaWxlICh0ay5jdXJyZW50ICE9PSBcImVvZlwiKSB7XHJcbiAgICAgICAgcC5wdXNoKHBhcnNlUGFydCh0aykpO1xyXG4gICAgICAgIGlmICh0ay5hY2NlcHQoMCAvKiBQdW5jICovLCBcIilcIikpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRrLmV4cGVjdCgwIC8qIFB1bmMgKi8sIFwiLFwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgcHJvbG9nQVNUXzEuVGVybShuYW1lLCBwKTtcclxufVxyXG5mdW5jdGlvbiBwYXJzZVBhcnQodGspIHtcclxuICAgIC8vIFBhcnQgLT4gdmFyIHwgaWQgfCBpZChvcHRQYXJhbUxpc3QpXHJcbiAgICAvLyBQYXJ0IC0+IFsgbGlzdEJpdCBdIDo6LT4gY29ucyguLi4pXHJcbiAgICBpZiAodGsuYWNjZXB0KDEgLyogVmFyICovKSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgcHJvbG9nQVNUXzEuVmFyaWFibGUodGsuYWNjZXB0ZWQpO1xyXG4gICAgfVxyXG4gICAgLy8gUGFyc2UgYSBsaXN0IChzeW50YWN0aWMgc3VnYXIgZ29lcyBoZXJlKVxyXG4gICAgaWYgKHRrLmFjY2VwdCgwIC8qIFB1bmMgKi8sIFwiW1wiKSkge1xyXG4gICAgICAgIHJldHVybiBwYXJzZUxpc3QodGspO1xyXG4gICAgfVxyXG4gICAgdGsuZXhwZWN0KDIgLyogSWQgKi8pO1xyXG4gICAgdmFyIG5hbWUgPSB0ay5hY2NlcHRlZDtcclxuICAgIGlmICghdGsuYWNjZXB0KDAgLyogUHVuYyAqLywgXCIoXCIpKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBwcm9sb2dBU1RfMS5BdG9tKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgdmFyIHAgPSBbXTtcclxuICAgIHdoaWxlICh0ay50eXBlICE9PSAzIC8qIEVPRiAqLykge1xyXG4gICAgICAgIHAucHVzaChwYXJzZVBhcnQodGspKTtcclxuICAgICAgICBpZiAodGsuYWNjZXB0KDAgLyogUHVuYyAqLywgXCIpXCIpKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0ay5leHBlY3QoMCAvKiBQdW5jICovLCBcIixcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IHByb2xvZ0FTVF8xLlRlcm0obmFtZSwgcCk7XHJcbn1cclxuZnVuY3Rpb24gcGFyc2VMaXN0KHRrKSB7XHJcbiAgICAvLyBlbXB0eSBsaXN0XHJcbiAgICBpZiAodGsuYWNjZXB0KDAgLyogUHVuYyAqLywgXCJdXCIpKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb2xvZ0FTVF8xLkF0b20uTmlsO1xyXG4gICAgfVxyXG4gICAgLy8gR2V0IGEgbGlzdCBvZiBwYXJ0cyBpbnRvIGxcclxuICAgIHZhciBsID0gW107XHJcbiAgICB3aGlsZSAodGsuY3VycmVudCAhPT0gXCJlb2ZcIikge1xyXG4gICAgICAgIGwucHVzaChwYXJzZVBhcnQodGspKTtcclxuICAgICAgICBpZiAoIXRrLmFjY2VwdCgwIC8qIFB1bmMgKi8sIFwiLFwiKSkge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBGaW5kIHRoZSBlbmQgb2YgdGhlIGxpc3QgLi4uIFwifCBWYXIgXVwiIG9yIFwiXVwiLlxyXG4gICAgdmFyIGFwcGVuZDtcclxuICAgIGlmICh0ay5hY2NlcHQoMCAvKiBQdW5jICovLCBcInxcIikpIHtcclxuICAgICAgICB0ay5leHBlY3QoMSAvKiBWYXIgKi8pO1xyXG4gICAgICAgIGFwcGVuZCA9IG5ldyBwcm9sb2dBU1RfMS5WYXJpYWJsZSh0ay5hY2NlcHRlZCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBhcHBlbmQgPSBwcm9sb2dBU1RfMS5BdG9tLk5pbDtcclxuICAgIH1cclxuICAgIHRrLmV4cGVjdCgwIC8qIFB1bmMgKi8sIFwiXVwiKTtcclxuICAgIC8vLy8gQ29uc3RydWN0IGxpc3RcclxuICAgIC8vZm9yICh2YXIgaSA9IGwubGVuZ3RoOyBpLS07KSB7XHJcbiAgICAvLyAgICBhcHBlbmQgPSBuZXcgVGVybShcImNvbnNcIiwgW2xbaV0sIGFwcGVuZF0pO1xyXG4gICAgLy99XHJcbiAgICByZXR1cm4gcHJvbG9nQVNUXzEubGlzdE9mQXJyYXkobCwgYXBwZW5kKTtcclxufVxyXG5mdW5jdGlvbiBwYXJzZUJvZHkodGspIHtcclxuICAgIHZhciB0ZXJtcyA9IFtdO1xyXG4gICAgd2hpbGUgKHRrLmN1cnJlbnQgIT09IFwiZW9mXCIpIHtcclxuICAgICAgICB0ZXJtcy5wdXNoKHBhcnNlVGVybSh0aykpO1xyXG4gICAgICAgIGlmICh0ay5hY2NlcHQoMCAvKiBQdW5jICovLCBcIi5cIikpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0ay5leHBlY3QoMCAvKiBQdW5jICovLCBcIixcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRlcm1zO1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgcHJvbG9nQVNUXzEgPSByZXF1aXJlKCcuL3Byb2xvZ0FTVCcpO1xyXG5leHBvcnRzLm9wdGlvbnMgPSB7XHJcbiAgICBtYXhJdGVyYXRpb25zOiBudWxsLFxyXG4gICAgZXhwZXJpbWVudGFsOiB7XHJcbiAgICAgICAgdGFpbFJlY3Vyc2lvbjogZmFsc2VcclxuICAgIH1cclxufTtcclxuLyoqXHJcbiAqIGV4ZWN1dGVzIGEgcXVlcnkgYWdhaW5zIHRoZSBkYXRhYmFzZVxyXG4gKiBAcGFyYW0gZGIgY29tcGlsZWQgcnVsZSBkYXRhYmFzZVxyXG4gKiBAcGFyYW0gcXVlcnkgY29tcGlsZWQgcXVlcnlcclxuICogQHJldHVybnMgaXRlcmF0b3IgdG8gaXRlcmF0ZSB0aHJvdWdoIHJlc3VsdHNcclxuICovXHJcbmZ1bmN0aW9uIHF1ZXJ5KHJ1bGVzREIsIHF1ZXJ5KSB7XHJcbiAgICB2YXIgdmFycyA9IHZhck5hbWVzKHF1ZXJ5Lmxpc3QpLCBjZGIgPSB7fTtcclxuICAgIC8vIG1heWJlIG1vdmUgdG8gcGFyc2VyIGxldmVsLCBpZGtcclxuICAgIGZvciAodmFyIGkgPSAwLCBuYW1lLCBydWxlOyBpIDwgcnVsZXNEQi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHJ1bGUgPSBydWxlc0RCW2ldO1xyXG4gICAgICAgIG5hbWUgPSBydWxlLmhlYWQubmFtZTtcclxuICAgICAgICBpZiAobmFtZSBpbiBjZGIpIHtcclxuICAgICAgICAgICAgY2RiW25hbWVdLnB1c2gocnVsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjZGJbbmFtZV0gPSBbcnVsZV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFyIGl0ZXJhdG9yID0gbmV3IEl0ZXJhdG9yKCk7XHJcbiAgICB2YXIgY29udCA9IGdldGR0cmVlaXRlcmF0b3IocXVlcnkubGlzdCwgY2RiLCBmdW5jdGlvbiAoYmluZGluZ0NvbnRleHQpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHY7IHYgPSB2YXJzW2krK107KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdFt2Lm5hbWVdID0gdGVybVRvSnNWYWx1ZShiaW5kaW5nQ29udGV4dC52YWx1ZSh2KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGl0ZXJhdG9yLmN1cnJlbnQgPSByZXN1bHQ7XHJcbiAgICB9KTtcclxuICAgIEl0ZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICB0aGlzLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIHdoaWxlIChjb250ICE9IG51bGwgJiYgIXRoaXMuY3VycmVudCkge1xyXG4gICAgICAgICAgICBjb250ID0gY29udCgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIChleHBvcnRzLm9wdGlvbnMubWF4SXRlcmF0aW9ucykgPT09IFwibnVtYmVyXCIgJiYgZXhwb3J0cy5vcHRpb25zLm1heEl0ZXJhdGlvbnMgPD0gKytpKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBcIml0ZXJhdGlvbiBsaW1pdCByZWFjaGVkXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5jdXJyZW50O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBpdGVyYXRvcjtcclxuICAgIGZ1bmN0aW9uIEl0ZXJhdG9yKCkgeyB9XHJcbn1cclxuZXhwb3J0cy5xdWVyeSA9IHF1ZXJ5O1xyXG47XHJcbi8qKlxyXG4gKiBHZXQgYSBsaXN0IG9mIGFsbCB2YXJpYWJsZXMgbWVudGlvbmVkIGluIGEgbGlzdCBvZiBUZXJtcy5cclxuICovXHJcbmZ1bmN0aW9uIHZhck5hbWVzKGxpc3QpIHtcclxuICAgIHZhciBvdXQgPSBbXSwgdmFycyA9IHt9LCB0LCBuO1xyXG4gICAgbGlzdCA9IGxpc3Quc2xpY2UoMCk7IC8vIGNsb25lICAgXHJcbiAgICB3aGlsZSAobGlzdC5sZW5ndGgpIHtcclxuICAgICAgICB0ID0gbGlzdC5wb3AoKTtcclxuICAgICAgICBpZiAodCBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlZhcmlhYmxlKSB7XHJcbiAgICAgICAgICAgIG4gPSB0Lm5hbWU7XHJcbiAgICAgICAgICAgIC8vIGlnbm9yZSBzcGVjaWFsIHZhcmlhYmxlIF9cclxuICAgICAgICAgICAgLy8gcHVzaCBvbmx5IG5ldyBuYW1lc1xyXG4gICAgICAgICAgICBpZiAobiAhPT0gXCJfXCIgJiYgb3V0LmluZGV4T2YobikgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBvdXQucHVzaChuKTtcclxuICAgICAgICAgICAgICAgIHZhcnNbbl0gPSB0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHQgaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5UZXJtKSB7XHJcbiAgICAgICAgICAgIC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgdHJlZSB3YWxrIG9yZGVyXHJcbiAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGxpc3QsIHQucGFydGxpc3QubGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dC5tYXAoZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIHZhcnNbbmFtZV07IH0pO1xyXG59XHJcbnZhciBidWlsdGluUHJlZGljYXRlcyA9IHtcclxuICAgIFwiIS8wXCI6IGZ1bmN0aW9uIChsb29wLCBnb2FscywgaWR4LCBiaW5kaW5nQ29udGV4dCwgZmJhY2t0cmFjaykge1xyXG4gICAgICAgIHZhciBuZXh0Z29hbHMgPSBnb2Fscy5zbGljZSgxKTsgLy8gY3V0IGFsd2F5cyBzdWNjZWVkc1xyXG4gICAgICAgIHJldHVybiBsb29wKG5leHRnb2FscywgMCwgbmV3IEJpbmRpbmdDb250ZXh0KGJpbmRpbmdDb250ZXh0KSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmJhY2t0cmFjayAmJiBmYmFja3RyYWNrKHRydWUsIGdvYWxzWzBdLnBhcmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgXCJmYWlsLzBcIjogZnVuY3Rpb24gKGxvb3AsIGdvYWxzLCBpZHgsIGJpbmRpbmdDb250ZXh0LCBmYmFja3RyYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIGZiYWNrdHJhY2s7IC8vIEZBSUxcclxuICAgIH0sXHJcbiAgICBcImNhbGwvMVwiOiBmdW5jdGlvbiAobG9vcCwgZ29hbHMsIGlkeCwgYmluZGluZ0NvbnRleHQsIGZiYWNrdHJhY2spIHtcclxuICAgICAgICB2YXIgZmlyc3QgPSBiaW5kaW5nQ29udGV4dC52YWx1ZShnb2Fsc1swXS5wYXJ0bGlzdC5saXN0WzBdKTtcclxuICAgICAgICBpZiAoIShmaXJzdCBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlRlcm0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYmFja3RyYWNrOyAvLyBGQUlMXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBuZyA9IGdvYWxzLnNsaWNlKDApO1xyXG4gICAgICAgIG5nWzBdID0gZmlyc3Q7XHJcbiAgICAgICAgZmlyc3QucGFyZW50ID0gZ29hbHNbMF07XHJcbiAgICAgICAgcmV0dXJuIGxvb3AobmcsIDAsIGJpbmRpbmdDb250ZXh0LCBmYmFja3RyYWNrKTtcclxuICAgIH0sXHJcbiAgICBcIj0vMlwiOiBmdW5jdGlvbiAobG9vcCwgZ29hbHMsIGlkeCwgYmluZGluZ0NvbnRleHQsIGZiYWNrdHJhY2spIHtcclxuICAgICAgICB2YXIgY3R4ID0gbmV3IEJpbmRpbmdDb250ZXh0KGJpbmRpbmdDb250ZXh0KTtcclxuICAgICAgICBpZiAoY3R4LnVuaWZ5KGdvYWxzWzBdLnBhcnRsaXN0Lmxpc3RbMF0sIGdvYWxzWzBdLnBhcnRsaXN0Lmxpc3RbMV0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsb29wKGdvYWxzLnNsaWNlKDEpLCAwLCBjdHgsIGZiYWNrdHJhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZiYWNrdHJhY2s7IC8vIEZBSUxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJmaW5kYWxsLzNcIjogZnVuY3Rpb24gKGxvb3AsIGdvYWxzLCBpZHgsIGJpbmRpbmdDb250ZXh0LCBmYmFja3RyYWNrLCBkYikge1xyXG4gICAgICAgIHZhciBhcmdzID0gZ29hbHNbMF0ucGFydGxpc3QubGlzdCwgcmVzdWx0cyA9IFtdO1xyXG4gICAgICAgIHJldHVybiBnZXRkdHJlZWl0ZXJhdG9yKFthcmdzWzFdXSwgZGIsIGNvbGxlY3QsIGJpbmRpbmdDb250ZXh0LCByZXBvcnQpO1xyXG4gICAgICAgIGZ1bmN0aW9uIGNvbGxlY3QoY3R4KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChjdHgudmFsdWUoYXJnc1swXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiByZXBvcnQoKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBwcm9sb2dBU1RfMS5saXN0T2ZBcnJheShyZXN1bHRzKTtcclxuICAgICAgICAgICAgaWYgKGJpbmRpbmdDb250ZXh0LnVuaWZ5KGFyZ3NbMl0sIHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsb29wKGdvYWxzLnNsaWNlKDEpLCAwLCBiaW5kaW5nQ29udGV4dCwgZmJhY2t0cmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmJhY2t0cmFjaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcImlzLzJcIjogZnVuY3Rpb24gKGxvb3AsIGdvYWxzLCBpZHgsIGJpbmRpbmdDb250ZXh0LCBmYmFja3RyYWNrKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBnb2Fsc1swXS5wYXJ0bGlzdC5saXN0LCBleHByZXNzaW9uID0gYmluZGluZ0NvbnRleHQudmFsdWUoYXJnc1sxXSksIGN0eCA9IG5ldyBCaW5kaW5nQ29udGV4dChiaW5kaW5nQ29udGV4dCk7XHJcbiAgICAgICAgaWYgKHZhck5hbWVzKFtleHByZXNzaW9uXSkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYmFja3RyYWNrOyAvLyBUT0RPOiBwcm9sb2cgZXhjZXB0aW9uIFwiRVJST1I6IGlzLzI6IEFyZ3VtZW50cyBhcmUgbm90IHN1ZmZpY2llbnRseSBpbnN0YW50aWF0ZWRcIlxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBidWlsZCBldmFsdWF0aW9uIHF1ZXVlOlxyXG4gICAgICAgIHZhciBxdWV1ZSA9IFtleHByZXNzaW9uXSwgYWNjID0gW10sIGMsIGksIHgsIGw7XHJcbiAgICAgICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB4ID0gcXVldWUucG9wKCk7XHJcbiAgICAgICAgICAgIGFjYy5wdXNoKHgpO1xyXG4gICAgICAgICAgICBpZiAoeCBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlRlcm0pIHtcclxuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHF1ZXVlLCB4LnBhcnRsaXN0Lmxpc3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGV2YWx1YXRlXHJcbiAgICAgICAgcXVldWUgPSBhY2M7XHJcbiAgICAgICAgYWNjID0gW107XHJcbiAgICAgICAgaSA9IHF1ZXVlLmxlbmd0aDtcclxuICAgICAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgICAgIHggPSBxdWV1ZVtpXTtcclxuICAgICAgICAgICAgaWYgKHggaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5UZXJtKSB7XHJcbiAgICAgICAgICAgICAgICBjID0geC5wYXJ0bGlzdC5saXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGwgPSBhY2Muc3BsaWNlKC1jLCBjKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoeC5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIitcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWNjLnB1c2gobFswXSArIGxbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiLVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2MucHVzaChsWzBdIC0gbFsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCIqXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjYy5wdXNoKGxbMF0gKiBsWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIi9cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWNjLnB1c2gobFswXSAvIGxbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmJhY2t0cmFjazsgLy8gVE9ETzogcHJvbG9nIGV4Y2VwdGlvbiBcIkVSUk9SOiBpcy8yOiBBcml0aG1ldGljOiBge3gubmFtZX0nIGlzIG5vdCBhIGZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKHgubmFtZSkgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBhY2MucHVzaCh4Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogaGFuZGxlIGZ1bmN0aW9ucyBsaWtlIHBpIGUgZXRjXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZiYWNrdHJhY2s7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGN0eC51bmlmeShhcmdzWzBdLCBuZXcgcHJvbG9nQVNUXzEuQXRvbShhY2NbMF0pKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbG9vcChnb2Fscy5zbGljZSgxKSwgMCwgY3R4LCBmYmFja3RyYWNrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYmFja3RyYWNrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuLyoqXHJcbiAqIFRoZSBtYWluIHByb3ZpbmcgZW5naW5lXHJcbiAqIEBwYXJhbSBvcmlnaW5hbEdvYWxzIG9yaWdpbmFsIGdvYWxzIHRvIHByb3ZlXHJcbiAqIEBwYXJhbSBydWxlc0RCIHByb2xvZyBkYXRhYmFzZSB0byBjb25zdWx0IHdpdGhcclxuICogQHBhcmFtIGZzdWNjZXNzIHN1Y2Nlc3MgY2FsbGJhY2tcclxuICogQHJldHVybnMgYSBmdW5jdGlvbiB0byBwZXJmb3JtIG5leHQgc3RlcFxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0ZHRyZWVpdGVyYXRvcihvcmlnaW5hbEdvYWxzLCBydWxlc0RCLCBmc3VjY2Vzcywgcm9vdEJpbmRpbmdDb250ZXh0LCByb290QmFja3RyYWNrKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciB0YWlsRW5hYmxlZCA9IGV4cG9ydHMub3B0aW9ucy5leHBlcmltZW50YWwudGFpbFJlY3Vyc2lvbjtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiBsb29wKG9yaWdpbmFsR29hbHMsIDAsIHJvb3RCaW5kaW5nQ29udGV4dCB8fCBudWxsLCByb290QmFja3RyYWNrIHx8IG51bGwpOyB9O1xyXG4gICAgLy8gbWFpbiBsb29wIGNvbnRpbnVhdGlvblxyXG4gICAgZnVuY3Rpb24gbG9vcChnb2FscywgaWR4LCBwYXJlbnRCaW5kaW5nQ29udGV4dCwgZmJhY2t0cmFjaykge1xyXG4gICAgICAgIGlmICghZ29hbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZzdWNjZXNzKHBhcmVudEJpbmRpbmdDb250ZXh0KTtcclxuICAgICAgICAgICAgcmV0dXJuIGZiYWNrdHJhY2s7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjdXJyZW50R29hbCA9IGdvYWxzWzBdLCBjdXJyZW50QmluZGluZ0NvbnRleHQgPSBuZXcgQmluZGluZ0NvbnRleHQocGFyZW50QmluZGluZ0NvbnRleHQpLCBjdXJyZW50R29hbFZhck5hbWVzLCBydWxlLCB2YXJNYXAsIHJlbmFtZWRIZWFkLCBuZXh0R29hbHNWYXJOYW1lcywgZXhpc3Rpbmc7XHJcbiAgICAgICAgLy8gVE9ETzogYWRkIHN1cHBvcnQgZm9yIGJ1aWx0aW5zIHdpdGggdmFyaWFibGUgYXJpdHkgKGxpa2UgY2FsbC8yKylcclxuICAgICAgICB2YXIgYnVpbHRpbiA9IGJ1aWx0aW5QcmVkaWNhdGVzW2N1cnJlbnRHb2FsLm5hbWUgKyBcIi9cIiArIGN1cnJlbnRHb2FsLnBhcnRsaXN0Lmxpc3QubGVuZ3RoXTtcclxuICAgICAgICBpZiAodHlwZW9mIChidWlsdGluKSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBidWlsdGluKGxvb3AsIGdvYWxzLCBpZHgsIGN1cnJlbnRCaW5kaW5nQ29udGV4dCwgZmJhY2t0cmFjaywgcnVsZXNEQik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNlYXJjaGluZyBmb3IgbmV4dCBtYXRjaGluZyBydWxlICAgICAgICBcclxuICAgICAgICBmb3IgKHZhciBpID0gaWR4LCBkYiA9IHJ1bGVzREJbY3VycmVudEdvYWwubmFtZV0sIGRibGVuID0gZGIgJiYgZGIubGVuZ3RoOyBpIDwgZGJsZW47IGkrKykge1xyXG4gICAgICAgICAgICBydWxlID0gZGJbaV07XHJcbiAgICAgICAgICAgIHZhck1hcCA9IHt9O1xyXG4gICAgICAgICAgICByZW5hbWVkSGVhZCA9IG5ldyBwcm9sb2dBU1RfMS5UZXJtKHJ1bGUuaGVhZC5uYW1lLCBjdXJyZW50QmluZGluZ0NvbnRleHQucmVuYW1lVmFyaWFibGVzKHJ1bGUuaGVhZC5wYXJ0bGlzdC5saXN0LCBjdXJyZW50R29hbCwgdmFyTWFwKSk7XHJcbiAgICAgICAgICAgIHJlbmFtZWRIZWFkLnBhcmVudCA9IGN1cnJlbnRHb2FsLnBhcmVudDtcclxuICAgICAgICAgICAgaWYgKCFjdXJyZW50QmluZGluZ0NvbnRleHQudW5pZnkoY3VycmVudEdvYWwsIHJlbmFtZWRIZWFkKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG5leHRHb2FscyA9IGdvYWxzLnNsaWNlKDEpOyAvLyBjdXJyZW50IGhlYWQgc3VjY2VlZGVkICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChydWxlLmJvZHkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbmV4dEdvYWxzID0gY3VycmVudEJpbmRpbmdDb250ZXh0LnJlbmFtZVZhcmlhYmxlcyhydWxlLmJvZHkubGlzdCwgcmVuYW1lZEhlYWQsIHZhck1hcCkuY29uY2F0KG5leHRHb2Fscyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gVE9ETzogcmVtb3ZlICdmcmVlJyB2YXJpYWJsZXMgKG5lZWQgdG8gY2hlY2sgdmFsdWVzIGFzIHdlbGwpXHJcbiAgICAgICAgICAgIGlmIChydWxlLmJvZHkgIT0gbnVsbCAmJiBuZXh0R29hbHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjYWxsIGluIGEgdGFpbCBwb3NpdGlvbjogcmV1c2luZyBwYXJlbnQgdmFyaWFibGVzICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gcHJldmVudHMgY29udGV4dCBncm90aCBpbiBzb21lIHJlY3Vyc2l2ZSBzY2VuYXJpb3NcclxuICAgICAgICAgICAgICAgIGlmICh0YWlsRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRHb2FsVmFyTmFtZXMgPSB2YXJOYW1lcyhbY3VycmVudEdvYWxdKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0R29hbHNWYXJOYW1lcyA9IHZhck5hbWVzKG5leHRHb2Fscyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcgPSBuZXh0R29hbHNWYXJOYW1lcy5jb25jYXQoY3VycmVudEdvYWxWYXJOYW1lcykubWFwKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWU7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50R29hbFZhck5hbWVzLmxlbmd0aCA9PT0gbmV4dEdvYWxzVmFyTmFtZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHZuIGluIHZhck1hcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgY3YsIGNuLCBubiwgayA9IGN1cnJlbnRHb2FsVmFyTmFtZXMubGVuZ3RoOyBrLS07KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY24gPSBjdXJyZW50R29hbFZhck5hbWVzW2tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5uID0gbmV4dEdvYWxzVmFyTmFtZXNba107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3YgPSBjdXJyZW50QmluZGluZ0NvbnRleHQudmFsdWUoY24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbi5uYW1lICE9IG5uLm5hbWUgJiYgdmFyTWFwW3ZuXSA9PT0gbm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG8gbm90IHNob3J0LWN1dCBpZiBjbidzIHZhbHVlIHJlZmVyZW5jZXMgbm5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogcHJvYmFibHkgbmVlZCB0byBjaGVjayBvdGhlciB2YXJpYWJsZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN2ICYmIHZhck5hbWVzKFtjdl0pLmluZGV4T2Yobm4pICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyTWFwW3ZuXSA9IGNuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50QmluZGluZ0NvbnRleHQuY3R4W2NuLm5hbWVdID0gY3VycmVudEJpbmRpbmdDb250ZXh0LmN0eFtubi5uYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEJpbmRpbmdDb250ZXh0LnVuYmluZChubi5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmUtcmVuYW1lIHZhcnMgaW4gbmV4dCBnb2FscyAoY2FuIGJlIG9wdGltaXNlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEdvYWxzID0gY3VycmVudEJpbmRpbmdDb250ZXh0LnJlbmFtZVZhcmlhYmxlcyhydWxlLmJvZHkubGlzdCwgcmVuYW1lZEhlYWQsIHZhck1hcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGxldmVsRG93blRhaWwoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2tpcHBpbmcgYmFja3RyYWNraW5nIHRvIHRoZSBzYW1lIGxldmVsIGJlY2F1c2UgaXQncyB0aGUgbGFzdCBnb2FsICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogcmVtb3ZpbmcgZXh0cmEgc3R1ZmYgZnJvbSBiaW5kaW5nIGNvbnRleHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9vcChuZXh0R29hbHMsIDAsIGN1cnJlbnRCaW5kaW5nQ29udGV4dCwgZmJhY2t0cmFjayk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8vIENVUlJFTlQgQkFDS1RSQUNLIENPTlRJTlVBVElPTiAgLy8vXHJcbiAgICAgICAgICAgICAgICAvLy8gV0hFTiBJTlZPS0VEIEJBQ0tUUkFDS1MgVE8gVEhFICAvLy9cclxuICAgICAgICAgICAgICAgIC8vLyBORVhUIFJVTEUgSU4gVEhFIFBSRVZJT1VTIExFVkVMIC8vL1xyXG4gICAgICAgICAgICAgICAgdmFyIGZDdXJyZW50QlQgPSBmdW5jdGlvbiAoY3V0LCBwYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYmFja3RyYWNrICYmIGZiYWNrdHJhY2socGFyZW50LnBhcmVudCAhPT0gZ29hbHNbMF0ucGFyZW50LCBwYXJlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxvb3AoZ29hbHMsIGkgKyAxLCBwYXJlbnRCaW5kaW5nQ29udGV4dCwgZmJhY2t0cmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBsZXZlbERvd24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxvb3AobmV4dEdvYWxzLCAwLCBjdXJyZW50QmluZGluZ0NvbnRleHQsIGZDdXJyZW50QlQpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmJhY2t0cmFjaztcclxuICAgIH1cclxufVxyXG47XHJcbi8qKlxyXG4gKiBoZWxwZXIgZnVuY3Rpb24gdG8gY29udmVydCB0ZXJtcyB0byByZXN1bHQgdmFsdWVzIHJldHVybmVkIGJ5IHF1ZXJ5IGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiB0ZXJtVG9Kc1ZhbHVlKHYpIHtcclxuICAgIGlmICh2IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuQXRvbSkge1xyXG4gICAgICAgIHJldHVybiB2ID09PSBwcm9sb2dBU1RfMS5BdG9tLk5pbCA/IFtdIDogdi5uYW1lO1xyXG4gICAgfVxyXG4gICAgaWYgKHYgaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5UZXJtICYmIHYubmFtZSA9PT0gXCJjb25zXCIpIHtcclxuICAgICAgICB2YXIgdCA9IFtdO1xyXG4gICAgICAgIHdoaWxlICh2LnBhcnRsaXN0ICYmIHYubmFtZSAhPT0gXCJuaWxcIikge1xyXG4gICAgICAgICAgICB0LnB1c2godGVybVRvSnNWYWx1ZSh2LnBhcnRsaXN0Lmxpc3RbMF0pKTtcclxuICAgICAgICAgICAgdiA9IHYucGFydGxpc3QubGlzdFsxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdi50b1N0cmluZygpO1xyXG59XHJcbi8qKlxyXG4gKiBjcmVhdGVzIGJpbmRpbmcgY29udGV4dCBmb3IgdmFyaWFibGVzXHJcbiAqL1xyXG5mdW5jdGlvbiBCaW5kaW5nQ29udGV4dChwYXJlbnQpIHtcclxuICAgIHRoaXMuY3R4ID0gT2JqZWN0LmNyZWF0ZShwYXJlbnQgJiYgcGFyZW50LmN0eCB8fCB7fSk7XHJcbn1cclxuLyoqXHJcbiAqIGZpbmUtcHJpbnQgdGhlIGNvbnRleHQgKGZvciBkZWJ1Z2dpbmcgcHVycG9zZXMpXHJcbiAqICEgU0xPVyBiZWNhdXNlIG9mIGZvci1pblxyXG4gKi9cclxuQmluZGluZ0NvbnRleHQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcbiAgICB2YXIgciA9IFtdLCBwID0gW107XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5jdHgpIHtcclxuICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5jYWxsKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLmN0eCwga2V5KSA/IHIgOiBwLCBrZXkgKyBcIiA9IFwiICsgdGhpcy5jdHhba2V5XSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gci5qb2luKFwiLCBcIikgKyBcIiB8fCBcIiArIHAuam9pbihcIiwgXCIpO1xyXG59O1xyXG52YXIgZ2xvYmFsR29hbENvdW50ZXIgPSAwO1xyXG4vKipcclxuICogcmVuYW1lcyB2YXJpYWJsZXMgdG8gbWFrZSBzdXJlIG5hbWVzIGFyZSB1bmlxdWVcclxuICogQHBhcmFtIGxpc3QgbGlzdCBvZiB0ZXJtcyB0byByZW5hbWVcclxuICogQHBhcmFtIHBhcmVudCBwYXJlbnQgdGVybSAocGFyZW50IGlzIHVzZWQgaW4gY3V0KVxyXG4gKiBAcGFyYW0gdmFyTWFwIChvdXQpIG1hcCBvZiB2YXJpYWJsZSBtYXBwaW5ncywgdXNlZCB0byBtYWtlIHN1cmUgdGhhdCBib3RoIGhlYWQgYW5kIGJvZHkgaGF2ZSBzYW1lIG5hbWVzXHJcbiAqIEByZXR1cm5zIG5ldyB0ZXJtIHdpdGggcmVuYW1lZCB2YXJpYWJsZXNcclxuICovXHJcbkJpbmRpbmdDb250ZXh0LnByb3RvdHlwZS5yZW5hbWVWYXJpYWJsZXMgPSBmdW5jdGlvbiByZW5hbWVWYXJpYWJsZXMobGlzdCwgcGFyZW50LCB2YXJNYXApIHtcclxuICAgIHZhciBvdXQgPSBbXSwgcXVldWUgPSBbXSwgc3RhY2sgPSBbbGlzdF0sIGNsZW4sIHRtcCwgdjtcclxuICAgIC8vIHByZXBhcmUgZGVwdGgtZmlyc3QgcXVldWVcclxuICAgIHdoaWxlIChzdGFjay5sZW5ndGgpIHtcclxuICAgICAgICBsaXN0ID0gc3RhY2sucG9wKCk7XHJcbiAgICAgICAgcXVldWUucHVzaChsaXN0KTtcclxuICAgICAgICBpZiAobGlzdCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIGxpc3QubGVuZ3RoICYmIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHN0YWNrLCBsaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobGlzdCBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlRlcm0pIHtcclxuICAgICAgICAgICAgbGlzdC5wYXJ0bGlzdC5saXN0Lmxlbmd0aCAmJiBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShzdGFjaywgbGlzdC5wYXJ0bGlzdC5saXN0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBwcm9jZXNzIGRlcHRoLWZpcnN0IHF1ZXVlXHJcbiAgICB2YXIgdmFycyA9IHZhck1hcCB8fCB7fSwgXyA9IG5ldyBwcm9sb2dBU1RfMS5WYXJpYWJsZShcIl9cIik7XHJcbiAgICBmb3IgKHZhciBpID0gcXVldWUubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICBsaXN0ID0gcXVldWVbaV07XHJcbiAgICAgICAgaWYgKGxpc3QgaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5BdG9tKSB7XHJcbiAgICAgICAgICAgIG91dC5wdXNoKGxpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChsaXN0IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuVmFyaWFibGUpIHtcclxuICAgICAgICAgICAgaWYgKGxpc3QubmFtZSA9PT0gXCJfXCIpIHtcclxuICAgICAgICAgICAgICAgIHYgPSBfO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdiA9IHZhcnNbbGlzdC5uYW1lXSB8fCAodmFyc1tsaXN0Lm5hbWVdID0gbmV3IHByb2xvZ0FTVF8xLlZhcmlhYmxlKFwiX0dcIiArIChnbG9iYWxHb2FsQ291bnRlcisrKSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG91dC5wdXNoKHYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChsaXN0IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuVGVybSkge1xyXG4gICAgICAgICAgICBjbGVuID0gbGlzdC5wYXJ0bGlzdC5saXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgdG1wID0gbmV3IHByb2xvZ0FTVF8xLlRlcm0obGlzdC5uYW1lLCBvdXQuc3BsaWNlKC1jbGVuLCBjbGVuKSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHBsID0gdG1wLnBhcnRsaXN0Lmxpc3QsIGsgPSBwbC5sZW5ndGg7IGstLTspIHtcclxuICAgICAgICAgICAgICAgIGlmIChwbFtrXSBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlRlcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICBwbFtrXS5wYXJlbnQgPSB0bXA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdG1wLnBhcmVudCA9IHBhcmVudDtcclxuICAgICAgICAgICAgb3V0LnB1c2godG1wKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNsZW4gPSBsaXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgY2xlbiAmJiBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShvdXQsIG91dC5zcGxpY2UoLWNsZW4sIGNsZW4pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0O1xyXG59O1xyXG4vKipcclxuICogQmluZHMgdmFyaWFibGUgdG8gYSB2YWx1ZSBpbiB0aGUgY29udGV4dFxyXG4gKiBAcGFyYW0gbmFtZSBuYW1lIG9mIHRoZSB2YXJpYWJsZSB0byBiaW5kXHJcbiAqIEBwYXJhbSB2YWx1ZSB2YWx1ZSB0byBiaW5kIHRvIHRoZSB2YXJpYWJsZVxyXG4gKi9cclxuQmluZGluZ0NvbnRleHQucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgIHRoaXMuY3R4W25hbWVdID0gdmFsdWU7XHJcbn07XHJcbi8qKlxyXG4gKiBVbmJpbmRzIHZhcmlhYmxlIGluIHRoZSBDVVJSRU5UIGNvbnRleHRcclxuICogVmFyaWFibGUgcmVtYWlucyBib3VuZCBpbiBwYXJlbnQgY29udGV4dHNcclxuICogYW5kIG1pZ2h0IGJlIHJlc29sdmVkIHRob3VnaCBwcm90byBjaGFpblxyXG4gKiBAcGFyYW0gbmFtZSB2YXJpYWJsZSBuYW1lIHRvIHVuYmluZFxyXG4gKi9cclxuQmluZGluZ0NvbnRleHQucHJvdG90eXBlLnVuYmluZCA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICBkZWxldGUgdGhpcy5jdHhbbmFtZV07XHJcbn07XHJcbi8qKlxyXG4gKiBHZXRzIHRoZSB2YWx1ZSBvZiB0aGUgdGVybSwgcmVjdXJzaXZlbHkgcmVwbGFjaW5nIHZhcmlhYmxlcyB3aXRoIGJvdW5kIHZhbHVlc1xyXG4gKiBAcGFyYW0geCB0ZXJtIHRvIGNhbGN1bGF0ZSB2YWx1ZSBmb3JcclxuICogQHJldHVybnMgdmFsdWUgb2YgdGVybSB4XHJcbiAqL1xyXG5CaW5kaW5nQ29udGV4dC5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiB2YWx1ZSh4KSB7XHJcbiAgICB2YXIgcXVldWUgPSBbeF0sIGFjYyA9IFtdLCBjLCBpO1xyXG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCkge1xyXG4gICAgICAgIHggPSBxdWV1ZS5wb3AoKTtcclxuICAgICAgICBhY2MucHVzaCh4KTtcclxuICAgICAgICBpZiAoeCBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlRlcm0pIHtcclxuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkocXVldWUsIHgucGFydGxpc3QubGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHggaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5WYXJpYWJsZSkge1xyXG4gICAgICAgICAgICBjID0gdGhpcy5jdHhbeC5uYW1lXTtcclxuICAgICAgICAgICAgaWYgKGMpIHtcclxuICAgICAgICAgICAgICAgIGFjYy5wb3AoKTtcclxuICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBxdWV1ZSA9IGFjYztcclxuICAgIGFjYyA9IFtdO1xyXG4gICAgaSA9IHF1ZXVlLmxlbmd0aDtcclxuICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICB4ID0gcXVldWVbaV07XHJcbiAgICAgICAgaWYgKHggaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5UZXJtKSB7XHJcbiAgICAgICAgICAgIGMgPSB4LnBhcnRsaXN0Lmxpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICBhY2MucHVzaChuZXcgcHJvbG9nQVNUXzEuVGVybSh4Lm5hbWUsIGFjYy5zcGxpY2UoLWMsIGMpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgYWNjLnB1c2goeCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWNjWzBdO1xyXG59O1xyXG4vKipcclxuICogVW5pZmllcyB0ZXJtcyB4IGFuZCB5LCByZW5hbWluZyBhbmQgYmluZGluZyB2YXJpYWJsZXMgaW4gcHJvY2Vzc1xyXG4gKiAhISBtdXRhdGVzIHZhcmlhYmxlIG5hbWVzIChhbHRlcmluZyB4LCB5IGFuZCB2YXJNYXAgaW4gbWFpbiBsb29wKVxyXG4gKiBAcmV0dXJucyB0cnVlIGlmIHRlcm1zIHVuaWZ5LCBmYWxzZSBvdGhlcndpc2VcclxuICovXHJcbkJpbmRpbmdDb250ZXh0LnByb3RvdHlwZS51bmlmeSA9IGZ1bmN0aW9uIHVuaWZ5KHgsIHkpIHtcclxuICAgIHZhciB0b1NldE5hbWVzID0gW10sIHRvU2V0ID0ge30sIGFjYyA9IFtdLCBxdWV1ZSA9IFt0aGlzLnZhbHVlKHgpLCB0aGlzLnZhbHVlKHkpXSwgeHBsLCB5cGwsIGksIGxlbjtcclxuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGgpIHtcclxuICAgICAgICB4ID0gcXVldWUucG9wKCk7XHJcbiAgICAgICAgeSA9IHF1ZXVlLnBvcCgpO1xyXG4gICAgICAgIGlmICh4IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuVGVybSAmJiB5IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuVGVybSkge1xyXG4gICAgICAgICAgICB4cGwgPSB4LnBhcnRsaXN0Lmxpc3Q7XHJcbiAgICAgICAgICAgIHlwbCA9IHkucGFydGxpc3QubGlzdDtcclxuICAgICAgICAgICAgaWYgKHgubmFtZSA9PSB5Lm5hbWUgJiYgeHBsLmxlbmd0aCA9PSB5cGwubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSB4cGwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKHhwbFtpXSwgeXBsW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCh4IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuQXRvbSB8fCB5IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuQXRvbSkgJiYgISh4IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuVmFyaWFibGUgfHwgeSBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlZhcmlhYmxlKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEoeCBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLkF0b20gJiYgeSBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLkF0b20gJiYgeC5uYW1lID09IHkubmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYWNjLnB1c2goeCwgeSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaSA9IGFjYy5sZW5ndGg7XHJcbiAgICB3aGlsZSAoaSkge1xyXG4gICAgICAgIHkgPSBhY2NbLS1pXTtcclxuICAgICAgICB4ID0gYWNjWy0taV07XHJcbiAgICAgICAgaWYgKHggaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5WYXJpYWJsZSkge1xyXG4gICAgICAgICAgICBpZiAoeC5uYW1lID09PSBcIl9cIikge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRvU2V0TmFtZXMuaW5kZXhPZih4Lm5hbWUpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdG9TZXROYW1lcy5wdXNoKHgubmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodG9TZXRbeC5uYW1lXS5uYW1lICE9PSB5Lm5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0b1NldFt4Lm5hbWVdID0geTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoeSBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlZhcmlhYmxlKSB7XHJcbiAgICAgICAgICAgIGlmICh5Lm5hbWUgPT09IFwiX1wiKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodG9TZXROYW1lcy5pbmRleE9mKHkubmFtZSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0b1NldE5hbWVzLnB1c2goeS5uYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0b1NldFt5Lm5hbWVdLm5hbWUgIT09IHgubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRvU2V0W3kubmFtZV0gPSB4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIHJlbmFtaW5nIHVuaWZpZWQgdmFyaWFibGVzXHJcbiAgICAvLyBpdCdzIGd1YXJhbnRlZWQgdGhhdCB2YXJpYWJsZSB3aXRoIHRoZSBzYW1lIG5hbWUgaXMgdGhlIHNhbWUgaW5zdGFuY2Ugd2l0aGluIHJ1bGUsIHNlZSByZW5hbWVWYXJpYWJsZXMoKVxyXG4gICAgdmFyIHZhcm1hcCA9IHt9LCBrZXk7XHJcbiAgICBmb3IgKGkgPSAwOyBrZXkgPSB0b1NldE5hbWVzW2krK107KSB7XHJcbiAgICAgICAgaWYgKHRvU2V0W2tleV0gaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5WYXJpYWJsZSkge1xyXG4gICAgICAgICAgICB2YXJtYXBbdG9TZXRba2V5XS5uYW1lXSA9IGtleTtcclxuICAgICAgICAgICAgdG9TZXRba2V5XS5uYW1lID0ga2V5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGJpbmQgdmFsdWVzIHRvIHZhcmlhYmxlcyAobWluZGluZyByZW5hbWVzKVxyXG4gICAgZm9yIChpID0gMDsga2V5ID0gdG9TZXROYW1lc1tpKytdOykge1xyXG4gICAgICAgIGlmICghKHRvU2V0W2tleV0gaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5WYXJpYWJsZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5iaW5kKHZhcm1hcFtrZXldIHx8IGtleSwgdG9TZXRba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcbiJdfQ==

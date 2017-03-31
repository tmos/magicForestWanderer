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
        this.wanderer.updateMap();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9zcmMvRmxvb3IudHMiLCJqcy9zcmMvRm9yZXN0LnRzIiwianMvc3JjL0dhbWUudHMiLCJqcy9zcmMvV2FuZGVyZXIudHMiLCJqcy9zcmMvY29uc3RhbnRzLnRzIiwianMvc3JjL21haW4udHMiLCJub2RlX21vZHVsZXMvanNwcm9sb2cvZGlzdC9qc3Byb2xvZy5qcyIsIm5vZGVfbW9kdWxlcy9qc3Byb2xvZy9kaXN0L3Byb2xvZ0FTVC5qcyIsIm5vZGVfbW9kdWxlcy9qc3Byb2xvZy9kaXN0L3Byb2xvZ1BhcnNlci5qcyIsIm5vZGVfbW9kdWxlcy9qc3Byb2xvZy9kaXN0L3Byb2xvZ1NvbHZlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQ0EseUNBQTZEO0FBRTdEOzs7O0dBSUc7QUFDSDtJQVdJLGVBQVksT0FBZTtRQUFmLHdCQUFBLEVBQUEsMkJBQWU7UUFWbkIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLFNBQUksR0FBWSxLQUFLLENBQUM7UUFDdEIsU0FBSSxHQUFZLEtBQUssQ0FBQztRQUN0QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0IsdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO1FBR3hCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxnQkFBSSxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxnQkFBSSxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO1FBQUMs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SUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFD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SUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzFFLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEUsQ0FBQztRQUNMLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDMUUsQ0FBQztZQUNELEVBQUUs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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgKiBhcyAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCB7ZW1wdHksIGdvYWwsIG1vbnN0ZXIsIHRyYXAsIHRyZWV9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIFlvdSdsbCB0ZWxsIG1lOiBcIkEgZmxvb3IgaXMgYSBmbG9vclwiLCBhbmQgeW91J2xsIGJlIHJpZ2h0LlxuICogVGhpcyBpcyBub3QgdGhlIGZsb29yIGl0c2VsZiB0aGF0IG1hdHRlcnMsIHRoaXMgaXMgd2hhdCBpdCBjb250YWlucy5cbiAqIElzIGl0IGFuIGhvcnJpYmxlIG1vbnN0ZXIgb24gdGhpcyBmbG9vcj8gT3IgYSBsZXRoYWwgdHJhcD8gT3IgYSBjbHVlIGZvciB0aGUgbmV4dCBmbG9vcj8gWW91J2xsIHNlZSwgd2FuZGVyZXIuLi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmxvb3Ige1xuICAgIHByaXZhdGUgdmlzaXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgYWNjZXNzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgdHJhcDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgZ29hbDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgbW9uc3RlcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgdHJhcENsdWU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIG1vbnN0ZXJDbHVlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBwcm9iYWJpbGl0eU1vbnN0ZXIgPSAwO1xuICAgIHByaXZhdGUgcHJvYmFiaWxpdHlUcmFwID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQgPSBlbXB0eSkge1xuICAgICAgICBpZiAoZWxlbWVudCA9PT0gdHJhcCkge1xuICAgICAgICAgICAgdGhpcy50cmFwID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50ID09PSBnb2FsKSB7XG4gICAgICAgICAgICB0aGlzLmdvYWwgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgPT09IG1vbnN0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMubW9uc3RlciA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBUaGUgZmxvb3IgaXMgZW1wdHkgb3RoZXJ3aXNlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNUcmFwKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFwO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0dvYWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdvYWw7XG4gICAgfVxuXG4gICAgcHVibGljIGlzTW9uc3RlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9uc3RlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNNb25zdGVyQ2x1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9uc3RlckNsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIGlzVHJhcENsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYXBDbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0VtcHR5KCkge1xuICAgICAgICBpZiAoIXRoaXMudHJhcCAmJlxuICAgICAgICAgICAgIXRoaXMuZ29hbCAmJlxuICAgICAgICAgICAgIXRoaXMubW9uc3RlciAmJlxuICAgICAgICAgICAgIXRoaXMudHJhcENsdWUgJiZcbiAgICAgICAgICAgICF0aGlzLm1vbnN0ZXJDbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldENsdWUoY2x1ZVR5cGU6IHN0cmluZykge1xuICAgICAgICBpZiAoY2x1ZVR5cGUgPT09IHRyYXApIHtcbiAgICAgICAgICAgIHRoaXMudHJhcENsdWUgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGNsdWVUeXBlID09PSBtb25zdGVyKSB7XG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXJDbHVlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBpc1Zpc2l0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0ZWQ7XG4gICAgfVxuICAgIHB1YmxpYyBzZXRWaXNpdGVkKGIgPSB0cnVlKSB7XG4gICAgICAgIHRoaXMudmlzaXRlZCA9IGI7XG4gICAgfVxuICAgIHB1YmxpYyBpc0FjY2Vzc2libGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjY2Vzc2libGU7XG4gICAgfVxuICAgIHB1YmxpYyBzZXRBY2Nlc3NpYmxlKGIgPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuYWNjZXNzaWJsZSA9IGI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hhdCBpcyB0aGUgcHJvYmFiaWxpdHkgdGhpcyBmbG9vciBpcyBhIG1vbnN0ZXI/XG4gICAgICovXG4gICAgcHVibGljIGdldFByb2JhYmlsaXR5TW9uc3RlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvYmFiaWxpdHlNb25zdGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgcHJvYmFiaWxpdHkgdGhpcyBmbG9vciBpcyBhIG1vbnN0ZXIuXG4gICAgICovXG4gICAgcHVibGljIHNldFByb2JhYmlsaXR5TW9uc3Rlcihwcm9iYWJpbGl0eSA9IDApIHtcbiAgICAgICAgdGhpcy5wcm9iYWJpbGl0eU1vbnN0ZXIgPSBwcm9iYWJpbGl0eTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcHJvYmFiaWxpdHkgdGhpcyBmbG9vciBpcyBhIG1vbnN0ZXIgZXZvbHZlZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkUHJvYmFiaWxpdHlNb25zdGVyKHByb2JhYmlsaXR5ID0gMCkge1xuICAgICAgICB0aGlzLnByb2JhYmlsaXR5TW9uc3RlciArPSBwcm9iYWJpbGl0eTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGF0IGlzIHRoZSBwcm9iYWJpbGl0eSB0aGlzIGZsb29yIGlzIGEgdHJhcD9cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UHJvYmFiaWxpdHlUcmFwKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9iYWJpbGl0eVRyYXA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBwcm9iYWJpbGl0eSB0aGlzIGZsb29yIGlzIGEgdHJhcC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0UHJvYmFiaWxpdHlUcmFwKHByb2JhYmlsaXR5ID0gMCkge1xuICAgICAgICB0aGlzLnByb2JhYmlsaXR5VHJhcCA9IHByb2JhYmlsaXR5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBwcm9iYWJpbGl0eSB0aGlzIGZsb29yIGlzIGEgdHJhcCBldm9sdmVkLlxuICAgICAqL1xuICAgIHB1YmxpYyBhZGRQcm9iYWJpbGl0eVRyYXAocHJvYmFiaWxpdHkgPSAwKSB7XG4gICAgICAgIHRoaXMucHJvYmFiaWxpdHlUcmFwICs9IHByb2JhYmlsaXR5O1xuICAgIH1cblxuICAgIHB1YmxpYyBraWxsTW9uc3RlcigpIHtcbiAgICAgICAgdGhpcy5tb25zdGVyID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHRvSHRtbChpc0tub3duOiBib29sZWFuID0gdHJ1ZSwgYWRkaXRpb25uYWxDbGFzc2VzOiBzdHJpbmdbXSkge1xuICAgICAgICBsZXQgY2xhc3Nlczogc3RyaW5nW10gPSBbXCJmbG9vckNhc2VcIl0uY29uY2F0KGFkZGl0aW9ubmFsQ2xhc3Nlcyk7XG5cbiAgICAgICAgaWYgKGlzS25vd24pIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChcInZpc2l0ZWRcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJ3YXJGb2dcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc1RyYXAoKSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKFwidHJhcFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0dvYWwoKSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKFwiZ29hbFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc01vbnN0ZXIoKSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKFwibW9uc3RlclwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc1RyYXBDbHVlKCkpIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChcInRyYXBDbHVlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzTW9uc3RlckNsdWUoKSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKFwibW9uc3RlckNsdWVcIik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCIke2NsYXNzZXMuam9pbihcIiBcIil9XCI+PC9kaXY+YDtcbiAgICB9XG59XG4iLCJpbXBvcnQge2VtcHR5LCBnb2FsLCBtb25zdGVyLCB0cmFwLCB0cmVlfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCBGbG9vciBmcm9tIFwiLi9GbG9vclwiO1xuXG4vKipcbiAqIEEgZ2xvb215IGRhcmsgZm9yZXN0LiBUaGVyZSBhcmUgbG90cyBvZiBtb25zdGVycyBhbmQgdHJhcHMgaGVyZS4gQmUgY2FyZWZ1bCwgd2FuZGVyZXIuLi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9yZXN0IHtcbiAgICBwcml2YXRlIGZvcmVzdDogRmxvb3JbXVtdID0gW107XG4gICAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGhlaWdodDogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKHcgPSAzLCBoID0gMykge1xuICAgICAgICB0aGlzLndpZHRoID0gdztcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoO1xuICAgIH1cblxuICAgIHB1YmxpYyBwb3B1bGF0ZShtYXhDaGFuY2VzID0gMjApIHtcbiAgICAgICAgLy8gU2V0IHRoZSBtb25zdGVycyBhbmQgdHJhcHNcbiAgICAgICAgbGV0IHRtcDogRmxvb3JbXVtdID0gW107XG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5oZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgdG1wW3ldID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRtcFJhbmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4Q2hhbmNlcyAtIDApICsgMCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodG1wUmFuZCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJdCdzIGEgbW9uc3RlciFcbiAgICAgICAgICAgICAgICAgICAgdG1wW3ldW3hdID0gbmV3IEZsb29yKG1vbnN0ZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodG1wUmFuZCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJdCdzIGEgdHJhcCFcbiAgICAgICAgICAgICAgICAgICAgdG1wW3ldW3hdID0gbmV3IEZsb29yKHRyYXApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRtcFt5XVt4XSA9IG5ldyBGbG9vcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9yZXN0ID0gdG1wO1xuXG4gICAgICAgIC8vIFNldCB0aGUgd2F5IG91dFxuICAgICAgICBsZXQgaXNBV2F5T3V0ID0gZmFsc2U7XG4gICAgICAgIGxldCBvdXRZO1xuICAgICAgICBsZXQgb3V0WDtcbiAgICAgICAgd2hpbGUgKCFpc0FXYXlPdXQpIHtcbiAgICAgICAgICAgIG91dFkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAodGhpcy5mb3Jlc3QubGVuZ3RoIC0gMCkgKyAwKTtcbiAgICAgICAgICAgIG91dFggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAodGhpcy5mb3Jlc3RbMF0ubGVuZ3RoIC0gMCkgKyAwKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZm9yZXN0W291dFldW291dFhdLmlzRW1wdHkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmVzdFtvdXRZXVtvdXRYXSA9IG5ldyBGbG9vcihnb2FsKTtcbiAgICAgICAgICAgICAgICBpc0FXYXlPdXQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgIGxldCBjZWxsID0gdGhpcy5mb3Jlc3RbeV1beF07XG4gICAgICAgICAgICAgICAgaWYgKGNlbGwuaXNNb25zdGVyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSXQncyBhIG1vbnN0ZXIhXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q2x1ZXMoeSwgeCwgbW9uc3Rlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjZWxsLmlzVHJhcCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEl0J3MgYSB0cmFwIVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENsdWVzKHksIHgsIHRyYXApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRGbG9vckNvbnRlbnQoeTogbnVtYmVyLCB4OiBudW1iZXIpOiBGbG9vciB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcmVzdFt5XVt4XTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Rm9yZXN0KCk6IEZsb29yW11bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcmVzdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0V2F5T3V0UG9zaXRpb24oKSB7XG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5oZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLndpZHRoOyB4KyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3Jlc3RbeV1beF0uaXNHb2FsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHt4LCB5fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TnVtYmVyT2ZDYXNlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZXN0Lmxlbmd0aCAqIHRoaXMuZm9yZXN0WzBdLmxlbmd0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldENsdWVzKHk6IG51bWJlciwgeDogbnVtYmVyLCBjb250ZW50OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHkgLSAxID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0W3kgLSAxXVt4XS5zZXRDbHVlKGNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh5ICsgMSA8IHRoaXMuaGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdFt5ICsgMV1beF0uc2V0Q2x1ZShjb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RbeV1beCAtIDFdLnNldENsdWUoY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHggKyAxIDwgdGhpcy53aWR0aCkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RbeV1beCArIDFdLnNldENsdWUoY29udGVudCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCBGb3Jlc3QgZnJvbSBcIi4vRm9yZXN0XCI7XG5pbXBvcnQgV2FuZGVyZXIgZnJvbSBcIi4vV2FuZGVyZXJcIjtcblxuLyoqXG4gKiBJdCdzIGEgZ2FtZSBmb3IgZXZlcnlvbmUsIGV4Y2VwdCBmb3IgdGhlIHdhbmRlcmVyLiBQb29yIHdhbmRlcmVyLi4uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xuICAgIHByaXZhdGUgY3VycmVudEZvcmVzdDogRm9yZXN0O1xuICAgIHByaXZhdGUgd2FuZGVyZXI6IFdhbmRlcmVyO1xuICAgIHByaXZhdGUgZ2FtZURpdjogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBzY29yZURpdjogSFRNTEVsZW1lbnQ7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoZ2FtZURpdjogc3RyaW5nLCBzY29yZURpdjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZ2FtZURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGdhbWVEaXYpO1xuICAgICAgICB0aGlzLnNjb3JlRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2NvcmVEaXYpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KHcgPSAzLCBoID0gMykge1xuICAgICAgICB0aGlzLmNyZWF0ZUZvcmVzdCh3LCBoKTtcbiAgICAgICAgdGhpcy5nZXRGb3Jlc3QoKS5wb3B1bGF0ZSgpO1xuICAgICAgICB0aGlzLnNldFdhbmRlcmVyKCk7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMud2FuZGVyZXIuaXNEZWFkKCkpIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiWW91IGRpZS5cIik7XG4gICAgICAgICAgICB0aGlzLndhbmRlcmVyLnNldFNjb3JlKC0oMTAgKiB0aGlzLmdldEZvcmVzdCgpLmdldE51bWJlck9mQ2FzZXMoKSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLndhbmRlcmVyLmlzT3V0KCkpIHtcbiAgICAgICAgICAgIC8vIFlvdSBqdXN0IHdvbiB0aGlzIGZvcmVzdCAhXG4gICAgICAgICAgICB0aGlzLndhbmRlcmVyLnNldFNjb3JlKDEwICogdGhpcy5nZXRGb3Jlc3QoKS5nZXROdW1iZXJPZkNhc2VzKCkpO1xuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBuZXh0IGxldmVsXG4gICAgICAgICAgICBjb25zdCBuZXdTaXplID0gdGhpcy5nZXRGb3Jlc3QoKS5nZXRGb3Jlc3QoKS5sZW5ndGggKyAxO1xuICAgICAgICAgICAgdGhpcy5pbml0KG5ld1NpemUsIG5ld1NpemUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy53YW5kZXJlci51cGRhdGVNYXAoKTtcblxuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRXYW5kZXJlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2FuZGVyZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVGb3Jlc3QodyA9IDMsIGggPSAzKTogR2FtZSB7XG4gICAgICAgIHRoaXMuY3VycmVudEZvcmVzdCA9IG5ldyBGb3Jlc3QodywgaCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Rm9yZXN0KCk6IEZvcmVzdCB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRGb3Jlc3Q7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRXYW5kZXJlcigpOiBHYW1lIHtcbiAgICAgICAgY29uc3QgZm9yZXN0ID0gdGhpcy5jdXJyZW50Rm9yZXN0LmdldEZvcmVzdCgpO1xuXG4gICAgICAgIGlmICghZm9yZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGxldCBpc09rID0gZmFsc2U7XG4gICAgICAgIGxldCB5O1xuICAgICAgICBsZXQgeDtcbiAgICAgICAgd2hpbGUgKCFpc09rKSB7XG4gICAgICAgICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGZvcmVzdC5sZW5ndGggLSAwKSArIDApO1xuICAgICAgICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChmb3Jlc3RbMF0ubGVuZ3RoIC0gMCkgKyAwKTtcblxuICAgICAgICAgICAgaWYgKGZvcmVzdFt5XVt4XS5pc0VtcHR5KSB7XG4gICAgICAgICAgICAgICAgaXNPayA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG9sZFNjb3JlID0gMDtcbiAgICAgICAgaWYgKHRoaXMud2FuZGVyZXIpIHtcbiAgICAgICAgICAgIG9sZFNjb3JlID0gdGhpcy53YW5kZXJlci5nZXRTY29yZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud2FuZGVyZXIgPSBuZXcgV2FuZGVyZXIoeSwgeCwgdGhpcy5jdXJyZW50Rm9yZXN0LCBvbGRTY29yZSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGZvcmVzdCA9IHRoaXMuZ2V0Rm9yZXN0KCkuZ2V0Rm9yZXN0KCk7XG4gICAgICAgIGNvbnN0IHdhbmRlcmVyID0gdGhpcy53YW5kZXJlcjtcblxuICAgICAgICBsZXQgaHRtbDogc3RyaW5nID0gXCJcIjtcblxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuY3VycmVudEZvcmVzdC5nZXRGb3Jlc3QoKS5sZW5ndGg7IHkrKykge1xuICAgICAgICAgICAgaHRtbCArPSBcIjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XCI7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuY3VycmVudEZvcmVzdC5nZXRGb3Jlc3QoKVswXS5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgICAgIGxldCB3YW5kZXJlclBvcyA9IHdhbmRlcmVyLmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgbGV0IGZsb29yID0gdGhpcy5jdXJyZW50Rm9yZXN0LmdldEZvcmVzdCgpW3ldW3hdO1xuICAgICAgICAgICAgICAgIGxldCBhZGRpdGlvbm5hbENsYXNzZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGlmICh3YW5kZXJlclBvcy54ID09PSB4ICYmIHdhbmRlcmVyUG9zLnkgPT09IHkpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25uYWxDbGFzc2VzLnB1c2goXCJ3YW5kZXJlclwiKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBodG1sICs9IGZsb29yLnRvSHRtbCh0aGlzLndhbmRlcmVyLmlzS25vd24oeSwgeCksIGFkZGl0aW9ubmFsQ2xhc3Nlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBodG1sICs9IFwiPC9kaXY+XCI7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdhbWVEaXYuY2xhc3NOYW1lID0gXCJcIjtcbiAgICAgICAgdGhpcy5nYW1lRGl2LmNsYXNzTGlzdC5hZGQoYHdpZHRoJHtmb3Jlc3QubGVuZ3RofWApO1xuICAgICAgICB0aGlzLmdhbWVEaXYuaW5uZXJIVE1MID0gaHRtbDtcblxuICAgICAgICB0aGlzLnNjb3JlRGl2LmlubmVySFRNTCA9IHdhbmRlcmVyLmdldFNjb3JlKCkudG9TdHJpbmcoKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCBcImpzcHJvbG9nXCI7XG5pbXBvcnQgRmxvb3IgZnJvbSBcIi4vRmxvb3JcIjtcbmltcG9ydCBGb3Jlc3QgZnJvbSBcIi4vRm9yZXN0XCI7XG5cbi8qKlxuICogVGhlIHdhbmRlcmVyLCB0aGUgaGVybyBvZiB0aGlzIHF1ZXN0LiBHb29kIGx1Y2sgc29uLi4uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbmRlcmVyIHtcbiAgICBwcml2YXRlIGZvcmVzdDogRm9yZXN0O1xuICAgIHByaXZhdGUgZm9yZXN0TWFwV2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIGZvcmVzdE1hcEhlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgZm9yZXN0TWFwOiBGbG9vcltdW10gPSBbXTtcbiAgICBwcml2YXRlIHk6IG51bWJlcjtcbiAgICBwcml2YXRlIHg6IG51bWJlcjtcbiAgICBwcml2YXRlIHNjb3JlOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXJZOiBudW1iZXIsIHBsYXllclg6IG51bWJlciwgZGFya1dvb2RzOiBGb3Jlc3QsIHNjb3JlOiBudW1iZXIgPSAwKSB7XG4gICAgICAgIHRoaXMuZm9yZXN0ID0gZGFya1dvb2RzO1xuICAgICAgICB0aGlzLnNjb3JlID0gc2NvcmU7XG4gICAgICAgIHRoaXMueCA9IHBsYXllclg7XG4gICAgICAgIHRoaXMueSA9IHBsYXllclk7XG5cbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gZGFya1dvb2RzLmdldEZvcmVzdCgpLmxlbmd0aDtcbiAgICAgICAgY29uc3Qgd2lkdGggPSBkYXJrV29vZHMuZ2V0Rm9yZXN0KClbMF0ubGVuZ3RoO1xuXG4gICAgICAgIHRoaXMuZm9yZXN0TWFwSGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLmZvcmVzdE1hcFdpZHRoID0gd2lkdGg7XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBoZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbeV0gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgd2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3ldW3hdID0gbmV3IEZsb29yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TWFwSGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3Jlc3RNYXAubGVuZ3RoO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNYXBXaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZXN0TWFwWzBdLmxlbmd0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNLbm93bih5OiBudW1iZXIsIHg6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3Jlc3RNYXBbeV1beF0uaXNWaXNpdGVkKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEZvcmVzdChmb3Jlc3Q6IEZvcmVzdCkge1xuICAgICAgICB0aGlzLmZvcmVzdCA9IGZvcmVzdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0UG9zaXRpb24oeTogbnVtYmVyLCB4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UG9zaXRpb24oKSB7XG4gICAgICAgIHJldHVybiB7eDogdGhpcy54LCB5OiB0aGlzLnl9O1xuICAgIH1cblxuICAgIHB1YmxpYyB0b0h0bWwoKSB7XG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cImZsb29yQ2FzZSB3YW5kZXJlclwiPjwvZGl2PmA7XG4gICAgfVxuXG4gICAgcHVibGljIHdhdGNoVGhlRmxvb3IoKTogRmxvb3Ige1xuICAgICAgICByZXR1cm4gdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnhdO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVNYXAoKSB7XG4gICAgICAgIGxldCBtb25zdGVyQ2x1ZSA9IGZhbHNlO1xuICAgICAgICBsZXQgdHJhcENsdWUgPSBmYWxzZTtcbiAgICAgICAgbGV0IG51bWJlckFkamFjZW50VmlzaXRlZCA9IHRoaXMubnVtYmVyQWRqYWNlbnRWaXNpdGVkKHRoaXMueSwgdGhpcy54KTtcbiAgICAgICAgbGV0IHByb2JhYmlsaXR5ID0gMDtcbiAgICAgICAgaWYgKG51bWJlckFkamFjZW50VmlzaXRlZCA8IDQpIHtcbiAgICAgICAgICAgIHByb2JhYmlsaXR5ID0gMSAvICggNCAtIG51bWJlckFkamFjZW50VmlzaXRlZCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueF0gPSB0aGlzLmZvcmVzdC5nZXRGbG9vckNvbnRlbnQodGhpcy55LCB0aGlzLngpO1xuICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueF0uc2V0VmlzaXRlZCh0cnVlKTtcblxuICAgICAgICAvLyBObyBjaGVhdCBoZXJlLCBqdXN0IHVzZWQgZm9yIHN0b3JpbmcgdGhlIHByb2JhYmlsaXRpZXNcbiAgICAgICAgaWYgKHRoaXMueSArIDEgPCB0aGlzLmZvcmVzdE1hcC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueSArIDFdW3RoaXMueF0gPSB0aGlzLmZvcmVzdC5nZXRGbG9vckNvbnRlbnQodGhpcy55ICsgMSwgdGhpcy54KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy55IC0gMSA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnkgLSAxXVt0aGlzLnhdID0gdGhpcy5mb3Jlc3QuZ2V0Rmxvb3JDb250ZW50KHRoaXMueSAtIDEsIHRoaXMueCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMueCArIDEgPCB0aGlzLmZvcmVzdE1hcFswXS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54ICsgMV0gPSB0aGlzLmZvcmVzdC5nZXRGbG9vckNvbnRlbnQodGhpcy55LCB0aGlzLnggKyAxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy54IC0gMSA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueCAtIDFdID0gdGhpcy5mb3Jlc3QuZ2V0Rmxvb3JDb250ZW50KHRoaXMueSwgdGhpcy54IC0gMSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICh0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueF0uaXNNb25zdGVyQ2x1ZSgpKSB7XG4gICAgICAgICAgICBtb25zdGVyQ2x1ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54XS5pc1RyYXBDbHVlKCkpIHtcbiAgICAgICAgICAgIHRyYXBDbHVlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpbmQgYWRqYWNlbnQgZmxvb3JzXG4gICAgICAgIGlmICh0aGlzLnkgKyAxIDwgdGhpcy5mb3Jlc3RNYXAubGVuZ3RoICYmICF0aGlzLmZvcmVzdE1hcFt0aGlzLnkgKyAxXVt0aGlzLnhdLmlzVmlzaXRlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnkgKyAxXVt0aGlzLnhdLnNldEFjY2Vzc2libGUodHJ1ZSk7XG4gICAgICAgICAgICBpZiAobW9uc3RlckNsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnkgKyAxXVt0aGlzLnhdLmFkZFByb2JhYmlsaXR5TW9uc3Rlcihwcm9iYWJpbGl0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHJhcENsdWUpIHtcbiAgICAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueSArIDFdW3RoaXMueF0uYWRkUHJvYmFiaWxpdHlUcmFwKHByb2JhYmlsaXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy55IC0gMSA+PSAwICYmICF0aGlzLmZvcmVzdE1hcFt0aGlzLnkgLSAxXVt0aGlzLnhdLmlzVmlzaXRlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnkgLSAxXVt0aGlzLnhdLnNldEFjY2Vzc2libGUodHJ1ZSk7XG4gICAgICAgICAgICBpZiAobW9uc3RlckNsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnkgLSAxXVt0aGlzLnhdLmFkZFByb2JhYmlsaXR5TW9uc3Rlcihwcm9iYWJpbGl0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHJhcENsdWUpIHtcbiAgICAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3RoaXMueSAtIDFdW3RoaXMueF0uYWRkUHJvYmFiaWxpdHlUcmFwKHByb2JhYmlsaXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy54ICsgMSA8IHRoaXMuZm9yZXN0TWFwWzBdLmxlbmd0aCAmJiAhdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggKyAxXS5pc1Zpc2l0ZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggKyAxXS5zZXRBY2Nlc3NpYmxlKHRydWUpO1xuICAgICAgICAgICAgaWYgKG1vbnN0ZXJDbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggKyAxXS5hZGRQcm9iYWJpbGl0eU1vbnN0ZXIocHJvYmFiaWxpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRyYXBDbHVlKSB7XG4gICAgICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueCArIDFdLmFkZFByb2JhYmlsaXR5VHJhcChwcm9iYWJpbGl0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMueCAtIDEgPj0gMCAmJiAhdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggLSAxXS5pc1Zpc2l0ZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggLSAxXS5zZXRBY2Nlc3NpYmxlKHRydWUpO1xuICAgICAgICAgICAgaWYgKG1vbnN0ZXJDbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbdGhpcy55XVt0aGlzLnggLSAxXS5hZGRQcm9iYWJpbGl0eU1vbnN0ZXIocHJvYmFiaWxpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRyYXBDbHVlKSB7XG4gICAgICAgICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueCAtIDFdLmFkZFByb2JhYmlsaXR5VHJhcChwcm9iYWJpbGl0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgdGhpbmsoKSB7XG4gICAgICAgIGxldCB0aGlzRmxvb3IgPSB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueF07XG5cbiAgICAgICAgLy8gSGVyZSBnb2VzIGFsbCB0aGUgbG9naWNhbCBzdHVmZlxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBtb3ZlKGRpcmVjdGlvbjogc3RyaW5nKSB7XG4gICAgICAgIGxldCBjdXJyZW50UG9zID0gdGhpcy5nZXRQb3NpdGlvbigpO1xuICAgICAgICBsZXQgbmV3VmFsO1xuXG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IGN1cnJlbnRQb3MueCAtIDE7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbCA+PSAwKSB7IHRoaXMueCA9IG5ld1ZhbDsgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgICAgICAgICAgbmV3VmFsID0gY3VycmVudFBvcy54ICsgMTtcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsIDwgdGhpcy5mb3Jlc3RNYXBXaWR0aCkgeyB0aGlzLnggPSBuZXdWYWw7IH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ1cFwiOlxuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IGN1cnJlbnRQb3MueSAtIDE7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbCA+PSAwKSB7IHRoaXMueSA9IG5ld1ZhbDsgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImRvd25cIjpcbiAgICAgICAgICAgICAgICBuZXdWYWwgPSBjdXJyZW50UG9zLnkgKyAxO1xuICAgICAgICAgICAgICAgIGlmIChuZXdWYWwgPCB0aGlzLmZvcmVzdE1hcEhlaWdodCkgeyB0aGlzLnkgPSBuZXdWYWw7IH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFNjb3JlKC0xMCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIG51bWJlckFkamFjZW50VmlzaXRlZCh5OiBudW1iZXIsIHg6IG51bWJlcikge1xuICAgICAgICBsZXQgbnVtID0gMDtcblxuICAgICAgICBpZiAoIHkgKyAxIDwgdGhpcy5mb3Jlc3RNYXAubGVuZ3RoICYmIHRoaXMuZm9yZXN0TWFwW3kgKyAxXVt4XS5pc1Zpc2l0ZWQoKSkge1xuICAgICAgICAgICAgbnVtICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCB5IC0gMSA+PSAwICAmJiB0aGlzLmZvcmVzdE1hcFt5IC0gMV1beF0uaXNWaXNpdGVkKCkpIHtcbiAgICAgICAgICAgIG51bSArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmICggeCArIDEgPCB0aGlzLmZvcmVzdE1hcFswXS5sZW5ndGggICYmIHRoaXMuZm9yZXN0TWFwW3ldW3ggKyAxXS5pc1Zpc2l0ZWQoKSkge1xuICAgICAgICAgICAgbnVtICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCB4IC0gMSA+PSAwICAmJiB0aGlzLmZvcmVzdE1hcFt5XVt4IC0gMV0uaXNWaXNpdGVkKCkpIHtcbiAgICAgICAgICAgIG51bSArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudW07XG4gICAgfVxuXG4gICAgcHVibGljIHVzZVNsaW5nc2hvdCh5OiBudW1iZXIsIHg6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5mb3Jlc3QuZ2V0Rmxvb3JDb250ZW50KHksIHgpLmlzTW9uc3RlcigpKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdC5nZXRGbG9vckNvbnRlbnQoeSwgeCkua2lsbE1vbnN0ZXIoKTtcbiAgICAgICAgICAgIC8vIEB0b2RvIENhbGwgYW5pbWF0aW9uXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNPdXQoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHdheU91dFBvc2l0aW9uID0gdGhpcy5mb3Jlc3QuZ2V0V2F5T3V0UG9zaXRpb24oKTtcblxuICAgICAgICBpZiAodGhpcy54ID09PSB3YXlPdXRQb3NpdGlvbi54ICYmIHRoaXMueSA9PT0gd2F5T3V0UG9zaXRpb24ueSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNEZWFkKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy53YXRjaFRoZUZsb29yKCkuaXNUcmFwKCkgfHwgdGhpcy53YXRjaFRoZUZsb29yKCkuaXNNb25zdGVyKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldFNjb3JlKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2NvcmUgKz0gdmFsO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTY29yZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5zY29yZTtcbiAgICB9XG59XG4iLCJleHBvcnQgY29uc3QgdHJhcCA9IFwidHJhcFwiO1xuZXhwb3J0IGNvbnN0IGVtcHR5ID0gXCJcIjtcbmV4cG9ydCBjb25zdCBnb2FsID0gXCJnb2FsXCI7XG5leHBvcnQgY29uc3QgbW9uc3RlciA9IFwibW9uc3RlclwiO1xuZXhwb3J0IGNvbnN0IHRyZWUgPSBcInRyZWVcIjtcbiIsImltcG9ydCAqIGFzICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0ICogYXMganNib2FyZCBmcm9tIFwiLi9Gb3Jlc3RcIjtcbmltcG9ydCBHYW1lIGZyb20gXCIuL0dhbWVcIjtcblxubGV0IGcgPSBuZXcgR2FtZShcImdhbWVEaXZcIiwgXCJzY29yZURpdlwiKTtcbmcuaW5pdCgzLCAzKTtcbmcudXBkYXRlKCk7XG5cbi8vIEluaXQgbWFudWFsIGdhbWVcbmRvY3VtZW50Lm9ua2V5ZG93biA9IChlKSA9PiB7XG4gICAgbGV0IGFycm93S2V5SGF2ZUJlZW5QcmVzc2VkID0gZmFsc2U7XG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSAzNzpcbiAgICAgICAgICAgIGcuZ2V0V2FuZGVyZXIoKS5tb3ZlKFwibGVmdFwiKTtcbiAgICAgICAgICAgIGFycm93S2V5SGF2ZUJlZW5QcmVzc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgZy5nZXRXYW5kZXJlcigpLm1vdmUoXCJ1cFwiKTtcbiAgICAgICAgICAgIGFycm93S2V5SGF2ZUJlZW5QcmVzc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgZy5nZXRXYW5kZXJlcigpLm1vdmUoXCJyaWdodFwiKTtcbiAgICAgICAgICAgIGFycm93S2V5SGF2ZUJlZW5QcmVzc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgZy5nZXRXYW5kZXJlcigpLm1vdmUoXCJkb3duXCIpO1xuICAgICAgICAgICAgYXJyb3dLZXlIYXZlQmVlblByZXNzZWQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoYXJyb3dLZXlIYXZlQmVlblByZXNzZWQpIHtcbiAgICAgICAgZy51cGRhdGUoKTtcbiAgICB9XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBBU1QgPSByZXF1aXJlKCcuL3Byb2xvZ0FTVCcpO1xyXG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi9wcm9sb2dQYXJzZXInKTtcclxudmFyIFNvbHZlciA9IHJlcXVpcmUoJy4vcHJvbG9nU29sdmVyJyk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0geyBBU1Q6IEFTVCwgUGFyc2VyOiBQYXJzZXIsIFNvbHZlcjogU29sdmVyIH07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59O1xyXG4oZnVuY3Rpb24gKFBhcnRUeXBlKSB7XHJcbiAgICBQYXJ0VHlwZVtQYXJ0VHlwZVtcIlZhcmlhYmxlXCJdID0gMF0gPSBcIlZhcmlhYmxlXCI7XHJcbiAgICBQYXJ0VHlwZVtQYXJ0VHlwZVtcIkF0b21cIl0gPSAxXSA9IFwiQXRvbVwiO1xyXG4gICAgUGFydFR5cGVbUGFydFR5cGVbXCJUZXJtXCJdID0gMl0gPSBcIlRlcm1cIjtcclxufSkoZXhwb3J0cy5QYXJ0VHlwZSB8fCAoZXhwb3J0cy5QYXJ0VHlwZSA9IHt9KSk7XHJcbnZhciBQYXJ0VHlwZSA9IGV4cG9ydHMuUGFydFR5cGU7XHJcbnZhciBQYXJ0ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQGNsYXNzIFBhcnRcclxuICAgICAqIEBjbGFzc2Rlc2MgUGFydCA6PSBWYXJpYWJsZShuYW1lKSB8IEF0b20obmFtZSkgfCBUZXJtKG5hbWUsIHBhcnRsaXN0KVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgdmFyaWFibGUvYXRvbS90ZXJtXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFBhcnQobmFtZSkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB9XHJcbiAgICBQYXJ0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBQYXJ0O1xyXG59KCkpO1xyXG5leHBvcnRzLlBhcnQgPSBQYXJ0O1xyXG52YXIgVmFyaWFibGUgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFZhcmlhYmxlLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gVmFyaWFibGUobmFtZSkge1xyXG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIG5hbWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFZhcmlhYmxlO1xyXG59KFBhcnQpKTtcclxuZXhwb3J0cy5WYXJpYWJsZSA9IFZhcmlhYmxlO1xyXG5WYXJpYWJsZS5wcm90b3R5cGUudHlwZSA9IFBhcnRUeXBlLlZhcmlhYmxlOyAvLyBUT0RPOiAgdmVyaWZ5IGlmIGl0J3MgZmFzdGVyIHRoYW4gaW5zdGFuY2VvZiBjaGVja3NcclxudmFyIEF0b20gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKEF0b20sIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBBdG9tKGhlYWQpIHtcclxuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCBoZWFkKTtcclxuICAgIH1cclxuICAgIEF0b20uTmlsID0gbmV3IEF0b20obnVsbCk7XHJcbiAgICByZXR1cm4gQXRvbTtcclxufShQYXJ0KSk7XHJcbmV4cG9ydHMuQXRvbSA9IEF0b207XHJcbkF0b20ucHJvdG90eXBlLnR5cGUgPSBQYXJ0VHlwZS5BdG9tOyAvLyBUT0RPOiAgdmVyaWZ5IGlmIGl0J3MgZmFzdGVyIHRoYW4gaW5zdGFuY2VvZiBjaGVja3NcclxuLyoqXHJcbiAqIFRlcm0obmFtZSwgbGlzdClcclxuICovXHJcbnZhciBUZXJtID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhUZXJtLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gVGVybShoZWFkLCBsaXN0KSB7XHJcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgaGVhZCk7XHJcbiAgICAgICAgdGhpcy5wYXJ0bGlzdCA9IG5ldyBQYXJ0bGlzdChsaXN0KTtcclxuICAgIH1cclxuICAgIFRlcm0ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBcIlwiO1xyXG4gICAgICAgIGlmICh0aGlzLm5hbWUgPT0gXCJjb25zXCIpIHtcclxuICAgICAgICAgICAgdmFyIHggPSB0aGlzO1xyXG4gICAgICAgICAgICB3aGlsZSAoeCBpbnN0YW5jZW9mIFRlcm0gJiYgeC5uYW1lID09IFwiY29uc1wiICYmIHgucGFydGxpc3QubGlzdC5sZW5ndGggPT0gMikge1xyXG4gICAgICAgICAgICAgICAgeCA9IHgucGFydGxpc3QubGlzdFsxXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoKHggPT09IEF0b20uTmlsKSB8fCB4IGluc3RhbmNlb2YgVmFyaWFibGUpIHtcclxuICAgICAgICAgICAgICAgIHggPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiW1wiO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKHgudHlwZSA9PSBQYXJ0VHlwZS5UZXJtICYmIHgubmFtZSA9PSBcImNvbnNcIiAmJiB4LnBhcnRsaXN0Lmxpc3QubGVuZ3RoID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIiwgXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSB4LnBhcnRsaXN0Lmxpc3RbMF0udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb20gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHggPSB4LnBhcnRsaXN0Lmxpc3RbMV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoeC50eXBlID09IFBhcnRUeXBlLlZhcmlhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiIHwgXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCJdXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiRVJST1I6IHVuZXhwZWN0ZWQgYXRvbTogXCIgKyB4LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0ICs9IHRoaXMubmFtZSArIFwiKFwiICsgdGhpcy5wYXJ0bGlzdC50b1N0cmluZygpICsgXCIpXCI7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcbiAgICA7XHJcbiAgICByZXR1cm4gVGVybTtcclxufShQYXJ0KSk7XHJcbmV4cG9ydHMuVGVybSA9IFRlcm07XHJcblRlcm0ucHJvdG90eXBlLnR5cGUgPSBQYXJ0VHlwZS5UZXJtOyAvLyBUT0RPOiAgdmVyaWZ5IGlmIGl0J3MgZmFzdGVyIHRoYW4gaW5zdGFuY2VvZiBjaGVja3NcclxudmFyIFBhcnRsaXN0ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFBhcnRsaXN0KGxpc3QpIHtcclxuICAgICAgICB0aGlzLmxpc3QgPSBsaXN0O1xyXG4gICAgfVxyXG4gICAgUGFydGxpc3QucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QubWFwKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLnRvU3RyaW5nKCk7IH0pLmpvaW4oXCIsIFwiKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUGFydGxpc3Q7XHJcbn0oKSk7XHJcbmV4cG9ydHMuUGFydGxpc3QgPSBQYXJ0bGlzdDtcclxuLyoqXHJcbiAqIFJ1bGUoaGVhZCwgYm9keWxpc3QpOiBQYXJ0KGhlYWQpLCBbOi0gQm9keShib2R5bGlzdCldLlxyXG4gKi9cclxudmFyIFJ1bGUgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gUnVsZShoZWFkLCBib2R5bGlzdCkge1xyXG4gICAgICAgIHRoaXMuaGVhZCA9IGhlYWQ7XHJcbiAgICAgICAgdGhpcy5ib2R5ID0gYm9keWxpc3QgJiYgbmV3IFBhcnRsaXN0KGJvZHlsaXN0KTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSdWxlLnByb3RvdHlwZSwgXCJpc0ZhY3RcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuYm9keTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIFJ1bGUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhlYWQudG9TdHJpbmcoKSArICh0aGlzLmJvZHkgPyBcIiA6LSBcIiArIHRoaXMuYm9keS50b1N0cmluZygpICsgXCIuXCIgOiBcIi5cIik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFJ1bGU7XHJcbn0oKSk7XHJcbmV4cG9ydHMuUnVsZSA9IFJ1bGU7XHJcbmZ1bmN0aW9uIGxpc3RPZkFycmF5KGFycmF5LCBjZHIpIHtcclxuICAgIGNkciA9IGNkciB8fCBBdG9tLk5pbDtcclxuICAgIGZvciAodmFyIGkgPSBhcnJheS5sZW5ndGgsIGNhcjsgY2FyID0gYXJyYXlbLS1pXTspIHtcclxuICAgICAgICBjZHIgPSBuZXcgVGVybShcImNvbnNcIiwgW2NhciwgY2RyXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2RyO1xyXG59XHJcbmV4cG9ydHMubGlzdE9mQXJyYXkgPSBsaXN0T2ZBcnJheTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBwcm9sb2dBU1RfMSA9IHJlcXVpcmUoJy4vcHJvbG9nQVNUJyk7XHJcbi8qKlxyXG4gKiBQYXJzZXMgdGhlIERCXHJcbiAqL1xyXG5mdW5jdGlvbiBwYXJzZShzdHJpbmcpIHtcclxuICAgIHZhciB0ayA9IG5ldyBUb2tlbmlzZXIoc3RyaW5nKSwgcnVsZXMgPSBbXTtcclxuICAgIHdoaWxlICh0ay5jdXJyZW50ICE9IG51bGwpIHtcclxuICAgICAgICBydWxlcy5wdXNoKHBhcnNlUnVsZSh0aykpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJ1bGVzO1xyXG59XHJcbmV4cG9ydHMucGFyc2UgPSBwYXJzZTtcclxuZnVuY3Rpb24gcGFyc2VRdWVyeShzdHJpbmcpIHtcclxuICAgIHZhciB0ayA9IG5ldyBUb2tlbmlzZXIoc3RyaW5nKTtcclxuICAgIHJldHVybiBuZXcgcHJvbG9nQVNUXzEuUGFydGxpc3QocGFyc2VCb2R5KHRrKSk7XHJcbn1cclxuZXhwb3J0cy5wYXJzZVF1ZXJ5ID0gcGFyc2VRdWVyeTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmRlZmF1bHQgPSB7IHBhcnNlOiBwYXJzZSwgcGFyc2VRdWVyeTogcGFyc2VRdWVyeSB9O1xyXG52YXIgdG9rZW5pemVyUnVsZXMgPSBbXHJcbiAgICBbL14oW1xcKFxcKVxcLixcXFtcXF1cXHxdfFxcOlxcLSkvLCAwIC8qIFB1bmMgKi9dLFxyXG4gICAgWy9eKFtBLVpfXVthLXpBLVowLTlfXSopLywgMSAvKiBWYXIgKi9dLFxyXG4gICAgWy9eKFwiW15cIl0qXCIpLywgMiAvKiBJZCAqL10sXHJcbiAgICBbL14oW2Etel1bYS16QS1aMC05X10qKS8sIDIgLyogSWQgKi9dLFxyXG4gICAgWy9eKC0/XFxkKyhcXC5cXGQrKT8pLywgMiAvKiBJZCAqLywgZnVuY3Rpb24gKHgpIHsgcmV0dXJuICt4OyB9XSxcclxuICAgIFsvXihcXCt8XFwtfFxcKnxcXC98XFw9fFxcISkvLCAyIC8qIElkICovXVxyXG5dO1xyXG52YXIgVG9rZW5pc2VyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFRva2VuaXNlcihzb3VyY2UpIHtcclxuICAgICAgICB0aGlzLnJlbWFpbmRlciA9IHNvdXJjZTtcclxuICAgICAgICB0aGlzLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IG51bGw7IC8vIFwiZW9mXCIsIFRva2VuVHlwZS5JZCwgVG9rZW5UeXBlLlZhciwgVG9rZW5UeXBlLlB1bmMgZXRjLiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jb25zdW1lKCk7IC8vIExvYWQgdXAgdGhlIGZpcnN0IHRva2VuLlxyXG4gICAgfVxyXG4gICAgVG9rZW5pc2VyLnByb3RvdHlwZS5jb25zdW1lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gMyAvKiBFT0YgKi8pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyBFYXQgYW55IGxlYWRpbmcgV1MgYW5kICUtc3R5bGUgY29tbWVudHNcclxuICAgICAgICB2YXIgciA9IHRoaXMucmVtYWluZGVyLm1hdGNoKC9eKFxccyt8KFslXS4qKVtcXG5cXHJdKykqLyk7XHJcbiAgICAgICAgaWYgKHIpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1haW5kZXIgPSB0aGlzLnJlbWFpbmRlci5zdWJzdHJpbmcoclswXS5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMucmVtYWluZGVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnR5cGUgPSAzIC8qIEVPRiAqLztcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcnVsZTsgcnVsZSA9IHRva2VuaXplclJ1bGVzW2krK107KSB7XHJcbiAgICAgICAgICAgIGlmIChyID0gdGhpcy5yZW1haW5kZXIubWF0Y2gocnVsZVswXSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtYWluZGVyID0gdGhpcy5yZW1haW5kZXIuc3Vic3RyaW5nKHJbMF0ubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IHJ1bGVbMV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSB0eXBlb2YgKHJ1bGVbMl0pID09PSBcImZ1bmN0aW9uXCIgPyBydWxlWzJdKHJbMV0pIDogclsxXTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBcIlVuZXhwZWN0ZWQgdG9rZW5pemVyIGlucHV0XCI7XHJcbiAgICB9O1xyXG4gICAgVG9rZW5pc2VyLnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbiAodHlwZSwgc3ltYm9sKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gdHlwZSAmJiAodHlwZW9mIChzeW1ib2wpID09PSBcInVuZGVmaW5lZFwiIHx8IHRoaXMuY3VycmVudCA9PT0gc3ltYm9sKSkge1xyXG4gICAgICAgICAgICB0aGlzLmFjY2VwdGVkID0gdGhpcy5jdXJyZW50O1xyXG4gICAgICAgICAgICB0aGlzLmNvbnN1bWUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcbiAgICBUb2tlbmlzZXIucHJvdG90eXBlLmV4cGVjdCA9IGZ1bmN0aW9uICh0eXBlLCBzeW1ib2wpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYWNjZXB0KHR5cGUsIHN5bWJvbCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgdGhpcy50eXBlID09PSAzIC8qIEVPRiAqLyA/IFwiU3ludGF4IGVycm9yOiB1bmV4cGVjdGVkIGVuZCBvZiBmaWxlXCIgOiBcIlN5bnRheCBlcnJvcjogdW5leHBlY3RlZCB0b2tlbiBcIiArIHRoaXMuY3VycmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7IC8vIFRPRE86IG5vIG5lZWQgZm9yIGJvb2xlYW4/XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFRva2VuaXNlcjtcclxufSgpKTtcclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5mdW5jdGlvbiBwYXJzZVJ1bGUodGspIHtcclxuICAgIC8vIFJ1bGUgOj0gVGVybSAuIHwgVGVybSA6LSBQYXJ0TGlzdCAuXHJcbiAgICB2YXIgaCA9IHBhcnNlVGVybSh0ayk7XHJcbiAgICBpZiAodGsuYWNjZXB0KDAgLyogUHVuYyAqLywgXCIuXCIpKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBwcm9sb2dBU1RfMS5SdWxlKGgpO1xyXG4gICAgfVxyXG4gICAgdGsuZXhwZWN0KDAgLyogUHVuYyAqLywgXCI6LVwiKTtcclxuICAgIHZhciBiID0gcGFyc2VCb2R5KHRrKTtcclxuICAgIHJldHVybiBuZXcgcHJvbG9nQVNUXzEuUnVsZShoLCBiKTtcclxufVxyXG5mdW5jdGlvbiBwYXJzZVRlcm0odGspIHtcclxuICAgIHRrLmV4cGVjdCgyIC8qIElkICovKTtcclxuICAgIHZhciBuYW1lID0gdGsuYWNjZXB0ZWQ7XHJcbiAgICAvLyBhY2NlcHQgZmFpbCBhbmQgISB3L28gKClcclxuICAgIGlmICh0ay5jdXJyZW50ICE9IFwiKFwiICYmIChuYW1lID09IFwiZmFpbFwiIHx8IG5hbWUgPT09IFwiIVwiKSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgcHJvbG9nQVNUXzEuVGVybShuYW1lLCBbXSk7XHJcbiAgICB9XHJcbiAgICB0ay5leHBlY3QoMCAvKiBQdW5jICovLCBcIihcIik7XHJcbiAgICB2YXIgcCA9IFtdO1xyXG4gICAgd2hpbGUgKHRrLmN1cnJlbnQgIT09IFwiZW9mXCIpIHtcclxuICAgICAgICBwLnB1c2gocGFyc2VQYXJ0KHRrKSk7XHJcbiAgICAgICAgaWYgKHRrLmFjY2VwdCgwIC8qIFB1bmMgKi8sIFwiKVwiKSkge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGsuZXhwZWN0KDAgLyogUHVuYyAqLywgXCIsXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBwcm9sb2dBU1RfMS5UZXJtKG5hbWUsIHApO1xyXG59XHJcbmZ1bmN0aW9uIHBhcnNlUGFydCh0aykge1xyXG4gICAgLy8gUGFydCAtPiB2YXIgfCBpZCB8IGlkKG9wdFBhcmFtTGlzdClcclxuICAgIC8vIFBhcnQgLT4gWyBsaXN0Qml0IF0gOjotPiBjb25zKC4uLilcclxuICAgIGlmICh0ay5hY2NlcHQoMSAvKiBWYXIgKi8pKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBwcm9sb2dBU1RfMS5WYXJpYWJsZSh0ay5hY2NlcHRlZCk7XHJcbiAgICB9XHJcbiAgICAvLyBQYXJzZSBhIGxpc3QgKHN5bnRhY3RpYyBzdWdhciBnb2VzIGhlcmUpXHJcbiAgICBpZiAodGsuYWNjZXB0KDAgLyogUHVuYyAqLywgXCJbXCIpKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlTGlzdCh0ayk7XHJcbiAgICB9XHJcbiAgICB0ay5leHBlY3QoMiAvKiBJZCAqLyk7XHJcbiAgICB2YXIgbmFtZSA9IHRrLmFjY2VwdGVkO1xyXG4gICAgaWYgKCF0ay5hY2NlcHQoMCAvKiBQdW5jICovLCBcIihcIikpIHtcclxuICAgICAgICByZXR1cm4gbmV3IHByb2xvZ0FTVF8xLkF0b20obmFtZSk7XHJcbiAgICB9XHJcbiAgICB2YXIgcCA9IFtdO1xyXG4gICAgd2hpbGUgKHRrLnR5cGUgIT09IDMgLyogRU9GICovKSB7XHJcbiAgICAgICAgcC5wdXNoKHBhcnNlUGFydCh0aykpO1xyXG4gICAgICAgIGlmICh0ay5hY2NlcHQoMCAvKiBQdW5jICovLCBcIilcIikpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRrLmV4cGVjdCgwIC8qIFB1bmMgKi8sIFwiLFwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgcHJvbG9nQVNUXzEuVGVybShuYW1lLCBwKTtcclxufVxyXG5mdW5jdGlvbiBwYXJzZUxpc3QodGspIHtcclxuICAgIC8vIGVtcHR5IGxpc3RcclxuICAgIGlmICh0ay5hY2NlcHQoMCAvKiBQdW5jICovLCBcIl1cIikpIHtcclxuICAgICAgICByZXR1cm4gcHJvbG9nQVNUXzEuQXRvbS5OaWw7XHJcbiAgICB9XHJcbiAgICAvLyBHZXQgYSBsaXN0IG9mIHBhcnRzIGludG8gbFxyXG4gICAgdmFyIGwgPSBbXTtcclxuICAgIHdoaWxlICh0ay5jdXJyZW50ICE9PSBcImVvZlwiKSB7XHJcbiAgICAgICAgbC5wdXNoKHBhcnNlUGFydCh0aykpO1xyXG4gICAgICAgIGlmICghdGsuYWNjZXB0KDAgLyogUHVuYyAqLywgXCIsXCIpKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIEZpbmQgdGhlIGVuZCBvZiB0aGUgbGlzdCAuLi4gXCJ8IFZhciBdXCIgb3IgXCJdXCIuXHJcbiAgICB2YXIgYXBwZW5kO1xyXG4gICAgaWYgKHRrLmFjY2VwdCgwIC8qIFB1bmMgKi8sIFwifFwiKSkge1xyXG4gICAgICAgIHRrLmV4cGVjdCgxIC8qIFZhciAqLyk7XHJcbiAgICAgICAgYXBwZW5kID0gbmV3IHByb2xvZ0FTVF8xLlZhcmlhYmxlKHRrLmFjY2VwdGVkKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGFwcGVuZCA9IHByb2xvZ0FTVF8xLkF0b20uTmlsO1xyXG4gICAgfVxyXG4gICAgdGsuZXhwZWN0KDAgLyogUHVuYyAqLywgXCJdXCIpO1xyXG4gICAgLy8vLyBDb25zdHJ1Y3QgbGlzdFxyXG4gICAgLy9mb3IgKHZhciBpID0gbC5sZW5ndGg7IGktLTspIHtcclxuICAgIC8vICAgIGFwcGVuZCA9IG5ldyBUZXJtKFwiY29uc1wiLCBbbFtpXSwgYXBwZW5kXSk7XHJcbiAgICAvL31cclxuICAgIHJldHVybiBwcm9sb2dBU1RfMS5saXN0T2ZBcnJheShsLCBhcHBlbmQpO1xyXG59XHJcbmZ1bmN0aW9uIHBhcnNlQm9keSh0aykge1xyXG4gICAgdmFyIHRlcm1zID0gW107XHJcbiAgICB3aGlsZSAodGsuY3VycmVudCAhPT0gXCJlb2ZcIikge1xyXG4gICAgICAgIHRlcm1zLnB1c2gocGFyc2VUZXJtKHRrKSk7XHJcbiAgICAgICAgaWYgKHRrLmFjY2VwdCgwIC8qIFB1bmMgKi8sIFwiLlwiKSkge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRrLmV4cGVjdCgwIC8qIFB1bmMgKi8sIFwiLFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGVybXM7XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBwcm9sb2dBU1RfMSA9IHJlcXVpcmUoJy4vcHJvbG9nQVNUJyk7XHJcbmV4cG9ydHMub3B0aW9ucyA9IHtcclxuICAgIG1heEl0ZXJhdGlvbnM6IG51bGwsXHJcbiAgICBleHBlcmltZW50YWw6IHtcclxuICAgICAgICB0YWlsUmVjdXJzaW9uOiBmYWxzZVxyXG4gICAgfVxyXG59O1xyXG4vKipcclxuICogZXhlY3V0ZXMgYSBxdWVyeSBhZ2FpbnMgdGhlIGRhdGFiYXNlXHJcbiAqIEBwYXJhbSBkYiBjb21waWxlZCBydWxlIGRhdGFiYXNlXHJcbiAqIEBwYXJhbSBxdWVyeSBjb21waWxlZCBxdWVyeVxyXG4gKiBAcmV0dXJucyBpdGVyYXRvciB0byBpdGVyYXRlIHRocm91Z2ggcmVzdWx0c1xyXG4gKi9cclxuZnVuY3Rpb24gcXVlcnkocnVsZXNEQiwgcXVlcnkpIHtcclxuICAgIHZhciB2YXJzID0gdmFyTmFtZXMocXVlcnkubGlzdCksIGNkYiA9IHt9O1xyXG4gICAgLy8gbWF5YmUgbW92ZSB0byBwYXJzZXIgbGV2ZWwsIGlka1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIG5hbWUsIHJ1bGU7IGkgPCBydWxlc0RCLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgcnVsZSA9IHJ1bGVzREJbaV07XHJcbiAgICAgICAgbmFtZSA9IHJ1bGUuaGVhZC5uYW1lO1xyXG4gICAgICAgIGlmIChuYW1lIGluIGNkYikge1xyXG4gICAgICAgICAgICBjZGJbbmFtZV0ucHVzaChydWxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNkYltuYW1lXSA9IFtydWxlXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgaXRlcmF0b3IgPSBuZXcgSXRlcmF0b3IoKTtcclxuICAgIHZhciBjb250ID0gZ2V0ZHRyZWVpdGVyYXRvcihxdWVyeS5saXN0LCBjZGIsIGZ1bmN0aW9uIChiaW5kaW5nQ29udGV4dCkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgdjsgdiA9IHZhcnNbaSsrXTspIHtcclxuICAgICAgICAgICAgcmVzdWx0W3YubmFtZV0gPSB0ZXJtVG9Kc1ZhbHVlKGJpbmRpbmdDb250ZXh0LnZhbHVlKHYpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXRlcmF0b3IuY3VycmVudCA9IHJlc3VsdDtcclxuICAgIH0pO1xyXG4gICAgSXRlcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGkgPSAwO1xyXG4gICAgICAgIHRoaXMuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgd2hpbGUgKGNvbnQgIT0gbnVsbCAmJiAhdGhpcy5jdXJyZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnQgPSBjb250KCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKGV4cG9ydHMub3B0aW9ucy5tYXhJdGVyYXRpb25zKSA9PT0gXCJudW1iZXJcIiAmJiBleHBvcnRzLm9wdGlvbnMubWF4SXRlcmF0aW9ucyA8PSArK2kpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IFwiaXRlcmF0aW9uIGxpbWl0IHJlYWNoZWRcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gISF0aGlzLmN1cnJlbnQ7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGl0ZXJhdG9yO1xyXG4gICAgZnVuY3Rpb24gSXRlcmF0b3IoKSB7IH1cclxufVxyXG5leHBvcnRzLnF1ZXJ5ID0gcXVlcnk7XHJcbjtcclxuLyoqXHJcbiAqIEdldCBhIGxpc3Qgb2YgYWxsIHZhcmlhYmxlcyBtZW50aW9uZWQgaW4gYSBsaXN0IG9mIFRlcm1zLlxyXG4gKi9cclxuZnVuY3Rpb24gdmFyTmFtZXMobGlzdCkge1xyXG4gICAgdmFyIG91dCA9IFtdLCB2YXJzID0ge30sIHQsIG47XHJcbiAgICBsaXN0ID0gbGlzdC5zbGljZSgwKTsgLy8gY2xvbmUgICBcclxuICAgIHdoaWxlIChsaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgIHQgPSBsaXN0LnBvcCgpO1xyXG4gICAgICAgIGlmICh0IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuVmFyaWFibGUpIHtcclxuICAgICAgICAgICAgbiA9IHQubmFtZTtcclxuICAgICAgICAgICAgLy8gaWdub3JlIHNwZWNpYWwgdmFyaWFibGUgX1xyXG4gICAgICAgICAgICAvLyBwdXNoIG9ubHkgbmV3IG5hbWVzXHJcbiAgICAgICAgICAgIGlmIChuICE9PSBcIl9cIiAmJiBvdXQuaW5kZXhPZihuKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIG91dC5wdXNoKG4pO1xyXG4gICAgICAgICAgICAgICAgdmFyc1tuXSA9IHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodCBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlRlcm0pIHtcclxuICAgICAgICAgICAgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCB0cmVlIHdhbGsgb3JkZXJcclxuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkobGlzdCwgdC5wYXJ0bGlzdC5saXN0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0Lm1hcChmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gdmFyc1tuYW1lXTsgfSk7XHJcbn1cclxudmFyIGJ1aWx0aW5QcmVkaWNhdGVzID0ge1xyXG4gICAgXCIhLzBcIjogZnVuY3Rpb24gKGxvb3AsIGdvYWxzLCBpZHgsIGJpbmRpbmdDb250ZXh0LCBmYmFja3RyYWNrKSB7XHJcbiAgICAgICAgdmFyIG5leHRnb2FscyA9IGdvYWxzLnNsaWNlKDEpOyAvLyBjdXQgYWx3YXlzIHN1Y2NlZWRzXHJcbiAgICAgICAgcmV0dXJuIGxvb3AobmV4dGdvYWxzLCAwLCBuZXcgQmluZGluZ0NvbnRleHQoYmluZGluZ0NvbnRleHQpLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYmFja3RyYWNrICYmIGZiYWNrdHJhY2sodHJ1ZSwgZ29hbHNbMF0ucGFyZW50KTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBcImZhaWwvMFwiOiBmdW5jdGlvbiAobG9vcCwgZ29hbHMsIGlkeCwgYmluZGluZ0NvbnRleHQsIGZiYWNrdHJhY2spIHtcclxuICAgICAgICByZXR1cm4gZmJhY2t0cmFjazsgLy8gRkFJTFxyXG4gICAgfSxcclxuICAgIFwiY2FsbC8xXCI6IGZ1bmN0aW9uIChsb29wLCBnb2FscywgaWR4LCBiaW5kaW5nQ29udGV4dCwgZmJhY2t0cmFjaykge1xyXG4gICAgICAgIHZhciBmaXJzdCA9IGJpbmRpbmdDb250ZXh0LnZhbHVlKGdvYWxzWzBdLnBhcnRsaXN0Lmxpc3RbMF0pO1xyXG4gICAgICAgIGlmICghKGZpcnN0IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuVGVybSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZiYWNrdHJhY2s7IC8vIEZBSUxcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5nID0gZ29hbHMuc2xpY2UoMCk7XHJcbiAgICAgICAgbmdbMF0gPSBmaXJzdDtcclxuICAgICAgICBmaXJzdC5wYXJlbnQgPSBnb2Fsc1swXTtcclxuICAgICAgICByZXR1cm4gbG9vcChuZywgMCwgYmluZGluZ0NvbnRleHQsIGZiYWNrdHJhY2spO1xyXG4gICAgfSxcclxuICAgIFwiPS8yXCI6IGZ1bmN0aW9uIChsb29wLCBnb2FscywgaWR4LCBiaW5kaW5nQ29udGV4dCwgZmJhY2t0cmFjaykge1xyXG4gICAgICAgIHZhciBjdHggPSBuZXcgQmluZGluZ0NvbnRleHQoYmluZGluZ0NvbnRleHQpO1xyXG4gICAgICAgIGlmIChjdHgudW5pZnkoZ29hbHNbMF0ucGFydGxpc3QubGlzdFswXSwgZ29hbHNbMF0ucGFydGxpc3QubGlzdFsxXSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxvb3AoZ29hbHMuc2xpY2UoMSksIDAsIGN0eCwgZmJhY2t0cmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmJhY2t0cmFjazsgLy8gRkFJTFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcImZpbmRhbGwvM1wiOiBmdW5jdGlvbiAobG9vcCwgZ29hbHMsIGlkeCwgYmluZGluZ0NvbnRleHQsIGZiYWNrdHJhY2ssIGRiKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBnb2Fsc1swXS5wYXJ0bGlzdC5saXN0LCByZXN1bHRzID0gW107XHJcbiAgICAgICAgcmV0dXJuIGdldGR0cmVlaXRlcmF0b3IoW2FyZ3NbMV1dLCBkYiwgY29sbGVjdCwgYmluZGluZ0NvbnRleHQsIHJlcG9ydCk7XHJcbiAgICAgICAgZnVuY3Rpb24gY29sbGVjdChjdHgpIHtcclxuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGN0eC52YWx1ZShhcmdzWzBdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlcG9ydCgpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHByb2xvZ0FTVF8xLmxpc3RPZkFycmF5KHJlc3VsdHMpO1xyXG4gICAgICAgICAgICBpZiAoYmluZGluZ0NvbnRleHQudW5pZnkoYXJnc1syXSwgcmVzdWx0KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvb3AoZ29hbHMuc2xpY2UoMSksIDAsIGJpbmRpbmdDb250ZXh0LCBmYmFja3RyYWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYmFja3RyYWNrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiaXMvMlwiOiBmdW5jdGlvbiAobG9vcCwgZ29hbHMsIGlkeCwgYmluZGluZ0NvbnRleHQsIGZiYWNrdHJhY2spIHtcclxuICAgICAgICB2YXIgYXJncyA9IGdvYWxzWzBdLnBhcnRsaXN0Lmxpc3QsIGV4cHJlc3Npb24gPSBiaW5kaW5nQ29udGV4dC52YWx1ZShhcmdzWzFdKSwgY3R4ID0gbmV3IEJpbmRpbmdDb250ZXh0KGJpbmRpbmdDb250ZXh0KTtcclxuICAgICAgICBpZiAodmFyTmFtZXMoW2V4cHJlc3Npb25dKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZiYWNrdHJhY2s7IC8vIFRPRE86IHByb2xvZyBleGNlcHRpb24gXCJFUlJPUjogaXMvMjogQXJndW1lbnRzIGFyZSBub3Qgc3VmZmljaWVudGx5IGluc3RhbnRpYXRlZFwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGJ1aWxkIGV2YWx1YXRpb24gcXVldWU6XHJcbiAgICAgICAgdmFyIHF1ZXVlID0gW2V4cHJlc3Npb25dLCBhY2MgPSBbXSwgYywgaSwgeCwgbDtcclxuICAgICAgICB3aGlsZSAocXVldWUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHggPSBxdWV1ZS5wb3AoKTtcclxuICAgICAgICAgICAgYWNjLnB1c2goeCk7XHJcbiAgICAgICAgICAgIGlmICh4IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuVGVybSkge1xyXG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkocXVldWUsIHgucGFydGxpc3QubGlzdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZXZhbHVhdGVcclxuICAgICAgICBxdWV1ZSA9IGFjYztcclxuICAgICAgICBhY2MgPSBbXTtcclxuICAgICAgICBpID0gcXVldWUubGVuZ3RoO1xyXG4gICAgICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICAgICAgeCA9IHF1ZXVlW2ldO1xyXG4gICAgICAgICAgICBpZiAoeCBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlRlcm0pIHtcclxuICAgICAgICAgICAgICAgIGMgPSB4LnBhcnRsaXN0Lmxpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgbCA9IGFjYy5zcGxpY2UoLWMsIGMpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh4Lm5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiK1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2MucHVzaChsWzBdICsgbFsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCItXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjYy5wdXNoKGxbMF0gLSBsWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIipcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWNjLnB1c2gobFswXSAqIGxbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiL1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2MucHVzaChsWzBdIC8gbFsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYmFja3RyYWNrOyAvLyBUT0RPOiBwcm9sb2cgZXhjZXB0aW9uIFwiRVJST1I6IGlzLzI6IEFyaXRobWV0aWM6IGB7eC5uYW1lfScgaXMgbm90IGEgZnVuY3Rpb25cIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoeC5uYW1lKSA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjYy5wdXNoKHgubmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBoYW5kbGUgZnVuY3Rpb25zIGxpa2UgcGkgZSBldGNcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmJhY2t0cmFjaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY3R4LnVuaWZ5KGFyZ3NbMF0sIG5ldyBwcm9sb2dBU1RfMS5BdG9tKGFjY1swXSkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsb29wKGdvYWxzLnNsaWNlKDEpLCAwLCBjdHgsIGZiYWNrdHJhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZiYWNrdHJhY2s7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG4vKipcclxuICogVGhlIG1haW4gcHJvdmluZyBlbmdpbmVcclxuICogQHBhcmFtIG9yaWdpbmFsR29hbHMgb3JpZ2luYWwgZ29hbHMgdG8gcHJvdmVcclxuICogQHBhcmFtIHJ1bGVzREIgcHJvbG9nIGRhdGFiYXNlIHRvIGNvbnN1bHQgd2l0aFxyXG4gKiBAcGFyYW0gZnN1Y2Nlc3Mgc3VjY2VzcyBjYWxsYmFja1xyXG4gKiBAcmV0dXJucyBhIGZ1bmN0aW9uIHRvIHBlcmZvcm0gbmV4dCBzdGVwXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRkdHJlZWl0ZXJhdG9yKG9yaWdpbmFsR29hbHMsIHJ1bGVzREIsIGZzdWNjZXNzLCByb290QmluZGluZ0NvbnRleHQsIHJvb3RCYWNrdHJhY2spIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHRhaWxFbmFibGVkID0gZXhwb3J0cy5vcHRpb25zLmV4cGVyaW1lbnRhbC50YWlsUmVjdXJzaW9uO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGxvb3Aob3JpZ2luYWxHb2FscywgMCwgcm9vdEJpbmRpbmdDb250ZXh0IHx8IG51bGwsIHJvb3RCYWNrdHJhY2sgfHwgbnVsbCk7IH07XHJcbiAgICAvLyBtYWluIGxvb3AgY29udGludWF0aW9uXHJcbiAgICBmdW5jdGlvbiBsb29wKGdvYWxzLCBpZHgsIHBhcmVudEJpbmRpbmdDb250ZXh0LCBmYmFja3RyYWNrKSB7XHJcbiAgICAgICAgaWYgKCFnb2Fscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZnN1Y2Nlc3MocGFyZW50QmluZGluZ0NvbnRleHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmJhY2t0cmFjaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGN1cnJlbnRHb2FsID0gZ29hbHNbMF0sIGN1cnJlbnRCaW5kaW5nQ29udGV4dCA9IG5ldyBCaW5kaW5nQ29udGV4dChwYXJlbnRCaW5kaW5nQ29udGV4dCksIGN1cnJlbnRHb2FsVmFyTmFtZXMsIHJ1bGUsIHZhck1hcCwgcmVuYW1lZEhlYWQsIG5leHRHb2Fsc1Zhck5hbWVzLCBleGlzdGluZztcclxuICAgICAgICAvLyBUT0RPOiBhZGQgc3VwcG9ydCBmb3IgYnVpbHRpbnMgd2l0aCB2YXJpYWJsZSBhcml0eSAobGlrZSBjYWxsLzIrKVxyXG4gICAgICAgIHZhciBidWlsdGluID0gYnVpbHRpblByZWRpY2F0ZXNbY3VycmVudEdvYWwubmFtZSArIFwiL1wiICsgY3VycmVudEdvYWwucGFydGxpc3QubGlzdC5sZW5ndGhdO1xyXG4gICAgICAgIGlmICh0eXBlb2YgKGJ1aWx0aW4pID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGJ1aWx0aW4obG9vcCwgZ29hbHMsIGlkeCwgY3VycmVudEJpbmRpbmdDb250ZXh0LCBmYmFja3RyYWNrLCBydWxlc0RCKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc2VhcmNoaW5nIGZvciBuZXh0IG1hdGNoaW5nIHJ1bGUgICAgICAgIFxyXG4gICAgICAgIGZvciAodmFyIGkgPSBpZHgsIGRiID0gcnVsZXNEQltjdXJyZW50R29hbC5uYW1lXSwgZGJsZW4gPSBkYiAmJiBkYi5sZW5ndGg7IGkgPCBkYmxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJ1bGUgPSBkYltpXTtcclxuICAgICAgICAgICAgdmFyTWFwID0ge307XHJcbiAgICAgICAgICAgIHJlbmFtZWRIZWFkID0gbmV3IHByb2xvZ0FTVF8xLlRlcm0ocnVsZS5oZWFkLm5hbWUsIGN1cnJlbnRCaW5kaW5nQ29udGV4dC5yZW5hbWVWYXJpYWJsZXMocnVsZS5oZWFkLnBhcnRsaXN0Lmxpc3QsIGN1cnJlbnRHb2FsLCB2YXJNYXApKTtcclxuICAgICAgICAgICAgcmVuYW1lZEhlYWQucGFyZW50ID0gY3VycmVudEdvYWwucGFyZW50O1xyXG4gICAgICAgICAgICBpZiAoIWN1cnJlbnRCaW5kaW5nQ29udGV4dC51bmlmeShjdXJyZW50R29hbCwgcmVuYW1lZEhlYWQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbmV4dEdvYWxzID0gZ29hbHMuc2xpY2UoMSk7IC8vIGN1cnJlbnQgaGVhZCBzdWNjZWVkZWQgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHJ1bGUuYm9keSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBuZXh0R29hbHMgPSBjdXJyZW50QmluZGluZ0NvbnRleHQucmVuYW1lVmFyaWFibGVzKHJ1bGUuYm9keS5saXN0LCByZW5hbWVkSGVhZCwgdmFyTWFwKS5jb25jYXQobmV4dEdvYWxzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBUT0RPOiByZW1vdmUgJ2ZyZWUnIHZhcmlhYmxlcyAobmVlZCB0byBjaGVjayB2YWx1ZXMgYXMgd2VsbClcclxuICAgICAgICAgICAgaWYgKHJ1bGUuYm9keSAhPSBudWxsICYmIG5leHRHb2Fscy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNhbGwgaW4gYSB0YWlsIHBvc2l0aW9uOiByZXVzaW5nIHBhcmVudCB2YXJpYWJsZXMgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBwcmV2ZW50cyBjb250ZXh0IGdyb3RoIGluIHNvbWUgcmVjdXJzaXZlIHNjZW5hcmlvc1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhaWxFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEdvYWxWYXJOYW1lcyA9IHZhck5hbWVzKFtjdXJyZW50R29hbF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRHb2Fsc1Zhck5hbWVzID0gdmFyTmFtZXMobmV4dEdvYWxzKTtcclxuICAgICAgICAgICAgICAgICAgICBleGlzdGluZyA9IG5leHRHb2Fsc1Zhck5hbWVzLmNvbmNhdChjdXJyZW50R29hbFZhck5hbWVzKS5tYXAoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRHb2FsVmFyTmFtZXMubGVuZ3RoID09PSBuZXh0R29hbHNWYXJOYW1lcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgdm4gaW4gdmFyTWFwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjdiwgY24sIG5uLCBrID0gY3VycmVudEdvYWxWYXJOYW1lcy5sZW5ndGg7IGstLTspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbiA9IGN1cnJlbnRHb2FsVmFyTmFtZXNba107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm4gPSBuZXh0R29hbHNWYXJOYW1lc1trXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdiA9IGN1cnJlbnRCaW5kaW5nQ29udGV4dC52YWx1ZShjbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNuLm5hbWUgIT0gbm4ubmFtZSAmJiB2YXJNYXBbdm5dID09PSBubikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkbyBub3Qgc2hvcnQtY3V0IGlmIGNuJ3MgdmFsdWUgcmVmZXJlbmNlcyBublxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBwcm9iYWJseSBuZWVkIHRvIGNoZWNrIG90aGVyIHZhcmlhYmxlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3YgJiYgdmFyTmFtZXMoW2N2XSkuaW5kZXhPZihubikgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJNYXBbdm5dID0gY247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRCaW5kaW5nQ29udGV4dC5jdHhbY24ubmFtZV0gPSBjdXJyZW50QmluZGluZ0NvbnRleHQuY3R4W25uLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50QmluZGluZ0NvbnRleHQudW5iaW5kKG5uLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZS1yZW5hbWUgdmFycyBpbiBuZXh0IGdvYWxzIChjYW4gYmUgb3B0aW1pc2VkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0R29hbHMgPSBjdXJyZW50QmluZGluZ0NvbnRleHQucmVuYW1lVmFyaWFibGVzKHJ1bGUuYm9keS5saXN0LCByZW5hbWVkSGVhZCwgdmFyTWFwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gbGV2ZWxEb3duVGFpbCgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBza2lwcGluZyBiYWNrdHJhY2tpbmcgdG8gdGhlIHNhbWUgbGV2ZWwgYmVjYXVzZSBpdCdzIHRoZSBsYXN0IGdvYWwgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiByZW1vdmluZyBleHRyYSBzdHVmZiBmcm9tIGJpbmRpbmcgY29udGV4dCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsb29wKG5leHRHb2FscywgMCwgY3VycmVudEJpbmRpbmdDb250ZXh0LCBmYmFja3RyYWNrKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLy8gQ1VSUkVOVCBCQUNLVFJBQ0sgQ09OVElOVUFUSU9OICAvLy9cclxuICAgICAgICAgICAgICAgIC8vLyBXSEVOIElOVk9LRUQgQkFDS1RSQUNLUyBUTyBUSEUgIC8vL1xyXG4gICAgICAgICAgICAgICAgLy8vIE5FWFQgUlVMRSBJTiBUSEUgUFJFVklPVVMgTEVWRUwgLy8vXHJcbiAgICAgICAgICAgICAgICB2YXIgZkN1cnJlbnRCVCA9IGZ1bmN0aW9uIChjdXQsIHBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZiYWNrdHJhY2sgJiYgZmJhY2t0cmFjayhwYXJlbnQucGFyZW50ICE9PSBnb2Fsc1swXS5wYXJlbnQsIHBhcmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9vcChnb2FscywgaSArIDEsIHBhcmVudEJpbmRpbmdDb250ZXh0LCBmYmFja3RyYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGxldmVsRG93bigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9vcChuZXh0R29hbHMsIDAsIGN1cnJlbnRCaW5kaW5nQ29udGV4dCwgZkN1cnJlbnRCVCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYmFja3RyYWNrO1xyXG4gICAgfVxyXG59XHJcbjtcclxuLyoqXHJcbiAqIGhlbHBlciBmdW5jdGlvbiB0byBjb252ZXJ0IHRlcm1zIHRvIHJlc3VsdCB2YWx1ZXMgcmV0dXJuZWQgYnkgcXVlcnkgZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIHRlcm1Ub0pzVmFsdWUodikge1xyXG4gICAgaWYgKHYgaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5BdG9tKSB7XHJcbiAgICAgICAgcmV0dXJuIHYgPT09IHByb2xvZ0FTVF8xLkF0b20uTmlsID8gW10gOiB2Lm5hbWU7XHJcbiAgICB9XHJcbiAgICBpZiAodiBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlRlcm0gJiYgdi5uYW1lID09PSBcImNvbnNcIikge1xyXG4gICAgICAgIHZhciB0ID0gW107XHJcbiAgICAgICAgd2hpbGUgKHYucGFydGxpc3QgJiYgdi5uYW1lICE9PSBcIm5pbFwiKSB7XHJcbiAgICAgICAgICAgIHQucHVzaCh0ZXJtVG9Kc1ZhbHVlKHYucGFydGxpc3QubGlzdFswXSkpO1xyXG4gICAgICAgICAgICB2ID0gdi5wYXJ0bGlzdC5saXN0WzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiB2LnRvU3RyaW5nKCk7XHJcbn1cclxuLyoqXHJcbiAqIGNyZWF0ZXMgYmluZGluZyBjb250ZXh0IGZvciB2YXJpYWJsZXNcclxuICovXHJcbmZ1bmN0aW9uIEJpbmRpbmdDb250ZXh0KHBhcmVudCkge1xyXG4gICAgdGhpcy5jdHggPSBPYmplY3QuY3JlYXRlKHBhcmVudCAmJiBwYXJlbnQuY3R4IHx8IHt9KTtcclxufVxyXG4vKipcclxuICogZmluZS1wcmludCB0aGUgY29udGV4dCAoZm9yIGRlYnVnZ2luZyBwdXJwb3NlcylcclxuICogISBTTE9XIGJlY2F1c2Ugb2YgZm9yLWluXHJcbiAqL1xyXG5CaW5kaW5nQ29udGV4dC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuICAgIHZhciByID0gW10sIHAgPSBbXTtcclxuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmN0eCkge1xyXG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmNhbGwoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuY3R4LCBrZXkpID8gciA6IHAsIGtleSArIFwiID0gXCIgKyB0aGlzLmN0eFtrZXldKTtcclxuICAgIH1cclxuICAgIHJldHVybiByLmpvaW4oXCIsIFwiKSArIFwiIHx8IFwiICsgcC5qb2luKFwiLCBcIik7XHJcbn07XHJcbnZhciBnbG9iYWxHb2FsQ291bnRlciA9IDA7XHJcbi8qKlxyXG4gKiByZW5hbWVzIHZhcmlhYmxlcyB0byBtYWtlIHN1cmUgbmFtZXMgYXJlIHVuaXF1ZVxyXG4gKiBAcGFyYW0gbGlzdCBsaXN0IG9mIHRlcm1zIHRvIHJlbmFtZVxyXG4gKiBAcGFyYW0gcGFyZW50IHBhcmVudCB0ZXJtIChwYXJlbnQgaXMgdXNlZCBpbiBjdXQpXHJcbiAqIEBwYXJhbSB2YXJNYXAgKG91dCkgbWFwIG9mIHZhcmlhYmxlIG1hcHBpbmdzLCB1c2VkIHRvIG1ha2Ugc3VyZSB0aGF0IGJvdGggaGVhZCBhbmQgYm9keSBoYXZlIHNhbWUgbmFtZXNcclxuICogQHJldHVybnMgbmV3IHRlcm0gd2l0aCByZW5hbWVkIHZhcmlhYmxlc1xyXG4gKi9cclxuQmluZGluZ0NvbnRleHQucHJvdG90eXBlLnJlbmFtZVZhcmlhYmxlcyA9IGZ1bmN0aW9uIHJlbmFtZVZhcmlhYmxlcyhsaXN0LCBwYXJlbnQsIHZhck1hcCkge1xyXG4gICAgdmFyIG91dCA9IFtdLCBxdWV1ZSA9IFtdLCBzdGFjayA9IFtsaXN0XSwgY2xlbiwgdG1wLCB2O1xyXG4gICAgLy8gcHJlcGFyZSBkZXB0aC1maXJzdCBxdWV1ZVxyXG4gICAgd2hpbGUgKHN0YWNrLmxlbmd0aCkge1xyXG4gICAgICAgIGxpc3QgPSBzdGFjay5wb3AoKTtcclxuICAgICAgICBxdWV1ZS5wdXNoKGxpc3QpO1xyXG4gICAgICAgIGlmIChsaXN0IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgbGlzdC5sZW5ndGggJiYgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoc3RhY2ssIGxpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChsaXN0IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuVGVybSkge1xyXG4gICAgICAgICAgICBsaXN0LnBhcnRsaXN0Lmxpc3QubGVuZ3RoICYmIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHN0YWNrLCBsaXN0LnBhcnRsaXN0Lmxpc3QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIHByb2Nlc3MgZGVwdGgtZmlyc3QgcXVldWVcclxuICAgIHZhciB2YXJzID0gdmFyTWFwIHx8IHt9LCBfID0gbmV3IHByb2xvZ0FTVF8xLlZhcmlhYmxlKFwiX1wiKTtcclxuICAgIGZvciAodmFyIGkgPSBxdWV1ZS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgIGxpc3QgPSBxdWV1ZVtpXTtcclxuICAgICAgICBpZiAobGlzdCBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLkF0b20pIHtcclxuICAgICAgICAgICAgb3V0LnB1c2gobGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGxpc3QgaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5WYXJpYWJsZSkge1xyXG4gICAgICAgICAgICBpZiAobGlzdC5uYW1lID09PSBcIl9cIikge1xyXG4gICAgICAgICAgICAgICAgdiA9IF87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2ID0gdmFyc1tsaXN0Lm5hbWVdIHx8ICh2YXJzW2xpc3QubmFtZV0gPSBuZXcgcHJvbG9nQVNUXzEuVmFyaWFibGUoXCJfR1wiICsgKGdsb2JhbEdvYWxDb3VudGVyKyspKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3V0LnB1c2godik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGxpc3QgaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5UZXJtKSB7XHJcbiAgICAgICAgICAgIGNsZW4gPSBsaXN0LnBhcnRsaXN0Lmxpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICB0bXAgPSBuZXcgcHJvbG9nQVNUXzEuVGVybShsaXN0Lm5hbWUsIG91dC5zcGxpY2UoLWNsZW4sIGNsZW4pKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcGwgPSB0bXAucGFydGxpc3QubGlzdCwgayA9IHBsLmxlbmd0aDsgay0tOykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBsW2tdIGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuVGVybSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsW2tdLnBhcmVudCA9IHRtcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0bXAucGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgICAgICBvdXQucHVzaCh0bXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY2xlbiA9IGxpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICBjbGVuICYmIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KG91dCwgb3V0LnNwbGljZSgtY2xlbiwgY2xlbikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvdXQ7XHJcbn07XHJcbi8qKlxyXG4gKiBCaW5kcyB2YXJpYWJsZSB0byBhIHZhbHVlIGluIHRoZSBjb250ZXh0XHJcbiAqIEBwYXJhbSBuYW1lIG5hbWUgb2YgdGhlIHZhcmlhYmxlIHRvIGJpbmRcclxuICogQHBhcmFtIHZhbHVlIHZhbHVlIHRvIGJpbmQgdG8gdGhlIHZhcmlhYmxlXHJcbiAqL1xyXG5CaW5kaW5nQ29udGV4dC5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgdGhpcy5jdHhbbmFtZV0gPSB2YWx1ZTtcclxufTtcclxuLyoqXHJcbiAqIFVuYmluZHMgdmFyaWFibGUgaW4gdGhlIENVUlJFTlQgY29udGV4dFxyXG4gKiBWYXJpYWJsZSByZW1haW5zIGJvdW5kIGluIHBhcmVudCBjb250ZXh0c1xyXG4gKiBhbmQgbWlnaHQgYmUgcmVzb2x2ZWQgdGhvdWdoIHByb3RvIGNoYWluXHJcbiAqIEBwYXJhbSBuYW1lIHZhcmlhYmxlIG5hbWUgdG8gdW5iaW5kXHJcbiAqL1xyXG5CaW5kaW5nQ29udGV4dC5wcm90b3R5cGUudW5iaW5kID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIGRlbGV0ZSB0aGlzLmN0eFtuYW1lXTtcclxufTtcclxuLyoqXHJcbiAqIEdldHMgdGhlIHZhbHVlIG9mIHRoZSB0ZXJtLCByZWN1cnNpdmVseSByZXBsYWNpbmcgdmFyaWFibGVzIHdpdGggYm91bmQgdmFsdWVzXHJcbiAqIEBwYXJhbSB4IHRlcm0gdG8gY2FsY3VsYXRlIHZhbHVlIGZvclxyXG4gKiBAcmV0dXJucyB2YWx1ZSBvZiB0ZXJtIHhcclxuICovXHJcbkJpbmRpbmdDb250ZXh0LnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uIHZhbHVlKHgpIHtcclxuICAgIHZhciBxdWV1ZSA9IFt4XSwgYWNjID0gW10sIGMsIGk7XHJcbiAgICB3aGlsZSAocXVldWUubGVuZ3RoKSB7XHJcbiAgICAgICAgeCA9IHF1ZXVlLnBvcCgpO1xyXG4gICAgICAgIGFjYy5wdXNoKHgpO1xyXG4gICAgICAgIGlmICh4IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuVGVybSkge1xyXG4gICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShxdWV1ZSwgeC5wYXJ0bGlzdC5saXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoeCBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlZhcmlhYmxlKSB7XHJcbiAgICAgICAgICAgIGMgPSB0aGlzLmN0eFt4Lm5hbWVdO1xyXG4gICAgICAgICAgICBpZiAoYykge1xyXG4gICAgICAgICAgICAgICAgYWNjLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgcXVldWUucHVzaChjKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHF1ZXVlID0gYWNjO1xyXG4gICAgYWNjID0gW107XHJcbiAgICBpID0gcXVldWUubGVuZ3RoO1xyXG4gICAgd2hpbGUgKGktLSkge1xyXG4gICAgICAgIHggPSBxdWV1ZVtpXTtcclxuICAgICAgICBpZiAoeCBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlRlcm0pIHtcclxuICAgICAgICAgICAgYyA9IHgucGFydGxpc3QubGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGFjYy5wdXNoKG5ldyBwcm9sb2dBU1RfMS5UZXJtKHgubmFtZSwgYWNjLnNwbGljZSgtYywgYykpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBhY2MucHVzaCh4KTtcclxuICAgIH1cclxuICAgIHJldHVybiBhY2NbMF07XHJcbn07XHJcbi8qKlxyXG4gKiBVbmlmaWVzIHRlcm1zIHggYW5kIHksIHJlbmFtaW5nIGFuZCBiaW5kaW5nIHZhcmlhYmxlcyBpbiBwcm9jZXNzXHJcbiAqICEhIG11dGF0ZXMgdmFyaWFibGUgbmFtZXMgKGFsdGVyaW5nIHgsIHkgYW5kIHZhck1hcCBpbiBtYWluIGxvb3ApXHJcbiAqIEByZXR1cm5zIHRydWUgaWYgdGVybXMgdW5pZnksIGZhbHNlIG90aGVyd2lzZVxyXG4gKi9cclxuQmluZGluZ0NvbnRleHQucHJvdG90eXBlLnVuaWZ5ID0gZnVuY3Rpb24gdW5pZnkoeCwgeSkge1xyXG4gICAgdmFyIHRvU2V0TmFtZXMgPSBbXSwgdG9TZXQgPSB7fSwgYWNjID0gW10sIHF1ZXVlID0gW3RoaXMudmFsdWUoeCksIHRoaXMudmFsdWUoeSldLCB4cGwsIHlwbCwgaSwgbGVuO1xyXG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCkge1xyXG4gICAgICAgIHggPSBxdWV1ZS5wb3AoKTtcclxuICAgICAgICB5ID0gcXVldWUucG9wKCk7XHJcbiAgICAgICAgaWYgKHggaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5UZXJtICYmIHkgaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5UZXJtKSB7XHJcbiAgICAgICAgICAgIHhwbCA9IHgucGFydGxpc3QubGlzdDtcclxuICAgICAgICAgICAgeXBsID0geS5wYXJ0bGlzdC5saXN0O1xyXG4gICAgICAgICAgICBpZiAoeC5uYW1lID09IHkubmFtZSAmJiB4cGwubGVuZ3RoID09IHlwbC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHhwbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goeHBsW2ldLCB5cGxbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoKHggaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5BdG9tIHx8IHkgaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5BdG9tKSAmJiAhKHggaW5zdGFuY2VvZiBwcm9sb2dBU1RfMS5WYXJpYWJsZSB8fCB5IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuVmFyaWFibGUpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISh4IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuQXRvbSAmJiB5IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuQXRvbSAmJiB4Lm5hbWUgPT0geS5uYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhY2MucHVzaCh4LCB5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpID0gYWNjLmxlbmd0aDtcclxuICAgIHdoaWxlIChpKSB7XHJcbiAgICAgICAgeSA9IGFjY1stLWldO1xyXG4gICAgICAgIHggPSBhY2NbLS1pXTtcclxuICAgICAgICBpZiAoeCBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlZhcmlhYmxlKSB7XHJcbiAgICAgICAgICAgIGlmICh4Lm5hbWUgPT09IFwiX1wiKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodG9TZXROYW1lcy5pbmRleE9mKHgubmFtZSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0b1NldE5hbWVzLnB1c2goeC5uYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0b1NldFt4Lm5hbWVdLm5hbWUgIT09IHkubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRvU2V0W3gubmFtZV0gPSB5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh5IGluc3RhbmNlb2YgcHJvbG9nQVNUXzEuVmFyaWFibGUpIHtcclxuICAgICAgICAgICAgaWYgKHkubmFtZSA9PT0gXCJfXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0b1NldE5hbWVzLmluZGV4T2YoeS5uYW1lKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRvU2V0TmFtZXMucHVzaCh5Lm5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRvU2V0W3kubmFtZV0ubmFtZSAhPT0geC5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdG9TZXRbeS5uYW1lXSA9IHg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gcmVuYW1pbmcgdW5pZmllZCB2YXJpYWJsZXNcclxuICAgIC8vIGl0J3MgZ3VhcmFudGVlZCB0aGF0IHZhcmlhYmxlIHdpdGggdGhlIHNhbWUgbmFtZSBpcyB0aGUgc2FtZSBpbnN0YW5jZSB3aXRoaW4gcnVsZSwgc2VlIHJlbmFtZVZhcmlhYmxlcygpXHJcbiAgICB2YXIgdmFybWFwID0ge30sIGtleTtcclxuICAgIGZvciAoaSA9IDA7IGtleSA9IHRvU2V0TmFtZXNbaSsrXTspIHtcclxuICAgICAgICBpZiAodG9TZXRba2V5XSBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlZhcmlhYmxlKSB7XHJcbiAgICAgICAgICAgIHZhcm1hcFt0b1NldFtrZXldLm5hbWVdID0ga2V5O1xyXG4gICAgICAgICAgICB0b1NldFtrZXldLm5hbWUgPSBrZXk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gYmluZCB2YWx1ZXMgdG8gdmFyaWFibGVzIChtaW5kaW5nIHJlbmFtZXMpXHJcbiAgICBmb3IgKGkgPSAwOyBrZXkgPSB0b1NldE5hbWVzW2krK107KSB7XHJcbiAgICAgICAgaWYgKCEodG9TZXRba2V5XSBpbnN0YW5jZW9mIHByb2xvZ0FTVF8xLlZhcmlhYmxlKSkge1xyXG4gICAgICAgICAgICB0aGlzLmJpbmQodmFybWFwW2tleV0gfHwga2V5LCB0b1NldFtrZXldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufTtcclxuIl19

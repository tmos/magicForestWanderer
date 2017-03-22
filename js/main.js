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
    function Game(gameDiv) {
        this.gameDiv = gameDiv;
    }
    Game.prototype.init = function (w, h) {
        if (w === void 0) { w = 3; }
        if (h === void 0) { h = 3; }
        this.createForest(w, h);
        this.getForest().populate();
        this.setWanderer();
        this.render();
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
        var forest = this.currentForest;
        if (!forest) {
            return undefined;
        }
        var isOk = false;
        var y;
        var x;
        while (!isOk) {
            y = Math.floor(Math.random() * (forest.getForest().length - 0) + 0);
            x = Math.floor(Math.random() * (forest.getForest()[0].length - 0) + 0);
            if (forest.getForest()[y][x].isEmpty) {
                isOk = true;
            }
        }
        this.wanderer = new Wanderer_1.default(y, x, forest);
        return this;
    };
    Game.prototype.getWanderer = function () {
        return this.wanderer;
    };
    Game.prototype.render = function () {
        var gameDiv = document.getElementById(this.gameDiv);
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
        gameDiv.className = "";
        gameDiv.classList.add("width" + forest.length);
        gameDiv.innerHTML = html;
    };
    Game.prototype.iterate = function () {
        if (this.wanderer.isOut()) {
            var newSize = this.getForest().getForest().length + 1;
            this.init(newSize, newSize);
        }
        this.render();
    };
    return Game;
}());
exports.default = Game;

},{"./Forest":2,"./Wanderer":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The wanderer, the hero of this quest. Good luck son...
 */
var Wanderer = (function () {
    function Wanderer(playerY, playerX, darkWoods) {
        this.forestMap = [];
        this.forest = darkWoods;
        this.x = playerX;
        this.y = playerY;
        var height = darkWoods.getForest().length;
        var width = darkWoods.getForest()[0].length;
        this.forestMapHeight = height;
        this.forestMapWidth = width;
        this.score = 0;
        for (var y = 0; y < height; y++) {
            this.forestMap[y] = [];
            for (var x = 0; x < width; x++) {
                this.forestMap[y][x] = null;
            }
        }
        return this;
    }
    Wanderer.prototype.isKnown = function (y, x) {
        return this.forestMap[y][x] !== null;
    };
    Wanderer.prototype.getPosition = function () {
        return { x: this.x, y: this.y };
    };
    Wanderer.prototype.toHtml = function () {
        return "<div class=\"floorCase wanderer\"></div>";
    };
    Wanderer.prototype.perceive = function () {
        this.forestMap[this.y][this.x] = this.forest.getFloorContent(this.y, this.x);
        return this;
    };
    Wanderer.prototype.think = function () {
        var thisFloor = this.forestMap[this.y][this.x];
        if (thisFloor.isMonsterClue() || thisFloor.isTrapClue()) {
            // @todo
        }
        // @todo
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
        // Verify Floor
        // let thisFloor = this.forestMap[this.y][this.x];
        // if (thisFloor.isGoal()) {
        //     // @todo Do move
        //     // Oo-De-Lally!!
        //     // @todo New forest
        // } else if (thisFloor.isMonster() || thisFloor.isTrap()) {
        //     // Too much, too soon, too far to go, too late to play, the game is over
        //     // @todo Wanderer die
        // }
        return this;
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
    return Wanderer;
}());
exports.default = Wanderer;

},{}],5:[function(require,module,exports){
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
var g = new Game_1.default("game");
g.init();
// Init manual game
document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37:
            g.getWanderer().move("left");
            break;
        case 38:
            g.getWanderer().move("up");
            break;
        case 39:
            g.getWanderer().move("right");
            break;
        case 40:
            g.getWanderer().move("down");
            break;
        default:
            break;
    }
    g.iterate();
};

},{"./Game":3}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9zcmMvRmxvb3IudHMiLCJqcy9zcmMvRm9yZXN0LnRzIiwianMvc3JjL0dhbWUudHMiLCJqcy9zcmMvV2FuZGVyZXIudHMiLCJqcy9zcmMvY29uc3RhbnRzLnRzIiwianMvc3JjL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBLHlDQUE2RDtBQUU3RDs7OztHQUlHO0FBQ0g7SUFRSSxlQUFZLE9BQWU7UUFBZix3QkFBQSxFQUFBLDJCQUFlO1FBUG5CLFNBQUksR0FBWSxLQUFLLENBQUM7UUFDdEIsU0FBSSxHQUFZLEtBQUssQ0FBQztRQUN0QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLFNBQUksR0FBWSxLQUFLLENBQUM7UUFDdEIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUdqQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssZ0JBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssZ0JBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssbUJBQU8sQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssZ0JBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osK0JBQStCO1FBQ25DLENBQUM7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b250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0ICogYXMgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQge2VtcHR5LCBnb2FsLCBtb25zdGVyLCB0cmFwLCB0cmVlfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBZb3UnbGwgdGVsbCBtZTogXCJBIGZsb29yIGlzIGEgZmxvb3JcIiwgYW5kIHlvdSdsbCBiZSByaWdodC5cbiAqIFRoaXMgaXMgbm90IHRoZSBmbG9vciBpdHNlbGYgdGhhdCBtYXR0ZXJzLCB0aGlzIGlzIHdoYXQgaXQgY29udGFpbnMuXG4gKiBJcyBpdCBhbiBob3JyaWJsZSBtb25zdGVyIG9uIHRoaXMgZmxvb3I/IE9yIGEgbGV0aGFsIHRyYXA/IE9yIGEgY2x1ZSBmb3IgdGhlIG5leHQgZmxvb3I/IFlvdSdsbCBzZWUsIHdhbmRlcmVyLi4uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsb29yIHtcbiAgICBwcml2YXRlIHRyYXA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIGdvYWw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIG1vbnN0ZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHRyZWU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHRyYXBDbHVlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBtb25zdGVyQ2x1ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCA9IGVtcHR5KSB7XG4gICAgICAgIGlmIChlbGVtZW50ID09PSB0cmFwKSB7XG4gICAgICAgICAgICB0aGlzLnRyYXAgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgPT09IGdvYWwpIHtcbiAgICAgICAgICAgIHRoaXMuZ29hbCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCA9PT0gbW9uc3Rlcikge1xuICAgICAgICAgICAgdGhpcy5tb25zdGVyID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50ID09PSB0cmVlKSB7XG4gICAgICAgICAgICB0aGlzLnRyZWUgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVGhlIGZsb29yIGlzIGVtcHR5IG90aGVyd2lzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGlzVHJhcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhcDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNHb2FsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nb2FsO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc01vbnN0ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXI7XG4gICAgfVxuXG4gICAgcHVibGljIGlzVHJlZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNNb25zdGVyQ2x1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9uc3RlckNsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIGlzVHJhcENsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYXBDbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0VtcHR5KCkge1xuICAgICAgICBpZiAoIXRoaXMudHJhcCAmJlxuICAgICAgICAgICAgIXRoaXMuZ29hbCAmJlxuICAgICAgICAgICAgIXRoaXMubW9uc3RlciAmJlxuICAgICAgICAgICAgIXRoaXMudHJlZSAmJlxuICAgICAgICAgICAgIXRoaXMudHJhcENsdWUgJiZcbiAgICAgICAgICAgICF0aGlzLm1vbnN0ZXJDbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldENsdWUoY2x1ZVR5cGU6IHN0cmluZykge1xuICAgICAgICBpZiAoY2x1ZVR5cGUgPT09IHRyYXApIHtcbiAgICAgICAgICAgIHRoaXMudHJhcENsdWUgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGNsdWVUeXBlID09PSBtb25zdGVyKSB7XG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXJDbHVlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBraWxsTW9uc3RlcigpIHtcbiAgICAgICAgdGhpcy5tb25zdGVyID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHRvSHRtbChpc0tub3duOiBib29sZWFuID0gdHJ1ZSwgYWRkaXRpb25uYWxDbGFzc2VzOiBzdHJpbmdbXSkge1xuICAgICAgICBsZXQgY2xhc3Nlczogc3RyaW5nW10gPSBbXCJmbG9vckNhc2VcIl0uY29uY2F0KGFkZGl0aW9ubmFsQ2xhc3Nlcyk7XG5cbiAgICAgICAgaWYgKGlzS25vd24pIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChcInZpc2l0ZWRcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goXCJ3YXJGb2dcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc1RyYXAoKSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKFwidHJhcFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0dvYWwoKSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKFwiZ29hbFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc01vbnN0ZXIoKSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKFwibW9uc3RlclwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc1RyZWUoKSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKFwidHJlZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc1RyYXBDbHVlKCkpIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChcInRyYXBDbHVlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzTW9uc3RlckNsdWUoKSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKFwibW9uc3RlckNsdWVcIik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCIke2NsYXNzZXMuam9pbihcIiBcIil9XCI+PC9kaXY+YDtcbiAgICB9XG59XG4iLCJpbXBvcnQge2VtcHR5LCBnb2FsLCBtb25zdGVyLCB0cmFwLCB0cmVlfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCBGbG9vciBmcm9tIFwiLi9GbG9vclwiO1xuXG4vKipcbiAqIEEgZ2xvb215IGRhcmsgZm9yZXN0LiBUaGVyZSBhcmUgbG90cyBvZiBtb25zdGVycyBhbmQgdHJhcHMgaGVyZS4gQmUgY2FyZWZ1bCwgd2FuZGVyZXIuLi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9yZXN0IHtcbiAgICBwcml2YXRlIGZvcmVzdDogRmxvb3JbXVtdID0gW107XG4gICAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGhlaWdodDogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKHcgPSAzLCBoID0gMykge1xuICAgICAgICB0aGlzLndpZHRoID0gdztcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoO1xuICAgIH1cblxuICAgIHB1YmxpYyBwb3B1bGF0ZShtYXhDaGFuY2VzID0gMjApIHtcbiAgICAgICAgLy8gU2V0IHRoZSBtb25zdGVycyBhbmQgdHJhcHNcbiAgICAgICAgbGV0IHRtcDogRmxvb3JbXVtdID0gW107XG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5oZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgdG1wW3ldID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRtcFJhbmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4Q2hhbmNlcyAtIDApICsgMCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodG1wUmFuZCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJdCdzIGEgbW9uc3RlciFcbiAgICAgICAgICAgICAgICAgICAgdG1wW3ldW3hdID0gbmV3IEZsb29yKG1vbnN0ZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodG1wUmFuZCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJdCdzIGEgdHJhcCFcbiAgICAgICAgICAgICAgICAgICAgdG1wW3ldW3hdID0gbmV3IEZsb29yKHRyYXApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRtcFt5XVt4XSA9IG5ldyBGbG9vcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9yZXN0ID0gdG1wO1xuXG4gICAgICAgIC8vIFNldCB0aGUgd2F5IG91dFxuICAgICAgICBsZXQgaXNBV2F5T3V0ID0gZmFsc2U7XG4gICAgICAgIGxldCBvdXRZO1xuICAgICAgICBsZXQgb3V0WDtcbiAgICAgICAgd2hpbGUgKCFpc0FXYXlPdXQpIHtcbiAgICAgICAgICAgIG91dFkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAodGhpcy5mb3Jlc3QubGVuZ3RoIC0gMCkgKyAwKTtcbiAgICAgICAgICAgIG91dFggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAodGhpcy5mb3Jlc3RbMF0ubGVuZ3RoIC0gMCkgKyAwKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZm9yZXN0W291dFldW291dFhdLmlzRW1wdHkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmVzdFtvdXRZXVtvdXRYXSA9IG5ldyBGbG9vcihnb2FsKTtcbiAgICAgICAgICAgICAgICBpc0FXYXlPdXQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgIGxldCBjZWxsID0gdGhpcy5mb3Jlc3RbeV1beF07XG4gICAgICAgICAgICAgICAgaWYgKGNlbGwuaXNNb25zdGVyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSXQncyBhIG1vbnN0ZXIhXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q2x1ZXMoeSwgeCwgbW9uc3Rlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjZWxsLmlzVHJhcCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEl0J3MgYSB0cmFwIVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENsdWVzKHksIHgsIHRyYXApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRGbG9vckNvbnRlbnQoeTogbnVtYmVyLCB4OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZXN0W3ldW3hdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRGb3Jlc3QoKTogRmxvb3JbXVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZXN0O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRXYXlPdXRQb3NpdGlvbigpIHtcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcmVzdFt5XVt4XS5pc0dvYWwoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge3gsIHl9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0Q2x1ZXMoeTogbnVtYmVyLCB4OiBudW1iZXIsIGNvbnRlbnQ6IHN0cmluZykge1xuICAgICAgICBpZiAoeSAtIDEgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RbeSAtIDFdW3hdLnNldENsdWUoY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHkgKyAxIDwgdGhpcy5oZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0W3kgKyAxXVt4XS5zZXRDbHVlKGNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh4IC0gMSA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdFt5XVt4IC0gMV0uc2V0Q2x1ZShjb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeCArIDEgPCB0aGlzLndpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdFt5XVt4ICsgMV0uc2V0Q2x1ZShjb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IEZvcmVzdCBmcm9tIFwiLi9Gb3Jlc3RcIjtcbmltcG9ydCBXYW5kZXJlciBmcm9tIFwiLi9XYW5kZXJlclwiO1xuXG4vKipcbiAqIEl0J3MgYSBnYW1lIGZvciBldmVyeW9uZSwgZXhjZXB0IGZvciB0aGUgd2FuZGVyZXIuIFBvb3Igd2FuZGVyZXIuLi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG4gICAgcHJpdmF0ZSBjdXJyZW50Rm9yZXN0OiBGb3Jlc3Q7XG4gICAgcHJpdmF0ZSB3YW5kZXJlcjogV2FuZGVyZXI7XG4gICAgcHJpdmF0ZSBnYW1lRGl2OiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoZ2FtZURpdjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZ2FtZURpdiA9IGdhbWVEaXY7XG4gICAgfVxuICAgIHB1YmxpYyBpbml0KHcgPSAzLCBoID0gMykge1xuICAgICAgICB0aGlzLmNyZWF0ZUZvcmVzdCh3LCBoKTtcbiAgICAgICAgdGhpcy5nZXRGb3Jlc3QoKS5wb3B1bGF0ZSgpO1xuICAgICAgICB0aGlzLnNldFdhbmRlcmVyKCk7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuICAgIHB1YmxpYyBjcmVhdGVGb3Jlc3QodyA9IDMsIGggPSAzKTogR2FtZSB7XG4gICAgICAgIHRoaXMuY3VycmVudEZvcmVzdCA9IG5ldyBGb3Jlc3QodywgaCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRGb3Jlc3QoKTogRm9yZXN0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudEZvcmVzdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0V2FuZGVyZXIoKTogR2FtZSB7XG4gICAgICAgIGNvbnN0IGZvcmVzdCA9IHRoaXMuY3VycmVudEZvcmVzdDtcblxuICAgICAgICBpZiAoIWZvcmVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaXNPayA9IGZhbHNlO1xuICAgICAgICBsZXQgeTtcbiAgICAgICAgbGV0IHg7XG4gICAgICAgIHdoaWxlICghaXNPaykge1xuICAgICAgICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChmb3Jlc3QuZ2V0Rm9yZXN0KCkubGVuZ3RoIC0gMCkgKyAwKTtcbiAgICAgICAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoZm9yZXN0LmdldEZvcmVzdCgpWzBdLmxlbmd0aCAtIDApICsgMCk7XG5cbiAgICAgICAgICAgIGlmIChmb3Jlc3QuZ2V0Rm9yZXN0KClbeV1beF0uaXNFbXB0eSkge1xuICAgICAgICAgICAgICAgIGlzT2sgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMud2FuZGVyZXIgPSBuZXcgV2FuZGVyZXIoeSwgeCwgZm9yZXN0KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0V2FuZGVyZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndhbmRlcmVyO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGdhbWVEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdhbWVEaXYpO1xuICAgICAgICBjb25zdCBmb3Jlc3QgPSB0aGlzLmdldEZvcmVzdCgpLmdldEZvcmVzdCgpO1xuICAgICAgICBjb25zdCB3YW5kZXJlciA9IHRoaXMud2FuZGVyZXI7XG5cbiAgICAgICAgbGV0IGh0bWw6IHN0cmluZyA9IFwiXCI7XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmN1cnJlbnRGb3Jlc3QuZ2V0Rm9yZXN0KCkubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgICAgIGh0bWwgKz0gXCI8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlwiO1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLmN1cnJlbnRGb3Jlc3QuZ2V0Rm9yZXN0KClbMF0ubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICAgICAgICBsZXQgd2FuZGVyZXJQb3MgPSB3YW5kZXJlci5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIGxldCBmbG9vciA9IHRoaXMuY3VycmVudEZvcmVzdC5nZXRGb3Jlc3QoKVt5XVt4XTtcbiAgICAgICAgICAgICAgICBsZXQgYWRkaXRpb25uYWxDbGFzc2VzID0gW107XG5cbiAgICAgICAgICAgICAgICBpZiAod2FuZGVyZXJQb3MueCA9PT0geCAmJiB3YW5kZXJlclBvcy55ID09PSB5KSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9ubmFsQ2xhc3Nlcy5wdXNoKFwid2FuZGVyZXJcIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaHRtbCArPSBmbG9vci50b0h0bWwodGhpcy53YW5kZXJlci5pc0tub3duKHksIHgpLCBhZGRpdGlvbm5hbENsYXNzZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaHRtbCArPSBcIjwvZGl2PlwiO1xuICAgICAgICB9XG4gICAgICAgIGdhbWVEaXYuY2xhc3NOYW1lID0gXCJcIjtcbiAgICAgICAgZ2FtZURpdi5jbGFzc0xpc3QuYWRkKGB3aWR0aCR7Zm9yZXN0Lmxlbmd0aH1gKTtcbiAgICAgICAgZ2FtZURpdi5pbm5lckhUTUwgPSBodG1sO1xuICAgIH1cblxuICAgIHB1YmxpYyBpdGVyYXRlKCkge1xuICAgICAgICBpZiAodGhpcy53YW5kZXJlci5pc091dCgpKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdTaXplID0gdGhpcy5nZXRGb3Jlc3QoKS5nZXRGb3Jlc3QoKS5sZW5ndGggKyAxO1xuICAgICAgICAgICAgdGhpcy5pbml0KG5ld1NpemUsIG5ld1NpemUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgRmxvb3IgZnJvbSBcIi4vRmxvb3JcIjtcbmltcG9ydCBGb3Jlc3QgZnJvbSBcIi4vRm9yZXN0XCI7XG5cbi8qKlxuICogVGhlIHdhbmRlcmVyLCB0aGUgaGVybyBvZiB0aGlzIHF1ZXN0LiBHb29kIGx1Y2sgc29uLi4uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbmRlcmVyIHtcbiAgICBwcml2YXRlIGZvcmVzdDogRm9yZXN0O1xuICAgIHByaXZhdGUgZm9yZXN0TWFwV2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIGZvcmVzdE1hcEhlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgZm9yZXN0TWFwOiBGbG9vcltdW10gPSBbXTtcbiAgICBwcml2YXRlIHk6IG51bWJlcjtcbiAgICBwcml2YXRlIHg6IG51bWJlcjtcbiAgICBwcml2YXRlIHNjb3JlOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXJZOiBudW1iZXIsIHBsYXllclg6IG51bWJlciwgZGFya1dvb2RzOiBGb3Jlc3QpIHtcbiAgICAgICAgdGhpcy5mb3Jlc3QgPSBkYXJrV29vZHM7XG4gICAgICAgIHRoaXMueCA9IHBsYXllclg7XG4gICAgICAgIHRoaXMueSA9IHBsYXllclk7XG5cbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gZGFya1dvb2RzLmdldEZvcmVzdCgpLmxlbmd0aDtcbiAgICAgICAgY29uc3Qgd2lkdGggPSBkYXJrV29vZHMuZ2V0Rm9yZXN0KClbMF0ubGVuZ3RoO1xuXG4gICAgICAgIHRoaXMuZm9yZXN0TWFwSGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLmZvcmVzdE1hcFdpZHRoID0gd2lkdGg7XG5cbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBoZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RNYXBbeV0gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgd2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9yZXN0TWFwW3ldW3hdID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0tub3duKHk6IG51bWJlciwgeDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcmVzdE1hcFt5XVt4XSAhPT0gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UG9zaXRpb24oKSB7XG4gICAgICAgIHJldHVybiB7eDogdGhpcy54LCB5OiB0aGlzLnl9O1xuICAgIH1cblxuICAgIHB1YmxpYyB0b0h0bWwoKSB7XG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cImZsb29yQ2FzZSB3YW5kZXJlclwiPjwvZGl2PmA7XG4gICAgfVxuXG4gICAgcHVibGljIHBlcmNlaXZlKCkge1xuICAgICAgICB0aGlzLmZvcmVzdE1hcFt0aGlzLnldW3RoaXMueF0gPSB0aGlzLmZvcmVzdC5nZXRGbG9vckNvbnRlbnQodGhpcy55LCB0aGlzLngpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyB0aGluaygpIHtcbiAgICAgICAgbGV0IHRoaXNGbG9vciA9IHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54XTtcbiAgICAgICAgaWYgKHRoaXNGbG9vci5pc01vbnN0ZXJDbHVlKCkgfHwgdGhpc0Zsb29yLmlzVHJhcENsdWUoKSkge1xuICAgICAgICAgICAgLy8gQHRvZG9cbiAgICAgICAgfVxuICAgICAgICAvLyBAdG9kb1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBtb3ZlKGRpcmVjdGlvbjogc3RyaW5nKSB7XG4gICAgICAgIGxldCBjdXJyZW50UG9zID0gdGhpcy5nZXRQb3NpdGlvbigpO1xuICAgICAgICBsZXQgbmV3VmFsO1xuXG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IGN1cnJlbnRQb3MueCAtIDE7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbCA+PSAwKSB7IHRoaXMueCA9IG5ld1ZhbDsgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgICAgICAgICAgbmV3VmFsID0gY3VycmVudFBvcy54ICsgMTtcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsIDwgdGhpcy5mb3Jlc3RNYXBXaWR0aCkgeyB0aGlzLnggPSBuZXdWYWw7IH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ1cFwiOlxuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IGN1cnJlbnRQb3MueSAtIDE7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbCA+PSAwKSB7IHRoaXMueSA9IG5ld1ZhbDsgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImRvd25cIjpcbiAgICAgICAgICAgICAgICBuZXdWYWwgPSBjdXJyZW50UG9zLnkgKyAxO1xuICAgICAgICAgICAgICAgIGlmIChuZXdWYWwgPCB0aGlzLmZvcmVzdE1hcEhlaWdodCkgeyB0aGlzLnkgPSBuZXdWYWw7IH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBWZXJpZnkgRmxvb3JcbiAgICAgICAgLy8gbGV0IHRoaXNGbG9vciA9IHRoaXMuZm9yZXN0TWFwW3RoaXMueV1bdGhpcy54XTtcbiAgICAgICAgLy8gaWYgKHRoaXNGbG9vci5pc0dvYWwoKSkge1xuICAgICAgICAvLyAgICAgLy8gQHRvZG8gRG8gbW92ZVxuICAgICAgICAvLyAgICAgLy8gT28tRGUtTGFsbHkhIVxuICAgICAgICAvLyAgICAgLy8gQHRvZG8gTmV3IGZvcmVzdFxuICAgICAgICAvLyB9IGVsc2UgaWYgKHRoaXNGbG9vci5pc01vbnN0ZXIoKSB8fCB0aGlzRmxvb3IuaXNUcmFwKCkpIHtcbiAgICAgICAgLy8gICAgIC8vIFRvbyBtdWNoLCB0b28gc29vbiwgdG9vIGZhciB0byBnbywgdG9vIGxhdGUgdG8gcGxheSwgdGhlIGdhbWUgaXMgb3ZlclxuICAgICAgICAvLyAgICAgLy8gQHRvZG8gV2FuZGVyZXIgZGllXG4gICAgICAgIC8vIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgdXNlU2xpbmdzaG90KHk6IG51bWJlciwgeDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmZvcmVzdC5nZXRGbG9vckNvbnRlbnQoeSwgeCkuaXNNb25zdGVyKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0LmdldEZsb29yQ29udGVudCh5LCB4KS5raWxsTW9uc3RlcigpO1xuICAgICAgICAgICAgLy8gQHRvZG8gQ2FsbCBhbmltYXRpb25cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBpc091dCgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3Qgd2F5T3V0UG9zaXRpb24gPSB0aGlzLmZvcmVzdC5nZXRXYXlPdXRQb3NpdGlvbigpO1xuXG4gICAgICAgIGlmICh0aGlzLnggPT09IHdheU91dFBvc2l0aW9uLnggJiYgdGhpcy55ID09PSB3YXlPdXRQb3NpdGlvbi55KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCBjb25zdCB0cmFwID0gXCJ0cmFwXCI7XG5leHBvcnQgY29uc3QgZW1wdHkgPSBcIlwiO1xuZXhwb3J0IGNvbnN0IGdvYWwgPSBcImdvYWxcIjtcbmV4cG9ydCBjb25zdCBtb25zdGVyID0gXCJtb25zdGVyXCI7XG5leHBvcnQgY29uc3QgdHJlZSA9IFwidHJlZVwiO1xuIiwiaW1wb3J0ICogYXMgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgKiBhcyBqc2JvYXJkIGZyb20gXCIuL0ZvcmVzdFwiO1xuaW1wb3J0IEdhbWUgZnJvbSBcIi4vR2FtZVwiO1xuXG5sZXQgZyA9IG5ldyBHYW1lKFwiZ2FtZVwiKTtcbmcuaW5pdCgpO1xuXG4vLyBJbml0IG1hbnVhbCBnYW1lXG5kb2N1bWVudC5vbmtleWRvd24gPSAoZSkgPT4ge1xuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgICBnLmdldFdhbmRlcmVyKCkubW92ZShcImxlZnRcIik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgIGcuZ2V0V2FuZGVyZXIoKS5tb3ZlKFwidXBcIik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgIGcuZ2V0V2FuZGVyZXIoKS5tb3ZlKFwicmlnaHRcIik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgIGcuZ2V0V2FuZGVyZXIoKS5tb3ZlKFwiZG93blwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGcuaXRlcmF0ZSgpO1xufTtcbiJdfQ==

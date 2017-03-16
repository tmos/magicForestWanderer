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
    /**
     * Create a new floor
     * @param {string} element The element on the floor, must be selected into constants
     */
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
        // The floor is empty otherwise
    }
    /**
     * Is it a trap?
     */
    Floor.prototype.isTrap = function () {
        return this.trap;
    };
    /**
     * Is it the goal?
     */
    Floor.prototype.isGoal = function () {
        return this.goal;
    };
    /**
     * Is it a monster?
     */
    Floor.prototype.isMonster = function () {
        return this.monster;
    };
    /**
     * Is it a tree?
     */
    Floor.prototype.isTree = function () {
        return this.tree;
    };
    /**
     * Is it a monster clue?
     */
    Floor.prototype.isMonsterClue = function () {
        return this.monsterClue;
    };
    /**
     * Is it a trap clue?
     */
    Floor.prototype.isTrapClue = function () {
        return this.trapClue;
    };
    /**
     * Set a clue on the floor
     * @param {string} clueType The type of clue on the floor, must be selected into constants
     */
    Floor.prototype.setClue = function (clueType) {
        if (clueType === constants_1.trap) {
            this.trapClue = true;
        }
        else if (clueType === constants_1.monster) {
            this.monsterClue = true;
        }
    };
    /**
     * CLINK! The wanderer have used his slingshot to kill the monster
     */
    Floor.prototype.killMonster = function () {
        this.monster = false;
    };
    return Floor;
}());
exports.default = Floor;

},{"./constants":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var Floor_1 = require("./Floor");
/**
 * A gloomy dark forest. There are lots of monsters and traps here. Be careful, wanderer...
 */
var Forest = (function () {
    /**
     * Create a new forest
     * @param {number} w The width of the forest
     * @param {number} h The height of the forest
     */
    function Forest(w, h) {
        if (w === void 0) { w = 3; }
        if (h === void 0) { h = 3; }
        this.forest = [];
        this.width = 0;
        this.height = 0;
        this.width = w;
        this.height = h;
    }
    /**
     * Populate the forest randomly
     * @param {number} maxChances The chances
     */
    Forest.prototype.populate = function (maxChances) {
        if (maxChances === void 0) { maxChances = 50; }
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var tmpRand = Math.random() * (maxChances - 0) + 0;
                if (tmpRand === 0) {
                    // It's a monster
                    this.forest[y][x] = new Floor_1.default(constants_1.monster);
                    this.setClues(y, x, constants_1.monster);
                }
                else if (tmpRand === 1) {
                    // It's a trap
                    this.forest[y][x] = new Floor_1.default(constants_1.trap);
                    this.setClues(y, x, constants_1.trap);
                }
            }
        }
    };
    /**
     * Get the content of the floor
     * @param {number} y The y parameter of this floor
     * @param {number} x The x parameter of this floor
     */
    Forest.prototype.getFloorContent = function (y, x) {
        return this.forest[y][x];
    };
    /**
     * Get da woods
     */
    Forest.prototype.getForest = function () {
        return this.forest;
    };
    /**
     * Set the clues around the main items of the game
     * @param {number} y The y parameter of the item
     * @param {number} x The x parameter of the item
     * @param {string} content The content from the constants
     */
    Forest.prototype.setClues = function (y, x, content) {
        if (y - 1 >= 0) {
            this.forest[y - 1][x].setClue(content);
        }
        if (y + 1 < this.width) {
            this.forest[y + 1][x].setClue(content);
        }
        if (x - 1 >= 0) {
            this.forest[y][x - 1].setClue(content);
        }
        if (y + 1 < this.width) {
            this.forest[y][x + 1].setClue(content);
        }
    };
    return Forest;
}());
exports.default = Forest;

},{"./Floor":1,"./constants":4}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Forest_1 = require("./Forest");
var Game = (function () {
    function Game() {
        return this;
    }
    /**
     * Create a new forest
     * @param {number} w Width of the forest
     * @param {number} h Height of the forest
     */
    Game.prototype.createForest = function (w, h) {
        if (w === void 0) { w = 3; }
        if (h === void 0) { h = 3; }
        this.forest = new Forest_1.default(w, h);
        return this;
    };
    /**
     * Get the forest
     */
    Game.prototype.getForest = function () {
        return this.forest;
    };
    return Game;
}());
exports.default = Game;

},{"./Forest":2}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trap = "trap";
exports.empty = "";
exports.goal = "goal";
exports.monster = "monster";
exports.tree = "tree";

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("./Game");
var g = new Game_1.default();
g.createForest();

},{"./Game":3}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9zcmMvRmxvb3IudHMiLCJqcy9zcmMvRm9yZXN0LnRzIiwianMvc3JjL0dhbWUudHMiLCJqcy9zcmMvY29uc3RhbnRzLnRzIiwianMvc3JjL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLHlDQUE2RDtBQUU3RDs7OztHQUlHO0FBQ0g7SUFTSTs7O09BR0c7SUFDSCxlQUFZLE9BQWU7UUFBZix3QkFBQSxFQUFBLDJCQUFlO1FBWm5CLFNBQUksR0FBWSxLQUFLLENBQUM7UUFDdEIsU0FBSSxHQUFZLEtBQUssQ0FBQztRQUN0QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLFNBQUksR0FBWSxLQUFLLENBQUM7UUFFdEIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQU9qQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssZ0JBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssZ0JBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssbUJBQU8sQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssZ0JBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUNELCtCQUErQjtJQUNuQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxzQkFBTSxHQUFiO1FB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Q0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxDQUFDO0lBQ0wsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQXpFQSxBQXlFQyxJQUFBOzs7Ozs7QUMvRUQsbUNBQThCO0FBRTlCO0lBSUk7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksMkJBQVksR0FBbkIsVUFBb0IsQ0FBSyxFQUFFLENBQUs7UUFBWixrQkFBQSxFQUFBLEtBQUs7UUFBRSxrQkFBQSxFQUFBLEtBQUs7UUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGdCQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksd0JBQVMsR0FBaEI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBQ0wsV0FBQztBQUFELENBeEJBLEFBd0JDLElBQUE7Ozs7OztBQzFCWSxRQUFBLElBQUksR0FBRyxNQUFNLENBQUM7QUFDZCxRQUFBLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDWCxRQUFBLElBQUksR0FBRyxNQUFNLENBQUM7QUFDZCxRQUFBLE9BQU8sR0FBRyxTQUFTLENBQUM7QUFDcEIsUUFBQSxJQUFJLEdBQUcsTUFBTSxDQUFDOzs7OztBQ0YzQiwrQkFBMEI7QUFFMUIsSUFBSSxDQUFDLEdBQUcsSUFBSSxjQUFJLEVBQUUsQ0FBQztBQUNuQixDQUFDLENBQUMsWUFBWSxFQUFFLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHtlbXB0eSwgZ29hbCwgbW9uc3RlciwgdHJhcCwgdHJlZX0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbi8qKlxuICogWW91J2xsIHRlbGwgbWU6IFwiQSBmbG9vciBpcyBhIGZsb29yXCIsIGFuZCB5b3UnbGwgYmUgcmlnaHQuXG4gKiBUaGlzIGlzIG5vdCB0aGUgZmxvb3IgaXRzZWxmIHRoYXQgbWF0dGVycywgdGhpcyBpcyB3aGF0IGl0IGNvbnRhaW5zLlxuICogSXMgaXQgYW4gaG9ycmlibGUgbW9uc3RlciBvbiB0aGlzIGZsb29yPyBPciBhIGxldGhhbCB0cmFwPyBPciBhIGNsdWUgZm9yIHRoZSBuZXh0IGZsb29yPyBZb3UnbGwgc2VlLCB3YW5kZXJlci4uLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbG9vciB7XG4gICAgcHJpdmF0ZSB0cmFwOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBnb2FsOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBtb25zdGVyOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSB0cmVlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIHRyYXBDbHVlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBtb25zdGVyQ2x1ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGZsb29yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnQgVGhlIGVsZW1lbnQgb24gdGhlIGZsb29yLCBtdXN0IGJlIHNlbGVjdGVkIGludG8gY29uc3RhbnRzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCA9IGVtcHR5KSB7XG4gICAgICAgIGlmIChlbGVtZW50ID09PSB0cmFwKSB7XG4gICAgICAgICAgICB0aGlzLnRyYXAgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgPT09IGdvYWwpIHtcbiAgICAgICAgICAgIHRoaXMuZ29hbCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCA9PT0gbW9uc3Rlcikge1xuICAgICAgICAgICAgdGhpcy5tb25zdGVyID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50ID09PSB0cmVlKSB7XG4gICAgICAgICAgICB0aGlzLnRyZWUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoZSBmbG9vciBpcyBlbXB0eSBvdGhlcndpc2VcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJcyBpdCBhIHRyYXA/XG4gICAgICovXG4gICAgcHVibGljIGlzVHJhcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhcDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJcyBpdCB0aGUgZ29hbD9cbiAgICAgKi9cbiAgICBwdWJsaWMgaXNHb2FsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nb2FsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElzIGl0IGEgbW9uc3Rlcj9cbiAgICAgKi9cbiAgICBwdWJsaWMgaXNNb25zdGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElzIGl0IGEgdHJlZT9cbiAgICAgKi9cbiAgICBwdWJsaWMgaXNUcmVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElzIGl0IGEgbW9uc3RlciBjbHVlP1xuICAgICAqL1xuICAgIHB1YmxpYyBpc01vbnN0ZXJDbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyQ2x1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJcyBpdCBhIHRyYXAgY2x1ZT9cbiAgICAgKi9cbiAgICBwdWJsaWMgaXNUcmFwQ2x1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhcENsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGEgY2x1ZSBvbiB0aGUgZmxvb3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2x1ZVR5cGUgVGhlIHR5cGUgb2YgY2x1ZSBvbiB0aGUgZmxvb3IsIG11c3QgYmUgc2VsZWN0ZWQgaW50byBjb25zdGFudHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0Q2x1ZShjbHVlVHlwZTogc3RyaW5nKSB7XG4gICAgICAgIGlmIChjbHVlVHlwZSA9PT0gdHJhcCkge1xuICAgICAgICAgICAgdGhpcy50cmFwQ2x1ZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoY2x1ZVR5cGUgPT09IG1vbnN0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMubW9uc3RlckNsdWUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ0xJTkshIFRoZSB3YW5kZXJlciBoYXZlIHVzZWQgaGlzIHNsaW5nc2hvdCB0byBraWxsIHRoZSBtb25zdGVyXG4gICAgICovXG4gICAgcHVibGljIGtpbGxNb25zdGVyKCkge1xuICAgICAgICB0aGlzLm1vbnN0ZXIgPSBmYWxzZTtcbiAgICB9XG59XG4iLCJpbXBvcnQge2VtcHR5LCBnb2FsLCBtb25zdGVyLCB0cmFwLCB0cmVlfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCBGbG9vciBmcm9tIFwiLi9GbG9vclwiO1xuXG4vKipcbiAqIEEgZ2xvb215IGRhcmsgZm9yZXN0LiBUaGVyZSBhcmUgbG90cyBvZiBtb25zdGVycyBhbmQgdHJhcHMgaGVyZS4gQmUgY2FyZWZ1bCwgd2FuZGVyZXIuLi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9yZXN0IHtcbiAgICBwcml2YXRlIGZvcmVzdDogRmxvb3JbXVtdID0gW107XG4gICAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGhlaWdodDogbnVtYmVyID0gMDtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBmb3Jlc3RcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdyBUaGUgd2lkdGggb2YgdGhlIGZvcmVzdFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoIFRoZSBoZWlnaHQgb2YgdGhlIGZvcmVzdFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHcgPSAzLCBoID0gMykge1xuICAgICAgICB0aGlzLndpZHRoID0gdztcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBvcHVsYXRlIHRoZSBmb3Jlc3QgcmFuZG9tbHlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4Q2hhbmNlcyBUaGUgY2hhbmNlc1xuICAgICAqL1xuICAgIHB1YmxpYyBwb3B1bGF0ZShtYXhDaGFuY2VzID0gNTApIHtcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRtcFJhbmQgPSBNYXRoLnJhbmRvbSgpICogKG1heENoYW5jZXMgLSAwKSArIDA7XG5cbiAgICAgICAgICAgICAgICBpZiAodG1wUmFuZCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJdCdzIGEgbW9uc3RlclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcmVzdFt5XVt4XSA9IG5ldyBGbG9vcihtb25zdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDbHVlcyh5LCB4LCBtb25zdGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRtcFJhbmQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSXQncyBhIHRyYXBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3Jlc3RbeV1beF0gPSBuZXcgRmxvb3IodHJhcCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q2x1ZXMoeSwgeCwgdHJhcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjb250ZW50IG9mIHRoZSBmbG9vclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5IFRoZSB5IHBhcmFtZXRlciBvZiB0aGlzIGZsb29yXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHggVGhlIHggcGFyYW1ldGVyIG9mIHRoaXMgZmxvb3JcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0Rmxvb3JDb250ZW50KHk6IG51bWJlciwgeDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcmVzdFt5XVt4XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgZGEgd29vZHNcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0Rm9yZXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3Jlc3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjbHVlcyBhcm91bmQgdGhlIG1haW4gaXRlbXMgb2YgdGhlIGdhbWVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geSBUaGUgeSBwYXJhbWV0ZXIgb2YgdGhlIGl0ZW1cbiAgICAgKiBAcGFyYW0ge251bWJlcn0geCBUaGUgeCBwYXJhbWV0ZXIgb2YgdGhlIGl0ZW1cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCBUaGUgY29udGVudCBmcm9tIHRoZSBjb25zdGFudHNcbiAgICAgKi9cbiAgICBwcml2YXRlIHNldENsdWVzKHk6IG51bWJlciwgeDogbnVtYmVyLCBjb250ZW50OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHkgLSAxID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0W3kgLSAxXVt4XS5zZXRDbHVlKGNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh5ICsgMSA8IHRoaXMud2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0W3kgKyAxXVt4XS5zZXRDbHVlKGNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh4IC0gMSA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdFt5XVt4IC0gMV0uc2V0Q2x1ZShjb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeSArIDEgPCB0aGlzLndpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdFt5XVt4ICsgMV0uc2V0Q2x1ZShjb250ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBGb3Jlc3QgZnJvbSBcIi4vRm9yZXN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xuXG4gICAgcHJpdmF0ZSBmb3Jlc3Q6IEZvcmVzdDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgZm9yZXN0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHcgV2lkdGggb2YgdGhlIGZvcmVzdFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoIEhlaWdodCBvZiB0aGUgZm9yZXN0XG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZUZvcmVzdCh3ID0gMywgaCA9IDMpIHtcbiAgICAgICAgdGhpcy5mb3Jlc3QgPSBuZXcgRm9yZXN0KHcsIGgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGZvcmVzdFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRGb3Jlc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcmVzdDtcbiAgICB9XG59XG4iLCJleHBvcnQgY29uc3QgdHJhcCA9IFwidHJhcFwiO1xuZXhwb3J0IGNvbnN0IGVtcHR5ID0gXCJcIjtcbmV4cG9ydCBjb25zdCBnb2FsID0gXCJnb2FsXCI7XG5leHBvcnQgY29uc3QgbW9uc3RlciA9IFwibW9uc3RlclwiO1xuZXhwb3J0IGNvbnN0IHRyZWUgPSBcInRyZWVcIjtcbiIsImltcG9ydCAqIGFzICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0ICogYXMganNib2FyZCBmcm9tIFwiLi9Gb3Jlc3RcIjtcbmltcG9ydCBHYW1lIGZyb20gXCIuL0dhbWVcIjtcblxubGV0IGcgPSBuZXcgR2FtZSgpO1xuZy5jcmVhdGVGb3Jlc3QoKTtcbiJdfQ==

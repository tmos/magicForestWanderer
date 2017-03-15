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
     * @param {*} element The element on the floor, must be selected into ./constants.ts
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
     * Set a clue on the floor
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
     * @param {*} w The width of the forest
     * @param {*} h The height of the forest
     */
    function Forest(w, h) {
        if (w === void 0) { w = 4; }
        if (h === void 0) { h = 4; }
        this.forest = [];
        this.width = 0;
        this.height = 0;
        this.width = w;
        this.height = h;
    }
    /**
     * Populate the forest randomly
     * @param {*} maxChances The chances
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
     * @param y Y
     * @param x X
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
     * @param y Y
     * @param x X
     * @param content The content from the constants
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
     * @param w Width of the forest
     * @param h Height of the forest
     */
    Game.prototype.createForest = function (w, h) {
        if (w === void 0) { w = 4; }
        if (h === void 0) { h = 4; }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9zcmMvRmxvb3IudHMiLCJqcy9zcmMvRm9yZXN0LnRzIiwianMvc3JjL0dhbWUudHMiLCJqcy9zcmMvY29uc3RhbnRzLnRzIiwianMvc3JjL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLHlDQUE2RDtBQUU3RDs7OztHQUlHO0FBQ0g7SUFTSTs7O09BR0c7SUFDSCxlQUFZLE9BQWU7UUFBZix3QkFBQSxFQUFBLDJCQUFlO1FBWm5CLFNBQUksR0FBWSxLQUFLLENBQUM7UUFDdEIsU0FBSSxHQUFZLEtBQUssQ0FBQztRQUN0QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLFNBQUksR0FBWSxLQUFLLENBQUM7UUFFdEIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQU9qQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssZ0JBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssZ0JBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssbUJBQU8sQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssZ0JBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUNELCtCQUErQjtJQUNuQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSx1QkFBTyxHQUFkLFVB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SUFDSSx3QkFBUyxHQUFoQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0F4QkEsQUF3QkMsSUFBQTs7Ozs7O0FDMUJZLFFBQUEsSUFBSSxHQUFHLE1BQU0sQ0FBQztBQUNkLFFBQUEsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNYLFFBQUEsSUFBSSxHQUFHLE1BQU0sQ0FBQztBQUNkLFFBQUEsT0FBTyxHQUFHLFNBQVMsQ0FBQztBQUNwQixRQUFBLElBQUksR0FBRyxNQUFNLENBQUM7Ozs7O0FDRjNCLCtCQUEwQjtBQUUxQixJQUFJLENBQUMsR0FBRyxJQUFJLGNBQUksRUFBRSxDQUFDO0FBQ25CLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQge2VtcHR5LCBnb2FsLCBtb25zdGVyLCB0cmFwLCB0cmVlfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBZb3UnbGwgdGVsbCBtZTogXCJBIGZsb29yIGlzIGEgZmxvb3JcIiwgYW5kIHlvdSdsbCBiZSByaWdodC5cbiAqIFRoaXMgaXMgbm90IHRoZSBmbG9vciBpdHNlbGYgdGhhdCBtYXR0ZXJzLCB0aGlzIGlzIHdoYXQgaXQgY29udGFpbnMuXG4gKiBJcyBpdCBhbiBob3JyaWJsZSBtb25zdGVyIG9uIHRoaXMgZmxvb3I/IE9yIGEgbGV0aGFsIHRyYXA/IE9yIGEgY2x1ZSBmb3IgdGhlIG5leHQgZmxvb3I/IFlvdSdsbCBzZWUsIHdhbmRlcmVyLi4uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsb29yIHtcbiAgICBwcml2YXRlIHRyYXA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIGdvYWw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIG1vbnN0ZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHRyZWU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgdHJhcENsdWU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIG1vbnN0ZXJDbHVlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgZmxvb3JcbiAgICAgKiBAcGFyYW0geyp9IGVsZW1lbnQgVGhlIGVsZW1lbnQgb24gdGhlIGZsb29yLCBtdXN0IGJlIHNlbGVjdGVkIGludG8gLi9jb25zdGFudHMudHNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50ID0gZW1wdHkpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IHRyYXApIHtcbiAgICAgICAgICAgIHRoaXMudHJhcCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCA9PT0gZ29hbCkge1xuICAgICAgICAgICAgdGhpcy5nb2FsID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50ID09PSBtb25zdGVyKSB7XG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXIgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgPT09IHRyZWUpIHtcbiAgICAgICAgICAgIHRoaXMudHJlZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhlIGZsb29yIGlzIGVtcHR5IG90aGVyd2lzZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBhIGNsdWUgb24gdGhlIGZsb29yXG4gICAgICovXG4gICAgcHVibGljIHNldENsdWUoY2x1ZVR5cGU6IHN0cmluZykge1xuICAgICAgICBpZiAoY2x1ZVR5cGUgPT09IHRyYXApIHtcbiAgICAgICAgICAgIHRoaXMudHJhcENsdWUgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGNsdWVUeXBlID09PSBtb25zdGVyKSB7XG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXJDbHVlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENMSU5LISBUaGUgd2FuZGVyZXIgaGF2ZSB1c2VkIGhpcyBzbGluZ3Nob3QgdG8ga2lsbCB0aGUgbW9uc3RlclxuICAgICAqL1xuICAgIHB1YmxpYyBraWxsTW9uc3RlcigpIHtcbiAgICAgICAgdGhpcy5tb25zdGVyID0gZmFsc2U7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtlbXB0eSwgZ29hbCwgbW9uc3RlciwgdHJhcCwgdHJlZX0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgRmxvb3IgZnJvbSBcIi4vRmxvb3JcIjtcblxuLyoqXG4gKiBBIGdsb29teSBkYXJrIGZvcmVzdC4gVGhlcmUgYXJlIGxvdHMgb2YgbW9uc3RlcnMgYW5kIHRyYXBzIGhlcmUuIEJlIGNhcmVmdWwsIHdhbmRlcmVyLi4uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcmVzdCB7XG4gICAgcHJpdmF0ZSBmb3Jlc3Q6IEZsb29yW11bXSA9IFtdO1xuICAgIHByaXZhdGUgd2lkdGg6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBoZWlnaHQ6IG51bWJlciA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgZm9yZXN0XG4gICAgICogQHBhcmFtIHsqfSB3IFRoZSB3aWR0aCBvZiB0aGUgZm9yZXN0XG4gICAgICogQHBhcmFtIHsqfSBoIFRoZSBoZWlnaHQgb2YgdGhlIGZvcmVzdFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHcgPSA0LCBoID0gNCkge1xuICAgICAgICB0aGlzLndpZHRoID0gdztcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBvcHVsYXRlIHRoZSBmb3Jlc3QgcmFuZG9tbHlcbiAgICAgKiBAcGFyYW0geyp9IG1heENoYW5jZXMgVGhlIGNoYW5jZXNcbiAgICAgKi9cbiAgICBwdWJsaWMgcG9wdWxhdGUobWF4Q2hhbmNlcyA9IDUwKSB7XG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5oZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLndpZHRoOyB4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0bXBSYW5kID0gTWF0aC5yYW5kb20oKSAqIChtYXhDaGFuY2VzIC0gMCkgKyAwO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRtcFJhbmQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSXQncyBhIG1vbnN0ZXJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3Jlc3RbeV1beF0gPSBuZXcgRmxvb3IobW9uc3Rlcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q2x1ZXMoeSwgeCwgbW9uc3Rlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0bXBSYW5kID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEl0J3MgYSB0cmFwXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9yZXN0W3ldW3hdID0gbmV3IEZsb29yKHRyYXApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENsdWVzKHksIHgsIHRyYXApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY29udGVudCBvZiB0aGUgZmxvb3JcbiAgICAgKiBAcGFyYW0geSBZXG4gICAgICogQHBhcmFtIHggWFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRGbG9vckNvbnRlbnQoeTogbnVtYmVyLCB4OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZXN0W3ldW3hdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBkYSB3b29kc1xuICAgICAqL1xuICAgIHB1YmxpYyBnZXRGb3Jlc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcmVzdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGNsdWVzIGFyb3VuZCB0aGUgbWFpbiBpdGVtcyBvZiB0aGUgZ2FtZVxuICAgICAqIEBwYXJhbSB5IFlcbiAgICAgKiBAcGFyYW0geCBYXG4gICAgICogQHBhcmFtIGNvbnRlbnQgVGhlIGNvbnRlbnQgZnJvbSB0aGUgY29uc3RhbnRzXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRDbHVlcyh5OiBudW1iZXIsIHg6IG51bWJlciwgY29udGVudDogc3RyaW5nKSB7XG4gICAgICAgIGlmICh5IC0gMSA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdFt5IC0gMV1beF0uc2V0Q2x1ZShjb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeSArIDEgPCB0aGlzLndpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdFt5ICsgMV1beF0uc2V0Q2x1ZShjb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeCAtIDEgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RbeV1beCAtIDFdLnNldENsdWUoY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHkgKyAxIDwgdGhpcy53aWR0aCkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RbeV1beCArIDFdLnNldENsdWUoY29udGVudCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgRm9yZXN0IGZyb20gXCIuL0ZvcmVzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcblxuICAgIHByaXZhdGUgZm9yZXN0OiBGb3Jlc3Q7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGZvcmVzdFxuICAgICAqIEBwYXJhbSB3IFdpZHRoIG9mIHRoZSBmb3Jlc3RcbiAgICAgKiBAcGFyYW0gaCBIZWlnaHQgb2YgdGhlIGZvcmVzdFxuICAgICAqL1xuICAgIHB1YmxpYyBjcmVhdGVGb3Jlc3QodyA9IDQsIGggPSA0KSB7XG4gICAgICAgIHRoaXMuZm9yZXN0ID0gbmV3IEZvcmVzdCh3LCBoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBmb3Jlc3RcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0Rm9yZXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3Jlc3Q7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IHRyYXAgPSBcInRyYXBcIjtcbmV4cG9ydCBjb25zdCBlbXB0eSA9IFwiXCI7XG5leHBvcnQgY29uc3QgZ29hbCA9IFwiZ29hbFwiO1xuZXhwb3J0IGNvbnN0IG1vbnN0ZXIgPSBcIm1vbnN0ZXJcIjtcbmV4cG9ydCBjb25zdCB0cmVlID0gXCJ0cmVlXCI7XG4iLCJpbXBvcnQgKiBhcyAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCAqIGFzIGpzYm9hcmQgZnJvbSBcIi4vRm9yZXN0XCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9HYW1lXCI7XG5cbmxldCBnID0gbmV3IEdhbWUoKTtcbmcuY3JlYXRlRm9yZXN0KCk7XG4iXX0=

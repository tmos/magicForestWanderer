(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
/**
 * You'll tell me: "A floor is a floor", and you'll be right.
 * This is not the floor itself that matters, this is what it countains.
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
        //the floor is empty otherwise
    }
    /**
     * Set if there is a trap clue on the floor, or not
     */
    Floor.prototype.setTrapClue = function (isClue) {
        if (isClue === void 0) { isClue = false; }
        this.trapClue = isClue;
    };
    /**
     * Set if there is a monster clue on the floor, or not
     */
    Floor.prototype.setMonsterClue = function (isClue) {
        if (isClue === void 0) { isClue = false; }
        this.monsterClue = isClue;
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
                    //It's a monster
                    this.forest[y][x] = new Floor_1.default(constants_1.monster);
                }
                else if (tmpRand === 1) {
                    //It's a trap
                    this.forest[y][x] = new Floor_1.default(constants_1.trap);
                }
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9zcmMvRmxvb3IudHMiLCJqcy9zcmMvRm9yZXN0LnRzIiwianMvc3JjL0dhbWUudHMiLCJqcy9zcmMvY29uc3RhbnRzLnRzIiwianMvc3JjL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLHlDQUE2RDtBQUU3RDs7OztHQUlHO0FBQ0g7SUFTSTs7O09BR0c7SUFDSCxlQUFZLE9BQWU7UUFBZix3QkFBQSxFQUFBLDJCQUFlO1FBWm5CLFNBQUksR0FBWSxLQUFLLENBQUM7UUFDdEIsU0FBSSxHQUFZLEtBQUssQ0FBQztRQUN0QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLFNBQUksR0FBWSxLQUFLLENBQUM7UUFFdEIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQU9qQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssZ0JBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssZ0JBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssbUJBQU8sQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssZ0JBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUNELDhCQUE4QjtJQUNsQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSwyQkFBVyxHQUFsQixV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QUcsU0FBUyxDQUFDO0FBQ3BCLFFBQUEsSUFBSSxHQUFHLE1BQU0sQ0FBQzs7Ozs7QUNGM0IsK0JBQTBCO0FBRTFCLElBQUksQ0FBQyxHQUFHLElBQUksY0FBSSxFQUFFLENBQUM7QUFDbkIsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7dHJhcCwgZW1wdHksIGdvYWwsIG1vbnN0ZXIsIHRyZWV9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIFlvdSdsbCB0ZWxsIG1lOiBcIkEgZmxvb3IgaXMgYSBmbG9vclwiLCBhbmQgeW91J2xsIGJlIHJpZ2h0LlxuICogVGhpcyBpcyBub3QgdGhlIGZsb29yIGl0c2VsZiB0aGF0IG1hdHRlcnMsIHRoaXMgaXMgd2hhdCBpdCBjb3VudGFpbnMuXG4gKiBJcyBpdCBhbiBob3JyaWJsZSBtb25zdGVyIG9uIHRoaXMgZmxvb3I/IE9yIGEgbGV0aGFsIHRyYXA/IE9yIGEgY2x1ZSBmb3IgdGhlIG5leHQgZmxvb3I/IFlvdSdsbCBzZWUsIHdhbmRlcmVyLi4uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsb29yIHtcbiAgICBwcml2YXRlIHRyYXA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIGdvYWw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIG1vbnN0ZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHRyZWU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgdHJhcENsdWU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIG1vbnN0ZXJDbHVlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgZmxvb3JcbiAgICAgKiBAcGFyYW0geyp9IGVsZW1lbnQgVGhlIGVsZW1lbnQgb24gdGhlIGZsb29yLCBtdXN0IGJlIHNlbGVjdGVkIGludG8gLi9jb25zdGFudHMudHNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50ID0gZW1wdHkpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IHRyYXApIHtcbiAgICAgICAgICAgIHRoaXMudHJhcCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCA9PT0gZ29hbCkge1xuICAgICAgICAgICAgdGhpcy5nb2FsID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50ID09PSBtb25zdGVyKSB7XG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXIgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgPT09IHRyZWUpIHtcbiAgICAgICAgICAgIHRoaXMudHJlZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy90aGUgZmxvb3IgaXMgZW1wdHkgb3RoZXJ3aXNlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGlmIHRoZXJlIGlzIGEgdHJhcCBjbHVlIG9uIHRoZSBmbG9vciwgb3Igbm90XG4gICAgICovXG4gICAgcHVibGljIHNldFRyYXBDbHVlKGlzQ2x1ZSA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMudHJhcENsdWUgPSBpc0NsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGlmIHRoZXJlIGlzIGEgbW9uc3RlciBjbHVlIG9uIHRoZSBmbG9vciwgb3Igbm90XG4gICAgICovXG4gICAgcHVibGljIHNldE1vbnN0ZXJDbHVlKGlzQ2x1ZSA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMubW9uc3RlckNsdWUgPSBpc0NsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ0xJTkshIFRoZSB3YW5kZXJlciBoYXZlIHVzZWQgaGlzIHNsaW5nc2hvdCB0byBraWxsIHRoZSBtb25zdGVyXG4gICAgICovXG4gICAgcHVibGljIGtpbGxNb25zdGVyKCkge1xuICAgICAgICB0aGlzLm1vbnN0ZXIgPSBmYWxzZTtcbiAgICB9XG59XG4iLCJpbXBvcnQge3RyYXAsIGVtcHR5LCBnb2FsLCBtb25zdGVyLCB0cmVlfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCBGbG9vciBmcm9tIFwiLi9GbG9vclwiO1xuXG4vKipcbiAqIEEgZ2xvb215IGRhcmsgZm9yZXN0LiBUaGVyZSBhcmUgbG90cyBvZiBtb25zdGVycyBhbmQgdHJhcHMgaGVyZS4gQmUgY2FyZWZ1bCwgd2FuZGVyZXIuLi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9yZXN0IHtcbiAgICBwcml2YXRlIGZvcmVzdDogRmxvb3JbXVtdID0gW107XG4gICAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGhlaWdodDogbnVtYmVyID0gMDtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBmb3Jlc3RcbiAgICAgKiBAcGFyYW0geyp9IHcgVGhlIHdpZHRoIG9mIHRoZSBmb3Jlc3RcbiAgICAgKiBAcGFyYW0geyp9IGggVGhlIGhlaWdodCBvZiB0aGUgZm9yZXN0XG4gICAgICovXG4gICAgY29uc3RydWN0b3IodyA9IDQsIGggPSA0KSB7XG4gICAgICAgIHRoaXMud2lkdGggPSB3O1xuICAgICAgICB0aGlzLmhlaWdodCA9IGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUG9wdWxhdGUgdGhlIGZvcmVzdCByYW5kb21seVxuICAgICAqIEBwYXJhbSB7Kn0gbWF4Q2hhbmNlcyBUaGUgY2hhbmNlc1xuICAgICAqL1xuICAgIHB1YmxpYyBwb3B1bGF0ZShtYXhDaGFuY2VzID0gNTApIHtcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgIGxldCB0bXBSYW5kID0gTWF0aC5yYW5kb20oKSAqIChtYXhDaGFuY2VzIC0gMCkgKyAwO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRtcFJhbmQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy9JdCdzIGEgbW9uc3RlclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcmVzdFt5XVt4XSA9IG5ldyBGbG9vcihtb25zdGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRtcFJhbmQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9JdCdzIGEgdHJhcFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcmVzdFt5XVt4XSA9IG5ldyBGbG9vcih0cmFwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBGb3Jlc3QgZnJvbSBcIi4vRm9yZXN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xuXG4gICAgcHJpdmF0ZSBmb3Jlc3Q6IEZvcmVzdDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgZm9yZXN0XG4gICAgICogQHBhcmFtIHcgV2lkdGggb2YgdGhlIGZvcmVzdFxuICAgICAqIEBwYXJhbSBoIEhlaWdodCBvZiB0aGUgZm9yZXN0XG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZUZvcmVzdCh3ID0gNCwgaCA9IDQpIHtcbiAgICAgICAgdGhpcy5mb3Jlc3QgPSBuZXcgRm9yZXN0KHcsIGgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGZvcmVzdFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRGb3Jlc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcmVzdDtcbiAgICB9XG59XG4iLCJleHBvcnQgY29uc3QgdHJhcCA9IFwidHJhcFwiO1xuZXhwb3J0IGNvbnN0IGVtcHR5ID0gXCJcIjtcbmV4cG9ydCBjb25zdCBnb2FsID0gXCJnb2FsXCI7XG5leHBvcnQgY29uc3QgbW9uc3RlciA9IFwibW9uc3RlclwiO1xuZXhwb3J0IGNvbnN0IHRyZWUgPSBcInRyZWVcIjtcbiIsImltcG9ydCAqIGFzICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0ICogYXMganNib2FyZCBmcm9tIFwiLi9Gb3Jlc3RcIjtcbmltcG9ydCBHYW1lIGZyb20gXCIuL0dhbWVcIjtcblxubGV0IGcgPSBuZXcgR2FtZSgpO1xuZy5jcmVhdGVGb3Jlc3QoKTtcbiJdfQ==

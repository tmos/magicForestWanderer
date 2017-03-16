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
     * Create a new floor.
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
     * Set a clue on the floor.
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
     * CLINK! The wanderer have used his slingshot to kill the monster.
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
     * Create a new forest.
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
     * Populate the forest randomly.
     * @param {number} maxChances The chances
     */
    Forest.prototype.populate = function (maxChances) {
        if (maxChances === void 0) { maxChances = 50; }
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var tmpRand = Math.random() * (maxChances - 0) + 0;
                if (tmpRand === 0) {
                    // It's a monster!
                    this.forest[y][x] = new Floor_1.default(constants_1.monster);
                    this.setClues(y, x, constants_1.monster);
                }
                else if (tmpRand === 1) {
                    // It's a trap!
                    this.forest[y][x] = new Floor_1.default(constants_1.trap);
                    this.setClues(y, x, constants_1.trap);
                }
            }
        }
    };
    /**
     * Get the content of the floor.
     * @param {number} y The y parameter of this floor
     * @param {number} x The x parameter of this floor
     */
    Forest.prototype.getFloorContent = function (y, x) {
        return this.forest[y][x];
    };
    /**
     * Get da woods!
     */
    Forest.prototype.getForest = function () {
        return this.forest;
    };
    /**
     * Set the clues around the main items of the game.
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
/**
 * It's a game for everyone, except for the wanderer. Poor wanderer...
 */
var Game = (function () {
    /**
     * Create the game.
     */
    function Game() {
        return this;
    }
    /**
     * Create a new forest.
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
     * Get the forest.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9zcmMvRmxvb3IudHMiLCJqcy9zcmMvRm9yZXN0LnRzIiwianMvc3JjL0dhbWUudHMiLCJqcy9zcmMvY29uc3RhbnRzLnRzIiwianMvc3JjL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLHlDQUE2RDtBQUU3RDs7OztHQUlHO0FBQ0g7SUFTSTs7O09BR0c7SUFDSCxlQUFZLE9BQWU7UUFBZix3QkFBQSxFQUFBLDJCQUFlO1FBWm5CLFNBQUksR0FBWSxLQUFLLENBQUM7UUFDdEIsU0FBSSxHQUFZLEtBQUssQ0FBQztRQUN0QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLFNBQUksR0FBWSxLQUFLLENBQUM7UUFFdEIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQU9qQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssZ0JBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssZ0JBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssbUJBQU8sQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssZ0JBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUNELCtCQUErQjtJQUNuQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxzQkFBTSxHQUFiO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksc0JBQU0sR0FBYjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7T0FFRztJQUNJLHlCQUFTLEdBQWhCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksc0JBQU0sR0FBYjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7T0FFRztJQUNJLDZCQUFhLEdBQXBCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksMEJBQVUsR0FBakI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksdUJBQU8sR0FBZCxVQUFlLFFBQWdCO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxnQkFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUN6QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxtQkFBTyxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUM1QixDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ksMkJBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBQ0wsWUFBQztBQUFELENBdEZBLEFBc0ZDLElBQUE7Ozs7OztBQzdGRCx5Q0FBNkQ7QUFDN0QsaUNBQTRCO0FBRTVCOztHQUVHO0FBQ0g7SUFLSTs7OztPQUlHO0lBQ0gsZ0JBQVksQ0FBSyxFQUFFLENBQUs7UUFBWixrQkFBQSxFQUFBLEtBQUs7UUFBRSxrQkFBQSxFQUFBLEtBQUs7UUFUaEIsV0FBTSxHQUFjLEVBQUUsQ0FBQztRQUN2QixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFRdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0kseUJBQVEsR0FBZixVQUFnQixVQUFlO1FBQWYsMkJBQUEsRUFBQSxlQUFlO1FBQzNCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ25DLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNsQyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUVyRCxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEIsa0JBQWtCO29CQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksZUFBSyxDQUFDLG1CQUFPLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLG1CQUFPLENBQUMsQ0FBQztnQkFDakMsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLGVBQWU7b0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLGVBQUssQ0FBQyxnQkFBSSxDQUFDLENBQUM7b0JBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxnQkFBSSxDQUFDLENBQUM7Z0JBQzlCLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksZ0NBQWUsR0FBdEIsVUFBdUIsQ0FBUyxFQUFFLENBQVM7UUFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVEOztPQUVHO0lBQ0ksMEJBQVMsR0FBaEI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyx5QkFBUSxHQUFoQixVQUFpQixDQUFTLEVBQUUsQ0FBUyxFQUFFLE9BQWU7UUFDbEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxDQUFDO0lBQ0wsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQXpFQSxBQXlFQyxJQUFBOzs7Ozs7QUMvRUQsbUNBQThCO0FBRTlCOztHQUVHO0FBQ0g7SUFHSTs7T0FFRztJQUNIO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLDJCQUFZLEdBQW5CLFVBQW9CLENBQUssRUFBRSxDQUFLO1FBQVosa0JBQUEsRUFBQSxLQUFLO1FBQUUsa0JBQUEsRUFBQSxLQUFLO1FBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxnQkFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7T0FFRztJQUNJLHdCQUFTLEdBQWhCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQTFCQSxBQTBCQyxJQUFBOzs7Ozs7QUMvQlksUUFBQSxJQUFJLEdBQUcsTUFBTSxDQUFDO0FBQ2QsUUFBQSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ1gsUUFBQSxJQUFJLEdBQUcsTUFBTSxDQUFDO0FBQ2QsUUFBQSxPQUFPLEdBQUcsU0FBUyxDQUFDO0FBQ3BCLFFBQUEsSUFBSSxHQUFHLE1BQU0sQ0FBQzs7Ozs7QUNGM0IsK0JBQTBCO0FBRTFCLElBQUksQ0FBQyxHQUFHLElBQUksY0FBSSxFQUFFLENBQUM7QUFDbkIsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7ZW1wdHksIGdvYWwsIG1vbnN0ZXIsIHRyYXAsIHRyZWV9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIFlvdSdsbCB0ZWxsIG1lOiBcIkEgZmxvb3IgaXMgYSBmbG9vclwiLCBhbmQgeW91J2xsIGJlIHJpZ2h0LlxuICogVGhpcyBpcyBub3QgdGhlIGZsb29yIGl0c2VsZiB0aGF0IG1hdHRlcnMsIHRoaXMgaXMgd2hhdCBpdCBjb250YWlucy5cbiAqIElzIGl0IGFuIGhvcnJpYmxlIG1vbnN0ZXIgb24gdGhpcyBmbG9vcj8gT3IgYSBsZXRoYWwgdHJhcD8gT3IgYSBjbHVlIGZvciB0aGUgbmV4dCBmbG9vcj8gWW91J2xsIHNlZSwgd2FuZGVyZXIuLi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmxvb3Ige1xuICAgIHByaXZhdGUgdHJhcDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgZ29hbDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgbW9uc3RlcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgdHJlZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSB0cmFwQ2x1ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgbW9uc3RlckNsdWU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBmbG9vci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudCBUaGUgZWxlbWVudCBvbiB0aGUgZmxvb3IsIG11c3QgYmUgc2VsZWN0ZWQgaW50byBjb25zdGFudHNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50ID0gZW1wdHkpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IHRyYXApIHtcbiAgICAgICAgICAgIHRoaXMudHJhcCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCA9PT0gZ29hbCkge1xuICAgICAgICAgICAgdGhpcy5nb2FsID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50ID09PSBtb25zdGVyKSB7XG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXIgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgPT09IHRyZWUpIHtcbiAgICAgICAgICAgIHRoaXMudHJlZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhlIGZsb29yIGlzIGVtcHR5IG90aGVyd2lzZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElzIGl0IGEgdHJhcD9cbiAgICAgKi9cbiAgICBwdWJsaWMgaXNUcmFwKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElzIGl0IHRoZSBnb2FsP1xuICAgICAqL1xuICAgIHB1YmxpYyBpc0dvYWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdvYWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSXMgaXQgYSBtb25zdGVyP1xuICAgICAqL1xuICAgIHB1YmxpYyBpc01vbnN0ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSXMgaXQgYSB0cmVlP1xuICAgICAqL1xuICAgIHB1YmxpYyBpc1RyZWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSXMgaXQgYSBtb25zdGVyIGNsdWU/XG4gICAgICovXG4gICAgcHVibGljIGlzTW9uc3RlckNsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXJDbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElzIGl0IGEgdHJhcCBjbHVlP1xuICAgICAqL1xuICAgIHB1YmxpYyBpc1RyYXBDbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFwQ2x1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgYSBjbHVlIG9uIHRoZSBmbG9vci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2x1ZVR5cGUgVGhlIHR5cGUgb2YgY2x1ZSBvbiB0aGUgZmxvb3IsIG11c3QgYmUgc2VsZWN0ZWQgaW50byBjb25zdGFudHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0Q2x1ZShjbHVlVHlwZTogc3RyaW5nKSB7XG4gICAgICAgIGlmIChjbHVlVHlwZSA9PT0gdHJhcCkge1xuICAgICAgICAgICAgdGhpcy50cmFwQ2x1ZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoY2x1ZVR5cGUgPT09IG1vbnN0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMubW9uc3RlckNsdWUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ0xJTkshIFRoZSB3YW5kZXJlciBoYXZlIHVzZWQgaGlzIHNsaW5nc2hvdCB0byBraWxsIHRoZSBtb25zdGVyLlxuICAgICAqL1xuICAgIHB1YmxpYyBraWxsTW9uc3RlcigpIHtcbiAgICAgICAgdGhpcy5tb25zdGVyID0gZmFsc2U7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtlbXB0eSwgZ29hbCwgbW9uc3RlciwgdHJhcCwgdHJlZX0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgRmxvb3IgZnJvbSBcIi4vRmxvb3JcIjtcblxuLyoqXG4gKiBBIGdsb29teSBkYXJrIGZvcmVzdC4gVGhlcmUgYXJlIGxvdHMgb2YgbW9uc3RlcnMgYW5kIHRyYXBzIGhlcmUuIEJlIGNhcmVmdWwsIHdhbmRlcmVyLi4uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcmVzdCB7XG4gICAgcHJpdmF0ZSBmb3Jlc3Q6IEZsb29yW11bXSA9IFtdO1xuICAgIHByaXZhdGUgd2lkdGg6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBoZWlnaHQ6IG51bWJlciA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgZm9yZXN0LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3IFRoZSB3aWR0aCBvZiB0aGUgZm9yZXN0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGggVGhlIGhlaWdodCBvZiB0aGUgZm9yZXN0XG4gICAgICovXG4gICAgY29uc3RydWN0b3IodyA9IDMsIGggPSAzKSB7XG4gICAgICAgIHRoaXMud2lkdGggPSB3O1xuICAgICAgICB0aGlzLmhlaWdodCA9IGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUG9wdWxhdGUgdGhlIGZvcmVzdCByYW5kb21seS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4Q2hhbmNlcyBUaGUgY2hhbmNlc1xuICAgICAqL1xuICAgIHB1YmxpYyBwb3B1bGF0ZShtYXhDaGFuY2VzID0gNTApIHtcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRtcFJhbmQgPSBNYXRoLnJhbmRvbSgpICogKG1heENoYW5jZXMgLSAwKSArIDA7XG5cbiAgICAgICAgICAgICAgICBpZiAodG1wUmFuZCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJdCdzIGEgbW9uc3RlciFcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3Jlc3RbeV1beF0gPSBuZXcgRmxvb3IobW9uc3Rlcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q2x1ZXMoeSwgeCwgbW9uc3Rlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0bXBSYW5kID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEl0J3MgYSB0cmFwIVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcmVzdFt5XVt4XSA9IG5ldyBGbG9vcih0cmFwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDbHVlcyh5LCB4LCB0cmFwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGNvbnRlbnQgb2YgdGhlIGZsb29yLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5IFRoZSB5IHBhcmFtZXRlciBvZiB0aGlzIGZsb29yXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHggVGhlIHggcGFyYW1ldGVyIG9mIHRoaXMgZmxvb3JcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0Rmxvb3JDb250ZW50KHk6IG51bWJlciwgeDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcmVzdFt5XVt4XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgZGEgd29vZHMhXG4gICAgICovXG4gICAgcHVibGljIGdldEZvcmVzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZXN0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY2x1ZXMgYXJvdW5kIHRoZSBtYWluIGl0ZW1zIG9mIHRoZSBnYW1lLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5IFRoZSB5IHBhcmFtZXRlciBvZiB0aGUgaXRlbVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4IFRoZSB4IHBhcmFtZXRlciBvZiB0aGUgaXRlbVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IFRoZSBjb250ZW50IGZyb20gdGhlIGNvbnN0YW50c1xuICAgICAqL1xuICAgIHByaXZhdGUgc2V0Q2x1ZXMoeTogbnVtYmVyLCB4OiBudW1iZXIsIGNvbnRlbnQ6IHN0cmluZykge1xuICAgICAgICBpZiAoeSAtIDEgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RbeSAtIDFdW3hdLnNldENsdWUoY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHkgKyAxIDwgdGhpcy53aWR0aCkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RbeSArIDFdW3hdLnNldENsdWUoY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHggLSAxID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0W3ldW3ggLSAxXS5zZXRDbHVlKGNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh5ICsgMSA8IHRoaXMud2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0W3ldW3ggKyAxXS5zZXRDbHVlKGNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IEZvcmVzdCBmcm9tIFwiLi9Gb3Jlc3RcIjtcblxuLyoqXG4gKiBJdCdzIGEgZ2FtZSBmb3IgZXZlcnlvbmUsIGV4Y2VwdCBmb3IgdGhlIHdhbmRlcmVyLiBQb29yIHdhbmRlcmVyLi4uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xuICAgIHByaXZhdGUgZm9yZXN0OiBGb3Jlc3Q7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdGhlIGdhbWUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBmb3Jlc3QuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHcgV2lkdGggb2YgdGhlIGZvcmVzdFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoIEhlaWdodCBvZiB0aGUgZm9yZXN0XG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZUZvcmVzdCh3ID0gMywgaCA9IDMpIHtcbiAgICAgICAgdGhpcy5mb3Jlc3QgPSBuZXcgRm9yZXN0KHcsIGgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGZvcmVzdC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0Rm9yZXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3Jlc3Q7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IHRyYXAgPSBcInRyYXBcIjtcbmV4cG9ydCBjb25zdCBlbXB0eSA9IFwiXCI7XG5leHBvcnQgY29uc3QgZ29hbCA9IFwiZ29hbFwiO1xuZXhwb3J0IGNvbnN0IG1vbnN0ZXIgPSBcIm1vbnN0ZXJcIjtcbmV4cG9ydCBjb25zdCB0cmVlID0gXCJ0cmVlXCI7XG4iLCJpbXBvcnQgKiBhcyAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCAqIGFzIGpzYm9hcmQgZnJvbSBcIi4vRm9yZXN0XCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9HYW1lXCI7XG5cbmxldCBnID0gbmV3IEdhbWUoKTtcbmcuY3JlYXRlRm9yZXN0KCk7XG4iXX0=

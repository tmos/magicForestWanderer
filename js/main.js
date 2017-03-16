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
        else {
            // The floor is empty otherwise
        }
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
    Floor.prototype.toHtml = function () {
        var classes = "";
        if (this.isTrap) {
            classes += "trap ";
        }
        else if (this.isGoal) {
            classes += "goal ";
        }
        else if (this.isMonster) {
            classes += "monster ";
        }
        else if (this.tree) {
            classes += "tree ";
        }
        else {
            if (this.isTrapClue) {
                classes += "trapClue ";
            }
            if (this.isMonsterClue) {
                classes += "monsterClue ";
            }
        }
        classes += "floorCase ";
        return "<div class=\"" + classes + "\"></div>";
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
        if (maxChances === void 0) { maxChances = 20; }
        var tmp = [];
        for (var y = 0; y < this.height; y++) {
            tmp[y] = [];
            for (var x = 0; x < this.width; x++) {
                var tmpRand = Math.random() * (maxChances - 0) + 0;
                if (tmpRand === 0) {
                    // It's a monster!
                    tmp[y][x] = new Floor_1.default(constants_1.monster);
                    this.setClues(y, x, constants_1.monster);
                }
                else if (tmpRand === 1) {
                    // It's a trap!
                    tmp[y][x] = new Floor_1.default(constants_1.trap);
                    this.setClues(y, x, constants_1.trap);
                }
                else {
                    tmp[y][x] = new Floor_1.default(constants_1.trap);
                }
            }
        }
        this.forest = tmp;
        return this;
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
        if (y + 1 < this.height) {
            this.forest[y + 1][x].setClue(content);
        }
        if (x - 1 >= 0) {
            this.forest[y][x - 1].setClue(content);
        }
        if (y + 1 < this.width) {
            this.forest[y][x + 1].setClue(content);
        }
        return this;
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
        //
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
    Game.prototype.render = function (idElem) {
        var gameDiv = document.getElementById(idElem);
        var forest = this.getForest().getForest();
        var html = "";
        for (var _i = 0, forest_1 = forest; _i < forest_1.length; _i++) {
            var line = forest_1[_i];
            html += "<div class=\"row\">";
            for (var _a = 0, line_1 = line; _a < line_1.length; _a++) {
                var floor = line_1[_a];
                console.log(floor);
                html += floor.toHtml();
            }
            html += "</div>";
        }
        gameDiv.classList.add("width" + forest.length);
        gameDiv.innerHTML = html;
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
g.getForest().populate();
g.render("game");

},{"./Game":3}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9zcmMvRmxvb3IudHMiLCJqcy9zcmMvRm9yZXN0LnRzIiwianMvc3JjL0dhbWUudHMiLCJqcy9zcmMvY29uc3RhbnRzLnRzIiwianMvc3JjL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBLHlDQUE2RDtBQUU3RDs7OztHQUlHO0FBQ0g7SUFRSTs7O09BR0c7SUFDSCxlQUFZLE9BQWU7UUFBZix3QkFBQSxFQUFBLDJCQUFlO1FBWG5CLFNBQUksR0FBWSxLQUFLLENBQUM7UUFDdEIsU0FBSSxHQUFZLEtBQUssQ0FBQztRQUN0QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLFNBQUksR0FBWSxLQUFLLENBQUM7UUFDdEIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQU9qQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssZ0JBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssZ0JBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssbUJBQU8sQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssZ0JBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osK0JBQStCO1FBQ25DLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxzQkFBTSxHQUFiO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksc0JBQU0sR0FBYjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7T0FFRztJQUNJLHlCQUFTLEdBQWhCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksc0JBQU0sR0FBYjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7T0FFRztJQUNJLDZCQUFhLEdBQXBCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksMEJBQVUsR0FBakI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksdUJBQU8sR0FBZCxVQUFlLFFBQWdCO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxnQkFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUN6QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxtQkFBTyxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUM1QixDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ksMkJBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBRU0sc0JBQU0sR0FBYjtRQUNJLElBQUksT0FBTyxHQUFXLEVBQUUsQ0FBQztRQUV6QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNkLE9BQU8sSUFBSSxPQUFPLENBQUM7UUFDdkIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyQixPQUFPLElBQUksT0FBTyxDQUFDO1FBQ3ZCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsT0FBTyxJQUFJLFVBQVUsQ0FBQztRQUMxQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE9BQU8sSUFBSSxPQUFPLENBQUM7UUFDdkIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLE9BQU8sSUFBSSxXQUFXLENBQUM7WUFDM0IsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixPQUFPLElBQUksY0FBYyxDQUFDO1lBQzlCLENBQUM7UUFDTCxDQUFDO1FBRUQsT0FBTyxJQUFJLFlBQVksQ0FBQztRQUV4QixNQUFNLENBQUMsa0JBQWUsT0FBTyxjQUFVLENBQUM7SUFDNUMsQ0FBQztJQUNMLFlBQUM7QUFBRCxDQS9HQSxBQStHQyxJQUFBOzs7Ozs7QUN2SEQseUNBQTZEO0FBQzdELGlDQUE0QjtBQUU1Qjs7R0FFRztBQUNIO0lBS0k7Ozs7T0FJRztJQUNILGdCQUFZLENBQUssRUFBRSxDQUFLO1FBQVosa0JBQUEsRUFBQSxLQUFLO1FBQUUsa0JBQUEsRUFBQSxLQUFLO1FBVGhCLFdBQU0sR0FBYyxFQUFFLENBQUM7UUFDdkIsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBUXZCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLHlCQUFRLEdBQWYsVUFBZ0IsVUFBZTtRQUFmLDJCQUFBLEVBQUEsZUFBZTtRQUMzQixJQUFJLEdBQUcsR0FBYyxFQUFFLENBQUM7UUFFeEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDbkMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNaLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNsQyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUVyRCxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEIsa0JBQWtCO29CQUNsQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxlQUFLLENBQUMsbUJBQU8sQ0FBQyxDQUFDO29CQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsbUJBQU8sQ0FBQyxDQUFDO2dCQUNqQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkIsZUFBZTtvQkFDZixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxlQUFLLENBQUMsZ0JBQUksQ0FBQyxDQUFDO29CQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsZ0JBQUksQ0FBQyxDQUFDO2dCQUM5QixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLGVBQUssQ0FBQyxnQkFBSSxDQUFDLENBQUM7Z0JBQ2hDLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBRWxCLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxnQ0FBZSxHQUF0QixVQUF1QixDQUFTLEVBQUUsQ0FBUztRQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQ7O09BRUc7SUFDSSwwQkFBUyxHQUFoQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLHlCQUFRLEdBQWhCLFVBQWlCLENBQVMsRUFBRSxDQUFTLEVBQUUsT0FBZTtRQUNsRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0FwRkEsQUFvRkMsSUFBQTs7Ozs7O0FDekZELG1DQUE4QjtBQUU5Qjs7R0FFRztBQUNIO0lBR0k7O09BRUc7SUFDSDtRQUNJLEVBQUU7SUFDTixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLDJCQUFZLEdBQW5CLFVBQW9CLENBQUssRUFBRSxDQUFLO1FBQVosa0JBQUEsRUFBQSxLQUFLO1FBQUUsa0JBQUEsRUFBQSxLQUFLO1FBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxnQkFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7T0FFRztJQUNJLHdCQUFTLEdBQWhCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVNLHFCQUFNLEdBQWIsVUFBYyxNQUFjO1FBQ3hCLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRTVDLElBQUksSUFBSSxHQUFXLEVBQUUsQ0FBQztRQUV0QixHQUFHLENBQUMsQ0FBYSxVQUFNLEVBQU4saUJBQU0sRUFBTixvQkFBTSxFQUFOLElBQU07WUFBbEIsSUFBSSxJQUFJLGVBQUE7WUFDVCxJQUFJLElBQUkscUJBQXFCLENBQUM7WUFDOUIsR0FBRyxDQUFDLENBQWMsVUFBSSxFQUFKLGFBQUksRUFBSixrQkFBSSxFQUFKLElBQUk7Z0JBQWpCLElBQUksS0FBSyxhQUFBO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDMUI7WUFDRCxJQUFJLElBQUksUUFBUSxDQUFDO1NBQ3BCO1FBQ0QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBUSxNQUFNLENBQUMsTUFBUSxDQUFDLENBQUM7UUFDL0MsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQTVDQSxBQTRDQyxJQUFBOzs7Ozs7QUNsRFksUUFBQSxJQUFJLEdBQUcsTUFBTSxDQUFDO0FBQ2QsUUFBQSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ1gsUUFBQSxJQUFJLEdBQUcsTUFBTSxDQUFDO0FBQ2QsUUFBQSxPQUFPLEdBQUcsU0FBUyxDQUFDO0FBQ3BCLFFBQUEsSUFBSSxHQUFHLE1BQU0sQ0FBQzs7Ozs7QUNGM0IsK0JBQTBCO0FBRTFCLElBQUksQ0FBQyxHQUFHLElBQUksY0FBSSxFQUFFLENBQUM7QUFDbkIsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQ2pCLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN6QixDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCAqIGFzICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IHtlbXB0eSwgZ29hbCwgbW9uc3RlciwgdHJhcCwgdHJlZX0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbi8qKlxuICogWW91J2xsIHRlbGwgbWU6IFwiQSBmbG9vciBpcyBhIGZsb29yXCIsIGFuZCB5b3UnbGwgYmUgcmlnaHQuXG4gKiBUaGlzIGlzIG5vdCB0aGUgZmxvb3IgaXRzZWxmIHRoYXQgbWF0dGVycywgdGhpcyBpcyB3aGF0IGl0IGNvbnRhaW5zLlxuICogSXMgaXQgYW4gaG9ycmlibGUgbW9uc3RlciBvbiB0aGlzIGZsb29yPyBPciBhIGxldGhhbCB0cmFwPyBPciBhIGNsdWUgZm9yIHRoZSBuZXh0IGZsb29yPyBZb3UnbGwgc2VlLCB3YW5kZXJlci4uLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbG9vciB7XG4gICAgcHJpdmF0ZSB0cmFwOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBnb2FsOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBtb25zdGVyOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSB0cmVlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSB0cmFwQ2x1ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgbW9uc3RlckNsdWU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBmbG9vci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudCBUaGUgZWxlbWVudCBvbiB0aGUgZmxvb3IsIG11c3QgYmUgc2VsZWN0ZWQgaW50byBjb25zdGFudHNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50ID0gZW1wdHkpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IHRyYXApIHtcbiAgICAgICAgICAgIHRoaXMudHJhcCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCA9PT0gZ29hbCkge1xuICAgICAgICAgICAgdGhpcy5nb2FsID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50ID09PSBtb25zdGVyKSB7XG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXIgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgPT09IHRyZWUpIHtcbiAgICAgICAgICAgIHRoaXMudHJlZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBUaGUgZmxvb3IgaXMgZW1wdHkgb3RoZXJ3aXNlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJcyBpdCBhIHRyYXA/XG4gICAgICovXG4gICAgcHVibGljIGlzVHJhcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhcDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJcyBpdCB0aGUgZ29hbD9cbiAgICAgKi9cbiAgICBwdWJsaWMgaXNHb2FsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nb2FsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElzIGl0IGEgbW9uc3Rlcj9cbiAgICAgKi9cbiAgICBwdWJsaWMgaXNNb25zdGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElzIGl0IGEgdHJlZT9cbiAgICAgKi9cbiAgICBwdWJsaWMgaXNUcmVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElzIGl0IGEgbW9uc3RlciBjbHVlP1xuICAgICAqL1xuICAgIHB1YmxpYyBpc01vbnN0ZXJDbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyQ2x1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJcyBpdCBhIHRyYXAgY2x1ZT9cbiAgICAgKi9cbiAgICBwdWJsaWMgaXNUcmFwQ2x1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhcENsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGEgY2x1ZSBvbiB0aGUgZmxvb3IuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNsdWVUeXBlIFRoZSB0eXBlIG9mIGNsdWUgb24gdGhlIGZsb29yLCBtdXN0IGJlIHNlbGVjdGVkIGludG8gY29uc3RhbnRzXG4gICAgICovXG4gICAgcHVibGljIHNldENsdWUoY2x1ZVR5cGU6IHN0cmluZykge1xuICAgICAgICBpZiAoY2x1ZVR5cGUgPT09IHRyYXApIHtcbiAgICAgICAgICAgIHRoaXMudHJhcENsdWUgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGNsdWVUeXBlID09PSBtb25zdGVyKSB7XG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXJDbHVlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENMSU5LISBUaGUgd2FuZGVyZXIgaGF2ZSB1c2VkIGhpcyBzbGluZ3Nob3QgdG8ga2lsbCB0aGUgbW9uc3Rlci5cbiAgICAgKi9cbiAgICBwdWJsaWMga2lsbE1vbnN0ZXIoKSB7XG4gICAgICAgIHRoaXMubW9uc3RlciA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b0h0bWwoKSB7XG4gICAgICAgIGxldCBjbGFzc2VzOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgICAgIGlmICh0aGlzLmlzVHJhcCkge1xuICAgICAgICAgICAgY2xhc3NlcyArPSBcInRyYXAgXCI7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0dvYWwpIHtcbiAgICAgICAgICAgIGNsYXNzZXMgKz0gXCJnb2FsIFwiO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNNb25zdGVyKSB7XG4gICAgICAgICAgICBjbGFzc2VzICs9IFwibW9uc3RlciBcIjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRyZWUpIHtcbiAgICAgICAgICAgIGNsYXNzZXMgKz0gXCJ0cmVlIFwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNUcmFwQ2x1ZSkge1xuICAgICAgICAgICAgICAgIGNsYXNzZXMgKz0gXCJ0cmFwQ2x1ZSBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmlzTW9uc3RlckNsdWUpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzICs9IFwibW9uc3RlckNsdWUgXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjbGFzc2VzICs9IFwiZmxvb3JDYXNlIFwiO1xuXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIiR7Y2xhc3Nlc31cIj48L2Rpdj5gO1xuICAgIH1cbn1cbiIsImltcG9ydCB7ZW1wdHksIGdvYWwsIG1vbnN0ZXIsIHRyYXAsIHRyZWV9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IEZsb29yIGZyb20gXCIuL0Zsb29yXCI7XG5cbi8qKlxuICogQSBnbG9vbXkgZGFyayBmb3Jlc3QuIFRoZXJlIGFyZSBsb3RzIG9mIG1vbnN0ZXJzIGFuZCB0cmFwcyBoZXJlLiBCZSBjYXJlZnVsLCB3YW5kZXJlci4uLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3Jlc3Qge1xuICAgIHByaXZhdGUgZm9yZXN0OiBGbG9vcltdW10gPSBbXTtcbiAgICBwcml2YXRlIHdpZHRoOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgaGVpZ2h0OiBudW1iZXIgPSAwO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGZvcmVzdC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdyBUaGUgd2lkdGggb2YgdGhlIGZvcmVzdFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoIFRoZSBoZWlnaHQgb2YgdGhlIGZvcmVzdFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHcgPSAzLCBoID0gMykge1xuICAgICAgICB0aGlzLndpZHRoID0gdztcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBvcHVsYXRlIHRoZSBmb3Jlc3QgcmFuZG9tbHkuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1heENoYW5jZXMgVGhlIGNoYW5jZXNcbiAgICAgKi9cbiAgICBwdWJsaWMgcG9wdWxhdGUobWF4Q2hhbmNlcyA9IDIwKSB7XG4gICAgICAgIGxldCB0bXA6IEZsb29yW11bXSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5oZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgdG1wW3ldID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRtcFJhbmQgPSBNYXRoLnJhbmRvbSgpICogKG1heENoYW5jZXMgLSAwKSArIDA7XG5cbiAgICAgICAgICAgICAgICBpZiAodG1wUmFuZCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJdCdzIGEgbW9uc3RlciFcbiAgICAgICAgICAgICAgICAgICAgdG1wW3ldW3hdID0gbmV3IEZsb29yKG1vbnN0ZXIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENsdWVzKHksIHgsIG1vbnN0ZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodG1wUmFuZCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJdCdzIGEgdHJhcCFcbiAgICAgICAgICAgICAgICAgICAgdG1wW3ldW3hdID0gbmV3IEZsb29yKHRyYXApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENsdWVzKHksIHgsIHRyYXApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRtcFt5XVt4XSA9IG5ldyBGbG9vcih0cmFwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvcmVzdCA9IHRtcDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGNvbnRlbnQgb2YgdGhlIGZsb29yLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5IFRoZSB5IHBhcmFtZXRlciBvZiB0aGlzIGZsb29yXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHggVGhlIHggcGFyYW1ldGVyIG9mIHRoaXMgZmxvb3JcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0Rmxvb3JDb250ZW50KHk6IG51bWJlciwgeDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcmVzdFt5XVt4XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgZGEgd29vZHMhXG4gICAgICovXG4gICAgcHVibGljIGdldEZvcmVzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yZXN0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY2x1ZXMgYXJvdW5kIHRoZSBtYWluIGl0ZW1zIG9mIHRoZSBnYW1lLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5IFRoZSB5IHBhcmFtZXRlciBvZiB0aGUgaXRlbVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4IFRoZSB4IHBhcmFtZXRlciBvZiB0aGUgaXRlbVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IFRoZSBjb250ZW50IGZyb20gdGhlIGNvbnN0YW50c1xuICAgICAqL1xuICAgIHByaXZhdGUgc2V0Q2x1ZXMoeTogbnVtYmVyLCB4OiBudW1iZXIsIGNvbnRlbnQ6IHN0cmluZykge1xuICAgICAgICBpZiAoeSAtIDEgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5mb3Jlc3RbeSAtIDFdW3hdLnNldENsdWUoY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHkgKyAxIDwgdGhpcy5oZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yZXN0W3kgKyAxXVt4XS5zZXRDbHVlKGNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh4IC0gMSA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdFt5XVt4IC0gMV0uc2V0Q2x1ZShjb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeSArIDEgPCB0aGlzLndpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmVzdFt5XVt4ICsgMV0uc2V0Q2x1ZShjb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IEZvcmVzdCBmcm9tIFwiLi9Gb3Jlc3RcIjtcblxuLyoqXG4gKiBJdCdzIGEgZ2FtZSBmb3IgZXZlcnlvbmUsIGV4Y2VwdCBmb3IgdGhlIHdhbmRlcmVyLiBQb29yIHdhbmRlcmVyLi4uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xuICAgIHByaXZhdGUgZm9yZXN0OiBGb3Jlc3Q7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdGhlIGdhbWUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGZvcmVzdC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdyBXaWR0aCBvZiB0aGUgZm9yZXN0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGggSGVpZ2h0IG9mIHRoZSBmb3Jlc3RcbiAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlRm9yZXN0KHcgPSAzLCBoID0gMykge1xuICAgICAgICB0aGlzLmZvcmVzdCA9IG5ldyBGb3Jlc3QodywgaCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZm9yZXN0LlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRGb3Jlc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcmVzdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVuZGVyKGlkRWxlbTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGdhbWVEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZEVsZW0pO1xuICAgICAgICBjb25zdCBmb3Jlc3QgPSB0aGlzLmdldEZvcmVzdCgpLmdldEZvcmVzdCgpO1xuXG4gICAgICAgIGxldCBodG1sOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgICAgIGZvciAobGV0IGxpbmUgb2YgZm9yZXN0KSB7XG4gICAgICAgICAgICBodG1sICs9IFwiPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cIjtcbiAgICAgICAgICAgIGZvciAobGV0IGZsb29yIG9mIGxpbmUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhmbG9vcik7XG4gICAgICAgICAgICAgICAgaHRtbCArPSBmbG9vci50b0h0bWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGh0bWwgKz0gXCI8L2Rpdj5cIjtcbiAgICAgICAgfVxuICAgICAgICBnYW1lRGl2LmNsYXNzTGlzdC5hZGQoYHdpZHRoJHtmb3Jlc3QubGVuZ3RofWApO1xuICAgICAgICBnYW1lRGl2LmlubmVySFRNTCA9IGh0bWw7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IHRyYXAgPSBcInRyYXBcIjtcbmV4cG9ydCBjb25zdCBlbXB0eSA9IFwiXCI7XG5leHBvcnQgY29uc3QgZ29hbCA9IFwiZ29hbFwiO1xuZXhwb3J0IGNvbnN0IG1vbnN0ZXIgPSBcIm1vbnN0ZXJcIjtcbmV4cG9ydCBjb25zdCB0cmVlID0gXCJ0cmVlXCI7XG4iLCJpbXBvcnQgKiBhcyAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCAqIGFzIGpzYm9hcmQgZnJvbSBcIi4vRm9yZXN0XCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9HYW1lXCI7XG5cbmxldCBnID0gbmV3IEdhbWUoKTtcbmcuY3JlYXRlRm9yZXN0KCk7XG5nLmdldEZvcmVzdCgpLnBvcHVsYXRlKCk7XG5nLnJlbmRlcihcImdhbWVcIik7XG4iXX0=

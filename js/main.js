(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Forest = (function () {
    function Forest(w, h) {
        if (w === void 0) { w = 4; }
        if (h === void 0) { h = 4; }
        /**
         * Create a new forest
         * @param {*} width The width of the forest
         * @param {*} height The height of the forest
         */
        this.forest = [];
        this.width = 0;
        this.height = 0;
        this.width = w;
        this.height = h;
    }
    Forest.prototype.populate = function (maxChances) {
        if (maxChances === void 0) { maxChances = 50; }
        for (var line = 0; line < this.width; line++) {
            for (var square = 0; square < this.height; square++) {
                var tmpRand = Math.random() * (maxChances - 0) + 0;
                if (tmpRand === 0) {
                }
                else if (tmpRand === 1) {
                }
            }
        }
    };
    return Forest;
}());
exports.default = Forest;

},{}],2:[function(require,module,exports){
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
        var f = new Forest_1.default();
        return f;
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

},{"./Forest":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("./Game");
var g = new Game_1.default();
g.createForest();

},{"./Game":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9zcmMvRm9yZXN0LnRzIiwianMvc3JjL0dhbWUudHMiLCJqcy9zcmMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDRUE7SUFVSSxnQkFBWSxDQUFLLEVBQUUsQ0FBSztRQUFaLGtCQUFBLEVBQUEsS0FBSztRQUFFLGtCQUFBLEVBQUEsS0FBSztRQVR4Qjs7OztXQUlHO1FBQ0ssV0FBTSxHQUFhLEVBQUUsQ0FBQztRQUN0QixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFHdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRU0seUJBQVEsR0FBZixVQUFnQixVQUFlO1FBQWYsMkJBQUEsRUFBQSxlQUFlO1FBQzNCLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQzNDLEdBQUcsQ0FBQyxDQUFDLElBQUksTUFBTSxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDO2dCQUNsRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUVuRCxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFcEIsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTNCLENBQUM7WUFDTCxDQUFDO1FBRUwsQ0FBQztJQUNMLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0E3QkEsQUE2QkMsSUFBQTs7Ozs7O0FDL0JELG1DQUE4QjtBQUU5QjtJQUlJO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLDJCQUFZLEdBQW5CLFVBQW9CLENBQUssRUFBRSxDQUFLO1FBQVosa0JBQUEsRUFBQSxLQUFLO1FBQUUsa0JBQUEsRUFBQSxLQUFLO1FBQzVCLElBQUksQ0FBQyxHQUFHLElBQUksZ0JBQU0sRUFBRSxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQ7O09BRUc7SUFDSSx3QkFBUyxHQUFoQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0F4QkEsQUF3QkMsSUFBQTs7Ozs7O0FDeEJELCtCQUEwQjtBQUUxQixJQUFJLENBQUMsR0FBRyxJQUFJLGNBQUksRUFBRSxDQUFDO0FBQ25CLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQge2RlZXAsIGRlZXBDbHVlLCBlbXB0eSwgZ29hbCwgbW9uc3RlciwgbW9uc3RlckNsdWUsIHRyZWV9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3Jlc3Qge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBmb3Jlc3RcbiAgICAgKiBAcGFyYW0geyp9IHdpZHRoIFRoZSB3aWR0aCBvZiB0aGUgZm9yZXN0XG4gICAgICogQHBhcmFtIHsqfSBoZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgZm9yZXN0XG4gICAgICovXG4gICAgcHJpdmF0ZSBmb3Jlc3Q6IG51bWJlcltdID0gW107XG4gICAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGhlaWdodDogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKHcgPSA0LCBoID0gNCkge1xuICAgICAgICB0aGlzLndpZHRoID0gdztcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoO1xuICAgIH1cblxuICAgIHB1YmxpYyBwb3B1bGF0ZShtYXhDaGFuY2VzID0gNTApIHtcbiAgICAgICAgZm9yIChsZXQgbGluZSA9IDA7IGxpbmUgPCB0aGlzLndpZHRoOyBsaW5lKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHNxdWFyZSA9IDA7IHNxdWFyZSA8IHRoaXMuaGVpZ2h0OyBzcXVhcmUrKykge1xuICAgICAgICAgICAgICAgIGxldCB0bXBSYW5kID0gTWF0aC5yYW5kb20oKSAqIChtYXhDaGFuY2VzIC0gMCkgKyAwO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRtcFJhbmQgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodG1wUmFuZCA9PT0gMSkge1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgRm9yZXN0IGZyb20gXCIuL0ZvcmVzdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcblxuICAgIHByaXZhdGUgZm9yZXN0OiBGb3Jlc3Q7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGZvcmVzdFxuICAgICAqIEBwYXJhbSB3IFdpZHRoIG9mIHRoZSBmb3Jlc3RcbiAgICAgKiBAcGFyYW0gaCBIZWlnaHQgb2YgdGhlIGZvcmVzdFxuICAgICAqL1xuICAgIHB1YmxpYyBjcmVhdGVGb3Jlc3QodyA9IDQsIGggPSA0KSB7XG4gICAgICAgIGxldCBmID0gbmV3IEZvcmVzdCgpO1xuICAgICAgICByZXR1cm4gZjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGZvcmVzdFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRGb3Jlc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcmVzdDtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCAqIGFzIGpzYm9hcmQgZnJvbSBcIi4vRm9yZXN0XCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9HYW1lXCI7XG5cbmxldCBnID0gbmV3IEdhbWUoKTtcbmcuY3JlYXRlRm9yZXN0KCk7XG4iXX0=

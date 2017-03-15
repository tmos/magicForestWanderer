(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A gloomy dark forest. There are lots of monsters and traps everywere. Be careful, wanderer...
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
    Forest.prototype.populate = function (maxChances) {
        if (maxChances === void 0) { maxChances = 50; }
        for (var line = 0; line < this.width; line++) {
            for (var square = 0; square < this.height; square++) {
                var tmpRand = Math.random() * (maxChances - 0) + 0;
                if (tmpRand === 0) {
                    //@todo: populate using constants
                }
                else if (tmpRand === 1) {
                    //@todo: populate using constants
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

},{"./Forest":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("./Game");
var g = new Game_1.default();
g.createForest();

},{"./Game":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9zcmMvRm9yZXN0LnRzIiwianMvc3JjL0dhbWUudHMiLCJqcy9zcmMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDR0E7O0dBRUc7QUFDSDtJQUtJOzs7O09BSUc7SUFDSCxnQkFBWSxDQUFLLEVBQUUsQ0FBSztRQUFaLGtCQUFBLEVBQUEsS0FBSztRQUFFLGtCQUFBLEVBQUEsS0FBSztRQVRoQixXQUFNLEdBQWEsRUFBRSxDQUFDO1FBQ3RCLFVBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsV0FBTSxHQUFXLENBQUMsQ0FBQztRQVF2QixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFTSx5QkFBUSxHQUFmLFVBQWdCLFVBQWU7UUFBZiwyQkFBQSxFQUFBLGVBQWU7UUFDM0IsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7WUFDM0MsR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUM7Z0JBQ2xELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRW5ELEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoQixpQ0FBaUM7Z0JBQ3JDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2QixpQ0FBaUM7Z0JBQ3JDLENBQUM7WUFDTCxDQUFDO1FBRUwsQ0FBQztJQUNMLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0E3QkEsQUE2QkMsSUFBQTs7Ozs7O0FDbkNELG1DQUE4QjtBQUU5QjtJQUlJO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLDJCQUFZLEdBQW5CLFVBQW9CLENBQUssRUFBRSxDQUFLO1FBQVosa0JBQUEsRUFBQSxLQUFLO1FBQUUsa0JBQUEsRUFBQSxLQUFLO1FBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxnQkFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7T0FFRztJQUNJLHdCQUFTLEdBQWhCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQXhCQSxBQXdCQyxJQUFBOzs7Ozs7QUN4QkQsK0JBQTBCO0FBRTFCLElBQUksQ0FBQyxHQUFHLElBQUksY0FBSSxFQUFFLENBQUM7QUFDbkIsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7dHJhcCwgdHJhcENsdWUsIGVtcHR5LCBnb2FsLCBtb25zdGVyLCBtb25zdGVyQ2x1ZSwgdHJlZX0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgRmxvb3IgZnJvbSBcIi4vRmxvb3JcIjtcblxuLyoqXG4gKiBBIGdsb29teSBkYXJrIGZvcmVzdC4gVGhlcmUgYXJlIGxvdHMgb2YgbW9uc3RlcnMgYW5kIHRyYXBzIGV2ZXJ5d2VyZS4gQmUgY2FyZWZ1bCwgd2FuZGVyZXIuLi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9yZXN0IHtcbiAgICBwcml2YXRlIGZvcmVzdDogbnVtYmVyW10gPSBbXTtcbiAgICBwcml2YXRlIHdpZHRoOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgaGVpZ2h0OiBudW1iZXIgPSAwO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGZvcmVzdFxuICAgICAqIEBwYXJhbSB7Kn0gdyBUaGUgd2lkdGggb2YgdGhlIGZvcmVzdFxuICAgICAqIEBwYXJhbSB7Kn0gaCBUaGUgaGVpZ2h0IG9mIHRoZSBmb3Jlc3RcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih3ID0gNCwgaCA9IDQpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IHc7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaDtcbiAgICB9XG5cbiAgICBwdWJsaWMgcG9wdWxhdGUobWF4Q2hhbmNlcyA9IDUwKSB7XG4gICAgICAgIGZvciAobGV0IGxpbmUgPSAwOyBsaW5lIDwgdGhpcy53aWR0aDsgbGluZSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBzcXVhcmUgPSAwOyBzcXVhcmUgPCB0aGlzLmhlaWdodDsgc3F1YXJlKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgdG1wUmFuZCA9IE1hdGgucmFuZG9tKCkgKiAobWF4Q2hhbmNlcyAtIDApICsgMDtcblxuICAgICAgICAgICAgICAgIGlmICh0bXBSYW5kID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vQHRvZG86IHBvcHVsYXRlIHVzaW5nIGNvbnN0YW50c1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodG1wUmFuZCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvL0B0b2RvOiBwb3B1bGF0ZSB1c2luZyBjb25zdGFudHNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBGb3Jlc3QgZnJvbSBcIi4vRm9yZXN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xuXG4gICAgcHJpdmF0ZSBmb3Jlc3Q6IEZvcmVzdDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgZm9yZXN0XG4gICAgICogQHBhcmFtIHcgV2lkdGggb2YgdGhlIGZvcmVzdFxuICAgICAqIEBwYXJhbSBoIEhlaWdodCBvZiB0aGUgZm9yZXN0XG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZUZvcmVzdCh3ID0gNCwgaCA9IDQpIHtcbiAgICAgICAgdGhpcy5mb3Jlc3QgPSBuZXcgRm9yZXN0KHcsIGgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGZvcmVzdFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRGb3Jlc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcmVzdDtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyAkIGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCAqIGFzIGpzYm9hcmQgZnJvbSBcIi4vRm9yZXN0XCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9HYW1lXCI7XG5cbmxldCBnID0gbmV3IEdhbWUoKTtcbmcuY3JlYXRlRm9yZXN0KCk7XG4iXX0=

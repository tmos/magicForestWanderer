import * as $ from "jquery";
import * as swal from "sweetalert";
import Floor from "./Floor";
import Forest from "./Forest";
import Wanderer from "./Wanderer";

/**
 * It's a game for everyone, except for the wanderer. Poor wanderer...
 */
export default class Game {
    private currentForest: Forest;
    private wanderer: Wanderer;
    private gameDiv: HTMLElement;
    private scoreDiv: HTMLElement;

    public constructor(gameDiv: string, scoreDiv: string) {
        this.gameDiv = document.getElementById(gameDiv);
        this.scoreDiv = document.getElementById(scoreDiv);
    }

    public init(w = 3, h = 3) {
        this.createForest(w, h);
        this.getForest().populate();
        this.setWanderer();
    }

    public update(letsPlay: boolean = true) {

        if (letsPlay === true) {
            if (this.wanderer.hasNoMoves() === true) {
                this.wanderer.think();
            }
            this.wanderer.act();
        }

        if (this.wanderer.isDead()) {
            swal({
                text: "You just died. Too bad.",
                title: "☠",
                type: "error",
            });
            this.wanderer.setScore(-(10 * this.getForest().getNumberOfCases()));
            this.setWanderer(this.wanderer.getMap(), this.wanderer.getOrigY(), this.wanderer.getOrigX());
        }
        if (this.wanderer.isOut()) {
            // You just won this forest !
            this.wanderer.setScore(10 * this.getForest().getNumberOfCases());
            // Create the next level
            const newSize = this.getForest().getForest().length + 1;
            swal({
                text: "You just won this forest !",
                title: "⭐️",
                type: "success",
            });
            this.init(newSize, newSize);
        }

        this.wanderer.watchTheFloor();
        this.render();
    }

    public getWanderer() {
        return this.wanderer;
    }

    private createForest(w = 3, h = 3): Game {
        this.currentForest = new Forest(w, h);
        return this;
    }

    private getForest(): Forest {
        return this.currentForest;
    }

    private setWanderer(m: Floor[][] = undefined, y: number = undefined, x: number = undefined): Game {
        const forest = this.currentForest.getForest();

        let isOk = false;
        if (y === undefined && x === undefined) {
            while (!isOk) {
                y = Math.floor(Math.random() * (forest.length - 0) + 0);
                x = Math.floor(Math.random() * (forest[0].length - 0) + 0);

                if (forest[y][x].isEmpty()) {
                    isOk = true;
                }
            }
        }
        let oldScore = 0;
        if (this.wanderer) {
            oldScore = this.wanderer.getScore();
        }

        this.wanderer = new Wanderer(y, x, this.currentForest, oldScore);

        if (m) {
            this.wanderer.setMap(m);
        }

        return this;
    }

    private render() {
        const forest = this.getForest().getForest();
        const wanderer = this.wanderer;

        let html: string = "";

        for (let y = 0; y < this.currentForest.getForest().length; y++) {
            html += "<div class=\"row\">";
            for (let x = 0; x < this.currentForest.getForest()[0].length; x++) {
                let wandererPos = wanderer.getPosition();
                let floor = this.currentForest.getForest()[y][x];
                let additionnalClasses = [];

                if (wandererPos.x === x && wandererPos.y === y) {
                    additionnalClasses.push("wanderer");
                }

                html += floor.toHtml(this.wanderer.isKnown(y, x), additionnalClasses);
            }
            html += "</div>";
        }

        this.gameDiv.className = "";
        this.gameDiv.classList.add(`width${forest.length}`);
        this.gameDiv.innerHTML = html;

        this.scoreDiv.innerHTML = wanderer.getScore().toString();
    }

}

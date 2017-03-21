import * as $ from "jquery";
import Forest from "./Forest";
import Wanderer from "./Wanderer";

/**
 * It's a game for everyone, except for the wanderer. Poor wanderer...
 */
export default class Game {
    private currentForest: Forest;
    private wanderer: Wanderer;

    public createForest(w = 3, h = 3): Game {
        this.currentForest = new Forest(w, h);
        return this;
    }

    public getForest(): Forest {
        return this.currentForest;
    }

    public setWanderer(): Game {
        const forest = this.currentForest;

        if (!forest) {
            return undefined;
        }
        let isOk = false;
        let y;
        let x;
        while (!isOk) {
            y = Math.floor(Math.random() * (forest.getForest().length - 0) + 0);
            x = Math.floor(Math.random() * (forest.getForest()[0].length - 0) + 0);

            if (forest.getForest()[y][x].isEmpty) {
                isOk = true;
            }
        }
        this.wanderer = new Wanderer(y, x, forest);

        return this;
    }

    public getWanderer() {
        return this.wanderer;
    }

    public render(idElem: string) {
        const gameDiv = document.getElementById(idElem);
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

        gameDiv.classList.add(`width${forest.length}`);
        gameDiv.innerHTML = html;
    }

}

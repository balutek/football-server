import * as express from "express";
import {controller, httpGet} from "inversify-express-utils";
import {inject} from "inversify";
import {GameService} from "../game/GameService";

@controller('/game')
export class GameController {

    @httpGet('/')
    public hello(req: express.Request, res: express.Response, next: express.NextFunction): void {
        let object = {
          "ciastko": true
        };
        res.send(object);
    }



}
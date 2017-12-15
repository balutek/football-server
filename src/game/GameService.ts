import * as Matter from 'matter-js';
import {injectable} from "inversify";
import {Observable} from "@reactivex/rxjs";

@injectable()
export class GameService {

    public start(): Observable<Matter.Engine> {
        let Engine = Matter.Engine,
            World = Matter.World,
            Bodies = Matter.Bodies;

        let engine = Engine.create({});

        let boxA = Bodies.circle(400, 200, 18);
        let boxB = Bodies.circle(450, 50, 24);

        World.add(engine.world, [boxA, boxB]);

        let tickInterval = 1000/60;
        return Observable.interval(tickInterval)
            .map(tick => Engine.update(engine, tickInterval))
    }

}

declare var global: any;
// global.document = {
//     createElement: function(){
//         // Canvas
//         return {
//             getContext: function() {
//                 return {};
//             }
//         };
//     }
// };
global.window = {};
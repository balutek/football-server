import 'reflect-metadata';
import * as bodyParser from 'body-parser';

import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as SocketIO from 'socket.io';
import Socket = SocketIO.Socket;

// declare metadata by @controller annotation
import "./controller/GameController";
import { GameService } from './game/GameService';
import {GameSocket} from "./socket/GameSocket";

// set up container
let container = new Container();
container.bind<GameService>('gameService').to(GameService);
container.bind<GameSocket>('gameSocket').to(GameSocket);

// set up bindings
// container.bind<FooService>('FooService').to(FooService);

// create server
let server = new InversifyExpressServer(container);
server.setConfig((app) => {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:4200");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    // add body parser
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.raw());
});
let app = server.build();
let serverForSocketIO = app.listen(3000);

let socketIOServer = SocketIO(serverForSocketIO);
socketIOServer.on('connection', (socket: Socket) => {
    console.log('Connected');

    let gameSocket = container.get<GameSocket>('gameSocket');
    gameSocket.emitGameState(socket);
});
socketIOServer.on('disconnect', () => {
    console.log('Disconnected');
});


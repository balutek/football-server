import {inject, injectable} from "inversify";
import {GameService} from "../game/GameService";
import * as SocketIO from 'socket.io';
import Socket = SocketIO.Socket;

@injectable()
export class GameSocket {

    constructor(@inject('gameService') private gameService: GameService) {
    }

    public emitGameState(socket: Socket): void {
    }

}
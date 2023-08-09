import { Module } from "@nestjs/common";
import { SocketClient } from "./socket-clients";

@Module({
    providers: [SocketClient]
})

export class SocketModule {

}
import { Body, Controller, Post, OnModuleInit } from '@nestjs/common';
import { ChatService } from './chat.service';

// import { io, Socket } from "socket.io-client";
import { MyGateway } from 'src/gateway/gateway';

@Controller('chat')
export class ChatController  {

  // // public socketClient: Socket
  // constructor(private readonly chatService: ChatService, private readonly gateway: MyGateway) {
  //   // this.socketClient = io('http://localhost:3001');
  // }

  // onModuleInit() {
  //   this.registerConsumerEvents()
  // }

  // @Post('createroom')
  // createRoom(@Body() body: any): any {
  //   console.log(body)
  //   // const response = this.gateway.setChatRoomSocket(body.chatRoomID);
  //   return body;
  // }

  // private registerConsumerEvents() {
  //   // this.socketClient.emit('newMessage', { msg: 'hey there!' });
  //   // this.socketClient.on('connect', () => {
  //   //   console.log('connected to gateway');
  //   // })

  //   // this.socketClient.on('onMessage', (payload: any) => {
  //   //   console.log(payload)
  //   // })
  // }

}

import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from "socket.io"
import { GatewayService } from './gateway.service';

@WebSocketGateway({
  cors: {
    origin:['http://localhost:3000']
  }
})
export class MyGateway {

  constructor(private readonly gatewayService: GatewayService) {}
  
  @WebSocketServer()
  server: Server

  onModuleInit(){
    this.server.on('connection',(socket)=>{
      console.log(socket.id)
      console.log("connected")
    })
  }

  // @SubscribeMessage("newMessage")
  // onNewMessage(@MessageBody() body: any){
  //   console.log(body)
  //   this.server.emit('onMessage',{
  //     msg:'new message',
  //     content: body
  //   })
  // }

  // @SubscribeMessage("newUser")
  // onNewUser(@MessageBody() body: any){
  //   console.log("new user",body)
  //   this.server.emit('onNewUser',{
  //     user: body
  //   })
  // }

  @SubscribeMessage('newChatRoom')
  async onNewRoom(@MessageBody() body: any){
    const messageArray = await this.gatewayService.redisStorage(body)
    const SubscribeChatRoom = `${body.chatRoomID}SUBSCRIBE`
    this.server.emit(SubscribeChatRoom,{
      messageArray
    })
  }
}

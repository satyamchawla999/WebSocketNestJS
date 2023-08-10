import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from "socket.io"

@WebSocketGateway({
  cors: {
    origin:['http://localhost:3000']
  }
})
export class MyGateway {

  @WebSocketServer()
  server: Server

  onModuleInit(){
    this.server.on('connection',(socket)=>{
      console.log(socket.id)
      console.log("connected")
    })
  }

  @SubscribeMessage("newMessage")
  onNewMessage(@MessageBody() body: any){
    console.log(body)
    this.server.emit('onMessage',{
      msg:'new message',
      content: body
    })
  }

  @SubscribeMessage("newUser")
  onNewUser(@MessageBody() body: any){
    console.log("new user",body)
    this.server.emit('onNewUser',{
      user: body
    })
  }
}

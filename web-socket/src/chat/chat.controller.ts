import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('chat')
export class ChatController {

  // // public socketClient: Socket
  // constructor(private readonly chatService: ChatService, private readonly gateway: MyGateway) {
  //   // this.socketClient = io('http://localhost:3001');
  // }

  constructor(private readonly chatService: ChatService, @Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  // onModuleInit() {
  //   this.registerConsumerEvents()
  // }

  @Post('createroom')
  async createRoom(@Body() body: any): Promise<Array<object>> {
    const { chatRoomID } = body
    const chatRoom = await this.cacheManager.get(chatRoomID);
    if (!chatRoom) {
      return []
    } else {
      return  await this.cacheManager.get(chatRoomID);
    }
  }

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

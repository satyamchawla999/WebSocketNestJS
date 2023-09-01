import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class GatewayService {

    constructor( @Inject( CACHE_MANAGER ) private cacheManager: Cache) {}

    async redisStorage(body: any): Promise<Array<object>> {
        const {chatRoomID, message} = body
        const chatRoom = await this.cacheManager.get(chatRoomID);

        if(!chatRoom) {
            await this.cacheManager.set(chatRoomID , [message]);
        } else {
            const messageArray: any = chatRoom
            messageArray.push(message);
            await this.cacheManager.set(chatRoomID , messageArray);
        }
        return  await this.cacheManager.get(chatRoomID);
    }
}

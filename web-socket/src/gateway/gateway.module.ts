import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { GatewayService } from './gateway.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: 'localhost', //Redis server host,
            port: 6379 //Redis server port ,
          },
        }),
      }),
    }),
  ],

  providers: [MyGateway,GatewayService]
})
export class GatewayModule { }

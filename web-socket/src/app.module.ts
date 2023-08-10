import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { secret } from './constant';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: secret,
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/ChatApplication'),
    GatewayModule,
    AuthModule,
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

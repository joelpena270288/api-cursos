import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from '../../config/config.keys';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { JwTStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRepository]),
PassportModule.register({
  defaultStrategy: 'jwt',

}),
JwtModule.registerAsync({
  imports: [ConfigModule],
  inject:[ConfigService],
  useFactory(config: ConfigService){
    return{
      secret: config.get(Configuration.JWT_SECRET),
      signOption:{
        expiresIn:3600,
      }

    };
  }
})
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, JwTStrategy],
  exports:[JwTStrategy, PassportModule]
})
export class AuthModule {}

import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from '../config/config.keys';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConnectionOptions } from 'typeorm';
export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        //ssl:true,
        type: 'postgres' as const,
        host: config.get(Configuration.HOST),
        username: config.get(Configuration.USERNAME),
        password: config.get(Configuration.PASSWORD),
        database: config.get(Configuration.DATABASE),
        port: 5432,
        synchronize: true,
        keepConnectionAlive: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + './migrations/*{.ts,.js}'],
      } as ConnectionOptions;
    },
  }),
];

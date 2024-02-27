import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './system/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { envValidation } from './env.validation';
import { databaseConfig } from './config';
import { DatabaseModule } from '@bee/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: envValidation,
    }),
    DatabaseModule.forRoot(databaseConfig),
    UserModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

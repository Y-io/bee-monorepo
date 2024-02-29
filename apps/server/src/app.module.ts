import { Module } from '@nestjs/common';
import { UserModule } from './system/user/user.module';
import { DatabaseModule } from '@bee/database';
import { ConfigModule } from '@bee/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule.forRoot({
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}

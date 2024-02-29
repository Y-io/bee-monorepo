import { Module } from '@nestjs/common';
import { UserModule } from './system/user/user.module';
import { databaseConfig } from './config';
import { DatabaseModule } from '@bee/database';
import { BeeConfigModule } from '@bee/config';

@Module({
  imports: [
    BeeConfigModule.forRoot(),
    DatabaseModule.forRoot(databaseConfig),
    UserModule,
  ],
})
export class AppModule {}

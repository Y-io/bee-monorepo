import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities';
import { UserRepository } from './repositories ';
import { DatabaseModule } from '@bee/database';

const providers = [UserService];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), DatabaseModule.forCustomRepository([UserRepository])],
  controllers: [UserController],
  providers: providers,
  exports: providers,
})
export class UserModule {}

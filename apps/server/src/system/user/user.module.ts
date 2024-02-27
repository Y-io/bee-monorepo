import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories ';
import { DatabaseModule } from '@bee/database';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    DatabaseModule.forCustomRepository([UserRepository]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

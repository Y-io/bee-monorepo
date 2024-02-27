import { UserEntity } from '../entities/user.entity';
import { EntityRepository } from '@bee/database';

@EntityRepository(UserEntity)
export class UserRepository {}

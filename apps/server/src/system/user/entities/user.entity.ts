import { BeforeInsert, Column, Entity } from 'typeorm';
import { AbstractBaseEntity } from '../../../common/interfaces';
import { hash } from '@node-rs/argon2';
import { IsEmail } from 'class-validator';

@Entity('user')
export class UserEntity extends AbstractBaseEntity {
  @Column({ nullable: true })
  password: string;

  @Column()
  username: string;

  @IsEmail()
  @Column({ unique: true, nullable: true })
  email: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password);
  }
}

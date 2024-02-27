import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Type } from 'class-transformer';

@Entity()
export abstract class AbstractBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Type(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Type(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Type(() => Date)
  @DeleteDateColumn()
  deletedAt: Date;
}

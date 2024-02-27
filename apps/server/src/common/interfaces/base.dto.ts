import { Expose, Type } from 'class-transformer';

export class BaseDto {
  @Type(() => Date)
  @Expose()
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  updatedAt: Date;

  @Expose()
  @Type(() => Date)
  deletedAt: number;
}

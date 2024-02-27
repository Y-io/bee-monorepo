import { IsNumber } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class PaginationInputDto {
  @IsNumber()
  @Type(() => Number)
  page: number = 1;

  @IsNumber()
  @Type(() => Number)
  pageSize: number = 10;
}

export class PaginationResultDto {
  @Expose()
  count: number;

  @Expose()
  page: number;

  @Expose()
  pageSize: number;
}

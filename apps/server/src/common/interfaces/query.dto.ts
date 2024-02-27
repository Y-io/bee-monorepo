import { Type } from 'class-transformer';
import { IsDefined } from 'class-validator';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class OrderBy {
  [key: string]: Order;
}

export class FilterTwo {
  [key: string]: string | number | boolean;
}

export class Filter {
  [key: string]: string | number | boolean | FilterTwo;
}

export class QueryDto {
  @Type(() => OrderBy)
  @IsDefined()
  orderBy: OrderBy;

  @Type(() => Filter)
  @IsDefined()
  filter: Filter;
}

// export class PaginationQueryDto extends PartialType(
//   IntersectionType(QueryDto, PaginationInputDto),
// ) {}

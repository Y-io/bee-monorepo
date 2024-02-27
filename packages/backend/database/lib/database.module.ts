import { DynamicModule, Module, Provider } from '@nestjs/common';
import {
  getDataSourceToken,
  TypeOrmModule,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

import { ENTITY_REPOSITORY_DEF } from './entity-repository.decorator';
import { DataSource } from 'typeorm';

@Module({})
export class DatabaseModule {
  static forRoot(configRegister: () => TypeOrmModuleOptions): DynamicModule {
    console.log(configRegister());
    return {
      global: true,
      module: DatabaseModule,
      imports: [TypeOrmModule.forRoot(configRegister())],
    };
  }

  public static forCustomRepository<T extends new (...args: any[]) => any>(
    repositories: T[],
  ): DynamicModule {
    const providers: Provider[] = [];

    for (const repository of repositories) {
      const entity = Reflect.getMetadata(ENTITY_REPOSITORY_DEF, repository);

      if (!entity) {
        continue;
      }

      providers.push({
        inject: [getDataSourceToken()],
        provide: repository,
        useFactory: (dataSource: DataSource): typeof repository => {
          const baseRepository = dataSource.getRepository<any>(entity);
          return new repository(
            baseRepository.target,
            baseRepository.manager,
            baseRepository.queryRunner,
          );
        },
      });
    }

    return {
      exports: providers,
      module: DatabaseModule,
      providers,
    };
  }
}

import { DynamicModule, Module, Provider } from '@nestjs/common';
import {
  getDataSourceToken,
  TypeOrmModule,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

import { ENTITY_REPOSITORY_DEF } from './entity-repository.decorator';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@bee/config';

@Module({})
export class DatabaseModule {
  static forRoot(
    configRegister?: (() => TypeOrmModuleOptions) | TypeOrmModuleOptions,
  ): DynamicModule {
    return {
      global: true,
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
            const config =
              typeof configRegister === 'function'
                ? configRegister()
                : configRegister;

            return {
              type: 'postgres',
              username: configService.db.user,
              password: configService.db.password,
              database: configService.db.database,
              port: configService.db.port,
              ...config,
            } as TypeOrmModuleOptions;
          },
        }),
      ],
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

import { DynamicModule, FactoryProvider, Module } from '@nestjs/common';
import { ConfigType } from './config.interface';
import { ConfigService } from './config.service';

@Module({})
export class ConfigModule {
  static forRoot(configRegister?: () => ConfigType): DynamicModule {
    const provider: FactoryProvider<ConfigType> = {
      provide: ConfigService,
      useFactory: () => {
        const config = configRegister?.();
        const configServ = new ConfigService(config);

        return configServ;
      },
    };

    return {
      global: true,
      module: ConfigModule,
      providers: [provider],
      exports: [provider],
    };
  }
}

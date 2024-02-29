import { DynamicModule, FactoryProvider, Module } from '@nestjs/common';
import { ConfigType } from './config.interface';
import { BeeConfigService } from './config.service';

@Module({})
export class BeeConfigModule {
  static forRoot(configRegister?: () => ConfigType): DynamicModule {
    const provider: FactoryProvider<ConfigType> = {
      provide: BeeConfigService,
      useFactory: () => {
        const config = configRegister?.();
        const configServ = new BeeConfigService(config);

        return configServ;
      },
    };

    return {
      global: true,
      module: BeeConfigModule,
      providers: [provider],
      exports: [provider],
    };
  }
}
